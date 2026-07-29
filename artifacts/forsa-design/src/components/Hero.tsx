import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[70dvh] flex items-center justify-center pt-8 overflow-hidden"
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight leading-tight mb-3 max-w-4xl">
            {t("hero.tagline")}
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 font-light mb-3 max-w-3xl">
            {t("hero.subheader")}
          </p>

          <p className="text-base md:text-lg text-foreground/60 font-light leading-relaxed mb-6 max-w-5xl text-center">
            {t("hero.body")}
          </p>

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-sm transition-shadow hover:shadow-[0_0_20px_rgba(201,168,76,0.45)]"
            data-testid="btn-hero-cta"
          >
            {t("hero.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
