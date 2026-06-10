import { createContext, useContext, useState, ReactNode } from "react";
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
      subheader: "Engineered for scale. Built to perform.",
      body: "We engineer high-conversion web infrastructure for high-end corporate clients. No jargon. No fuss. Just clean, fast, and solid code that actually drives business growth.",
      cta: "[ Start a Project ]",
    },
    services: {
      heading: "Our Services",
      card1: {
        title: "Enterprise Web Engineering",
        desc: "We build high-performance corporate platforms from scratch. Zero heavy templates. Zero bloated code. Every single line is engineered for bulletproof security, instant loading times, and full custom control tailored to your exact operational requirements.",
      },
      card2: {
        title: "High-Conversion E-commerce",
        desc: "Scalable e-commerce infrastructure engineered to maximize revenue. From advanced Shopify customization to bespoke checkout architecture and secure payment gateway integration, we eliminate cart abandonment and turn high-end brand traffic into pure profit.",
      },
      card3: {
        title: "Bespoke Web Applications",
        desc: "Complex, data-driven systems engineered for specialized industries. We handle sophisticated digital infrastructure, legacy software modernization, and ongoing performance optimization for businesses that demand zero downtime and absolute precision.",
      },
    },
    portfolio: {
      heading: "Our Work",
      subheading: "High-performance digital products engineered for conversion and business growth.",
      placeholder: "Project gallery coming shortly",
    },
    process: {
      heading: "How We Work",
      steps: [
        { title: "Discovery & Planning", desc: "We understand your goals, audience, and vision." },
        {
          title: "Design & Development",
          desc: "Creative design meets clean code and best practices.",
        },
        { title: "Launch & Testing", desc: "Rigorous testing ensures your site works flawlessly." },
        {
          title: "Support & Optimization",
          desc: "Ongoing monitoring, updates, and performance optimization.",
        },
      ],
    },
    about: {
      heading: "About Forsa Design",
      body: "We are a small team based in Scotland. We don't do corporate fluff or overcomplicated pitches.",
      body2:
        "You need a website that looks good and works perfectly on every device. We build exactly that. We handle the design, the code, and all the technical bits behind the scenes. You talk directly to the person writing the code, so nothing gets lost in translation. We keep it simple, honest, and practical.",
    },
    contact: {
      heading: "Get In Touch",
      subheading: "Ready to start your next project? Let's talk.",
      name: { label: "Full Name", placeholder: "Your name" },
      email: { label: "Email Address", placeholder: "your@email.com" },
      projectType: { label: "Project Type" },
      details: { label: "Project Details", placeholder: "Tell us about your project..." },
      submit: "Send Message",
      sending: "Sending...",
      success: "Thank you! We'll get back to you soon.",
      error: "Something went wrong. Please try again, or email us directly.",
      alternative: "Or reach out directly:",
      contactPersonLabel: "Contact person",
      contactPerson: "Sprouts Punk",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: ["Website", "E-commerce Shop", "Forum / Community", "Complex System", "Other"],
      selectPlaceholder: "Select a project type...",
      errors: {
        required: "This field is required",
        invalidEmail: "Please enter a valid email address",
        selectRequired: "Please select a project type",
        captcha: "Please complete the verification",
      },
    },
    footer: {
      tagline: "Comprehensive Website Design & Creation",
      location: "Banff, Scotland",
      contactPersonLabel: "Contact person",
      contactPerson: "Sprouts Punk",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
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
      subheader: "Zaprojektowane by skalować. Stworzone by zarabiać.",
      body: "Tworzymy wysokowydajną infrastrukturę webową dla wymagających klientów biznesowych. Bez zbędnego żargonu. Bez owijania w bawełnę. Tylko czysty, szybki i solidny kod, który realnie napędza wzrost Twojej firmy.",
      cta: "[ Rozpocznij projekt ]",
    },
    services: {
      heading: "Nasze Usługi",
      card1: {
        title: "Projektowanie i Inżynieria Web",
        desc: "Budujemy od zera wysokowydajne platformy korporacyjne. Zero ciężkich szablonów. Zero przeładowanego kodu. Każda linijka jest zaprojektowana z myślą o pancernym bezpieczeństwie, błyskawicznym ładowaniu i pełnej kontroli nad systemem.",
      },
      card2: {
        title: "E-commerce i Systemy Płatności",
        desc: "Skalowalna infrastruktura sprzedażowa zaprojektowana do maksymalizacji przychodów. Od zaawansowanych modyfikacji Shopify po autorską architekturę procesu zakupowego. Likwidujemy problem porzuconych koszyków i przekuwamy ruch w czysty zysk.",
      },
      card3: {
        title: "Dedykowane Aplikacje i Systemy",
        desc: "Złożone systemy oparte na danych, projektowane dla wymagających sektorów biznesowych. Tworzymy zaawansowaną infrastrukturę cyfrową, modernizujemy systemy i optymalizujemy wydajność tam, gdzie liczy się absolutna precyzja i brak przestojów.",
      },
    },
    portfolio: {
      heading: "Nasze Prace",
      subheading: "Wydajne rozwiązania cyfrowe zaprojektowane z myślą o maksymalizacji konwersji i skalowaniu biznesu.",
      placeholder: "Galeria projektów już wkrótce",
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        { title: "Analiza i Planowanie", desc: "Rozumiemy Twoje cele, odbiorców i wizję." },
        {
          title: "Projektowanie i Rozwój",
          desc: "Kreatywny design łączy się z czystym kodem i najlepszymi praktykami.",
        },
        {
          title: "Uruchomienie i Testowanie",
          desc: "Gruntowne testowanie zapewnia bezawaryjne działanie Twojej witryny.",
        },
        {
          title: "Wsparcie i Optymalizacja",
          desc: "Ciągłe monitorowanie, aktualizacje i optymalizacja wydajności.",
        },
      ],
    },
    about: {
      heading: "O Forsa Design",
      body: "Jesteśmy małym zespołem ze Szkocji. Nie robimy korporacyjnego lania wody ani przekombinowanych prezentacji.",
      body2:
        "Potrzebujesz strony, która dobrze wygląda i działa bez zarzutu na każdym urządzeniu. Dokładnie taką budujemy. Zajmujemy się projektem, kodem i wszystkimi technicznymi sprawami w tle. Rozmawiasz bezpośrednio z osobą, która pisze kod, więc nic nie ginie po drodze. Prosto, uczciwie i praktycznie.",
    },
    contact: {
      heading: "Skontaktuj Się Z Nami",
      subheading: "Gotów na nowy projekt? Porozmawiajmy.",
      name: { label: "Imię i Nazwisko", placeholder: "Twoje imię i nazwisko" },
      email: { label: "Adres Email", placeholder: "twój@email.com" },
      projectType: { label: "Typ Projektu" },
      details: { label: "Szczegóły Projektu", placeholder: "Opowiedz nam o swoim projekcie..." },
      submit: "Wyślij Wiadomość",
      sending: "Wysyłanie...",
      success: "Dziękuję! Wkrótce do Ciebie wrócimy.",
      error: "Coś poszło nie tak. Spróbuj ponownie lub napisz do nas bezpośrednio.",
      alternative: "Lub skontaktuj się bezpośrednio:",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Sprouts Punk",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: [
        "Strona Internetowa",
        "Sklep Online",
        "Forum / Społeczność",
        "System Złożony",
        "Inne",
      ],
      selectPlaceholder: "Wybierz typ projektu...",
      errors: {
        required: "To pole jest wymagane",
        invalidEmail: "Proszę podać prawidłowy adres email",
        selectRequired: "Proszę wybrać typ projektu",
        captcha: "Proszę ukończyć weryfikację",
      },
    },
    footer: {
      tagline: "Kompleksowy Web Design i Tworzenie Stron",
      location: "Banff, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Sprouts Punk",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "© 2024 Forsa Design. Wszystkie prawa zastrzeżone.",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [_, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("forsa-lang");
    return saved === "en" || saved === "pl" ? saved : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("forsa-lang", lang);
    setLocation(`/${lang}/`);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: unknown = translations[language];
    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = (result as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }
    return result as string;
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
