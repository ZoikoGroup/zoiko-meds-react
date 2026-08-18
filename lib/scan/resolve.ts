/**
 * Turn a candidate line into an identified medicine.
 *
 * Resolution order, best evidence first:
 *
 *   1. MediBase — the governed catalog. A hit gives the canonical name, the
 *      generic, and a strength to fall back on.
 *   2. The small offline dictionary — consulted only when MediBase is
 *      unreachable, and always scored below a catalog match.
 *   3. Unmatched — read off the prescription but absent from the catalog. Kept
 *      exactly as written, and always flagged for the user to confirm.
 *
 * A name is never invented and never rewritten into a different product: a
 * catalog name is only adopted when it is demonstrably the same word as the one
 * on the page, and everything short of that is handed to the user to check.
 */
import { apiFetch, type Medicine } from "@/lib/api";
import type { ParsedCandidate } from "./candidate-extract";
import { titleCase } from "./candidate-extract";
import { matchOfflineDictionary } from "./known-drugs";
import { bestSimilarity, containsName, normalize } from "./text-normalize";

/** Where an identification came from. */
export type MedicineSource = "medibase" | "offline-dictionary" | "prescription" | "vision";

/** One medicine detected on a prescription. */
export interface ScannedMedicine {
  /** Display name: the catalog's canonical name when matched, else as written. */
  name: string;
  /** Active ingredient, when the catalog knows it. */
  genericName?: string;
  /** e.g. "500 mg". */
  strength?: string;
  /** e.g. "Tablet", "Syrup". */
  dosageForm?: string;
  /** e.g. "30", "10 tablets" — when the prescription states a dispense amount. */
  quantity?: string;
  /** e.g. "1-0-1", "BD". */
  frequency?: string;
  /** e.g. "5 days". */
  duration?: string;
  /** 0..1. */
  confidence: number;
  /** True when the user should check this against their prescription first. */
  requiresConfirmation: boolean;
  source: MedicineSource;
  /** Short, honest explanation of how this was read. */
  note: string;
  /** 1-based page it was read from. */
  page: number;
}

/* ────────────────────────── confidence ────────────────────────── */

const SOURCE_WEIGHT: Record<MedicineSource, number> = {
  medibase: 1.0,
  // A small local list; it can confirm a spelling but is not a governed identity.
  "offline-dictionary": 0.78,
  // Read off the page but absent from the catalog — always user-confirmed.
  prescription: 0.55,
  vision: 0.9,
};

const EVIDENCE_BONUS: Record<string, number> = {
  formPrefix: 0.1,
  form: 0.06,
  strength: 0.1,
  frequency: 0.08,
  duration: 0.04,
  listItem: 0.03,
  medicineSection: 0.05,
  nameLike: 0.1,
};

/** Auto-accept at or above this. */
export const HIGH_CONFIDENCE = 0.8;
/** Below this there is not enough evidence to show anything at all. */
export const MIN_CONFIDENCE = 0.4;

function clamp01(value: number): number {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}

/**
 * Combine the available evidence into one confidence.
 *
 * The name match carries most of the signal; structural markers only
 * corroborate it, and a shaky OCR reading drags everything down.
 */
export function computeConfidence(input: {
  nameSimilarity: number;
  source: MedicineSource;
  evidence?: Record<string, boolean | undefined>;
  ocrConfidence?: number;
}): number {
  let score = clamp01(input.nameSimilarity) * 0.8;

  let bonus = 0;
  for (const [key, value] of Object.entries(EVIDENCE_BONUS)) {
    if (input.evidence?.[key]) bonus += value;
  }
  score += Math.min(bonus, 0.2);
  score *= SOURCE_WEIGHT[input.source];

  // A perfectly matched name read off a barely-legible scan is not certain.
  // Digital PDF text has no OCR step, so `undefined` correctly skips this.
  if (typeof input.ocrConfidence === "number") {
    score *= 0.75 + 0.25 * clamp01(input.ocrConfidence);
  }

  return clamp01(score);
}

/**
 * Two sources always need a human look regardless of score: `prescription`
 * (read off the page, absent from the catalog) and `vision` (a second attempt
 * at text OCR could not resolve).
 */
export function needsConfirmation(confidence: number, source: MedicineSource): boolean {
  if (source === "prescription" || source === "vision") return true;
  return confidence < HIGH_CONFIDENCE;
}

function explain(source: MedicineSource, confidence: number): string {
  switch (source) {
    case "medibase":
      return confidence >= HIGH_CONFIDENCE
        ? "Matched to the ZoikoMeds catalog"
        : "Close match in the ZoikoMeds catalog — please confirm";
    case "offline-dictionary":
      return "Matched offline — the catalog was unreachable";
    case "vision":
      return "Read by assisted reading — please confirm";
    default:
      return "Read from your prescription but not found in the catalog";
  }
}

/* ────────────────────────── quantity ────────────────────────── */

/**
 * A dispensed amount, as prescriptions write it: "Disp: 30", "#30", "Qty 20",
 * "10 tablets". Deliberately narrow — a bare number is a dose, not a quantity.
 */
