import React from "react";
import { carbonCopy, results } from "../data/websiteCarbon";
const sourceLink =
  "inline-flex min-h-11 items-center rounded border border-primary/30 px-3 py-2 text-sm font-medium text-primary underline-offset-4 hover:border-primary/70 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2";

export default function CarbonReport({ lang }: { lang: "pl" | "en" }) {
  const c = carbonCopy[lang];
  const number = (value: string) => (lang === "pl" ? value.replace(".", ",") : value);

  return (
    <article className="container mx-auto max-w-3xl space-y-5 px-6">
      <a href={`/${lang}/#website-emissions`} className={sourceLink}>
        Portfolio
      </a>
      <h1 className="font-serif text-4xl font-bold">{c.title}</h1>
      <p>{c.intro}</p>
      <p>{c.value}</p>
      <p className="text-primary">
        1ClickImpact · <time dateTime="2026-11-27">{c.testDate}</time>
      </p>
      <div className="space-y-6 pt-4">
        {results.map((result) => (
          <section key={result.domain} aria-label={`${result.name}: ${c.sourceLabel}`}>
            <h2 className="text-base font-semibold text-white">{result.name}</h2>
            <p className="mb-3 break-all text-sm text-foreground/80">{result.domain}</p>
            <dl className="space-y-2 text-sm leading-relaxed">
              {[
                [c.rating, result.rating],
                [c.carbon, `${number(result.carbon)} g CO₂e`],
                [c.transfer, `${number(result.transfer)} KB`],
                [c.energy, `${number(result.energy)} Wh`],
                [c.hosting, c.green],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-primary/10 pb-2"
                >
                  <dt className="text-foreground/80">{label}</dt>
                  <dd className="text-right font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={result.report}
                target="_blank"
                rel="noopener noreferrer"
                className={sourceLink}
                aria-label={`${result.name}: ${c.report}`}
              >
                {c.report}
              </a>
              <a
                href={result.pdf}
                download
                className={sourceLink}
                aria-label={`${result.name}: ${c.pdf}`}
              >
                {c.pdf}
              </a>
            </div>
          </section>
        ))}

        <div className="space-y-3 border-t border-primary/15 pt-4 text-sm leading-relaxed text-foreground/80">
          <p>{c.hostingNote}</p>
          <p>{c.scope}</p>
        </div>

        <section className="space-y-3 border-t border-primary/15 pt-4">
          <h2 className="text-base font-semibold text-white">{c.contextTitle}</h2>
          <p className="text-base leading-relaxed text-foreground/80">{c.context}</p>
          <div className="flex flex-col items-start gap-2">
            <a
              href="https://www.gov.uk/service-manual/design/environmentally-sustainable-services"
              target="_blank"
              rel="noopener noreferrer"
              className={sourceLink}
            >
              {c.government}
            </a>
            <a
              href="https://design.scotentblog.co.uk/reducing-carbon-emissions-from-our-websites/"
              target="_blank"
              rel="noopener noreferrer"
              className={sourceLink}
            >
              {c.enterprise}
            </a>
          </div>
        </section>
      </div>
    </article>
  );
}
