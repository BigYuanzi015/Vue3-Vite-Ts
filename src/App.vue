<!--
  根组件
  挂载 DefaultLayout 作为全局布局壳，包裹所有页面路由内容。
-->
<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>

<template>
  <div id="app">
    <!-- showFooter 控制底部是否展示 -->
    <DefaultLayout :show-footer="true" />
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
}
</style>
