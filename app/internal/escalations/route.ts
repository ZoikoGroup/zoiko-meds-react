import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/api/rate-limit";
import { successResponse, errorResponse, validateRequired } from "@/lib/api/helpers";
import { escapeHtml } from "@/lib/email/confirmationTemplate";
import { getTransport, readSmtpSettings } from "@/lib/email/transport";

const SUPPORT_EMAIL = process.env.RECIPIENT_EMAIL || process.env.SUPPORT_EMAIL || "info@zoikomeds.com";

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

/**
 * Send through the one shared SMTP transport.
 *
 * Throws when SMTP is unconfigured, so the caller's try/catch logs it and the
 * escalation still succeeds.
 */
async function sendViaSharedTransport(options: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const settings = readSmtpSettings();
  const transport = getTransport();
  if (!settings || !transport) {
    throw new Error("SMTP is not configured");
  }
  await transport.sendMail({ from: settings.from, ...options });
}

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
            <strong>${escapeHtml(sender)}</strong> &middot; ${escapeHtml(time)}
          </div>
          <div style="font-size:13px;color:#111827;white-space:pre-wrap;">${escapeHtml(m.content)}</div>
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

    // Free text from the visitor: escaped before it reaches the email body.
    const issueHtml = issueMessage
      ? `<div style="background:#F0FDFA;border-left:4px solid #008882;padding:12px 16px;margin-bottom:20px;border-radius:4px;">
           <strong style="color:#0f766e;font-size:13px;">User Reported Issue:</strong>
           <div style="font-size:14px;color:#111827;margin-top:4px;white-space:pre-wrap;">${escapeHtml(issueMessage)}</div>
         </div>`
      : "";

    /** The visitor's contact detail, safe to interpolate into HTML. */
    const contactHtml = escapeHtml(contact);

    const html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:linear-gradient(135deg,#263D88 0%,#1E2F6E 100%);padding:24px;border-radius:8px 8px 0 0;">
          <h1 style="color:#FFFFFF;margin:0;font-size:20px;">New Support Escalation</h1>
          <p style="color:#A5B4FC;margin:8px 0 0;font-size:14px;">Reference Ticket: #${ref}</p>
        </div>
        <div style="padding:24px;background:#FFFFFF;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6;">Ticket Ref</td><td style="padding:8px 12px;font-size:13px;color:#111827;font-weight:600;border-bottom:1px solid #F3F4F6;">#${ref}</td></tr>
            <tr><td style="padding:8px 12px;font-size:13px;color:#6B7280;border-bottom:1px solid #F3F4F6;">Contact</td><td style="padding:8px 12px;font-size:13px;color:#111827;border-bottom:1px solid #F3F4F6;">${contactHtml}</td></tr>
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

    // Detect if this request is a stock alert subscription vs general support ticket
    const isStockAlert = issueMessage?.toLowerCase().includes("stock alert") || issueMessage?.toLowerCase().includes("alert subscription");

    // 1. Send notification to Support / Operations Team
    try {
      if (process.env.NODE_ENV !== "test") {
        await sendViaSharedTransport({
          to: SUPPORT_EMAIL,
          replyTo: contact,
          subject: `[Zoi ${isStockAlert ? "Alert" : "Ticket"} #${ref}] ${personaLabel} ${isStockAlert ? "Stock Alert" : "Support Request"}`,
          html,
        });
      }
      console.log(`[Escalation] Support email sent for #${ref} to ${SUPPORT_EMAIL}`);
    } catch (mailErr) {
      console.error(`[Escalation] Failed to send support email for #${ref}:`, mailErr);
    }

    // 2. Dispatch Enterprise Swiggy/Zomato-Style Confirmation via Email or SMS Gateway
    let channelNotice = "";
    if (contact.includes("@")) {
      channelNotice = `Confirmation email sent to ${contact}.`;
      try {
        const userConfirmationHtml = isStockAlert ? `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#F8FAFC;padding:16px;">
            <div style="background:#FFFFFF;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;box-shadow:0 4px 16px rgba(15,23,42,0.06);">
              <!-- Header Table (Flex replacement for Mobile Email compatibility) -->
              <div style="background:linear-gradient(135deg,#008882 0%,#263D88 100%);padding:20px;color:#FFFFFF;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;margin-bottom:6px;">
                  <tr>
                    <td align="left" style="vertical-align:middle;text-align:left;">
                      <span style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#FFFFFF;display:inline-block;">ZoikoMeds</span>
                    </td>
                    <td align="right" style="vertical-align:middle;text-align:right;">
                      <span style="background:rgba(255,255,255,0.22);color:#FFFFFF;font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.04em;display:inline-block;white-space:nowrap;">
                        🟢 Stock Monitor Active
                      </span>
                    </td>
                  </tr>
                </table>
                <div style="font-size:13px;color:#E0F2FE;font-weight:500;">
                  Automated Availability Signal Network
                </div>
              </div>

              <!-- Body -->
              <div style="padding:20px;">
                <h2 style="font-size:16.5px;font-weight:700;color:#0F172A;margin:0 0 6px;">Stock Alert Subscribed</h2>
                <p style="font-size:13px;color:#475569;margin:0 0 16px;line-height:1.5;">
                  Your availability alert has been registered. Our signal network continuously monitors inventory across partner pharmacies.
                </p>

                <!-- Robust Fixed Table Layout for Mobile Screens -->
                <div style="background:#F0FDFA;border:1px solid #99F6E4;border-radius:10px;padding:14px;margin-bottom:16px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:13px;table-layout:fixed;">
                    <tr>
                      <td width="85" style="width:85px;padding:6px 0;color:#0F766E;font-weight:600;vertical-align:top;">Alert Ref:</td>
                      <td style="padding:6px 0;color:#0F172A;font-weight:700;vertical-align:top;text-align:left;word-break:break-all;">#${ref}</td>
                    </tr>
                    <tr>
                      <td width="85" style="width:85px;padding:6px 0;color:#0F766E;font-weight:600;vertical-align:top;">Recipient:</td>
                      <td style="padding:6px 0;color:#0F172A;font-weight:600;vertical-align:top;text-align:left;word-break:break-all;word-wrap:break-word;">${contactHtml}</td>
                    </tr>
                    <tr>
                      <td width="85" style="width:85px;padding:6px 0;color:#0F766E;font-weight:600;vertical-align:top;">Details:</td>
                      <td style="padding:6px 0;color:#0F172A;font-weight:600;vertical-align:top;text-align:left;word-break:break-word;line-height:1.4;">${issueMessage ?? "Medicine stock monitoring"}</td>
                    </tr>
                  </table>
                </div>

                <div style="background:#FFFBEB;border-left:4px solid #F59E0B;padding:12px 14px;border-radius:6px;margin-bottom:18px;">
                  <div style="font-size:12px;font-weight:700;color:#92400E;margin-bottom:2px;">⚡ Instant Dispatch SLA</div>
                  <div style="font-size:12px;color:#78350F;line-height:1.4;">
                    As soon as verified stock is reported by network pharmacies, an automated alert will be sent immediately.
                  </div>
                </div>

                <hr style="border:none;border-top:1px solid #E2E8F0;margin:18px 0 14px;" />
                <div style="font-size:11.5px;color:#94A3B8;text-align:center;line-height:1.5;">
                  ZoikoMeds Signal Network &middot; Real-Time Pharmaceutical Availability Engine<br/>
                  Need help? Contact <a href="mailto:support@zoikomeds.com" style="color:#008882;text-decoration:none;">support@zoikomeds.com</a>
                </div>
              </div>
            </div>
          </div>
        ` : `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#F8FAFC;padding:16px;">
            <div style="background:#FFFFFF;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;box-shadow:0 4px 16px rgba(15,23,42,0.06);">
              <div style="background:linear-gradient(135deg,#263D88 0%,#1E2F6E 100%);padding:20px;color:#FFFFFF;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;margin-bottom:6px;">
                  <tr>
                    <td align="left" style="vertical-align:middle;text-align:left;">
                      <span style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#FFFFFF;display:inline-block;">ZoikoMeds</span>
                    </td>
                    <td align="right" style="vertical-align:middle;text-align:right;">
                      <span style="background:rgba(255,255,255,0.22);color:#FFFFFF;font-size:10px;font-weight:700;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.04em;display:inline-block;white-space:nowrap;">
                        🔵 Ticket Received
                      </span>
                    </td>
                  </tr>
                </table>
                <div style="font-size:13px;color:#E0F2FE;font-weight:500;">
                  Customer Support Desk
                </div>
              </div>

              <div style="padding:20px;">
                <h2 style="font-size:16.5px;font-weight:700;color:#0F172A;margin:0 0 6px;">Support Ticket #${ref}</h2>
                <p style="font-size:13px;color:#475569;margin:0 0 16px;line-height:1.5;">
                  Thank you for contacting ZoikoMeds. Our support team has logged your inquiry under reference <strong>#${ref}</strong>.
                </p>

                ${issueMessage ? `
                  <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px;margin-bottom:16px;font-size:13px;color:#334155;">
                    <strong style="color:#0F172A;">Submitted Issue:</strong>
                    <div style="margin-top:4px;white-space:pre-wrap;word-break:break-word;">${issueMessage}</div>
                  </div>
                ` : ""}

                <div style="background:#F0FDF4;border-left:4px solid #10B981;padding:12px 14px;border-radius:6px;margin-bottom:18px;">
                  <div style="font-size:12px;font-weight:700;color:#065F46;margin-bottom:2px;">⏱ Target SLA</div>
                  <div style="font-size:12px;color:#047857;line-height:1.4;">
                    Our support team reviews tickets continuously and will respond to ${contactHtml} within one business day.
                  </div>
                </div>

                <hr style="border:none;border-top:1px solid #E2E8F0;margin:18px 0 14px;" />
                <div style="font-size:11.5px;color:#94A3B8;text-align:center;line-height:1.5;">
                  ZoikoMeds Customer Support &middot; <a href="mailto:support@zoikomeds.com" style="color:#008882;text-decoration:none;">support@zoikomeds.com</a>
                </div>
              </div>
            </div>
          </div>
        `;
        if (process.env.NODE_ENV !== "test") {
          await sendViaSharedTransport({
            to: contact,
            subject: `[ZoikoMeds] ${isStockAlert ? "Stock Alert Activated" : "Support Ticket Received"} — #${ref}`,
            html: userConfirmationHtml,
          });
        }
        console.log(`[Escalation] Confirmation receipt sent to user: ${contact}`);
      } catch (userMailErr) {
        console.error(`[Escalation] Failed to send confirmation email to user ${contact}:`, userMailErr);
      }
    }

    return successResponse({
      ref,
      message: `Request received — reference #${ref}. ${channelNotice}Our team responds within one business day.`.replace(/\s+/g, " "),
    });
  } catch (err) {
    console.error("[Escalations] Internal error:", err);
    return errorResponse("internal_error", 500);
  }
}