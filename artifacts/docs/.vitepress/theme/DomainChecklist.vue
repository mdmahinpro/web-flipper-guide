<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title?: string
  items: string[]
}>()

const checked = ref<boolean[]>(props.items.map(() => false))

const progress = computed(() =>
  Math.round((checked.value.filter(Boolean).length / props.items.length) * 100)
)

const allDone = computed(() => checked.value.every(Boolean))

function toggle(i: number) {
  checked.value[i] = !checked.value[i]
}

function reset() {
  checked.value = props.items.map(() => false)
}
</script>

<template>
  <div class="checklist-widget">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
      <strong style="color: var(--accent); font-size: 0.95rem;">
        {{ title || '✅ চেকলিস্ট' }}
      </strong>
      <span style="font-size: 0.8rem; color: var(--vp-c-text-3);">
        {{ checked.filter(Boolean).length }}/{{ items.length }}
      </span>
    </div>

    <div class="checklist-progress">
      <div class="checklist-progress-fill" :style="{ width: progress + '%' }" />
    </div>

    <div v-if="allDone" style="text-align:center; padding: 12px; color: var(--accent); font-weight: 700; font-size: 0.95rem;">
      🎉 সব check করা হয়েছে! এই domain কিনুন।
    </div>

    <div
      v-for="(item, i) in items"
      :key="i"
      class="checklist-item"
      :class="{ checked: checked[i] }"
      @click="toggle(i)"
    >
      <input type="checkbox" :checked="checked[i]" @change="toggle(i)" @click.stop />
      <label>{{ item }}</label>
    </div>

    <button
      v-if="checked.some(Boolean)"
      @click="reset"
      style="margin-top: 12px; font-size: 0.8rem; color: var(--vp-c-text-3); background: none; border: 1px solid var(--vp-c-border); border-radius: 6px; padding: 4px 12px; cursor: pointer;"
    >
      রিসেট করুন
    </button>
  </div>
</template>
