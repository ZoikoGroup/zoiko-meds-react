import { NextRequest, NextResponse } from "next/server";

/** Nominatim (OpenStreetMap) — detailed, but cloud-hosted IPs are frequently rate-limited/blocked. */
async function viaNominatim(lat: number, lng: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  const resp = await fetch(url, {
    headers: { "User-Agent": "ZoikoMeds/1.0 (contact@zoikogroup.com)" },
    cache: "no-store",
  });
  if (!resp.ok) return "";
  const data = await resp.json();

  let name = "";
  if (data?.address) {
    const a = data.address;
    name = a.neighbourhood ?? a.suburb ?? a.city_district ?? a.town ?? a.city ?? a.county ?? "";
    if (name && (a.state || a.country)) name += ", " + (a.state ?? a.country);
  }
  if (!name && data?.display_name) {
    const parts = data.display_name.split(",");
    name = parts[0].trim() + (parts[1] ? ", " + parts[1].trim() : "");
  }
  return name;
}

/** BigDataCloud client-reverse-geocode — free, no key, reliable from serverless/cloud IPs. */
async function viaBigDataCloud(lat: number, lng: number): Promise<string> {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
  const resp = await fetch(url, { cache: "no-store" });
  if (!resp.ok) return "";
  const data = await resp.json();

  const locality = data?.locality || data?.city || "";
  const region = data?.principalSubdivision || data?.countryName || "";
  return locality && region ? `${locality}, ${region}` : locality || region || "";
}

export async function POST(req: NextRequest) {
  const { lat, lng } = await req.json();
  if (lat == null || lng == null) return NextResponse.json({ success: false, error: "Invalid coords" }, { status: 400 });

  let name = "";
  try {
    name = await viaNominatim(lat, lng);
  } catch {
    name = "";
  }
  if (!name) {
    try {
      name = await viaBigDataCloud(lat, lng);
    } catch {
      name = "";
    }
  }
  if (!name) name = `${parseFloat(lat).toFixed(4)}, ${parseFloat(lng).toFixed(4)}`;

  return NextResponse.json({ success: true, data: { name } });
}
