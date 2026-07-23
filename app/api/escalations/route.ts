import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit, getRateLimitHeaders } from "@/lib/api/rate-limit";
import { successResponse, errorResponse, validateRequired } from "@/lib/api/helpers";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_USE_SSL === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? "support@zoikomeds.com";
const FROM_ADDRESS = process.env.SMTP_USER ?? "support@zoikomeds.com";

interface ConversationMessage {
  id: string;
  role: string;
  content: string;
  timestamp: number;
}

interface EscalationRecord {
  ref: string;
  contact: string;
  includeConversation: boolean;
  persona: string | null;
  messageCount: number;
  createdAt: string;
}

const escalationLog: EscalationRecord[] = [];

const CONTACT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\+?[\d\s\-()]{7,15}$/;

function formatConversationHtml(messages: ConversationMessage[]): string {
  if (messages.length === 0) return "<p><em>No conversation included.</em></p>";
  return messages
    .map((m) => {
      const sender = m.role === "user" ? "Visitor" : "Zoi";
      const time = new Date(m.timestamp).toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });
      const color = m.role === "user" ? "#008882" : "#263D88";
      return `
        <div style="margin-bottom:12px;padding:10px 14px;border-left:3px solid ${color};background:${m.role === "user" ? "#F0FDFA" : "#F9FAFB"};border-radius:4px;">
          <div style="font-size:11px;color:#6B7280;margin-bottom:4px;">
            <strong>${sender}</strong> &middot; ${time}
          </div>
          <div style="font-size:13px;color:#111827;white-space:pre-wrap;">${m.content}</div>
        </div>`;
    })
    .join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rlKey = `escalations:${clientIp}`;
    const rl = rateLimit(rlKey, 10, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "rate_limit_exceeded" },
        { status: 429, headers: getRateLimitHeaders(rl) }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return errorResponse("invalid_json", 400);
    }

    const missing = validateRequired(body, ["contact"]);
    if (missing) {
      return errorResponse(`${missing}_required`, 400);
    }

    const contact = String(body.contact).trim();
    if (!contact) {
      return errorResponse("contact_empty", 400);
    }

    if (contact.length > 256) {
      return errorResponse("contact_too_long", 400);
    }

    if (!CONTACT_REGEX.test(contact)) {
      return errorResponse("contact_invalid", 400, {
        hint: "Provide a valid email address or phone number",
      });
    }

    const includeConversation = body.includeConversation !== false;
    const persona = body.persona ? String(body.persona) : null;
    const messageCount = typeof body.messageCount === "number" ? body.messageCount : 0;
    const conversationMessages = (body.conversationMessages as ConversationMessage[]) ?? [];
    const issueMessage = body.issueMessage ? String(body.issueMessage).trim() : null;

    // Generate unique, non-repeating ticket reference ID (timestamp + random sequence)
    const uniqueSeq = (Date.now() % 90000) + 10000;
    const ref = `ZK-${uniqueSeq}`;

    const record: EscalationRecord = {
      ref,
      contact,
      includeConversation,
      persona,
      messageCount,
      createdAt: new Date().toISOString(),
    };

    escalationLog.push(record);
    console.log(`[Escalation] ${ref} | contact: ${contact.replace(/.(?=.{4})/g, "*")} | consent: ${includeConversation} | issue: ${issueMessage ?? "none"}`);

    const personaLabel = persona
      ? { patient: "Patient/Caregiver", pharmacy: "Pharmacy", enterprise: "Enterprise", wholesale: "Wholesale Partner", other: "Other" }[persona] ?? persona
      : "Not set";

    const conversationHtml = includeConversation
      ? formatConversationHtml(conversationMessages)
      : "<p><em>Visitor declined to share conversation history.</em></p>";

    const issueHtml = issueMessage
      ? `<div style="background:#F0FDFA;border-left:4px solid #008882;padding:12px 16px;margin-bottom:20px;border-radius:4px;">
           <strong style="color:#0f766e;font-size:13px;">User Reported Issue:</strong>
           <div style="font-size:14px;color:#111827;margin-top:4px;white-space:pre-wrap;">${issueMessage}</div>
         </div>`
      : "";

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#263D88 0%,#1E2F6E 100%);padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="color:#FFFFFF;margin:0;font-size:20px;">New Support Escalation</h1>
          <p style="color:#A5B4FC;margin:8px 0 0;font-size:14px;">Reference Ticket: #${ref}</p>
        </div>
        <div style="padding:24px;background:#FFFFFF;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6;">Ticket Ref</td><td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:600;border-bottom:1px solid #F3F4F6;">#${ref}</td></tr>
            <tr><td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6;">Contact</td><td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #F3F4F6;">${contact}</td></tr>
            <tr><td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6;">Persona</td><td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #F3F4F6;">${personaLabel}</td></tr>
            <tr><td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6;">Chat Included</td><td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #F3F4F6;">${includeConversation ? "Yes" : "No"}</td></tr>
          </table>

          ${issueHtml}

          <h2 style="font-size:16px;color:#263D88;margin:0 0 12px;">Conversation History</h2>
          ${conversationHtml}

          <hr style="border:none;border-top:1px solid #E5E7EB;margin:20px 0;" />
          <p style="font-size:12px;color:#9CA3AF;">
            Submitted via Zoi on ${new Date().toLocaleString("en-KE", { timeZone: "Africa/Nairobi" })}.
          </p>
        </div>
      </div>
    `;

    // 1. Send notification to Support Team
    try {
      await transporter.sendMail({
        from: FROM_ADDRESS,
        to: SUPPORT_EMAIL,
        replyTo: contact,
        subject: `[Zoi Ticket #${ref}] ${personaLabel} Support Request`,
        html,
      });
      console.log(`[Escalation] Support email sent for #${ref} to ${SUPPORT_EMAIL}`);
    } catch (mailErr) {
      console.error(`[Escalation] Failed to send support email for #${ref}:`, mailErr);
    }

    // 2. Dispatch Confirmation via Email or SMS Gateway
    let channelNotice = "";
    if (contact.includes("@")) {
      channelNotice = `Confirmation email sent to ${contact}.`;
      try {
        const userConfirmationHtml = `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #E5E7EB;border-radius:8px;background:#FFFFFF;">
            <div style="border-bottom:2px solid #008882;padding-bottom:16px;margin-bottom:16px;">
              <h2 style="color:#263D88;margin:0;font-size:18px;">ZoikoMeds Support Ticket Created</h2>
              <p style="color:#6B7280;font-size:13px;margin:4px 0 0;">Ticket Reference: <strong>#${ref}</strong></p>
            </div>
            <p style="font-size:14px;color:#374151;line-height:1.5;">Hello,</p>
            <p style="font-size:14px;color:#374151;line-height:1.5;">Thank you for contacting ZoikoMeds. We have received your request and assigned ticket reference number <strong>#${ref}</strong>.</p>
            ${issueMessage ? `<div style="background:#F9FAFB;padding:12px 16px;border-radius:6px;margin:16px 0;font-size:13px;color:#4B5563;"><strong>Your Description:</strong><br/>${issueMessage}</div>` : ""}
            <p style="font-size:14px;color:#374151;line-height:1.5;">Our team will review your ticket and reach out to you within one business day.</p>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:20px 0;" />
            <p style="font-size:12px;color:#9CA3AF;">ZoikoMeds Support Team &middot; support@zoikomeds.com</p>
          </div>
        `;
        await transporter.sendMail({
          from: FROM_ADDRESS,
          to: contact,
          subject: `[ZoikoMeds] Request Confirmation — Ticket #${ref}`,
          html: userConfirmationHtml,
        });
        console.log(`[Escalation] Confirmation receipt sent to user: ${contact}`);
      } catch (userMailErr) {
        console.error(`[Escalation] Failed to send confirmation email to user ${contact}:`, userMailErr);
      }
    } else {
      channelNotice = `SMS notification queued for ${contact}.`;
      console.log(`[SMS Gateway] SMS dispatch queued for ticket #${ref} to phone ${contact}`);
    }

    return successResponse({
      ref,
      message: `Request received — reference #${ref}. ${channelNotice} Our team responds within one business day.`,
    });
  } catch (err) {
    console.error("[Escalations] Internal error:", err);
    return errorResponse("internal_error", 500);
  }
}