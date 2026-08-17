/**
 * Centralized Form Validation Library for ZoikoMeds
 */

/**
 * Validates an email address against standard email syntax.
 * Does NOT restrict to specific providers or whitelist domain extensions.
 * Rejects formats missing domain dot/TLD, invalid TLDs, spaces, or consecutive dots.
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  // Reject spaces or consecutive dots
  if (/\s/.test(trimmed) || trimmed.includes("..")) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  const parts = trimmed.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  const [local, domain] = parts;

  // Local part validation: non-empty, no leading/trailing dot, valid characters
  if (!local || local.startsWith(".") || local.endsWith(".")) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  if (!/^[a-zA-Z0-9._%+-]+$/.test(local)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  // Domain part validation: non-empty, no leading/trailing dot
  if (!domain || domain.startsWith(".") || domain.endsWith(".")) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  const domainParts = domain.split(".");
  if (domainParts.length < 2) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  // Validate each domain label
  for (const part of domainParts) {
    if (!part || !/^[a-zA-Z0-9-]+$/.test(part) || part.startsWith("-") || part.endsWith("-")) {
      return { isValid: false, error: "Please enter a valid email address." };
    }
  }

  // Top-level domain (TLD) must be at least 2 letters
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,}$/.test(tld)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  return { isValid: true };
}

// Retain regex export for compatibility if imported elsewhere
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

/**
 * Restricts phone input strictly to:
 * - Numbers (0-9)
 * - Leading '+' (only at index 0)
 * - Spaces
 * - Hyphens (-)
 * - Parentheses ( and )
 * Strips all alphabetic characters (A-Z, a-z) and special symbols (@, #, $, %, etc.).
 */
export function sanitizePhoneInput(value: string): string {
  if (!value) return "";

  // Strip any character not in [0-9+\s\-()]
  let clean = value.replace(/[^0-9+\s\-()]/g, "");

  // Ensure '+' can only appear at index 0
  if (clean.includes("+")) {
    const hasLeadingPlus = clean.startsWith("+");
    clean = (hasLeadingPlus ? "+" : "") + clean.replace(/\+/g, "");
  }

  return clean;
}

export const sanitizeStrictPhone = sanitizePhoneInput;

// Phone regex allowing optional + prefix, numbers, spaces, hyphens, and parentheses
export const PHONE_REGEX = /^\+?[\d\s\-()]{7,25}$/;

/**
 * Validates a phone number format strictly.
 * Phone is optional by default.
 * If provided, checks digit count (between 7 and 15 digits) and format.
 */
export function validatePhone(
  phone: string,
  required = false
): { isValid: boolean; error?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    if (required) {
      return { isValid: false, error: "Please enter a valid phone number." };
    }
    return { isValid: true };
  }

  // Count actual numeric digits
  const digitsOnly = trimmed.replace(/\D/g, "");

  // Check if string has any invalid chars, valid digit count (7-15), and optional + only at start
  const hasInvalidChars = /[^0-9+\s\-()]/.test(trimmed);
  const plusInWrongPlace = trimmed.indexOf("+") > 0;

  if (
    hasInvalidChars ||
    plusInWrongPlace ||
    digitsOnly.length < 7 ||
    digitsOnly.length > 15
  ) {
    return {
      isValid: false,
      error: "Please enter a valid phone number.",
    };
  }

  return { isValid: true };
}

/**
 * Helper to validate non-empty required text fields.
 */
export function validateRequiredField(
  value: string,
  errorMessage: string
): { isValid: boolean; error?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, error: errorMessage };
  }
  return { isValid: true };
}

/**
 * Automatically smooth-scrolls the viewport to the first input field containing an error.
 */
export function scrollToFirstError(fieldName?: string) {
  if (typeof window === "undefined") return;
  setTimeout(() => {
    let targetEl: HTMLElement | null = null;

    if (fieldName) {
      targetEl = document.querySelector(`[name="${fieldName}"]`) as HTMLElement;
    }

    if (!targetEl) {
      targetEl = document.querySelector(
        'input[aria-invalid="true"], select[aria-invalid="true"], textarea[aria-invalid="true"]'
      ) as HTMLElement;
    }

    if (!targetEl) {
      const errEl = document.querySelector('[role="alert"]');
      if (errEl) {
        targetEl = (errEl.closest("div, label") || errEl) as HTMLElement;
      }
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      if (typeof targetEl.focus === "function") {
        targetEl.focus({ preventScroll: true });
      }
    }
  }, 50);
}

