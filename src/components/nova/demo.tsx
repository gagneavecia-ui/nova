"use client";

// ================================================================
// NOVA — Démo « rappel actif » : flashcard qui se retourne,
// 3 boutons de confiance (comme Axia) + la mascotte qui réagit.
// + bande de stats (98% / +300 / 4,8)
// ================================================================
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { Mascot, type Mood, type MoodSignal } from "./mascot";
import { useLang } from "@/lib/i18n";

const BTN_STYLES = [
  "border-rose-500/40 bg-rose-500/15 text-rose-200 hover:bg-rose-500/30",
  "border-amber-400/40 bg-amber-400/15 text-amber-200 hover:bg-amber-400/30",
  "border-emerald-400/40 bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/30",
];

export function DemoSection() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [signal, setSignal] = useState<MoodSignal>({ kind: "idle", id: 0 });

  const card = t.demo.cards[index % t.demo.cards.length];

  const answer = (level: number) => {
    if (flipped) return;
    setFlipped(true);
    const kind: Mood = level === 2 ? "happy" : level === 1 ? "encourage" : "oops";
    setSignal({ kind, id: Date.now() });
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % t.demo.cards.length), 220);
  };

  const reaction =
    signal.kind === "happy"
      ? t.demo.reactOk
      : signal.kind === "encourage"
        ? t.demo.reactMid
        : t.demo.reactKo;

  return (
    <section id="demo" className="relative px-4 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
            {t.demo.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.demo.title}
          </h2>
          <p className="mt-4 text-white/60">{t.demo.sub}</p>
        </motion.div>

        <div className="mt-14 grid items-center gap-10 md:grid-cols-[auto_1fr]">
          {/* mascotte réactive */}
          <div className="flex flex-col items-center gap-4">
            <Mascot size={190} moodSignal={signal} />
            <AnimatePresence mode="wait">
              {signal.kind !== "idle" && (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="nova-glass max-w-[240px] rounded-2xl px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  {reaction}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* flashcard */}
          <div className="mx-auto w-full max-w-xl" style={{ perspective: "1400px" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
            >
              {/* face question */}
              <div
                className="nova-glass flex min-h-[320px] flex-col rounded-[2rem] p-7 sm:p-9"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-violet-300">
                  {card.eyebrow}
                </p>
                <h3 className="mt-4 flex-1 text-balance text-2xl font-extrabold leading-snug text-white sm:text-[28px]">
                  {card.q}
                </h3>
                <p className="mt-6 text-sm font-medium text-white/50">{t.demo.hint}</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {t.demo.buttons.map((b, i) => (
                    <button
                      key={b}
                      onClick={() => answer(i)}
                      className={`w-full rounded-2xl border px-5 py-3.5 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${BTN_STYLES[i]}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* face réponse */}
              <div
                className="nova-glass absolute inset-0 flex min-h-[320px] flex-col items-start justify-center rounded-[2rem] border-violet-400/25 bg-gradient-to-br from-violet-500/15 to-cyan-400/10 p-7 sm:p-9"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-cyan-300">
                  {card.eyebrow}
                </p>
                <h3 className="mt-4 text-balance text-xl font-extrabold leading-snug text-white sm:text-2xl">
                  {card.a}
                </h3>
                <span className="mt-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
                  {t.demo.nextReview}
                </span>
                <button
                  onClick={nextCard}
                  className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(124,58,237,0.45)] transition-transform hover:scale-[1.04]"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t.demo.again}
                </button>
              </div>
            </motion.div>

            {/* progression */}
            <div className="mt-5 flex justify-center gap-2">
              {t.demo.cards.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index % t.demo.cards.length
                      ? "w-7 bg-gradient-to-r from-violet-400 to-cyan-300"
                      : "w-2.5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* stats */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {t.stats.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="nova-glass rounded-3xl p-6 text-center sm:p-8"
            >
              <p className="nova-gradient-text text-4xl font-extrabold sm:text-5xl">{s.v}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
