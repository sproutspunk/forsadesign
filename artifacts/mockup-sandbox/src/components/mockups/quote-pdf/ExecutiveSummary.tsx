import React from "react";

export default function ExecutiveSummary() {
  return (
    <div className="min-h-screen bg-[#E5E7EB] flex items-center justify-center p-8 font-sans">
      {/* A4 Container */}
      <div
        className="bg-white shadow-2xl relative overflow-hidden flex flex-col"
        style={{ width: "210mm", height: "297mm", boxSizing: "border-box" }}
      >
        {/* Full-width brand banner */}
        <div className="absolute top-0 left-0 w-full h-12 bg-[#0D2540]"></div>

        {/* Inner Padding */}
        <div className="p-14 pt-20 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-12 mt-4">
            <div className="flex items-center rounded-sm bg-[#0D2540] px-3 py-2">
              <img
                src="/__mockup/images/forsa-design-logo.png"
                alt="Forsa Design"
                className="h-16 w-24 object-contain object-left"
              />
            </div>
            <div className="text-right text-xs text-gray-400 space-y-1">
              <div>Ref: FD-2024-089</div>
              <div>Date: Oct 24, 2024</div>
              <div>Valid for 30 days</div>
            </div>
          </div>

          {/* Title Area */}
          <div className="mb-8">
            <h1 className="text-3xl font-light mb-2 text-[#0D2540] tracking-tight">
              Website Redesign
            </h1>
            <p className="text-gray-500 max-w-lg leading-relaxed text-xs">
              Executive summary & investment breakdown for the strategic redesign and development of
              your digital presence.
            </p>
          </div>

          {/* Large Investment Panel */}
          <div className="p-7 mb-10 rounded-sm bg-[#0D2540] text-white shadow-md relative overflow-hidden">
            {/* Decorative watermark/pattern inside panel could go here */}
            <div className="absolute -right-10 -top-10 opacity-5">
              <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="white" />
              </svg>
            </div>

            <div className="flex justify-between items-end mb-5 relative z-10">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#C9A84C] font-medium mb-2">
                  Total Investment
                </div>
                <div className="text-4xl font-light tracking-tight">£4,850</div>
              </div>
              <div className="text-right pb-1">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Timeline</div>
                <div className="text-lg font-light text-white">6-8 Weeks</div>
              </div>
            </div>

            <div className="h-px w-full bg-white opacity-20 mb-5 relative z-10"></div>

            <div className="grid grid-cols-3 gap-6 text-xs text-gray-400 relative z-10">
              <div>
                <span className="block text-white mb-1 uppercase tracking-wider text-[10px] opacity-80">
                  Prepared For
                </span>
                <span className="text-sm">Acme Corporation</span>
              </div>
              <div>
                <span className="block text-white mb-1 uppercase tracking-wider text-[10px] opacity-80">
                  Point of Contact
                </span>
                <span className="text-sm">Jane Doe, Mktg. Dir.</span>
              </div>
              <div>
                <span className="block text-white mb-1 uppercase tracking-wider text-[10px] opacity-80">
                  Prepared By
                </span>
                <span className="text-sm text-[#C9A84C]">Alex Chen</span>
              </div>
            </div>
          </div>

          {/* Scope Rows */}
          <div className="mb-10 flex-grow">
            <h2 className="text-xs uppercase tracking-widest mb-5 font-semibold border-b pb-3 text-[#0D2540] border-gray-200">
              Scope of Work Breakdown
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-gray-100 group">
                <div className="max-w-md">
                  <div className="font-semibold text-[#0D2540] mb-1.5 text-sm transition-colors">
                    Strategy & UX Design
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    User research, sitemap architecture, wireframing, and interactive prototyping
                    for key user journeys.
                  </div>
                </div>
                <div className="font-medium text-[#0D2540] text-sm">£1,200</div>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-100 group">
                <div className="max-w-md">
                  <div className="font-semibold text-[#0D2540] mb-1.5 text-sm transition-colors">
                    Visual UI Design
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Bespoke high-fidelity interface design, design system creation, and asset
                    preparation.
                  </div>
                </div>
                <div className="font-medium text-[#0D2540] text-sm">£1,500</div>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-100 group">
                <div className="max-w-md">
                  <div className="font-semibold text-[#0D2540] mb-1.5 text-sm transition-colors">
                    Frontend Development
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Responsive React/Next.js implementation, animations, CMS integration, and
                    performance optimization.
                  </div>
                </div>
                <div className="font-medium text-[#0D2540] text-sm">£1,850</div>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-gray-100 group">
                <div className="max-w-md">
                  <div className="font-semibold text-[#0D2540] mb-1.5 text-sm transition-colors">
                    Launch & QA
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Cross-browser testing, accessibility audit, SEO foundation, and deployment
                    configuration.
                  </div>
                </div>
                <div className="font-medium text-[#0D2540] text-sm">£300</div>
              </div>
            </div>
          </div>

          {/* Included Items & Delivery */}
          <div className="grid grid-cols-5 gap-8 mt-auto">
            <div className="col-span-3">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#0D2540]">
                Key Deliverables
              </h3>
              <ul className="text-xs text-gray-600 space-y-2">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>Figma Design Source Files & Asset Library</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>Production-Ready Next.js Codebase</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>30 Days Priority Post-Launch Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"></div>
                  <span>1-Hour Admin CMS Training Session</span>
                </li>
              </ul>
            </div>

            <div className="col-span-2 bg-[#F8F9FA] p-5 rounded-sm text-xs text-gray-600 border border-gray-100">
              <h3 className="font-bold mb-3 text-[#0D2540] uppercase tracking-wider text-[10px]">
                Next Steps
              </h3>
              <p className="mb-4 leading-relaxed">
                To proceed with this engagement, please sign the digital contract attached and
                process the 50% initiation deposit.
              </p>
              <div className="font-medium text-[#C9A84C]">hello@forsadesign.com</div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
            <div>Forsa Design Ltd. &bull; London, UK &bull; Reg: 12498274</div>
            <div>Page 1 of 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}
