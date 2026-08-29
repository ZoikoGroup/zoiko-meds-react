/**
 * The resolved-identity handoff on the search route.
 *
 * A prescription scan already matches each medicine against MediBase, so the
 * final availability search should be run for that identity rather than for the
 * OCR text it was read from. These cover the contract: a supplied `medicineId`
 * is authoritative and validated, `q` never overrides it, and a request without
 * one behaves exactly as it always has.
 *
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

/** Catalog rows keyed by id, as GET /medibase/:id would answer. */
const catalogById = new Map<string, Record<string, unknown>>();
/** Every upstream URL the route requested, in order. */
let requested: string[] = [];
/** Flip to make the catalog unreachable. */
let catalogDown = false;

const fetchMock = vi.fn(async (input: string | URL) => {
  const url = String(input);
  requested.push(url);

  const byId = url.match(/\/medibase\/([^/?]+)$/);
  if (byId) {
    if (catalogDown) throw new Error("catalog unreachable");
    const row = catalogById.get(decodeURIComponent(byId[1]));
    if (!row) {
      return { ok: false, status: 404, json: async () => ({ statusCode: 404 }) };
    }
    return { ok: true, status: 200, json: async () => row };
  }

  if (url.includes("/search")) {
    return {
      ok: true,
      status: 200,
      json: async () => ({
        query: new URL(url).searchParams.get("q"),
        nearbyPharmacies: {
          source: "google_places",
          configured: true,
          // Fixed order, so any reordering by the route would show up.
          pharmacies: [
            { name: "Alpha Pharmacy", placeId: "a", distanceKm: 0.4 },
            { name: "Beta Pharmacy", placeId: "b", distanceKm: 1.2 },
            { name: "Gamma Pharmacy", placeId: "c", distanceKm: 2.9 },
          ],
        },
      }),
    };
  }

  throw new Error(`unexpected fetch: ${url}`);
});
vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

const { GET } = await import("@/app/internal/zoiko/search/route");

function row(id: string, canonicalName: string, extra: Record<string, unknown> = {}) {
  return {
    id,
    canonicalName,
    genericName: null,
    strength: null,
    dosageForm: null,
    ...extra,
  };
}

async function search(query: string) {
  const { NextRequest } = await import("next/server");
  const res = await GET(new NextRequest(`http://localhost/internal/zoiko/search?${query}`));
  return { status: res.status, json: await res.json() };
}

/** The `q` the route actually sent upstream to the platform search. */
function upstreamQ(): string | null {
  const hit = [...requested].reverse().find((u) => u.includes("/search?"));
  return hit ? new URL(hit).searchParams.get("q") : null;
}

/*
 * The route keeps a 5-minute response cache keyed by term+coords+radius, so
 * each assertion needs its own coordinates — otherwise a later test is served
 * from an earlier one and never reaches the upstream call it is inspecting.
 */
let coordSeed = 0;
function loc(): { qs: string; lat: string; lng: string } {
  coordSeed += 1;
  const lat = (20 + coordSeed * 0.01).toFixed(2);
  const lng = (70 + coordSeed * 0.01).toFixed(2);
  return { qs: `lat=${lat}&lng=${lng}&maxDistance=10`, lat, lng };
}

beforeEach(() => {
  catalogById.clear();
  requested = [];
  catalogDown = false;
  fetchMock.mockClear();
  catalogById.set("med_dolo_650", row("med_dolo_650", "Dolo 650"));
  catalogById.set("med_para_500", row("med_para_500", "Paracetamol", { strength: "500 mg" }));
  catalogById.set("med_para_650", row("med_para_650", "Paracetamol", { strength: "650 mg" }));
});

describe("A. medicineId supplied", () => {
  it("uses the catalog identity as the search term and echoes it back", async () => {
    const { status, json } = await search(`q=Dolo%20650&medicineId=med_dolo_650&${loc().qs}`);

    expect(status).toBe(200);
    expect(upstreamQ()).toBe("Dolo 650");
    expect(json.medicine).toMatchObject({ id: "med_dolo_650", canonicalName: "Dolo 650" });
  });

  it("resolves the id exactly once, by id — never by name", async () => {
    await search(`q=Dolo%20650&medicineId=med_dolo_650&${loc().qs}`);

    const idLookups = requested.filter((u) => u.includes("/medibase/"));
    expect(idLookups).toHaveLength(1);
    // No name-based catalog matching anywhere in the request chain.
    expect(requested.some((u) => u.includes("/medibase/match"))).toBe(false);
  });
});

describe("B. no medicineId", () => {
  it("keeps the existing q-based behaviour untouched", async () => {
    const { status, json } = await search(`q=Paracetamol&${loc().qs}`);

    expect(status).toBe(200);
    expect(upstreamQ()).toBe("Paracetamol");
    // No identity lookup at all when none was supplied.
    expect(requested.some((u) => u.includes("/medibase/"))).toBe(false);
    expect(json.medicine ?? null).toBeNull();
  });
});

