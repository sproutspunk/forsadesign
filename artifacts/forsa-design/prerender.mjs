import {
  ServicesContent,
  AboutContent,
  ComparisonContent,
} from "./src/components/MarketingContent.tsx";
import FooterContent from "./src/components/FooterContent.tsx";
import LegalContent from "./src/components/LegalContent.tsx";
import { siteCopy } from "./src/data/siteCopy.ts";
import { aboutContent } from "./src/data/about.ts";
import { comparisonContent } from "./src/data/comparison.ts";
import ProcessContent from "./src/components/ProcessContent.tsx";
import FAQContent from "./src/components/FAQContent.tsx";
import LinklangBrandingProof from "./src/components/LinklangBrandingProof.tsx";
import DueDiligenceContent from "./src/components/DueDiligenceContent.tsx";
import { dueDiligence, dueDiligencePath, dueDiligenceSchema } from "./src/data/dueDiligence.ts";
import PortfolioContent from "./src/components/PortfolioContent.tsx";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import DachCaseContent from "./src/components/DachCaseContent.tsx";
import { dachCase, dachPath, dachSchema } from "./src/data/dachCaseStudy.ts";
/**
 * Build-time prerender script.
 *
 * Runs after `vite build` and writes a route-specific index.html for each
 * public URL so that social crawlers and non-JS agents receive the correct
 * <title>, meta description, Open Graph tags, Twitter tags, canonical, and
 * hreflang alternates  -  AND the full visible page body  -  without needing to
 * execute JavaScript.
 *
 * Each generated file is written to dist/public/<route>/index.html so that
 * static file servers (Vite preview, CDN, nginx) serve it directly when
 * the path is requested.
 *
 * Body injection strategy:
 *   Static HTML is injected into <div id="root"> before the React bundle
 *   loads. When JavaScript runs, React's createRoot().render() replaces the
 *   static content with the hydrated tree  -  so users see the full interactive
 *   app, while AI crawlers and non-JS agents see the full page copy in the
 *   initial HTML response.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { articles } from "./src/data/articlesData.ts";
import {
  linklangCaseStudy,
  linklangCasePath,
  linklangCaseSchema,
  linklangProject,
} from "./src/data/linklangCaseStudy.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "..", "dist/public");
const SITE = "https://forsadesign.co.uk";

/** Encode plain text for safe insertion into an HTML attribute value. */
function he(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * Encode plain text for safe insertion between HTML tags.
 * Escapes &, <, and > so the text cannot break tag structure.
 */
function ht(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Render an array of legal-page sections as plain HTML.
 * Each section has: number, title, body, subsections[].
 */
/**
 * Patch the <head> of an HTML string with route-specific metadata, and inject
 * full static body HTML into <div id="root"> for crawler visibility.
 *
 * @param {string} html       - Source HTML (the built index.html).
 * @param {object} meta       - Route metadata to inject.
 * @returns {string}          - Patched HTML string.
 */
function patch(html, meta) {
  let out = html;
  if (meta.schema) {
    const schema = JSON.stringify(meta.schema).replace(/</g, "\\u003c");
    out = out.replace(
      /(\s*<\/head>)/,
      `\n    <script type="application/ld+json" data-json-ld-id="linklang-case-study">${schema}</script>$1`,
    );
  }

  // <html lang="...">
  out = out.replace(/(<html\b[^>]*\blang=")[^"]*(")/s, `$1${meta.lang}$2`);

  // <title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${ht(meta.title)}</title>`);

  // <meta name="description" content="...">
  out = out.replace(/(name="description"\s+content=")[^"]*(")/s, `$1${he(meta.desc)}$2`);

  // <meta property="og:title" content="...">
  out = out.replace(/(property="og:title"\s+content=")[^"]*(")/s, `$1${he(meta.ogTitle)}$2`);

  // <meta property="og:description" content="...">
  out = out.replace(/(property="og:description"\s+content=")[^"]*(")/s, `$1${he(meta.desc)}$2`);

  // <meta property="og:locale" content="...">
  out = out.replace(/(property="og:locale"\s+content=")[^"]*(")/s, `$1${meta.locale}$2`);

  // <meta property="og:type" content="...">  -  articles get og:type "article"
  out = out.replace(
    /(property="og:type"\s+content=")[^"]*(")/s,
    `$1${meta.isArticle ? "article" : "website"}$2`,
  );

  // Article-specific Open Graph metadata (published/modified time, author)
  if (meta.isArticle && meta.lastmod) {
    const articleMetas = [
      `<meta property="article:published_time" content="${meta.publishedAt ?? meta.lastmod}" />`,
      `<meta property="article:modified_time" content="${meta.lastmod}" />`,
      `<meta property="article:author" content="Miro" />`,
    ].join("\n    ");
    out = out.replace(/(\s*<\/head>)/, `\n    ${articleMetas}$1`);

    // Static BlogPosting JSON-LD so crawlers see structured data without
    // executing JavaScript (mirrors the client-side useJsonLd schema).
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.headline ?? meta.title,
      description: meta.desc,
      datePublished: meta.publishedAt ?? meta.lastmod,
      dateModified: meta.lastmod,
      inLanguage: meta.lang === "en" ? "en-GB" : "pl-PL",
      url: meta.canonical,
      author: {
        "@type": "Person",
        name: "Miro",
        worksFor: { "@type": "Organization", name: "Forsa Design", url: SITE },
      },
      publisher: {
        "@type": "Organization",
        name: "Forsa Design",
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/brand/forsa-logo.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": meta.canonical },
    };
    out = out.replace(
      /(\s*<\/head>)/,
      `\n    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>$1`,
    );
  }

  // <meta property="og:url" content="...">  -  update if present
  out = out.replace(/(property="og:url"\s+content=")[^"]*(")/s, `$1${meta.canonical}$2`);

  // <meta name="twitter:title" content="...">
  out = out.replace(/(name="twitter:title"\s+content=")[^"]*(")/s, `$1${he(meta.ogTitle)}$2`);

  // <meta name="twitter:description" content="...">
  out = out.replace(/(name="twitter:description"\s+content=")[^"]*(")/s, `$1${he(meta.desc)}$2`);

  // <link rel="canonical" href="...">
  out = out.replace(/(rel="canonical"\s+href=")[^"]*(")/s, `$1${meta.canonical}$2`);

  // Remove all existing hreflang alternate links
  out = out.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/>/gs, "");

  // Insert new alternates immediately after the canonical link
  const altLines = ensureXDefault(meta.alternates, meta.canonical)
    .map((a) => `    <link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
    .join("\n");
  out = out.replace(/(rel="canonical"[^>]*\/>)/, `$1\n${altLines}`);

  // Preload the hero LCP image only on pages that actually render it
  // (homepage EN/PL). The preload href must match the <img> src exactly
  // (including the path and any query string) - different URLs are different browser cache keys,
  // so a mismatched preload is wasted and the image is fetched twice.
  if (
    meta.bodyHtml?.includes("brand/forsa-logo-gradient.svg") &&
    !out.includes('rel="preload" as="image"')
  ) {
    out = out.replace(
      /(\s*<\/head>)/,
      `\n    <link rel="preload" as="image" href="/brand/forsa-logo-gradient.svg" type="image/svg+xml" fetchpriority="high" />$1`,
    );
  }

  // Inject static body HTML into <div id="root"> so AI crawlers see page copy
  // without executing JavaScript. React will overwrite this on the client.
  // The skip link and #main-content wrapper mirror the client-rendered
  // accessibility landmarks for no-JS users and crawlers.
  if (meta.bodyHtml) {
    const skipText = meta.lang === "pl" ? "Przejdź do treści" : "Skip to main content";
    out = out.replace(
      /<div\s+id="root">\s*<\/div>/,
      `<div id="root" data-prerendered="true">\n<a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground">${skipText}</a>\n<div class="prerendered-page">\n${meta.bodyHtml}\n</div>\n</div>`,
    );
  }

  return out;
}

function ensureXDefault(alternates, fallback) {
  if (alternates.some((a) => a.lang === "x-default")) return alternates;
  return [
    ...alternates,
    {
      lang: "x-default",
      href: alternates.find((a) => a.lang === "en")?.href ?? fallback,
    },
  ];
}

// ---------------------------------------------------------------------------
// Route-level body HTML helpers
// ---------------------------------------------------------------------------

function buildPortfolioBody(lang) {
  return renderToStaticMarkup(createElement(PortfolioContent, { lang }));
}

function buildLinklangCaseBody(lang) {
  const c = linklangCaseStudy[lang];
  const blocks = (items) =>
    items
      .map((item) => `<section><h3>${ht(item.title)}</h3><p>${ht(item.body)}</p></section>`)
      .join("\n");
  return `<header><nav><a href="/${lang}/">Forsa Design</a> | <a href="/${lang}/#portfolio">Portfolio</a> | <a href="/${lang}/contact/">${lang === "pl" ? "Kontakt" : "Contact"}</a></nav></header>
<main id="main-content"><article>
<a href="/${lang}/#portfolio">${ht(c.back)}</a>
<header><p>${ht(c.label)}</p><h1>${ht(c.title)}</h1><p>${ht(c.lead)}</p><a href="${linklangProject.url}" target="_blank" rel="noopener noreferrer">${ht(c.visit)}</a></header>
<figure><img src="${c.image}" alt="${he(c.imageAlt)}" width="1120" height="420" fetchpriority="high" /><figcaption>${ht(c.imageCaption)}</figcaption></figure>
${renderToStaticMarkup(createElement(LinklangBrandingProof, { lang }))}
<dl>${c.facts.map((f) => `<dt>${ht(f.label)}</dt><dd>${ht(f.value)}</dd>`).join("")}</dl>
<section><h2>${ht(c.contextHeading)}</h2>${c.context.map((p) => `<p>${ht(p)}</p>`).join("")}</section>
<section><h2>${ht(c.scopeHeading)}</h2>${blocks(c.features)}</section>
<section><h2>${ht(c.workflowHeading)}</h2><p>${ht(c.workflowIntro)}</p><ol>${c.steps.map((step) => `<li><h3>${ht(step.title)}</h3><p>${ht(step.body)}</p></li>`).join("")}</ol></section>
<figure><a href="/projects/linklang-workflow.webp"><img src="/projects/linklang-workflow.webp" alt="${lang === "pl" ? "Schemat zgłoszenia, wyceny, akceptacji i płatności; karta zlecenia zawiera wiadomości i dokumenty" : "Service request, quotation, acceptance and payment workflow; the order workspace holds messages and documents"}" width="1983" height="793" loading="lazy" /></a><figcaption>${lang === "pl" ? "Uproszczony przebieg. Karta zlecenia jest dostępna również przed płatnością." : "Simplified workflow. The order workspace is also available before payment."}</figcaption></figure>
<section><h2>${ht(c.decisionsHeading)}</h2>${blocks(c.decisions)}</section>
<section><h2>${ht(c.stackHeading)}</h2><p>${ht(c.stackIntro)}</p><ul>${linklangProject.technologies.map((t) => `<li>${ht(t)}</li>`).join("")}</ul></section>
<section><h2>${ht(c.outcomeHeading)}</h2><p>${ht(c.outcome)}</p><p>${ht(c.evidence)}</p></section>
<aside><h2>${ht(c.ctaTitle)}</h2><p>${ht(c.ctaBody)}</p><a href="/${lang}/contact/">${ht(c.cta)}</a></aside>
</article></main>`;
}

function staticNav(lang) {
  return `<header class="container mx-auto px-6 py-6"><nav class="flex flex-wrap gap-5 text-base"><a href="/${lang}/">Forsa Design</a><a href="/${lang}/services/">${lang === "pl" ? "Usługi" : "Services"}</a><a href="/${lang}/#portfolio">Portfolio</a><a href="/${lang}/contact/">${lang === "pl" ? "Kontakt" : "Contact"}</a></nav></header>`;
}
function buildHome(lang) {
  const c = siteCopy[lang];
  return (
    staticNav(lang) +
    `<main id="main-content"><section id="home" class="container mx-auto px-6 py-16 max-w-6xl"><h1 class="font-serif text-4xl md:text-6xl text-white mb-6">${ht(c.hero.tagline)}</h1><p class="text-xl text-foreground/80 mb-5">${ht(c.hero.subheader)}</p>${c.hero.body
      .split("\n\n")
      .map((p) => `<p class="text-lg text-foreground/80 mb-4">${ht(p)}</p>`)
      .join(
        "",
      )}<a class="text-primary underline" href="/${lang}/quote/">${ht(c.hero.cta)}</a></section>${renderToStaticMarkup(createElement(ServicesContent, { lang }))}<section id="pricing" class="container mx-auto px-6 py-16"><h2 class="font-serif text-3xl text-white mb-5">${ht(c.pricing.heading)}</h2><p>${ht(c.pricing.subheading)}</p><a href="/${lang}/quote/" class="text-primary underline">${ht(c.hero.cta)}</a></section>${buildPortfolioBody(lang)}${renderToStaticMarkup(createElement(ProcessContent, { lang }))}${renderToStaticMarkup(createElement(FAQContent, { lang }))}<section id="contact" class="container mx-auto px-6 py-16"><h2 class="font-serif text-3xl text-white mb-4">${ht(c.cta.heading)}</h2><p>${ht(c.cta.body)}</p><a href="/${lang}/contact/" class="text-primary underline">${ht(c.cta.button)}</a></section></main>`
  );
}
function buildHomepageBodyEn() {
  return buildHome("en");
}
function buildHomepageBodyPl() {
  return buildHome("pl");
}
function buildServicesBody(lang) {
  return (
    staticNav(lang) +
    `<main id="main-content"><div class="container mx-auto px-6 py-12"><h1 class="font-serif text-4xl text-white mb-5">${ht(siteCopy[lang].hero.tagline)}</h1><p>${ht(siteCopy[lang].hero.subheader)}</p></div>${renderToStaticMarkup(createElement(ServicesContent, { lang }))}${renderToStaticMarkup(createElement(ProcessContent, { lang }))}</main>`
  );
}

function buildSearchBody(lang) {
  const en = lang === "en";
  return `<header>
<nav><a href="/${lang}/">Forsa Design</a> | <a href="/${lang}/#services">${en ? "Services" : "Usługi"}</a> | <a href="/${lang}/#faq">FAQ</a> | <a href="/${lang}/#contact">${en ? "Contact" : "Kontakt"}</a> | <a href="/${lang}/blog">Blog</a></nav>
</header>
<main>
<h1>${en ? "Search Forsa Design" : "Szukaj w Forsa Design"}</h1>
<p>${en ? "Search our services, frequently asked questions, guides and articles." : "Przeszukaj nasze usługi, najczęstsze pytania, poradniki i artykuły."}</p>
<form role="search"><label for="site-search">${en ? "Search the site" : "Szukaj na stronie"}</label><input id="site-search" type="search" placeholder="${en ? "Search services, FAQ and articles" : "Szukaj usług, FAQ i artykułów"}" /></form>
<h2>${en ? "Searchable content" : "Treści dostępne w wyszukiwarce"}</h2>
<ul>
<li><a href="/${lang}/services">${en ? "Industrial web design and bespoke web systems" : "Web design dla przemysłu i dedykowane systemy"}</a></li>
<li><a href="/${lang}/about">${en ? "About Forsa Design" : "O Forsa Design"}</a></li>
<li><a href="/${lang}/#faq">FAQ</a></li>
</ul>
</main>`;
}

function buildNewsletterBody(lang, source) {
  const en = lang === "en";
  return `<section id="newsletter"><h2>${en ? "New articles, straight to your inbox" : "Nowe artykuły prosto na Twoją skrzynkę"}</h2>
<p>${en ? "Practical guidance on B2B websites and systems. Confirm your email to subscribe. You can unsubscribe at any time." : "Praktyczne wskazówki o stronach i systemach B2B. Potwierdź adres, aby dołączyć. Możesz wypisać się w każdej chwili."}</p>
<form action="https://forsa-api.sproutspunk.workers.dev/api/newsletter" method="post">
<label for="newsletter-email">${en ? "Email address" : "Adres e-mail"}</label><input id="newsletter-email" type="email" name="email" required maxlength="320" autocomplete="email" />
<input type="hidden" name="language" value="${lang}" /><input type="hidden" name="source" value="${he(source)}" />
<label><input type="checkbox" name="consent" value="yes" required />${en ? "I agree to receive Forsa Design articles and guidance by email. I can withdraw consent at any time." : "Zgadzam się otrzymywać e-mailem artykuły i wskazówki Forsa Design. Mogę wycofać zgodę w każdej chwili."}</label>
<a href="/${lang}/privacy/">${en ? "Privacy policy" : "Polityka prywatności"}</a>
<button type="submit">${en ? "Subscribe to the newsletter" : "Zapisz się do newslettera"}</button></form></section>`;
}

function buildBlogBody(lang) {
  const en = lang === "en";
  const items = [...articles]
    .sort((a, b) => b.dateIso.localeCompare(a.dateIso))
    .map(
      (article) =>
        `<li><a href="/${lang}/blog/${lang === "en" ? article.slugEn : article.slugPl}">${ht(article[lang].title)}</a> <span>${article.publishedDateIso ? (en ? "Updated: " : "Aktualizacja: ") : ""}<time datetime="${article.dateIso}">${article.dateIso}</time></span></li>`,
    )
    .join("\n");
  return `<header>
<nav><a href="/${lang}/">Forsa Design</a> | <a href="/${lang}/#services">${en ? "Services" : "Usługi"}</a> | <a href="/${lang}/#faq">FAQ</a> | <a href="/${lang}/#contact">${en ? "Contact" : "Kontakt"}</a> | <a href="/${lang}/blog">Blog</a></nav>
</header>
<main>
<h1>Blog</h1>
<p>${en ? "Expert insights on web design, SEO, e-commerce, and digital strategy from the Forsa Design team." : "Wiedza ekspercka o web designie, SEO, e-commerce i strategii cyfrowej od zespołu Forsa Design."}</p>
${buildNewsletterBody(lang, "blog-index")}
<ul>
${items}
</ul>
</main>`;
}

/**
 * Truncate text to a maximum length for meta descriptions without cutting
 * a word in half.
 */
function truncateDesc(text, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Render a full blog article as static HTML for crawlers. */
function buildArticleBody(lang, article) {
  const en = lang === "en";
  const content = article[lang];
  const slug = en ? article.slugEn : article.slugPl;
  const sectionsHtml = content.sections
    .map((s) => {
      const heading = s.heading ? `<h2>${ht(s.heading)}</h2>\n` : "";
      return `${heading}<p>${ht(s.body)}</p>`;
    })
    .join("\n");
  const relatedHtml = content.relatedLinks?.length
    ? `<section aria-labelledby="article-related"><h2 id="article-related">${en ? "Related articles and services" : "Powiązane artykuły i usługi"}</h2><ul>${content.relatedLinks.map((link) => `<li><a href="${he(link.href)}">${ht(link.label)}</a></li>`).join("")}</ul></section>`
    : "";
  const sourcesHtml = content.sources?.length
    ? `<section aria-labelledby="article-sources"><h2 id="article-sources">${en ? "Sources" : "Źródła"}</h2><ul>${content.sources
        .map((source) => `<li><a href="${ht(source.href)}">${ht(source.label)}</a></li>`)
        .join("")}</ul></section>`
    : "";
  return `<header>
<nav><a href="/${lang}/">Forsa Design</a> | <a href="/${lang}/#services">${en ? "Services" : "Usługi"}</a> | <a href="/${lang}/#faq">FAQ</a> | <a href="/${lang}/#contact">${en ? "Contact" : "Kontakt"}</a> | <a href="/${lang}/blog">Blog</a></nav>
</header>
<main>
<article>
<p><a href="/${lang}/blog">${en ? "← Back to blog" : "← Wróć do bloga"}</a></p>
<h1>${ht(content.title)}</h1>
<p>${article.publishedDateIso ? (en ? "Updated: " : "Aktualizacja: ") : ""}<time datetime="${article.dateIso}">${article.dateIso}</time> · ${article.readingTimeMin} min</p>
${sectionsHtml}
${relatedHtml}
${sourcesHtml}
${buildNewsletterBody(lang, `article:${article.slugEn}`)}
<aside>
<h2>${en ? "Working on a similar project?" : "Pracujesz nad podobnym projektem?"}</h2>
<p>${en ? "We design procurement-ready websites and bespoke web systems for industrial, marine and engineering businesses." : "Projektujemy strony gotowe na audyt zakupowy i dedykowane systemy webowe dla firm przemysłowych, morskich i inżynieryjnych."}</p>
<p><a href="/${lang}/services">${en ? "See our services" : "Zobacz nasze usługi"}</a> &middot; <a href="/${lang}/contact">${en ? "Start a conversation" : "Rozpocznij rozmowę"}</a></p>
</aside>
<p><a href="/${lang}/blog/${slug}">${en ? "Read on Forsa Design" : "Czytaj na Forsa Design"}</a></p>
</article>
</main>`;
}

function buildContactBody(lang) {
  const en = lang === "en";
  return `<header><nav><a href="/${lang}/">Forsa Design</a> | <a href="/${lang}/services">${en ? "Services" : "Usługi"}</a></nav></header>
<main><h1>${en ? "Start with the technical brief" : "Zacznijmy od briefu technicznego"}</h1>
<p>${en ? "Tell us what you build, who buys it and where your current website falls short." : "Opowiedz, co budujesz, kto to kupuje i gdzie obecna strona nie spełnia swojej roli."}</p>
<h2>${en ? "Contact Forsa Design" : "Skontaktuj się z Forsa Design"}</h2>
<p>Email: <a href="mailto:hello@forsadesign.co.uk">hello@forsadesign.co.uk</a></p>
<p>Telefon: <a href="tel:07770110735">07770110735</a></p>
<form>
<label>${en ? "Name" : "Imię i nazwisko"} <input name="name" required /></label>
<label>${en ? "Email" : "Adres email"} <input name="email" type="email" required /></label>
<label>${en ? "Message" : "Wiadomość"} <textarea name="message" required></textarea></label>
<button type="submit">${en ? "Send message" : "Wyślij wiadomość"}</button>
</form></main>`;
}

// ---------------------------------------------------------------------------
// Legal page section data (mirrors the React component data)
// ---------------------------------------------------------------------------

function legalBody(lang, kind) {
  return renderToStaticMarkup(createElement(LegalContent, { lang, kind }));
}
function buildTermsBodyEn() {
  return legalBody("en", "terms");
}
function buildTermsBodyPl() {
  return legalBody("pl", "terms");
}
function buildPrivacyBodyEn() {
  return legalBody("en", "privacy");
}
function buildPrivacyBodyPl() {
  return legalBody("pl", "privacy");
}
function buildAboutBodyEn() {
  return staticNav("en") + renderToStaticMarkup(createElement(AboutContent, { lang: "en" }));
}
function buildAboutBodyPl() {
  return staticNav("pl") + renderToStaticMarkup(createElement(AboutContent, { lang: "pl" }));
}
function buildComparisonBodyEn() {
  return staticNav("en") + renderToStaticMarkup(createElement(ComparisonContent, { lang: "en" }));
}
function buildComparisonBodyPl() {
  return staticNav("pl") + renderToStaticMarkup(createElement(ComparisonContent, { lang: "pl" }));
}
function buildQuoteBody(lang) {
  return (
    staticNav(lang) +
    `<main id="main-content" class="container mx-auto px-6 py-16 max-w-3xl"><h1 class="font-serif text-4xl text-white mb-5">${lang === "pl" ? "Zapytanie o projekt" : "Project enquiry"}</h1><p>${lang === "pl" ? "Opisz potrzeby firmy. Przeanalizujemy wymagania i wskażemy informacje potrzebne do przygotowania oferty." : "Describe your business needs. We will review requirements and identify information needed for a quotation."}</p><a class="text-primary underline" href="mailto:hello@forsadesign.co.uk">hello@forsadesign.co.uk</a><p class="mt-5">${lang === "pl" ? "Interaktywny formularz jest dostępny po uruchomieniu JavaScript. Możesz również wysłać zapytanie e-mailem." : "The interactive form is available with JavaScript. You can also send an enquiry by email."}</p></main>`
  );
}
function buildQuoteBodyEn() {
  return buildQuoteBody("en");
}
function buildQuoteBodyPl() {
  return buildQuoteBody("pl");
}

const routes = [
  {
    outDir: "en",
    lang: "en",
    title: "Industrial Web Design & Bespoke Web Systems | Forsa Design",
    desc: "Forsa Design builds procurement-ready websites and bespoke web systems for offshore, energy, engineering, equipment, logistics and manufacturing businesses.",
    ogTitle: "Forsa Design | Web Design & Creation",
    locale: "en_GB",
    canonical: `${SITE}/en/`,
    alternates: [
      { lang: "en", href: `${SITE}/en/` },
      { lang: "pl", href: `${SITE}/pl/` },
      { lang: "x-default", href: `${SITE}/en/` },
    ],
    bodyHtml: buildHomepageBodyEn(),
  },
  {
    outDir: "pl",
    lang: "pl",
    title: "Web Design dla Przemysłu i Dedykowane Systemy | Forsa Design",
    desc: "Forsa Design tworzy strony gotowe na audyt zakupowy i dedykowane systemy webowe dla firm offshore, energetycznych, inżynieryjnych, logistycznych i produkcyjnych.",
    ogTitle: "Forsa Design | Web Design i Tworzenie Stron",
    locale: "pl_PL",
    canonical: `${SITE}/pl/`,
    alternates: [
      { lang: "en", href: `${SITE}/en/` },
      { lang: "pl", href: `${SITE}/pl/` },
      { lang: "x-default", href: `${SITE}/en/` },
    ],
    bodyHtml: buildHomepageBodyPl(),
  },
  {
    outDir: "en/terms",
    lang: "en",
    title: "Terms and Conditions | Forsa Design",
    desc: "Read the terms and conditions for Forsa Design web design and development services, including project agreements, payment terms, intellectual property, and liability.",
    ogTitle: "Terms and Conditions | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/terms`,
    alternates: [
      { lang: "en", href: `${SITE}/en/terms` },
      { lang: "pl", href: `${SITE}/pl/terms` },
    ],
    bodyHtml: buildTermsBodyEn(),
  },
  {
    outDir: "pl/terms",
    lang: "pl",
    title: "Regulamin i Warunki Świadczenia Usług | Forsa Design",
    desc: "Zapoznaj się z regulaminem i warunkami świadczenia usług Forsa Design, w tym zasadami realizacji projektów, warunkami płatności, własnością intelektualną i odpowiedzialnością.",
    ogTitle: "Regulamin i Warunki Świadczenia Usług | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/terms`,
    alternates: [
      { lang: "en", href: `${SITE}/en/terms` },
      { lang: "pl", href: `${SITE}/pl/terms` },
    ],
    bodyHtml: buildTermsBodyPl(),
  },
  {
    outDir: "en/privacy",
    lang: "en",
    title: "Privacy Policy | Forsa Design",
    desc: "Read Forsa Design’s privacy policy to understand how we collect, use, and protect your personal data in compliance with UK GDPR and applicable data protection law.",
    ogTitle: "Privacy Policy | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/privacy`,
    alternates: [
      { lang: "en", href: `${SITE}/en/privacy` },
      { lang: "pl", href: `${SITE}/pl/privacy` },
    ],
    bodyHtml: buildPrivacyBodyEn(),
  },
  {
    outDir: "pl/privacy",
    lang: "pl",
    title: "Polityka Prywatności | Forsa Design",
    desc: "Zapoznaj się z polityką prywatności Forsa Design i dowiedz się, jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z UK GDPR i przepisami o ochronie danych.",
    ogTitle: "Polityka Prywatności | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/privacy`,
    alternates: [
      { lang: "en", href: `${SITE}/en/privacy` },
      { lang: "pl", href: `${SITE}/pl/privacy` },
    ],
    bodyHtml: buildPrivacyBodyPl(),
  },
  {
    outDir: "en/about",
    lang: "en",
    title: "About Forsa Design | Industrial Web Specialist",
    desc: "Meet Forsa Design's founder with 20 years of international B2B sales experience, building industrial websites and bespoke web systems in Scotland.",
    ogTitle: "About Us | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/about`,
    alternates: [
      { lang: "en", href: `${SITE}/en/about` },
      { lang: "pl", href: `${SITE}/pl/about` },
    ],
    bodyHtml: buildAboutBodyEn(),
  },
  {
    outDir: "pl/o-nas",
    lang: "pl",
    title: "O Forsa Design | Web dla Przemysłu",
    desc: "Poznaj założyciela Forsa Design z 20-letnim doświadczeniem w sprzedaży B2B i tworzeniu stron oraz systemów webowych dla przemysłu.",
    ogTitle: "O Nas | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/o-nas`,
    alternates: [
      { lang: "en", href: `${SITE}/en/about` },
      { lang: "pl", href: `${SITE}/pl/o-nas` },
    ],
    bodyHtml: buildAboutBodyPl(),
  },
  {
    outDir: "en/services",
    lang: "en",
    title: "Industrial Web Design & Bespoke Web Systems | Forsa Design",
    desc: "Procurement-ready websites, B2B e-commerce and bespoke web systems for offshore, energy, engineering, equipment, logistics and manufacturing businesses.",
    ogTitle: "Industrial Web Services | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/services`,
    alternates: [
      { lang: "en", href: `${SITE}/en/services` },
      { lang: "pl", href: `${SITE}/pl/services` },
    ],
    bodyHtml: buildServicesBody("en"),
  },
  {
    outDir: "pl/services",
    lang: "pl",
    title: "Web Design dla Przemysłu i Dedykowane Systemy | Forsa Design",
    desc: "Strony gotowe na audyt zakupowy, e-commerce B2B i dedykowane systemy webowe dla firm offshore, energetycznych, inżynieryjnych, logistycznych i produkcyjnych.",
    ogTitle: "Usługi Webowe dla Przemysłu | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/services`,
    alternates: [
      { lang: "en", href: `${SITE}/en/services` },
      { lang: "pl", href: `${SITE}/pl/services` },
    ],
    bodyHtml: buildServicesBody("pl"),
  },
  {
    outDir: "en/contact",
    lang: "en",
    title: "Contact Forsa Design | Industrial Web Projects",
    desc: "Discuss an industrial website, B2B catalogue, e-commerce project or bespoke web system with Forsa Design in Banff, Aberdeenshire.",
    ogTitle: "Contact Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/contact`,
    alternates: [
      { lang: "en", href: `${SITE}/en/contact` },
      { lang: "pl", href: `${SITE}/pl/contact` },
    ],
    bodyHtml: buildContactBody("en"),
  },
  {
    outDir: "pl/contact",
    lang: "pl",
    title: "Kontakt z Forsa Design | Projekty Web dla Przemysłu",
    desc: "Porozmawiaj o stronie przemysłowej, katalogu B2B, e-commerce lub dedykowanym systemie webowym z Forsa Design w Banff, Aberdeenshire.",
    ogTitle: "Kontakt z Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/contact`,
    alternates: [
      { lang: "en", href: `${SITE}/en/contact` },
      { lang: "pl", href: `${SITE}/pl/contact` },
    ],
    bodyHtml: buildContactBody("pl"),
  },
  {
    outDir: "en/comparison",
    lang: "en",
    title: "Industrial Web Design Options | Forsa Design",
    desc: "Compare industrial web design options in Aberdeenshire: custom builds, CMS templates, agencies and freelancers. Choose the right fit for your business.",
    ogTitle: "Web Design Options Compared | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/comparison`,
    alternates: [
      { lang: "en", href: `${SITE}/en/comparison` },
      { lang: "pl", href: `${SITE}/pl/comparison` },
    ],
    bodyHtml: buildComparisonBodyEn(),
  },
  {
    outDir: "pl/comparison",
    lang: "pl",
    title: "Opcje Web Design dla Przemysłu | Forsa Design",
    desc: "Porównaj opcje web design dla przemysłu: autorskie strony, szablony CMS, agencje i freelancerzy. Wybierz rozwiązanie dla swojej firmy.",
    ogTitle: "Porównanie Opcji Web Design | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/comparison`,
    alternates: [
      { lang: "en", href: `${SITE}/en/comparison` },
      { lang: "pl", href: `${SITE}/pl/comparison` },
    ],
    bodyHtml: buildComparisonBodyPl(),
  },
  {
    outDir: "en/quote",
    lang: "en",
    title: "Request a Quote | Forsa Design",
    desc: "Tell us about your industrial, manufacturing or engineering website project and we will review requirements and identify information needed for a quotation.",
    ogTitle: "Request a Quote | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/quote`,
    alternates: [
      { lang: "en", href: `${SITE}/en/quote` },
      { lang: "pl", href: `${SITE}/pl/quote` },
    ],
    bodyHtml: buildQuoteBodyEn(),
  },
  {
    outDir: "pl/quote",
    lang: "pl",
    title: "Poproś o Wycenę | Forsa Design",
    desc: "Opowiedz nam o swoim projekcie strony internetowej dla przemysłu, produkcji lub inżynierii, a my przeanalizujemy wymagania i wskażemy informacje potrzebne do przygotowania oferty.",
    ogTitle: "Poproś o Wycenę | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/quote`,
    alternates: [
      { lang: "en", href: `${SITE}/en/quote` },
      { lang: "pl", href: `${SITE}/pl/quote` },
    ],
    bodyHtml: buildQuoteBodyPl(),
  },
  {
    outDir: "en/search",
    lang: "en",
    title: "Search | Forsa Design",
    desc: "Search Forsa Design services, industrial web design guidance, frequently asked questions and articles.",
    ogTitle: "Search Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/search`,
    alternates: [
      { lang: "en", href: `${SITE}/en/search` },
      { lang: "pl", href: `${SITE}/pl/search` },
    ],
    bodyHtml: buildSearchBody("en"),
  },
  {
    outDir: "pl/search",
    lang: "pl",
    title: "Szukaj | Forsa Design",
    desc: "Przeszukaj usługi Forsa Design, poradniki web design dla przemysłu, FAQ i artykuły.",
    ogTitle: "Szukaj w Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/search`,
    alternates: [
      { lang: "en", href: `${SITE}/en/search` },
      { lang: "pl", href: `${SITE}/pl/search` },
    ],
    bodyHtml: buildSearchBody("pl"),
  },
  {
    outDir: "en/blog",
    lang: "en",
    title: "Blog | Forsa Design",
    desc: "Expert insights on web design, SEO, e-commerce, and digital strategy from the Forsa Design team.",
    ogTitle: "Blog | Forsa Design",
    locale: "en_GB",
    canonical: `${SITE}/en/blog`,
    alternates: [
      { lang: "en", href: `${SITE}/en/blog` },
      { lang: "pl", href: `${SITE}/pl/blog` },
    ],
    bodyHtml: buildBlogBody("en"),
  },
  {
    outDir: "pl/blog",
    lang: "pl",
    title: "Blog | Forsa Design",
    desc: "Wiedza ekspercka o web designie, SEO, e-commerce i strategii cyfrowej od zespołu Forsa Design.",
    ogTitle: "Blog | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/blog`,
    alternates: [
      { lang: "en", href: `${SITE}/en/blog` },
      { lang: "pl", href: `${SITE}/pl/blog` },
    ],
    bodyHtml: buildBlogBody("pl"),
  },
];

for (const lang of ["en", "pl"]) {
  const content = linklangCaseStudy[lang];
  routes.push({
    outDir: `${lang}/case-studies/linklang`,
    lang,
    title: `${content.title} | Forsa Design`,
    desc: content.description,
    ogTitle: content.title,
    locale: lang === "en" ? "en_GB" : "pl_PL",
    canonical: `${SITE}${linklangCasePath(lang)}`,
    alternates: [
      { lang: "en", href: `${SITE}${linklangCasePath("en")}` },
      { lang: "pl", href: `${SITE}${linklangCasePath("pl")}` },
    ],
    bodyHtml: buildLinklangCaseBody(lang),
    schema: linklangCaseSchema(lang),
    lastmod: linklangProject.reviewedOn,
  });
}

for (const lang of ["pl", "en"]) {
  const c = dachCase[lang];
  routes.push({
    outDir: `${lang}/case-studies/dachsystema`,
    lang,
    title: c.title + " | Forsa Design",
    desc: c.intro,
    ogTitle: c.title,
    locale: lang === "pl" ? "pl_PL" : "en_GB",
    canonical: SITE + dachPath(lang),
    alternates: [
      { lang: "pl", href: SITE + dachPath("pl") },
      { lang: "en", href: SITE + dachPath("en") },
    ],
    bodyHtml: `<header><nav><a href="/${lang}/#portfolio">Portfolio</a></nav></header><main id="main-content">${renderToStaticMarkup(createElement(DachCaseContent, { lang }))}</main>`,
    schema: dachSchema(lang),
  });
}

for (const lang of ["pl", "en"]) {
  const c = dueDiligence[lang];
  routes.push({
    outDir: `${lang}/services/commercial-due-diligence`,
    lang,
    title: c.title + " | Forsa Design",
    desc: c.opening[1],
    ogTitle: c.title,
    locale: lang === "pl" ? "pl_PL" : "en_GB",
    canonical: SITE + dueDiligencePath(lang),
    alternates: ["pl", "en"].map((l) => ({ lang: l, href: SITE + dueDiligencePath(l) })),
    bodyHtml: `<header><nav><a href="/${lang}/">Forsa Design</a></nav></header><main id="main-content" class="pt-56 md:pt-48 pb-20">${renderToStaticMarkup(createElement(DueDiligenceContent, { lang }))}</main>`,
    schema: dueDiligenceSchema(lang),
  });
}

for (const lang of ["pl", "en"]) {
  const home = routes.find((route) => route.outDir === lang);
  home.bodyHtml = home.bodyHtml.replace(
    /<section id="process"[\s\S]*?<\/section>/,
    renderToStaticMarkup(createElement(ProcessContent, { lang })),
  );
  home.bodyHtml = home.bodyHtml.replace(
    /<section id="faq"[\s\S]*?<\/section>/,
    renderToStaticMarkup(createElement(FAQContent, { lang })),
  );
}

// Blog article routes — one per article per language, derived from
// src/data/articlesData.ts so slugs and content never drift.
for (const article of articles) {
  for (const lang of ["en", "pl"]) {
    const en = lang === "en";
    const content = article[lang];
    const slug = en ? article.slugEn : article.slugPl;
    const canonical = `${SITE}/${lang}/blog/${slug}`;
    routes.push({
      outDir: `${lang}/blog/${slug}`,
      lang,
      title: `${content.title} | Forsa Design`,
      desc: truncateDesc(content.excerpt),
      ogTitle: content.title,
      headline: content.title,
      locale: en ? "en_GB" : "pl_PL",
      canonical,
      alternates: [
        { lang: "en", href: `${SITE}/en/blog/${article.slugEn}` },
        { lang: "pl", href: `${SITE}/pl/blog/${article.slugPl}` },
      ],
      bodyHtml: buildArticleBody(lang, article),
      isArticle: true,
      lastmod: article.dateIso,
      publishedAt: article.publishedDateIso ?? article.dateIso,
    });
  }
}

// ---------------------------------------------------------------------------
// Trailing-slash normalization  -  Cloudflare Pages serves /en/blog as a 308
// redirect to /en/blog/, so canonicals, hreflang alternates, sitemap entries
// and static internal links must all point at the final URL, not the source
// of a redirect. Applied once, centrally, after every route is defined.
// ---------------------------------------------------------------------------

for (const route of routes) {
  const lang = route.lang;
  if ([`${lang}/terms`, `${lang}/privacy`].includes(route.outDir)) {
    const privacy = route.outDir.endsWith("privacy");
    const title = privacy
      ? lang === "pl"
        ? "Polityka prywatności i cookies"
        : "Privacy and cookie notice"
      : lang === "pl"
        ? "Regulamin świadczenia usług"
        : "Terms and Conditions";
    route.title = title + " | Forsa Design";
    route.ogTitle = route.title;
    route.desc =
      lang === "pl"
        ? "Informacje o zasadach usług i przetwarzania danych w Forsa Design."
        : "Information about service terms and data processing at Forsa Design.";
  }
  if (route.outDir === `${lang}/services`) {
    route.title =
      lang === "en"
        ? "Industrial Web Development UK | Manufacturing, Engineering & B2B Systems"
        : "Strony i systemy webowe dla przemysłu | Forsa Design";
    route.ogTitle = route.title;
    route.desc =
      lang === "en"
        ? "Custom websites, B2B catalogues and web tools for industrial, engineering and technical businesses. No WordPress, no page builders and no off-the-shelf templates."
        : "Dedykowane strony, katalogi B2B i narzędzia webowe dla firm przemysłowych, inżynieryjnych i technicznych. Bez WordPressa, bez kreatorów stron i bez gotowych szablonów.";
  }
  if (!["pl", "en"].includes(lang))
    throw new Error(`Invalid route language: ${route.outDir}: ${lang}`);
  if (route.outDir === `${lang}/comparison`) {
    const c = comparisonContent[lang];
    route.title = c.seoTitle;
    route.desc = c.seoDesc;
    route.ogTitle = c.seoTitle;
  }
  if (["en/about", "pl/o-nas"].includes(route.outDir)) {
    const c = aboutContent[lang];
    route.title = c.seoTitle;
    route.desc = c.seoDesc;
    route.ogTitle = c.seoTitle;
    route.alternates = [
      { lang: "en", href: SITE + "/en/about/" },
      { lang: "pl", href: SITE + "/pl/o-nas/" },
    ];
  }
  if (route.bodyHtml) {
    route.bodyHtml =
      route.bodyHtml.replace(/<footer\b[\s\S]*?<\/footer>/g, "") +
      renderToStaticMarkup(createElement(FooterContent, { language: lang }));
  }
}

for (const route of routes) {
  if (!route.canonical.endsWith("/")) route.canonical += "/";
  for (const alt of route.alternates) {
    if (!alt.href.endsWith("/")) alt.href += "/";
  }
  if (route.bodyHtml) {
    // Portfolio remains a direct navigation link even without JavaScript.
    route.bodyHtml = route.bodyHtml.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/, (nav) =>
      /href="[^"]*#portfolio"/.test(nav)
        ? nav
        : nav.replace(
            "</nav>",
            `<a href="/${route.lang}/#portfolio" class="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Portfolio</a></nav>`,
          ),
    );
    route.bodyHtml = route.bodyHtml.replace(
      /href="(\/(?:en|pl)\/[^"#?]*?)(\/?)([#?][^"]*)?"/g,
      (m, path, _slash, suffix = "") => `href="${path.replace(/\/+$/, "")}/${suffix}"`,
    );
  }
}

let template = readFileSync(join(distDir, "index.html"), "utf-8");

// Inline the built stylesheet into every prerendered page. PageSpeed flagged
// the blocking /assets/index-*.css request (~1.1s on throttled 4G); inlining
// removes it from the critical path entirely.
const cssLinkMatch = template.match(
  /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)"[^>]*>/,
);
if (cssLinkMatch) {
  const builtCss = readFileSync(join(distDir, cssLinkMatch[1]), "utf-8").replace(
    /<\/style/gi,
    "<\\/style",
  );
  template = template.replace(cssLinkMatch[0], () => `<style>${builtCss}</style>`);
  console.log(`  ✓ inlined ${cssLinkMatch[1]} (${builtCss.length} bytes)`);
} else {
  console.warn("  ! built stylesheet link not found; CSS left external");
}

console.log("Prerendering public routes...");

for (const route of routes) {
  const html = patch(template, route);
  const outPath = join(distDir, route.outDir);
  mkdirSync(outPath, { recursive: true });
  writeFileSync(join(outPath, "index.html"), html);
  console.log(`  ✓ /${route.outDir}/`);
}

// ---------------------------------------------------------------------------
// Sitemap generation  -  derived from the same route sources as the prerender
// step so the two never drift apart.
//
// All prerendered routes (home, legal, about, comparison, quote) are emitted.
// No SPA-only shell fallbacks remain.
// ---------------------------------------------------------------------------

const spaMarketingRoutes = [];

function buildSitemapEntry(loc, alternates, priority, changefreq, lastmod) {
  const altLines = alternates
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
    .join("\n");
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    altLines,
    `${lastmodLine}`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

const sitemapEntries = [];

for (const route of routes) {
  const loc = route.canonical;
  const alternates = ensureXDefault(
    route.alternates.map((a) => ({ lang: a.lang, href: a.href })),
    loc,
  );
  const isHome = route.outDir === "en" || route.outDir === "pl";
  const isAbout = route.outDir === "en/about" || route.outDir === "pl/o-nas";
  const isComparison = route.outDir === "en/comparison" || route.outDir === "pl/comparison";
  const isQuote = route.outDir === "en/quote" || route.outDir === "pl/quote";
  const isLegal = route.outDir.includes("terms") || route.outDir.includes("privacy");
  const priority = isHome
    ? "1.0"
    : isAbout
      ? "0.8"
      : isComparison
        ? "0.7"
        : isQuote
          ? "0.6"
          : isLegal
            ? "0.4"
            : "0.7";
  const changefreq = isHome ? "monthly" : isLegal ? "yearly" : "monthly";
  const articlePriority = route.isArticle ? "0.6" : priority;
  const articleChangefreq = route.isArticle ? "yearly" : changefreq;
  sitemapEntries.push(
    buildSitemapEntry(loc, alternates, articlePriority, articleChangefreq, route.lastmod ?? null),
  );
}

for (const cfg of spaMarketingRoutes) {
  const enLoc = `${SITE}/${cfg.pathEn}`;
  const plLoc = `${SITE}/${cfg.pathPl}`;
  const alternates = [
    { lang: "en", href: enLoc },
    { lang: "pl", href: plLoc },
    { lang: "x-default", href: enLoc },
  ];
  sitemapEntries.push(buildSitemapEntry(enLoc, alternates, cfg.priority, cfg.changefreq, null));
  sitemapEntries.push(buildSitemapEntry(plLoc, alternates, cfg.priority, cfg.changefreq, null));
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${sitemapEntries.join("\n\n")}

</urlset>
`;

writeFileSync(join(distDir, "sitemap.xml"), sitemapXml);
console.log("  ✓ sitemap.xml");

console.log("Prerender complete.");
