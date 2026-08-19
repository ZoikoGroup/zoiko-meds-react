import type { Metadata } from "next";

import {
  CookieCategory,
  CookieConsent,
  CookieCta,
  CookieData,
  CookieHero,
  CookieHistory,
} from "@/components/cookie-settings";

export const metadata: Metadata = {
  title: "Manage Cookie Settings & Preferences | ZoikoMeds",
  description:
    "Manage your cookie preferences on ZoikoMeds. Learn how cookies work, control your choices, and understand how cookie settings affect your experience.",
};

export default function CookiePage() {
  return (
    <main>
      <CookieHero />
      <CookieConsent />
      <CookieCategory />
      <CookieData />
      <CookieHistory />
      <CookieCta />
    </main>
  );
}
