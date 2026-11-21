export const pdfCataloguePath = "/en/services/pdf-to-online-sales/";

export const pdfCatalogueSeo = {
  title: "From PDF to Online Sales | Industrial B2B Catalogues | Forsa Design",
  description:
    "Turn technical product PDFs into searchable B2B catalogues with part-number filters and quotation enquiries. Bespoke development for UK manufacturers and distributors.",
};

export const pdfCatalogueSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "From PDF to Online Sales",
  serviceType: "Technical product catalogue digitisation and B2B quotation systems",
  description: pdfCatalogueSeo.description,
  url: "https://forsadesign.co.uk/en/services/pdf-to-online-sales/",
  provider: {
    "@type": "Organization",
    name: "Forsa Design",
    url: "https://forsadesign.co.uk/",
  },
  areaServed: {
    "@type": "Country",
    name: "United Kingdom",
  },
};
