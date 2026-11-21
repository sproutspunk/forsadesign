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
        {lang === "en" && (
          <aside className="mt-8 rounded-lg border border-primary/30 bg-card p-7 md:p-9">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">
              For UK manufacturers and industrial distributors
            </p>
            <h3 className="mb-4 font-serif text-2xl font-bold text-white md:text-3xl">
              From PDF to Online Sales
            </h3>
            <p className="mb-5 max-w-3xl leading-relaxed text-foreground/80">
              Turn technical PDF product catalogues into searchable digital catalogues
              with part-number lookup, specification filters and structured quotation enquiries.
            </p>
            <a
              href="/en/services/pdf-to-online-sales/"
              className="inline-flex items-center py-2 font-semibold text-primary underline underline-offset-4"
            >
              Explore PDF catalogue conversion
            </a>
          </aside>
        )}
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
