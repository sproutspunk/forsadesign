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
      comparison: "Compare",
      quote: "Quote",
      pricing: "Pricing",
      aboutPage: "About Us",
      blog: "Blog",
      faq: "FAQ",
    },
    faq: {
      heading: "Common Questions",
      subheading: "Straight answers for industrial, engineering and procurement teams.",
      searchPlaceholder: "Search questions...",
      noResults: "No questions match your search.",
      comparisonCta: "See full comparison",
      comparisonHref: "/en/comparison",
      items: [
        {
          q: "Do you use WordPress or templates?",
          a: "No. Every site is hand-coded. WordPress is fine for blogs. It is not fine for a firm that wants to pass a procurement audit without explaining why their site needs seventeen plugins and a security patch every Tuesday.",
        },
        {
          q: "How long does a project take?",
          a: "Between four and eight weeks, depending on scope. Not because I work slowly. Because I do not start coding until I understand what your buyers need to see. That conversation takes time. The coding is the easy part.",
        },
        {
          q: "What if I do not have any photos?",
          a: "We work with what you have. A decent photo of your workshop taken on a phone is better than a stock image of a smiling engineer in a hard hat that you bought from a website called BusinessPeopleSmiling.com.",
        },
        {
          q: "Do you offer ongoing support?",
          a: "Yes. Monthly care plans start at £150. That includes hosting, security updates, backups and the occasional panic email at 10 pm because you need a phone number changed before a tender deadline.",
        },
        {
          q: "Can you integrate with our existing systems?",
          a: "If it has an API, probably yes. If it runs on a spreadsheet from 2003 and a prayer, we will figure something out. I have seen worse.",
        },
      ],
    },
    hero: {
      tagline: "Web Systems for Heavy Industry",
      subheader:
        "No templates. No page builders. Just fast, secure sites that pass procurement checks.",
      body: "You build infrastructure. We build the digital layer that proves you can deliver it. With more than twenty years in international B2B industrial sales across machinery, engineering and energy procurement, I know what happens when a buyer shortlists three suppliers and checks their websites. Forsa Design builds dedicated, hand-coded websites and web systems for offshore and energy contractors, engineering firms, industrial equipment suppliers and heavy logistics operators. Based in Banff, Aberdeenshire. Serving Scotland and UK-wide.",
      cta: "Request a Technical Quote",
    },
    services: {
      heading: "What We Build",
      card1: {
        title: "Industrial Web Presence",
        desc: "Dedicated sites built from scratch for engineering and manufacturing firms. Fast load times, mobile performance for site offices and technical messaging that speaks to specifiers, not designers.",
      },
      card2: {
        title: "E-commerce for Parts and Equipment",
        desc: "B2B catalogues and ordering systems for industrial components with account pricing, bulk quotes and integrations with ERP or stock systems. Built for procurement officers, not casual browsers.",
      },
      card3: {
        title: "Bespoke Web Systems",
        desc: "Dealer portals, technical specification generators, multilingual quote engines and workflow integrations for export markets. Practical tools that fit your operation instead of disrupting it.",
      },
    },
    portfolio: {
      heading: "Current Availability",
      subheading: "Q4 2026. One project slot remains.",
      body: [
        "I take three projects per quarter. Two are already underway. I write the code. I take the calls. I test on the devices your clients actually use. That is the entire team.",
        "We do not display a wall of logos. Industrial clients do not choose suppliers because of a pretty gallery. They choose because the site answers one question. Can this firm deliver?",
        "Every project is under NDA or in active use. If you want to see our work, we show it on a call. Not because it is secret. Because context matters. A screenshot tells you nothing. You need to know why the procurement officer stays on the page instead of closing it after eight seconds.",
        "This is not a sales tactic. It is a capacity fact. I am one person. I sleep occasionally.",
        "If your website is losing you tenders you never knew you lost, we should talk.",
      ],
      cta: "Request a Call",
      ctaHref: "/en/contact/",
    },
    process: {
      heading: "How We Work",
      steps: [
        {
          title: "Discovery & Audit",
          desc: "We analyse your current site, competitors and where you lose credibility during the buyer's vetting process. We map decision-makers and the evidence they need to see.",
        },
        {
          title: "Technical Spec & Design",
          desc: "Clean architecture, hand-written code and no unnecessary plugins. Every page is built around a procurement checkpoint, with real proof of your facility, capabilities and work.",
        },
        {
          title: "Compliance, Testing & Launch",
          desc: "GDPR, accessibility, SSL and performance benchmarks. Tested on the devices your clients actually use, from phones offshore to older PCs in site cabins.",
        },
        {
          title: "Support & Evolution",
          desc: "Monthly care plans keep your site secure, updated and aligned with your contracts pipeline. As your capabilities grow, your site grows with them.",
        },
      ],
    },
    about: {
      heading: "Built by Someone Who Understood the Brief",
      body: "My name is Miro. I started Forsa Design after more than 20 years in international B2B industrial sales. I traded metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I sat on both sides of the procurement table  -  selling to refineries, negotiating with plant engineers and vetting suppliers myself.",
      body2:
        "That experience taught me one thing: most industrial firms deliver world-class work, but their digital presence does not reflect it. I am not a London agency with fifteen account managers. I am a developer who understands industry, logistics, international trade and contract deadlines. I write the code myself and answer the phone myself.",
      body3:
        "Based in Banff, Aberdeenshire. Fluent in English and Polish. Serving UK-wide and EU export markets.",
    },
    pricing: {
      heading: "Transparent Pricing",
      subheading: "Three starting points. Every project is tailored to your needs.",
    },
    cta: {
      heading: "Ready to stop apologising for your website?",
      body: "Clean code. Clear strategy. Websites that work as hard as you do on site.",
      button: "Let's Talk",
      contactHref: "/en/contact",
    },
    footer: {
      tagline: "Built for scale. Hardcoded for speed.",
      location: "Banff, Aberdeenshire, Scotland",
      contactPersonLabel: "Contact person",
      contactPerson: "Miro",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2026 Forsa Design. All rights reserved.",
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
      sitemap: "Site Map",
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
      managePreferences: "Manage your cookie preferences",
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
      comparison: "Porównanie",
      quote: "Wycena",
      pricing: "Ceny",
      aboutPage: "O Nas",
      blog: "Blog",
      faq: "FAQ",
    },
    faq: {
      heading: "Najczęstsze pytania",
      subheading: "Proste odpowiedzi dla firm przemysłowych, inżynieryjnych i zespołów zakupowych.",
      searchPlaceholder: "Szukaj pytań...",
      noResults: "Brak pytań pasujących do wyszukiwania.",
      comparisonCta: "Zobacz pełne porównanie",
      comparisonHref: "/pl/comparison",
      items: [
        {
          q: "Czy używacie WordPressa lub szablonów?",
          a: "Nie. Każda strona pisana jest ręcznie. WordPress sprawdza się przy blogach. Nie sprawdza się przy firmie, która chce przejść audyt zakupowy bez tłumaczenia, dlaczego jej strona potrzebuje siedemnastu wtyczek i łatki bezpieczeństwa w każdy wtorek.",
        },
        {
          q: "Ile trwa projekt?",
          a: "Od czterech do ośmiu tygodni, w zależności od zakresu. Nie dlatego, że pracuję wolno. Dlatego, że nie zaczynam kodować, dopóki nie zrozumiem, co Twoi kupcy muszą zobaczyć. Ta rozmowa zajmuje czas. Kodowanie to najłatwiejsza część.",
        },
        {
          q: "A jeśli nie mam żadnych zdjęć?",
          a: "Pracujemy z tym, co masz. Przeciętne zdjęcie Twojego warsztatu zrobione telefonem jest lepsze niż stockowe zdjęcie uśmiechniętego inżyniera w kasku, które kupiłeś na stronie o nazwie BusinessPeopleSmiling.com.",
        },
        {
          q: "Czy oferujecie wsparcie po wdrożeniu?",
          a: "Tak. Opieka miesięczna zaczyna się od 150 funtów. Obejmuje hosting, aktualizacje bezpieczeństwa, kopie zapasowe i ten sporadyczny mail o dziesiątej wieczorem, bo musisz zmienić numer telefonu przed terminem składania ofert.",
        },
        {
          q: "Czy możecie zintegrować stronę z naszymi istniejącymi systemami?",
          a: "Jeśli ma API, prawdopodobnie tak. Jeśli działa na arkuszu kalkulacyjnym z 2003 roku i modlitwie, coś wymyślimy. Widziałem gorsze rzeczy.",
        },
      ],
    },
    hero: {
      tagline: "Systemy Webowe dla Przemys\u0142u Ci\u0119\u017ckiego",
      subheader:
        "\u017badnych szablon\u00f3w. \u017badnych kreator\u00f3w. Tylko szybki, bezpieczny kod, kt\u00f3ry przechodzi audyt zakupowy.",
      body: "Ponad dwadzieścia lat w międzynarodowej sprzedaży B2B nauczyło mnie jednego. Firmy przemysłowe, wykonawcy rusztowań, inżynierowie M&E, transportowcy. Wszyscy wykonują świetną robotę, ale ich strony wyglądają jak relikty czasów modemu. I to kosztuje kontrakty. Gdy kupujący sprawdza trzech dostawców, ten ze spowolnioną, przeładowaną stroną odpada pierwszy. Nie dlatego, że praca jest gorsza, ale dlatego, że zaufanie zaczyna się w internecie. Nie używamy szablonów. Nie używamy page builderów. Budujemy szybkie, przejrzyste strony, które wyglądają poważnie i ładują się natychmiast na telefonie na placu budowy. Bo w biznesie B2B twoja strona to nie folder reklamowy. To twój pierwszy pracownik, twoja oferta i twoja referencja w jednym.",
      cta: "Popro\u015b o wycen\u0119 techniczn\u0105",
    },
    services: {
      heading: "Co budujemy",
      card1: {
        title: "Strony dla przemys\u0142u",
        desc: "Bez ci\u0119\u017ckich szablon\u00f3w. Bez zb\u0119dnych wtyczek. Budujemy dedykowane witryny skupione na wydajno\u015bci, wygodzie na telefonie i jasnym przekazie. Twoja strona otwiera si\u0119 szybko, dzia\u0142a na ka\u017cdym urz\u0105dzeniu i m\u00f3wi odwiedzaj\u0105cym dlaczego maj\u0105 wybra\u0107 ciebie, a nie konkurencj\u0119 zza rogu.",
      },
      card2: {
        title: "E-commerce dla cz\u0119\u015bci i urz\u0105dze\u0144",
        desc: "Je\u015bli sprzedajesz cz\u0119\u015bci, narz\u0119dzia lub us\u0142ugi przez internet, usuwamy wszystko co zabija zam\u00f3wienia. Lepszy proces zakupu, przejrzyste karty produkt\u00f3w i design mobilny, kt\u00f3ry zamienia przegl\u0105daj\u0105cych w klient\u00f3w. Niezale\u017cnie od tego czy to pe\u0142ny sklep czy prosty formularz zapytania, dbamy o to \u017ceby zarabia\u0142.",
      },
      card3: {
        title: "Dedykowane systemy webowe",
        desc: "Niekt\u00f3re firmy potrzebuj\u0105 wi\u0119cej ni\u017c standardowej strony. Portale dla dealer\u00f3w, generatory kart technicznych, wersje wieloj\u0119zyczne na rynki eksportowe albo integracja z twoimi systemami. Budujemy praktyczne narz\u0119dzia, kt\u00f3re rosn\u0105 razem z tob\u0105.",
      },
    },
    portfolio: {
      heading: "Aktualna dostępność",
      subheading: "Q4 2026. Zostało jedno miejsce.",
      body: [
        "Prowadzę trzy projekty na kwartał. Dwa są już w trakcie. Piszę kod sam. Odbieram telefony sam. Testuję na urządzeniach, których Twoi klienci faktycznie używają. To cały zespół.",
        "Nie wystawiamy ściany logotypów. Klienci przemysłowi nie wybierają dostawcy przez ładną galerię. Wybierają, bo strona odpowiada na jedno pytanie. Czy ta firma potrafi dostarczyć?",
        "Każdy projekt objęty jest NDA lub wciąż w użyciu. Jeśli chcesz zobaczyć nasze prace, pokazuję je podczas rozmowy. Nie dlatego, że to tajne. Dlatego, że kontekst ma znaczenie. Zrzut ekranu nic Ci nie powie. Musisz wiedzieć, dlaczego oficer ds. zakupów zostaje na stronie, zamiast wyłączyć ją po ośmiu sekundach.",
        "To nie jest sztuczka marketingowa. Po prostu tyle mogę. Jestem jedną osobą. Czasami śpię.",
        "Jeśli Twoja strona kosztuje Cię przetargów, o których nawet nie wiedziałeś, że je przegrałeś, powinniśmy porozmawiać.",
      ],
      cta: "Poproś o rozmowę",
      ctaHref: "/pl/contact/",
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        {
          title: "Audyt i odkrycie",
          desc: "Zaczynamy od zrozumienia twojego biznesu, twoich klient\u00f3w i tego jak ci\u0119 faktycznie znajduj\u0105. Analizujemy twoj\u0105 obecn\u0105 stron\u0119, konkurencj\u0119 i miejsca gdzie uciekaj\u0105 pieni\u0105dze. Bez zgadywania.",
        },
        {
          title: "Specyfikacja techniczna i projekt",
          desc: "Tworzymy czyst\u0105, dedykowan\u0105 witryn\u0119 zbudowan\u0105 wok\u00f3\u0142 twoich cel\u00f3w. Prawdziwe zdj\u0119cia twojej pracy, a nie stockowe fotografie m\u0119\u017cczyzn w kaskach. Jasne wezwania do dzia\u0142ania. Szybkie \u0142adowanie. Porz\u0105dna wersja mobilna.",
        },
        {
          title: "Compliance, testy i uruchomienie",
          desc: "Zanim cokolwiek p\u00f3jdzie na serwer, sprawdzamy ka\u017cd\u0105 podstron\u0119, ka\u017cdy formularz, ka\u017cdy link. Na telefonach, tabletach, laptopach i starym komputerze w biurze budowy. Musi dzia\u0142a\u0107 wsz\u0119dzie.",
        },
        {
          title: "Wsparcie i rozw\u00f3j",
          desc: "Po starcie nie znikamy. Oferujemy miesi\u0119czne plany opieki, kt\u00f3re utrzymuj\u0105 stron\u0119 bezpieczn\u0105, aktualn\u0105 i ulepszon\u0105. W miar\u0119 jak tw\u00f3j biznes ro\u015bnie, strona ro\u015bnie razem z nim.",
        },
      ],
    },
    about: {
      heading: "Zbudowane przez kogo\u015b, kto rozumia\u0142 brief",
      body: "Nazywam si\u0119 Miro. Forsa Design za\u0142o\u017cy\u0142em po ponad 20 latach w mi\u0119dzynarodowej sprzeda\u017cy B2B. Handlowa\u0142em maszynami do obr\u00f3bki metalu, wyposa\u017ceniem przemys\u0142owym i rozwi\u0105zaniami in\u017cynieryjnymi w Europie i Azji. Siedzia\u0142em po obu stronach sto\u0142u zakupowego. Wiem jak wygl\u0105da proces od pierwszego maila po podpisany kontrakt.",
      body2:
        "To do\u015bwiadczenie nauczy\u0142o mnie jednej rzeczy. Wi\u0119kszo\u015b\u0107 firm przemys\u0142owych wykonuje \u015bwietn\u0105 robot\u0119, ale ich strony internetowe nie nad\u0105\u017caj\u0105 za poziomem ich us\u0142ug. I to kosztuje kontrakty. Nie dlatego, \u017ce praca jest s\u0142aba, tylko dlatego, \u017ce w dzisiejszym B2B strona to pierwszy etap weryfikacji. Nie jestem agencj\u0105 z Londynu z pi\u0119tnastoma osobami w zespole i kawiarni\u0105 w biurze. Jestem cz\u0142owiekiem, kt\u00f3ry rozumie przemys\u0142, logistyk\u0119 i handel mi\u0119dzynarodowy. Teraz buduj\u0119 strony, kt\u00f3re komunikuj\u0105 si\u0119 j\u0119zykiem Twoich klient\u00f3w. Bez szablon\u00f3w. Bez zb\u0119dnego \u017cargonu. Tylko czysty kod i jasny przekaz.",
      body3:
        "Banff, Aberdeenshire. Obs\u0142uguj\u0119 firmy w ca\u0142ej Szkocji. M\u00f3wi\u0119 po polsku i po angielsku.",
    },
    pricing: {
      heading: "Przejrzyste ceny",
      subheading: "Trzy punkty wyj\u015bcia. Ka\u017cdy projekt dopasowany do Twoich potrzeb.",
    },
    cta: {
      heading: "Gotowy przesta\u0107 si\u0119 wstydzi\u0107 swojej strony?",
      body: "Czysty kod. Jasna strategia. Witryny, kt\u00f3re pracuj\u0105 tak ci\u0119\u017cko jak ty na budowie.",
      button: "Porozmawiajmy",
      contactHref: "/pl/contact",
    },
    footer: {
      tagline: "Stworzone z my\u015bl\u0105 o skali. Napisane dla szybko\u015bci.",
      location: "Banff, Aberdeenshire, Szkocja",
      contactPersonLabel: "Osoba kontaktowa",
      contactPerson: "Miro",
      email: "hello@forsadesign.co.uk",
      phone: "07770110735",
      copyright: "\u00A9 2026 Forsa Design. Wszystkie prawa zastrze\u017cone.",
      terms: "Regulamin i Warunki",
      privacy: "Polityka Prywatno\u015bci",
      sitemap: "Mapa Strony",
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
      managePreferences: "Zarz\u0105dzaj preferencjami cookie",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  syncLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [_, setLocation] = useLocation();
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("forsa-lang");
    return saved === "en" || saved === "pl" ? saved : "en";
  });

  const syncLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("forsa-lang", lang);
  };

  const setLanguage = (lang: Language) => {
    syncLanguage(lang);
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
    <LanguageContext.Provider value={{ language, setLanguage, syncLanguage, t }}>
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
