<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  stats?: Array<{ number: string; label: string; prefix?: string; suffix?: string }>
}>()

const defaultStats = [
  { number: '35', suffix: 'কোটি+', label: 'রেজিস্টার্ড Domain' },
  { number: '239', prefix: '$', suffix: 'হাজার', label: '.ai-এর গড় বিক্রয় মূল্য' },
  { number: '80', suffix: 'হাজার+', label: 'প্রতিদিন Expire হয়' },
  { number: '10', suffix: '×', label: 'গড় Return সম্ভব' },
]

const displayStats = props.stats || defaultStats
const animated = ref(false)

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { animated.value = true; obs.disconnect() }
  }, { threshold: 0.2 })
  const el = document.querySelector('.stat-grid-comp')
  if (el) obs.observe(el)
  else animated.value = true
})
</script>

<template>
  <div class="stat-grid stat-grid-comp">
    <div
      v-for="(s, i) in displayStats"
      :key="i"
      class="stat-card"
      :style="{ animationDelay: `${i * 0.1}s`, animation: animated ? 'fade-up 0.5s ease both' : 'none' }"
    >
      <div class="stat-number">
        <span v-if="s.prefix">{{ s.prefix }}</span>{{ s.number }}<span v-if="s.suffix" style="font-size:1.1rem">{{ s.suffix }}</span>
      </div>
      <div class="stat-label">{{ s.label }}</div>
    </div>
  </div>
</template>
