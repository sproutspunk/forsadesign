import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "forsa-blueprint-paused";

function savedPause() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

const BlueprintMotionContext = createContext<{
  paused: boolean;
  toggle: () => void;
} | null>(null);

export function BlueprintMotionProvider({ children }: { children: React.ReactNode }) {
  const [paused, setPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || savedPause(),
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(preference.matches || savedPause());
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const toggle = useCallback(() => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Motion controls still work when browser storage is unavailable.
    }
  }, [paused]);

  const value = useMemo(() => ({ paused, toggle }), [paused, toggle]);
  return (
    <BlueprintMotionContext.Provider value={value}>{children}</BlueprintMotionContext.Provider>
  );
}

export function useBlueprintMotion() {
  const context = useContext(BlueprintMotionContext);
  if (!context) throw new Error("Blueprint motion requires BlueprintMotionProvider");
  return context;
}
