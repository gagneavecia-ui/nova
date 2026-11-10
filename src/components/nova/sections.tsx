"use client";

// ================================================================
// NOVA — Fonctionnement (3 étapes) + Fonctionnalités (6 cartes)
// + CTA final
// ================================================================
import { motion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  FileUp,
  Import,
  PenLine,
  Timer,
  Zap,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function HowItWorks() {
  const { t } = useLang();
  const icons = [Import, FileUp, BrainCircuit];

  return (
    <section id="fonctionnement" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-violet-300">
            {t.how.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.how.title}
          </h2>
        </motion.div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-3">
          {/* ligne de connexion */}
          <div
            className="absolute left-[16%] right-[16%] top-12 hidden border-t-2 border-dashed border-white/10 md:block"
            aria-hidden
          />
          {t.how.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={s.t}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="nova-glass relative rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/30"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_28px_rgba(124,58,237,0.5)]">
                  <Icon className="h-6 w-6 text-white" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-extrabold text-violet-700">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{s.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const FEATURE_ICONS = [Zap, BrainCircuit, Timer, PenLine, Bot, FileUp];

export function Features() {
  const { t } = useLang();

  return (
    <section id="fonctionnalites" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
            {t.feat.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.feat.title}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.feat.items.map((f, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
            <motion.div
              key={f.t}
              {...fadeUp}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group nova-glass relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/35"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)" }}
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/80 to-cyan-500/80 shadow-[0_0_22px_rgba(124,58,237,0.4)]">
                <Icon className="h-6 w-6 text-white" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-white">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.d}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { t } = useLang();
  return (
    <section className="relative px-4 py-24 text-center sm:px-6 sm:py-32">
      <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {t.ctaFinal.title}
        </h2>
        <p className="mt-4 text-lg text-white/60">{t.ctaFinal.sub}</p>
        <a
          href="#tarifs"
          className="mt-9 inline-block rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-10 py-4 text-base font-bold text-white shadow-[0_0_44px_rgba(124,58,237,0.55)] transition-transform duration-200 hover:scale-[1.05]"
        >
          {t.ctaFinal.btn} →
        </a>
        <p className="mt-4 text-sm text-white/45">{t.ctaFinal.note}</p>
      </motion.div>
    </section>
  );
}
