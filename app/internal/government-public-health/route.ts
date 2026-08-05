import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { sendBriefingRequestEmail } from "@/lib/email/emailService";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const fullName = String(body.fullName || body.name || "").trim();
    const workEmail = String(body.workEmail || body.email || "").trim();
    const organization = String(body.organization || body.orgName || "").trim();
    const note = String(body.note || body.details || body.message || "").trim();
    const briefingType = "Government / Public Health Briefing";

    const errors: Record<string, string> = {};
    if (!fullName) errors.fullName = "Full name is required.";
    if (!workEmail) {
      errors.workEmail = "Work email address is required.";
    } else if (!EMAIL_REGEX.test(workEmail)) {
      errors.workEmail = "Please provide a valid work email address.";
    }
    if (!organization) errors.organization = "Organization name is required.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed. Please check your inputs.", errors },
        { status: 400 }
      );
    }

    const record = await saveSubmission({
      type: "BRIEFING",
      title: `Briefing Request: ${briefingType}`,
      fullName,
      email: workEmail,
      organization,
      payload: { briefingType, fullName, workEmail, organization, note },
    });

    const emailResult = await sendBriefingRequestEmail({
      briefingType,
      fullName,
      workEmail,
      organization,
      note,
      submittedAt: record.submittedAt,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, message: emailResult.error || "Email delivery failed." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Government / public health briefing request submitted successfully. Our team will contact you soon.",
      data: { id: record.id, submittedAt: record.submittedAt, messageId: emailResult.messageId },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
