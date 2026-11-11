import { SITE_LOCALES, type SiteLocale } from "./locales";

/**
 * Reading a visitor's language preference. The signal is the browser's
 * Accept-Language list (or navigator.languages, the same list, on the client) —
 * never the visitor's country: someone in Germany with an English browser gets
 * no German suggestion, and someone in India with an English browser gets no
 * Hindi one.
 */

/**
 * Accept-Language → lowercase tags, most preferred first. Honours q-values
 * (stable for equal weights), drops q=0 and the "*" wildcard.
 * e.g. "de-DE,de;q=0.9,en;q=0.8" → ["de-de", "de", "en"]
 */
export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return [];
  return header
    .split(",")
    .map((part, index) => {
      const [rawTag, ...params] = part.trim().split(";");
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const q = qParam ? Number(qParam.slice(2)) : 1;
      return { tag: rawTag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0, index };
    })
    .filter(({ tag, q }) => tag && tag !== "*" && q > 0 && /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/.test(tag))
    .sort((a, b) => b.q - a.q || a.index - b.index)
    .map(({ tag }) => tag);
}

/**
 * The site locale a single browser tag maps to: an exact match (a regional
 * variant the site carries, e.g. "pt-br"), else its primary language
 * ("de-at" → "de", "en-in" → "en", "hi-in" → "hi").
 */
export function matchSiteLocale(tag: string, locales: readonly SiteLocale[] = SITE_LOCALES): SiteLocale | undefined {
  const normalized = tag.trim().toLowerCase().replace(/_/g, "-");
  const primary = normalized.split("-")[0];
  return locales.find((l) => l.code === normalized) ?? locales.find((l) => l.code === primary);
}

/** The visitor's most preferred language that the site can actually show. */
export function preferredAvailableLocale(
  preferences: readonly string[],
  locales: readonly SiteLocale[] = SITE_LOCALES,
): SiteLocale | undefined {
  for (const tag of preferences) {
    const match = matchSiteLocale(tag, locales);
    if (match?.available) return match;
  }
  return undefined;
}
