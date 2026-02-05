import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0)
  const name = ref('Pinia Store')

  // 计算属性
  const doubleCount = computed(() => count.value * 2)

  // 方法
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  function setCount(value: number) {
    count.value = value
  }

  // 样例函数：计算两个数的和
  function addNumbers(a: number, b: number): number {
    return a + b
  }

  // 样例函数：异步获取数据
  async function fetchData(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('数据加载成功')
      }, 1000)
    })
  }

  return {
    // 状态
    count,
    name,
    // 计算属性
    doubleCount,
    // 方法
    increment,
    decrement,
    reset,
    setCount,
    addNumbers,
    fetchData,
  }
})
