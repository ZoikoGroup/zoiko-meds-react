interface StockEntry {
  pharmacyId: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  reportedAt: string;
  signalStrength: number;
}

interface ConfidenceResult {
  tier: "high" | "moderate" | "low";
  posterior: number;
  sampleSize: number;
}

export interface AvailabilityResult {
  medicine: string;
  region: string;
  confidence: ConfidenceResult;
  cardState: string;
  stockingPharmacies: number;
  totalPharmacies: number;
  pharmacies: { id: number; name: string; address: string; city: string; phone: string; reportedAt: string }[];
  timestamp: string;
  source: string;
}

const PHARMACY_DB: Record<string, StockEntry[]> = {
  amoxicillin: [
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-23T08:30:00+03:00", signalStrength: 0.92 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-23T09:15:00+03:00", signalStrength: 0.88 },
    { pharmacyId: 3, name: "City Drug Store", address: "Oginga Odinga Ave, Nakuru", city: "Nakuru", phone: "0700 345 678", reportedAt: "2026-07-22T14:00:00+03:00", signalStrength: 0.65 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-23T07:45:00+03:00", signalStrength: 0.95 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-23T06:30:00+03:00", signalStrength: 0.91 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-22T16:20:00+03:00", signalStrength: 0.78 },
    { pharmacyId: 7, name: "Tiba Pharmacy", address: "Moi Ave, Kisumu", city: "Kisumu", phone: "0744 567 890", reportedAt: "2026-07-21T11:00:00+03:00", signalStrength: 0.45 },
    { pharmacyId: 8, name: "Mt Kenya Pharmacy", address: "Nyeri Town, Nyeri", city: "Nyeri", phone: "0755 678 901", reportedAt: "2026-07-23T08:00:00+03:00", signalStrength: 0.72 },
    { pharmacyId: 9, name: "Meru Drug Store", address: "Town Center, Meru", city: "Meru", phone: "0766 789 012", reportedAt: "2026-07-22T10:30:00+03:00", signalStrength: 0.55 },
    { pharmacyId: 10, name: "Eldoret Chemist", address: "Uganda Rd, Eldoret", city: "Eldoret", phone: "0777 890 123", reportedAt: "2026-07-23T05:45:00+03:00", signalStrength: 0.85 },
    { pharmacyId: 11, name: "Beta Pharmacy", address: "Koinange St, Nairobi", city: "Nairobi", phone: "0788 901 234", reportedAt: "2026-07-23T09:30:00+03:00", signalStrength: 0.82 },
    { pharmacyId: 12, name: "Maisha Medics", address: "Mombasa Rd, Mombasa", city: "Mombasa", phone: "0799 012 345", reportedAt: "2026-07-22T13:15:00+03:00", signalStrength: 0.70 },
  ],
  metformin: [
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-23T08:30:00+03:00", signalStrength: 0.90 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-22T14:00:00+03:00", signalStrength: 0.60 },
    { pharmacyId: 9, name: "Meru Drug Store", address: "Town Center, Meru", city: "Meru", phone: "0766 789 012", reportedAt: "2026-07-21T09:00:00+03:00", signalStrength: 0.35 },
  ],
  omeprazole: [
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-23T09:15:00+03:00", signalStrength: 0.87 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-23T07:45:00+03:00", signalStrength: 0.93 },
    { pharmacyId: 11, name: "Beta Pharmacy", address: "Koinange St, Nairobi", city: "Nairobi", phone: "0788 901 234", reportedAt: "2026-07-23T06:30:00+03:00", signalStrength: 0.79 },
    { pharmacyId: 8, name: "Mt Kenya Pharmacy", address: "Nyeri Town, Nyeri", city: "Nyeri", phone: "0755 678 901", reportedAt: "2026-07-22T11:00:00+03:00", signalStrength: 0.48 },
  ],
  atorvastatin: [
    { pharmacyId: 3, name: "City Drug Store", address: "Oginga Odinga Ave, Nakuru", city: "Nakuru", phone: "0700 345 678", reportedAt: "2026-07-22T16:00:00+03:00", signalStrength: 0.72 },
    { pharmacyId: 10, name: "Eldoret Chemist", address: "Uganda Rd, Eldoret", city: "Eldoret", phone: "0777 890 123", reportedAt: "2026-07-23T05:45:00+03:00", signalStrength: 0.84 },
    { pharmacyId: 12, name: "Maisha Medics", address: "Mombasa Rd, Mombasa", city: "Mombasa", phone: "0799 012 345", reportedAt: "2026-07-21T15:30:00+03:00", signalStrength: 0.42 },
  ],
  paracetamol: [
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-23T08:30:00+03:00", signalStrength: 0.96 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-23T09:15:00+03:00", signalStrength: 0.94 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-23T07:45:00+03:00", signalStrength: 0.97 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-23T06:30:00+03:00", signalStrength: 0.91 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-23T08:00:00+03:00", signalStrength: 0.88 },
    { pharmacyId: 7, name: "Tiba Pharmacy", address: "Moi Ave, Kisumu", city: "Kisumu", phone: "0744 567 890", reportedAt: "2026-07-22T12:30:00+03:00", signalStrength: 0.62 },
    { pharmacyId: 8, name: "Mt Kenya Pharmacy", address: "Nyeri Town, Nyeri", city: "Nyeri", phone: "0755 678 901", reportedAt: "2026-07-23T08:00:00+03:00", signalStrength: 0.85 },
    { pharmacyId: 11, name: "Beta Pharmacy", address: "Koinange St, Nairobi", city: "Nairobi", phone: "0788 901 234", reportedAt: "2026-07-23T09:30:00+03:00", signalStrength: 0.90 },
    { pharmacyId: 12, name: "Maisha Medics", address: "Mombasa Rd, Mombasa", city: "Mombasa", phone: "0799 012 345", reportedAt: "2026-07-22T13:15:00+03:00", signalStrength: 0.75 },
  ],
  dolo: [
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-23T09:15:00+03:00", signalStrength: 0.89 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-23T07:45:00+03:00", signalStrength: 0.86 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-22T16:20:00+03:00", signalStrength: 0.71 },
    { pharmacyId: 10, name: "Eldoret Chemist", address: "Uganda Rd, Eldoret", city: "Eldoret", phone: "0777 890 123", reportedAt: "2026-07-23T05:45:00+03:00", signalStrength: 0.83 },
  ],
  aspirin: [
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-22T14:30:00+03:00", signalStrength: 0.55 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-22T10:00:00+03:00", signalStrength: 0.48 },
  ],
  ibuprofen: [
    { pharmacyId: 3, name: "City Drug Store", address: "Oginga Odinga Ave, Nakuru", city: "Nakuru", phone: "0700 345 678", reportedAt: "2026-07-23T08:00:00+03:00", signalStrength: 0.80 },
    { pharmacyId: 7, name: "Tiba Pharmacy", address: "Moi Ave, Kisumu", city: "Kisumu", phone: "0744 567 890", reportedAt: "2026-07-23T07:30:00+03:00", signalStrength: 0.76 },
    { pharmacyId: 11, name: "Beta Pharmacy", address: "Koinange St, Nairobi", city: "Nairobi", phone: "0788 901 234", reportedAt: "2026-07-22T17:00:00+03:00", signalStrength: 0.63 },
    { pharmacyId: 12, name: "Maisha Medics", address: "Mombasa Rd, Mombasa", city: "Mombasa", phone: "0799 012 345", reportedAt: "2026-07-21T11:45:00+03:00", signalStrength: 0.38 },
  ],
  cetirizine: [
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-23T09:15:00+03:00", signalStrength: 0.91 },
    { pharmacyId: 9, name: "Meru Drug Store", address: "Town Center, Meru", city: "Meru", phone: "0766 789 012", reportedAt: "2026-07-23T06:00:00+03:00", signalStrength: 0.77 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-22T16:20:00+03:00", signalStrength: 0.68 },
  ],
  amoxiclav: [
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-23T07:45:00+03:00", signalStrength: 0.94 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-22T15:00:00+03:00", signalStrength: 0.73 },
    { pharmacyId: 8, name: "Mt Kenya Pharmacy", address: "Nyeri Town, Nyeri", city: "Nyeri", phone: "0755 678 901", reportedAt: "2026-07-21T09:30:00+03:00", signalStrength: 0.40 },
  ],
};

