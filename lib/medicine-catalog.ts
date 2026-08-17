/**
 * Medicine-name recognition for scanned prescriptions.
 *
 * Two layers, deliberately in this order:
 *
 *  1. {@link MEDICINE_CATALOG} — the local catalog of generics and the Indian/UK
 *     brand names that map onto them. Offline, deterministic, and covers the
 *     names that show up on most prescriptions.
 *  2. {@link canonicalizeUnknownCandidates} — anything drug-shaped the local
 *     catalog didn't recognize is checked against the live ZoikoMeds MediBase
 *     (`/medibase/match`), so the scanner isn't limited to the names hard-coded
 *     here. Best-effort: it fails open on a network error or timeout.
 */
import { apiFetch, type Medicine } from "./api";

export interface CatalogEntry {
  /** Matches the generic plus its common brand spellings. */
  pattern: RegExp;
  /** Canonical ZoikoMeds display name. */
  name: string;
}

/**
 * Ordered most-specific first: a strength-qualified brand ("Calpol 250") must
 * be tried before the bare brand, because the matcher drops any later entry
 * whose match overlaps one already accepted.
 */
export const MEDICINE_CATALOG: CatalogEntry[] = [
  { pattern: /\bdelcon\b/i, name: "Delcon Syrup" },
  { pattern: /\blevolin\b/i, name: "Levolin Syrup" },
  { pattern: /\bmeftal[-_\s]*p\b|\bmeftal\b/i, name: "Meftal-P Syrup (100mg/5ml)" },
  { pattern: /\bcalpol[-_\s]*250\b|\bcalpol[-_\s]*\(?250\/5\)?\b/i, name: "Calpol 250mg Syrup" },
  { pattern: /\bcalpol[-_\s]*650\b/i, name: "Calpol 650mg" },
  { pattern: /\bcalpol\b/i, name: "Calpol 250mg Syrup" },
  { pattern: /\bparacetamol\b|\bacetaminophen\b|\bpcm\b/i, name: "Paracetamol 650mg" },
  { pattern: /\bnaproxen\b|\baleve\b|\bnaprosyn\b/i, name: "Naproxen Sodium 500mg" },
  { pattern: /\bdolo[-_\s]*650\b/i, name: "Dolo 650mg" },
  { pattern: /\bdolo[-_\s]*500\b/i, name: "Dolo 500mg" },
  { pattern: /\bdolo\b/i, name: "Dolo 650mg" },
  { pattern: /\bcrocin[-_\s]*650\b/i, name: "Crocin 650mg" },
  { pattern: /\bcrocin[-_\s]*500\b/i, name: "Crocin 500mg" },
  { pattern: /\bcrocin\b/i, name: "Crocin 500mg" },
  { pattern: /\baugmentin\b/i, name: "Augmentin 625mg" },
  { pattern: /\bamoxicillin\b|\bamoxil\b|\bamox\b/i, name: "Amoxicillin 500mg" },
  { pattern: /\bibuprofen\b|\bibugesic\b|\bbrufen\b|\badvil\b|\bmotrin\b/i, name: "Ibuprofen 400mg" },
  { pattern: /\bomeprazole\b|\bocid\b|\bprilosec\b/i, name: "Omeprazole 20mg" },
  { pattern: /\bpantoprazole\b|\bpanto\b|\bpan[-_\s]*40\b|\bprotonix\b/i, name: "Pantoprazole 40mg" },
  { pattern: /\bmetformin\b|\bglycomet\b|\bglucophage\b/i, name: "Metformin 500mg" },
  { pattern: /\bazithromycin\b|\bazithro\b|\bazithral\b|\bzithromax\b/i, name: "Azithromycin 500mg" },
  { pattern: /\bcetirizine\b|\bcetri\b|\bcetzine\b|\bzyrtec\b/i, name: "Cetirizine 10mg" },
  { pattern: /\batorvastatin\b|\batorva\b|\blipitor\b/i, name: "Atorvastatin 10mg" },
  { pattern: /\bdoxycycline\b|\bdoxy\b/i, name: "Doxycycline 100mg" },
  { pattern: /\bmontelukast\b|\bmontair\b|\bmontelu\b|\bsingulair\b/i, name: "Montelukast 10mg" },
  { pattern: /\bamlodipine\b|\bamlo\b|\bnorvasc\b/i, name: "Amlodipine 5mg" },
  { pattern: /\btelmisartan\b|\btelma\b|\btelmi\b/i, name: "Telmisartan 40mg" },
  { pattern: /\bgabapentin\b|\bgaba\b|\bneurontin\b/i, name: "Gabapentin 300mg" },
  { pattern: /\bpregabalin\b|\bpregab\b|\blyrica\b/i, name: "Pregabalin 75mg" },
  { pattern: /\bciprofloxacin\b|\bcipro\b/i, name: "Ciprofloxacin 500mg" },
  { pattern: /\blosartan\b|\bcozaar\b/i, name: "Losartan 50mg" },
  { pattern: /\brosuvastatin\b|\brosuva\b|\bcrestor\b/i, name: "Rosuvastatin 10mg" },
  { pattern: /\baspirin\b|\becospirin\b/i, name: "Aspirin 75mg" },
  { pattern: /\bsalbutamol\b|\basthalin\b|\bventolin\b/i, name: "Salbutamol Inhaler 100mcg" },
  { pattern: /\blevothyroxine\b|\bthyronorm\b|\bsynthroid\b/i, name: "Levothyroxine 50mcg" },
];

