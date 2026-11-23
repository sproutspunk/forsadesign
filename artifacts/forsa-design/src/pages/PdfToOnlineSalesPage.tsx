import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useJsonLd, useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PdfToOnlineSalesContent, {
  pdfToOnlineSales,
  pdfToOnlineSalesSchema,
} from "@/components/PdfToOnlineSalesContent";

export default function PdfToOnlineSalesPage() {
  const { syncLanguage } = useLanguage();

  useEffect(() => syncLanguage("en"), [syncLanguage]);

  useSeoMeta({
    title: pdfToOnlineSales.seoTitle,
    description: pdfToOnlineSales.seoDescription,
    ogTitle: pdfToOnlineSales.seoTitle,
    ogDescription: pdfToOnlineSales.seoDescription,
    twitterTitle: pdfToOnlineSales.seoTitle,
    twitterDescription: pdfToOnlineSales.seoDescription,
    ogLocale: "en_GB",
    canonical: buildHref(pdfToOnlineSales.path),
    alternates: [{ lang: "en", href: buildHref(pdfToOnlineSales.path) }],
  });
  useJsonLd(pdfToOnlineSalesSchema, "pdf-to-online-sales-service");

  return (
    <>
      <Header />
      <main id="main-content" className="pb-20 pt-40 md:pt-48">
        <PdfToOnlineSalesContent />
      </main>
      <Footer />
    </>
  );
}