const MEDICINE_ALIASES: Record<string, string> = {
  amoxicillin: "amoxicillin",
  amoxil: "amoxicillin",
  moxifen: "amoxicillin",
  trimox: "amoxicillin",
  metformin: "metformin",
  glucophage: "metformin",
  fortamet: "metformin",
  glumetza: "metformin",
  omeprazole: "omeprazole",
  prilosec: "omeprazole",
  losec: "omeprazole",
  zegerid: "omeprazole",
  atorvastatin: "atorvastatin",
  lipitor: "atorvastatin",
  atorvaliq: "atorvastatin",
  paracetamol: "paracetamol",
  acetaminophen: "paracetamol",
  tylenol: "paracetamol",
  panadol: "paracetamol",
  calpol: "paracetamol",
  dolo: "dolo",
  aspirin: "aspirin",
  bayer: "aspirin",
  ecotrin: "aspirin",
  disprin: "aspirin",
  ibrufen: "ibuprofen",
  ibuprofen: "ibuprofen",
  advil: "ibuprofen",
  nurofen: "ibuprofen",
  brufen: "ibuprofen",
  motrin: "ibuprofen",
  cetirizine: "cetirizine",
  zyrtec: "cetirizine",
  amoxiclav: "amoxiclav",
  "co-amoxiclav": "amoxiclav",
  augmentin: "amoxiclav",
  clavulin: "amoxiclav",
};

