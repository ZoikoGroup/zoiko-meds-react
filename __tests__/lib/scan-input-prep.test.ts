/**
 * The steps that run before medicine detection: preparing an uploaded image for
 * OCR, cleaning up what OCR returns, counting PDF pages, and decoding HEIC.
 *
 * @vitest-environment node
 *
 * sharp and heic-decode are native/wasm modules, so these run in Node rather
 * than jsdom.
 */
import { describe, it, expect } from "vitest";
import { canPreprocessImage, preprocessImageForOcr } from "@/lib/scan/preprocess";
import { normalizeOcrText, getLangPath } from "@/lib/scan/ocr";
import { countPdfPages } from "@/lib/pdf-text";
import { convertHeicToPng, isHeicUpload } from "@/lib/scan/heic";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

/** A real raster, built with the same library the preprocessor uses. */
async function testImage(width: number, height: number): Promise<Buffer> {
  const { default: sharp } = await import("sharp");
  return sharp({
    create: { width, height, channels: 3, background: { r: 210, g: 210, b: 210 } },
  })
    .png()
    .toBuffer();
}

describe("image preprocessing for OCR", () => {
  it("accepts the image formats a phone or scanner produces", () => {
    for (const mime of ["image/jpeg", "image/png", "image/webp", "image/tiff", "image/heic"]) {
      expect(canPreprocessImage(mime)).toBe(mime !== "image/heic");
    }
    expect(canPreprocessImage("application/pdf")).toBe(false);
  });

  it("returns a PNG that Tesseract can read", async () => {
    const result = await preprocessImageForOcr(await testImage(1200, 800), "image/png");

    expect(result).not.toBeNull();
    expect(result!.data.subarray(0, 4)).toEqual(PNG_MAGIC);
  });

  it("upscales small print so OCR stops guessing at it", async () => {
    const { default: sharp } = await import("sharp");
    const result = await preprocessImageForOcr(await testImage(600, 400), "image/png");

    expect(result!.notes).toContain("upscaled");
    const meta = await sharp(result!.data).metadata();
    // 600px long edge scaled to the 1800px target.
    expect(meta.width).toBe(1800);
  });

  it("leaves an already-large image at its own size", async () => {
    const result = await preprocessImageForOcr(await testImage(2000, 1400), "image/png");

    expect(result!.notes).not.toContain("upscaled");
  });

  it("declines a format it cannot decode instead of throwing", async () => {
    expect(await preprocessImageForOcr(Buffer.alloc(64, 7), "application/pdf")).toBeNull();
  });

  it("returns null on undecodable bytes so the caller can use the original upload", async () => {
    expect(await preprocessImageForOcr(Buffer.from("this is not an image"), "image/png")).toBeNull();
  });

  it("returns null for an empty buffer", async () => {
    expect(await preprocessImageForOcr(Buffer.alloc(0), "image/jpeg")).toBeNull();
  });
});

describe("OCR text normalization", () => {
  it("drops printed rules and table borders", () => {
    const raw = "| Rx |\n--------------------\n| Tab Metformin 500 mg |\n====================";

    expect(normalizeOcrText(raw)).toBe("Rx\nTab Metformin 500 mg");
  });

  it("removes lines carrying no letters or digits", () => {
    expect(normalizeOcrText("Tab Amlodipine 5 mg\n***\n~~~~\n   \nCap Omeprazole 20 mg")).toBe(
      "Tab Amlodipine 5 mg\nCap Omeprazole 20 mg",
    );
  });

  it("keeps a medicine line intact", () => {
    expect(normalizeOcrText("  Tab Azithromycin 500 mg BD x 5 days  ")).toBe(
      "Tab Azithromycin 500 mg BD x 5 days",
    );
  });

  it("handles empty OCR output", () => {
    expect(normalizeOcrText("")).toBe("");
  });
});

describe("PDF page counting", () => {
  /** N page objects plus the /Pages tree node that must not be counted. */
  function pdfWithPages(count: number): Buffer {
    const pages = Array.from(
      { length: count },
      (_, i) => `${i + 3} 0 obj\n<< /Type /Page /Parent 2 0 R >>\nendobj\n`,
    ).join("");
    return Buffer.from(
      "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
        `2 0 obj\n<< /Type /Pages /Count ${count} >>\nendobj\n` +
        pages +
        "trailer\n<< /Root 1 0 R >>\n%%EOF\n",
      "latin1",
    );
  }

  it("counts the pages a document declares", () => {
    expect(countPdfPages(pdfWithPages(25))).toBe(25);
    expect(countPdfPages(pdfWithPages(1))).toBe(1);
  });

  it("does not count the /Pages tree node as a page", () => {
    // 3 pages + 1 /Pages node: a missing word boundary would report 4.
    expect(countPdfPages(pdfWithPages(3))).toBe(3);
  });

  it("returns zero for an empty buffer", () => {
    expect(countPdfPages(Buffer.alloc(0))).toBe(0);
  });
});

describe("HEIC decoding", () => {
  it("recognises a HEIC upload by mime type and by header brand", () => {
    expect(isHeicUpload(Buffer.alloc(0), "image/heic")).toBe(true);
    expect(isHeicUpload(Buffer.alloc(0), "image/heif")).toBe(true);

    const header = Buffer.alloc(16);
    header.write("ftyp", 4, "latin1");
    header.write("heic", 8, "latin1");
    expect(isHeicUpload(header, "")).toBe(true);

    expect(isHeicUpload(Buffer.from([0xff, 0xd8, 0xff, 0xe0]), "image/jpeg")).toBe(false);
  });

  it("returns null rather than throwing when the image cannot be decoded", async () => {
    const header = Buffer.alloc(64);
    header.write("ftyp", 4, "latin1");
    header.write("heic", 8, "latin1");

    expect(await convertHeicToPng(header)).toBeNull();
  });

  it("returns null for an empty buffer", async () => {
    expect(await convertHeicToPng(Buffer.alloc(0))).toBeNull();
  });
});

describe("Tesseract language data", () => {
  it("resolves a shipped traineddata directory, or reports none without throwing", () => {
    const langPath = getLangPath();

    // Null is the honest answer on a machine where the model was never
    // provisioned; the route logs and degrades rather than crashing.
    expect(langPath === null || typeof langPath === "string").toBe(true);
    if (langPath) expect(langPath).toContain(process.cwd());
  });
});
