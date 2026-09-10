import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const { t } = useLanguage();

  useSeoMeta({
    title: "Terms and Conditions | Forsa Design",
    description:
      "Read the terms and conditions for Forsa Design services, including project agreements, payment terms, intellectual property, and liability.",
    ogTitle: "Terms and Conditions | Forsa Design",
    ogDescription:
      "Read the terms and conditions for Forsa Design services, including project agreements, payment terms, intellectual property, and liability.",
    twitterTitle: "Terms and Conditions | Forsa Design",
    twitterDescription:
      "Read the terms and conditions for Forsa Design services, including project agreements, payment terms, intellectual property, and liability.",
    ogLocale: "en_GB",
    canonical: buildHref("/en/terms"),
    alternates: [
      { lang: "en", href: buildHref("/en/terms") },
      { lang: "pl", href: buildHref("/pl/terms") },
    ],
  });

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="border-b border-border/10 py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/en/"
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            {t("nav.home")}
          </a>
          <span className="text-sm font-medium text-primary">Forsa Design</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-foreground/60 font-light">
            Forsa Design, Banff, Scotland, United Kingdom
          </p>
          <p className="text-foreground/50 font-light text-sm mt-2">Last Updated: September 2026</p>
        </div>

        <div className="space-y-8 text-foreground/80 font-light leading-relaxed">
          {sections.map((section) => (
            <Section key={section.number} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface SectionData {
  number: string;
  title: string;
  body: string;
  subsections?: Array<{ title: string; body: string }>;
}

function Section({ section }: { section: SectionData }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-white mb-4">
        {section.number}. {section.title}
      </h2>
      <p className="mb-4">{section.body}</p>
      {section.subsections &&
        section.subsections.map((sub, i) => (
          <div key={i} className="ml-4 mb-4">
            <h3 className="font-semibold text-white mb-2">
              {section.number}.{i + 1} {sub.title}
            </h3>
            <p>{sub.body}</p>
          </div>
        ))}
    </div>
  );
}

const sections: SectionData[] = [
  {
    number: "1",
    title: "Introduction",
    body: `These Terms and Conditions apply to the Forsa Design website and to services supplied by Forsa Design. Forsa Design is a one-person business based in Banff, Scotland. I provide custom website development, B2B catalogues and ordering systems, custom web tools, API integrations and optional ongoing support. These Terms are intended for services supplied to businesses, organisations and individuals acting for purposes relating to their trade, business or profession. If I agree to provide services to a consumer, any statutory consumer rights that cannot legally be excluded or restricted will continue to apply. A quotation, project agreement or other written agreement may contain terms specific to a particular project. If a project-specific agreement conflicts with these general Terms, the project-specific agreement takes precedence for that project.`,
  },
  {
    number: "2",
    title: "Website Use",
    body: `The content of the Forsa Design website is provided for general information about my business and services. I make reasonable efforts to keep website information accurate and current, but project requirements, technical possibilities, third-party services and pricing may change. Information published on the website does not by itself constitute a binding quotation, contractual commitment or guarantee. The binding scope, price, deliverables and other project-specific terms are those stated in an accepted quotation, project agreement or other written agreement.`,
  },
  {
    number: "3",
    title: "Services",
    body: `Services may include custom websites, B2B catalogues and ordering systems, custom web tools, API integrations, and optional post-launch technical support and further development. The exact services and deliverables included in a project are defined in the relevant quotation or project agreement. A feature, integration or service mentioned on the website is not automatically included in a project unless it is included in the agreed scope.`,
  },
  {
    number: "4",
    title: "Quotations and Project Acceptance",
    body: `Each project is assessed and quoted individually. A quotation may specify the project scope, deliverables, estimated timescale, price, payment schedule, client responsibilities, revision allowance, third-party services and support arrangements. Unless the quotation states otherwise, a quotation is valid for 30 days from its date of issue. A project becomes binding when the quotation or project agreement is accepted in the manner stated in that document. Before a contract is formed, I may decline a project enquiry. If the requested scope changes before work begins, I may issue a revised quotation.`,
  },
  {
    number: "5",
    title: "Deposits and Payments",
    body: `The deposit and payment schedule for a project are stated in the quotation or project agreement. Where a 25% deposit is specified, work will normally begin after that deposit has been received and after the information or access required to start the project has been provided. Remaining payments may be due at agreed milestones, on completion or according to another payment schedule stated in the project documentation. Unless a different payment period is stated on the invoice or agreed in writing, invoices are due within 14 days. Payments may be processed through Stripe or another agreed payment method. Third-party payment services operate under their own terms and policies.`,
  },
  {
    number: "6",
    title: "Late Payment",
    body: `If an invoice is not paid when due, I may, where appropriate, suspend work, postpone delivery, withhold unpaid deliverables, revise the project schedule, suspend agreed support, terminate the project in accordance with these Terms and the project agreement, or take reasonable steps to recover the outstanding amount. Any statutory rights relating to late payment of commercial debts remain unaffected.`,
  },
  {
    number: "7",
    title: "Project Timescales",
    body: `Timescales shown before the project has been fully scoped are estimates only. A typical business website may take around nine weeks. A custom B2B catalogue or ordering system may take approximately 6-10 weeks once the specification has been agreed and the required content and integration access are available. More complex projects are assessed individually. A completion date is binding only where it has been expressly agreed in writing.`,
  },
  {
    number: "8",
    title: "Client Responsibilities and Delays",
    body: `The client is responsible for providing the information, materials, decisions, approvals and access reasonably required to complete the project. Depending on the project, this may include text and images, branding materials, product information, technical documentation, access credentials, API documentation or credentials, feedback and approvals. Delays in providing required information, content, access, feedback or decisions may affect the project schedule. Changes to the agreed scope may also affect the price and completion date. I am not responsible for delay caused solely by the client's failure to provide required information, materials, access, feedback or approvals on time.`,
  },
  {
    number: "9",
    title: "Client Content and Materials",
    body: `The client is responsible for ensuring that materials supplied for use in a project are accurate and that the client has the necessary rights or permissions to use them. This includes, where applicable, text, photographs, graphics, video, audio, logos, trademarks, product information, technical documents, software, code, databases and other supplied data. The client remains responsible for the factual accuracy and legality of information supplied for publication, including product specifications, prices, regulatory claims, business information and contact details.`,
  },
  {
    number: "10",
    title: "Scope Changes and Additional Work",
    body: `Work outside the agreed project scope is not automatically included in the original project price. If additional work is requested, I will assess its effect on the project and, where appropriate, provide additional pricing or a revised quotation before carrying out that work. A significant change may require a revised quotation, revised timescale, separate project phase or separate agreement. I may decline a requested change where it is not technically feasible or is outside the type of work I provide.`,
  },
  {
    number: "11",
    title: "Revisions",
    body: `The number and scope of revisions included in a project are defined in the quotation or project agreement. A revision within the agreed scope is different from a request for new functionality or a substantial change to the agreed requirements. Work beyond the agreed revision allowance or project scope will be priced separately unless another charging method has already been agreed in writing. There is no automatic fixed hourly charge unless one has been specifically agreed.`,
  },
  {
    number: "12",
    title: "Testing and Technical Standards",
    body: `I review and test the work according to the agreed project scope. Depending on the project, this may include responsive behaviour, mobile usability, accessibility, SSL/TLS configuration, performance, technical SEO, forms, supported browser behaviour, API integrations and security-related configuration. Testing reduces risk but cannot guarantee that a website, system or third-party service will remain completely free from defects, vulnerabilities, outages or future compatibility issues. Performance, security and availability may also depend on hosting providers, browsers, devices, APIs and other third-party infrastructure outside my direct control.`,
  },
  {
    number: "13",
    title: "Third-Party Services",
    body: `A project may rely on third-party services such as hosting, domain registration, payment processing, email delivery, APIs, analytics services, content delivery networks, cloud services, external software or platforms. Third-party services operate under their own terms, pricing, availability and technical limitations. Unless expressly included in the quotation, third-party fees are separate from Forsa Design project fees. I am not responsible for outages, price changes, discontinued services, API changes, security incidents or other failures caused by third-party providers outside my reasonable control. Where ongoing support has been agreed, I may assist with third-party service issues within the agreed support scope.`,
  },
  {
    number: "14",
    title: "API Integrations",
    body: `API integrations are assessed individually. Whether an integration can be implemented depends on factors including availability of the external API, documentation, authentication requirements, permissions and access, technical limitations, usage limits, compatibility, and third-party pricing or service restrictions. I do not guarantee that an integration can be completed where the external provider does not provide sufficient access, documentation or technical capability.`,
  },
  {
    number: "15",
    title: "Hosting",
    body: `Hosting arrangements and responsibilities depend on the individual project and any separate hosting or support agreement. Where hosting is supplied by a third-party provider, its availability, infrastructure and service levels are governed by that provider's terms unless I have expressly agreed otherwise in writing. I cannot guarantee uninterrupted availability of a third-party hosting service.`,
  },
  {
    number: "16",
    title: "Support After Launch",
    body: `Ongoing support is optional and is not automatically included indefinitely after project delivery. Support may include technical maintenance, updates, fixes, monitoring, hosting assistance, agreed changes and further development. The scope and price of support are agreed individually according to the project and the client's requirements. I do not require a client to purchase an ongoing support package unless such an arrangement has been specifically agreed. Support involving third-party services remains subject to the availability and limitations of those providers.`,
  },
  {
    number: "17",
    title: "Intellectual Property",
    body: `The original branding, text, graphics, design content and other original material belonging to the Forsa Design website remain the property of Forsa Design unless otherwise stated. Third-party software, libraries, fonts, images, APIs, platforms and other third-party materials remain subject to their respective licences and ownership rights. Nothing in these Terms transfers ownership of third-party intellectual property.`,
    subsections: [
      {
        title: "Project Deliverables",
        body: `Ownership and usage rights for project deliverables are defined by the quotation or project agreement. Unless otherwise agreed in writing, rights in custom work created specifically for the client transfer after full payment of the relevant project invoices, subject to third-party licences, open-source licences, external platform terms, pre-existing Forsa Design materials, reusable components and tools, and any other rights identified in the project agreement. Unpaid deliverables may be withheld until the relevant amounts have been paid.`,
      },
      {
        title: "Pre-Existing and Reusable Materials",
        body: `Reusable components, libraries, development workflows, patterns, methods and tools created before a project or developed for general reuse do not automatically become the client's exclusive property. I do not deliberately introduce vendor lock-in. However, a project may depend on third-party platforms, services or technologies that have their own technical or contractual limitations.`,
      },
    ],
  },
  {
    number: "18",
    title: "Portfolio and Case Studies",
    body: `I may ask a client for permission to present completed work as part of the Forsa Design portfolio or a case study. Confidential information, testimonials and materials requiring permission will not be treated as available for promotional use merely because the project has been completed. Any specific confidentiality or portfolio arrangements may be agreed in writing.`,
  },
  {
    number: "19",
    title: "Data Protection and Privacy",
    body: `I process personal data in accordance with applicable UK data protection law and the Forsa Design Privacy Policy. The respective data protection roles of Forsa Design, the client and third-party providers depend on the circumstances of the project and the processing involved. Where required, appropriate data processing terms may be agreed separately. The client remains responsible for the legal and regulatory obligations applicable to its own business and its use of the delivered website or system. Depending on the project, these may include privacy notices, lawful processing of personal data, cookie consent, marketing communications, customer data, retention requirements and industry-specific obligations. Forsa Design does not provide legal advice.`,
  },
  {
    number: "20",
    title: "Security",
    body: `I take reasonable technical and organisational measures appropriate to the project and agreed scope. No internet-connected website or system can be guaranteed to be completely secure. Security may be affected by third-party providers, hosting infrastructure, client configuration, passwords and credentials, user behaviour, external services and changes made after delivery. Any ongoing security or maintenance responsibilities after launch depend on the agreed support or hosting arrangements.`,
  },
  {
    number: "21",
    title: "Cancellation and Termination",
    body: `Either party may cancel or terminate a project in accordance with the project agreement, these Terms and applicable law. If the client cancels after work has begun, I may invoice for work completed up to the cancellation date, completed project stages and non-recoverable third-party costs incurred for the project. The treatment of any deposit is governed by the accepted quotation, project agreement and applicable law.`,
    subsections: [
      {
        title: "Suspension or Termination by Forsa Design",
        body: `I may suspend or terminate work where there is serious or continuing non-payment, a material breach of the project agreement or these Terms, a request to use the project or services unlawfully, or repeated failure to provide information, access or decisions required to continue the work. Where reasonably possible, I will notify the client before suspension or termination.`,
      },
      {
        title: "Effect of Termination",
        body: `Termination does not remove the obligation to pay valid outstanding invoices or amounts due for work already completed. The handling of unfinished work, project files and client materials depends on the project agreement, the work completed and amounts paid.`,
      },
    ],
  },
  {
    number: "22",
    title: "Liability",
    body: `Nothing in these Terms excludes or limits liability where it would be unlawful to do so. I am not responsible for losses caused solely by failures of third-party services or infrastructure outside my reasonable control. I do not guarantee that a website, system or other deliverable will produce a particular level of sales, enquiries, revenue, search engine ranking or commercial performance. Any project-specific limitation of liability may be stated in the relevant project agreement.`,
  },
  {
    number: "23",
    title: "Events Outside Reasonable Control",
    body: `I am not responsible for a delay or failure caused by circumstances outside my reasonable control. This may include failures or interruptions affecting third-party infrastructure or services required for the project. Where such an event materially affects delivery, I will make reasonable efforts to inform the client and continue the project when reasonably possible.`,
  },
  {
    number: "24",
    title: "Governing Law",
    body: `These Terms and any project agreement governed by them are subject to the law of Scotland. Any dispute will be dealt with in accordance with applicable Scottish law and the jurisdiction applicable to the agreement. Where practical, both parties should first attempt to resolve a dispute through direct communication. Nothing in these Terms removes any legal right or remedy that cannot lawfully be excluded.`,
  },
  {
    number: "25",
    title: "Changes to These Terms",
    body: `I may update these Terms to reflect changes to Forsa Design services, business practices or legal requirements. The latest version will be published on the Forsa Design website with its revision date. A later change to these website Terms does not automatically change the agreed scope, price or contractual terms of an existing project unless the parties agree otherwise or applicable law requires it.`,
  },
  {
    number: "26",
    title: "Severability",
    body: `If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions continue to apply to the extent permitted by law.`,
  },
  {
    number: "27",
    title: "Entire Agreement",
    body: `For a particular project, the contractual documents may include the accepted quotation, project agreement, agreed scope, agreed written change requests, invoices, and these Terms and Conditions. Where a specific project agreement expressly differs from these general Terms, the project-specific agreement takes precedence for that project.`,
  },
  {
    number: "28",
    title: "Contact",
    body: `For questions or notices concerning these Terms and Conditions: Forsa Design, Banff, Scotland, United Kingdom. Email: hello@forsadesign.co.uk. Phone: 07770 110735.`,
  },
];
