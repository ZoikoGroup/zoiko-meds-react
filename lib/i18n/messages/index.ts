import { ar } from "./ar";
import { de } from "./de";
import { en, type MessageCatalog, type MessageKey } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { hi } from "./hi";
import { pt } from "./pt";
import { zhHans } from "./zh-hans";

export type { MessageCatalog, MessageKey };
export { en };

/** Every catalog, keyed by the locale codes in ../locales.ts. */
export const CATALOGS: Readonly<Record<string, MessageCatalog>> = {
  en,
  de,
  fr,
  es,
  hi,
  pt,
  ar,
  "zh-hans": zhHans,
};

export function catalogFor(locale: string): MessageCatalog {
  return CATALOGS[locale.toLowerCase()] ?? {};
}

/** Keys a catalog is missing compared with English. Empty means full parity. */
export function missingKeys(locale: string): MessageKey[] {
  const catalog = catalogFor(locale);
  return (Object.keys(en) as MessageKey[]).filter((key) => {
    const value = catalog[key];
    return typeof value !== "string" || value.trim() === "";
  });
}
