"use client";

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, findSiteLocale, SITE_LOCALES, type SiteLocale } from "@/lib/i18n/locales";
import { resolveSiteLocale } from "@/lib/i18n/locale-preference";
import {
  localeSnapshot,
  persistLocale,
  serverLocaleSnapshot,
  subscribeToLocale,
} from "@/lib/i18n/locale-store";
import { translatorFor, type Translator } from "@/lib/i18n/translate";

/**
 * Holds the active language for the whole site and hands components a
 * translator.
 *
 * It runs on the client on purpose. The locale lives in a cookie, and reading
 * a cookie during server rendering would opt every page out of static
 * generation — all 97 of them — for a preference almost no visitor has set.
 * So pages stay static and in the default language, and a visitor who has
 * chosen another one gets it applied on hydration. The trade-off is written up
 * in the report: a brief flash of English for that visitor, and no separate
 * indexable URL per language.
 *
 * Until a second language is marked available in lib/i18n/locales.ts this is a
 * no-op wrapper: every visitor is on English.
 */

interface LocaleContextValue {
  locale: SiteLocale;
  t: Translator;
  /** Persist a choice and re-render the site in that language. */
  setLocale: (code: string) => void;
}

const FALLBACK = findSiteLocale(DEFAULT_LOCALE)!;

const LocaleContext = createContext<LocaleContextValue>({
  locale: FALLBACK,
  t: translatorFor(DEFAULT_LOCALE),
  setLocale: () => {},
});

export default function LocaleProvider({
  children,
  locales = SITE_LOCALES,
}: {
  children: React.ReactNode;
  locales?: readonly SiteLocale[];
}) {
  // The cookie is external state: the server snapshot is always "no choice",
  // so server and first client render agree and hydration stays clean.
  const saved = useSyncExternalStore(subscribeToLocale, localeSnapshot, serverLocaleSnapshot);
  const locale = useMemo(() => resolveSiteLocale({ saved }, locales), [saved, locales]);

  useEffect(() => {
    document.documentElement.lang = locale.htmlLang;
    document.documentElement.dir = locale.dir;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, t: translatorFor(locale.code), setLocale: persistLocale }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** The active language and its translator. */
export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

/** Just the translator, for components that only render copy. */
export function useTranslation(): Translator {
  return useContext(LocaleContext).t;
}
