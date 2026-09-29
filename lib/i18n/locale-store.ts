import { LOCALE_COOKIE, preferenceCookie } from "./locale-preference";

/**
 * The visitor's chosen language, as an external store React can subscribe to.
 *
 * The choice lives in a cookie rather than React state so it survives reloads
 * and can be read by the server later if the site ever moves to server-rendered
 * locales. Because it lives outside React, components read it through
 * useSyncExternalStore (see components/language/LocaleProvider.tsx), which
 * keeps server and client rendering consistent: the server always renders the
 * default language, and the browser re-renders once if this visitor has chosen
 * another one.
 *
 * Browser-only. On the server `readLocale()` returns undefined, so rendering
 * falls back to the default language.
 */

const listeners = new Set<() => void>();

/** The saved language code, or undefined when the visitor has not chosen one. */
export function readLocale(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const entry = document.cookie.split("; ").find((c) => c.startsWith(`${LOCALE_COOKIE}=`));
  if (entry === undefined) return undefined;
  const value = entry.slice(LOCALE_COOKIE.length + 1);
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** Snapshot for useSyncExternalStore. A primitive, so React can compare it by value. */
export function localeSnapshot(): string {
  return readLocale() ?? "";
}

/** Snapshot used while server rendering: nothing is chosen yet. */
export function serverLocaleSnapshot(): string {
  return "";
}

export function subscribeToLocale(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/** Saves the visitor's choice and tells every subscriber to re-render. */
export function persistLocale(code: string): void {
  document.cookie = preferenceCookie(LOCALE_COOKIE, code, window.location.protocol === "https:");
  for (const listener of listeners) listener();
}
