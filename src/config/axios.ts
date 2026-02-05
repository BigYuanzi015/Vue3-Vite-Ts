import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import { appConfig } from './index'
import { getToken, removeToken } from '@/utils/auth'

// 请求配置
export interface RequestConfig extends AxiosRequestConfig {
  loading?: boolean // 是否显示 loading
  showError?: boolean // 是否显示错误提示
}

// 响应数据格式
export interface ResponseData<T = any> {
  code: number
  message: string
  data: T
}

// Loading 实例
let loadingInstance: LoadingInstance | null = null
// 请求计数，用于控制 loading 显示
let requestCount = 0

// 显示 loading
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

// 隐藏 loading
const hideLoading = () => {
  requestCount--
  if (requestCount <= 0) {
    requestCount = 0
    loadingInstance?.close()
    loadingInstance = null
  }
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseURL,
  timeout: appConfig.requestTimeout,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 获取自定义配置
    const customConfig = config as RequestConfig
    
    // 显示 loading（默认显示）
    if (customConfig.loading !== false) {
      showLoading()
    }

    // 添加 token（如果有）
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
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    hideLoading()

    const res = response.data
    const config = response.config as RequestConfig

    // 如果响应数据是文件流等，直接返回
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
      return response
    }

    // 根据业务状态码处理
    if (res.code === 200 || res.code === 0) {
      return res.data
    } else {
      // 业务错误
      if (config.showError !== false) {
        ElMessage.error(res.message || '请求失败')
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error: any) => {
    hideLoading()

    const config = error.config as RequestConfig

    let message = '请求失败'
    if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 401:
          message = '未授权，请重新登录'
          // 清除认证信息并跳转到登录页
          removeToken()
          // router.push('/login')
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
          message = error.response.data?.message || `错误代码：${error.response.status}`
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message = '网络连接失败，请检查网络'
    } else {
      // 其他错误
      message = error.message || '请求失败'
    }

    if (config?.showError !== false) {
      ElMessage.error(message)
    }

    return Promise.reject(error)
  }
)

export default service
