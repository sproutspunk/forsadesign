import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useCallback } from "react";

const presets = [
  {
    id: "starter",
    price: 1200,
    titleEn: "Starter",
    titlePl: "Starter",
    taglineEn: "Perfect for new businesses",
    taglinePl: "Idealny dla nowych firm",
    featuresEn: [
      "Landing page or small website",
      "Template-based design",
      "Contact form",
      "Mobile responsive",
      "SEO foundation",
    ],
    featuresPl: [
      "Strona docelowa lub mała witryna",
      "Design oparty na szablonie",
      "Formularz kontaktowy",
      "Responsywna na mobile",
      "Podstawy SEO",
    ],
  },
  {
    id: "business",
    price: 4000,
    titleEn: "Business",
    titlePl: "Business",
    taglineEn: "Grow your online presence",
    taglinePl: "Rozwijaj swoją obecność online",
    popular: true,
    featuresEn: [
      "Up to 5 pages",
      "Semi-custom design",
      "Blog & testimonials",
      "Basic SEO setup",
      "Google Maps integration",
      "Monthly care plan",
    ],
    featuresPl: [
      "Do 5 stron",
      "Design częściowo na zamówienie",
      "Blog i opinie klientów",
      "Podstawowa konfiguracja SEO",
      "Integracja z Mapami Google",
      "Miesięczny plan opieki",
    ],
  },
  {
    id: "premium",
    price: 8000,
    titleEn: "Premium",
    titlePl: "Premium",
    taglineEn: "Full-scale digital solution",
    taglinePl: "Pełne rozwiązanie cyfrowe",
    featuresEn: [
      "Up to 10 pages",
      "Fully custom design",
      "Professional copywriting",
      "Advanced SEO & analytics",
      "Newsletter & GDPR setup",
      "Priority delivery",
      "Business care plan",
    ],
    featuresPl: [
      "Do 10 stron",
      "Design w pełni na zamówienie",
      "Profesjonalny copywriting",
      "Zaawansowane SEO i analityka",
      "Newsletter i konfiguracja GDPR",
      "Priorytetowa realizacja",
      "Biznesowy plan opieki",
    ],
  },
];

export default function PricingSection() {
  const { language, t } = useLanguage();
  const [, setLocation] = useLocation();
  const isEn = language === "en";

  const bi = useCallback((en: string, pl: string) => (isEn ? en : pl), [isEn]);

  const formatPrice = (n: number) =>
    n.toLocaleString(isEn ? "en-GB" : "pl-PL", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  return (
    <section id="pricing" className="py-24 bg-card border-y border-border/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("pricing.heading")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl md:mx-auto">
            {t("pricing.subheading")}
          </p>
          <div className="w-16 h-1 bg-primary md:mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {presets.map((preset, index) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl border-2 p-6 md:p-8 flex flex-col ${
                preset.popular
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border/40 bg-card/50"
              }`}
            >
              {preset.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  {bi("Most Popular", "Najpopularniejszy")}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">
                  {isEn ? preset.titleEn : preset.titlePl}
                </h3>
                <p className="text-sm text-foreground/50">
                  {isEn ? preset.taglineEn : preset.taglinePl}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {bi("From", "Od")} {formatPrice(preset.price)}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {(isEn ? preset.featuresEn : preset.featuresPl).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setLocation(`/${language}/quote`)}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  preset.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
                    : "border-2 border-border/60 text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {bi("Get a custom quote", "Uzyskaj wycenę")}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-foreground/50 mt-10 max-w-xl mx-auto"
        >
          {bi(
            "All prices are indicative. Final quote depends on your exact requirements. Use our calculator for a precise estimate.",
            "Wszystkie ceny są orientacyjne. Ostateczna wycena zależy od dokładnych wymagań. Użyj kalkulatora dla precyzyjnej estymaty.",
          )}
        </motion.p>
      </div>
    </section>
  );
}
