/**
 * ZoikoMeds Zoi™ Controlled Minimisation and Redaction Layer
 * 
 * Target PII/PHI classes:
 * - Names (e.g. John Doe, Patient Jane Smith)
 * - Contacts (email addresses, phone numbers)
 * - Identifiers (SSN, Patient ID, National ID)
 * - Date of Birth (DOB formats)
 * - Prescription IDs (e.g. RX-12345, RXID-998)
 * - Prescriber Identity (Dr. Name, NPI: 10-digit number)
 */

export interface RedactionResult {
  redactedText: string;
  removedClasses: string[];
  hasRedactions: boolean;
}

// Regex patterns for target PII/PHI classes
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const PHONE_REGEX = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}\b/g;
const SSN_REGEX = /\b\d{3}-\d{2}-\d{4}\b/g;
const DOB_PATTERNS = [
  /\b(dob|date of birth|born|birthdate)\s*[:=]?\s*(\d{1,2}[\/\.-]\d{1,2}[\/\.-]\d{2,4}|\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})/gi,
  /\b(0[1-9]|1[0-2])[\/\.-](0[1-9]|[12]\d|3[01])[\/\.-](19|20)\d{2}\b/g,
  /\b(19|20)\d{2}[\/\.-](0[1-9]|1[0-2])[\/\.-](0[1-9]|[12]\d|3[01])\b/g,
];

const RX_ID_REGEX = /\b(rx\s*#?|rxid\s*[:=]?|prescription\s*(?:id|#|number)?\s*[:=]?)\s*([a-z0-9-]{4,15})\b/gi;
const PRESCRIBER_PATTERNS = [
  /\b(dr\.?|doctor|prescriber)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi,
  /\bnpi\s*[:=]?\s*(\d{10})\b/gi,
];

const IDENTIFIER_PATTERNS = [
  /\b(patient\s*id|pid|id\s*number)\s*[:=]?\s*([a-z0-9-]{4,15})\b/gi,
  /\b(ssn|social security)\s*[:=]?\s*(\d{3}-\d{2}-\d{4})\b/gi,
];

const NAME_PATTERNS = [
  /\bmy name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi,
  /\bpatient(?:\s+name)?\s*[:=]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi,
  /\bfor\s+patient\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi,
];

export function redactPII(input: string): RedactionResult {
  if (!input || typeof input !== "string") {
    return { redactedText: "", removedClasses: [], hasRedactions: false };
  }

  let text = input;
  const removedClasses = new Set<string>();

  // 1. Email Redaction
  if (EMAIL_REGEX.test(text)) {
    text = text.replace(EMAIL_REGEX, "[REDACTED_CONTACT]");
    removedClasses.add("contacts");
  }

  // 2. Phone Redaction (filter out simple 4-digit numbers to avoid redacting generic numbers)
  text = text.replace(PHONE_REGEX, (match) => {
    const digits = match.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15) {
      removedClasses.add("contacts");
      return "[REDACTED_CONTACT]";
    }
    return match;
  });

  // 3. SSN & Patient Identifiers
  if (SSN_REGEX.test(text)) {
    text = text.replace(SSN_REGEX, "[REDACTED_IDENTIFIER]");
    removedClasses.add("identifiers");
  }

  for (const pattern of IDENTIFIER_PATTERNS) {
    text = text.replace(pattern, (match, prefix) => {
      removedClasses.add("identifiers");
      return `${prefix}: [REDACTED_IDENTIFIER]`;
    });
  }

  // 4. Date of Birth (DOB)
  for (const pattern of DOB_PATTERNS) {
    text = text.replace(pattern, (match) => {
      removedClasses.add("dob");
      return "[REDACTED_DOB]";
    });
  }

  // 5. Prescription IDs
  text = text.replace(RX_ID_REGEX, (match, prefix) => {
    removedClasses.add("prescription_ids");
    return `${prefix}: [REDACTED_RX_ID]`;
  });

  // 6. Prescriber Identity
  for (const pattern of PRESCRIBER_PATTERNS) {
    text = text.replace(pattern, (match, prefix) => {
      removedClasses.add("prescriber_identity");
      return `${prefix} [REDACTED_PRESCRIBER]`;
    });
  }

  // 7. Patient Names
  text = text.replace(/\bmy name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi, (match) => {
    removedClasses.add("names");
    return "my name is [REDACTED_NAME]";
  });
  text = text.replace(/\bpatient(?:\s+name)?\s*[:=]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi, (match) => {
    removedClasses.add("names");
    return "patient: [REDACTED_NAME]";
  });
  text = text.replace(/\bfor\s+patient\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\b/gi, (match) => {
    removedClasses.add("names");
    return "for patient [REDACTED_NAME]";
  });

  return {
    redactedText: text,
    removedClasses: Array.from(removedClasses),
    hasRedactions: removedClasses.size > 0,
  };
}

export function hasPII(input: string): boolean {
  const result = redactPII(input);
  return result.hasRedactions;
}
