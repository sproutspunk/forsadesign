import React from "react";
import { siteCopy } from "../data/siteCopy";
import BrandingOffer from "./BrandingOffer";
import ChuckDemo from "./ChuckDemo";
import { DueDiligenceCard } from "./DueDiligenceContent";

export function ServicesContent({ lang }: { lang: "pl" | "en" }) {
  const { heading, digital, engineering } = siteCopy[lang].services;
  const digitalAnchors = [
    "industrial-websites",
    "b2b-e-commerce",
    undefined,
    undefined,
    "web-systems",
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-10">{heading}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article
            id="industrial-digital-solutions"
            className="scroll-mt-48 xl:scroll-mt-36 rounded-lg border border-border border-t-primary bg-card p-6 md:p-8"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{digital.title}</h3>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              {digital.items.map((item, index) => (
                <li key={item} id={digitalAnchors[index]} className="scroll-mt-48 xl:scroll-mt-36">
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article
            id="industrial-3d-cad"
            className="scroll-mt-48 xl:scroll-mt-36 rounded-lg border border-border border-t-primary bg-card p-6 md:p-8"
          >
            <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{engineering.title}</h3>
            <ul className="list-disc pl-5 space-y-2 text-foreground/80">
              {engineering.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="mt-5 inline-block text-primary underline"
              href={`/${lang}/case-studies/dachsystema/`}
            >
              {lang === "pl" ? "Konfigurator 3D Dach Systema" : "Dach Systema 3D configurator"}
            </a>
          </article>
        </div>
        <div id="industrial-3d-demo" className="mt-6 scroll-mt-48 xl:scroll-mt-36">
          <ChuckDemo lang={lang} />
        </div>
        <BrandingOffer lang={lang} />
        <DueDiligenceCard lang={lang} />
      </div>
    </section>
  );
}
