import { useLanguage } from "@/contexts/LanguageContext";
import { useSeoMeta, buildHref } from "@/hooks/useSeoMeta";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const { t } = useLanguage();

  useSeoMeta({
    title: "Terms and Conditions | Forsa Design",
    description:
      "Read the terms and conditions for Forsa Design web design and development services, including project agreements, payment terms, intellectual property, and liability.",
    ogTitle: "Terms and Conditions | Forsa Design",
    ogDescription:
      "Read the terms and conditions for Forsa Design web design and development services, including project agreements, payment terms, intellectual property, and liability.",
    twitterTitle: "Terms and Conditions | Forsa Design",
    twitterDescription:
      "Read the terms and conditions for Forsa Design web design and development services, including project agreements, payment terms, intellectual property, and liability.",
    ogLocale: "en_US",
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
          <p className="text-foreground/60 font-light">Forsa Design - Art &amp; Web Design</p>
          <p className="text-foreground/50 font-light text-sm mt-2">Last Updated: June 2026</p>
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
    body: `Welcome to Forsa Design ("we," "us," "our," or "Company"). These Terms and Conditions ("Terms") govern your access to our website and your engagement with our services. By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree with any part of these terms, please do not use our website or services. These Terms apply to all services provided by Forsa Design, including but not limited to website design, web development, e-commerce solutions, custom systems, and ongoing support.`,
  },
  {
    number: "2",
    title: "Website Use",
    body: `The content of this website is provided for general information purposes only and may be updated or changed without notice. We make reasonable efforts to ensure the information on this website is accurate; however, we do not guarantee its completeness, accuracy, or suitability for any particular purpose. We reserve the right to restrict or deny access to any individual or organisation without providing reasons.`,
  },
  {
    number: "3",
    title: "Intellectual Property Rights",
    body: `Unless otherwise agreed in writing, all intellectual property rights relating to this website, including but not limited to text, graphics, branding, design elements, layouts, code, and content, belong exclusively to Forsa Design. You may view and print pages from this website for personal, non-commercial use only. Any other reproduction, distribution, or use of website content is strictly prohibited without prior written consent from Forsa Design.`,
    subsections: [
      {
        title: "Project Deliverables",
        body: `Ownership of custom project deliverables (including websites, designs, code, and other materials) created specifically for a client shall be transferred to the client upon receipt of 100% payment of the total project value. Until full payment is received, all intellectual property rights, including source code, design files, databases, and all associated materials, remain the exclusive property of Forsa Design. Forsa Design retains the right to use project deliverables as portfolio examples and case studies, with appropriate anonymisation if requested by the client.`,
      },
      {
        title: "Pre-Existing Materials",
        body: `Forsa Design retains all intellectual property rights to pre-existing templates, frameworks, libraries, components, processes, and methodologies developed prior to or independently of client projects.`,
      },
    ],
  },
  {
    number: "4",
    title: "Service Enquiries and Quotations",
    body: `Any quotation, estimate, proposal, or scope of work provided by Forsa Design is non-binding and indicative only until formally accepted by the client and confirmed in a signed project agreement or contract. Quotations are valid for 30 days from the date of issue. After 30 days, quotations must be refreshed and may be subject to revised pricing. We reserve the right to decline any project enquiry or proposal at our sole discretion, without providing reasons.`,
  },
  {
    number: "5",
    title: "Deposits, Payments, and Payment Terms",
    body: `A non-refundable deposit equal to 25% of the total project value is required before work commences. This deposit shall be held as payment toward the final invoice. The deposit must be received and cleared before any work begins.`,
    subsections: [
      {
        title: "Payment Schedule",
        body: `The remaining 75% balance shall be paid according to the schedule specified in the individual project agreement. Standard payment terms are: remaining balance upon project completion, or staged payments at agreed milestones, or as invoiced at project completion.`,
      },
      {
        title: "Payment Method and Due Date",
        body: `All invoices are due within 14 days of issue unless alternative terms are specified in writing. Payment must be made by bank transfer or via agreed payment method.`,
      },
      {
        title: "Late Payment",
        body: `Failure to make payments when due may result in immediate suspension of work until outstanding amounts are settled in full. If payment remains outstanding for more than 30 days beyond the due date, Forsa Design reserves the right to: terminate the project immediately, invoice for all work completed to date, restrict or disable access to the website or deliverables, and pursue recovery of outstanding amounts through legal means.`,
      },
      {
        title: "Ownership and Access",
        body: `The client shall acquire exclusive ownership rights to the completed website and all deliverables only upon receipt of 100% payment of the total project value. Until full payment is made, Forsa Design retains all intellectual property rights and may restrict or disable access to the website, source code, and all associated materials.`,
      },
      {
        title: "Refund Policy",
        body: `The 25% deposit is non-refundable under any circumstances, including project cancellation by the client. If the client cancels the project after work has begun, the client shall pay for all work completed to the point of cancellation, in addition to any non-recoverable costs incurred by Forsa Design.`,
      },
    ],
  },
  {
    number: "6",
    title: "Project Timelines and Milestones",
    body: `Any estimated completion dates, timelines, or delivery schedules provided before a formal project agreement is signed are indicative only and should not be considered guaranteed. Project timelines become firm only upon execution of a formal written project agreement. All project timelines, milestones, deliverables, revision allowances, completion dates, and specific requirements shall be documented in a formal project agreement signed by both parties.`,
    subsections: [
      {
        title: "Client-Caused Delays",
        body: `Forsa Design shall not be responsible for delays caused by the client, including delays in providing content, copy, images, branding materials, or other information required to progress the project; delays in providing feedback, approvals, or decision-making; changes to project scope or requirements after work has begun; provision of inaccurate or incomplete information; or unavailability of client stakeholders for consultation or review. Any delays caused by the client shall extend the project timeline accordingly, and shall not result in penalties or liability for Forsa Design.`,
      },
      {
        title: "Force Majeure",
        body: `Forsa Design shall not be liable for delays or non-performance caused by circumstances beyond its reasonable control, including but not limited to natural disasters, pandemics, government actions, infrastructure failures, or other unforeseen events.`,
      },
    ],
  },
  {
    number: "7",
    title: "Scope of Work and Change Requests",
    body: `The scope of work shall be defined in the individual project agreement. Work shall be limited to the agreed scope unless otherwise authorised in writing. The number of revision rounds, feedback cycles, and revisions included in the project fee shall be specified in the project agreement.`,
    subsections: [
      {
        title: "Out-of-Scope Changes",
        body: `Any changes, additions, or revisions requested outside the agreed scope or beyond the included revision allowances shall be subject to additional fees. Change requests must be submitted in writing and shall be quoted separately before work commences. Additional work will not proceed without written approval and agreement on revised fees. Additional revision rounds are charged at \u00A375 per hour or as quoted.`,
      },
      {
        title: "Scope Creep Prevention",
        body: `If requested changes significantly alter the project scope or timeline, Forsa Design reserves the right to: provide a revised quotation, extend the project timeline, request a supplementary deposit, or decline the requested changes.`,
      },
    ],
  },
  {
    number: "8",
    title: "Client Responsibilities",
    body: `The client is responsible for providing accurate, complete, timely, and properly formatted information, content, materials, images, and branding assets necessary for the completion of the project. The client shall ensure all provided materials are of sufficient quality and resolution for professional use.`,
    subsections: [
      {
        title: "Intellectual Property Warranty",
        body: `The client warrants that all materials, content, images, text, audio, video, and code supplied to Forsa Design are the client's original work or the client has obtained all necessary permissions and licenses. No supplied materials infringe the intellectual property rights, copyright, trademark, privacy, or other rights of any third party.`,
      },
      {
        title: "Indemnification",
        body: `The client shall indemnify and hold harmless Forsa Design from any and all third-party claims, damages, costs, or losses arising from the client's materials, content, or information, the client's use of the deliverables, the client's violation of these Terms or applicable law, or any breach of the client's warranties.`,
      },
      {
        title: "Content Accuracy",
        body: `Forsa Design is not responsible for the accuracy, legality, or appropriateness of content provided by the client. The client is solely responsible for ensuring all content complies with applicable law and does not infringe third-party rights.`,
      },
      {
        title: "Timely Feedback and Decisions",
        body: `The client shall provide timely feedback, approvals, and decisions to prevent project delays. Forsa Design shall not be liable for delays caused by slow client response.`,
      },
    ],
  },
  {
    number: "9",
    title: "Revision Allowances and Additional Work",
    body: `The number of revision rounds, review cycles, and revision hours included in the project fee shall be explicitly stated in the project agreement. Unless stated otherwise, "revisions" include changes to design, layout, copy, functionality, or other elements within the original scope. Revisions beyond the agreed allowance shall be charged at \u00A375 per hour or as separately quoted. If a revision request constitutes a substantial change to the project scope, deliverables, or timeline, Forsa Design reserves the right to treat it as a separate change request subject to additional fees.`,
  },
  {
    number: "10",
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, Forsa Design shall not be liable for any: indirect, incidental, special, or consequential damages; loss of profits, revenue, business opportunities, goodwill, or reputation; loss of data, business interruption, or system failure; or damages arising from your use of or inability to use our website or services. This limitation applies regardless of the cause of action and whether such liability is based on contract, tort, strict liability, or any other legal theory.`,
    subsections: [
      {
        title: "Total Liability Cap",
        body: `In no event shall Forsa Design's total liability arising out of or relating to these Terms or our services exceed the amount paid by the client in the 12 months preceding the claim or \u00A3500, whichever is greater.`,
      },
      {
        title: "Exceptions",
        body: `Nothing in these Terms shall exclude or limit Forsa Design's liability for: death or personal injury caused by negligence; fraud, fraudulent misrepresentation, or wilful misconduct; or any liability that cannot legally be excluded or limited under applicable Scottish law.`,
      },
    ],
  },
  {
    number: "11",
    title: "Third-Party Services and Hosting",
    body: `Projects may include or rely upon third-party services, platforms, hosting providers, plugins, software, tools, or content delivery networks. These may include (but are not limited to): hosting providers, domain registrars, SSL certificate providers, email services, payment gateways, analytics tools, CDNs, and third-party plugins.`,
    subsections: [
      {
        title: "Forsa Design Responsibility",
        body: `Forsa Design accepts no responsibility for: outages, service interruptions, or downtime caused by third-party providers; changes to terms, features, pricing, or availability from third-party services; security breaches, data loss, or vulnerabilities in third-party platforms; or poor performance, slow loading times, or technical issues caused by third-party services.`,
      },
      {
        title: "Client Responsibility",
        body: `Unless explicitly stated otherwise in the project agreement, the client shall be responsible for: selecting and contracting with hosting providers, registering and maintaining domain names, maintaining SSL/TLS certificates, managing email services and backup solutions, and paying all hosting, domain, and third-party service fees.`,
      },
      {
        title: "Service Level Agreements",
        body: `Forsa Design does not provide or guarantee any service level agreement (SLA) for third-party services. Uptime, availability, and performance depend entirely on third-party providers.`,
      },
    ],
  },
  {
    number: "12",
    title: "Website Availability and Maintenance",
    body: `We do not guarantee that this website will be continuously available, uninterrupted, error-free, or secure. Access to the website may be suspended temporarily for: scheduled maintenance and updates, emergency repairs, security patches, server upgrades, or circumstances beyond our reasonable control. Forsa Design shall not be liable for any downtime, data loss, or inability to access the website, except where caused directly by Forsa Design's negligence.`,
  },
  {
    number: "13",
    title: "Intellectual Property and Portfolio Use",
    body: `Forsa Design retains the right to: display the website as a portfolio example, feature the project in case studies, marketing materials, or testimonials, and use anonymised descriptions and screenshots for promotional purposes. If the client requests anonymity, this must be agreed in writing at the time of project commencement. Forsa Design may request permission to use client testimonials, feedback, or reviews for marketing purposes. Use of testimonials requires prior written consent.`,
  },
  {
    number: "14",
    title: "Data Protection and Privacy",
    body: `Both parties shall comply with the General Data Protection Regulation (GDPR), the Data Protection Act 2018, and all applicable data protection laws. The client is responsible for: obtaining all necessary consents from end-users for data collection and processing, ensuring the website's privacy policy complies with GDPR, maintaining appropriate security measures for personal data, and notifying Forsa Design of any data breaches involving the website.`,
    subsections: [
      {
        title: "Forsa Design Responsibility",
        body: `Forsa Design shall implement reasonable security measures to protect data hosted on client websites. However, Forsa Design accepts no responsibility for data breaches caused by third-party hosting providers or client-caused security vulnerabilities.`,
      },
      {
        title: "Data Processing Agreement",
        body: `If personal data processing is involved, a Data Processing Addendum (DPA) shall be executed as part of the project agreement.`,
      },
    ],
  },
  {
    number: "15",
    title: "Termination and Cancellation",
    body: `If the client wishes to cancel the project after the deposit has been paid: the 25% deposit is non-refundable under all circumstances; the client shall pay for all work completed to the point of cancellation, plus any non-recoverable costs incurred by Forsa Design; and the client shall not acquire ownership rights to incomplete work until 100% of all work completed has been paid for.`,
    subsections: [
      {
        title: "Termination by Forsa Design",
        body: `Forsa Design reserves the right to terminate the project immediately if: payment is outstanding for more than 30 days beyond the due date, the client materially breaches these Terms or the project agreement, the client's conduct is abusive, threatening, or unreasonable, or the client provides false, misleading, or incomplete information. Upon termination by Forsa Design, Forsa Design shall invoice for all work completed to date, the client must pay all outstanding invoices within 7 days, and the client shall not acquire ownership rights to deliverables until all amounts are paid in full.`,
      },
      {
        title: "Effect of Termination",
        body: `Upon termination, all work in progress ceases immediately. Forsa Design shall delete or return all client materials, provided all outstanding payments have been made.`,
      },
    ],
  },
  {
    number: "16",
    title: "Governing Law and Dispute Resolution",
    body: `These Terms and Conditions shall be governed by and interpreted in accordance with the laws of Scotland, without regard to its conflict of law principles. Any dispute arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts of Scotland. Both parties consent to the jurisdiction of Scottish courts. Before initiating legal proceedings, both parties agree to attempt to resolve disputes through good faith negotiation. If negotiation fails, disputes shall be resolved through Scottish courts.`,
  },
  {
    number: "17",
    title: "Changes to These Terms",
    body: `Forsa Design reserves the right to update, amend, or modify these Terms and Conditions at any time at its sole discretion. Changes become effective upon publication on this website. Continued use of our website or services constitutes acceptance of updated Terms. For existing projects, the Terms in effect at the time of project commencement shall govern that project.`,
  },
  {
    number: "18",
    title: "Severability",
    body: `If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision shall be severed, and the remaining provisions shall continue in full force and effect.`,
  },
  {
    number: "19",
    title: "Entire Agreement",
    body: `These Terms and Conditions, together with any project agreement, quotation, and invoice, constitute the entire agreement between the parties concerning Forsa Design's services. Any prior discussions, representations, or agreements not documented in writing are superseded by these Terms.`,
  },
  {
    number: "20",
    title: "Contact Information",
    body: `For questions, disputes, or notices regarding these Terms and Conditions, please contact: Forsa Design, Art & Web Design, Banff, Scotland. Email: hello@forsadesign.co.uk. Phone: 07770110735.`,
  },
];
