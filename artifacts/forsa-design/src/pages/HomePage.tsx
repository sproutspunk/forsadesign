import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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

  useEffect(() => {
    const seo =
      lang === "en"
        ? {
            title: "Forsa Design | Comprehensive Website Design & Creation",
            description:
              "Forsa Design is a boutique web agency in Banff, Scotland. We build responsive websites, e-commerce platforms, and custom web applications — from concept to launch and beyond.",
            ogTitle: "Forsa Design | Web Design & Creation",
            ogLocale: "en_US",
          }
        : {
            title: "Forsa Design | Kompleksowy Web Design i Tworzenie Stron",
            description:
              "Forsa Design to agencja internetowa z Banff w Szkocji. Tworzymy responsywne strony, sklepy e-commerce i dedykowane aplikacje webowe — od koncepcji do uruchomienia.",
            ogTitle: "Forsa Design | Web Design i Tworzenie Stron",
            ogLocale: "pl_PL",
          };

    document.title = seo.title;

    const setLink = (rel: string, hreflang: string, href: string) => {
      const sel = `link[rel="alternate"][hreflang="${hreflang}"]`;
      let el = document.querySelector<HTMLLinkElement>(sel);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        el.setAttribute("hreflang", hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Meta description
    const descEl =
      document.querySelector<HTMLMetaElement>('meta[name="description"]') ||
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    descEl.setAttribute("content", seo.description);

    // OG tags
    const setOg = (prop: string, val: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.setAttribute("content", val);
    };
    setOg("og:title", seo.ogTitle);
    setOg("og:description", seo.description);
    setOg("og:locale", seo.ogLocale);

    // hreflang alternate links
    const base = window.location.origin;
    setLink("alternate", "en", `${base}/en/`);
    setLink("alternate", "pl", `${base}/pl/`);
    setLink("alternate", "x-default", `${base}/en/`);
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
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
