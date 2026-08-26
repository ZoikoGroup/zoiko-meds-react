/**
 * Pharmacy lookup behind "Claim or verify your pharmacy".
 *
 * Two real sources, no fixtures and no fabricated records:
 *   1. the ZoikoMeds verified pharmacy directory (`GET {API_BASE_URL}/pharmacies`)
 *   2. Google Places, for pharmacies that exist but are not on the platform yet
 *      — the "new or unclaimed" case — only when GOOGLE_PLACES_API_KEY is set.
 *
 * A candidate from either source is returned only when the submitted name
 * actually matches that record's name and the record sits in the submitted
 * location, so arbitrary input ("tester" near "1234") yields no match rather
 * than a success message.
 *
 * Server-only: reads GOOGLE_PLACES_API_KEY.
 */
import type { PharmacyListItem } from "./api";
import { API_BASE_URL } from "./config";
import { geocodeAddress, type Coords } from "./geocoding";

const LOOKUP_TIMEOUT_MS = 4000;
const MAX_MATCHES = 6;
const PLACES_RADIUS_M = 25000;

/** Coverage of the submitted name's distinctive words a record must reach. */
const NAME_MATCH_THRESHOLD = 0.6;

/**
 * Words that identify a business as a pharmacy but say nothing about *which*
 * pharmacy. A query made only of these is too vague to match on.
 */
const GENERIC_NAME_TOKENS = new Set([
  "pharmacy",
  "pharmacies",
  "pharma",
  "chemist",
  "chemists",
  "drugstore",
  "drug",
  "drugs",
  "store",
  "shop",
  "the",
  "and",
  "for",
  "ltd",
  "limited",
  "llc",
  "inc",
  "plc",
  "corp",
  "company",
]);

export interface PharmacyMatch {
  /** Directory id, or `places:<placeId>` for an off-platform record. */
  id: string;
  name: string;
  address: string;
  city: string | null;
  region: string | null;
  source: "verified-directory" | "google-places";
  /** True only for records already in the ZoikoMeds verified directory. */
  verified: boolean;
  distanceKm?: number;
}

export type PharmacySearchOutcome =
  /** The submitted name has no word specific enough to match on. */
  | { status: "name-too-vague" }
  /** The location is not a place name or a postal-code shape. */
  | { status: "invalid-location" }
  /** Every source was unreachable — we cannot claim "no match" honestly. */
  | { status: "sources-unavailable" }
  /** Sources answered and nothing matched. */
  | { status: "no-match"; locationLabel: string }
  | { status: "matched"; matches: PharmacyMatch[]; locationLabel: string };

/* ───────────────────────────── Text matching ───────────────────────────── */

/** Trimmed string from an untrusted payload field; "" for anything unusable. */
function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(value: string | null | undefined): string[] {
  const normalized = normalize(value ?? "");
  return normalized ? normalized.split(" ") : [];
}

/** The words in a pharmacy name that actually identify it. */
export function distinctiveTokens(name: string): string[] {
  return tokens(name).filter((t) => t.length >= 3 && !GENERIC_NAME_TOKENS.has(t));
}

/**
 * Prefix matching for tokens of four characters or more, so "riverside" matches
 * "riversides" and "boot" matches "boots". Shorter tokens must be exact:
 * prefix-matching them is too loose ("med" would hit "medical", "cvs" would
 * not hit "cvspharmacy" — the trade-off is deliberate, exactness wins).
 */
function tokenMatches(a: string, b: string): boolean {
  if (a === b) return true;
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  if (shorter.length < 4) return false;
  return longer.startsWith(shorter);
}

/** Fraction of the query's distinctive words present in `candidateName`. */
function nameCoverage(queryTokens: string[], candidateName: string): number {
  const candidateTokens = tokens(candidateName);
  if (queryTokens.length === 0 || candidateTokens.length === 0) return 0;
  const matched = queryTokens.filter((q) => candidateTokens.some((c) => tokenMatches(q, c)));
  return matched.length / queryTokens.length;
}

/**
 * Words describing the submitted location: what the user typed plus whatever
 * the geocoder resolved it to, so a postcode ("SW1A 1AA" → "London, UK") can
 * still be compared against a directory record that only stores a city.
 */
function locationVocabulary(location: string, geo: Coords | null): Set<string> {
  const vocabulary = new Set<string>();
  for (const t of tokens(location)) if (t.length >= 3) vocabulary.add(t);
  for (const t of tokens(geo?.display)) if (t.length >= 3) vocabulary.add(t);
  return vocabulary;
}

