# 构建优化说明

## 优化配置

### 1. 代码分割（Code Splitting）

- **Vue 相关库**：vue、vue-router、pinia 单独打包为 `vue-vendor`
- **Element Plus**：单独打包为 `element-plus-vendor`
- **Axios**：单独打包为 `axios-vendor`
- **其他第三方库**：统一打包为 `vendor`

### 2. 文件压缩

- **JavaScript**：使用 Terser 压缩
- **CSS**：自动压缩
- **生产环境**：自动移除 `console` 和 `debugger`

### 3. 资源优化

- **图片**：输出到 `img/` 目录
- **字体**：输出到 `fonts/` 目录
- **媒体文件**：输出到 `media/` 目录
- **其他资源**：输出到 `assets/` 目录

### 4. 依赖预构建

预构建以下依赖以提升开发体验：
- vue
- vue-router
- pinia
- axios
- element-plus
- @element-plus/icons-vue

### 5. Source Map

生产环境默认关闭 source map，如需调试可设置为 `true`

## 构建命令

```bash
# 开发环境
npm run dev

# 生产环境构建
npm run build

# 生产环境构建（明确指定）
npm run build:prod

# 构建并分析打包结果
npm run build:analyze

# 预览构建结果
npm run preview
```

## 优化效果

- ✅ 减少首屏加载时间
- ✅ 提升代码缓存效率
- ✅ 减小打包体积
- ✅ 优化资源加载顺序
- ✅ 提升开发体验
