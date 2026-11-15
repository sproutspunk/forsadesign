import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
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
  const [paused, setPaused] = useState(false);
  const offsetRef = useRef(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    const track = rail?.querySelector<HTMLElement>(".tool-logos-track");
    if (!rail || !track) return;

    const logos = [...rail.querySelectorAll<HTMLElement>(".tool-logo")];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const previousHeat = logos.map(() => -1);
    let centers: number[] = [];
    let loopWidth = 0;
    let frame = 0;
    let previousTime = 0;
    let lastHighlight = 0;
    let visible = false;
    let rate = 1;
    let targetRate = 1;

    const renderPosition = () => {
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    const highlight = () => {
      const box = rail.getBoundingClientRect();
      const center = box.left + rail.clientWidth / 2;
      const origin = box.left - offsetRef.current - rail.scrollLeft;
      const pointer = pointerRef.current;
      let nearest = Infinity;
      if (pointer && finePointer.matches) {
        const dy = Math.max(0, Math.abs(pointer.y - (box.top + box.height / 2)) - 22);
        centers.forEach((x) => {
          const logoX = origin + x;
          if (logoX + 22 < box.left || logoX - 22 > box.right) return;
          const dx = Math.max(0, Math.abs(pointer.x - logoX) - 22);
          nearest = Math.min(nearest, Math.hypot(dx, dy));
        });
      }
      targetRate =
        paused || !!rail.querySelector("a:focus-visible")
          ? 0
          : Math.pow(Math.min(1, nearest / 140), 2);

      logos.forEach((logo, index) => {
        const distance = Math.abs(origin + centers[index] - center);
        const heat = Math.pow(Math.max(0, 1 - distance / 108), 1.5);
        if (Math.abs(heat - previousHeat[index]) < 0.02) return;
        logo.style.setProperty("--logo-heat", heat.toFixed(3));
        previousHeat[index] = heat;
      });
    };

    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) / 1000 : 0;
      previousTime = time;
      if (time - lastHighlight >= 50) {
        highlight();
        lastHighlight = time;
      }
      // An exact stop on hover; easing handles approaching and moving away.
      rate = targetRate === 0 ? 0 : rate + (targetRate - rate) * (1 - Math.exp(-elapsed / 0.15));
      if (loopWidth && rate > 0) {
        offsetRef.current = (offsetRef.current + elapsed * (loopWidth / 40) * rate) % loopWidth;
        renderPosition();
      }
      frame = window.requestAnimationFrame(tick);
    };

    const measure = () => {
      centers = logos.map((logo) => logo.offsetLeft + logo.offsetWidth / 2);
      loopWidth = track.firstElementChild?.getBoundingClientRect().width ?? 0;
      if (loopWidth) offsetRef.current %= loopWidth;
      renderPosition();
      highlight();
    };

    const resume = () => {
      window.cancelAnimationFrame(frame);
      previousTime = 0;
      highlight();
      if (visible && !document.hidden && !reducedMotion.matches && !paused) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    const followPointer = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && finePointer.matches) {
        pointerRef.current = { x: event.clientX, y: event.clientY };
      }
    };
    const clearPointer = () => {
      pointerRef.current = null;
    };
    const preferencesChanged = () => {
      if (reducedMotion.matches) offsetRef.current = 0;
      measure();
      resume();
    };

    const resize = new ResizeObserver(measure);
    resize.observe(rail);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    measure();
    observer.observe(rail);
    reducedMotion.addEventListener("change", preferencesChanged);
    document.addEventListener("visibilitychange", resume);
    rail.addEventListener("scroll", highlight, { passive: true });
    rail.addEventListener("focusin", resume);
    rail.addEventListener("focusout", resume);
    window.addEventListener("pointermove", followPointer, { passive: true });
    window.addEventListener("blur", clearPointer);

    return () => {
      window.cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      reducedMotion.removeEventListener("change", preferencesChanged);
      document.removeEventListener("visibilitychange", resume);
      rail.removeEventListener("scroll", highlight);
      rail.removeEventListener("focusin", resume);
      rail.removeEventListener("focusout", resume);
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("blur", clearPointer);
    };
  }, [paused]);

  return (
    <div className="tool-logos-shell my-5 w-full max-w-3xl">
      <nav
        ref={railRef}
        aria-label={language === "pl" ? "Narzędzia i technologie" : "Tools and technologies"}
        className="tool-logos w-full"
        data-paused={paused ? "true" : "false"}
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
                    <img
                      src={`/tools/${icon}.svg`}
                      alt=""
                      width={32}
                      height={32}
                      decoding="async"
                    />
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
      <button
        type="button"
        className="tool-logos-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={
          language === "pl"
            ? paused
              ? "Wznów przewijanie logotypów"
              : "Zatrzymaj przewijanie logotypów"
            : paused
              ? "Resume logo scrolling"
              : "Pause logo scrolling"
        }
        title={language === "pl" ? (paused ? "Wznów" : "Pauza") : paused ? "Resume" : "Pause"}
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
