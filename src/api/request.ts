/**
 * API 请求封装模块
 *
 * 基于 Axios 实例封装统一的 HTTP 请求方法（GET / POST / PUT / DELETE / PATCH），
 * 提供类型安全的泛型调用，所有方法返回 Promise 并通过 service 实例发起请求。
 *
 * @module api/request
 */

import service from '@/config/axios'
import type { RequestConfig } from '@/config/axios'

/**
 * 封装 GET 请求
 *
 * @param url - 请求地址
 * @param requestConfig - 请求配置，可覆盖默认 loading / showError 等行为
 * @returns 服务端返回数据（已解包）
 */
export function get<ResponseDataType = any>(
  url: string,
  requestConfig?: RequestConfig,
): Promise<ResponseDataType> {
  return service.get(url, requestConfig) as Promise<ResponseDataType>
}

/**
 * 封装 POST 请求
 *
 * @param url - 请求地址
 * @param payload - 请求体数据
 * @param requestConfig - 请求配置，可覆盖默认 loading / showError 等行为
 * @returns 服务端返回数据（已解包）
 */
export function post<ResponseDataType = any>(
  url: string,
  payload?: any,
  requestConfig?: RequestConfig,
): Promise<ResponseDataType> {
  return service.post(url, payload, requestConfig) as Promise<ResponseDataType>
}

/**
 * 封装 PUT 请求
 *
 * @param url - 请求地址
 * @param payload - 请求体数据
 * @param requestConfig - 请求配置，可覆盖默认 loading / showError 等行为
 * @returns 服务端返回数据（已解包）
 */
export function put<ResponseDataType = any>(
  url: string,
  payload?: any,
  requestConfig?: RequestConfig,
): Promise<ResponseDataType> {
  return service.put(url, payload, requestConfig) as Promise<ResponseDataType>
}

/**
 * 封装 DELETE 请求
 *
 * @param url - 请求地址
 * @param requestConfig - 请求配置，可覆盖默认 loading / showError 等行为
 * @returns 服务端返回数据（已解包）
 */
export function deleteRequest<ResponseDataType = any>(
  url: string,
  requestConfig?: RequestConfig,
): Promise<ResponseDataType> {
  return service.delete(url, requestConfig) as Promise<ResponseDataType>
}

/**
 * 封装 PATCH 请求
 *
 * @param url - 请求地址
 * @param payload - 请求体数据
 * @param requestConfig - 请求配置，可覆盖默认 loading / showError 等行为
 * @returns 服务端返回数据（已解包）
 */
export function patch<ResponseDataType = any>(
  url: string,
  payload?: any,
  requestConfig?: RequestConfig,
): Promise<ResponseDataType> {
  return service.patch(url, payload, requestConfig) as Promise<ResponseDataType>
}

/** 导出 Axios 实例，用于特殊定制需求 */
export default service