export const VALID_REGIONS = ["nakuru", "nairobi", "kisumu", "nyeri", "meru", "eldoret", "mombasa"];

export const KNOW_MEDICINES = Object.keys(MEDICINE_ALIASES);

export function extractRegion(text: string): string | null {
  const lower = text.toLowerCase();
  for (const r of VALID_REGIONS) {
    if (lower.includes(r)) {
      return r;
    }
  }
  return null;
}

function resolveMedicine(input: string): string | null {
  const lower = input.toLowerCase().trim();
  for (const [alias, canonical] of Object.entries(MEDICINE_ALIASES)) {
    if (lower.includes(alias)) {
      return canonical;
    }
  }
  const key = lower.split(" ")[0].replace(/[^a-z0-9]/g, "");
  return MEDICINE_ALIASES[key] ?? null;
}

export function findMedicineInQuery(query: string): string | null {
  return resolveMedicine(query);
}

function computeConfidence(stock: StockEntry[], region: string): ConfidenceResult {
  const filtered = region !== "any"
    ? stock.filter((s) => s.city.toLowerCase() === region)
    : stock;

  if (filtered.length === 0) return { tier: "low", posterior: 0.05, sampleSize: 0 };

  const now = Date.now();
  const weightedSignals = filtered.map((s) => {
    const ageHours = (now - new Date(s.reportedAt).getTime()) / 3600000;
    const decay = Math.max(0.3, 1 - ageHours / 72);
    return s.signalStrength * decay;
  });

  const posterior = weightedSignals.reduce((a, b) => a + b, 0) / filtered.length;
  const sampleSize = filtered.length;

  let tier: "high" | "moderate" | "low";
  if (posterior >= 0.7 && sampleSize >= 3) tier = "high";
  else if (posterior >= 0.4 && sampleSize >= 1) tier = "moderate";
  else tier = "low";

  return { tier, posterior: Math.round(posterior * 100) / 100, sampleSize };
}

