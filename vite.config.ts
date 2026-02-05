import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { getChunkName } from "./build/optimize";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
    // 压缩 CSS
    devSourcemap: false,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  // 构建优化配置
  build: {
    // 指定输出目录
    outDir: "dist",
    // 生成 source map（生产环境建议关闭）
    sourcemap: false,
    // 启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    // 构建后是否生成 gzip 压缩报告
    reportCompressedSize: false,
    // chunk 大小警告限制（kb）
    chunkSizeWarningLimit: 1000,
    // 压缩配置（使用 esbuild，更快且无需额外依赖）
    // 如需使用 terser，需要安装: npm install -D terser
    // minify: "terser",
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //     drop_debugger: true,
    //   },
    // },
    // 代码分割配置
    rollupOptions: {
      output: {
        // 手动分包
        manualChunks: (id) => {
          return getChunkName(id);
        },
        // 文件命名
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name || "")) {
            return `media/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/.test(assetInfo.name || "")) {
            return `img/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name || "")) {
            return `fonts/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
  },
  // 依赖优化配置
  optimizeDeps: {
    // 预构建的依赖
    include: [
      "vue",
      "vue-router",
      "pinia",
      "axios",
      "element-plus",
      "@element-plus/icons-vue",
    ],
    // 排除预构建的依赖
    exclude: [],
  },
  // 性能优化说明：
  // 如需移除 console 和 debugger，请使用 terser 压缩
  // 1. 安装 terser: npm install -D terser
  // 2. 取消 build.minify 和 build.terserOptions 的注释
  // 3. 设置 minify: "terser"
});
