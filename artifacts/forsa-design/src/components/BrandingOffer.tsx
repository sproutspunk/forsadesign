import React from "react";
import { linklangCasePath } from "../data/linklangCaseStudy";

import { dachPath } from "../data/dachCaseStudy";

export const brandingCopy = {
  pl: {
    title: "Branding i identyfikacja wizualna",
    intro:
      "Projektujemy logo, dobieramy kolory i typografię oraz tworzymy spójną identyfikację wizualną do zastosowania na stronie, w aplikacji i materiałach firmowych.",
    scope: [
      "Projekt logo",
      "Paleta kolorów",
      "Dobór typografii",
      "Zasady stosowania identyfikacji",
    ],
    cta: "Omów identyfikację swojej firmy",
  },
  en: {
    title: "Branding and visual identity",
    intro:
      "We design logos, select colours and typography, and create a consistent visual identity for websites, applications and business materials.",
    scope: ["Logo design", "Colour palette", "Typography selection", "Visual identity guidelines"],
    cta: "Discuss your company’s visual identity",
  },
};

export default function BrandingOffer({ lang }: { lang: "pl" | "en" }) {
  const c = brandingCopy[lang];
  return (
    <section
      id="branding"
      aria-labelledby="branding-heading"
      className="scroll-mt-36 mt-16 rounded-lg border border-primary/25 bg-card p-6 md:p-10"
    >
      <div className="max-w-3xl">
        <h3
          id="branding-heading"
          className="font-serif text-3xl md:text-4xl font-bold text-white mb-5"
        >
          {c.title}
        </h3>
        <p className="text-lg text-foreground/80 leading-relaxed">{c.intro}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {c.scope.map((item) => (
            <li
              key={item}
              className="rounded-sm border border-primary/30 px-3 py-2 text-base text-foreground/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <nav
        aria-label={
          lang === "pl"
            ? "Przykłady identyfikacji w portfolio"
            : "Visual identity examples in our portfolio"
        }
        className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-base"
      >
        <a
          href={dachPath(lang) + "#dach-colours"}
          className="text-primary underline underline-offset-4"
        >
          Dach Systema —{" "}
          {lang === "pl" ? "kolorystyka konfiguratora 3D" : "3D configurator colours"}
        </a>
        <a
          href={linklangCasePath(lang) + "#linklang-branding"}
          className="text-primary underline underline-offset-4"
        >
          LinkLang — {lang === "pl" ? "identyfikacja wizualna portalu" : "portal visual identity"}
        </a>
      </nav>
      <a
        href={`/${lang}/contact/`}
        className="mt-8 inline-block rounded-sm bg-primary px-5 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
      >
        {c.cta}
      </a>
    </section>
  );
}
