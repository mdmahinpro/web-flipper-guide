<template>
  <div class="techely-outer">
    <div
      class="techely-wrap"
      ref="wrapRef"
      :style="{
        width: size + 'px',
        height: height + 'px',
        transform: `perspective(600px) rotateX(${bodyRX}deg) rotateY(${bodyRY}deg) translate(${bodyDX}px, ${bodyDY}px)`,
      }"
    >
      <!-- Glow pulse -->
      <div class="glow-pulse" />

      <!-- Floating particles -->
      <div
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          left: p.left, top: p.top,
          width: particleSize + 'px', height: particleSize + 'px',
          animationDelay: p.delay + 's',
        }"
      />

      <!-- Body image -->
      <img
        :src="BODY_URL"
        alt="Techely mascot"
        draggable="false"
        class="body-img"
      />

      <!-- Animated pupils -->
      <div
        v-for="eye in eyes"
        :key="eye.id"
        class="pupil"
        :style="{
          left: eye.xPct + '%',
          top:  eye.yPct + '%',
          width:      pupilD + 'px',
          height:     pupilD + 'px',
          marginLeft: -(pupilD / 2) + 'px',
          marginTop:  -(pupilD / 2) + 'px',
          transform: `translate(${eyeOffsets[eye.id].x}px, ${eyeOffsets[eye.id].y}px)`,
        }"
      >
        <div class="pupil-shine" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

const BODY_URL =
  'https://storage.googleapis.com/runable-templates/cli-uploads%2FUW5xUW3rlo6sujIIco3hqGLYOMRCOLry%2FYdtFx2flMlWSxl8o7Qo6M%2Ftechely-no-eyes.png'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 160 })

const height     = computed(() => Math.round(props.size * (592 / 500)))
const socketR    = computed(() => (12 / 500) * props.size)
const pupilR     = computed(() => socketR.value * 0.68)
const pupilD     = computed(() => pupilR.value * 2)
const particleSize = computed(() => Math.max(5, props.size * 0.045))

const eyes = [
  { id: 'left',  xPct: 38.40, yPct: 23.99 },
  { id: 'right', xPct: 52.00, yPct: 24.66 },
]
const particles = [
  { id: 0, left: '6%',  top: '8%',  delay: 0 },
  { id: 1, left: '85%', top: '6%',  delay: 0.70 },
  { id: 2, left: '90%', top: '75%', delay: 1.40 },
  { id: 3, left: '3%',  top: '80%', delay: 2.10 },
  { id: 4, left: '50%', top: '1%',  delay: 0.35 },
  { id: 5, left: '50%', top: '97%', delay: 1.05 },
]

const wrapRef  = ref<HTMLDivElement | null>(null)
const bodyRX   = ref(0)
const bodyRY   = ref(0)
const bodyDX   = ref(0)
const bodyDY   = ref(0)
const eyeOffsets = reactive<Record<string, { x: number; y: number }>>({
  left:  { x: 0, y: 0 },
  right: { x: 0, y: 0 },
})

let rafId = 0
const targets = {
  bodyRX: 0, bodyRY: 0, bodyDX: 0, bodyDY: 0,
  leftX: 0, leftY: 0, rightX: 0, rightY: 0,
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function tick() {
  const sp = 0.12
  bodyRX.value  = lerp(bodyRX.value,  targets.bodyRX, sp)
  bodyRY.value  = lerp(bodyRY.value,  targets.bodyRY, sp)
  bodyDX.value  = lerp(bodyDX.value,  targets.bodyDX, sp)
  bodyDY.value  = lerp(bodyDY.value,  targets.bodyDY, sp)
  eyeOffsets.left.x  = lerp(eyeOffsets.left.x,  targets.leftX,  0.15)
  eyeOffsets.left.y  = lerp(eyeOffsets.left.y,  targets.leftY,  0.15)
  eyeOffsets.right.x = lerp(eyeOffsets.right.x, targets.rightX, 0.15)
  eyeOffsets.right.y = lerp(eyeOffsets.right.y, targets.rightY, 0.15)
  rafId = requestAnimationFrame(tick)
}

function onMouseMove(e: MouseEvent) {
  const el = wrapRef.value
  if (!el) return
  const rect  = el.getBoundingClientRect()
  const imgCX = rect.left + rect.width  / 2
  const imgCY = rect.top  + rect.height / 2

  const nx = (e.clientX - imgCX) / (window.innerWidth  / 2)
  const ny = (e.clientY - imgCY) / (window.innerHeight / 2)

  targets.bodyRY = nx *  14
  targets.bodyRX = ny * -10
  targets.bodyDX = nx *   5
  targets.bodyDY = ny *   3

  eyes.forEach(eye => {
    const eyeAbsX = rect.left + (eye.xPct / 100) * rect.width
    const eyeAbsY = rect.top  + (eye.yPct / 100) * rect.height
    const dx    = e.clientX - eyeAbsX
    const dy    = e.clientY - eyeAbsY
    const angle = Math.atan2(dy, dx)
    const dist  = Math.sqrt(dx * dx + dy * dy)
    const travel = Math.min(dist / 60, 1) * (pupilR.value * 0.7)
    const px = Math.cos(angle) * travel
    const py = Math.sin(angle) * travel

    if (eye.id === 'left') {
      targets.leftX  = px; targets.leftY  = py
    } else {
      targets.rightX = px; targets.rightY = py
    }
  })
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(tick)
  }
})
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(rafId)
  }
})
</script>

<style scoped>
.techely-outer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.techely-wrap {
  position: relative;
  user-select: none;
  flex-shrink: 0;
  animation: techely-float 3.5s ease-in-out infinite;
  will-change: transform;
}
.techely-wrap:hover { animation-play-state: running; transform: scale(1.06); }

@keyframes techely-float {
  0%   { animation-timing-function: ease-in-out; margin-top: 0;    rotate: 0deg;    }
  25%  { margin-top: -8px;  rotate: -2.5deg; }
  50%  { margin-top: 0px;   rotate:  2.5deg; }
  75%  { margin-top: -4px;  rotate: -1.5deg; }
  100% { margin-top: 0px;   rotate:  0deg;   }
}

/* Glow pulse */
.glow-pulse {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.30) 0%, transparent 68%);
  pointer-events: none;
  z-index: 0;
  animation: glow 3.5s ease-in-out infinite;
}
@keyframes glow {
  0%,100% { transform: scale(1);   opacity: 0.3; }
  50%      { transform: scale(1.2); opacity: 0.85; }
}

/* Particles */
.particle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  pointer-events: none;
  z-index: 4;
  animation: spark 2.8s ease-in-out infinite;
}
@keyframes spark {
  0%   { transform: translate(0,0)  scale(0); opacity: 0; }
  40%  { transform: translate(4px,-14px) scale(1.4); opacity: 0.9; }
  100% { transform: translate(0,0)  scale(0); opacity: 0; }
}

/* Body */
.body-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  z-index: 1;
  filter: drop-shadow(0 14px 36px rgba(29,78,216,0.50));
}

/* Pupils */
.pupil {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #3a3a3a, #000);
  z-index: 2;
  pointer-events: none;
  transition: transform 0.05s linear;
}
.pupil-shine {
  position: absolute;
  top: 14%; left: 16%;
  width: 32%; height: 32%;
  border-radius: 50%;
  background: rgba(255,255,255,0.88);
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .techely-wrap { animation: none; }
  .glow-pulse   { animation: none; }
  .particle     { display: none; }
}
</style>
