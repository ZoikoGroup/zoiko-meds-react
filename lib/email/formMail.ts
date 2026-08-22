/**
 * The mail side of a form submission.
 *
 * Every website form goes through {@link dispatchFormEmails}: one internal
 * notification to the server-controlled address, and one confirmation to the
 * address the visitor actually typed. Neither can fail the submission — a saved
 * record must never be lost because an SMTP host was briefly unreachable.
 */
import { EMAIL_REGEX } from "@/lib/validation";
import {
  confirmationSubject,
  renderConfirmationHtml,
  renderConfirmationText,
} from "./confirmationTemplate";
import { sendNotificationEmail, type EmailDispatchResult, type EmailField } from "./emailService";
import { submissionTimeFrom, type SubmissionTime } from "./submissionTime";
import { getTransport, readSmtpSettings, INTERNAL_RECIPIENT } from "./transport";

export type { EmailField } from "./emailService";
export type { SubmissionTime } from "./submissionTime";

/**
 * Reject anything that is not a single plain address.
 *
 * Header-injection characters and comma-separated lists are refused outright:
 * a confirmation goes to exactly one submitter.
 */
export function isSendableAddress(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const address = value.trim();
  if (!address || address.length > 254) return false;
  if (/[\s,;<>"]/.test(address)) return false;
  if (/[\r\n]/.test(address)) return false;
  return EMAIL_REGEX.test(address);
}

/** Category for a log line — never the raw SMTP error text. */
function errorCategory(error?: string): string {
  if (!error) return "unknown";
  const text = error.toLowerCase();
  if (text.includes("not configured")) return "not-configured";
  if (text.includes("auth") || text.includes("535") || text.includes("534")) return "auth-rejected";
  if (text.includes("timeout") || text.includes("etimedout")) return "timeout";
  if (text.includes("econnrefused") || text.includes("enotfound") || text.includes("dns"))
    return "connection";
  if (/\b5\d\d\b/.test(text)) return "permanent-reject";
  if (/\b4\d\d\b/.test(text)) return "temporary-reject";
  return "delivery-failed";
}

export interface InternalNotificationInput {
  /** Human-readable form name, e.g. "Talk to Sales". */
  formName: string;
  /** The submitted fields, already labelled for staff to read. */
  submission: EmailField[];
  submittedAt: SubmissionTime;
  /** The submitter's address, used as Reply-To when it is valid. */
  replyTo?: string;
  /** Free-text message from the submitter, rendered as a callout. */
  note?: string;
  /** Overrides the default subject when a route wants something specific. */
  subject?: string;
}

/**
 * Tell the team about a new submission.
 *
 * The recipient is fixed server-side; a request can never redirect it.
 */
export async function sendInternalNotification(
  input: InternalNotificationInput,
): Promise<EmailDispatchResult> {
  const { formName, submission, submittedAt } = input;

  return sendNotificationEmail({
    title: `New submission: ${formName}`,
    subject: input.subject ?? `[${formName}] New website submission`,
    recipient: INTERNAL_RECIPIENT,
    // Only a valid address may become a header value.
    replyTo: isSendableAddress(input.replyTo) ? input.replyTo.trim() : undefined,
    note: input.note?.trim() || undefined,
    fields: [
      { label: "Form", value: formName },
      ...submission,
      { label: "Submitted At", value: submittedAt.formatted },
      { label: "Time Zone", value: submittedAt.zoneLabel },
    ],
  });
}

export interface UserConfirmationInput {
  /** The address the visitor typed. Validated before use. */
  to: string;
  name?: string;
  formName: string;
  submittedAt: SubmissionTime;
}

/**
 * Confirm receipt to the person who submitted the form.
 *
 * Sent through the shared transport directly rather than through
 * {@link sendNotificationEmail}, because that renders the internal staff layout.
 */
export async function sendUserConfirmation(
  input: UserConfirmationInput,
): Promise<EmailDispatchResult> {
  if (!isSendableAddress(input.to)) {
    return { success: false, error: "Invalid recipient address" };
  }
  const to = input.to.trim();

  const settings = readSmtpSettings();
  const transport = getTransport();
  if (!settings || !transport) {
    return { success: false, error: "SMTP is not configured" };
  }

  const content = {
    name: input.name,
    formName: input.formName,
    submittedAt: input.submittedAt,
  };

  try {
    const info = await transport.sendMail({
      from: settings.from,
      to,
      replyTo: settings.fromAddress,
      subject: confirmationSubject(input.formName),
      text: renderConfirmationText(content),
      html: renderConfirmationHtml(content),
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export interface FormEmailInput {
  formName: string;
  /** Labelled fields for the internal notification. */
  submission: EmailField[];
  /** The address the visitor typed — the confirmation recipient. */
  userEmail?: string;
  /** The visitor's name, for the greeting. */
  userName?: string;
  note?: string;
  subject?: string;
  /** IANA zone from the browser. Used only to format the server timestamp. */
  timezone?: unknown;
  /** A server-generated instant, when the caller already has one. */
  submittedAt?: SubmissionTime;
}

export interface FormEmailOutcome {
  submittedAt: SubmissionTime;
  internal: EmailDispatchResult;
  confirmation: EmailDispatchResult | null;
}

/**
 * Send both emails for one submission. Never throws, never rejects.
 *
 * The two deliveries are independent: a failed confirmation does not stop the
 * internal notification, and neither affects the caller's HTTP response.
 */
export async function dispatchFormEmails(input: FormEmailInput): Promise<FormEmailOutcome> {
  const submittedAt = input.submittedAt ?? submissionTimeFrom(input.timezone);

  const safely = async (label: string, run: () => Promise<EmailDispatchResult>) => {
    try {
      const result = await run();
      if (!result.success) {
        console.error(
          `[mail] ${label} failed — form="${input.formName}" category=${errorCategory(result.error)}`,
        );
      }
      return result;
    } catch (err) {
      // A thrown error here would abandon the other email.
      console.error(
        `[mail] ${label} threw — form="${input.formName}" category=${errorCategory(
          err instanceof Error ? err.message : String(err),
        )}`,
      );
      return { success: false, error: "Delivery failed" } as EmailDispatchResult;
    }
  };

  // Concurrent so a slow confirmation never delays the internal alert.
  const [internal, confirmation] = await Promise.all([
    safely("internal notification", () =>
      sendInternalNotification({
        formName: input.formName,
        submission: input.submission,
        submittedAt,
        replyTo: input.userEmail,
        note: input.note,
        subject: input.subject,
      }),
    ),
    isSendableAddress(input.userEmail)
      ? safely("user confirmation", () =>
          sendUserConfirmation({
            to: input.userEmail as string,
            name: input.userName,
            formName: input.formName,
            submittedAt,
          }),
        )
      : Promise.resolve(null),
  ]);

  return { submittedAt, internal, confirmation };
}
