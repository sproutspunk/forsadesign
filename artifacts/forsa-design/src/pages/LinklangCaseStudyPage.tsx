import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Check, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import ZoomableImage from "@/components/ZoomableImage";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildHref, useJsonLd, useSeoMeta } from "@/hooks/useSeoMeta";
import {
  linklangCasePath,
  linklangCaseSchema,
  linklangCaseStudy,
  linklangProject,
  type CaseStudyLanguage,
} from "@/data/linklangCaseStudy";

export default function LinklangCaseStudyPage({ lang }: { lang: CaseStudyLanguage }) {
  const { syncLanguage } = useLanguage();
  const c = linklangCaseStudy[lang];
  useEffect(() => syncLanguage(lang), [lang, syncLanguage]);
  useSeoMeta({
    title: `${c.title} | Forsa Design`,
    description: c.description,
    ogTitle: c.title,
    ogDescription: c.description,
    twitterTitle: c.title,
    twitterDescription: c.description,
    ogLocale: lang === "en" ? "en_GB" : "pl_PL",
    canonical: buildHref(linklangCasePath(lang)),
    alternates: [
      { lang: "en", href: buildHref(linklangCasePath("en")) },
      { lang: "pl", href: buildHref(linklangCasePath("pl")) },
    ],
  });
  useJsonLd(linklangCaseSchema(lang), "linklang-case-study");

  return (
    <>
      <Header />
      <main id="main-content" className="pt-56 md:pt-48 pb-20">
        <article className="container mx-auto px-6 max-w-6xl">
          <a
            href={`/${lang}/#portfolio`}
            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary mb-10"
          >
            <ArrowLeft size={16} />
            {c.back}
          </a>
          <header className="max-w-4xl mb-12">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-5">
              {c.label}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight font-bold mb-6">
              {c.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/75 leading-relaxed max-w-3xl">
              {c.lead}
            </p>
            <a
              href={linklangProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-7 text-primary font-semibold underline underline-offset-4"
            >
              {c.visit}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </header>

          <figure className="mb-12">
            <div className="rounded-xl overflow-hidden border border-primary/25 bg-white shadow-xl">
              <div
                className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 border-b border-slate-200"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="ml-4 text-xs text-slate-600">linklang.co.uk</span>
              </div>
              <ZoomableImage
                lang={lang}
                src={c.image}
                alt={c.imageAlt}
                width={1120}
                height={420}
                fetchPriority="high"
                className="w-full h-auto"
              />
            </div>
            <figcaption className="mt-3 text-xs text-foreground/55">{c.imageCaption}</figcaption>
          </figure>

          <dl className="grid sm:grid-cols-3 gap-6 border-y border-primary/20 py-8 mb-16">
            {c.facts.map((f) => (
              <div key={f.value}>
                <dt className="text-sm text-foreground/65">{f.label}</dt>
                <dd className="font-serif font-bold text-3xl text-primary mt-2">{f.value}</dd>
              </div>
            ))}
          </dl>

          <section className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16 mb-20">
            <h2 className="font-serif text-3xl text-white leading-tight">{c.contextHeading}</h2>
            <div className="space-y-5 text-foreground/75 leading-relaxed">
              {c.context.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-20" aria-labelledby="case-scope">
            <h2 id="case-scope" className="font-serif text-3xl text-white mb-8">
              {c.scopeHeading}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {c.features.map((f) => (
                <div key={f.title} className="bg-card/80 rounded-md border border-primary/15 p-6">
                  <Check size={20} className="text-primary mb-4" aria-hidden="true" />
                  <h3 className="font-semibold text-white text-lg mb-3">{f.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-sm">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-20" aria-labelledby="case-workflow">
            <h2 id="case-workflow" className="font-serif text-3xl text-white mb-4">
              {c.workflowHeading}
            </h2>
            <p className="text-foreground/70 mb-8 max-w-3xl">{c.workflowIntro}</p>
            <ol className="grid gap-6 md:grid-cols-5">
              {c.steps.map((s, i) => (
                <li key={s.title} className="border-t border-primary/40 pt-5">
                  <span className="text-primary font-serif text-3xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-white my-3">{s.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <figure className="mb-16">
            <ZoomableImage
              lang={lang}
              src="/projects/linklang-workflow.webp"
              alt={
                lang === "pl"
                  ? "Schemat: zgłoszenie usługi, wycena administratora, akceptacja klienta, Stripe Checkout oraz karta zlecenia z wiadomościami i dokumentami"
                  : "Workflow: service request, administrator quotation, client acceptance, Stripe Checkout and an order workspace containing messages and documents"
              }
              width={1983}
              height={793}
              loading="lazy"
              className="w-full h-auto rounded-lg border border-primary/20"
            />
            <figcaption className="mt-3 text-sm text-foreground/65">
              {lang === "pl"
                ? "Uproszczony przebieg obsługi. Karta zlecenia jest dostępna również przed płatnością. Kliknij, aby powiększyć grafikę na tej stronie."
                : "A simplified service journey. The order workspace is also available before payment. Select the graphic to zoom in on this page."}
            </figcaption>
          </figure>

          <section className="mb-20" aria-labelledby="case-decisions">
            <h2 id="case-decisions" className="font-serif text-3xl text-white mb-8">
              {c.decisionsHeading}
            </h2>
            <div className="divide-y divide-primary/15">
              {c.decisions.map((d) => (
                <div key={d.title} className="grid md:grid-cols-[1fr_1.4fr] gap-4 md:gap-16 py-7">
                  <h3 className="text-xl text-white font-semibold">{d.title}</h3>
                  <p className="text-foreground/75 leading-relaxed">{d.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card/80 border border-primary/20 p-7 md:p-10 rounded-lg mb-16">
            <h2 className="font-serif text-3xl text-white mb-5">{c.stackHeading}</h2>
            <p className="text-foreground/75 leading-relaxed max-w-3xl">{c.stackIntro}</p>
            <ul className="flex flex-wrap gap-2 mt-6">
              {linklangProject.technologies.map((t) => (
                <li
                  key={t}
                  className="text-sm text-primary border border-primary/25 rounded-full px-3 py-1"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-3xl mb-16">
            <h2 className="font-serif text-3xl text-white mb-5">{c.outcomeHeading}</h2>
            <p className="text-foreground/75 leading-relaxed mb-6">{c.outcome}</p>
            <p className="text-sm text-foreground/55 leading-relaxed border-l-2 border-primary/30 pl-5">
              {c.evidence}
            </p>
          </section>

          <aside className="border-t border-primary/25 pt-10">
            <h2 className="font-serif text-3xl text-white mb-4">{c.ctaTitle}</h2>
            <p className="text-foreground/70 leading-relaxed max-w-2xl mb-7">{c.ctaBody}</p>
            <a
              href={`/${lang}/contact/`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-sm"
            >
              {c.cta}
              <ChevronRight size={18} aria-hidden="true" />
            </a>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
