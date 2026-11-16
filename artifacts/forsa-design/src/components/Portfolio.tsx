import { useLanguage } from "@/contexts/LanguageContext";
import PortfolioContent from "./PortfolioContent";
export default function Portfolio() {
  const { language } = useLanguage();
  return <PortfolioContent lang={language} />;
}
