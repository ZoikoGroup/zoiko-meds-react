/**
 * What the scan endpoint does at its limits: a PDF longer than the page cap, a
 * corrupted upload, and a deployment with no vision API keys configured.
 *
 * @vitest-environment node
 *
 * The route is server code; jsdom's File/FormData mangle binary uploads.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/api", () => ({
  apiFetch: vi.fn(async () => []),
  matchMedibase: vi.fn(async () => []),
}));

/** Pages the fake PDF hands back, and the count it declares. */
const pdf = { images: [] as Buffer[], declaredPages: 0, text: "" };

vi.mock("@/lib/pdf-text", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/pdf-text")>();
  return {
    ...actual,
    looksLikePdf: () => true,
    extractPdfText: () => ({ text: pdf.text, needsOcr: pdf.text.trim().length === 0 }),
    countPdfPages: () => pdf.declaredPages,
    // The route asks for at most `limit` pages, exactly as the real extractor does.
    extractPdfImages: (_buffer: Buffer, limit: number) =>
      pdf.images.slice(0, limit).map((data) => ({ data })),
  };
});

const recognizePages = vi.fn();
vi.mock("@/lib/scan/ocr", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/scan/ocr")>();
  return {
    ...actual,
    recognizePages: (...args: unknown[]) => recognizePages(...args),
    recognizeImage: vi.fn(),
    isOcrAvailable: vi.fn(async () => true),
  };
});

const { POST } = await import("@/app/internal/medicine/scan/route");

async function scan(bytes: Buffer, name = "rx.pdf", type = "application/pdf") {
  const { NextRequest } = await import("next/server");
  const fd = new FormData();
  fd.append("prescription", new File([new Uint8Array(bytes)], name, { type }));
  const res = await POST(
    new NextRequest("http://localhost/internal/medicine/scan", { method: "POST", body: fd }),
  );
  return { status: res.status, json: await res.json() };
}

/** `count` page rasters, each carrying one distinct medicine. */
function pagesOfMedicines(count: number) {
  const names = ["Metformin", "Amlodipine", "Omeprazole", "Azithromycin", "Cetirizine"];
  pdf.images = Array.from({ length: count }, () => Buffer.alloc(128, 1));
  return Array.from({ length: count }, (_, i) => ({
    page: i + 1,
    text: `Tab ${names[i % names.length]} ${(i % 5) * 100 + 100} mg OD`,
    confidence: 0.93,
  }));
}

beforeEach(() => {
  recognizePages.mockReset();
  pdf.images = [];
  pdf.declaredPages = 0;
  pdf.text = "";
  // A deployment with no vision keys is the default under test; individual
  // tests opt in.
  vi.stubEnv("GEMINI_API_KEY", "");
  vi.stubEnv("GOOGLE_API_KEY", "");
  vi.stubEnv("ANTHROPIC_API_KEY", "");
});

describe("long scanned PDFs", () => {
  it("reads up to twenty pages", async () => {
    pdf.declaredPages = 20;
    recognizePages.mockResolvedValue(pagesOfMedicines(20));

    const { json } = await scan(Buffer.from("%PDF-1.4 fake"));

    expect(recognizePages.mock.calls[0][0]).toHaveLength(20);
    expect(json.data.pages).toBe(20);
    expect(json.data.warnings.join(" ")).not.toContain("Only the first");
  });

  it("tells the user which pages it could not read", async () => {
    pdf.declaredPages = 25;
    recognizePages.mockResolvedValue(pagesOfMedicines(20));

    const { json } = await scan(Buffer.from("%PDF-1.4 fake"));

    // The cap is applied, not silently exceeded.
    expect(recognizePages.mock.calls[0][0]).toHaveLength(20);
    expect(json.data.warnings.join(" ")).toContain("Only the first 20 of 25 pages");
    expect(json.data.warnings.join(" ")).toContain("upload the remaining pages separately");
  });

  it("does not warn when the whole document was read", async () => {
    pdf.declaredPages = 4;
    recognizePages.mockResolvedValue(pagesOfMedicines(4));

    const { json } = await scan(Buffer.from("%PDF-1.4 fake"));

    expect(json.data.warnings.join(" ")).not.toContain("Only the first");
    expect(json.data.medicines.length).toBeGreaterThan(0);
  });

  it("still finds every medicine across the pages it did read", async () => {
    pdf.declaredPages = 30;
    recognizePages.mockResolvedValue(pagesOfMedicines(20));

    const { json } = await scan(Buffer.from("%PDF-1.4 fake"));

    // Five distinct names repeat across twenty pages; duplicates collapse.
    expect(json.data.medicines).toHaveLength(5);
  });
});

describe("corrupted and unreadable uploads", () => {
  it("does not crash on a file that claims to be a PDF but is not", async () => {
    pdf.declaredPages = 0;
    pdf.images = [];
    recognizePages.mockResolvedValue([]);

    const { status, json } = await scan(Buffer.from("%PDF-1.4\x00\x01garbage"));

    expect(status).toBe(200);
    expect(json.data.medicines).toEqual([]);
    expect(json.data.warnings.length).toBeGreaterThan(0);
  });

  it("reports honestly when no page could be read", async () => {
    pdf.declaredPages = 1;
    pdf.images = [Buffer.alloc(64, 3)];
    recognizePages.mockResolvedValue([]);

    const { json } = await scan(Buffer.from("%PDF-1.4 fake"));

    expect(json.data.medicines).toEqual([]);
    expect(json.data.warnings.join(" ")).toContain("No readable text");
  });

  it("survives an OCR engine that throws", async () => {
    pdf.declaredPages = 1;
    pdf.images = [Buffer.alloc(64, 3)];
    recognizePages.mockRejectedValue(new Error("worker failed to start"));

    const { status, json } = await scan(Buffer.from("%PDF-1.4 fake"));

    expect(status).toBe(200);
    expect(json.data.medicines).toEqual([]);
    expect(json.data.warnings.join(" ")).toContain("On-server reading failed");
  });
});

describe("vision fallback not configured", () => {
  it("completes an OCR-only scan with no API keys set", async () => {
    pdf.declaredPages = 1;
    recognizePages.mockResolvedValue(pagesOfMedicines(1));

    const { status, json } = await scan(Buffer.from("%PDF-1.4 fake"));

    expect(status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.stage).toBe("ocr");
    expect(json.data.medicines.length).toBeGreaterThan(0);
  });

  it("returns an empty list, not an error, when OCR finds nothing and no key exists", async () => {
    pdf.declaredPages = 1;
    pdf.images = [Buffer.alloc(64, 3)];
    recognizePages.mockResolvedValue([{ page: 1, text: "Patient: A. Sharma\nDate: 04/02/2026", confidence: 0.9 }]);

    const { status, json } = await scan(Buffer.from("%PDF-1.4 fake"));

    expect(status).toBe(200);
    expect(json.data.medicines).toEqual([]);
    expect(json.data.stage).not.toBe("vision");
  });

  it("never puts a key or a server path in the response", async () => {
    vi.stubEnv("ANTHROPIC_API_KEY", "sk-ant-test-should-never-surface");
    pdf.declaredPages = 1;
    recognizePages.mockResolvedValue(pagesOfMedicines(1));

    const { json } = await scan(Buffer.from("%PDF-1.4 fake"));
    const body = JSON.stringify(json);

    expect(body).not.toContain("sk-ant-test-should-never-surface");
    expect(body).not.toContain(process.cwd());
    expect(body).not.toMatch(/[A-Za-z]:\\\\|\/home\/|\/var\/www|node_modules/);
  });
});
