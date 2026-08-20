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

    const orgName = String(body.organizationName || body.orgName || "").trim();
    const orgType = String(body.organizationType || body.orgType || "").trim();
    const countryRegion = String(body.countryRegion || "").trim();
    const relationship = String(body.relationship || "").trim();
    const evaluationStage = String(body.evaluationStage || "").trim();
    const expectedUsers = String(body.expectedUsers || "").trim();
    const deploymentScopes = Array.isArray(body.deploymentScopes) ? body.deploymentScopes.join(", ") : String(body.deploymentScopes || "");
    const ssoRequirements = Array.isArray(body.ssoRequirements) ? body.ssoRequirements.join(", ") : String(body.ssoRequirements || "");
    
    const contactName = String(body.contactName || body.fullName || "").trim();
    const workEmail = String(body.workEmail || body.email || "").trim();
    const jobTitle = String(body.jobTitle || "").trim();
    const notes = String(body.notes || body.additionalContext || "").trim();

    // Validation
    const errors: Record<string, string> = {};

    if (!orgName) {
      errors.organizationName = "Organization name is required.";
    }

    if (!contactName) {
      errors.contactName = "Contact name is required.";
    }

    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      errors.workEmail = emailCheck.error!;
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed. Please fill in all required fields.", errors },
        { status: 400 }
      );
    }

    // 1. Save to DB
    const record = await saveSubmission({
      type: "ENTERPRISE",
      title: `SSO Requirements: ${orgName}`,
      fullName: contactName,
      email: workEmail,
      organization: orgName,
      payload: {
        orgName,
        orgType,
        countryRegion,
        relationship,
        evaluationStage,
        expectedUsers,
        deploymentScopes,
        ssoRequirements,
        contactName,
        workEmail,
        jobTitle,
        notes,
      },
    });

    // 2. Dispatch notification email to info@zoikomeds.com
    const emailResult = await sendNotificationEmail({
      title: "Enterprise SSO Requirements Submission",
      subject: `SSO Requirements Request: ${orgName} (${contactName})`,
      recipient: "info@zoikomeds.com",
      replyTo: workEmail,
      note: notes || "No additional notes provided.",
      fields: [
        { label: "Organization Name", value: orgName },
        { label: "Organization Type", value: orgType || "N/A" },
        { label: "Operating Region", value: countryRegion || "N/A" },
        { label: "Relationship to ZoikoMeds", value: relationship || "N/A" },
        { label: "Evaluation Stage", value: evaluationStage || "N/A" },
        { label: "Expected User Population", value: expectedUsers || "N/A" },
        { label: "Deployment Scopes", value: deploymentScopes || "N/A" },
        { label: "SSO Requirement Areas", value: ssoRequirements || "N/A" },
        { label: "Contact Name", value: contactName },
        { label: "Work Email", value: workEmail },
        { label: "Job Title / Role", value: jobTitle || "N/A" },
        { label: "Submitted At", value: new Date(record.submittedAt).toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }) },
      ],
    });

    if (!emailResult.success) {
      console.error("[POST /internal/sso-requirement] Email notification failed:", emailResult.error);
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
        message: "Thank you! Your SSO requirements review has been submitted to info@zoikomeds.com. Our enterprise security team will review your request and get in touch.",
        data: {
          id: record.id,
          submittedAt: record.submittedAt,
          messageId: emailResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[POST /internal/sso-requirement] Server error:", err);
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}
