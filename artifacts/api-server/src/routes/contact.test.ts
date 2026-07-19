import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import request from "supertest";
import type { Express } from "express";

// The contact route sends email via a hand-rolled Proton Mail SMTP client. We
// mock it so tests never make real network calls or send real email; the mock
// lets us assert whether an email *would* have been sent for each scenario.
const sendViaProtonMock = vi.hoisted(() => vi.fn());

vi.mock("../lib/smtp", () => ({
  sendViaProton: sendViaProtonMock,
}));

// Cloudflare's documented Turnstile test secret keys: `1x...AA` always passes
// verification, `2x...AA` always fails. We mock the siteverify fetch so the
// pass/fail outcome is driven deterministically by which secret is configured,
// mirroring Cloudflare's real behaviour without any real traffic.
const PASS_SECRET = "1x0000000000000000000000000000000AA";
const FAIL_SECRET = "2x0000000000000000000000000000000AA";
const VALID_TOKEN = "XXXX.DUMMY.TOKEN.XXXX";

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Jane Doe",
    email: "jane@example.com",
    projectType: "Branding",
    details: "I'd love a new brand identity for my cafe.",
    language: "en",
    captchaToken: VALID_TOKEN,
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

  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: unknown, init: { body?: unknown } = {}) => {
      const params =
        init.body instanceof URLSearchParams ? init.body : new URLSearchParams(init.body as string);
      const success = params.get("secret") !== FAIL_SECRET;
      return {
        ok: true,
        json: async () => ({
          success,
          "error-codes": success ? [] : ["invalid-input-response"],
        }),
      };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.TURNSTILE_SECRET_KEY;
});

describe("POST /api/contact bot protection", () => {
  it("accepts a genuine submission and sends email when verification passes", async () => {
    process.env.TURNSTILE_SECRET_KEY = PASS_SECRET;
    const app = await loadApp();

    const res = await request(app).post("/api/contact").send(validBody());

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(sendViaProtonMock).toHaveBeenCalled();
  });

  it("allows submission when the CAPTCHA token is missing (graceful degradation — widget may have errored)", async () => {
    process.env.TURNSTILE_SECRET_KEY = PASS_SECRET;
    const app = await loadApp();

    const res = await request(app)
      .post("/api/contact")
      .send(validBody({ captchaToken: undefined }));

    // Missing token = widget could not load (e.g. domain not in allowlist).
    // We degrade gracefully and send the email rather than blocking the user.
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(sendViaProtonMock).toHaveBeenCalled();
  });

  it("rejects with 400 when the CAPTCHA token is invalid", async () => {
    process.env.TURNSTILE_SECRET_KEY = FAIL_SECRET;
    const app = await loadApp();

    const res = await request(app)
      .post("/api/contact")
      .send(validBody({ captchaToken: "an-invalid-token" }));

    expect(res.status).toBe(403);
    expect(res.body.ok).toBe(false);
    expect(sendViaProtonMock).not.toHaveBeenCalled();
  });

  it("silently drops a honeypot (bot) submission without sending email", async () => {
    process.env.TURNSTILE_SECRET_KEY = PASS_SECRET;
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
    process.env.TURNSTILE_SECRET_KEY = PASS_SECRET;
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

  it("accepts valid submissions when no secret key is configured (graceful degradation)", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const app = await loadApp();

    const res = await request(app)
      .post("/api/contact")
      .send(validBody({ captchaToken: undefined }));

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(sendViaProtonMock).toHaveBeenCalled();
  });
});