/** A strength written on the prescription, e.g. "500 mg", "5ml", "60000 IU". */
const STRENGTH_IN_TEXT = /\b(\d+(?:\.\d+)?)\s*(mg|mcg|ml|g|iu)\b/i;
/** A canonical name that ends in a plain strength, e.g. "Ibuprofen 400mg". */
const STRENGTH_IN_NAME = /^(.*?)\s+(\d+(?:\.\d+)?)(mg|mcg|ml|g|iu)$/i;

/**
 * Prefer the strength actually written on the prescription over the catalog's
 * default, so "Ibuprofen 200 mg" doesn't come back as "Ibuprofen 400mg".
 * Only applies when both sides carry a plain trailing strength in the same unit.
 */
function applyDocumentStrength(canonical: string, text: string, matchEnd: number): string {
  const nameParts = STRENGTH_IN_NAME.exec(canonical);
  if (!nameParts) return canonical;

  const lineEnd = text.indexOf("\n", matchEnd);
  const tail = text.slice(matchEnd, lineEnd === -1 ? matchEnd + 40 : Math.min(lineEnd, matchEnd + 40));
  const found = STRENGTH_IN_TEXT.exec(tail);
  if (!found) return canonical;
  if (found[2].toLowerCase() !== nameParts[3].toLowerCase()) return canonical;

  return `${nameParts[1]} ${found[1]}${nameParts[3]}`;
}

/**
 * Find every catalog medicine mentioned in `text`, in the order they appear.
 *
 * Overlapping matches collapse to the most specific one, so "Calpol 650" yields
 * only "Calpol 650mg" rather than that plus the generic "Calpol" entry.
 */
export function matchCatalog(text: string): string[] {
  if (!text) return [];

  const hits: { start: number; end: number; rank: number; name: string }[] = [];
  MEDICINE_CATALOG.forEach((entry, rank) => {
    const probe = new RegExp(entry.pattern.source, entry.pattern.flags.replace("g", ""));
    const m = probe.exec(text);
    if (m) hits.push({ start: m.index, end: m.index + m[0].length, rank, name: entry.name });
  });

  hits.sort((a, b) => a.start - b.start || a.rank - b.rank);

  const accepted: { start: number; end: number }[] = [];
  const names: string[] = [];
  const seen = new Set<string>();

  for (const hit of hits) {
    if (accepted.some((a) => hit.start < a.end && a.start < hit.end)) continue;
    accepted.push({ start: hit.start, end: hit.end });
    const name = applyDocumentStrength(hit.name, text, hit.end);
    if (!seen.has(name)) {
      seen.add(name);
      names.push(name);
    }
  }

  return names;
}

/**
 * Words that show up on prescriptions but are never medicine names. Keeps the
 * MediBase lookups focused (and cheap) instead of querying every long word.
 */
const NON_MEDICINE_WORDS = new Set([
  "adult", "advice", "after", "again", "against", "before", "bedtime", "brand", "capsule",
  "capsules", "child", "chronic", "clinic", "consult", "daily", "date", "days", "diagnosis",
  "dispense", "doctor", "dose", "dosage", "drops", "email", "evening", "every", "female",
  "follow", "food", "generic", "gender", "hospital", "hours", "injection", "instructions",
  "male", "meals", "medical", "medicine", "medicines", "milligram", "months", "morning",
  "name", "night", "note", "notes", "once", "oral", "patient", "pharmacy", "phone", "please",
  "prescribed", "prescription", "quantity", "refill", "registration", "remarks", "repeat",
  "review", "signature", "street", "sublingual", "sugar", "syrup", "tablet", "tablets",
  "take", "thrice", "times", "topical", "total", "treatment", "twice", "until", "visit",
  "water", "weeks", "weight", "with", "without", "years",
]);

const MAX_MEDIBASE_LOOKUPS = 10;
const MEDIBASE_TIMEOUT_MS = 4000;
const MEDIBASE_MIN_SCORE = 0.6;

