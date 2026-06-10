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
      subheader: "From idea to launch. And beyond.",
      body: "We build proper websites for businesses across Scotland. No jargon. No fuss. Just clean, fast, and solid code that actually does the job.",
      cta: "[ Start a Project ]",
    },
    services: {
      heading: "Our Services",
      card1: {
        title: "Web Design & Build",
        desc: "We build bespoke websites from scratch. Clean design, custom content management, and easy editing tools. You get a fast, responsive site tailored specifically to what your business needs.\n\nWe don't use ready-made, heavy templates. Every line of code is written to make sure your site loads instantly and stays secure.",
      },
      card2: {
        title: "E-commerce & Payments",
        desc: "Shopify integration, custom platforms, payment gateway setup. Launch your online store with confidence.",
      },
      card3: {
        title: "Advanced Projects",
        desc: "Forums, complex systems, ongoing support & optimization. We handle sophisticated solutions that grow with your business.",
      },
    },
    portfolio: {
      heading: "Our Work",
      subheading: "High-performance digital products engineered for conversion and business growth",
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
      subheader: "Od pomysłu do startu. I dalej.",
      body: "Budujemy porządne strony dla firm w całej Szkocji. Bez żargonu. Bez kombinowania. Czysty, szybki i solidny kod, który po prostu działa.",
      cta: "[ Rozpocznij projekt ]",
    },
    services: {
      heading: "Nasze Usługi",
      card1: {
        title: "Web Design i Budowa",
        desc: "Budujemy strony szyte na miarę, od zera. Czysty design, własny system zarządzania treścią i proste narzędzia do edycji. Dostajesz szybką, responsywną stronę dopasowaną dokładnie do potrzeb Twojej firmy.\n\nNie używamy gotowych, ciężkich szablonów. Każda linijka kodu jest napisana tak, aby strona ładowała się błyskawicznie i była bezpieczna.",
      },
      card2: {
        title: "Sklepy Online i Płatności",
        desc: "Integracja Shopify, platformy niestandardowe, konfiguracja bramek płatności. Uruchom swój sklep online bez obaw.",
      },
      card3: {
        title: "Zaawansowane Projekty",
        desc: "Fora, systemy złożone, ciągłe wsparcie i optymalizacja. Obsługujemy zaawansowane rozwiązania, które rosną wraz z Twoim biznesem.",
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
