/**
 * The prescription scan endpoint.
 *
 * MediBase and Tesseract are stubbed so the pipeline itself is under test:
 * every medicine is found, metadata is rejected, catalog matches are adopted,
 * unknown names survive as written, duplicates collapse, and an unreadable file
 * yields an empty list rather than invented medicines.
 *
 * @vitest-environment node
 *
 * The route is server code. jsdom's File/FormData mangle binary uploads, so
 * these run against Node's real implementations — the same ones Next uses.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import zlib from "node:zlib";
import type { Medicine } from "@/lib/api";

/** Catalog responses, keyed by the queried name. Empty = catalog has nothing. */
const catalog = new Map<string, Medicine[]>();
const apiFetch = vi.fn(async (_path: string, opts?: { query?: { q?: string } }) => {
  const q = (opts?.query?.q ?? "").toLowerCase();
  return catalog.get(q) ?? [];
});
vi.mock("@/lib/api", () => ({
  apiFetch: (...args: unknown[]) => (apiFetch as (...a: unknown[]) => unknown)(...args),
  matchMedibase: vi.fn(async () => []),
}));

const recognizePages = vi.fn();
vi.mock("@/lib/scan/ocr", () => ({
  recognizePages: (...args: unknown[]) => recognizePages(...args),
  recognizeImage: vi.fn(),
  isOcrAvailable: vi.fn(async () => true),
  LOW_OCR_CONFIDENCE: 0.7,
}));

const { POST } = await import("@/app/internal/medicine/scan/route");

function medicine(partial: Partial<Medicine> & { canonicalName: string }): Medicine {
  return {
    id: partial.canonicalName,
    canonicalName: partial.canonicalName,
    genericName: partial.genericName ?? null,
    brandNames: partial.brandNames ?? [],
    manufacturer: null,
    description: null,
    activeIngredient: null,
    strength: partial.strength ?? null,
    dosageForm: partial.dosageForm ?? null,
    route: null,
    prescriptionCategory: null,
    qualityState: null,
    isControlled: false,
  };
}

/** A digital PDF whose content stream carries the given lines. */
function textPdf(lines: string[]): Buffer {
  const content = [
    "BT",
    "/F1 12 Tf",
    ...lines.flatMap((l, i) => [`1 0 0 1 40 ${740 - i * 22} Tm`, `(${l}) Tj`]),
    "ET",
  ].join("\n");
  const stream = zlib.deflateSync(Buffer.from(content, "latin1"));
  return Buffer.concat([
    Buffer.from(
      "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
        "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n" +
        "3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n" +
        `4 0 obj\n<< /Length ${stream.length} /Filter /FlateDecode >>\nstream\n`,
      "latin1",
    ),
    stream,
    Buffer.from(
      "\nendstream\nendobj\n5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\ntrailer\n<< /Root 1 0 R >>\n%%EOF\n",
      "latin1",
    ),
  ]);
}

const jpeg = () => Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(4096, 9)]);

async function scan(bytes: Buffer, name: string, type: string) {
  const { NextRequest } = await import("next/server");
  const fd = new FormData();
  fd.append("prescription", new File([new Uint8Array(bytes)], name, { type }));
  const res = await POST(
    new NextRequest("http://localhost/internal/medicine/scan", { method: "POST", body: fd }),
  );
  return { status: res.status, json: await res.json() };
}

beforeEach(() => {
  catalog.clear();
  apiFetch.mockClear();
  recognizePages.mockReset();
});

describe("upload handling", () => {
  it("rejects a request with no file", async () => {
    const { NextRequest } = await import("next/server");
    const res = await POST(
      new NextRequest("http://localhost/internal/medicine/scan", { method: "POST", body: new FormData() }),
    );
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("No file uploaded");
  });

  it("rejects an unsupported file type with a useful message", async () => {
    const { status, json } = await scan(Buffer.from("hi"), "notes.docx", "application/vnd.ms-word");
    expect(status).toBe(400);
    expect(json.error).toMatch(/JPG, PNG, or PDF/i);
  });

  it("rejects an empty file", async () => {
    const { status, json } = await scan(Buffer.alloc(0), "empty.jpg", "image/jpeg");
    expect(status).toBe(400);
    expect(json.error).toMatch(/empty/i);
  });
});

