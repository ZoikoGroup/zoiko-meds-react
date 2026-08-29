/**
 * "Is this person already a ZoikoMeds user on this pharmacy?"
 *
 * Answered from authoritative platform data — the same source the Super Admin
 * Users page reads (`GET {API_BASE_URL}/admin/users`, which lists each user's
 * email, role, status and linked pharmacy). Never from the pharmacy's display
 * name, and never from anything the browser supplied.
 *
 * Identifiers: the website's directory IS the platform API (see API_BASE_URL in
 * lib/config), so a pharmacy id taken from `GET /pharmacies` is the same cuid
 * the platform stores against a user. There is no mapping layer because there
 * is no separate identifier space.
 *
 * Two resolvers, tried in order:
 *   1. PHARMACY_MEMBERSHIP_LOOKUP_URL — a dedicated check endpoint, if one is
 *      stood up. Narrowest: it answers one yes/no question and needs no admin
 *      scope.
 *   2. The platform admin API, using a service credential. Used when no
 *      dedicated endpoint exists.
 *
 * With neither configured the answer is "unknown" — never a guess. The claim
 * route turns "unknown" on a registered pharmacy into a refusal, so a missing
 * or broken lookup can never become a way past the membership requirement.
 *
 * Server-only. Reads PHARMACY_MEMBERSHIP_LOOKUP_URL / _KEY and
 * PLATFORM_SERVICE_TOKEN or PLATFORM_SERVICE_EMAIL / _PASSWORD. Nothing here
 * logs a token, a password, or an email address.
 */
import { API_BASE_URL } from "./config";

const LOOKUP_TIMEOUT_MS = 4000;

/*
 * The platform sits behind Cloudflare, which answers some default client
 * signatures with "Error 1010: Access denied" instead of reaching the API — a
 * generic runtime UA gets blocked on /auth/login. Identify this service
 * explicitly so the request is attributable and not mistaken for a bot.
 */
const PLATFORM_USER_AGENT =
  "ZoikoMeds-Website/1.0 (+https://zoikomeds.com; server-side membership lookup)";

export type MembershipStatus =
  /** Confirmed: this email is an active user linked to this pharmacy. */
  | "linked"
  /** Confirmed: this email is not linked to this pharmacy. */
  | "not-linked"
  /** No resolver available, or it failed — linkage could not be established. */
  | "unknown";

export interface MembershipResult {
  status: MembershipStatus;
  /** Why the status is what it is, for the audit trail on the claim record. */
  detail: string;
  /** Which resolver answered, for diagnostics. */
  source: "check-endpoint" | "platform-admin-api" | "none";
  /** The pharmacy id the platform holds for this user, when we could read it. */
  resolvedPharmacyId?: string | null;
}

/** True when some membership resolver is wired up for this deployment. */
export function membershipLookupConfigured(): boolean {
  return Boolean(
    process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL ||
      process.env.PLATFORM_SERVICE_TOKEN ||
      (process.env.PLATFORM_SERVICE_EMAIL && process.env.PLATFORM_SERVICE_PASSWORD),
  );
}

/* ─────────────────────── shared payload helpers ─────────────────────── */

function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function readList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    for (const key of ["users", "data", "results", "items", "records"]) {
      const value = (payload as Record<string, unknown>)[key];
      if (Array.isArray(value)) return value;
    }
  }
  return [];
}

/**
 * Every pharmacy id a user record links to.
 *
 * Shapes differ across platform versions (a scalar `pharmacyId`, a nested
 * `pharmacy` object, or a memberships array for multi-branch staff), so all of
 * the plausible ones are read rather than assuming a single layout.
 */
function pharmacyIdsOnUser(user: Record<string, unknown>): string[] {
  const ids = new Set<string>();

  for (const key of ["pharmacyId", "pharmacy_id"]) {
    const id = text(user[key]);
    if (id) ids.add(id);
  }

  const pharmacy = user.pharmacy;
  if (pharmacy && typeof pharmacy === "object") {
    const id = text((pharmacy as Record<string, unknown>).id);
    if (id) ids.add(id);
  }

  for (const key of ["pharmacies", "memberships", "pharmacyMemberships", "assignments"]) {
    const list = user[key];
    if (!Array.isArray(list)) continue;
    for (const entry of list) {
      if (!entry || typeof entry !== "object") continue;
      const row = entry as Record<string, unknown>;
      const nested = row.pharmacy;
      const id =
        text(row.pharmacyId) ||
        text(row.id) ||
        (nested && typeof nested === "object"
          ? text((nested as Record<string, unknown>).id)
          : "");
      if (id) ids.add(id);
    }
  }

  return [...ids];
}

