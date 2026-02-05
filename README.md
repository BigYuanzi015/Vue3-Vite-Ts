# Vue3 + Vite + TypeScript 项目

一个基于 Vue 3、Vite 和 TypeScript 的现代化前端项目模板，集成了 Element Plus、Pinia、Vue Router、Axios 等常用工具库。

## ✨ 特性

- ⚡️ **Vue 3** - 使用 `<script setup>` 语法
- 🔷 **TypeScript** - 完整的类型支持
- 🚀 **Vite** - 极速的开发体验
- 🎨 **Element Plus** - 企业级 UI 组件库（中文配置）
- 📦 **Pinia** - 新一代状态管理
- 🧭 **Vue Router** - 官方路由管理器（Hash 模式）
- 🌐 **Axios** - HTTP 请求库（含拦截器、全局 Loading）
- 🎯 **Tailwind CSS** - 实用优先的 CSS 框架
- 💅 **SCSS** - CSS 预处理器
- 🔐 **鉴权工具** - Token 和用户信息管理
- 📊 **打包优化** - 代码分割、压缩、资源优化

## 📦 技术栈

### 核心框架
- **Vue** ^3.5.24
- **TypeScript** ~5.9.3
- **Vite** (rolldown-vite@7.2.5)

### UI 框架
- **Element Plus** ^2.13.2
- **Tailwind CSS** ^3.4.14

### 状态管理与路由
- **Pinia** ^2.2.8
- **Vue Router** ^4.4.5

### 工具库
- **Axios** ^1.7.9
- **SCSS** ^1.83.0

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173)

### 生产构建

```bash
# 标准构建
npm run build

# 生产环境构建
npm run build:prod

# 构建并分析打包结果
npm run build:analyze
```

### 预览构建结果

```bash
npm run preview
```

## 📁 项目结构

```
vue3-vite-ts/
├── build/                  # 构建相关配置
│   ├── optimize.ts        # 构建优化工具函数
│   └── README.md          # 构建说明文档
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   │   ├── index.ts       # API 统一导出
│   │   ├── request.ts     # 请求封装
│   │   ├── types.ts       # API 类型定义
│   │   └── user.ts        # 用户相关 API
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   ├── config/            # 配置文件
│   │   ├── axios.ts      # Axios 配置
│   │   └── index.ts      # 应用配置
│   ├── layouts/           # 布局组件
│   │   └── DefaultLayout.vue
│   ├── router/            # 路由配置
│   │   └── index.ts
│   ├── stores/            # Pinia 状态管理
│   │   └── counter.ts
│   ├── styles/            # 样式文件
│   │   ├── global.scss   # 全局样式
│   │   └── variables.scss # SCSS 变量
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   │   ├── auth.ts       # 鉴权工具
│   │   └── index.ts      # 工具函数导出
│   ├── views/             # 页面组件
│   │   ├── Home/         # 首页
│   │   ├── About/        # 关于页
│   │   ├── Counter/      # 计数器示例
│   │   ├── ApiExample/   # API 示例
│   │   └── ErrorViewsContent/ # 错误页面
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js     # PostCSS 配置
├── tailwind.config.js    # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── README.md
```

## 🎯 功能说明

### 路由配置

项目使用 Vue Router Hash 模式，路由配置在 `src/router/index.ts`：

- `/` - 首页
- `/about` - 关于页面
- `/counter` - 计数器示例
- `/api-example` - API 请求示例
- `/*` - 404 页面

### 状态管理

使用 Pinia 进行状态管理，示例 Store 位于 `src/stores/counter.ts`。

### HTTP 请求

#### 配置说明

- **请求拦截器**：自动添加 Token、显示 Loading
- **响应拦截器**：统一处理响应、错误处理
- **全局 Loading**：请求计数机制，避免重复显示
- **错误处理**：自动显示错误提示（可配置）

#### 使用示例

```typescript
import { getUserList, createUser } from '@/api'

// GET 请求
const users = await getUserList({ page: 1, pageSize: 10 })

// POST 请求
const newUser = await createUser({ username: 'test', email: 'test@example.com' })

// 自定义配置
import { get } from '@/api/request'
const data = await get('/api/users', { loading: false, showError: false })
```

### 鉴权工具

提供了完整的鉴权工具函数，位于 `src/utils/auth.ts`：

```typescript
import { login, logout, getToken, getUserInfo, isLoggedIn } from '@/utils/auth'

// 登录
login('token_string', userInfo)

// 获取 Token
const token = getToken()

// 获取用户信息
const userInfo = getUserInfo()

// 检查登录状态
if (isLoggedIn()) {
  console.log('已登录')
}

// 登出
logout()
```

### 样式系统

#### SCSS 变量

全局 SCSS 变量定义在 `src/styles/variables.scss`，可在所有组件中直接使用：

```scss
.my-component {
  color: $primary-color;
  padding: $spacing-md;
  font-size: $font-size-large;
}
```

#### Tailwind CSS

项目已配置 Tailwind CSS，可直接使用工具类：

```vue
<template>
  <div class="flex items-center justify-center p-4 bg-blue-500">
    <h1 class="text-2xl font-bold text-white">Hello Tailwind!</h1>
  </div>
</template>
```

### Element Plus

Element Plus 已配置为中文，所有组件默认显示中文。

## ⚙️ 配置说明

### 环境变量

创建 `.env` 文件配置环境变量：

```env
# API 基础地址
VITE_API_BASE_URL=/api
```

### Vite 配置

主要配置项：

- **代理配置**：`/api` 代理到 `http://localhost:3000`
- **路径别名**：`@` 指向 `src` 目录
- **SCSS 变量**：自动注入全局变量

### 打包优化

项目已配置完整的打包优化：

- ✅ 代码分割（Vue、Element Plus、Axios 等单独打包）
- ✅ 资源分类（图片、字体、媒体文件分类管理）
- ✅ 文件压缩（JavaScript、CSS）
- ✅ 依赖预构建
- ✅ 生产环境移除 console 和 debugger（需配置 terser）

详细说明请查看 [build/README.md](./build/README.md)

## 🔧 开发规范

### 代码风格

- 使用 `<script setup>` 语法
- 使用 TypeScript 进行类型约束
- 组件使用 PascalCase 命名
- 工具函数使用 camelCase 命名

### 文件命名

- 组件文件：PascalCase（如 `UserProfile.vue`）
- 工具文件：camelCase（如 `auth.ts`）
- 页面组件：放在 `views` 目录下，每个路由一个文件夹

### 路由结构

每个路由对应的页面组件都放在独立的文件夹中：

```
views/
├── Home/
│   └── index.vue
├── About/
│   └── index.vue
└── ...
```

## 📝 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build
npm run build:prod

# 构建分析
npm run build:analyze

# 预览
npm run preview
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 🙏 致谢

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Element Plus](https://element-plus.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
