<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Vue3 + Vite + TypeScript</span>
        </div>
      </template>
      <div class="content">
        <p>这是一个使用 Vue Router 的示例页面</p>
        <el-button type="primary" @click="goToAbout">前往关于页面</el-button>
        <el-button type="success" @click="goToCounter">前往计数器页面</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToAbout() {
  router.push('/about')
}

function goToCounter() {
  router.push('/counter')
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  max-width: 800px;
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
    p {
      margin-bottom: 20px;
      font-size: 16px;
    }

    .el-button {
      margin-right: 10px;
    }
  }
}
</style>
