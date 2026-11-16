import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ZoomableImage from "../src/components/ZoomableImage";

beforeEach(() => {
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: vi.fn(function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    }),
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: vi.fn(function (this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    }),
  });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  document.body.style.overflow = "";
});
it("opens on the same page, zooms, and restores scrolling when closed", () => {
  render(<ZoomableImage lang="en" src="/image.png" alt="Project" />);
  fireEvent.click(screen.getByRole("button", { name: "Enlarge image: Project" }));
  expect(screen.getByRole("dialog")).toHaveAttribute("open");
  expect(document.body.style.overflow).toBe("hidden");
  expect(document.querySelector("a")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
  expect(screen.getByRole("button", { name: "Fit image" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /Close/ }));
  expect(document.body.style.overflow).toBe("");
  expect(document.querySelector("dialog")).not.toHaveAttribute("open");
});
it("restores scrolling when navigating away with the image open", () => {
  const { unmount } = render(<ZoomableImage lang="pl" src="/image.png" alt="Projekt" />);
  fireEvent.click(screen.getByRole("button", { name: "Powiększ zdjęcie: Projekt" }));
  unmount();
  expect(document.body.style.overflow).toBe("");
});
