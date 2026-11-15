import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PricingSection from "../src/components/PricingSection";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const createMotionComponent = (tag: keyof JSX.IntrinsicElements) =>
    React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
      ({ children, ...props }, ref) => React.createElement(tag, { ...props, ref }, children),
    );

  const motion = {
    div: createMotionComponent("div"),
    section: createMotionComponent("section"),
    p: createMotionComponent("p"),
  };

  return { m: motion };
});

vi.mock("../src/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    language: "en",
    t: (key: string) => key,
  }),
}));

describe("PricingSection", () => {
  it("links the custom quote CTA to the quote page", () => {
    render(<PricingSection />);

    const links = screen.getAllByRole("link", { name: /Get a custom quote/i });

    expect(links).toHaveLength(1);
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "/en/quote");
    });
  });
});
