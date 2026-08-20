import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";

const presets = [
  {
    id: "starter",
    price: 7500,
    titleEn: "Starter",
    titlePl: "Starter",
    taglineEn: "For focused industrial sites",
    taglinePl: "Dla skoncentrowanych witryn przemysłowych",
    featuresEn: [
      "5-7 pages",
      "SEO Foundation",
      "Responsive design",
      "GDPR + Cookie Consent",
      "SSL (A+), PageSpeed 95+",
    ],
    featuresPl: [
      "5-7 stron",
      "Podstawy SEO",
      "Responsywny design",
      "GDPR + zgoda na cookies",
      "SSL (A+), PageSpeed 95+",
    ],
  },
  {
    id: "business",
    price: 15000,
    titleEn: "Business",
    titlePl: "Business",
    taglineEn: "Recommended for growing manufacturers",
    taglinePl: "Rekomendowany dla rozwijających się producentów",
    popular: true,
    featuresEn: [
      "10-15 pages",
      "SEO Professional",
      "2 languages (EN+PL)",
      "B2B Quote Form",
      "ERP Integration Ready",
    ],
    featuresPl: [
      "10-15 stron",
      "Profesjonalne SEO",
      "2 języki (EN+PL)",
      "Formularz wyceny B2B",
      "Gotowość do integracji ERP",
    ],
  },
  {
    id: "premium",
    price: 25000,
    isFromPrice: true,
    titleEn: "Premium",
    titlePl: "Premium",
    taglineEn: "Full-scale digital platform",
    taglinePl: "Pełna platforma cyfrowa",
    featuresEn: [
      "15+ pages / custom app",
      "SEO + Content Strategy",
      "3+ languages",
      "B2B Portal",
      "ERP/CRM Integration",
      "Priority support",
    ],
    featuresPl: [
      "15+ stron / aplikacja dedykowana",
      "SEO + strategia treści",
      "3+ języki",
      "Portal B2B",
      "Integracja ERP/CRM",
      "Priorytetowe wsparcie",
    ],
  },
];

export default function PricingSection() {
  const { language, t } = useLanguage();
  const isEn = language === "en";

  const bi = (en: string, pl: string) => (isEn ? en : pl);

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
                  {preset.isFromPrice ? `${bi("From", "Od")} ` : ""}
                  {formatPrice(preset.price)}
                  {preset.isFromPrice ? "+" : ""}
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

              <a
                href={isEn ? "/en/quote" : "/pl/quote"}
                onClick={() =>
                  trackEvent("pricing_quote_click", {
                    package: preset.id,
                    price: preset.price,
                    language,
                  })
                }
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  preset.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]"
                    : "border-2 border-border/60 text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {bi("Get a custom quote", "Uzyskaj wycenę")}
                <ArrowRight className="w-4 h-4" />
              </a>
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
            "Wszystkie ceny są orientacyjne. Ostateczna wycena zależy od dokładnych wymagań. Użyj kalkulatora do precyzyjnej kalkulacji.",
          )}
        </motion.p>
      </div>
    </section>
  );
}
