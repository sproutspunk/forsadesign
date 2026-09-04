import { useEffect, useRef } from "react";

interface TurnstileWindow {
  turnstile?: {
    render: (
      container: HTMLElement,
      options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
      },
    ) => string;
    reset: (widgetId: string) => void;
    remove: (widgetId: string) => void;
  };
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  className?: string;
}

const SCRIPT_ID = "forsa-turnstile-script";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Loads the Turnstile api.js script once and invokes the callback when ready. */
function ensureTurnstileScript(onReady: () => void): () => void {
  const win = window as unknown as TurnstileWindow;
  if (win.turnstile) {
    onReady();
    return () => {};
  }
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    document.head.appendChild(script);
  }
  script.addEventListener("load", onReady, { once: true });
  return () => script?.removeEventListener("load", onReady);
}

export default function Turnstile({ siteKey, onVerify, onError, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      const container = containerRef.current;
      const win = window as unknown as TurnstileWindow;
      if (cancelled || !container || !win.turnstile) return;
      if (widgetIdRef.current) return; // already rendered
      widgetIdRef.current = win.turnstile.render(container, {
        sitekey: siteKey,
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": () => onVerify(""),
      });
    };

    const removeLoadListener = ensureTurnstileScript(render);

    return () => {
      cancelled = true;
      removeLoadListener();
      const win = window as unknown as TurnstileWindow;
      if (widgetIdRef.current && win.turnstile) {
        win.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onVerify, onError]);

  return <div ref={containerRef} className={className} />;
}
