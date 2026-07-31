/**
 * ZoikoMeds backend API client.
 *
 * Thin, typed wrapper over the platform API described in
 * `ZoikoMeds.postman_collection.json`. Calls the backend directly
 * (`API_BASE_URL`); the backend reflects the request origin for CORS so this
 * works from both the browser and the server.
 *
 * Auth: pass a bearer token via `opts.token` for protected endpoints. Public
 * discovery endpoints (search / pharmacies / availability / medibase) need none.
 */
import { clientApiBase } from "./config";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiOptions extends Omit<RequestInit, "body"> {
  /** JSON body — serialized automatically. */
  body?: unknown;
  /** Bearer token for protected endpoints. */
  token?: string;
  /** Query params appended to the path. */
  query?: Record<string, string | number | boolean | null | undefined>;
}

function buildUrl(path: string, query?: ApiOptions["query"]): string {
  const base = clientApiBase();
  const href = `${base}/${path.replace(/^\/+/, "")}`;
  // In the browser the base is a relative proxy path, so resolve against the origin.
  const url = base.startsWith("http")
    ? new URL(href)
    : new URL(href, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

/** Core fetch helper. Throws {@link ApiError} on non-2xx responses. */
export async function apiFetch<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { body, token, query, headers, ...rest } = opts;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string> | undefined),
  };
  if (body !== undefined) finalHeaders["Content-Type"] = "application/json";
  if (token) finalHeaders["Authorization"] = `Bearer ${token}`;

  const res = await fetch(buildUrl(path, query), {
    ...rest,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  const data = text ? safeJson(text) : null;

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    if (data && typeof data === "object" && "message" in data) {
      message = String((data as Record<string, unknown>).message);
    }
    throw new ApiError(res.status, message, data);
  }
  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/* ─────────────────────────── Domain types ─────────────────────────── */

export type Confidence = "HIGH" | "MODERATE" | "LOW" | string;

export interface Medicine {
  id: string;
  canonicalName: string;
  genericName: string | null;
  brandNames: string[];
  manufacturer: string | null;
  description: string | null;
  activeIngredient: string | null;
  strength: string | null;
  dosageForm: string | null;
  route: string | null;
  prescriptionCategory: string | null;
  qualityState: string | null;
  isControlled: boolean;
  score?: number;
}

export interface AvailabilityEntry {
  pharmacy: {
    id: string;
    name: string;
    city: string | null;
    region: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  confidence: Confidence;
  freshnessMinutes: number;
  requiresConfirmation: boolean;
  computedAt: string;
}

export interface NearbyPharmacy {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm: number;
  rating?: number;
  userRatingCount?: number;
  openNow?: boolean;
  phone?: string;
  googleMapsUri?: string;
  placeId?: string;
}

export interface SearchResult {
  medicine: Medicine;
  availability: AvailabilityEntry[];
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  zeroResult: boolean;
  nearbyPharmacies: {
    source: string;
    configured: boolean;
    origin?: { lat: number; lng: number; resolvedFrom: string };
    radiusKm?: number;
    pharmacies: NearbyPharmacy[];
  } | null;
}

export interface PharmacyListItem {
  id: string;
  name: string;
  city: string | null;
  region: string | null;
  reliabilityScore: number;
}

/* ───────────────────── Public discovery endpoints ───────────────────── */

/** GET /search — public medicine + availability discovery. */
export function searchMedicines(params: {
  q: string;
  lat?: number;
  lng?: number;
  maxDistance?: number;
}): Promise<SearchResponse> {
  return apiFetch<SearchResponse>("search", { query: { ...params } });
}

/** GET /medibase/match — fuzzy medicine-name matching (autocomplete). */
export function matchMedibase(q: string, limit = 8): Promise<Medicine[]> {
  return apiFetch<Medicine[]>("medibase/match", { query: { q, limit } });
}

/** GET /availability?medicineId= — availability signals for one medicine. */
export function getAvailability(medicineId: string): Promise<AvailabilityEntry[]> {
  return apiFetch<AvailabilityEntry[]>("availability", { query: { medicineId } });
}

/** GET /pharmacies — public verified pharmacy directory. */
export function listPharmacies(): Promise<PharmacyListItem[]> {
  return apiFetch<PharmacyListItem[]>("pharmacies");
}

/* ───────────────────── Password recovery endpoints ─────────────────────
 * Unauthenticated by design: the emailed token is the only credential, so
 * these two work here without any session handling. Everything else behind a
 * login lives in the authenticated app (see APP_BASE_URL in lib/config).
 */

/** POST /auth/forgot-password — email a reset link. Always 200, even for an unknown address. */
export function requestPasswordReset(email: string): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("auth/forgot-password", {
    method: "POST",
    body: { email },
  });
}

/** POST /auth/reset-password — set a new password using an emailed reset/invite token. */
export function resetPassword(
  token: string,
  newPassword: string,
): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("auth/reset-password", {
    method: "POST",
    body: { token, newPassword },
  });
}
