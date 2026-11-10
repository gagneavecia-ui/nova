"use client";

// ================================================================
// NOVA — Tarifs : 4 plans (dont 1 « Recommandé » bordure dégradée)
// ================================================================
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Pricing() {
  const { t } = useLang();

  return (
    <section id="tarifs" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-violet-300">
            {t.pricing.eyebrow}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.pricing.title}
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.pricing.plans.map((p, i) => {
            const isPro = i === 3;
            const card = (
              <div
                className={`flex h-full flex-col rounded-[1.8rem] p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  isPro
                    ? "bg-gradient-to-b from-[#160a35] to-[#0b1e33]"
                    : "nova-glass"
                }`}
              >
                {isPro && (
                  <span className="mb-4 w-fit rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-[10px] font-extrabold tracking-widest text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]">
                    {t.pricing.recommended}
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-white">{p.n}</h3>
                <p className={`mt-1 text-sm font-medium ${isPro ? "text-cyan-300" : "text-white/50"}`}>
                  {p.tag}
                </p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{p.price}</span>
                  <span className="text-sm font-semibold text-white/45">{t.pricing.per}</span>
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {p.f.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-7 rounded-full px-5 py-3 text-center text-sm font-bold transition-all duration-200 hover:scale-[1.03] ${
                    isPro
                      ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-[0_0_28px_rgba(124,58,237,0.5)]"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {t.pricing.choose} {p.n}
                </a>
              </div>
            );

            return (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={isPro ? "rounded-[1.9rem] bg-gradient-to-b from-violet-500 via-fuchsia-400 to-cyan-400 p-[1.5px] shadow-[0_0_50px_rgba(139,92,246,0.35)]" : ""}
              >
                {card}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-white/45">{t.pricing.note}</p>
      </div>
    </section>
  );
}