/** "Tab Cefixime", "Syp. Delcon" — what precedes a prescribed medicine. */
const DOSAGE_FORM_BEFORE =
  /\b(?:tab|tabs|tablet|cap|caps|capsule|syp|syr|syrup|inj|injection|susp|sol|drop|drops|oint|cream|rx|adv|advice)\.?\s*$/i;
/** "Cefixime 200mg" — a strength immediately after the word. */
const STRENGTH_AFTER = /^\s*(?:\([^)]*\)\s*)?\d+(?:\.\d+)?\s*(?:mg|mcg|ml|g|iu)\b/i;

/**
 * Drug-shaped words the local catalog didn't already account for, best first.
 *
 * A real prescription carries far more boilerplate than medicines, so words
 * that sit where a drug sits — after "Tab"/"Syp"/"Rx", or in front of a
 * strength — are looked up before the rest of the page.
 */
function candidateWords(text: string, alreadyMatched: string[]): string[] {
  const covered = new Set(
    alreadyMatched.flatMap((n) => n.toLowerCase().split(/[^a-z]+/i)).filter(Boolean),
  );

  const found = new Map<string, { word: string; prescribed: boolean; index: number }>();
  for (const m of text.matchAll(/[A-Za-z][A-Za-z-]{3,}/g)) {
    const word = m[0];
    const key = word.toLowerCase();
    if (covered.has(key) || NON_MEDICINE_WORDS.has(key)) continue;

    const index = m.index ?? 0;
    const prescribed =
      STRENGTH_AFTER.test(text.slice(index + word.length, index + word.length + 16)) ||
      DOSAGE_FORM_BEFORE.test(text.slice(Math.max(0, index - 12), index));

    const previous = found.get(key);
    if (!previous) found.set(key, { word, prescribed, index });
    else if (prescribed && !previous.prescribed) found.set(key, { ...previous, prescribed });
  }

  return Array.from(found.values())
    .sort((a, b) => Number(b.prescribed) - Number(a.prescribed) || a.index - b.index)
    .slice(0, MAX_MEDIBASE_LOOKUPS)
    .map((c) => c.word);
}

/**
 * Pick the MediBase name for a candidate word, or null if nothing is a real
 * match. Fuzzy neighbours are rejected: the candidate has to *be* the name, or
 * be the name minus its strength ("cefixime" → "Cefixime 200 mg").
 *
 * Returns the name the candidate actually matched, so a prescription that says
 * "Cefixime" comes back as Cefixime rather than as one of its brands.
 */
function resolveCandidate(candidate: string, results: Medicine[]): string | null {
  const q = candidate.toLowerCase();
  const isSameDrug = (name?: string | null): boolean => {
    if (!name) return false;
    const lower = name.toLowerCase();
    return lower === q || lower.startsWith(`${q} `);
  };

  const confident = (results ?? []).filter((med) => (med.score ?? 0) >= MEDIBASE_MIN_SCORE);
  for (const med of confident) if (isSameDrug(med.canonicalName)) return med.canonicalName;
  for (const med of confident) if (isSameDrug(med.genericName)) return med.genericName as string;
  for (const med of confident) {
    const brand = (med.brandNames ?? []).find(isSameDrug);
    if (brand) return brand;
  }
  return null;
}

/**
 * Resolve drug-shaped words against the live ZoikoMeds MediBase so the scanner
 * recognizes medicines beyond {@link MEDICINE_CATALOG}.
 *
 * Best-effort by design — a MediBase outage must not turn a successful scan
 * into a failed one, so every error resolves to "no extra matches".
 */
export async function canonicalizeUnknownCandidates(
  text: string,
  alreadyMatched: string[] = [],
): Promise<string[]> {
  const candidates = candidateWords(text, alreadyMatched);
  if (!candidates.length) return [];

  const signal =
    typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function"
      ? AbortSignal.timeout(MEDIBASE_TIMEOUT_MS)
      : undefined;

  const settled = await Promise.allSettled(
    candidates.map(async (candidate) => {
      const results = await apiFetch<Medicine[]>("medibase/match", {
        query: { q: candidate, limit: 5 },
        signal,
      });
      return resolveCandidate(candidate, results);
    }),
  );

  const extras: string[] = [];
  const seen = new Set(alreadyMatched.map((n) => n.toLowerCase()));
  for (const outcome of settled) {
    if (outcome.status !== "fulfilled" || !outcome.value) continue;
    const key = outcome.value.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    extras.push(outcome.value);
  }
  return extras;
}

/* ────────────────── medicines neither catalog knows ────────────────── */

/**
 * Words that mark a line as prescription paperwork rather than a medicine.
 * A line carrying any of these is never offered as a medicine name.
 */
