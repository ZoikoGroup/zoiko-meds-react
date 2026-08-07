import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db/submissionDb";
import { sendNotificationEmail } from "@/lib/email/emailService";

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

        const email = String(body.email || body.workEmail || "").trim();
        const name = String(body.name || body.fullName || "").trim();
        const org = String(body.org || body.organization || "").trim();
        const pharmacyType = String(body.pharmacyType || "").trim();
        const setupInterest = String(body.setupInterest || "").trim();
        const note = String(body.note || body.message || "").trim();

        // Validation
        const errors: Record<string, string> = {};

        if (!email) {
            errors.email = "Work email address is required.";
        } else if (!EMAIL_REGEX.test(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!name) {
            errors.name = "Full name is required.";
        }

        if (!org) {
            errors.org = "Pharmacy or organization name is required.";
        }

        if (!pharmacyType) {
            errors.pharmacyType = "Please select a pharmacy type.";
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
            title: `Inventory Signal Setup: ${org}`,
            fullName: name,
            email,
            organization: org,
            payload: { email, name, org, pharmacyType, setupInterest, note },
        });

        // 2. Dispatch notification email via Nodemailer / GoDaddy SMTP
        const emailResult = await sendNotificationEmail({
            title: "New Inventory Signal Setup Request",
            subject: `Inventory Signal Setup Request: ${org}`,
            recipient: "info@zoikomeds.com",
            replyTo: email,
            note: note || undefined,
            fields: [
                { label: "Full Name", value: name },
                { label: "Work Email", value: email },
                { label: "Pharmacy / Org Name", value: org },
                { label: "Pharmacy Type", value: pharmacyType },
                { label: "Setup Interest", value: setupInterest || "Not specified" },
                { label: "Submitted At", value: new Date(record.submittedAt).toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }) },
            ],
        });

        if (!emailResult.success) {
            console.error("[POST /api/inventory-setup] Email notification failed:", emailResult.error);
            return NextResponse.json(
                {
                    success: false,
                    message: emailResult.error || "Failed to dispatch email notification. Please try again.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your inventory signal setup request has been submitted successfully.",
                data: {
                    id: record.id,
                    submittedAt: record.submittedAt,
                    messageId: emailResult.messageId,
                },
            },
            { status: 200 }
        );
    } catch (err: unknown) {
        console.error("[POST /api/inventory-setup] Server error:", err);
        const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
        return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
    }
}
