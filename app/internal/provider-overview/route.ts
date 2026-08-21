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

    const fullName = String(body.fullName || body.name || "").trim();
    const workEmail = String(body.workEmail || body.email || "").trim();
    const organization = String(body.organization || body.orgName || "").trim();
    const note = String(body.note || body.details || body.message || "").trim();
    const briefingType = "Provider Briefing";

    const errors: Record<string, string> = {};
    if (!fullName) errors.fullName = "Full name is required.";

    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      errors.workEmail = emailCheck.error!;
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

    // Notify the team and confirm to the submitter. The record is already
    // saved, so neither delivery may fail the request.
    const mail = await dispatchFormEmails({
      formName: briefingType,
      submittedAt: submissionTimeForRequest(req, body),
      userEmail: workEmail,
      userName: fullName,
      note,
      subject: `Briefing Request (${briefingType}): ${organization}`,
      submission: [
        { label: "Briefing Type", value: briefingType },
        { label: "Full Name", value: fullName },
        { label: "Work Email", value: workEmail },
        { label: "Organization", value: organization },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Provider briefing request submitted successfully. A ZoikoMeds representative will contact you soon.",
      data: { id: record.id, submittedAt: record.submittedAt, messageId: mail.internal.messageId },
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
