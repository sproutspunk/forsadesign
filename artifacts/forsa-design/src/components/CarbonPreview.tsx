import React from "react";
import { carbonCopy, results } from "../data/websiteCarbon";
export default function CarbonPreview({ lang }: { lang: "pl" | "en" }) {
  const c = carbonCopy[lang];
  const number = (value: string) => (lang === "pl" ? value.replace(".", ",") : value);

  return (
    <div className="relative isolate h-[220px] shrink-0 overflow-hidden border-b border-primary/15 bg-[#151d21]">
      <svg
        viewBox="0 0 480 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-primary/10"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M0 44H480M0 88H480M0 132H480M0 176H480M48 0V220M96 0V220M144 0V220M192 0V220M240 0V220M288 0V220M336 0V220M384 0V220M432 0V220" />
      </svg>
      <dl className="relative grid h-full grid-cols-2 items-center divide-x divide-primary/20 px-3 sm:px-6">
        {results.map((result) => (
          <div key={result.domain} className="min-w-0 px-1 text-center sm:px-3">
            <dt className="min-h-10 text-sm font-medium leading-5 text-white">{result.name}</dt>
            <dd className="flex flex-col items-center gap-1">
              <span className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-primary/50 bg-background px-2 font-serif text-2xl font-bold text-primary">
                <span className="sr-only">{c.rating}: </span>
                {result.rating}
              </span>
              <span className="mt-1 block font-serif text-[2rem] font-bold leading-none tracking-tight text-primary sm:text-4xl">
                {number(result.carbon)}
              </span>
              <span className="mt-1 text-sm leading-5 text-foreground/80">
                <span className="block">g CO₂e</span>
                <span className="block">{c.perView}</span>
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
