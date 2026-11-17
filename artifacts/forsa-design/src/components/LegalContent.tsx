import React from "react";
import { privacySections, termsSections } from "../data/legal";
export default function LegalContent({
  lang,
  kind,
  onPreferences,
}: {
  lang: "pl" | "en";
  kind: "terms" | "privacy";
  onPreferences?: () => void;
}) {
  const pl = lang === "pl";
  const sections = kind === "terms" ? termsSections[lang] : privacySections[lang];
  return (
    <main
      id="main-content"
      className="container mx-auto px-6 py-16 max-w-4xl text-foreground/80 leading-relaxed"
    >
      <a href={`/${lang}/`} className="text-primary underline">
        {pl ? "Strona główna" : "Home"}
      </a>
      <h1 className="font-serif text-4xl md:text-5xl text-white mt-8 mb-5">
        {kind === "terms"
          ? pl
            ? "Regulamin świadczenia usług"
            : "Terms and Conditions"
          : pl
            ? "Polityka prywatności i cookies"
            : "Privacy and cookie notice"}
      </h1>
      <p>Forsa Design, Banff, Scotland, United Kingdom</p>
      <p className="mt-2 mb-10">
        {pl ? "Aktualizacja: 17 listopada 2026" : "Updated: 17 November 2026"}
      </p>
      {sections.map((section) => (
        <section
          id={kind === "privacy" && section.number === "7" ? "cookies" : undefined}
          key={section.number}
          className="mb-9 scroll-mt-28"
        >
          <h2 className="font-serif text-2xl text-white mb-4">
            {section.number}. {section.title}
          </h2>
          <p>{section.body}</p>
          {section.subsections?.map((sub) => (
            <div key={sub.title} className="mt-5">
              <h3 className="text-lg font-semibold text-white mb-2">{sub.title}</h3>
              <p>{sub.body}</p>
            </div>
          ))}
          {kind === "privacy" && section.number === "7" && (
            <button
              type="button"
              onClick={onPreferences}
              className="mt-5 text-primary underline py-3"
            >
              {pl ? "Zmień ustawienia cookies" : "Change cookie preferences"}
            </button>
          )}
        </section>
      ))}
      <p>
        <a href="mailto:hello@forsadesign.co.uk" className="text-primary underline">
          hello@forsadesign.co.uk
        </a>
      </p>
      <p className="mt-5">
        <a
          className="text-primary underline"
          href={`/${lang}/${kind === "terms" ? "privacy" : "terms"}/`}
        >
          {kind === "terms"
            ? pl
              ? "Polityka prywatności i cookies"
              : "Privacy and cookie notice"
            : pl
              ? "Regulamin"
              : "Terms and Conditions"}
        </a>
      </p>
    </main>
  );
}
