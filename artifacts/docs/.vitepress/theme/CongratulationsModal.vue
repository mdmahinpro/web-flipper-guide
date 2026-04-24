<template>
  <Teleport to="body">
    <Transition name="congrats">
      <div v-if="visible" class="congrats-overlay" @click.self="close">
        <div class="congrats-modal" role="dialog" aria-modal="true" aria-labelledby="congrats-title">
          <div class="congrats-confetti" aria-hidden="true">
            <span v-for="i in 18" :key="i" class="confetti-dot" :style="confettiStyle(i)" />
          </div>

          <div class="congrats-trophy">🏆</div>

          <h2 id="congrats-title" class="congrats-title">অভিনন্দন!</h2>

          <p class="congrats-subtitle">আপনি সমস্ত ১৭টি অধ্যায় সম্পন্ন করেছেন!</p>

          <p class="congrats-body">
            আপনার অধ্যবসায় ও পরিশ্রম সত্যিই অসাধারণ। ডোমেইন ফ্লিপিং মাস্টারক্লাসের
            পুরো কোর্সটি শেষ করে আপনি এখন একজন দক্ষ ডোমেইন ফ্লিপার হওয়ার পথে।
            এগিয়ে যান — সাফল্য আপনার জন্য অপেক্ষা করছে! 🚀
          </p>

          <div class="congrats-actions">
            <a
              class="congrats-btn congrats-btn-primary"
              href="/"
            >
              হোম পেজে ফিরুন
            </a>
            <button class="congrats-btn congrats-btn-secondary" @click="close">
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useProgress } from './useProgress'

const CONGRATS_KEY = 'df-congrats-shown'

const { completedCount, totalChapters } = useProgress()
const visible = ref(false)

function close() {
  visible.value = false
}

watch(completedCount, (count, prev) => {
  if (count >= totalChapters) {
    const alreadyShown = localStorage.getItem(CONGRATS_KEY) === 'true'
    if (!alreadyShown) {
      visible.value = true
      localStorage.setItem(CONGRATS_KEY, 'true')
    }
  } else if (prev >= totalChapters) {
    localStorage.removeItem(CONGRATS_KEY)
  }
})

function confettiStyle(i: number) {
  const angle = (i / 18) * 360
  const radius = 80 + (i % 3) * 24
  const x = Math.cos((angle * Math.PI) / 180) * radius
  const y = Math.sin((angle * Math.PI) / 180) * radius
  const hue = (i * 27) % 360
  const delay = (i * 0.07).toFixed(2)
  const size = 6 + (i % 4) * 3
  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    width: `${size}px`,
    height: `${size}px`,
    background: `hsl(${hue}, 85%, 60%)`,
    animationDelay: `${delay}s`,
  }
}
</script>
