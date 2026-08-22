/**
 * The confirmation email a person receives after submitting a form.
 *
 * Deliberately contains nothing internal: no reference IDs, no staff routing,
 * no other fields from the submission. It confirms receipt and states when.
 *
 * Table-based layout with inline styles, because Outlook and several webmail
 * clients strip <style> blocks and ignore flexbox/grid.
 */
import type { SubmissionTime } from "./submissionTime";

/** Escape text for HTML. Every interpolated value passes through this. */
export function escapeHtml(value: string): string {
  if (!value) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ConfirmationContent {
  /** The person's name, when the form collected one. */
  name?: string;
  /** Human-readable form name, e.g. "Request a Briefing". */
  formName: string;
  submittedAt: SubmissionTime;
}

const SUPPORT_EMAIL = "info@zoikomeds.com";
const BRAND_NAVY = "#0D1A33";
const BRAND_GREEN = "#0D9A72";

/** "Thank you, Naveen." — or the neutral form when no name was given. */
function greeting(name?: string): string {
  const trimmed = name?.trim();
  return trimmed ? `Thank you, ${trimmed}.` : "Thank you for getting in touch.";
}

/** One label/value row in the details card. */
function detailRow(label: string, value: string, isLast = false): string {
  return `
              <tr>
                <td style="padding:14px 20px;${isLast ? "" : "border-bottom:1px solid #eef1f6;"}">
                  <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.6px;">${escapeHtml(
                    label,
                  )}</div>
                  <div style="font-size:15px;color:${BRAND_NAVY};font-weight:600;margin-top:4px;">${escapeHtml(
                    value,
                  )}</div>
                </td>
              </tr>`;
}

export function renderConfirmationHtml(content: ConfirmationContent): string {
  const { formName, submittedAt } = content;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(formName)} — received</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
  <!-- Preheader: the one-line summary a mail client shows next to the subject. -->
  <div style="display:none;font-size:1px;color:#f1f5f9;max-height:0;overflow:hidden;">
    We've received your ${escapeHtml(formName)} submission.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr>
      <td align="center" style="padding:28px 12px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
          style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">

          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND_NAVY};padding:26px 32px;">
              <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">ZOIKO<span style="color:${BRAND_GREEN};">MEDS</span></span>
            </td>
          </tr>

          <!-- Success indicator -->
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#f0faf5;border-radius:999px;padding:7px 16px;font-size:13px;font-weight:700;color:${BRAND_GREEN};">
                    &#10003;&nbsp; Request received successfully
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:22px 32px 0 32px;">
              <h1 style="margin:0;font-size:21px;line-height:1.35;font-weight:700;color:${BRAND_NAVY};">${escapeHtml(
                greeting(content.name),
              )}</h1>
              <p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:#475569;">
                We&rsquo;ve successfully received your <strong style="color:${BRAND_NAVY};">&ldquo;${escapeHtml(
                  formName,
                )}&rdquo;</strong> submission. This email confirms it reached our team.
              </p>
            </td>
          </tr>

          <!-- Details card -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:10px;">Submission details</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background-color:#fbfdff;">
                ${detailRow("Request", formName)}
                ${detailRow("Received", submittedAt.formatted)}
                ${detailRow("Time zone", submittedAt.zoneLabel, true)}
              </table>
            </td>
          </tr>

          <!-- Next steps -->
          <tr>
            <td style="padding:24px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#f8fafc;border-left:4px solid ${BRAND_GREEN};border-radius:8px;">
                <tr>
                  <td style="padding:16px 18px;font-size:14px;line-height:1.6;color:#475569;">
                    <strong style="color:${BRAND_NAVY};">What happens next</strong><br>
                    Our team will review your request and follow up by email if any additional
                    information is required. You don&rsquo;t need to do anything further right now.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td style="padding:24px 32px 32px 32px;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#475569;">
                Thank you for contacting ZoikoMeds.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:22px 32px;text-align:center;">
              <div style="font-size:13px;font-weight:700;color:${BRAND_NAVY};">ZoikoMeds</div>
              <div style="font-size:12px;color:#94a3b8;margin-top:6px;line-height:1.6;">
                Questions? Reply to this email or write to
                <a href="mailto:${SUPPORT_EMAIL}" style="color:${BRAND_GREEN};text-decoration:none;font-weight:600;">${SUPPORT_EMAIL}</a>.
              </div>
              <div style="font-size:11px;color:#cbd5e1;margin-top:10px;">
                This is an automated confirmation of a form you submitted on zoikomeds.com.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Plain-text alternative, for clients that refuse HTML. */
export function renderConfirmationText(content: ConfirmationContent): string {
  const { formName, submittedAt } = content;
  return [
    "ZOIKOMEDS",
    "",
    "REQUEST RECEIVED SUCCESSFULLY",
    "",
    greeting(content.name),
    "",
    `We've successfully received your "${formName}" submission. This email`,
    "confirms it reached our team.",
    "",
    "SUBMISSION DETAILS",
    "------------------",
    `Request    : ${formName}`,
    `Received   : ${submittedAt.formatted}`,
    `Time zone  : ${submittedAt.zoneLabel}`,
    "",
    "WHAT HAPPENS NEXT",
    "Our team will review your request and follow up by email if any",
    "additional information is required. You don't need to do anything",
    "further right now.",
    "",
    "Thank you for contacting ZoikoMeds.",
    "",
    "--",
    "ZoikoMeds",
    `Questions? Reply to this email or write to ${SUPPORT_EMAIL}.`,
    "This is an automated confirmation of a form you submitted on zoikomeds.com.",
  ].join("\n");
}

/** The subject line for a confirmation. */
export function confirmationSubject(formName: string): string {
  return `We've received your ${formName} request — ZoikoMeds`;
}
