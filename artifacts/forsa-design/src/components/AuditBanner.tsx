import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/consentManager";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import QuoteRequestForm from "@/components/QuoteRequestForm";

interface AuditBannerProps {
  source: string;
}

type ActivePanel = "none" | "checklist" | "quote";

export default function AuditBanner({ source }: AuditBannerProps) {
  const { language } = useLanguage();
  const isEn = language === "en";
  const bi = (en: string, pl: string) => (isEn ? en : pl);
  const [activePanel, setActivePanel] = useState<ActivePanel>("none");

  return (
    <section className="w-full bg-background border-t border-primary/40 py-16 px-5 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-[32px] font-serif font-bold text-white leading-tight mb-4">
          {bi(
            "Does your website pass the procurement check?",
            "Czy Twoja strona przejdzie audyt zakupowy?",
          )}
        </h2>
        <p className="text-base text-foreground/60 leading-relaxed mb-8">
          {bi(
            "Download our free checklist. 10 checks. 5 minutes. See what buyers look for before they call.",
            "Pobierz darmow\u0105 checklist\u0119. 10 punkt\u00f3w. 5 minut. Zobacz, na co patrz\u0105 kupuj\u0105cy, zanim zadzwoni\u0105.",
          )}
        </p>

        {activePanel === "checklist" ? (
          <div className="max-w-xl mx-auto text-left">
            <LeadMagnetForm isEn={isEn} source={source} />
          </div>
        ) : activePanel === "quote" ? (
          <div className="max-w-xl mx-auto text-left">
            <QuoteRequestForm isEn={isEn} source={source} />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActivePanel("checklist");
                trackEvent("lead_magnet_form_open", { section: source, language });
              }}
              className="w-full sm:w-auto max-w-[320px] sm:max-w-none inline-flex items-center justify-center px-8 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-[#d4b87a] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              {bi("Get the Free Checklist", "Pobierz darmow\u0105 checklist\u0119")}
            </button>
            <button
              type="button"
              onClick={() => {
                setActivePanel("quote");
                trackEvent("quote_request_form_open", { section: source, language });
              }}
              className="text-sm text-foreground/60 underline underline-offset-4 hover:text-primary transition-colors cursor-pointer"
            >
              {bi("Or request a quote", "Albo popro\u015b o wycen\u0119")}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
