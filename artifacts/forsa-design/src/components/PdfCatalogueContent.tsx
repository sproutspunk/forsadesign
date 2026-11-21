import React from "react";

const stages = [
  {
    number: "01",
    title: "Review your source catalogue",
    body: "We assess your existing PDF files, part-number conventions, product variants and the quality of the available specifications. We also identify what cannot be reliably extracted.",
  },
  {
    number: "02",
    title: "Structure and verify the product data",
    body: "Product records can include manufacturer references, dimensions, materials, applications and supporting documents. Technical details and compatibility claims require validation against your approved sources.",
  },
  {
    number: "03",
    title: "Build the buying journey",
    body: "Customers can search and filter products, compare relevant specifications and put items into a structured quotation enquiry. Trade ordering and integrations are assessed as optional project requirements.",
  },
  {
    number: "04",
    title: "Plan updates and ownership",
    body: "We agree how catalogue changes, discontinued references and new product data will be maintained. Your business remains responsible for approving the published technical information.",
  },
];

const questions = [
  {
    question: "Do we have to replace our existing website?",
    answer: "Not necessarily. An online catalogue may be developed as a dedicated part of your existing website or as a separate system. Integration depends on your current platform and access.",
  },
  {
    question: "Can customers search by part number or machine model?",
    answer: "Part-number and specification search can be included when the underlying data is suitable. Machine-to-tool compatibility is only shown as verified when supported by reliable manufacturer documentation.",
  },
  {
    question: "Can you add online payments and live stock?",
    answer: "These are possible project options, not standard assumptions. We would need to assess pricing rules, stock data, fulfilment, your existing systems and available integrations.",
  },
  {
    question: "Will the PDF be converted automatically without checking?",
    answer: "No. Extraction is the starting point. Tables, product variants and safety-critical specifications may need manual review before anything goes online.",
  },
];

export default function PdfCatalogueContent() {
  return (
    <article className="container mx-auto max-w-6xl px-6">
      <header className="max-w-4xl mb-16">
        <p className="text-primary text-sm font-semibold tracking-wide mb-5">
          FROM PDF TO ONLINE SALES
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
          Turn your PDF product catalogue into a searchable B2B sales tool
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6">
          Your catalogue contains the products. Your customers still need to find the right part,
          check the specification and ask for a price.
        </p>
        <p className="text-foreground/75 text-lg leading-relaxed mb-8">
          Forsa Design develops bespoke online product catalogues for UK manufacturers,
          engineering suppliers and industrial distributors. We organise approved product data
          into practical search, filtering and quotation workflows, rather than publishing a
          collection of PDF download links.
        </p>
        <a
          className="inline-block rounded-sm bg-primary px-6 py-4 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          href="#enquiry"
        >
          Discuss your catalogue
        </a>
      </header>

      <section className="mb-20" aria-labelledby="pdf-catalogue-fit">
        <h2 id="pdf-catalogue-fit" className="font-serif text-3xl md:text-4xl text-white mb-7">
          Built for technical products
        </h2>
        <p className="text-foreground/75 leading-relaxed max-w-3xl mb-7">
          Particularly relevant when buyers must work with product codes, dimensions,
          specifications and multiple catalogue versions before making an enquiry.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Find the right reference", "Search by product number, name and verified technical attributes."],
            ["Prepare a useful enquiry", "Collect selected items and the information needed to quote accurately."],
            ["Keep information current", "Define a controlled method for replacing obsolete references and updating specifications."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-lg border border-border border-t-primary bg-card p-7">
              <h3 className="font-serif text-2xl text-white mb-4">{title}</h3>
              <p className="text-foreground/75 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20" aria-labelledby="pdf-catalogue-process">
        <h2 id="pdf-catalogue-process" className="font-serif text-3xl md:text-4xl text-white mb-9">
          From documents to an enquiry-ready catalogue
        </h2>
        <ol className="grid gap-8 md:grid-cols-2">
          {stages.map((stage) => (
            <li key={stage.number} className="border-l-2 border-primary/50 pl-6">
              <span className="text-primary text-sm" aria-hidden="true">{stage.number}</span>
              <h3 className="font-serif text-2xl text-white mt-2 mb-3">{stage.title}</h3>
              <p className="text-foreground/75 leading-relaxed">{stage.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-20 rounded-lg border border-primary/25 bg-card p-8 md:p-10">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
          Catalogue first. Online ordering when it makes commercial sense.
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-6">
          A searchable catalogue with a quotation basket can be the right starting point for
          complex B2B products. Where the data and business rules support it, the scope may
          also include customer accounts, trade pricing, stock feeds and online ordering.
        </p>
        <p className="text-foreground/75 leading-relaxed">
          The solution is specified around your product range, customers and existing systems.
          Pricing and delivery are quoted after reviewing the source data and requirements.
        </p>
      </section>

      <section className="mb-20" aria-labelledby="pdf-catalogue-faq">
        <h2 id="pdf-catalogue-faq" className="font-serif text-3xl md:text-4xl text-white mb-8">
          Common questions
        </h2>
        <dl className="grid gap-7 max-w-4xl">
          {questions.map(({ question, answer }) => (
            <div key={question} className="border-b border-border pb-6">
              <dt className="font-semibold text-white text-lg mb-2">{question}</dt>
              <dd className="text-foreground/75 leading-relaxed">{answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-20 max-w-4xl">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">
          Related work
        </h2>
        <p className="text-foreground/75 leading-relaxed mb-6">
          Our existing projects illustrate related capabilities, including client quotation
          workflows and configurable product enquiries. They are not presented as completed
          PDF catalogue conversion projects.
        </p>
        <div className="flex flex-wrap gap-5">
          <a className="text-primary underline underline-offset-4" href="/en/case-studies/linklang/">
            LinkLang client portal
          </a>
          <a className="text-primary underline underline-offset-4" href="/en/case-studies/dachsystema/">
            Dach Systema 3D configurator
          </a>
        </div>
      </section>

      <section id="enquiry" className="mb-16 border-t border-primary/30 pt-12 scroll-mt-28">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">
          Have a technical catalogue to make easier to buy from?
        </h2>
        <p className="text-foreground/75 max-w-3xl leading-relaxed mb-7">
          Send us the public link to your catalogue, the approximate number of product
          references and how customers currently request prices. We will assess the
          requirements before proposing an implementation.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="/en/quote/"
            className="inline-block rounded-sm bg-primary px-6 py-4 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Request a project quotation
          </a>
          <a className="text-primary underline underline-offset-4" href="mailto:hello@forsadesign.co.uk?subject=PDF%20catalogue%20enquiry">
            Email your catalogue link
          </a>
        </div>
        <p className="text-foreground/60 text-sm leading-relaxed mt-6">
          Please share catalogue links rather than confidential files at this stage.
          We will confirm the scope and information-handling arrangements first.
        </p>
      </section>
    </article>
  );
}
