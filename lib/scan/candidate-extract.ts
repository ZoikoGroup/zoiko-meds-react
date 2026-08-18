import { normalize, toAscii } from "./text-normalize";

const FORM_WORDS = [
  "tab", "tabs", "tablet", "tablets", "cap", "caps", "capsule", "capsules",
  "syp", "syr", "syrup", "susp", "suspension", "sol", "soln", "solution",
  "inj", "injection", "amp", "ampoule", "vial", "drop", "drops", "gtt",
  "oint", "ointment", "cream", "gel", "lotion", "spray", "inhaler", "puff",
  "respule", "respules", "nebule", "neb", "sachet", "powder", "patch",
  "supp", "suppository", "pessary", "lozenge", "granules", "elixir",
  "emulsion", "foam", "shampoo", "paste",
].join("|");

export const FORM_RE = new RegExp(`\\b(?:${FORM_WORDS})\\b\\.?`, "i");
const FORM_PREFIX_RE = new RegExp(`^\\s*(?:${FORM_WORDS})\\b\\.?`, "i");

export const STRENGTH_RE =
  /(\b\d+(?:\.\d+)?\s*(?:mg|mcg|ug|g|gm|kg|ml|l|iu|u|%)\b)|(\(\s*\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?\s*\))|(\b\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?\s*(?:mg|mcg|ml|g)\b)/i;

export const FREQUENCY_RE =
  /(\b(?:od|bd|bid|tid|tds|qid|qds|qhs|hs|prn|sos|stat|nocte|mane|om|on|ac|pc)\b)|(\bq\s*\d+\s*h\b)|(\b\d\s*[-x]\s*\d\s*[-x]\s*\d\b)|(\b(?:once|twice|thrice)\s+(?:a\s+)?(?:day|daily)\b)/i;

export const DURATION_RE =
  /(\bx\s*\d+\s*(?:d|day|days|w|wk|week|weeks|m|month|months)?\b)|(\bfor\s+\d+\s*(?:d|day|days|w|week|weeks|month|months)\b)|(\b\d+\s*(?:day|days|week|weeks|month|months)\b)/i;

const ROUTE_RE = /\b(po|per\s?oral|oral|iv|im|sc|sl|pr|pv|topical|inhaled|nasal|ophthalmic|otic)\b/i;
const LIST_ITEM_RE = /^\s*(?:\(?\d{1,2}[).\]]|[-*•—–]|[ivx]{1,4}[).])\s+/i;

const FIELD_LABEL_WORDS_RE =
  /\b(name|patient|pt|age|sex|gender|dob|d\.?o\.?b|date|address|addr|ph|phone|mobile|tel|telephone|contact|email|e-mail|reg|regn|registration|lic|licence|license|uhid|mrn|ip|op|ward|bed|room|weight|wt|height|ht|bmi|bp|pulse|temp|spo2|resp|dept|department|doctor|dr|consultant|physician|surgeon|prescriber|pharmacist|ref|referred|referring|signature|sign|stamp|visit|admission|discharge|bill|invoice|receipt|gst|tin|vat|sig|directions?|instructions?|disp|dispense|dispensed|refills?|qty|quantity|mitte|dea|npi|substitution|label|prescription)\b/i;

function hasFieldLabel(text: string): boolean {
  const match = /^([^:—]{1,40})[:—]/.exec(text ?? "");
  if (!match) return false;
  const label = match[1];
  if (label.split(/\s+/).filter(Boolean).length > 4) return false;
  return FIELD_LABEL_WORDS_RE.test(label);
}

const CREDENTIAL_RE =
  /\b(mbbs|md|ms|mch|dm|dnb|bds|mds|bams|bhms|bums|phd|frcs|mrcp|mrcgp|frcp|facp|fics|dch|dgo|dpm|rmp|rph|pharm\.?\s?d|do)\b/i;

const ORG_RE =
  /\b(hospital|hospitals|clinic|clinics|medical\s+(?:centre|center|college|store)|nursing\s+home|health\s?care|healthcare|polyclinic|dispensary|laborator(?:y|ies)|diagnostics?|pharmacy|chemist|druggist|surgery|practice|institute|foundation|trust|nhs|ltd|limited|pvt|inc|llp)\b/i;

const ADDRESS_RE =
  /\b(avenue|street|road|lane|boulevard|blvd|highway|nagar|colony|sector|block|floor|suite|apartment|po\s?box|zip\s?code|postcode|pin\s?code)\b/i;

const DATE_RE =
  /(\b\d{1,2}\s*[/\-.]\s*\d{1,2}\s*[/\-.]\s*\d{2,4}\b)|(\b\d{4}-\d{2}-\d{2}\b)|(\b\d{1,2}\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+\d{2,4}\b)/i;

const LONG_DIGITS_RE = /\d[\d\s\-()]{7,}/;
const CLOCK_RE = /\b\d{1,2}\s*[:.]\s*\d{2}\s*(?:am|pm|hrs)?\b/i;

