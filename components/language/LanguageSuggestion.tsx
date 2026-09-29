"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { internalApi } from "@/lib/config";
import { findSiteLocale, SITE_LOCALES, type SiteLocale } from "@/lib/i18n/locales";
import {
  LOCALE_COOKIE,
  LOCALE_PROMPT_COOKIE,
  LOCALE_PROMPT_DISMISSED,
  isLanguagePromptExcluded,
  preferenceCookie,
  resolveSiteLocale,
  type LanguageSuggestion as Suggestion,
} from "@/lib/i18n/locale-preference";
import { persistLocale } from "@/lib/i18n/locale-store";
import { translate } from "@/lib/i18n/translate";

/**
 * Offers to switch the site into the language of the visitor's region — never
 * switches on its own. Shown at most once: either answer (or Escape) is saved
 * in a cookie, and the prompt never returns after that.
 *
 * The region comes from the trusted CF-IPCountry header, which only the server
 * can see, so the decision is made by /internal/locale-suggestion rather than
 * here. Mounted once in the root layout. While only English is available (see
 * lib/i18n/locales.ts) it renders nothing and makes no request.
 */

function readCookie(name: string): string | undefined {
  const entry = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  if (entry === undefined) return undefined;
  const value = entry.slice(name.length + 1);
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** The server's suggestion, decided from the request's own trusted country header. */
async function fetchSuggestion(path: string): Promise<{ code: string | null; country: string | null }> {
  const res = await fetch(`${internalApi("locale-suggestion")}?path=${encodeURIComponent(path)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`locale-suggestion ${res.status}`);
  const body = (await res.json()) as { suggestion?: unknown; country?: unknown } | null;
  return {
    code: typeof body?.suggestion === "string" ? body.suggestion : null,
    country: typeof body?.country === "string" ? body.country : null,
  };
}

export default function LanguageSuggestion({ locales = SITE_LOCALES }: { locales?: readonly SiteLocale[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const checked = useRef(false);
  const mounted = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stayRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // Decide once per visit, on the first route that is safe to interrupt.
  useEffect(() => {
    if (checked.current) return;
    const search = window.location.search;
    if (isLanguagePromptExcluded(pathname, search)) return;
    checked.current = true;

    if (readCookie(LOCALE_COOKIE) || readCookie(LOCALE_PROMPT_COOKIE) === LOCALE_PROMPT_DISMISSED) return;
    const current = resolveSiteLocale({}, locales);
    if (!locales.some((l) => l.available && l.code !== current.code)) return;

    fetchSuggestion(pathname + search)
      .then(({ code, country }): Suggestion | null => {
        const suggested = findSiteLocale(code, locales);
        if (!suggested?.available || suggested.code === current.code) return null;
        return country ? { current, suggested, country } : { current, suggested };
      })
      // Only the server can read the trusted country header, so if that call
      // fails there is no second source: stay in the current language.
      .catch(() => null)
      .then((result) => {
        if (mounted.current && result) setSuggestion(result);
      });
  }, [pathname, locales]);

  const close = useCallback(() => {
    setSuggestion(null);
    returnFocus.current?.focus?.();
  }, []);

  const remember = useCallback((name: string, value: string) => {
    document.cookie = preferenceCookie(name, value, window.location.protocol === "https:");
  }, []);

  const stay = () => {
    if (!suggestion) return;
    persistLocale(suggestion.current.code);
    close();
  };

  const switchLanguage = () => {
    if (!suggestion) return;
    // Saving through the store re-renders the site in the new language in
    // place. The URL and therefore the market are untouched: /in/pricing stays
    // /in/pricing, still INR, still the India price book.
    persistLocale(suggestion.suggested.code);
    close();
    router.refresh();
  };

  const dismiss = useCallback(() => {
    remember(LOCALE_PROMPT_COOKIE, LOCALE_PROMPT_DISMISSED);
    close();
  }, [remember, close]);

  // Focus the non-switching choice first; keep Tab inside the dialog; Escape dismisses.
  useEffect(() => {
    if (!suggestion) return;
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    stayRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const inside = dialogRef.current.contains(document.activeElement);
      if (e.shiftKey && (document.activeElement === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [suggestion, dismiss]);

  if (!suggestion || isLanguagePromptExcluded(pathname)) return null;
  const { current, suggested } = suggestion;
  // The prompt itself speaks the language the visitor is currently reading;
  // only the offered language's own name is shown in its own script.
  const t = (key: Parameters<typeof translate>[1], vars?: Parameters<typeof translate>[2]) =>
    translate(current.code, key, vars);

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#0C1B30]/60 p-4 backdrop-blur-sm font-sans antialiased">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zm-language-title"
        aria-describedby="zm-language-name zm-language-question"
        className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F6F4] text-lg font-bold tracking-wide text-[#0F1F4E]"
        >
          {suggestion.country ?? suggested.badge}
        </div>
        <h2 id="zm-language-title" className="text-lg font-bold text-[#101828]">
          {t("language.detected")}
        </h2>
        <p id="zm-language-name" className="mt-2 text-2xl font-bold text-[#0F1F4E]">
          {suggested.name}
          {suggested.nativeName !== suggested.name && (
            <span lang={suggested.code} dir={suggested.dir} className="mt-0.5 block text-sm font-medium text-[#475467]">
              {suggested.nativeName}
            </span>
          )}
        </p>
        <p id="zm-language-question" className="mt-3 text-sm text-[#475467]">
          {t("language.question")}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            ref={stayRef}
            type="button"
            onClick={stay}
            className="flex-1 cursor-pointer rounded-xl border border-[#D0D5DD] bg-white px-4 py-3 text-sm font-semibold text-[#101828] transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006662]"
          >
            {t("language.stay", { language: current.name })}
          </button>
          <button
            type="button"
            onClick={switchLanguage}
            className="flex-1 cursor-pointer rounded-xl bg-[#006662] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00524F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006662]"
          >
            {t("language.switch", { language: suggested.name })}
          </button>
        </div>
      </div>
    </div>
  );
}
