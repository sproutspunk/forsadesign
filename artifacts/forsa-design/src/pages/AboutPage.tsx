import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AboutContent } from "@/components/AboutContent";
import { aboutContent } from "@/data/about";
export default function AboutPage({ lang }: { lang: "pl" | "en" }) {
  const { syncLanguage } = useLanguage();
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  const c = aboutContent[lang];
  const path = lang === "pl" ? "/pl/o-nas/" : "/en/about/";
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
      { lang: "en", href: buildHref("/en/about/") },
      { lang: "pl", href: buildHref("/pl/o-nas/") },
    ],
  });
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <AboutContent lang={lang} />
      <Footer />
    </div>
  );
}
