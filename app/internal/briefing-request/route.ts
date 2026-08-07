import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { sendBriefingRequestEmail } from "@/lib/email/emailService";
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

    const briefingType = String(body.briefingType || body.type || body.pathway || "Executive Briefing").trim();
    const fullName = String(body.fullName || body.name || "").trim();
    const workEmail = String(body.workEmail || body.email || "").trim();
    const organization = String(body.organization || body.orgName || body.clinicName || body.hospitalName || "").trim();
    const jobTitle = String(body.jobTitle || body.title || body.role || "").trim();
    const phone = String(body.phone || body.phoneNumber || "").trim();
    const note = String(body.note || body.comments || body.details || body.message || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      errors.workEmail = emailCheck.error!;
    }

    if (!organization) {
      errors.organization = "Organization name is required.";
    }

    if (phone) {
      const phoneCheck = validatePhone(phone);
      if (!phoneCheck.isValid) {
        errors.phone = phoneCheck.error!;
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed. Please check your inputs.", errors },
        { status: 400 }
      );
    }

    // 1. Save to database
    const record = await saveSubmission({
      type: "BRIEFING",
      title: `Briefing Request: ${briefingType}`,
      fullName,
      email: workEmail,
      organization,
      payload: { briefingType, fullName, workEmail, organization, jobTitle, phone, note },
    });

    // 2. Dispatch email to info@zoikomeds.com via GoDaddy SMTP
    const emailResult = await sendBriefingRequestEmail({
      briefingType,
      fullName,
      workEmail,
      organization,
      jobTitle,
      phone,
      note,
      submittedAt: record.submittedAt,
    });

    if (!emailResult.success) {
      console.error("[POST /internal/briefing-request] Email delivery failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "Failed to deliver briefing request email. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Briefing request submitted successfully. A ZoikoMeds executive will follow up with you shortly.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: emailResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[POST /internal/briefing-request] Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
