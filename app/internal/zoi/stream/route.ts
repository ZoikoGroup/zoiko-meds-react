import { NextRequest } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/api/rate-limit";
import { isDrugLikeTerm } from "@/lib/medibase";
import { searchContent, type ContentDocument } from "@/lib/site-content";
import { lookupAvailabilityAsync, findMedicineInQuery, extractRegion } from "@/lib/availability";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

const OUT_OF_SCOPE_PATTERNS = [
  /\b(python|javascript|typescript|java|c\+\+|c#|php|ruby|golang|rust|html|css|sql|bash|powershell|react|vue|angular)\b/i,
  /(write|give|generate|create|build|show|debug)\s+.*?\b(code|script|program|function|algorithm|class|import|app|website|page|component)\b/i,
  /\b(code|coding|programmer|programming|script|scripting|function|algorithm|stack trace|syntax error)\b/i,
  /(write|tell|recite)\s+.*?\b(essay|poem|joke|story|song|haiku)\b/i,
  /(what is the capital|who is the president|who won the|solve this math|solve the equation|calculate \d+)/i,
];

type ClassifierVerdict =
  | { verdict: "safe"; intent: string }
  | { verdict: "guardrail"; type: "medical_advice" | "crisis" | "abuse" | "out_of_scope" };

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
  if (OUT_OF_SCOPE_PATTERNS.some((p) => p.test(query))) {
    return { verdict: "guardrail", type: "out_of_scope" };
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
    "I can't make medical decisions, provide diagnosis, recommend treatments, or give personalized dosage advice. " +
    "A qualified pharmacist or prescriber can review your situation safely. " +
    "I can still help you search for medicine availability or nearby verified pharmacies.",
  crisis:
    "CRITICAL SAFETY NOTICE: It appears you may need urgent medical assistance or emergency guidance.\n\n" +
    "• Medical Emergency / Overdose: Call 911 (US) or 999/111 (UK) immediately.\n" +
    "• Poison Control: Call 1-800-222-1222 (US) or contact NHS 111 (UK).\n" +
    "• Mental Health & Crisis Line: Call or text 988 (US) or 111 (UK).\n\n" +
    "ZoikoMeds is an availability search tool and does not provide emergency medical treatment.",
  abuse:
    "I cannot assist with requests attempting to misuse, abuse, or bypass prescription requirements for controlled substances. " +
    "ZoikoMeds operates strictly under professional healthcare and legal compliance doctrines.",
  out_of_scope:
    "I am Zoi, the medicine availability assistant for ZoikoMeds. I am specialized in helping you check medicine availability, find verified pharmacies, and navigate platform features. I cannot write code, execute scripts, or answer general non-healthcare questions.",
};

const GUARDRAIL_CHIPS: Record<string, string[]> = {
  medical_advice: ["check_availability", "escalate"],
  crisis: ["escalate"],
  abuse: ["escalate"],
  out_of_scope: ["check_availability", "escalate"],
};

function formatSourceMessage(sources: ContentDocument[]): { text: string; citations: Array<{ id: string; title: string; url?: string; sourceType: string; authorityLevel: "A1" | "A2" | "A3" | "A4" | "A5" | "A6" }> } | null {
  if (sources.length === 0) return null;
  const primary = sources[0];
  const citations = sources.map((s) => ({
    id: s.id,
    title: s.title,
    url: s.url || `https://zoikomeds.com${s.url || "/platform"}`,
    sourceType: s.section,
    authorityLevel: (s.id.startsWith("spec-") ? "A2" : "A5") as "A2" | "A5",
  }));

  return {
    text: primary.body,
    citations,
  };
}

// ── Response model (layer 4) ────────────────────────────────────────────

type ResponsePlan = {
  text: string;
  chips: string[];
  sources?: RetrievedSource[];
  citations?: Array<{ id: string; title: string; url?: string; sourceType: string; authorityLevel: "A1" | "A2" | "A3" | "A4" | "A5" | "A6" }>;
  availabilityCard?: unknown;
  emergencyTemplate?: {
    templateId: string;
    market: "US" | "UK";
    headline: string;
    bodyText: string;
    emergencyActions: Array<{ label: string; actionUrl: string }>;
  };
};

async function getResponsePlan(query: string, persona: string, classification: ClassifierVerdict): Promise<ResponsePlan> {
  resetRetrievedSources();

  if (checkPromptInjection(query)) {
    return {
      text: "I can only help with questions about ZoikoMeds, medicine availability, and platform features.",
      chips: ["escalate"],
    };
  }

  const lower = query.toLowerCase().trim();

  if (/^(hi|hello|hey|good morning|good afternoon)/i.test(lower)) {
    return { text: "Hello. How can I help you today?", chips: ["check_availability", "escalate"] };
  }
  if (/\b(thank|thanks|ok|okay|alright|got it|cool|fine|understood)\b/i.test(lower)) {
    return { text: "You're welcome! Is there anything else I can help you with?", chips: ["check_availability", "escalate"] };
  }

  // MediBase & availability resolution
  const foundMed = findMedicineInQuery(query);

  if (foundMed) {
    const region = extractRegion(query);

    if (!region) {
      const displayName = foundMed.toUpperCase();
      return {
        text: `I found ${displayName} in our database. Which location or city should I check availability for?`,
        chips: ["check_availability", "escalate"],
      };
    }

    const availResult = await lookupAvailabilityAsync({ medicine: foundMed, region });

    if (availResult) {
      return {
        text: `Here's the availability information for ${availResult.medicine} in ${availResult.region}:`,
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

    const displayName = foundMed.toUpperCase();
    return {
      text: `I found ${displayName} in our system. I'm having trouble checking availability right now. Try again in a moment or contact our team.`,
      chips: ["escalate"],
    };
  }

  const foundReg = extractRegion(query);
  if (!foundMed && foundReg) {
    const formattedRegion = foundReg.charAt(0).toUpperCase() + foundReg.slice(1);
    return {
      text: `I can check medicine availability in ${formattedRegion}. Which medicine are you looking for?`,
      chips: ["check_availability", "escalate"],
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
    const formatted = formatSourceMessage(contentResults);
    if (formatted) {
      const chips: string[] = [];
      if (persona === "enterprise" || /api|openapi|bff|integration|enterprise|organisation/i.test(query)) {
        chips.push("escalate", "request_api_docs");
      } else if (persona === "wholesale" || /wholesale|bulk|distributor|portal/i.test(query)) {
        chips.push("wholesale_portal", "escalate");
      } else if (/search|how to search|find medicine/i.test(query)) {
        chips.push("check_availability");
      } else {
        chips.push("check_availability");
        if (classification.verdict === "safe" && classification.intent === "commercial") chips.push("escalate");
      }
      return {
        text: formatted.text,
        chips: chips.length > 3 ? chips.slice(0, 3) : chips,
        sources: retrievedSources,
        citations: formatted.citations,
      };
    }
  }

  // Unknown/commercial intent — honest "I don't know" + escalate
  if (isDrugLikeTerm(query)) {
    return {
      text: "To use our medicine search feature, simply visit our search page and enter the name of the medicine you're looking for. You can search by medicine name, and our platform will show you availability information from verified pharmacies in your area. If you need assistance with searching or have any questions, feel free to ask. To get started, you can visit our search page at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed) and enter the name of the medicine you're looking for.",
      chips: ["escalate"],
    };
  }

  if (classification.verdict === "safe" && classification.intent === "commercial") {
    return {
      text: "I can't process purchases or orders directly. Our team can help with that.",
      chips: ["escalate"],
    };
  }

  // Truly out-of-corpus / unindexed medicine or city
  return {
    text: "To use our medicine search feature, simply visit our search page and enter the name of the medicine you're looking for. You can search by medicine name, and our platform will show you availability information from verified pharmacies in your area. If you need assistance with searching or have any questions, feel free to ask. To get started, you can visit our search page at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed) and enter the name of the medicine you're looking for.",
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

const VALID_PERSONAS = ["patient", "pharmacy", "enterprise", "wholesale", "other"];

async function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function streamGeminiResponse(
  query: string,
  persona: string,
  ragSources: ContentDocument[],
  apiKey: string,
  plan: ResponsePlan
): Promise<Response | null> {
  try {
    const systemPrompt = `You are Zoi, the intelligent medicine availability assistant for ZoikoMeds.
Your core mission is to help users discover medicine availability and navigate the platform safely.
CRITICAL SAFETY BOUNDARIES:
- STRICT DOMAIN SCOPE: You MUST ONLY answer questions related to ZoikoMeds, medicine availability, verified pharmacy searches, healthcare infrastructure, and platform features.
- DECLINE out-of-scope requests such as writing code (Python, JavaScript, HTML, etc.), debugging software, answering general non-healthcare trivia, creative writing, or math problems. Politely explain that you are specialized only in medicine availability searches on ZoikoMeds.
- DO NOT provide medical advice, diagnosis, treatment recommendations, or personalized dosage advice.
- Refer clinical questions to a doctor or qualified pharmacist.
- For medical emergencies, direct users to call 911 (US) or 999 (UK).
- DO NOT append "(Referenced: ...)", document title lists, or technical codes (ZM-ZOI-*) to your response text. State information directly, cleanly, and naturally.
- ONLY include "To get started, you can visit our search page at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed) and enter the name of the medicine you're looking for. If you need assistance with searching or have any questions, feel free to ask." when the requested medicine is NOT available in our database or when the user's location is NOT found in our data. Do NOT include this message or search link in standard greetings or when medicine/location are found.
CONTEXT (Site Knowledge Base):
${ragSources.map((s) => `[${s.title} (${s.section})]: ${s.body}`).join("\n")}

USER PERSONA: ${persona}
Respond concisely, helpfully, and professionally. Limit response to 3-4 sentences. Do NOT invent fake availability data.`;

    const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?key=${apiKey}&alt=sse`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: query }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: { maxOutputTokens: 300, temperature: 0.3 },
      }),
    });

    if (!res.ok || !res.body) {
      console.warn(`[Zoi Gemini API] API request failed with status ${res.status}, falling back to local engine.`);
      return null;
    }

    const encoder = new TextEncoder();
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const rawJson = line.slice(6).trim();
                if (!rawJson || rawJson === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(rawJson);
                  const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textChunk) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ type: "token", content: textChunk })}\n\n`)
                    );
                  }
                } catch {
                  // JSON parse catch
                }
              }
            }
          }
        } catch (err) {
          console.error("[Zoi Gemini Stream] Error reading stream:", err);
        } finally {
          const donePayload: Record<string, unknown> = { type: "done", chips: plan.chips };
          if (plan.availabilityCard) donePayload.availabilityCard = plan.availabilityCard;
          if (plan.citations && plan.citations.length > 0) {
            donePayload.citations = plan.citations;
            donePayload.evidenceState = "SUFFICIENT_SINGLE";
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(donePayload)}\n\n`));
          controller.close();
        }
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
  } catch (err) {
    console.error("[Zoi Gemini API] Error:", err);
    return null;
  }
}

async function streamGroqResponse(
  query: string,
  persona: string,
  ragSources: ContentDocument[],
  apiKey: string,
  plan: ResponsePlan
): Promise<Response | null> {
  try {
    const systemPrompt = `You are Zoi, the intelligent medicine availability assistant for ZoikoMeds.
Your core mission is to help users discover medicine availability and navigate the platform safely.
CRITICAL SAFETY BOUNDARIES:
- STRICT DOMAIN SCOPE: You MUST ONLY answer questions related to ZoikoMeds, medicine availability, verified pharmacy searches, healthcare infrastructure, and platform features.
- DECLINE out-of-scope requests such as writing code (Python, JavaScript, HTML, etc.), debugging software, answering general non-healthcare trivia, creative writing, or math problems. Politely explain that you are specialized only in medicine availability searches on ZoikoMeds.
- DO NOT provide medical advice, diagnosis, treatment recommendations, or personalized dosage advice.
- Refer clinical questions to a doctor or qualified pharmacist.
- For medical emergencies, direct users to call 911 (US) or 999 (UK).
- DO NOT append "(Referenced: ...)", document title lists, or technical codes (ZM-ZOI-*) to your response text. State information directly, cleanly, and naturally.
- ONLY include "To get started, you can visit our search page at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed) and enter the name of the medicine you're looking for. If you need assistance with searching or have any questions, feel free to ask." when the requested medicine is NOT available in our database or when the user's location is NOT found in our data. Do NOT include this message or search link in standard greetings or when medicine/location are found.
CONTEXT (Site Knowledge Base):
${ragSources.map((s) => `[${s.title} (${s.section})]: ${s.body}`).join("\n")}

USER PERSONA: ${persona}
Respond concisely, helpfully, and professionally. Limit response to 3-4 sentences. Do NOT invent fake availability data.`;

    const modelName = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
    const url = "https://api.groq.com/openai/v1/chat/completions";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        stream: true,
        temperature: 0.3,
        max_tokens: 300,
      }),
    });

    if (!res.ok || !res.body) {
      console.warn(`[Zoi Groq API] API request failed with status ${res.status}, falling back.`);
      return null;
    }

    const encoder = new TextEncoder();
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                const rawJson = trimmed.slice(6).trim();
                if (!rawJson || rawJson === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(rawJson);
                  const textChunk = parsed.choices?.[0]?.delta?.content;
                  if (textChunk) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ type: "token", content: textChunk })}\n\n`)
                    );
                  }
                } catch {
                  // JSON parse catch
                }
              }
            }
          }
        } catch (err) {
          console.error("[Zoi Groq Stream] Error reading stream:", err);
        } finally {
          const donePayload: Record<string, unknown> = { type: "done", chips: plan.chips };
          if (plan.availabilityCard) donePayload.availabilityCard = plan.availabilityCard;
          if (plan.citations && plan.citations.length > 0) {
            donePayload.citations = plan.citations;
            donePayload.evidenceState = "SUFFICIENT_SINGLE";
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(donePayload)}\n\n`));
          controller.close();
        }
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
  } catch (err) {
    console.error("[Zoi Groq API] Error:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
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
  const medInCurrentQuery = findMedicineInQuery(query);
  const regInCurrentQuery = extractRegion(query);
  const lowerQuery = query.toLowerCase().trim();

  const isGreetingOrGeneral = /^(hi|hello|hey|good morning|good afternoon|greetings)\b/i.test(lowerQuery) ||
    /\b(thank|thanks|ok|okay|alright|got it|cool|fine|understood|k)\b/i.test(lowerQuery) ||
    /^(what is|who are|how does|tell me about|explain)\b/i.test(lowerQuery);

  const isAffirmationOrFollowUp = /^(yes|yeah|yep|sure|proceed|check|do it|confirm)\b/i.test(lowerQuery) ||
    /^(\d+\s*(mg|g|ml|mcg)|tablets?|capsules?)$/i.test(lowerQuery) ||
    /availability|pharmacy|pharmacies|stock/i.test(lowerQuery);

  let foundMedicine: string | null = medInCurrentQuery;
  let foundRegion: string | null = regInCurrentQuery;

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
      const promptText = `I can set an alert for ${medName}. Which location or city should I monitor?`;
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

  // Multi-turn context extraction: ONLY search history if query is an availability follow-up or location/medicine input (NOT greetings or general queries)
  if (!isGreetingOrGeneral && (medInCurrentQuery || regInCurrentQuery || isAffirmationOrFollowUp)) {
    if (!foundMedicine && rawMessages.length > 0) {
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

    if (!foundRegion && !medInCurrentQuery && rawMessages.length > 0) {
      for (let i = rawMessages.length - 1; i >= 0; i--) {
        const prevContent = rawMessages[i]?.content;
        if (prevContent) {
          const prevReg = extractRegion(prevContent);
          if (prevReg) {
            foundRegion = prevReg;
            break;
          }
        }
      }
    }
  }

  // If medicine is found but region is missing (and current query is NOT a greeting), prompt user to specify location
  if (!isGreetingOrGeneral && foundMedicine && !foundRegion) {
    const medName = foundMedicine.toUpperCase();
    const promptText = `I found ${medName} in our database. Which location or city should I check availability for?`;
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const words = promptText.split(" ");
        for (let i = 0; i < words.length; i++) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", content: words[i] + (i < words.length - 1 ? " " : "") })}\n\n`));
          await delay(20);
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", chips: ["escalate"] })}\n\n`));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive", "X-Content-Type-Options": "nosniff" },
    });
  }

  if (!isGreetingOrGeneral && foundMedicine && foundRegion) {
    console.log(`[Zoi Debug] Calling lookupAvailability with medicine="${foundMedicine}" region="${foundRegion}"`);

    const availResult = await lookupAvailabilityAsync({ medicine: foundMedicine, region: foundRegion });

    console.log(`[Zoi Debug] lookupAvailability returned: ${availResult ? "SUCCESS" : "NULL"}`);

    if (availResult) {
      console.log(`[Zoi Audit]`, JSON.stringify({
        ...auditLog,
        action: "zoikoavail_lookup",
        toolPayload: { medicine: foundMedicine, region: foundRegion },
        toolResult: { success: true, confidence: availResult.confidence, cardState: availResult.cardState, stockingPharmacies: availResult.stockingPharmacies },
      }));

      const intro = pick([
        `Here's the availability information for ${availResult.medicine} in ${availResult.region}:`,
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
  const plan = await getResponsePlan(query, persona, classification);

  // Check for Groq API key first, then Gemini API key
  const groqApiKey = process.env.GROQ_API_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!checkPromptInjection(query)) {
    const rawDocs = searchContent(query);

    if (groqApiKey) {
      const groqRes = await streamGroqResponse(query, persona, rawDocs, groqApiKey, plan);
      if (groqRes) {
        console.log(`[Zoi Audit]`, JSON.stringify({
          ...auditLog,
          action: "response_sent_via_groq_llm",
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
        }));
        return groqRes;
      }
    }

    if (geminiApiKey) {
      const geminiRes = await streamGeminiResponse(query, persona, rawDocs, geminiApiKey, plan);
      if (geminiRes) {
        console.log(`[Zoi Audit]`, JSON.stringify({
          ...auditLog,
          action: "response_sent_via_gemini_llm",
          model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
        }));
        return geminiRes;
      }
    }
  }

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
      if (plan.citations && plan.citations.length > 0) {
        donePayload.citations = plan.citations;
        donePayload.evidenceState = "SUFFICIENT_SINGLE";
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
  } catch (err) {
    console.error("[Zoi Stream Fatal Error]:", err);
    return new Response(
      JSON.stringify({ success: false, error: "internal_server_error", detail: String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
