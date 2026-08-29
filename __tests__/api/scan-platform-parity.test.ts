/**
 * Platform-parity behaviours for the prescription scanner.
 *
 * Covers the rules the platform flow defines and this port now matches: exact
 * vs fuzzy catalog trust, the resolved catalog id travelling with the result,
 * the offline dictionary being reserved for an unreachable catalog, short brand
 * names, repeated names at different strengths, and OCR digit confusion.
 *
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import zlib from "node:zlib";
import type { Medicine } from "@/lib/api";

const catalog = new Map<string, Medicine[]>();
/** Set to make every catalog lookup fail, as an unreachable MediBase would. */
let catalogDown = false;

const apiFetch = vi.fn(async (_path: string, opts?: { query?: { q?: string } }) => {
  if (catalogDown) throw new Error("catalog unreachable");
  const q = (opts?.query?.q ?? "").toLowerCase();
  return catalog.get(q) ?? [];
});
vi.mock("@/lib/api", () => ({
  apiFetch: (...args: unknown[]) => (apiFetch as (...a: unknown[]) => unknown)(...args),
  matchMedibase: vi.fn(async () => []),
}));

const recognizePages = vi.fn();
vi.mock("@/lib/scan/ocr", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/scan/ocr")>();
  return {
    ...actual,
    recognizePages: (...args: unknown[]) => recognizePages(...args),
    recognizeImage: vi.fn(),
    isOcrAvailable: vi.fn(async () => true),
    LOW_OCR_CONFIDENCE: 0.7,
  };
});

const { POST } = await import("@/app/internal/medicine/scan/route");

