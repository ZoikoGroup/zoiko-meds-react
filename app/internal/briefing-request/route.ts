import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { dispatchFormEmails } from "@/lib/email/formMail";
import { submissionTimeForRequest } from "@/lib/email/requestTimezone";
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

    const briefingType = String(body.briefingType || body.type || body.pathway || "Intelligence Briefing").trim();
    const fullName = String(body.fullName || body.name || "").trim();
    const workEmail = String(body.workEmail || body.email || "").trim();
    const organization = String(body.organization || body.orgName || body.clinicName || body.hospitalName || "").trim();
    const jobTitle = String(body.jobTitle || body.roleTitle || body.title || body.role || "").trim();
    const phone = String(body.phone || body.phoneNumber || "").trim();
    const orgType = String(body.orgType || body.organizationType || body.pharmacyType || "").trim();
    const primaryInterest = String(body.primaryInterest || body.interest || body.workflowInterest || "").trim();
    const country = String(body.country || body.region || "").trim();
    const note = String(body.note || body.comments || body.details || body.message || body.description || "").trim();
    const intelligenceNeedsRaw = body.intelligenceNeeds || body.needs;
    const intelligenceNeedsFormatted = Array.isArray(intelligenceNeedsRaw)
      ? intelligenceNeedsRaw.filter(Boolean).join(", ")
      : String(intelligenceNeedsRaw || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName) {
      errors.name = "Full name is required.";
      errors.fullName = "Full name is required.";
    }

    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error!;
      errors.workEmail = emailCheck.error!;
    }

    if (!organization) {
      errors.organization = "Organization is required.";
      errors.orgName = "Pharmacy or organization name is required.";
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
      payload: {
        briefingType,
        fullName,
        workEmail,
        organization,
        jobTitle,
        phone,
        orgType,
        primaryInterest,
        country,
        intelligenceNeeds: intelligenceNeedsFormatted,
        note,
      },
    });

    // 2. Notify the team and confirm to the submitter.
    const mail = await dispatchFormEmails({
      formName: briefingType || "Intelligence Briefing",
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
        ...(jobTitle ? [{ label: "Role / Title", value: jobTitle }] : []),
        ...(orgType ? [{ label: "Organization Type", value: orgType }] : []),
        ...(country ? [{ label: "Region of Interest", value: country }] : []),
        ...(primaryInterest ? [{ label: "Primary Interest", value: primaryInterest }] : []),
        ...(intelligenceNeedsFormatted ? [{ label: "Intelligence Need(s)", value: intelligenceNeedsFormatted }] : []),
        ...(body.timeline ? [{ label: "Timeline", value: String(body.timeline).trim() }] : []),
        ...(note ? [{ label: "Message / Project Description", value: note }] : []),
      ],
    });

    if (!mail.internal.success) {
      return NextResponse.json(
        {
          success: false,
          message: "We couldn't submit your briefing request. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Our team will review your request and contact you soon.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: mail.internal.messageId,
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
