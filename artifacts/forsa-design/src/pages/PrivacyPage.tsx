import { useLanguage } from "@/contexts/LanguageContext";
import { openCookiePreferences } from "@/components/CookieConsent";
import { ArrowLeft, Settings2 } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <div className="border-b border-border/10 py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
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
            Privacy Policy
          </h1>
          <p className="text-foreground/60 font-light">Forsa Design – Art &amp; Web Design</p>
          <p className="text-foreground/50 font-light text-sm mt-2">Last Updated: June 2026</p>
          <button
            onClick={openCookiePreferences}
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary/80 hover:text-primary transition-colors font-light"
          >
            <Settings2 size={15} />
            {t("cookies.managePreferences")}
          </button>
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
    body: `Forsa Design ("we," "us," "our," or "Company") is committed to protecting your privacy and ensuring you have a positive experience on our website and when engaging with our services. This Privacy Policy explains how we collect, use, disclose, and process your personal data in accordance with the General Data Protection Regulation (GDPR), the Data Protection Act 2018, and all applicable data protection laws. By accessing our website or engaging our services, you consent to the practices described in this Privacy Policy. If you do not agree with our privacy practices, please do not use our website or services.`,
  },
  {
    number: "2",
    title: "Definitions",
    body: `"Personal Data" means any information relating to an identified or identifiable natural person. "Processing" means any operation performed on Personal Data, such as collection, recording, organisation, storage, use, transmission, or deletion. "Data Subject" means the individual to whom Personal Data relates. "Controller" means the entity that determines the purposes and means of Processing. Forsa Design is the Controller for this website.`,
  },
  {
    number: "3",
    title: "Controller and Data Protection Officer",
    body: `Forsa Design, Art & Web Design, Banff, Scotland is the Data Controller. For all data protection enquiries and to exercise your rights, please contact the Data Protection Officer at Forsa Design.`,
  },
  {
    number: "4",
    title: "Personal Data We Collect",
    body: `We collect Personal Data that you voluntarily provide, including: contact form submissions (name, email, phone, company, message), service enquiry and quotation request details (business information, project description, budget, timeline), client project data (full name, billing address, payment information processed by third-party providers, project materials), communication records (email correspondence, chat, call recordings with consent), and account or service registration details (login credentials, preferences, payment history).`,
    subsections: [
      {
        title: "Data Collected Automatically",
        body: `We collect data automatically when you visit our website: IP address, browser type and version, operating system, referring website, pages visited, time spent, click-through data, search queries, device type, and identifiers. We also use cookies and tracking technologies (session cookies, persistent cookies, web beacons, local storage) and analytics data via Google Analytics (aggregated behaviour, traffic sources, user journey, conversion data).`,
      },
      {
        title: "Data from Third Parties",
        body: `We may receive Personal Data from your employer (if they engage us), referral sources or partners, publicly available sources, and third-party service providers.`,
      },
    ],
  },
  {
    number: "5",
    title: "Legal Basis for Processing",
    body: `We process your Personal Data only where we have a lawful basis under GDPR.`,
    subsections: [
      {
        title: "Consent",
        body: `You have explicitly consented to Processing for marketing emails, newsletters, non-essential cookies, testimonial use, call recordings, and optional data fields. You may withdraw consent at any time by unsubscribing or contacting us.`,
      },
      {
        title: "Contract Performance",
        body: `Processing is necessary to perform a contract with you or to take steps at your request prior to entering into a contract. Applied to client name, email, phone, billing address, project materials, payment information, and service delivery data.`,
      },
      {
        title: "Legal Obligation",
        body: `Processing is necessary for compliance with applicable law, including tax records, accounting data, fraud prevention, and public safety.`,
      },
      {
        title: "Legitimate Interest",
        body: `Processing is necessary for legitimate interests pursued by the Company, including website security, fraud prevention, analytics, customer service improvements, marketing (with legitimate interest assessment), and business operations.`,
      },
      {
        title: "Vital Interests",
        body: `Processing is necessary to protect vital interests (e.g., life, safety), applied to emergency situations and data breaches affecting your safety.`,
      },
    ],
  },
  {
    number: "6",
    title: "How We Use Your Personal Data",
    body: `We use your Personal Data for service delivery (quotations, project work, payments, support, troubleshooting), communication and customer service (responding to enquiries, support, transactional emails, service updates, feedback), marketing and promotion (with your consent, featuring projects as portfolio examples, testimonials, and marketing materials), website analytics and improvement (usage patterns, technical issues, A/B testing, aggregate statistics), security and fraud prevention, legal compliance, and business operations.`,
  },
  {
    number: "7",
    title: "Data Retention",
    body: `We retain Personal Data only as long as necessary to achieve the purposes for which it was collected, unless a longer retention period is required by law.`,
    subsections: [
      {
        title: "Retention Periods",
        body: `Contact Form Enquiries: 2 years (unless converted to a client). Project Clients: duration of project + 7 years. Marketing Lists: until you unsubscribe, plus 2 years evidence of unsubscription. Website Analytics: 26 months (Google Analytics default). Email Communications: 2 years or duration of business relationship, whichever is longer. Payment Records: 7 years (UK tax retention). Call Recordings: 1 year (if applicable). Server Logs and IP Data: 90 days.`,
      },
      {
        title: "Deletion",
        body: `When Personal Data is no longer necessary, we securely delete or anonymise it. You may request deletion at any time, subject to legal retention requirements.`,
      },
    ],
  },
  {
    number: "8",
    title: "Sharing and Disclosure of Personal Data",
    body: `We only share your Personal Data with third parties if you have consented or it is necessary for service delivery.`,
    subsections: [
      {
        title: "Service Providers and Third Parties",
        body: `We may disclose Personal Data to hosting providers, payment processors (Stripe, PayPal, etc.), email service providers (if you consented to marketing), analytics providers (Google Analytics), communication tools, professional services (accountants, lawyers, consultants), and cloud storage for backup and document storage. All service providers are contractually bound to process data only on our instructions and to maintain confidentiality.`,
      },
      {
        title: "Legal Obligations",
        body: `We may disclose Personal Data if required by law, court order, or lawful authority request.`,
      },
      {
        title: "Business Transfer",
        body: `If Forsa Design is acquired, merged, or restructured, Personal Data may be transferred as part of that transaction. We will notify you of any such change and your rights.`,
      },
      {
        title: "No Sale of Data",
        body: `We do not sell, rent, or trade your Personal Data to third parties for marketing purposes.`,
      },
    ],
  },
  {
    number: "9",
    title: "International Data Transfers",
    body: `Forsa Design processes and stores Personal Data primarily within the United Kingdom and European Union. If Personal Data is transferred outside the UK or EU, we ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses, adequacy decisions) and that the transfer is necessary for service delivery. You have the right to object to transfers outside the UK/EU.`,
  },
  {
    number: "10",
    title: "Cookies and Tracking Technologies",
    body: `Cookies are small text files stored on your device that allow websites to recognise and remember you. We use essential cookies (security, session management, not requiring consent), analytics cookies (Google Analytics, requiring consent), preference cookies (theme, language, not requiring consent), and marketing cookies (targeted advertising, requiring consent). Third-party service providers may set their own cookies. When you first visit our website, we display a cookie consent banner. You may accept all, reject non-essential, customise preferences, or change consent at any time. You can disable cookies in your browser settings, but this may affect functionality.`,
  },
  {
    number: "11",
    title: "Your Rights Under GDPR",
    body: `As a Data Subject, you have the following rights:`,
    subsections: [
      {
        title: "Right of Access",
        body: `You have the right to request access to your Personal Data and information about how we process it. We will provide this within 30 days at no cost.`,
      },
      {
        title: "Right to Rectification",
        body: `You have the right to correct inaccurate or incomplete Personal Data.`,
      },
      {
        title: `Right to Erasure ("Right to Be Forgotten")`,
        body: `You have the right to request deletion of your Personal Data, except where processing is necessary for legal obligations, contract performance, legitimate interests override your rights, or data is essential for fraud prevention or security.`,
      },
      {
        title: "Right to Restrict Processing",
        body: `You have the right to request that we limit how we process your data while you resolve a dispute or exercise other rights.`,
      },
      {
        title: "Right to Data Portability",
        body: `You have the right to receive a copy of your Personal Data in a structured, commonly-used, machine-readable format and to transmit it to another controller.`,
      },
      {
        title: "Right to Object",
        body: `You have the right to object to Processing based on legitimate interest, including for marketing purposes. We will cease Processing unless we have compelling legitimate reasons.`,
      },
      {
        title: "Right to Lodge a Complaint",
        body: `You have the right to lodge a complaint with the relevant data protection authority. UK Information Commissioner's Office (ICO): www.ico.org.uk. Other EU Member State authorities: contact your local data protection authority.`,
      },
      {
        title: "Automated Decision-Making",
        body: `We do not use automated decision-making or profiling for decisions that significantly affect you.`,
      },
    ],
  },
  {
    number: "12",
    title: "Children's Privacy",
    body: `Our website and services are not directed to children under 13 years old. We do not knowingly collect Personal Data from children under 13. If we become aware that a child has provided Personal Data, we will delete it immediately. For children aged 13–18, parental consent may be required depending on jurisdiction. If you are a parent or guardian and believe your child's data has been collected, please contact us immediately.`,
  },
  {
    number: "13",
    title: "Data Security",
    body: `We implement reasonable technical, administrative, and organisational security measures to protect Personal Data: SSL/TLS encryption for data in transit, encrypted data storage, restricted access to personal data, regular security assessments, firewalls and intrusion detection, and secure password policies with multi-factor authentication.`,
    subsections: [
      {
        title: "Limitations",
        body: `While we implement appropriate security measures, no method of transmission over the internet or electronic storage is completely secure. We cannot guarantee absolute security. You are responsible for keeping your passwords confidential and securing your access credentials.`,
      },
      {
        title: "Data Breach Notification",
        body: `If we discover a data breach that poses a risk to your rights and freedoms, we will notify the relevant data protection authority within 72 hours (where required), notify affected individuals without undue delay, and provide information about the breach and steps you can take to protect yourself.`,
      },
    ],
  },
  {
    number: "14",
    title: "Third-Party Links and Services",
    body: `Our website may contain links to third-party websites, applications, and services. This Privacy Policy applies only to our website and services. We are not responsible for the privacy practices of third-party websites. Third-party services we use (Google Analytics, payment processors, hosting providers) have their own privacy policies.`,
  },
  {
    number: "15",
    title: "Business Partners and Client Data Processing",
    body: `If you are a Forsa Design client, we process Personal Data on your behalf for website hosting, maintenance, and operation. As the Data Controller, you are responsible for obtaining necessary consents from end-users, maintaining a privacy policy for your website, and complying with GDPR and applicable data protection laws. As a Data Processor, we process data only according to your instructions. For client projects involving significant Personal Data processing, a separate Data Processing Addendum (DPA) will be executed.`,
  },
  {
    number: "16",
    title: "Retention and Deletion Requests",
    body: `You may request deletion of your Personal Data by contacting us at hello@forsadesign.co.uk. We will respond to deletion requests within 30 days, except where legal retention requirements apply, processing is necessary for contract performance, or legitimate interests override your request. If you have an account or profile with us, you may request complete account deletion. This will remove associated Personal Data, except where retention is legally required.`,
  },
  {
    number: "17",
    title: "Marketing Communications and Opt-Out",
    body: `We may send marketing emails, newsletters, or promotional materials only if you have consented. You may unsubscribe at any time by clicking the "Unsubscribe" link in any email, contacting us directly, or updating your preferences in your account. We will honour unsubscribe requests within 10 business days. Even if you unsubscribe from marketing, we will continue to send transactional emails (invoices, service updates, account notifications) as necessary.`,
  },
  {
    number: "18",
    title: "Changes to This Privacy Policy",
    body: `We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or other factors. Last Updated: June 2026. Effective Date of Changes: updated Privacy Policies are effective upon publication on this website. We will notify you of material changes by email (if you have provided an email address) or by posting a notice on this website. Continued use of our website or services following changes constitutes acceptance of the updated Privacy Policy.`,
  },
  {
    number: "19",
    title: "Contact Us",
    body: `For questions, concerns, or to exercise your rights under GDPR, please contact: Forsa Design, Art & Web Design, Banff, Scotland. Email: hello@forsadesign.co.uk. Phone: 07770110735. Response Time: we will respond to all privacy enquiries within 30 days. Complaints: if you are not satisfied with our response, you may lodge a complaint with the Information Commissioner's Office (ICO) at www.ico.org.uk.`,
  },
  {
    number: "20",
    title: "Legal Basis Summary Table",
    body: `Contact form data: Consent + Contract (service enquiries). Project client data: Contract (service delivery). Email address: Consent (marketing communications). Website usage data: Legitimate interest (analytics, improvement). IP address, device info: Legitimate interest (security, fraud prevention). Payment information: Contract + Legal obligation (payment processing). Testimonials: Consent (marketing). Call recordings: Consent (service improvement). Cookies: Consent (essential cookies exempt) for website functionality and analytics.`,
  },
];
