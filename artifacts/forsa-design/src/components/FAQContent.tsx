import React, { useEffect, useState } from "react";
import { faqCategories, getFaqItems, type FaqCategory } from "../data/faq";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .trim();

export default function FAQContent({
  lang,
  onExpand,
}: {
  lang: "pl" | "en";
  onExpand?: (question: string) => void;
}) {
  const pl = lang === "pl";
  const items = getFaqItems(lang);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    const followHash = () => {
      const id = window.location.hash.slice(1);
      if (!getFaqItems(lang).some((item) => item.id === id)) return;
      setQuery("");
      setCategory("all");
      setOpen(id);
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
    };
    followHash();
    window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, [lang]);
  const filtered = items.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      normalize(`${item.q} ${item.a}`).includes(normalize(query)),
  );
  const focus =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";
  return (
    <section id="faq" className="py-24 bg-background scroll-mt-24" aria-labelledby="faq-heading">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-10 text-center">
          <h2
            id="faq-heading"
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-5"
          >
            {pl
              ? "Tworzenie stron internetowych i systemów B2B: pytania o koszty, realizację i utrzymanie"
              : "Website development and B2B systems: costs, delivery and ongoing support"}
          </h2>
          <p className="text-foreground/80 text-lg">
            {pl
              ? "Zakres, koszty, realizacja i opieka po wdrożeniu. Wybierz temat lub wyszukaj pytanie."
              : "Scope, costs, delivery and support after launch. Choose a topic or search for a question."}
          </p>
        </div>
        <label htmlFor="faq-search" className="block text-white mb-2">
          {pl ? "Szukaj w FAQ" : "Search the FAQ"}
        </label>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={pl ? "Np. płatności, SEO, logo…" : "E.g. payments, SEO, logo…"}
          className={`w-full bg-card border border-border rounded-md px-4 py-3 text-base text-white mb-5 ${focus}`}
        />
        <div aria-label={pl ? "Tematy FAQ" : "FAQ topics"} className="flex flex-wrap gap-2 mb-8">
          {[{ id: "all" as const, pl: "Wszystkie", en: "All topics" }, ...faqCategories].map(
            (group) => (
              <button
                key={group.id}
                type="button"
                aria-pressed={category === group.id}
                onClick={() => setCategory(group.id)}
                className={`rounded-md border px-3 py-2 text-base ${focus} ${category === group.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground hover:border-primary"}`}
              >
                {group[lang]}
              </button>
            ),
          )}
        </div>
        <p role="status" className="sr-only">
          {pl ? "Liczba wyników" : "Results"}: {filtered.length}
        </p>
        {filtered.length === 0 && (
          <div className="py-8 text-foreground">
            <p>{pl ? "Brak odpowiedzi dla tego wyszukiwania." : "No answers match this search."}</p>
            <button
              type="button"
              className={`mt-3 underline text-primary ${focus}`}
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
            >
              {pl ? "Pokaż wszystkie pytania" : "Show all questions"}
            </button>
          </div>
        )}
        {faqCategories.map((group) => {
          const entries = filtered.filter((item) => item.category === group.id);
          if (!entries.length) return null;
          return (
            <div key={group.id} className="mb-10">
              <h3 className="font-serif text-2xl text-white mb-4">{group[lang]}</h3>
              <div className="border border-border rounded-md divide-y divide-border">
                {entries.map((item) => (
                  <div id={item.id} key={item.id} className="bg-card scroll-mt-28">
                    <h4>
                      <button
                        id={`${item.id}-button`}
                        type="button"
                        aria-expanded={open === item.id}
                        aria-controls={`${item.id}-answer`}
                        onClick={() => {
                          const next = open === item.id ? null : item.id;
                          setOpen(next);
                          if (next) onExpand?.(item.q);
                        }}
                        className={`w-full flex items-center justify-between gap-5 px-5 py-5 text-left text-base md:text-lg font-medium text-white hover:bg-white/5 ${focus}`}
                      >
                        <span>{item.q}</span>
                        <span aria-hidden="true" className="text-primary text-2xl shrink-0">
                          {open === item.id ? "−" : "+"}
                        </span>
                      </button>
                    </h4>
                    <div
                      id={`${item.id}-answer`}
                      aria-labelledby={`${item.id}-button`}
                      hidden={open !== item.id}
                      className="px-5 pb-6"
                    >
                      <p className="text-foreground/80 text-base leading-relaxed">{item.a}</p>
                      <a
                        href={`#${item.id}`}
                        className={`inline-block mt-4 text-primary underline text-sm ${focus}`}
                      >
                        {pl ? "Link do pytania" : "Link to this question"}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="mt-10 text-center text-foreground/80">
          <p>
            {pl
              ? "Nie znalazłeś odpowiedzi dotyczącej swojego projektu?"
              : "Still have a question about your project?"}
          </p>
          <a
            href={`/${lang}/contact/`}
            className={`inline-block mt-3 text-primary underline ${focus}`}
          >
            {pl ? "Porozmawiajmy o zakresie" : "Let’s discuss the scope"}
          </a>
        </div>
      </div>
    </section>
  );
}
