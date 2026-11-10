"use client";

// ================================================================
// NOVA — Hero (badge, titre XXL dégradé, CTA, réassurances)
// + carte mascotte avec mini-cartes flottantes (à la place des
// captures d'écran d'Axia : 100 % vectoriel, aucune photo)
// ================================================================
import { motion } from "framer-motion";
import { BadgeCheck, Gift, Sparkles } from "lucide-react";
import { Mascot } from "./mascot";
import { useLang } from "@/lib/i18n";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <div className="nova-grid-bg absolute inset-0" />
      <div
        className="nova-drift absolute -left-32 top-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.28), transparent 70%)" }}
      />
      <div
        className="nova-drift absolute -right-24 top-[45%] h-80 w-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(34,211,238,0.20), transparent 70%)",
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}

export function Hero() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden px-4 pt-36 sm:px-6 sm:pt-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* badge */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="nova-glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-violet-200 sm:text-sm"
        >
          <Sparkles className="h-4 w-4 text-cyan-300" />
          {t.hero.badge}
        </motion.div>

        {/* titre */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-6 text-balance text-[42px] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {t.hero.title1}
          <br />
          <span className="nova-gradient-text">{t.hero.titleGrad}</span>{" "}
          {t.hero.title2}
        </motion.h1>

        {/* sous-titre */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#tarifs"
            className="group relative rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(124,58,237,0.55)] transition-all duration-200 hover:scale-[1.05] hover:shadow-[0_0_60px_rgba(34,211,238,0.45)]"
          >
            {t.hero.cta}
          </a>
          <a
            href="#demo"
            className="nova-glass rounded-full px-8 py-4 text-base font-bold text-white/85 transition-all duration-200 hover:scale-[1.03] hover:text-white"
          >
            {t.hero.demo} ↓
          </a>
        </motion.div>

        {/* promo */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.32 }}
          className="mt-7 flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-5 py-2.5 text-sm font-bold text-emerald-300"
        >
          <Gift className="h-4 w-4" />
          {t.hero.promo}
        </motion.div>

        {/* réassurances */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {t.hero.reassure.map((r) => (
            <span key={r} className="flex items-center gap-1.5 text-sm font-medium text-white/55">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              {r}
            </span>
          ))}
        </motion.div>
      </div>

      {/* mascotte + mini-cartes flottantes */}
      <div className="relative mx-auto mt-16 max-w-3xl pb-4 sm:mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="nova-glass relative mx-auto flex w-fit flex-col items-center rounded-[2.5rem] px-10 py-10 shadow-[0_30px_90px_rgba(7,2,19,0.8)] sm:px-16 sm:py-12"
        >
          {/* bulle bonjour */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="nova-glass absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-bold text-white shadow-lg"
          >
            {t.hero.hello} {t.hero.ready}
          </motion.div>

          <Mascot size={230} />

          {/* mini-cartes flottantes */}
          <FloatChip
            className="-left-6 top-6 sm:-left-16 sm:top-10"
            delay="0.4s"
            label={t.hero.floatXp}
            accent="from-amber-400 to-orange-400"
          />
          <FloatChip
            className="-right-4 top-16 sm:-right-14 sm:top-20"
            delay="1.1s"
            label={t.hero.floatStreak}
            accent="from-violet-400 to-fuchsia-400"
          />
          <FloatChip
            className="-left-2 bottom-8 sm:-left-12 sm:bottom-12"
            delay="1.8s"
            label={t.hero.floatNext}
            accent="from-cyan-400 to-sky-400"
          />
        </motion.div>
      </div>
    </section>
  );
}

function FloatChip({
  label,
  accent,
  className = "",
  delay = "0s",
}: {
  label: string;
  accent: string;
  className?: string;
  delay?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay: 1 + parseFloat(delay) * 0.4, duration: 0.4 },
        scale: { delay: 1 + parseFloat(delay) * 0.4, duration: 0.4 },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: parseFloat(delay) },
      }}
      className={`nova-glass absolute hidden items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white shadow-xl sm:flex ${className}`}
    >
      <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${accent}`} />
      {label}
    </motion.div>
  );
}
