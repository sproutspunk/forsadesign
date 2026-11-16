import { beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../src/index";

let sequence = 0;
function environment() {
  const store = new Map<string, string>();
  return {
    store,
    env: {
      RESEND_API_KEY: "test",
      LEADS: {
        get: async (key: string) => store.get(key) ?? null,
        put: async (key: string, value: string) => {
          store.set(key, value);
        },
        delete: async (key: string) => {
          store.delete(key);
        },
        list: async () => ({
          keys: [...store.keys()].map((name) => ({ name })),
          list_complete: true,
        }),
      },
    },
  };
}
function request(
  path: string,
  data?: Record<string, unknown>,
  origin = "https://forsadesign.co.uk",
) {
  return new Request(`https://forsa-api.sproutspunk.workers.dev${path}`, {
    method: data ? "POST" : "GET",
    headers: {
      origin,
      "content-type": "application/json",
      "CF-Connecting-IP": `newsletter-${++sequence}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  });
}
function signup(email = "reader@example.test") {
  return { email, consent: true, language: "pl", source: "blog-index" };
}
function subscriber(store: Map<string, string>) {
  return JSON.parse([...store].find(([key]) => key.startsWith("newsletter:subscriber:"))![1]);
}
beforeEach(() => vi.restoreAllMocks());
describe("newsletter consent lifecycle", () => {
  it("rejects missing consent and unavailable storage without sending", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const { env } = environment();
    expect(
      (await worker.fetch(request("/api/newsletter", { email: "reader@example.test" }), env))
        .status,
    ).toBe(400);
    expect(
      (await worker.fetch(request("/api/newsletter", signup()), { RESEND_API_KEY: "test" })).status,
    ).toBe(503);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("keeps subscription pending on link GET, confirms on POST and permits unsubscribe", async () => {
    const { store, env } = environment();
    let emailText = "";
    vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      emailText = JSON.parse(String(init?.body)).text;
      return new Response(JSON.stringify({ id: "mail" }), { status: 200 });
    });
    expect((await worker.fetch(request("/api/newsletter", signup()), env)).status).toBe(202);
    expect(subscriber(store).status).toBe("pending");
    const link = emailText.match(/https:\/\/[^\s]+\/api\/newsletter\/confirm\?[^\s]+/)![0];
    const url = new URL(link);
    const token = url.searchParams.get("token")!;
    expect((await worker.fetch(request(url.pathname + url.search), env)).status).toBe(200);
    expect(subscriber(store).status).toBe("pending");
    const result = await worker.fetch(
      request("/api/newsletter/confirm", { token, language: "pl" }, url.origin),
      env,
    );
    expect(result.status).toBe(200);
    expect(subscriber(store).status).toBe("active");
    const unsubscribeToken = subscriber(store).unsubscribeToken;
    await worker.fetch(
      request(`/api/newsletter/unsubscribe?token=${unsubscribeToken}&language=pl`),
      env,
    );
    expect(subscriber(store).status).toBe("active");
    expect(
      (
        await worker.fetch(
          request(
            "/api/newsletter/unsubscribe",
            { token: unsubscribeToken, language: "pl" },
            url.origin,
          ),
          env,
        )
      ).status,
    ).toBe(200);
    expect(subscriber(store).status).toBe("unsubscribed");
    expect(
      (await worker.fetch(request("/api/newsletter/confirm", { token }, url.origin), env)).status,
    ).toBe(400);
    expect(subscriber(store).status).toBe("unsubscribed");
  });
  it("returns failure and removes the pending record if email delivery API fails", async () => {
    const { store, env } = environment();
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("provider unavailable", { status: 503 }),
    );
    expect((await worker.fetch(request("/api/newsletter", signup()), env)).status).toBe(502);
    expect(store.size).toBe(0);
  });
  it("limits repeated confirmation emails without exposing subscription status", async () => {
    const { env } = environment();
    const fetch = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ id: "mail" }), { status: 200 }));
    const one = await worker.fetch(request("/api/newsletter", signup()), env);
    const two = await worker.fetch(request("/api/newsletter", signup()), env);
    expect(one.status).toBe(202);
    expect(two.status).toBe(202);
    expect(await one.text()).toBe(await two.text());
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("rejects expired confirmation links", async () => {
    const { env, store } = environment();
    let emailText = "";
    vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      emailText = JSON.parse(String(init?.body)).text;
      return new Response(JSON.stringify({ id: "mail" }), { status: 200 });
    });
    await worker.fetch(request("/api/newsletter", signup()), env);
    const url = new URL(emailText.match(/https:\/\/[^\s]+\/api\/newsletter\/confirm\?[^\s]+/)![0]);
    const now = Date.now();
    vi.spyOn(Date, "now").mockReturnValue(now + 25 * 60 * 60 * 1000);
    expect((await worker.fetch(request(url.pathname + url.search), env)).status).toBe(400);
    expect(subscriber(store).status).toBe("pending");
  });
  it("accepts the native HTML confirmation form and allows unsubscribe without email credentials", async () => {
    const { env, store } = environment();
    let emailText = "";
    vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      emailText = JSON.parse(String(init?.body)).text;
      return new Response(JSON.stringify({ id: "mail" }), { status: 200 });
    });
    await worker.fetch(request("/api/newsletter", signup()), env);
    const url = new URL(emailText.match(/https:\/\/[^\s]+\/api\/newsletter\/confirm\?[^\s]+/)![0]);
    const result = await worker.fetch(
      new Request(url.origin + url.pathname, {
        method: "POST",
        headers: {
          origin: url.origin,
          "content-type": "application/x-www-form-urlencoded",
          accept: "text/html",
          "CF-Connecting-IP": `newsletter-${++sequence}`,
        },
        body: new URLSearchParams({
          token: url.searchParams.get("token")!,
          language: "pl",
        }).toString(),
      }),
      env,
    );
    expect(result.status).toBe(200);
    expect(await result.text()).toContain("Zapis potwierdzony");
    const unsubscribeToken = subscriber(store).unsubscribeToken;
    expect(
      (
        await worker.fetch(
          request("/api/newsletter/unsubscribe", { token: unsubscribeToken }, url.origin),
          { LEADS: env.LEADS },
        )
      ).status,
    ).toBe(200);
    expect(subscriber(store).status).toBe("unsubscribed");
  });
  it("rejects foreign origins even for confirmation actions", async () => {
    const { env } = environment();
    expect(
      (
        await worker.fetch(
          request("/api/newsletter/confirm", { token: "a".repeat(64) }, "https://attacker.example"),
          env,
        )
      ).status,
    ).toBe(403);
  });
});
