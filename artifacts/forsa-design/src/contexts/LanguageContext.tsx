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
      subheader: "Fast, custom-coded web platforms built to convert traffic into revenue.",
      body: "We build custom web systems for corporate clients who want results, not jargon. No fuss. No agency fluff. Just clean, fast, solid code that makes your business grow.",
      cta: "Request a Quote",
    },
    services: {
      heading: "Our Services",
      card1: {
        title: "Web Design & Development",
        desc: "No heavy, bloated templates. No pre-made page builders. We write clean code from scratch to ensure your site is secure, loads instantly, and gives you full control over your layout.",
      },
      card2: {
        title: "E-commerce & Checkout Optimization",
        desc: "Scalable shops built to sell. From deep Shopify customization to custom checkout flows, we fix slow loading times and technical glitches that cause your customers to drop off before buying.",
      },
      card3: {
        title: "Bespoke Web Applications",
        desc: "Specialized web systems for complex industries. We handle database management, legacy software upgrades, and code optimization for businesses that cannot afford a single minute of downtime.",
      },
    },
    portfolio: {
      heading: "Our Work",
      subheading: "Fast, custom-coded web platforms built to convert traffic into revenue.",
      case1: {
        title: "Love Sprouts — E-commerce Redesign",
        desc: "Rebuilt a custom Shopify store from scratch. Cut page load times to 1.1s and stopped cart abandonment.",
        tag: "[ CASE STUDY LIVE ]",
      },
      case2: {
        title: "Corporate & Legal Platform",
        desc: "High-security web systems built for conversions in the legal and financial sectors.",
        tag: "[ IN PRODUCTION ]",
      },
      case3: {
        title: "Energy Infrastructure Web App",
        desc: "Clean, custom framework integration and fast flows for enterprise scale clients.",
        tag: "[ PIPELINE ]",
      },
    },
    process: {
      heading: "How We Work",
      steps: [
        {
          title: "Technical Audit",
          desc: "We look at your business data, find what slows down your current site, and plan a fast layout focused on your sales targets.",
        },
        {
          title: "Clean Coding",
          desc: "No templates used. We build your frontend and backend from scratch, keeping the code clean, minimal, and secure.",
        },
        {
          title: "Stress-Testing",
          desc: "We run security checks, cross-browser audits, and speed tests before your platform goes live to make sure it handles high traffic smoothly.",
        },
        {
          title: "Monitoring & Updates",
          desc: "We look after server scaling, security monitoring, and speed adjustments so your site never slows down as your company grows.",
        },
      ],
    },
    about: {
      heading: "About Forsa Design",
      body: "We are an independent web development agency based in Scotland, building bespoke systems and websites for the corporate sector. We completely cut out corporate jargon, useless meetings, and artificially inflated management costs.",
      body2:
        "We design for revenue, not empty aesthetics. High-end visual design is our absolute baseline \u2013 we deliver fast, stable digital assets that actually drive conversions and protect your corporate data. We handle everything from clean code to server architecture. You collaborate directly with the engineers writing your project, eliminating miscommunication and guaranteeing technical precision from day one.",
    },
    cta: {
      heading: "Built for scale. Hardcoded for speed.",
      body: "We build custom web systems for corporate clients who want results, not jargon. No fuss. No agency fluff. Just clean, fast, solid code that makes your business grow.",
      button: "Request a Quote",
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
      tagline: "Built for scale. Hardcoded for speed.",
      location: "Banff, Scotland",
      contactPersonLabel: "Contact person",
      contactPerson: "Sprouts Punk",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2024 Forsa Design. All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      cookiePreferences: "Cookie Preferences",
    },
    cookies: {
      bannerTitle: "We use cookies",
      bannerDesc:
        "We use essential cookies to keep the site running and optional cookies to understand how you use it. You can accept all, reject non-essential cookies, or customise your preferences.",
      acceptAll: "Accept All",
      rejectNonEssential: "Reject Non-Essential",
      customise: "Customise",
      savePreferences: "Save Preferences",
      essential: "Essential",
      essentialDesc:
        "Required for the site to function (language preference, security). Cannot be disabled.",
      analytics: "Analytics",
      analyticsDesc:
        "Help us understand how visitors interact with the site (e.g. Google Analytics). No personally identifiable data is collected.",
      marketing: "Marketing",
      marketingDesc:
        "Used to show you relevant advertising on other platforms. Currently no marketing cookies are active.",
      alwaysOn: "Always on",
    },
  },
  pl: {
    nav: {
      home: "Strona G\u0142\u00f3wna",
      services: "Us\u0142ugi",
      portfolio: "Portfolio",
      process: "Proces",
      about: "O Nas",
      contact: "Kontakt",
    },
    hero: {
      tagline: "Kompleksowy Web Design i Tworzenie Stron",
      subheader:
        "Szybkie, pisane od zera strony i sklepy, stworzone by zamienia\u0107 ruch w realny zysk.",
      body: "Budujemy dedykowane systemy webowe dla firm, kt\u00f3re oczekuj\u0105 wynik\u00f3w, a nie marketingu. Bez zb\u0119dnego \u017cargonu. Bez owijania w bawe\u0142n\u0119. Tylko czysty, szybki i stabilny kod, kt\u00f3ry rozwija Tw\u00f3j biznes.",
      cta: "Popro\u015b o wycen\u0119",
    },
    services: {
      heading: "Nasze Us\u0142ugi",
      card1: {
        title: "Projektowanie i Kodowanie Stron",
        desc: "Zero ci\u0119\u017ckich, gotowych szablon\u00f3w. Zero zamulaj\u0105cych wtyczek. Piszemy czysty kod od zera, \u017ceby Twoja strona by\u0142a bezpieczna, \u0142adowa\u0142a si\u0119 natychmiast i dawa\u0142a Ci pe\u0142n\u0105 kontrol\u0119 nad wygl\u0105dem.",
      },
      card2: {
        title: "Sklepy Internetowe i P\u0142atno\u015bci",
        desc: "Skalowalne sklepy nastawione na sprzeda\u017c. Od zaawansowanych modyfikacji Shopify po autorskie koszyki zakupowe. Likwidujemy b\u0142\u0119dy techniczne, przez kt\u00f3re tracisz klient\u00f3w na etapie p\u0142atno\u015bci.",
      },
      card3: {
        title: "Dedykowane Aplikacje i Systemy",
        desc: "Z\u0142o\u017cone projekty oparte na bazach danych dla specjalistycznych bran\u017c. Tworzymy systemy od zera, od\u015bwie\u017camy stary kod i dbamy o stabilno\u015b\u0107 tam, gdzie liczy si\u0119 bezwzgl\u0119dna precyzja i brak przestoj\u00f3w.",
      },
    },
    portfolio: {
      heading: "Nasze Prace",
      subheading:
        "Szybkie, pisane od zera strony i sklepy, stworzone by zamienia\u0107 ruch w realny zysk.",
      case1: {
        title: "Love Sprouts \u2014 Przebudowa E-commerce",
        desc: "Stworzenie nowej strony Shopify od zera. Skr\u00f3cenie \u0142adowania do 1.1s i zatrzymanie porzuconych koszyk\u00f3w.",
        tag: "[ CASE STUDY LIVE ]",
      },
      case2: {
        title: "System Web dla Sektora Prawnego",
        desc: "Bezpieczny i szybki system internetowy, zaprojektowany pod k\u0105tem konwersji dla bran\u017cy prawniczej.",
        tag: "[ W REALIZACJI ]",
      },
      case3: {
        title: "Platforma Cyfrowa dla Bran\u017cy Energetycznej",
        desc: "Dedykowany, lekki framework i zoptymalizowana \u015bcie\u017cka u\u017cytkownika dla sektora enterprise.",
        tag: "[ W PLANACH ]",
      },
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        {
          title: "Audyt Techniczny",
          desc: "Analizujemy Tw\u00f3j obecny system, znajdujemy elementy, kt\u00f3re spowalniaj\u0105 stron\u0119, i planujemy struktur\u0119 kodu pod Twoje cele sprzeda\u017cowe.",
        },
        {
          title: "Pisanie Kodu",
          desc: "\u017badnych gotowc\u00f3w. Kodujemy dedykowany frontend i stabilny backend. Dbamy o to, by kod by\u0142 lekki, szybki i odporny na ataki.",
        },
        {
          title: "Testy Obci\u0105\u017ceniowe",
          desc: "Przed uruchomieniem sprawdzamy szybko\u015b\u0107, przeprowadzamy audyt bezpiecze\u0144stwa i testujemy system pod du\u017cym ruchem. Dostajesz produkt gotowy do walki.",
        },
        {
          title: "Wsparcie i Rozw\u00f3j",
          desc: "Reagujemy zanim co\u015b si\u0119 zepsuje. Dbamy o serwery, bezpiecze\u0144stwo i regularne aktualizacje kodu, \u017ceby strona dzia\u0142a\u0142a idealnie podczas rozwoju firmy.",
        },
      ],
    },
    about: {
      heading: "O Forsa Design",
      body: "Jeste\u015bmy niezale\u017cn\u0105 agencj\u0105 web developmentu ze Szkocji, tworz\u0105c\u0105 dedykowane systemy i strony dla sektora biznesowego. Ca\u0142kowicie rezygnujemy z korporacyjnego be\u0142kotu, bezu\u017cytecznych spotka\u0144 i sztucznie nadmuchanych koszt\u00f3w obs\u0142ugi.",
      body2:
        "Projektujemy z my\u015bl\u0105 o zysku, a nie o pustej estetyce. Dobry wygl\u0105d to absolutne minimum \u2013 my dostarczamy szybkie, stabilne narz\u0119dzie, kt\u00f3re realnie sprzedaje i chroni dane Twojej firmy. Robimy wszystko: od czystego kodu po architektur\u0119 serwera. Rozmawiasz bezpo\u015brednio z programistami, kt\u00f3rzy pisz\u0105 Tw\u00f3j projekt, co eliminuje b\u0142\u0119dy w ustaleniach i gwarantuje precyzj\u0119 od samego pocz\u0105tku.",
    },
    cta: {
      heading: "Stworzone by dzia\u0142a\u0107. Napisane by zarabia\u0107.",
      body: "Budujemy dedykowane systemy webowe dla firm, kt\u00f3re oczekuj\u0105 wynik\u00f3w, a nie marketingu. Bez zb\u0119dnego \u017cargonu. Bez owijania w bawe\u0142n\u0119. Tylko czysty, szybki i stabilny kod, kt\u00f3ry rozwija Tw\u00f3j biznes.",
      button: "Popro\u015b o wycen\u0119",
    },
    contact: {
      heading: "Skontaktuj Si\u0119 Z Nami",
      subheading: "Got\u00f3w na nowy projekt? Porozmawiajmy.",
      name: { label: "Imi\u0119 i Nazwisko", placeholder: "Twoje imi\u0119 i nazwisko" },
      email: { label: "Adres Email", placeholder: "tw\u00f3j@email.com" },
      projectType: { label: "Typ Projektu" },
      details: {
        label: "Szczeg\u00f3\u0142y Projektu",
        placeholder: "Opowiedz nam o swoim projekcie...",
      },
      submit: "Wy\u015blij Wiadomo\u015b\u0107",
      sending: "Wysy\u0142anie...",
      success: "Dzi\u0119kuj\u0119! Wkr\u00f3tce do Ciebie wr\u00f3cimy.",
      error:
        "Co\u015b posz\u0142o nie tak. Spr\u00f3buj ponownie lub napisz do nas bezpo\u015brednio.",
      alternative: "Lub skontaktuj si\u0119 bezpo\u015brednio:",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Sprouts Punk",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: [
        "Strona Internetowa",
        "Sklep Online",
        "Forum / Spo\u0142eczno\u015b\u0107",
        "System Z\u0142o\u017cony",
        "Inne",
      ],
      selectPlaceholder: "Wybierz typ projektu...",
      errors: {
        required: "To pole jest wymagane",
        invalidEmail: "Prosz\u0119 poda\u0107 prawid\u0142owy adres email",
        selectRequired: "Prosz\u0119 wybra\u0107 typ projektu",
        captcha: "Prosz\u0119 uko\u0144czy\u0107 weryfikacj\u0119",
      },
    },
    footer: {
      tagline: "Stworzone by dzia\u0142a\u0107. Napisane by zarabia\u0107.",
      location: "Banff, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Sprouts Punk",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2024 Forsa Design. Wszystkie prawa zastrze\u017cone.",
      terms: "Regulamin i Warunki",
      privacy: "Polityka Prywatno\u015bci",
      cookiePreferences: "Ustawienia Cookies",
    },
    cookies: {
      bannerTitle: "U\u017cywamy plik\u00f3w cookie",
      bannerDesc:
        "U\u017cywamy niezb\u0119dnych plik\u00f3w cookie, aby strona dzia\u0142a\u0142a prawid\u0142owo, oraz opcjonalnych, aby lepiej rozumie\u0107 spos\u00f3b korzystania z witryny. Mo\u017cesz zaakceptowa\u0107 wszystkie, odrzuci\u0107 niezb\u0119dne lub dostosowa\u0107 swoje preferencje.",
      acceptAll: "Akceptuj Wszystkie",
      rejectNonEssential: "Odrzu\u0107 Niezb\u0119dne",
      customise: "Dostosuj",
      savePreferences: "Zapisz Preferencje",
      essential: "Niezb\u0119dne",
      essentialDesc:
        "Wymagane do prawid\u0142owego dzia\u0142ania strony (preferencje j\u0119zykowe, bezpiecze\u0144stwo). Nie mo\u017cna wy\u0142\u0105czy\u0107.",
      analytics: "Analityczne",
      analyticsDesc:
        "Pomagaj\u0105 nam zrozumie\u0107, jak odwiedzaj\u0105cy korzystaj\u0105 ze strony (np. Google Analytics). \u017badne dane osobowe nie s\u0105 zbierane.",
      marketing: "Marketingowe",
      marketingDesc:
        "U\u017cywane do wy\u015bwietlania reklam na innych platformach. Aktualnie \u017cadne pliki cookie marketingowe nie s\u0105 aktywne.",
      alwaysOn: "Zawsze w\u0142\u0105czone",
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
