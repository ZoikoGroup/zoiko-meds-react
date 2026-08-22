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
    const name = String(body.fullName || body.name || "").trim();
    const subject = String(body.subject || body.contactReason || "").trim();
    const org = String(body.organization || body.organizationName || "").trim();
    const message = String(body.message || body.note || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error!;
    }

    if (!name) {
      errors.name = "Full name is required.";
    }

    if (!subject) {
      errors.subject = "Please select a contact reason.";
    }

    if (!message) {
      errors.message = "Message summary is required.";
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
      title: `General Inquiry: ${subject}`,
      fullName: name,
      email,
      organization: org,
      payload: { email, name, subject, org, message },
    });

    // 2. Dispatch notification email to info@zoikomeds.com
    const mail = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: submissionTimeForRequest(req, body),
      userEmail: email,
      userName: name,
      subject: `General Inquiry [${subject}]: ${name}`,
      note: message,
      submission: [
        { label: "Full Name", value: name },
        { label: "Email", value: email },
        { label: "Contact Reason / Subject", value: subject },
        { label: "Organization", value: org || "N/A" },
      ],
    });


    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been received. Our team will contact you soon.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: mail.internal.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[POST /internal/contact] Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