describe("digital PDFs", () => {
  it("finds every medicine, not just the first", async () => {
    const { json } = await scan(
      textPdf([
        "Rx",
        "1. Tab. Azithromycin 500 mg  1-0-0  x 3 days",
        "2. Cap. Amoxicillin 250 mg  1-0-1  x 5 days",
        "3. Syp. Ascoril LS  10 ml  TDS",
        "4. Tab. Paracetamol 650 mg  SOS",
      ]),
      "rx.pdf",
      "application/pdf",
    );

    expect(json.success).toBe(true);
    expect(json.data.stage).toBe("text-layer");
    expect(json.data.medicines).toHaveLength(4);
    expect(recognizePages).not.toHaveBeenCalled();
  });

  it("ignores patient, prescriber, address, dates and dispensing metadata", async () => {
    const { json } = await scan(
      textPdf([
        "SUNRISE MULTISPECIALITY HOSPITAL",
        "42 Brigade Road, Bengaluru 560025",
        "Dr. Meera Raghavan, MBBS, MD",
        "Patient Name: Suresh Menon",
        "Age / Sex: 41 / M",
        "Date: 14/08/2026",
        "Diagnosis: Acute bronchitis",
        "Rx",
        "Tab. Azithromycin 500 mg BD x 3 days",
        "Sig: Take after food",
        "Disp: 30",
        "Refills: 1",
        "DEA# AB1234563",
      ]),
      "rx.pdf",
      "application/pdf",
    );

    expect(json.data.medicines).toHaveLength(1);
    const joined = json.data.medicines.join(" ").toLowerCase();
    for (const junk of ["sunrise", "brigade", "meera", "suresh", "bronchitis", "refill", "dea"]) {
      expect(joined).not.toContain(junk);
    }
  });

  it("extracts strength, dosage form and quantity", async () => {
    const { json } = await scan(
      textPdf(["Rx", "Tab. Amoxicillin 500 mg  1-0-1  x 5 days  Disp: 30"]),
      "rx.pdf",
      "application/pdf",
    );

    expect(json.data.items[0]).toMatchObject({
      dosageForm: "Tab",
      quantity: "30",
      frequency: "1-0-1",
    });
    expect(json.data.items[0].strength.replace(/\s+/g, "")).toBe("500mg");
  });
});

describe("catalog matching", () => {
  it("adopts the catalog identity when MediBase knows the brand", async () => {
    catalog.set("glycomet", [
      medicine({ canonicalName: "Glycomet 500", genericName: "Metformin", strength: "500 mg" }),
    ]);

    const { json } = await scan(textPdf(["Rx", "Tab Glycomet 500mg OD"]), "rx.pdf", "application/pdf");

    expect(json.data.items[0]).toMatchObject({
      name: "Glycomet 500",
      genericName: "Metformin",
      source: "medibase",
      requiresConfirmation: false,
    });
  });

  it("keeps an unknown medicine as written and asks the user to confirm it", async () => {
    const { json } = await scan(textPdf(["Rx", "Tab Zynovate XR 40mg OD"]), "rx.pdf", "application/pdf");

    const item = json.data.items[0];
    expect(item.name).toMatch(/Zynovate/i);
    expect(item.source).toBe("prescription");
    expect(item.requiresConfirmation).toBe(true);
    expect(json.data.requiresConfirmation).toBe(true);
  });

  it("does not rename a medicine into a different catalog product", async () => {
    // A fuzzy neighbour that is NOT the same drug must be rejected.
    catalog.set("dolonex", [medicine({ canonicalName: "Dolo 650", genericName: "Paracetamol" })]);

    const { json } = await scan(textPdf(["Rx", "Tab Dolonex DT 20mg OD"]), "rx.pdf", "application/pdf");

    expect(json.data.medicines.join(" ")).toMatch(/Dolonex/i);
    expect(json.data.medicines.join(" ")).not.toMatch(/Dolo 650/i);
  });

  it("survives an unreachable catalog", async () => {
    apiFetch.mockRejectedValueOnce(new Error("network down"));

    const { json } = await scan(textPdf(["Rx", "Tab Amoxicillin 500mg BD"]), "rx.pdf", "application/pdf");

    expect(json.success).toBe(true);
    expect(json.data.medicines.length).toBeGreaterThan(0);
  });
});