function computeCardState(confidence: ConfidenceResult, stock: StockEntry[], region: string): string {
  const filtered = region !== "any"
    ? stock.filter((s) => s.city.toLowerCase() === region)
    : stock;
  const now = Date.now();
  const hasStale = filtered.some((s) => (now - new Date(s.reportedAt).getTime()) / 3600000 > 48);
  const reportingCount = filtered.length;

  if (confidence.sampleSize === 0) return "insufficient-signal";
  if (hasStale) return "stale-data";
  if (confidence.tier === "high" && reportingCount >= 3) return "available";
  if (confidence.tier === "moderate" && reportingCount >= 1) return "limited";
  if (confidence.tier === "low" && reportingCount >= 1) return "limited";
  return "insufficient-signal";
}

export interface LookupParams {
  medicine: string;
  region?: string;
}

export function lookupAvailability(params: LookupParams): AvailabilityResult | null {
  try {
    const canonicalKey = resolveMedicine(params.medicine);
    if (!canonicalKey) {
      console.log(`[ZoikoAvail Debug] resolveMedicine returned null for input: "${params.medicine}"`);
      return null;
    }

    const rawRegion = params.region ? params.region.trim() : "any";
    let resolvedRegion = "any";
    if (rawRegion.toLowerCase() !== "any") {
      const extracted = extractRegion(rawRegion);
      if (extracted) {
        resolvedRegion = extracted;
      } else if (VALID_REGIONS.includes(rawRegion.toLowerCase())) {
        resolvedRegion = rawRegion.toLowerCase();
      } else {
        console.log(`[ZoikoAvail Debug] Invalid region: "${rawRegion}" for medicine: "${canonicalKey}"`);
        return null;
      }
    }

    let stock = PHARMACY_DB[canonicalKey] ?? [];
    if (stock.length === 0 && (canonicalKey === "dolo" || canonicalKey === "paracetamol")) {
      stock = PHARMACY_DB["paracetamol"] ?? PHARMACY_DB["dolo"] ?? [];
    }

    if (stock.length === 0) {
      console.log(`[ZoikoAvail Debug] No stock data for medicine: "${canonicalKey}"`);
      return null;
    }

    const confidence = computeConfidence(stock, resolvedRegion);
    const cardState = computeCardState(confidence, stock, resolvedRegion);
    const regionLabel = resolvedRegion !== "any"
      ? resolvedRegion.charAt(0).toUpperCase() + resolvedRegion.slice(1)
      : "Kenya (nationwide)";
    const regionStock = resolvedRegion !== "any"
      ? stock.filter((s) => s.city.toLowerCase() === resolvedRegion)
      : stock;

    const result: AvailabilityResult = {
      medicine: canonicalKey.toUpperCase(),
      region: regionLabel,
      confidence,
      cardState,
      stockingPharmacies: regionStock.length,
      totalPharmacies: stock.length,
      pharmacies: regionStock.map((s) => ({
        id: s.pharmacyId,
        name: s.name,
        address: s.address,
        city: s.city,
        phone: s.phone,
        reportedAt: s.reportedAt,
      })),
      timestamp: new Date().toLocaleTimeString("en-KE", {
        hour: "2-digit", minute: "2-digit", timeZone: "Africa/Nairobi",
      }) + " EAT",
      source: "ZoikoAvail\u2122",
    };

    console.log(`[ZoikoAvail Debug] lookupAvailability SUCCESS: medicine="${canonicalKey}", region="${resolvedRegion}", cardState="${result.cardState}", pharmacies=${result.stockingPharmacies}`);
    return result;
  } catch (err) {
    console.error(`[ZoikoAvail Debug] lookupAvailability ERROR:`, err);
    return null;
  }
}