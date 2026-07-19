import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { EventEmitter } from "events";
import tls from "tls";
import { sendViaProton } from "./smtp";

// Fakes a Proton SMTP session over `tls.connect`: replies with the SMTP status
// code expected at each protocol step so `sendViaProton` can run end-to-end
// without any real network I/O, and captures the raw bytes it wrote so we can
// assert on header/body framing.
class FakeSocket extends EventEmitter {
  written: string[] = [];
  write(data: string) {
    this.written.push(data);
    return true;
  }
  end() {}
  destroy() {}
  off(event: string, listener: (...args: unknown[]) => void) {
    return super.off(event, listener);
  }
}

function reply(socket: FakeSocket, code: string) {
  queueMicrotask(() => socket.emit("data", Buffer.from(`${code} OK\r\n`)));
}

describe("sendViaProton", () => {
  let socket: FakeSocket;

  beforeEach(() => {
    process.env.PROTON_SMTP_USER = "hello@forsadesign.co.uk";
    process.env.PROTON_SMTP_PASS = "token";

    socket = new FakeSocket();
    vi.spyOn(tls, "connect").mockImplementation((...args: unknown[]) => {
      const onConnect = args.find((a) => typeof a === "function") as (() => void) | undefined;
      queueMicrotask(() => {
        reply(socket, "220"); // greeting
        onConnect?.();
      });
      return socket as unknown as tls.TLSSocket;
    });

    // Every subsequent socket.write() should be met with the next expected
    // reply code, in protocol order.
    const codes = ["250", "334", "334", "235", "250", "250", "354", "250", "221"];
    let i = 0;
    socket.write = (data: string) => {
      socket.written.push(data);
      const code = codes[i++];
      if (code) reply(socket, code);
      return true;
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.PROTON_SMTP_USER;
    delete process.env.PROTON_SMTP_PASS;
  });

  it("RFC-2047-encodes non-ASCII subjects instead of sending raw UTF-8 header bytes", async () => {
    await sendViaProton({
      from: "hello@forsadesign.co.uk",
      to: "jane@example.com",
      subject: "Thanks for getting in touch — Forsa Design",
      text: "Hi Jane,\r\n\r\nThanks!\r\n",
    });

    const dataFrame = socket.written.find((w) => w.includes("Subject:"));
    expect(dataFrame).toBeDefined();
    expect(dataFrame).toMatch(/Subject: =\?UTF-8\?B\?[A-Za-z0-9+/=]+\?=/);
    expect(dataFrame).not.toContain("—");
  });

  it("leaves ASCII-only subjects untouched", async () => {
    await sendViaProton({
      from: "hello@forsadesign.co.uk",
      to: "jane@example.com",
      subject: "New enquiry: Branding",
      text: "Details\r\n",
    });

    const dataFrame = socket.written.find((w) => w.includes("Subject:"));
    expect(dataFrame).toContain("Subject: New enquiry: Branding");
  });

  it("normalises the body to CRLF without doubling carriage returns", async () => {
    await sendViaProton({
      from: "hello@forsadesign.co.uk",
      to: "jane@example.com",
      subject: "Plain",
      text: "Line one\r\nLine two\r\n",
    });

    const dataFrame = socket.written.find((w) => w.includes("Line one"));
    expect(dataFrame).toBeDefined();
    expect(dataFrame).not.toContain("\r\r\n");
    expect(dataFrame).toContain("Line one\r\nLine two");
  });
});