function medicine(partial: Partial<Medicine> & { canonicalName: string }): Medicine {
  return {
    id: partial.id ?? `id-${partial.canonicalName.toLowerCase().replace(/\s+/g, "-")}`,
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

function textPdf(lines: string[]): Buffer {
  const content = [
    "BT",
    "/F1 12 Tf",
    // ( ) and \ delimit/escape strings in a PDF content stream, so a line such
    // as "1) Tab ..." must be escaped or it terminates the string early and
    // corrupts the whole stream.
    ...lines.flatMap((l, i) => [
      `1 0 0 1 40 ${740 - i * 22} Tm`,
      `(${l.replace(/([\\()])/g, "\\$1")}) Tj`,
    ]),
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
  catalogDown = false;
  apiFetch.mockClear();
  recognizePages.mockReset();
});

describe("catalog identity", () => {
  it("carries the resolved medicine id through to the response", async () => {
    catalog.set("pantoprazole", [
      medicine({ id: "med_pan_40", canonicalName: "Pantoprazole", strength: "40 mg" }),
    ]);

    const { json } = await scan(
      textPdf(["Rx", "Tab Pantoprazole 40mg OD"]),
      "rx.pdf",
      "application/pdf",
    );

    expect(json.data.items[0].medicineId).toBe("med_pan_40");
  });

  it("trusts an exact catalog hit more than a fuzzy one", async () => {
    catalog.set("pantoprazole", [medicine({ canonicalName: "Pantoprazole" })]);
    const exact = await scan(
      textPdf(["Rx", "Tab Pantoprazole 40mg OD"]),
      "a.pdf",
      "application/pdf",
    );

    catalog.clear();
    catalog.set("glycomet", [medicine({ canonicalName: "Glycomet 500 SR" })]);
    const fuzzy = await scan(textPdf(["Rx", "Tab Glycomet 500mg OD"]), "b.pdf", "application/pdf");

    expect(exact.json.data.items[0].source).toBe("medibase");
    expect(fuzzy.json.data.items[0].source).toBe("medibase-fuzzy");
    expect(exact.json.data.items[0].confidence).toBeGreaterThan(
      fuzzy.json.data.items[0].confidence,
    );
  });

  it("leaves a catalog-absent medicine unmatched rather than using the offline list", async () => {
    // The catalog answers and simply has nothing. The offline dictionary is for
    // an unreachable catalog, not for a drug the catalog does not stock.
    const { json } = await scan(
      textPdf(["Rx", "Tab Ibuprofen 400mg BD"]),
      "rx.pdf",
      "application/pdf",
    );

    const item = json.data.items.find((m: { name: string }) => /ibuprofen/i.test(m.name));
    expect(item).toBeTruthy();
    expect(item.source).toBe("prescription");
    expect(item.requiresConfirmation).toBe(true);
  });

  it("falls back to the offline dictionary when the catalog is unreachable", async () => {
    catalogDown = true;

    const { json } = await scan(
      textPdf(["Rx", "Tab Ibuprofen 400mg BD"]),
      "rx.pdf",
      "application/pdf",
    );

    const item = json.data.items.find((m: { name: string }) => /ibuprofen/i.test(m.name));
    expect(item).toBeTruthy();
    expect(item.source).toBe("offline-dictionary");
  });
});

describe("tricky readings", () => {
  it("keeps a short brand name such as Pan 40", async () => {
    catalog.set("pan", [
      medicine({ id: "med_pan", canonicalName: "Pan 40", genericName: "Pantoprazole" }),
    ]);

    const { json } = await scan(
      textPdf(["Rx", "Tab Pan 40 OD x 10 days"]),
      "rx.pdf",
      "application/pdf",
    );

    const names = json.data.items.map((m: { name: string }) => m.name);
    expect(names.some((n: string) => /pan/i.test(n))).toBe(true);
  });

  it("keeps the same medicine at two different strengths as two results", async () => {
    const { json } = await scan(
      textPdf(["Rx", "1) Tab Paracetamol 500 mg BD", "2) Tab Paracetamol 650 mg HS"]),
      "rx.pdf",
      "application/pdf",
    );

    const paracetamol = json.data.items.filter((m: { name: string }) =>
      /paracetamol/i.test(m.name),
    );
    expect(paracetamol).toHaveLength(2);
    expect(paracetamol.map((m: { strength: string }) => m.strength).sort()).toEqual([
      "500 mg",
      "650 mg",
    ]);
  });

  it("does not invent a medicine from an OCR-confused strength (65O mg)", async () => {
    // A letter O read for a zero must not turn into a different product, and
    // must never be presented as confident.
    const { json } = await scan(
      textPdf(["Rx", "Tab Paracetamol 65O mg HS"]),
      "rx.pdf",
      "application/pdf",
    );

    const item = json.data.items[0];
    expect(item).toBeTruthy();
    expect(item.name).toMatch(/paracetamol/i);
    expect(item.requiresConfirmation).toBe(true);
  });

  it("does not let a short OCR fragment become a confident unrelated medicine", async () => {
    catalog.set("amo", [medicine({ canonicalName: "Amoxicillin", genericName: "Amoxicillin" })]);

    const { json } = await scan(textPdf(["Rx", "Tab Amo"]), "rx.pdf", "application/pdf");

    for (const item of json.data.items) {
      expect(item.requiresConfirmation).toBe(true);
    }
  });
});

describe("selection handoff", () => {
  it("gives every medicine a queryable label and marks which need confirmation", async () => {
    catalog.set("pantoprazole", [
      medicine({ id: "med_pan_40", canonicalName: "Pantoprazole", strength: "40 mg" }),
    ]);

    const { json } = await scan(
      textPdf(["Rx", "1) Tab Pantoprazole 40mg OD", "2) Tab Zynovate XR 40mg OD"]),
      "rx.pdf",
      "application/pdf",
    );

    // The label array the widget selects from stays in step with the detail.
    expect(json.data.medicines.length).toBe(json.data.items.length);
    for (const label of json.data.medicines) {
      expect(typeof label).toBe("string");
      expect(label.trim().length).toBeGreaterThan(0);
    }

    const resolved = json.data.items.find((m: { medicineId?: string }) => m.medicineId);
    expect(resolved.requiresConfirmation).toBe(false);

    const unknown = json.data.items.find((m: { name: string }) => /zynovate/i.test(m.name));
    expect(unknown.medicineId ?? null).toBeNull();
    expect(unknown.requiresConfirmation).toBe(true);
    expect(json.data.requiresConfirmation).toBe(true);
  });
});

describe("privacy", () => {
  it("does not log prescription contents", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    try {
      await scan(
        textPdf(["Rx", "Tab Pantoprazole 40mg OD", "Patient: Ramesh Kumar"]),
        "rx.pdf",
        "application/pdf",
      );
      const logged = spy.mock.calls.flat().map(String).join(" ");
      expect(logged).not.toMatch(/pantoprazole/i);
      expect(logged).not.toMatch(/ramesh/i);
    } finally {
      spy.mockRestore();
    }
  });
});
