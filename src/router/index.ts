/**
 * 应用路由配置
 *
 * 采用 Vue Router Hash 模式，所有页面均懒加载。
 * 通过全局前置守卫自动更新 document.title。
 *
 * @module router
 */

import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

/** 路由表 */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About/index.vue'),
    meta: {
      title: '关于',
    },
  },
  {
    path: '/counter',
    name: 'Counter',
    component: () => import('@/views/Counter/index.vue'),
    meta: {
      title: '计数器示例',
    },
  },
  {
    path: '/api-example',
    name: 'ApiExample',
    component: () => import('@/views/ApiExample/index.vue'),
    meta: {
      title: 'API 示例',
    },
  },
  {
    // 通配符路由，匹配所有未定义路径
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/ErrorViewsContent/NotFound.vue'),
    meta: {
      title: '404',
    },
  },
]

/** 路由实例 */
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

/**
 * 全局前置守卫
 *
 * - 自动将 `路由.meta.title` 拼接为页面标题
 * - 无条件放行（不在此处做权限校验）
 */
router.beforeEach((to, previousRoute, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue3 App`
  }
  next()
})

export default router
