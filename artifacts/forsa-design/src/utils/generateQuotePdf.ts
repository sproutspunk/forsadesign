import { PDFDocument, StandardFonts, rgb, PDFFont, PDFPage } from "pdf-lib";

// Transliterate Polish characters for standard PDF fonts (which only support cp1252/Latin-1)
function pl(s: string): string {
  return s
    .replace(/ą/g, "a")
    .replace(/Ą/g, "A")
    .replace(/ć/g, "c")
    .replace(/Ć/g, "C")
    .replace(/ę/g, "e")
    .replace(/Ę/g, "E")
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .replace(/ń/g, "n")
    .replace(/Ń/g, "N")
    .replace(/ó/g, "o")
    .replace(/Ó/g, "O")
    .replace(/ś/g, "s")
    .replace(/Ś/g, "S")
    .replace(/ź/g, "z")
    .replace(/Ź/g, "Z")
    .replace(/ż/g, "z")
    .replace(/Ż/g, "Z");
}

// Colours (pdf-lib uses 0-1 range)
const NAVY = rgb(0.039, 0.102, 0.196); // #0A1A32
const GOLD = rgb(0.784, 0.647, 0.255); // #C8A541
const GOLD_LIGHT = rgb(0.98, 0.94, 0.82);
const LIGHT_GREY = rgb(0.95, 0.95, 0.96);
const MID_GREY = rgb(0.6, 0.6, 0.65);
const DARK = rgb(0.1, 0.1, 0.13);

// A4 dimensions in points
const W = 595;
const H = 842;
const MARGIN = 40;
const COL = W - MARGIN * 2;

interface LineItem {
  label: string;
  value: number;
}

interface PdfData {
  quoteId: string;
  dateStr: string;
  projectLabel: string;
  subtotal: number;
  total: number;
  discountAmount: number;
  maintenanceMonthly: number;
  estimatedWeeks: string;
  lineItems: LineItem[];
  includedItems: string[];
  formatPrice: (n: number) => string;
  isEn: boolean;
}

function t(data: PdfData, en: string, plStr: string) {
  return pl(data.isEn ? en : plStr);
}

function drawText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  font: PDFFont,
  size: number,
  color = DARK,
) {
  page.drawText(pl(text), { x, y, font, size, color });
}

function textWidth(text: string, font: PDFFont, size: number) {
  return font.widthOfTextAtSize(pl(text), size);
}

