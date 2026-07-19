import { useEffect } from "react";

const SITE_BASE = "https://forsadesign.co.uk";

export interface SeoMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  ogLocale: string;
  canonical: string;
  alternates?: { lang: string; href: string }[];
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function clearAlternates() {
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
}

function addAlternate(lang: string, href: string) {
  const el = document.createElement("link");
  el.setAttribute("rel", "alternate");
  el.setAttribute("hreflang", lang);
  el.setAttribute("href", href);
  document.head.appendChild(el);
}

export function buildHref(path: string) {
  return `${SITE_BASE}${path}`;
}

export function useJsonLd(schema: Record<string, unknown> | null, id: string) {
  useEffect(() => {
    const attr = "data-json-ld-id";
    if (!schema) {
      document.querySelector<HTMLScriptElement>(`script[${attr}="${id}"]`)?.remove();
      return;
    }
    let el = document.querySelector<HTMLScriptElement>(`script[${attr}="${id}"]`);
    if (!el) {
      el = document.createElement("script");
      el.setAttribute("type", "application/ld+json");
      el.setAttribute(attr, id);
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      document.querySelector<HTMLScriptElement>(`script[${attr}="${id}"]`)?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(schema), id]);
}

export function useSeoMeta(meta: SeoMeta) {
  const alternatesKey = JSON.stringify(meta.alternates);
  useEffect(() => {
    document.title = meta.title;

    setMetaName("description", meta.description);

    setMetaProperty("og:title", meta.ogTitle);
    setMetaProperty("og:description", meta.ogDescription);
    setMetaProperty("og:locale", meta.ogLocale);

    setMetaName("twitter:title", meta.twitterTitle);
    setMetaName("twitter:description", meta.twitterDescription);

    setCanonical(meta.canonical);

    clearAlternates();
    if (meta.alternates) {
      for (const alt of meta.alternates) {
        addAlternate(alt.lang, alt.href);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    meta.title,
    meta.description,
    meta.ogTitle,
    meta.ogDescription,
    meta.twitterTitle,
    meta.twitterDescription,
    meta.ogLocale,
    meta.canonical,
    alternatesKey,
  ]);
}