/**
 * Restricted Damerau-Levenshtein distance, abandoned once it exceeds `max`.
 * Only ever called on single words, so the quadratic table is tiny.
 */
function editDistanceWithin(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;

  let prev2: number[] = [];
  let prev: number[] = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    const row = new Array<number>(b.length + 1);
    row[0] = i;
    let best = row[0];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let value = Math.min(row[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      // Adjacent transposition ("ghaziabad" vs "ghaizabad") counts as one edit.
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        value = Math.min(value, prev2[j - 2] + 1);
      }
      row[j] = value;
      if (value < best) best = value;
    }

    if (best > max) return false;
    prev2 = prev;
    prev = row;
  }

  return prev[b.length] <= max;
}

/**
 * Place names get misspelled constantly ("Ghaizabad" for "Ghaziabad"), and the
 * geocoder only corrects them when it is configured and reachable. One edit is
 * forgiven on words long enough for it to be unambiguous; the name gate remains
 * the real protection against a false match.
 */
function locationTokenKnown(placeToken: string, vocabulary: Set<string>): boolean {
  if (vocabulary.has(placeToken)) return true;
  if (placeToken.length < 5) return false;
  for (const candidate of vocabulary) {
    if (candidate.length >= 5 && editDistanceWithin(placeToken, candidate, 1)) return true;
  }
  return false;
}

function inSubmittedLocation(
  record: { city: string | null; region: string | null },
  vocabulary: Set<string>,
): boolean {
  const placeTokens = tokens([record.city, record.region].filter(Boolean).join(" ")).filter(
    (t) => t.length >= 3,
  );
  if (placeTokens.length === 0) return false;
  return placeTokens.some((t) => locationTokenKnown(t, vocabulary));
}

/**
 * A location is worth geocoding when it is a place name, an alphanumeric
 * postcode, or a numeric postal code. A bare "1" or "12" is neither.
 */
export function isPlausibleLocation(location: string): boolean {
  const normalized = normalize(location);
  if (normalized.length < 2) return false;
  if (/[a-z]/.test(normalized)) return true;
  return /^\d{4,10}$/.test(normalized.replace(/\s/g, ""));
}

/* ────────────────────────────── Data sources ────────────────────────────── */

function readList(payload: unknown): unknown[] | null {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    for (const key of ["pharmacies", "data", "results", "items"]) {
      const value = (payload as Record<string, unknown>)[key];
      if (Array.isArray(value)) return value;
    }
  }
  return null;
}

/** The verified directory, or null when it could not be read. */
async function fetchVerifiedDirectory(): Promise<PharmacyListItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/pharmacies`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.warn(`[pharmacy-claim] verified directory returned HTTP ${res.status}`);
      return null;
    }
    const list = readList(await res.json());
    if (!list) {
      console.warn("[pharmacy-claim] verified directory payload had no recognisable list");
      return null;
    }
    return list as PharmacyListItem[];
  } catch (err) {
    console.warn(
      `[pharmacy-claim] verified directory lookup failed: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return null;
  }
}

interface PlaceCandidate {
  placeId: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Real pharmacies matching the name in the submitted area, for pharmacies not
 * on the platform yet. Returns null when Places is unconfigured or unreachable
 * — the caller must not read that as "nothing exists".
 *
 * The location always goes into the query text, and biases the search by
 * coordinates too when the geocoder resolved them.
 */
async function fetchPlacesCandidates(
  name: string,
  location: string,
  geo: Coords | null,
): Promise<PlaceCandidate[] | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const bias = geo ? `&location=${geo.lat},${geo.lng}&radius=${PLACES_RADIUS_M}` : "";
    const query = [name, "pharmacy", location].filter(Boolean).join(" ").trim();
    const url =
      `https://maps.googleapis.com/maps/api/place/textsearch/json` +
      `?query=${encodeURIComponent(query)}` +
      `${bias}&type=pharmacy&key=${apiKey}`;

    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS) });
    if (!res.ok) {
      console.warn(`[pharmacy-claim] Places text search returned HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data.status === "ZERO_RESULTS") return [];
    if (data.status !== "OK") {
      console.warn(
        `[pharmacy-claim] Places text search status ${data.status}: ${data.error_message ?? ""}`,
      );
      return null;
    }

    return (data.results ?? []).map((r: Record<string, unknown>) => {
      const geometry = r.geometry as { location?: { lat?: number; lng?: number } } | undefined;
      return {
        placeId: String(r.place_id ?? ""),
        name: String(r.name ?? ""),
        address: String(r.formatted_address ?? r.vicinity ?? ""),
        lat: geometry?.location?.lat,
        lng: geometry?.location?.lng,
      };
    });
  } catch (err) {
    console.warn(
      `[pharmacy-claim] Places text search failed: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return null;
  }
}

