/**
 * API 统一导出入口
 *
 * 聚合所有 API 模块、类型定义与请求方法，外部只需 `import { ... } from '@/api'` 即可使用。
 *
 * @module api
 */

export * from './user'
export * from './types'
export { default as request } from './request'
export { get, post, put, deleteRequest, patch } from './request'
