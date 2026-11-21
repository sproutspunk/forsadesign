import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PdfCatalogueContent from "@/components/PdfCatalogueContent";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, useJsonLd, buildHref } from "@/hooks/useSeoMeta";
import { pdfCataloguePath, pdfCatalogueSeo, pdfCatalogueSchema } from "@/data/pdfCatalogue";

export default function PdfCataloguePage() {
  const { syncLanguage } = useLanguage();

  useEffect(() => syncLanguage("en"), [syncLanguage]);

  useSeoMeta({
    title: pdfCatalogueSeo.title,
    description: pdfCatalogueSeo.description,
    ogTitle: pdfCatalogueSeo.title,
    ogDescription: pdfCatalogueSeo.description,
    twitterTitle: pdfCatalogueSeo.title,
    twitterDescription: pdfCatalogueSeo.description,
    ogLocale: "en_GB",
    canonical: buildHref(pdfCataloguePath),
    alternates: [{ lang: "en", href: buildHref(pdfCataloguePath) }],
  });
  useJsonLd(pdfCatalogueSchema, "pdf-catalogue-service");

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Header />
      <main id="main-content" className="pt-36 md:pt-44 pb-20">
        <PdfCatalogueContent />
      </main>
      <Footer />
    </div>
  );
}
