/**
 * TechelyLogoMark
 * ---------------
 * Animated T character for Techely — no text, drop-in ready.
 *
 * Features:
 *  • Eyes independently track the mouse cursor
 *  • Body 3D-tilts toward cursor (rotateX/Y perspective)
 *  • Continuous floating bob + subtle rotation loop
 *  • Hover → slight scale-up
 *  • Floating blue particles + glow pulse
 *
 * Usage:
 *  <TechelyLogoMark />                  default 150px wide
 *  <TechelyLogoMark size={80} />        any size
 *
 * Requires: framer-motion  →  npm i framer-motion
 */

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Assets ──────────────────────────────────────────────────────────────────
// Body image with pupils erased (replaced by body color),
// so we can overlay our own animated pupils on top.
const BODY_URL =
  "https://storage.googleapis.com/runable-templates/cli-uploads%2FUW5xUW3rlo6sujIIco3hqGLYOMRCOLry%2FYdtFx2flMlWSxl8o7Qo6M%2Ftechely-no-eyes.png";

// ─── Eye positions (pixel-analyzed from original 500×592 PNG) ────────────────
const EYES = [
  { id: "left",  xPct: 38.40, yPct: 23.99 },
  { id: "right", xPct: 52.00, yPct: 24.66 },
];

// ─── Spring configs ───────────────────────────────────────────────────────────
const EYE_SPRING  = { stiffness: 420, damping: 32 };
const BODY_SPRING = { stiffness: 160, damping: 20 };

// ─── Particle positions ───────────────────────────────────────────────────────
const PARTICLES = [
  { id: 0, left: "6%",  top: "8%",  delay: 0,    dx:  4 },
  { id: 1, left: "85%", top: "6%",  delay: 0.70, dx: -4 },
  { id: 2, left: "90%", top: "75%", delay: 1.40, dx: -3 },
  { id: 3, left: "3%",  top: "80%", delay: 2.10, dx:  3 },
  { id: 4, left: "50%", top: "1%",  delay: 0.35, dx:  2 },
  { id: 5, left: "50%", top: "97%", delay: 1.05, dx: -2 },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface TechelyLogoMarkProps {
  /** Width in px. Height is derived from the 500:592 aspect ratio. */
  size?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TechelyLogoMark({ size = 150 }: TechelyLogoMarkProps) {
  const height = Math.round(size * (592 / 500));

  // Eye socket radius in rendered px (12px socket in 500px image)
  const socketR = (12 / 500) * size;
  const pupilR  = socketR * 0.68;

  const wrapRef = useRef<HTMLDivElement>(null);

  // Body 3D lean
  const bodyRX = useMotionValue(0);
  const bodyRY = useMotionValue(0);
  const bodySpringRX = useSpring(bodyRX, BODY_SPRING);
  const bodySpringRY = useSpring(bodyRY, BODY_SPRING);

  // Body position drift
  const bodyDX = useMotionValue(0);
  const bodyDY = useMotionValue(0);
  const bodySpringDX = useSpring(bodyDX, BODY_SPRING);
  const bodySpringDY = useSpring(bodyDY, BODY_SPRING);

  // Left eye pupil
  const leftRawX  = useMotionValue(0);
  const leftRawY  = useMotionValue(0);
  const leftSpX   = useSpring(leftRawX,  EYE_SPRING);
  const leftSpY   = useSpring(leftRawY,  EYE_SPRING);

  // Right eye pupil
  const rightRawX = useMotionValue(0);
  const rightRawY = useMotionValue(0);
  const rightSpX  = useSpring(rightRawX, EYE_SPRING);
  const rightSpY  = useSpring(rightRawY, EYE_SPRING);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      const rect  = wrapRef.current.getBoundingClientRect();
      const imgCX = rect.left + rect.width  / 2;
      const imgCY = rect.top  + rect.height / 2;

      // Normalised offset from image center (−1 … +1)
      const nx = (e.clientX - imgCX) / (window.innerWidth  / 2);
      const ny = (e.clientY - imgCY) / (window.innerHeight / 2);

      // Body tilt
      bodyRY.set( nx * 14);
      bodyRX.set(-ny * 10);

      // Body drift
      bodyDX.set(nx * 5);
      bodyDY.set(ny * 3);

      // Pupils — independent tracking per eye
      EYES.forEach((eye) => {
        const eyeAbsX = rect.left + (eye.xPct / 100) * rect.width;
        const eyeAbsY = rect.top  + (eye.yPct / 100) * rect.height;

        const dx    = e.clientX - eyeAbsX;
        const dy    = e.clientY - eyeAbsY;
        const angle = Math.atan2(dy, dx);
        const dist  = Math.sqrt(dx * dx + dy * dy);
        // Clamp: pupil max travel = pupilR * 0.7, so it never leaves the socket
        const travel = Math.min(dist / 60, 1) * (pupilR * 0.7);

        const px = Math.cos(angle) * travel;
        const py = Math.sin(angle) * travel;

        if (eye.id === "left")  { leftRawX.set(px);  leftRawY.set(py);  }
        else                    { rightRawX.set(px); rightRawY.set(py); }
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pupilR]);

  return (
    <motion.div
      style={{
        position: "relative",
        width:  size,
        height: height,
        flexShrink: 0,
        userSelect: "none",
        rotateX: bodySpringRX,
        rotateY: bodySpringRY,
        x: bodySpringDX,
        y: bodySpringDY,
        perspective: 600,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y:      [0, -8,   0,  -4,  0],
        rotate: [0, -2.5, 2.5, -1.5, 0],
      }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.07, transition: { duration: 0.25 } }}
    >
      {/* Glow pulse */}
      <motion.div
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.30) 0%, transparent 68%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.85, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          style={{
            position: "absolute",
            left: p.left, top: p.top,
            width: Math.max(5, size * 0.045),
            height: Math.max(5, size * 0.045),
            borderRadius: "50%",
            background: "linear-gradient(135deg, #60a5fa, #2563eb)",
            pointerEvents: "none",
            zIndex: 4,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, p.dx, 0],
            opacity: [0, 0.9, 0],
            scale:   [0, 1.4, 0],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Body — no pupils */}
      <div
        ref={wrapRef}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      >
        <img
          src={BODY_URL}
          alt="Techely mascot"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            filter: "drop-shadow(0 14px 36px rgba(29,78,216,0.50))",
          }}
        />

        {/* Animated pupils */}
        {EYES.map((eye) => {
          const spX = eye.id === "left" ? leftSpX  : rightSpX;
          const spY = eye.id === "left" ? leftSpY  : rightSpY;

          return (
            <motion.div
              key={eye.id}
              style={{
                position: "absolute",
                left:       `${eye.xPct}%`,
                top:        `${eye.yPct}%`,
                marginLeft: -pupilR,
                marginTop:  -pupilR,
                width:  pupilR * 2,
                height: pupilR * 2,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 30%, #3a3a3a, #000)",
                pointerEvents: "none",
                zIndex: 2,
                x: spX,
                y: spY,
              }}
            >
              {/* Shine */}
              <div
                style={{
                  position: "absolute",
                  top: "14%", left: "16%",
                  width: "32%", height: "32%",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.88)",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
