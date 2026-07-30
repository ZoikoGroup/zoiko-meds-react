/**
 * Geocoding providers, ordered best-first.
 *
 * Google is primary when GOOGLE_PLACES_API_KEY is set (server-only — never
 * expose it to the client). The keyless providers stay as fallbacks: Nominatim
 * is detailed but frequently rate-limits cloud/serverless IPs, and BigDataCloud
 * is reliable from those IPs but coarser.
 */

const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";

/** No provider gets to stall the request; we always have a fallback. */
const TIMEOUT_MS = 3500;

const UA = { "User-Agent": "ZoikoMeds/1.0 (contact@zoikogroup.com)" };

export type Coords = { lat: number; lng: number; display?: string };

/* Provider response shapes — only the fields we read, all optional since
 * third-party payloads are untrusted. */

type GoogleComponent = { long_name?: string; types?: string[] };

type GoogleGeocodeResponse = {
  status?: string;
  error_message?: string;
  results?: {
    formatted_address?: string;
    geometry?: { location?: { lat?: number; lng?: number } };
    address_components?: GoogleComponent[];
  }[];
};

type NominatimSearchResponse = { lat?: string; lon?: string; display_name?: string }[];

type NominatimReverseResponse = {
  address?: Record<string, string | undefined>;
  display_name?: string;
};

type BigDataCloudResponse = {
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  countryName?: string;
};

async function getJson<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
  const resp = await fetch(url, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  return resp.ok ? ((await resp.json()) as T) : null;
}

/**
 * Google answers 200 with a status string, so a misconfigured key looks like an
 * empty result. Surface those instead of silently degrading to a fallback.
 */
function googleOk(data: GoogleGeocodeResponse, context: string): boolean {
  const status = data.status;
  if (status === "OK") return true;
  if (status && status !== "ZERO_RESULTS") {
    console.warn(`[geocoding] Google ${context} returned ${status}: ${data.error_message ?? ""}`);
  }
  return false;
}

/**
 * Pick "city, region" out of Google address_components.
 *
 * Types are listed coarsest-useful-first on purpose: Google orders its results
 * most-specific-first, so preferring whatever matches earliest yields unstable
 * labels for the same point (a retail district one call, the city the next).
 * City level is both what the search UI wants and stable across calls.
 */
function nameFromComponents(components: GoogleComponent[]): string {
  const find = (...types: string[]) => {
    for (const t of types) {
      const hit = components.find((c) => c.types?.includes(t))?.long_name;
      if (hit) return hit;
    }
    return "";
  };

  const locality = find(
    "postal_town",
    "locality",
    "administrative_area_level_2",
    "sublocality",
    "neighborhood"
  );
  const region = find("administrative_area_level_1", "country");
  if (locality && region) return `${locality}, ${region}`;
  return locality || region || "";
}

/* ─── Address → coordinates ─── */

async function forwardViaGoogle(address: string): Promise<Coords | null> {
  if (!GOOGLE_KEY) return null;
  const url = `${GOOGLE_GEOCODE_URL}?address=${encodeURIComponent(address)}&key=${GOOGLE_KEY}`;
  const data = await getJson<GoogleGeocodeResponse>(url);
  if (!data || !googleOk(data, "geocode")) return null;

  const top = data.results?.[0];
  const loc = top?.geometry?.location;
  if (loc?.lat == null || loc?.lng == null) return null;
  return { lat: loc.lat, lng: loc.lng, display: top?.formatted_address };
}

async function forwardViaNominatim(address: string): Promise<Coords | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
  const data = await getJson<NominatimSearchResponse>(url, UA);
  const top = data?.[0];
  if (!top?.lat || !top?.lon) return null;
  return { lat: parseFloat(top.lat), lng: parseFloat(top.lon), display: top.display_name };
}

/** Resolve a free-form address to coordinates, or null if no provider can. */
export async function geocodeAddress(address: string): Promise<Coords | null> {
  for (const provider of [forwardViaGoogle, forwardViaNominatim]) {
    try {
      const hit = await provider(address);
      if (hit) return hit;
    } catch {
      // try the next provider
    }
  }
  return null;
}

/* ─── Coordinates → place name ─── */

async function reverseViaGoogle(lat: number, lng: number): Promise<string> {
  if (!GOOGLE_KEY) return "";
  const url = `${GOOGLE_GEOCODE_URL}?latlng=${lat},${lng}&key=${GOOGLE_KEY}`;
  const data = await getJson<GoogleGeocodeResponse>(url);
  if (!data || !googleOk(data, "reverse-geocode")) return "";

  // Pool every result's components so the type priority applies across the
  // whole response, not within one (possibly hyper-specific) result.
  const components = (data.results ?? []).flatMap((r) => r.address_components ?? []);
  return nameFromComponents(components);
}

async function reverseViaNominatim(lat: number, lng: number): Promise<string> {
  const data = await getJson<NominatimReverseResponse>(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    UA
  );

  let name = "";
  if (data?.address) {
    const a = data.address;
    name = a.neighbourhood ?? a.suburb ?? a.city_district ?? a.town ?? a.city ?? a.county ?? "";
    if (name && (a.state || a.country)) name += ", " + (a.state ?? a.country);
  }
  if (!name && data?.display_name) {
    const parts = data.display_name.split(",");
    name = parts[0].trim() + (parts[1] ? ", " + parts[1].trim() : "");
  }
  return name;
}

/** BigDataCloud client-reverse-geocode — free, no key, reliable from cloud IPs. */
async function reverseViaBigDataCloud(lat: number, lng: number): Promise<string> {
  const data = await getJson<BigDataCloudResponse>(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  );
  const locality = data?.locality || data?.city || "";
  const region = data?.principalSubdivision || data?.countryName || "";
  return locality && region ? `${locality}, ${region}` : locality || region || "";
}

/** Human-readable name for coordinates; falls back to formatted lat/lng. */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  for (const provider of [reverseViaGoogle, reverseViaNominatim, reverseViaBigDataCloud]) {
    try {
      const name = await provider(lat, lng);
      if (name) return name;
    } catch {
      // try the next provider
    }
  }
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}
