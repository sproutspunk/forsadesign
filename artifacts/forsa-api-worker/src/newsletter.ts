interface NewsletterKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}
export interface NewsletterEnv {
  LEADS?: NewsletterKV;
  RESEND_API_KEY?: string;
}
interface Subscriber {
  email: string;
  language: "pl" | "en";
  status: "pending" | "active" | "unsubscribed";
  requestedAt: number;
  confirmedAt?: number;
  unsubscribedAt?: number;
  consentVersion: string;
  source: string;
  confirmationHash?: string;
  unsubscribeToken?: string;
}
type MailSender = (key: string, data: Record<string, unknown>) => Promise<boolean>;
const TOKEN_LIFETIME = 24 * 60 * 60 * 1000;
const consentVersion = "newsletter-2026-11-16";
const tokenPattern = /^[a-f0-9]{64}$/;
const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
async function hash(value: string) {
  const bytes = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)),
  );
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function token() {
  return [...crypto.getRandomValues(new Uint8Array(32))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function page(title: string, text: string, language: "pl" | "en", form = "", status = 200) {
  return new Response(
    `<!doctype html><html lang="${language}"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)} | Forsa Design</title><style>body{max-width:640px;margin:12vh auto;padding:24px;background:#0c2235;color:#edf1f4;font:18px/1.6 system-ui}a{color:#e2bf61}button{padding:14px 24px;background:#e2bf61;color:#0c2235;border:0;border-radius:5px;font:inherit;cursor:pointer}</style><main><h1>${esc(title)}</h1><p>${esc(text)}</p>${form}<p><a href="https://forsadesign.co.uk/${language}/blog/">${language === "pl" ? "Wróć do bloga" : "Back to the blog"}</a></p></main></html>`,
    {
      status,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "referrer-policy": "no-referrer",
        "x-content-type-options": "nosniff",
        "content-security-policy":
          "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
        "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
      },
    },
  );
}
function response(
  request: Request,
  origin: string | null,
  language: "pl" | "en",
  message: string,
  status: number,
) {
  if (request.headers.get("accept")?.includes("text/html"))
    return page(
      language === "pl" ? "Newsletter Forsa Design" : "Forsa Design newsletter",
      message,
      language,
      "",
      status,
    );
  return new Response(
    JSON.stringify(status < 400 ? { ok: true, status: "pending", message } : { error: message }),
    {
      status,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
        "cache-control": "no-store",
        ...(origin ? { "Access-Control-Allow-Origin": origin, Vary: "Origin" } : {}),
      },
    },
  );
}
async function payload(request: Request): Promise<Record<string, unknown> | null> {
  const reader = request.body?.getReader();
  if (!reader) return null;
  let length = 0;
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > 4000) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const all = new Uint8Array(length);
  let offset = 0;
  for (const c of chunks) {
    all.set(c, offset);
    offset += c.length;
  }
  const text = new TextDecoder().decode(all);
  try {
    const form: Record<string, string> = {};
    new URLSearchParams(text).forEach((value, key) => {
      form[key] = value;
    });
    const value = request.headers.get("content-type")?.includes("application/json")
      ? JSON.parse(text)
      : form;
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

export async function handleNewsletter(
  request: Request,
  env: NewsletterEnv,
  origin: string | null,
  send: MailSender,
): Promise<Response> {
  const url = new URL(request.url);
  const action = url.pathname.endsWith("/confirm")
    ? "confirm"
    : url.pathname.endsWith("/unsubscribe")
      ? "unsubscribe"
      : "signup";
  const data = request.method === "POST" ? await payload(request) : null;
  const language = (data?.language ?? url.searchParams.get("language")) === "pl" ? "pl" : "en";
  if (!env.LEADS || (action === "signup" && !env.RESEND_API_KEY))
    return response(
      request,
      origin,
      language,
      language === "pl"
        ? "Zapis jest chwilowo niedostępny. Spróbuj ponownie później."
        : "Signup is temporarily unavailable. Please try again later.",
      503,
    );
  const kv = env.LEADS;
  if (action === "signup") {
    if (request.method !== "POST")
      return response(request, origin, language, "Method not allowed.", 405);
    if (typeof data?._gotcha === "string" && data._gotcha.trim())
      return response(request, origin, language, "Please check your inbox.", 202);
    const email = typeof data?.email === "string" ? data.email.trim().toLowerCase() : "";
    if (
      !email ||
      email.length > 320 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !(data?.consent === true || data?.consent === "yes")
    )
      return response(
        request,
        origin,
        language,
        language === "pl"
          ? "Podaj poprawny adres e-mail i zaznacz zgodę na newsletter."
          : "Enter a valid email address and agree to receive the newsletter.",
        400,
      );
    const message =
      language === "pl"
        ? "Sprawdź skrzynkę i potwierdź zapis linkiem w wiadomości. Jeśli adres jest już zapisany, nie musisz nic robić."
        : "Check your inbox and confirm using the email link. If you are already subscribed, no further action is needed.";
    const emailHash = await hash(email);
    const key = `newsletter:subscriber:${emailHash}`;
    const previous = await kv.get(key);
    const existing: Subscriber | null = previous ? JSON.parse(previous) : null;
    if (
      existing?.status === "active" ||
      (existing?.status === "pending" && Date.now() - existing.requestedAt < 60 * 60 * 1000)
    )
      return response(request, origin, language, message, 202);
    const rawToken = token();
    const confirmationHash = await hash(rawToken);
    const requestedAt = Date.now();
    const subscriber: Subscriber = {
      email,
      language,
      status: "pending",
      requestedAt,
      consentVersion,
      source: typeof data?.source === "string" ? data.source.slice(0, 160) : "blog",
      confirmationHash,
    };
    await kv.put(
      `newsletter:confirm:${confirmationHash}`,
      JSON.stringify({ emailHash, expiresAt: requestedAt + TOKEN_LIFETIME }),
      { expirationTtl: 86400 },
    );
    await kv.put(key, JSON.stringify(subscriber), { expirationTtl: 86400 });
    const confirmationUrl = `${url.origin}/api/newsletter/confirm?token=${rawToken}&language=${language}`;
    const text =
      language === "pl"
        ? `Potwierdź zapis do newslettera Forsa Design\n\nKliknij link, a następnie potwierdź zapis na stronie:\n${confirmationUrl}\n\nLink jest ważny przez 24 godziny. Będziemy wysyłać nowe artykuły i wskazówki o stronach oraz systemach B2B. Jeśli nie proszono o tę wiadomość, zignoruj ją. Adres nie zostanie aktywowany bez potwierdzenia.\n\nForsa Design, Banff, Scotland\nhello@forsadesign.co.uk\nPolityka prywatności: https://forsadesign.co.uk/pl/privacy/`
        : `Confirm your Forsa Design newsletter subscription\n\nOpen this link and confirm on the page:\n${confirmationUrl}\n\nThe link expires after 24 hours. We will send new articles and guidance about B2B websites and systems. If you did not request this email, ignore it. Your address will not be activated without confirmation.\n\nForsa Design, Banff, Scotland\nhello@forsadesign.co.uk\nPrivacy: https://forsadesign.co.uk/en/privacy/`;
    let sent: boolean;
    try {
      sent = await send(env.RESEND_API_KEY!, {
        from: "Forsa Design <hello@forsadesign.co.uk>",
        to: [email],
        subject:
          language === "pl"
            ? "Potwierdź zapis do newslettera Forsa Design"
            : "Confirm your Forsa Design newsletter subscription",
        text,
      });
    } catch {
      sent = false;
    }
    if (!sent) {
      await kv.delete(`newsletter:confirm:${confirmationHash}`);
      if (previous) await kv.put(key, previous);
      else await kv.delete(key);
      return response(
        request,
        origin,
        language,
        language === "pl"
          ? "Nie udało się wysłać potwierdzenia. Spróbuj ponownie później."
          : "We could not send the confirmation. Please try again later.",
        502,
      );
    }
    return response(request, origin, language, message, 202);
  }
  const rawToken =
    typeof data?.token === "string" ? data.token : (url.searchParams.get("token") ?? "");
  if (!tokenPattern.test(rawToken))
    return page(
      language === "pl" ? "Nieprawidłowy link" : "Invalid link",
      language === "pl"
        ? "Wróć do formularza i poproś o nowy link."
        : "Return to the signup form and request a new link.",
      language,
      "",
      400,
    );
  const tokenHash = await hash(rawToken);
  const mapping = await kv.get(`newsletter:${action}:${tokenHash}`);
  if (!mapping)
    return page(
      language === "pl" ? "Link wygasł lub został już użyty" : "Link expired or already used",
      language === "pl"
        ? "Możesz ponownie użyć formularza na blogu. W sprawie wypisania napisz na hello@forsadesign.co.uk."
        : "You can use the blog signup form again. For unsubscribe help, contact hello@forsadesign.co.uk.",
      language,
      "",
      400,
    );
  const info = JSON.parse(mapping) as { emailHash: string; expiresAt?: number };
  const stored = await kv.get(`newsletter:subscriber:${info.emailHash}`);
  const subscriber: Subscriber | null = stored ? JSON.parse(stored) : null;
  if (
    !subscriber ||
    (action === "confirm" &&
      (!info.expiresAt ||
        info.expiresAt < Date.now() ||
        subscriber.confirmationHash !== tokenHash ||
        subscriber.status !== "pending"))
  )
    return page(
      language === "pl" ? "Link jest nieaktualny" : "This link is no longer valid",
      language === "pl"
        ? "Poproś o nowy link przez formularz zapisu."
        : "Request a new link using the signup form.",
      language,
      "",
      400,
    );
  if (request.method === "GET") {
    const title =
      action === "confirm"
        ? language === "pl"
          ? "Potwierdź zapis"
          : "Confirm subscription"
        : language === "pl"
          ? "Wypisz się z newslettera"
          : "Unsubscribe from the newsletter";
    const form = `<form method="post" action="/api/newsletter/${action}"><input type="hidden" name="token" value="${rawToken}"><input type="hidden" name="language" value="${language}"><button type="submit">${esc(title)}</button></form>`;
    return page(
      title,
      language === "pl"
        ? "Naciśnij przycisk, aby zatwierdzić swój wybór."
        : "Press the button to confirm your choice.",
      language,
      form,
    );
  }
  if (request.method !== "POST") return page("Method not allowed", "", language, "", 405);
  if (action === "confirm") {
    subscriber.status = "active";
    subscriber.confirmedAt = Date.now();
    delete subscriber.confirmationHash;
    subscriber.unsubscribeToken = token();
    await kv.put(
      `newsletter:unsubscribe:${await hash(subscriber.unsubscribeToken)}`,
      JSON.stringify({ emailHash: info.emailHash }),
    );
    await kv.put(`newsletter:subscriber:${info.emailHash}`, JSON.stringify(subscriber));
    await kv.delete(`newsletter:confirm:${tokenHash}`);
    const title = language === "pl" ? "Zapis potwierdzony" : "Subscription confirmed";
    const unsubscribe = `${url.origin}/api/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}&language=${language}`;
    return page(
      title,
      language === "pl"
        ? "Twój adres został zapisany do newslettera Forsa Design."
        : "Your address is subscribed to the Forsa Design newsletter.",
      language,
      `<p><a href="${esc(unsubscribe)}">${language === "pl" ? "Wypisz się" : "Unsubscribe"}</a></p>`,
    );
  }
  subscriber.status = "unsubscribed";
  subscriber.unsubscribedAt = Date.now();
  delete subscriber.confirmationHash;
  await kv.put(`newsletter:subscriber:${info.emailHash}`, JSON.stringify(subscriber));
  return page(
    language === "pl" ? "Wypisano z newslettera" : "You have unsubscribed",
    language === "pl"
      ? "Nie będziemy wysyłać newslettera na ten adres."
      : "We will not send the newsletter to this address.",
    language,
  );
}
