<template>
  <div class="progress-widget" v-if="mounted">
    <div class="progress-header">
      <span class="progress-label">📖 আপনার অগ্রগতি</span>
      <span class="progress-count">{{ completedCount }} / {{ totalChapters }} অধ্যায়</span>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" :style="{ width: percent + '%' }"></div>
    </div>
    <div class="progress-footer">
      <span class="progress-percent">{{ percent }}% সম্পন্ন</span>
      <div class="reset-area">
        <button v-if="!confirming" class="reset-btn" @click="confirming = true">Reset Progress</button>
        <span v-else class="reset-confirm">
          <span class="reset-confirm-text">Are you sure?</span>
          <button class="reset-confirm-btn reset-confirm-yes" @click="handleReset">Yes, reset</button>
          <button class="reset-confirm-btn reset-confirm-no" @click="confirming = false">Cancel</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProgress, initProgress } from './useProgress'

const mounted = ref(false)
const confirming = ref(false)
const { completedCount, totalChapters, percent, resetProgress } = useProgress()

onMounted(() => {
  initProgress()
  mounted.value = true
})

function handleReset() {
  resetProgress()
  confirming.value = false
}
</script>
