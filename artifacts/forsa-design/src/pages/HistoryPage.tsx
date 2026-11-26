import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildHref, useSeoMeta } from "@/hooks/useSeoMeta";
import { historyCopy, historyPath } from "@/data/history";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HistoryContent from "@/components/HistoryContent";

export default function HistoryPage({ lang }: { lang: "en" | "pl" }) {
  const { syncLanguage } = useLanguage();
  const { title, description } = historyCopy[lang];
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: `${title} | Forsa Design`,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogLocale: lang === "pl" ? "pl_PL" : "en_GB",
    canonical: buildHref(historyPath(lang)),
    alternates: [
      { lang: "en", href: buildHref(historyPath("en")) },
      { lang: "pl", href: buildHref(historyPath("pl")) },
    ],
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <HistoryContent lang={lang} />
      <Footer />
    </div>
  );
}
