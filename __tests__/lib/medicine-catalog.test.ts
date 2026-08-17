import { describe, it, expect } from "vitest";
import { matchCatalog, unrecognizedMedicineLines } from "@/lib/medicine-catalog";

describe("matchCatalog", () => {
  it("detects the medicines in document order", () => {
    expect(matchCatalog("Ibuprofen\nNaproxen Sodium\nAcetaminophen")).toEqual([
      "Ibuprofen 400mg",
      "Naproxen Sodium 500mg",
      "Paracetamol 650mg",
    ]);
  });

  it("keeps the strength written on the prescription over the catalog default", () => {
    expect(matchCatalog("Tab Ibuprofen 200 mg twice daily")).toEqual(["Ibuprofen 200mg"]);
    expect(matchCatalog("Paracetamol 500mg SOS")).toEqual(["Paracetamol 500mg"]);
  });

  it("falls back to the catalog strength when the prescription omits one", () => {
    expect(matchCatalog("Tab Ibuprofen twice daily")).toEqual(["Ibuprofen 400mg"]);
  });

  it("ignores a strength in a different unit than the catalog name", () => {
    expect(matchCatalog("Ibuprofen suspension 5ml")).toEqual(["Ibuprofen 400mg"]);
  });

  it("prefers the specific brand entry over the generic one it overlaps", () => {
    // "Calpol" alone maps to the 250mg syrup; "Calpol 650" must not yield both.
    expect(matchCatalog("Syp Calpol 650")).toEqual(["Calpol 650mg"]);
    expect(matchCatalog("Syp Calpol")).toEqual(["Calpol 250mg Syrup"]);
  });

  it("matches brand names onto their canonical generic", () => {
    expect(matchCatalog("Advil and Zyrtec")).toEqual(["Ibuprofen 400mg", "Cetirizine 10mg"]);
  });

  it("does not match a drug name embedded in a longer word", () => {
    expect(matchCatalog("Superdolomite quarry report")).toEqual([]);
  });

  it("de-duplicates repeat mentions", () => {
    expect(matchCatalog("Paracetamol in the morning, paracetamol at night")).toEqual([
      "Paracetamol 650mg",
    ]);
  });

  it("returns nothing for text with no medicines", () => {
    expect(matchCatalog("Patient review scheduled next Tuesday")).toEqual([]);
    expect(matchCatalog("")).toEqual([]);
  });
});

describe("unrecognizedMedicineLines", () => {
  it("keeps brands neither catalog knows instead of dropping them", () => {
    // Nurokind OD and Carbamide Forte are in neither the local catalog nor
    // MediBase; they must still reach the user.
    expect(unrecognizedMedicineLines("Becosules\nNurokind OD\nCarbamide Forte", ["Becosules"])).toEqual([
      "Nurokind OD",
      "Carbamide Forte",
    ]);
  });

  it("returns every unknown medicine, not just the first", () => {
    const lines = "Zincovit\nShelcal 500\nLiv 52 DS\nNeurobion";
    expect(unrecognizedMedicineLines(lines)).toHaveLength(4);
  });

  it("skips lines already accounted for by name or synonym", () => {
    // "Acetaminophen" resolved to Paracetamol — it must not come back a second time.
    expect(unrecognizedMedicineLines("Ibuprofen\nAcetaminophen", ["Ibuprofen 400mg", "Paracetamol 650mg"])).toEqual([]);
    // The line a resolved brand was read from.
    expect(unrecognizedMedicineLines("Syp Delcon 5ml at bedtime", ["Delcon Syrup"])).toEqual([]);
  });

  it("ignores prescription paperwork", () => {
    const paperwork = [
      "SUNRISE MULTISPECIALITY HOSPITAL",
      "Consultant: Dr. Meera Raghavan, MBBS MD",
      "Registration Number KMC-448291",
      "Patient Name: Suresh Menon",
      "Weight 71 kg",
      "Complaint: fever with sore throat",
      "Rx",
      "Review after one week",
      "Please take the tablets with food and water",
      "12/08/2026",
    ].join("\n");
    expect(unrecognizedMedicineLines(paperwork)).toEqual([]);
  });

  it("strips dosage form and dosing schedule but keeps brand suffixes", () => {
    expect(unrecognizedMedicineLines("Tab Zincovit 1-0-1")).toEqual(["Zincovit"]);
    expect(unrecognizedMedicineLines("Cap Bevon x 10 days")).toEqual(["Bevon"]);
    // "OD" here is part of the brand name, not a frequency — do not strip it.
    expect(unrecognizedMedicineLines("Tab Nurokind OD")).toEqual(["Nurokind OD"]);
  });

  it("handles bullets and numbered lists", () => {
    expect(unrecognizedMedicineLines("1. Zincovit\n- Shelcal 500\n• Bevon")).toEqual([
      "Zincovit",
      "Shelcal 500",
      "Bevon",
    ]);
  });

  it("returns nothing for empty input", () => {
    expect(unrecognizedMedicineLines("")).toEqual([]);
  });
});
