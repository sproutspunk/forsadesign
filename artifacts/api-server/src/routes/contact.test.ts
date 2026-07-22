import { describe, it, expect, beforeEach, vi } from "vitest";
import request from "supertest";
import type { Express } from "express";

// The contact route sends email via a hand-rolled Proton Mail SMTP client. We
// mock it so tests never make real network calls or send real email; the mock
// lets us assert whether an email *would* have been sent for each scenario.
const sendViaProtonMock = vi.hoisted(() => vi.fn());

vi.mock("../lib/smtp", () => ({
  sendViaProton: sendViaProtonMock,
}));

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    projectType: "Branding",
    details: "I'd love a new brand identity for my cafe.",
    language: "en",
    ...overrides,
  };
}

// Re-import the app fresh for every test. The per-IP rate limiter holds state in
// a module-level in-memory store, so a fresh import gives each test an isolated
// counter and prevents cross-test pollution.
async function loadApp(): Promise<Express> {
  vi.resetModules();
  const mod = await import("../app");
  return mod.default;
}

beforeEach(() => {
  sendViaProtonMock.mockReset();
  sendViaProtonMock.mockResolvedValue(undefined);
});

describe("POST /api/contact bot protection", () => {
  it("accepts a genuine submission and sends email", async () => {
    const app = await loadApp();

    const res = await request(app).post("/api/contact").send(validBody());

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(sendViaProtonMock).toHaveBeenCalled();
  });

  it("silently drops a honeypot (bot) submission without sending email", async () => {
    const app = await loadApp();

    const res = await request(app)
      .post("/api/contact")
      .send(validBody({ website: "http://spam.example" }));

    // Returns success so the bot gets no signal, but no email is sent.
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(sendViaProtonMock).not.toHaveBeenCalled();
  });

  it("rate-limits repeated submissions from the same IP", async () => {
    const app = await loadApp();

    // The limiter allows 5 submissions per IP per window.
    for (let i = 0; i < 5; i++) {
      const ok = await request(app).post("/api/contact").send(validBody());
      expect(ok.status).toBe(200);
    }

    const limited = await request(app).post("/api/contact").send(validBody());
    expect(limited.status).toBe(429);
    expect(limited.body.ok).toBe(false);
  });
});
