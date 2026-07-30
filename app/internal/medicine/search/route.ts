import { NextRequest, NextResponse } from "next/server";

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dL = ((lat2 - lat1) * Math.PI) / 180;
  const dG = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dL / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dG / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

const LOCATIONS = [
  { id: 1,  name: "Boots Pharmacy Oxford Street",   address: "360 Oxford St, London W1C 1JN",        city: "London", postcode: "W1C 1JN",  lat: 51.5152, lng: -0.1427, phone: "" },
  { id: 2,  name: "LloydsPharmacy Piccadilly",       address: "44 Piccadilly, London W1J 0DS",         city: "London", postcode: "W1J 0DS",  lat: 51.5093, lng: -0.1375, phone: "" },
  { id: 3,  name: "Well Pharmacy Camden",             address: "171 Camden High St, London NW1 7JY",    city: "London", postcode: "NW1 7JY",  lat: 51.5390, lng: -0.1426, phone: "" },
  { id: 4,  name: "Superdrug Pharmacy Brixton",       address: "26 Atlantic Rd, London SW9 8HX",        city: "London", postcode: "SW9 8HX",  lat: 51.4619, lng: -0.1132, phone: "" },
  { id: 5,  name: "Day Lewis Pharmacy Islington",     address: "94 Upper St, London N1 0NP",            city: "London", postcode: "N1 0NP",   lat: 51.5362, lng: -0.1027, phone: "" },
  { id: 6,  name: "Boots Pharmacy Canary Wharf",      address: "Jubilee Place, London E14 5NY",         city: "London", postcode: "E14 5NY",  lat: 51.5045, lng: -0.0195, phone: "" },
  { id: 7,  name: "Cohens Chemist Hackney",           address: "3 Amhurst Parade, London N16 5AA",      city: "London", postcode: "N16 5AA",  lat: 51.5614, lng: -0.0763, phone: "" },
  { id: 8,  name: "Manor Pharmacy Kensington",        address: "139 Kensington High St, London W8 6SX", city: "London", postcode: "W8 6SX",   lat: 51.5006, lng: -0.1926, phone: "" },
  { id: 9,  name: "Alphega Pharmacy Southwark",       address: "48 Borough High St, London SE1 1XN",    city: "London", postcode: "SE1 1XN",  lat: 51.5025, lng: -0.0913, phone: "" },
  { id: 10, name: "Rowlands Pharmacy Clapham",        address: "5 The Pavement, London SW4 0HY",        city: "London", postcode: "SW4 0HY",  lat: 51.4614, lng: -0.1482, phone: "" },
];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { medicine, lat, lng, radius = 25 } = body;
  const userLat = parseFloat(lat);
  const userLng = parseFloat(lng);
  const searchRadius = Math.max(1, Math.min(200, parseInt(radius)));

  const results = LOCATIONS
    .map((loc) => ({ ...loc, distance: Math.round(haversine(userLat, userLng, loc.lat, loc.lng) * 10) / 10 }))
    .filter((loc) => loc.distance <= searchRadius)
    .sort((a, b) => a.distance - b.distance);

  return NextResponse.json({ success: true, data: { medicine, locations: results, count: results.length } });
}
