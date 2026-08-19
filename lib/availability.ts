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

export type CardState = "available" | "limited" | "unavailable" | "insufficient-signal" | "stale-data";

export interface AvailabilityResult {
  medicine: string;
  region: string;
  confidence: ConfidenceResult;
  cardState: CardState;
  stockingPharmacies: number;
  totalPharmacies: number;
  pharmacies: { id: number; name: string; address: string; city: string; phone: string; reportedAt: string }[];
  timestamp: string;
  source: string;
}

export interface WebhookInventoryPayload {
  pharmacyId: number;
  pharmacyName: string;
  address?: string;
  city: string;
  phone?: string;
  medicine: string;
  status: "in_stock" | "limited" | "out_of_stock";
  quantity?: number;
  reportedAt?: string;
}

const LIVE_SIGNAL_STORE: Record<string, StockEntry[]> = {};

export function updatePharmacyInventorySignal(payload: WebhookInventoryPayload): { success: boolean; canonicalMedicine: string; entry: StockEntry } | null {
  const canonicalMedicine = resolveMedicine(payload.medicine);
  if (!canonicalMedicine) return null;

  const signalStrength = payload.status === "in_stock" ? 0.98 : payload.status === "limited" ? 0.65 : 0.05;
  const entry: StockEntry = {
    pharmacyId: payload.pharmacyId,
    name: payload.pharmacyName,
    address: payload.address || "Partner Pharmacy Location",
    city: payload.city,
    phone: payload.phone || "+1 800 555 0199",
    reportedAt: payload.reportedAt || new Date().toISOString(),
    signalStrength,
  };

  if (!LIVE_SIGNAL_STORE[canonicalMedicine]) {
    LIVE_SIGNAL_STORE[canonicalMedicine] = [];
  }

  const existingIdx = LIVE_SIGNAL_STORE[canonicalMedicine].findIndex((e) => e.pharmacyId === payload.pharmacyId);
  if (existingIdx >= 0) {
    LIVE_SIGNAL_STORE[canonicalMedicine][existingIdx] = entry;
  } else {
    LIVE_SIGNAL_STORE[canonicalMedicine].push(entry);
  }

  return { success: true, canonicalMedicine, entry };
}

export function clearLiveSignalStore(): void {
  for (const k of Object.keys(LIVE_SIGNAL_STORE)) {
    delete LIVE_SIGNAL_STORE[k];
  }
}


