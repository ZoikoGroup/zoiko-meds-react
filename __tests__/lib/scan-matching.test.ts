/**
 * @vitest-environment node
 *
 * Name matching and structured extraction — the parts that decide whether a
 * reading becomes a medicine, and which medicine it becomes.
 */
import { describe, it, expect } from "vitest";
import { containsName, similarity, foldConfusions } from "@/lib/scan/text-normalize";
import { matchOfflineDictionary } from "@/lib/scan/known-drugs";
import { extractQuantity, computeConfidence, needsConfirmation } from "@/lib/scan/resolve";
import { mergeDuplicates } from "@/lib/scan/extract";
import type { ScannedMedicine } from "@/lib/scan/resolve";

describe("containsName — whole tokens, never substrings", () => {
  it("matches a genuine token run", () => {
    expect(containsName("Amoxicillin Clavulanate", "Amoxicillin")).toBe(true);
    expect(containsName("Dolo 650", "Dolo")).toBe(true);
    expect(containsName("Paracetamol", "Paracetamol")).toBe(true);
  });

  it("does not match a name merely embedded in a longer word", () => {
    // These are different medicines; a substring test conflates them.
    expect(containsName("Dolonex DT", "Dolo")).toBe(false);
    expect(containsName("Pantocid", "Panto")).toBe(false);
    expect(containsName("Zincovit", "Zinc")).toBe(false);
    expect(containsName("Metformin", "Met")).toBe(false);
  });

  it("ignores fragments too short to be decisive", () => {
    expect(containsName("Dolo 650", "Do")).toBe(false);
  });
});

describe("OCR confusion folding", () => {
  it("treats the classic misreads as the same word", () => {
    expect(foldConfusions("ParacetamoI")).toBe(foldConfusions("Paracetamol"));
    expect(foldConfusions("Amox1cillin")).toBe(foldConfusions("Amoxicillin"));
  });

  it("still separates genuinely different names", () => {
    expect(similarity("Metformin", "Telmisartan")).toBeLessThan(0.7);
  });
});

describe("offline dictionary", () => {
  it("recognises a known brand", () => {
    expect(matchOfflineDictionary("Calpol")?.drug.name).toBe("Calpol");
  });

  it("does not claim a different medicine that merely starts the same way", () => {
    expect(matchOfflineDictionary("Dolonex DT")).toBeNull();
  });

  it("ignores fragments", () => {
    expect(matchOfflineDictionary("Do")).toBeNull();
  });
});

describe("quantity extraction", () => {
  it("reads the dispensed amount in the forms prescriptions use", () => {
    expect(extractQuantity("Tab Amoxicillin 500mg  Disp: 30")).toBe("30");
    expect(extractQuantity("Tab Amoxicillin 500mg  #20")).toBe("20");
    expect(extractQuantity("Tab Amoxicillin 500mg  Qty 14")).toBe("14");
    expect(extractQuantity("Amoxicillin 500mg — 10 tablets")).toBe("10 tablets");
  });

  it("does not mistake a dose or a strength for a quantity", () => {
    expect(extractQuantity("Tab Amoxicillin 500 mg 1-0-1")).toBeUndefined();
    expect(extractQuantity("Syp Ascoril 10 ml TDS")).toBeUndefined();
  });
});

describe("confidence", () => {
  it("clears the bar for a catalog match with dosage evidence", () => {
    const confidence = computeConfidence({
      nameSimilarity: 1,
      source: "medibase",
      evidence: { formPrefix: true, strength: true, frequency: true },
    });
    expect(confidence).toBeGreaterThanOrEqual(0.8);
    expect(needsConfirmation(confidence, "medibase")).toBe(false);
  });

  it("always asks for confirmation on a name the catalog does not know", () => {
    const confidence = computeConfidence({ nameSimilarity: 1, source: "prescription", evidence: { strength: true } });
    expect(needsConfirmation(confidence, "prescription")).toBe(true);
  });

  it("drags confidence down when the OCR reading was poor", () => {
    const shared = { nameSimilarity: 1, source: "medibase" as const, evidence: { strength: true } };
    expect(computeConfidence({ ...shared, ocrConfidence: 0.2 })).toBeLessThan(
      computeConfidence({ ...shared, ocrConfidence: 0.95 }),
    );
  });
});

describe("duplicate merging", () => {
  const base: ScannedMedicine = {
    name: "Paracetamol",
    strength: "650 mg",
    confidence: 0.9,
    requiresConfirmation: false,
    source: "medibase",
    note: "",
    page: 1,
  };

  it("collapses the same medicine read twice", () => {
    expect(mergeDuplicates([base, { ...base, page: 2 }])).toHaveLength(1);
  });

  it("collapses two OCR spellings of one name", () => {
    expect(mergeDuplicates([base, { ...base, name: "ParacetamoI", page: 2 }])).toHaveLength(1);
  });

  it("keeps different strengths apart", () => {
    expect(mergeDuplicates([base, { ...base, strength: "500 mg" }])).toHaveLength(2);
  });

  it("keeps different medicines apart", () => {
    expect(mergeDuplicates([base, { ...base, name: "Pantoprazole" }])).toHaveLength(2);
  });

  it("keeps the more certain reading and backfills missing detail", () => {
    const merged = mergeDuplicates([
      { ...base, confidence: 0.5, dosageForm: undefined, quantity: "30" },
      { ...base, confidence: 0.9, dosageForm: "Tablet" },
    ]);
    expect(merged).toHaveLength(1);
    expect(merged[0]).toMatchObject({ confidence: 0.9, dosageForm: "Tablet", quantity: "30" });
  });
});
