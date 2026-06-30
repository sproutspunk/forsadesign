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
        "Choosing a web agency is a business decision. Many businesses focus on price instead of value. Here are 7 questions that separate professional agencies from those who deliver a template and disappear.",
    },
    pl: {
      title: "Jak wybrać agencję webową: 7 pytań, które powinieneś zadać",
      excerpt:
        "Wybór agencji webowej to decyzja biznesowa. Wiele firm popełnia błąd, focusując się na cenie zamiast na wartości. 7 pytań, które oddzielą agencje profesjonalne od tych, które dostarczą szablon i znikną.",
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
        "70% of internet traffic comes from mobile. But responsiveness and speed are not the same thing. Both affect conversion. Ignore one, lose customers.",
    },
    pl: {
      title: "Responsywność vs Szybkość: Dlaczego oba są ważne dla konwersji",
      excerpt:
        "70% ruchu w internecie pochodzi z urządzeń mobilnych. Ale responsywność i szybkość to nie to samo. Oba wpływają na konwersję. Ignoruj jedno, stracisz klientów.",
    },
  },
  {
    slugEn: "cms-template-vs-custom-site",
    slugPl: "szablon-cms-vs-strona-na-zamowienie",
    dateIso: "2026-06-10",
    readingTimeMin: 5,
    en: {
      title: "Why a CMS Template Is Not the Same as a Custom Site",
      excerpt:
        "A template CMS is cheap and fast. But if your business has specific requirements or needs a competitive edge, the template runs out quickly. Here's what to consider.",
    },
    pl: {
      title: "Dlaczego szablon CMS to nie to samo co dostosowana strona",
      excerpt:
        "Szablon CMS jest tani i szybki. Ale jeśli Twój biznes ma konkretne wymagania lub potrzebujesz przewagi konkurencyjnej, szablon wyczerpuje się szybko. Co warto wiedzieć.",
    },
  },
  {
    slugEn: "ecommerce-speed-and-ux",
    slugPl: "ecommerce-szybkosc-i-ux",
    dateIso: "2026-06-14",
    readingTimeMin: 6,
    en: {
      title: "E-commerce: Why Speed and UX Drive Sales, Not Just Experience",
      excerpt:
        "A small delay in loading speed means a drop in sales. E-commerce data is unambiguous. Here's how it translates directly into money.",
    },
    pl: {
      title: "E-commerce: Dlaczego szybkość i UX wpływają na sprzedaż, nie tylko na wrażenia",
      excerpt:
        "Małe opóźnienie w szybkości ładowania = spadek sprzedaży. E-commerce to dane, i są one jednoznaczne. Jak to przekłada się bezpośrednio na pieniądze.",
    },
  },
  {
    slugEn: "seo-2024-website-is-just-the-start",
    slugPl: "seo-2024-strona-to-dopiero-poczatek",
    dateIso: "2026-06-18",
    readingTimeMin: 7,
    en: {
      title: "SEO in 2024: Why Your Website Is Just the Start",
      excerpt:
        "The idea that you build a site and Google rankings arrive is a myth from 2010. In 2024, SEO is a combination of architecture, content, backlinks, user signals, and E-E-A-T. The site is the foundation, not the whole picture.",
    },
    pl: {
      title: "SEO w 2024: Dlaczego Twoja strona to dopiero początek",
      excerpt:
        "Idea, że budujesz stronę i rankingi w Google same przychodzą, to mit z 2010. W 2024, SEO to kombinacja: architektura, treść, linki, sygnały użytkownika, E-E-A-T. Strona to fundament, nie cała strategia.",
    },
  },
  {
    slugEn: "web-design-aberdeenshire",
    slugPl: "web-design-aberdeenshire-szkocja",
    dateIso: "2026-06-30",
    readingTimeMin: 8,
    en: {
      title: "Web Design for Small Businesses in Aberdeenshire: What to Expect in 2025",
      excerpt:
        "If your business is based in Aberdeenshire, whether in Banff, Huntly, Inverurie, Turriff or anywhere across the region, this guide covers what to expect when investing in a professional website, what it costs, and what questions to ask before signing anything.",
    },
    pl: {
      title: "Web Design dla Małych Firm w Aberdeenshire: Czego Się Spodziewać w 2025",
      excerpt:
        "Jeśli Twoja firma działa w Aberdeenshire, w Banff, Huntly, Inverurie, Turriff lub gdziekolwiek w regionie, ten przewodnik wyjaśnia, czego oczekiwać inwestując w profesjonalną stronę, ile to kosztuje i jakie pytania zadać przed podpisaniem umowy.",
    },
  },
];