describe("scanned images and multi-page PDFs", () => {
  it("OCRs an uploaded image", async () => {
    recognizePages.mockResolvedValue([
      { page: 1, text: "Rx\nTab Metformin 500 mg OD\nTab Amlodipine 5 mg OD", confidence: 0.92 },
    ]);

    const { json } = await scan(jpeg(), "photo.jpg", "image/jpeg");

    expect(recognizePages).toHaveBeenCalledTimes(1);
    expect(json.data.stage).toBe("ocr");
    expect(json.data.medicines).toHaveLength(2);
  });

  it("reads every page of a multi-page scan", async () => {
    recognizePages.mockResolvedValue([
      { page: 1, text: "Tab Metformin 500 mg OD", confidence: 0.9 },
      { page: 2, text: "Tab Amlodipine 5 mg OD", confidence: 0.9 },
      { page: 3, text: "Cap Omeprazole 20 mg HS", confidence: 0.9 },
    ]);

    const { json } = await scan(jpeg(), "scan.jpg", "image/jpeg");

    expect(json.data.pages).toBe(3);
    expect(json.data.medicines).toHaveLength(3);
  });

  it("flags a poor scan for confirmation instead of accepting it", async () => {
    recognizePages.mockResolvedValue([{ page: 1, text: "Tab Azithromycin 500 mg BD", confidence: 0.25 }]);

    const { json } = await scan(jpeg(), "blurry.jpg", "image/jpeg");

    expect(json.data.items.every((i: { requiresConfirmation: boolean }) => i.requiresConfirmation)).toBe(true);
  });

  it("does not report the same medicine twice", async () => {
    recognizePages.mockResolvedValue([
      { page: 1, text: "Tab Paracetamol 650 mg SOS", confidence: 0.9 },
      { page: 2, text: "Tab Paracetamol 650 mg SOS", confidence: 0.9 },
    ]);

    const { json } = await scan(jpeg(), "scan.jpg", "image/jpeg");

    expect(json.data.medicines).toHaveLength(1);
  });
});

describe("never invents a medicine", () => {
  it("returns an empty list for an unreadable image", async () => {
    recognizePages.mockResolvedValue([]);

    const { status, json } = await scan(jpeg(), "photo.jpg", "image/jpeg");

    expect(status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.data.medicines).toEqual([]);
    expect(json.data.stage).toBe("none");
    expect(json.data.warnings.length).toBeGreaterThan(0);
  });

  it("does not read a medicine out of the filename", async () => {
    recognizePages.mockResolvedValue([
      { page: 1, text: "Patient Name: John Smith\nDate: 01/02/2026", confidence: 0.85 },
    ]);

    const { json } = await scan(jpeg(), "Dolo-650-prescription.jpg", "image/jpeg");

    expect(json.data.medicines).toEqual([]);
  });

  it("does not read medicines out of raw PDF bytes", async () => {
    recognizePages.mockResolvedValue([]);
    // A PDF whose only "Ibuprofen" is inside an unreadable binary stream.
    const pdf = Buffer.concat([
      Buffer.from("%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n", "latin1"),
      Buffer.from("Ibuprofen Naproxen Acetaminophen", "latin1"),
      Buffer.from("\ntrailer\n<< >>\n%%EOF\n", "latin1"),
    ]);

    const { json } = await scan(pdf, "scan.pdf", "application/pdf");

    // Loose bytes are not a prescription line; nothing structural qualifies.
    expect(json.data.medicines).toEqual([]);
  });
});

describe("search hand-off", () => {
  it("returns names the availability search can query", async () => {
    catalog.set("metformin", [
      medicine({ canonicalName: "Metformin", genericName: "Metformin", strength: "500 mg" }),
    ]);

    const { json } = await scan(textPdf(["Rx", "Tab Metformin 500 mg OD"]), "rx.pdf", "application/pdf");

    expect(json.data.medicines[0]).toBe("Metformin 500 mg");
    expect(json.data.medicines).toEqual(
      json.data.items.map((i: { name: string; strength?: string }) =>
        [i.name, i.strength].filter(Boolean).join(" ").trim(),
      ),
    );
  });
});
