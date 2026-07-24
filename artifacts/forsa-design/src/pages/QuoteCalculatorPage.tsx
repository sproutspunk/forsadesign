import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteCalculator from "@/components/quote-calculator/QuoteCalculator";

interface QuoteCalculatorPageProps {
  lang: "en" | "pl";
}

export default function QuoteCalculatorPage({ lang }: QuoteCalculatorPageProps) {
  const { syncLanguage } = useLanguage();
  const isEn = lang === "en";

  useEffect(() => {
    syncLanguage(lang);
  }, [lang, syncLanguage]);

  useSeoMeta({
    title: isEn ? "Quote Calculator | Forsa Design" : "Kalkulator wyceny | Forsa Design",
    description: isEn
      ? "Get an instant estimate for your website project. Custom pricing for landing pages, business sites, e-commerce and web applications."
      : "Uzyskaj natychmiastow\u0105 wycen\u0119 swojego projektu strony. Ceny dla stron docelowych, firmowych, sklep\u00f3w i aplikacji webowych.",
    ogTitle: isEn
      ? "Website Quote Calculator | Forsa Design"
      : "Kalkulator wyceny strony | Forsa Design",
    ogDescription: isEn
      ? "Get an instant estimate for your website project. Custom pricing for landing pages, business sites, e-commerce and web applications."
      : "Uzyskaj natychmiastow\u0105 wycen\u0119 swojego projektu strony. Ceny dla stron docelowych, firmowych, sklep\u00f3w i aplikacji webowych.",
    twitterTitle: isEn
      ? "Website Quote Calculator | Forsa Design"
      : "Kalkulator wyceny strony | Forsa Design",
    twitterDescription: isEn
      ? "Get an instant estimate for your website project. Custom pricing for landing pages, business sites, e-commerce and web applications."
      : "Uzyskaj natychmiastow\u0105 wycen\u0119 swojego projektu strony. Ceny dla stron docelowych, firmowych, sklep\u00f3w i aplikacji webowych.",
    ogLocale: isEn ? "en_GB" : "pl_PL",
    canonical: buildHref(isEn ? "/en/quote" : "/pl/quote"),
    alternates: [
      { lang: "en", href: buildHref("/en/quote") },
      { lang: "pl", href: buildHref("/pl/quote") },
    ],
  });

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEn ? "Home" : "Strona Główna",
          item: `https://forsadesign.co.uk/${isEn ? "en" : "pl"}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEn ? "Quote" : "Wycena",
          item: `https://forsadesign.co.uk/${isEn ? "en" : "pl"}/quote`,
        },
      ],
    },
    "quote-breadcrumb",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main>
        <QuoteCalculator />
      </main>
      <Footer />
    </div>
  );
}
