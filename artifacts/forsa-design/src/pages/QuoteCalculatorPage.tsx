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
    title: isEn
      ? "Website Design Quote UK | Instant Estimate for Industrial Projects"
      : "Wycena Strony Internetowej UK | Szybki Kalkulator dla Przemysłu",
    description: isEn
      ? "Get an instant website design quote for your industrial, manufacturing or engineering project. Custom pricing for UK businesses. No email required."
      : "Uzyskaj natychmiastową wycenę strony dla projektu przemysłowego, produkcyjnego lub inżynieryjnego. Ceny dla firm w UK.",
    ogTitle: isEn
      ? "Website Design Quote Calculator | Forsa Design"
      : "Kalkulator Wyceny Strony | Forsa Design",
    ogDescription: isEn
      ? "Get an instant website design quote for your industrial, manufacturing or engineering project. Custom pricing for UK businesses."
      : "Uzyskaj natychmiastową wycenę strony dla projektu przemysłowego, produkcyjnego lub inżynieryjnego. Ceny dla firm w UK.",
    twitterTitle: isEn
      ? "Website Design Quote Calculator | Forsa Design"
      : "Kalkulator Wyceny Strony | Forsa Design",
    twitterDescription: isEn
      ? "Get an instant website design quote for your industrial, manufacturing or engineering project. Custom pricing for UK businesses."
      : "Uzyskaj natychmiastową wycenę strony dla projektu przemysłowego, produkcyjnego lub inżynieryjnego. Ceny dla firm w UK.",
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
      <main id="main-content">
        <QuoteCalculator />
      </main>
      <Footer />
    </div>
  );
}