const PAPERWORK_LINE =
  /\b(?:hospital|clinic|consultant|consultation|physician|surgeon|doctor|dr|mbbs|bds|md|ms|dnb|patient|registration|regd|licence|license|address|street|phone|mobile|email|website|age|gender|sex|weight|height|pulse|temperature|diagnosis|complaint|complaints|history|allergy|allergies|follow|review|revisit|signature|stamp|date|dated|visit|appointment|invoice|receipt|bill|total|amount|quantity|refill|pharmacy|pharmacist|instruction|instructions|note|notes|remark|remarks|advice|advised|report|referral|investigation|department|ward|bed)\b/i;

/** Two or more of these means the line is a sentence, not a medicine name. */
const PROSE_WORDS =
  /\b(?:the|and|with|from|that|this|your|you|are|was|were|have|has|had|will|would|should|shall|can|could|may|must|please|kindly|after|before|until|when|while|then|than|about|into|over|under|there|their|been|being|does|done)\b/gi;

/** "Tab Cefixime" → "Cefixime". Dosage form is not part of the name. */
const DOSAGE_FORM_LEAD =
  /^(?:tab|tabs|tablet|tablets|cap|caps|capsule|capsules|syp|syr|syrup|inj|injection|susp|suspension|sol|solution|drop|drops|oint|ointment|cream|gel|lotion|powder|sachet|spray|inhaler)\.?\s+/i;

/** Unambiguous dosing tails — "1-0-1", "x 5 days". Frequency codes (OD/BD/HS) are left alone: they are also brand suffixes. */
const DOSING_TAIL = [
  /\s+\d(?:\s*-\s*\d){1,3}\s*$/,
  /\s+[x×]\s*\d+\s*(?:days?|weeks?|months?)\s*$/i,
  /\s+for\s+\d+\s*(?:days?|weeks?|months?)\s*$/i,
];

const MAX_PASSTHROUGH_LINES = 12;

/** Strip bullets, numbering and dosage-form prefixes to get at the name itself. */
function cleanMedicineLine(line: string): string {
  let name = line.trim().replace(/^[-–—•*·>•]+\s*/, "").replace(/^\d+[.)]\s*/, "").trim();
  name = name.replace(DOSAGE_FORM_LEAD, "").trim();
  for (const tail of DOSING_TAIL) name = name.replace(tail, "").trim();
  return name.replace(/[,;.]+$/, "").trim();
}

/** Does this line read like the name of a prescribed medicine? */
function looksLikeMedicineLine(name: string): boolean {
  if (name.length < 4 || name.length > 48) return false;
  // "Patient Name: …", "Age / Sex: …" — field lines, never medicines.
  if (/[:;]/.test(name)) return false;
  const words = name.split(/\s+/);
  if (words.length > 6) return false;
  // Needs a real name-shaped token, not just codes and numbers. Three letters
  // is the floor because short brands are common ("Liv 52 DS", "Pan D").
  if (!words.some((w) => /^[A-Za-z][A-Za-z-]{2,}$/.test(w))) return false;
  if ((name.match(/[A-Za-z]/g) ?? []).length < 4) return false;
  if (PAPERWORK_LINE.test(name)) return false;
  if ((name.match(PROSE_WORDS) ?? []).length >= 2) return false;
  return true;
}

/**
 * Medicine names the prescription clearly states but neither the local catalog
 * nor MediBase recognizes — newly launched brands, regional products, or
 * anything MediBase hasn't ingested yet.
 *
 * Dropping these loses real medicines the scanner read correctly, so they are
 * passed through as written. The user still picks which chips to search, and an
 * unknown name searches fine — it just reports no verified availability.
 */
export function unrecognizedMedicineLines(text: string, alreadyFound: string[] = []): string[] {
  if (!text) return [];

  // The leading token of an already-resolved name ("Delcon Syrup" → "delcon")
  // is what identifies its source line; the dosage form is too generic to use.
  const foundHeads = alreadyFound
    .map((n) => n.toLowerCase().split(/[^a-z0-9]+/).find((w) => w.length >= 3))
    .filter((w): w is string => Boolean(w));

  const names: string[] = [];
  const seen = new Set(alreadyFound.map((n) => n.toLowerCase()));

  for (const line of text.split("\n")) {
    if (names.length >= MAX_PASSTHROUGH_LINES) break;

    const name = cleanMedicineLine(line);
    if (!looksLikeMedicineLine(name)) continue;

    const lower = name.toLowerCase();
    if (seen.has(lower)) continue;
    // Already accounted for — either a catalog synonym ("Acetaminophen" →
    // Paracetamol) or the line a resolved name came from.
    if (matchCatalog(name).length > 0) continue;
    if (foundHeads.some((head) => lower.includes(head))) continue;

    seen.add(lower);
    names.push(name);
  }

  return names;
}
