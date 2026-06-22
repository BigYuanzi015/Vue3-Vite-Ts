/**
 * Axios 实例配置与拦截器
 *
 * 创建统一的 Axios 实例，注册请求/响应拦截器实现：
 * - Token 自动携带
 * - 全局 Loading 控制（请求计数防重叠）
 * - 统一错误提示与 HTTP 状态码映射
 *
 * @module config/axios
 */

import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { appConfig } from './index'
import { getToken, removeToken } from '@/utils/auth'

/**
 * 扩展请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示全局 Loading，默认 true */
  loading?: boolean
  /** 是否在业务/HTTP 错误时弹出消息提示，默认 true */
  showError?: boolean
}

/**
 * 标准响应数据结构（与后端约定）
 *
 * @template ResponseDataType - 业务数据的具体类型
 */
export interface ResponseData<ResponseDataType = any> {
  /** 业务状态码 */
  code: number
  /** 状态说明 */
  message: string
  /** 业务数据 */
  data: ResponseDataType
}

/** 当前 Loading 实例引用 */
let loadingInstance: LoadingInstance | null = null

/** 并发请求计数器，用于 Loading 的精准开/关 */
let requestCount = 0

/**
 * 显示全局 Loading
 *
 * 仅首次并发请求弹出遮罩，后续请求仅递增计数器。
 */
const showLoading = () => {
  if (requestCount === 0) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }
  requestCount++
}

/**
 * 隐藏全局 Loading
 *
 * 递减计数器，当所有并发请求都完成时才关闭遮罩。
 */
const hideLoading = () => {
  requestCount--
  if (requestCount <= 0) {
    requestCount = 0
    loadingInstance?.close()
    loadingInstance = null
  }
}

/**
 * 创建 Axios 实例
 *
 * - 默认 baseURL/超时取自 appConfig
 * - Content-Type 默认 application/json
 */
const service: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseURL,
  timeout: appConfig.requestTimeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// ─── 请求拦截器 ───────────────────────────────────────

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as RequestConfig

    // 默认开启 Loading，可通过 loading:false 关闭
    if (customConfig.loading !== false) {
      showLoading()
    }

    // 自动附加 Bearer Token
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: any) => {
    hideLoading()
    ElMessage.error('请求错误：' + (error?.message || '未知错误'))
    return Promise.reject(error)
  },
)

// ─── 响应拦截器 ───────────────────────────────────────

service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    hideLoading()

    const responseBody = response.data
    const requestConfig = response.config as RequestConfig

    // 文件流 / 二进制直接透传原始响应
    if (
      response.config.responseType === 'blob' ||
      response.config.responseType === 'arraybuffer'
    ) {
      return response
    }

    // 业务成功：code === 200 或 0
    if (responseBody.code === 200 || responseBody.code === 0) {
      return responseBody.data
    }

    // 业务错误：可关闭自动提示
    if (requestConfig.showError !== false) {
      ElMessage.error(responseBody.message || '请求失败')
    }
    return Promise.reject(new Error(responseBody.message || '请求失败'))
  },
  (error: any) => {
    hideLoading()

    const requestConfig = error.config as RequestConfig

    // 按 HTTP 状态码生成可读错误文案
    let message = '请求失败'
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          removeToken()
          // 可在此处调用 router.push('/login') 跳到登录页
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求地址不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        case 502:
          message = '网关错误'
          break
        case 503:
          message = '服务不可用'
          break
        case 504:
          message = '网关超时'
          break
        default:
          message =
            error.response.data?.message ||
            `错误代码：${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出但未收到响应
      message = '网络连接失败，请检查网络'
    } else {
      // 构造请求时发生的错误
      message = error.message || '请求失败'
    }

    // 可关闭自动错误提示
    if (requestConfig?.showError !== false) {
      ElMessage.error(message)
    }

    return Promise.reject(error)
  },
)

export default service
