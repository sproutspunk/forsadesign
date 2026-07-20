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
    },
    faq: {
      heading: "FAQ",
      subheading: "Answers to the most common questions about working with us.",
      searchPlaceholder: "Search questions…",
      noResults: "No questions match your search.",
      comparisonCta: "See full comparison",
      comparisonHref: "/en/comparison",
      items: [
        {
          q: "Do you have experience in my industry?",
          a: "An agency that works with every type of business may not always have deep experience in a specific area. Ask what projects they have completed in your industry and what results they achieved. Look at more than just design. Consider performance, usability, conversions, and business impact.",
        },
        {
          q: "What is your discovery process?",
          a: "A professional agency should not start building after a short conversation. The first stage should include understanding your goals, customers, competitors, and current challenges. If the process starts with choosing a template, important details may be missed.",
        },
        {
          q: "Do you focus on SEO and performance?",
          a: "A website needs to do more than look good. It should load quickly, work well across devices, and help customers find your business. Ask how they approach technical SEO, speed, and measuring results.",
        },
        {
          q: "Who will manage my project?",
          a: "Clear communication matters. You should know who is responsible for your project and who understands your business goals. A dedicated contact person keeps the process organised.",
        },
        {
          q: "What happens after launch?",
          a: "A website needs ongoing care. Ask about updates, security, backups, technical support, and future improvements. A launch should be the beginning, not the end.",
        },
        {
          q: "Can I move my website if my needs change?",
          a: "Your website should belong to you. A good agency builds with flexibility in mind, allowing you to change providers without losing control of your data or domain.",
        },
        {
          q: "How is pricing structured?",
          a: "Pricing should be clear from the beginning. You should understand what is included, what happens if the project changes, and what future costs may appear.",
        },
      ],
    },
    hero: {
      tagline: "Websites for Industrial and Trade Businesses Across Scotland",
      subheader: "You know your trade. We know how your customers judge you through a screen.",
      body: "Eighteen years in international B2B sales taught me one thing. Industrial firms, scaffolding contractors, M&E engineers, haulage companies. They all deliver top quality work, but their websites look like relics from the dial up era. And that costs contracts. When a buyer checks three suppliers, the one with a slow, cluttered site drops off the list first. Not because the work is worse, but because trust starts online. We do not use templates. We do not use page builders. We build fast, clear websites that look serious and load instantly on a phone at a yard. Because in B2B business your website is not a brochure. It is your first employee, your pitch and your reference check rolled into one.",
      cta: "Request a Quote",
    },
    services: {
      heading: "What We Do",
      card1: {
        title: "Sites That Deliver Results",
        desc: "No heavy templates. No unnecessary plugins. We build dedicated sites focused on performance, mobile usability and clear messaging. Your site opens quickly, works on every device and tells visitors why they should choose you, not the competition around the corner.",
      },
      card2: {
        title: "E-Commerce and Sales Optimisation",
        desc: "If you sell parts, tools or services online, we remove everything that kills orders. Better checkout flow, clear product pages and mobile design that turns browsers into buyers. Whether it is a full shop or a simple enquiry form, we make sure it earns its keep.",
      },
      card3: {
        title: "Bespoke Solutions",
        desc: "Some businesses need more than a standard site. Dealer portals, technical spec generators, multilingual versions for export markets or integration with your existing systems. We build practical tools that grow with you.",
      },
    },
    portfolio: {
      heading: "Our Work",
      subheading:
        "We are currently building our portfolio in the industrial and trade sector. That means our first partners get first rate work at a sharp rate.",
      case1: {
        title: "Portfolio Building\nPhase",
        desc: "We are currently building our portfolio in the industrial and trade sector. That means our first partners get first rate work at a sharp rate, with the understanding that we will be able to showcase the project after it goes live.",
        tag: "[ 20% DISCOUNT ]",
      },
      case2: {
        title: "First Partner\nOffer",
        desc: "If you are willing to become one of our first case studies, we offer a twenty percent discount on the project in exchange for a testimonial, permission to feature your site in our portfolio and an introduction to two other business owners in your network when the time is right.",
        tag: "[ NO PRESSURE ]",
      },
      case3: {
        title: "Future\nProjects",
        desc: "New case studies covering custom websites, optimisation, and business-focused digital solutions for industrial and trade businesses across Scotland.",
        tag: "[ COMING SOON ]",
      },
    },
    process: {
      heading: "How We Work",
      steps: [
        {
          title: "Discovery",
          desc: "We start by understanding your business, your customers and how they actually find you. We analyse your current site, your competition and where the money leaks out. No guesswork.",
        },
        {
          title: "Design and Build",
          desc: "We create a clean, dedicated site built around your goals. Real photos of your work, not stock images of men in hard hats. Clear calls to action. Fast loading. Proper mobile experience.",
        },
        {
          title: "Testing and Launch",
          desc: "Before anything goes to the server, we check every page, every form, every link. On phones, tablets, laptops and the old computer in the site office. It has to work everywhere.",
        },
        {
          title: "Support and Growth",
          desc: "After launch we do not disappear. We offer monthly care plans that keep your site secure, updated and improving. As your business grows, your site grows with it.",
        },
      ],
    },
    about: {
      heading: "Miro — Founder of Forsa Design",
      body: "I started Forsa Design after more than 20 years in international B2B sales. I traded metalworking machinery, industrial equipment and engineering solutions across Europe and Asia. I sat on both sides of the procurement table. I know what the process looks like from the first email to the signed contract.",
      body2:
        "That experience taught me one thing. Most industrial firms do excellent work, but their websites do not keep up with the standard of their services. And it costs contracts. Not because the work is poor it is because in B2B today, your website is the first stage of vetting. I am not a London agency with fifteen people on the team and a coffee bar in the office. I am someone who understands industry, logistics and international trade. I now build websites that speak your customers' language. No templates. No jargon. Just clean code and a clear message. Based in Banff, Aberdeenshire. Serving businesses across Scotland. Fluent in Polish and English.",
    },
    pricing: {
      heading: "Transparent Pricing",
      subheading: "Three starting points. Every project is tailored to your needs.",
    },
    cta: {
      heading: "Ready to stop apologising for your website?",
      body: "Clean code. Clear strategy. Websites that work as hard as you do on site.",
      button: "Let's Talk",
    },
    contact: {
      heading: "Get In Touch",
      subheading: "Ready to stop apologising for your website? Let's talk.",
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
      contactPerson: "Miro",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: ["Website", "E-commerce Shop", "Website Redesign", "Complex System", "Other"],
      selectPlaceholder: "Select a project type...",
      errors: {
        required: "This field is required",
        invalidEmail: "Please enter a valid email address",
        selectRequired: "Please select a project type",
        captcha: "Please complete the verification",
        captchaFailed:
          "Security verification failed to load. Please refresh the page and try again.",
      },
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
    },
    faq: {
      heading: "FAQ",
      subheading: "Odpowiedzi na najczęstsze pytania dotyczące współpracy z nami.",
      searchPlaceholder: "Szukaj pytań…",
      noResults: "Brak pytań pasujących do wyszukiwania.",
      comparisonCta: "Zobacz pełne porównanie",
      comparisonHref: "/pl/comparison",
      items: [
        {
          q: "Czy macie do\u015bwiadczenie w mojej bran\u017cy?",
          a: "Agencja pracuj\u0105ca z ka\u017cdym typem biznesu nie zawsze ma g\u0142\u0119bokie do\u015bwiadczenie w konkretnej dziedzinie. Zapytaj, jakie projekty zrealizowali w Twojej bran\u017cy i jakie wyniki osi\u0105gn\u0119li. Patrz szerzej ni\u017c tylko na design \u2014 we\u017a pod uwag\u0119 wydajno\u015b\u0107, u\u017cyteczno\u015b\u0107, konwersje i wp\u0142yw na biznes.",
        },
        {
          q: "Jaki jest Wasz proces odkrywania projektu?",
          a: "Profesjonalna agencja nie powinna zaczyna\u0107 budowania po kr\u00f3tkim spotkaniu. Pierwszy etap powinien obejmowa\u0107 zrozumienie Twoich cel\u00f3w, klient\u00f3w, konkurencji i aktualnych wyzwa\u0144. Je\u015bli proces zaczyna si\u0119 od wyboru szablonu, wa\u017cne szczeg\u00f3\u0142y mog\u0105 zosta\u0107 pomini\u0119te.",
        },
        {
          q: "Czy skupiacie si\u0119 na SEO i wydajno\u015bci?",
          a: "Strona internetowa musi robi\u0107 wi\u0119cej ni\u017c tylko dobrze wygl\u0105da\u0107. Powinna \u0142adowa\u0107 si\u0119 szybko, dzia\u0142a\u0107 dobrze na wszystkich urz\u0105dzeniach i pomaga\u0107 klientom znale\u017a\u0107 Tw\u00f3j biznes. Zapytaj, jak podchodz\u0105 do technicznego SEO, szybko\u015bci i mierzenia wynik\u00f3w.",
        },
        {
          q: "Kto b\u0119dzie zarz\u0105dza\u0142 moim projektem?",
          a: "Jasna komunikacja ma znaczenie. Powiniene\u015b wiedzie\u0107, kto jest odpowiedzialny za Tw\u00f3j projekt i kto rozumie Twoje cele biznesowe. Dedykowana osoba kontaktowa utrzymuje proces w porz\u0105dku.",
        },
        {
          q: "Co si\u0119 dzieje po uruchomieniu?",
          a: "Strona internetowa wymaga sta\u0142ej opieki. Zapytaj o aktualizacje, bezpiecze\u0144stwo, kopie zapasowe, wsparcie techniczne i przysz\u0142e ulepszenia. Uruchomienie powinno by\u0107 pocz\u0105tkiem, nie ko\u0144cem.",
        },
        {
          q: "Czy mog\u0119 przenie\u015b\u0107 stron\u0119, je\u015bli moje potrzeby si\u0119 zmieni\u0105?",
          a: "Twoja strona powinna nale\u017ce\u0107 do Ciebie. Dobra agencja buduje z my\u015bl\u0105 o elastyczno\u015bci, pozwalaj\u0105c Ci zmieni\u0107 dostawc\u0119 bez utraty kontroli nad danymi lub domen\u0105.",
        },
        {
          q: "Jak wygl\u0105da wycena projektu?",
          a: "Ceny powinny by\u0107 jasne od samego pocz\u0105tku. Powiniene\u015b rozumie\u0107, co jest zawarte, co si\u0119 stanie, je\u015bli projekt si\u0119 zmieni, i jakie przysz\u0142e koszty mog\u0105 si\u0119 pojawi\u0107.",
        },
      ],
    },
    hero: {
      tagline: "Strony internetowe dla firm przemys\u0142owych i handlowych w Szkocji",
      subheader: "Znasz sw\u00f3j fach. My wiemy, jak klienci oceniaj\u0105 ci\u0119 przez ekran.",
      body: "Osiemnaście lat w międzynarodowej sprzedaży B2B nauczyło mnie jednego. Firmy przemysłowe, wykonawcy rusztowań, inżynierowie M&E, transportowcy. Wszyscy wykonują świetną robotę, ale ich strony wyglądają jak relikty czasów modemu. I to kosztuje kontrakty. Gdy kupujący sprawdza trzech dostawców, ten ze spowolnioną, przeładowaną stroną odpada pierwszy. Nie dlatego, że praca jest gorsza, ale dlatego, że zaufanie zaczyna się w internecie. Nie używamy szablonów. Nie używamy page builderów. Budujemy szybkie, przejrzyste strony, które wyglądają poważnie i ładują się natychmiast na telefonie na placu budowy. Bo w biznesie B2B twoja strona to nie folder reklamowy. To twój pierwszy pracownik, twoja oferta i twoja referencja w jednym.",
      cta: "Popro\u015b o wycen\u0119",
    },
    services: {
      heading: "Co Robimy",
      card1: {
        title: "Strony, Kt\u00f3re Przynosz\u0105 Efekt",
        desc: "Bez ci\u0119\u017ckich szablon\u00f3w. Bez zb\u0119dnych wtyczek. Budujemy dedykowane witryny skupione na wydajno\u015bci, wygodzie na telefonie i jasnym przekazie. Twoja strona otwiera si\u0119 szybko, dzia\u0142a na ka\u017cdym urz\u0105dzeniu i m\u00f3wi odwiedzaj\u0105cym dlaczego maj\u0105 wybra\u0107 ciebie, a nie konkurencj\u0119 zza rogu.",
      },
      card2: {
        title: "Sklepy i Optymalizacja Sprzeda\u017cy",
        desc: "Je\u015bli sprzedajesz cz\u0119\u015bci, narz\u0119dzia lub us\u0142ugi przez internet, usuwamy wszystko co zabija zam\u00f3wienia. Lepszy proces zakupu, przejrzyste karty produkt\u00f3w i design mobilny, kt\u00f3ry zamienia przegl\u0105daj\u0105cych w klient\u00f3w. Niezale\u017cnie od tego czy to pe\u0142ny sklep czy prosty formularz zapytania, dbamy o to \u017ceby zarabia\u0142.",
      },
      card3: {
        title: "Rozwi\u0105zania na Miar\u0119 Potrzeb",
        desc: "Niekt\u00f3re firmy potrzebuj\u0105 wi\u0119cej ni\u017c standardowej strony. Portale dla dealer\u00f3w, generatory kart technicznych, wersje wieloj\u0119zyczne na rynki eksportowe albo integracja z twoimi systemami. Budujemy praktyczne narz\u0119dzia, kt\u00f3re rosn\u0105 razem z tob\u0105.",
      },
    },
    portfolio: {
      heading: "Nasze Realizacje",
      subheading:
        "Obecnie budujemy portfolio w sektorze przemys\u0142owym i handlowym. Oznacza to, \u017ce nasi pierwsi partnerzy dostaj\u0105 pierwszorz\u0119dn\u0105 prac\u0119 w dobrej cenie.",
      case1: {
        title: "Faza Budowania\nPortfolio",
        desc: "Obecnie budujemy portfolio w sektorze przemys\u0142owym i handlowym. Oznacza to, \u017ce nasi pierwsi partnerzy dostaj\u0105 pierwszorz\u0119dn\u0105 prac\u0119 w dobrej cenie, z zrozumieniem \u017ce b\u0119dziemy mogli pokaza\u0107 projekt po jego uruchomieniu.",
        tag: "[ 20% ZNI\u017bKA ]",
      },
      case2: {
        title: "Oferta\nPierwszego Partnera",
        desc: "Je\u015bli jeste\u015b got\u00f3w zosta\u0107 jednym z pierwszych partner\u00f3w, oferujemy dwudziestoprocentow\u0105 zni\u017ck\u0119 na projekt w zamian za opini\u0119, zgod\u0119 na umieszczenie twojej strony w naszym portfolio oraz przedstawienie nas dw\u00f3m innym przedsi\u0119biorcom z twojej sieci, gdy nadejdzie odpowiedni moment.",
        tag: "[ BEZ NACISKU ]",
      },
      case3: {
        title: "Przysz\u0142e\nProjekty",
        desc: "Nowe case studies obejmuj\u0105ce dedykowane strony, optymalizacj\u0119 i biznesowe rozwi\u0105zania cyfrowe dla firm przemys\u0142owych i handlowych w ca\u0142ej Szkocji.",
        tag: "[ WKR\u00d3TCE ]",
      },
    },
    process: {
      heading: "Jak Pracujemy",
      steps: [
        {
          title: "Odkrywanie",
          desc: "Zaczynamy od zrozumienia twojego biznesu, twoich klient\u00f3w i tego jak ci\u0119 faktycznie znajduj\u0105. Analizujemy twoj\u0105 obecn\u0105 stron\u0119, konkurencj\u0119 i miejsca gdzie uciekaj\u0105 pieni\u0105dze. Bez zgadywania.",
        },
        {
          title: "Projekt i Budowa",
          desc: "Tworzymy czyst\u0105, dedykowan\u0105 witryn\u0119 zbudowan\u0105 wok\u00f3\u0142 twoich cel\u00f3w. Prawdziwe zdj\u0119cia twojej pracy, a nie stockowe fotografie m\u0119\u017cczyzn w kaskach. Jasne wezwania do dzia\u0142ania. Szybkie \u0142adowanie. Porz\u0105dna wersja mobilna.",
        },
        {
          title: "Testy i Start",
          desc: "Zanim cokolwiek p\u00f3jdzie na serwer, sprawdzamy ka\u017cd\u0105 podstron\u0119, ka\u017cdy formularz, ka\u017cdy link. Na telefonach, tabletach, laptopach i starym komputerze w biurze budowy. Musi dzia\u0142a\u0107 wsz\u0119dzie.",
        },
        {
          title: "Wsparcie i Rozw\u00f3j",
          desc: "Po starcie nie znikamy. Oferujemy miesi\u0119czne plany opieki, kt\u00f3re utrzymuj\u0105 stron\u0119 bezpieczn\u0105, aktualn\u0105 i ulepszon\u0105. W miar\u0119 jak tw\u00f3j biznes ro\u015bnie, strona ro\u015bnie razem z nim.",
        },
      ],
    },
    about: {
      heading: "Miro \u2014 Za\u0142o\u017cyciel Forsa Design",
      body: "Forsa Design za\u0142o\u017cy\u0142em po ponad 20 latach w mi\u0119dzynarodowej sprzeda\u017cy B2B. Handlowa\u0142em maszynami do obr\u00f3bki metalu, wyposa\u017ceniem przemys\u0142owym i rozwi\u0105zaniami in\u017cynieryjnymi w Europie i Azji. Siedzia\u0142em po obu stronach sto\u0142u zakupowego. Wiem jak wygl\u0105da proces od pierwszego maila po podpisany kontrakt.",
      body2:
        "To do\u015bwiadczenie nauczy\u0142o mnie jednej rzeczy. Wi\u0119kszo\u015b\u0107 firm przemys\u0142owych wykonuje \u015bwietn\u0105 robot\u0119, ale ich strony internetowe nie nad\u0105\u017caj\u0105 za poziomem ich us\u0142ug. I to kosztuje kontrakty. Nie dlatego \u017ce praca jest s\u0142aba, tylko dlatego \u017ce w dzisiejszym B2B strona to pierwszy etap weryfikacji. Nie jestem agencj\u0105 z Londynu z pi\u0119tnastoma osobami w zespole i kawiarni\u0105 w biurze. Jestem cz\u0142owiekiem, kt\u00f3ry rozumie przemys\u0142, logistyk\u0119 i handel mi\u0119dzynarodowy. Teraz buduj\u0119 strony, kt\u00f3re komunikuj\u0105 si\u0119 j\u0119zykiem Twoich klient\u00f3w. Bez szablon\u00f3w. Bez zb\u0119dnego \u017caronu. Tylko czysty kod i jasny przekaz. Banff, Aberdeenshire. Obs\u0142uguj\u0119 firmy w ca\u0142ej Szkocji. M\u00f3wi\u0119 po polsku i po angielsku.",
    },
    pricing: {
      heading: "Przejrzyste ceny",
      subheading: "Trzy punkty wyj\u015bcia. Ka\u017cdy projekt dopasowany do Twoich potrzeb.",
    },
    cta: {
      heading: "Gotowy przesta\u0107 si\u0119 wstydzi\u0107 swojej strony?",
      body: "Czysty kod. Jasna strategia. Witryny, kt\u00f3re pracuj\u0105 tak ci\u0119\u017cko jak ty na budowie.",
      button: "Porozmawiajmy",
    },
    contact: {
      heading: "Skontaktuj Si\u0119 Z Nami",
      subheading: "Gotowy przesta\u0107 si\u0119 wstydzi\u0107 swojej strony? Porozmawiajmy.",
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
      contactPerson: "Miro",
      directEmail: "hello@forsadesign.co.uk",
      phone: "07770110735",
      projectTypes: [
        "Strona Internetowa",
        "Sklep Online",
        "Redesign Strony",
        "System Z\u0142o\u017cony",
        "Inne",
      ],
      selectPlaceholder: "Wybierz typ projektu...",
      errors: {
        required: "To pole jest wymagane",
        invalidEmail: "Prosz\u0119 poda\u0107 prawid\u0142owy adres email",
        selectRequired: "Prosz\u0119 wybra\u0107 typ projektu",
        captcha: "Prosz\u0119 uko\u0144czy\u0107 weryfikacj\u0119",
        captchaFailed:
          "Weryfikacja bezpieczeństwa nie mogła się załadować. Odśwież stronę i spróbuj ponownie.",
      },
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
