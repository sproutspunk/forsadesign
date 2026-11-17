import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent } from "@/lib/consentManager";
import FAQContent from "./FAQContent";

export default function FAQ() {
  const { language } = useLanguage();
  return (
    <FAQContent
      lang={language}
      onExpand={(question) => trackEvent("faq_expanded", { question: question.slice(0, 80) })}
    />
  );
}
