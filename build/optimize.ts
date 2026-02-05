/**
 * 构建优化工具函数
 */

/**
 * 生成 chunk 名称的辅助函数
 */
export function getChunkName(id: string): string {
  if (id.includes('node_modules')) {
    if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
      return 'vue-vendor'
    }
    if (id.includes('element-plus')) {
      return 'element-plus-vendor'
    }
    if (id.includes('axios')) {
      return 'axios-vendor'
    }
    return 'vendor'
  }
  return 'index'
}

/**
 * 判断是否为生产环境
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * 判断是否为开发环境
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}
