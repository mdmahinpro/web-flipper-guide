import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'df-progress'
const TOTAL_CHAPTERS = 17

function loadCompleted(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw))
  } catch {
    return new Set()
  }
}

function saveCompleted(set: Set<string>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
}

const completed = ref<Set<string>>(new Set())
let _initialized = false

export function initProgress() {
  if (typeof window === 'undefined' || _initialized) return
  _initialized = true
  completed.value = loadCompleted()
  window.addEventListener('df-progress-change', () => {
    completed.value = loadCompleted()
  })
}

export function useProgress() {
  const completedCount = computed(() => completed.value.size)
  const totalChapters = TOTAL_CHAPTERS
  const percent = computed(() =>
    Math.round((completed.value.size / TOTAL_CHAPTERS) * 100)
  )

  function isCompleted(path: string) {
    return completed.value.has(normalizePath(path))
  }

  function toggle(path: string) {
    const key = normalizePath(path)
    const next = new Set(completed.value)
    if (next.has(key)) {
      next.delete(key)
    } else {
      next.add(key)
    }
    completed.value = next
    saveCompleted(next)
    window.dispatchEvent(new Event('df-progress-change'))
  }

  return { completed, completedCount, totalChapters, percent, isCompleted, toggle }
}

export function normalizePath(path: string): string {
  return path.replace(/\/$/, '').replace(/^\/+/, '/')
}
