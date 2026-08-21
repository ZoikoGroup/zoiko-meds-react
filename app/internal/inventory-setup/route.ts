import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { dispatchFormEmails } from "@/lib/email/formMail";
import { submissionTimeForRequest } from "@/lib/email/requestTimezone";
import { validateEmail } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON payload in request body." },
        { status: 400 }
      );
    }

    const email = String(body.email || body.workEmail || "").trim();
    const name = String(body.name || body.fullName || "").trim();
    const org = String(body.org || body.organization || "").trim();
    const pharmacyType = String(body.pharmacyType || "").trim();
    const setupInterest = String(body.setupInterest || "").trim();
    const note = String(body.note || body.message || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error!;
    }

    if (!name) {
      errors.name = "Full name is required.";
    }

    if (!org) {
      errors.org = "Pharmacy or organization name is required.";
    }

    if (!pharmacyType) {
      errors.pharmacyType = "Please select a pharmacy type.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed. Please check required fields.", errors },
        { status: 400 }
      );
    }

    // 1. Save to database
    const record = await saveSubmission({
      type: "OTHER",
      title: `Inventory Signal Setup: ${org}`,
      fullName: name,
      email,
      organization: org,
      payload: { email, name, org, pharmacyType, setupInterest, note },
    });

    // 2. Dispatch notification email via Nodemailer / GoDaddy SMTP to info@zoikomeds.com
    const mail = await dispatchFormEmails({
      formName: "Inventory Setup",
      submittedAt: submissionTimeForRequest(req, body),
      userEmail: email,
      userName: name,
      subject: "New Inventory Signal Setup Request – ZoikoMeds",
      note: note || undefined,
      submission: [
        { label: "Work Email", value: email },
        { label: "Full Name", value: name },
        { label: "Pharmacy / Organization Name", value: org },
        { label: "Pharmacy Type", value: pharmacyType },
        { label: "Setup Interest", value: setupInterest || "Not specified" },
        { label: "Brief Note", value: note || "None" },
      ],
    });


    return NextResponse.json(
      {
        success: true,
        message: "Your inventory signal setup request has been submitted successfully. Our team will review your requirements and contact you shortly.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: mail.internal.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[POST /internal/inventory-setup] Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
