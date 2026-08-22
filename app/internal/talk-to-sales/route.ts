import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { sendNotificationEmail } from "@/lib/email/emailService";
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

    const primaryReason = String(body.primaryReason || "").trim();
    const areasOfInterest = Array.isArray(body.areasOfInterest) ? body.areasOfInterest.join(", ") : String(body.areasOfInterest || "");
    const preferredOutcomes = Array.isArray(body.preferredOutcomes) ? body.preferredOutcomes.join(", ") : String(body.preferredOutcomes || "");
    const additionalContext = String(body.additionalContext || body.notes || "").trim();

    const fullName = String(body.fullName || body.contactName || "").trim();
    const workEmail = String(body.workEmail || body.email || "").trim();
    const orgName = String(body.orgName || body.organizationName || "").trim();
    const phoneNumber = String(body.phoneNumber || body.phone || "").trim();
    const jobTitle = String(body.jobTitle || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      errors.workEmail = emailCheck.error!;
    }

    if (!orgName) {
      errors.orgName = "Organization name is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed. Please fill in all required fields.", errors },
        { status: 400 }
      );
    }

    // 1. Save to DB
    const record = await saveSubmission({
      type: "SALES",
      title: `Talk to Sales Inquiry: ${orgName}`,
      fullName,
      email: workEmail,
      organization: orgName,
      payload: {
        primaryReason,
        areasOfInterest,
        preferredOutcomes,
        additionalContext,
        fullName,
        workEmail,
        orgName,
        phoneNumber,
        jobTitle,
      },
    });

    // 2. Dispatch notification email to info@zoikomeds.com
    const emailResult = await sendNotificationEmail({
      title: "Talk to Sales Inquiry",
      subject: `Sales Inquiry [${primaryReason || "General"}]: ${fullName} (${orgName})`,
      recipient: "info@zoikomeds.com",
      replyTo: workEmail,
      note: additionalContext || "No additional context provided.",
      fields: [
        { label: "Full Name", value: fullName },
        { label: "Work Email", value: workEmail },
        { label: "Organization Name", value: orgName },
        { label: "Phone Number", value: phoneNumber || "N/A" },
        { label: "Job Title", value: jobTitle || "N/A" },
        { label: "Primary Commercial Reason", value: primaryReason || "N/A" },
        { label: "Areas of Interest", value: areasOfInterest || "N/A" },
        { label: "Preferred Conversation Outcome", value: preferredOutcomes || "N/A" },
        { label: "Submitted At", value: new Date(record.submittedAt).toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }) },
      ],
    });

    if (!emailResult.success) {
      console.error("[POST /internal/talk-to-sales] Email notification failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "Failed to dispatch email notification to info@zoikomeds.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your sales inquiry has been submitted to info@zoikomeds.com. Our commercial team will review your request and get in touch.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: emailResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[POST /internal/talk-to-sales] Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
