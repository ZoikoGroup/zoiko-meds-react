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
 * Same-origin proxy path (see `app/api/zoiko/[...path]/route.ts`).
 * The backend's CORS only allowlists the production origin, so browser calls
 * go through this proxy; server-side code hits {@link API_BASE_URL} directly.
 */
export const API_PROXY_PATH = "/api/zoiko";

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
