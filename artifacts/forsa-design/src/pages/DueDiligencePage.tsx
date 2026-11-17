import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DueDiligenceContent from "../components/DueDiligenceContent";
import { dueDiligence, dueDiligencePath, dueDiligenceSchema } from "../data/dueDiligence";
import { useLanguage } from "../contexts/LanguageContext";
import { buildHref, useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
export default function DueDiligencePage({ lang }: { lang: "pl" | "en" }) {
  const { syncLanguage } = useLanguage();
  const c = dueDiligence[lang];
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: c.title + " | Forsa Design",
    description: c.opening[1],
    ogTitle: c.title,
    ogDescription: c.opening[1],
    twitterTitle: c.title,
    twitterDescription: c.opening[1],
    ogLocale: lang === "pl" ? "pl_PL" : "en_GB",
    canonical: buildHref(dueDiligencePath(lang)),
    alternates: [
      { lang: "pl", href: buildHref(dueDiligencePath("pl")) },
      { lang: "en", href: buildHref(dueDiligencePath("en")) },
    ],
  });
  useJsonLd(dueDiligenceSchema(lang), "due-diligence-service");
  return (
    <>
      <Header />
      <main id="main-content" className="pt-56 md:pt-48 pb-20">
        <DueDiligenceContent lang={lang} />
      </main>
      <Footer />
    </>
  );
}
