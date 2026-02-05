import { appConfig } from '@/config'
import type { UserInfo } from '@/api/types'

/**
 * Token 相关操作
 */

/**
 * 获取 Token
 */
export function getToken(): string | null {
  return localStorage.getItem(appConfig.tokenKey)
}

/**
 * 设置 Token
 * @param token - Token 字符串
 */
export function setToken(token: string): void {
  localStorage.setItem(appConfig.tokenKey, token)
}

/**
 * 删除 Token
 */
export function removeToken(): void {
  localStorage.removeItem(appConfig.tokenKey)
}

/**
 * 检查是否有 Token
 */
export function hasToken(): boolean {
  return !!getToken()
}

/**
 * 用户信息相关操作
 */

/**
 * 获取用户信息
 */
export function getUserInfo(): UserInfo | null {
  const userInfoStr = localStorage.getItem(appConfig.userInfoKey)
  if (!userInfoStr) {
    return null
  }
  try {
    return JSON.parse(userInfoStr) as UserInfo
  } catch (error) {
    console.error('解析用户信息失败:', error)
    return null
  }
}

/**
 * 设置用户信息
 * @param userInfo - 用户信息对象
 */
export function setUserInfo(userInfo: UserInfo): void {
  localStorage.setItem(appConfig.userInfoKey, JSON.stringify(userInfo))
}

/**
 * 删除用户信息
 */
export function removeUserInfo(): void {
  localStorage.removeItem(appConfig.userInfoKey)
}

/**
 * 检查是否有用户信息
 */
export function hasUserInfo(): boolean {
  return !!getUserInfo()
}

/**
 * 鉴权相关操作
 */

/**
 * 登录 - 同时设置 Token 和用户信息
 * @param token - Token 字符串
 * @param userInfo - 用户信息对象
 */
export function login(token: string, userInfo: UserInfo): void {
  setToken(token)
  setUserInfo(userInfo)
}

/**
 * 登出 - 清除所有认证信息
 */
export function logout(): void {
  removeToken()
  removeUserInfo()
}

/**
 * 检查是否已登录
 */
export function isLoggedIn(): boolean {
  return hasToken() && hasUserInfo()
}

/**
 * 清除所有认证信息（包括 Token 和用户信息）
 */
export function clearAuth(): void {
  logout()
}

/**
 * 获取认证信息（Token 和用户信息）
 */
export function getAuthInfo(): {
  token: string | null
  userInfo: UserInfo | null
} {
  return {
    token: getToken(),
    userInfo: getUserInfo(),
  }
}
