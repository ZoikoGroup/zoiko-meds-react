import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/config";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// 5-minute in-memory response cache for fast homepage search performance
interface CacheEntry {
  payload: unknown;
  timestamp: number;
}
const searchCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000;

/**
 * Endpoint: GET /internal/zoiko/search
 * Google Maps/Google Places nearby pharmacies ONLY.
 * 
 * Radius fallback logic: distance | maxDistance | radius | default 5 km
 */
export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const searchParams = req.nextUrl.searchParams;

  const q = searchParams.get("q") || searchParams.get("medicine") || "Dolo 650";
  const latStr = searchParams.get("lat");
  const lngStr = searchParams.get("lng");

  // Determine radius: distance > maxDistance > radius > default 5 km
  const rawRadius =
    searchParams.get("distance") ||
    searchParams.get("maxDistance") ||
    searchParams.get("radius") ||
    "5";
  const radius = parseFloat(rawRadius) || 5;

  console.log(`[Search Endpoint] Query: "${q}", lat: ${latStr}, lng: ${lngStr}, radius: ${radius}km`);

  if (!latStr || !lngStr) {
    return NextResponse.json(
      { success: false, error: "Missing required query parameters: lat and lng are required." },
      { status: 400 }
    );
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json(
      { success: false, error: "Invalid coordinates provided." },
      { status: 400 }
    );
  }

  // Check 5-minute in-memory response cache
  const cacheKey = `${q.trim().toLowerCase()}:${lat.toFixed(3)}:${lng.toFixed(3)}:${radius}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    console.log(`[Search Endpoint] CACHE HIT for ${cacheKey} in ${Date.now() - startTime}ms`);
    return NextResponse.json(cached.payload, { status: 200 });
  }

  // Construct target URLs to query downstream search backend / Google Places
  // 1. Try local backend on port 8000 first (for local dev when running NestJS)
  // 2. Fall back to API_BASE_URL (production get.zoikomeds.com API)
  const targets: string[] = [];
  if (process.env.NODE_ENV !== "production") {
    targets.push(`http://localhost:8000/api/search?q=${encodeURIComponent(q)}&lat=${lat}&lng=${lng}&maxDistance=${radius}`);
  }
  targets.push(`${API_BASE_URL}/search?q=${encodeURIComponent(q)}&lat=${lat}&lng=${lng}&maxDistance=${radius}`);

  let lastError: { status: number; message: string; details?: unknown } | null = null;

  for (const targetUrl of targets) {
    const stepStart = Date.now();
    try {
      console.log(`[Search Endpoint] Fetching from target: ${targetUrl}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const resp = await fetch(targetUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - stepStart;
      console.log(`[Search Endpoint] Target ${targetUrl} returned status ${resp.status} in ${duration}ms`);

      if (resp.ok) {
        const data = await resp.json();
        
        // Ensure Google Maps/Google Places nearby pharmacies ONLY are returned
        // Do NOT populate ZoikoMeds signed-up/verified pharmacy results in this public search flow
        const responsePayload = {
          query: data.query || q,
          results: [], // No ZoikoMeds pharmacy database / verified pharmacy results
          zeroResult: false,
          nearbyPharmacies: data.nearbyPharmacies || {
            source: "google_places",
            configured: true,
            origin: { lat, lng, resolvedFrom: "user_coordinates" },
            radiusKm: radius,
            pharmacies: [],
          },
        };

        // Ensure radiusKm in nearbyPharmacies matches requested radius
        if (responsePayload.nearbyPharmacies) {
          responsePayload.nearbyPharmacies.radiusKm = radius;
        }

        console.log(
          `[Search Endpoint] SUCCESS: Found ${responsePayload.nearbyPharmacies?.pharmacies?.length ?? 0} Google Maps pharmacies nearby. Total time: ${Date.now() - startTime}ms`
        );

        // Store in cache for 5 minutes to deliver instant 0ms search performance
        searchCache.set(cacheKey, { payload: responsePayload, timestamp: Date.now() });

        return NextResponse.json(responsePayload, { status: 200 });
      } else {
        const errorText = await resp.text();
        console.warn(`[Search Endpoint] Target ${targetUrl} failed with status ${resp.status}: ${errorText.slice(0, 200)}`);
        lastError = {
          status: resp.status,
          message: `Downstream target returned HTTP ${resp.status}`,
          details: errorText,
        };
      }
    } catch (err: unknown) {
      const duration = Date.now() - stepStart;
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn(`[Search Endpoint] Error/Timeout fetching from ${targetUrl} after ${duration}ms:`, errorMsg);
      lastError = {
        status: 504,
        message: `Request to search backend timed out or failed: ${errorMsg}`,
      };
    }
  }

  // If all targets failed, return a meaningful error response
  console.error(`[Search Endpoint] FAILED: All downstream targets failed after ${Date.now() - startTime}ms`);
  return NextResponse.json(
    {
      success: false,
      error: "SEARCH_BACKEND_FAILURE",
      message: lastError?.message || "Failed to fetch nearby pharmacies from Google Places.",
      details: lastError?.details,
    },
    { status: lastError?.status || 502 }
  );
}
