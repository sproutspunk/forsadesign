import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import NewsletterSignup from "../src/components/NewsletterSignup";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
describe("newsletter form", () => {
  it("asks for separate, unchecked consent", () => {
    render(<NewsletterSignup lang="pl" />);
    fireEvent.click(screen.getByRole("button", { name: "Zapisz się do newslettera" }));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("checkbox")).toBeRequired();
    expect(screen.getByLabelText("Adres e-mail")).toBeRequired();
  });
  it("shows confirmation-pending messaging after a successful request", async () => {
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true, status: "pending" }), { status: 202 }),
      );
    render(<NewsletterSignup lang="en" source="article:test" />);
    fireEvent.click(screen.getByRole("button", { name: "Subscribe to the newsletter" }));
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "reader@example.test" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send confirmation" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Check your inbox");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetch.mock.calls[0][1]!.body as string)).toMatchObject({
      email: "reader@example.test",
      consent: true,
      source: "article:test",
    });
  });
  it("does not claim success when the backend rejects a signup", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("failed", { status: 502 }));
    render(<NewsletterSignup lang="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Subscribe to the newsletter" }));
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "reader@example.test" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Send confirmation" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("could not send");
    expect(screen.queryByRole("status")).toBeNull();
  });
});
