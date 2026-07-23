import type { Message, Chip, Persona, AvailabilityPayload, ConfidenceTier, CardState } from "./types";

export type StreamCallback = (chunk: string) => void;

const SELF_URL = typeof window !== "undefined" ? window.location.origin : "http://localhost:3456";

const LOW_CONFIDENCE_THRESHOLD = 2;

let lowConfidenceCount = 0;

export function resetLowConfidenceCount(): void {
  lowConfidenceCount = 0;
}

function isCommercialIntent(query: string): boolean {
  const patterns = [
    /buy|purchase|order|price|cost|how much/i,
    /resell|wholesale|bulk|distributor/i,
    /export|import|shipping/i,
  ];
  return patterns.some((p) => p.test(query));
}

function isSafetyEscalation(query: string): boolean {
  const patterns = [
    /urgent|emergency|overdose|poison/i,
    /wrong medicine|wrong dose/i,
    /allergic|reaction|bad reaction/i,
  ];
  return patterns.some((p) => p.test(query));
}

export async function streamResponse(
  messages: Message[],
  persona: Persona,
  onChunk: StreamCallback,
  onComplete: (msg: Message) => void
): Promise<void> {
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const query = lastUserMsg?.content ?? "";

  let needsEscalation = false;
  let escalateReason = "";
  let accumulatedContent = "";

  if (isSafetyEscalation(query)) {
    needsEscalation = true;
    escalateReason = "safety";
  } else if (isCommercialIntent(query)) {
    needsEscalation = true;
    escalateReason = "commercial";
  }

  try {
    const response = await fetch(`${SELF_URL}/api/zoi/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: query,
        persona,
        conversationId: messages[0]?.id ?? "unknown",
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      throw new Error(`Stream API returned ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("No reader available");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ")) continue;
        try {
          const data = JSON.parse(trimmed.slice(6));
          if (data.type === "token") {
            accumulatedContent += data.content;
            onChunk(data.content);
          } else if (data.type === "done") {
            const chips: Chip[] = [];

            if (data.chips) {
              for (const action of data.chips) {
                const labels: Record<string, string> = {
                  show_pharmacies: "Show pharmacy contacts",
                  continue_availability: "Continue with availability",
                  view_pharmacies: "View pharmacies",
                  set_alert: "Set alert",
                  check_availability: "Check availability",
                  escalate: "Talk to team",
                };
                chips.push({ label: labels[action] ?? action, action });
              }
            }

            if (needsEscalation) {
              chips.push({ label: "Talk to team", action: "escalate" });
            }

            const completeMsg: Message = {
              id: crypto.randomUUID(),
              role: "assistant",
              content: accumulatedContent,
              chips,
              timestamp: Date.now(),
              guardrail: data.guardrail === true,
            };

            if (data.availabilityCard) {
              const card = data.availabilityCard as {
                medicine: string;
                region: string;
                confidence: ConfidenceTier;
                cardState: CardState;
                stockingPharmacies: number;
                timestamp: string;
                source: string;
              };
              completeMsg.availabilityCard = {
                medicine: card.medicine,
                region: card.region,
                confidence: card.confidence,
                cardState: card.cardState,
                stockingPharmacies: card.stockingPharmacies,
                timestamp: card.timestamp,
                source: card.source,
              };

              if (card.confidence === "low" || card.confidence === "moderate") {
                lowConfidenceCount++;
                if (lowConfidenceCount >= LOW_CONFIDENCE_THRESHOLD) {
                  needsEscalation = true;
                  escalateReason = "low_confidence";
                }
              } else {
                lowConfidenceCount = 0;
              }
            }

            if (needsEscalation && !chips.some((c) => c.action === "escalate")) {
              chips.push({ label: "Talk to team", action: "escalate" });
            }

            onComplete({
              ...completeMsg,
              chips,
            });
            return;
          } else if (data.type === "error") {
            throw new Error(data.message ?? "Stream error");
          }
        } catch {
          continue;
        }
      }
    }
  } catch (err) {
    const fallbackText = "I'm having trouble connecting right now. Please try again or contact support directly.";
    const words = fallbackText.split(" ");
    for (let i = 0; i < words.length; i++) {
      onChunk(words[i] + (i < words.length - 1 ? " " : ""));
      await delay(20);
    }
    onComplete({
      id: crypto.randomUUID(),
      role: "assistant",
      content: fallbackText,
      chips: [{ label: "Try again", action: "retry" }, { label: "Talk to team", action: "escalate" }],
      timestamp: Date.now(),
    });
  }
}

export async function fetchAvailability(
  medicine: string,
  region: string
): Promise<{ card: AvailabilityPayload & { pharmacies?: { id: number; name: string; address: string; city: string; phone?: string }[] }; stockingPharmacies: number } | null> {
  try {
    const res = await fetch(`${SELF_URL}/api/zoikoavail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicine, region }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json.success) return null;
    return {
      card: {
        medicine: json.data.medicine,
        region: json.data.region,
        confidence: json.data.confidence.tier,
        cardState: json.data.cardState,
        stockingPharmacies: json.data.stockingPharmacies,
        timestamp: json.data.timestamp,
        source: json.data.source,
        pharmacies: json.data.pharmacies,
      },
      stockingPharmacies: json.data.stockingPharmacies,
    };
  } catch {
    return null;
  }
}

export async function submitEscalationApi(
  contact: string,
  includeConversation: boolean,
  persona: Persona | null,
  messageCount: number,
  conversationMessages?: { id: string; role: string; content: string; timestamp: number }[],
  issueMessage?: string
): Promise<string | null> {
  try {
    const res = await fetch(`${SELF_URL}/api/escalations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, includeConversation, persona, messageCount, conversationMessages, issueMessage }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data.ref : null;
  } catch {
    return null;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const GREETING_MESSAGE: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Hello. I'm Zoi, the ZoikoMeds assistant. I can check medicine availability, explain the platform, and connect you with our team.\n\nI'm an AI assistant and don't give medical advice. For clinical questions, always consult your pharmacist or doctor.\n\nWhat brings you here today?",
  timestamp: Date.now(),
  chips: [
    { label: "Find a medicine", action: "patient" },
    { label: "Pharmacy support", action: "pharmacy" },
    { label: "Talk to us", action: "other" },
  ],
};

const PERSONA_RESPONSES: Record<Persona, string> = {
  patient: "Of course. Tell me the name of the medicine and your location, and I'll check availability through ZoikoAvail\u2122 for you.",
  pharmacy: "Welcome. I can help you get started with pharmacy onboarding, manage inventory signals, or answer questions about the platform. What would you like help with?",
  enterprise: "I'll connect you with the right team. Could you tell me a bit about your organisation and what you're looking to solve? Things like hospital systems, clinic networks, or API access.",
  wholesale: "Welcome, partner. I can help with wholesale orders, pricing inquiries, or navigating the wholesale portal. What do you need?",
  other: "How can I help you today? You can ask about medicine availability, platform features, or anything else related to ZoikoMeds.",
};

function generatePersonaResponse(persona: Persona): string {
  return PERSONA_RESPONSES[persona];
}

export { GREETING_MESSAGE, generatePersonaResponse };
