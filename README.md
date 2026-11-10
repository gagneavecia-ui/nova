# Nova — Révise plus malin, progresse pour de vrai 🚀

**Nova** est un SaaS d'éducation sous forme de PWA : il transforme les cours
(PDF, photos, notes) en flashcards, quiz et sessions de révision intelligentes
(répétition espacée). Landing 100 % animée, mascotte vectorielle interactive,
bilingue FR/EN, installable comme une app.

## Stack

| Domaine | Techno |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Style | Tailwind CSS 4 (thème dark néon violet → cyan) |
| Animations | Framer Motion + animations CSS (blob morphing, glow) |
| UI | shadcn/ui (Accordion, Button, Badge) + Lucide |
| Backend (à venir) | Firebase — Auth, Firestore, FCM |
| PWA | manifest + service worker (offline) + prompt d'installation |
| Déploiement | Vercel |

## Structure

```
src/
├── app/                  # layout, page (landing), globals.css
├── components/
│   ├── nova/             # header, hero, demo, sections, pricing, faq-footer,
│   │                     # mascot (blob animé), pwa (SW + modale d'install)
│   └── ui/               # composants shadcn
└── lib/
    ├── i18n.tsx          # dictionnaire FR/EN + contexte
    └── firebase.ts       # init protégée (variables NEXT_PUBLIC_FIREBASE_*)
public/
├── manifest.webmanifest  # manifeste PWA
├── sw.js                 # service worker (cache offline)
└── icons/                # icônes de la mascotte (générées, 100 % vectoriel)
```

## Démarrage

```bash
npm install
cp .env.example .env.local   # remplir les clés Firebase (optionnel pour la landing)
npm run dev
```

## Déploiement

Le repo est lié à Vercel : chaque push sur `main` déclenche un déploiement.
Les variables d'environnement Firebase se définissent dans
**Vercel → Projet nova → Settings → Environment Variables**.

## Roadmap

- [ ] Auth Firebase (email + Google) et onboarding
- [ ] Import de cours (PDF/photo/texte) → génération de flashcards IA
- [ ] Répétition espacée (algorithme SM-2) et sessions de révision
- [ ] Mode concentration (25/5, 50/10)
- [ ] Correcteur IA + tuteur IA
- [ ] Abonnements (Mobile Money) et quotas côté serveur
