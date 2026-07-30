import type { Message, Chip, Persona, AvailabilityPayload, CardState } from "./types";
import { searchContent } from "@/lib/site-content";
import { lookupAvailability, findMedicineInQuery, extractRegion } from "@/lib/availability";
import { isDrugLikeTerm } from "@/lib/medibase";
import { internalApi } from "@/lib/config";

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

interface FallbackPlan {
  text: string;
  chips: Chip[];
  availabilityCard?: AvailabilityPayload;
  citations?: { id: string; title: string; url?: string; sourceType: string; authorityLevel: "A1" | "A2" | "A3" | "A4" | "A5" | "A6" }[];
  guardrail?: boolean;
}

function generateFallbackPlan(query: string, _persona: Persona, messages: Message[]): FallbackPlan {
  const lower = query.toLowerCase().trim();

  // 1. Safety & Medical Advice refused
  if (isSafetyEscalation(query)) {
    return {
      text: "CRITICAL SAFETY NOTICE: It appears you may need urgent medical assistance or emergency guidance.\n\n• Medical Emergency / Overdose: Call 911 (US) or 999/111 (UK) immediately.\n• Poison Control: Call 1-800-222-1222 (US) or contact NHS 111 (UK).\n• Mental Health & Crisis Line: Call or text 988 (US) or 111 (UK).\n\nZoikoMeds is an availability search tool and does not provide emergency medical treatment.",
      chips: [{ label: "Talk to team", action: "escalate" }],
      guardrail: true,
    };
  }

  if (/dose|dosage|side effect|treatment|diagnose|prescription|should i take|can i take/i.test(query)) {
    return {
      text: "I can't make medical decisions, provide diagnosis, recommend treatments, or give personalized dosage advice. A qualified pharmacist or prescriber can review your situation safely.\n\nI can still help you search for medicine availability or nearby verified pharmacies.",
      chips: [{ label: "Check availability", action: "check_availability" }, { label: "Talk to team", action: "escalate" }],
      guardrail: true,
    };
  }

  // 2. Greetings
  if (/^(hi|hello|hey|good morning|good afternoon)/i.test(lower)) {
    return {
      text: "Hello! How can I help you check medicine availability or navigate ZoikoMeds today?",
      chips: [{ label: "Find a medicine", action: "patient" }, { label: "Talk to team", action: "escalate" }],
    };
  }

  // 3. Medicine & Region availability resolution
  let foundMed = findMedicineInQuery(query);
  let foundReg = extractRegion(query);

  // Fallback to conversation context
  if (!foundMed && messages.length > 0) {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = findMedicineInQuery(messages[i]?.content ?? "");
      if (m) { foundMed = m; break; }
    }
  }
  if (!foundReg && messages.length > 0) {
    for (let i = messages.length - 1; i >= 0; i--) {
      const r = extractRegion(messages[i]?.content ?? "");
      if (r) { foundReg = r; break; }
    }
  }

  if (foundMed && foundReg) {
    const avail = lookupAvailability({ medicine: foundMed, region: foundReg });
    if (avail) {
      return {
        text: `Here is the availability information for ${avail.medicine} in the ${avail.region} region:`,
        chips: [{ label: "Show pharmacy contacts", action: "show_pharmacies" }, { label: "Activate Alert", action: "set_alert" }],
        availabilityCard: {
          medicine: avail.medicine,
          region: avail.region,
          confidence: avail.confidence.tier,
          cardState: avail.cardState as CardState,
          stockingPharmacies: avail.stockingPharmacies,
          timestamp: avail.timestamp,
          source: avail.source,
        },
      };
    }
  } else if (foundMed) {
    return {
      text: `I found ${foundMed.toUpperCase()} in our signal network. Which location or city should I check availability for?`,
      chips: [{ label: "Talk to team", action: "escalate" }],
    };
  }

  // 4. Site content vector RAG
  const docs = searchContent(query, 2);
  if (docs.length > 0) {
    const primary = docs[0];
    const citations = docs.map((d) => ({
      id: d.id,
      title: d.title,
      url: d.url || "/platform",
      sourceType: d.section,
      authorityLevel: (d.id.startsWith("spec-") ? "A2" : "A5") as "A2" | "A5",
    }));
    return {
      text: `${primary.body}\n\nFor more details, see ${primary.title}.`,
      chips: [{ label: "Find a medicine", action: "patient" }, { label: "Talk to team", action: "escalate" }],
      citations,
    };
  }

  if (isDrugLikeTerm(query)) {
    return {
      text: "That medicine isn't in our immediate index yet. Our team can help you find availability or add it to the network.",
      chips: [{ label: "Talk to team", action: "escalate" }],
    };
  }

  return {
    text: "I can help you search for medicine availability, set stock alerts, and navigate platform features. What medicine or location would you like to check?",
    chips: [{ label: "Find a medicine", action: "patient" }, { label: "Talk to team", action: "escalate" }],
  };
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

  if (isSafetyEscalation(query)) {
    needsEscalation = true;
    escalateReason = "safety";
  } else if (isCommercialIntent(query)) {
    needsEscalation = true;
    escalateReason = "commercial";
  }

  try {
    const endpoint = typeof window !== "undefined" ? internalApi("zoi/stream") : `${SELF_URL}${internalApi("zoi/stream")}`;
    const response = await fetch(endpoint, {
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
    let accumulatedContent = "";

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
                  set_alert: "Activate Alert",
                  check_availability: "Check availability",
                  escalate: "Talk to team",
                };
                chips.push({ label: labels[action] ?? action, action });
              }
            }

            const finalContent = (data.text && typeof data.text === "string" && data.text.trim().length > 0)
              ? data.text
              : accumulatedContent;

            const completeMsg: Message = {
              id: crypto.randomUUID(),
              role: "assistant",
              content: finalContent,
              timestamp: Date.now(),
            };

            if (data.availabilityCard) {
              const card = data.availabilityCard;
              completeMsg.availabilityCard = card;
              completeMsg.chips = [
                { label: "Show pharmacy contacts", action: "show_pharmacies" },
                { label: "Activate Stock Alert", action: "alert_form" },
              ];

              if (card.confidence === "low" || card.confidence === "moderate") {
                lowConfidenceCount++;
                if (lowConfidenceCount >= LOW_CONFIDENCE_THRESHOLD) {
                  needsEscalation = true;
                  escalateReason = "low_confidence";
                  console.log("[Zoi Service] Escalating due to:", escalateReason);
                }
              } else {
                lowConfidenceCount = 0;
              }
            }

            if (data.citations) {
              completeMsg.citations = data.citations;
            }
            if (data.evidenceState) {
              completeMsg.evidenceState = data.evidenceState;
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
    console.warn("[Zoi Service] Stream API network/404 error, executing client-side fallback:", err);

    const plan = generateFallbackPlan(query, persona, messages);
    const words = plan.text.split(" ");
    for (let i = 0; i < words.length; i++) {
      onChunk(words[i] + (i < words.length - 1 ? " " : ""));
      await delay(20);
    }

    onComplete({
      id: crypto.randomUUID(),
      role: "assistant",
      content: plan.text,
      chips: plan.chips,
      availabilityCard: plan.availabilityCard,
      citations: plan.citations,
      guardrail: plan.guardrail,
      timestamp: Date.now(),
    });
  }
}

