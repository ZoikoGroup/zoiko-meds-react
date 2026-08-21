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

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const appointmentType = String(body.appointmentType || "").trim();
    const preferredDate = String(body.preferredDate || "").trim();
    const preferredTime = String(body.preferredTime || "").trim();
    const visitMode = String(body.visitMode || "").trim();
    const providerLocation = String(body.providerLocation || "").trim();
    const reasonForVisit = String(body.reasonForVisit || "").trim();
    const reminderChannels = Array.isArray(body.reminderChannels)
      ? body.reminderChannels.map(String).join(", ")
      : String(body.reminderChannels || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    if (!fullName) {
      errors.fullName = "Full name is required.";
    }

    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error!;
    }

    if (phone) {
      const phoneCheck = validatePhone(phone);
      if (!phoneCheck.isValid) {
        errors.phone = phoneCheck.error!;
      }
    }

    if (!appointmentType) {
      errors.appointmentType = "Please select an appointment type.";
    }

    if (!preferredDate) {
      errors.preferredDate = "Preferred date is required.";
    }

    if (!preferredTime) {
      errors.preferredTime = "Preferred time window is required.";
    }

    if (!visitMode) {
      errors.visitMode = "Please select a visit mode.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed. Please check your inputs.", errors },
        { status: 400 }
      );
    }

    // Generate unique reference number (e.g. APT-849201)
    const refNumber = `APT-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Save to database
    const record = await saveSubmission({
      type: "OTHER",
      title: `Appointment Request: ${fullName} (${appointmentType})`,
      fullName,
      email,
      payload: {
        refNumber,
        fullName,
        email,
        phone,
        appointmentType,
        preferredDate,
        preferredTime,
        visitMode,
        providerLocation,
        reasonForVisit,
        reminderChannels,
      },
    });

    // 2. Dispatch notification email to info@zoikomeds.com
    const mail = await dispatchFormEmails({
      formName: "Appointment Request",
      submittedAt: submissionTimeForRequest(req, body),
      userEmail: email,
      userName: fullName,
      subject: `Appointment Request [${refNumber}]: ${fullName} (${appointmentType})`,
      note: reasonForVisit || "No additional context provided.",
      submission: [
        { label: "Reference Number", value: refNumber },
        { label: "Patient Name", value: fullName },
        { label: "Email Address", value: email },
        { label: "Phone Number", value: phone || "Not provided" },
        { label: "Appointment Type", value: appointmentType },
        { label: "Preferred Date", value: preferredDate },
        { label: "Time Window", value: preferredTime },
        { label: "Visit Mode", value: visitMode },
        { label: "Provider / Location", value: providerLocation || "Any available" },
        { label: "Reminder Preferences", value: reminderChannels || "Email" },
        { label: "Reason for Visit", value: reasonForVisit || "General Consultation" },
      ],
    });


    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request has been scheduled successfully!",
        data: {
          refNumber,
          fullName,
          email,
          phone,
          appointmentType,
          preferredDate,
          preferredTime,
          visitMode,
          providerLocation,
          reasonForVisit,
          reminderChannels,
          submittedAt: record.submittedAt,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    console.error("[POST /internal/appointments] Exception:", errorMsg);
    return NextResponse.json(
      { success: false, message: "Server error handling appointment request.", error: errorMsg },
      { status: 500 }
    );
  }
}
