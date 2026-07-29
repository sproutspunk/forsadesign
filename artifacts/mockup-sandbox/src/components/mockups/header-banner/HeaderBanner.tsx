import "./_group.css";

const links = ["Services", "Pricing", "Portfolio", "Process", "About", "Contact"];

export function HeaderBanner() {
  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      <header className="border-b border-white/10 bg-[hsl(var(--background))] px-6 py-5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] md:px-10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8">
          <a href="#" className="flex min-w-0 shrink items-center" aria-label="Forsa Design home">
            <img
              src="/__mockup/images/forsa-banner.png"
              alt="Forsa Design — Web Systems for Heavy Industry"
              className="h-auto w-[clamp(220px,31vw,400px)] rounded-[3px] object-contain"
            />
          </a>

          <nav className="hidden shrink-0 items-center gap-6 lg:flex" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-white/75 transition-colors hover:text-[hsl(var(--primary))]"
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="rounded-sm bg-[hsl(var(--primary))] px-4 py-2 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-opacity hover:opacity-90"
            >
              Request a Quote
            </a>
          </nav>

          <button
            type="button"
            className="shrink-0 rounded-sm border border-[hsl(var(--primary))]/40 px-3 py-2 text-sm text-[hsl(var(--primary))] lg:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-[1200px] px-6 py-24 md:px-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--primary))]">
          Banner logo preview
        </p>
        <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
          The banner gives the header more industrial presence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/60">
          This preview keeps the current navigation and brand palette while replacing the compact
          logo with the uploaded wide banner.
        </p>
      </section>
    </main>
  );
}