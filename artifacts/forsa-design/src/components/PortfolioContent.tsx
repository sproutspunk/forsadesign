import React, { useRef, useState } from "react";
import { dachCase, dachImage, dachPath } from "../data/dachCaseStudy";
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
      left: Math.max(0, Math.min(cards.length - 1, active + direction)) * step,
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
      detail: dachCase[lang].status.split(" / ")[1],
      image: dachImage,
      alt:
        lang === "pl"
          ? "Rosyjska wersja konfiguratora Dach Systema z modelem garażu 3D"
          : "Russian-language Dach Systema configurator with a 3D garage model",
      href: dachPath(lang),
      width: 1440,
      height: 1000,
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
  ];
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
                ? "Portal obsługi klienta działający produkcyjnie oraz prototyp konfiguratora 3D."
                : "A live service platform and a 3D configurator prototype."}
            </p>
          </div>
          <div
            className="flex items-center justify-between gap-4 mb-4 md:hidden"
            aria-label={lang === "pl" ? "Nawigacja portfolio" : "Portfolio navigation"}
          >
            <div className="text-sm text-foreground/70">
              <p className="text-primary">
                {lang === "pl" ? "Przesuń, aby zobaczyć więcej" : "Swipe to explore more"}
              </p>
              <p className="text-xs mt-1" aria-live="polite">
                {active + 1} / {cards.length}
              </p>
            </div>
            <div className="flex gap-2">
              {[-1, 1].map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => move(direction)}
                  disabled={direction < 0 ? active === 0 : active === cards.length - 1}
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
              setActive(
                Math.max(
                  0,
                  Math.min(
                    cards.length - 1,
                    Math.round(list.scrollLeft / (item.getBoundingClientRect().width + 24)),
                  ),
                ),
              );
            }}
            aria-label={lang === "pl" ? "Projekty portfolio" : "Portfolio projects"}
            className="grid grid-flow-col auto-cols-[88%] sm:auto-cols-[340px] items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-5 pt-1 px-1 -mx-1"
          >
            {cards.map((card) => (
              <li key={card.href} className="min-w-0 snap-start">
                <a
                  href={card.href}
                  className="group grid grid-rows-[220px_minmax(0,1fr)] w-full h-[600px] overflow-hidden rounded-lg border border-primary/25 bg-card hover:border-primary/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
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
                      {c.readCase}
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
          </ul>
        </div>
      </section>
    </React.Fragment>
  );
}
