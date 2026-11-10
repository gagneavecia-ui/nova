"use client";

// ================================================================
// NOVA — FAQ (accordéon shadcn, style dark) + Footer
// ================================================================
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { Mascot } from "./mascot";

export function Faq() {
  const { t } = useLang();
  return (
    <section id="faq" className="relative px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
            {t.faq.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t.faq.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10"
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="nova-glass rounded-2xl border border-white/10 px-6 last:border-b"
              >
                <AccordionTrigger className="py-5 text-left text-base font-bold text-white hover:no-underline hover:text-violet-200 [&[data-state=open]>svg]:text-cyan-300">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-white/60">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  const cols = [
    {
      title: t.footer.product,
      links: [
        { l: t.nav.features, h: "#fonctionnalites" },
        { l: t.nav.pricing, h: "#tarifs" },
        { l: t.nav.faq, h: "#faq" },
      ],
    },
    {
      title: t.footer.resources,
      links: [
        { l: t.footer.contact, h: "#" },
        { l: t.nav.faq, h: "#faq" },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { l: t.footer.privacy, h: "#" },
        { l: t.footer.terms, h: "#" },
      ],
    },
  ];

  return (
    <footer className="relative mt-10 border-t border-white/8 px-4 pb-10 pt-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mascot size={34} simple interactive={false} />
            <span className="text-xl font-extrabold tracking-tight text-white">
              nova<span className="nova-gradient-text">.</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-white/50">{t.footer.tagline}</p>
          <p className="mt-1 text-sm text-white/35">{t.footer.made}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/40">
              {c.title}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {c.links.map((link) => (
                <li key={link.l}>
                  <a
                    href={link.h}
                    className="text-sm font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {link.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/8 pt-6 text-center text-xs text-white/35">
        © Nova 2026 — {t.footer.tagline}
      </div>
    </footer>
  );
}
