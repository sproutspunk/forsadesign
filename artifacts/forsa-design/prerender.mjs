/**
 * Build-time prerender script.
 *
 * Runs after `vite build` and writes a route-specific index.html for each
 * public URL so that social crawlers and non-JS agents receive the correct
 * <title>, meta description, Open Graph tags, Twitter tags, canonical, and
 * hreflang alternates — AND the full visible page body — without needing to
 * execute JavaScript.
 *
 * Each generated file is written to dist/public/<route>/index.html so that
 * static file servers (Vite preview, CDN, nginx) serve it directly when
 * the path is requested.
 *
 * Body injection strategy:
 *   Static HTML is injected into <div id="root"> before the React bundle
 *   loads. When JavaScript runs, React's createRoot().render() replaces the
 *   static content with the hydrated tree — so users see the full interactive
 *   app, while AI crawlers and non-JS agents see the full page copy in the
 *   initial HTML response.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { articlesMeta } from "./src/data/articlesMeta.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "dist/public");
const SITE = "https://forsadesign.co.uk";

/** Encode plain text for safe insertion into an HTML attribute value. */
function he(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/**
 * Encode plain text for safe insertion between HTML tags.
 * Escapes &, <, and > so the text cannot break tag structure.
 */
function ht(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Render an array of legal-page sections as plain HTML.
 * Each section has: number, title, body, subsections[].
 */
function buildSectionsHtml(sections) {
  return sections
    .map((s) => {
      let html = `<div>\n<h2>${ht(s.number)}. ${ht(s.title)}</h2>\n<p>${ht(s.body)}</p>\n`;
      if (s.subsections) {
        s.subsections.forEach((sub, i) => {
          html += `<div>\n<h3>${ht(s.number)}.${i + 1} ${ht(sub.title)}</h3>\n<p>${ht(sub.body)}</p>\n</div>\n`;
        });
      }
      html += `</div>`;
      return html;
    })
    .join("\n");
}

/**
 * Patch the <head> of an HTML string with route-specific metadata, and inject
 * full static body HTML into <div id="root"> for crawler visibility.
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

  // Ensure logo preload is present for LCP optimisation on every prerendered page
  if (!out.includes('href="/logo-new-lg.webp"')) {
    out = out.replace(
      /(<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>)/,
      `$1\n    <link rel="preload" as="image" href="/logo-new-lg.webp" type="image/webp" />`,
    );
  }

  // Inject static body HTML into <div id="root"> so AI crawlers see page copy
  // without executing JavaScript. React will overwrite this on the client.
  if (meta.bodyHtml) {
    out = out.replace(/<div\s+id="root">\s*<\/div>/, `<div id="root">\n${meta.bodyHtml}\n</div>`);
  }

  return out;
}

// ---------------------------------------------------------------------------
// Route-level body HTML helpers
// ---------------------------------------------------------------------------

function buildHomepageBodyEn() {
  return `<header>
<nav><a href="/en/">Forsa Design</a> | <a href="/en/#services">Services</a> | <a href="/en/#portfolio">Portfolio</a> | <a href="/en/#about">About</a> | <a href="/en/#contact">Contact</a></nav>
</header>
<main>
<section id="home">
<h1>Comprehensive Website Design &amp; Creation</h1>
<p>Fast, custom-coded web platforms built to convert traffic into revenue.</p>
<p>We build custom web systems for corporate clients who want results, not jargon. No fuss. No agency fluff. Just clean, fast, solid code that makes your business grow.</p>
<a href="/en/#contact">Request a Quote</a>
</section>
<section id="services">
<h2>Our Services</h2>
<div>
<h3>Web Design &amp; Development</h3>
<p>No heavy, bloated templates. No pre-made page builders. We write clean code from scratch to ensure your site is secure, loads instantly, and gives you full control over your layout.</p>
</div>
<div>
<h3>E-commerce &amp; Checkout Optimization</h3>
<p>Scalable shops built to sell. From deep Shopify customization to custom checkout flows, we fix slow loading times and technical glitches that cause your customers to drop off before buying.</p>
</div>
<div>
<h3>Bespoke Web Applications</h3>
<p>Specialized web systems for complex industries. We handle database management, legacy software upgrades, and code optimization for businesses that cannot afford a single minute of downtime.</p>
</div>
</section>
<section id="portfolio">
<h2>Our Work</h2>
<p>Fast, custom-coded web platforms built to convert traffic into revenue.</p>
<div>
<h3>Love Sprouts — E-commerce Redesign</h3>
<p>Rebuilt a custom Shopify store from scratch. Cut page load times to 1.1s and stopped cart abandonment.</p>
</div>
<div>
<h3>Corporate &amp; Legal Platform</h3>
<p>High-security web systems built for conversions in the legal and financial sectors.</p>
</div>
<div>
<h3>Energy Infrastructure Web App</h3>
<p>Clean, custom framework integration and fast flows for enterprise scale clients.</p>
</div>
</section>
<section id="process">
<h2>How We Work</h2>
<div>
<h3>Technical Audit</h3>
<p>We look at your business data, find what slows down your current site, and plan a fast layout focused on your sales targets.</p>
</div>
<div>
<h3>Clean Coding</h3>
<p>No templates used. We build your frontend and backend from scratch, keeping the code clean, minimal, and secure.</p>
</div>
<div>
<h3>Stress-Testing</h3>
<p>We run security checks, cross-browser audits, and speed tests before your platform goes live to make sure it handles high traffic smoothly.</p>
</div>
<div>
<h3>Monitoring &amp; Updates</h3>
<p>We look after server scaling, security monitoring, and speed adjustments so your site never slows down as your company grows.</p>
</div>
</section>
<section id="about">
<h2>About Forsa Design</h2>
<p>We are an independent web development agency based in Scotland, building bespoke systems and websites for the corporate sector. We completely cut out corporate jargon, useless meetings, and artificially inflated management costs.</p>
<p>We design for revenue, not empty aesthetics. High-end visual design is our absolute baseline &#8211; we deliver fast, stable digital assets that actually drive conversions and protect your corporate data. We handle everything from clean code to server architecture. You collaborate directly with the engineers writing your project, eliminating miscommunication and guaranteeing technical precision from day one.</p>
</section>
<section id="contact">
<h2>Get In Touch</h2>
<p>Ready to start your next project? Let&#8217;s talk.</p>
<p>Email: <!--email_off--><a href="mailto:hello@forsadesign.co.uk">hello@forsadesign.co.uk</a><!--/email_off--></p>
<p>Phone: <a href="tel:07770110735">07770110735</a></p>
</section>
</main>
<footer>
<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
<p>&#169; 2026 Forsa Design. All rights reserved.</p>
<a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener noreferrer" aria-label="Measured with Google Analytics">
<img src="/analytics-badge.png" alt="Measured with Google Analytics" style="height:24px;opacity:0.8;">
</a>
</div>
<nav><a href="/en/terms">Terms &amp; Conditions</a> | <a href="/en/privacy">Privacy Policy</a></nav>
</footer>`;
}

function buildHomepageBodyPl() {
  return `<header>
<nav><a href="/pl/">Forsa Design</a> | <a href="/pl/#services">Us&#322;ugi</a> | <a href="/pl/#portfolio">Portfolio</a> | <a href="/pl/#about">O Nas</a> | <a href="/pl/#contact">Kontakt</a></nav>
</header>
<main>
<section id="home">
<h1>Kompleksowy Web Design i Tworzenie Stron</h1>
<p>Szybkie, pisane od zera strony i sklepy, stworzone by zamienia&#263; ruch w realny zysk.</p>
<p>Budujemy dedykowane systemy webowe dla firm, kt&#243;re oczekuj&#261; wynik&#243;w, a nie marketingu. Bez zb&#281;dnego &#380;argonu. Bez owijania w bawe&#322;n&#281;. Tylko czysty, szybki i stabilny kod, kt&#243;ry rozwija Tw&#243;j biznes.</p>
<a href="/pl/#contact">Pro&#347; o wycen&#281;</a>
</section>
<section id="services">
<h2>Nasze Us&#322;ugi</h2>
<div>
<h3>Projektowanie i Kodowanie Stron</h3>
<p>Zero ci&#281;&#380;kich, gotowych szablon&#243;w. Zero zamulaj&#261;cych wtyczek. Piszemy czysty kod od zera, &#380;eby Twoja strona by&#322;a bezpieczna, &#322;adowa&#322;a si&#281; natychmiast i dawa&#322;a Ci pe&#322;n&#261; kontrol&#281; nad wygl&#261;dem.</p>
</div>
<div>
<h3>Sklepy Internetowe i P&#322;atno&#347;ci</h3>
<p>Skalowalne sklepy nastawione na sprzeda&#380;. Od zaawansowanych modyfikacji Shopify po autorskie koszyki zakupowe. Likwidujemy b&#322;&#281;dy techniczne, przez kt&#243;re tracisz klient&#243;w na etapie p&#322;atno&#347;ci.</p>
</div>
<div>
<h3>Dedykowane Aplikacje i Systemy</h3>
<p>Z&#322;o&#380;one projekty oparte na bazach danych dla specjalistycznych bran&#380;. Tworzymy systemy od zera, od&#347;wie&#380;amy stary kod i dbamy o stabilno&#347;&#263; tam, gdzie liczy si&#281; bezwzgl&#281;dna precyzja i brak przestoj&#243;w.</p>
</div>
</section>
<section id="portfolio">
<h2>Nasze Prace</h2>
<p>Szybkie, pisane od zera strony i sklepy, stworzone by zamienia&#263; ruch w realny zysk.</p>
<div>
<h3>Love Sprouts &#8212; Przebudowa E-commerce</h3>
<p>Stworzenie nowej strony Shopify od zera. Skr&#243;cenie &#322;adowania do 1.1s i zatrzymanie porzuconych koszyk&#243;w.</p>
</div>
<div>
<h3>System Web dla Sektora Prawnego</h3>
<p>Bezpieczny i szybki system internetowy, zaprojektowany pod k&#261;tem konwersji dla bran&#380;y prawniczej.</p>
</div>
<div>
<h3>Platforma Cyfrowa dla Bran&#380;y Energetycznej</h3>
<p>Dedykowany, lekki framework i zoptymalizowana &#347;cie&#380;ka u&#380;ytkownika dla sektora enterprise.</p>
</div>
</section>
<section id="process">
<h2>Jak Pracujemy</h2>
<div>
<h3>Audyt Techniczny</h3>
<p>Analizujemy Tw&#243;j obecny system, znajdujemy elementy, kt&#243;re spowalniaj&#261; stron&#281;, i planujemy struktur&#281; kodu pod Twoje cele sprzeda&#380;owe.</p>
</div>
<div>
<h3>Pisanie Kodu</h3>
<p>&#379;adnych gotowc&#243;w. Kodujemy dedykowany frontend i stabilny backend. Dbamy o to, by kod by&#322; lekki, szybki i odporny na ataki.</p>
</div>
<div>
<h3>Testy Obci&#261;&#380;eniowe</h3>
<p>Przed uruchomieniem sprawdzamy szybko&#347;&#263;, przeprowadzamy audyt bezpiecze&#324;stwa i testujemy system pod du&#380;ym ruchem. Dostajesz produkt gotowy do walki.</p>
</div>
<div>
<h3>Wsparcie i Rozw&#243;j</h3>
<p>Reagujemy zanim co&#347; si&#281; zepsuje. Dbamy o serwery, bezpiecze&#324;stwo i regularne aktualizacje kodu, &#380;eby strona dzia&#322;a&#322;a idealnie podczas rozwoju firmy.</p>
</div>
</section>
<section id="about">
<h2>O Forsa Design</h2>
<p>Jeste&#347;my niezale&#380;n&#261; agencj&#261; web developmentu ze Szkocji, tworz&#261;c&#261; dedykowane systemy i strony dla sektora biznesowego. Ca&#322;kowicie rezygnujemy z korporacyjnego be&#322;kotu, bezu&#380;ytecznych spotka&#324; i sztucznie nadmuchanych koszt&#243;w obs&#322;ugi.</p>
<p>Projektujemy z my&#347;l&#261; o zysku, a nie o pustej estetyce. Dobry wygl&#261;d to absolutne minimum &#8211; my dostarczamy szybkie, stabilne narz&#281;dzie, kt&#243;re realnie sprzedaje i chroni dane Twojej firmy. Robimy wszystko: od czystego kodu po architektur&#281; serwera. Rozmawiasz bezpo&#347;rednio z programistami, kt&#243;rzy pisz&#261; Tw&#243;j projekt, co eliminuje b&#322;&#281;dy w ustaleniach i gwarantuje precyzj&#281; od samego pocz&#261;tku.</p>
</section>
<section id="contact">
<h2>Skontaktuj Si&#281; Z Nami</h2>
<p>Got&#243;w na nowy projekt? Porozmawiajmy.</p>
<p>Email: <!--email_off--><a href="mailto:hello@forsadesign.co.uk">hello@forsadesign.co.uk</a><!--/email_off--></p>
<p>Telefon: <a href="tel:07770110735">07770110735</a></p>
</section>
</main>
<footer>
<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
<p>&#169; 2026 Forsa Design. Wszystkie prawa zastrze&#380;one.</p>
<a href="https://marketingplatform.google.com/about/analytics/" target="_blank" rel="noopener noreferrer" aria-label="Measured with Google Analytics">
<img src="/analytics-badge.png" alt="Measured with Google Analytics" style="height:24px;opacity:0.8;">
</a>
</div>
<nav><a href="/pl/terms">Regulamin i Warunki</a> | <a href="/pl/privacy">Polityka Prywatno&#347;sci</a></nav>
</footer>`;
}

// ---------------------------------------------------------------------------
// Legal page section data (mirrors the React component data)
// ---------------------------------------------------------------------------

const termsEN = [
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

const termsPL = [
  {
    number: "1",
    title: "Wst\u0119p",
    body: `Witaj w Forsa Design (\u201CMy\u201D, \u201Cnas\u201D, \u201Cnaszych\u201D lub \u201CSp\u00f3\u0142ka\u201D). Niniejszy Regulamin i Warunki \u015awiadczenia Us\u0142ug (\u201CRegulaminu\u201D) reguluje dost\u0119p do naszej strony internetowej i zaanga\u017cowanie naszych us\u0142ug. Uzyskuj\u0105c dost\u0119p do naszej strony internetowej lub korzystaj\u0105c z naszych us\u0142ug, zgadzasz si\u0119 by\u0107 zwi\u0105zany niniejszym Regulaminem. Je\u015bli nie zgadzasz si\u0119 z jakikolwiek cz\u0119\u015bci\u0105 niniejszego regulaminu, prosimy nie korzystaj z naszej strony ani us\u0142ug. Niniejszy Regulamin ma zastosowanie do wszystkich us\u0142ug \u015bwiadczonych przez Forsa Design, w tym mi\u0119dzy innymi projektowania stron internetowych, tworzenia aplikacji webowych, rozwi\u0105za\u0144 e-commerce, system\u00f3w niestandardowych i wsparcia bie\u017c\u0105cego.`,
  },
  {
    number: "2",
    title: "Korzystanie ze Strony Internetowej",
    body: `Zawarto\u015b\u0107 naszej strony internetowej jest udost\u0119pniana wy\u0142\u0105cznie do cel\u00f3w informacyjnych i mo\u017ce by\u0107 aktualizowana lub zmieniana bez powiadomienia. Dok\u0142adamy rozs\u0105dnych stara\u0144, aby zapewni\u0107 dok\u0142adno\u015b\u0107 informacji na naszej stronie; jednak nie gwarantujemy kompletno\u015bci, dok\u0142adno\u015bci ani przydatno\u015bci dla jakiegokolwiek konkretnego celu. Zastrzegamy sobie prawo do ograniczenia lub odm\u00f3wienia dost\u0119pu dowolnej osobie lub organizacji bez podawania przyczyn.`,
  },
  {
    number: "3",
    title: "Prawa Autorskie i W\u0142asno\u015b\u0107 Intelektualna",
    body: `O ile nie uzgodniono inaczej na pi\u015bmie, wszystkie prawa autorskie i prawa w\u0142asno\u015bci intelektualnej dotycz\u0105ce naszej strony internetowej, w tym mi\u0119dzy innymi tekst, grafiki, branding, elementy projektowe, layouty, kod i zawarto\u015b\u0107, nale\u017c\u0105 wy\u0142\u0105cznie do Forsa Design. Mo\u017cesz przegl\u0105da\u0107 i drukowa\u0107 strony z naszej witryny wy\u0142\u0105cznie do osobistego, niekomercyjnego u\u017cytku. Ka\u017cde inne powielanie, rozpowszechnianie lub wykorzystanie zawarto\u015bci strony jest surowo zakazane bez uprzedniej pisemnej zgody Forsa Design.`,
    subsections: [
      {
        title: "Deliverable\u2019e Projekt\u00f3w",
        body: `Prawo w\u0142asno\u015bci do niestandardowych rezultat\u00f3w projektu (w tym stron internetowych, projekt\u00f3w, kodu i innych materia\u0142\u00f3w) stworzonych specjalnie dla klienta przechodzi na klienta po otrzymaniu 100% p\u0142atno\u015bci ca\u0142kowitej warto\u015bci projektu. A\u017c do otrzymania pe\u0142nej p\u0142atno\u015bci wszystkie prawa autorskie i prawa w\u0142asno\u015bci intelektualnej, w tym kod \u017ar\u00f3d\u0142owy, pliki projektowe, bazy danych i wszystkie powi\u0105zane materia\u0142y, pozostaj\u0105 wy\u0142\u0105czn\u0105 w\u0142asno\u015bci\u0105 Forsa Design.`,
      },
      {
        title: "Wcze\u015bniej Istniej\u0105ce Materia\u0142y",
        body: `Forsa Design zachowuje wszystkie prawa autorskie i prawa w\u0142asno\u015bci intelektualnej do wcze\u015bniej istniej\u0105cych szablon\u00f3w, framework\u00f3w, bibliotek, komponent\u00f3w, proces\u00f3w i metodologii opracowanych przed lub niezale\u017cnie od projekt\u00f3w klienta.`,
      },
    ],
  },
  {
    number: "4",
    title: "Zapytania o Us\u0142ugi i Oferty",
    body: `Ka\u017cda oferta, oszacowanie, propozycja lub zakres pracy dostarczony przez Forsa Design jest nievi\u0105\u017c\u0105cy a\u017c do formalnego zaakceptowania przez klienta i potwierdzenia w podpisanej umowie projektowej lub kontrakcie. Oferty s\u0105 wa\u017cne przez 30 dni od daty wydania. Po up\u0142ywie 30 dni oferty musz\u0105 by\u0107 od\u015bwie\u017cone i mog\u0105 podlega\u0107 zmienionej wycenie.`,
  },
  {
    number: "5",
    title: "Zaliczki, P\u0142atno\u015bci i Warunki P\u0142atno\u015bci",
    body: `Nierefundowana zaliczka w wysoko\u015bci 25% ca\u0142kowitej warto\u015bci projektu jest wymagana przed rozpocz\u0119ciem prac. Zaliczka b\u0119dzie traktowana jako p\u0142atno\u015b\u0107 na poczet faktury ko\u0144cowej. Zaliczka musi by\u0107 otrzymana i zaksi\u0119gowana przed rozpocz\u0119ciem jakichkolwiek prac.`,
    subsections: [
      {
        title: "Plan P\u0142atno\u015bci",
        body: `Pozosta\u0142e saldo w wysoko\u015bci 75% b\u0119dzie p\u0142acone zgodnie z harmonogramem okre\u015blonym w indywidualnej umowie projektowej.`,
      },
      {
        title: "Metoda P\u0142atno\u015bci i Termin P\u0142atno\u015bci",
        body: `Wszystkie faktury s\u0105 wymagalne w ci\u0105gu 14 dni od wystawienia, o ile nie uzgodniono innych warunk\u00f3w na pi\u015bmie.`,
      },
      {
        title: "P\u0142atno\u015b\u0107 Zaleg\u0142a",
        body: `Nez\u0142o\u017cenie p\u0142atno\u015bci w wyznaczonym terminie mo\u017ce spowodowa\u0107 natychmiastowe wstrzymanie prac do czasu sp\u0142acenia ca\u0142o\u015bci zalegaj\u0105cych kwot.`,
      },
      {
        title: "Prawo W\u0142asno\u015bci i Dost\u0119p",
        body: `Klient nabywa wy\u0142\u0105czne prawo w\u0142asno\u015bci do uko\u0144czonej strony internetowej i wszystkich rezultat\u00f3w wy\u0142\u0105cznie po otrzymaniu 100% p\u0142atno\u015bci ca\u0142kowitej warto\u015bci projektu.`,
      },
      {
        title: "Polityka Zwrot\u00f3w",
        body: `Zaliczka w wysoko\u015bci 25% jest nierefundowalna w \u017cadnych okoliczno\u015bciach, w\u0142\u0105czaj\u0105c anulowanie projektu przez klienta.`,
      },
    ],
  },
  {
    number: "6",
    title: "Terminy Projekt\u00f3w i Kamienie Milowe",
    body: `Wszystkie szacunkowe daty zako\u0144czenia, harmonogramy lub harmonogramy dostarczenia podane przed podpisaniem formalnej umowy projektowej s\u0105 wy\u0142\u0105cznie orientacyjne i nie powinny by\u0107 uwa\u017cane za gwarantowane.`,
    subsections: [
      {
        title: "Op\u00f3\u017anienia Spowodowane przez Klienta",
        body: `Forsa Design nie b\u0119dzie odpowiedzialna za op\u00f3\u017anienia spowodowane przez klienta, w tym op\u00f3\u017anienia w dostarczeniu tre\u015bci, tekstu, obraz\u00f3w, materia\u0142\u00f3w brandingowych lub innych informacji niezb\u0119dnych do post\u0119pu projektu.`,
      },
      {
        title: "Si\u0142a Wy\u017csza",
        body: `Forsa Design nie b\u0119dzie odpowiedzialna za op\u00f3\u017anienia lub brak wykonania spowodowane okoliczno\u015bciami pozostaj\u0105cymi poza rozs\u0105dn\u0105 kontrol\u0105.`,
      },
    ],
  },
  {
    number: "7",
    title: "Zakres Prac i \u017b\u0105dania Zmian",
    body: `Zakres pracy b\u0119dzie okre\u015blony w indywidualnej umowie projektowej. Prace b\u0119d\u0105 ograniczone do uzgodnionego zakresu, chyba \u017ce autoryzowano inaczej na pi\u015bmie.`,
    subsections: [
      {
        title: "Zmiany Poza Zakresem",
        body: `Wszelkie zmiany, uzupe\u0142nienia lub rewizje \u017c\u0105dane poza uzgodnionym zakresem b\u0119d\u0105 podlega\u0107 dodatkowym op\u0142atom. Dodatkowe rundy rewizji s\u0105 naliczane w wysoko\u015bci \u00a375 za godzin\u0119.`,
      },
      {
        title: "Zapobieganie Rozszerzaniu Si\u0119 Zakresu",
        body: `Je\u015bli \u017c\u0105dane zmiany istotnie zmieniaj\u0105 zakres projektu lub harmonogram, Forsa Design zastrzega sobie prawo do udzielenia zmienionej wyceny lub odmowy realizacji.`,
      },
    ],
  },
  {
    number: "8",
    title: "Odpowiedzialno\u015b\u0107 Klienta",
    body: `Klient jest odpowiedzialny za dostarczenie dok\u0142adnych, kompletnych, terminowych i prawid\u0142owo sformatowanych informacji, tre\u015bci, materia\u0142\u00f3w, obraz\u00f3w i zasob\u00f3w brandingowych niezb\u0119dnych do wykonania projektu.`,
    subsections: [
      {
        title: "Gwarancja Praw Autorskich",
        body: `Klient gwarantuje, \u017ce wszystkie materia\u0142y dostarczone Forsa Design s\u0105 oryginalnym dzie\u0142em klienta lub klient uzyska\u0142 wszelkie niezb\u0119dne uprawnienia i licencje.`,
      },
      {
        title: "Odszkodowanie",
        body: `Klient zgadza si\u0119 zabezpieczy\u0107 i wyzwoli\u0107 Forsa Design z wszelkich roszcze\u0144 stron trzecich wynikaj\u0105cych z materia\u0142\u00f3w, zawarto\u015bci lub informacji klienta.`,
      },
      {
        title: "Dok\u0142adno\u015b\u0107 Zawarto\u015bci",
        body: `Forsa Design nie jest odpowiedzialna za dok\u0142adno\u015b\u0107, legalno\u015b\u0107 lub odpowiedno\u015b\u0107 zawarto\u015bci dostarczonej przez klienta.`,
      },
      {
        title: "Terminowe Sprz\u0119\u017cenie Zwrotne i Decyzje",
        body: `Klient zobowi\u0105zany jest dostarcza\u0107 terminowe sprz\u0119\u017cenie zwrotne, zatwierdzenia i decyzje w celu zapobiegania op\u00f3\u017anieniom projektu.`,
      },
    ],
  },
  {
    number: "9",
    title: "Rewizje i Dodatkowe Prace",
    body: `Liczba rund rewizji zawartych w op\u0142acie projektowej powinna by\u0107 wyra\u017anie okre\u015blona w umowie projektowej. Rewizje poza uzgodnionym zakresem b\u0119d\u0105 naliczane w wysoko\u015bci \u00a375 za godzin\u0119.`,
  },
  {
    number: "10",
    title: "Ograniczenie Odpowiedzialno\u015bci",
    body: `W najwi\u0119kszym dozwolonym przez prawo zakresie, Forsa Design nie b\u0119dzie odpowiedzialna za \u017cadne po\u015brednio, incydentalne lub nast\u0119pcze szkody.`,
    subsections: [
      {
        title: "Maksymalny Limit Odpowiedzialno\u015bci",
        body: `W \u017cadnym wypadku ca\u0142kowita odpowiedzialno\u015b\u0107 Forsa Design nie b\u0119dzie przekracza\u0107 kwoty wp\u0142aconej przez klienta w 12 miesi\u0105cach poprzedzaj\u0105cych roszczenie lub \u00a3500.`,
      },
      {
        title: "Wyj\u0105tki",
        body: `Nic w niniejszym Regulaminie nie wy\u0142\u0105cza odpowiedzialno\u015bci Forsa Design za \u015bmier\u0107 lub obra\u017cenia cia\u0142a spowodowane zaniedbaniem.`,
      },
    ],
  },
  {
    number: "11",
    title: "Us\u0142ugi Stron Trzecich i Hosting",
    body: `Projekty mog\u0105 uwzgl\u0119dnia\u0107 lub by\u0107 zale\u017cne od us\u0142ug stron trzecich, platform, dostawc\u00f3w hostingu, wtyczek, oprogramowania i narz\u0119dzi.`,
  },
  {
    number: "12",
    title: "Dost\u0119pno\u015b\u0107 Strony Internetowej i Konserwacja",
    body: `Nie gwarantujemy, \u017ce strona b\u0119dzie stale dost\u0119pna, nieprzerywana, wolna od b\u0142\u0119d\u00f3w lub bezpieczna.`,
  },
  {
    number: "13",
    title: "W\u0142asno\u015b\u0107 Intelektualna i Wykorzystanie w Portfolio",
    body: `Forsa Design zastrzega sobie prawo do wy\u015bwietlania strony internetowej jako przyk\u0142adu z portfolio i prezentowania projektu w materia\u0142ach marketingowych.`,
  },
  {
    number: "14",
    title: "Ochrona Danych i Prywatno\u015b\u0107",
    body: `Obie strony b\u0119d\u0105 zgodne z Og\u00f3lnym Rozporz\u0105dzeniem o Ochronie Danych (RODO), Ustaw\u0105 o Ochronie Danych z 2018 r. i wszystkimi obowi\u0105zuj\u0105cymi przepisami o ochronie danych.`,
  },
  {
    number: "15",
    title: "Rozwi\u0105zanie i Anulowanie",
    body: `Je\u015bli klient za\u017c\u0105da anulowania projektu po wp\u0142aceniu zaliczki: zaliczka w wysoko\u015bci 25% jest nierefundowalna w \u017cadnych okoliczno\u015bciach.`,
    subsections: [
      {
        title: "Rozwi\u0105zanie przez Forsa Design",
        body: `Forsa Design zastrzega sobie prawo do natychmiastowego rozwi\u0105zania projektu, je\u015bli p\u0142atno\u015b\u0107 jest zaleg\u0142a o ponad 30 dni po terminie p\u0142atno\u015bci.`,
      },
      {
        title: "Skutek Rozwi\u0105zania",
        body: `Po rozwi\u0105zaniu wszystkie prace w toku natychmiast ustaj\u0105. Forsa Design usunie lub zwr\u00f3ci wszystkie materia\u0142y klienta.`,
      },
    ],
  },
  {
    number: "16",
    title: "Prawo W\u0142a\u015bciwe i Rozstrzyganie Spor\u00f3w",
    body: `Niniejszy Regulamin b\u0119dzie regulowany i interpretowany zgodnie z prawem Szkocji. Ka\u017cdy sp\u00f3r wynikaj\u0105cy z niniejszego Regulaminu b\u0119dzie podlega\u0107 wy\u0142\u0105cznej jurysdykcji s\u0105d\u00f3w szkockich.`,
  },
  {
    number: "17",
    title: "Zmiany w Niniejszym Regulaminie",
    body: `Forsa Design zastrzega sobie prawo do aktualizacji, zmiany lub modyfikacji niniejszego Regulaminu w dowolnym momencie.`,
  },
  {
    number: "18",
    title: "Niewa\u017cno\u015b\u0107 Postanowie\u0144",
    body: `Je\u015bli kt\u00f3rekolwiek postanowienie niniejszego Regulaminu oka\u017ce si\u0119 niewykonalne lub niewa\u017cne, to postanowienie b\u0119dzie usuni\u0119te, a pozosta\u0142e postanowienia b\u0119d\u0105 obowi\u0105zywa\u0107.`,
  },
  {
    number: "19",
    title: "Ca\u0142o\u015b\u0107 Umowy",
    body: `Niniejszy Regulamin, wraz z ka\u017cd\u0105 umow\u0105 projektow\u0105, ofert\u0105 i faktur\u0105, stanowi ca\u0142o\u015b\u0107 umowy mi\u0119dzy stronami dotycz\u0105cej us\u0142ug Forsa Design.`,
  },
  {
    number: "20",
    title: "Informacje Kontaktowe",
    body: `W przypadku pyta\u0144, spor\u00f3w lub zawiadomie\u0144 dotycz\u0105cych niniejszego Regulaminu: Forsa Design, Art &amp; Web Design, Banff, Szkocja. Email: hello@forsadesign.co.uk. Telefon: 07770110735.`,
  },
];

const privacyEN = [
  {
    number: "1",
    title: "Introduction",
    body: `Forsa Design ("we," "us," "our," or "Company") is committed to protecting your privacy and ensuring you have a positive experience on our website and when engaging with our services. This Privacy Policy explains how we collect, use, disclose, and process your personal data in accordance with the General Data Protection Regulation (GDPR), the Data Protection Act 2018, and all applicable data protection laws. By accessing our website or engaging our services, you consent to the practices described in this Privacy Policy.`,
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
    body: `We collect Personal Data that you voluntarily provide, including: contact form submissions (name, email, phone, company, message), service enquiry and quotation request details, client project data, communication records, and account or service registration details.`,
    subsections: [
      {
        title: "Data Collected Automatically",
        body: `We collect data automatically when you visit our website: IP address, browser type and version, operating system, referring website, pages visited, time spent, click-through data, search queries, device type, and identifiers. We also use cookies and tracking technologies and analytics data via Google Analytics.`,
      },
      {
        title: "Data from Third Parties",
        body: `We may receive Personal Data from your employer, referral sources or partners, publicly available sources, and third-party service providers.`,
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
        body: `You have explicitly consented to Processing for marketing emails, newsletters, non-essential cookies, testimonial use, call recordings, and optional data fields. You may withdraw consent at any time.`,
      },
      {
        title: "Contract Performance",
        body: `Processing is necessary to perform a contract with you or to take steps at your request prior to entering into a contract.`,
      },
      {
        title: "Legal Obligation",
        body: `Processing is necessary for compliance with applicable law, including tax records, accounting data, fraud prevention, and public safety.`,
      },
      {
        title: "Legitimate Interest",
        body: `Processing is necessary for legitimate interests pursued by the Company, including website security, fraud prevention, analytics, customer service improvements, and business operations.`,
      },
      {
        title: "Vital Interests",
        body: `Processing is necessary to protect vital interests, applied to emergency situations and data breaches affecting your safety.`,
      },
    ],
  },
  {
    number: "6",
    title: "How We Use Your Personal Data",
    body: `We use your Personal Data for service delivery, communication and customer service, marketing and promotion (with your consent), website analytics and improvement, security and fraud prevention, legal compliance, and business operations.`,
  },
  {
    number: "7",
    title: "Data Retention",
    body: `We retain Personal Data only as long as necessary to achieve the purposes for which it was collected, unless a longer retention period is required by law.`,
    subsections: [
      {
        title: "Retention Periods",
        body: `Contact Form Enquiries: 2 years. Project Clients: duration of project + 7 years. Marketing Lists: until you unsubscribe, plus 2 years. Website Analytics: 26 months. Email Communications: 2 years or duration of business relationship. Payment Records: 7 years. Server Logs and IP Data: 90 days.`,
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
        body: `We may disclose Personal Data to hosting providers, payment processors, email service providers, analytics providers (Google Analytics), communication tools, and professional services. All service providers are contractually bound to process data only on our instructions.`,
      },
      {
        title: "Legal Obligations",
        body: `We may disclose Personal Data if required by law, court order, or lawful authority request.`,
      },
      {
        title: "Business Transfer",
        body: `If Forsa Design is acquired, merged, or restructured, Personal Data may be transferred as part of that transaction. We will notify you of any such change.`,
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
    body: `Forsa Design processes and stores Personal Data primarily within the United Kingdom and European Union. If Personal Data is transferred outside the UK or EU, we ensure appropriate safeguards are in place and that the transfer is necessary for service delivery.`,
  },
  {
    number: "10",
    title: "Cookies and Tracking Technologies",
    body: `We use essential cookies (security, session management), analytics cookies (Google Analytics, requiring consent), preference cookies (theme, language), and marketing cookies (targeted advertising, requiring consent). You may accept all, reject non-essential, customise preferences, or change consent at any time.`,
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
        body: `You have the right to request deletion of your Personal Data, except where processing is necessary for legal obligations or contract performance.`,
      },
      {
        title: "Right to Restrict Processing",
        body: `You have the right to request that we limit how we process your data while you resolve a dispute or exercise other rights.`,
      },
      {
        title: "Right to Data Portability",
        body: `You have the right to receive a copy of your Personal Data in a structured, machine-readable format and to transmit it to another controller.`,
      },
      {
        title: "Right to Object",
        body: `You have the right to object to Processing based on legitimate interest, including for marketing purposes.`,
      },
      {
        title: "Right to Lodge a Complaint",
        body: `You have the right to lodge a complaint with the UK Information Commissioner's Office (ICO): www.ico.org.uk.`,
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
    body: `Our website and services are not directed to children under 13 years old. We do not knowingly collect Personal Data from children under 13.`,
  },
  {
    number: "13",
    title: "Data Security",
    body: `We implement reasonable technical, administrative, and organisational security measures to protect Personal Data: SSL/TLS encryption for data in transit, encrypted data storage, restricted access to personal data, regular security assessments, and secure password policies with multi-factor authentication.`,
    subsections: [
      {
        title: "Limitations",
        body: `While we implement appropriate security measures, no method of transmission over the internet is completely secure. We cannot guarantee absolute security.`,
      },
      {
        title: "Data Breach Notification",
        body: `If we discover a data breach that poses a risk to your rights and freedoms, we will notify the relevant data protection authority within 72 hours (where required) and notify affected individuals without undue delay.`,
      },
    ],
  },
  {
    number: "14",
    title: "Third-Party Links and Services",
    body: `Our website may contain links to third-party websites, applications, and services. This Privacy Policy applies only to our website and services. Third-party services we use (Google Analytics, payment processors, hosting providers) have their own privacy policies.`,
  },
  {
    number: "15",
    title: "Business Partners and Client Data Processing",
    body: `If you are a Forsa Design client, we process Personal Data on your behalf for website hosting, maintenance, and operation. As a Data Processor, we process data only according to your instructions.`,
  },
  {
    number: "16",
    title: "Retention and Deletion Requests",
    body: `You may request deletion of your Personal Data by contacting us at hello@forsadesign.co.uk. We will respond to deletion requests within 30 days.`,
  },
  {
    number: "17",
    title: "Marketing Communications and Opt-Out",
    body: `We may send marketing emails only if you have consented. You may unsubscribe at any time by clicking the "Unsubscribe" link in any email or contacting us directly. We will honour unsubscribe requests within 10 business days.`,
  },
  {
    number: "18",
    title: "Changes to This Privacy Policy",
    body: `We may update this Privacy Policy periodically. Last Updated: June 2026. We will notify you of material changes by email or by posting a notice on this website.`,
  },
  {
    number: "19",
    title: "Contact Us",
    body: `For questions, concerns, or to exercise your rights under GDPR, please contact: Forsa Design, Art & Web Design, Banff, Scotland. Email: hello@forsadesign.co.uk. Phone: 07770110735. We will respond to all privacy enquiries within 30 days.`,
  },
  {
    number: "20",
    title: "Legal Basis Summary Table",
    body: `Contact form data: Consent + Contract. Project client data: Contract. Email address: Consent (marketing). Website usage data: Legitimate interest (analytics). IP address, device info: Legitimate interest (security). Payment information: Contract + Legal obligation. Testimonials: Consent. Call recordings: Consent. Cookies: Consent (essential cookies exempt).`,
  },
];

const privacyPL = [
  {
    number: "1",
    title: "Wst\u0119p",
    body: `Forsa Design (\u201CMy\u201D, \u201Cnas\u201D, \u201Cnaszych\u201D lub \u201CSp\u00f3\u0142ka\u201D) jest zaanga\u017cowana w ochron\u0119 Twojej prywatno\u015bci i zapewnienie pozytywnego do\u015bwiadczenia na naszej stronie internetowej. Niniejsza Polityka Prywatno\u015bci wyja\u015bnia, w jaki spos\u00f3b zbieramy, wykorzystujemy, ujawniamy i przetwarzamy Twoje dane osobowe zgodnie z RODO, Ustaw\u0105 o Ochronie Danych z 2018 r. i wszystkimi obowi\u0105zuj\u0105cymi przepisami o ochronie danych.`,
  },
  {
    number: "2",
    title: "Definicje",
    body: `\u201CDane Osobowe\u201D to wszelkie informacje dotycz\u0105ce zidentyfikowanej lub mo\u017cliwej do zidentyfikowania osoby fizycznej. \u201CPrzetwarzanie\u201D to wszelkie operacje wykonywane na Danych Osobowych. Forsa Design jest Administratorem dla tej strony internetowej.`,
  },
  {
    number: "3",
    title: "Administrator i Funkcjonariusz Ochrony Danych",
    body: `Forsa Design, Art &amp; Web Design, Banff, Szkocja jest Administratorem Danych. Email: hello@forsadesign.co.uk.`,
  },
  {
    number: "4",
    title: "Dane Osobowe, Kt\u00f3re Zbieramy",
    body: `Zbieramy Dane Osobowe, kt\u00f3re dobrowolnie udost\u0119pniasz, w tym: dane z formularzy kontaktowych (imi\u0119, email, telefon, firma, wiadomo\u015b\u0107), dane z zapyta\u0144 o us\u0142ugi i wyceny, dane klient\u00f3w projektowych, dane komunikacji oraz dane rejestracji konta.`,
    subsections: [
      {
        title: "Dane Zbierane Automatycznie",
        body: `Zbieramy dane automatycznie podczas odwiedzania naszej strony: adres IP, typ przegl\u0105darki, system operacyjny, odwiedzone strony, czas sp\u0119dzony i dane klikni\u0119\u0107. U\u017cywamy plik\u00f3w cookie i Google Analytics.`,
      },
      {
        title: "Dane od Stron Trzecich",
        body: `Mo\u017cemy otrzymywa\u0107 Dane Osobowe od Twojego pracodawcy, \u017ar\u00f3de\u0142 rekomenduj\u0105cych i publicznie dost\u0119pnych \u017ar\u00f3de\u0142.`,
      },
    ],
  },
  {
    number: "5",
    title: "Prawna Podstawa Przetwarzania",
    body: `Przetwarzamy Twoje Dane Osobowe wy\u0142\u0105cznie wtedy, gdy mamy prawn\u0105 podstaw\u0119 zgodnie z RODO.`,
    subsections: [
      {
        title: "Zgoda",
        body: `Wyrazi\u0142e\u015b zgod\u0119 na Przetwarzanie dla wiadomo\u015bci email marketingowych, biuletyn\u00f3w i nieistotnych plik\u00f3w cookie. Mo\u017cesz wycofa\u0107 zgod\u0119 w dowolnym momencie.`,
      },
      {
        title: "Wykonanie Umowy",
        body: `Przetwarzanie jest niezb\u0119dne do wykonania umowy z Tob\u0105 lub podj\u0119cia dzia\u0142a\u0144 na Twoj\u0105 pro\u015bb\u0119 przed zawarciem umowy.`,
      },
      {
        title: "Obowi\u0105zek Prawny",
        body: `Przetwarzanie jest wymagane do zgodno\u015bci z obowi\u0105zuj\u0105cym prawem.`,
      },
      {
        title: "Uzasadniony Interes",
        body: `Przetwarzanie jest niezb\u0119dne dla uzasadnionych interes\u00f3w realizowanych przez Sp\u00f3\u0142k\u0119, w tym bezpiecze\u0144stwa witryny, analityki i operacji biznesowych.`,
      },
    ],
  },
  {
    number: "6",
    title: "Jak Wykorzystujemy Twoje Dane Osobowe",
    body: `Wykorzystujemy Twoje Dane Osobowe do \u015bwiadczenia us\u0142ug, komunikacji i obs\u0142ugi klienta, marketingu i promocji (za Twoj\u0105 zgod\u0105), analityki witryny, bezpiecze\u0144stwa i zgodno\u015bci prawnej.`,
  },
  {
    number: "7",
    title: "Przechowywanie Danych",
    body: `Przechowujemy Dane Osobowe tylko tak d\u0142ugo, jak jest to niezb\u0119dne do osi\u0105gni\u0119cia cel\u00f3w, dla kt\u00f3rych zosta\u0142y zebrane.`,
    subsections: [
      {
        title: "Okresy Przechowywania",
        body: `Zapytania z Formularza Kontaktowego: 2 lata. Klienci Projekt\u00f3w: czas trwania projektu + 7 lat. Ewidencje P\u0142atno\u015bci: 7 lat. Dzienniki Serwer\u00f3w i Dane IP: 90 dni.`,
      },
      {
        title: "Usuni\u0119cie",
        body: `Gdy Dane Osobowe nie s\u0105 ju\u017c niezb\u0119dne, bezpiecznie je usuwamy lub anonimizujemy. Mo\u017cesz w dowolnym momencie za\u017c\u0105da\u0107 usuni\u0119cia.`,
      },
    ],
  },
  {
    number: "8",
    title: "Udost\u0119pnianie i Ujawnianie Danych Osobowych",
    body: `Udost\u0119pniamy Twoje Dane Osobowe stronom trzecim wy\u0142\u0105cznie za Twoj\u0105 zgod\u0105 lub je\u015bli jest to konieczne do \u015bwiadczenia us\u0142ug.`,
    subsections: [
      {
        title: "Dostawcy Us\u0142ug i Strony Trzecie",
        body: `Mo\u017cemy ujawnia\u0107 Dane Osobowe dostawcom hostingu, procesorom p\u0142atno\u015bci, dostawcom analityki (Google Analytics) i us\u0142ugom profesjonalnym.`,
      },
      {
        title: "Obowi\u0105zki Prawne",
        body: `Mo\u017cemy ujawnia\u0107 Dane Osobowe, je\u015bli jest to wymagane przez prawo lub postanowienie s\u0105dowe.`,
      },
      {
        title: "Transfer Biznesowy",
        body: `Je\u015bli Forsa Design zostanie przej\u0119ta lub restrukturyzowana, Dane Osobowe mog\u0105 zosta\u0107 przeniesione. Powiadomimy Ci\u0119 o wszelkich takich zmianach.`,
      },
      {
        title: "Brak Sprzeda\u017cy Danych",
        body: `Nie sprzedajemy, nie wynajmujemy ani nie wymieniamy Twoich Danych Osobowych stronom trzecim do cel\u00f3w marketingowych.`,
      },
    ],
  },
  {
    number: "9",
    title: "Mi\u0119dzynarodowe Transfery Danych",
    body: `Forsa Design przetwarza i przechowuje Dane Osobowe przede wszystkim w Wielkiej Brytanii i Unii Europejskiej. Je\u015bli Dane Osobowe s\u0105 przenoszone poza Wielk\u0105 Brytani\u0119 lub UE, zapewniamy odpowiednie zabezpieczenia.`,
  },
  {
    number: "10",
    title: "Pliki Cookie i Technologie \u015aledzenia",
    body: `U\u017cywamy niezb\u0119dnych plik\u00f3w cookie (funkcjonalno\u015b\u0107, bezpiecze\u0144stwo), analitycznych (Google Analytics, wymagaj\u0105 zgody), preferencji (motyw, j\u0119zyk) i marketingowych (ukierunkowana reklama, wymagaj\u0105 zgody).`,
  },
  {
    number: "11",
    title: "Twoje Prawa na Mocy RODO",
    body: `Jako Osoba Zainteresowana masz nast\u0119puj\u0105ce prawa:`,
    subsections: [
      {
        title: "Prawo Dost\u0119pu",
        body: `Masz prawo do \u017c\u0105dania dost\u0119pu do Twoich Danych Osobowych. Udost\u0119pnimy to w ci\u0105gu 30 dni.`,
      },
      {
        title: "Prawo do Sprostowania",
        body: `Masz prawo do poprawy niedok\u0142adnych Danych Osobowych.`,
      },
      {
        title: "Prawo do Usuni\u0119cia",
        body: `Masz prawo do \u017c\u0105dania usuni\u0119cia Twoich Danych Osobowych, z wyj\u0105tkiem sytuacji, w kt\u00f3rych przetwarzanie jest konieczne do obowi\u0105zk\u00f3w prawnych.`,
      },
      {
        title: "Prawo do Ograniczenia Przetwarzania",
        body: `Masz prawo do \u017c\u0105dania ograniczenia sposobu przetwarzania Twoich danych.`,
      },
      {
        title: "Prawo do Przeno\u015bno\u015bci Danych",
        body: `Masz prawo do otrzymania kopii Twoich Danych Osobowych w ustrukturyzowanym formacie.`,
      },
      {
        title: "Prawo Sprzeciwu",
        body: `Masz prawo do sprzeciwienia si\u0119 przetwarzaniu na podstawie uzasadnionego interesu, w tym do cel\u00f3w marketingowych.`,
      },
      {
        title: "Prawo do Z\u0142o\u017cenia Skargi",
        body: `Masz prawo do z\u0142o\u017cenia skargi do brytyjskiego Urz\u0119du Komisarza Informacji (ICO): www.ico.org.uk.`,
      },
    ],
  },
  {
    number: "12",
    title: "Prywatno\u015b\u0107 Dzieci",
    body: `Nasza witryna i us\u0142ugi nie s\u0105 skierowane do dzieci poni\u017cej 13 lat. Nie zbieramy \u015bwiadomie Danych Osobowych od dzieci poni\u017cej 13 lat.`,
  },
  {
    number: "13",
    title: "Bezpiecze\u0144stwo Danych",
    body: `Wdra\u017camy rozsądne techniczne i organizacyjne \u015brodki bezpiecze\u0144stwa: szyfrowanie SSL/TLS, zaszyfrowane przechowywanie danych, ograniczony dost\u0119p do danych i uwierzytelnianie wieloczynnikowe.`,
    subsections: [
      {
        title: "Ograniczenia",
        body: `\u017baden spos\u00f3b transmisji przez Internet nie jest ca\u0142kowicie bezpieczny. Nie mo\u017cemy zagwarantowa\u0107 bezwzgl\u0119dnego bezpiecze\u0144stwa.`,
      },
      {
        title: "Powiadomienie o Naruszeniu Danych",
        body: `Je\u015bli odkryjemy naruszenie danych, b\u0119dziemy powiadamia\u0107 w\u0142a\u015bciwy organ ochrony danych w ci\u0105gu 72 godzin i osoby, kt\u00f3rych to dotyczy.`,
      },
    ],
  },
  {
    number: "14",
    title: "Linki Stron Trzecich i Us\u0142ugi",
    body: `Nasza strona mo\u017ce zawiera\u0107 linki do witryn stron trzecich. Nie odpowiadamy za praktyki prywatno\u015bci witryn stron trzecich.`,
  },
  {
    number: "15",
    title: "Partnerzy Biznesowi i Przetwarzanie Danych Klient\u00f3w",
    body: `Je\u015bli jeste\u015b klientem Forsa Design, przetwarzamy Dane Osobowe w Twoim imieniu do hostowania, konserwacji i obs\u0142ugi witryny.`,
  },
  {
    number: "16",
    title: "Przechowywanie i \u017b\u0105dania Usuni\u0119cia",
    body: `Mo\u017cesz za\u017c\u0105da\u0107 usuni\u0119cia Twoich Danych Osobowych, kontaktuj\u0105c si\u0119 z nami pod adresem hello@forsadesign.co.uk. B\u0119dziemy odpowiada\u0107 na \u017c\u0105dania usuni\u0119cia w ci\u0105gu 30 dni.`,
  },
  {
    number: "17",
    title: "Komunikacja Marketingowa i Rezygnacja",
    body: `Mo\u017cemy wysy\u0142a\u0107 emaile marketingowe wy\u0142\u0105cznie za Twoj\u0105 zgod\u0105. Mo\u017cesz zrezygnowa\u0107 w dowolnym momencie. B\u0119dziemy honorowa\u0107 \u017c\u0105dania anulowania subskrypcji w ci\u0105gu 10 dni roboczych.`,
  },
  {
    number: "18",
    title: "Zmiany w Niniejszej Polityce Prywatno\u015bci",
    body: `Mo\u017cemy okresowo aktualizowa\u0107 niniejsz\u0105 Polityk\u0119 Prywatno\u015bci. Ostatnia Aktualizacja: Czerwiec 2026. B\u0119dziemy Ci\u0119 powiadamia\u0107 o istotnych zmianach za po\u015brednictwem emaila lub publikuj\u0105c zawiadomienie na tej stronie.`,
  },
  {
    number: "19",
    title: "Skontaktuj Si\u0119 z Nami",
    body: `W przypadku pyta\u0144 lub skorzystania z Twoich praw na mocy RODO: Forsa Design, Art &amp; Web Design, Banff, Szkocja. Email: hello@forsadesign.co.uk. Telefon: 07770110735.`,
  },
  {
    number: "20",
    title: "Tabela Podsumowania Podstaw Prawnych",
    body: `Dane z formularza kontaktowego: Zgoda + Umowa. Dane klienta projektu: Umowa. Adres email: Zgoda (marketing). Dane u\u017cytkowania witryny: Uzasadniony interes. Adres IP: Uzasadniony interes (bezpiecze\u0144stwo). Informacje o p\u0142atno\u015bciach: Umowa + Obowi\u0105zek prawny.`,
  },
];

// ---------------------------------------------------------------------------
// Legal page body HTML builders
// ---------------------------------------------------------------------------

function buildTermsBodyEn() {
  return `<header>
<nav><a href="/en/">&#8592; Home</a> <span>|</span> <span>Forsa Design</span></nav>
</header>
<main>
<h1>Terms and Conditions</h1>
<p>Forsa Design &#8211; Art &amp; Web Design</p>
<p>Last Updated: June 2026</p>
${buildSectionsHtml(termsEN)}
</main>`;
}

function buildTermsBodyPl() {
  return `<header>
<nav><a href="/pl/">&#8592; Strona G&#322;&#243;wna</a> <span>|</span> <span>Forsa Design</span></nav>
</header>
<main>
<h1>Regulamin i Warunki &#346;wiadczenia Us&#322;ug</h1>
<p>Forsa Design &#8211; Art &amp; Web Design</p>
<p>Ostatnia aktualizacja: Czerwiec 2026</p>
${buildSectionsHtml(termsPL)}
</main>`;
}

function buildBlogBodyEn() {
  const sorted = [...articlesMeta].sort((a, b) => b.dateIso.localeCompare(a.dateIso));
  const articlesHtml = sorted
    .map((article) => {
      const a = article.en;
      const date = new Date(article.dateIso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `<article><a href="/en/blog/${ht(article.slugEn)}"><h2>${ht(a.title)}</h2><p>${ht(a.excerpt)}</p><p>${ht(date)} &middot; ${ht(String(article.readingTimeMin))} min read</p></a></article>`;
    })
    .join("\n");
  return `<header>
<nav><a href="/en/">&#8592; Home</a> <span>|</span> <span>Forsa Design</span></nav>
</header>
<main>
<h1>Blog</h1>
<p>Expert insights on web design, SEO, and digital strategy.</p>
${articlesHtml}
</main>`;
}

function buildBlogBodyPl() {
  const sorted = [...articlesMeta].sort((a, b) => b.dateIso.localeCompare(a.dateIso));
  const articlesHtml = sorted
    .map((article) => {
      const a = article.pl;
      const date = new Date(article.dateIso).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return `<article><a href="/pl/blog/${ht(article.slugPl)}"><h2>${ht(a.title)}</h2><p>${ht(a.excerpt)}</p><p>${ht(date)} &middot; ${ht(String(article.readingTimeMin))} min czytania</p></a></article>`;
    })
    .join("\n");
  return `<header>
<nav><a href="/pl/">&#8592; Strona G\u0142\u00f3wna</a> <span>|</span> <span>Forsa Design</span></nav>
</header>
<main>
<h1>Blog</h1>
<p>Wiedza ekspercka o web designie, SEO i strategii cyfrowej.</p>
${articlesHtml}
</main>`;
}

function buildPrivacyBodyEn() {
  return `<header>
<nav><a href="/en/">&#8592; Home</a> <span>|</span> <span>Forsa Design</span></nav>
</header>
<main>
<h1>Privacy Policy</h1>
<p>Forsa Design &#8211; Art &amp; Web Design</p>
<p>Last Updated: June 2026</p>
${buildSectionsHtml(privacyEN)}
</main>`;
}

function buildPrivacyBodyPl() {
  return `<header>
<nav><a href="/pl/">&#8592; Strona G&#322;&#243;wna</a> <span>|</span> <span>Forsa Design</span></nav>
</header>
<main>
<h1>Polityka Prywatno&#347;ci</h1>
<p>Forsa Design &#8211; Art &amp; Web Design</p>
<p>Ostatnia aktualizacja: Czerwiec 2026</p>
${buildSectionsHtml(privacyPL)}
</main>`;
}

// ---------------------------------------------------------------------------
// Route definitions — one entry per public URL
// ---------------------------------------------------------------------------

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
    bodyHtml: buildHomepageBodyEn(),
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
    bodyHtml: buildHomepageBodyPl(),
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
    bodyHtml: buildTermsBodyEn(),
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
    bodyHtml: buildTermsBodyPl(),
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
    bodyHtml: buildPrivacyBodyEn(),
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
    bodyHtml: buildPrivacyBodyPl(),
  },
  {
    outDir: "en/blog",
    lang: "en",
    title: "Blog | Forsa Design",
    desc: "Expert insights on web design, SEO, e-commerce, and digital strategy from the Forsa Design team.",
    ogTitle: "Blog | Forsa Design",
    locale: "en_US",
    canonical: `${SITE}/en/blog`,
    alternates: [
      { lang: "en", href: `${SITE}/en/blog` },
      { lang: "pl", href: `${SITE}/pl/blog` },
    ],
    bodyHtml: buildBlogBodyEn(),
  },
  {
    outDir: "pl/blog",
    lang: "pl",
    title: "Blog | Forsa Design",
    desc: "Wiedza ekspercka o web designie, SEO, e-commerce i strategii cyfrowej od zespo\u0142u Forsa Design.",
    ogTitle: "Blog | Forsa Design",
    locale: "pl_PL",
    canonical: `${SITE}/pl/blog`,
    alternates: [
      { lang: "en", href: `${SITE}/en/blog` },
      { lang: "pl", href: `${SITE}/pl/blog` },
    ],
    bodyHtml: buildBlogBodyPl(),
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

// ---------------------------------------------------------------------------
// Sitemap generation — derived from the same route sources as the prerender
// step so the two never drift apart.
//
// Only prerendered routes and confirmed SPA router routes are emitted.
// Blog article URLs are intentionally omitted until per-article routing and
// prerendering are in place (see App.tsx).
// ---------------------------------------------------------------------------

/**
 * Localised marketing pages served by the SPA router but not in the
 * prerender list. Include them in the sitemap so crawlers discover them even
 * though they receive the SPA shell rather than pre-built HTML.
 */
const spaMarketingRoutes = [
  { pathEn: "en/about", pathPl: "pl/about", priority: "0.8", changefreq: "monthly" },
  { pathEn: "en/comparison", pathPl: "pl/comparison", priority: "0.7", changefreq: "monthly" },
  { pathEn: "en/quote", pathPl: "pl/quote", priority: "0.6", changefreq: "monthly" },
];

function buildSitemapEntry(loc, alternates, priority, changefreq, lastmod) {
  const altLines = alternates
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
    .join("\n");
  const lastmodLine = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    altLines,
    `${lastmodLine}`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter((l) => l !== "")
    .join("\n");
}

const sitemapEntries = [];

for (const route of routes) {
  const loc = route.canonical;
  const alternates = route.alternates.map((a) => ({ lang: a.lang, href: a.href }));
  const isHome = route.outDir === "en" || route.outDir === "pl";
  const isBlog = route.outDir === "en/blog" || route.outDir === "pl/blog";
  const isLegal = route.outDir.includes("terms") || route.outDir.includes("privacy");
  const priority = isHome ? "1.0" : isBlog ? "0.9" : isLegal ? "0.4" : "0.7";
  const changefreq = isHome ? "monthly" : isBlog ? "weekly" : "yearly";
  sitemapEntries.push(buildSitemapEntry(loc, alternates, priority, changefreq, null));
}

for (const cfg of spaMarketingRoutes) {
  const enLoc = `${SITE}/${cfg.pathEn}`;
  const plLoc = `${SITE}/${cfg.pathPl}`;
  const alternates = [
    { lang: "en", href: enLoc },
    { lang: "pl", href: plLoc },
    { lang: "x-default", href: enLoc },
  ];
  sitemapEntries.push(buildSitemapEntry(enLoc, alternates, cfg.priority, cfg.changefreq, null));
  sitemapEntries.push(buildSitemapEntry(plLoc, alternates, cfg.priority, cfg.changefreq, null));
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${sitemapEntries.join("\n\n")}

</urlset>
`;

writeFileSync(join(distDir, "sitemap.xml"), sitemapXml);
console.log("  \u2713 sitemap.xml");

console.log("Prerender complete.");
