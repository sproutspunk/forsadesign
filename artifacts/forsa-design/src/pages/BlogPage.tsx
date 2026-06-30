import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { articlesMeta } from "@/data/articlesMeta";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface BlogPageProps {
  lang: "en" | "pl";
}

const meta = {
  en: {
    title: "Blog | Forsa Design",
    desc: "Expert insights on web design, SEO, e-commerce, and digital strategy from the Forsa Design team.",
    heading: "Blog",
    subheading: "Expert insights on web design, SEO, and digital strategy.",
    readMore: "Read article",
    minRead: "min read",
  },
  pl: {
    title: "Blog | Forsa Design",
    desc: "Wiedza ekspercka o web designie, SEO, e-commerce i strategii cyfrowej od zespołu Forsa Design.",
    heading: "Blog",
    subheading: "Wiedza ekspercka o web designie, SEO i strategii cyfrowej.",
    readMore: "Czytaj artykuł",
    minRead: "min czytania",
  },
};

function formatDate(iso: string, lang: "en" | "pl") {
  const date = new Date(iso);
  return date.toLocaleDateString(lang === "pl" ? "pl-PL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage({ lang }: BlogPageProps) {
  const { syncLanguage } = useLanguage();
  const m = meta[lang];

  const sortedArticles = [...articlesMeta].sort((a, b) => b.dateIso.localeCompare(a.dateIso));

  useEffect(() => {
    syncLanguage(lang);
  }, [lang, syncLanguage]);

  useSeoMeta({
    title: m.title,
    description: m.desc,
    ogTitle: m.title,
    ogDescription: m.desc,
    twitterTitle: m.title,
    twitterDescription: m.desc,
    ogLocale: lang === "en" ? "en_US" : "pl_PL",
    canonical: buildHref(`/${lang}/blog`),
    alternates: [
      { lang: "en", href: buildHref("/en/blog") },
      { lang: "pl", href: buildHref("/pl/blog") },
    ],
  });

  useJsonLd(
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Forsa Design Blog",
      description: m.desc,
      url: buildHref(`/${lang}/blog`),
      inLanguage: lang === "en" ? "en-GB" : "pl-PL",
      publisher: {
        "@type": "Organization",
        name: "Forsa Design",
        url: "https://forsadesign.co.uk",
        logo: {
          "@type": "ImageObject",
          url: "https://forsadesign.co.uk/logo.png",
        },
      },
      blogPost: sortedArticles.map((article) => {
        const a = article[lang];
        const slug = lang === "en" ? article.slugEn : article.slugPl;
        return {
          "@type": "BlogPosting",
          headline: a.title,
          description: a.excerpt,
          datePublished: article.dateIso,
          url: buildHref(`/${lang}/blog/${slug}`),
          author: {
            "@type": "Person",
            name: "Miro",
            worksFor: {
              "@type": "Organization",
              name: "Forsa Design",
            },
          },
        };
      }),
    },
    "blog-page",
  );

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-card border-b border-border/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-1 bg-primary mb-8" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              {m.heading}
            </h1>
            <p className="text-lg text-foreground/60 font-light">{m.subheading}</p>
          </motion.div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {sortedArticles.map((article, i) => {
              const a = article[lang];
              const slug = lang === "en" ? article.slugEn : article.slugPl;
              return (
                <motion.article
                  key={article.slugEn}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="group bg-card border border-border/20 rounded-md p-8 hover:border-primary/30 transition-colors"
                >
                  <a href={`/${lang}/blog/${slug}`} className="block">
                    <div className="flex items-center gap-4 text-xs text-foreground/40 font-light mb-4">
                      <span>{formatDate(article.dateIso, lang)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readingTimeMin} {m.minRead}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                      {a.title}
                    </h2>

                    <p className="text-foreground/60 font-light leading-relaxed mb-6">
                      {a.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      {m.readMore}
                      <ArrowRight size={16} />
                    </span>
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
