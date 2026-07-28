import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  if (!address) return NextResponse.json({ success: false, error: "No address" }, { status: 400 });

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`;
  const resp = await fetch(url, {
    headers: { "User-Agent": "ZoikoMeds/1.0 (contact@zoikogroup.com)" },
    cache: "no-store",
  });
  if (!resp.ok) return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 });
  const data = await resp.json();

  if (!data[0]) return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 });

  return NextResponse.json({
    success: true,
    data: { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon), display: data[0].display_name },
  });
}
