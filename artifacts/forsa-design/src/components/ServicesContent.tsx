import React from "react";
import { siteCopy } from "../data/siteCopy";
import BrandingOffer from "./BrandingOffer";
import { DueDiligenceCard } from "./DueDiligenceContent";
export function ServicesContent({ lang }: { lang: "pl" | "en" }) {
  const c = siteCopy[lang].services;
  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-10">{c.heading}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[c.card1, c.card2, c.card3].map((card, index) => (
            <article
              key={card.title}
              id={["industrial-websites", "b2b-e-commerce", "web-systems"][index]}
              className="scroll-mt-28 rounded-lg border border-border border-t-primary bg-card p-6"
            >
              <h3 className="font-serif text-2xl text-white mb-4">{card.title}</h3>
              <p className="text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                {card.desc}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 text-foreground/80">
          {lang === "pl"
            ? "Konfiguratory 3D są częścią dedykowanych narzędzi webowych."
            : "3D configurators form part of our custom web tools."}{" "}
          <a className="text-primary underline" href={`/${lang}/case-studies/dachsystema/`}>
            Dach Systema
          </a>
        </p>
        <BrandingOffer lang={lang} />
        <DueDiligenceCard lang={lang} />
      </div>
    </section>
  );
}