const CLINICAL_SECTION_RE =
  /^\s*(diagnosis|dx|complaints?|c\/o|chief\s+complaints?|history|h\/o|examination|o\/e|findings?|investigations?|labs?|vitals?|allergies|impression|plan|follow[\s-]?up|review|remarks?|notes?|instructions?)\b\s*[:.\-—]?/i;

const MEDICINE_SECTION_RE =
  /^\s*(rx|r\/|℞|advice|advise|treatment|medication[s]?|medicine[s]?|drugs?|prescription|to\s+take|take\s+home|discharge\s+medication)\b\s*[:.\-—]?\s*$/i;

const TIMING_RE =
  /\b(morning|afternoon|evening|night|bedtime|breakfast|lunch|dinner|before\s+food|after\s+food|with\s+food|empty\s+stomach|daily|alternate\s+days?)\b/gi;

export interface ScoredEvidence {
  form?: boolean;
  formPrefix?: boolean;
  strength?: boolean;
  frequency?: boolean;
  duration?: boolean;
  route?: boolean;
  listItem?: boolean;
  medicineSection?: boolean;
  fieldLabel?: boolean;
  credential?: boolean;
  org?: boolean;
  address?: boolean;
  date?: boolean;
  longDigits?: boolean;
  clock?: boolean;
  nameLike?: boolean;
}

export interface ParsedCandidate {
  raw: string;
  displayName: string;
  name: string;
  form: string;
  strength: string;
  frequency: string;
  duration: string;
  evidence: ScoredEvidence;
}

function scoreLine(text: string, { inMedicineSection = false } = {}) {
  let score = 0;
  const evidence: ScoredEvidence = {};

  if (FORM_PREFIX_RE.test(text)) { score += 3; evidence.formPrefix = true; }
  else if (FORM_RE.test(text)) { score += 2; evidence.form = true; }

  if (STRENGTH_RE.test(text)) { score += 3; evidence.strength = true; }
  if (FREQUENCY_RE.test(text)) { score += 2; evidence.frequency = true; }
  if (DURATION_RE.test(text)) { score += 1; evidence.duration = true; }
  if (ROUTE_RE.test(text)) { score += 1; evidence.route = true; }
  if (LIST_ITEM_RE.test(text)) { score += 1; evidence.listItem = true; }
  if (inMedicineSection) { score += 1; evidence.medicineSection = true; }

  if (hasFieldLabel(text)) { score -= 4; evidence.fieldLabel = true; }
  if (CREDENTIAL_RE.test(text)) { score -= 4; evidence.credential = true; }
  if (ORG_RE.test(text)) { score -= 4; evidence.org = true; }
  if (ADDRESS_RE.test(text)) { score -= 3; evidence.address = true; }
  if (DATE_RE.test(text)) { score -= 3; evidence.date = true; }
  if (LONG_DIGITS_RE.test(text)) { score -= 2; evidence.longDigits = true; }
  if (CLOCK_RE.test(text)) { score -= 2; evidence.clock = true; }

  return { score, evidence };
}

const FUNCTION_WORDS = new Set([
  "the", "and", "for", "with", "from", "that", "this", "have", "been", "were",
  "will", "your", "should", "would", "could", "about", "there", "their",
  "which", "after", "before", "under", "above", "between", "through",
]);

function isPlausibleMedicineName(text: string): boolean {
  const name = stripDosageNoise(text);
  if (name.length < 3 || name.length > 50) return false;
  if (/^(patient|doctor|hospital|clinic|address|signature|date|age|gender|diagnosis|report)$/i.test(name)) return false;

  const tokens = name.split(/\s+/).filter(Boolean);
  if (tokens.length === 0 || tokens.length > 4) return false;

  const functionWordCount = tokens.filter((token) => FUNCTION_WORDS.has(token.toLowerCase())).length;
  if (functionWordCount > 1) return false;

  const letters = name.replace(/[^a-zA-Z]/g, "").length;
  const digits = name.replace(/[^0-9]/g, "").length;
  if (letters < 3 || letters / (letters + digits) < 0.6) return false;

  const substantial = tokens.filter((token) => token.replace(/[^a-zA-Z]/g, "").length >= 4);
  if (substantial.length === 0) return false;
  return substantial.every((token) => /[aeiouy]/i.test(token));
}

const ACCEPT_THRESHOLD = 2;
const WEAK_ACCEPT_FLOOR = 0;

