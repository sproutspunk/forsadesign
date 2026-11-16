export type CaseStudyLanguage = "en" | "pl";

export const linklangProject = {
  name: "LinkLang",
  url: "https://www.linklang.co.uk/",
  reviewedOn: "2026-11-16",
  technologies: [
    "React",
    "TypeScript",
    "Hono",
    "Cloudflare Pages",
    "Workers",
    "D1",
    "R2",
    "Stripe",
    "Resend",
  ],
};

export const linklangCaseStudy = {
  pl: {
    label: "Case study / System webowy",
    portfolioHeading: "Projekt w praktyce",
    portfolioIntro: "Od publicznej strony usługowej do obsługi zlecenia w panelu klienta.",
    title: "LinkLang: strona usługowa i portal obsługi tłumaczeń",
    description:
      "Case study LinkLang: dwujęzyczna strona, konta klientów, zlecenia, wyceny, dokumenty i integracja Stripe w jednym systemie webowym.",
    lead: "Strona przedstawia ofertę. Portal prowadzi dalej: od wyboru usługi i przesłania materiałów, przez wycenę i płatność, po wiadomości i dokumenty przypisane do zlecenia.",
    cardTitle: "LinkLang",
    cardText:
      "Dwujęzyczna platforma usług językowych z panelem klienta, wycenami, dokumentami i integracją płatności.",
    readCase: "Zobacz case study",
    visit: "Odwiedź LinkLang",
    back: "Powrót do portfolio",
    image: "/projects/linklang-public-pl.jpg",
    imageAlt:
      "Fragment publicznej strony LinkLang w języku polskim z ofertą tłumaczeń i przyciskiem rozpoczęcia zlecenia",
    imageCaption: "Publiczna strona LinkLang, widok z 16 listopada 2026.",
    facts: [
      { value: "PL / EN", label: "Strona i panel w dwóch językach" },
      { value: "5", label: "Rodzajów usług w formularzu" },
      { value: "1", label: "Wspólna karta zlecenia" },
    ],
    contextHeading: "Usługa zaczyna się od właściwych informacji",
    context: [
      "LinkLang oferuje tłumaczenia polsko-angielskie, tłumaczenia ustne na miejscu i zdalnie, pomoc językową w kontaktach z instytucjami oraz obsługę firm. Publiczna strona wyjaśnia zakres usług i rozróżnia obsługę online od dojazdu w rejonie Banff.",
      "Każdy typ zlecenia wymaga innego opisu. Przy dokumencie znaczenie mają języki i materiały źródłowe; przy spotkaniu także lokalizacja, czas i instytucja. Formularz zmienia dostępne pola zależnie od wybranej usługi.",
    ],
    scopeHeading: "Co obejmuje wdrożenie",
    features: [
      {
        title: "Strona PL i EN",
        body: "Oferta, kontakt i centrum pomocy są dostępne w dwóch językach. Przełączanie języka obejmuje także widoki konta i obsługi zleceń.",
      },
      {
        title: "Konto klienta",
        body: "Rejestracja, logowanie, odzyskiwanie hasła oraz lista aktywnych i zakończonych zleceń. Szczegóły sprawy prowadzą do powiązanych materiałów i korespondencji.",
      },
      {
        title: "Wycena i akceptacja",
        body: "Administrator tworzy wycenę dla konkretnego zlecenia. Klient może ją zaakceptować w panelu. Kwota pochodzi z zapisanej oferty, a nie z dowolnej wartości wpisanej w przeglądarce.",
      },
      {
        title: "Integracja płatności",
        body: "Po akceptacji wyceny aplikacja może utworzyć sesję Stripe Checkout. Backend obsługuje podpisane powiadomienie Stripe potwierdzające opłaconą sesję.",
      },
      {
        title: "Dokumenty i wiadomości",
        body: "Pliki i rozmowa są przypisane do zlecenia. Endpoint pobierania sprawdza dostęp właściciela zlecenia lub administratora oraz zgodność dokumentu z daną sprawą.",
      },
      {
        title: "Panel administracyjny",
        body: "Obsługa zleceń, przygotowanie wycen i zmiany statusów mają własny interfejs. Historia statusów zapisuje etap sprawy i osobę wprowadzającą zmianę.",
      },
    ],
    workflowHeading: "Droga od zgłoszenia do odbioru",
    workflowIntro:
      "Proces rozdziela decyzję o zakresie usługi, akceptację ceny i potwierdzenie płatności.",
    steps: [
      {
        title: "Wybór usługi",
        body: "Klient wybiera rodzaj zlecenia, podaje termin i informacje potrzebne do oceny. Może dołączyć materiały źródłowe.",
      },
      {
        title: "Przygotowanie wyceny",
        body: "Administrator ocenia zgłoszenie i zapisuje ofertę przypisaną do konkretnej sprawy.",
      },
      {
        title: "Akceptacja i płatność",
        body: "Klient akceptuje wycenę. Integracja Checkout przekazuje płatność do Stripe, a backend odbiera jej potwierdzenie.",
      },
      {
        title: "Realizacja i kontakt",
        body: "Karta zlecenia łączy status, wiadomości oraz dokumenty. Klient nie musi zakładać osobnej rozmowy dla każdego etapu.",
      },
      {
        title: "Odbiór materiałów",
        body: "Widok szczegółów udostępnia dokumenty powiązane ze sprawą; lista zleceń rozdziela aktywne pozycje i historię.",
      },
    ],
    decisionsHeading: "Decyzje, które porządkują obsługę",
    decisions: [
      {
        title: "Wycena po ocenie zgłoszenia",
        body: "Projekt nie sprowadza każdej usługi do jednego produktu z koszykiem. Ocena dokumentów lub warunków spotkania poprzedza ofertę, a klient zatwierdza konkretną kwotę.",
      },
      {
        title: "Dostęp do plików przez aplikację",
        body: "Dokumenty są przechowywane w R2 i pobierane przez endpoint z kontrolą dostępu. Dane zleceń i metadane plików znajdują się w D1. To oddziela plik od publicznej prezentacji oferty.",
      },
      {
        title: "Osobny zapis zgód dotyczących zdrowia",
        body: "Kod przewiduje nadanie i wycofanie zgody dla zleceń dotyczących danych o zdrowiu. Rejestr obejmuje wersję treści, język i powiązanie ze zleceniem. Opisuje to funkcję systemu, nie stanowi deklaracji pełnej zgodności prawnej.",
      },
    ],
    stackHeading: "Architektura projektu",
    stackIntro:
      "Interfejs React i TypeScript jest oddzielony od API Hono działającego na Cloudflare Workers. D1 przechowuje dane, R2 dokumenty, Stripe obsługuje Checkout, a Resend powiadomienia e-mail.",
    outcomeHeading: "Rezultat: spójny proces obsługi usługi",
    outcome:
      "Projekt łączy publiczną ofertę z kontem klienta i pracą administratora. Wycena, status, korespondencja oraz pliki mają wspólny kontekst zlecenia. To przykład dedykowanego systemu usługowego, który wykracza poza formularz kontaktowy.",
    evidence:
      "Zakres opisano na podstawie publicznej strony i kodu projektu sprawdzonych 16 listopada 2026. Nie podajemy niezmierzonych wzrostów sprzedaży ani oszczędności czasu. Integrację płatności potwierdzono w kodzie; na potrzeby case study nie wykonywano transakcji ani nie otwierano prywatnych zleceń.",
    ctaTitle: "Potrzebujesz podobnego procesu w swojej firmie?",
    ctaBody:
      "Porozmawiajmy o tym, jakie informacje zbiera klient, co zatwierdza Twój zespół i które etapy warto połączyć w jednym systemie.",
    cta: "Omów swój projekt",
  },
  en: {
    label: "Case study / Web system",
    portfolioHeading: "A project in practice",
    portfolioIntro: "From a public service website to managing an enquiry through a client portal.",
    title: "LinkLang: a service website and translation client portal",
    description:
      "LinkLang case study: a bilingual website, client accounts, orders, quotations, documents and Stripe integration in one bespoke web system.",
    lead: "The website explains the services. The portal takes the process further: from selecting a service and supplying materials through quotation and payment to messages and documents attached to the order.",
    cardTitle: "LinkLang",
    cardText:
      "A bilingual language-services platform with a client portal, quotations, documents and payment integration.",
    readCase: "Explore the case study",
    visit: "Visit LinkLang",
    back: "Back to portfolio",
    image: "/projects/linklang-public-en.jpg",
    imageAlt:
      "The public English-language LinkLang page showing translation services and the button to start an order",
    imageCaption: "The public LinkLang website, captured on 16 November 2026.",
    facts: [
      { value: "PL / EN", label: "Two languages across the site and portal" },
      { value: "5", label: "Service types in the order form" },
      { value: "1", label: "Shared order workspace" },
    ],
    contextHeading: "A service starts with the right information",
    context: [
      "LinkLang offers Polish-English translation, in-person and remote interpreting, language support for public-service interactions and business services. The public site explains the scope and distinguishes online support from in-person coverage around Banff.",
      "Different services need different details. A document requires source and target languages and supporting materials; a meeting also needs location, duration and institution. The order form changes its available fields according to the selected service.",
    ],
    scopeHeading: "What the implementation includes",
    features: [
      {
        title: "Polish and English",
        body: "Services, contact and support content are available in both languages. Language switching also covers account and order-management views.",
      },
      {
        title: "Client accounts",
        body: "Registration, sign-in, password recovery and separate lists of active and completed orders. Each order leads to its associated materials and correspondence.",
      },
      {
        title: "Quotations and acceptance",
        body: "An administrator prepares a quotation for a particular order. The client can accept it in the portal. The amount comes from the stored quotation rather than an arbitrary browser-supplied value.",
      },
      {
        title: "Payment integration",
        body: "After quotation acceptance, the application can create a Stripe Checkout session. The backend handles a signed Stripe notification confirming a paid session.",
      },
      {
        title: "Documents and messages",
        body: "Files and conversation belong to the order. The download endpoint checks access for the order owner or administrator and verifies that the document belongs to that order.",
      },
      {
        title: "Administration",
        body: "Order handling, quotation creation and status updates have a dedicated interface. Status history records the stage and the person making the change.",
      },
    ],
    workflowHeading: "From request to delivery",
    workflowIntro:
      "The workflow separates assessment of the requirement, acceptance of the price and confirmation of payment.",
    steps: [
      {
        title: "Select a service",
        body: "The client chooses the service, adds a deadline and supplies the information needed for assessment. Source materials can be attached.",
      },
      {
        title: "Prepare a quotation",
        body: "The administrator reviews the request and records a quotation against the order.",
      },
      {
        title: "Accept and pay",
        body: "The client accepts the quotation. The Checkout integration passes payment to Stripe and the backend receives confirmation.",
      },
      {
        title: "Work and communication",
        body: "The order workspace brings together its status, messages and documents, retaining the context throughout the service.",
      },
      {
        title: "Receive the materials",
        body: "The details view provides the documents associated with the order. The order list separates current work from its history.",
      },
    ],
    decisionsHeading: "Decisions behind the workflow",
    decisions: [
      {
        title: "A quotation follows assessment",
        body: "The project does not treat every service as a fixed-price shop item. Documents or meeting requirements can be assessed before an offer is prepared, and the client approves a specific amount.",
      },
      {
        title: "Application-controlled document access",
        body: "Documents are stored in R2 and downloaded through an access-controlled endpoint. D1 holds order data and file metadata. This separates working documents from the public service pages.",
      },
      {
        title: "A separate health-consent record",
        body: "The code supports granting and withdrawing consent for orders involving health information. The record includes the text version, language and associated order. This describes an implemented feature, rather than a claim of complete legal compliance.",
      },
    ],
    stackHeading: "Project architecture",
    stackIntro:
      "The React and TypeScript interface is separate from a Hono API running on Cloudflare Workers. D1 holds application data, R2 stores documents, Stripe provides Checkout and Resend handles email notifications.",
    outcomeHeading: "The result: a connected service workflow",
    outcome:
      "The project connects the public offer with the client account and administrator's work. Quotations, status, correspondence and files share the order context. It demonstrates a bespoke service system that extends beyond a contact form.",
    evidence:
      "The scope is based on the public website and project code reviewed on 16 November 2026. No unmeasured sales increases or time savings are claimed. Payment integration was verified in code; no transaction was made and no private orders were accessed for this case study.",
    ctaTitle: "Does your business need a similar workflow?",
    ctaBody:
      "Let’s discuss what clients need to submit, what your team approves and which stages belong in a shared system.",
    cta: "Discuss your project",
  },
};

export function linklangCasePath(lang: CaseStudyLanguage) {
  return `/${lang}/case-studies/linklang/`;
}

export function linklangCaseSchema(lang: CaseStudyLanguage) {
  const c = linklangCaseStudy[lang];
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    description: c.description,
    inLanguage: lang === "en" ? "en-GB" : "pl-PL",
    url: `https://forsadesign.co.uk${linklangCasePath(lang)}`,
    image: `https://forsadesign.co.uk${c.image}`,
    datePublished: linklangProject.reviewedOn,
    about: { "@type": "WebSite", name: linklangProject.name, url: linklangProject.url },
    author: { "@type": "Organization", name: "Forsa Design", url: "https://forsadesign.co.uk/" },
  };
}
