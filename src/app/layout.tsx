import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { PwaProvider } from "@/components/nova/pwa";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Nova — Révise plus malin, progresse pour de vrai",
  description:
    "Transforme tes cours, PDF et notes en cartes mémoire, quiz et sessions de révision intelligentes. Nova sait ce que tu dois réviser — et quand.",
  keywords: ["Nova", "révision", "flashcards", "quiz", "répétition espacée", "IA", "éducation", "PWA"],
  authors: [{ name: "Nova" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/favicon-64.png",
    apple: "/icons/icon-apple-180.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nova",
  },
  openGraph: {
    title: "Nova — Révise plus malin, progresse pour de vrai",
    description:
      "Flashcards, quiz et répétition espacée générés à partir de tes cours. La PWA qui sait ce que tu dois réviser — et quand.",
    siteName: "Nova",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070213",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${outfit.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <LangProvider>
          <PwaProvider />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
