"use client";

// ================================================================
// NOVA — PWA : enregistrement du service worker + modale
// d'installation custom (capture beforeinstallprompt, comme Axia)
// ================================================================
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mascot } from "./mascot";
import { useLang } from "@/lib/i18n";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "nova-install-dismissed-at";
const WEEK = 7 * 24 * 60 * 60 * 1000;

export function PwaProvider() {
  const { t } = useLang();
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 1) Service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" }).catch(() => {});
    }

    // 2) Invite d'installation native (Chrome/Edge/Android)
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
      try {
        const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
        if (Date.now() - dismissedAt > WEEK) {
          setTimeout(() => setShowModal(true), 4000);
        }
      } catch {
        setTimeout(() => setShowModal(true), 4000);
      }
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
    setShowModal(false);
  };

  const later = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch { /* noop */ }
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.pwa.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="nova-glass relative w-full max-w-sm rounded-[2rem] border-white/15 bg-[#0d0722]/95 p-8 text-center shadow-[0_40px_120px_rgba(7,2,19,0.9)]"
          >
            <button
              onClick={later}
              className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white"
              aria-label="Fermer"
            >
              ✕
            </button>
            <div className="mx-auto w-fit">
              <Mascot size={96} simple interactive={false} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold text-white">{t.pwa.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{t.pwa.sub}</p>
            <button
              onClick={install}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(124,58,237,0.5)] transition-transform hover:scale-[1.03]"
            >
              {t.pwa.install}
            </button>
            <button
              onClick={later}
              className="mt-3 w-full rounded-full px-6 py-3 text-sm font-bold text-white/50 transition-colors hover:text-white"
            >
              {t.pwa.later}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
