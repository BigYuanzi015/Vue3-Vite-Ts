/**
 * 构建优化工具函数
 *
 * 供 vite.config.ts 在构建时调用，负责：
 * - 基于模块路径决定 chunk 归属（vendor 分包策略）
 * - 环境判断辅助函数
 *
 * @module build/optimize
 */

/**
 * 根据模块 ID 生成 chunk 名称
 *
 * 将 node_modules 下的第三方依赖按来源拆分为独立 vendor chunk：
 * - vue / vue-router / pinia → vue-vendor
 * - element-plus → element-plus-vendor
 * - axios → axios-vendor
 * - 其他 npm 包 → vendor
 * - src 下业务代码 → index
 *
 * @param moduleId - 模块文件路径（由 Rollup 传入）
 * @returns 对应的 chunk 名称
 */
export function getChunkName(moduleId: string): string {
  if (moduleId.includes('node_modules')) {
    if (
      moduleId.includes('vue') ||
      moduleId.includes('vue-router') ||
      moduleId.includes('pinia')
    ) {
      return 'vue-vendor'
    }
    if (moduleId.includes('element-plus')) {
      return 'element-plus-vendor'
    }
    if (moduleId.includes('axios')) {
      return 'axios-vendor'
    }
    return 'vendor'
  }
  return 'index'
}

/**
 * 判断当前是否为生产环境
 *
 * @returns true 表示 NODE_ENV === 'production'
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * 判断当前是否为开发环境
 *
 * @returns true 表示 NODE_ENV === 'development'
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}
