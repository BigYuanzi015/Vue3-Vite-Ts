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
            <el-button type="primary" @click="handleGetUserList" :loading="loading">
              获取用户列表
            </el-button>
            <el-button type="success" @click="handleGetUserDetail" :loading="loading">
              获取用户详情
            </el-button>
          </div>

          <!-- POST 请求示例 -->
          <div>
            <h3>POST 请求示例</h3>
            <el-button type="primary" @click="handleCreateUser" :loading="loading">
              创建用户
            </el-button>
            <el-button type="warning" @click="handleLogin" :loading="loading">
              登录
            </el-button>
          </div>

          <!-- 不显示 Loading 的请求 -->
          <div>
            <h3>不显示 Loading 的请求</h3>
            <el-button @click="handleRequestWithoutLoading" :loading="loading">
              静默请求
            </el-button>
          </div>

          <!-- 不显示错误提示的请求 -->
          <div>
            <h3>不显示错误提示的请求</h3>
            <el-button type="danger" @click="handleRequestWithoutError" :loading="loading">
              静默错误处理
            </el-button>
          </div>

          <!-- 鉴权工具函数示例 -->
          <div>
            <h3>鉴权工具函数示例</h3>
            <el-space wrap>
              <el-button @click="handleGetAuthInfo" :loading="loading">
                获取认证信息
              </el-button>
              <el-button type="warning" @click="handleLogout" :loading="loading">
                登出
              </el-button>
              <el-button type="info" @click="handleCheckLogin" :loading="loading">
                检查登录状态
              </el-button>
            </el-space>
          </div>

          <!-- 响应数据展示 -->
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
import { getUserList, getUserDetail, createUser, login } from '@/api'
import { login as authLogin, logout, getToken, getUserInfo, isLoggedIn } from '@/utils/auth'

const loading = ref(false)
const responseData = ref('')

// GET 请求示例 - 获取用户列表
async function handleGetUserList() {
  try {
    loading.value = true
    const data = await getUserList({ page: 1, pageSize: 10 })
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('获取用户列表成功')
  } catch (error) {
    console.error('获取用户列表失败:', error)
  } finally {
    loading.value = false
  }
}

// GET 请求示例 - 获取用户详情
async function handleGetUserDetail() {
  try {
    loading.value = true
    const data = await getUserDetail(1)
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('获取用户详情成功')
  } catch (error) {
    console.error('获取用户详情失败:', error)
  } finally {
    loading.value = false
  }
}

// POST 请求示例 - 创建用户
async function handleCreateUser() {
  try {
    loading.value = true
    const data = await createUser({
      username: 'test_user',
      email: 'test@example.com',
    })
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('创建用户成功')
  } catch (error) {
    console.error('创建用户失败:', error)
  } finally {
    loading.value = false
  }
}

// POST 请求示例 - 登录
async function handleLogin() {
  try {
    loading.value = true
    const data = await login('admin', '123456')
    responseData.value = JSON.stringify(data, null, 2)
    // 使用鉴权工具函数保存 token 和用户信息
    if (data.token && data.userInfo) {
      authLogin(data.token, data.userInfo)
      ElMessage.success('登录成功')
    }
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}

// 不显示 Loading 的请求
async function handleRequestWithoutLoading() {
  try {
    const data = await getUserList({ page: 1, pageSize: 10 }, { loading: false })
    responseData.value = JSON.stringify(data, null, 2)
    ElMessage.success('请求成功（无 Loading）')
  } catch (error) {
    console.error('请求失败:', error)
  }
}

// 不显示错误提示的请求
async function handleRequestWithoutError() {
  try {
    // 故意请求一个不存在的接口
    const { get } = await import('@/api/request')
    await get('/nonexistent', { showError: false })
  } catch (error) {
    responseData.value = '错误已捕获，但未显示提示'
    ElMessage.info('错误已静默处理')
  }
}

// 获取认证信息
function handleGetAuthInfo() {
  const token = getToken()
  const userInfo = getUserInfo()
  responseData.value = JSON.stringify(
    {
      token,
      userInfo,
      isLoggedIn: isLoggedIn(),
    },
    null,
    2
  )
  ElMessage.success('认证信息已获取')
}

// 登出
function handleLogout() {
  logout()
  responseData.value = '已登出，认证信息已清除'
  ElMessage.success('登出成功')
}

// 检查登录状态
function handleCheckLogin() {
  const loggedIn = isLoggedIn()
  responseData.value = JSON.stringify(
    {
      isLoggedIn: loggedIn,
      message: loggedIn ? '已登录' : '未登录',
    },
    null,
    2
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
