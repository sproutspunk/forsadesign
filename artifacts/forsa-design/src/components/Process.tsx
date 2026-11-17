import { useLanguage } from "@/contexts/LanguageContext";
import ProcessContent from "./ProcessContent";

export default function Process() {
  const { language } = useLanguage();
  return <ProcessContent lang={language} />;
}
