import React from "react";
import { processCopy } from "../data/process";

export default function ProcessContent({ lang }: { lang: "pl" | "en" }) {
  const content = processCopy[lang];
  const support = content.steps[4];
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="py-16 md:py-20 bg-card scroll-mt-28"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 text-center">
          <h2
            id="process-heading"
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {content.heading}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {content.steps.slice(0, 4).map((step, index) => (
            <li key={step.title} className="rounded-lg border border-border bg-background/60 p-6">
              <span
                aria-hidden="true"
                className="flex items-center justify-center w-10 h-10 mb-5 rounded-full border border-primary text-primary font-medium"
              >
                {index + 1}
              </span>
              <h3 className="font-serif text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-base text-foreground/80 leading-relaxed">{step.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-lg border border-primary/30 bg-background/60 p-6 md:flex md:items-start md:gap-8">
          <h3 className="font-serif text-xl font-bold text-white mb-3 md:mb-0 md:w-56 md:shrink-0">
            {support.title}
          </h3>
          <p className="text-base text-foreground/80 leading-relaxed">{support.desc}</p>
        </div>
      </div>
    </section>
  );
}
