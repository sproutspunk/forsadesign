import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

type Language = "en" | "pl";

const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      process: "Process",
      about: "About",
      contact: "Contact",
    },
    hero: {
      tagline: "Comprehensive Website Design & Creation",
      subheader: "From concept to launch - and beyond",
      cta: "Start Your Project",
    },
    services: {
      heading: "Our Services",
      card1: { title: "Web Design & Build", desc: "Responsive websites, custom CMS, integrated content editors. We build beautiful, fast, and functional sites tailored to your brand." },
      card2: { title: "E-commerce & Payments", desc: "Shopify integration, custom platforms, payment gateway setup. Launch your online store with confidence." },
      card3: { title: "Advanced Projects", desc: "Forums, complex systems, ongoing support & optimization. We handle sophisticated solutions that grow with your business." },
    },
    portfolio: {
      heading: "Our Work",
      subheading: "Featured projects completed for clients across industries",
      placeholder: "Portfolio showcase — live examples of completed projects coming soon",
    },
    process: {
      heading: "How We Work",
      steps: [
        { title: "Discovery & Planning", desc: "We understand your goals, audience, and vision." },
        { title: "Design & Development", desc: "Creative design meets clean code and best practices." },
        { title: "Launch & Testing", desc: "Rigorous testing ensures your site works flawlessly." },
        { title: "Support & Optimization", desc: "Ongoing monitoring, updates, and performance optimization." },
      ],
    },
    about: {
      heading: "About Forsa Design",
      body: "Forsa Design is a boutique web agency based in Banff, Scotland. We specialize in building professional, high-performance websites and web applications for businesses of all sizes. From startup landing pages to complex e-commerce platforms and custom solutions, we deliver quality, integrity, and ongoing support. Our approach is straightforward: understand your needs, build with excellence, and ensure your success.",
    },
    contact: {
      heading: "Get In Touch",
      subheading: "Ready to start your next project? Let's talk.",
      name: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      projectType: { label: "Project Type" },
      details: { label: "Project Details", placeholder: "Tell us about your project..." },
      submit: "Send Message",
      success: "Thank you! We'll get back to you soon.",
      alternative: "Or reach out directly at: contact@forsadesign.com",
      projectTypes: ["Website", "E-commerce Shop", "Forum / Community", "Complex System", "Other"],
      selectPlaceholder: "Select a project type...",
      errors: {
        required: "This field is required",
        invalidEmail: "Please enter a valid email address",
        selectRequired: "Please select a project type",
      },
    },
    footer: {
      tagline: "Comprehensive Website Design & Creation",
      location: "Banff, Scotland",
      copyright: "© 2024 Forsa Design. All rights reserved.",
    },
  },
  pl: {
    nav: {
      home: "Strona Główna",
      services: "Usługi",
      portfolio: "Portfolio",
      process: "Proces",
      about: "O Nas",
      contact: "Kontakt",
    },
    hero: {
      tagline: "Kompleksowy Web Design i Tworzenie Stron",
      subheader: "Od koncepcji do uruchomienia — i dalej",
      cta: "Rozpocznij Projekt",
    },
    services: {
      heading: "Nasze Usługi",
      card1: { title: "Web Design i Budowa", desc: "Responsywne strony, niestandardowe CMS, zintegrowane edytory treści. Tworzymy piękne, szybkie i funkcjonalne witryny dostosowane do Twojej marki." },
      card2: { title: "Sklepy Online i Płatności", desc: "Integracja Shopify, platformy niestandardowe, konfiguracja bramek płatności. Uruchom swój sklep online bez obaw." },
      card3: { title: "Zaawansowane Projekty", desc: "Fora, systemy złożone, ciągłe wsparcie i optymalizacja. Obsługujemy zaawansowane rozwiązania, które rosną wraz z Twoim biznesem." },
    },
    portfolio: {
      heading: "Nasze Prace",
      subheading: "Wybranych projektów wykonanych dla klientów z różnych branż",
      placeholder: "Galeria projektów — przykłady wykonanych prac wkrótce",
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        { title: "Analiza i Planowanie", desc: "Rozumiemy Twoje cele, odbiorców i wizję." },
        { title: "Projektowanie i Rozwój", desc: "Kreatywny design łączy się z czystym kodem i najlepszymi praktykami." },
        { title: "Uruchomienie i Testowanie", desc: "Gruntowne testowanie zapewnia bezawaryjne działanie Twojej witryny." },
        { title: "Wsparcie i Optymalizacja", desc: "Ciągłe monitorowanie, aktualizacje i optymalizacja wydajności." },
      ],
    },
    about: {
      heading: "O Firmie Forsa Design",
      body: "Forsa Design to boutique'owa agencja internetowa z siedzibą w Banff, Szkocja. Specjalizujemy się w tworzeniu profesjonalnych, wydajnych stron internetowych i aplikacji webowych dla firm wszystkich rozmiarów. Od stron startowych dla startupów po złożone platformy e-commerce i rozwiązania niestandardowe, dostarczamy jakość, uczciwość i ciągłe wsparcie. Nasze podejście jest proste: zrozumieć Twoje potrzeby, budować z doskonałością i zapewnić Twój sukces.",
    },
    contact: {
      heading: "Skontaktuj Się Z Nami",
      subheading: "Gotów na nowy projekt? Porozmawiajmy.",
      name: { label: "Imię i Nazwisko", placeholder: "Twoje imię i nazwisko" },
      email: { label: "Adres Email", placeholder: "twój@email.com" },
      projectType: { label: "Typ Projektu" },
      details: { label: "Szczegóły Projektu", placeholder: "Opowiedz nam o swoim projekcie..." },
      submit: "Wyślij Wiadomość",
      success: "Dziękuję! Wkrótce do Ciebie wrócimy.",
      alternative: "Lub skontaktuj się bezpośrednio: contact@forsadesign.com",
      projectTypes: ["Strona Internetowa", "Sklep Online", "Forum / Społeczność", "System Złożony", "Inne"],
      selectPlaceholder: "Wybierz typ projektu...",
      errors: {
        required: "To pole jest wymagane",
        invalidEmail: "Proszę podać prawidłowy adres email",
        selectRequired: "Proszę wybrać typ projektu",
      },
    },
    footer: {
      tagline: "Kompleksowy Web Design i Tworzenie Stron",
      location: "Banff, Szkocja",
      copyright: "© 2024 Forsa Design. Wszystkie prawa zastrzeżone.",
    },
  },
};

type NestedKeyOf<ObjectType extends object> = 
  {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

type TranslationKeys = NestedKeyOf<typeof translations.en>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [_, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("forsa-lang");
    return (saved === "en" || saved === "pl") ? saved : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("forsa-lang", lang);
    setLocation(`/${lang}/`);
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let result: any = translations[language];
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
