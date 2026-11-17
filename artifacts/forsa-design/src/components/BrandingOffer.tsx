import React from "react";
import LinklangBrandingProof from "./LinklangBrandingProof";
import { dachImage, dachPath } from "../data/dachCaseStudy";

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
    examples: "Przykłady naszej pracy",
    forsa:
      "Logo i identyfikacja wizualna Forsa Design: znak, typografia i spójne zastosowanie kolorów na stronie.",
    dach: "Identyfikacja wizualna Dach Systema i jej zastosowanie w interfejsie konfiguratora 3D.",
    rationale: "Kolory konfiguratora nie są przypadkowe",
    body: "Ograniczona, spójna paleta porządkuje interfejs. Błękit wyróżnia elementy interaktywne, a ciepły, piaskowy akcent wskazuje główne działanie. Grafitowe tła tworzą wspólną bazę dla formularza i podglądu 3D.",
    sources: "Uzasadnienie i źródła",
    evidence:
      "Badania Deng, Hui i Hutchinsona nad konfiguracją produktów wskazują na preferencję dla ograniczonych, zbliżonych palet, z kontrastowym wyróżnieniem pojedynczego elementu u części uczestników. Labrecque i Milne opisują związek błękitu z postrzeganą kompetencją marki. W konfiguratorze stosujemy te ustalenia jako inspirację projektową; badania nie oceniały tej konkretnej palety ani jej wpływu na konwersję.",
    palette: "Paleta interfejsu konfiguratora 3D",
    colors: ["Grafit", "Tło paneli", "Błękit", "Piaskowy akcent"],
    view: "Zobacz konfigurator w portfolio",
    cta: "Omów identyfikację swojej firmy",
  },
  en: {
    title: "Branding and visual identity",
    intro:
      "We design logos, select colours and typography, and create a consistent visual identity for websites, applications and business materials.",
    scope: ["Logo design", "Colour palette", "Typography selection", "Visual identity guidelines"],
    examples: "Examples of our work",
    forsa:
      "Forsa Design logo and visual identity: a brand mark, typography and consistent use of colour across the website.",
    dach: "Dach Systema visual identity and its application to the 3D configurator interface.",
    rationale: "The configurator colours are a deliberate choice",
    body: "A limited, coherent palette organises the interface. Blue distinguishes interactive elements, while a warm, sand-coloured accent highlights the primary action. Graphite backgrounds provide a shared foundation for the form and 3D preview.",
    sources: "Rationale and sources",
    evidence:
      "Deng, Hui and Hutchinson’s product customisation research found a preference for small, closely related palettes, with some participants using a contrasting colour to highlight one component. Labrecque and Milne describe an association between blue and perceived brand competence. We apply these findings as design inspiration; the studies did not evaluate this particular palette or its effect on conversion.",
    palette: "3D configurator interface palette",
    colors: ["Graphite", "Panel background", "Blue", "Sand accent"],
    view: "View the configurator in our portfolio",
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
      <h4 className="text-xl font-semibold text-white mt-10 mb-5">{c.examples}</h4>
      <div className="grid gap-6 md:grid-cols-2">
        <figure className="rounded-md border border-border/50 bg-background/60 p-6">
          <div className="flex h-44 items-center justify-center">
            <img
              src="/brand/forsa-logo-gradient.svg"
              alt="Forsa Design"
              width="1000"
              height="710"
              loading="lazy"
              className="h-36 w-auto max-w-full"
            />
          </div>
          <figcaption className="mt-5 text-foreground/80 leading-relaxed">{c.forsa}</figcaption>
        </figure>
        <figure className="rounded-md border border-border/50 bg-background/60 p-6">
          <a
            href={dachPath(lang)}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            <img
              src={dachImage}
              alt={
                lang === "pl"
                  ? "Dach Systema: grafitowy interfejs konfiguratora garażu 3D z błękitnymi i piaskowymi akcentami"
                  : "Dach Systema: a graphite 3D garage configurator interface with blue and sand-coloured accents"
              }
              width="1440"
              height="1000"
              loading="lazy"
              className="h-44 w-full object-contain"
            />
          </a>
          <figcaption className="mt-5 text-foreground/80 leading-relaxed">{c.dach}</figcaption>
        </figure>
      </div>
      <div className="mt-10 max-w-3xl">
        <h4 className="font-serif text-2xl text-white mb-4">{c.rationale}</h4>
        <p className="text-foreground/80 leading-relaxed">{c.body}</p>
        <ul aria-label={c.palette} className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["#151C20", "#20292E", "#96CDDD", "#DDBD88"].map((hex, i) => (
            <li key={hex} className="min-w-0">
              <span
                aria-hidden="true"
                className="block h-12 rounded-sm border border-white/25"
                style={{ backgroundColor: hex }}
              />
              <span className="mt-2 block text-sm text-foreground/80">{c.colors[i]}</span>
              <span className="block font-mono text-sm text-foreground/60">{hex}</span>
            </li>
          ))}
        </ul>
        <a href={dachPath(lang)} className="text-primary underline underline-offset-4">
          {c.view}
        </a>
        <details className="mt-6 border-t border-primary/20 pt-4">
          <summary className="cursor-pointer py-2 text-base font-medium text-foreground/90">
            {c.sources}
          </summary>
          <p className="mt-3 text-base text-foreground/75 leading-relaxed">{c.evidence}</p>
          <ul className="mt-4 space-y-3 text-base">
            <li>
              <a
                href="https://doi.org/10.1016/j.jcps.2010.07.005"
                className="text-primary underline underline-offset-4"
              >
                Deng, Hui &amp; Hutchinson (2010): Consumer preferences for color combinations
              </a>
            </li>
            <li>
              <a
                href="https://doi.org/10.1007/s11747-010-0245-y"
                className="text-primary underline underline-offset-4"
              >
                Labrecque &amp; Milne (2012): Exciting red and competent blue
              </a>
            </li>
          </ul>
        </details>
      </div>
      <LinklangBrandingProof lang={lang} />
      <a
        href={`/${lang}/contact/`}
        className="mt-8 inline-block rounded-sm bg-primary px-5 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90"
      >
        {c.cta}
      </a>
    </section>
  );
}
