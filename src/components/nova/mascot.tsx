"use client";

// ================================================================
// NOVA — Mascotte « blob » 100 % vectorielle (aucune photo)
// - Morphing du corps (border-radius animé, GPU friendly)
// - Clignements naturels, pupilles qui suivent le curseur
// - Humeurs : idle / happy / encourage / oops (bouche + rebond)
// - Particules ✦ au clic, bras qui saluent en mode happy
// ================================================================
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export type Mood = "idle" | "happy" | "encourage" | "oops";
export type MoodSignal = { kind: Mood; id: number };

const SPARKLE_COLORS = ["#a78bfa", "#22d3ee", "#e879f9", "#fbbf24", "#f4f1ff"];

type Sparkle = { id: number; dx: number; dy: number; rot: number; color: string; size: number };

export function Mascot({
  size = 280,
  interactive = true,
  simple = false,
  moodSignal,
  className = "",
}: {
  size?: number;
  interactive?: boolean;
  simple?: boolean;
  moodSignal?: MoodSignal;
  className?: string;
}) {
  const [mood, setMood] = useState<Mood>("idle");
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [bounce, setBounce] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const sparkId = useRef(0);

  // Pupilles qui suivent le curseur (ressort = ultra fluide)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 160, damping: 18, mass: 0.4 });
  const py = useSpring(my, { stiffness: 160, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (simple) return;
    const onMove = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
      mx.set(nx * (size * 0.028));
      my.set(ny * (size * 0.022));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, size, simple]);

  // Réaction aux signaux d'humeur venus du parent
  // (ajustement de state dérivé des props pendant le rendu — pattern React officiel)
  const [lastSignalId, setLastSignalId] = useState<number | null>(null);
  if (moodSignal && moodSignal.id !== lastSignalId) {
    setLastSignalId(moodSignal.id);
    if (moodSignal.kind !== "idle") {
      setMood(moodSignal.kind);
      setBounce((b) => b + 1);
    }
  }

  // Retour automatique au repos
  useEffect(() => {
    if (mood === "idle") return;
    const t = setTimeout(() => setMood("idle"), 1800);
    return () => clearTimeout(t);
  }, [mood]);

  const burst = useCallback(
    () => {
      if (!interactive || simple) return;
      setBounce((b) => b + 1);
      setMood("happy");
      const born = Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2 + Math.random() * 0.6;
        const dist = size * (0.42 + Math.random() * 0.22);
        sparkId.current += 1;
        return {
          id: sparkId.current,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - size * 0.08,
          rot: Math.random() * 260 - 130,
          color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
          size: size * (0.05 + Math.random() * 0.045),
        };
      });
      setSparkles((s) => [...s.slice(-16), ...born]);
      setTimeout(() => setMood("idle"), 1500);
      setTimeout(() => setSparkles((s) => s.slice(born.length)), 800);
    },
    [interactive, simple, size]
  );

  const isHappy = mood === "happy";
  const isOops = mood === "oops";
  const isMid = mood === "encourage";

  return (
    <div
      ref={rootRef}
      className={`nova-float relative select-none ${interactive ? "cursor-pointer" : ""} ${className}`}
      style={{ width: size, height: size }}
      onClick={burst}
      role={interactive ? "button" : undefined}
      aria-label={interactive ? "Mascotte Nova — clique-moi !" : undefined}
    >
      {/* halo néon */}
      <div
        className="absolute inset-[-18%] rounded-full blur-2xl transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(34,211,238,0.18) 55%, transparent 72%)",
          opacity: isHappy ? 1 : 0.66,
        }}
      />

      <motion.div
        key={bounce}
        className="relative h-full w-full"
        initial={interactive ? { scale: 0.94 } : false}
        animate={{ scale: 1, rotate: isMid ? -3 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 14 }}
      >
        {/* corps du blob */}
        <div
          className="nova-blob-body absolute inset-0"
          style={{
            background: isHappy
              ? "linear-gradient(150deg, #c4b5fd 0%, #8b5cf6 42%, #22d3ee 108%)"
              : "linear-gradient(150deg, #a78bfa 0%, #7c3aed 45%, #22d3ee 110%)",
            boxShadow:
              "0 26px 64px rgba(124,58,237,0.45), 0 10px 28px rgba(34,211,238,0.22), inset 0 -14px 34px rgba(7,2,19,0.28)",
            transform: isOops ? "scaleY(0.96) scaleX(1.03)" : undefined,
            transition: "background 0.4s ease",
          }}
        />
        {/* reflet */}
        <div
          className="absolute inset-0 nova-blob-body"
          style={{
            background:
              "radial-gradient(circle at 32% 24%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.08) 26%, transparent 46%)",
          }}
        />

        {/* bras qui saluent */}
        <AnimatePresence>
          {isHappy && !simple && (
            <>
              <motion.div
                className="absolute"
                style={{
                  width: size * 0.14,
                  height: size * 0.075,
                  right: -size * 0.055,
                  top: "42%",
                  background: "linear-gradient(120deg, #22d3ee, #7c3aed)",
                  borderRadius: 999,
                }}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: [0, -38, 12, -38, 0], opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute"
                style={{
                  width: size * 0.14,
                  height: size * 0.075,
                  left: -size * 0.055,
                  top: "46%",
                  background: "linear-gradient(240deg, #22d3ee, #7c3aed)",
                  borderRadius: 999,
                }}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: [0, 30, -10, 30, 0], opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
            </>
          )}
        </AnimatePresence>

        {/* yeux */}
        <div
          className="absolute flex w-full justify-center gap-[12%]"
          style={{ top: "34%" }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="relative rounded-full"
              style={{
                width: size * 0.115,
                height: size * 0.155,
                background: "#fff",
                boxShadow: "inset 0 -2px 6px rgba(7,2,19,0.18)",
                animation: `nova-blink ${4.2 + i * 0.7}s ease-in-out infinite`,
                transformOrigin: "center",
              }}
            >
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: size * 0.055,
                  height: size * 0.055,
                  left: "22%",
                  top: "26%",
                  background: "#1a1033",
                  x: simple ? 0 : px,
                  y: simple ? 0 : py,
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: size * 0.018,
                    height: size * 0.018,
                    right: size * 0.008,
                    top: size * 0.006,
                    background: "#22d3ee",
                  }}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* joues */}
        <div
          className="absolute flex w-full justify-center gap-[22%]"
          style={{ top: "56%" }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: size * 0.09,
                height: size * 0.05,
                background: "rgba(251,113,133,0.5)",
                filter: `blur(${size * 0.012}px)`,
              }}
            />
          ))}
        </div>

        {/* bouche selon l'humeur */}
        <div className="absolute inset-x-0 flex justify-center" style={{ top: "58%" }}>
          <svg width={size * 0.34} height={size * 0.16} viewBox="0 0 100 46" fill="none">
            <AnimatePresence mode="wait">
              {mood === "idle" && (
                <motion.path
                  key="idle"
                  d="M20 12 Q50 40 80 12"
                  stroke="#1a1033"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                />
              )}
              {isHappy && (
                <motion.g key="happy">
                  <motion.path
                    d="M14 8 Q50 52 86 8 Z"
                    fill="#1a1033"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.18 }}
                  />
                  <motion.path
                    d="M34 30 Q50 44 66 30 Z"
                    fill="#fb7185"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </motion.g>
              )}
              {isMid && (
                <motion.circle
                  key="mid"
                  cx="50"
                  cy="22"
                  r="11"
                  fill="#1a1033"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.18 }}
                />
              )}
              {isOops && (
                <motion.path
                  key="oops"
                  d="M22 26 Q50 12 78 26"
                  stroke="#1a1033"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                />
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* particules ✦ */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ color: s.color, fontSize: s.size }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
              animate={{ x: s.dx, y: s.dy, opacity: [1, 1, 0], scale: [0, 1.25, 0.4], rotate: s.rot }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: "easeOut" }}
            >
              ✦
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
