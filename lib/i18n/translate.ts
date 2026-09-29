import { catalogFor, en, type MessageKey } from "./messages";

/**
 * Message lookup with an English fallback.
 *
 * A visitor must never see a raw key such as "footer.tagline". If a key is
 * missing from the active catalog, the English text is used; development warns
 * loudly so the gap is fixed before it ships. Keys are typed against the
 * English catalog, so a key missing from English is a compile error rather
 * than a runtime surprise.
 */

export type MessageVariables = Record<string, string | number>;

/** Replaces {name} placeholders; an unknown placeholder is left visible in development. */
export function interpolate(template: string, variables?: MessageVariables): string {
  if (!variables) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = variables[name];
    return value === undefined ? match : String(value);
  });
}

export function translate(locale: string, key: MessageKey, variables?: MessageVariables): string {
  const value = catalogFor(locale)[key];
  if (typeof value === "string" && value.trim() !== "") return interpolate(value, variables);

  if (process.env.NODE_ENV !== "production" && locale !== "en") {
    console.warn(`[i18n] "${key}" is missing from the ${locale} catalog — falling back to English.`);
  }
  return interpolate(en[key], variables);
}

/** A bound translator for one locale, as handed to components by useTranslation(). */
export type Translator = (key: MessageKey, variables?: MessageVariables) => string;

export function translatorFor(locale: string): Translator {
  return (key, variables) => translate(locale, key, variables);
}
