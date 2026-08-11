import {
  buildVocabulary,
  generateVectorEmbedding,
  cosineSimilarity,
} from "./vector-embeddings";

export interface ContentDocument {
  id: string;
  title: string;
  section: string;
  keywords: string[];
  body: string;
  url?: string;
  vector?: number[];
}

export interface HybridSearchResult {
  doc: ContentDocument;
  score: number;
  vectorScore: number;
  keywordScore: number;
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
    body: "Pharmacies can join the ZoikoMeds network to share real-time availability signals with patients in their area. The onboarding process includes verification of pharmacy licensure, setup of inventory reporting, and integration with the ZoikoAvail™ signal network.",
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
    body: "Availability is reported as a confidence tier — high, moderate, or low — based on the recency and strength of pharmacy-reported signals. Stock can change quickly, so always confirm directly with the pharmacy before visiting.",
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
    keywords: ["wholesale", "partner", "distributor", "bulk", "pricing", "order", "portal"],
    body: "Wholesale partners can access bulk pricing, track orders, and manage supply chain planning through our partner network. To connect with our wholesale team or request a briefing, visit [zoikomeds.com/contact](https://zoikomeds.com/contact) or contact us directly.",
    url: "/contact",
  },
  {
    id: "search-guidance",
    title: "How to use medicine search",
    section: "platform",
    keywords: ["search", "how to search", "medicine search feature", "use platform search", "find medicine"],
    body: "To use our medicine search feature, simply visit our search page and enter the name of the medicine you're looking for. You can search by medicine name, and our platform will show you availability information from verified pharmacies in your area. If you need assistance with searching or have any questions, feel free to ask. To get started, you can visit our search page at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed) and enter the name of the medicine you're looking for.",
    url: "/searchmed",
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
    title: "ZoikoAvail™ network",
    section: "platform",
    keywords: ["zoikoavail", "network", "availability data", "how it works", "source"],
    body: "ZoikoAvail™ is ZoikoMeds’ availability signal network. Participating pharmacies report stock data, which is aggregated into confidence-based availability tiers. The system uses Bayesian inference to compute the posterior probability that a medicine is in stock at a given location.",
  },
  {
    id: "trust-center",
    title: "Trust Center",
    section: "compliance",
    keywords: ["trust", "safety", "security", "compliance", "governance"],
    body: "The Trust Center documents ZoikoMeds’ safety doctrine, AI assistant governance, data controls, platform security, and audience-specific protections.",
    url: "/trust-center",
  },
];

// Initialize vector space vocabulary and document embeddings
const docTexts = CONTENT_INDEX.map(
  (doc) => `${doc.title} ${doc.keywords.join(" ")} ${doc.body}`
);
buildVocabulary(docTexts);

for (const doc of CONTENT_INDEX) {
  const textToEmbed = `${doc.title} ${doc.keywords.join(" ")} ${doc.body}`;
  doc.vector = generateVectorEmbedding(textToEmbed);
}

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

function scoreKeywordDocument(query: string, doc: ContentDocument): number {
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

/**
 * Perform hybrid vector similarity + keyword search across ZOI content
 */
export function hybridSearchContent(query: string, topK: number = 3): HybridSearchResult[] {
  const queryVector = generateVectorEmbedding(query);

  const results: HybridSearchResult[] = CONTENT_INDEX.map((doc) => {
    const vectorScore = doc.vector ? cosineSimilarity(queryVector, doc.vector) : 0;
    const rawKeywordScore = scoreKeywordDocument(query, doc);
    const keywordScore = rawKeywordScore > 0 ? Math.min(1.0, rawKeywordScore / 10) : 0;

    // Combined score: 65% vector semantic similarity + 35% exact keyword match
    const combinedScore = vectorScore * 0.65 + keywordScore * 0.35;

    return {
      doc,
      score: combinedScore,
      vectorScore,
      keywordScore,
    };
  });

  return results
    .filter((r) => r.score > 0.01)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/**
 * Main Content Search (uses Hybrid Vector RAG under the hood)
 */
export function searchContent(query: string, topK: number = 3): ContentDocument[] {
  const hybridResults = hybridSearchContent(query, topK);
  return hybridResults.map((res) => res.doc);
}

export function getContentBySection(section: string): ContentDocument[] {
  return CONTENT_INDEX.filter((d) => d.section === section);
}
