import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { sendContactFormEmail } from "@/lib/email/emailService";

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
    const email = String(body.email || body.workEmail || "").trim();
    const subject = String(body.subject || body.inquiryType || "").trim();
    const organization = String(body.organization || body.orgName || "").trim();
    const message = String(body.message || body.note || "").trim();

    // 1. Validation
    const errors: Record<string, string> = {};

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    if (!email) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!message) {
      errors.message = "Message content is required.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors },
        { status: 400 }
      );
    }

    // 2. Database Storage
    const record = await saveSubmission({
      type: "CONTACT",
      title: subject ? `Contact Inquiry: ${subject}` : "General Website Contact",
      fullName,
      email,
      organization,
      payload: { fullName, email, subject, organization, message },
    });

    // 3. Dispatch Email via GoDaddy SMTP
    const emailResult = await sendContactFormEmail({
      fullName,
      email,
      subject,
      organization,
      message,
      submittedAt: record.submittedAt,
    });

    if (!emailResult.success) {
      console.error("[POST /api/contact] Email notification failed:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: emailResult.error || "Failed to deliver notification email. Please try again.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out to ZoikoMeds. Your message has been received and sent to our team.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: emailResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[POST /api/contact] Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
