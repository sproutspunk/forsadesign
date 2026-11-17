import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ComparisonContent } from "@/components/ComparisonContent";
import { comparisonContent } from "@/data/comparison";
export default function ComparisonPage({ lang }: { lang: "pl" | "en" }) {
  const { syncLanguage } = useLanguage();
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  const c = comparisonContent[lang];
  const path = `/${lang}/comparison/`;
  useSeoMeta({
    title: c.seoTitle,
    description: c.seoDesc,
    ogTitle: c.seoTitle,
    ogDescription: c.seoDesc,
    twitterTitle: c.seoTitle,
    twitterDescription: c.seoDesc,
    canonical: buildHref(path),
    ogLocale: lang === "pl" ? "pl_PL" : "en_GB",
    alternates: [
      { lang: "en", href: buildHref("/en/comparison/") },
      { lang: "pl", href: buildHref("/pl/comparison/") },
    ],
  });
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <ComparisonContent lang={lang} />
      <Footer />
    </div>
  );
}
