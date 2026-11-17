import { useLanguage } from "@/contexts/LanguageContext";
import { openCookiePreferences } from "@/components/CookieConsent";
import FooterContent from "./FooterContent";
export default function Footer() {
  const { language } = useLanguage();
  return <FooterContent language={language} onCookiePreferences={openCookiePreferences} />;
}
