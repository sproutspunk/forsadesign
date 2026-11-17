import React from "react";
import { dueDiligence, dueDiligencePath } from "../data/dueDiligence";

export function DueDiligenceCard({ lang }: { lang: "pl" | "en" }) {
  const c = dueDiligence[lang];
  return (
    <aside className="mt-12 rounded-md border border-primary/30 bg-card p-8 md:p-10">
      <p className="text-primary text-sm mb-3">Commercial Due Diligence</p>
      <h3 className="font-serif text-2xl md:text-3xl text-white mb-4">{c.title}</h3>
      <p className="text-foreground/75 leading-relaxed mb-6">{c.opening[1]}</p>
      <a
        className="inline-block text-primary underline underline-offset-4 py-2"
        href={dueDiligencePath(lang)}
      >
        {lang === "pl" ? "Poznaj zakres analizy kontrahenta" : "Explore counterparty assessment"} →
      </a>
    </aside>
  );
}

export default function DueDiligenceContent({ lang }: { lang: "pl" | "en" }) {
  const c = dueDiligence[lang];
  const heading = "font-serif text-3xl md:text-4xl text-white mb-7";
  const paragraph = "text-foreground/75 leading-relaxed mb-5";
  const list = (items: string[]) => (
    <ul className="list-disc pl-5 space-y-3 text-foreground/75 leading-relaxed marker:text-primary">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
  const contact = (
    <a
      href={`/${lang}/contact/`}
      className="inline-block rounded-sm bg-primary px-6 py-4 font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      {c.cta} →
    </a>
  );
  return (
    <article className="container mx-auto px-6 max-w-6xl">
      <header className="max-w-4xl mb-16">
        <a href={`/${lang}/services/`} className="inline-block text-primary mb-8 py-2">
          ← {lang === "pl" ? "Usługi" : "Services"}
        </a>
        <p className="text-primary text-sm tracking-wide mb-5">{c.subtitle}</p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
          {c.title}
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8">{c.intro}</p>
        {c.opening.map((p) => (
          <p key={p} className={paragraph}>
            {p}
          </p>
        ))}
        <div className="mt-8">{contact}</div>
      </header>
      <section className="mb-20" aria-labelledby="due-diligence-scope">
        <h2 id="due-diligence-scope" className={heading}>
          {c.scopeTitle}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {c.scope.map(([title, items], i) => (
            <section
              key={title}
              className="rounded-md bg-card border-t-4 border-primary p-7 md:p-8"
            >
              <p className="text-primary text-sm mb-4" aria-hidden="true">
                0{i + 1}
              </p>
              <h3 className="font-serif text-2xl text-white mb-6">{title}</h3>
              {list(items)}
            </section>
          ))}
        </div>
      </section>
      <section className="mb-20" aria-labelledby="due-diligence-process">
        <h2 id="due-diligence-process" className={heading}>
          {c.processTitle}
        </h2>
        <ol className="grid md:grid-cols-2 gap-8">
          {c.steps.map(([title, body], i) => (
            <li key={title} className="border-l-2 border-primary/50 pl-6">
              <p className="text-primary text-sm mb-3">
                {lang === "pl" ? "Etap" : "Step"} {i + 1}
              </p>
              <h3 className="font-serif text-2xl text-white mb-4">{title}</h3>
              <p className={paragraph}>{body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="mb-20 bg-card border border-primary/25 rounded-md p-7 md:p-10"
        aria-labelledby="due-diligence-report"
      >
        <h2 id="due-diligence-report" className={heading}>
          {c.reportTitle}
        </h2>
        <p className={paragraph}>{c.reportIntro}</p>
        {list(c.report)}
        <p className="mt-8 border-l-2 border-primary pl-5 text-foreground/90 leading-relaxed">
          {c.reportNote}
        </p>
      </section>
      <section className="mb-20 max-w-4xl">
        <h2 className={heading}>{c.audienceTitle}</h2>
        {list(c.audience)}
      </section>
      <section className="mb-20 max-w-4xl">
        <h2 className={heading}>{c.whyTitle}</h2>
        {c.why.map((p) => (
          <p key={p} className={paragraph}>
            {p}
          </p>
        ))}
      </section>
      <section className="mb-12 border-t border-primary/30 pt-12 max-w-4xl">
        <h2 className={heading}>{c.ctaTitle}</h2>
        {c.closing.map((p) => (
          <p key={p} className={paragraph}>
            {p}
          </p>
        ))}
        <div className="mt-8">{contact}</div>
        <p className="text-primary text-sm mt-8">
          Forsa Design | Commercial Due Diligence &amp; Business Risk Assessment
        </p>
      </section>
      <p className="border-t border-border pt-8 text-sm text-foreground/60 leading-relaxed max-w-4xl">
        {c.disclaimer}
      </p>
    </article>
  );
}
