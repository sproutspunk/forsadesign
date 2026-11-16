import React from "react";
import { dachCase, dachImage, dachPath } from "../data/dachCaseStudy";
import { linklangCasePath, linklangCaseStudy } from "../data/linklangCaseStudy";

export default function PortfolioContent({ lang }: { lang: "pl" | "en" }) {
  const c = linklangCaseStudy[lang];
  const cards = [
    {
      title: "Dach Systema",
      category: lang === "pl" ? "Konfigurator 3D" : "3D configurator",
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
      category: lang === "pl" ? "Portal klienta" : "Client portal",
      description:
        lang === "pl"
          ? "Platforma usług językowych. Konto klienta, zlecenia, dokumenty i kontakt z obsługą w jednym miejscu."
          : "A language-services platform bringing client accounts, orders, documents and communication into one workspace.",
      detail: lang === "pl" ? "PL / EN · Wyceny i płatności" : "PL / EN · Quotations and payments",
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
                ? "Strony i narzędzia połączone z rzeczywistym procesem obsługi klienta."
                : "Websites and tools built around real customer workflows."}
            </p>
          </div>
          <ul
            aria-label={lang === "pl" ? "Projekty portfolio" : "Portfolio projects"}
            className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[340px] items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-5 pt-1 px-1 -mx-1"
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
                  <div className="grid grid-rows-[20px_40px_minmax(0,1fr)_40px_48px] gap-3 min-w-0 min-h-0 p-6">
                    <p className="text-primary text-[11px] uppercase tracking-[0.14em]">
                      {card.category}
                    </p>
                    <h3 className="font-serif text-3xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-foreground/75 leading-relaxed">{card.description}</p>
                    <p className="text-xs text-primary/80 leading-relaxed">{card.detail}</p>
                    <span className="h-full inline-flex items-center justify-between gap-3 text-sm font-semibold text-primary border-t border-primary/15">
                      {c.readCase}
                      <span aria-hidden="true">↗</span>
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
