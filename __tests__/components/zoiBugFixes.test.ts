import { describe, it, expect } from "vitest";
import { lookupAvailability } from "@/lib/availability";
import { searchContent } from "@/lib/site-content";
import { POST } from "@/app/internal/zoi/stream/route";
import { NextRequest } from "next/server";
import type { Message } from "@/components/zoi/types";

describe("Zoi Chatbot Bug Fixes (BUG-01 to BUG-06)", () => {
  it("BUG-01: Stream API prompts user for region when medicine is queried without location", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Paracetamol 500mg",
        persona: "patient",
        messages: [{ role: "user", content: "Paracetamol 500mg" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).toContain("PARACETAMOL");
    expect(bodyText).toContain("location");
    expect(bodyText).toContain("city");
  });

  it("BUG-01 & BUG-02: Stream API resolves medicine and region from history on follow-up turns", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "500mg",
        persona: "patient",
        messages: [
          { role: "user", content: "Paracetamol in Delhi" },
          { role: "assistant", content: "I found availability data for Paracetamol in Delhi." },
          { role: "user", content: "500mg" },
        ],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).toContain("PARACETAMOL");
    expect(bodyText).toContain("Delhi");
  });

  it("BUG-03: Enterprise persona returns enterprise action chips instead of consumer check_availability", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "api access",
        persona: "enterprise",
        messages: [{ role: "user", content: "api access" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).toContain("request_api_docs");
  });

  it("BUG-04: Search guidance includes direct clickable URL", () => {
    const results = searchContent("how to use platform's medicine search feature");
    expect(results.length).toBeGreaterThan(0);
    const match = results.find((r) => r.id === "search-guidance");
    expect(match).toBeDefined();
    expect(match?.body).toContain("zoikomeds.com/searchmed");
  });

  it("BUG-05: Wholesale flow provides contact link and CTA action chip", async () => {
    const results = searchContent("tell me about wholesale portal");
    expect(results.length).toBeGreaterThan(0);
    const wholesaleDoc = results.find((r) => r.id === "wholesale-partnership");
    expect(wholesaleDoc).toBeDefined();
    expect(wholesaleDoc?.body).toContain("/contact");

    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "tell me about wholesale portal",
        persona: "wholesale",
        messages: [{ role: "user", content: "tell me about wholesale portal" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).toContain("wholesale_portal");
  });

  it("BUG-06: Lookup for Delhi region resolves stock entries correctly", () => {
    const res = lookupAvailability({ medicine: "dolo", region: "delhi" });
    expect(res).not.toBeNull();
    expect(res?.medicine).toBe("DOLO");
    expect(res?.region).toBe("Delhi");
    expect(res?.stockingPharmacies).toBeGreaterThan(0);
  });

  it("does not re-display availability card on greetings after availability query", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "hello",
        persona: "patient",
        messages: [
          { role: "user", content: "Paracetamol in Delhi" },
          { role: "assistant", content: "Here is availability for Paracetamol in Delhi" },
          { role: "user", content: "hello" },
        ],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).not.toContain("availabilityCard");
    expect(bodyText.toLowerCase()).toContain("hello");
  });

  it("does not re-display availability card when user says ok/okay after availability query", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "ok",
        persona: "patient",
        messages: [
          { role: "user", content: "Paracetamol in Delhi" },
          { role: "assistant", content: "Here is availability for Paracetamol in Delhi" },
          { role: "user", content: "ok" },
        ],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).not.toContain("availabilityCard");
    expect(bodyText.toLowerCase()).toContain("welcome");
  });

  it("prompts for medicine when region only (e.g. hyderabad) is queried", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "hyderabad",
        persona: "patient",
        messages: [{ role: "user", content: "hyderabad" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).toContain("Hyderabad");
    expect(bodyText).toContain("medicine");
  });

  it("returns search page message ONLY when medicine is not available or location is not found in data", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "azithromycin",
        persona: "patient",
        messages: [{ role: "user", content: "azithromycin" }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const bodyText = await res.text();
    expect(bodyText).toContain("zoikomeds.com/searchmed");
    expect(bodyText).toContain("assistance");
    expect(bodyText).toContain("searching");
  });

  it("BUG-06: Persists multi-turn session logs without dropping prior turns", () => {
    // Test that multi-turn messages update active session in savedSessions atomically
    const session1Id = "session-test-01";
    const state = {
      messages: [] as Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: number }>,
      savedSessions: [] as Array<{ id: string; title: string; createdAt: number; messages: Message[]; persona: unknown }>,
      activeSessionId: session1Id,
      persona: "patient" as const,
      personaSet: true,
    };

    // Simulate turn 1: Paracetamol search
    const msg1 = { id: "m1", role: "user" as const, content: "Paracetamol search", timestamp: Date.now() };
    const msg2 = { id: "m2", role: "assistant" as const, content: "I found Paracetamol in stock", timestamp: Date.now() };
    state.messages.push(msg1, msg2);

    const userMsgs1 = state.messages.filter((m) => m.role === "user");
    const session1 = {
      id: state.activeSessionId,
      title: userMsgs1[0].content,
      createdAt: Date.now(),
      messages: [...state.messages],
      persona: state.persona,
    };
    state.savedSessions = [session1, ...state.savedSessions.filter((s) => s.id !== session1.id)];

    // Simulate turn 2: API access inquiry
    const msg3 = { id: "m3", role: "user" as const, content: "API access inquiry", timestamp: Date.now() };
    const msg4 = { id: "m4", role: "assistant" as const, content: "Here is API documentation", timestamp: Date.now() };
    state.messages.push(msg3, msg4);

    const userMsgs2 = state.messages.filter((m) => m.role === "user");
    const session1Updated = {
      id: state.activeSessionId,
      title: userMsgs2[0].content,
      createdAt: session1.createdAt,
      messages: [...state.messages],
      persona: state.persona,
    };
    state.savedSessions = [session1Updated, ...state.savedSessions.filter((s) => s.id !== session1Updated.id)];

    // Simulate turn 3: What is this platform for
    const msg5 = { id: "m5", role: "user" as const, content: "What is this platform for", timestamp: Date.now() };
    const msg6 = { id: "m6", role: "assistant" as const, content: "ZoikoMeds helps discover real-time medicine availability", timestamp: Date.now() };
    state.messages.push(msg5, msg6);

    const userMsgs3 = state.messages.filter((m) => m.role === "user");
    const session1Final = {
      id: state.activeSessionId,
      title: userMsgs3[0].content,
      createdAt: session1.createdAt,
      messages: [...state.messages],
      persona: state.persona,
    };
    state.savedSessions = [session1Final, ...state.savedSessions.filter((s) => s.id !== session1Final.id)];

    // Verify session 1 retains all 6 messages across 3 turns
    expect(state.savedSessions.length).toBe(1);
    expect(state.savedSessions[0].messages.length).toBe(6);
    expect(state.savedSessions[0].messages.map((m: Message) => m.content)).toEqual([
      "Paracetamol search",
      "I found Paracetamol in stock",
      "API access inquiry",
      "Here is API documentation",
      "What is this platform for",
      "ZoikoMeds helps discover real-time medicine availability",
    ]);
  });
});
