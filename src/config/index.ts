// 应用配置
export const appConfig = {
  // API 基础地址
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  
  // 请求超时时间（毫秒）
  requestTimeout: 30000,
  
  // Token 存储 key
  tokenKey: 'token',
  
  // 用户信息存储 key
  userInfoKey: 'userInfo',
  
  // 是否显示请求 loading（默认）
  defaultShowLoading: true,
  
  // 是否显示错误提示（默认）
  defaultShowError: true,
}

// 环境配置
export const envConfig = {
  // 是否为开发环境
  isDev: import.meta.env.DEV,
  
  // 是否为生产环境
  isProd: import.meta.env.PROD,
  
  // 环境模式
  mode: import.meta.env.MODE,
}
