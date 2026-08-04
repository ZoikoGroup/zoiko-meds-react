import nodemailer from "nodemailer";

export interface EmailField {
  label: string;
  value: string;
}

export interface GenericEmailPayload {
  title: string;
  subject: string;
  fields: EmailField[];
  replyTo?: string;
  recipient?: string;
  note?: string;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface RegistrationEmailDetails {
  workEmail: string;
  fullName: string;
  orgName: string;
  pharmacyType: string;
  note?: string;
  submittedAt: string;
}

/**
  Generate modern, branded HTML email for ZoikoMeds notifications.
 */
function formatLocalTimestamp(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(date.getTime())) return new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" });
  return date.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
  });
}

/**
  Generate modern, branded HTML email for ZoikoMeds notifications.
 */
function renderHtmlEmail(title: string, fields: EmailField[], note?: string): string {
  const timestamp = formatLocalTimestamp();

  const fieldRows = fields
    .map(
      (f) => `
      <tr style="border-bottom: 1px solid #eef1f6;">
        <td style="padding: 12px 16px; font-weight: 600; width: 35%; color: #0D1A33; background-color: #f8fafc; font-size: 13px;">${escapeHtml(
          f.label
        )}</td>
        <td style="padding: 12px 16px; color: #334155; font-size: 14px; word-break: break-word;">${
          f.value.startsWith("http")
            ? `<a href="${escapeHtml(f.value)}" style="color: #0D9A72; text-decoration: underline;">${escapeHtml(
                f.value
              )}</a>`
            : f.value.includes("@") && !f.value.includes(" ")
            ? `<a href="mailto:${escapeHtml(f.value)}" style="color: #0D9A72; text-decoration: underline;">${escapeHtml(
                f.value
              )}</a>`
            : escapeHtml(f.value)
        }</td>
      </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
      <table role="presentation" style="width: 100%; border-collapse: collapse; padding: 24px 0;">
        <tr>
          <td align="center">
            <table role="presentation" style="width: 100%; max-width: 620px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
              
              <!-- Header -->
              <tr>
                <td style="background-color: #0D1A33; padding: 28px 32px; text-align: left;">
                  <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">ZOIKO<span style="color: #0D9A72;">MEDS</span></span>
                  <div style="font-size: 12px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; tracking: 1px; font-weight: 600;">System Notification</div>
                </td>
              </tr>

              <!-- Content Body -->
              <tr>
                <td style="padding: 32px;">
                  <h2 style="margin: 0 0 12px 0; color: #0D1A33; font-size: 20px; font-weight: 700;">${escapeHtml(title)}</h2>
                  <p style="margin: 0 0 24px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                    A new submission was received on <strong>ZoikoMeds.com</strong> at <strong>${timestamp}</strong>.
                  </p>

                  <!-- Fields Table -->
                  <table role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
                    ${fieldRows}
                  </table>

                  ${
                    note
                      ? `
                    <div style="background-color: #f0faf5; border-left: 4px solid #0D9A72; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
                      <div style="font-size: 12px; font-weight: 700; color: #0D9A72; text-transform: uppercase; margin-bottom: 4px;">Additional Note</div>
                      <div style="font-size: 14px; color: #1e293b; line-height: 1.5;">${escapeHtml(note)}</div>
                    </div>`
                      : ""
                  }

                  <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px 16px; font-size: 12px; color: #64748b;">
                    <strong>Action Required:</strong> Please review this record and follow up with the user/organization promptly.
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
                  ZoikoMeds Platform Email Dispatcher &bull; GoDaddy SMTP &bull; Target: ${escapeHtml(
                    process.env.RECIPIENT_EMAIL || "info@zoikomeds.com"
                  )}
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTextEmail(title: string, fields: EmailField[], note?: string): string {
  const timestamp = formatLocalTimestamp();
  let text = `=================================================================\n`;
  text += `${title.toUpperCase()}\n`;
  text += `=================================================================\n\n`;
  text += `Submitted At: ${timestamp}\n\n`;
  for (const f of fields) {
    text += `${f.label.padEnd(22)}: ${f.value}\n`;
  }
  if (note) {
    text += `\nNote:\n${note}\n`;
  }
  text += `\n=================================================================\n`;
  return text;
}

/**
 * Generic email notification dispatcher using SMTP (GoDaddy / Nodemailer) with retry mechanism.
 */
export async function sendNotificationEmail(payload: GenericEmailPayload): Promise<EmailDispatchResult> {
  const recipient = payload.recipient || process.env.RECIPIENT_EMAIL || "info@zoikomeds.com";
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_USERNAME;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const smtpFromAddress = process.env.SMTP_FROM_ADDRESS || smtpUser || "info@zoikomeds.com";
  const smtpFromName = process.env.SMTP_FROM_NAME || "ZoikoMeds";
  const smtpFrom = process.env.SMTP_FROM || `"${smtpFromName}" <${smtpFromAddress}>`;

  const htmlContent = renderHtmlEmail(payload.title, payload.fields, payload.note);
  const textContent = renderTextEmail(payload.title, payload.fields, payload.note);

  // 1. SMTP Delivery via Nodemailer
  if (smtpHost && smtpUser && smtpPass) {
    const isSecure = smtpPort === 465 || process.env.SMTP_USE_TLS === "true";
    console.log(`[Email Service] Initiating SMTP connection to ${smtpHost}:${smtpPort} (Secure=${isSecure})...`);

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: isSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false, // Prevents self-signed SSL handshake failures on custom hosts
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const mailOptions = {
      from: smtpFrom,
      to: recipient,
      replyTo: payload.replyTo || smtpFromAddress,
      subject: payload.subject,
      text: textContent,
      html: htmlContent,
    };

    // Retry loop with exponential backoff
    const maxRetries = 2;
    let lastError = "";
    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        console.log(`[Email Service] Attempt ${attempt} of ${maxRetries + 1}: Dispatching email to ${recipient}...`);
        const info = await transporter.sendMail(mailOptions);
        console.log(`[Email Service] SUCCESS: Email delivered to ${recipient}. MessageId: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
      } catch (err: unknown) {
        lastError = err instanceof Error ? err.message : String(err);
        console.error(`[Email Service] Attempt ${attempt} failed: ${lastError}`);
        if (attempt <= maxRetries) {
          console.log(`[Email Service] Retrying in 1000ms...`);
          await new Promise((res) => setTimeout(res, 1000));
        }
      }
    }

    console.error(`[Email Service] All SMTP attempts failed. Error: ${lastError}`);
    return { success: false, error: `SMTP Delivery Failed: ${lastError}` };
  }

  // 2. Webhook Fallback if EMAIL_WEBHOOK_URL is set
  const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL;
  if (emailWebhookUrl) {
    try {
      console.log(`[Email Service] Attempting Webhook delivery to ${recipient} via ${emailWebhookUrl}...`);
      const response = await fetch(emailWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient,
          subject: payload.subject,
          text: textContent,
          html: htmlContent,
          payload,
        }),
      });

      if (response.ok) {
        console.log(`[Email Service] SUCCESS: Notification sent to ${recipient} via Webhook.`);
        return { success: true, messageId: `webhook_${Date.now()}` };
      } else {
        const errText = await response.text();
        console.error(`[Email Service] ERROR sending Webhook email:`, errText);
        return { success: false, error: `Webhook Delivery Failed: ${response.status} ${errText}` };
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[Email Service] ERROR sending Webhook email:`, errorMsg);
      return { success: false, error: `Webhook Delivery Failed: ${errorMsg}` };
    }
  }

  // 3. Dev Mode / Fallback Logging
  console.log(`\n=================================================================`);
  console.log(`[Email Service] DEV LOG (SMTP credentials not active in process.env):`);
  console.log(`Target Recipient : ${recipient}`);
  console.log(`Subject          : ${payload.subject}`);
  console.log(textContent);
  console.log(`=================================================================\n`);

  if (process.env.NODE_ENV !== "production") {
    console.log(`[Email Service] DEV MODE: Notification logged successfully.`);
    return { success: true, messageId: `dev_log_${Date.now()}` };
  }

  return {
    success: false,
    error: "SMTP service is not configured. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS in environment variables.",
  };
}

/**
 * Convenience wrapper for Verified Network registration emails.
 */
export async function sendVerifiedNetworkRegistrationEmail(
  details: RegistrationEmailDetails
): Promise<EmailDispatchResult> {
  return sendNotificationEmail({
    title: "New Verified Network Registration Request",
    subject: `New Verified Network Registration: ${details.orgName}`,
    replyTo: details.workEmail,
    note: details.note,
    fields: [
      { label: "Full Name", value: details.fullName },
      { label: "Work Email", value: details.workEmail },
      { label: "Organization / Pharmacy Name", value: details.orgName },
      { label: "Pharmacy Type", value: details.pharmacyType },
      { label: "Submitted At", value: formatLocalTimestamp(details.submittedAt) },
    ],
  });
}

/**
 * Convenience wrapper for general contact form emails.
 */
export async function sendContactFormEmail(details: {
  fullName: string;
  email: string;
  subject?: string;
  organization?: string;
  message: string;
  submittedAt?: string;
}): Promise<EmailDispatchResult> {
  return sendNotificationEmail({
    title: "New Website Contact Inquiry",
    subject: details.subject ? `Website Contact: ${details.subject}` : `New Contact Form Submission from ${details.fullName}`,
    replyTo: details.email,
    note: details.message,
    fields: [
      { label: "Full Name", value: details.fullName },
      { label: "Email Address", value: details.email },
      { label: "Organization", value: details.organization || "N/A" },
      { label: "Inquiry Subject", value: details.subject || "General Inquiry" },
      { label: "Submitted At", value: formatLocalTimestamp(details.submittedAt) },
    ],
  });
}

/**
 * Convenience wrapper for stakeholder / enterprise briefing request emails.
 */
export async function sendBriefingRequestEmail(details: {
  briefingType: string;
  fullName: string;
  workEmail: string;
  organization: string;
  jobTitle?: string;
  phone?: string;
  note?: string;
  submittedAt?: string;
}): Promise<EmailDispatchResult> {
  return sendNotificationEmail({
    title: `New Briefing Request: ${details.briefingType}`,
    subject: `Briefing Request (${details.briefingType}): ${details.organization}`,
    recipient: "info@zoikomeds.com",
    replyTo: details.workEmail,
    note: details.note,
    fields: [
      { label: "Briefing Type", value: details.briefingType },
      { label: "Full Name", value: details.fullName },
      { label: "Work Email", value: details.workEmail },
      { label: "Organization", value: details.organization },
      { label: "Job Title", value: details.jobTitle || "Not specified" },
      { label: "Phone Number", value: details.phone || "Not specified" },
      { label: "Submitted At", value: formatLocalTimestamp(details.submittedAt) },
    ],
  });
}
