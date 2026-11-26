import React from "react";
import { historyCopy, historyMilestones } from "../data/history";

export default function HistoryContent({ lang }: { lang: "en" | "pl" }) {
  const { title, description } = historyCopy[lang];
  const dateFormat = new Intl.DateTimeFormat(lang === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <main
      id="main-content"
      className="container mx-auto max-w-4xl px-6 pt-52 pb-20 md:pt-48 xl:pt-40"
    >
      <div className="w-12 h-1 bg-primary mb-8" />
      <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6">{title}</h1>
      <p className="text-xl text-foreground/70 font-light leading-relaxed mb-10">{description}</p>
      <ol className="ml-1 border-l border-primary/40 space-y-8">
        {historyMilestones.map((milestone) => (
          <li key={milestone.date} className="relative pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-1 top-2 size-2 rounded-full bg-primary"
            />
            <time dateTime={milestone.date} className="font-semibold text-primary">
              {milestone.date.length === 4
                ? milestone.date
                : dateFormat.format(new Date(milestone.date))}
            </time>
            <p className="mt-2 text-foreground/80 leading-relaxed">{milestone[lang]}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
