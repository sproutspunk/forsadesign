import React from "react";
import { aboutContent } from "../data/about";
import ProcessContent from "./ProcessContent";
export function AboutContent({ lang }: { lang: "pl" | "en" }) {
  const c = aboutContent[lang];
  return (
    <main id="main-content" className="pt-36 pb-16 container mx-auto px-6 max-w-6xl">
      <div className="max-w-4xl">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">{c.heading}</h1>
          {c.intro.map((p) => (
            <p key={p} className="text-lg text-foreground/80 leading-relaxed mb-4">
              {p}
            </p>
          ))}
        </div>
      </div>
      <section className="py-14">
        <h2 className="font-serif text-3xl text-white mb-8">{c.backgroundHeading}</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {c.background.map(([title, desc]) => (
            <article key={title}>
              <h3 className="text-xl font-serif text-white mb-3">{title}</h3>
              <p className="text-foreground/80 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <ProcessContent lang={lang} />
      <section className="py-14">
        <h2 className="font-serif text-3xl text-white mb-8">{c.differentHeading}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {c.different.map(([title, desc]) => (
            <article key={title}>
              <h3 className="text-xl font-serif text-white mb-3">{title}</h3>
              <p className="text-foreground/80 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </section>
      <a className="text-primary underline text-lg" href={`/${lang}/contact/`}>
        {c.contactCta}
      </a>
    </main>
  );
}
