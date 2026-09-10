import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/consentManager";

const services = [
  {
    labelEn: "Website projects",
    labelPl: "Projekty stron internetowych",
    valueEn: "Quoted individually",
    valuePl: "Wycena indywidualna",
  },
  {
    labelEn: "Custom B2B catalogues and ordering systems",
    labelPl: "Dedykowane katalogi B2B i systemy zamówień",
    valueEn: "Quoted individually",
    valuePl: "Wycena indywidualna",
  },
  {
    labelEn: "Custom web tools and API integrations",
    labelPl: "Dedykowane narzędzia webowe i integracje API",
    valueEn: "Quoted individually",
    valuePl: "Wycena indywidualna",
  },
  {
    labelEn: "Ongoing support",
    labelPl: "Stałe wsparcie",
    valueEn: "Optional, priced according to hosting, maintenance and support requirements",
    valuePl:
      "Opcjonalne, wyceniane według wymagań dotyczących hostingu, utrzymania i zakresu obsługi",
  },
];

export default function PricingSection() {
  const { language, t } = useLanguage();
  const isEn = language === "en";

  const bi = (en: string, pl: string) => (isEn ? en : pl);

  return (
    <section id="pricing" className="py-24 bg-background border-y border-border/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t("pricing.heading")}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl md:mx-auto">
            {t("pricing.subheading")}
          </p>
          <div className="w-16 h-1 bg-primary md:mx-auto mt-6" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="border border-border/20 rounded-lg overflow-hidden">
            {services.map((service, index) => (
              <motion.div
                key={service.labelEn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-6 ${
                  index !== services.length - 1 ? "border-b border-border/10" : ""
                }`}
              >
                <span className="font-medium text-white">
                  {bi(service.labelEn, service.labelPl)}
                </span>
                <span className="text-foreground/70">{bi(service.valueEn, service.valuePl)}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col items-center gap-6 text-center"
          >
            <a
              href={isEn ? "/en/quote" : "/pl/quote"}
              onClick={() =>
                trackEvent("pricing_quote_click", {
                  package: "custom_quote",
                  language,
                })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(201,168,76,0.35)] transition-all"
            >
              {bi("Get a Custom Quote", "Uzyskaj indywidualną wycenę")}
              <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-sm text-foreground/50 max-w-xl">
              {bi(
                "The final price depends on the agreed scope, functionality, content requirements and external integrations.",
                "Ostateczna cena zależy od uzgodnionego zakresu, funkcjonalności, wymagań dotyczących treści i integracji z systemami zewnętrznymi.",
              )}
            </p>

            <p className="text-sm text-foreground/50 max-w-2xl">
              {bi(
                "AI-assisted tools can reduce time spent on repetitive development tasks. I use that time where it matters more: architecture, implementation, testing, content structure, performance and the commercial purpose of the site.",
                "Narzędzia wspomagane przez AI mogą ograniczyć czas poświęcany na powtarzalne zadania developerskie. Ten czas wykorzystuję tam, gdzie ma większe znaczenie: na architekturę, wdrożenie, testy, strukturę treści, wydajność i biznesowy cel strony.",
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
