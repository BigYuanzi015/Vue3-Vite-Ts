/**
 * API 通用类型定义
 *
 * 定义前后端约定的标准响应结构、分页参数/响应格式以及示例业务实体类型。
 *
 * @module api/types
 */

/**
 * 标准 API 响应体
 *
 * @template ResponseDataType - 实际业务数据的类型，默认 `any`
 */
export interface ApiResponse<ResponseDataType = any> {
  /** 业务状态码，0 或 200 表示成功 */
  code: number
  /** 响应消息 */
  message: string
  /** 业务数据 */
  data: ResponseDataType
}

/**
 * 分页请求参数
 */
export interface PageParams {
  /** 当前页码（从 1 开始） */
  page: number
  /** 每页条数 */
  pageSize: number
}

/**
 * 分页响应体
 *
 * @template ItemType - 列表项类型，默认 `any`
 */
export interface PageData<ItemType = any> {
  /** 当前页数据列表 */
  list: ItemType[]
  /** 数据总条数 */
  total: number
  /** 当前页码 */
  page: number
  /** 每页条数 */
  pageSize: number
}

/**
 * 用户信息实体（示例）
 */
export interface UserInfo {
  /** 用户 ID */
  id: number
  /** 用户名 */
  username: string
  /** 邮箱 */
  email: string
  /** 头像地址（可选） */
  avatar?: string
  /** 创建时间（ISO 字符串） */
  createTime: string
}
