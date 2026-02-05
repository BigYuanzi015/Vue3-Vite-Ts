import service from '@/config/axios'
import type { RequestConfig } from '@/config/axios'

// 封装 GET 请求
export function get<T = any>(url: string, config?: RequestConfig): Promise<T> {
  return service.get(url, config) as Promise<T>
}

// 封装 POST 请求
export function post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
  return service.post(url, data, config) as Promise<T>
}

// 封装 PUT 请求
export function put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
  return service.put(url, data, config) as Promise<T>
}

// 封装 DELETE 请求
export function del<T = any>(url: string, config?: RequestConfig): Promise<T> {
  return service.delete(url, config) as Promise<T>
}

// 封装 PATCH 请求
export function patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
  return service.patch(url, data, config) as Promise<T>
}

// 导出 axios 实例，用于特殊需求
export default service
