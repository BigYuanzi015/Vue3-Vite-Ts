<template>
  <div class="about">
    <h1>关于页面</h1>
    <el-card class="box-card">
      <div class="content">
        <h2>项目信息</h2>
        <ul>
          <li>Vue 3 - 渐进式 JavaScript 框架</li>
          <li>Vite - 下一代前端构建工具</li>
          <li>TypeScript - JavaScript 的超集</li>
          <li>Element Plus - Vue 3 组件库</li>
          <li>Pinia - Vue 状态管理</li>
          <li>Vue Router - Vue.js 官方路由管理器</li>
        </ul>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.about {
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

  .content {
    h2 {
      margin-bottom: 20px;
      color: $info-color;
    }

    ul {
      margin: 20px 0;
      padding-left: 30px;

      li {
        margin: 10px 0;
        font-size: 16px;
        line-height: 1.8;
      }
    }

    .el-button {
      margin-top: 20px;
    }
  }
}
</style>
