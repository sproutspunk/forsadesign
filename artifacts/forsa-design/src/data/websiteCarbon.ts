export const results = [
  {
    name: "Forsa Design",
    domain: "forsadesign.co.uk",
    rating: "B",
    carbon: "0.098",
    transfer: "695.3",
    energy: "0.20",
    report: "https://1clickimpact.com/website-carbon/forsadesign.co.uk",
    pdf: "/reports/forsa-design-carbon-2026-11-27.pdf",
  },
  {
    name: "LinkLang",
    domain: "linklang.co.uk",
    rating: "A+",
    carbon: "0.012",
    transfer: "88.3",
    energy: "0.02",
    report: "https://1clickimpact.com/website-carbon/linklang.co.uk",
    pdf: "/reports/linklang-carbon-2026-11-27.pdf",
  },
];

export const carbonCopy = {
  pl: {
    category: "Efektywność cyfrowa",
    title: "Ślad węglowy stron",
    intro:
      "Wyniki Forsa Design i LinkLang pokazują szacowaną emisję na odsłonę, transfer danych i zużycie energii. Raporty źródłowe oraz data testu pozwalają sprawdzić podstawę tych wartości.",
    value:
      "Dla klienta oceniającego stronę lub dostawcę to konkretne dane do przeglądu technicznego i środowiskowego oraz punkt odniesienia dla kolejnych testów.",
    rating: "Ocena emisji",
    perView: "na odsłonę",
    testDate: "Test: 27 listopada 2026",
    details: "Wyniki i dokumentacja",
    carbon: "Szacowana emisja na odsłonę",
    transfer: "Transfer danych",
    energy: "Energia na odsłonę",
    hosting: "Hosting według raportu",
    green: "Green",
    report: "Raport online",
    pdf: "Pobierz PDF",
    sourceLabel: "Dokumentacja",
    scope:
      "Szacunki modelowe 1ClickImpact dotyczą jednej badanej strony każdego serwisu. Wyniki mogą zmieniać się wraz z treścią strony i metodą obliczeń. Łączne szacowane emisje zależą także od liczby odsłon.",
    hostingNote:
      "Oba raporty oznaczają hosting jako Green i wskazują The Green Web Foundation jako źródło weryfikacji energii odnawialnej.",
    contextTitle: "Znaczenie przy ocenie dostawcy",
    context:
      "GOV.UK zaleca zespołom administracji uwzględnianie wpływu środowiskowego ofert. Zespół projektowy Scottish Enterprise opisuje ograniczanie emisji swoich stron jako część realizacji celów Net Zero. Udokumentowany wynik ułatwia rzeczową rozmowę o efektywności cyfrowej.",
    government: "GOV.UK: zrównoważone usługi",
    enterprise: "Scottish Enterprise: emisje stron",
  },
  en: {
    category: "Digital efficiency",
    title: "Website carbon footprint",
    intro:
      "Results for Forsa Design and LinkLang show estimated emissions per page view, data transfer and energy use. Source reports and test dates make the figures traceable and provide a clear basis for review.",
    value:
      "For a client reviewing a website or supplier, this provides evidence for a technical and environmental review, with a dated reference for future checks.",
    rating: "Carbon rating",
    perView: "per page view",
    testDate: "Test: 27 November 2026",
    details: "Results and evidence",
    carbon: "Estimated emissions per view",
    transfer: "Data transfer",
    energy: "Energy per page view",
    hosting: "Hosting reported",
    green: "Green",
    report: "Online report",
    pdf: "Download PDF",
    sourceLabel: "Evidence",
    scope:
      "Modelled estimates from 1ClickImpact for one tested page on each website. Results may change with page content and the calculation method. Total estimated emissions also depend on the number of page views.",
    hostingNote:
      "Both reports identify the hosting as Green and name The Green Web Foundation as the source of renewable-energy verification.",
    contextTitle: "Why it matters in supplier reviews",
    context:
      "GOV.UK advises government service teams to consider the environmental impact of proposals. Scottish Enterprise’s design team describes reducing website emissions as part of its Net Zero goals. Documented results provide a practical basis for discussing digital efficiency.",
    government: "GOV.UK: sustainable services",
    enterprise: "Scottish Enterprise: website emissions",
  },
};

export const carbonPath = (lang: "pl" | "en") => `/${lang}/case-studies/website-carbon/`;
