"use client";

// ================================================================
// NOVA — i18n léger FR/EN (persistance localStorage)
// ================================================================
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en";

const fr = {
  nav: {
    features: "Fonctionnalités",
    how: "Fonctionnement",
    pricing: "Tarifs",
    faq: "FAQ",
    login: "Connexion",
    cta: "Commencer gratuitement",
  },
  hero: {
    badge: "Pour les élèves du collège à l'université",
    title1: "Révise plus malin,",
    titleGrad: "progresse",
    title2: "pour de vrai.",
    sub: "Transforme tes cours, PDF et notes en cartes mémoire, quiz et sessions de révision intelligentes. Nova sait ce que tu dois réviser — et quand.",
    cta: "Commencer gratuitement",
    demo: "Voir la démo",
    promo: "Ton 1er abonnement remboursé à 100%",
    reassure: ["Sans carte bancaire", "Sur mobile et web", "Révision hors ligne"],
    floatXp: "+340 XP",
    floatStreak: "Série : 7 jours 🔥",
    floatNext: "Prochaine révision : demain",
    hello: "Bonjour 👋",
    ready: "Prêt(e) à réviser aujourd'hui ?",
  },
  stats: [
    { v: "98%", l: "des notions mémorisées avec une révision régulière" },
    { v: "+300", l: "élèves révisent déjà plus efficacement" },
    { v: "4,8/5", l: "de satisfaction utilisateur" },
  ],
  demo: {
    eyebrow: "DÉMO · Active recall",
    title: "Nova ne te fait pas relire.",
    sub: "Il te demande ce dont tu te souviens avant de montrer la réponse. C'est ça, le rappel actif.",
    hint: "Avant de retourner la carte : tu la connais ?",
    buttons: ["Je ne sais pas", "Je crois savoir", "Je sais !"],
    nextReview: "Prochaine révision : dans 4 jours",
    again: "Carte suivante",
    reactOk: "Bravo ! Nova est fier de toi ✨",
    reactMid: "Presque ! On révise ensemble ?",
    reactKo: "Pas grave — c'est justement pour ça que Nova est là 💪",
    cards: [
      {
        eyebrow: "BIOLOGIE · Chapitre 3",
        q: "Quelle est la fonction principale des mitochondries ?",
        a: "Produire l'énergie de la cellule (ATP) — la centrale électrique du corps.",
      },
      {
        eyebrow: "MATHÉMATIQUES · Théorème",
        q: "Que dit le théorème de Thalès ?",
        a: "Une droite parallèle à un côté d'un triangle crée un triangle semblable, avec des longueurs proportionnelles.",
      },
      {
        eyebrow: "PHYSIQUE · Unités",
        q: "Quelle est l'unité de la force ?",
        a: "Le newton (N) — la force qui donne une accélération de 1 m/s² à 1 kg.",
      },
    ],
  },
  how: {
    eyebrow: "COMMENT ÇA MARCHE",
    title: "Trois étapes, zéro perte de temps",
    steps: [
      { t: "Importe ton cours", d: "PDF, photo ou texte — Nova extrait l'essentiel automatiquement." },
      { t: "Nova crée tes cartes", d: "Flashcards, quiz et fiches générés en quelques secondes, prêts à réviser." },
      { t: "Révise au bon moment", d: "La répétition espacée te rappelle chaque notion juste avant l'oubli." },
    ],
  },
  feat: {
    eyebrow: "FONCTIONNALITÉS",
    title: "Tout ce qu'il faut pour ne plus rien oublier",
    items: [
      { t: "Flashcards auto", d: "Tes PDF, photos et notes deviennent des cartes interactives en quelques secondes." },
      { t: "Quiz intelligents", d: "Des questions adaptées à ton niveau, qui ciblent tes points faibles." },
      { t: "Répétition espacée", d: "L'algorithme sait exactement QUAND te faire réviser chaque notion." },
      { t: "Mode concentration", d: "Des sessions 25/5 ou 50/10, sans distractions, pour un travail profond." },
      { t: "Correcteur IA", d: "Tes réponses écrites ou manuscrites sont corrigées et expliquées." },
      { t: "Tuteur IA", d: "Chaque concept difficile devient simple, avec des explications sur mesure." },
    ],
  },
  pricing: {
    eyebrow: "TARIFS",
    title: "Commence gratuitement. Passe au niveau supérieur quand tu veux.",
    per: "/mois",
    recommended: "RECOMMANDÉ",
    choose: "Choisir",
    plans: [
      { n: "Gratuit", tag: "Essayer sur tes cours", price: "0 F", f: ["3 cours par mois", "50 flashcards", "Quiz de base"] },
      { n: "Essentiel", tag: "Pour démarrer fort", price: "1 500 F", f: ["Cours illimités", "500 flashcards", "Répétition espacée", "Stats de base"] },
      { n: "Intensif", tag: "Pour plus d'entraînement", price: "3 000 F", f: ["Tout Essentiel", "Quiz illimités", "Correcteur IA", "Mode concentration"] },
      { n: "Pro", tag: "Viser plus haut", price: "4 500 F", f: ["Tout Intensif", "Tuteur IA", "Exports PDF", "Support prioritaire"] },
    ],
    note: "Paiement Mobile Money sécurisé · Annulable à tout moment",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    items: [
      { q: "Nova remplace-t-il mes cours ?", a: "Non — Nova s'appuie sur TES cours (PDF, photos, notes) et les transforme en révision efficace. C'est un entraîneur, pas un remplaçant." },
      { q: "Comment Nova sait-il quoi me faire réviser ?", a: "Grâce à la répétition espacée : chaque carte revient juste avant que tu sois sur le point de l'oublier. Tu révises moins, tu retiens plus." },
      { q: "Puis-je utiliser Nova hors ligne ?", a: "Oui — Nova est une PWA : installe-la sur ton téléphone et révise même sans connexion. Tout se synchronise dès que tu reviens en ligne." },
      { q: "Mes cours sont-ils en sécurité ?", a: "Tes documents sont chiffrés et ne sont jamais partagés. Tu gardes le contrôle total de tes données." },
      { q: "Puis-je annuler mon abonnement ?", a: "À tout moment, en un clic depuis ton profil. Ton 1er abonnement est remboursé à 100% si tu n'es pas convaincu." },
    ],
  },
  ctaFinal: {
    title: "On ne prépare pas son examen la veille.",
    sub: "Commence par un seul chapitre.",
    btn: "Commencer gratuitement",
    note: "3 cours par mois sur le plan gratuit.",
  },
  footer: {
    product: "PRODUIT",
    resources: "RESSOURCES",
    legal: "LÉGAL",
    tagline: "Révise plus malin.",
    made: "Fait avec 💜 pour les élèves d'Afrique",
    privacy: "Confidentialité",
    terms: "Conditions",
    contact: "Contact",
  },
  pwa: {
    title: "Installe Nova sur ton appareil",
    sub: "Ouvre l'app directement depuis ton écran d'accueil, sans passer par le navigateur.",
    install: "Installer",
    later: "Plus tard",
  },
};

