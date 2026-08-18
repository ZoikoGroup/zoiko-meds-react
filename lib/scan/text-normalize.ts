/**
 * Text normalization and fuzzy-matching primitives for prescription OCR & text processing.
 */

export function toAscii(value: string): string {
  return Array.from((value ?? "").normalize("NFKD"))
    .filter((ch) => ch.charCodeAt(0) <= 0x7f)
    .join("");
}

export function normalize(value: string): string {
  return toAscii(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const MULTI_CHAR_CONFUSIONS: [RegExp, string][] = [
  [/rn/g, "m"],
  [/vv/g, "w"],
  [/\|\|/g, "u"],
];

const SINGLE_CHAR_CONFUSIONS: Record<string, string> = {
  "1": "l", i: "l", "|": "l", "!": "l",
  "0": "o", q: "o",
  "5": "s", $: "s",
  "8": "b",
  "2": "z",
  "6": "g",
  "9": "g",
  "7": "t",
};

export function foldConfusions(value: string): string {
  let out = normalize(value).replace(/[\s-]/g, "");
  for (const [pattern, replacement] of MULTI_CHAR_CONFUSIONS) {
    out = out.replace(pattern, replacement);
  }
  return Array.from(out)
    .map((ch) => SINGLE_CHAR_CONFUSIONS[ch] ?? ch)
    .join("");
}

export function levenshtein(a: string, b: string): number {
  const s1 = a ?? "";
  const s2 = b ?? "";
  if (s1 === s2) return 0;
  if (!s1.length) return s2.length;
  if (!s2.length) return s1.length;

  let previous = Array.from({ length: s2.length + 1 }, (_, i) => i);
  let current = new Array(s2.length + 1);

  for (let i = 1; i <= s1.length; i++) {
    current[0] = i;
    for (let j = 1; j <= s2.length; j++) {
      const substitution = previous[j - 1] + (s1[i - 1] === s2[j - 1] ? 0 : 1);
      current[j] = Math.min(substitution, current[j - 1] + 1, previous[j] + 1);
    }
    const swap = previous;
    previous = current;
    current = swap;
  }
  return previous[s2.length];
}

function ratio(a: string, b: string): number {
  if (!a && !b) return 1;
  if (!a || !b) return 0;
  if (a === b) return 1;
  const maxLen = Math.max(a.length, b.length);
  return (maxLen - levenshtein(a, b)) / maxLen;
}

export function similarity(candidate: string, reference: string): number {
  const plain = ratio(normalize(candidate), normalize(reference));
  if (plain === 1) return 1;
  const folded = ratio(foldConfusions(candidate), foldConfusions(reference));
  return Math.max(plain, folded * 0.98);
}

export function bestSimilarity(candidate: string, references: string[]): { score: number; reference: string | null } {
  let best: { score: number; reference: string | null } = { score: 0, reference: null };
  for (const reference of references) {
    if (!reference) continue;
    const score = similarity(candidate, reference);
    if (score > best.score) best = { score, reference };
  }
  return best;
}

/** Whole words of `text`, for token-run comparison. */
function tokensOf(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

/** Does `outer` contain `inner`'s tokens consecutively, on word boundaries? */
function hasTokenRun(outer: string[], inner: string[]): boolean {
  if (inner.length === 0 || inner.length > outer.length) return false;
  for (let start = 0; start + inner.length <= outer.length; start++) {
    if (inner.every((token, offset) => outer[start + offset] === token)) return true;
  }
  return false;
}

/**
 * True when one name contains the other as a whole-token run — "Amoxicillin"
 * inside "Amoxicillin Clavulanate".
 *
 * Matching is by whole words, never by raw substring: "Dolo" sits inside
 * "Dolonex" as characters but they are different medicines, and a substring
 * test silently renames one into the other.
 */
export function containsName(haystack: string, needle: string): boolean {
  const h = normalize(haystack);
  const n = normalize(needle);
  if (!h || !n || n.length < 4) return false;
  if (h === n) return true;

  const outer = tokensOf(h);
  const inner = tokensOf(n);
  return hasTokenRun(outer, inner) || hasTokenRun(inner, outer);
}
