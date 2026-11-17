// One-off generator for the "5-Minute Procurement Website Audit" lead-magnet PDF.
// Run with: node scripts/generate-audit-checklist-pdf.mjs
// Outputs: public/audit-checklist.pdf
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const NAVY = rgb(0.039, 0.102, 0.196);
const HEADER_BG = rgb(0.051, 0.153, 0.243);
const GOLD = rgb(0.784, 0.647, 0.255);
const LIGHT_GREY = rgb(0.95, 0.95, 0.96);
const MID_GREY = rgb(0.45, 0.45, 0.5);
const DARK = rgb(0.1, 0.1, 0.13);
const WHITE = rgb(1, 1, 1);

const W = 595;
const H = 842;
const MARGIN = 42;
const COL = W - MARGIN * 2;

const CHECKS = [
  [
    "Main content appears promptly on mobile",
    "Compare repeated tests and check a real mobile device",
  ],
  [
    "HTTPS works without certificate warnings",
    "Review TLS; a grade is not a full application security audit",
  ],
  [
    "Contact page has a direct email + phone, not just a form",
    "Make contact options clear and appropriate for the audience",
  ],
  ["Mobile menu works without zooming", "Test on an actual phone, not just DevTools"],
  [
    "Homepage explains the actual service and audience",
    "Use specific service descriptions and a clear next step",
  ],
  [
    "Project examples identify scope and delivery status",
    "Publish only supported claims and authorised materials",
  ],
  [
    "Optional analytics follows the user's cookie choice",
    "A banner alone does not demonstrate legal compliance",
  ],
  ["No broken links or 404 errors on main navigation", "Click every top-level link"],
  ["PDF datasheets download correctly on mobile", "Test on iOS Safari and Android Chrome"],
  [
    "Key tasks work in the supported browsers",
    "Include keyboard operation, mobile and error states",
  ],
];

async function main() {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage([W, H]);

  // Header band
  const headerH = 110;
  page.drawRectangle({ x: 0, y: H - headerH, width: W, height: headerH, color: HEADER_BG });
  page.drawRectangle({ x: 0, y: H - headerH - 4, width: W, height: 4, color: GOLD });
  page.drawText("THE 5-MINUTE PROCUREMENT WEBSITE AUDIT", {
    x: MARGIN,
    y: H - 52,
    font: fontBold,
    size: 20,
    color: WHITE,
  });
  page.drawText("10 practical checks for an initial website review", {
    x: MARGIN,
    y: H - 76,
    font: fontReg,
    size: 12,
    color: GOLD,
  });
  page.drawText("Forsa Design  \u2022  Banff, Aberdeenshire  \u2022  forsadesign.co.uk", {
    x: MARGIN,
    y: H - 96,
    font: fontReg,
    size: 9,
    color: rgb(0.85, 0.85, 0.88),
  });

  // Column headers
  let y = H - headerH - 30;
  const checkColX = W - MARGIN - 150;
  const failColX = W - MARGIN - 100;
  const naColX = W - MARGIN - 50;
  page.drawText("CHECK", { x: checkColX, y, font: fontBold, size: 8, color: MID_GREY });
  page.drawText("FAIL", { x: failColX, y, font: fontBold, size: 8, color: MID_GREY });
  page.drawText("N/A", { x: naColX, y, font: fontBold, size: 8, color: MID_GREY });

  y -= 14;
  const rowH = 55;
  CHECKS.forEach(([title, tip], i) => {
    const rowTop = y - i * rowH;
    if (i % 2 === 0) {
      page.drawRectangle({
        x: MARGIN - 6,
        y: rowTop - rowH + 16,
        width: COL + 12,
        height: rowH - 6,
        color: LIGHT_GREY,
      });
    }
    page.drawText(`${i + 1}.`, { x: MARGIN, y: rowTop, font: fontBold, size: 11, color: NAVY });
    page.drawText(title, { x: MARGIN + 20, y: rowTop, font: fontBold, size: 11, color: DARK });
    page.drawText(tip, {
      x: MARGIN + 20,
      y: rowTop - 15,
      font: fontReg,
      size: 9,
      color: MID_GREY,
    });
    for (const boxX of [checkColX, failColX, naColX]) {
      page.drawRectangle({
        x: boxX,
        y: rowTop - 9,
        width: 14,
        height: 14,
        borderColor: rgb(0.7, 0.7, 0.75),
        borderWidth: 1,
      });
    }
  });

  // Footer CTA box
  const footerY = 70;
  page.drawRectangle({ x: MARGIN - 6, y: footerY - 20, width: COL + 12, height: 70, color: NAVY });
  page.drawRectangle({ x: MARGIN - 6, y: footerY + 46, width: COL + 12, height: 4, color: GOLD });
  page.drawText("Review any failed checks", {
    x: MARGIN + 6,
    y: footerY + 24,
    font: fontBold,
    size: 12,
    color: GOLD,
  });
  page.drawText("This checklist identifies questions; it is not a compliance audit.", {
    x: MARGIN + 6,
    y: footerY + 8,
    font: fontReg,
    size: 10,
    color: WHITE,
  });
  page.drawText("Forsa Design: custom websites and web systems. Banff, Aberdeenshire.", {
    x: MARGIN + 6,
    y: footerY - 8,
    font: fontReg,
    size: 10,
    color: rgb(0.85, 0.85, 0.88),
  });

  const bytes = await doc.save();
  const outPath = join(__dirname, "..", "public", "audit-checklist.pdf");
  writeFileSync(outPath, bytes);
  console.log(`Written ${bytes.length} bytes to ${outPath}`);
}

main();
