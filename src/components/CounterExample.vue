<template>
  <div class="counter-example">
    <h2>Pinia Store 使用示例</h2>
    <div class="info">
      <p>Store 名称: {{ counterStore.name }}</p>
      <p>当前计数: {{ counterStore.count }}</p>
      <p>双倍计数: {{ counterStore.doubleCount }}</p>
    </div>
    
    <div class="buttons">
      <el-button type="primary" @click="counterStore.increment">增加</el-button>
      <el-button type="danger" @click="counterStore.decrement">减少</el-button>
      <el-button @click="counterStore.reset">重置</el-button>
      <el-button type="success" @click="handleSetCount">设置为 10</el-button>
    </div>

    <div class="example-functions">
      <h3>样例函数演示</h3>
      <el-button type="info" @click="testAddNumbers">测试 addNumbers(5, 3)</el-button>
      <el-button type="warning" @click="testFetchData">测试 fetchData</el-button>
      <p v-if="result">结果: {{ result }}</p>
      <p v-if="loading">加载中...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
const result = ref<string>('')
const loading = ref(false)

// 使用样例函数：设置计数
function handleSetCount() {
  counterStore.setCount(10)
}

// 使用样例函数：计算两个数的和
function testAddNumbers() {
  const sum = counterStore.addNumbers(5, 3)
  result.value = `addNumbers(5, 3) = ${sum}`
}

// 使用样例函数：异步获取数据
async function testFetchData() {
  loading.value = true
  result.value = ''
  try {
    const data = await counterStore.fetchData()
    result.value = data
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.counter-example {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

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

.buttons {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

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
