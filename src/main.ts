/**
 * 应用入口文件
 *
 * 按顺序完成 Vue 实例创建 → 插件注册 → 挂载 DOM 的初始化流程。
 *
 * @module main
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from '@/router'
import '@/styles/global.scss'
import App from './App.vue'

/** 创建 Vue 应用实例 */
const app = createApp(App)

/** Pinia 状态管理实例 */
const pinia = createPinia()

// 注册插件（顺序无关）
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn, // Element Plus 中文语言包
})

// 挂载到 #app 根节点
app.mount('#app')
