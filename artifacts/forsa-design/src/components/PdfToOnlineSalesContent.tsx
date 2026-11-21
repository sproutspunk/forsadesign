export const pdfToOnlineSales = {
  path: "/en/services/pdf-to-online-sales/",
  seoTitle: "PDF to Online Product Catalogue | UK B2B Sales | Forsa Design",
  seoDescription:
    "Convert PDF product catalogues into searchable B2B websites with part-number lookup, technical filters and quotation enquiries. For UK manufacturers and industrial distributors.",
  title: "Turn your PDF product catalogue into a useful online sales tool.",
  lead:
    "Your buyers should be able to find the right product without searching through hundreds of PDF pages. Forsa Design builds bespoke searchable catalogues and quotation workflows for UK manufacturers and industrial distributors.",
};

export const pdfToOnlineSalesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "PDF to Online Sales: B2B Product Catalogue Development",
  description: pdfToOnlineSales.seoDescription,
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

const workflow = [
  {
    title: "Review the product information",
    detail:
      "Assess your existing PDFs, manufacturer references, variants and technical attributes. Identify gaps before development starts.",
  },
  {
    title: "Structure and verify the catalogue",
    detail:
      "Organise part numbers, specification tables, categories and product documents. Critical information must be checked against approved manufacturer data.",
  },
  {
    title: "Build a buyer-friendly search",
    detail:
      "Create suitable product pages, part-number lookup, technical filters and a clear path from product selection to an enquiry.",
  },
  {
    title: "Connect the quotation process",
    detail:
      "Depending on the brief, add enquiry baskets, quotation workflows or trade ordering, then define how prices and product data are maintained.",
  },
];

const suitableFor = [
  "Industrial machinery, parts and tooling",
  "Engineering components and technical spares",
  "Equipment manufacturers with large PDF catalogues",
  "Specialist UK distributors with complex product ranges",
];

const frequentlyAsked = [
  {
    question: "Do we need a new website?",
    answer:
      "Not necessarily. The catalogue can be scoped as part of an existing site or as a separate system. The right approach depends on the current platform and access to product data.",
  },
  {
    question: "Can buyers search by machine model or part number?",
    answer:
      "Part-number search can be designed around your product records. Machine-model matching is possible only where reliable compatibility data exists and has been checked.",
  },
  {
    question: "Can customers buy online rather than request a quote?",
    answer:
      "Potentially. Online ordering requires agreement on pricing, account access, stock information, tax, delivery and payment processes. For many technical ranges, a structured quotation enquiry is a better first step.",
  },
  {
    question: "Can a PDF be converted without checking its content?",
    answer:
      "Extraction can speed up data preparation, but it does not establish that technical specifications, compatibility claims or prices are correct. Publication requires appropriate checks and the right to use the data.",
  },
  {
    question: "What do you need for an initial discussion?",
    answer:
      "A public catalogue link or sample PDF, an approximate product count and a short description of how your customers currently find products and request prices. Do not send confidential files through a public link.",
  },
];

