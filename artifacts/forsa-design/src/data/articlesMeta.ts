export interface ArticleMeta {
  slugEn: string;
  slugPl: string;
  dateIso: string;
  readingTimeMin: number;
  en: { title: string; excerpt: string };
  pl: { title: string; excerpt: string };
}

export const articlesMeta: ArticleMeta[] = [
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
];
