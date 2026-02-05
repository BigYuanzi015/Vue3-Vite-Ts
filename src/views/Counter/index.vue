<template>
  <div class="counter-page">
    <h1>计数器示例页面</h1>
    <CounterExample />
    <el-button type="primary" @click="goHome" style="margin-top: 20px">
      返回首页
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import CounterExample from '@/components/CounterExample.vue'

const router = useRouter()

function goHome() {
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
