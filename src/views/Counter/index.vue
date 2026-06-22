<!--
  计数器页面视图
  挂载 CounterExample 组件演示 Pinia Store 的用法。
-->
<template>
  <div class="counter-page">
    <h1>计数器示例页面</h1>
    <!-- 计数器核心组件 -->
    <CounterExample />
    <el-button type="primary" @click="handleNavigateToHome" style="margin-top: 20px">
      返回首页
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CounterExample from '@/components/CounterExample.vue'

/** 路由实例 */
const router = useRouter()

/** 返回首页 */
function handleNavigateToHome(): void {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.counter-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: $primary-color;
  }
}
</style>
