<script setup lang="ts">
import { ref, computed } from 'vue'

const buyPrice  = ref(12)
const sellPrice = ref(800)
const commission = ref(9)   // %

const netProfit = computed(() => {
  const comm = (sellPrice.value * commission.value) / 100
  return (sellPrice.value - buyPrice.value - comm).toFixed(2)
})

const roi = computed(() => {
  if (!buyPrice.value) return '0'
  return (((+netProfit.value) / buyPrice.value) * 100).toFixed(0)
})

const multiplier = computed(() => {
  if (!buyPrice.value) return '0'
  return (sellPrice.value / buyPrice.value).toFixed(1)
})
</script>

<template>
  <div class="calc-widget">
    <h4>💰 লাভ ক্যালকুলেটর — আপনার flip কতটা লাভজনক?</h4>

    <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; margin-bottom: 16px;">
      <div class="calc-row">
        <div class="calc-label">ক্রয় মূল্য ($)</div>
        <input class="calc-input" type="number" v-model.number="buyPrice" min="1" />
      </div>
      <div class="calc-row">
        <div class="calc-label">বিক্রয় মূল্য ($)</div>
        <input class="calc-input" type="number" v-model.number="sellPrice" min="1" />
      </div>
      <div class="calc-row">
        <div class="calc-label">Commission (%)</div>
        <input class="calc-input" type="number" v-model.number="commission" min="0" max="50" />
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
      <div class="calc-result" style="flex-direction: column; align-items: center; text-align: center;">
        <div class="calc-result-label">নিট লাভ</div>
        <div class="calc-result-value">${{ netProfit }}</div>
      </div>
      <div class="calc-result" style="flex-direction: column; align-items: center; text-align: center;">
        <div class="calc-result-label">ROI</div>
        <div class="calc-result-value">{{ roi }}%</div>
      </div>
      <div class="calc-result" style="flex-direction: column; align-items: center; text-align: center;">
        <div class="calc-result-label">গুণফল</div>
        <div class="calc-result-value">{{ multiplier }}×</div>
      </div>
    </div>
  </div>
</template>
