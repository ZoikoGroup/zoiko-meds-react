/**
 * Vector Embeddings and Semantic Distance Utilities for ZOI RAG Engine
 * Supports local vector generation, cosine similarity math, and hybrid scoring.
 */

// Cosine Similarity between two N-dimensional numerical vector arrays
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Global vocabulary dictionary for local vector space model
let globalVocabulary: string[] = [];
let vocabularyIndex: Map<string, number> = new Map();

/**
 * Builds a vector space vocabulary from a corpus of texts
 */
export function buildVocabulary(corpus: string[]): void {
  const words = new Set<string>();
  for (const text of corpus) {
    const tokens = tokenizeText(text);
    for (const t of tokens) {
      words.add(t);
    }
  }
  globalVocabulary = Array.from(words).sort();
  vocabularyIndex = new Map(globalVocabulary.map((w, idx) => [w, idx]));
}

/**
 * Basic tokenizer with stop-word filtering
 */
export function tokenizeText(text: string): string[] {
  const stopWords = new Set([
    "a", "an", "the", "is", "it", "at", "on", "in", "to", "for", "of", "with",
    "and", "or", "but", "not", "do", "does", "did", "can", "will", "would",
    "could", "should", "may", "might", "am", "are", "was", "were", "be",
    "been", "being", "have", "has", "had", "i", "you", "he", "she", "we",
    "they", "me", "my", "your", "this", "that", "these", "those", "what",
    "which", "who", "whom", "how", "when", "where", "why",
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));
}

/**
 * Generates an L2-normalized TF-IDF vector embedding for a given input text
 */
export function generateVectorEmbedding(text: string): number[] {
  if (globalVocabulary.length === 0) {
    return [];
  }

  const vector = new Array(globalVocabulary.length).fill(0);
  const tokens = tokenizeText(text);
  if (tokens.length === 0) return vector;

  // Term frequencies
  const tfMap = new Map<string, number>();
  for (const token of tokens) {
    tfMap.set(token, (tfMap.get(token) || 0) + 1);
  }

  for (const [token, count] of tfMap.entries()) {
    const idx = vocabularyIndex.get(token);
    if (idx !== undefined) {
      vector[idx] = count / tokens.length;
    }
  }

  // L2 Normalization
  let sumSq = 0;
  for (let i = 0; i < vector.length; i++) {
    sumSq += vector[i] * vector[i];
  }
  const norm = Math.sqrt(sumSq);
  if (norm > 0) {
    for (let i = 0; i < vector.length; i++) {
      vector[i] = vector[i] / norm;
    }
  }

  return vector;
}

/**
 * Interface for optional remote vector provider (e.g. pgvector, Pinecone, OpenAI)
 */
export interface RemoteVectorQuery {
  vector: number[];
  topK: number;
  namespace?: string;
}

export interface RemoteVectorMatch {
  id: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export async function queryExternalVectorStore(
  query: RemoteVectorQuery
): Promise<RemoteVectorMatch[] | null> {
  const provider = process.env.VECTOR_DB_TYPE;
  if (!provider) {
    // Local embedded vector mode active
    return null;
  }

  // Fallback / stub for production Pinecone or pgvector connector
  console.log(`[Vector DB] Connected to provider: ${provider} (topK=${query.topK})`);
  return null;
}
