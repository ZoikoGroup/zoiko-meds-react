"use client";

import { useRef, useState, useCallback, useEffect, DragEvent, ChangeEvent } from "react";
import { searchMedicines, matchMedibase, type Confidence } from "@/lib/api";
import { internalApi } from "@/lib/config";

/* ─── types ─── */
interface Pharmacy {
  id: string; name: string; address: string;
  lat: number; lng: number; distanceKm?: number;
  phone?: string; rating?: number; openNow?: boolean;
  mapsUrl: string;
}
interface MedicineMatch {
  id: string; name: string; generic?: string; strength?: string;
  dosageForm?: string; category?: string;
  availabilityCount: number; bestConfidence?: Confidence;
}
interface SearchOutcome { medicines: MedicineMatch[]; pharmacies: Pharmacy[]; }

/* ─── helpers ─── */
function buildMapsUrl(dLat: number, dLng: number, oLat?: number, oLng?: number) {
  let u = `https://www.google.com/maps/dir/?api=1&destination=${dLat},${dLng}&travelmode=driving`;
  if (oLat && oLng) u += `&origin=${oLat},${oLng}`;
  return u;
}

/** Great-circle distance in km (used to sort/label fallback pharmacies). */
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.asin(Math.sqrt(a)) * 10) / 10;
}

const CONFIDENCE_ORDER: Record<string, number> = { HIGH: 3, MODERATE: 2, LOW: 1 };

const POPULAR_MEDICINES = [
  "Amoxicillin 500mg", "Amoxicillin 250mg", "Amoxiclav 625mg", "Advil", "Aspirin 75mg", "Atorvastatin 10mg", "Azithromycin 500mg",
  "Amlodipine 5mg", "Augmentin 625mg", "Aciloc 150mg", "Allegra 120mg",
  "Dolo 650", "Doxycycline 100mg", "Dulcolax", "Disprin", "Diabeta",
  "Ibuprofen 400mg", "Ibuprofen 200mg", "Isoniazid 300mg", "Isotretinoin 20mg", "Isosorbide Mononitrate 20mg", "Isosorbide Dinitrate 10mg", "Isabgol", "Isradipine 5mg", "Isoprenaline 10mg", "Isocarboxazid 10mg", "Isoflurane",
  "Metformin 500mg", "Metformin 1000mg", "Montelukast 10mg", "Motrin", "Meftal Spas", "Multivitamin",
  "Omeprazole 20mg", "Omeprazole 40mg", "Ocid 20mg", "Osetron 4mg", "Oflomac 200mg",
  "Paracetamol 650mg", "Paracetamol 500mg", "Pantoprazole 40mg", "Pan-D", "Pan 40", "Pregabalin 75mg", "Prilosec 20mg",
  "Telmisartan 40mg", "Telma 40", "Tylenol 500mg", "Trimox 500mg",
  "Zyrtec 10mg", "Zithromax 500mg", "Zantac 150mg", "Zero-Dol SP", "Zincovit",
];

/** Live medicine-name suggestions with strict substring/prefix filtering. */
async function getMedicineSuggestions(query: string, limit = 8): Promise<string[]> {
  const q = query.trim();
  if (q.length < 1) return [];
  const qLower = q.toLowerCase();

  try {
    const matches = await matchMedibase(q, limit * 3);
    const candidateSet = new Set<string>();

    // 1) Add candidates from master dictionary matching typed prefix
    for (const pop of POPULAR_MEDICINES) {
      if (pop.toLowerCase().includes(qLower)) {
        candidateSet.add(pop);
      }
    }

    // 2) Add candidates from backend API
    for (const m of matches) {
      if (m.canonicalName) candidateSet.add(m.canonicalName);
      if (m.genericName) candidateSet.add(m.genericName);
      if (Array.isArray(m.brandNames)) {
        for (const brand of m.brandNames) {
          if (brand) candidateSet.add(brand);
        }
      }
    }

    const allCandidates = Array.from(candidateSet);

    // STRICT PREFIX MATCHING: filter names that START with the typed query (case-insensitive)
    const prefixMatches = allCandidates.filter((name) =>
      name.toLowerCase().startsWith(qLower)
    );

    prefixMatches.sort((a, b) => a.localeCompare(b));

    // If we have prefix matches starting with the typed letters, return ONLY prefix matches!
    if (prefixMatches.length > 0) {
      return prefixMatches.slice(0, limit);
    }

    // Fallback: word-boundary matches (e.g. "Ibuprofen" for "bu")
    const wordBoundaryMatches = allCandidates.filter((name) => {
      const words = name.toLowerCase().split(/\s+/);
      return words.some((w) => w.startsWith(qLower));
    });
    wordBoundaryMatches.sort((a, b) => a.localeCompare(b));

    if (wordBoundaryMatches.length > 0) {
      return wordBoundaryMatches.slice(0, limit);
    }

    // Fallback: substring matches sorted by match index
    const subMatches = allCandidates.filter((name) =>
      name.toLowerCase().includes(qLower)
    );
    subMatches.sort((a, b) => {
      const idxA = a.toLowerCase().indexOf(qLower);
      const idxB = b.toLowerCase().indexOf(qLower);
      if (idxA !== idxB) return idxA - idxB;
      return a.localeCompare(b);
    });

    return subMatches.slice(0, limit);
  } catch {
    const localPrefix = POPULAR_MEDICINES.filter((name) =>
      name.toLowerCase().startsWith(qLower)
    );
    localPrefix.sort((a, b) => a.localeCompare(b));
    return localPrefix.slice(0, limit);
  }
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  if (!q) return <span>{text}</span>;
  const lower = text.toLowerCase();
  const index = lower.indexOf(q);
  if (index === -1) return <span>{text}</span>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + q.length);
  const after = text.slice(index + q.length);

  return (
    <span>
      {before}
      <span className="text-[#0FAA87] font-extrabold bg-[#EAFAF4] px-0.5 rounded">{match}</span>
      {after}
    </span>
  );
}

