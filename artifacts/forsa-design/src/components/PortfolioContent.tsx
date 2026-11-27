import React, { useRef, useState } from "react";
import { dachCase, dachPath } from "../data/dachCaseStudy";
import { linklangCasePath, linklangCaseStudy } from "../data/linklangCaseStudy";

export default function PortfolioContent({ lang }: { lang: "pl" | "en" }) {
  const c = linklangCaseStudy[lang];
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const move = (direction: number) => {
    const list = track.current;
    if (!list) return;
    const item = list.children[0] as HTMLElement;
    const step = item.getBoundingClientRect().width + 24;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({
      left: Math.max(0, Math.min(cardCount - 1, active + direction)) * step,
      behavior: reduced ? "instant" : "smooth",
    });
  };
  const cards = [
    {
      title: "Dach Systema",
      category:
        lang === "pl"
          ? "Konfigurator 3D · Identyfikacja wizualna"
          : "3D configurator · Visual identity",
      description:
        lang === "pl"
          ? "Wymiary, dach i wyposażenie garażu lub hali w interaktywnym modelu 3D. Zapis projektu i przygotowanie zapytania."
          : "Garage and hall dimensions, roofs and equipment in an interactive 3D model. Project saving and enquiry preparation.",
      detail: dachCase[lang].status,
      image: "/projects/dachsystema-double-garage-3d.webp",
      alt:
        lang === "pl"
          ? "Model 3D garażu z dwiema bramami w kolorze orzecha"
          : "3D model of a garage with two walnut-coloured doors",
      href: dachPath(lang),
      width: 838,
      height: 640,
      light: false,
    },
    {
      title: "LinkLang",
      category:
        lang === "pl"
          ? "Portal klienta · Identyfikacja wizualna"
          : "Client portal · Visual identity",
      description:
        lang === "pl"
          ? "Platforma usług językowych. Konto klienta, zlecenia, dokumenty i kontakt z obsługą w jednym miejscu."
          : "A language-services platform bringing client accounts, orders, documents and communication into one workspace.",
      detail: lang === "pl" ? "System produkcyjny · PL / EN" : "Production system · PL / EN",
      image: c.image,
      alt: c.imageAlt,
      href: linklangCasePath(lang),
      width: 1120,
      height: 420,
      light: true,
    },
    {
      title: "Industrial 3D CAD",
      category: lang === "pl" ? "Wizualizacja przemysłowa" : "Industrial visualisation",
      description:
        lang === "pl"
          ? "Tworzymy interaktywne modele 3D części i zespołów przemysłowych. Obróć uchwyt tokarski i rozsuń jego elementy, żeby zobaczyć, jak do siebie pasują."
          : "We create interactive 3D models of industrial parts and assemblies. Rotate the lathe chuck and use the exploded view to see how its components fit together.",
      detail: lang === "pl" ? "Autorski model Forsa Design" : "Original Forsa Design model",
      image: "/projects/industrial-3d-cad-chuck.webp",
      alt:
        lang === "pl"
          ? "Trójszczękowy uchwyt tokarski w widoku ukośnym"
          : "Three-jaw lathe chuck viewed at an angle",
      href: `/${lang}/services/#industrial-3d-demo`,
      cta: lang === "pl" ? "Obejrzyj model 3D" : "Explore the 3D model",
      width: 715,
      height: 480,
      light: false,
    },
  ];
  const cardCount = cards.length + 1;

  return (
    <React.Fragment>
      <section
        id="portfolio"
        className="py-24 border-t border-border/10 scroll-mt-24"
        aria-labelledby="portfolio-heading"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="max-w-2xl mb-10">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">
              Portfolio
            </p>
            <h2
              id="portfolio-heading"
              className="font-serif text-4xl md:text-5xl font-bold text-white mb-5"
            >
              {lang === "pl" ? "Projekty w praktyce" : "Projects in practice"}
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              {lang === "pl"
                ? "Działający konfigurator 3D Dach Systema, portal klienta LinkLang i interaktywny model uchwytu tokarskiego."
                : "Dach Systema’s working 3D configurator, the LinkLang client portal and an interactive lathe chuck model."}
            </p>
          </div>
          <div
            className="flex items-center justify-between gap-4 mb-4 lg:hidden"
            aria-label={lang === "pl" ? "Nawigacja portfolio" : "Portfolio navigation"}
          >
            <div className="text-sm text-foreground/70">
              <p className="text-primary">
                {lang === "pl" ? "Przesuń, aby zobaczyć więcej" : "Swipe to explore more"}
              </p>
              <p className="text-xs mt-1" aria-live="polite">
                {active + 1} / {cardCount}
              </p>
            </div>
            <div className="flex gap-2">
              {[-1, 1].map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => move(direction)}
                  disabled={direction < 0 ? active === 0 : active === cardCount - 1}
                  aria-controls="portfolio-projects"
                  aria-label={
                    lang === "pl"
                      ? direction < 0
                        ? "Poprzedni projekt"
                        : "Następny projekt"
                      : direction < 0
                        ? "Previous project"
                        : "Next project"
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-primary/40 text-primary disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d={direction < 0 ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          <ul
            id="portfolio-projects"
            ref={track}
            onScroll={(event) => {
              const list = event.currentTarget;
              const item = list.children[0] as HTMLElement;
              const end = list.scrollWidth - list.clientWidth;
              if (list.scrollLeft > 0 && list.scrollLeft >= end - 1) {
                setActive(cardCount - 1);
                return;
              }
              setActive(
                Math.max(
                  0,
                  Math.min(
                    cardCount - 1,
                    Math.round(list.scrollLeft / (item.getBoundingClientRect().width + 24)),
                  ),
                ),
              );
            }}
            aria-label={lang === "pl" ? "Projekty portfolio" : "Portfolio projects"}
            className="grid grid-flow-col auto-cols-[88%] sm:auto-cols-[65%] lg:grid-flow-row lg:grid-cols-2 items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-5 pt-1 px-1 -mx-1"
          >
            {cards.map((card) => (
              <li key={card.href} className="min-w-0 snap-start">
                <a
                  href={card.href}
                  className="group grid grid-rows-[220px_minmax(0,1fr)] w-full h-full min-h-[600px] overflow-hidden rounded-lg border border-primary/25 bg-card hover:border-primary/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  <div
                    className={`min-w-0 min-h-0 p-4 flex items-center justify-center border-b border-primary/15 ${card.light ? "bg-slate-100" : "bg-[#151d21]"}`}
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      loading="lazy"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid grid-rows-[20px_40px_minmax(0,1fr)_40px_48px] gap-3 min-w-0 min-h-0 p-5 sm:p-6">
                    <p className="text-primary text-[11px] uppercase tracking-[0.14em]">
                      {card.category}
                    </p>
                    <h3 className="font-serif text-3xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">{card.description}</p>
                    <p className="text-xs text-primary/80 leading-relaxed">{card.detail}</p>
                    <span className="h-full inline-flex items-center justify-between gap-3 text-sm font-semibold text-primary border-t border-primary/15">
                      {card.cta ?? c.readCase}
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M6 18L18 6M6 6h12v12" />
                      </svg>
                    </span>
                  </div>
                </a>
              </li>
            ))}
            <li id="website-emissions" className="min-w-0 snap-start scroll-mt-28">
              <article
                aria-labelledby="website-emissions-heading"
                className="grid h-full min-h-[600px] grid-rows-[220px_1fr] overflow-hidden rounded-lg border border-primary/25 bg-card"
              >
                <dl className="grid grid-cols-2 items-center divide-x divide-primary/20 border-b border-primary/15 bg-[#151d21] px-4 sm:px-6">
                  <div className="px-2 text-center">
                    <dt className="text-sm font-medium text-white">Forsa Design</dt>
                    <dd className="mt-3">
                      <span className="block font-serif text-4xl font-bold text-primary">
                        {lang === "pl" ? "0,07" : "0.07"}
                      </span>
                      <span className="mt-1 block text-xs text-foreground/80">
                        {lang === "pl" ? "g CO₂ na wizytę" : "g CO₂ per visit"}
                      </span>
                    </dd>
                  </div>
                  <div className="px-2 text-center">
                    <dt className="text-sm font-medium text-white">LinkLang</dt>
                    <dd className="mt-3">
                      <span className="block font-serif text-4xl font-bold text-primary">
                        {lang === "pl" ? "0,09" : "0.09"}
                      </span>
                      <span className="mt-1 block text-xs text-foreground/80">
                        {lang === "pl" ? "g CO₂ na wizytę" : "g CO₂ per visit"}
                      </span>
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-col gap-3 p-5 sm:p-6">
                  <p className="text-primary text-[11px] uppercase tracking-[0.14em]">
                    {lang === "pl" ? "Efektywność cyfrowa · UK" : "Digital efficiency · UK"}
                  </p>
                  <h3
                    id="website-emissions-heading"
                    className="font-serif text-3xl font-bold text-white"
                  >
                    {lang === "pl" ? "Ślad węglowy stron" : "Website carbon footprint"}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {lang === "pl"
                      ? "Dobrze zaprojektowana strona powinna działać sprawnie i oszczędnie korzystać z zasobów. Optymalizacja kodu, obrazów i transferu danych pomaga skracać czas ładowania oraz ograniczać ślad węglowy."
                      : "A well-built website should be quick to use and economical with resources. Optimising code, images and data transfer can improve loading times and reduce its carbon footprint."}
                  </p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    {lang === "pl"
                      ? "W UK ma to również znaczenie przy wyborze dostawców. "
                      : "In the UK, this also matters when choosing suppliers. "}
                    <a
                      href="https://www.gov.uk/service-manual/design/environmentally-sustainable-services"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      GOV.UK
                    </a>
                    {lang === "pl"
                      ? " zaleca zespołom administracji uwzględnianie wpływu środowiskowego ofert, a "
                      : " advises government service teams to assess the environmental impact of proposals, while "}
                    <a
                      href="https://design.scotentblog.co.uk/reducing-carbon-emissions-from-our-websites/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                    >
                      Scottish Enterprise
                    </a>
                    {lang === "pl"
                      ? " łączy redukcję emisji swoich stron z realizacją celów Net Zero."
                      : " links reductions in website emissions to its Net Zero goals."}
                  </p>
                  <p className="mt-auto border-t border-primary/15 pt-4 text-xs text-foreground/70">
                    {lang === "pl"
                      ? "Wcześniej opublikowane szacunki dla publicznych stron głównych, w gramach CO₂ na wizytę."
                      : "Previously published estimates for the public homepages, in grams of CO₂ per visit."}
                  </p>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </section>
    </React.Fragment>
  );
}
