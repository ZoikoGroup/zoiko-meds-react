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
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.95 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-24T09:15:00+00:00", signalStrength: 0.92 },
    { pharmacyId: 103, name: "LloydsPharmacy Market St", address: "Market St, Manchester", city: "Manchester", phone: "+44 161 832 0111", reportedAt: "2026-07-24T08:00:00+00:00", signalStrength: 0.89 },
    { pharmacyId: 104, name: "Well Pharmacy New St", address: "New St, Birmingham", city: "Birmingham", phone: "+44 121 643 0222", reportedAt: "2026-07-24T09:30:00+00:00", signalStrength: 0.91 },
    { pharmacyId: 105, name: "Princes St Chemist", address: "Princes St, Edinburgh", city: "Edinburgh", phone: "+44 131 225 0333", reportedAt: "2026-07-24T07:45:00+00:00", signalStrength: 0.87 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.96 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.91 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-24T08:15:00-07:00", signalStrength: 0.93 },
    { pharmacyId: 109, name: "Boston Medical Center Pharmacy", address: "Harrison Ave, Boston", city: "Boston", phone: "+1 617 555 0188", reportedAt: "2026-07-24T09:00:00-04:00", signalStrength: 0.88 },
    { pharmacyId: 110, name: "Texas Health Pharmacy", address: "Main St, Houston", city: "Houston", phone: "+1 713 555 0122", reportedAt: "2026-07-24T08:30:00-05:00", signalStrength: 0.90 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-24T08:30:00+03:00", signalStrength: 0.92 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-24T07:45:00+03:00", signalStrength: 0.95 },
  ],
  metformin: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.94 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.91 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.88 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-24T08:15:00-07:00", signalStrength: 0.90 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-24T08:30:00+03:00", signalStrength: 0.90 },
  ],
  omeprazole: [
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-24T09:15:00+00:00", signalStrength: 0.93 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.89 },
    { pharmacyId: 109, name: "Boston Medical Center Pharmacy", address: "Harrison Ave, Boston", city: "Boston", phone: "+1 617 555 0188", reportedAt: "2026-07-24T09:00:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-24T09:15:00+03:00", signalStrength: 0.87 },
  ],
  atorvastatin: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.96 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-24T08:15:00-07:00", signalStrength: 0.91 },
  ],
  paracetamol: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.98 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-24T09:15:00+00:00", signalStrength: 0.97 },
    { pharmacyId: 103, name: "LloydsPharmacy Market St", address: "Market St, Manchester", city: "Manchester", phone: "+44 161 832 0111", reportedAt: "2026-07-24T08:00:00+00:00", signalStrength: 0.95 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.96 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.95 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-24T08:30:00+03:00", signalStrength: 0.96 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-24T09:15:00+03:00", signalStrength: 0.94 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-24T07:45:00+03:00", signalStrength: 0.97 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-24T06:30:00+03:00", signalStrength: 0.91 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-24T08:00:00+03:00", signalStrength: 0.88 },
  ],
  dolo: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.93 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-24T09:15:00+00:00", signalStrength: 0.91 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.90 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-24T08:15:00-07:00", signalStrength: 0.88 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-24T09:15:00+03:00", signalStrength: 0.89 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-24T07:45:00+03:00", signalStrength: 0.86 },
    { pharmacyId: 10, name: "Eldoret Chemist", address: "Uganda Rd, Eldoret", city: "Eldoret", phone: "0777 890 123", reportedAt: "2026-07-24T05:45:00+03:00", signalStrength: 0.83 },
  ],
  aspirin: [
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.89 },
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.91 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-24T08:30:00+03:00", signalStrength: 0.55 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-24T06:30:00+03:00", signalStrength: 0.48 },
  ],
  ibuprofen: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.95 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-24T09:15:00+00:00", signalStrength: 0.93 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.96 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-24T08:15:00-07:00", signalStrength: 0.92 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-24T08:00:00+03:00", signalStrength: 0.76 },
  ],
  cetirizine: [
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-24T09:15:00+00:00", signalStrength: 0.94 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-24T09:45:00-05:00", signalStrength: 0.90 },
  ],
  amoxiclav: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-24T08:30:00+00:00", signalStrength: 0.96 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "Broadway, New York", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-24T10:00:00-04:00", signalStrength: 0.93 },
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

export const VALID_REGIONS = [
  "london",
  "westminster",
  "manchester",
  "birmingham",
  "edinburgh",
  "glasgow",
  "new york",
  "chicago",
  "los angeles",
  "boston",
  "houston",
  "phoenix",
  "san diego",
  "dallas",
  "nakuru",
  "nairobi",
  "kisumu",
  "nyeri",
  "meru",
  "eldoret",
  "mombasa",
];

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
      timestamp: (() => {
        const ukCities = ["london", "westminster", "manchester", "birmingham"];
        const usCities = ["new york", "chicago", "los angeles", "boston"];
        const tz = ukCities.includes(resolvedRegion) ? "Europe/London"
          : usCities.includes(resolvedRegion) ? "America/New_York"
          : "Africa/Nairobi";
        const label = ukCities.includes(resolvedRegion) ? "BST"
          : usCities.includes(resolvedRegion) ? "EDT"
          : "EAT";
        return new Date().toLocaleTimeString("en-US", {
          hour: "2-digit", minute: "2-digit", timeZone: tz,
        }) + " " + label;
      })(),
      source: "ZoikoAvail\u2122",
    };

    console.log(`[ZoikoAvail Debug] lookupAvailability SUCCESS: medicine="${canonicalKey}", region="${resolvedRegion}", cardState="${result.cardState}", pharmacies=${result.stockingPharmacies}`);
    return result;
  } catch (err) {
    console.error(`[ZoikoAvail Debug] lookupAvailability ERROR:`, err);
    return null;
  }
}