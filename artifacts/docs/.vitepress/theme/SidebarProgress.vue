<template>
  <div style="display:none" aria-hidden="true"></div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, watch } from 'vue'
import { useRoute } from 'vitepress'
import { useProgress, normalizePath, initProgress } from './useProgress'

const route = useRoute()
const { isCompleted } = useProgress()

function decorateSidebar() {
  const links = document.querySelectorAll('.VPSidebarItem a.VPLink')
  links.forEach((el) => {
    const anchor = el as HTMLAnchorElement
    const href = normalizePath(anchor.getAttribute('href') || '')

    if (!href.includes('/chapter-')) return

    const existing = anchor.querySelector('.sidebar-check')
    if (existing) existing.remove()

    if (isCompleted(href)) {
      const check = document.createElement('span')
      check.className = 'sidebar-check'
      check.textContent = '✓'
      check.setAttribute('aria-label', 'সম্পন্ন')
      anchor.appendChild(check)
    }
  })
}

onMounted(() => {
  initProgress()
  decorateSidebar()
  window.addEventListener('df-progress-change', decorateSidebar)
})

onUpdated(() => {
  decorateSidebar()
})

watch(() => route.path, () => {
  setTimeout(decorateSidebar, 50)
})
</script>
