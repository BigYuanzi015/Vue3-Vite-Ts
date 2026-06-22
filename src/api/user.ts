/**
 * 用户相关 API 接口
 *
 * 封装用户管理（CRUD）、登录认证等接口调用，所有函数均返回 Promise。
 *
 * @module api/user
 */

import { get, post, put, deleteRequest } from './request'
import type { RequestConfig } from '@/config/axios'
import type { UserInfo, PageParams, PageData } from './types'

// ─── 用户 CRUD ────────────────────────────────────────

/**
 * 获取用户列表（分页）
 *
 * @param params - 分页参数
 * @param requestConfig - 自定义请求配置
 * @returns 分页用户数据
 */
export function getUserList(
  params: PageParams,
  requestConfig?: RequestConfig,
) {
  return get<PageData<UserInfo>>('/user/list', { ...requestConfig, params })
}

/**
 * 获取单个用户详情
 *
 * @param userId - 用户 ID
 * @returns 用户信息
 */
export function getUserDetail(userId: number) {
  return get<UserInfo>(`/user/${userId}`)
}

/**
 * 创建新用户
 *
 * @param payload - 部分用户信息（必填字段由后端校验）
 * @returns 创建后的用户信息
 */
export function createUser(payload: Partial<UserInfo>) {
  return post<UserInfo>('/user', payload)
}

/**
 * 更新用户信息
 *
 * @param userId - 用户 ID
 * @param payload - 需要更新的字段
 * @returns 更新后的用户信息
 */
export function updateUser(userId: number, payload: Partial<UserInfo>) {
  return put<UserInfo>(`/user/${userId}`, payload)
}

/**
 * 删除用户
 *
 * @param userId - 用户 ID
 * @returns 空响应
 */
export function deleteUser(userId: number) {
  return deleteRequest(`/user/${userId}`)
}

// ─── 认证 ────────────────────────────────────────────

/**
 * 用户登录
 *
 * @param username - 用户名
 * @param password - 密码（明文，实际项目应传摘要）
 * @returns Token 与用户信息
 */
export function login(username: string, password: string) {
  return post<{ token: string; userInfo: UserInfo }>('/auth/login', {
    username,
    password,
  })
}

/**
 * 获取当前登录用户信息
 *
 * @returns 用户信息
 */
export function getCurrentUser() {
  return get<UserInfo>('/user/current')
}
