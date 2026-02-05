import { get, post, put, del } from './request'
import type { RequestConfig } from '@/config/axios'
import type { UserInfo, PageParams, PageData } from './types'

// 用户相关 API

/**
 * 获取用户列表
 */
export function getUserList(params: PageParams, config?: RequestConfig) {
  return get<PageData<UserInfo>>('/user/list', { ...config, params })
}

/**
 * 获取用户详情
 */
export function getUserDetail(id: number) {
  return get<UserInfo>(`/user/${id}`)
}

/**
 * 创建用户
 */
export function createUser(data: Partial<UserInfo>) {
  return post<UserInfo>('/user', data)
}

/**
 * 更新用户信息
 */
export function updateUser(id: number, data: Partial<UserInfo>) {
  return put<UserInfo>(`/user/${id}`, data)
}

/**
 * 删除用户
 */
export function deleteUser(id: number) {
  return del(`/user/${id}`)
}

/**
 * 登录
 */
export function login(username: string, password: string) {
  return post<{ token: string; userInfo: UserInfo }>('/auth/login', {
    username,
    password,
  })
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser() {
  return get<UserInfo>('/user/current')
}