const PHARMACY_DB: Record<string, StockEntry[]> = {
  amoxicillin: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.95 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-28T09:15:00+00:00", signalStrength: 0.92 },
    { pharmacyId: 103, name: "LloydsPharmacy Market St", address: "Market St, Manchester", city: "Manchester", phone: "+44 161 832 0111", reportedAt: "2026-07-28T08:00:00+00:00", signalStrength: 0.89 },
    { pharmacyId: 104, name: "Well Pharmacy New St", address: "New St, Birmingham", city: "Birmingham", phone: "+44 121 643 0222", reportedAt: "2026-07-28T09:30:00+00:00", signalStrength: 0.91 },
    { pharmacyId: 105, name: "Princes St Chemist", address: "Princes St, Edinburgh", city: "Edinburgh", phone: "+44 131 225 0333", reportedAt: "2026-07-28T07:45:00+00:00", signalStrength: 0.87 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.96 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 112, name: "Duane Reade Wall Street", address: "100 Broadway, Financial District", city: "New York", phone: "+1 212 555 0340", reportedAt: "2026-07-28T08:45:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.91 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-28T08:15:00-07:00", signalStrength: 0.93 },
    { pharmacyId: 109, name: "Boston Medical Center Pharmacy", address: "Harrison Ave, Boston", city: "Boston", phone: "+1 617 555 0188", reportedAt: "2026-07-28T09:00:00-04:00", signalStrength: 0.88 },
    { pharmacyId: 110, name: "Texas Health Pharmacy", address: "Main St, Houston", city: "Houston", phone: "+1 713 555 0122", reportedAt: "2026-07-28T08:30:00-05:00", signalStrength: 0.90 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-28T08:30:00+03:00", signalStrength: 0.92 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-28T07:45:00+03:00", signalStrength: 0.95 },
  ],
  metformin: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.94 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.91 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.93 },
    { pharmacyId: 113, name: "Rite Aid 8th Ave", address: "301 8th Ave, Chelsea", city: "New York", phone: "+1 212 555 0488", reportedAt: "2026-07-28T11:15:00-04:00", signalStrength: 0.89 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.88 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-28T08:15:00-07:00", signalStrength: 0.90 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-28T08:30:00+03:00", signalStrength: 0.90 },
  ],
  omeprazole: [
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-28T09:15:00+00:00", signalStrength: 0.93 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.90 },
    { pharmacyId: 112, name: "Duane Reade Wall Street", address: "100 Broadway, Financial District", city: "New York", phone: "+1 212 555 0340", reportedAt: "2026-07-28T08:45:00-04:00", signalStrength: 0.91 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.89 },
    { pharmacyId: 109, name: "Boston Medical Center Pharmacy", address: "Harrison Ave, Boston", city: "Boston", phone: "+1 617 555 0188", reportedAt: "2026-07-28T09:00:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-28T09:15:00+03:00", signalStrength: 0.87 },
  ],
  atorvastatin: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.96 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.95 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-28T08:15:00-07:00", signalStrength: 0.91 },
  ],
  paracetamol: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.98 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-28T09:15:00+00:00", signalStrength: 0.97 },
    { pharmacyId: 103, name: "LloydsPharmacy Market St", address: "Market St, Manchester", city: "Manchester", phone: "+44 161 832 0111", reportedAt: "2026-07-28T08:00:00+00:00", signalStrength: 0.95 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.96 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.95 },
    { pharmacyId: 112, name: "Duane Reade Wall Street", address: "100 Broadway, Financial District", city: "New York", phone: "+1 212 555 0340", reportedAt: "2026-07-28T08:45:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 114, name: "Capsule Digital Pharmacy", address: "113 W 25th St, New York", city: "New York", phone: "+1 212 555 0512", reportedAt: "2026-07-28T10:30:00-04:00", signalStrength: 0.97 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.95 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-28T08:30:00+03:00", signalStrength: 0.96 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-28T09:15:00+03:00", signalStrength: 0.94 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-28T07:45:00+03:00", signalStrength: 0.97 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-28T06:30:00+03:00", signalStrength: 0.91 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-28T08:00:00+03:00", signalStrength: 0.88 },
    { pharmacyId: 115, name: "Apollo Pharmacy Connaught Place", address: "Connaught Place, New Delhi", city: "Delhi", phone: "+91 11 2341 5678", reportedAt: "2026-07-28T09:00:00+05:30", signalStrength: 0.96 },
    { pharmacyId: 116, name: "MedPlus Pharmacy South Ext", address: "South Extension II, New Delhi", city: "Delhi", phone: "+91 11 4164 1234", reportedAt: "2026-07-28T08:30:00+05:30", signalStrength: 0.94 },
  ],
  dolo: [
    { pharmacyId: 115, name: "Apollo Pharmacy Connaught Place", address: "Connaught Place, New Delhi", city: "Delhi", phone: "+91 11 2341 5678", reportedAt: "2026-07-28T09:00:00+05:30", signalStrength: 0.97 },
    { pharmacyId: 116, name: "MedPlus Pharmacy South Ext", address: "South Extension II, New Delhi", city: "Delhi", phone: "+91 11 4164 1234", reportedAt: "2026-07-28T08:30:00+05:30", signalStrength: 0.95 },
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.93 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-28T09:15:00+00:00", signalStrength: 0.91 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 112, name: "Duane Reade Wall Street", address: "100 Broadway, Financial District", city: "New York", phone: "+1 212 555 0340", reportedAt: "2026-07-28T08:45:00-04:00", signalStrength: 0.91 },
    { pharmacyId: 113, name: "Rite Aid 8th Ave", address: "301 8th Ave, Chelsea", city: "New York", phone: "+1 212 555 0488", reportedAt: "2026-07-28T11:15:00-04:00", signalStrength: 0.89 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.90 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-28T08:15:00-07:00", signalStrength: 0.88 },
    { pharmacyId: 2, name: "MediCare Chemist", address: "Moi Rd, Nakuru", city: "Nakuru", phone: "0700 789 012", reportedAt: "2026-07-28T09:15:00+03:00", signalStrength: 0.89 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-28T07:45:00+03:00", signalStrength: 0.86 },
    { pharmacyId: 10, name: "Eldoret Chemist", address: "Uganda Rd, Eldoret", city: "Eldoret", phone: "0777 890 123", reportedAt: "2026-07-28T05:45:00+03:00", signalStrength: 0.83 },
  ],
  aspirin: [
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.90 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.89 },
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.91 },
    { pharmacyId: 1, name: "HealthPlus Pharmacy", address: "Kenyatta Ave, Nakuru", city: "Nakuru", phone: "0700 123 456", reportedAt: "2026-07-28T08:30:00+03:00", signalStrength: 0.55 },
    { pharmacyId: 5, name: "Nairobi West Pharmacy", address: "Ngong Rd, Nairobi", city: "Nairobi", phone: "0722 345 678", reportedAt: "2026-07-28T06:30:00+03:00", signalStrength: 0.48 },
  ],
  ibuprofen: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.95 },
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-28T09:15:00+00:00", signalStrength: 0.93 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.96 },
    { pharmacyId: 112, name: "Duane Reade Wall Street", address: "100 Broadway, Financial District", city: "New York", phone: "+1 212 555 0340", reportedAt: "2026-07-28T08:45:00-04:00", signalStrength: 0.93 },
    { pharmacyId: 114, name: "Capsule Digital Pharmacy", address: "113 W 25th St, New York", city: "New York", phone: "+1 212 555 0512", reportedAt: "2026-07-28T10:30:00-04:00", signalStrength: 0.94 },
    { pharmacyId: 108, name: "Rite Aid Wilshire", address: "Wilshire Blvd, Los Angeles", city: "Los Angeles", phone: "+1 310 555 0177", reportedAt: "2026-07-28T08:15:00-07:00", signalStrength: 0.92 },
    { pharmacyId: 6, name: "Goodlife Pharmacy", address: "Kenyatta Ave, Kisumu", city: "Kisumu", phone: "0733 456 789", reportedAt: "2026-07-28T08:00:00+03:00", signalStrength: 0.76 },
  ],
  cetirizine: [
    { pharmacyId: 102, name: "Superdrug Pharmacy", address: "Strand, Westminster", city: "Westminster", phone: "+44 20 7946 0456", reportedAt: "2026-07-28T09:15:00+00:00", signalStrength: 0.94 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.92 },
    { pharmacyId: 107, name: "Walgreens Chemist", address: "Michigan Ave, Chicago", city: "Chicago", phone: "+1 312 555 0144", reportedAt: "2026-07-28T09:45:00-05:00", signalStrength: 0.90 },
  ],
  amoxiclav: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.96 },
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.93 },
    { pharmacyId: 111, name: "Walgreens Pharmacy 5th Ave", address: "350 5th Ave, Midtown", city: "New York", phone: "+1 212 555 0220", reportedAt: "2026-07-28T09:30:00-04:00", signalStrength: 0.91 },
  ],
  morphine: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.92 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-28T07:45:00+03:00", signalStrength: 0.88 },
  ],
  diazepam: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.90 },
    { pharmacyId: 4, name: "Pristine Medics", address: "Mfangano St, Nairobi", city: "Nairobi", phone: "0711 234 567", reportedAt: "2026-07-28T07:45:00+03:00", signalStrength: 0.85 },
  ],
  fentanyl: [
    { pharmacyId: 101, name: "Boots Pharmacy", address: "Oxford St, London", city: "London", phone: "+44 20 7946 0123", reportedAt: "2026-07-28T08:30:00+00:00", signalStrength: 0.91 },
  ],
  oxycodone: [
    { pharmacyId: 106, name: "CVS Pharmacy Broadway", address: "1500 Broadway, Times Square", city: "New York", phone: "+1 212 555 0199", reportedAt: "2026-07-28T10:00:00-04:00", signalStrength: 0.94 },
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
  morphine: "morphine",
  diazepam: "diazepam",
  fentanyl: "fentanyl",
  oxycodone: "oxycodone",
  alprazolam: "alprazolam",
  tramadol: "tramadol",
  codeine: "codeine",
  buprenorphine: "buprenorphine",
  lorazepam: "lorazepam",
  clonazepam: "clonazepam",
  midazolam: "midazolam",
  zolpidem: "zolpidem",
  methylphenidate: "methylphenidate",
  mifepristone: "mifepristone",
  misoprostol: "misoprostol",
  isotretinoin: "isotretinoin",
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
  "delhi",
  "mumbai",
  "hyderabad",
  "bangalore",
  "bengaluru",
  "chennai",
  "kolkata",
  "pune",
  "ahmedabad",
  "toronto",
  "sydney",
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
  const sortedAliases = Object.keys(MEDICINE_ALIASES).sort((a, b) => b.length - a.length);
  for (const alias of sortedAliases) {
    const regex = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (regex.test(lower)) {
      return MEDICINE_ALIASES[alias];
    }
  }
  return null;
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

function computeCardState(confidence: ConfidenceResult, stock: StockEntry[], region: string): CardState {
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

/**
 * Connects to live remote inventory API endpoint if LIVE_INVENTORY_API_URL is configured
 */
export async function fetchLiveStockFromApi(
  canonicalMedicine: string,
  region?: string
): Promise<StockEntry[] | null> {
  const apiUrl = process.env.LIVE_INVENTORY_API_URL;
  if (!apiUrl) return null;

  const apiKey = process.env.LIVE_INVENTORY_API_KEY;
  const timeoutMs = Number(process.env.LIVE_INVENTORY_TIMEOUT_MS) || 3000;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = new URL(apiUrl);
    url.searchParams.set("medicine", canonicalMedicine);
    if (region && region !== "any") {
      url.searchParams.set("region", region);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[ZoikoAvail Live API] Returned HTTP status ${response.status}`);
      return null;
    }

    const data = await response.json();
    const list = Array.isArray(data.pharmacies) ? data.pharmacies : Array.isArray(data) ? data : null;

    if (list !== null) {
      return list.map((p: Record<string, unknown>, idx: number) => ({
        pharmacyId: Number(p.id || p.pharmacyId) || idx + 1000,
        name: String(p.name || "Partner Pharmacy"),
        address: String(p.address || "Main St"),
        city: String(p.city || region || "Nairobi"),
        phone: String(p.phone || "+254000000000"),
        reportedAt: String(p.reportedAt || new Date().toISOString()),
        signalStrength: typeof p.signalStrength === "number" ? p.signalStrength : 0.95,
      }));
    }
    return null;
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[ZoikoAvail Live API] Fetch error or timeout:`, errorMsg);
    return null;
  }
}

/**
 * Async lookup for live API integration with configurable strict live mode
 */
export async function lookupAvailabilityAsync(params: LookupParams): Promise<AvailabilityResult | null> {
  const canonicalKey = resolveMedicine(params.medicine);
  if (!canonicalKey) return null;

  const rawRegion = params.region ? params.region.trim() : "any";
  let resolvedRegion = "any";
  if (rawRegion.toLowerCase() !== "any") {
    const extracted = extractRegion(rawRegion);
    if (extracted) {
      resolvedRegion = extracted;
    } else if (VALID_REGIONS.includes(rawRegion.toLowerCase())) {
      resolvedRegion = rawRegion.toLowerCase();
    } else {
      return null;
    }
  }

  const strictLiveOnly = process.env.DISABLE_LOCAL_FALLBACK === "true" || process.env.STRICT_LIVE_INVENTORY_ONLY === "true";

  // Tries live API first if configured
  const liveStock = await fetchLiveStockFromApi(canonicalKey, resolvedRegion);
  if (liveStock !== null) {
    const confidence = computeConfidence(liveStock, resolvedRegion);
    const cardState = computeCardState(confidence, liveStock, resolvedRegion);
    const regionLabel = resolvedRegion !== "any"
      ? resolvedRegion.charAt(0).toUpperCase() + resolvedRegion.slice(1)
      : "Nationwide Live Signal";

    const regionStock = resolvedRegion !== "any"
      ? liveStock.filter((s) => s.city.toLowerCase() === resolvedRegion)
      : liveStock;

    return {
      medicine: canonicalKey.toUpperCase(),
      region: regionLabel,
      confidence,
      cardState,
      stockingPharmacies: regionStock.length,
      totalPharmacies: liveStock.length,
      pharmacies: regionStock.map((s) => ({
        id: s.pharmacyId,
        name: s.name,
        address: s.address,
        city: s.city,
        phone: s.phone,
        reportedAt: s.reportedAt,
      })),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + " Live API",
      source: "ZoikoAvail™ Live Inventory API",
    };
  }

  // Check if Webhook live signal store has active entries for this medicine
  const webhookLiveStock = LIVE_SIGNAL_STORE[canonicalKey];
  if (webhookLiveStock && webhookLiveStock.length > 0) {
    const confidence = computeConfidence(webhookLiveStock, resolvedRegion);
    const cardState = computeCardState(confidence, webhookLiveStock, resolvedRegion);
    const regionLabel = resolvedRegion !== "any"
      ? resolvedRegion.charAt(0).toUpperCase() + resolvedRegion.slice(1)
      : "Nationwide Live Webhook Signal";

    const regionStock = resolvedRegion !== "any"
      ? webhookLiveStock.filter((s) => s.city.toLowerCase() === resolvedRegion)
      : webhookLiveStock;

    return {
      medicine: canonicalKey.toUpperCase(),
      region: regionLabel,
      confidence,
      cardState,
      stockingPharmacies: regionStock.length,
      totalPharmacies: webhookLiveStock.length,
      pharmacies: regionStock.map((s) => ({
        id: s.pharmacyId,
        name: s.name,
        address: s.address,
        city: s.city,
        phone: s.phone,
        reportedAt: s.reportedAt,
      })),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + " Live Webhook",
      source: "ZoikoAvail™ Live Webhook Signal",
    };
  }

  // Fallback to signal network database when live API is unconfigured or returns no data
  const localSignalResult = lookupAvailability(params);
  if (localSignalResult) {
    return localSignalResult;
  }

  if (strictLiveOnly) {
    return {
      medicine: canonicalKey.toUpperCase(),
      region: resolvedRegion !== "any" ? resolvedRegion.charAt(0).toUpperCase() + resolvedRegion.slice(1) : "Nationwide Network",
      confidence: { tier: "low", posterior: 0.05, sampleSize: 0 },
      cardState: "insufficient-signal",
      stockingPharmacies: 0,
      totalPharmacies: 0,
      pharmacies: [],
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + " Live API",
      source: "ZoikoAvail™ Live Inventory API",
    };
  }

  // Fallback to local signal database if strict mode is disabled
  return lookupAvailability(params);
}

/**
 * Synchronous availability lookup (local signal network)
 */
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

    let dbStock = PHARMACY_DB[canonicalKey] ?? [];
    if (dbStock.length === 0 && (canonicalKey === "dolo" || canonicalKey === "paracetamol")) {
      dbStock = PHARMACY_DB["paracetamol"] ?? PHARMACY_DB["dolo"] ?? [];
    }

    const webhookStock = LIVE_SIGNAL_STORE[canonicalKey] ?? [];
    const stockMap = new Map<number, StockEntry>();
    for (const item of dbStock) stockMap.set(item.pharmacyId, item);
    for (const item of webhookStock) stockMap.set(item.pharmacyId, item);
    const stock = Array.from(stockMap.values());

    if (stock.length === 0) {
      console.log(`[ZoikoAvail Debug] No stock data for medicine: "${canonicalKey}"`);
      return null;
    }

    const confidence = computeConfidence(stock, resolvedRegion);
    const cardState = computeCardState(confidence, stock, resolvedRegion);
    const regionLabel = resolvedRegion !== "any"
      ? resolvedRegion.charAt(0).toUpperCase() + resolvedRegion.slice(1)
      : "Nationwide Network";
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
      source: "ZoikoAvail™",
    };

    console.log(`[ZoikoAvail Debug] lookupAvailability SUCCESS: medicine="${canonicalKey}", region="${resolvedRegion}", cardState="${result.cardState}", pharmacies=${result.stockingPharmacies}`);
    return result;
  } catch (err) {
    console.error(`[ZoikoAvail Debug] lookupAvailability ERROR:`, err);
    return null;
  }
}