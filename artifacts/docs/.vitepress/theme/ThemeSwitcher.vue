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
        <div class="theme-grid">
          <button
            v-for="theme in themes"
            :key="theme.id"
            class="theme-option"
            :class="{ active: currentTheme === theme.id }"
            @click="setTheme(theme.id)"
          >
            <span class="swatch" :style="{ background: theme.color }">
              <span v-if="currentTheme === theme.id" class="swatch-check">✓</span>
            </span>
            <span class="theme-name">{{ theme.label }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const themes = [
  { id: 'cyan',    label: 'সায়ান',    color: 'linear-gradient(135deg, #00b4d8, #00d4ff)' },
  { id: 'blue',    label: 'নীল',      color: 'linear-gradient(135deg, #0369a1, #0ea5e9)' },
  { id: 'purple',  label: 'বেগুনি',   color: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
  { id: 'emerald', label: 'সবুজ',     color: 'linear-gradient(135deg, #059669, #10b981)' },
  { id: 'amber',   label: 'অ্যাম্বার', color: 'linear-gradient(135deg, #d97706, #f59e0b)' },
  { id: 'rose',    label: 'গোলাপি',   color: 'linear-gradient(135deg, #e11d48, #f43f5e)' },
]

const panelOpen = ref(false)
const currentTheme = ref('cyan')
const containerRef = ref<HTMLElement | null>(null)

function applyTheme(themeId: string) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', themeId)
}

function setTheme(themeId: string) {
  currentTheme.value = themeId
  applyTheme(themeId)
  try { localStorage.setItem('df-theme', themeId) } catch {}
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

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') panelOpen.value = false
}

onMounted(() => {
  try {
    const saved = localStorage.getItem('df-theme')
    if (saved && themes.find(t => t.id === saved)) {
      currentTheme.value = saved
      applyTheme(saved)
    }
  } catch {}
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEsc)
})
</script>

<style scoped>
.theme-switcher {
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 6px 0 2px;
}

.theme-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--glass-bg, rgba(22,27,34,0.55));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}
.theme-btn:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  transform: rotate(15deg);
}
.theme-icon { font-size: 16px; line-height: 1; }

.theme-panel {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--vp-c-bg-elv, var(--vp-c-bg-soft));
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  padding: 14px;
  width: 240px;
  max-width: calc(100vw - 24px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.18);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  z-index: 100;
}
.dark .theme-panel { box-shadow: 0 12px 40px rgba(0,0,0,0.5); }

.theme-panel-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin-bottom: 10px;
}

.theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 9px;
  border: 1.5px solid transparent;
  background: transparent;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 600;
  text-align: left;
}
.theme-option:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}
.theme-option.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.swatch {
  width: 22px; height: 22px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 0 0 2px var(--vp-c-bg);
}
.swatch-check { text-shadow: 0 1px 2px rgba(0,0,0,0.5); }

.theme-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}

/* ── Mobile: pin panel to right edge with viewport guard ── */
@media (max-width: 768px) {
  .theme-switcher { margin: 0 4px; }
  .theme-panel {
    width: 260px;
    right: -8px;
  }
}
@media (max-width: 480px) {
  .theme-panel {
    position: fixed;
    top: 64px;
    right: 12px;
    left: 12px;
    width: auto;
    max-width: none;
  }
}
</style>
