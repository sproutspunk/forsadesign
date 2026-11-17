import React from "react";

const copy = {
  pl: {
    rationale: "Kolory konfiguratora nie są przypadkowe",
    body: "Ograniczona, spójna paleta porządkuje interfejs. Błękit wyróżnia elementy interaktywne, a ciepły, piaskowy akcent wskazuje główne działanie. Grafitowe tła tworzą wspólną bazę dla formularza i podglądu 3D.",
    sources: "Uzasadnienie i źródła",
    evidence:
      "Badania Deng, Hui i Hutchinsona nad konfiguracją produktów wskazują na preferencję dla ograniczonych, zbliżonych palet, z kontrastowym wyróżnieniem pojedynczego elementu u części uczestników. Labrecque i Milne opisują związek błękitu z postrzeganą kompetencją marki. W konfiguratorze stosujemy te ustalenia jako inspirację projektową; badania nie oceniały tej konkretnej palety ani jej wpływu na konwersję.",
    palette: "Paleta interfejsu konfiguratora 3D",
    colors: ["Grafit", "Tło paneli", "Błękit", "Piaskowy akcent"],
  },
  en: {
    rationale: "The configurator colours are a deliberate choice",
    body: "A limited, coherent palette organises the interface. Blue distinguishes interactive elements, while a warm, sand-coloured accent highlights the primary action. Graphite backgrounds provide a shared foundation for the form and 3D preview.",
    sources: "Rationale and sources",
    evidence:
      "Deng, Hui and Hutchinson’s product customisation research found a preference for small, closely related palettes, with some participants using a contrasting colour to highlight one component. Labrecque and Milne describe an association between blue and perceived brand competence. We apply these findings as design inspiration; the studies did not evaluate this particular palette or its effect on conversion.",
    palette: "3D configurator interface palette",
    colors: ["Graphite", "Panel background", "Blue", "Sand accent"],
  },
};

export default function DachColourRationale({ lang }: { lang: "pl" | "en" }) {
  const c = copy[lang];
  return (
    <section
      id="dach-colours"
      aria-labelledby="dach-colours-heading"
      className="max-w-3xl mb-16 scroll-mt-36"
    >
      <h2 id="dach-colours-heading" className="font-serif text-3xl text-white mb-5">
        {c.rationale}
      </h2>
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
    </section>
  );
}
