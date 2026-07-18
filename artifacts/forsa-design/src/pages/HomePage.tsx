import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import CTA from "@/components/CTA";
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

  const isEn = lang === "en";
  useSeoMeta({
    title: isEn
      ? "Forsa Design | Comprehensive Website Design & Creation"
      : "Forsa Design | Kompleksowy Web Design i Tworzenie Stron",
    description: isEn
      ? "Forsa Design is a boutique web agency in Banff, Scotland. We build responsive websites, e-commerce platforms, and custom web applications — from concept to launch and beyond."
      : "Forsa Design to agencja internetowa z Banff w Szkocji. Tworzymy responsywne strony, sklepy e-commerce i dedykowane aplikacje webowe — od koncepcji do uruchomienia.",
    ogTitle: isEn
      ? "Forsa Design | Web Design & Creation"
      : "Forsa Design | Web Design i Tworzenie Stron",
    ogDescription: isEn
      ? "Forsa Design is a boutique web agency in Banff, Scotland. We build responsive websites, e-commerce platforms, and custom web applications — from concept to launch and beyond."
      : "Forsa Design to agencja internetowa z Banff w Szkocji. Tworzymy responsywne strony, sklepy e-commerce i dedykowane aplikacje webowe — od koncepcji do uruchomienia.",
    twitterTitle: isEn
      ? "Forsa Design | Web Design & Creation"
      : "Forsa Design | Web Design i Tworzenie Stron",
    twitterDescription: isEn
      ? "Forsa Design is a boutique web agency in Banff, Scotland. We build responsive websites, e-commerce platforms, and custom web applications — from concept to launch and beyond."
      : "Forsa Design to agencja internetowa z Banff w Szkocji. Tworzymy responsywne strony, sklepy e-commerce i dedykowane aplikacje webowe — od koncepcji do uruchomienia.",
    ogLocale: isEn ? "en_US" : "pl_PL",
    canonical: buildHref(isEn ? "/en/" : "/pl/"),
    alternates: [
      { lang: "en", href: buildHref("/en/") },
      { lang: "pl", href: buildHref("/pl/") },
      { lang: "x-default", href: buildHref("/en/") },
    ],
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
