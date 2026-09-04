// Diagnostic script that validates real TURNSTILE_SECRET_KEY and RESEND_API_KEY.
// Run with:
//   TURNSTILE_SECRET_KEY=xxx RESEND_API_KEY=xxx node scripts/test-secrets.mjs
// A Turnstile test token is verified against Cloudflare. Resend is validated by
// calling its /api-keys endpoint (read-only) so no email is sent.

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function fail(label, detail) {
  console.error(`❌ ${label}: ${detail}`);
  process.exit(1);
}

function pass(label, detail) {
  console.log(`✅ ${label}: ${detail}`);
}

async function testTurnstile() {
  if (!TURNSTILE_SECRET) return fail("TURNSTILE_SECRET_KEY", "missing");
  // Cloudflare test token that always passes in test mode with a test key.
  const testToken = "XXXX.DUMMY.TOKEN";
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: testToken,
      remoteip: "127.0.0.1",
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) return fail("Turnstile HTTP", `status ${response.status}`);
  if (result.success === true) {
    pass("Turnstile", "secret key is valid");
  } else {
    // Invalid token is expected for a dummy token; a real misconfigured key returns different errors.
    const code = result["error-codes"]?.[0] ?? "unknown";
    if (code === "invalid-input-secret" || code === "bad-request") {
      fail("Turnstile secret", `invalid secret key (${code})`);
    } else {
      pass("Turnstile secret", `key accepted (token rejected as expected: ${code})`);
    }
  }
}

async function testResend() {
  if (!RESEND_API_KEY) return fail("RESEND_API_KEY", "missing");
  const response = await fetch("https://api.resend.com/api-keys", {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  });
  if (!response.ok) {
    const text = await response.text().catch(() => "unknown");
    return fail("Resend", `status ${response.status} - ${text.slice(0, 200)}`);
  }
  pass("Resend", "API key is valid");
}

async function main() {
  console.log("Testing API secrets...\n");
  await testTurnstile();
  await testResend();
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
