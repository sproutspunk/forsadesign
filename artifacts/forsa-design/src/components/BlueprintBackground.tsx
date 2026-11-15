import { useEffect, useRef } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBlueprintMotion } from "@/contexts/BlueprintMotionContext";
import type { BlueprintController } from "@/lib/blueprint";

export default function BlueprintBackground() {
  const { paused } = useBlueprintMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controller = useRef<BlueprintController | null>(null);
  const pauseRef = useRef(paused);

  useEffect(() => {
    pauseRef.current = paused;
    controller.current?.setPaused(paused);
  }, [paused]);

  useEffect(() => {
    let disposed = false;
    const start = () => {
      void import("@/lib/blueprint")
        .then(({ mountBlueprint }) => {
          if (!disposed && canvasRef.current) {
            controller.current = mountBlueprint(canvasRef.current, pauseRef.current);
          }
        })
        .catch(() => {
          // The static blueprint remains available if the decorative chunk cannot load.
        });
    };
    let idle: number | undefined;
    let timer: number | undefined;
    const queue = () => {
      // Let fonts, the hero and the page's interactive controls settle first.
      timer = window.setTimeout(() => {
        if (disposed) return;
        idle = window.requestIdleCallback?.(start, { timeout: 1500 });
        if (idle === undefined) start();
      }, 800);
    };
    if (document.readyState === "complete") queue();
    else window.addEventListener("load", queue, { once: true });
    return () => {
      disposed = true;
      window.removeEventListener("load", queue);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  return (
    <div className="blueprint-scene" aria-hidden="true">
      <div className="blueprint-grid" />
      <div className="blueprint-drawing">
        <span />
        <span />
      </div>
      <canvas ref={canvasRef} className="blueprint-network" />
    </div>
  );
}

export function BlueprintToggle() {
  const { paused, toggle } = useBlueprintMotion();
  const { language } = useLanguage();
  const label =
    language === "pl"
      ? paused
        ? "Uruchom animację tła"
        : "Wstrzymaj animację tła"
      : paused
        ? "Play background animation"
        : "Pause background animation";

  return (
    <button
      type="button"
      onClick={toggle}
      className="blueprint-toggle ml-auto md:ml-0"
      aria-label={label}
      title={label}
      aria-pressed={paused}
    >
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
    </button>
  );
}
