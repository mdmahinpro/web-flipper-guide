<template>
  <div class="progress-widget" v-if="mounted">
    <div class="progress-header">
      <span class="progress-label">📖 আপনার অগ্রগতি</span>
      <span class="progress-count">{{ completedCount }} / {{ totalChapters }} অধ্যায়</span>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" :style="{ width: percent + '%' }"></div>
    </div>
    <div class="progress-percent">{{ percent }}% সম্পন্ন</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProgress, initProgress } from './useProgress'

const mounted = ref(false)
const { completedCount, totalChapters, percent } = useProgress()

onMounted(() => {
  initProgress()
  mounted.value = true
})
</script>
