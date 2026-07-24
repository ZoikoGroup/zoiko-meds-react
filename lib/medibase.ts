export interface MediBaseResult {
  canonicalName: string;
  strength: string | null;
  form: string | null;
  brand: string | null;
  aliases: string[];
  confidence: number;
}

interface MediBaseEntry {
  canonicalName: string;
  strengths: string[];
  forms: string[];
  brands: string[];
  aliases: string[];
}

const MEDIBASE: MediBaseEntry[] = [
  {
    canonicalName: "amoxicillin",
    strengths: ["250mg", "500mg"],
    forms: ["capsules", "tablets", "oral suspension"],
    brands: ["amoxil", "moxifen", "trimox"],
    aliases: ["amoxil", "moxifen", "trimox"],
  },
  {
    canonicalName: "metformin",
    strengths: ["500mg", "850mg", "1000mg"],
    forms: ["tablets", "extended-release"],
    brands: ["glucophage", "fortamet", "glumetza"],
    aliases: ["glucophage", "fortamet", "glumetza"],
  },
  {
    canonicalName: "omeprazole",
    strengths: ["10mg", "20mg", "40mg"],
    forms: ["capsules", "tablets"],
    brands: ["prilosec", "losec", "zegerid"],
    aliases: ["prilosec", "losec", "zegerid"],
  },
  {
    canonicalName: "atorvastatin",
    strengths: ["10mg", "20mg", "40mg", "80mg"],
    forms: ["tablets"],
    brands: ["lipitor", "atorvaliq"],
    aliases: ["lipitor", "atorvaliq"],
  },
  {
    canonicalName: "paracetamol",
    strengths: ["500mg", "650mg", "1000mg"],
    forms: ["tablets", "capsules", "oral suspension", "suppositories"],
    brands: ["panadol", "calpol", "tylenol", "dolo"],
    aliases: ["acetaminophen", "panadol", "calpol", "tylenol", "dolo"],
  },
  {
    canonicalName: "aspirin",
    strengths: ["75mg", "100mg", "300mg"],
    forms: ["tablets", "dispersible", "enteric-coated"],
    brands: ["bayer", "ecotrin", "disprin"],
    aliases: ["acetylsalicylic acid", "bayer", "ecotrin", "disprin"],
  },
  {
    canonicalName: "ibuprofen",
    strengths: ["200mg", "400mg", "600mg"],
    forms: ["tablets", "capsules", "oral suspension", "gel"],
    brands: ["advil", "nurofen", "brufen", "motrin"],
    aliases: ["advil", "nurofen", "brufen", "motrin"],
  },
  {
    canonicalName: "cetirizine",
    strengths: ["10mg"],
    forms: ["tablets", "oral solution"],
    brands: ["zyrtec", "zyrtec allergy"],
    aliases: ["zyrtec", "zyrtec allergy"],
  },
  {
    canonicalName: "amoxiclav",
    strengths: ["312.5mg", "625mg", "1000mg"],
    forms: ["tablets", "oral suspension"],
    brands: ["augmentin", "co-amoxiclav", "clavulin"],
    aliases: ["augmentin", "co-amoxiclav", "clavulin", "amoxicillin clavulanate"],
  },
];

const STRENGTH_PATTERN = /\b(\d+(?:\.\d+)?)\s*(mg|g|mcg|ml)\b/i;
const BRAND_PATTERN = /\b(amoxil|moxifen|trimox|glucophage|fortamet|glumetza|prilosec|losec|zegerid|lipitor|atorvaliq|panadol|calpol|tylenol|bayer|ecotrin|disprin|advil|nurofen|brufen|motrin|zyrtec|augmentin|clavulin)\b/i;
const FORM_PATTERN = /\b(capsules|caps|capsule|tablets|tablet|tab|oral suspension|syrup|solution|injection|cream|ointment|gel|patch|drops|suppositories)\b/i;

function normalizeStrength(raw: string): string | null {
  const match = raw.match(STRENGTH_PATTERN);
  if (!match) return null;
  const value = match[1];
  const unit = match[2].toLowerCase();
  if (unit === "g") return `${parseFloat(value) * 1000}mg`;
  if (unit === "mcg") return `${value}mcg`;
  return `${value}${unit}`;
}

export function resolveMedicine(query: string): MediBaseResult[] {
  const lower = query.toLowerCase();
  const results: MediBaseResult[] = [];

  const queryStrength = normalizeStrength(lower);
  const queryBrand = lower.match(BRAND_PATTERN)?.[1];
  const queryForm = lower.match(FORM_PATTERN)?.[1];

  for (const entry of MEDIBASE) {
    const nameLower = entry.canonicalName.toLowerCase();
    let matchFound = false;
    let matchConfidence = 0;

    if (lower.includes(nameLower)) {
      matchFound = true;
      matchConfidence = 1.0;
    }

    if (!matchFound && queryBrand) {
      const matchedAlias = entry.aliases.find((a) => a.toLowerCase() === queryBrand);
      if (matchedAlias) {
        matchFound = true;
        matchConfidence = 0.95;
      } else {
        const partialAlias = entry.aliases.some((a) => lower.includes(a.toLowerCase()));
        if (partialAlias) {
          matchFound = true;
          matchConfidence = 0.9;
        }
      }
    }

    if (!matchFound) continue;

    let strength = queryStrength;
    let strengthConfidence = 0;

    if (queryStrength) {
      const matchingStrength = entry.strengths.find(
        (s) => s.toLowerCase() === queryStrength!.toLowerCase()
      );
      if (matchingStrength) {
        strength = matchingStrength;
        strengthConfidence = 1;
      } else {
        strengthConfidence = -1;
      }
    }

    const form = queryForm ?? null;

    results.push({
      canonicalName: entry.canonicalName,
      strength,
      form,
      brand: queryBrand ?? null,
      aliases: entry.aliases,
      confidence: Math.min(
        1,
        matchConfidence - (strengthConfidence === -1 ? 0.2 : 0)
      ),
    });
  }

  return results.sort((a, b) => b.confidence - a.confidence);
}

export function getSupportedMedicines(): { canonical: string; strengths: string[]; brands: string[] }[] {
  return MEDIBASE.map((e) => ({
    canonical: e.canonicalName,
    strengths: e.strengths,
    brands: e.brands,
  }));
}
