/**
 * 计数器 Store（Pinia 组合式 API 风格示例）
 *
 * 演示了状态、计算属性、同步/异步 Action 的标准写法，
 * 可直接复制为其他 Store 的模板。
 *
 * @module stores/counter
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 计数器 Store
 *
 * 使用组合式 API 风格（setup 语法），所有响应式状态和方法集中导出。
 */
export const useCounterStore = defineStore('counter', () => {
  // ─── 响应式状态 ──────────────────────────────────

  /** 当前计数 */
  const count = ref(0)

  /** Store 名称（演示用） */
  const name = ref('Pinia Store')

  // ─── 计算属性 ────────────────────────────────────

  /** 双倍计数 */
  const doubleCount = computed(() => count.value * 2)

  // ─── 同步 Actions ────────────────────────────────

  /** 计数 +1 */
  function increment(): void {
    count.value++
  }

  /** 计数 -1 */
  function decrement(): void {
    count.value--
  }

  /** 重置计数为 0 */
  function reset(): void {
    count.value = 0
  }

  /** 手动设置计数值 */
  function setCount(value: number): void {
    count.value = value
  }

  /**
   * 计算两数之和（示例工具方法）
   *
   * @param firstNumber - 第一个加数
   * @param secondNumber - 第二个加数
   * @returns 两数之和
   */
  function addNumbers(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber
  }

  // ─── 异步 Actions ────────────────────────────────

  /**
   * 模拟异步数据请求
   *
   * @returns 加载结果字符串
   */
  async function fetchData(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('数据加载成功')
      }, 1000)
    })
  }

  // ─── 导出 ────────────────────────────────────────

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
