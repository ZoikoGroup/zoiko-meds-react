import { describe, expect, it } from "vitest";
import { validateEmail, validatePhone, sanitizePhoneInput } from "@/lib/validation";

describe("Email Validation", () => {
  const validEmails = [
    "test@gmail.com",
    "test@outlook.com",
    "test@hotmail.com",
    "test@yahoo.com",
    "test@icloud.com",
    "name@organization.org",
    "name@company.com",
    "name@company.co.in",
    "firstname.lastname@company.com",
    "user@healthcare.org",
    "user@hospital.co.in",
    "user@university.edu",
    "user@organization.gov",
  ];

  const invalidEmails = [
    "test",
    "test@test",
    "test@",
    "@gmail.com",
    "test@gmail",
    "test@gmail.",
    "test@.com",
    "test @gmail.com",
    "test..user@gmail.com",
  ];

  validEmails.forEach((email) => {
    it(`should accept valid email: ${email}`, () => {
      const res = validateEmail(email);
      expect(res.isValid).toBe(true);
      expect(res.error).toBeUndefined();
    });
  });

  invalidEmails.forEach((email) => {
    it(`should reject invalid email: ${email}`, () => {
      const res = validateEmail(email);
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Please enter a valid email address.");
    });
  });
});

describe("Phone Sanitization and Validation", () => {
  it("should sanitize phone inputs correctly", () => {
    expect(sanitizePhoneInput("abc9876543210xyz")).toBe("9876543210");
    expect(sanitizePhoneInput("+1 (202) 555-0123")).toBe("+1 (202) 555-0123");
    expect(sanitizePhoneInput("test")).toBe("");
    expect(sanitizePhoneInput("@#$%")).toBe("");
    expect(sanitizePhoneInput("98765abc")).toBe("98765");
  });

  const validPhones = [
    "9876543210",
    "+91 9876543210",
    "+1 (202) 555-0123",
    "+44 20 7946 0958",
    "",
  ];

  const invalidPhones = ["test", "abc123", "98765abc", "@#$%", "123"];

  validPhones.forEach((phone) => {
    it(`should accept valid/optional phone: "${phone}"`, () => {
      const res = validatePhone(phone, false);
      expect(res.isValid).toBe(true);
    });
  });

  invalidPhones.forEach((phone) => {
    it(`should reject invalid phone: "${phone}"`, () => {
      const res = validatePhone(phone, false);
      expect(res.isValid).toBe(false);
      expect(res.error).toBe("Please enter a valid phone number.");
    });
  });
});
