import { lazy, Suspense, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/consentManager";
import LeadMagnetForm from "@/components/LeadMagnetForm";

const TrustBar = lazy(() => import("@/components/TrustBar"));

export default function Hero() {
  const { t, language } = useLanguage();
  const isEn = language === "en";
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[58dvh] flex items-center justify-center pt-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <img
            src="/logo-hero-384.webp?v=17"
            alt="Forsa Design"
            width={384}
            height={317}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-64 md:w-80 lg:w-96 h-auto object-contain block mx-auto mb-2"
          />

          <div className="w-20 h-px bg-primary mb-4 mt-3" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-3 max-w-4xl">
            {t("hero.tagline")}
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 font-medium mb-4 max-w-3xl text-balance">
            {t("hero.subheader")}
          </p>

          <p className="text-base md:text-lg text-foreground/60 font-light leading-relaxed mb-6 max-w-[65ch] text-left">
            {t("hero.body")}
          </p>

          <a
            href="#contact"
            onClick={() => trackEvent("cta_click", { section: "hero", language })}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.45)]"
            data-testid="btn-hero-cta"
          >
            {t("hero.cta")}
          </a>

          <button
            type="button"
            onClick={() => {
              const next = !showLeadMagnet;
              setShowLeadMagnet(next);
              if (next) trackEvent("lead_magnet_form_open", { section: "hero", language });
            }}
            className="mt-4 text-sm font-medium text-foreground/60 hover:text-primary transition-colors underline underline-offset-4"
          >
            {isEn
              ? "Not ready? Download our free 5-min audit checklist"
              : "Jeszcze nie teraz? Pobierz darmowa checkliste (5 min)"}
          </button>

          {showLeadMagnet && (
            <LeadMagnetForm isEn={isEn} source="hero" className="mt-4 w-full max-w-xl" />
          )}

          <Suspense fallback={null}>
            <TrustBar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
