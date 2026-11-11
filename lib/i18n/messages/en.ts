/**
 * English — the canonical message catalog and the source of truth for keys.
 *
 * Every other catalog is checked against this one: a language may only be
 * marked `available` in ../locales.ts once it carries every key here AND the
 * website's copy has actually been migrated into the catalog
 * (__tests__/lib/i18n-catalog.test.ts enforces both).
 *
 * Wording is copied verbatim from the components it replaces — this is a move,
 * not a rewrite. Placeholders use {name}; see ../translate.ts.
 *
 * Product names and trademarks (ZoikoMeds, ZoikoSignal™, ZoikoAvail™,
 * MediBase™, Zoiko Group) are never translated. Postal addresses and social
 * network names stay in the components, since they are not copy.
 */
export const en = {
  // ── Language suggestion modal ────────────────────────────────────────────
  "language.detected": "We detected your region",
  "language.question": "Would you like to switch language?",
  "language.stay": "Continue in {language}",
  "language.switch": "Switch to {language}",

  // ── 404 ──────────────────────────────────────────────────────────────────
  "notFound.eyebrow": "Page not found",
  "notFound.title": "This pharmacy path doesn't exist.",
  "notFound.description":
    "The page you're looking for may have moved, been removed, or the URL may be incorrect. Let's get you back on track.",
  "notFound.backHome": "Back to home",
  "notFound.verification": "Pharmacy verification",
  "notFound.links.inventoryUpload": "Inventory upload",
  "notFound.links.pharmacyPortal": "Pharmacy portal",
  "notFound.links.support": "Support",
  "notFound.copyright": "© {year} ZoikoMeds. All rights reserved.",

  // ── Footer: masthead ─────────────────────────────────────────────────────
  "footer.tagline":
    "Global medicine availability infrastructure — search, signal, verify. Not a pharmacy. No prescribing, dispensing, or medical advice.",
  "footer.status.monitoring": "Infrastructure monitoring active",
  "footer.status.markets": "47+ Planned Market Framework",
  "footer.badge.privacy": "Privacy-led",
  "footer.badge.verified": "Verified pharmacies",
  "footer.badge.noStock": "Zero stock exposed",

  // ── Footer: column headings ──────────────────────────────────────────────
  "footer.columns.platform": "Platform",
  "footer.columns.pharmacies": "Pharmacies",
  "footer.columns.providers": "Healthcare Providers",
  "footer.columns.enterprise": "Enterprise & Intelligence",
  "footer.columns.company": "Company",
  "footer.columns.legal": "Legal & Trust",

  // ── Footer: platform links ───────────────────────────────────────────────
  "footer.platform.search": "Search medicines",
  "footer.platform.createAccount": "Create account",
  "footer.platform.savedSearches": "Saved searches",
  "footer.platform.alerts": "Availability alerts",
  "footer.platform.caregiver": "Caregiver access",
  "footer.platform.confidence": "Availability confidence",

  // ── Footer: pharmacy links ───────────────────────────────────────────────
  "footer.pharmacies.join": "Join the network",
  "footer.pharmacies.portal": "Pharmacy portal",
  "footer.pharmacies.verification": "Verification standards",
  "footer.pharmacies.inventory": "Inventory upload",
  "footer.pharmacies.confirmations": "Confirmation requests",
  "footer.pharmacies.support": "Pharmacy support",

  // ── Footer: provider links ───────────────────────────────────────────────
  "footer.providers.overview": "Provider overview",
  "footer.providers.patientSupport": "Patient support workflows",
  "footer.providers.careTeam": "Care team access",
  "footer.providers.signals": "Availability signals",
  "footer.providers.referral": "Referral guidance",
  "footer.providers.support": "Provider support",

  // ── Footer: enterprise links ─────────────────────────────────────────────
  "footer.enterprise.solutions": "Enterprise solutions",
  "footer.enterprise.signal": "ZoikoSignal™ intelligence",
  "footer.enterprise.availApi": "ZoikoAvail™ API",
  "footer.enterprise.medibase": "MediBase™ data",
  "footer.enterprise.healthSystems": "Health systems",
  "footer.enterprise.government": "Government & public health",

  // ── Footer: company links ────────────────────────────────────────────────
  "footer.company.about": "About ZoikoMeds",
  "footer.company.healthcare": "Zoiko Healthcare",
  "footer.company.group": "Zoiko Group",
  "footer.company.careers": "Careers",
  "footer.company.press": "Press",
  "footer.company.contact": "Contact",

  // ── Footer: legal links ──────────────────────────────────────────────────
  "footer.legal.trustCenter": "Trust Center",
  "footer.legal.privacyCenter": "Privacy Center",
  "footer.legal.terms": "Terms of Use",
  "footer.legal.cookies": "Cookie Settings",
  "footer.legal.medicalDisclaimer": "Medical Disclaimer",
  "footer.legal.controlledMedicine": "Controlled Medicine Policy",
  "footer.legal.accessibility": "Accessibility",

  // ── Footer: bottom bar ───────────────────────────────────────────────────
  "footer.bottom.privacy": "Privacy",
  "footer.bottom.terms": "Terms",
  "footer.bottom.cookies": "Cookies",
  "footer.bottom.accessibility": "Accessibility",
  "footer.bottom.compliance": "Compliance",

  // ── Footer: offices, legal notices ───────────────────────────────────────
  "footer.hq.us": "US HQ",
  "footer.hq.eu": "EU HQ",
  "footer.operator":
    "© {year} ZoikoMeds | ZoikoMeds is a governed platform operated by Zoiko Healthcare Inc | Zoiko Healthcare Inc is a subsidiary of Zoiko Group Inc",
  "footer.copyright": "© {year} Zoiko Group Inc. All rights reserved.",
  "footer.disclaimer.intro":
    "ZoikoMeds provides medicine availability information from participating verified pharmacies.",
  "footer.disclaimer.emphasis":
    "ZoikoMeds is not a pharmacy, does not prescribe, dispense, sell, deliver, or recommend medicines, and does not provide medical advice.",
  "footer.disclaimer.rest":
    "Availability information is confidence-based and not a guarantee of stock. Prescription rules, pharmacist judgment, verification requirements, and jurisdiction-specific laws always apply. In a medical emergency, contact local emergency services immediately.",
} as const;

/** Every key the website may ask for. Adding a key here is a compile error in every enabled catalog. */
export type MessageKey = keyof typeof en;

/** A translation of the English catalog. Partial so work-in-progress languages can exist while disabled. */
export type MessageCatalog = Partial<Record<MessageKey, string>>;
