import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DachCaseContent from "../components/DachCaseContent";
import { dachCase, dachPath, dachSchema } from "../data/dachCaseStudy";
import { useLanguage } from "../contexts/LanguageContext";
import { buildHref, useSeoMeta, useJsonLd } from "../hooks/useSeoMeta";
export default function DachCaseStudyPage({ lang }: { lang: "pl" | "en" }) {
  const { syncLanguage } = useLanguage();
  const c = dachCase[lang];
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: c.title + " | Forsa Design",
    description: c.intro,
    ogTitle: c.title,
    ogDescription: c.intro,
    twitterTitle: c.title,
    twitterDescription: c.intro,
    ogLocale: lang === "pl" ? "pl_PL" : "en_GB",
    canonical: buildHref(dachPath(lang)),
    alternates: [
      { lang: "pl", href: buildHref(dachPath("pl")) },
      { lang: "en", href: buildHref(dachPath("en")) },
    ],
  });
  useJsonLd(dachSchema(lang), "dach-case-study");
  return (
    <>
      <Header />
      <main id="main-content" className="pt-56 md:pt-48 pb-20">
        <DachCaseContent lang={lang} />
      </main>
      <Footer />
    </>
  );
}
