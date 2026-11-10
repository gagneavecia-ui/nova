import { Header } from "@/components/nova/header";
import { Hero, BackgroundFX } from "@/components/nova/hero";
import { DemoSection } from "@/components/nova/demo";
import { HowItWorks, Features, FinalCta } from "@/components/nova/sections";
import { Pricing } from "@/components/nova/pricing";
import { Faq, Footer } from "@/components/nova/faq-footer";

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <BackgroundFX />
      <Header />
      <main className="flex-1">
        <Hero />
        <DemoSection />
        <HowItWorks />
        <Features />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
