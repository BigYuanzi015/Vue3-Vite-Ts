/**
 * 应用全局配置
 *
 * 集中管理 API 地址、鉴权存储 key、请求默认行为等运行时常量，
 * 同时暴露环境判断字段供业务代码按需消费。
 *
 * @module config
 */

/**
 * 应用运行时配置
 */
export const appConfig = {
  /** API 基础路径，默认取自环境变量 VITE_API_BASE_URL，兜底为 "/api" */
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || '/api',

  /** 请求超时时间（毫秒） */
  requestTimeout: 30000,

  /** localStorage 中存储 Token 的 key 名 */
  tokenKey: 'token',

  /** localStorage 中存储用户信息的 key 名 */
  userInfoKey: 'userInfo',

  /** 请求是否默认显示全局 Loading */
  defaultShowLoading: true,

  /** 请求失败是否默认展示错误提示 */
  defaultShowError: true,
}

/**
 * 环境信息配置
 */
export const envConfig = {
  /** 是否为开发环境 */
  isDev: import.meta.env.DEV,

  /** 是否为生产环境 */
  isProd: import.meta.env.PROD,

  /** 当前 Vite mode（"development" / "production" / 自定义） */
  mode: import.meta.env.MODE,
}
