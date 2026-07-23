export type Persona = "patient" | "pharmacy" | "enterprise" | "wholesale" | "other";

export type ConfidenceTier = "high" | "moderate" | "low";

export type CardState = "available" | "limited" | "unavailable" | "insufficient-signal" | "stale-data";

export type MessageRole = "user" | "assistant" | "system";

export interface AvailabilityPayload {
  medicine: string;
  region: string;
  confidence: ConfidenceTier;
  cardState: CardState;
  stockingPharmacies: number;
  timestamp: string;
  source: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  availabilityCard?: AvailabilityPayload;
  guardrail?: boolean;
  escalation?: boolean;
  alertForm?: boolean;
  alertContext?: { medicine: string; region: string };
  chips?: Chip[];
  timestamp: number;
}

export interface Chip {
  label: string;
  action: string;
}

export type ZoiPageContext =
  | "platform"
  | "patients"
  | "pharmacies"
  | "enterprise"
  | "wholesale"
  | "login"
  | "default";

export interface ZoiPageConfig {
  label: string;
  skipPersonaRouting: boolean;
  persona?: Persona;
}

export const PAGE_CONFIGS: Record<ZoiPageContext, ZoiPageConfig> = {
  platform: { label: "Ask Zoi", skipPersonaRouting: false },
  patients: { label: "Find a medicine", skipPersonaRouting: true, persona: "patient" },
  pharmacies: { label: "Ask Zoi", skipPersonaRouting: true, persona: "pharmacy" },
  enterprise: { label: "Talk to us", skipPersonaRouting: true, persona: "enterprise" },
  wholesale: { label: "Partner support", skipPersonaRouting: true, persona: "wholesale" },
  login: { label: "Need help signing in?", skipPersonaRouting: true, persona: "other" },
  default: { label: "Ask Zoi", skipPersonaRouting: false },
};

export type PanelView = "closed" | "minimized" | "open";

export type ZoiError = "offline" | "api-degraded" | null;

export const CONFIDENCE_COLORS: Record<ConfidenceTier, string> = {
  high: "#008882",
  moderate: "#B45309",
  low: "#DC2626",
};

export const CARD_STATE_LABELS: Record<CardState, string> = {
  available: "Available",
  limited: "Limited stock",
  unavailable: "Unavailable",
  "insufficient-signal": "Insufficient signal",
  "stale-data": "Data may be stale",
};
