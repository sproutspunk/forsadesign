import { describe, it, expect, beforeEach, vi } from "vitest";
import worker from "../src/index";

const OWNER_EMAIL = "hello@forsadesign.co.uk";

interface TestKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
  list(): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
}

interface TestEnv {
  RESEND_API_KEY?: string;
  LEADS?: TestKV;
}

function createKV(): TestKV {
  const store = new Map<string, string>();
  return {
    get: async (key) => store.get(key) ?? null,
    put: async (key, value) => {
      store.set(key, value);
    },
    delete: async (key) => {
      store.delete(key);
    },
    list: async () => ({ keys: [], list_complete: true }),
  };
}

function createEnv(overrides: Partial<TestEnv> = {}): TestEnv {
  return {
    RESEND_API_KEY: "re_test_key",
    LEADS: createKV(),
    ...overrides,
  };
}

function mockFetch(
  mock: (url: string, init: RequestInit) => Promise<Response | undefined> | Response | undefined,
) {
  return vi.spyOn(globalThis, "fetch").mockImplementation(async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const response = await Promise.resolve(mock(url, init as RequestInit));
    if (response) return response;
    return new Response("not mocked", { status: 500 });
  });
}

let requestCounter = 0;

function request(
  path: string,
  options: { method?: string; body?: BodyInit | null; origin?: string; ip?: string } = {},
): Request {
  requestCounter += 1;
  return new Request(`https://api.example.com${path}`, {
    method: options.method ?? "GET",
    body: options.body,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      origin: options.origin ?? "https://forsadesign.co.uk",
      "CF-Connecting-IP": options.ip ?? `203.0.113.${requestCounter}`,
    },
  });
}

