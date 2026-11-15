import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BlueprintMotionProvider,
  useBlueprintMotion,
} from "../src/contexts/BlueprintMotionContext";

function Control() {
  const { paused, toggle } = useBlueprintMotion();
  return <button onClick={toggle}>{paused ? "paused" : "playing"}</button>;
}

describe("Blueprint motion preference", () => {
  let reduced: boolean;
  let listeners: Set<() => void>;

  beforeEach(() => {
    localStorage.clear();
    reduced = false;
    listeners = new Set();
    vi.stubGlobal("matchMedia", () => ({
      get matches() {
        return reduced;
      },
      addEventListener: (_event: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_event: string, listener: () => void) => listeners.delete(listener),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("starts paused for reduced motion and permits an explicit play choice", () => {
    reduced = true;
    render(
      <BlueprintMotionProvider>
        <Control />
      </BlueprintMotionProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "paused" }));
    expect(screen.getByRole("button", { name: "playing" })).toBeInTheDocument();
    expect(localStorage.getItem("forsa-blueprint-paused")).toBe("0");
    act(() => {
      listeners.forEach((listener) => listener());
    });
    expect(screen.getByRole("button", { name: "paused" })).toBeInTheDocument();
  });

  it("remembers manual pause across remounts and OS preference changes", () => {
    const { unmount } = render(
      <BlueprintMotionProvider>
        <Control />
      </BlueprintMotionProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "playing" }));
    unmount();
    expect(listeners.size).toBe(0);
    render(
      <BlueprintMotionProvider>
        <Control />
      </BlueprintMotionProvider>,
    );
    expect(screen.getByRole("button", { name: "paused" })).toBeInTheDocument();
    act(() => {
      reduced = true;
      listeners.forEach((listener) => listener());
    });
    act(() => {
      reduced = false;
      listeners.forEach((listener) => listener());
    });
    expect(screen.getByRole("button", { name: "paused" })).toBeInTheDocument();
  });

  it("keeps the control working when browser storage is blocked", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(
      <BlueprintMotionProvider>
        <Control />
      </BlueprintMotionProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "playing" }));
    expect(screen.getByRole("button", { name: "paused" })).toBeInTheDocument();
  });
});