/* ─────────────────────────────── The lookup ─────────────────────────────── */

/**
 * Find the real pharmacy records matching a submitted name, optionally narrowed
 * to a location.
 *
 * Never invents a match: an outcome of `matched` means a source returned a
 * record whose own name matched the query.
 *
 * `location` is omitted by the single-field search on the pharmacy page. Without
 * it there is nothing to geocode and no place to gate records on, so the query
 * matches on name alone across every source.
 */
export async function searchPharmaciesForClaim(input: {
  name: string;
  location?: string;
}): Promise<PharmacySearchOutcome> {
  const name = input.name.trim();
  const location = (input.location ?? "").trim();
  const hasLocation = location.length > 0;

  const queryTokens = distinctiveTokens(name);
  if (queryTokens.length === 0) return { status: "name-too-vague" };
  if (hasLocation && !isPlausibleLocation(location)) return { status: "invalid-location" };

  /*
   * Best-effort: geocoding widens the location vocabulary (a postcode becomes
   * "London, UK") and biases the Places search. A geocoder that rate-limits or
   * times out must not be reported to the visitor as a bad location, so a null
   * here just means we match on the text they typed.
   */
  const geo = hasLocation ? await geocodeAddress(location) : null;
  const locationLabel = geo?.display?.trim() || location;
  const vocabulary = locationVocabulary(location, geo);

  const [directory, places] = await Promise.all([
    fetchVerifiedDirectory(),
    fetchPlacesCandidates(name, location, geo),
  ]);

  // Both null means we searched nothing at all — "no match" would be a lie.
  // (Places returns null when it is simply unconfigured, which is not a fault.)
  if (directory === null && places === null) {
    return { status: "sources-unavailable" };
  }

  const matches: PharmacyMatch[] = [];

  for (const item of directory ?? []) {
    // Coerced, not trusted: this payload is third-party. A record without a
    // usable id could not be claimed anyway, and `String(undefined)` would
    // hand the claim route the literal "undefined" as an id.
    const id = text(item.id);
    const name = text(item.name);
    if (!id || !name) continue;

    const record = { city: text(item.city) || null, region: text(item.region) || null };
    if (nameCoverage(queryTokens, name) < NAME_MATCH_THRESHOLD) continue;
    // No location submitted means nothing to narrow by — name alone decides.
    if (hasLocation && !inSubmittedLocation(record, vocabulary)) continue;

    matches.push({
      id,
      name,
      address: [record.city, record.region].filter(Boolean).join(", "),
      city: record.city,
      region: record.region,
      source: "verified-directory",
      verified: true,
    });
  }

  for (const candidate of places ?? []) {
    if (!candidate.placeId || !candidate.name) continue;
    if (nameCoverage(queryTokens, candidate.name) < NAME_MATCH_THRESHOLD) continue;

    // Only meaningful when the geocoder gave us a point to measure from.
    const distanceKm =
      geo && candidate.lat != null && candidate.lng != null
        ? Math.round(haversineKm(geo.lat, geo.lng, candidate.lat, candidate.lng) * 10) / 10
        : undefined;

    matches.push({
      id: `places:${candidate.placeId}`,
      name: candidate.name,
      address: candidate.address,
      city: null,
      region: null,
      source: "google-places",
      verified: false,
      distanceKm,
    });
  }

  // One record can appear in both sources; keep the verified copy.
  const deduped = new Map<string, PharmacyMatch>();
  for (const match of matches) {
    const key = `${normalize(match.name)}|${normalize(match.address)}`;
    const existing = deduped.get(key);
    if (!existing || (!existing.verified && match.verified)) deduped.set(key, match);
  }

  const ranked = Array.from(deduped.values())
    .sort((a, b) => {
      if (a.verified !== b.verified) return a.verified ? -1 : 1;
      return (a.distanceKm ?? Number.MAX_SAFE_INTEGER) - (b.distanceKm ?? Number.MAX_SAFE_INTEGER);
    })
    .slice(0, MAX_MATCHES);

  if (ranked.length === 0) return { status: "no-match", locationLabel };
  return { status: "matched", matches: ranked, locationLabel };
}
