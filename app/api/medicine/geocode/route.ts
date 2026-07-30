import { NextRequest, NextResponse } from "next/server";
import { geocodeAddress } from "@/lib/geocoding";

export async function POST(req: NextRequest) {
  const { address } = await req.json();
  if (!address) return NextResponse.json({ success: false, error: "No address" }, { status: 400 });

  const hit = await geocodeAddress(address);
  if (!hit) return NextResponse.json({ success: false, error: "Location not found" }, { status: 404 });

  return NextResponse.json({
    success: true,
    data: { lat: hit.lat, lng: hit.lng, display: hit.display },
  });
}