describe("Worker", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("/api/healthz", () => {
    it("returns ok", async () => {
      const res = await worker.fetch(request("/api/healthz"), createEnv());
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ status: "ok" });
    });
  });

  describe("CORS", () => {
    it("allows configured origins", async () => {
      const res = await worker.fetch(
        request("/api/healthz", { origin: "http://localhost:3000" }),
        createEnv(),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost:3000");
    });

    it("falls back to production origin for unknown origins", async () => {
      const res = await worker.fetch(
        request("/api/healthz", { origin: "https://evil.com" }),
        createEnv(),
      );
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("https://forsadesign.co.uk");
    });

    it("responds to OPTIONS", async () => {
      const res = await worker.fetch(request("/api/contact", { method: "OPTIONS" }), createEnv());
      expect(res.status).toBe(200);
      expect(res.headers.get("Access-Control-Allow-Methods")).toBe("GET, POST, OPTIONS");
    });
  });
  describe("/api/contact", () => {
    const validBody = new URLSearchParams({
      name: "Miro",
      email: "miro@example.com",
      message: "Hello",
      language: "en",
    }).toString();

    it("returns 400 when fields are missing", async () => {
      const res = await worker.fetch(
        request("/api/contact", { method: "POST", body: new URLSearchParams({}).toString() }),
        createEnv(),
      );
      expect(res.status).toBe(400);
    });

    it("catches honeypot and returns fake ok", async () => {
      const body = new URLSearchParams({
        name: "Bot",
        email: "bot@example.com",
        message: "Spam",
        _gotcha: "filled",
      }).toString();
      const res = await worker.fetch(
        request("/api/contact", { method: "POST", body }),
        createEnv(),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
    });

    it("returns 503 when RESEND_API_KEY is missing", async () => {
      const res = await worker.fetch(
        request("/api/contact", { method: "POST", body: validBody }),
        createEnv({ RESEND_API_KEY: undefined }),
      );
      expect(res.status).toBe(503);
    });

    it("sends contact email and confirmation", async () => {
      const sent: { url: string; init: RequestInit }[] = [];
      mockFetch(async (url, init) => {
        if (url.includes("api.resend.com")) {
          sent.push({ url, init });
          return Response.json({ id: "email-id" });
        }
        return undefined;
      });
      const res = await worker.fetch(
        request("/api/contact", { method: "POST", body: validBody }),
        createEnv(),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
      expect(sent).toHaveLength(2);
      expect((sent[0].init.body as string).includes(OWNER_EMAIL)).toBe(true);
      expect((sent[1].init.body as string).includes("miro@example.com")).toBe(true);
    });

    it("returns 502 when Resend fails", async () => {
      mockFetch(async (url) => {
        if (url.includes("api.resend.com")) return new Response("Internal error", { status: 500 });
        return undefined;
      });
      const res = await worker.fetch(
        request("/api/contact", { method: "POST", body: validBody }),
        createEnv(),
      );
      expect(res.status).toBe(502);
    });

    it("rate limits repeated requests", async () => {
      mockFetch(async (url) => {
        if (url.includes("api.resend.com")) return Response.json({ id: "x" });
        return undefined;
      });
      const env = createEnv();
      const ip = "203.0.113.99";
      for (let i = 0; i < 5; i += 1) {
        const res = await worker.fetch(
          request("/api/contact", { method: "POST", body: validBody, ip }),
          env,
        );
        expect(res.status).toBe(200);
      }
      const limited = await worker.fetch(
        request("/api/contact", { method: "POST", body: validBody, ip }),
        env,
      );
      expect(limited.status).toBe(429);
    });
  });

  describe("/api/lead-magnet", () => {
    it("catches honeypot", async () => {
      const body = JSON.stringify({ email: "lead@example.com", _gotcha: "x" });
      const res = await worker.fetch(
        request("/api/lead-magnet", { method: "POST", body }),
        createEnv(),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
    });

    it("returns 400 for invalid email", async () => {
      const res = await worker.fetch(
        request("/api/lead-magnet", { method: "POST", body: JSON.stringify({ email: "bad" }) }),
        createEnv(),
      );
      expect(res.status).toBe(400);
    });

    it("sends checklist email and stores lead", async () => {
      const sent: string[] = [];
      const kv = createKV();
      mockFetch(async (url) => {
        if (url.includes("api.resend.com")) {
          sent.push(url);
          return Response.json({ id: "x" });
        }
        return undefined;
      });
      const res = await worker.fetch(
        request("/api/lead-magnet", {
          method: "POST",
          body: JSON.stringify({
            email: "lead@example.com",
            company: "Acme",
            language: "en",
          }),
        }),
        createEnv({ LEADS: kv }),
      );
      expect(res.status).toBe(200);
      expect(sent).toHaveLength(2);
      const stored = await kv.get("lead:lead@example.com");
      expect(stored).toBeTruthy();
    });
  });

  describe("/api/waitlist", () => {
    it("catches honeypot", async () => {
      const body = JSON.stringify({ email: "user@example.com", _gotcha: "x" });
      const res = await worker.fetch(
        request("/api/waitlist", { method: "POST", body }),
        createEnv(),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
    });

    it("sends waitlist confirmation and stores signup", async () => {
      const kv = createKV();
      mockFetch(async (url) => {
        if (url.includes("api.resend.com")) return Response.json({ id: "x" });
        return undefined;
      });
      const res = await worker.fetch(
        request("/api/waitlist", {
          method: "POST",
          body: JSON.stringify({ email: "user@example.com", language: "pl" }),
        }),
        createEnv({ LEADS: kv }),
      );
      expect(res.status).toBe(200);
      const stored = await kv.get("waitlist:user@example.com");
      expect(stored).toBeTruthy();
    });
  });

  describe("/api/quotes/email", () => {
    const pdfBase64 = btoa("fake-pdf");
    const payload = {
      email: "client@example.com",
      name: "Client",
      phone: "+44123456789",
      quoteId: "Q-123",
      projectLabel: "Website rebuild",
      total: "£4,200",
      estimatedWeeks: "4 weeks",
      isEn: true,
      pdfBase64,
      _gotcha: "",
    };

    it("catches honeypot", async () => {
      const body = JSON.stringify({ ...payload, _gotcha: "x" });
      const res = await worker.fetch(
        request("/api/quotes/email", { method: "POST", body }),
        createEnv(),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
    });

    it("returns 400 when PDF is missing", async () => {
      const body = JSON.stringify({ ...payload, pdfBase64: "" });
      const res = await worker.fetch(
        request("/api/quotes/email", { method: "POST", body }),
        createEnv(),
      );
      expect(res.status).toBe(400);
    });

    it("sends quote to client and owner", async () => {
      const sent: string[] = [];
      mockFetch(async (url) => {
        if (url.includes("api.resend.com")) {
          sent.push(url);
          return Response.json({ id: "q" });
        }
        return undefined;
      });
      const body = JSON.stringify(payload);
      const res = await worker.fetch(
        request("/api/quotes/email", { method: "POST", body }),
        createEnv(),
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true });
      expect(sent).toHaveLength(2);
    });
  });
});