export type Dict = typeof fr;

const en: Dict = {
  nav: {
    features: "Features",
    how: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
    login: "Log in",
    cta: "Start for free",
  },
  hero: {
    badge: "For school and university students",
    title1: "Study smarter,",
    titleGrad: "progress",
    title2: "for real.",
    sub: "Turn your courses, PDFs and notes into flashcards, quizzes and smart revision sessions. Nova knows what you need to review — and when.",
    cta: "Start for free",
    demo: "See the demo",
    promo: "Your 1st subscription refunded at 100%",
    reassure: ["No credit card needed", "On mobile and web", "Offline revision"],
    floatXp: "+340 XP",
    floatStreak: "Streak: 7 days 🔥",
    floatNext: "Next review: tomorrow",
    hello: "Hello 👋",
    ready: "Ready to revise today?",
  },
  stats: [
    { v: "98%", l: "more concepts remembered with regular revision" },
    { v: "+300", l: "students already revise more effectively" },
    { v: "4.8/5", l: "user satisfaction" },
  ],
  demo: {
    eyebrow: "DEMO · Active recall",
    title: "Nova doesn't ask you to reread.",
    sub: "It asks what you remember before showing the answer. That's active recall.",
    hint: "Before flipping the card: do you know it?",
    buttons: ["I don't know", "I think I know", "I know it!"],
    nextReview: "Next review: in 4 days",
    again: "Next card",
    reactOk: "Well done! Nova is proud of you ✨",
    reactMid: "Almost! Shall we revise together?",
    reactKo: "No worries — that's exactly why Nova is here 💪",
    cards: [
      {
        eyebrow: "BIOLOGY · Chapter 3",
        q: "What is the main function of mitochondria?",
        a: "Producing the cell's energy (ATP) — the body's power plant.",
      },
      {
        eyebrow: "MATHS · Theorem",
        q: "What does Thales' theorem state?",
        a: "A line parallel to one side of a triangle creates a similar triangle with proportional lengths.",
      },
      {
        eyebrow: "PHYSICS · Units",
        q: "What is the unit of force?",
        a: "The newton (N) — the force giving 1 kg an acceleration of 1 m/s².",
      },
    ],
  },
  how: {
    eyebrow: "HOW IT WORKS",
    title: "Three steps, zero wasted time",
    steps: [
      { t: "Import your course", d: "PDF, photo or text — Nova extracts the essentials automatically." },
      { t: "Nova builds your cards", d: "Flashcards, quizzes and summaries generated in seconds, ready to review." },
      { t: "Review at the right time", d: "Spaced repetition brings each concept back just before you forget it." },
    ],
  },
  feat: {
    eyebrow: "FEATURES",
    title: "Everything you need to never forget again",
    items: [
      { t: "Auto flashcards", d: "Your PDFs, photos and notes become interactive cards in seconds." },
      { t: "Smart quizzes", d: "Questions tuned to your level, targeting your weak spots." },
      { t: "Spaced repetition", d: "The algorithm knows exactly WHEN to review each concept with you." },
      { t: "Focus mode", d: "25/5 or 50/10 sessions, distraction-free, for deep work." },
      { t: "AI grader", d: "Your written or handwritten answers are graded and explained." },
      { t: "AI tutor", d: "Every tough concept becomes simple, with tailored explanations." },
    ],
  },
  pricing: {
    eyebrow: "PRICING",
    title: "Start for free. Level up whenever you want.",
    per: "/month",
    recommended: "RECOMMENDED",
    choose: "Choose",
    plans: [
      { n: "Free", tag: "Try it on your courses", price: "0 F", f: ["3 courses per month", "50 flashcards", "Basic quizzes"] },
      { n: "Essential", tag: "To start strong", price: "1 500 F", f: ["Unlimited courses", "500 flashcards", "Spaced repetition", "Basic stats"] },
      { n: "Intensive", tag: "For more practice", price: "3 000 F", f: ["Everything in Essential", "Unlimited quizzes", "AI grader", "Focus mode"] },
      { n: "Pro", tag: "Aim high", price: "4 500 F", f: ["Everything in Intensive", "AI tutor", "PDF exports", "Priority support"] },
    ],
    note: "Secure Mobile Money payment · Cancel anytime",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      { q: "Does Nova replace my courses?", a: "No — Nova builds on YOUR courses (PDFs, photos, notes) and turns them into effective revision. It's a coach, not a replacement." },
      { q: "How does Nova know what to review?", a: "Through spaced repetition: each card comes back right before you're about to forget it. Review less, remember more." },
      { q: "Can I use Nova offline?", a: "Yes — Nova is a PWA: install it on your phone and revise even without a connection. Everything syncs when you're back online." },
      { q: "Are my courses safe?", a: "Your documents are encrypted and never shared. You keep full control of your data." },
      { q: "Can I cancel my subscription?", a: "Anytime, in one click from your profile. Your 1st subscription is refunded at 100% if you're not convinced." },
    ],
  },
  ctaFinal: {
    title: "You don't prepare your next exam the night before.",
    sub: "Start with a single chapter.",
    btn: "Start for free",
    note: "3 courses a month on the free plan.",
  },
  footer: {
    product: "PRODUCT",
    resources: "RESOURCES",
    legal: "LEGAL",
    tagline: "Study smarter.",
    made: "Made with 💜 for Africa's students",
    privacy: "Privacy",
    terms: "Terms of use",
    contact: "Contact",
  },
  pwa: {
    title: "Install Nova on your device",
    sub: "Open the app straight from your home screen, without going through the browser.",
    install: "Install",
    later: "Later",
  },
};

const dict: Record<Lang, Dict> = { fr, en };

type LangCtxValue = { lang: Lang; setLang: (l: Lang) => void; t: Dict };

const LangCtx = createContext<LangCtxValue>({
  lang: "fr",
  setLang: () => {},
  t: fr,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const saved = localStorage.getItem("nova-lang");
        if (saved === "en" || saved === "fr") setLangState(saved);
      } catch { /* noop */ }
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("nova-lang", l);
    } catch { /* noop */ }
    document.documentElement.lang = l;
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
