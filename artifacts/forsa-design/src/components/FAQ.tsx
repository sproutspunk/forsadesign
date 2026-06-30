import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search, ArrowRight } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

function slugify(index: number) {
  return `faq-${index + 1}`;
}

function getHashIndex(): number | null {
  const hash = window.location.hash.slice(1);
  if (!hash.startsWith("faq-")) return null;
  const num = parseInt(hash.replace("faq-", ""), 10);
  return !isNaN(num) && num >= 1 ? num - 1 : null;
}

export default function FAQ() {
  const { t } = useLanguage();
  const items = t("faq.items") as unknown as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(getHashIndex);
  const [query, setQuery] = useState("");

  const filtered = items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(
      ({ item }) =>
        query.trim() === "" ||
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase()),
    );

  useEffect(() => {
    const idx = getHashIndex();
    if (idx === null) return;
    const id = slugify(idx);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (idx: number) => setOpenIndex((prev) => (prev === idx ? null : idx));

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t("faq.heading")}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <p className="text-foreground/60 font-light text-lg">{t("faq.subheading")}</p>
        </div>

        <div className="relative mb-8">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("faq.searchPlaceholder")}
            className="w-full bg-card border border-border/30 rounded-md pl-10 pr-4 py-3 text-sm text-white placeholder:text-foreground/40 focus:outline-none focus:border-primary/60 transition-colors"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-foreground/50 font-light py-8">{t("faq.noResults")}</p>
        ) : (
          <div className="divide-y divide-border/20 border border-border/20 rounded-md overflow-hidden">
            {filtered.map(({ item, originalIndex }) => {
              const isOpen = openIndex === originalIndex;
              const anchorId = slugify(originalIndex);
              return (
                <div key={originalIndex} id={anchorId} className="bg-card scroll-mt-24">
                  <button
                    onClick={() => toggle(originalIndex)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-white pr-6 leading-snug text-sm md:text-base">
                      {item.q}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center text-primary transition-colors">
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="w-full h-px bg-border/20 mb-4" />
                          <p className="text-foreground/70 font-light leading-relaxed text-sm md:text-base">
                            {item.a}
                          </p>
                          <a
                            href={`#${anchorId}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const url = `${window.location.pathname}#${anchorId}`;
                              window.history.pushState(null, "", url);
                              navigator.clipboard
                                ?.writeText(window.location.origin + url)
                                .catch(() => {});
                            }}
                            className="inline-flex items-center gap-1.5 mt-4 text-xs text-foreground/30 hover:text-primary/60 transition-colors"
                          >
                            # link do pytania
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <a
            href={t("faq.comparisonHref") as string}
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors group"
          >
            {t("faq.comparisonCta") as string}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
