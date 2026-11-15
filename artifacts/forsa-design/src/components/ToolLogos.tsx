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

  return (
    <nav
      aria-label={language === "pl" ? "Narzędzia i technologie" : "Tools and technologies"}
      className="tool-logos my-5 w-full max-w-3xl"
    >
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
                <img src={`/tools/${icon}.svg`} alt="" width={28} height={28} decoding="async" />
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
