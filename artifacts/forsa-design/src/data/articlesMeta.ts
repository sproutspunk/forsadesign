export interface ArticleMeta {
  slugEn: string;
  slugPl: string;
  dateIso: string;
  publishedDateIso: string;
  modifiedDateIso?: string;
  readingTimeMin: number;
  en: { title: string; excerpt: string };
  pl: { title: string; excerpt: string };
}

export const articlesMeta: ArticleMeta[] = [
  {
    slugEn: "b2b-catalogue-part-number-search",
    slugPl: "wyszukiwarka-katalogu-b2b-numery-czesci",
    dateIso: "2026-11-20",
    publishedDateIso: "2026-11-16",
    readingTimeMin: 4,
    pl: {
      title: "Wyszukiwarka w katalogu B2B: jak szukać po numerach części",
      excerpt:
        "Numery części, warianty i brak wyników wymagają jasnych reguł. Jak zaprojektować wyszukiwanie, które zachowuje znaczenie oznaczeń produktu.",
    },
    en: {
      title: "B2B catalogue search: getting part numbers right",
      excerpt:
        "Part numbers, variants and empty results need clear rules. Design catalogue search that preserves product identifiers and gives buyers a useful next step.",
    },
  },
  {
    slugEn: "industrial-website-supplier-checks",
    slugPl: "strona-przemyslowa-gotowa-na-weryfikacje-dostawcy",
    dateIso: "2026-08-14",
    readingTimeMin: 3,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Czy Twoja strona przechodzi weryfikację dostawcy?",
      excerpt:
        "Strona może pomóc kupcowi sprawdzić, czy firma pasuje do zadania. Strona powinna pomóc mu potwierdzić kompetencje, zakres dostaw i właściwy kontakt.",
    },
    en: {
      title: "Does your industrial website help buyers check your business?",
      excerpt:
        "A website can help a buyer check whether your company fits the job. Your website should help them verify capabilities, delivery scope and the right contact.",
    },
  },
  {
    slugEn: "b2b-product-catalogue-without-checkout",
    slugPl: "katalog-b2b-bez-koszyka-kiedy-ma-sens",
    dateIso: "2026-08-21",
    readingTimeMin: 3,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Katalog B2B bez koszyka. Kiedy to lepszy wybór?",
      excerpt:
        "Nie każdy produkt przemysłowy powinien kończyć drogę zakupową płatnością online. Czasami dobrze zbudowany katalog i zapytanie ofertowe lepiej odpowiadają sposobowi sprzedaży.",
    },
    en: {
      title: "When a B2B product catalogue does not need a checkout",
      excerpt:
        "Not every industrial product should lead directly to an online payment. A structured catalogue and an enquiry process can better reflect the way a business sells.",
    },
  },
  {
    slugEn: "useful-industrial-rfq-form",
    slugPl: "formularz-zapytania-ofertowego-dla-przemyslu",
    dateIso: "2026-08-28",
    readingTimeMin: 3,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Formularz RFQ, po którym da się przygotować ofertę",
      excerpt:
        "Dobry formularz zapytania zbiera informacje potrzebne do kolejnego kroku. Nie powinien ani ograniczać się do pustego pola wiadomości, ani przypominać pełnego audytu dostawcy.",
    },
    en: {
      title: "An industrial RFQ form that supports a useful quotation",
      excerpt:
        "A good enquiry form collects what the next step requires. It should offer more direction than an empty message box without turning first contact into a full supplier audit.",
    },
  },
  {
    slugEn: "technical-documentation-website-version-control",
    slugPl: "dokumentacja-techniczna-na-stronie-wersje-i-aktualnosc",
    dateIso: "2026-09-04",
    readingTimeMin: 3,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "PDF na stronie to za mało. Jak uporządkować dokumentację techniczną?",
      excerpt:
        "Instrukcja, karta produktu i deklaracja nie powinny tworzyć przypadkowej listy plików. Kupujący musi wiedzieć, do czego dokument się odnosi i czy jest właściwą wersją.",
    },
    en: {
      title: "Technical documentation needs more than a PDF download link",
      excerpt:
        "Manuals, product sheets and declarations should not become an arbitrary file list. Buyers need to understand what a document covers and whether it is the appropriate version.",
    },
  },
  {
    slugEn: "b2b-catalogue-public-prices-or-quotation",
    slugPl: "ceny-w-katalogu-b2b-publiczne-czy-na-zapytanie",
    dateIso: "2026-09-11",
    readingTimeMin: 3,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Ceny w katalogu B2B: pokazać, ukryć czy wyjaśnić?",
      excerpt:
        "Cena publiczna, cennik kontraktowy i wycena indywidualna rozwiązują różne problemy. Dobry katalog jasno pokazuje, który model obowiązuje i co klient powinien zrobić dalej.",
    },
    en: {
      title: "B2B catalogue prices: publish them, restrict them or explain them?",
      excerpt:
        "Public prices, contract price lists and individual quotations serve different needs. A useful catalogue makes the pricing model clear and shows buyers what to do next.",
    },
  },
  {
    slugEn: "website-erp-crm-integration-data-ownership",
    slugPl: "integracja-strony-z-erp-i-crm-zrodlo-danych",
    dateIso: "2026-09-18",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Integracja strony z ERP i CRM zaczyna się od właściciela danych",
      excerpt:
        "Połączenie systemów nie rozwiązuje samo problemu nieaktualnych informacji. Najpierw trzeba ustalić, skąd pochodzą dane, kto je zatwierdza i co dzieje się przy błędzie.",
    },
    en: {
      title: "Website integrations start with ownership of the data",
      excerpt:
        "Connecting a website to ERP or CRM does not automatically make its information reliable. First define where data comes from, who approves it and what happens when a transfer fails.",
    },
  },
  {
    slugEn: "multilingual-industrial-website-beyond-translation",
    slugPl: "wielojezyczna-strona-przemyslowa-wiecej-niz-tlumaczenie",
    dateIso: "2026-09-25",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Wielojęzyczna strona przemysłowa to więcej niż tłumaczenie",
      excerpt:
        "Przetłumaczone menu nie wystarczy, jeżeli kupiec nadal otrzymuje niewłaściwe jednostki, dokumenty i informacje o obsłudze. Wersja językowa powinna wspierać cały proces zapytania.",
    },
    en: {
      title: "A multilingual industrial website needs more than translated text",
      excerpt:
        "A translated menu is not enough when buyers still encounter unsuitable units, outdated documents or an enquiry route that loses their language. Localisation should cover the whole buying task.",
    },
  },
  {
    slugEn: "product-configurator-or-enquiry-form",
    slugPl: "konfigurator-produktu-czy-formularz-zapytania",
    dateIso: "2026-10-02",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Konfigurator produktu czy dobry formularz zapytania?",
      excerpt:
        "Konfigurator pomaga wtedy, gdy potrafi sprawdzić rzeczywiste reguły doboru. Jeśli tych reguł jeszcze nie opisano, rozbudowany interfejs może tylko ukryć niepewność.",
    },
    en: {
      title: "Do you need a product configurator or a better enquiry form?",
      excerpt:
        "A configurator is useful when it can apply genuine selection rules. If those rules remain undefined, a sophisticated interface may only hide uncertainty.",
    },
  },
  {
    slugEn: "accessible-b2b-catalogue-and-enquiry-forms",
    slugPl: "dostepny-katalog-i-formularz-b2b",
    dateIso: "2026-10-09",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Dostępność katalogu B2B sprawdza się przy konkretnym zadaniu",
      excerpt:
        "Czy da się znaleźć część, porównać parametry i wysłać zapytanie bez myszy? To praktyczny sposób sprawdzenia jednej ścieżki korzystania z katalogu.",
    },
    en: {
      title: "Test B2B catalogue accessibility through a real task",
      excerpt:
        "Can someone find a part, compare its specifications and submit an enquiry without a mouse? Use the task to assess a complete catalogue journey.",
    },
  },
  {
    slugEn: "industrial-website-export-enquiries",
    slugPl: "zapytania-eksportowe-strona-przemyslowa",
    dateIso: "2026-10-16",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Co powinien wiedzieć zagraniczny kupiec przed wysłaniem zapytania?",
      excerpt:
        "Angielska wersja strony otwiera rozmowę, ale nie wyjaśnia jeszcze zakresu dostaw. Kupiec potrzebuje informacji o produkcie, dokumentacji, obsłudze i danych potrzebnych do oferty.",
    },
    en: {
      title: "What should an overseas buyer know before making an enquiry?",
      excerpt:
        "An English-language website starts the conversation, but buyers also need clarity about supply coverage, technical requirements, documentation and the information needed for a quotation.",
    },
  },
  {
    slugEn: "b2b-catalogue-stock-and-lead-times",
    slugPl: "dostepnosc-i-terminy-dostawy-w-katalogu-b2b",
    dateIso: "2026-10-23",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "„Dostępny” w katalogu B2B: co właściwie obiecujesz?",
      excerpt:
        "Stan magazynowy, możliwość zamówienia i potwierdzony termin dostawy to różne informacje. Ich pomieszanie może stworzyć obietnicę, której firma nie zamierzała składać.",
    },
    en: {
      title: "What does “available” promise in a B2B catalogue?",
      excerpt:
        "Physical stock, the ability to order and a confirmed delivery date are different things. Combining them into one green label can create an unintended promise.",
    },
  },
  {
    slugEn: "business-website-handover-access-and-recovery",
    slugPl: "przekazanie-strony-firmowej-dostepy-i-odtworzenie",
    dateIso: "2026-10-30",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Przekazanie strony: czy firma potrafi przejąć jej obsługę?",
      excerpt:
        "Hasło do panelu nie oznacza jeszcze kontroli nad stroną. Przy odbiorze projektu warto sprawdzić domenę, konta, kod, wdrożenie i możliwość odtworzenia danych.",
    },
    en: {
      title: "A website handover should let the business take control",
      excerpt:
        "A control-panel password is only part of a handover. Check ownership of the domain, service accounts, source code, deployment process and recovery arrangements.",
    },
  },
  {
    slugEn: "secure-b2b-enquiry-forms-and-attachments",
    slugPl: "bezpieczenstwo-formularza-b2b-i-zalacznikow",
    dateIso: "2026-11-06",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Formularz zapytania B2B: mniej spamu, bezpieczniejsze załączniki",
      excerpt:
        "Publiczny formularz przyjmuje dane od nieznanych osób. Ochrona musi obejmować serwer, pliki, wysyłkę i obsługę błędów, a nie tylko dodatkowe pole w przeglądarce.",
    },
    en: {
      title: "Protecting B2B enquiry forms and their attachments",
      excerpt:
        "A public form accepts information from unknown visitors. Protection needs to cover the server, uploads, delivery and error handling, rather than relying on one browser control.",
    },
  },
  {
    slugEn: "b2b-website-animation-with-user-control",
    slugPl: "animacje-na-stronie-b2b-kontrola-ruchu",
    dateIso: "2026-11-13",
    readingTimeMin: 2,
    publishedDateIso: "2026-11-15",
    pl: {
      title: "Animacja na stronie B2B: efekt, który daje się zatrzymać",
      excerpt:
        "Ruch może budować charakter marki, ale nie powinien utrudniać czytania ani kliknięcia. Przy projektowaniu animacji trzeba uwzględnić telefon, ograniczenie ruchu i kontrolę użytkownika.",
    },
    en: {
      title: "B2B website animation should give visitors control",
      excerpt:
        "Movement can give a technical brand a distinctive character, but it should not make reading or selecting a link harder. Design for touch, reduced motion and an explicit pause.",
    },
  },
  {
    slugEn: "how-to-choose-a-web-agency",
    slugPl: "jak-wybrac-agencje-webowa",
    dateIso: "2026-06-05",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-06-01",
    pl: {
      title: "Jak wybrać wykonawcę strony: wymagania, dowody i przekazanie projektu",
      excerpt:
        "Jak ocenić proces pracy, zakres odpowiedzialności i możliwość dalszego utrzymania strony.",
    },
    en: {
      title: "How to choose a website provider: requirements, evidence and handover",
      excerpt: "How to assess delivery, responsibilities and the ability to maintain a website.",
    },
  },
  {
    slugEn: "responsiveness-vs-speed",
    slugPl: "responsywnosc-vs-szybkosc",
    dateIso: "2026-06-12",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-06-05",
    pl: {
      title: "Responsywność i szybkość: dwa odrębne kryteria jakości strony",
      excerpt:
        "Jak odróżnić dostosowanie interfejsu od wydajności i właściwie interpretować pomiary.",
    },
    en: {
      title: "Responsive design and speed: two distinct measures of website quality",
      excerpt:
        "How to distinguish interface adaptation from performance and interpret measurements.",
    },
  },
  {
    slugEn: "cms-template-vs-custom-site",
    slugPl: "szablon-cms-vs-strona-na-zamowienie",
    dateIso: "2026-06-19",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-06-10",
    pl: {
      title: "Szablon CMS a rozwiązanie dedykowane: kryteria wyboru",
      excerpt:
        "Porównanie kosztu, edycji treści, integracji i utrzymania bez automatycznego przypisywania jakości technologii.",
    },
    en: {
      title: "CMS templates and custom development: selection criteria",
      excerpt:
        "Comparing cost, content editing, integration and maintenance without treating technology as a guarantee of quality.",
    },
  },
  {
    slugEn: "ecommerce-speed-and-ux",
    slugPl: "ecommerce-szybkosc-i-ux",
    dateIso: "2026-06-26",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-06-14",
    pl: {
      title: "E-commerce B2B: wydajność, informacje i przebieg zamówienia",
      excerpt:
        "Jak dopasować katalog, ceny, stany i proces zamówienia do rzeczywistego modelu sprzedaży.",
    },
    en: {
      title: "B2B e-commerce: performance, information and ordering workflows",
      excerpt:
        "How to align catalogues, pricing, availability and ordering with the actual sales model.",
    },
  },
  {
    slugEn: "seo-2026-website-is-just-the-start",
    slugPl: "seo-2026-strona-to-dopiero-poczatek",
    dateIso: "2026-07-03",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-06-18",
    pl: {
      title: "Techniczne SEO, treść i widoczność: odrębne elementy jednego procesu",
      excerpt: "Indeksowanie, dostęp robotów i jakość treści wymagają osobnej oceny.",
    },
    en: {
      title: "Technical SEO, content and visibility: distinct parts of one process",
      excerpt: "Indexing, crawler access and content quality require separate assessment.",
    },
  },
  {
    slugEn: "web-design-aberdeenshire",
    slugPl: "web-design-aberdeenshire-szkocja",
    dateIso: "2026-07-10",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-06-30",
    pl: {
      title: "Strona firmy w Aberdeenshire: zakres projektu i kryteria wyboru",
      excerpt:
        "Jak określić wymagania strony lokalnej firmy i odróżnić koszt wykonania od utrzymania.",
    },
    en: {
      title: "A business website in Aberdeenshire: scope and selection criteria",
      excerpt:
        "How to define a local business website and distinguish development from operating costs.",
    },
  },
  {
    slugEn: "website-conversion-what-actually-works",
    slugPl: "konwersja-strony-co-dziala-naprawde",
    dateIso: "2026-07-17",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-07-01",
    pl: {
      title: "Jak oceniać, czy strona ułatwia pozyskanie zapytania",
      excerpt:
        "Czytelność oferty, wiarygodność i formularze można oceniać przez konkretne zadania.",
    },
    en: {
      title: "How to assess whether a website supports enquiries",
      excerpt: "Offer clarity, credibility and forms can be assessed through specific tasks.",
    },
  },
  {
    slugEn: "website-maintenance-matters",
    slugPl: "dlaczego-utrzymanie-strony-ma-znaczenie",
    dateIso: "2026-07-24",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-07-10",
    pl: {
      title: "Utrzymanie strony: aktualizacje, odtwarzanie i kontrola działania",
      excerpt:
        "Jak oddzielić utrzymanie techniczne od zmian treści, rozwoju funkcji i promocji w wyszukiwarkach.",
    },
    en: {
      title: "Website maintenance: updates, recovery and operational checks",
      excerpt:
        "How to distinguish technical maintenance from content changes, feature development and search promotion.",
    },
  },
  {
    slugEn: "from-template-to-shipyard",
    slugPl: "od-szablonu-do-stoczni",
    dateIso: "2026-07-31",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-08-04",
    pl: {
      title: "Strona dla branży morskiej: informacje potrzebne w weryfikacji dostawcy",
      excerpt:
        "Jak prezentować kompetencje, dokumentację i realizacje bez zastępowania strony deklaracjami marketingowymi.",
    },
    en: {
      title: "Marine-industry websites: information for supplier assessment",
      excerpt:
        "How to present capability, documentation and projects without relying on general marketing claims.",
    },
  },
  {
    slugEn: "how-we-improved-performance-polish-version",
    slugPl: "jak-podnieslismy-wydajnosc-polskiej-wersji-strony",
    dateIso: "2026-08-07",
    modifiedDateIso: "2026-11-17",
    readingTimeMin: 2,
    publishedDateIso: "2026-08-07",
    pl: {
      title: "Wydajność wersji PL i EN: treść, zasoby i pamięć podręczna",
      excerpt:
        "Jak porównywać wersje językowe bez przypisywania zmian wyniku jednej niezweryfikowanej przyczynie.",
    },
    en: {
      title: "PL and EN performance: content, resources and caching",
      excerpt:
        "How to compare language versions without assigning a score change to an unverified single cause.",
    },
  },
];
