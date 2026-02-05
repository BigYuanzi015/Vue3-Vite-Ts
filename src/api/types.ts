// API 响应类型定义
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 分页请求参数
export interface PageParams {
  page: number
  pageSize: number
}

// 分页响应数据
export interface PageData<T = any> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 用户信息示例
export interface UserInfo {
  id: number
  username: string
  email: string
  avatar?: string
  createTime: string
}
