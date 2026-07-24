import type { AvailabilityPayload } from "./types";

const CARD_STATES = ["available", "limited", "unavailable", "insufficient-signal", "stale-data"] as const;
const CONFIDENCE_TIERS = ["high", "moderate", "low"] as const;

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateAvailabilityPayload(payload: unknown): ValidationResult {
  const errors: string[] = [];

  if (!payload || typeof payload !== "object") {
    return { valid: false, errors: ["Payload must be an object"] };
  }

  const card = payload as Record<string, unknown>;

  if (!card.medicine || typeof card.medicine !== "string") {
    errors.push("medicine is required and must be a string");
  }
  if (!card.region || typeof card.region !== "string") {
    errors.push("region is required and must be a string");
  }
  if (!CONFIDENCE_TIERS.includes(card.confidence as typeof CONFIDENCE_TIERS[number])) {
    errors.push(`confidence must be one of: ${CONFIDENCE_TIERS.join(", ")}`);
  }
  if (!CARD_STATES.includes(card.cardState as typeof CARD_STATES[number])) {
    errors.push(`cardState must be one of: ${CARD_STATES.join(", ")}`);
  }
  if (typeof card.stockingPharmacies !== "number") {
    errors.push("stockingPharmacies must be a number");
  }
  if (!card.timestamp || typeof card.timestamp !== "string") {
    errors.push("timestamp is required and must be a string");
  }
  if (!card.source || typeof card.source !== "string") {
    errors.push("source is required and must be a string");
  }

  return { valid: errors.length === 0, errors };
}

export function safeCardPayload(payload: unknown): AvailabilityPayload | null {
  const result = validateAvailabilityPayload(payload);
  if (!result.valid) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[outputValidator] Malformed card payload dropped:", result.errors);
    }
    return null;
  }
  return payload as AvailabilityPayload;
}
