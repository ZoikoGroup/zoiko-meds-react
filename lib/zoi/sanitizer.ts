/**
 * ZoikoMeds Zoi™ APM & Telemetry Payload Sanitizer
 * 
 * Requirement / Pass condition (CT-019):
 * APM/error payloads exclude medicine and user content.
 * Raw or summarised Zoi™ conversation text MUST NOT enter ZoikoSignal™.
 */

import { redactPII } from "./redaction";

// High-sensitivity / medicine regex patterns to scrub from APM/Error payloads
const MEDICINE_SCRUB_PATTERNS = [
  /medicine\s*[:=]?\s*["']?([a-zA-Z0-9\s-]+)["']?/gi,
  /query\s*[:=]?\s*["']?([^"']+)["']?/gi,
  /message\s*[:=]?\s*["']?([^"']+)["']?/gi,
  /prompt\s*[:=]?\s*["']?([^"']+)["']?/gi,
];

export function sanitizeString(val: string): string {
  if (!val) return val;
  // Redact PII
  const redacted = redactPII(val).redactedText;
  // Replace sensitive query or medicine text if present
  let scrubbed = redacted;
  for (const pattern of MEDICINE_SCRUB_PATTERNS) {
    scrubbed = scrubbed.replace(pattern, () => {
      return "[CONTENT_SCRUBBED_FOR_APM]";
    });
  }
  return scrubbed;
}

export function sanitizeTelemetryProperties(
  properties?: Record<string, string | number | boolean>
): Record<string, string | number | boolean> | undefined {
  if (!properties) return undefined;

  const sanitized: Record<string, string | number | boolean> = {};

  const SENSITIVE_KEYS = ["query", "medicine", "message", "content", "transcript", "prompt", "user_text", "raw_text"];

  for (const [key, value] of Object.entries(properties)) {
    const lowerKey = key.toLowerCase();
    // Exclude medicine, query, transcript, or user content keys completely
    if (SENSITIVE_KEYS.some((k) => lowerKey === k || lowerKey === `${k}s` || lowerKey.endsWith(`_${k}`))) {
      sanitized[key] = "[SCRUBBED]";
    } else if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function sanitizeErrorPayload(error: unknown): Record<string, unknown> {
  const errObj = error instanceof Error ? { message: error.message, stack: error.stack } : { rawError: String(error) };

  const sanitizedMessage = typeof errObj.message === "string" ? sanitizeString(errObj.message) : "An error occurred";
  const sanitizedStack = typeof errObj.stack === "string" ? sanitizeString(errObj.stack) : undefined;

  return {
    success: false,
    error: "sanitized_error",
    detail: sanitizedMessage,
    ...(sanitizedStack ? { stack: sanitizedStack } : {}),
  };
}
