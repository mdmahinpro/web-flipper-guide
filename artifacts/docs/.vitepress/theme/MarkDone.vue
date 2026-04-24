<template>
  <div v-if="isChapterPage" class="mark-done-wrap">
    <button
      class="mark-done-btn"
      :class="{ done: isDone }"
      @click="handleToggle"
    >
      <span class="mark-done-icon">{{ isDone ? '✅' : '○' }}</span>
      <span>{{ isDone ? 'সম্পন্ন হয়েছে' : 'সম্পন্ন করুন' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useProgress, normalizePath } from './useProgress'

const { page } = useData()
const { isCompleted, toggle } = useProgress()

const currentPath = computed(() => {
  const p = '/' + (page.value.relativePath || '').replace(/\.md$/, '')
  return normalizePath(p)
})

const isChapterPage = computed(() => currentPath.value.includes('/chapter-'))

const isDone = computed(() => isCompleted(currentPath.value))

function handleToggle() {
  toggle(currentPath.value)
}
</script>