/**
 * False only when the record says the account is explicitly not active.
 *
 * The platform admin API uses a boolean `isActive`; the string `status` variants
 * are kept for other shapes. A record carrying neither is treated as active,
 * since absence is not evidence of suspension.
 */
function isActiveUser(user: Record<string, unknown>): boolean {
  if (user.isActive === false) return false;
  if (user.isActive === true) return true;

  const status = text(user.status || user.accountStatus || user.state).toUpperCase();
  if (!status) return true;
  return status === "ACTIVE" || status === "ENABLED" || status === "VERIFIED";
}

/* ───────────────── resolver 1: dedicated check endpoint ───────────────── */

async function viaCheckEndpoint(
  email: string,
  pharmacyId: string,
): Promise<MembershipResult | null> {
  const endpoint = process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL;
  if (!endpoint) return null;

  const apiKey = process.env.PHARMACY_MEMBERSHIP_LOOKUP_KEY;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({ email, pharmacyId }),
      cache: "no-store",
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.warn(`[membership] check endpoint returned HTTP ${res.status}`);
      return {
        status: "unknown",
        detail: `Check endpoint returned HTTP ${res.status}.`,
        source: "check-endpoint",
      };
    }

    const data: unknown = await res.json();
    if (!data || typeof data !== "object") {
      return {
        status: "unknown",
        detail: "Check endpoint returned an unreadable payload.",
        source: "check-endpoint",
      };
    }

    const record = data as Record<string, unknown>;
    const resolvedPharmacyId = text(record.pharmacyId) || null;
    const linked =
      record.linked === true ||
      record.isLinked === true ||
      record.status === "linked" ||
      record.status === "LINKED";
    const notLinked =
      record.linked === false ||
      record.isLinked === false ||
      record.status === "not-linked" ||
      record.status === "NOT_LINKED";

    if (linked) {
      return {
        status: "linked",
        detail: "Confirmed by the membership check endpoint.",
        source: "check-endpoint",
        resolvedPharmacyId,
      };
    }
    if (notLinked) {
      return {
        status: "not-linked",
        detail: "Check endpoint reports no link to this pharmacy.",
        source: "check-endpoint",
        resolvedPharmacyId,
      };
    }
    return {
      status: "unknown",
      detail: "Check endpoint gave no usable verdict.",
      source: "check-endpoint",
    };
  } catch (err) {
    console.warn(
      `[membership] check endpoint failed: ${err instanceof Error ? err.message : String(err)}`,
    );
    return {
      status: "unknown",
      detail: "Check endpoint was unreachable.",
      source: "check-endpoint",
    };
  }
}

/* ──────────────── resolver 2: the platform admin API ──────────────── */

let cachedToken: { value: string; expiresAt: number } | null = null;

