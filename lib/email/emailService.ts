import nodemailer from "nodemailer";

export interface RegistrationEmailDetails {
  workEmail: string;
  fullName: string;
  orgName: string;
  pharmacyType: string;
  note?: string;
  submittedAt: string;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a notification email to info@zoikomeds.com for new verified network registration requests.
 * Uses Nodemailer with SMTP configuration if credentials are set, or webhook/logged dispatch.
 */
export async function sendVerifiedNetworkRegistrationEmail(
  details: RegistrationEmailDetails
): Promise<EmailDispatchResult> {
  const recipient = process.env.RECIPIENT_EMAIL || "info@zoikomeds.com";
  const formattedTimestamp = new Date(details.submittedAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "medium",
    timeZone: "UTC",
  });

  const emailSubject = `New Verified Network Registration: ${details.orgName}`;
  const emailText = `
=================================================================
NEW VERIFIED NETWORK REGISTRATION REQUEST
=================================================================

Submission Timestamp : ${formattedTimestamp} (${details.submittedAt})
Work Email           : ${details.workEmail}
Full Name            : ${details.fullName}
Pharmacy/Org Name    : ${details.orgName}
Pharmacy Type        : ${details.pharmacyType}
Brief Note           : ${details.note ? details.note : "(None provided)"}

=================================================================
  `.trim();

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e4ec; border-radius: 12px; padding: 24px; color: #0f1f4e; background-color: #ffffff;">
      <h2 style="color: #00A99D; margin-top: 0; font-size: 20px;">New Verified Network Registration Request</h2>
      <p style="font-size: 14px; color: #5b6478;">A new pharmacy has submitted a registration request to join the ZoikoMeds Verified Network.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #eef1f6;">
          <td style="padding: 10px 0; font-weight: bold; width: 180px; color: #0f1f4e;">Full Name:</td>
          <td style="padding: 10px 0; color: #334155;">${details.fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eef1f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #0f1f4e;">Work Email:</td>
          <td style="padding: 10px 0; color: #334155;"><a href="mailto:${details.workEmail}" style="color: #00A99D; text-decoration: none;">${details.workEmail}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eef1f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #0f1f4e;">Pharmacy / Org:</td>
          <td style="padding: 10px 0; color: #334155;">${details.orgName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eef1f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #0f1f4e;">Pharmacy Type:</td>
          <td style="padding: 10px 0; color: #334155;">${details.pharmacyType}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eef1f6;">
          <td style="padding: 10px 0; font-weight: bold; color: #0f1f4e;">Brief Note:</td>
          <td style="padding: 10px 0; color: #334155;">${details.note ? details.note : "<em>(None provided)</em>"}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #0f1f4e;">Submitted At:</td>
          <td style="padding: 10px 0; color: #334155;">${formattedTimestamp}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eef1f6; font-size: 12px; color: #9aa3b5; text-align: center;">
        Sent automatically by ZoikoMeds Platform &bull; Target Recipient: ${recipient}
      </div>
    </div>
  `;

  console.log(`[Email Service] Preparing registration notification for ${recipient}...`);

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // 1. Send via SMTP / Nodemailer if credentials are in env
  if (smtpHost && smtpUser && smtpPass) {
    try {
      console.log(`[Email Service] Attempting SMTP delivery to ${recipient} via ${smtpHost}:${smtpPort}...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"ZoikoMeds Network" <${smtpUser}>`,
        to: recipient,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      });

      console.log(`[Email Service] SUCCESS: Email delivered to ${recipient}. MessageId: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[Email Service] ERROR sending SMTP email to ${recipient}:`, errorMsg);
      return { success: false, error: `SMTP Delivery Failed: ${errorMsg}` };
    }
  }

  // 2. Send via Webhook if EMAIL_WEBHOOK_URL is set
  const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL;
  if (emailWebhookUrl) {
    try {
      console.log(`[Email Service] Attempting Webhook delivery to ${recipient} via ${emailWebhookUrl}...`);
      const response = await fetch(emailWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
          details,
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

  // 3. Development Mode / Unconfigured Transport Logging
  console.log(`\n=================================================================`);
  console.log(`[Email Service] DEV LOG (SMTP credentials not configured in process.env):`);
  console.log(`Target Recipient : ${recipient}`);
  console.log(`Subject          : ${emailSubject}`);
  console.log(emailText);
  console.log(`=================================================================\n`);

  // In non-production or dev environment without SMTP credentials, consider notification logged successfully
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Email Service] DEV MODE: Registration email logged successfully to console.`);
    return { success: true, messageId: `dev_log_${Date.now()}` };
  }

  return {
    success: false,
    error: "Email service is not configured. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.",
  };
}
