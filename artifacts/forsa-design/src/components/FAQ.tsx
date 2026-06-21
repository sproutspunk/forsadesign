import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Link, ArrowRight } from "lucide-react";

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

  function handleAnchorClick(e: React.MouseEvent, anchorId: string) {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.pathname}#${anchorId}`;
    window.history.pushState(null, "", url);
    navigator.clipboard?.writeText(window.location.origin + url).catch(() => {});
  }

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
          <div className="space-y-3">
            {filtered.map(({ item, originalIndex }) => {
              const isOpen = openIndex === originalIndex;
              const anchorId = slugify(originalIndex);
              return (
                <motion.div
                  key={originalIndex}
                  id={anchorId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: originalIndex * 0.05 }}
                  className="border border-border/30 rounded-md overflow-hidden bg-card scroll-mt-24"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : originalIndex)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-card/80 transition-colors group"
                  >
                    <span className="font-medium text-white pr-4 leading-snug">{item.q}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`#${anchorId}`}
                        onClick={(e) => handleAnchorClick(e, anchorId)}
                        className="text-foreground/30 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Copy link to this question"
                        title="Copy link"
                      >
                        <Link size={14} />
                      </a>
                      <span
                        className={`text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ChevronDown size={20} />
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0">
                          <div className="w-full h-px bg-border/20 mb-4" />
                          <p className="text-foreground/70 font-light leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
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
