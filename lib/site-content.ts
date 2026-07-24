export interface ContentDocument {
  id: string;
  title: string;
  section: string;
  keywords: string[];
  body: string;
  url?: string;
}

const CONTENT_INDEX: ContentDocument[] = [
  {
    id: "platform-overview",
    title: "What is ZoikoMeds",
    section: "platform",
    keywords: ["zoikomeds", "platform", "about", "what is", "how it works"],
    body: "ZoikoMeds is medicine availability infrastructure operating across global markets including the United States, United Kingdom, and regional pharmacy networks. It connects patients to verified pharmacies through confidence-based availability signals. ZoikoMeds does not prescribe, dispense, sell, deliver, reserve, or guarantee medicines.",
    url: "/",
  },
  {
    id: "pharmacy-onboarding",
    title: "Pharmacy onboarding",
    section: "pharmacy",
    keywords: ["pharmacy", "onboard", "join", "partner", "register", "sign up pharmacy"],
    body: "Pharmacies can join the ZoikoMeds network to share real-time availability signals with patients in their area. The onboarding process includes verification of pharmacy licensure, setup of inventory reporting, and integration with the ZoikoAvail\u2122 signal network.",
    url: "/pharmacies",
  },
  {
    id: "patient-registration",
    title: "Patient registration",
    section: "patients",
    keywords: ["patient", "register", "sign up", "account", "profile"],
    body: "Patients can use Zoi without an account for medicine availability searches. Creating an account enables alert notifications for stocked medicines. No prescription data is stored.",
    url: "/patients",
  },
  {
    id: "availability-confidence",
    title: "Availability confidence",
    section: "platform",
    keywords: ["confidence", "availability", "signal", "how accurate", "reliability"],
    body: "Availability is reported as a confidence tier \u2014 high, moderate, or low \u2014 based on the recency and strength of pharmacy-reported signals. Stock can change quickly, so always confirm directly with the pharmacy before visiting.",
  },
  {
    id: "privacy-overview",
    title: "Privacy overview",
    section: "compliance",
    keywords: ["privacy", "data", "personal information", "gdpr", "data protection"],
    body: "ZoikoMeds does not sell patient data. Conversation data is ephemeral unless explicitly escalated with consent. Enterprise intelligence does not expose identifiable patient-level behavior.",
    url: "/privacy-center",
  },
  {
    id: "pharmacy-portal",
    title: "Pharmacy portal",
    section: "pharmacy",
    keywords: ["portal", "dashboard", "pharmacy dashboard", "manage inventory", "reports"],
    body: "The pharmacy portal allows partner pharmacies to manage their inventory signals, view patient demand trends, and update their availability data in real time.",
    url: "/pharmacies",
  },
  {
    id: "enterprise-solutions",
    title: "Enterprise solutions",
    section: "enterprise",
    keywords: ["enterprise", "hospital", "clinic", "organisation", "api", "integration"],
    body: "ZoikoMeds Enterprise provides hospital systems, clinic networks, and government health programmes with API access to availability data, population-level analytics, and custom governance controls.",
    url: "/enterprise",
  },
  {
    id: "wholesale-partnership",
    title: "Wholesale partnership",
    section: "wholesale",
    keywords: ["wholesale", "partner", "distributor", "bulk", "pricing", "order"],
    body: "Wholesale partners can access bulk pricing, manage orders through the wholesale portal, and coordinate with their account manager for supply chain planning.",
    url: "/wholesale",
  },
  {
    id: "medical-disclaimer",
    title: "Medical disclaimer",
    section: "compliance",
    keywords: ["disclaimer", "medical", "health", "emergency", "doctor", "advice"],
    body: "ZoikoMeds and Zoi do not provide medical advice, diagnoses, or prescriptions. For medical emergencies, call 911 or your local emergency services. For clinical questions, consult your pharmacist or doctor.",
  },
  {
    id: "alert-system",
    title: "Alert system",
    section: "patients",
    keywords: ["alert", "notification", "notify", "stock alert", "remind"],
    body: "When you set an alert for a medicine, Zoi can notify you when pharmacies report stock. Alerts are based on signal-derived data and may not reflect real-time availability.",
  },
  {
    id: "zoikoavail-explanation",
    title: "ZoikoAvail\u2122 network",
    section: "platform",
    keywords: ["zoikoavail", "network", "availability data", "how it works", "source"],
    body: "ZoikoAvail\u2122 is ZoikoMeds\u2019 availability signal network. Participating pharmacies report stock data, which is aggregated into confidence-based availability tiers. The system uses Bayesian inference to compute the posterior probability that a medicine is in stock at a given location.",
  },
  {
    id: "trust-center",
    title: "Trust Center",
    section: "compliance",
    keywords: ["trust", "safety", "security", "compliance", "governance"],
    body: "The Trust Center documents ZoikoMeds\u2019 safety doctrine, AI assistant governance, data controls, platform security, and audience-specific protections.",
    url: "/trust-center",
  },
  {
    id: "spec-prd-001",
    title: "Product Requirements Document (ZM-ZOI-PRD-001)",
    section: "platform",
    keywords: ["prd", "product requirements", "zoi vision", "medicine availability", "capabilities"],
    body: "Zoi (ZM-ZOI-PRD-001) is the medicine availability assistant for ZoikoMeds. It provides non-clinical medicine availability discovery, pharmacy onboarding guidance, patient alerts, and human escalation pathways across US and UK markets.",
    url: "/platform",
  },
  {
    id: "spec-frs-002",
    title: "Functional Requirements Specification (ZM-ZOI-FRS-002)",
    section: "platform",
    keywords: ["frs", "functional requirements", "capability model", "conversation states", "user stories"],
    body: "The Functional Requirements Specification (ZM-ZOI-FRS-002) establishes 11 core capabilities (C1-C11), finite state machines for conversation, persistent actions, and availability presentation, and Given/When/Then acceptance criteria.",
    url: "/platform",
  },
  {
    id: "spec-prompt-004",
    title: "Prompt Engineering Specification (ZM-ZOI-PROMPT-004)",
    section: "compliance",
    keywords: ["prompt engineering", "system prompt", "persona", "prompt stack", "injection defense"],
    body: "The Prompt Engineering Specification (ZM-ZOI-PROMPT-004) defines a 10-layer prompt stack (L0-L9), canonical zoi-core-system persona, structured decision outputs, tool cards, and untrusted-content injection wrappers.",
    url: "/trust-center",
  },
  {
    id: "spec-rag-005",
    title: "Knowledge Base & RAG Specification (ZM-ZOI-RAG-005)",
    section: "platform",
    keywords: ["rag", "knowledge base", "retrieval", "citations", "evidence sufficiency", "hybrid search"],
    body: "The RAG Specification (ZM-ZOI-RAG-005) governs multi-collection evidence indexing, hybrid lexical+vector retrieval, exact entity pre-filtering, citation precision, and evidence sufficiency states (SUFFICIENT, PARTIAL, CONFLICT, INSUFFICIENT, BLOCKED).",
    url: "/platform",
  },
  {
    id: "spec-api-006",
    title: "API Specification (ZM-ZOI-API-006)",
    section: "enterprise",
    keywords: ["api", "openapi", "bff", "sse", "streaming", "idempotency", "problem details"],
    body: "The API Specification (ZM-ZOI-API-006) defines the Backend-for-Frontend (BFF) contract at /v1/zoi/*, Server-Sent Events (SSE) streaming at /runs/{id}/events, RFC 9457 Problem Details, and Idempotency-Key handling for persistent POST actions.",
    url: "/enterprise",
  },
  {
    id: "spec-btd-007",
    title: "Backend Technical Design (ZM-ZOI-BTD-007)",
    section: "enterprise",
    keywords: ["backend design", "architecture", "temporal", "kafka", "redis", "outbox pattern"],
    body: "The Backend Technical Design (ZM-ZOI-BTD-007) specifies Python async services, Temporal for durable workflows (alerts and escalation cases), Kafka with Transactional Outbox, Redis hot projections/SSE replay, and OpenSearch hybrid retrieval.",
    url: "/enterprise",
  },
  {
    id: "spec-dbd-008",
    title: "Database Design (ZM-ZOI-DBD-008)",
    section: "compliance",
    keywords: ["database design", "postgresql", "row-level security", "rls", "envelope encryption", "uuidv7"],
    body: "The Database Design (ZM-ZOI-DBD-008) details service-owned regional PostgreSQL databases (conversation_db, alert_db, escalation_db, feedback_db, control_db, audit_db), Row-Level Security (RLS), envelope encryption, UUIDv7 primary keys, and point-in-time recovery.",
    url: "/privacy-center",
  },
  {
    id: "spec-safe-009",
    title: "AI Guardrails & Safety Specification (ZM-ZOI-SAFE-009)",
    section: "compliance",
    keywords: ["ai safety", "guardrails", "medical boundary", "refusal", "emergency routing", "poisoning"],
    body: "The AI Guardrails & Safety Specification (ZM-ZOI-SAFE-009) defines 6 defense-in-depth layers, strict medical boundary refusals (no diagnosis/dosage/substitution), deterministic emergency templates (SAFE-CRT-001), and zero-tolerance safety gates.",
    url: "/trust-center",
  },
  {
    id: "spec-esc-010",
    title: "Human Escalation Flow Specification (ZM-ZOI-ESC-010)",
    section: "compliance",
    keywords: ["human escalation", "routing matrix", "case creation", "consent preview", "priority levels"],
    body: "The Human Escalation Flow Specification (ZM-ZOI-ESC-010) establishes asynchronous case handoff, priority levels (P0-P4), category-based routing matrix, explicit context-transfer consent, preview tokens, and idempotent case submission.",
    url: "/trust-center",
  },
  {
    id: "spec-test-011",
    title: "Testing Plan (ZM-ZOI-TEST-011)",
    section: "compliance",
    keywords: ["testing plan", "qa", "evals", "red-teaming", "adversarial testing", "wcag 2.2 aa"],
    body: "The Testing Plan (ZM-ZOI-TEST-011) outlines a risk-based testing pyramid, automated AI model/RAG evaluation gates, adversarial red-teaming corpus, WCAG 2.2 AA accessibility verification, and release evidence bundles.",
    url: "/trust-center",
  },
  {
    id: "spec-dep-012",
    title: "Deployment Guide (ZM-ZOI-DEP-012)",
    section: "enterprise",
    keywords: ["deployment guide", "kubernetes", "canary rollout", "regional failover", "immutable release"],
    body: "The Deployment Guide (ZM-ZOI-DEP-012) details regional multi-zone Kubernetes infrastructure, US and UK home-region single-writer ownership, immutable signed release manifests, progressive canary rollouts, and disaster recovery.",
    url: "/enterprise",
  },
];

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "at", "on", "in", "to", "for", "of", "with",
  "and", "or", "but", "not", "do", "does", "did", "can", "will", "would",
  "could", "should", "may", "might", "am", "are", "was", "were", "be",
  "been", "being", "have", "has", "had", "i", "you", "he", "she", "we",
  "they", "me", "my", "your", "this", "that", "these", "those", "what",
  "which", "who", "whom", "how", "when", "where", "why",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function scoreDocument(query: string, doc: ContentDocument): number {
  const queryTokens = tokenize(query);
  const docTokens = tokenize(doc.title + " " + doc.body);
  const keywordTokens = doc.keywords.flatMap((k) => tokenize(k));

  let tokenScore = 0;
  for (const qt of queryTokens) {
    if (keywordTokens.includes(qt)) tokenScore += 3;
    else if (docTokens.includes(qt)) tokenScore += 1;
  }

  if (tokenScore === 0) return 0;

  let score = tokenScore;
  const queryLower = query.toLowerCase();
  if (doc.title.toLowerCase().includes(queryLower)) score += 5;
  if (doc.section.toLowerCase() === guessSection(query)) score += 2;

  return score;
}

function guessSection(query: string): string {
  const lower = query.toLowerCase();
  if (/pharmacy|pharmacist|onboard|portal|dashboard/i.test(lower)) return "pharmacy";
  if (/patient|register|find medicine|availability/i.test(lower)) return "patients";
  if (/enterprise|organisation|hospital|clinic|api/i.test(lower)) return "enterprise";
  if (/wholesale|distributor|bulk|pricing|order/i.test(lower)) return "wholesale";
  if (/privacy|data|compliance/i.test(lower)) return "compliance";
  return "platform";
}

export function searchContent(query: string, topK: number = 3): ContentDocument[] {
  const scored = CONTENT_INDEX
    .map((doc) => ({ doc, score: scoreDocument(query, doc) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  return scored.map((s) => s.doc);
}

export function getContentBySection(section: string): ContentDocument[] {
  return CONTENT_INDEX.filter((d) => d.section === section);
}
