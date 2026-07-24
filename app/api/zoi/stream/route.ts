import { NextRequest } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/api/rate-limit";
import { resolveMedicine } from "@/lib/medibase";
import { searchContent, type ContentDocument } from "@/lib/site-content";
import { lookupAvailability, findMedicineInQuery, extractRegion } from "@/lib/availability";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Safety & scope classifier (layer 1) ──────────────────────────────────

const MEDICAL_ADVICE_PATTERNS = [
  /(dose|dosage|how\s+much\s+.*?\b(take|give)\b|how\s+often)/i,
  /(interact|interaction|with\s+\w+\s+and)/i,
  /(side\s+effect|adverse|reaction)/i,
  /(contraindication|contraindicated)/i,
  /(symptom|diagnosis|diagnose)/i,
  /treat(ment)?\s+for/i,
  /(prescribe|prescription|should\s+I\s+take)/i,
  /(can\s+I\s+take|safe\s+to\s+take)/i,
  /(warfarin|blood\s+thinner|anticoagulant)/i,
];

const CRISIS_PATTERNS = [
  /(suicid|kill myself|end my life|want to die)/i,
  /(emergency|urgent|overdose|poison)/i,
];

const ABUSE_PATTERNS = [
  /(get high|abuse|misuse|recreational)/i,
  /without\s+(a\s+)?prescription|no\s+prescription\s+(needed|required)/i,
];

type ClassifierVerdict =
  | { verdict: "safe"; intent: string }
  | { verdict: "guardrail"; type: "medical_advice" | "crisis" | "abuse" };

function classifyQuery(query: string): ClassifierVerdict {
  if (ABUSE_PATTERNS.some((p) => p.test(query))) {
    return { verdict: "guardrail", type: "abuse" };
  }
  if (CRISIS_PATTERNS.some((p) => p.test(query))) {
    return { verdict: "guardrail", type: "crisis" };
  }
  if (MEDICAL_ADVICE_PATTERNS.some((p) => p.test(query))) {
    return { verdict: "guardrail", type: "medical_advice" };
  }

  let intent = "general";
  if (/buy|purchase|order|price|cost|wholesale|bulk/i.test(query)) intent = "commercial";
  else if (/availability|stock|in stock|available/i.test(query) || findMedicineInQuery(query)) intent = "availability";
  else if (/onboard|register|sign up|join|partner/i.test(query)) intent = "onboarding";
  else if (/how|what|where|when|why|explain|help/i.test(query)) intent = "navigation";

  return { verdict: "safe", intent };
}

// ── Defense in depth — prompt injection (layer 2) ────────────────────────

const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|below)\s+(instructions|prompts|directions)/i,
  /you\s+are\s+(now|free|a\s+human|not\s+(an\s+)?ai|a\s+real\s+person)/i,
  /act\s+as\s+/i,
  /pretend\s+(to\s+be|you\s+are)/i,
  /forget\s+(all\s+)?(previous|your\s+instructions)/i,
  /system\s+(prompt|instruction|message|override)/i,
  /roleplay|role-play/i,
  /new\s+(instruction|prompt|rule)/i,
  /\[system\]|\[assistant\]|\[user\]|\[INST\]|<<[^>]+>>/i,
];

function checkPromptInjection(query: string): boolean {
  return INJECTION_PATTERNS.some((p) => p.test(query));
}

// ── Grounding — RAG sources (layer 3) ────────────────────────────────────

interface RetrievedSource {
  docId: string;
  title: string;
  section: string;
  score: number;
}

let retrievedSources: RetrievedSource[] = [];

function getRetrievedSources(): RetrievedSource[] {
  return retrievedSources;
}

function resetRetrievedSources(): void {
  retrievedSources = [];
}

const GUARDRAIL_TEXTS: Record<string, string> = {
  medical_advice:
    "That's an important question, and it's one for a clinical professional \u2014 " +
    "drug interactions depend on your specific situation, and I'm not able to advise on them safely.\n\n" +
    "Your pharmacist can answer this when you collect your medicine. If you'd like, " +
    "I can show you the stocking pharmacies' contact details now.",
  crisis:
    "It sounds like you may need urgent help. Please contact your local emergency services or a crisis helpline right away.\n\n" +
    "If this is a medical emergency, call 911 or your local emergency number immediately.",
  abuse:
    "I can't help with that request. ZoikoMeds supports responsible use of medicines under professional guidance. " +
    "If you need help with substance use, please contact a healthcare professional or a support service.",
};

