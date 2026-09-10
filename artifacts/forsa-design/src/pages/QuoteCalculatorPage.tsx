import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteRequestForm from "@/components/QuoteRequestForm";

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
    title: isEn ? "Request a Quote | Forsa Design" : "Poproś o Wycenę | Forsa Design",
    description: isEn
      ? "Tell us about your industrial, manufacturing or engineering website project and we'll send a tailored quote within one business day."
      : "Opowiedz nam o swoim projekcie strony internetowej dla przemysłu, produkcji lub inżynierii, a my prześlemy spersonalizowaną wycenę w ciągu jednego dnia roboczego.",
    ogTitle: isEn ? "Request a Quote | Forsa Design" : "Poproś o Wycenę | Forsa Design",
    ogDescription: isEn
      ? "Tell us about your industrial, manufacturing or engineering website project and we'll send a tailored quote within one business day."
      : "Opowiedz nam o swoim projekcie strony internetowej dla przemysłu, produkcji lub inżynierii, a my prześlemy spersonalizowaną wycenę w ciągu jednego dnia roboczego.",
    twitterTitle: isEn ? "Request a Quote | Forsa Design" : "Poproś o Wycenę | Forsa Design",
    twitterDescription: isEn
      ? "Tell us about your industrial, manufacturing or engineering website project and we'll send a tailored quote within one business day."
      : "Opowiedz nam o swoim projekcie strony internetowej dla przemysłu, produkcji lub inżynierii, a my prześlemy spersonalizowaną wycenę w ciągu jednego dnia roboczego.",
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
      <main id="main-content" className="pt-36 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
              {isEn ? "Request a quote" : "Poproś o wycenę"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {isEn
                ? "Tell us about your project and we'll reply with a tailored quote within one business day."
                : "Opowiedz nam o swoim projekcie, a my odpowiemy spersonalizowaną wyceną w ciągu jednego dnia roboczego."}
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-xl">
            <QuoteRequestForm isEn={isEn} source="quote-page" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
