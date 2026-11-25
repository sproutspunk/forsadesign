import React from "react";
import { siteCopy } from "../data/siteCopy";
import BrandingOffer from "./BrandingOffer";
import ChuckDemo from "./ChuckDemo";
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
        <article id="industrial-3d-cad" className="mt-6 scroll-mt-28 rounded-lg border border-border border-t-primary bg-card p-6 md:p-8">
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">
            {lang === "pl" ? "Przemysłowe rozwiązania 3D i CAD" : "Industrial 3D & CAD Solutions"}
          </h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-6">
            {lang === "pl"
              ? "Tworzymy interaktywne katalogi 3D, wizualizacje techniczne i konfiguratory dla producentów maszyn, dostawców oprzyrządowania CNC oraz dystrybutorów przemysłowych. Wykorzystujemy oryginalną geometrię CAD udostępnioną do tego celu, aby klienci mogli analizować produkty bezpośrednio w przeglądarce."
              : "We develop interactive 3D catalogues, technical product visualisations and engineering configurators for machinery manufacturers, CNC tooling suppliers and industrial distributors. Using original CAD geometry authorised for the project, we enable customers to inspect products directly in their web browser."}
          </p>
          <ChuckDemo lang={lang} />
          <div className="grid gap-6 md:grid-cols-2">
            {(lang === "pl" ? [
              ["Interaktywne katalogi 3D", "Modele produktów, parametry techniczne, rysunki wymiarowe, wyszukiwanie i porównywanie."],
              ["Przemysłowe wizualizacje CAD", "Wierne wizualizacje maszyn, oprzyrządowania CNC i zespołów mechanicznych."],
              ["Interaktywne widoki rozstrzelone", "Regulowane rozłożenie zespołu, wybór części i sterowanie ich widocznością."],
              ["Wizualizacja ruchu mechanizmów", "Interaktywny ruch elementów w zweryfikowanych zakresach, jeżeli pozwalają na to dane techniczne."],
              ["Konwersja i optymalizacja CAD", "Konwersja STEP, IGES, BREP i STL do formatów internetowych z zachowaniem wymiarów i struktury zespołu w zakresie obsługiwanym przez plik źródłowy."],
              ["Fotorealistyczne rendery przemysłowe", "Wizualizacje wysokiej rozdzielczości z realistycznymi powierzchniami metalu."],
              ["Konfiguratory techniczne", "Dobór i konfiguracja produktów według parametrów oraz zweryfikowanych danych kompatybilności."]
            ] : [
              ["Interactive 3D Product Catalogues", "Interactive models, technical specifications, dimensional drawings, search and comparison."],
              ["Industrial CAD Visualisation", "High-fidelity visualisation of machinery, CNC tooling and mechanical assemblies."],
              ["Interactive Exploded Views", "Adjustable assembly separation, individual component selection and visibility controls."],
              ["Mechanical Motion Visualisation", "Interactive component movement within validated ranges where supported by engineering data."],
              ["CAD Conversion & Optimisation", "Conversion of STEP, IGES, BREP and STL into web-compatible models, preserving dimensions and assembly structure where supported by the source."],
              ["Photorealistic Industrial Rendering", "High-resolution product renders with realistic industrial metal finishes."],
              ["Engineering Product Configurators", "Product selection and configuration using technical parameters and verified compatibility data."]
            ]).map(([title, description]) => (
              <div key={title}>
                <h4 className="font-serif text-xl text-white mb-2">{title}</h4>
                <p className="text-base text-foreground/80 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-base text-foreground/80 leading-relaxed">
            {lang === "pl"
              ? "Rozwiązania dla producentów obrabiarek, systemów mocowania, automatyki, robotyki i komponentów mechanicznych. Skontaktuj się z nami, aby omówić dokumentację CAD, zakres produktów i wycenę projektu."
              : "Designed for machine tool, workholding, automation, robotics and mechanical component manufacturers. Contact us to discuss your CAD documentation, product range and project quotation."}
          </p>
        </article>
        <BrandingOffer lang={lang} />
        <DueDiligenceCard lang={lang} />
      </div>
    </section>
  );
}
