export interface ArticleMeta {
  slugEn: string;
  slugPl: string;
  dateIso: string;
  publishedDateIso?: string;
  readingTimeMin: number;
  en: { title: string; excerpt: string };
  pl: { title: string; excerpt: string };
}

export const articlesMeta: ArticleMeta[] = [
  {
    slugEn: "industrial-website-supplier-checks",
    slugPl: "strona-przemyslowa-gotowa-na-weryfikacje-dostawcy",
    dateIso: "2026-08-14",
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 3,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    publishedDateIso: "2026-11-15",
    readingTimeMin: 2,
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
    dateIso: "2026-06-01",
    readingTimeMin: 5,
    en: {
      title: "How to Choose a Web Agency: 7 Questions You Should Ask",
      excerpt:
        "Choosing a web agency is a business decision. Many businesses focus only on price and forget about long-term value. Here are 7 questions that help separate professional agencies from companies that simply deliver a template and move on.",
    },
    pl: {
      title: "Jak wybrać agencję webową: 7 pytań, które powinieneś zadać",
      excerpt:
        "Wybór agencji webowej to decyzja biznesowa. Wiele firm skupia się tylko na cenie i zapomina o długoterminowej wartości. Oto 7 pytań, które pomagają odróżnić profesjonalne agencje od firm, które po prostu dostarczają szablon i odchodzą.",
    },
  },
  {
    slugEn: "responsiveness-vs-speed",
    slugPl: "responsywnosc-vs-szybkosc",
    dateIso: "2026-06-05",
    readingTimeMin: 6,
    en: {
      title: "Responsiveness vs Speed: Why Both Matter for Conversions",
      excerpt:
        "Most people browse the internet using mobile devices. But responsiveness and speed are two different things. Both directly affect user experience and conversions. A website needs both to perform well.",
    },
    pl: {
      title: "Responsywność vs Szybkość: Dlaczego oba mają znaczenie dla konwersji",
      excerpt:
        "Większość ludzi przegląda internet na urządzeniach mobilnych. Ale responsywność i szybkość to dwie różne rzeczy. Obie bezpośrednio wpływają na doświadczenie użytkownika i konwersje.",
    },
  },
  {
    slugEn: "cms-template-vs-custom-site",
    slugPl: "szablon-cms-vs-strona-na-zamowienie",
    dateIso: "2026-06-10",
    readingTimeMin: 5,
    en: {
      title: "Why a CMS Template Is Not the Same as a Custom Website",
      excerpt:
        "A template CMS can be a quick and affordable solution. But as a business grows, limitations can appear. Templates are designed for many users. Custom websites are designed around your specific goals.",
    },
    pl: {
      title: "Dlaczego szablon CMS to nie to samo co dedykowana strona",
      excerpt:
        "Szablon CMS może być szybkim i przystępnym rozwiązaniem. Jednak wraz z rozwojem biznesu mogą pojawić się ograniczenia. Szablony są projektowane dla wielu użytkowników. Dedykowane strony są tworzone wokół Twoich konkretnych celów.",
    },
  },
  {
    slugEn: "ecommerce-speed-and-ux",
    slugPl: "ecommerce-szybkosc-i-ux",
    dateIso: "2026-06-14",
    readingTimeMin: 6,
    en: {
      title: "E-commerce: Why Speed and User Experience Drive Sales",
      excerpt:
        "In online retail, small problems can create lost sales. Speed, trust, and a simple buying process all influence whether customers complete a purchase.",
    },
    pl: {
      title: "E-commerce: Dlaczego szybkość i doświadczenie użytkownika napędzają sprzedaż",
      excerpt:
        "W handlu online małe problemy mogą powodować utratę sprzedaży. Szybkość, zaufanie i prosty proces zakupu wpływają na to, czy klienci finalizują zamówienie.",
    },
  },
  {
    slugEn: "seo-2026-website-is-just-the-start",
    slugPl: "seo-2026-strona-to-dopiero-poczatek",
    dateIso: "2026-06-18",
    readingTimeMin: 7,
    en: {
      title: "SEO: Why Your Website Is Only the Beginning",
      excerpt:
        "Building a website does not automatically bring customers from Google. SEO combines technical quality, content, user experience, and online authority. Your website is the foundation, not the entire strategy.",
    },
    pl: {
      title: "SEO: Dlaczego strona to dopiero początek",
      excerpt:
        "Stworzenie strony nie sprowadza automatycznie klientów z Google. SEO łączy jakość techniczną, treść, doświadczenie użytkownika i autorytet online. Twoja strona to fundament, nie cała strategia.",
    },
  },
  {
    slugEn: "web-design-aberdeenshire",
    slugPl: "web-design-aberdeenshire-szkocja",
    dateIso: "2026-06-30",
    readingTimeMin: 8,
    en: {
      title: "Web Design for Small Businesses in Aberdeenshire: What to Expect in 2026",
      excerpt:
        "If you run a business in Aberdeenshire, whether in Banff, Huntly, Inverurie, Turriff or anywhere else in the region, this guide covers what to expect from a professional website, what it costs, and what to ask before you commit.",
    },
    pl: {
      title: "Web Design dla Małych Firm w Aberdeenshire: Czego Się Spodziewać w 2026",
      excerpt:
        "Jeśli prowadzisz firmę w Aberdeenshire, w Banff, Huntly, Inverurie, Turriff czy gdziekolwiek indziej w regionie, ten przewodnik wyjaśnia czego się spodziewać po profesjonalnej stronie, ile to kosztuje i o co warto zapytać przed podpisaniem umowy.",
    },
  },
  {
    slugEn: "website-conversion-what-actually-works",
    slugPl: "konwersja-strony-co-dziala-naprawde",
    dateIso: "2026-07-01",
    readingTimeMin: 6,
    en: {
      title: "What Makes a Website Actually Convert Visitors into Customers",
      excerpt:
        "Most websites look fine but do not convert. The problem is rarely design. It is usually clarity, trust, and friction. Here is what actually works based on real projects.",
    },
    pl: {
      title:
        "Co Sprawia, \u017ce Strona Naprawd\u0119 Zamienia Odwiedzaj\u0105cych w Klient\u00f3w",
      excerpt:
        "Wi\u0119kszo\u015b\u0107 stron wygl\u0105da dobrze, ale nie konwertuje. Problem rzadko le\u017cy w designie. To zazwyczaj kwestia jasno\u015bci, zaufania i tarcia. Oto co dzia\u0142a w praktyce.",
    },
  },
  {
    slugEn: "website-maintenance-matters",
    slugPl: "dlaczego-utrzymanie-strony-ma-znaczenie",
    dateIso: "2026-07-10",
    readingTimeMin: 5,
    en: {
      title: "Why Website Maintenance Matters More Than the Build Itself",
      excerpt:
        "A website is not a one-time project. It is a business asset that needs ongoing care. Security, performance, content and search rankings all degrade without regular attention. Here is what maintenance actually involves.",
    },
    pl: {
      title: "Dlaczego Utrzymanie Strony Jest Wa\u017cniejsze Ni\u017c Samo Zbudowanie",
      excerpt:
        "Strona internetowa to nie projekt jednorazowy. To aktyw biznesowy wymagaj\u0105cy sta\u0142ej opieki. Bezpiecze\u0144stwo, wydajno\u015b\u0107, tre\u015b\u0107 i pozycje w wyszukiwarce wszystko to ulega degradacji bez regularnej uwagi. Oto czego wymaga utrzymanie.",
    },
  },
  {
    slugEn: "from-template-to-shipyard",
    slugPl: "od-szablonu-do-stoczni",
    dateIso: "2026-08-04",
    readingTimeMin: 5,
    en: {
      title:
        "From template to shipyard. What actually works in web design for the marine industry.",
      excerpt:
        "A marine industry website needs to do more than look polished. It needs to pass procurement checks, work on weak connections and show buyers that your business can deliver.",
    },
    pl: {
      title:
        "Od szablonu do stoczni. Co naprawdę sprawdza się w web designie dla przemysłu morskiego.",
      excerpt:
        "Strona dla przemysłu morskiego musi robić więcej niż dobrze wyglądać. Powinna przechodzić weryfikację zakupową, działać na słabym łączu i pokazywać kupującym, że firma potrafi dostarczyć projekt.",
    },
  },
  {
    slugEn: "how-we-improved-performance-polish-version",
    slugPl: "jak-podnieslismy-wydajnosc-polskiej-wersji-strony",
    dateIso: "2026-08-07",
    readingTimeMin: 4,
    en: {
      title:
        "How We Improved the Performance of the Polish Version Without Rebuilding the Entire Application",
      excerpt:
        "The Polish version of Forsa Design was lagging behind the English site in PageSpeed. We matched the performance without rebuilding the application by fixing above-the-fold content and keeping React, prerendered HTML and CDN cache in sync.",
    },
    pl: {
      title: "Jak podnieśliśmy wydajność polskiej wersji strony bez przebudowy całej aplikacji",
      excerpt:
        "Polska wersja Forsa Design zostawała w tyle za angielską w PageSpeed. Wyrównaliśmy wydajność bez przebudowy aplikacji, skracając treść nad pierwszym ekranem i pilnując spójności React, prerenderowanego HTML oraz cache CDN.",
    },
  },
];
