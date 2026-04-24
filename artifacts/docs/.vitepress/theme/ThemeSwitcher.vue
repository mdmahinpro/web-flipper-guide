<template>
  <div class="theme-switcher" ref="containerRef">
    <button
      class="theme-btn"
      @click="togglePanel"
      :title="'থিম পরিবর্তন করুন'"
      :aria-label="'থিম পরিবর্তন করুন'"
    >
      <span class="theme-icon">🎨</span>
    </button>
    <Transition name="panel">
      <div v-if="panelOpen" class="theme-panel">
        <div class="theme-panel-title">থিম বেছে নিন</div>
        <div class="theme-swatches">
          <button
            v-for="theme in themes"
            :key="theme.id"
            class="swatch"
            :class="{ active: currentTheme === theme.id }"
            :style="{ background: theme.color }"
            :title="theme.label"
            @click="setTheme(theme.id)"
          >
            <span v-if="currentTheme === theme.id" class="swatch-check">✓</span>
          </button>
        </div>
        <div class="theme-labels">
          <span
            v-for="theme in themes"
            :key="theme.id + '-label'"
            class="theme-label"
            :class="{ active: currentTheme === theme.id }"
            @click="setTheme(theme.id)"
          >{{ theme.label }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const themes = [
  { id: 'teal', label: 'টিল', color: 'linear-gradient(135deg, #0d9488, #06b6d4)' },
  { id: 'blue', label: 'নীল', color: 'linear-gradient(135deg, #0369a1, #0ea5e9)' },
  { id: 'purple', label: 'বেগুনি', color: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
  { id: 'amber', label: 'অ্যাম্বার', color: 'linear-gradient(135deg, #d97706, #f59e0b)' },
  { id: 'emerald', label: 'সবুজ', color: 'linear-gradient(135deg, #059669, #10b981)' },
  { id: 'rose', label: 'গোলাপি', color: 'linear-gradient(135deg, #e11d48, #f43f5e)' },
]

const panelOpen = ref(false)
const currentTheme = ref('teal')
const containerRef = ref<HTMLElement | null>(null)

function applyTheme(themeId: string) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', themeId)
}

function setTheme(themeId: string) {
  currentTheme.value = themeId
  applyTheme(themeId)
  try { localStorage.setItem('dfm-theme', themeId) } catch {}
  panelOpen.value = false
}

function togglePanel() {
  panelOpen.value = !panelOpen.value
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    panelOpen.value = false
  }
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('dfm-theme')
    if (saved && themes.find(t => t.id === saved)) {
      currentTheme.value = saved
      applyTheme(saved)
    }
  } catch {}
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.theme-switcher {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 4px;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.theme-btn:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
}

.theme-icon {
  font-size: 16px;
  line-height: 1;
}

.theme-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 14px;
  min-width: 180px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  z-index: 1000;
  backdrop-filter: blur(12px);
}

.dark .theme-panel {
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.theme-panel-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.theme-swatches {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.swatch:hover {
  transform: scale(1.15);
  border-color: var(--vp-c-text-1);
}

.swatch.active {
  border-color: var(--vp-c-text-1);
  box-shadow: 0 0 0 2px var(--vp-c-bg), 0 0 0 4px var(--vp-c-text-2);
}

.swatch-check {
  font-size: 10px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.theme-labels {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.theme-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.15s;
  white-space: nowrap;
}

.theme-label:hover,
.theme-label.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.97);
}
</style>
