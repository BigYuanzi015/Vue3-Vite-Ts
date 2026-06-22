/**
 * 鉴权工具模块
 *
 * 封装 Token 与用户信息的 localStorage 读写操作，提供统一的
 * 登录/登出/状态查询等便捷函数。
 *
 * @module utils/auth
 */

import { appConfig } from '@/config'
import type { UserInfo } from '@/api/types'

// ─── Token 操作 ──────────────────────────────────────

/**
 * 读取 Token
 *
 * @returns Token 字符串，不存在时返回 null
 */
export function getToken(): string | null {
  return localStorage.getItem(appConfig.tokenKey)
}

/**
 * 写入 Token
 *
 * @param token - 待持久化的 Token 字符串
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
 * 判断是否已存在 Token
 *
 * @returns true 表示 Token 存在且非空
 */
export function hasToken(): boolean {
  return !!getToken()
}

// ─── 用户信息操作 ────────────────────────────────────

/**
 * 读取用户信息
 *
 * 从 localStorage 中反序列化 JSON，解析失败时返回 null。
 *
 * @returns 用户信息对象或 null
 */
export function getUserInfo(): UserInfo | null {
  const userInfoString = localStorage.getItem(appConfig.userInfoKey)
  if (!userInfoString) {
    return null
  }
  try {
    return JSON.parse(userInfoString) as UserInfo
  } catch (error) {
    console.error('解析用户信息失败:', error)
    return null
  }
}

/**
 * 写入用户信息
 *
 * @param userInfo - 用户信息对象（JSON 序列化后存储）
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
 * 判断是否已有用户信息
 *
 * @returns true 表示用户信息存在
 */
export function hasUserInfo(): boolean {
  return !!getUserInfo()
}

// ─── 鉴权综合操作 ────────────────────────────────────

/**
 * 登录 —— 同时写入 Token 与用户信息
 *
 * @param token - 登录凭证
 * @param userInfo - 用户信息对象
 */
export function login(token: string, userInfo: UserInfo): void {
  setToken(token)
  setUserInfo(userInfo)
}

/**
 * 登出 —— 移除 Token 与用户信息
 */
export function logout(): void {
  removeToken()
  removeUserInfo()
}

/**
 * 是否已登录
 *
 * 需同时满足 Token 存在且用户信息存在。
 *
 * @returns true 表示已登录
 */
export function isLoggedIn(): boolean {
  return hasToken() && hasUserInfo()
}

/**
 * 清除所有认证信息（等价于登出）
 */
export function clearAuth(): void {
  logout()
}

/**
 * 一次性获取当前所有认证信息
 *
 * @returns 包含 token 与 userInfo 的对象
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
