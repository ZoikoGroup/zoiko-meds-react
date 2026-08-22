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

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function fetchGooglePlacesDirect(lat: number, lng: number, radiusKm: number) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  const stepStart = Date.now();
  console.log(`[zoiko-search] Google Places lookup started for lat=${lat}, lng=${lng}, radius=${radiusKm}km`);

  try {
    const radiusMeters = Math.min(Math.round(radiusKm * 1000), 50000);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radiusMeters}&type=pharmacy&key=${apiKey}`;

    const resp = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    const duration = Date.now() - stepStart;
    if (!resp.ok) {
      console.warn(`[zoiko-search] Google Places API HTTP ${resp.status} after ${duration}ms`);
      return null;
    }

    const data = await resp.json();
    const status = data.status;
    console.log(`[zoiko-search] Google Places lookup completed: ${duration}ms (status: ${status})`);

    if (status !== "OK" && status !== "ZERO_RESULTS") {
      if (["REQUEST_DENIED", "INVALID_REQUEST", "OVER_QUERY_LIMIT"].includes(status)) {
        console.error(`[zoiko-search] Google Places API error [${status}]: ${data.error_message || "No error details provided"}`);
      }
      return null;
    }

    const rawResults = data.results || [];
    const pharmacies = rawResults.map((p: Record<string, unknown>) => {
      const geom = p.geometry as { location?: { lat?: number; lng?: number } } | undefined;
      const pLat = geom?.location?.lat;
      const pLng = geom?.location?.lng;
      let distKm = 0;
      if (pLat != null && pLng != null) {
        distKm = Math.round(haversineKm(lat, lng, pLat, pLng) * 10) / 10;
      }
      const openingHours = p.opening_hours as { open_now?: boolean } | undefined;
      const placeId = p.place_id as string | undefined;
      return {
        name: (p.name as string) || "Pharmacy",
        address: (p.vicinity as string) || (p.formatted_address as string) || "Nearby Location",
        latitude: pLat,
        longitude: pLng,
        distanceKm: distKm,
        rating: (p.rating as number) || null,
        userRatingCount: (p.user_ratings_total as number) || null,
        openNow: openingHours?.open_now ?? null,
        placeId: placeId,
        googleMapsUri: placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : undefined,
      };
    });

    return {
      source: "google_places",
      configured: true,
      origin: { lat, lng, resolvedFrom: "user_coordinates" },
      radiusKm,
      pharmacies,
    };
  } catch (err: unknown) {
    const duration = Date.now() - stepStart;
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn(`[zoiko-search] Google Places lookup completed: ${duration}ms with error: ${errorMsg}`);
    return null;
  }
}

/**
 * Endpoint: GET /internal/zoiko/search
 * Google Maps/Google Places nearby pharmacies ONLY.
 * 
 * Radius fallback logic: distance | maxDistance | radius | default 5 km
 */
export async function GET(req: NextRequest) {
  const startTime = Date.now();
  
  // Safe temporary runtime check (never logs key value)
  const isKeyConfigured = Boolean(process.env.GOOGLE_PLACES_API_KEY);
  console.log(`[zoiko-search] GOOGLE_PLACES_API_KEY configured: ${isKeyConfigured ? "yes" : "no"}`);

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

  console.log(`[zoiko-search] request started: q="${q}", lat=${latStr}, lng=${lngStr}, radius=${radius}km`);

  if (!latStr || !lngStr) {
    console.log(`[zoiko-search] response completed: ${Date.now() - startTime}ms (status 400 - missing params)`);
    return NextResponse.json(
      { success: false, error: "Missing required query parameters: lat and lng are required." },
      { status: 400 }
    );
  }

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    console.log(`[zoiko-search] response completed: ${Date.now() - startTime}ms (status 400 - invalid coords)`);
    return NextResponse.json(
      { success: false, error: "Invalid coordinates provided." },
      { status: 400 }
    );
  }

  // Check 5-minute in-memory response cache
  const cacheKey = `${q.trim().toLowerCase()}:${lat.toFixed(3)}:${lng.toFixed(3)}:${radius}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    console.log(`[zoiko-search] CACHE HIT for ${cacheKey} in ${Date.now() - startTime}ms`);
    console.log(`[zoiko-search] response completed: ${Date.now() - startTime}ms (cached)`);
    return NextResponse.json(cached.payload, { status: 200 });
  }

  // Construct target URLs to query downstream search backend / Google Places
  const targets: string[] = [];
  if (process.env.NODE_ENV !== "production") {
    targets.push(`http://localhost:8000/api/search?q=${encodeURIComponent(q)}&lat=${lat}&lng=${lng}&maxDistance=${radius}`);
  }
  targets.push(`${API_BASE_URL}/search?q=${encodeURIComponent(q)}&lat=${lat}&lng=${lng}&maxDistance=${radius}`);

  let lastError: { status: number; message: string; details?: unknown } | null = null;

  for (const targetUrl of targets) {
    const stepStart = Date.now();
    try {
      console.log(`[zoiko-search] platform pharmacy lookup started for target: ${targetUrl}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout max per target

      const resp = await fetch(targetUrl, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const duration = Date.now() - stepStart;
      console.log(`[zoiko-search] platform pharmacy lookup completed: ${duration}ms (status ${resp.status})`);

      if (resp.ok) {
        const data = await resp.json();
        
        let nearbyPharmacies = data.nearbyPharmacies;
        if (!nearbyPharmacies || !nearbyPharmacies.pharmacies || nearbyPharmacies.pharmacies.length === 0) {
          // Attempt direct Google Places lookup if key is configured
          const directPlaces = await fetchGooglePlacesDirect(lat, lng, radius);
          if (directPlaces && directPlaces.pharmacies && directPlaces.pharmacies.length > 0) {
            nearbyPharmacies = directPlaces;
          }
        }

        const responsePayload = {
          query: data.query || q,
          results: [], // No ZoikoMeds pharmacy database / verified pharmacy results
          zeroResult: false,
          nearbyPharmacies: nearbyPharmacies || {
            source: "google_places",
            configured: isKeyConfigured,
            origin: { lat, lng, resolvedFrom: "user_coordinates" },
            radiusKm: radius,
            pharmacies: [],
          },
        };

        if (responsePayload.nearbyPharmacies) {
          responsePayload.nearbyPharmacies.radiusKm = radius;
        }

        console.log(
          `[zoiko-search] SUCCESS: Found ${responsePayload.nearbyPharmacies?.pharmacies?.length ?? 0} Google Maps pharmacies nearby.`
        );
        console.log(`[zoiko-search] response completed: ${Date.now() - startTime}ms`);

        // Store in cache for 5 minutes
        searchCache.set(cacheKey, { payload: responsePayload, timestamp: Date.now() });

        return NextResponse.json(responsePayload, { status: 200 });
      } else {
        const errorText = await resp.text();
        console.warn(`[zoiko-search] Target ${targetUrl} failed with status ${resp.status}: ${errorText.slice(0, 200)}`);
        lastError = {
          status: resp.status,
          message: `Downstream target returned HTTP ${resp.status}`,
          details: errorText,
        };
      }
    } catch (err: unknown) {
      const duration = Date.now() - stepStart;
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.warn(`[zoiko-search] Error/Timeout fetching from ${targetUrl} after ${duration}ms:`, errorMsg);
      lastError = {
        status: 504,
        message: `Request to search backend timed out or failed: ${errorMsg}`,
      };
    }
  }

  // Fallback: If downstream API target failed, try direct Google Places lookup if API key exists
  if (isKeyConfigured) {
    const directPlaces = await fetchGooglePlacesDirect(lat, lng, radius);
    if (directPlaces) {
      const responsePayload = {
        query: q,
        results: [],
        zeroResult: false,
        nearbyPharmacies: directPlaces,
      };

      console.log(`[zoiko-search] Direct Google Places fallback SUCCESS: Found ${directPlaces.pharmacies.length} pharmacies.`);
      console.log(`[zoiko-search] response completed: ${Date.now() - startTime}ms`);
      searchCache.set(cacheKey, { payload: responsePayload, timestamp: Date.now() });
      return NextResponse.json(responsePayload, { status: 200 });
    }
  }

  // If all targets and direct fallbacks failed, return controlled error
  console.error(`[zoiko-search] FAILED: All search operations failed after ${Date.now() - startTime}ms`);
  console.log(`[zoiko-search] response completed: ${Date.now() - startTime}ms (status 502/504)`);
  
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