export default function PdfToOnlineSalesContent() {
  return (
    <article className="container mx-auto max-w-6xl px-6">
      <header className="max-w-4xl pb-16">
        <a
          href="/en/services/"
          className="mb-8 inline-block py-2 text-sm font-medium text-primary hover:underline"
        >
          Back to services
        </a>
        <p className="mb-5 text-sm font-medium uppercase tracking-widest text-primary">
          From PDF to Online Sales · United Kingdom
        </p>
        <h1 className="mb-8 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
          {pdfToOnlineSales.title}
        </h1>
        <p className="mb-8 max-w-3xl text-xl leading-relaxed text-foreground/85 md:text-2xl">
          {pdfToOnlineSales.lead}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/en/quote/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-4 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Discuss your catalogue
          </a>
          <a
            href="mailto:hello@forsadesign.co.uk?subject=PDF%20Catalogue%20Enquiry"
            className="inline-flex items-center justify-center border border-primary/50 px-7 py-4 font-semibold text-primary hover:bg-card"
          >
            Email a catalogue link
          </a>
        </div>
      </header>

      <section className="border-t border-border py-14" aria-labelledby="pdf-fit-heading">
        <h2 id="pdf-fit-heading" className="mb-5 font-serif text-3xl font-bold text-white">
          Built for technical buying decisions
        </h2>
        <p className="mb-7 max-w-3xl text-lg leading-relaxed text-foreground/75">
          A searchable catalogue helps buyers work with product references and specifications
          instead of hunting through separate documents. The features are determined by
          your range, available data and existing sales process.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {suitableFor.map((item) => (
            <li key={item} className="rounded-md border border-border bg-card px-5 py-4 text-foreground/85">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="py-14" aria-labelledby="pdf-process-heading">
        <h2 id="pdf-process-heading" className="mb-8 font-serif text-3xl font-bold text-white">
          From technical PDF to customer enquiry
        </h2>
        <ol className="grid gap-6 md:grid-cols-2">
          {workflow.map((step, index) => (
            <li key={step.title} className="rounded-md border border-primary/20 bg-card p-7">
              <p className="mb-4 text-sm font-semibold text-primary">
                Step {index + 1}
              </p>
              <h3 className="mb-3 font-serif text-2xl text-white">{step.title}</h3>
              <p className="leading-relaxed text-foreground/75">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="py-14" aria-labelledby="pdf-approach-heading">
        <h2 id="pdf-approach-heading" className="mb-5 font-serif text-3xl font-bold text-white">
          Fit the system to the way you sell
        </h2>
        <p className="mb-5 max-w-3xl leading-relaxed text-foreground/75">
          Part-number lookup, technical filters, quotation baskets, account-based access
          and integrations can be evaluated individually. A catalogue does not need a
          shopping checkout where technical review or negotiated pricing is essential.
        </p>
        <p className="max-w-3xl leading-relaxed text-foreground/75">
          Forsa Design combines bespoke web development with its founder’s background
          in international industrial machinery trading, supplier sourcing and B2B negotiation.
          Existing related work includes a client enquiry and quotation workflow in{" "}
          <a href="/en/case-studies/linklang/" className="text-primary underline underline-offset-4">
            LinkLang
          </a>{" "}
          and a 3D configuration concept in{" "}
          <a href="/en/case-studies/dachsystema/" className="text-primary underline underline-offset-4">
            Dach Systema
          </a>.
          These are examples of related capabilities, not claims of completed PDF conversion projects.
        </p>
      </section>

      <section className="py-14" aria-labelledby="pdf-faq-heading">
        <h2 id="pdf-faq-heading" className="mb-8 font-serif text-3xl font-bold text-white">
          Questions before you start
        </h2>
        <div className="max-w-4xl divide-y divide-border border-y border-border">
          {frequentlyAsked.map((item) => (
            <section key={item.question} className="py-6">
              <h3 className="mb-3 text-xl font-semibold text-white">{item.question}</h3>
              <p className="leading-relaxed text-foreground/75">{item.answer}</p>
            </section>
          ))}
        </div>
      </section>

      <section
        className="my-14 rounded-md border border-primary/30 bg-card p-8 md:p-12"
        aria-labelledby="pdf-cta-heading"
      >
        <p className="mb-3 text-sm font-medium text-primary">A practical first step</p>
        <h2 id="pdf-cta-heading" className="mb-5 font-serif text-3xl font-bold text-white">
          Show me the catalogue your buyers use today.
        </h2>
        <p className="mb-8 max-w-2xl leading-relaxed text-foreground/80">
          Send the public catalogue link and explain how customers currently request a quote.
          We can then discuss the data, functionality and scope required for a proposal.
        </p>
        <a
          href="/en/quote/"
          className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-4 font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Request a project quotation
        </a>
      </section>
    </article>
  );
}
