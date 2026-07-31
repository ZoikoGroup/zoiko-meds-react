import { NextRequest, NextResponse } from "next/server";

// Replace this with your actual persistence layer (Prisma, Drizzle, direct SQL, etc).
// This mirrors the original WordPress `zoiko_save_pharmacy` AJAX handler:
// it stores the pharmacy name + the full form payload as JSON, with a "pending" status.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.pharmacyName && !body.searchValue) {
      return NextResponse.json(
        { success: false, message: "Pharmacy name is required." },
        { status: 400 }
      );
    }

    // ── TODO: persist to your database ────────────────────────────────────
    // Example with Prisma:
    // const record = await prisma.pharmacyRegistration.create({
    //   data: {
    //     pharmacyName: body.pharmacyName || body.searchValue,
    //     formData: body,
    //     status: "pending",
    //   },
    // });

    const fakeId = Date.now();

    return NextResponse.json({ success: true, id: fakeId });
  } catch (err) {
    console.error("pharmacy-registration POST error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // TODO: return list of registrations for an admin dashboard, e.g.:
  // const records = await prisma.pharmacyRegistration.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, records: [] });
}