export async function fetchAvailability(
  medicine: string,
  region: string
): Promise<{ card: AvailabilityPayload & { pharmacies?: { id: number; name: string; address: string; city: string; phone?: string }[] }; stockingPharmacies: number } | null> {
  try {
    const endpoint = typeof window !== "undefined" ? internalApi("zoikoavail") : `${SELF_URL}${internalApi("zoikoavail")}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicine, region }),
    });
    if (!res.ok) {
      // Client-side availability lookup fallback
      const localResult = lookupAvailability({ medicine, region });
      if (!localResult) return null;
      return {
        card: {
          medicine: localResult.medicine,
          region: localResult.region,
          confidence: localResult.confidence.tier,
          cardState: localResult.cardState as CardState,
          stockingPharmacies: localResult.stockingPharmacies,
          timestamp: localResult.timestamp,
          source: localResult.source,
          pharmacies: localResult.pharmacies,
        },
        stockingPharmacies: localResult.stockingPharmacies,
      };
    }
    const json = await res.json();
    if (!json.success) return null;
    return {
      card: {
        medicine: json.data.medicine,
        region: json.data.region,
        confidence: json.data.confidence.tier,
        cardState: json.data.cardState as CardState,
        stockingPharmacies: json.data.stockingPharmacies,
        timestamp: json.data.timestamp,
        source: json.data.source,
        pharmacies: json.data.pharmacies,
      },
      stockingPharmacies: json.data.stockingPharmacies,
    };
  } catch {
    const localResult = lookupAvailability({ medicine, region });
    if (!localResult) return null;
    return {
      card: {
        medicine: localResult.medicine,
        region: localResult.region,
        confidence: localResult.confidence.tier,
        cardState: localResult.cardState as CardState,
        stockingPharmacies: localResult.stockingPharmacies,
        timestamp: localResult.timestamp,
        source: localResult.source,
        pharmacies: localResult.pharmacies,
      },
      stockingPharmacies: localResult.stockingPharmacies,
    };
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
    const endpoint = typeof window !== "undefined" ? internalApi("escalations") : `${SELF_URL}${internalApi("escalations")}`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact, includeConversation, persona, messageCount, conversationMessages, issueMessage }),
    });
    if (!res.ok) return `ZK-${Math.floor(10000 + Math.random() * 90000)}`;
    const json = await res.json();
    return json.success ? json.data.ref : `ZK-${Math.floor(10000 + Math.random() * 90000)}`;
  } catch {
    return `ZK-${Math.floor(10000 + Math.random() * 90000)}`;
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
  patient: "Of course. Tell me the name of the medicine and your location, and I'll check availability through ZoikoAvail™ for you.",
  pharmacy: "Welcome. I can help you get started with pharmacy onboarding, manage inventory signals, or answer questions about the platform. What would you like help with?",
  enterprise: "I'll connect you with the right team. Could you tell me a bit about your organisation and what you're looking to solve? Things like hospital systems, clinic networks, or API access.",
  wholesale: "Welcome, partner. I can help with wholesale orders, pricing inquiries, or navigating the wholesale portal. What do you need?",
  other: "How can I help you today? You can ask about medicine availability, platform features, or anything else related to ZoikoMeds.",
};

function generatePersonaResponse(persona: Persona): string {
  return PERSONA_RESPONSES[persona];
}

export { GREETING_MESSAGE, generatePersonaResponse };
