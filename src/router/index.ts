import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home/index.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About/index.vue"),
    meta: {
      title: "关于",
    },
  },
  {
    path: "/counter",
    name: "Counter",
    component: () => import("@/views/Counter/index.vue"),
    meta: {
      title: "计数器示例",
    },
  },
  {
    path: "/api-example",
    name: "ApiExample",
    component: () => import("@/views/ApiExample/index.vue"),
    meta: {
      title: "API 示例",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/ErrorViewsContent/NotFound.vue"),
    meta: {
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由守卫示例
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue3 App`;
  }
  next();
});

export default router;
