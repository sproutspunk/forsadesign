/**
 * Build-time prerender script.
 *
 * Runs after `vite build` and writes a route-specific index.html for each
 * public URL so that social crawlers and non-JS agents receive the correct
 * <title>, meta description, Open Graph tags, Twitter tags, canonical, and
 * hreflang alternates without needing to execute JavaScript.
 *
 * Each generated file is written to dist/public/<route>/index.html so that
 * static file servers (Vite preview, CDN, nginx) serve it directly when
 * the path is requested.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist/public");
const SITE = "https://forsadesign.co.uk";

/** Encode plain text for safe insertion into an HTML attribute value. */
function he(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** Encode plain text for safe insertion between HTML tags (e.g. <title>). */
function ht(str) {
  return str.replace(/&/g, "&amp;");
}

/**
 * Patch the <head> of an HTML string with route-specific metadata.
 *
 * @param {string} html       - Source HTML (the built index.html).
 * @param {object} meta       - Route metadata to inject.
 * @returns {string}          - Patched HTML string.
 */
function patch(html, meta) {
  let out = html;

  // <html lang="…">
  out = out.replace(/(<html\b[^>]*\blang=")[^"]*(")/s, `$1${meta.lang}$2`);

  // <title>
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${ht(meta.title)}</title>`);

  // <meta name="description" content="…">
  out = out.replace(/(name="description"\s+content=")[^"]*(")/s, `$1${he(meta.desc)}$2`);

  // <meta property="og:title" content="…">
  out = out.replace(/(property="og:title"\s+content=")[^"]*(")/s, `$1${he(meta.ogTitle)}$2`);

  // <meta property="og:description" content="…">
  out = out.replace(/(property="og:description"\s+content=")[^"]*(")/s, `$1${he(meta.desc)}$2`);

  // <meta property="og:locale" content="…">
  out = out.replace(/(property="og:locale"\s+content=")[^"]*(")/s, `$1${meta.locale}$2`);

  // <meta property="og:url" content="…"> — update if present
  out = out.replace(/(property="og:url"\s+content=")[^"]*(")/s, `$1${meta.canonical}$2`);

  // <meta name="twitter:title" content="…">
  out = out.replace(/(name="twitter:title"\s+content=")[^"]*(")/s, `$1${he(meta.ogTitle)}$2`);

  // <meta name="twitter:description" content="…">
  out = out.replace(/(name="twitter:description"\s+content=")[^"]*(")/s, `$1${he(meta.desc)}$2`);

  // <link rel="canonical" href="…">
  out = out.replace(/(rel="canonical"\s+href=")[^"]*(")/s, `$1${meta.canonical}$2`);

  // Remove all existing hreflang alternate links
  out = out.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href="[^"]*"\s*\/>/gs, "");

  // Insert new alternates immediately after the canonical link
  const altLines = meta.alternates
    .map((a) => `    <link rel="alternate" hreflang="${a.lang}" href="${a.href}" />`)
    .join("\n");
  out = out.replace(/(rel="canonical"[^>]*\/>)/, `$1\n${altLines}`);

  return out;
}

/** Route definitions — one entry per public URL. */
const routes = [
  {
    outDir: "en",
    lang: "en",
    title: "Forsa Design | Comprehensive Website Design & Creation",
    desc: "Forsa Design is a boutique web agency in Banff, Scotland. We build responsive websites, e-commerce platforms, and custom web applications — from concept to launch and beyond.",
    ogTitle: "Forsa Design | Web Design & Creation",
    locale: "en_US",
    canonical: `${SITE}/en/`,
    alternates: [
      { lang: "en", href: `${SITE}/en/` },
      { lang: "pl", href: `${SITE}/pl/` },
      { lang: "x-default", href: `${SITE}/en/` },
    ],
  },
  {
    outDir: "pl",
    lang: "pl",
    title: "Forsa Design | Kompleksowy Web Design i Tworzenie Stron",
    desc: "Forsa Design to agencja internetowa z Banff w Szkocji. Tworzymy responsywne strony, sklepy e-commerce i dedykowane aplikacje webowe — od koncepcji do uruchomienia.",
    ogTitle: "Forsa Design | Web Design i Tworzenie Stron",
    locale: "pl_PL",
    canonical: `${SITE}/pl/`,
    alternates: [
      { lang: "en", href: `${SITE}/en/` },
      { lang: "pl", href: `${SITE}/pl/` },
      { lang: "x-default", href: `${SITE}/en/` },
    ],
  },
  {
    outDir: "en/terms",
    lang: "en",
    title: "Terms and Conditions | Forsa Design",
    desc: "Read the terms and conditions for Forsa Design web design and development services, including project agreements, payment terms, intellectual property, and liability.",
    ogTitle: "Terms and Conditions | Forsa Design",
    locale: "en_US",
    canonical: `${SITE}/en/terms`,
    alternates: [
      { lang: "en", href: `${SITE}/en/terms` },
      { lang: "pl", href: `${SITE}/pl/terms` },
    ],
  },
  {
    outDir: "pl/terms",
    lang: "pl",
    title: "Regulamin i Warunki \u015awiadczenia Us\u0142ug | Forsa Design",
    desc: "Zapoznaj si\u0119 z regulaminem i warunkami \u015bwiadczenia us\u0142ug Forsa Design, w tym zasadami realizacji projekt\u00f3w, warunkami p\u0142atno\u015bci, w\u0142asno\u015bci\u0105 intelektualn\u0105 i odpowiedzialno\u015bci\u0105.",
    ogTitle: "Regulamin i Warunki \u015awiadczenia Us\u0142ug | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/terms`,
    alternates: [
      { lang: "en", href: `${SITE}/en/terms` },
      { lang: "pl", href: `${SITE}/pl/terms` },
    ],
  },
  {
    outDir: "en/privacy",
    lang: "en",
    title: "Privacy Policy | Forsa Design",
    desc: "Read Forsa Design\u2019s privacy policy to understand how we collect, use, and protect your personal data in compliance with UK GDPR and applicable data protection law.",
    ogTitle: "Privacy Policy | Forsa Design",
    locale: "en_US",
    canonical: `${SITE}/en/privacy`,
    alternates: [
      { lang: "en", href: `${SITE}/en/privacy` },
      { lang: "pl", href: `${SITE}/pl/privacy` },
    ],
  },
  {
    outDir: "pl/privacy",
    lang: "pl",
    title: "Polityka Prywatno\u015bci | Forsa Design",
    desc: "Zapoznaj si\u0119 z polityk\u0105 prywatno\u015bci Forsa Design i dowiedz si\u0119, jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe zgodnie z UK GDPR i przepisami o ochronie danych.",
    ogTitle: "Polityka Prywatno\u015bci | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/privacy`,
    alternates: [
      { lang: "en", href: `${SITE}/en/privacy` },
      { lang: "pl", href: `${SITE}/pl/privacy` },
    ],
  },
  // Legacy duplicate routes — canonical points to the preferred /en/ versions.
  // Non-JS crawlers that land on /terms or /privacy receive the correct canonical
  // so search engines consolidate authority on the /en/* URLs.
  {
    outDir: "terms",
    lang: "en",
    title: "Terms and Conditions | Forsa Design",
    desc: "Read the terms and conditions for Forsa Design web design and development services, including project agreements, payment terms, intellectual property, and liability.",
    ogTitle: "Terms and Conditions | Forsa Design",
    locale: "en_US",
    canonical: `${SITE}/en/terms`,
    alternates: [
      { lang: "en", href: `${SITE}/en/terms` },
      { lang: "pl", href: `${SITE}/pl/terms` },
    ],
  },
  {
    outDir: "privacy",
    lang: "en",
    title: "Privacy Policy | Forsa Design",
    desc: "Read Forsa Design\u2019s privacy policy to understand how we collect, use, and protect your personal data in compliance with UK GDPR and applicable data protection law.",
    ogTitle: "Privacy Policy | Forsa Design",
    locale: "en_US",
    canonical: `${SITE}/en/privacy`,
    alternates: [
      { lang: "en", href: `${SITE}/en/privacy` },
      { lang: "pl", href: `${SITE}/pl/privacy` },
    ],
  },
];

const template = readFileSync(join(distDir, "index.html"), "utf-8");
console.log("Prerendering public routes...");

for (const route of routes) {
  const html = patch(template, route);
  const outPath = join(distDir, route.outDir);
  mkdirSync(outPath, { recursive: true });
  writeFileSync(join(outPath, "index.html"), html);
  console.log(`  \u2713 /${route.outDir}/`);
}

console.log("Prerender complete.");