export async function generateQuotePdf(data: PdfData): Promise<void> {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg = await doc.embedFont(StandardFonts.Helvetica);

  const page = doc.addPage([W, H]);

  let y = H;

  // ── Header banner ────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: H - 80, width: W, height: 80, color: NAVY });

  // Company name
  drawText(page, "FORSA DESIGN", MARGIN, H - 30, fontBold, 18, GOLD);
  drawText(page, "forsadesign.co.uk", MARGIN, H - 47, fontReg, 9, rgb(0.7, 0.75, 0.82));
  drawText(page, "hello@forsadesign.co.uk", MARGIN, H - 59, fontReg, 9, rgb(0.7, 0.75, 0.82));

  // "QUOTE" badge on the right
  const badgeLabel = t(data, "WEBSITE QUOTE", "WYCENA STRONY");
  const badgeW = textWidth(badgeLabel, fontBold, 11) + 20;
  page.drawRectangle({ x: W - MARGIN - badgeW, y: H - 57, width: badgeW, height: 26, color: GOLD });
  drawText(page, badgeLabel, W - MARGIN - badgeW + 10, H - 49, fontBold, 11, NAVY);

  y = H - 100;

  // ── Quote meta row ────────────────────────────────────────────────
  const metaItems = [
    { label: t(data, "Quote Ref", "Nr wyceny"), value: data.quoteId },
    { label: t(data, "Date", "Data"), value: data.dateStr },
    { label: t(data, "Project", "Projekt"), value: pl(data.projectLabel) },
  ];

  page.drawRectangle({ x: MARGIN, y: y - 38, width: COL, height: 46, color: LIGHT_GREY });
  metaItems.forEach((item, i) => {
    const colX = MARGIN + 8 + i * (COL / 3);
    drawText(page, item.label.toUpperCase(), colX, y, fontBold, 7, MID_GREY);
    drawText(page, item.value, colX, y - 16, fontBold, 10, DARK);
  });

  y -= 58;

  // ── Section: Cost breakdown ───────────────────────────────────────
  drawText(page, t(data, "COST BREAKDOWN", "ZESTAWIENIE KOSZTOW"), MARGIN, y, fontBold, 9, GOLD);
  y -= 14;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: W - MARGIN, y },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.88),
  });
  y -= 4;

  const rowH = 16;
  data.lineItems.forEach((item, i) => {
    if (i % 2 === 0) {
      page.drawRectangle({
        x: MARGIN,
        y: y - rowH + 3,
        width: COL,
        height: rowH,
        color: LIGHT_GREY,
      });
    }
    drawText(page, pl(item.label), MARGIN + 6, y - 4, fontReg, 9, DARK);
    const valStr = `+${data.formatPrice(item.value)}`;
    const vw = textWidth(valStr, fontBold, 9);
    drawText(page, valStr, W - MARGIN - vw - 6, y - 4, fontBold, 9, DARK);
    y -= rowH;
  });

  if (data.discountAmount > 0) {
    drawText(page, t(data, "Discount", "Rabat"), MARGIN + 6, y - 4, fontReg, 9, rgb(0.1, 0.6, 0.3));
    const valStr = `-${data.formatPrice(data.discountAmount)}`;
    const vw = textWidth(valStr, fontBold, 9);
    drawText(page, valStr, W - MARGIN - vw - 6, y - 4, fontBold, 9, rgb(0.1, 0.6, 0.3));
    y -= rowH;
  }

  y -= 4;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: W - MARGIN, y },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.88),
  });
  y -= 4;

  // Total box
  page.drawRectangle({ x: MARGIN, y: y - 28, width: COL, height: 36, color: NAVY });
  drawText(
    page,
    t(data, "TOTAL", "ŁĄCZNIE"),
    MARGIN + 10,
    y - 9,
    fontBold,
    10,
    rgb(0.75, 0.8, 0.9),
  );
  const totStr = data.formatPrice(data.total);
  const totW = textWidth(totStr, fontBold, 16);
  drawText(page, totStr, W - MARGIN - totW - 10, y - 13, fontBold, 16, GOLD);
  // subtotal note under total (when discount applied)
  if (data.discountAmount > 0) {
    y -= 14;
    const subStr = data.formatPrice(data.subtotal);
    const subNote = `${data.isEn ? "Before discount" : "Przed rabatem"}: ${subStr}`;
    const subW = textWidth(subNote, fontReg, 8);
    drawText(page, subNote, W - MARGIN - subW - 10, y, fontReg, 8, MID_GREY);
  }
  y -= 46;

  if (data.maintenanceMonthly > 0) {
    y -= 4;
    drawText(
      page,
      `${t(data, "Monthly Maintenance", "Miesięczna konserwacja")}: ${data.formatPrice(data.maintenanceMonthly)}/${t(data, "mo", "mies.")}`,
      MARGIN,
      y,
      fontReg,
      9,
      MID_GREY,
    );
    y -= 14;
  }

  y -= 16;

  // ── Section: Included ─────────────────────────────────────────────
  drawText(
    page,
    t(data, "INCLUDED IN EVERY PROJECT", "W KAZDYM PROJEKCIE"),
    MARGIN,
    y,
    fontBold,
    9,
    GOLD,
  );
  y -= 14;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: W - MARGIN, y },
    thickness: 0.5,
    color: rgb(0.85, 0.85, 0.88),
  });
  y -= 6;

  const halfCol = COL / 2;
  data.includedItems.forEach((item, i) => {
    const col2 = i % 2;
    const row = Math.floor(i / 2);
    const ix = MARGIN + col2 * halfCol;
    const iy = y - row * 15;
    // bullet circle
    page.drawCircle({ x: ix + 5, y: iy - 3, size: 3, color: GOLD });
    drawText(page, pl(item), ix + 14, iy - 7, fontReg, 9, DARK);
  });
  y -= Math.ceil(data.includedItems.length / 2) * 15 + 12;

  // ── Section: Delivery ─────────────────────────────────────────────
  page.drawRectangle({ x: MARGIN, y: y - 28, width: COL, height: 36, color: GOLD_LIGHT });
  const delivLabel = t(data, "Estimated Delivery:", "Szacowany czas realizacji:");
  drawText(page, delivLabel, MARGIN + 10, y - 9, fontBold, 10, NAVY);
  const delivVal = pl(data.estimatedWeeks);
  const dlw = textWidth(delivVal, fontBold, 10);
  drawText(page, delivVal, W - MARGIN - dlw - 10, y - 9, fontBold, 10, NAVY);
  y -= 46;

  // ── Disclaimer ────────────────────────────────────────────────────
  y -= 8;
  drawText(
    page,
    t(
      data,
      "This is an indicative estimate. Final pricing confirmed after a discovery call.",
      "To jest wstępna wycena. Ostateczna cena potwierdzona po rozmowie wstępnej.",
    ),
    MARGIN,
    y,
    fontReg,
    8,
    MID_GREY,
  );

  // ── Footer ────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width: W, height: 36, color: NAVY });
  const footer =
    "Forsa Design Ltd  |  Banff, Scotland  |  forsadesign.co.uk  |  hello@forsadesign.co.uk";
  drawText(page, footer, MARGIN, 13, fontReg, 8, rgb(0.65, 0.7, 0.8));

  // ── Save ──────────────────────────────────────────────────────────
  const pdfBytes = await doc.save();
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `forsa-quote-${new Date().toISOString().slice(0, 10)}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
