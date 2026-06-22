<!--
  API 请求示例页面
  集中演示各类 HTTP 请求（GET / POST / PUT / DELETE）、Loading 控制、
  错误处理以及鉴权工具的使用方式。
-->
<template>
  <div class="api-example">
    <h1>API 请求示例</h1>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户 API 示例</span>
        </div>
      </template>

      <div class="content">
        <el-space direction="vertical" size="large" style="width: 100%">
          <!-- GET 请求示例 -->
          <div>
            <h3>GET 请求示例</h3>
            <el-button
              type="primary"
              @click="handleGetUserList"
              :loading="isLoading"
            >
              获取用户列表
            </el-button>
            <el-button
              type="success"
              @click="handleGetUserDetail"
              :loading="isLoading"
            >
              获取用户详情
            </el-button>
          </div>

          <!-- POST 请求示例 -->
          <div>
            <h3>POST 请求示例</h3>
            <el-button
              type="primary"
              @click="handleCreateUser"
              :loading="isLoading"
            >
              创建用户
            </el-button>
            <el-button
              type="warning"
              @click="handleLogin"
              :loading="isLoading"
            >
              登录
            </el-button>
          </div>

          <!-- 静默请求（不显示 Loading） -->
          <div>
            <h3>不显示 Loading 的请求</h3>
            <el-button @click="handleRequestWithoutLoading" :loading="isLoading">
              静默请求
            </el-button>
          </div>

          <!-- 静默错误处理（不弹出错误提示） -->
          <div>
            <h3>不显示错误提示的请求</h3>
            <el-button
              type="danger"
              @click="handleRequestWithoutError"
              :loading="isLoading"
            >
              静默错误处理
            </el-button>
          </div>

          <!-- 鉴权工具函数示例 -->
          <div>
            <h3>鉴权工具函数示例</h3>
            <el-space wrap>
              <el-button @click="handleGetAuthInfo" :loading="isLoading">
                获取认证信息
              </el-button>
              <el-button type="warning" @click="handleLogoutAction" :loading="isLoading">
                登出
              </el-button>
              <el-button type="info" @click="handleCheckLoginStatus" :loading="isLoading">
                检查登录状态
              </el-button>
            </el-space>
          </div>

          <!-- 响应数据展示区 -->
          <div v-if="responseData" class="response-data">
            <h3>响应数据：</h3>
            <el-input
              type="textarea"
              :rows="10"
              v-model="responseData"
              readonly
            />
          </div>
        </el-space>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  getUserList,
  getUserDetail,
  createUser,
  login,
} from '@/api'
import {
  login as authLogin,
  logout,
  getToken,
  getUserInfo,
  isLoggedIn,
} from '@/utils/auth'

/** 全局加载状态 */
const isLoading = ref(false)

/** 响应数据 JSON 文本 */
const responseData = ref('')

/**
 * GET 请求示例 - 获取用户分页列表
 */
async function handleGetUserList(): Promise<void> {
  try {
    isLoading.value = true
    const data = await getUserList({ page: 1, pageSize: 10 })
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('获取用户列表成功')
  } catch (error) {
    console.error('获取用户列表失败:', error)
  } finally {
    isLoading.value = false
  }
}

/**
 * GET 请求示例 - 获取单个用户详情
 */
async function handleGetUserDetail(): Promise<void> {
  try {
    isLoading.value = true
    const data = await getUserDetail(1)
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('获取用户详情成功')
  } catch (error) {
    console.error('获取用户详情失败:', error)
  } finally {
    isLoading.value = false
  }
}

/**
 * POST 请求示例 - 创建新用户
 */
async function handleCreateUser(): Promise<void> {
  try {
    isLoading.value = true
    const data = await createUser({
      username: 'test_user',
      email: 'test@example.com',
    })
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('创建用户成功')
  } catch (error) {
    console.error('创建用户失败:', error)
  } finally {
    isLoading.value = false
  }
}

/**
 * POST 请求示例 - 登录并保存凭证
 */
async function handleLogin(): Promise<void> {
  try {
    isLoading.value = true
    const data = await login('admin', '123456')
    responseData.value = JSON.stringify(data, null, 2)
    // 将登录返回的 token 与用户信息持久化
    if (data.token && data.userInfo) {
      authLogin(data.token, data.userInfo)
      ElMessage.success('登录成功')
    }
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    isLoading.value = false
  }
}

/**
 * 不显示 Loading 的请求示例
 */
async function handleRequestWithoutLoading(): Promise<void> {
  try {
    const data = await getUserList(
      { page: 1, pageSize: 10 },
      { loading: false },
    )
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('请求成功（无 Loading）')
  } catch (error) {
    console.error('请求失败:', error)
  }
}

/**
 * 静默错误处理示例
 * 请求一个不存在的接口，但不弹出错误提示。
 */
async function handleRequestWithoutError(): Promise<void> {
  try {
    const { get } = await import('@/api/request')
    await get('/nonexistent', { showError: false })
  } catch (error) {
    responseData.value = '错误已捕获，但未显示提示'
    ElMessage.info('错误已静默处理')
  }
}

/**
 * 获取当前认证信息并展示
 */
function handleGetAuthInfo(): void {
  const token = getToken()
  const userInfo = getUserInfo()
  responseData.value = JSON.stringify(
    {
      token,
      userInfo,
      isLoggedIn: isLoggedIn(),
    },
    null,
    2,
  )
  ElMessage.success('认证信息已获取')
}

/**
 * 执行登出操作
 */
function handleLogoutAction(): void {
  logout()
  responseData.value = '已登出，认证信息已清除'
  ElMessage.success('登出成功')
}

/**
 * 检查当前登录状态
 */
function handleCheckLoginStatus(): void {
  const loggedIn = isLoggedIn()
  responseData.value = JSON.stringify(
    {
      isLoggedIn: loggedIn,
      message: loggedIn ? '已登录' : '未登录',
    },
    null,
    2,
  )
  ElMessage.info(loggedIn ? '已登录' : '未登录')
}
</script>

<style lang="scss" scoped>
.api-example {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: $primary-color;
  }

  .box-card {
    margin-top: 20px;
  }

  .card-header {
    font-weight: bold;
    font-size: 18px;
  }

  .content {
    h3 {
      margin-bottom: 10px;
      color: $info-color;
      font-size: 16px;
    }

    .response-data {
      margin-top: 20px;

      h3 {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
