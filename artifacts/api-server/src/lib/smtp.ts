import tls from "tls";

// Minimal SMTP client for Proton Mail (port 465, direct TLS).
// Uses only Node.js built-ins — zero external dependencies.
//
// Requires environment variables:
//   PROTON_SMTP_HOST — smtp.protonmail.ch (default)
//   PROTON_SMTP_PORT — 465 (default)
//   PROTON_SMTP_USER — hello@forsadesign.co.uk
//   PROTON_SMTP_PASS — SMTP token from Proton settings
//
// Proton docs: https://proton.me/support/smtp-submission

function waitForResponse(socket: tls.TLSSocket, expectedCode: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error("SMTP timeout waiting for response"));
    }, 30000);

    let buffer = "";
    const onData = (data: Buffer) => {
      buffer += data.toString("utf-8");
      // SMTP response ends with CRLF; multi-line responses end each line with CRLF.
      // Simple check: buffer has a line and the last non-empty line starts with expectedCode.
      const lines = buffer.split("\r\n").filter(Boolean);
      const last = lines[lines.length - 1];
      if (last && last.startsWith(expectedCode)) {
        clearTimeout(timeout);
        socket.off("data", onData);
        resolve(buffer);
      }
    };
    socket.on("data", onData);
  });
}

function sendLine(socket: tls.TLSSocket, line: string): void {
  socket.write(line + "\r\n");
}

// SMTP headers must be ASCII (RFC 5322/2047); raw UTF-8 (e.g. an em dash "—" or
// Polish diacritics) is invalid and can cause strict servers like Proton to
// reject the message. Encode as an RFC 2047 encoded-word when needed.
function encodeHeaderValue(value: string): string {
  // eslint-disable-next-line no-control-regex -- intentionally matching the full ASCII range
  if (/^[\x00-\x7F]*$/.test(value)) return value;
  return `=?UTF-8?B?${Buffer.from(value, "utf-8").toString("base64")}?=`;
}

export interface SmtpMail {
  from: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

export async function sendViaProton(mail: SmtpMail): Promise<void> {
  const host = process.env.PROTON_SMTP_HOST || "smtp.protonmail.ch";
  const port = Number(process.env.PROTON_SMTP_PORT || "465");
  const user = process.env.PROTON_SMTP_USER;
  const pass = process.env.PROTON_SMTP_PASS;

  if (!user || !pass) {
    throw new Error("PROTON_SMTP_USER and PROTON_SMTP_PASS must be set");
  }

  return new Promise((resolve, reject) => {
    let resolved = false;
    function done(err?: Error) {
      if (!resolved) {
        resolved = true;
        if (err) reject(err);
        else resolve();
      }
    }

    const socket = tls.connect({ host, port, servername: host }, async () => {
      try {
        // Wait for greeting
        await waitForResponse(socket, "220");

        // EHLO
        sendLine(socket, `EHLO ${host}`);
        await waitForResponse(socket, "250");

        // AUTH LOGIN
        sendLine(socket, "AUTH LOGIN");
        await waitForResponse(socket, "334");

        // Username (base64)
        sendLine(socket, Buffer.from(user).toString("base64"));
        await waitForResponse(socket, "334");

        // Password (base64)
        sendLine(socket, Buffer.from(pass).toString("base64"));
        await waitForResponse(socket, "235");

        // MAIL FROM
        sendLine(socket, `MAIL FROM:<${mail.from}>`);
        await waitForResponse(socket, "250");

        // RCPT TO
        sendLine(socket, `RCPT TO:<${mail.to}>`);
        await waitForResponse(socket, "250");

        // DATA
        sendLine(socket, "DATA");
        await waitForResponse(socket, "354");

        // Build the MIME envelope
        const headers: string[] = [
          `From: ${mail.from}`,
          `To: ${mail.to}`,
          `Subject: ${encodeHeaderValue(mail.subject)}`,
          "MIME-Version: 1.0",
          'Content-Type: text/plain; charset="UTF-8"',
          "Content-Transfer-Encoding: 8bit",
        ];
        if (mail.replyTo) {
          headers.push(`Reply-To: ${mail.replyTo}`);
        }

        // SMTP requires CRLF line endings. Normalise any line ending style to
        // CRLF (splitting on "\n" alone when the input already uses "\r\n"
        // would otherwise double up the "\r", corrupting the DATA payload).
        // Also escape any line that starts with "." by adding another dot
        // (RFC 5321 §4.5.2).
        const escapedBody = mail.text
          .split(/\r\n|\r|\n/)
          .map((line) => (line.startsWith(".") ? "." + line : line))
          .join("\r\n");

        const message = [...headers, "", escapedBody].join("\r\n") + "\r\n.";
        sendLine(socket, message);
        await waitForResponse(socket, "250");

        // QUIT
        sendLine(socket, "QUIT");
        await waitForResponse(socket, "221");

        socket.end();
        done();
      } catch (err) {
        socket.destroy();
        done(err instanceof Error ? err : new Error(String(err)));
      }
    });

    socket.on("error", (err) => {
      done(err);
    });

    socket.on("timeout", () => {
      done(new Error("SMTP connection timed out"));
    });
  });
}
