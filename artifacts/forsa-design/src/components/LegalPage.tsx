import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { openCookiePreferences } from "./CookieConsent";
import LegalContent from "./LegalContent";
import Footer from "./Footer";
export default function LegalPage({
  lang,
  kind,
}: {
  lang: "pl" | "en";
  kind: "terms" | "privacy";
}) {
  const { syncLanguage } = useLanguage();
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  const title =
    kind === "terms"
      ? lang === "pl"
        ? "Regulamin świadczenia usług"
        : "Terms and Conditions"
      : lang === "pl"
        ? "Polityka prywatności i cookies"
        : "Privacy and cookie notice";
  useSeoMeta({
    title: `${title} | Forsa Design`,
    description:
      lang === "pl"
        ? "Informacje o zasadach usług i przetwarzania danych w Forsa Design."
        : "Information about service terms and data processing at Forsa Design.",
    ogTitle: title,
    ogDescription: title,
    twitterTitle: title,
    twitterDescription: title,
    canonical: buildHref(`/${lang}/${kind}/`),
    ogLocale: lang === "pl" ? "pl_PL" : "en_GB",
    alternates: [
      { lang: "en", href: buildHref(`/en/${kind}/`) },
      { lang: "pl", href: buildHref(`/pl/${kind}/`) },
    ],
  });
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <LegalContent lang={lang} kind={kind} onPreferences={openCookiePreferences} />
      <Footer />
    </div>
  );
}
