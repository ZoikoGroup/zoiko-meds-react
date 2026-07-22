import { NextRequest, NextResponse } from "next/server";
import { saveVerifiedNetworkRegistration } from "@/lib/db/verifiedNetworkDb";
import { sendVerifiedNetworkRegistrationEmail } from "@/lib/email/emailService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { workEmail, fullName, orgName, pharmacyType, note } = body || {};

    // 1. Input Validation
    const errors: Record<string, string> = {};

    if (!workEmail || typeof workEmail !== "string" || !workEmail.trim()) {
      errors.workEmail = "Work email is required.";
    } else if (!EMAIL_REGEX.test(workEmail.trim())) {
      errors.workEmail = "Please enter a valid email address.";
    }

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      errors.fullName = "Full name is required.";
    }

    if (!orgName || typeof orgName !== "string" || !orgName.trim()) {
      errors.orgName = "Pharmacy or organization name is required.";
    }

    if (!pharmacyType || typeof pharmacyType !== "string" || !pharmacyType.trim()) {
      errors.pharmacyType = "Pharmacy type is required.";
    }

    if (Object.keys(errors).length > 0) {
      console.warn("[POST /api/verified-network/register] Validation failed:", errors);
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
    console.log("[POST /api/verified-network/register] Saving registration record for:", orgName);
    const record = await saveVerifiedNetworkRegistration({
      workEmail,
      fullName,
      orgName,
      pharmacyType,
      note,
    });

    // 3. Send Email Notification to info@zoikomeds.com
    console.log("[POST /api/verified-network/register] Dispatching notification email...");
    const emailResult = await sendVerifiedNetworkRegistrationEmail({
      workEmail: record.workEmail,
      fullName: record.fullName,
      orgName: record.orgName,
      pharmacyType: record.pharmacyType,
      note: record.note,
      submittedAt: record.submittedAt,
    });

    if (!emailResult.success) {
      console.error("[POST /api/verified-network/register] Email notification failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "Email notification delivery failed. Please try again.",
        },
        { status: 500 }
      );
    }

    // 4. Return Success Response (Only after email dispatch succeeds)
    console.log("[POST /api/verified-network/register] Registration & Email notification succeeded!");
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
    console.error("[POST /api/verified-network/register] Server exception:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
