import { siteCopy } from "./siteCopy";

type Language = "en" | "pl";

export function positioningSeo(
  lang: Language,
  page: "home" | "services" | "search" | "quote" | "contact",
) {
  const { hero } = siteCopy[lang];
  const en = lang === "en";
  switch (page) {
    case "home":
      return { title: `${hero.tagline} | Forsa Design`, description: hero.subheader };
    case "services":
      return {
        title: en
          ? "Industrial Digital & 3D Engineering Services | Forsa Design"
          : "Usługi cyfrowe dla przemysłu i inżynieria 3D | Forsa Design",
        description: en
          ? "Industrial websites, technical catalogues, B2B portals and commercial workflows. CAD-based visualisation, interactive models and parametric 3D configurators."
          : "Strony dla przemysłu, katalogi techniczne, portale B2B i obsługa procesów handlowych. Wizualizacje CAD, interaktywne modele i parametryczne konfiguratory 3D.",
      };
    case "search":
      return {
        title: en ? "Search | Forsa Design" : "Szukaj | Forsa Design",
        description: en
          ? "Search Forsa Design’s services, development milestones, case studies, frequently asked questions and articles."
          : "Przeszukaj usługi Forsa Design, etapy rozwoju, opisy projektów, najczęstsze pytania i artykuły.",
      };
    case "contact":
      return {
        title: en
          ? "Contact Forsa Design | Industrial Digital and 3D Projects"
          : "Kontakt z Forsa Design | Projekty cyfrowe i 3D dla przemysłu",
        description: en
          ? "Contact Forsa Design in Banff, Scotland, to discuss an industrial digital system, technical catalogue or 3D project."
          : "Skontaktuj się z Forsa Design z Banff w Szkocji, aby omówić system cyfrowy dla przemysłu, katalog techniczny lub projekt 3D.",
      };
    case "quote":
      return {
        title: en ? "Request a Quote | Forsa Design" : "Poproś o wycenę | Forsa Design",
        description: en
          ? "Describe your industrial website, digital system or 3D project so we can review the requirements for a quotation."
          : "Opisz projekt strony dla przemysłu, systemu cyfrowego lub rozwiązania 3D, abyśmy mogli ocenić wymagania potrzebne do wyceny.",
      };
  }
}

export function serviceSchema(lang: Language) {
  const { digital, engineering } = siteCopy[lang].services;
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `https://forsadesign.co.uk/${lang}/#offer-catalog`,
    name: siteCopy[lang].hero.tagline,
    inLanguage: lang === "en" ? "en-GB" : "pl-PL",
    itemListElement: [digital, engineering].map(({ title, items }) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: title,
        description: items.join(" "),
        provider: {
          "@type": "Organization",
          name: "Forsa Design",
          url: "https://forsadesign.co.uk/",
        },
      },
    })),
  };
}
