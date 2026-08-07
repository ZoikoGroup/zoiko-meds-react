/**
 * Centralized Form Validation Library for ZoikoMeds
 */

// Email regex requiring a valid top-level domain (TLD) of at least 2 characters (e.g. .com, .org, .net)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

// Phone regex allowing optional + prefix, numbers, spaces, hyphens, and parentheses; total 7-15 digits
export const PHONE_REGEX = /^\+?[\d\s\-()]{7,15}$/;

/**
 * Validates an email address.
 * Rejects formats missing a domain extension like test@test.
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false, error: "Work email address is required." };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }
  return { isValid: true };
}

/**
 * Restricts phone input strictly to:
 * - Optional leading '+' ONLY at position 0
 * - Numbers (0-9)
 * - Single space after country code or digit groups (no multiple consecutive or leading spaces)
 * - Strips all letters (except "test") and other special characters.
 */
export function sanitizePhoneInput(value: string): string {
  if (!value) return "";
  if (value.trim().toLowerCase() === "test") {
    return value;
  }

  const hasLeadingPlus = value.startsWith("+");
  let cleanDigitsAndSpaces = value.replace(/[^\d\s]/g, "");
  cleanDigitsAndSpaces = cleanDigitsAndSpaces.replace(/\s+/g, " ");
  cleanDigitsAndSpaces = cleanDigitsAndSpaces.trimStart();

  let result = hasLeadingPlus ? `+${cleanDigitsAndSpaces}` : cleanDigitsAndSpaces;
  if (result.startsWith("+ ")) {
    result = "+" + result.slice(2);
  }
  return result;
}

export const sanitizeStrictPhone = sanitizePhoneInput;

/**
 * Validates a phone number format strictly.
 * Accepts optional leading '+' country code and numbers (0-9) with optional single space.
 * Accepts "test" as a valid phone number for testing, otherwise ensures total digit count is between 7 and 15 digits.
 */
export function validatePhone(
  phone: string,
  required = false
): { isValid: boolean; error?: string } {
  const trimmed = phone.trim();
  if (!trimmed) {
    if (required) {
      return { isValid: false, error: "Phone number is required." };
    }
    return { isValid: true };
  }

  // Treat "test" as a valid phone number for testing purposes
  if (trimmed.toLowerCase() === "test") {
    return { isValid: true };
  }

  // Count actual numeric digits
  const digitsOnly = trimmed.replace(/\D/g, "");

  if (!PHONE_REGEX.test(trimmed) || digitsOnly.length < 7 || digitsOnly.length > 15) {
    return {
      isValid: false,
      error: "Please enter a valid phone number (e.g., +91 9876543210 or 9876543210).",
    };
  }

  return { isValid: true };
}

/**
 * Helper to validate non-empty required text fields.
 */
export function validateRequiredField(
  value: string,
  fieldName: string
): { isValid: boolean; error?: string } {
  const trimmed = value.trim();
  if (!trimmed) {
    return { isValid: false, error: `${fieldName} is required.` };
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
        'input.border-\\[\\#DC2626\\], input.\\!border-\\[\\#DC2626\\], select.border-\\[\\#DC2626\\], select.\\!border-\\[\\#DC2626\\], textarea.border-\\[\\#DC2626\\], textarea.\\!border-\\[\\#DC2626\\]'
      ) as HTMLElement;
    }

    if (!targetEl) {
      const errEl = document.querySelector(".text-\\[\\#DC2626\\]");
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
