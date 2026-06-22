<!--
  默认布局组件
  提供"头部导航 + 内容区 + 可选底部"的三段式页面骨架。
  使用 Element Plus 的 Container / Header / Main / Footer 组件构建。
-->
<template>
  <div class="layout-container">
    <el-container>
      <!-- 顶部导航栏（sticky 吸附） -->
      <el-header class="layout-header">
        <div class="header-content">
          <div class="logo">
            <h2>Vue3 App</h2>
          </div>
          <!-- 导航菜单，router 属性启用路由跳转 -->
          <el-menu
            mode="horizontal"
            :default-active="route.path"
            router
            class="header-menu"
          >
            <el-menu-item index="/">
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <span>关于</span>
            </el-menu-item>
            <el-menu-item index="/counter">
              <span>计数器</span>
            </el-menu-item>
            <el-menu-item index="/api-example">
              <span>API 示例</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <!-- 主内容区，通过 RouterView 渲染匹配的页面组件 -->
      <el-main class="layout-main">
        <RouterView />
      </el-main>

      <!-- 底部（可通过 showFooter prop 控制显隐） -->
      <el-footer class="layout-footer" v-if="showFooter">
        <div class="footer-content">
          <p>&copy; 2024 Vue3 App. All rights reserved.</p>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router'

/**
 * 组件 Props 定义
 */
defineProps<{
  /** 是否显示底部版权栏 */
  showFooter?: boolean
}>()

/** 当前路由对象，用于菜单高亮 */
const route = useRoute()
</script>

<style lang="scss" scoped>
/* ── 布局容器 ────────────────────────────── */
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── 头部 ────────────────────────────────── */
.layout-header {
  padding: 0;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    .logo {
      h2 {
        margin: 0;
        color: $primary-color;
        font-size: 20px;
        font-weight: 600;
      }
    }

    .header-menu {
      border-bottom: none;
      flex: 1;
      justify-content: flex-end;
    }
  }
}

/* ── 主内容区 ────────────────────────────── */
.layout-main {
  padding: 20px;
  background-color: #f5f5f5;
  flex: 1;
  min-height: calc(100vh - 60px);
}

/* ── 底部 ────────────────────────────────── */
.layout-footer {
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  padding: 20px 0;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;

    p {
      margin: 0;
      color: #909399;
      font-size: 14px;
    }
  }
}
</style>
