<template>
  <!-- LAYER 1: outer hover scale -->
  <div
    class="techely-hover"
    :style="{ width: size + 'px', height: height + 'px' }"
  >
    <!-- LAYER 2: continuous float bob (CSS animation, isolated transform) -->
    <div class="techely-float">
      <!-- LAYER 3: mouse-based 3D tilt (inline transform, isolated) -->
      <div
        class="techely-tilt"
        :style="{
          transform: `perspective(600px) rotateX(${bodyRX.toFixed(3)}deg) rotateY(${bodyRY.toFixed(3)}deg) translate3d(${bodyDX.toFixed(2)}px, ${bodyDY.toFixed(2)}px, 0)`,
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
            '--dx': p.dx + 'px',
          }"
        />

        <!-- LAYER 4: body image + pupils — captured for eye tracking -->
        <div class="body-stage" ref="wrapRef">
          <img
            :src="BODY_URL"
            alt="Techely mascot"
            draggable="false"
            class="body-img"
          />

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
              transform: `translate3d(${eyeOffsets[eye.id].x.toFixed(2)}px, ${eyeOffsets[eye.id].y.toFixed(2)}px, 0)`,
            }"
          >
            <div class="pupil-shine" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'

const BODY_URL =
  'https://storage.googleapis.com/runable-templates/cli-uploads%2FUW5xUW3rlo6sujIIco3hqGLYOMRCOLry%2FYdtFx2flMlWSxl8o7Qo6M%2Ftechely-no-eyes.png'

const props = withDefaults(defineProps<{ size?: number }>(), { size: 160 })

const height       = computed(() => Math.round(props.size * (592 / 500)))
const socketR      = computed(() => (12 / 500) * props.size)
const pupilR       = computed(() => socketR.value * 0.68)
const pupilD       = computed(() => pupilR.value * 2)
const particleSize = computed(() => Math.max(5, props.size * 0.045))

const eyes = [
  { id: 'left',  xPct: 38.40, yPct: 23.99 },
  { id: 'right', xPct: 52.00, yPct: 24.66 },
]
const particles = [
  { id: 0, left: '6%',  top: '8%',  delay: 0,    dx:  4 },
  { id: 1, left: '85%', top: '6%',  delay: 0.70, dx: -4 },
  { id: 2, left: '90%', top: '75%', delay: 1.40, dx: -3 },
  { id: 3, left: '3%',  top: '80%', delay: 2.10, dx:  3 },
  { id: 4, left: '50%', top: '1%',  delay: 0.35, dx:  2 },
  { id: 5, left: '50%', top: '97%', delay: 1.05, dx: -2 },
]

const wrapRef = ref<HTMLDivElement | null>(null)

// Reactive springs for each animated value
const bodyRX = ref(0)
const bodyRY = ref(0)
const bodyDX = ref(0)
const bodyDY = ref(0)
const eyeOffsets = reactive<Record<string, { x: number; y: number }>>({
  left:  { x: 0, y: 0 },
  right: { x: 0, y: 0 },
})

// ─── Spring physics (matches framer-motion useSpring) ────────────────────────
// Body spring: stiffness 160, damping 20  → smooth, gentle
// Eye spring:  stiffness 420, damping 32  → snappy, near-critical
type Spring = {
  pos: number
  vel: number
  target: number
  stiff: number
  damp: number
}
function makeSpring(stiff: number, damp: number): Spring {
  return { pos: 0, vel: 0, target: 0, stiff, damp }
}
function stepSpring(s: Spring, dt: number) {
  // Cap dt so a paused tab doesn't fling values
  const h = Math.min(dt, 0.032)
  const force = -s.stiff * (s.pos - s.target) - s.damp * s.vel
  s.vel += force * h
  s.pos += s.vel * h
}

const sBodyRX = makeSpring(160, 20)
const sBodyRY = makeSpring(160, 20)
const sBodyDX = makeSpring(160, 20)
const sBodyDY = makeSpring(160, 20)
const sLeftX  = makeSpring(420, 32)
const sLeftY  = makeSpring(420, 32)
const sRightX = makeSpring(420, 32)
const sRightY = makeSpring(420, 32)

let rafId = 0
let lastT  = 0

function tick(now: number) {
  const dt = lastT ? (now - lastT) / 1000 : 0.016
  lastT = now

  stepSpring(sBodyRX, dt)
  stepSpring(sBodyRY, dt)
  stepSpring(sBodyDX, dt)
  stepSpring(sBodyDY, dt)
  stepSpring(sLeftX,  dt)
  stepSpring(sLeftY,  dt)
  stepSpring(sRightX, dt)
  stepSpring(sRightY, dt)

  bodyRX.value = sBodyRX.pos
  bodyRY.value = sBodyRY.pos
  bodyDX.value = sBodyDX.pos
  bodyDY.value = sBodyDY.pos
  eyeOffsets.left.x  = sLeftX.pos
  eyeOffsets.left.y  = sLeftY.pos
  eyeOffsets.right.x = sRightX.pos
  eyeOffsets.right.y = sRightY.pos

  rafId = requestAnimationFrame(tick)
}

