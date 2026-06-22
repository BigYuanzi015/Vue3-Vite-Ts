<!--
  Pinia Store 使用示例组件
  演示 store 状态的读写、同步/异步 Action 调用等常见模式。
-->
<template>
  <div class="counter-example">
    <h2>Pinia Store 使用示例</h2>

    <!-- 状态展示 -->
    <div class="info">
      <p>Store 名称: {{ counterStore.name }}</p>
      <p>当前计数: {{ counterStore.count }}</p>
      <p>双倍计数: {{ counterStore.doubleCount }}</p>
    </div>

    <!-- 基础 Action 操作按钮 -->
    <div class="buttons">
      <el-button type="primary" @click="counterStore.increment">增加</el-button>
      <el-button type="danger" @click="counterStore.decrement">减少</el-button>
      <el-button @click="counterStore.reset">重置</el-button>
      <el-button type="success" @click="handleSetCount">设置为 10</el-button>
    </div>

    <!-- 示例方法演示区 -->
    <div class="example-functions">
      <h3>样例函数演示</h3>
      <el-button type="info" @click="handleTestAddNumbers">
        测试 addNumbers(5, 3)
      </el-button>
      <el-button type="warning" @click="handleTestFetchData">
        测试 fetchData
      </el-button>
      <p v-if="resultMessage">结果: {{ resultMessage }}</p>
      <p v-if="isLoading">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

/** 计数器 Store 实例 */
const counterStore = useCounterStore()

/** 操作结果展示文本 */
const resultMessage = ref<string>('')

/** 加载状态标记 */
const isLoading = ref(false)

/** 调用 setCount 方法将计数设为 10 */
function handleSetCount(): void {
  counterStore.setCount(10)
}

/** 调用 addNumbers(5, 3) 并展示结果 */
function handleTestAddNumbers(): void {
  const sum = counterStore.addNumbers(5, 3)
  resultMessage.value = `addNumbers(5, 3) = ${sum}`
}

/** 调用 fetchData 模拟异步请求 */
async function handleTestFetchData(): Promise<void> {
  isLoading.value = true
  resultMessage.value = ''
  try {
    const data = await counterStore.fetchData()
    resultMessage.value = data
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* ── 容器 ────────────────────────────── */
.counter-example {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

/* ── 状态信息卡片 ─────────────────────── */
.info {
  margin: 20px 0;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.info p {
  margin: 8px 0;
  font-size: 16px;
}

/* ── 按钮组 ──────────────────────────── */
.buttons {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* ── 示例函数区 ───────────────────────── */
.example-functions {
  margin-top: 30px;
  padding: 15px;
  border-top: 1px solid #ddd;
}

.example-functions h3 {
  margin-bottom: 15px;
}

.example-functions p {
  margin-top: 10px;
  color: #666;
}
</style>