describe("C. valid medicineId with a typo query", () => {
  it("searches the resolved identity, not the OCR text", async () => {
    // Exactly the scanner case: OCR read "Dolo 65O" (letter O), the scan
    // resolved it to the Dolo 650 identity, the user accepted it.
    const { json } = await search(`q=Dolo%2065O&medicineId=med_dolo_650&${loc().qs}`);

    expect(upstreamQ()).toBe("Dolo 650");
    expect(upstreamQ()).not.toBe("Dolo 65O");
    expect(json.medicine.canonicalName).toBe("Dolo 650");
  });
});

describe("D. invalid medicineId", () => {
  it("refuses rather than silently searching something else", async () => {
    const { status, json } = await search(`q=Dolo%20650&medicineId=not-a-real-id&${loc().qs}`);

    expect(status).toBe(404);
    expect(json.error).toBe("UNKNOWN_MEDICINE");
    // Critically: no availability search ran for a different medicine.
    expect(requested.some((u) => u.includes("/search?"))).toBe(false);
  });

  it("reports an unreachable catalog distinctly, and still does not guess", async () => {
    catalogDown = true;

    const { status, json } = await search(`q=Dolo%20650&medicineId=med_dolo_650&${loc().qs}`);

    expect(status).toBe(503);
    expect(json.error).toBe("MEDICINE_LOOKUP_UNAVAILABLE");
    expect(requested.some((u) => u.includes("/search?"))).toBe(false);
  });
});

describe("E. two strengths", () => {
  it("keeps the two identities independent", async () => {
    const a = await search(`q=Paracetamol&medicineId=med_para_500&${loc().qs}`);
    const b = await search(`q=Paracetamol&medicineId=med_para_650&${loc().qs}`);

    expect(a.json.medicine.id).toBe("med_para_500");
    expect(a.json.medicine.strength).toBe("500 mg");
    expect(b.json.medicine.id).toBe("med_para_650");
    expect(b.json.medicine.strength).toBe("650 mg");
    // Same display name must not let one serve the other from cache.
    expect(a.json.medicine.id).not.toBe(b.json.medicine.id);
  });
});

describe("G. unmatched scan result", () => {
  it("still works by name when the scan produced no identity", async () => {
    const { status, json } = await search(`q=Zynovate%20XR&${loc().qs}`);

    expect(status).toBe(200);
    expect(upstreamQ()).toBe("Zynovate XR");
    expect(json.medicine ?? null).toBeNull();
  });
});

describe("H. pharmacy result ordering", () => {
  it("returns identical pharmacies and order with and without an identity", async () => {
    // Same point for both, so only the identity parameter differs.
    const a = loc();
    const b = loc();
    const byName = await search(`q=Dolo%20650&${a.qs}`);
    const byId = await search(`q=Dolo%20650&medicineId=med_dolo_650&${b.qs}`);

    const names = (r: { json: { nearbyPharmacies: { pharmacies: { name: string }[] } } }) =>
      r.json.nearbyPharmacies.pharmacies.map((p) => p.name);

    expect(names(byId)).toEqual(names(byName));
    expect(names(byId)).toEqual(["Alpha Pharmacy", "Beta Pharmacy", "Gamma Pharmacy"]);
  });
});

describe("I. location and radius", () => {
  it("passes location and radius through unchanged when an identity is supplied", async () => {
    const where = loc();
    await search(`q=Dolo%20650&medicineId=med_dolo_650&${where.qs}`);

    const url = new URL([...requested].reverse().find((u) => u.includes("/search?"))!);
    expect(url.searchParams.get("lat")).toBe(where.lat);
    expect(url.searchParams.get("lng")).toBe(where.lng);
    expect(url.searchParams.get("maxDistance")).toBe("10");
  });

  it("honours the radius aliases exactly as before", async () => {
    const where = loc();
    await search(`q=Dolo%20650&lat=${where.lat}&lng=${where.lng}&radius=25`);
    const url = new URL([...requested].reverse().find((u) => u.includes("/search?"))!);
    expect(url.searchParams.get("maxDistance")).toBe("25");
  });
});

describe("J. normal typed search regression", () => {
  it("rejects a request with no coordinates, as before", async () => {
    const { status } = await search("q=Paracetamol");
    expect(status).toBe(400);
  });

  it("an empty medicineId is treated as absent", async () => {
    const { status, json } = await search(`q=Paracetamol&medicineId=&${loc().qs}`);

    expect(status).toBe(200);
    expect(upstreamQ()).toBe("Paracetamol");
    expect(requested.some((u) => u.includes("/medibase/"))).toBe(false);
    expect(json.medicine ?? null).toBeNull();
  });
});