const GUARDRAIL_CHIPS: Record<string, string[]> = {
  medical_advice: ["show_pharmacies", "continue_availability"],
  crisis: ["escalate"],
  abuse: ["escalate"],
};

function formatSourceMessage(sources: ContentDocument[]): string | null {
  if (sources.length === 0) return null;
  const primary = sources[0];
  const followUp = sources.length > 1 ? ` You can also learn more on the ${sources.slice(1).map((s) => s.title).join(", ")} page.` : "";
  return `${primary.body}${followUp}`;
}

// ── Response model (layer 4) ────────────────────────────────────────────

type ResponsePlan = {
  text: string;
  chips: string[];
  sources?: RetrievedSource[];
  availabilityCard?: unknown;
};

function getResponsePlan(query: string, persona: string, classification: ClassifierVerdict): ResponsePlan {
  resetRetrievedSources();

  if (checkPromptInjection(query)) {
    return {
      text: "I can only help with questions about ZoikoMeds, medicine availability, and platform features.",
      chips: ["escalate"],
    };
  }

  const lower = query.toLowerCase().trim();

  if (/^(hi|hello|hey|good morning)/i.test(lower)) {
    return { text: "Hello. How can I help you today?", chips: ["check_availability", "escalate"] };
  }
  if (/\b(thank|thanks)\b/i.test(lower)) {
    return { text: "You're welcome. Is there anything else I can help you with?", chips: ["check_availability", "escalate"] };
  }

  // MediBase & availability resolution
  const foundMed = findMedicineInQuery(query);

  if (foundMed) {
    const displayName = foundMed.toUpperCase();
    const region = extractRegion(query);

    if (!region) {
      return {
        text: `I found ${displayName} in our system. Which location or city should I check availability for? (e.g. Nakuru, Nairobi, Kisumu)`,
        chips: ["check_availability", "escalate"],
      };
    }

    const availResult = lookupAvailability({ medicine: foundMed, region });

    if (availResult) {
      return {
        text: `Here's the availability information for ${availResult.medicine} in the ${availResult.region} region:`,
        chips: ["view_pharmacies", "set_alert"],
        availabilityCard: {
          medicine: availResult.medicine,
          region: availResult.region,
          confidence: availResult.confidence.tier,
          cardState: availResult.cardState,
          stockingPharmacies: availResult.stockingPharmacies,
          timestamp: availResult.timestamp,
          source: availResult.source,
        },
      };
    }

    return {
      text: `I found ${displayName} in our system. I'm having trouble checking availability right now. Try again in a moment or contact our team.`,
      chips: ["escalate"],
    };
  }

  // Site content RAG
  const contentResults = searchContent(query);
  if (contentResults.length > 0) {
    retrievedSources = contentResults.map((c) => ({
      docId: c.id,
      title: c.title,
      section: c.section,
      score: scoreForSource(query, c),
    }));
    const msg = formatSourceMessage(contentResults);
    if (msg) {
      const chips: string[] = ["check_availability"];
      if (classification.verdict === "safe" && classification.intent === "commercial") chips.push("escalate");
      return { text: msg, chips: chips.length > 3 ? chips.slice(0, 3) : chips, sources: retrievedSources };
    }
  }

  // Unknown/commercial intent — honest "I don't know" + escalate
  if (isDrugLikeTerm(query)) {
    return {
      text: "That medicine isn't in our system yet. Our team can help you find availability or add it to the network.",
      chips: ["escalate"],
    };
  }

  if (classification.verdict === "safe" && classification.intent === "commercial") {
    return {
      text: "I can't process purchases or orders directly. Our team can help with that.",
      chips: ["escalate"],
    };
  }

  // Truly out-of-corpus — honest "I don't know"
  return {
    text: "I'm not sure about that. I can only help with ZoikoMeds platform features and medicine availability. Our team can help with other questions.",
    chips: ["escalate"],
  };
}

