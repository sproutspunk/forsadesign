import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CarbonReport from "../components/CarbonReport";
import { carbonCopy, carbonPath } from "../data/websiteCarbon";
import { useLanguage } from "../contexts/LanguageContext";
import { buildHref, useSeoMeta } from "../hooks/useSeoMeta";
export default function CarbonReportPage({ lang }: { lang: "pl" | "en" }) {
  const { syncLanguage } = useLanguage();
  const c = carbonCopy[lang];
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: c.title + " | Forsa Design",
    description: c.intro,
    ogTitle: c.title,
    ogDescription: c.intro,
    twitterTitle: c.title,
    twitterDescription: c.intro,
    ogLocale: lang === "pl" ? "pl_PL" : "en_GB",
    canonical: buildHref(carbonPath(lang)),
    alternates: [
      { lang: "pl", href: buildHref(carbonPath("pl")) },
      { lang: "en", href: buildHref(carbonPath("en")) },
    ],
  });
  return (
    <>
      <Header />
      <main id="main-content" className="pt-56 md:pt-48 pb-20">
        <CarbonReport lang={lang} />
      </main>
      <Footer />
    </>
  );
}
