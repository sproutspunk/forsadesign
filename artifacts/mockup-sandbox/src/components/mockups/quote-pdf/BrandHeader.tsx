import React from "react";

export default function BrandHeader() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8 py-12">
      {/* A4 Paper Container */}
      <div
        className="bg-white shadow-2xl relative overflow-hidden"
        style={{ width: "794px", height: "1123px" }}
      >
        {/* Navy Header */}
        <header className="bg-[#0D2540] text-white pt-12 pb-16 px-14 flex justify-between items-start">
          {/* Official Forsa Design logo */}
          <div className="flex items-center gap-5">
            <img
              src="https://0aa85256-57de-4ead-95be-7bfcd3dbae86-00-3jwlwnc4qr5m6.spock.replit.dev/logo-hero-384.webp?v=12"
              alt="Forsa Design"
              className="h-32 w-32 object-contain opacity-[1]"
            />
          </div>

          {/* Quote Badge & Details */}
          <div className="text-right flex flex-col items-end">
            <div className="border border-[#C9A84C] text-[#C9A84C] px-3 py-1 text-xs tracking-widest uppercase font-semibold mb-4 rounded-sm">
              Project Proposal
            </div>
            <div className="text-sm text-gray-300">Quote Reference: #FD-24-089</div>
            <div className="text-sm text-gray-300">Date: October 24, 2023</div>
            <div className="text-sm text-gray-300">Valid Until: November 24, 2023</div>
          </div>
        </header>

        {/* Client Info & Project Title */}
        <section className="px-14 py-12 flex justify-between items-end border-b border-gray-100">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
              Prepared For
            </h3>
            <div className="text-lg font-serif text-[#0D2540] font-medium">Acme Corporation</div>
            <div className="text-sm text-gray-500 mt-1">Attn: Jane Doe</div>
            <div className="text-sm text-gray-500">London, United Kingdom</div>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-serif text-[#0D2540] mb-2">Website Redesign</h1>
            <div className="flex items-center justify-end gap-2 text-sm font-medium text-[#C9A84C]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Estimated Timeline: 6-8 Weeks
            </div>
          </div>
        </section>

        {/* Content Body */}
        <section className="px-14 py-10 flex gap-12 h-[550px]">
          {/* Left Column: Cost Breakdown */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#0D2540] mb-6 flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C9A84C] inline-block"></span>
              Investment Breakdown
            </h2>

            <div className="space-y-4">
              {/* Item 1 */}
              <div className="group">
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-serif text-[#0D2540] font-medium text-lg">
                    Discovery & UX Strategy
                  </h4>
                  <span className="text-[#0D2540] font-medium">£850</span>
                </div>
                <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
                <p className="text-sm text-gray-500 leading-relaxed pr-8">
                  Stakeholder interviews, user journey mapping, wireframing, and comprehensive
                  sitemap development.
                </p>
              </div>

              {/* Item 2 */}
              <div className="group">
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-serif text-[#0D2540] font-medium text-lg">
                    UI Design & Prototyping
                  </h4>
                  <span className="text-[#0D2540] font-medium">£1,600</span>
                </div>
                <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
                <p className="text-sm text-gray-500 leading-relaxed pr-8">
                  Custom high-fidelity visual design for desktop and mobile, interactive prototype,
                  and design system creation.
                </p>
              </div>

              {/* Item 3 */}
              <div className="group">
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-serif text-[#0D2540] font-medium text-lg">
                    Frontend Development
                  </h4>
                  <span className="text-[#0D2540] font-medium">£1,900</span>
                </div>
                <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
                <p className="text-sm text-gray-500 leading-relaxed pr-8">
                  Responsive React/Next.js implementation, custom animations, accessibility
                  compliance (WCAG AA), and performance optimization.
                </p>
              </div>

              {/* Item 4 */}
              <div className="group">
                <div className="flex justify-between items-end mb-1">
                  <h4 className="font-serif text-[#0D2540] font-medium text-lg">
                    Testing & Launch
                  </h4>
                  <span className="text-[#0D2540] font-medium">£500</span>
                </div>
                <div className="w-full h-[1px] bg-gray-100 mb-2"></div>
                <p className="text-sm text-gray-500 leading-relaxed pr-8">
                  Cross-browser testing, CMS integration support, SEO foundation, and deployment
                  assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Included & Total */}
          <div className="w-[280px] flex flex-col">
            {/* Total Box */}
            <div className="bg-[#0D2540] text-white p-8 rounded-sm mb-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">
                Total Investment
              </h3>
              <div className="text-4xl font-serif mb-1">£4,850</div>
              <div className="text-xs text-gray-400">Exclusive of applicable taxes</div>
            </div>

            {/* Included Features */}
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#0D2540] mb-5">
              Project Deliverables
            </h2>
            <ul className="space-y-3">
              {[
                "Up to 8 unique page templates",
                "Responsive mobile-first design",
                "Basic on-page SEO setup",
                "Performance optimization (90+ score)",
                "2 rounds of design revisions",
                "30 days post-launch support",
                "Full source code ownership",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-[#C9A84C] mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="leading-tight">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="absolute bottom-28 left-0 right-0 text-center text-sm text-gray-500">
          Thank you for your enquiry.
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 h-24 bg-gray-50 flex items-center justify-between px-14 border-t border-gray-200">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#C9A84C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              hello@forsadesign.co.uk
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[#C9A84C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              forsadesign.co.uk
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-[#C9A84C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"
                />
                <circle cx="12" cy="9" r="2.25" strokeWidth="1.5" />
              </svg>
              Banff, Aberdeenshire, Scotland
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-[#C9A84C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7a2 2 0 011.8 2z"
                />
              </svg>
              07770 110735
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-[#C9A84C]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.5 3A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3h-15zM8 18H5.5v-8H8v8zM6.75 8.9A1.45 1.45 0 116.75 6a1.45 1.45 0 010 2.9zM18.5 18H16v-4.2c0-1-.02-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V18h-2.5v-8H13v1.1h.03c.35-.65 1.2-1.35 2.47-1.35 2.65 0 3 1.75 3 4V18z" />
              </svg>
              linkedin.com/in/miroslaw-potaczek
            </span>
          </div>
          <div className="text-xs text-gray-400">Page 1 of 1</div>
        </footer>
      </div>
    </div>
  );
}
