import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
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

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    }
  }, []);

  const isEn = lang === "en";
  useSeoMeta({
    title: isEn
      ? "Web Design Aberdeenshire | Forsa Design, Banff, Scotland"
      : "Tworzenie Stron Internetowych Aberdeenshire | Forsa Design",
    description: isEn
      ? "Web design agency in Banff, Aberdeenshire. Forsa Design builds fast, custom websites, e-commerce stores and web apps for businesses across Aberdeenshire and Scotland."
      : "Agencja web design z Banff w Aberdeenshire w Szkocji. Tworzymy szybkie, autorskie strony internetowe, sklepy e-commerce i aplikacje webowe dla firm z Aberdeenshire i Szkocji.",
    ogTitle: isEn
      ? "Web Design Aberdeenshire | Forsa Design"
      : "Web Design Aberdeenshire | Forsa Design",
    ogDescription: isEn
      ? "Web design agency in Banff, Aberdeenshire. Fast, custom websites, e-commerce stores and web apps for businesses across Aberdeenshire and Scotland."
      : "Agencja web design z Banff w Aberdeenshire. Szybkie, autorskie strony internetowe i sklepy e-commerce dla firm ze Szkocji.",
    twitterTitle: isEn
      ? "Web Design Aberdeenshire | Forsa Design"
      : "Web Design Aberdeenshire | Forsa Design",
    twitterDescription: isEn
      ? "Web design agency in Banff, Aberdeenshire. Fast, custom websites, e-commerce stores and web apps for businesses across Aberdeenshire and Scotland."
      : "Agencja web design z Banff w Aberdeenshire. Szybkie, autorskie strony internetowe i sklepy e-commerce dla firm ze Szkocji.",
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
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