const QUANTITY_RE =
  /(?:\b(?:disp|dispense|dispensed|qty|quantity|mitte|total)\b\s*[:.#-]?\s*(\d{1,4})\b)|(?:#\s*(\d{1,4})\b)|(?:\b(\d{1,4})\s*(?:tabs?|tablets?|caps?|capsules?|strips?|bottles?|units?|sachets?|vials?|amps?|ampoules?)\b)/i;

export function extractQuantity(line: string): string | undefined {
  const match = QUANTITY_RE.exec(line ?? "");
  if (!match) return undefined;
  const value = match[1] ?? match[2] ?? match[3];
  if (!value) return undefined;
  // Keep the unit when the prescription wrote one ("10 tablets").
  const unit = /\b\d{1,4}\s*(tabs?|tablets?|caps?|capsules?|strips?|bottles?|units?|sachets?|vials?|amps?|ampoules?)\b/i.exec(match[0]);
  return unit ? `${value} ${unit[1].toLowerCase()}` : value;
}

/* ────────────────────────── catalog lookup ────────────────────────── */

/** Accept a catalog identity only at or above this similarity. */
const MEDIBASE_FLOOR = 0.72;
const MEDIBASE_TIMEOUT_MS = 4000;

/**
 * Ask MediBase about one name.
 *
 * Returns null on any failure — an unreachable catalog must degrade to the
 * offline path, never fail the scan.
 */
function catalogTimeout(): AbortSignal | undefined {
  return typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function"
    ? AbortSignal.timeout(MEDIBASE_TIMEOUT_MS)
    : undefined;
}

async function lookupMedibase(name: string, signal?: AbortSignal): Promise<Medicine[] | null> {
  try {
    const results = await apiFetch<Medicine[]>("medibase/match", {
      query: { q: name, limit: 5 },
      // A slow catalog must not hold the whole scan open.
      signal: signal ?? catalogTimeout(),
    });
    return Array.isArray(results) ? results : null;
  } catch {
    return null;
  }
}

/** Pick the catalog entry that really is this name, or null. */
function bestCatalogMatch(name: string, results: Medicine[]): { medicine: Medicine; similarity: number } | null {
  let best: { medicine: Medicine; similarity: number } | null = null;

  for (const medicine of results) {
    const references = [medicine.canonicalName, medicine.genericName, ...(medicine.brandNames ?? [])].filter(
      Boolean,
    ) as string[];
    if (!references.length) continue;

    // A whole-token containment is as good as certain ("Amoxicillin" inside
    // "Amoxicillin Clavulanate").
    const contained = references.some((reference) => containsName(name, reference));
    const { score } = bestSimilarity(name, references);
    const similarity = contained ? Math.max(score, 0.95) : score;

    if (similarity >= MEDIBASE_FLOOR && (!best || similarity > best.similarity)) {
      best = { medicine, similarity };
    }
  }

  return best;
}

/* ────────────────────────── resolution ────────────────────────── */

export interface ResolveContext {
  page?: number;
  ocrConfidence?: number;
  /** Shared across one scan so a repeated name is only looked up once. */
  cache?: Map<string, Medicine[] | null>;
  signal?: AbortSignal;
}

/**
 * Identify one parsed candidate. Returns null when the reading is too weak to
 * show — better nothing than a guess.
 */
export async function resolveCandidate(
  parsed: ParsedCandidate,
  context: ResolveContext = {},
): Promise<ScannedMedicine | null> {
  const written = parsed.name.trim();
  if (written.length < 3) return null;

  const page = context.page ?? 1;
  const evidence = parsed.evidence as Record<string, boolean | undefined>;
  const quantity = extractQuantity(parsed.raw);

  const base = {
    strength: parsed.strength || undefined,
    dosageForm: parsed.form ? titleCase(parsed.form) : undefined,
    quantity,
    frequency: parsed.frequency || undefined,
    duration: parsed.duration || undefined,
    page,
  };

  // 1. The governed catalog.
  const key = normalize(written);
  let results = context.cache?.get(key) ?? null;
  if (!context.cache?.has(key)) {
    results = await lookupMedibase(written, context.signal);
    context.cache?.set(key, results);
  }

  if (results) {
    const match = bestCatalogMatch(written, results);
    if (match) {
      const confidence = computeConfidence({
        nameSimilarity: match.similarity,
        source: "medibase",
        evidence,
        ocrConfidence: context.ocrConfidence,
      });
      return {
        ...base,
        name: match.medicine.canonicalName,
        genericName: match.medicine.genericName ?? undefined,
        strength: parsed.strength || match.medicine.strength || undefined,
        dosageForm: base.dosageForm ?? match.medicine.dosageForm ?? undefined,
        confidence,
        requiresConfirmation: needsConfirmation(confidence, "medibase"),
        source: "medibase",
        note: explain("medibase", confidence),
      };
    }
  }

  // 2. Offline dictionary — only meaningful when the catalog was unreachable,
  //    and scored below it either way.
  const offline = matchOfflineDictionary(written);
  if (offline) {
    const confidence = computeConfidence({
      nameSimilarity: offline.similarity,
      source: "offline-dictionary",
      evidence,
      ocrConfidence: context.ocrConfidence,
    });
    return {
      ...base,
      name: offline.drug.name,
      genericName: offline.drug.generic || undefined,
      strength: parsed.strength || offline.drug.defaultStrength || undefined,
      confidence,
      requiresConfirmation: needsConfirmation(confidence, "offline-dictionary"),
      source: "offline-dictionary",
      note: explain("offline-dictionary", confidence),
    };
  }

  // 3. Unmatched. Keep exactly what the prescription says — a medicine that is
  //    new, regional, or simply absent from the catalog is still real.
  const confidence = computeConfidence({
    nameSimilarity: 1,
    source: "prescription",
    evidence,
    ocrConfidence: context.ocrConfidence,
  });
  if (confidence < MIN_CONFIDENCE) return null;

  return {
    ...base,
    name: titleCase(parsed.displayName || written),
    confidence,
    requiresConfirmation: true,
    source: "prescription",
    note: explain("prescription", confidence),
  };
}
