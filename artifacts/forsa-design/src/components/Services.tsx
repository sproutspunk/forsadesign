import { useLanguage } from "@/contexts/LanguageContext";
import { ServicesContent } from "./ServicesContent";
export default function Services() {
  const { language } = useLanguage();
  return <ServicesContent lang={language} />;
}
