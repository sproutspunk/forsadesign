import "./_group.css";

const links = ["Services", "Pricing", "Portfolio", "Process", "About", "Contact"];

export function HeaderBanner() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Nav — identyczny z obecnym headerem strony */}
      <header className="bg-[hsl(var(--background))]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8">
          {/* lewy: linki nav */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-white/75 transition-colors hover:text-[hsl(var(--primary))]"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* prawy: About + Quote */}
          <div className="ml-auto flex items-center gap-3">
            <a
              href="#"
              className="hidden border border-[hsl(var(--primary))]/40 text-[hsl(var(--primary))] text-xs font-semibold px-4 py-1.5 rounded-sm hover:bg-[hsl(var(--primary))]/10 transition-colors md:inline-flex"
            >
              About Us
            </a>
            <a
              href="#"
              className="rounded-sm bg-[hsl(var(--primary))] px-4 py-1.5 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-opacity hover:opacity-90"
            >
              Request a Quote
            </a>
          </div>
        </div>
      </header>

      {/* Baner — dokładnie w miejscu gdzie było logo, pod menu */}
      <div className="w-full bg-[hsl(var(--background))] flex justify-center border-b border-white/10 py-4 px-6">
        <a href="#" aria-label="Forsa Design home">
          <img
            src="/__mockup/images/forsa-banner.png"
            alt="Forsa Design — Web Systems for Heavy Industry"
            className="h-auto w-[clamp(320px,72vw,860px)] object-contain"
          />
        </a>
      </div>

      {/* Treść strony — stub */}
      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--primary))]">
          Forsa Design
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
          Web Systems for Heavy Industry
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/60">
          Procurement-ready websites, B2B e-commerce and bespoke web systems for offshore, energy,
          engineering, and manufacturing businesses.
        </p>
      </section>
    </main>
  );
}
