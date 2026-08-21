import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { dispatchFormEmails } from "@/lib/email/formMail";
import { submissionTimeForRequest } from "@/lib/email/requestTimezone";
import { validateEmail } from "@/lib/validation";

/**
 * Pharmacy activation from the multi-step "Join a Network" wizard.
 *
 * Mirrors the original WordPress `zoiko_save_pharmacy` AJAX handler: the
 * pharmacy name plus the full form payload, stored with a received status.
 */
export async function POST(req: NextRequest) {
  try {
    const body: Record<string, unknown> = await req.json();

    const pharmacyName = String(body.pharmacyName || body.searchValue || "").trim();
    if (!pharmacyName) {
      return NextResponse.json(
        { success: false, message: "Pharmacy name is required." },
        { status: 400 }
      );
    }

    const corporateEmail = String(body.corporateEmail || "").trim();
    const fullName = [body.pharmacistFirst, body.pharmacistLast]
      .map((part) => String(part ?? "").trim())
      .filter(Boolean)
      .join(" ");

    // The wizard can reach activation without an email (the automated and
    // manual verification paths), so an address is confirmed when present
    // rather than demanded.
    if (corporateEmail && !validateEmail(corporateEmail).isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid corporate email address.",
          errors: { corporateEmail: "Please enter a valid corporate email address." },
        },
        { status: 400 }
      );
    }

    // 1. Persist, through the same store every other website form uses.
    const record = await saveSubmission({
      type: "VERIFIED_NETWORK",
      title: `Pharmacy Activation: ${pharmacyName}`,
      fullName: fullName || pharmacyName,
      email: corporateEmail,
      organization: pharmacyName,
      payload: body,
    });

    // 2. Notify the team and confirm to the applicant. The record is already
    //    saved, so neither delivery may fail the request.
    const mail = await dispatchFormEmails({
      formName: "Pharmacy Activation",
      submittedAt: submissionTimeForRequest(req, body),
      userEmail: corporateEmail,
      userName: fullName,
      subject: `Pharmacy Activation: ${pharmacyName}`,
      submission: [
        { label: "Pharmacy Name", value: pharmacyName },
        { label: "Pharmacist", value: fullName || "Not provided" },
        { label: "Corporate Email", value: corporateEmail || "Not provided" },
        { label: "Licence Number", value: String(body.pharmacistLicense || "").trim() || "Not provided" },
        { label: "Issuing Board", value: String(body.issuingBoard || "").trim() || "Not provided" },
        { label: "Verification Method", value: String(body.verifyMethod || "").trim() || "Not specified" },
        { label: "Inventory Method", value: String(body.inventoryMethod || "").trim() || "Not specified" },
        { label: "PMS Vendor", value: String(body.pmsVendor || "").trim() || "Not specified" },
        { label: "Service Radius", value: String(body.serviceRadius || "").trim() || "Not specified" },
      ],
    });

    return NextResponse.json({
      success: true,
      // The wizard reads `id` to show its success screen; the shape is unchanged.
      id: record.id,
      submittedAt: record.submittedAt,
      messageId: mail.internal.messageId,
    });
  } catch (err) {
    console.error("pharmacy-registration POST error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // TODO: return the list of registrations for an admin dashboard.
  return NextResponse.json({ success: true, records: [] });
}
