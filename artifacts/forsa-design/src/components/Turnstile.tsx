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
    ready?: (cb: () => void) => void;
  };
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  className?: string;
}

export default function Turnstile({ siteKey, onVerify, onError, className }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const render = () => {
      const win = window as unknown as TurnstileWindow;
      if (!win.turnstile) return;
      widgetIdRef.current = win.turnstile.render(container, {
        sitekey: siteKey,
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": () => onVerify(""),
      });
    };

    const win = window as unknown as TurnstileWindow;
    if (win.turnstile?.ready) {
      win.turnstile.ready(render);
    } else {
      render();
    }

    return () => {
      if (widgetIdRef.current && win.turnstile) {
        win.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey, onVerify, onError]);

  return <div ref={containerRef} className={className} />;
}
