import { NextRequest, NextResponse } from "next/server";
import { reverseGeocode } from "@/lib/geocoding";

export async function POST(req: NextRequest) {
  const { lat, lng } = await req.json();
  if (lat == null || lng == null) {
    return NextResponse.json({ success: false, error: "Invalid coords" }, { status: 400 });
  }

  const name = await reverseGeocode(parseFloat(lat), parseFloat(lng));
  return NextResponse.json({ success: true, data: { name } });
}
