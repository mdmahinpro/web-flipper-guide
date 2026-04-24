<template>
  <div class="mha-wrap" aria-hidden="true">
    <!-- Background gradient orbs -->
    <div class="mha-orb mha-orb-1" />
    <div class="mha-orb mha-orb-2" />

    <!-- Floating ambient symbols (corners only, away from chips) -->
    <span class="mha-float mha-f1">$</span>
    <span class="mha-float mha-f2">💎</span>
    <span class="mha-float mha-f3">🚀</span>
    <span class="mha-float mha-f4">$</span>

    <!-- Central stacked domain chips -->
    <div class="mha-stack">
      <div class="mha-chip mha-c1">
        <span class="mha-pre">www.</span><span class="mha-name">yourname</span><span class="mha-tld">.com</span>
      </div>
      <div class="mha-chip mha-c2">
        <span class="mha-pre">www.</span><span class="mha-name">startup</span><span class="mha-tld">.io</span>
      </div>
      <div class="mha-chip mha-c3">
        <span class="mha-pre">www.</span><span class="mha-name">buy</span><span class="mha-tld">.shop</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mha-wrap {
  position: relative;
  width: 100%;
  height: 220px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  isolation: isolate;
}

/* ===== gradient orbs ===== */
.mha-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(32px);
  opacity: 0.55;
  pointer-events: none;
  animation: mha-drift 9s ease-in-out infinite;
}
.mha-orb-1 {
  width: 180px; height: 180px;
  background: radial-gradient(circle, var(--accent), transparent 65%);
  top: -40px; left: -40px;
}
.mha-orb-2 {
  width: 160px; height: 160px;
  background: radial-gradient(circle, var(--accent), transparent 65%);
  bottom: -40px; right: -40px;
  animation-delay: 3s;
  opacity: 0.45;
}
@keyframes mha-drift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%      { transform: translate(10px, -8px) scale(1.08); }
}

/* ===== floating ambient symbols (in 4 corners, far from chips) ===== */
.mha-float {
  position: absolute;
  font-size: 16px;
  opacity: 0;
  animation: mha-rise 7s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  font-weight: 700;
}
.mha-f1 { left: 6%;  bottom: 6%;  color: var(--accent); animation-delay: 0s;   }
.mha-f2 { right: 6%; bottom: 12%;                       animation-delay: 1.8s; }
.mha-f3 { left: 8%;  top: 14%;                          animation-delay: 3.6s; }
.mha-f4 { right: 8%; top: 10%;    color: var(--accent); animation-delay: 5.4s; }
@keyframes mha-rise {
  0%   { transform: translateY(8px) scale(0.7); opacity: 0; }
  20%  { opacity: 0.85; transform: translateY(0) scale(1); }
  80%  { opacity: 0.85; transform: translateY(-30px) scale(1.05); }
  100% { transform: translateY(-50px) scale(1.1); opacity: 0; }
}

/* ===== central stacked chips ===== */
.mha-stack {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: min(240px, 72%);
  display: grid;
  gap: 9px;
}
.mha-chip {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 12px;
  padding: 11px 14px;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.28);
  opacity: 0;
  transform: translateY(14px);
  animation: mha-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards,
             mha-glow 4s ease-in-out infinite;
  position: relative;
}
.mha-chip::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(135deg, var(--accent), transparent 70%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0.55;
  pointer-events: none;
}
.mha-c1 { animation-delay: 0.1s, 0s;     }
.mha-c2 { animation-delay: 0.3s, 1.3s;   }
.mha-c3 { animation-delay: 0.5s, 2.6s;   }

.mha-pre  { color: var(--vp-c-text-2, #888); }
.mha-name { color: var(--vp-c-text-1); font-weight: 700; }
.mha-tld  { color: var(--accent);      font-weight: 700; }

@keyframes mha-in {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes mha-glow {
  0%, 100% {
    box-shadow: 0 6px 22px rgba(0,0,0,0.28), 0 0 0 0 transparent;
    border-color: var(--glass-border);
  }
  50% {
    box-shadow: 0 6px 26px rgba(0,0,0,0.32), 0 0 24px var(--accent);
    border-color: var(--accent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mha-orb, .mha-float, .mha-chip {
    animation: none !important;
    opacity: 1 !important;
    transform: translate(-50%, -50%) !important;
  }
  .mha-orb, .mha-float { transform: none !important; }
}
</style>