const CONFIDENCE_STYLE: Record<string, string> = {
  HIGH: "bg-[#f0faf5] text-[#0f7a53]",
  MODERATE: "bg-[#fff7e6] text-[#92600a]",
  LOW: "bg-[#fef2f2] text-[#b42318]",
};

/* ─── sub-components ─── */
function Spinner({ dark }: { dark?: boolean }) {
  return (
    <span
      className={`inline-block w-4 h-4 rounded-full border-2 animate-spin flex-shrink-0
        ${dark ? "border-[#e5e7eb] border-t-[#0D9A72]" : "border-white/40 border-t-white"}`}
    />
  );
}

function MedicineCard({ m }: { m: MedicineMatch }) {
  const rx = m.category ? m.category.toUpperCase() !== "OTC" : false;
  const meta = [m.generic, m.strength, m.dosageForm].filter(Boolean).join(" · ");
  return (
    <div className="border border-[#e5e7eb] rounded-xl px-4 py-3 mb-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-[#111827]">{m.name}</span>
            {m.category && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide
                ${rx ? "bg-[#eef2ff] text-[#4338ca]" : "bg-[#f0faf5] text-[#0f7a53]"}`}>
                {rx ? "Rx" : "OTC"}
              </span>
            )}
          </div>
          {meta && <div className="text-xs text-[#6b7280] mt-0.5">{meta}</div>}
          <div className="text-[11px] text-[#6b7280] mt-1">
            {m.availabilityCount > 0
              ? `Verified availability at ${m.availabilityCount} pharmac${m.availabilityCount === 1 ? "y" : "ies"}`
              : "No verified availability reported yet"}
          </div>
        </div>
        {m.availabilityCount > 0 && m.bestConfidence && (
          <span className={`font-bold text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap uppercase tracking-wide flex-shrink-0
            ${CONFIDENCE_STYLE[String(m.bestConfidence).toUpperCase()] ?? "bg-[#f1f5f9] text-[#475569]"}`}>
            {String(m.bestConfidence).toLowerCase()}
          </span>
        )}
      </div>
    </div>
  );
}

function PharmacyCard({ p, origin }: { p: Pharmacy; origin?: { lat?: number; lng?: number } }) {
  const url = p.mapsUrl || buildMapsUrl(p.lat, p.lng, origin?.lat, origin?.lng);
  const distVal = p.distanceKm == null ? (origin?.lat && origin?.lng ? distanceKm(origin.lat, origin.lng, p.lat, p.lng) : null) : Math.round(p.distanceKm * 10) / 10;
  const dist = distVal == null ? "" : distVal < 0.1 ? "0 km" : `${distVal} km`;
  return (
    <a
      href={url} target="_blank" rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 border border-[#e5e7eb] rounded-xl px-4 py-3.5 mb-2.5
        transition-all duration-200 no-underline text-inherit
        hover:border-[#0D9A72] hover:shadow-[0_2px_14px_rgba(13,154,114,0.12)] hover:bg-[#f0faf5]"
    >
      <div className="min-w-0">
        <div className="text-sm font-bold text-[#111827]">{p.name}</div>
        <div className="text-xs text-[#5B6478] mt-0.5 truncate">
          {dist ? `About ${dist} away · ` : ""}{p.address}{p.phone ? ` · ${p.phone}` : ""}
        </div>
        {(p.rating != null || p.openNow != null) && (
          <div className="text-[11px] text-[#6b7280] mt-1 flex items-center gap-2.5">
            {p.rating != null && <span>★ {p.rating}</span>}
            {p.openNow != null && (
              <span className={p.openNow ? "text-[#0f7a53] font-semibold" : "text-[#b42318]"}>
                {p.openNow ? "Open now" : "Closed"}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {dist && <span className="bg-[#f0faf5] text-[#25a874] font-bold text-sm px-3.5 py-1 rounded-full whitespace-nowrap">{dist}</span>}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0D9A72" strokeWidth={2} className="w-4 h-4">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

function ResultsBlock({ outcome, loading, origin }: {
  outcome: SearchOutcome | null; loading: boolean; origin?: { lat?: number; lng?: number };
}) {
  if (loading) return (
    <div className="flex items-center gap-2.5 justify-center py-6 text-sm text-[#6b7280]">
      <Spinner dark /> Searching medicines &amp; nearby pharmacies…
    </div>
  );
  if (!outcome) return null;
  const { medicines, pharmacies } = outcome;
  if (medicines.length === 0 && pharmacies.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-[#6b7280] mt-4">
        No matches found. Try a different medicine name, location, or a larger distance.
      </div>
    );
  }
  return (
    <div className="mt-4 space-y-5">
      {medicines.length > 0 && (
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-3 font-bold text-sm text-[#111827]">
            Medicine matches
            <span className="bg-[#1E2F6E] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">{medicines.length}</span>
          </div>
          {medicines.map((m) => <MedicineCard key={m.id} m={m} />)}
        </div>
      )}
      {pharmacies.length > 0 && (
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-3 font-bold text-sm text-[#111827]">
            Pharmacies near you
            <span className="bg-[#0D9A72] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">{pharmacies.length}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#6b7280] mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Click any card to get directions in Google Maps
          </div>
          {pharmacies.map((p) => <PharmacyCard key={p.id} p={p} origin={origin} />)}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN WIDGET
═══════════════════════════════════════════ */
export default function MedicineSearchWidget() {
  const [tab, setTab] = useState<"name" | "scan">("name");

  /* tab 1 state */
  const [medicine, setMedicine] = useState("");
  const [locationText, setLocationText] = useState("");
  const [radius, setRadius] = useState(25);
  const [userLat, setUserLat] = useState<number | undefined>();
  const [userLng, setUserLng] = useState<number | undefined>();
  const [locBtnLabel, setLocBtnLabel] = useState("Use my current location");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<SearchOutcome | null>(null);
  const [lastMedicine, setLastMedicine] = useState("");
  const [lastLat, setLastLat] = useState<number | undefined>();
  const [lastLng, setLastLng] = useState<number | undefined>();

  /* medicine autocomplete state */
  const [medSuggestions, setMedSuggestions] = useState<string[]>([]);
  const [showMedSuggestions, setShowMedSuggestions] = useState(false);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(-1);
  const medicineFieldRef = useRef<HTMLDivElement>(null);
  const medDebounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const medReqSeq = useRef(0);

  /* tab 2 state */
  const [scanFile, setScanFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanLocText, setScanLocText] = useState("");
  const [scanLat, setScanLat] = useState<number | undefined>();
  const [scanLng, setScanLng] = useState<number | undefined>();
  const [scanLocLabel, setScanLocLabel] = useState("Use my current location");
  const [scanRadius, setScanRadius] = useState(25);
  const [scanning, setScanning] = useState(false);
  const [scannedMeds, setScannedMeds] = useState<string[]>([]);
  const [selectedMeds, setSelectedMeds] = useState<Set<string>>(new Set());
  const [scanResults, setScanResults] = useState<{ [med: string]: SearchOutcome | null }>({});
  const [scanSearching, setScanSearching] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef    = useRef<HTMLInputElement>(null);
  const galleryRef   = useRef<HTMLInputElement>(null);

  /* ─── close suggestions when clicking outside ─── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (medicineFieldRef.current && !medicineFieldRef.current.contains(e.target as Node)) {
        setShowMedSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ─── medicine input change → debounced live suggestions ─── */
  const handleMedicineChange = (value: string) => {
    setMedicine(value);
    setActiveSuggestionIdx(-1);
    if (medDebounceRef.current) clearTimeout(medDebounceRef.current);
    if (value.trim().length < 1) {
      setMedSuggestions([]);
      setShowMedSuggestions(false);
      return;
    }
    const seq = ++medReqSeq.current;
    medDebounceRef.current = setTimeout(async () => {
      const matches = await getMedicineSuggestions(value);
      if (seq !== medReqSeq.current) return; // a newer keystroke won
      setMedSuggestions(matches);
      setShowMedSuggestions(matches.length > 0);
    }, 150);
  };

  const selectSuggestion = (name: string) => {
    setMedicine(name);
    setShowMedSuggestions(false);
    setMedSuggestions([]);
    setActiveSuggestionIdx(-1);
  };

  const handleMedicineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMedSuggestions && medSuggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIdx((i) => (i + 1) % medSuggestions.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestionIdx((i) => (i <= 0 ? medSuggestions.length - 1 : i - 1));
        return;
      }
      if (e.key === "Enter" && activeSuggestionIdx >= 0) {
        e.preventDefault();
        selectSuggestion(medSuggestions[activeSuggestionIdx]);
        return;
      }
      if (e.key === "Escape") {
        setShowMedSuggestions(false);
        return;
      }
    }
    if (e.key === "Enter") handleSearch();
  };

  /* ─── Geocode helpers ─── */
  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<string> => {
    const r = await fetch(internalApi("medicine/reverse-geocode"), {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lat, lng }),
    });
    const d = await r.json();
    return d.success ? d.data.name : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }, []);

  const geocodeAddress = useCallback(async (address: string): Promise<{ lat: number; lng: number } | null> => {
    const r = await fetch(internalApi("medicine/geocode"), {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address }),
    });
    const d = await r.json();
    return d.success ? d.data : null;
  }, []);

  /* ─── Core search — live ZoikoMeds backend (/search) ─── */
  const doSearch = useCallback(async (
    med: string, lat: number, lng: number, rad: number
  ): Promise<SearchOutcome> => {
    try {
      const res = await searchMedicines({ q: med, lat, lng, maxDistance: rad });

      // 1) Matched medicines (with their best verified-availability signal).
      const medicines: MedicineMatch[] = (res.results ?? []).map((r) => {
        let best: Confidence | undefined;
        for (const a of r.availability ?? []) {
          if (!best || (CONFIDENCE_ORDER[String(a.confidence).toUpperCase()] ?? 0) >
                        (CONFIDENCE_ORDER[String(best).toUpperCase()] ?? 0)) {
            best = a.confidence;
          }
        }
        return {
          id: r.medicine.id,
          name: r.medicine.canonicalName,
          generic: r.medicine.genericName ?? undefined,
          strength: r.medicine.strength ?? undefined,
          dosageForm: r.medicine.dosageForm ?? undefined,
          category: r.medicine.prescriptionCategory ?? undefined,
          availabilityCount: (r.availability ?? []).length,
          bestConfidence: best,
        };
      });

      // 2) Pharmacies — prefer location-aware nearby results (Google Places);
      //    fall back to the verified-availability pharmacies when none returned.
      let pharmacies: Pharmacy[] = [];
      const nearby = res.nearbyPharmacies?.pharmacies ?? [];
      if (nearby.length > 0) {
        pharmacies = nearby.map((p, i) => ({
          id: p.placeId ?? `${p.name}-${i}`,
          name: p.name,
          address: p.address,
          lat: p.latitude,
          lng: p.longitude,
          distanceKm: p.distanceKm,
          phone: p.phone,
          rating: p.rating,
          openNow: p.openNow,
          mapsUrl: p.googleMapsUri ?? buildMapsUrl(p.latitude, p.longitude, lat, lng),
        }));
      } else {
        const byId = new Map<string, Pharmacy>();
        for (const r of res.results ?? []) {
          for (const a of r.availability ?? []) {
            const p = a.pharmacy;
            if (byId.has(p.id) || p.latitude == null || p.longitude == null) continue;
            byId.set(p.id, {
              id: p.id,
              name: p.name,
              address: [p.city, p.region].filter(Boolean).join(", "),
              lat: p.latitude,
              lng: p.longitude,
              distanceKm: distanceKm(lat, lng, p.latitude, p.longitude),
              mapsUrl: buildMapsUrl(p.latitude, p.longitude, lat, lng),
            });
          }
        }
        pharmacies = Array.from(byId.values()).sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
      }

      return { medicines, pharmacies };
    } catch {
      return { medicines: [], pharmacies: [] };
    }
  }, []);

  /* ─── Tab 1: use location ─── */
  const handleGetMyLocation = useCallback(async (
    setLat: (v: number) => void, setLng: (v: number) => void,
    setInput: (v: string) => void, setLabel: (v: string) => void
  ) => {
    if (!navigator.geolocation) return;
    setLabel("Locating…");
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      setLat(lat); setLng(lng);
      setInput("Detecting location…");
      const name = await reverseGeocode(lat, lng);
      setInput(name);
      setLabel("Location set ✓");
    }, () => setLabel("Use my current location"));
  }, [reverseGeocode]);

  /* ─── Tab 1: search ─── */
  const handleSearch = useCallback(async (overrideRadius?: number) => {
    const rad = overrideRadius ?? radius;
    if (!medicine) return;
    let lat = userLat, lng = userLng;
    if (!lat || !lng) {
      if (!locationText) return;
      const geo = await geocodeAddress(locationText);
      if (!geo) { setResults({ medicines: [], pharmacies: [] }); return; }
      lat = geo.lat; lng = geo.lng;
    }
    setSearching(true); setResults(null);
    setLastMedicine(medicine); setLastLat(lat); setLastLng(lng);
    const locs = await doSearch(medicine, lat, lng, rad);
    setResults(locs); setSearching(false);
  }, [medicine, userLat, userLng, locationText, radius, doSearch, geocodeAddress]);

  /* radius change → re-search if already searched */
  const handleRadiusChange = useCallback((val: number) => {
    setRadius(val);
    if (lastLat && lastLng && lastMedicine) handleSearch(val);
  }, [lastLat, lastLng, lastMedicine, handleSearch]);

  /* ─── Tab 2: file handling & validation ─── */
  const validateFile = (file: File): string | null => {
    const allowedExts = [".jpg", ".jpeg", ".png", ".pdf", ".heic", ".heif"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    const isExtAllowed = allowedExts.includes(ext);
    const isMimeAllowed =
      !file.type ||
      file.type.startsWith("image/") ||
      file.type === "application/pdf" ||
      file.type === "application/octet-stream";

    if (!isExtAllowed && !isMimeAllowed) {
      return "Unsupported file type. Please upload a JPG, PNG, PDF, or HEIC file.";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "File size exceeds 10 MB limit. Please upload a smaller prescription file.";
    }
    return null;
  };

  const handleFile = (file: File) => {
    const err = validateFile(file);
    if (err) {
      setFileError(err);
      setScanFile(null);
      setScannedMeds([]);
      setSelectedMeds(new Set());
      setScanResults({});
      setScanError(null);
      return;
    }
    setFileError(null);
    setScanFile(file);
    setScannedMeds([]);
    setSelectedMeds(new Set());
    setScanResults({});
    setScanError(null);
  };

  const handleRemoveFile = () => {
    setScanFile(null);
    setFileError(null);
    setScanError(null);
    setScannedMeds([]);
    setSelectedMeds(new Set());
    setScanResults({});
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  /* ─── Tab 2: scan ─── */
  const handleScan = useCallback(async () => {
    if (!scanFile) {
      setScanError("Please select a prescription file first.");
      return;
    }
    setScanning(true);
    setScannedMeds([]);
    setSelectedMeds(new Set());
    setScanResults({});
    setScanError(null);

    try {
      const fd = new FormData();
      fd.append("prescription", scanFile);
      const r = await fetch(internalApi("medicine/scan"), { method: "POST", body: fd });
      const d = await r.json();

      if (d.success && Array.isArray(d.data?.medicines)) {
        const meds: string[] = d.data.medicines;
        if (meds.length > 0) {
          setScannedMeds(meds);
          setSelectedMeds(new Set(meds));
          setScanError(null);
        } else {
          setScannedMeds([]);
          setSelectedMeds(new Set());
          setScanError("No medicines could be detected. Please upload a clearer prescription or try another image.");
        }
      } else {
        setScannedMeds([]);
        setSelectedMeds(new Set());
        setScanError(d.error || "We couldn't scan this prescription. Please try again or upload a clearer image.");
      }
    } catch {
      setScannedMeds([]);
      setSelectedMeds(new Set());
      setScanError("We couldn't scan this prescription. Please try again or upload a clearer image.");
    } finally {
      setScanning(false);
    }
  }, [scanFile]);

  /* ─── Tab 2: search selected meds ─── */
  const handleScanSearch = useCallback(async (overrideRadius?: number) => {
    const rad = overrideRadius ?? scanRadius;
    if (!selectedMeds.size) return;
    let lat = scanLat, lng = scanLng;
    if (!lat || !lng) {
      if (!scanLocText) return;
      const geo = await geocodeAddress(scanLocText);
      if (!geo) return;
      lat = geo.lat; lng = geo.lng;
    }
    setScanSearching(true);
    const entries = await Promise.all(
      Array.from(selectedMeds).map(async (med) => [med, await doSearch(med, lat!, lng!, rad)] as [string, SearchOutcome])
    );
    setScanResults(Object.fromEntries(entries));
    setScanSearching(false);
  }, [selectedMeds, scanLat, scanLng, scanLocText, scanRadius, doSearch, geocodeAddress]);

  const handleScanRadiusChange = (val: number) => {
    setScanRadius(val);
    if (Object.keys(scanResults).length > 0) handleScanSearch(val);
  };

  const RADII = [5, 10, 15, 20, 25, 30, 35, 40, 50];

  return (
    <div className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(0,0,0,0.12)] border border-[#e5e7eb] p-6 sm:p-8 w-full">

      {/* ── TABS ── */}
      <div className="flex bg-[#F0F3F9] rounded-xl p-1 gap-1 mb-6 max-w-md mx-auto">
        {(["name", "scan"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-[10px] text-xs font-medium
              transition-all duration-200 whitespace-nowrap
              ${tab === t ? "bg-white text-[#0D1A33] shadow-[0_1px_6px_rgba(0,0,0,0.10)]" : "text-[#6A7A9A] hover:text-[#0D1A33]"}`}
          >
            {t === "name" ? (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Search by name</>
            ) : (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>Scan prescription</>
            )}
          </button>
        ))}
      </div>

      {/* ══ TAB 1: SEARCH BY NAME ══ */}
      {tab === "name" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-start">
            {/* Medicine Name — with autocomplete */}
            <div ref={medicineFieldRef} className="relative">
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#64748B] mb-1.5">Medicine Name</label>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                  <path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 017-7l7 7a4.95 4.95 0 01-7 7z"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <input
                  value={medicine}
                  onChange={(e) => handleMedicineChange(e.target.value)}
                  onFocus={() => { if (medSuggestions.length > 0) setShowMedSuggestions(true); }}
                  onKeyDown={handleMedicineKeyDown}
                  placeholder="Enter a medicine name, brand, or generic"
                  autoComplete="off"
                  className="w-full h-11 pl-9 pr-3 border-[1.5px] border-[#CBD5E1] rounded-[10px] text-sm text-[#0F1F4E] font-semibold
                    placeholder:text-[#64748B] placeholder:font-normal bg-white focus:outline-none focus:border-[#0FAA87] focus:ring-[3px] focus:ring-[#0FAA87]/15 transition"
                />
              </div>

              {/* suggestions dropdown */}
              {showMedSuggestions && medSuggestions.length > 0 && (
                <div
                  className="absolute z-20 left-0 right-0 mt-1.5 bg-white border-[1.5px] border-[#CBD5E1] rounded-[10px]
                    shadow-[0_8px_28px_rgba(15,31,78,0.12)] max-h-64 overflow-y-auto"
                >
                  {medSuggestions.map((name, idx) => (
                    <button
                      key={name}
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); selectSuggestion(name); }}
                      onMouseEnter={() => setActiveSuggestionIdx(idx)}
                      className={`w-full flex items-center gap-2.5 text-left px-3.5 py-2.5 text-sm transition-colors
                        ${idx === activeSuggestionIdx ? "bg-[#f0faf5] text-[#0FAA87]" : "text-[#0F1F4E] hover:bg-[#f8fafc]"}
                        ${idx !== 0 ? "border-t border-[#f1f5f9]" : ""}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 flex-shrink-0 opacity-60">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <span className="font-semibold"><HighlightMatch text={name} query={medicine} /></span>
                    </button>
                  ))}
                </div>
              )}

              <p className="text-[11.5px] text-[#5B6478] mt-1.5 leading-snug font-medium">
                Enter a medicine name only. Do not enter symptoms, diagnoses, insurance details, or prescription images.
              </p>
            </div>

            {/* Search Area */}
            <div>
              <label className="block text-[11px] font-bold tracking-wider uppercase text-[#334155] mb-1.5">Search Area</label>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <input
                  value={locationText}
                  onChange={(e) => { setLocationText(e.target.value); setUserLat(undefined); setUserLng(undefined); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="City, ZIP code, postcode, or current location"
                  className="w-full h-11 pl-9 pr-3 border-[1.5px] border-[#CBD5E1] rounded-[10px] text-sm text-[#0F1F4E] font-semibold
                    placeholder:text-[#64748B] placeholder:font-normal bg-white focus:outline-none focus:border-[#0FAA87] focus:ring-[3px] focus:ring-[#0FAA87]/15 transition"
                />
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => handleGetMyLocation(setUserLat, setUserLng, setLocationText, setLocBtnLabel)}
                  className="flex items-center gap-1.5 text-[#0D9A72] text-[12.5px] font-semibold hover:opacity-70 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#0D9A72" strokeWidth={2.5} className="w-3 h-3">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {locBtnLabel}
                </button>
                {locBtnLabel === "Location set ✓" && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocationText("");
                      setUserLat(undefined);
                      setUserLng(undefined);
                      setLocBtnLabel("Use my current location");
                      if (typeof window !== "undefined") {
                        localStorage.removeItem("zoiko-user-loc");
                        localStorage.removeItem("zoiko_location");
                      }
                    }}
                    aria-label="Undo location selection"
                    className="text-[12.5px] font-medium text-[#64748B] hover:text-[#111827] underline transition-colors"
                  >
                    Undo
                  </button>
                )}
              </div>
            </div>

            {/* Search button */}
            <div className="sm:pt-6">
              <button
                onClick={() => handleSearch()}
                disabled={searching}
                className="h-11 px-5 bg-[#0D9A72] hover:bg-[#25a874] active:scale-95 text-white font-semibold text-sm
                  rounded-[10px] flex items-center gap-2 whitespace-nowrap transition-all duration-150 disabled:opacity-60 w-full sm:w-auto justify-center"
              >
                {searching ? <Spinner /> : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )}
                Search Availability
              </button>
            </div>
          </div>

          {/* Radius + badges */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <span className="text-sm font-bold text-[#0F1F4E] whitespace-nowrap">Search radius:</span>
            <div className="relative">
              <select
                value={radius}
                onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
                className="h-[38px] pl-3.5 pr-8 border-[1.5px] border-[#CBD5E1] rounded-xl text-[13.5px] font-bold
                  text-[#0F1F4E] bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#0FAA87]
                  focus:ring-[3px] focus:ring-[#0FAA87]/15 hover:border-[#0FAA87] transition min-w-[105px]"
              >
                {RADII.map((r) => (
                  <option key={r} value={r}>
                    {r} km
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]">
                <svg viewBox="0 0 10 6" fill="currentColor" className="w-2.5 h-1.5"><path d="M0 0l5 6 5-6z"/></svg>
              </span>
            </div>
            <div className="ml-auto flex flex-wrap gap-4">
              {["Verified pharmacy network","Privacy-safe search","No exact stock quantities"].map((b) => (
                <span key={b} className="text-xs text-[#5B6478] font-medium whitespace-nowrap">{b}</span>
              ))}
            </div>
          </div>

          {/* Results */}
          {(searching || results !== null) && (
            <ResultsBlock outcome={results} loading={searching} origin={{ lat: lastLat, lng: lastLng }} />
          )}
        </div>
      )}

      {/* ══ TAB 2: SCAN PRESCRIPTION ══ */}
      {tab === "scan" && (
        <div>
          {/* File error message */}
          {fileError && (
            <div className="mb-3.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center justify-between gap-2">
              <span>{fileError}</span>
              <button type="button" onClick={() => setFileError(null)} className="text-red-500 hover:text-red-700 font-bold text-sm">✕</button>
            </div>
          )}

          {/* Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200
              ${dragOver ? "border-[#0D9A72] bg-[#eef9f3]" : "border-[#b2dfc8] bg-[#f7fdf9] hover:border-[#0D9A72] hover:bg-[#eef9f3]"}`}
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-[0_2px_10px_rgba(13,154,114,0.18)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0D9A72" strokeWidth={2} className="w-5 h-5">
                <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
              </svg>
            </div>
            <p className="font-bold text-[15px] text-[#111827] mb-1">
              {scanFile ? `📄 ${scanFile.name}` : "Drop your prescription here"}
            </p>
            <p className="text-sm text-[#6b7280] mb-4 leading-relaxed whitespace-pre-line">
              {scanFile
                ? `File ready (${(scanFile.size / (1024 * 1024)).toFixed(2)} MB). Click 'Scan prescription' to extract medicines.`
                : "We'll extract the medicine names — you choose which ones to search.\nYour image is never stored or shared."}
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="border-[1.5px] border-[#0D9A72] text-[#0D9A72] text-[13px] font-semibold px-4 py-2 rounded-lg
                  flex items-center gap-1.5 hover:bg-[#f0faf5] transition cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                  <path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>
                </svg>
                {scanFile ? "Replace file" : "Browse file"}
              </button>
              {scanFile && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                  className="border-[1.5px] border-red-300 text-red-600 text-[13px] font-semibold px-4 py-2 rounded-lg
                    flex items-center gap-1.5 hover:bg-red-50 transition cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                  Remove file
                </button>
              )}
            </div>
            <p className="text-xs text-[#b0b7c3] mt-2.5">JPG, PNG, PDF, HEIC — max 10 MB</p>
          </div>
          <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf,.heic,.heif,image/jpeg,image/png,application/pdf,image/heic,image/heif" className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <input ref={cameraRef}  type="file" accept="image/*" capture="environment" className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <input ref={galleryRef} type="file" accept="image/*" className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => e.target.files?.[0] && handleFile(e.target.files[0])} />

          <div className="text-center text-sm text-[#6b7280] my-3.5">or</div>

          <div className="flex gap-3">
            {[
              { label: "Take a photo", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>, ref: cameraRef },
              { label: "From gallery", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>, ref: galleryRef },
            ].map(({ label, icon, ref }) => (
              <button key={label} type="button" onClick={() => ref.current?.click()}
                className="flex-1 h-11 border-[1.5px] border-[#e5e7eb] rounded-[10px] text-[13.5px] font-medium text-[#111827]
                  flex items-center justify-center gap-2 hover:border-[#0D9A72] hover:text-[#0D9A72] transition cursor-pointer">
                {icon}{label}
              </button>
            ))}
          </div>

          {/* Privacy notice */}
          <div className="flex gap-2.5 bg-[#fffceb] border border-[#fde68a] rounded-xl p-3.5 mt-3.5 text-xs text-[#78350f] leading-relaxed items-start">
            <svg viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth={2} className="w-4 h-4 flex-shrink-0 mt-0.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>
              <strong>Privacy notice:</strong> Your prescription image is used only to extract medicine names for this search.
              It is <strong>never stored, shared, or used to identify you</strong>. ZoikoMeds does not process, validate, or fulfil
              prescriptions. <strong>No medical advice is provided.</strong>
            </span>
          </div>

          {/* Scan location */}
          <div className="mt-4">
            <label className="block text-[11px] font-bold tracking-wider uppercase text-[#6b7280] mb-1.5">
              Your Location (for nearby search)
            </label>
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                value={scanLocText}
                onChange={(e) => { setScanLocText(e.target.value); setScanLat(undefined); setScanLng(undefined); }}
                placeholder="City, ZIP code, postcode, or current location"
                className="w-full h-11 pl-9 pr-3 border-[1.5px] border-[#e5e7eb] rounded-[10px] text-sm text-[#111827]
                  placeholder:text-[#b0b7c3] focus:outline-none focus:border-[#0D9A72] focus:ring-[3px] focus:ring-[#0D9A72]/10 transition"
              />
            </div>
            <button
              type="button"
              onClick={() => handleGetMyLocation(setScanLat, setScanLng, setScanLocText, setScanLocLabel)}
              className="flex items-center gap-1.5 text-[#0D9A72] text-[12.5px] font-semibold mt-1.5 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0D9A72" strokeWidth={2.5} className="w-3 h-3">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {scanLocLabel}
            </button>
          </div>

          {/* Scan radius */}
          <div className="flex items-center gap-3 mt-3.5 flex-wrap">
            <span className="text-sm font-medium text-[#111827] whitespace-nowrap">Distance from me:</span>
            <div className="relative">
              <select
                value={scanRadius}
                onChange={(e) => handleScanRadiusChange(parseInt(e.target.value))}
                className="h-[34px] pl-3 pr-7 border-[1.5px] border-[#e5e7eb] rounded-lg text-[13.5px] font-semibold
                  text-[#111827] bg-white appearance-none cursor-pointer focus:outline-none focus:border-[#0D9A72] hover:border-[#0D9A72] transition min-w-[110px]"
              >
                {RADII.map((r) => <option key={r} value={r}>{r} km</option>)}
              </select>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6b7280]">
                <svg viewBox="0 0 10 6" fill="currentColor" className="w-2.5 h-1.5"><path d="M0 0l5 6 5-6z"/></svg>
              </span>
            </div>
          </div>

          {/* Scan button */}
          <button
            type="button"
            onClick={handleScan}
            disabled={!scanFile || scanning}
            className="w-full h-[52px] mt-4 bg-[#0D9A72] hover:bg-[#25a874] text-white font-bold text-[15px] rounded-xl
              flex items-center justify-center gap-2.5 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {scanning ? <Spinner /> : (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/>
                <rect x="7" y="7" width="10" height="10" rx="1"/>
              </svg>
            )}
            {scanning ? "Scanning prescription..." : "Scan prescription"}
          </button>

          {/* Scan error notice */}
          {scanError && (
            <div className="mt-4 p-4 bg-[#FFFBEB] border border-[#FCD34D] rounded-xl text-xs font-semibold text-[#92400E] flex items-center gap-2.5 shadow-sm">
              <svg className="w-5 h-5 text-[#D97706] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{scanError}</span>
            </div>
          )}

          {/* Scanned medicines + search */}
          {scannedMeds.length > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-sm text-[#111827]">
                  {scannedMeds.length} medicine{scannedMeds.length === 1 ? "" : "s"} detected — tap to select
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedMeds.size === scannedMeds.length) {
                      setSelectedMeds(new Set());
                    } else {
                      setSelectedMeds(new Set(scannedMeds));
                    }
                  }}
                  className="text-xs font-semibold text-[#0D9A72] hover:underline cursor-pointer"
                >
                  {selectedMeds.size === scannedMeds.length ? "Deselect all" : "Select all"}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {scannedMeds.map((m) => {
                  const isSelected = selectedMeds.has(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() =>
                        setSelectedMeds((prev) => {
                          const next = new Set(prev);
                          if (next.has(m)) next.delete(m);
                          else next.add(m);
                          return next;
                        })
                      }
                      className={`text-[13px] font-semibold px-4 py-1.5 rounded-full border-[1.5px] transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-[#0D9A72] border-[#25a874] text-white shadow-sm"
                          : "bg-[#f0faf5] border-[#b2edcd] text-[#1a6644] hover:border-[#0D9A72]"
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {m}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => handleScanSearch()}
                disabled={scanSearching || selectedMeds.size === 0}
                className="w-full h-11 bg-[#0D9A72] hover:bg-[#25a874] text-white font-semibold text-sm rounded-[10px]
                  flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {scanSearching ? <Spinner /> : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )}
                Search selected medicines {selectedMeds.size > 0 ? `(${selectedMeds.size})` : ""}
              </button>

              {/* Per-medicine results */}
              {Object.entries(scanResults).map(([med, oc]) => (
                <div key={med} className="mt-5 border-t border-[#e5e7eb] pt-4">
                  <p className="font-bold text-[14px] text-[#111827] mb-1">Results for: {med}</p>
                  <ResultsBlock outcome={oc} loading={false} origin={{ lat: scanLat, lng: scanLng }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}