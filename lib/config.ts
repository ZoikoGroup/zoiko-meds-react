/**
 * Central runtime configuration.
 *
 * Both values are public (NEXT_PUBLIC_*) because they are referenced from
 * client components. Defaults mirror the deployed environments so the app
 * works even if the env vars are missing.
 */

/** ZoikoMeds backend platform API base — e.g. `${API_BASE_URL}/search`. */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://zoiko-meds-platform.onrender.com/api"
).replace(/\/+$/, "");

/**
 * Prefix for this app's own route handlers (`app/internal/**`).
 *
 * Deliberately NOT `/api`: in production the reverse proxy in front of
 * zoikomeds.com forwards `/api/*` to the ZoikoMeds backend, so anything served
 * from `app/api/**` returned the backend's 404 and never reached Next. Keep new
 * route handlers under this prefix, and always build client URLs from it.
 */
export const INTERNAL_API = "/internal";

/** Path to one of this app's route handlers, e.g. internalApi("medicine/geocode"). */
export function internalApi(path: string): string {
  return `${INTERNAL_API}/${path.replace(/^\/+/, "")}`;
}

/**
 * Same-origin proxy path (see `app/internal/zoiko/[...path]/route.ts`).
 * The backend's CORS only allowlists the production origin, so browser calls
 * go through this proxy; server-side code hits {@link API_BASE_URL} directly.
 */
export const API_PROXY_PATH = internalApi("zoiko");

/** Base the API client should use given where it runs. */
export function clientApiBase(): string {
  return typeof window === "undefined" ? API_BASE_URL : API_PROXY_PATH;
}

/** The authenticated frontend app (login, dashboards, portals). */
export const APP_BASE_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://zoiko-meds-platform.vercel.app"
).replace(/\/+$/, "");

/** Build a URL into the authenticated app, e.g. appUrl("/login"). */
export function appUrl(path = "/"): string {
  return `${APP_BASE_URL}/${path.replace(/^\/+/, "")}`;
}
