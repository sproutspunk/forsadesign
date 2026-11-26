import { lazy, Suspense } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { siteCopy } from "@/data/siteCopy";
import ToolLogos from "@/components/ToolLogos";
import { trackEvent } from "@/lib/consentManager";

const TrustBar = lazy(() => import("@/components/TrustBar"));

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[62dvh] flex items-center justify-center pt-52 pb-16 md:pt-48 md:pb-20 xl:pt-40 overflow-hidden"
    >
      <div className="blueprint-hero-glow absolute inset-0 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <img
            src="/brand/forsa-logo-gradient.svg"
            alt="Forsa Design"
            width={384}
            height={273}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-64 md:w-80 lg:w-96 h-auto object-contain block mx-auto mb-2"
          />

          <div className="w-20 h-px bg-primary mb-6 mt-4" />

          <h1 className="sr-only">{t("hero.tagline")}</h1>

          <p className="text-2xl md:text-3xl font-serif font-bold leading-tight mt-5 mb-5 max-w-3xl text-balance">
            {t("hero.subheader")}
          </p>

          <div className="space-y-4 text-base md:text-lg text-foreground/70 font-light leading-relaxed mb-8 max-w-[65ch] text-left">
            {siteCopy[language].hero.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => trackEvent("cta_click", { section: "hero", language })}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.45)]"
            data-testid="btn-hero-cta"
          >
            {t("hero.cta")}
          </a>

          <ToolLogos />

          <Suspense fallback={null}>
            <TrustBar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