function onMouseMove(e: MouseEvent) {
  const el = wrapRef.value
  if (!el) return
  const rect  = el.getBoundingClientRect()
  const imgCX = rect.left + rect.width  / 2
  const imgCY = rect.top  + rect.height / 2

  // Normalised offset from image center (−1 … +1)
  const nx = (e.clientX - imgCX) / (window.innerWidth  / 2)
  const ny = (e.clientY - imgCY) / (window.innerHeight / 2)

  // Body 3D lean — matches React component exactly
  sBodyRY.target =  nx * 14
  sBodyRX.target = -ny * 10
  sBodyDX.target =  nx * 5
  sBodyDY.target =  ny * 3

  // Pupils — independent per-eye tracking
  for (const eye of eyes) {
    const eyeAbsX = rect.left + (eye.xPct / 100) * rect.width
    const eyeAbsY = rect.top  + (eye.yPct / 100) * rect.height
    const dx    = e.clientX - eyeAbsX
    const dy    = e.clientY - eyeAbsY
    const angle = Math.atan2(dy, dx)
    const dist  = Math.sqrt(dx * dx + dy * dy)
    // Clamp pupil travel: max = pupilR * 0.7 → never leaves socket
    const travel = Math.min(dist / 60, 1) * (pupilR.value * 0.7)
    const px = Math.cos(angle) * travel
    const py = Math.sin(angle) * travel

    if (eye.id === 'left') {
      sLeftX.target  = px
      sLeftY.target  = py
    } else {
      sRightX.target = px
      sRightY.target = py
    }
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  rafId = requestAnimationFrame(tick)
})
onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* ── LAYER 1: hover scale + sizing ── */
.techely-hover {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  user-select: none;
  cursor: default;
  transition: transform 0.25s ease;
}
.techely-hover:hover { transform: scale(1.07); }

/* ── LAYER 2: continuous float bob (isolated CSS transform) ── */
.techely-float {
  position: absolute;
  inset: 0;
  animation: techely-bob 3.5s ease-in-out infinite;
  will-change: transform;
}

@keyframes techely-bob {
  0%   { transform: translate3d(0, 0,    0) rotate(0deg);    }
  25%  { transform: translate3d(0, -8px, 0) rotate(-2.5deg); }
  50%  { transform: translate3d(0, 0,    0) rotate( 2.5deg); }
  75%  { transform: translate3d(0, -4px, 0) rotate(-1.5deg); }
  100% { transform: translate3d(0, 0,    0) rotate(0deg);    }
}

/* ── LAYER 3: mouse-based 3D body tilt (inline transform from script) ── */
.techely-tilt {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;
}

/* ── LAYER 4: body stage (eye-tracking origin) ── */
.body-stage {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* Glow pulse */
.glow-pulse {
  position: absolute;
  inset: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59,130,246,0.30) 0%, transparent 68%);
  pointer-events: none;
  z-index: 0;
  animation: techely-glow 3.5s ease-in-out infinite;
}
@keyframes techely-glow {
  0%, 100% { transform: scale(1);   opacity: 0.30; }
  50%      { transform: scale(1.2); opacity: 0.85; }
}

/* Particles */
.particle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  pointer-events: none;
  z-index: 4;
  opacity: 0;
  animation: techely-spark 2.8s ease-in-out infinite;
}
@keyframes techely-spark {
  0%   { transform: translate3d(0, 0, 0)     scale(0); opacity: 0; }
  40%  { transform: translate3d(var(--dx), -14px, 0) scale(1.4); opacity: 0.9; }
  100% { transform: translate3d(0, 0, 0)     scale(0); opacity: 0; }
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
  -webkit-user-drag: none;
}

/* Pupils */
.pupil {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #3a3a3a, #000);
  z-index: 2;
  pointer-events: none;
  will-change: transform;
}
.pupil-shine {
  position: absolute;
  top: 14%; left: 16%;
  width: 32%; height: 32%;
  border-radius: 50%;
  background: rgba(255,255,255,0.88);
}

/* Reduced motion: keep mascot static but visible */
@media (prefers-reduced-motion: reduce) {
  .techely-float, .glow-pulse { animation: none; }
  .particle { display: none; }
}
</style>
