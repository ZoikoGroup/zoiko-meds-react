import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { extractPdfText, looksLikePdf, normalizeExtractedText } from "@/lib/pdf-text";

const fixture = (name: string) => readFileSync(path.join(__dirname, "..", "fixtures", name));

/** Build a minimal PDF whose content stream is Flate-compressed WinAnsi text. */
function flatePdf(lines: string[]): Buffer {
  const content = ["BT", "/F1 12 Tf", ...lines.flatMap((l, i) => [`1 0 0 1 20 ${700 - i * 20} Tm`, `(${l}) Tj`]), "ET"].join("\n");
  const stream = zlib.deflateSync(Buffer.from(content, "latin1"));
  const head = Buffer.from(
    "%PDF-1.4\n" +
      "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
      "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n" +
      "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n" +
      `4 0 obj\n<< /Length ${stream.length} /Filter /FlateDecode >>\nstream\n`,
    "latin1",
  );
  const tail = Buffer.from(
    "\nendstream\nendobj\n" +
      "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n" +
      "trailer\n<< /Root 1 0 R >>\n%%EOF\n",
    "latin1",
  );
  return Buffer.concat([head, stream, tail]);
}

describe("extractPdfText", () => {
  it("reads a subset-font Identity-H PDF through its /ToUnicode CMap", () => {
    // The real upload that used to report "No medicines could be detected":
    // glyph-ID text (<002C0045...> Tj) inside a Flate-compressed content stream.
    const buffer = fixture("text-layer-prescription.pdf");
    const { text, needsOcr } = extractPdfText(buffer);

    expect(needsOcr).toBe(false);
    expect(text.split("\n").map((l) => l.trim()).filter(Boolean)).toEqual([
      "Ibuprofen",
      "Naproxen Sodium",
      "Acetaminophen",
    ]);
  });

  it("reads every line of a multi-medicine list, not just the first", () => {
    const { text } = extractPdfText(fixture("uncatalogued-brands.pdf"));
    expect(text.split("\n").map((l) => l.trim()).filter(Boolean)).toEqual([
      "Becosules",
      "Nurokind OD",
      "Carbamide Forte",
    ]);
  });

  it("reads a Flate-compressed WinAnsi content stream", () => {
    const { text, needsOcr } = extractPdfText(flatePdf(["Amoxicillin 500mg", "Cetirizine 10mg"]));
    expect(needsOcr).toBe(false);
    expect(text).toContain("Amoxicillin 500mg");
    expect(text).toContain("Cetirizine 10mg");
  });

  it("reads an uncompressed content stream", () => {
    const content = "BT\n/F1 12 Tf\n1 0 0 1 20 700 Tm\n(Pantoprazole 40mg) Tj\nET";
    const pdf = Buffer.from(
      "%PDF-1.4\n" +
        "3 0 obj\n<< /Type /Page /Contents 4 0 R >>\nendobj\n" +
        `4 0 obj\n<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n%%EOF\n`,
      "latin1",
    );
    expect(extractPdfText(pdf).text).toContain("Pantoprazole 40mg");
  });

  it("flags a PDF with no text layer as needing OCR", () => {
    const pdf = Buffer.from(
      "%PDF-1.4\n1 0 obj\n<< /Type /Page /Contents 2 0 R >>\nendobj\n" +
        "2 0 obj\n<< /Length 4 /Filter /DCTDecode >>\nstream\n\xff\xd8\xff\xd9\nendstream\nendobj\n%%EOF\n",
      "latin1",
    );
    const { text, needsOcr } = extractPdfText(pdf);
    expect(text).toBe("");
    expect(needsOcr).toBe(true);
  });

  it("returns no text for a non-PDF buffer", () => {
    expect(looksLikePdf(Buffer.from([137, 80, 78, 71]))).toBe(false);
    expect(extractPdfText(Buffer.from([137, 80, 78, 71])).text).toBe("");
  });
});

describe("normalizeExtractedText", () => {
  it("folds ligatures, typographic punctuation and stray whitespace", () => {
    expect(normalizeExtractedText("Ciproﬂoxacin  500‐mg")).toBe("Ciprofloxacin 500-mg");
    expect(normalizeExtractedText("  Ibuprofen \n\n\n Naproxen  ")).toBe("Ibuprofen\n\nNaproxen");
  });
});
