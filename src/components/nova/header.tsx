"use client";

// ================================================================
// NOVA — Header sticky (verre dépoli) + nav + FR/EN + CTA
// ================================================================
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Mascot } from "./mascot";
import { useLang, type Lang } from "@/lib/i18n";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#fonctionnalites", label: t.nav.features },
    { href: "#fonctionnement", label: t.nav.how },
    { href: "#tarifs", label: t.nav.pricing },
    { href: "#faq", label: t.nav.faq },
  ];

  const LangToggle = (
    <div
      className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-bold"
      role="group"
      aria-label="Langue / Language"
    >
      {(["fr", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition-all ${
            lang === l
              ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-white shadow-[0_0_16px_rgba(139,92,246,0.5)]"
              : "text-white/50 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#070213]/80 shadow-[0_8px_40px_rgba(7,2,19,0.7)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* logo */}
        <a href="#" className="flex items-center gap-2.5" aria-label="Nova — accueil">
          <Mascot size={38} simple interactive={false} />
          <span className="text-[22px] font-extrabold tracking-tight text-white">
            nova<span className="nova-gradient-text">.</span>
          </span>
        </a>

        {/* nav desktop */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigation principale">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-violet-400 to-cyan-300 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">{LangToggle}</div>
          <a
            href="#"
            className="hidden text-sm font-semibold text-white/70 transition-colors hover:text-white md:block"
          >
            {t.nav.login}
          </a>
          <a
            href="#tarifs"
            className="hidden rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-transform duration-200 hover:scale-[1.04] sm:block"
          >
            {t.nav.cta}
          </a>
          <button
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-white/10 bg-[#070213]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex items-center justify-between px-3">
                {LangToggle}
                <a
                  href="#tarifs"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white"
                >
                  {t.nav.cta}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
