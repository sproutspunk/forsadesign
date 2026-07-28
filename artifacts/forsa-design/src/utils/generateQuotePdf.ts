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
const NAVY = rgb(0.039, 0.102, 0.196); // #0A1A32 – text / accent boxes
const HEADER_BG = rgb(0.051, 0.153, 0.243); // #0D273E – matches logo-new-lg.png background
const GOLD = rgb(0.784, 0.647, 0.255); // #C8A541
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

function itemDescription(label: string, isEn: boolean) {
  const key = label.toLowerCase();
  const descriptions = isEn
    ? [
        ["project", "Strategic planning, discovery and project foundations."],
        ["page", "Additional responsive page templates and content structure."],
        ["design", "Custom visual direction, interface design and responsive layouts."],
        ["content", "Content structure, editing support and conversion-focused copy."],
        ["logo", "Professional brand mark and a practical visual identity system."],
        ["phot", "Selected imagery and visual assets for the new website."],
        ["feature", "Custom functionality tailored to the business requirements."],
        ["seo", "Technical SEO foundations, metadata and search visibility setup."],
        ["performance", "Performance optimisation, accessibility and quality checks."],
        ["hosting", "Hosting setup, launch support and essential configuration."],
        ["delivery", "Project coordination and delivery planning."],
      ]
    : [
        ["projekt", "Strategia, analiza potrzeb i fundamenty realizacji projektu."],
        ["stron", "Dodatkowe responsywne podstrony i struktura tresci."],
        ["design", "Indywidualny kierunek wizualny i responsywny interfejs."],
        ["tresc", "Struktura tresci, wsparcie redakcyjne i komunikacja sprzedazowa."],
        ["logo", "Profesjonalny znak marki i praktyczny system identyfikacji."],
        ["fotograf", "Dobor zdjec i materialow wizualnych dla nowej strony."],
        ["funkcj", "Dedykowane funkcje dopasowane do wymagan biznesowych."],
        ["seo", "Podstawy technicznego SEO, metadane i widocznosc w wyszukiwarce."],
        ["wydajn", "Optymalizacja wydajnosci, dostepnosci i jakosci."],
        ["hosting", "Konfiguracja hostingu, publikacja i wsparcie uruchomienia."],
        ["czas", "Koordynacja projektu i planowanie realizacji."],
      ];
  return (
    descriptions.find(([needle]) => key.includes(needle))?.[1] ??
    (isEn
      ? "Professional website delivery tailored to your business goals."
      : "Profesjonalna realizacja strony dopasowana do celow biznesowych.")
  );
}

