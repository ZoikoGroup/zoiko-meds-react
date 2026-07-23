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
    body: "ZoikoMeds is medicine availability infrastructure for Kenya. It connects patients to verified pharmacies through confidence-based availability signals. ZoikoMeds does not prescribe, dispense, sell, deliver, reserve, or guarantee medicines.",
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