function scoreForSource(query: string, doc: { id: string; title: string }): number {
  const lower = query.toLowerCase();
  let score = 0;
  if (doc.title.toLowerCase().includes(lower)) score += 10;
  const words = lower.split(/\s+/);
  for (const w of words) {
    if (w.length > 3 && doc.title.toLowerCase().includes(w)) score += 3;
  }
  return score;
}

const DRUG_SUFFIX_PATTERN = /\b\w+(?:ine|am|ol|ate|ide|ium|pam|zep|barb|caine|vir|mab|zole|zone|pam|tan|cet|dip|pram|lol|pine|xide|pril|sart|vastatin|oxacin|mycin|cillin|conazole)\b/i;

function isDrugLikeTerm(query: string): boolean {
  const words = query.toLowerCase().split(/\s+/);
  return words.some((w) => w.length >= 5 && DRUG_SUFFIX_PATTERN.test(w));
}

async function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

const VALID_PERSONAS = ["patient", "pharmacy", "enterprise", "wholesale", "other"];

export async function POST(req: NextRequest) {
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const conversationId = crypto.randomUUID?.() ?? Date.now().toString(36);
  const rlKey = `zoi-stream:${clientIp}`;
  const rl = rateLimit(rlKey, 20, 60000);

  if (!rl.allowed) {
    return new Response(
      JSON.stringify({ success: false, error: "rate_limit_exceeded" }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          ...getRateLimitHeaders(rl),
        },
      }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawMessage = body.message;
  if (!rawMessage || typeof rawMessage !== "string" || !rawMessage.trim()) {
    return new Response(JSON.stringify({ success: false, error: "message_required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const message = rawMessage.trim();
  if (message.length > 2000) {
    return new Response(JSON.stringify({ success: false, error: "message_too_long" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawPersona = body.persona ? String(body.persona).trim() : "other";
  const persona = VALID_PERSONAS.includes(rawPersona) ? rawPersona : "other";
  const rawMessages = Array.isArray(body.messages) ? (body.messages as { role: string; content: string }[]) : [];

  const query = message;

  // ── Layer 1: Safety & scope classifier ──
  const classification = classifyQuery(query);
  const auditLog: Record<string, unknown> = {
    conversationId,
    timestamp: new Date().toISOString(),
    query: query.slice(0, 200),
    persona,
    classifier: classification,
  };

  // ── Layer 1: Guardrail responses ──
  if (classification.verdict === "guardrail") {
    const guardrailText = GUARDRAIL_TEXTS[classification.type] ?? GUARDRAIL_TEXTS.medical_advice;
    const guardrailChips = GUARDRAIL_CHIPS[classification.type] ?? ["show_pharmacies", "continue_availability"];

    console.log(`[Zoi Audit]`, JSON.stringify({
      ...auditLog,
      guardrailHit: classification.type,
      action: "guardrail_response_sent",
    }));

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = guardrailText.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = JSON.stringify({ type: "token", content: words[i] + (i < words.length - 1 ? " " : "") });
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
          await delay(25);
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", guardrail: true, chips: guardrailChips })}\n\n`));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "X-Content-Type-Options": "nosniff" },
    });
  }

  // ── Layer 3: Availability grounding via ZoikoAvail™ ──
  let foundMedicine = findMedicineInQuery(query);
  let foundRegion = extractRegion(query);

  // Check for Alert setup requests
  if (/alert|notify|notification|monitor/i.test(query)) {
    if (!foundMedicine && rawMessages.length > 0) {
      for (let i = rawMessages.length - 1; i >= 0; i--) {
        const prevMed = findMedicineInQuery(rawMessages[i]?.content ?? "");
        if (prevMed) {
          foundMedicine = prevMed;
          break;
        }
      }
    }
    if (!foundRegion && rawMessages.length > 0) {
      for (let i = rawMessages.length - 1; i >= 0; i--) {
        const prevReg = extractRegion(rawMessages[i]?.content ?? "");
        if (prevReg) {
          foundRegion = prevReg;
          break;
        }
      }
    }

    if (foundMedicine && foundRegion) {
      const medName = foundMedicine.toUpperCase();
      const regName = foundRegion.charAt(0).toUpperCase() + foundRegion.slice(1);
      const alertText = `Alert activated for ${medName} in ${regName}. ZoikoAvail\u2122 will monitor real-time stock signals and notify you immediately when availability changes.`;
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = alertText.split(" ");
          for (let i = 0; i < words.length; i++) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content: words[i] + (i < words.length - 1 ? " " : "") })}\n\n`));
            await delay(20);
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", chips: ["check_availability", "escalate"] })}\n\n`));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "X-Content-Type-Options": "nosniff" },
      });
    } else if (foundMedicine) {
      const medName = foundMedicine.toUpperCase();
      const promptText = `I can set an alert for ${medName}. Which location or city should I monitor? (e.g. Nakuru, Nairobi, Kisumu)`;
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = promptText.split(" ");
          for (let i = 0; i < words.length; i++) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content: words[i] + (i < words.length - 1 ? " " : "") })}\n\n`));
            await delay(20);
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", chips: ["check_availability", "escalate"] })}\n\n`));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "X-Content-Type-Options": "nosniff" },
      });
    }
  }

  // Only check history for medicine if user's current query is ONLY a location
  if (!foundMedicine && foundRegion && rawMessages.length > 0) {
    for (let i = rawMessages.length - 1; i >= 0; i--) {
      const prevContent = rawMessages[i]?.content;
      if (prevContent) {
        const prevMed = findMedicineInQuery(prevContent);
        if (prevMed) {
          foundMedicine = prevMed;
          break;
        }
      }
    }
  }

  console.log(`[Zoi Debug] query="${query}" foundMedicine="${foundMedicine}" foundRegion="${foundRegion}"`);

  if (foundMedicine && foundRegion) {
    console.log(`[Zoi Debug] Calling lookupAvailability with medicine="${foundMedicine}" region="${foundRegion}"`);

    const availResult = lookupAvailability({ medicine: foundMedicine, region: foundRegion });

    console.log(`[Zoi Debug] lookupAvailability returned: ${availResult ? "SUCCESS" : "NULL"}`);

    if (availResult) {
      console.log(`[Zoi Audit]`, JSON.stringify({
        ...auditLog,
        action: "zoikoavail_lookup",
        toolPayload: { medicine: foundMedicine, region: foundRegion },
        toolResult: { success: true, confidence: availResult.confidence, cardState: availResult.cardState, stockingPharmacies: availResult.stockingPharmacies },
      }));

      const intro = pick([
        `Here's the availability information for ${availResult.medicine} in the ${availResult.region} region:`,
        `I found availability data for ${availResult.medicine} near ${availResult.region}:`,
        `Let me show you what I found for ${availResult.medicine} in ${availResult.region}:`,
      ]);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const introWords = intro.split(" ");
          for (let i = 0; i < introWords.length; i++) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content: introWords[i] + (i < introWords.length - 1 ? " " : "") })}\n\n`));
            await delay(20);
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: "done",
            availabilityCard: {
              medicine: availResult.medicine,
              region: availResult.region,
              confidence: availResult.confidence.tier,
              cardState: availResult.cardState,
              stockingPharmacies: availResult.stockingPharmacies,
              timestamp: availResult.timestamp,
              source: availResult.source,
            },
            chips: ["view_pharmacies", "set_alert"],
          })}\n\n`));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "X-Content-Type-Options": "nosniff" },
      });
    }
  }

  // ── Layer 2 + 3 + 4: injection check, RAG, response model ──
  const plan = getResponsePlan(query, persona, classification);

  // Audit: final response
  console.log(`[Zoi Audit]`, JSON.stringify({
    ...auditLog,
    action: "response_sent",
    injectionDetected: checkPromptInjection(query),
    retrievedSources: getRetrievedSources(),
    chips: plan.chips,
    hasAvailabilityCard: !!plan.availabilityCard,
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = plan.text.split(" ");
      for (let i = 0; i < words.length; i++) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content: words[i] + (i < words.length - 1 ? " " : "") })}\n\n`));
        await delay(20);
      }

      const donePayload: Record<string, unknown> = { type: "done", chips: plan.chips };
      if (plan.availabilityCard) {
        donePayload.availabilityCard = plan.availabilityCard;
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(donePayload)}\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Connection": "keep-alive",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
