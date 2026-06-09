import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

interface HomePageProps {
  lang: "en" | "pl";
}

export default function HomePage({ lang }: HomePageProps) {
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    if (language !== lang) {
      setLanguage(lang);
    }
  }, [lang, language, setLanguage]);

  useEffect(() => {
    document.title = lang === "en" 
      ? "Forsa Design | Web Design & Creation" 
      : "Forsa Design | Web Design i Tworzenie Stron";
      
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', lang === "en" ? "en_US" : "pl_PL");
  }, [lang]);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
