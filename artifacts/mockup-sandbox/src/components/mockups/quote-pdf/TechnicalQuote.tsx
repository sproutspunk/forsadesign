import React from "react";

export default function TechnicalQuote() {
  return (
    <div className="min-h-screen bg-slate-100 p-8 flex items-center justify-center">
      {/* A4 Paper Container */}
      <div className="w-[210mm] h-[297mm] bg-white shadow-2xl relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #0D2540 0px, #0D2540 1px, transparent 1px, transparent 20px)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <header className="border-b-2 border-navy px-12 pt-12 pb-8">
            <div className="flex items-start justify-between">
              {/* Logo */}
              <div className="flex flex-col">
                <div
                  className="font-serif text-4xl tracking-tight text-navy mb-1"
                  style={{ fontFamily: "Georgia, serif", fontWeight: 600 }}
                >
                  FORSA
                </div>
                <div
                  className="text-[10px] tracking-[0.3em] text-gold uppercase font-medium"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Design Studio
                </div>
              </div>

              {/* Quote Info */}
              <div className="text-right">
                <div className="text-xs text-navy/50 uppercase tracking-wider mb-1">
                  Commercial Quotation
                </div>
                <div className="text-2xl font-light text-navy">Q-2024-0147</div>
                <div className="text-xs text-navy/60 mt-1">15 January 2024</div>
              </div>
            </div>
          </header>

          {/* Client & Project Info */}
          <section className="px-12 py-8 grid grid-cols-2 gap-12 border-b border-navy/10">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold mb-2">Client</div>
              <div className="text-sm font-medium text-navy">Ashford Manufacturing Ltd</div>
              <div className="text-xs text-navy/60 mt-1 leading-relaxed">
                Unit 12, Westgate Industrial Park
                <br />
                Birmingham, B28 9QR
                <br />
                United Kingdom
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold mb-2">
                Project Scope
              </div>
              <div className="text-sm font-medium text-navy">Corporate Website Redesign</div>
              <div className="text-xs text-navy/60 mt-1 leading-relaxed">
                Full digital presence overhaul including responsive
                <br />
                design, CMS integration, and technical optimization
              </div>
            </div>
          </section>

          {/* Scope Table */}
          <section className="px-12 py-8 flex-1">
            <div className="text-[10px] uppercase tracking-widest text-gold mb-4">
              Detailed Scope
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="text-left py-3 font-semibold text-navy uppercase tracking-wider text-[10px]">
                    Item
                  </th>
                  <th className="text-left py-3 font-semibold text-navy uppercase tracking-wider text-[10px]">
                    Description
                  </th>
                  <th className="text-right py-3 font-semibold text-navy uppercase tracking-wider text-[10px]">
                    Units
                  </th>
                  <th className="text-right py-3 font-semibold text-navy uppercase tracking-wider text-[10px]">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-navy/10">
                  <td className="py-4 text-navy font-medium">Design & UX</td>
                  <td className="py-4 text-navy/70">
                    User research, wireframes, high-fidelity mockups
                  </td>
                  <td className="py-4 text-right text-navy/60">8 pages</td>
                  <td className="py-4 text-right text-navy font-medium tabular-nums">£1,850</td>
                </tr>
                <tr className="border-b border-navy/10">
                  <td className="py-4 text-navy font-medium">Development</td>
                  <td className="py-4 text-navy/70">
                    React implementation, responsive build, CMS setup
                  </td>
                  <td className="py-4 text-right text-navy/60">—</td>
                  <td className="py-4 text-right text-navy font-medium tabular-nums">£2,200</td>
                </tr>
                <tr className="border-b border-navy/10">
                  <td className="py-4 text-navy font-medium">Content Migration</td>
                  <td className="py-4 text-navy/70">Existing content transfer and optimization</td>
                  <td className="py-4 text-right text-navy/60">—</td>
                  <td className="py-4 text-right text-navy font-medium tabular-nums">£450</td>
                </tr>
                <tr className="border-b border-navy/10">
                  <td className="py-4 text-navy font-medium">Testing & QA</td>
                  <td className="py-4 text-navy/70">Cross-browser testing, performance audit</td>
                  <td className="py-4 text-right text-navy/60">—</td>
                  <td className="py-4 text-right text-navy font-medium tabular-nums">£350</td>
                </tr>
              </tbody>
            </table>

            {/* Inclusions */}
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold mb-3">
                  Technical Inclusions
                </div>
                <ul className="space-y-2 text-xs text-navy/70">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Headless CMS integration (Sanity)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Core Web Vitals optimization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>SSL certificate & security hardening</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Analytics & conversion tracking</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold mb-3">
                  Delivery Timeline
                </div>
                <div className="bg-navy/5 px-4 py-3 rounded">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xs text-navy/60">Project Duration</span>
                    <span className="text-sm font-medium text-navy">6–8 weeks</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-navy/60">Deployment Target</span>
                    <span className="text-sm font-medium text-navy">Q1 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer / Total */}
          <footer className="border-t-2 border-navy px-12 py-8">
            <div className="flex justify-between items-end">
              <div className="text-xs text-navy/50 max-w-md leading-relaxed">
                <p className="mb-2">
                  This quotation is valid for 30 days from the date of issue. A 50% deposit is
                  required to commence work, with the balance due upon project completion.
                </p>
                <p className="text-[10px]">All amounts exclude VAT at the prevailing rate.</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-gold mb-1">
                  Total Investment
                </div>
                <div className="text-5xl font-light text-navy tabular-nums">£4,850</div>
                <div className="text-xs text-navy/50 mt-1">GBP (ex. VAT)</div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <style>{`
        .border-navy { border-color: #0D2540; }
        .bg-navy { background-color: #0D2540; }
        .text-navy { color: #0D2540; }
        .text-navy\\/50 { color: rgba(13, 37, 64, 0.5); }
        .text-navy\\/60 { color: rgba(13, 37, 64, 0.6); }
        .text-navy\\/70 { color: rgba(13, 37, 64, 0.7); }
        .bg-navy\\/5 { background-color: rgba(13, 37, 64, 0.05); }
        .border-navy\\/10 { border-color: rgba(13, 37, 64, 0.1); }
        .text-gold { color: #C9A84C; }
        .tabular-nums { font-variant-numeric: tabular-nums; }
      `}</style>
    </div>
  );
}
