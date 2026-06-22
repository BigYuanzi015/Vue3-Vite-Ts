<!--
  404 未找到页面
  使用 Element Plus 的 Result 组件展示友好的错误提示，
  并提供"返回首页"与"返回上一页"两个操作入口。
-->
<template>
  <div class="not-found">
    <el-result icon="error" title="404" sub-title="抱歉，您访问的页面不存在">
      <template #extra>
        <el-button type="primary" @click="handleNavigateToHome">
          返回首页
        </el-button>
        <el-button @click="handleNavigateBack">
          返回上一页
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

/** 路由实例 */
const router = useRouter()

/** 返回首页 */
function handleNavigateToHome(): void {
  router.push('/')
}

/** 返回浏览器历史记录的上一页 */
function handleNavigateBack(): void {
  router.back()
}
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 20px;
}
</style>
