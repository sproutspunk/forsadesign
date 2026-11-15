import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const tools = [
  { name: "Cloudflare", icon: "cloudflare", href: "https://www.cloudflare.com/" },
  { name: "GitHub", icon: "github", href: "https://github.com/" },
  { name: "Visual Studio Code", icon: "vscode", href: "https://code.visualstudio.com/" },
  { name: "React", icon: "react", href: "https://react.dev/" },
  { name: "Vite", icon: "vite", href: "https://vite.dev/" },
  { name: "TypeScript", icon: "typescript", href: "https://www.typescriptlang.org/" },
  { name: "Tailwind CSS", icon: "tailwindcss", href: "https://tailwindcss.com/" },
  { name: "Node.js", icon: "nodedotjs", href: "https://nodejs.org/" },
  { name: "pnpm", icon: "pnpm", href: "https://pnpm.io/" },
  { name: "Resend", icon: "resend", href: "https://resend.com/" },
  { name: "Stripe", icon: "stripe", href: "https://stripe.com/" },
  { name: "Google Analytics", icon: "googleanalytics", href: "https://analytics.google.com/" },
  { name: "Three.js", icon: "threedotjs", href: "https://threejs.org/" },
  { name: "PostgreSQL", icon: "postgresql", href: "https://www.postgresql.org/" },
  { name: "Drizzle", icon: "drizzle", href: "https://orm.drizzle.team/" },
  { name: "Express", icon: "express", href: "https://expressjs.com/" },
  { name: "Playwright", icon: "playwright", href: "https://playwright.dev/" },
  { name: "Vitest", icon: "vitest", href: "https://vitest.dev/" },
];

export default function ToolLogos() {
  const { language } = useLanguage();
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const track = rail?.querySelector<HTMLElement>(".tool-logos-track");
    if (!rail || !track) return;

    const logos = [...rail.querySelectorAll<HTMLElement>(".tool-logo")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let centers: number[] = [];
    const previousHeat = logos.map(() => -1);
    let frame = 0;
    let lastUpdate = 0;
    let visible = false;

    const highlight = () => {
      // Two layout reads per update; logo positions are measured only on resize.
      const center = rail.getBoundingClientRect().left + rail.clientWidth / 2;
      const origin = track.getBoundingClientRect().left;
      logos.forEach((logo, index) => {
        const distance = Math.abs(origin + centers[index] - center);
        const heat = Math.pow(Math.max(0, 1 - distance / 108), 1.5);
        if (Math.abs(heat - previousHeat[index]) < 0.02) return;
        logo.style.setProperty("--logo-heat", heat.toFixed(3));
        previousHeat[index] = heat;
      });
    };

    const tick = (time: number) => {
      if (time - lastUpdate >= 50) {
        highlight();
        lastUpdate = time;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const resume = () => {
      window.cancelAnimationFrame(frame);
      highlight();
      if (visible && !document.hidden && !reducedMotion.matches) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const measure = () => {
      centers = logos.map((logo) => logo.offsetLeft + logo.offsetWidth / 2);
      highlight();
    };

    const resize = new ResizeObserver(measure);
    resize.observe(rail);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    measure();
    observer.observe(rail);
    reducedMotion.addEventListener("change", resume);
    document.addEventListener("visibilitychange", resume);
    rail.addEventListener("scroll", highlight, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      reducedMotion.removeEventListener("change", resume);
      document.removeEventListener("visibilitychange", resume);
      rail.removeEventListener("scroll", highlight);
    };
  }, []);

  return (
    <nav
      ref={railRef}
      aria-label={language === "pl" ? "Narzędzia i technologie" : "Tools and technologies"}
      className="tool-logos my-5 w-full max-w-3xl"
    >
      <span className="tool-logos-spotlight" aria-hidden="true" />
      <span className="tool-logos-orbit" aria-hidden="true" />
      <span className="tool-logos-glint" aria-hidden="true" />
      <div className="tool-logos-track">
        {[false, true].map((duplicate) => (
          <div
            className="tool-logos-group"
            key={String(duplicate)}
            aria-hidden={duplicate || undefined}
          >
            {tools.map(({ name, icon, href }) => (
              <a
                key={icon}
                href={href}
                aria-label={name}
                title={name}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={duplicate ? -1 : undefined}
                className="tool-logo"
              >
                <span className="tool-logo-symbol">
                  <img src={`/tools/${icon}.svg`} alt="" width={32} height={32} decoding="async" />
                  <span
                    className="tool-logo-gold"
                    aria-hidden="true"
                    style={{
                      maskImage: `url(/tools/${icon}.svg)`,
                      WebkitMaskImage: `url(/tools/${icon}.svg)`,
                    }}
                  />
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
