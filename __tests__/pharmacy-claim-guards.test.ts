import { describe, expect, it } from "vitest";
import { distinctiveTokens, isPlausibleLocation } from "@/lib/pharmacyDirectory";

describe("claim lookup guards", () => {
  it("treats a junk name as a real (non-generic) query token", () => {
    expect(distinctiveTokens("tester")).toEqual(["tester"]);
  });
  it("finds no identifying word in a generic-only name", () => {
    expect(distinctiveTokens("The Pharmacy")).toEqual([]);
    expect(distinctiveTokens("Chemist Shop Ltd")).toEqual([]);
  });
  it("keeps the identifying word alongside generic ones", () => {
    expect(distinctiveTokens("Riverside Community Pharmacy")).toEqual(["riverside", "community"]);
  });
  it("rejects nonsense locations and accepts postal shapes", () => {
    expect(isPlausibleLocation("1")).toBe(false);
    expect(isPlausibleLocation("12")).toBe(false);
    expect(isPlausibleLocation("123")).toBe(false);
    expect(isPlausibleLocation("1234")).toBe(true);
    expect(isPlausibleLocation("SW1A 1AA")).toBe(true);
    expect(isPlausibleLocation("London")).toBe(true);
  });
});
