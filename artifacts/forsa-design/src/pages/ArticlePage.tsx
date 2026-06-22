import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug } from "@/data/articlesData";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";

interface ArticlePageProps {
  lang: "en" | "pl";
  slug: string;
}

const ui = {
  en: {
    backToBlog: "Back to blog",
    minRead: "min read",
    notFound: "Article not found.",
    notFoundLink: "View all articles",
    by: "by",
    author: "Miro  |  Forsa Design",
  },
  pl: {
    backToBlog: "Powrót do bloga",
    minRead: "min czytania",
    notFound: "Artykuł nie został znaleziony.",
    notFoundLink: "Zobacz wszystkie artykuły",
    by: "przez",
    author: "Miro  |  Forsa Design",
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

export default function ArticlePage({ lang, slug }: ArticlePageProps) {
  const { syncLanguage } = useLanguage();
  const article = getArticleBySlug(slug);
  const u = ui[lang];

  useEffect(() => {
    syncLanguage(lang);
  }, [lang, syncLanguage]);

  const a = article ? article[lang] : null;
  const canonicalSlug = article ? (lang === "en" ? article.slugEn : article.slugPl) : slug;

  useSeoMeta({
    title: a ? `${a.title} | Forsa Design` : "Article Not Found | Forsa Design",
    description: a ? a.excerpt : "The requested article could not be found.",
    ogTitle: a ? `${a.title} | Forsa Design` : "Article Not Found | Forsa Design",
    ogDescription: a ? a.excerpt : "The requested article could not be found.",
    twitterTitle: a ? `${a.title} | Forsa Design` : "Article Not Found | Forsa Design",
    twitterDescription: a ? a.excerpt : "The requested article could not be found.",
    ogLocale: lang === "en" ? "en_US" : "pl_PL",
    canonical: a ? buildHref(`/${lang}/blog/${canonicalSlug}`) : buildHref(`/${lang}/blog`),
    alternates: article
      ? [
          { lang: "en", href: buildHref(`/en/blog/${article.slugEn}`) },
          { lang: "pl", href: buildHref(`/pl/blog/${article.slugPl}`) },
        ]
      : undefined,
  });

  useJsonLd(
    a && article
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.title,
          description: a.excerpt,
          datePublished: article.dateIso,
          dateModified: article.dateIso,
          inLanguage: lang === "en" ? "en-GB" : "pl-PL",
          url: buildHref(`/${lang}/blog/${canonicalSlug}`),
          author: {
            "@type": "Person",
            name: "Miro",
            worksFor: {
              "@type": "Organization",
              name: "Forsa Design",
              url: "https://forsadesign.co.uk",
            },
          },
          publisher: {
            "@type": "Organization",
            name: "Forsa Design",
            url: "https://forsadesign.co.uk",
            logo: {
              "@type": "ImageObject",
              url: "https://forsadesign.co.uk/logo.png",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": buildHref(`/${lang}/blog/${canonicalSlug}`),
          },
        }
      : null,
    "article-page",
  );

  if (!article || !a) {
    return (
      <div className="min-h-[100dvh] bg-background text-foreground">
        <Header />
        <div className="container mx-auto px-6 py-40 text-center">
          <p className="text-foreground/60 mb-6">{u.notFound}</p>
          <a
            href={`/${lang}/blog`}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            {u.notFoundLink}
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />

      <article className="pt-36 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <a
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft size={16} />
            {u.backToBlog}
          </a>

          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 text-xs text-foreground/40 font-light mb-6">
              <span>{formatDate(article.dateIso, lang)}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {article.readingTimeMin} {u.minRead}
              </span>
              <span>·</span>
              <span>
                {u.by} {u.author}
              </span>
            </div>

            <div className="w-12 h-1 bg-primary mb-6" />

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {a.title}
            </h1>
          </motion.header>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {a.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-white mb-3">
                    {section.heading}
                  </h2>
                )}
                <p className="text-foreground/75 font-light leading-relaxed">{section.body}</p>
              </div>
            ))}
          </motion.div>

          <div className="mt-16 pt-8 border-t border-border/20">
            <p className="text-xs text-foreground/40 font-light">
              {u.by.charAt(0).toUpperCase() + u.by.slice(1)}:{" "}
              <span className="text-foreground/60">{u.author}</span> | hello@forsadesign.co.uk
            </p>
          </div>

          <div className="mt-8">
            <a
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={16} />
              {u.backToBlog}
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
