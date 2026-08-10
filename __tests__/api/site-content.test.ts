import { describe, it, expect } from "vitest";
import {
  searchContent,
  hybridSearchContent,
  getContentBySection,
} from "@/lib/site-content";
import {
  generateVectorEmbedding,
  cosineSimilarity,
  tokenizeText,
} from "@/lib/vector-embeddings";

describe("Vector Embeddings & Cosine Similarity Math", () => {
  it("computes cosine similarity correctly", () => {
    const vecA = [1, 0, 0];
    const vecB = [1, 0, 0];
    const vecC = [0, 1, 0];

    expect(cosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
    expect(cosineSimilarity(vecA, vecC)).toBeCloseTo(0.0);
  });

  it("tokenizes and filters stop-words", () => {
    const tokens = tokenizeText("What is the ZoikoMeds platform and how does it work?");
    expect(tokens).toContain("zoikomeds");
    expect(tokens).toContain("platform");
    expect(tokens).toContain("work");
    expect(tokens).not.toContain("what");
    expect(tokens).not.toContain("is");
    expect(tokens).not.toContain("the");
  });

  it("generates L2 normalized vector embeddings", () => {
    const vec = generateVectorEmbedding("pharmacy portal inventory management");
    expect(vec.length).toBeGreaterThan(0);

    let sumSq = 0;
    for (const val of vec) {
      sumSq += val * val;
    }
    // Sum of squares of normalized vector should be close to 1
    if (sumSq > 0) {
      expect(sumSq).toBeCloseTo(1.0);
    }
  });
});

describe("Hybrid Vector RAG Search (lib/site-content.ts)", () => {
  it("performs hybrid vector search for semantic queries", () => {
    const query = "How do hospital systems and clinics integrate?";
    const results = hybridSearchContent(query, 3);

    expect(results.length).toBeGreaterThan(0);
    const topResult = results[0];
    expect(topResult.score).toBeGreaterThan(0);
    expect(topResult.vectorScore).toBeGreaterThan(0);
    expect(topResult.doc.id).toMatch(/enterprise/);
  });

  it("finds relevant documents for patient alert questions", () => {
    const results = searchContent("How do stock alert notifications work?");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((d) => d.id === "alert-system" || d.id === "patient-registration")).toBe(true);
  });

  it("finds privacy documents when asked about GDPR and data safety", () => {
    const results = searchContent("privacy data protection GDPR");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("privacy-overview");
  });

  it("filters content by section", () => {
    const complianceDocs = getContentBySection("compliance");
    expect(complianceDocs.length).toBeGreaterThan(0);
    expect(complianceDocs.every((d) => d.section === "compliance")).toBe(true);
  });
});
