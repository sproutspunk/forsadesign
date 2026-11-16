import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { linklangCasePath, linklangCaseStudy } from "@/data/linklangCaseStudy";

import { dachCase, dachImage, dachPath } from "@/data/dachCaseStudy";

export default function Portfolio() {
  const { language } = useLanguage();
  const c = linklangCaseStudy[language];
  return (
    <section id="portfolio" className="py-24 border-t border-border/10 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-2xl mb-10">
          <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase mb-3">
            Portfolio
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
            {language === "pl" ? "Projekty w praktyce" : "Projects in practice"}
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            {language === "pl"
              ? "Strony i narzędzia połączone z rzeczywistym procesem obsługi klienta."
              : "Websites and tools built around real customer workflows."}
          </p>
        </div>
        <a
          href={dachPath(language)}
          className="grid md:grid-cols-[1.2fr_1fr] overflow-hidden rounded-lg border border-primary/20 bg-card/80 mb-6 hover:border-primary/60 transition-colors"
        >
          <img
            src={dachImage}
            alt={dachCase[language].title}
            width={1440}
            height={1000}
            loading="lazy"
            className="w-full h-auto"
          />
          <div className="p-7 md:p-10 self-center">
            <p className="text-primary text-xs uppercase tracking-widest mb-3">
              {dachCase[language].status}
            </p>
            <h3 className="font-serif text-3xl text-white mb-4">{dachCase[language].title}</h3>
            <p className="text-foreground/70 mb-6">{dachCase[language].intro}</p>
            <span className="text-primary font-semibold">{c.readCase} ↗</span>
          </div>
        </a>
        <a
          href={linklangCasePath(language)}
          className="group grid md:grid-cols-[1.2fr_1fr] overflow-hidden rounded-lg border border-primary/20 bg-card/80 hover:border-primary/60 transition-colors"
        >
          <div className="bg-slate-100 flex items-center p-4 md:p-7">
            <img
              src={c.image}
              alt={c.imageAlt}
              width={1120}
              height={420}
              loading="lazy"
              className="w-full h-auto rounded-md border border-slate-200"
            />
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-center">
            <p className="text-primary text-xs tracking-widest uppercase mb-3">{c.label}</p>
            <h3 className="font-serif text-3xl font-bold text-white mb-4">{c.cardTitle}</h3>
            <p className="text-foreground/70 leading-relaxed mb-6">{c.cardText}</p>
            <span className="inline-flex items-center gap-2 text-primary font-semibold">
              {c.readCase}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
