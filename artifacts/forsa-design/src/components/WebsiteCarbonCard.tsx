import React from "react";

const results = [
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

const copy = {
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

const sourceLink =
  "inline-flex min-h-11 items-center rounded border border-primary/30 px-3 py-2 text-sm font-medium text-primary underline-offset-4 hover:border-primary/70 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

export default function WebsiteCarbonCard({ lang }: { lang: "pl" | "en" }) {
  const c = copy[lang];
  const number = (value: string) => (lang === "pl" ? value.replace(".", ",") : value);

  return (
    <article
      aria-labelledby="website-emissions-heading"
      className="flex h-full min-h-[600px] flex-col overflow-hidden rounded-lg border border-primary/25 bg-card"
    >
      <div className="relative isolate h-[220px] shrink-0 overflow-hidden border-b border-primary/15 bg-[#151d21]">
        <svg
          viewBox="0 0 480 220"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-primary/10"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path d="M0 44H480M0 88H480M0 132H480M0 176H480M48 0V220M96 0V220M144 0V220M192 0V220M240 0V220M288 0V220M336 0V220M384 0V220M432 0V220" />
        </svg>
        <dl className="relative grid h-full grid-cols-2 items-center divide-x divide-primary/20 px-3 sm:px-6">
          {results.map((result) => (
            <div key={result.domain} className="min-w-0 px-1 text-center sm:px-3">
              <dt className="min-h-10 text-sm font-medium leading-5 text-white">{result.name}</dt>
              <dd className="flex flex-col items-center gap-1">
                <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-primary/50 bg-background px-2 font-serif text-2xl font-bold text-primary">
                  <span className="sr-only">{c.rating}: </span>
                  {result.rating}
                </span>
                <span className="mt-1 block font-serif text-[2rem] font-bold leading-none tracking-tight text-primary sm:text-4xl">
                  {number(result.carbon)}
                </span>
                <span className="mt-1 text-sm leading-5 text-foreground/80">
                  <span className="block">g CO₂e</span>
                  <span className="block">{c.perView}</span>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="text-sm font-medium uppercase tracking-[0.12em] text-primary">{c.category}</p>
        <h3
          id="website-emissions-heading"
          className="font-serif text-3xl font-bold text-white"
        >
          {c.title}
        </h3>
        <p className="text-base leading-relaxed text-foreground/80">{c.intro}</p>
        <p className="text-base leading-relaxed text-foreground/80">{c.value}</p>
        <p className="text-sm leading-relaxed text-primary">
          <span className="block font-semibold">1ClickImpact</span>
          <time dateTime="2026-11-27">{c.testDate}</time>
        </p>

        <details className="group mt-auto border-t border-primary/20 pt-2">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-base font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
            {c.details}
            <svg
              viewBox="0 0 20 20"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="shrink-0 group-open:rotate-180"
              aria-hidden="true"
            >
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div className="space-y-6 pt-4">
            {results.map((result) => (
              <section key={result.domain} aria-label={`${result.name}: ${c.sourceLabel}`}>
                <h4 className="text-base font-semibold text-white">{result.name}</h4>
                <p className="mb-3 break-all text-sm text-foreground/80">{result.domain}</p>
                <dl className="space-y-2 text-sm leading-relaxed">
                  {[
                    [c.rating, result.rating],
                    [c.carbon, `${number(result.carbon)} g CO₂e`],
                    [c.transfer, `${number(result.transfer)} KB`],
                    [c.energy, `${number(result.energy)} Wh`],
                    [c.hosting, c.green],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-primary/10 pb-2"
                    >
                      <dt className="text-foreground/80">{label}</dt>
                      <dd className="text-right font-medium text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={result.report}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={sourceLink}
                    aria-label={`${result.name}: ${c.report}`}
                  >
                    {c.report}
                  </a>
                  <a
                    href={result.pdf}
                    download
                    className={sourceLink}
                    aria-label={`${result.name}: ${c.pdf}`}
                  >
                    {c.pdf}
                  </a>
                </div>
              </section>
            ))}

            <div className="space-y-3 border-t border-primary/15 pt-4 text-sm leading-relaxed text-foreground/80">
              <p>{c.hostingNote}</p>
              <p>{c.scope}</p>
            </div>

            <section className="space-y-3 border-t border-primary/15 pt-4">
              <h4 className="text-base font-semibold text-white">{c.contextTitle}</h4>
              <p className="text-base leading-relaxed text-foreground/80">{c.context}</p>
              <div className="flex flex-col items-start gap-2">
                <a
                  href="https://www.gov.uk/service-manual/design/environmentally-sustainable-services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sourceLink}
                >
                  {c.government}
                </a>
                <a
                  href="https://design.scotentblog.co.uk/reducing-carbon-emissions-from-our-websites/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sourceLink}
                >
                  {c.enterprise}
                </a>
              </div>
            </section>
          </div>
        </details>
      </div>
    </article>
  );
}