export async function generateQuotePdfBytes(data: PdfData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontReg = await doc.embedFont(StandardFonts.Helvetica);
  const logoBytes = await fetch("/logo-new-lg.png?v=6").then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load the Forsa Design logo (${response.status}).`);
    }
    return response.arrayBuffer();
  });
  const logo = await doc.embedPng(logoBytes);

  const page = doc.addPage([W, H]);

  // ── Brand Header ──────────────────────────────────────────────────
  const headerH = 148;
  page.drawRectangle({ x: 0, y: H - headerH, width: W, height: headerH, color: HEADER_BG });
  page.drawImage(logo, {
    x: MARGIN,
    y: H - 132,
    width: 112,
    height: 112,
  });

  const badgeLabel = t(data, "PROJECT PROPOSAL", "OFERTA PROJEKTOWA");
  const badgeW = textWidth(badgeLabel, fontBold, 9) + 22;
  page.drawRectangle({
    x: W - MARGIN - badgeW,
    y: H - 55,
    width: badgeW,
    height: 22,
    borderColor: GOLD,
    borderWidth: 1,
  });
  drawText(page, badgeLabel, W - MARGIN - badgeW + 11, H - 48, fontBold, 9, GOLD);
  drawText(
    page,
    `${t(data, "Quote Reference", "Nr wyceny")}: ${data.quoteId}`,
    W - MARGIN - 160,
    H - 76,
    fontReg,
    8,
    rgb(0.82, 0.85, 0.9),
  );
  drawText(
    page,
    `${t(data, "Date", "Data")}: ${data.dateStr}`,
    W - MARGIN - 160,
    H - 90,
    fontReg,
    8,
    rgb(0.82, 0.85, 0.9),
  );
  drawText(
    page,
    `${t(data, "Valid Until", "Wazna do")}: ${t(data, "30 days", "30 dni")}`,
    W - MARGIN - 160,
    H - 104,
    fontReg,
    8,
    rgb(0.82, 0.85, 0.9),
  );

  // ── Client and project ────────────────────────────────────────────
  const y = H - headerH - 36;
  drawText(page, t(data, "PREPARED FOR", "PRZYGOTOWANO DLA"), MARGIN, y, fontBold, 8, MID_GREY);
  drawText(
    page,
    t(data, "Your organisation", "Twoja organizacja"),
    MARGIN,
    y - 19,
    fontBold,
    14,
    NAVY,
  );
  drawText(
    page,
    t(data, "Website project", "Projekt strony internetowej"),
    MARGIN,
    y - 34,
    fontReg,
    9,
    MID_GREY,
  );
  drawText(
    page,
    pl(data.projectLabel),
    W - MARGIN - textWidth(pl(data.projectLabel), fontBold, 21),
    y - 10,
    fontBold,
    21,
    NAVY,
  );
  drawText(
    page,
    `${t(data, "Estimated Timeline", "Szacowany czas realizacji")}: ${pl(data.estimatedWeeks)}`,
    W - MARGIN - 176,
    y - 32,
    fontReg,
    9,
    GOLD,
  );
  page.drawLine({
    start: { x: 0, y: y - 55 },
    end: { x: W, y: y - 55 },
    thickness: 0.5,
    color: LIGHT_GREY,
  });

  // ── Two-column investment layout ──────────────────────────────────
  const contentTop = y - 83;
  const gap = 24;
  const leftW = 290;
  const rightX = MARGIN + leftW + gap;
  const rightW = COL - leftW - gap;
  drawText(
    page,
    t(data, "INVESTMENT BREAKDOWN", "ZESTAWIENIE INWESTYCJI"),
    MARGIN + 18,
    contentTop,
    fontBold,
    9,
    NAVY,
  );
  page.drawLine({
    start: { x: MARGIN, y: contentTop + 2 },
    end: { x: MARGIN + 12, y: contentTop + 2 },
    thickness: 1,
    color: GOLD,
  });

  let leftY = contentTop - 28;
  data.lineItems.forEach((item) => {
    const label = pl(item.label);
    drawText(page, label, MARGIN, leftY, fontBold, 10, NAVY);
    const value = data.formatPrice(item.value);
    drawText(page, value, MARGIN + leftW - textWidth(value, fontBold, 9), leftY, fontBold, 9, NAVY);
    page.drawLine({
      start: { x: MARGIN, y: leftY - 6 },
      end: { x: MARGIN + leftW, y: leftY - 6 },
      thickness: 0.4,
      color: LIGHT_GREY,
    });
    drawText(
      page,
      itemDescription(item.label, data.isEn),
      MARGIN,
      leftY - 19,
      fontReg,
      7.5,
      MID_GREY,
    );
    leftY -= 43;
  });
  if (data.discountAmount > 0) {
    drawText(page, t(data, "Discount", "Rabat"), MARGIN, leftY, fontBold, 10, rgb(0.1, 0.6, 0.3));
    const discount = `-${data.formatPrice(data.discountAmount)}`;
    drawText(
      page,
      discount,
      MARGIN + leftW - textWidth(discount, fontBold, 9),
      leftY,
      fontBold,
      9,
      rgb(0.1, 0.6, 0.3),
    );
  }

  const totalH = 82;
  page.drawRectangle({
    x: rightX,
    y: contentTop - totalH + 10,
    width: rightW,
    height: totalH,
    color: NAVY,
  });
  drawText(
    page,
    t(data, "TOTAL INVESTMENT", "LACZNA INWESTYCJA"),
    rightX + 16,
    contentTop - 18,
    fontBold,
    8,
    GOLD,
  );
  drawText(
    page,
    data.formatPrice(data.total),
    rightX + 16,
    contentTop - 50,
    fontBold,
    24,
    rgb(1, 1, 1),
  );
  drawText(
    page,
    t(data, "Exclusive of applicable taxes", "Cena koncowa, bez dodatkowego VAT"),
    rightX + 16,
    contentTop - 66,
    fontReg,
    7,
    rgb(0.68, 0.72, 0.8),
  );

  drawText(
    page,
    t(data, "PROJECT DELIVERABLES", "ZAKRES DOSTAWY"),
    rightX,
    contentTop - 120,
    fontBold,
    9,
    NAVY,
  );
  let includeY = contentTop - 140;
  data.includedItems.forEach((item) => {
    page.drawCircle({ x: rightX + 3, y: includeY + 2, size: 2.2, color: GOLD });
    drawText(page, pl(item), rightX + 13, includeY, fontReg, 8, MID_GREY);
    includeY -= 16;
  });

  if (data.maintenanceMonthly > 0) {
    drawText(
      page,
      `${t(data, "Monthly Maintenance", "Miesieczna konserwacja")}: ${data.formatPrice(data.maintenanceMonthly)}/${t(data, "mo", "mies.")}`,
      MARGIN,
      88,
      fontReg,
      8,
      MID_GREY,
    );
  }

  const thanks = t(data, "Thank you for your enquiry.", "Dziekujemy za zapytanie ofertowe.");
  const thanksW = textWidth(thanks, fontReg, 9);
  drawText(page, thanks, (W - thanksW) / 2, 54, fontReg, 9, MID_GREY);

  // ── Footer ────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: 0, width: W, height: 38, color: LIGHT_GREY });
  const footerLine1 = "Banff, Aberdeenshire, Scotland  |  07770 110735";
  const footerLine2 = "hello@forsadesign.co.uk  |  forsadesign.co.uk";
  const linkedinLabel = "linkedin.com/in/miroslaw-potaczek";
  page.drawCircle({ x: MARGIN + 2, y: 21, size: 2.2, borderColor: GOLD, borderWidth: 0.8 });
  page.drawCircle({ x: MARGIN + 2, y: 21, size: 0.7, color: GOLD });
  page.drawLine({
    start: { x: MARGIN + 2, y: 18 },
    end: { x: MARGIN + 2, y: 15 },
    thickness: 0.8,
    color: GOLD,
  });
  page.drawLine({
    start: { x: MARGIN + 2, y: 18 },
    end: { x: MARGIN, y: 15 },
    thickness: 0.8,
    color: GOLD,
  });
  page.drawLine({
    start: { x: MARGIN + 2, y: 18 },
    end: { x: MARGIN + 4, y: 15 },
    thickness: 0.8,
    color: GOLD,
  });
  drawText(page, footerLine1, MARGIN + 9, 21, fontReg, 6.5, MID_GREY);
  page.drawCircle({ x: MARGIN + 2, y: 11, size: 2.5, borderColor: GOLD, borderWidth: 0.8 });
  page.drawLine({
    start: { x: MARGIN + 0.5, y: 11 },
    end: { x: MARGIN + 3.5, y: 11 },
    thickness: 0.8,
    color: GOLD,
  });
  drawText(page, footerLine2, MARGIN + 9, 11, fontReg, 6.5, MID_GREY);
  const linkedinX = MARGIN + 245;
  page.drawRectangle({
    x: linkedinX,
    y: 8.5,
    width: 5,
    height: 5,
    borderColor: GOLD,
    borderWidth: 0.8,
  });
  page.drawCircle({ x: linkedinX + 1.5, y: 11.8, size: 0.55, color: GOLD });
  page.drawLine({
    start: { x: linkedinX + 1.5, y: 10 },
    end: { x: linkedinX + 1.5, y: 8.8 },
    thickness: 0.7,
    color: GOLD,
  });
  page.drawLine({
    start: { x: linkedinX + 2.8, y: 10.8 },
    end: { x: linkedinX + 2.8, y: 8.8 },
    thickness: 0.7,
    color: GOLD,
  });
  drawText(page, linkedinLabel, linkedinX + 8, 11, fontReg, 6.5, MID_GREY);
  const pageLabel = "Page 1 of 1";
  drawText(
    page,
    pageLabel,
    W - MARGIN - textWidth(pageLabel, fontReg, 7),
    11,
    fontReg,
    7,
    MID_GREY,
  );

  return doc.save();
}

export async function generateQuotePdf(data: PdfData): Promise<void> {
  const pdfBytes = await generateQuotePdfBytes(data);
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `forsa-quote-${new Date().toISOString().slice(0, 10)}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