/** Bearer token for the platform admin API, from a token or a service login. */
async function platformToken(): Promise<string | null> {
  const staticToken = process.env.PLATFORM_SERVICE_TOKEN;
  if (staticToken) return staticToken;

  const email = process.env.PLATFORM_SERVICE_EMAIL;
  const password = process.env.PLATFORM_SERVICE_PASSWORD;
  if (!email || !password) return null;

  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": PLATFORM_USER_AGENT,
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });

    if (!res.ok) {
      // Deliberately no body: a failed login can echo the submitted credential.
      console.warn(`[membership] platform service login failed with HTTP ${res.status}`);
      return null;
    }

    const data = (await res.json()) as Record<string, unknown>;
    const token =
      text(data.accessToken) || text(data.access_token) || text(data.token) || text(data.jwt);
    if (!token) {
      console.warn("[membership] platform service login returned no token field");
      return null;
    }

    // Short cache: long enough to serve a burst, short enough that a rotated
    // credential or revoked session is picked up quickly.
    cachedToken = { value: token, expiresAt: Date.now() + 10 * 60 * 1000 };
    return token;
  } catch (err) {
    console.warn(
      `[membership] platform service login error: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return null;
  }
}

/** Reset the cached service token (tests, and credential rotation). */
export function resetPlatformTokenCache(): void {
  cachedToken = null;
}

async function viaPlatformAdminApi(
  email: string,
  pharmacyId: string,
): Promise<MembershipResult | null> {
  const token = await platformToken();
  if (!token) return null;

  const needle = email.trim().toLowerCase();

  try {
    const url = new URL(`${API_BASE_URL}/admin/users`);
    /*
     * `search` is the only filter this endpoint accepts, and its validation is
     * strict — sending `limit` or `email` is rejected with HTTP 400, which would
     * turn every lookup into "unknown". The email is still matched exactly
     * below, so `search` is a narrowing hint rather than the decision.
     */
    url.searchParams.set("search", email);

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": PLATFORM_USER_AGENT,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });

    if (res.status === 401 || res.status === 403) {
      // The credential is wrong or lacks admin scope — unknown, not "not linked".
      console.warn(
        `[membership] platform admin API rejected the service credential (HTTP ${res.status})`,
      );
      return {
        status: "unknown",
        detail: "Platform admin API rejected the service credential.",
        source: "platform-admin-api",
      };
    }
    if (!res.ok) {
      console.warn(`[membership] platform admin API returned HTTP ${res.status}`);
      return {
        status: "unknown",
        detail: `Platform admin API returned HTTP ${res.status}.`,
        source: "platform-admin-api",
      };
    }

    const users = readList(await res.json());
    const match = users.find((u) => {
      if (!u || typeof u !== "object") return false;
      return text((u as Record<string, unknown>).email).toLowerCase() === needle;
    }) as Record<string, unknown> | undefined;

    if (!match) {
      return {
        status: "not-linked",
        detail: "No ZoikoMeds user exists with this email address.",
        source: "platform-admin-api",
        resolvedPharmacyId: null,
      };
    }

    const linkedIds = pharmacyIdsOnUser(match);
    const active = isActiveUser(match);
    const linked = active && linkedIds.includes(pharmacyId);

    // Safe to log: pharmacy ids and a verdict. No email, no token.
    console.log(
      `[membership] selected=${pharmacyId} resolved=${
        linkedIds.length ? linkedIds.join(",") : "none"
      } active=${active} verdict=${linked ? "linked" : "not-linked"}`,
    );

    if (linked) {
      return {
        status: "linked",
        detail: "Active platform user assigned to this pharmacy.",
        source: "platform-admin-api",
        resolvedPharmacyId: pharmacyId,
      };
    }

    return {
      status: "not-linked",
      detail: active
        ? "Platform user exists but is not assigned to this pharmacy."
        : "Platform user is not active.",
      source: "platform-admin-api",
      resolvedPharmacyId: linkedIds[0] ?? null,
    };
  } catch (err) {
    console.warn(
      `[membership] platform admin API error: ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return {
      status: "unknown",
      detail: "Platform admin API was unreachable.",
      source: "platform-admin-api",
    };
  }
}

/* ──────────────────────────── entry point ──────────────────────────── */

/**
 * Resolve whether `email` is an active user on `pharmacyId`.
 *
 * Never throws and never fabricates: any absence or failure is "unknown".
 */
export async function lookupPharmacyMembership(params: {
  email: string;
  pharmacyId: string;
}): Promise<MembershipResult> {
  const email = params.email.trim();
  const pharmacyId = params.pharmacyId.trim();

  if (!email || !pharmacyId) {
    return {
      status: "unknown",
      detail: "Membership lookup needs both an email and a pharmacy id.",
      source: "none",
    };
  }

  const fromEndpoint = await viaCheckEndpoint(email, pharmacyId);
  if (fromEndpoint) return fromEndpoint;

  const fromPlatform = await viaPlatformAdminApi(email, pharmacyId);
  if (fromPlatform) return fromPlatform;

  return {
    status: "unknown",
    detail:
      "No membership resolver is configured: set PHARMACY_MEMBERSHIP_LOOKUP_URL, or PLATFORM_SERVICE_TOKEN / PLATFORM_SERVICE_EMAIL+PASSWORD.",
    source: "none",
  };
}
