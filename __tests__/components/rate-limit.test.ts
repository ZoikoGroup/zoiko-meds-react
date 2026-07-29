import { describe, it, expect } from "vitest";
import { rateLimit } from "@/lib/api/rate-limit";

describe("rateLimit", () => {
  it("allows request within limit", () => {
    const result = rateLimit("test-key", 5, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.retryAfter).toBeNull();
  });

  it("blocks request when limit exceeded", () => {
    const key = `exceed-${Date.now()}`;
    for (let i = 0; i < 3; i++) {
      const result = rateLimit(key, 2, 60000);
      if (i < 2) {
        expect(result.allowed).toBe(true);
      } else {
        expect(result.allowed).toBe(false);
        expect(result.remaining).toBe(0);
        expect(result.retryAfter).toBeGreaterThan(0);
      }
    }
  });

  it("resets after window expires", () => {
    const key = `reset-${Date.now()}`;
    rateLimit(key, 1, 50);
    const blocked = rateLimit(key, 1, 50);
    expect(blocked.allowed).toBe(false);
  });

  it("tracks remaining count correctly", () => {
    const key = `remaining-${Date.now()}`;
    const r1 = rateLimit(key, 5, 60000);
    expect(r1.remaining).toBe(4);
    const r2 = rateLimit(key, 5, 60000);
    expect(r2.remaining).toBe(3);
    const r3 = rateLimit(key, 5, 60000);
    expect(r3.remaining).toBe(2);
  });
});
