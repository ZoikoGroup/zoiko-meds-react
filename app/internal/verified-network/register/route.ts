import { NextRequest, NextResponse } from "next/server";
import { saveVerifiedNetworkRegistration } from "@/lib/db/verifiedNetworkDb";
import { sendVerifiedNetworkRegistrationEmail } from "@/lib/email/emailService";
import { validateEmail, validatePhone } from "@/lib/validation";

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

    const workEmail = String(body.workEmail || "").trim();
    const fullName = String(body.fullName || "").trim();
    const orgName = String(body.orgName || "").trim();
    const pharmacyType = String(body.pharmacyType || "").trim();
    const phone = String(body.phone || body.phoneNumber || "").trim();
    const note = String(body.note || "").trim();

    // 1. Input Validation
    const errors: Record<string, string> = {};

    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      errors.workEmail = emailCheck.error!;
    }

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    if (!orgName) {
      errors.orgName = "Pharmacy or organization name is required.";
    }

    if (!pharmacyType) {
      errors.pharmacyType = "Pharmacy type is required.";
    }

    if (phone) {
      const phoneCheck = validatePhone(phone);
      if (!phoneCheck.isValid) {
        errors.phone = phoneCheck.error!;
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please check your inputs.",
          errors,
        },
        { status: 400 }
      );
    }

    // 2. Save Registration to Database
    const record = await saveVerifiedNetworkRegistration({
      workEmail,
      fullName,
      orgName,
      pharmacyType,
      note,
    });

    // 3. Send Email Notification to info@zoikomeds.com
    const emailResult = await sendVerifiedNetworkRegistrationEmail({
      workEmail: record.workEmail,
      fullName: record.fullName,
      orgName: record.orgName,
      pharmacyType: record.pharmacyType,
      note: record.note,
      submittedAt: record.submittedAt,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "Email notification delivery failed. Please try again.",
        },
        { status: 500 }
      );
    }

    // 4. Return Success Response
    return NextResponse.json(
      {
        success: true,
        message:
          "Registration request submitted successfully. Our team will review your application and contact you via email once it has been approved.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: emailResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
