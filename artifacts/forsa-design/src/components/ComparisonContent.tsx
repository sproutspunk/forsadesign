import React from "react";
import { comparisonContent } from "../data/comparison";
export function ComparisonContent({ lang }: { lang: "pl" | "en" }) {
  const c = comparisonContent[lang];
  return (
    <main id="main-content" className="pt-36 pb-16 container mx-auto px-6 max-w-6xl">
      <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">{c.heading}</h1>
      <p className="text-lg text-foreground/80 leading-relaxed mb-10">{c.intro}</p>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {c.optionCards.map((card) => (
          <article
            key={card.name}
            className={`rounded-lg border p-6 bg-card ${card.highlight ? "border-primary" : "border-border"}`}
          >
            <h2 className="font-serif text-2xl text-white mb-3">{card.name}</h2>
            <p className="text-foreground/80 mb-4">{card.tagline}</p>
            <h3 className="text-primary mb-3">{c.pros}</h3>
            <ul className="list-disc pl-5 text-foreground/80 space-y-3">
              {card.pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            {card.cons.length > 0 && (
              <>
                <h3 className="text-primary mt-5 mb-3">{c.cons}</h3>
                <ul className="list-disc pl-5 text-foreground/80 space-y-3">
                  {card.cons.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </>
            )}
          </article>
        ))}
      </div>
      <section className="py-10">
        <h2 className="font-serif text-2xl text-white mb-4">{c.cardNoteHeading}</h2>
        {c.cardNotes.map((p) => (
          <p key={p} className="text-foreground/80 leading-relaxed mb-3">
            {p}
          </p>
        ))}
      </section>
      <h2 className="font-serif text-3xl text-white mb-4">{c.tableHeading}</h2>
      <p className="text-foreground/80 mb-5">{c.tableSub}</p>
      <div
        className="overflow-x-auto rounded-lg border border-border"
        role="region"
        aria-label={c.tableHeading}
        tabIndex={0}
      >
        <table className="w-full min-w-[760px] text-left text-base">
          <thead>
            <tr>
              {c.tableHeaders.map((h) => (
                <th key={h} scope="col" className="p-4 text-white bg-card">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.tableRows.map((row) => (
              <tr key={row[0]} className="border-t border-border">
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="p-4 text-white">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="p-4 text-foreground/80">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <a href={`/${lang}/contact/`} className="inline-block mt-10 text-primary underline text-lg">
        {c.ctaButton}
      </a>
    </main>
  );
}
