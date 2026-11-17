import React from "react";

const copy = {
  pl: {
    title: "LinkLang: kolorystyka wspierająca pracę z treścią",
    body: "Jasne powierzchnie i ciemny tekst służą czytelności dokumentów, formularzy i wiadomości. Butelkowa zieleń wyróżnia główne działania oraz nadaje portalowi spójny, spokojny charakter.",
    palette: "Paleta LinkLang",
    colors: ["Butelkowa zieleń", "Jasne tło", "Biel", "Ciemny tekst"],
    sources: "Uzasadnienie i źródła",
    evidence:
      "Przegląd 132 publikacji o kolorach i emocjach wskazuje, że zieleń bywa kojarzona z pozytywnymi emocjami o niskim pobudzeniu. Badania Piepenbrock i współautorów wykazały przewagę ciemnego tekstu na jasnym tle w zadaniach korekty tekstu, szczególnie przy małych znakach. Badania Deng i współautorów nad konfiguracją produktów wspierają zasadę ograniczonej, spójnej palety. Zastosowanie tych ustaleń do LinkLang jest interpretacją projektową: badania nie oceniały tego portalu ani nie potwierdzają, że jego kolorystyka zmniejsza stres lub zwiększa zaufanie.",
  },
  en: {
    title: "LinkLang: colours that support working with content",
    body: "Light surfaces and dark text support the readability of documents, forms and messages. Deep green distinguishes primary actions and gives the portal a consistent, calm visual character.",
    palette: "LinkLang colour palette",
    colors: ["Deep green", "Light background", "White", "Dark text"],
    sources: "Rationale and sources",
    evidence:
      "A review of 132 publications on colour and emotion found that green is often associated with positive, low-arousal emotions. Piepenbrock and colleagues found an advantage for dark text on light backgrounds in proofreading tasks, particularly with small characters. Deng and colleagues’ product customisation research supports the principle of a small, coherent palette. Applying these findings to LinkLang is a design interpretation: the studies did not evaluate this portal or establish that its colours reduce stress or increase trust.",
  },
};

export default function LinklangBrandingProof({ lang }: { lang: "pl" | "en" }) {
  const c = copy[lang];
  const sources = [
    {
      href: "https://doi.org/10.3758/s13423-024-02615-z",
      label:
        "Do we feel colours? A systematic review of 128 years of psychological research linking colours and emotions",
    },
    {
      href: "https://doi.org/10.1177/0018720813515509",
      label:
        "Piepenbrock, Mayr & Buchner (2014): Positive display polarity is particularly advantageous for small character sizes",
    },
    {
      href: "https://doi.org/10.1016/j.jcps.2010.07.005",
      label: "Deng, Hui & Hutchinson (2010): Consumer preferences for color combinations",
    },
  ];
  return (
    <section
      id="linklang-branding"
      aria-labelledby="linklang-branding-heading"
      className="mb-16 max-w-3xl scroll-mt-36"
    >
      <h2 id="linklang-branding-heading" className="font-serif text-3xl text-white mb-4">
        {c.title}
      </h2>
      <div className="space-y-6">
        <div>
          <p className="text-foreground/80 leading-relaxed">{c.body}</p>
          <ul aria-label={c.palette} className="my-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["#0F3D2E", "#F8FAFC", "#FFFFFF", "#0F172A"].map((hex, i) => (
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
        </div>
      </div>
      <details className="mt-6 max-w-3xl border-t border-primary/20 pt-4">
        <summary className="cursor-pointer py-2 text-base font-medium text-foreground/90">
          {c.sources}
        </summary>
        <p className="mt-3 text-base text-foreground/75 leading-relaxed">{c.evidence}</p>
        <ul className="mt-4 space-y-3 text-base">
          {sources.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="text-primary underline underline-offset-4">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
