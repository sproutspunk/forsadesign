import React from "react";
import DachColourRationale from "./DachColourRationale";
import ZoomableImage from "./ZoomableImage";
import { dachCase, dachImage } from "../data/dachCaseStudy";
export default function DachCaseContent({ lang }: { lang: "pl" | "en" }) {
  const c = dachCase[lang];
  return (
    <React.Fragment>
      <article className="container mx-auto px-6 max-w-6xl">
        <a href={`/${lang}/#portfolio`} className="text-primary inline-block mb-8">
          ← {c.back}
        </a>
        <header className="max-w-4xl mb-10">
          <p className="text-primary text-xs uppercase tracking-widest mb-4">{c.status}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {c.title}
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">{c.intro}</p>
        </header>
        <figure className="mb-16">
          <ZoomableImage
            lang={lang}
            src={dachImage}
            alt={
              lang === "pl"
                ? "Garaż z dwiema bramami obok panelu wyboru bryły i dachu w rosyjskiej wersji konfiguratora Dach Systema"
                : "A garage with two doors beside the footprint and roof controls in the Russian-language Dach Systema configurator"
            }
            width={1440}
            height={1000}
            className="w-full h-auto rounded-lg border border-primary/25"
            fetchPriority="high"
          />
          <figcaption className="text-xs text-foreground/55 mt-3">{c.caption}</figcaption>
        </figure>
        <DachColourRationale lang={lang} />
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-white mb-8">{c.scope}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {c.features.map(([title, body]) => (
              <div key={title} className="p-7 bg-card border border-primary/20 rounded-lg">
                <h3 className="text-xl text-white mb-3">{title}</h3>
                <p className="text-foreground/75 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>
        {[
          { title: c.decisions, body: [c.pricing, c.enquiry] },
          { title: c.technology, body: [c.tech, c.limits] },
          { title: c.result, body: [c.outcome] },
        ].map((s) => (
          <section key={s.title} className="max-w-3xl mb-14">
            <h2 className="font-serif text-3xl text-white mb-5">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p} className="text-foreground/75 leading-relaxed mb-5">
                {p}
              </p>
            ))}
          </section>
        ))}
        <p className="text-sm text-foreground/55 border-l-2 border-primary/30 pl-5 mb-10 max-w-3xl">
          {c.note}
        </p>
        <a
          href={`/${lang}/contact/`}
          className="inline-block bg-primary text-primary-foreground px-6 py-3 font-semibold rounded-sm"
        >
          {c.cta}
        </a>
      </article>
    </React.Fragment>
  );
}