export function extractCandidateLines(rawText: string): Array<{ text: string; score: number; evidence: ScoredEvidence; weak: boolean }> {
  const lines = (rawText ?? "").split(/[\r\n]+/);
  const candidates: Array<{ text: string; score: number; evidence: ScoredEvidence; weak: boolean }> = [];
  let inMedicineSection = false;
  let inClinicalSection = false;

  for (const original of lines) {
    const line = toAscii(original).trim();
    if (!line) continue;

    if (MEDICINE_SECTION_RE.test(line)) {
      inMedicineSection = true;
      inClinicalSection = false;
      continue;
    }
    if (CLINICAL_SECTION_RE.test(line)) {
      inMedicineSection = false;
      inClinicalSection = true;
    }

    let text = line;
    const inlineRx = text.match(/^\s*(rx|r\/|℞|advice|advise|treatment|medications?)\s*[:.\-—]\s*(?=\S)/i);
    if (inlineRx) {
      inMedicineSection = true;
      inClinicalSection = false;
      text = text.slice(inlineRx[0].length).trim();
      if (!text) continue;
    }

    const segments = splitListItems(text);

    for (const segment of segments) {
      if (!segment.trim()) continue;
      const { score, evidence } = scoreLine(segment, { inMedicineSection });
      const withName = { ...evidence, nameLike: isPlausibleMedicineName(segment) };

      const strong = score >= ACCEPT_THRESHOLD;
      const weak = score >= WEAK_ACCEPT_FLOOR && withName.nameLike && !inClinicalSection;

      if (strong || weak) {
        candidates.push({ text: segment.trim(), score, evidence: withName, weak: !strong });
      }
    }
  }

  return mergeContinuations(candidates);
}

function splitListItems(text: string): string[] {
  const marker = /(?:^|\s)(?=(?:\(?\d{1,2}[).\]]|[-*•—–])\s+\S)/g;
  const parts = text.split(marker).filter(Boolean);
  return parts.length > 1 ? parts : [text];
}

function mergeContinuations(candidates: Array<{ text: string; score: number; evidence: ScoredEvidence; weak: boolean }>) {
  const merged: Array<{ text: string; score: number; evidence: ScoredEvidence; weak: boolean }> = [];
  for (const candidate of candidates) {
    const namePart = stripDosageNoise(candidate.text);
    const hasOwnName = /[a-z]{4,}/i.test(namePart);
    if (!hasOwnName && merged.length > 0) {
      const previous = merged[merged.length - 1];
      previous.text = `${previous.text} ${candidate.text}`.trim();
      previous.evidence = { ...previous.evidence, ...candidate.evidence };
      previous.score = Math.max(previous.score, candidate.score);
      continue;
    }
    merged.push({ ...candidate });
  }
  return merged;
}

export function stripDosageNoise(text: string, { keepFrequency = false } = {}): string {
  let out = text
    .replace(LIST_ITEM_RE, " ")
    .replace(new RegExp(FORM_RE.source, "gi"), " ")
    .replace(new RegExp(STRENGTH_RE.source, "gi"), " ");
  if (!keepFrequency) out = out.replace(new RegExp(FREQUENCY_RE.source, "gi"), " ");
  return out
    .replace(new RegExp(DURATION_RE.source, "gi"), " ")
    .replace(new RegExp(ROUTE_RE.source, "gi"), " ")
    .replace(TIMING_RE, " ")
    .replace(/\([^)]*\)/g, " ")
    .replace(/\b\d+(?:\.\d+)?\b/g, " ")
    .replace(/[^a-zA-Z0-9\s+-]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/(^[\s+-]+)|([\s+-]+$)/g, "")
    .trim();
}

export function parseCandidate(candidate: { text: string; evidence?: ScoredEvidence } | string): ParsedCandidate | null {
  const text = typeof candidate === "string" ? candidate : candidate.text;
  const evidence = typeof candidate === "string" ? {} : (candidate.evidence ?? {});

  const formMatch = text.match(FORM_RE);
  const strengthMatch = text.match(STRENGTH_RE);
  const frequencyMatch = text.match(FREQUENCY_RE);
  const durationMatch = text.match(DURATION_RE);

  const name = stripDosageNoise(text);
  if (!/[a-z]{3,}/i.test(name)) return null;

  const frequencyIsOnlySignal = Boolean(frequencyMatch) && !strengthMatch && !durationMatch && !formMatch;
  const displayName = frequencyIsOnlySignal
    ? stripDosageNoise(text, { keepFrequency: true }).replace(/^[\s+-]+|[\s+-]+$/g, "")
    : name.replace(/^[\s+-]+|[\s+-]+$/g, "");

  return {
    raw: text,
    displayName,
    name: name.replace(/^[\s+-]+|[\s+-]+$/g, ""),
    form: formMatch ? normalize(formMatch[0]).replace(/\.$/, "") : "",
    strength: strengthMatch ? strengthMatch[0].trim() : "",
    frequency: frequencyMatch ? frequencyMatch[0].trim() : "",
    duration: durationMatch ? durationMatch[0].trim() : "",
    evidence,
  };
}

export function titleCase(value: string): string {
  return (value ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => (word.length <= 2 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1).toLowerCase()))
    .join(" ");
}
