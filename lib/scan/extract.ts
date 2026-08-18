/**
 * Prescription text → identified medicines.
 *
 *   page text → candidate lines (structural classification)
 *             → metadata filtering
 *             → parse into name / strength / form / quantity
 *             → resolve against MediBase, then the offline dictionary
 *             → merge duplicate readings
 *             → results, with anything uncertain flagged for confirmation
 *
 * Every qualifying line is processed — there is no early exit, so a
 * prescription listing eight medicines yields eight results.
 */
import type { Medicine } from "@/lib/api";
import { extractCandidateLines, parseCandidate } from "./candidate-extract";
import { resolveCandidate, type ScannedMedicine } from "./resolve";
import { foldConfusions, normalize, similarity } from "./text-normalize";

/** One page of text to read. */
export interface PageText {
  page: number;
  text: string;
  /** 0..1 OCR confidence; absent for a PDF's own text layer. */
  ocrConfidence?: number;
}

/** Cap on results, so a pathological document cannot flood the response. */
const MAX_MEDICINES = 40;

/** How many candidate lines a single page may contribute. */
const MAX_CANDIDATES_PER_PAGE = 30;

/**
 * Two readings are the same medicine when they agree once OCR glyph confusions
 * are folded out. Set high on purpose: merging two genuinely different
 * medicines would lose one from the prescription.
 */
const SAME_MEDICINE_FLOOR = 0.94;

function isSameMedicine(a: ScannedMedicine, b: ScannedMedicine): boolean {
  if (!sameStrength(a.strength, b.strength)) return false;
  if (foldConfusions(a.name) === foldConfusions(b.name)) return true;
  return similarity(a.name, b.name) >= SAME_MEDICINE_FLOOR;
}

/**
 * Different strengths of the same drug are different prescription lines —
 * "Ibuprofen 200mg" in the morning and "Ibuprofen 400mg" at night must not
 * collapse into one.
 */
function sameStrength(a?: string, b?: string): boolean {
  if (!a || !b) return true; // one side unknown — treat as the same line
  return normalize(a).replace(/\s+/g, "") === normalize(b).replace(/\s+/g, "");
}

/**
 * Collapse repeat readings of the same medicine — a name written twice, or a
 * page overlap in a multi-page scan. The more certain reading wins and detail
 * present on either is kept.
 */
export function mergeDuplicates(medicines: ScannedMedicine[]): ScannedMedicine[] {
  const merged: ScannedMedicine[] = [];

  for (const medicine of medicines) {
    const existing = merged.find((m) => isSameMedicine(m, medicine));
    if (!existing) {
      merged.push({ ...medicine });
      continue;
    }

    const better = medicine.confidence > existing.confidence ? medicine : existing;
    const other = better === existing ? medicine : existing;
    Object.assign(existing, {
      ...better,
      genericName: better.genericName ?? other.genericName,
      strength: better.strength ?? other.strength,
      dosageForm: better.dosageForm ?? other.dosageForm,
      quantity: better.quantity ?? other.quantity,
      frequency: better.frequency ?? other.frequency,
      duration: better.duration ?? other.duration,
      page: Math.min(existing.page, medicine.page),
    });
  }

  return merged.slice(0, MAX_MEDICINES);
}

/**
 * Detect every medicine across every page.
 *
 * Pages are processed independently and merged, so a medicine on page 3 is
 * found whether or not page 1 yielded anything. Catalog lookups for one page
 * run concurrently and share a cache across the whole scan.
 */
export async function detectMedicines(pages: PageText[]): Promise<ScannedMedicine[]> {
  const cache = new Map<string, Medicine[] | null>();
  const found: ScannedMedicine[] = [];

  for (const page of pages) {
    const parsed = extractCandidateLines(page.text)
      .slice(0, MAX_CANDIDATES_PER_PAGE)
      .map((candidate) => parseCandidate(candidate))
      .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null);

    // One round trip per distinct name, all in flight together — a prescription
    // with eight medicines should not take eight sequential catalog calls.
    const resolved = await Promise.all(
      parsed.map((candidate) =>
        resolveCandidate(candidate, {
          page: page.page,
          ocrConfidence: page.ocrConfidence,
          cache,
        }).catch((err) => {
          console.warn("[medicine/scan] Could not resolve a candidate:", err instanceof Error ? err.message : err);
          return null;
        }),
      ),
    );

    for (const medicine of resolved) {
      if (medicine) found.push(medicine);
    }
  }

  return mergeDuplicates(found);
}

/**
 * Should the AI/vision fallback be tried?
 *
 * Either nothing was read at all, or everything read needs confirming — in both
 * cases a second opinion is worth the round trip.
 */
export function shouldTryVision(medicines: ScannedMedicine[]): boolean {
  if (medicines.length === 0) return true;
  return medicines.every((m) => m.requiresConfirmation);
}
