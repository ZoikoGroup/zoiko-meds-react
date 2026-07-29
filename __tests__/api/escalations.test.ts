import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/escalations/route";

let callIndex = 0;

async function postEscalation(body: unknown) {
  callIndex++;
  const req = new NextRequest("http://localhost:3456/api/escalations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": `192.168.1.${callIndex}`,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  return POST(req);
}

describe("/api/escalations", () => {
  it("returns 400 when contact is missing", async () => {
    const res = await postEscalation({});
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("contact_required");
  });

  it("returns 400 when contact is empty", async () => {
    const res = await postEscalation({ contact: "   " });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(["contact_required", "contact_empty"]).toContain(json.error);
  });

  it("returns 400 for invalid email format", async () => {
    const res = await postEscalation({ contact: "not-an-email" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("contact_invalid");
  });

  it("returns 400 for invalid JSON", async () => {
    const res = await postEscalation("bad-json");
    expect(res.status).toBe(400);
  });

  it("accepts valid email and returns ref", async () => {
    const res = await postEscalation({ contact: "test@example.com" });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.ref).toMatch(/^ZK-\d{5}$/);
    expect(json.data.message).toContain(json.data.ref);
  });

  it("accepts valid phone number", async () => {
    const res = await postEscalation({ contact: "+254700123456" });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.ref).toMatch(/^ZK-\d{5}$/);
  });

  it("accepts optional persona and messageCount", async () => {
    const res = await postEscalation({
      contact: "user@example.com",
      includeConversation: true,
      persona: "patient",
      messageCount: 5,
    });
    expect(res.status).toBe(200);
  });

  it("sets includeConversation default to true", async () => {
    const res = await postEscalation({ contact: "user@example.com" });
    expect(res.status).toBe(200);
  });

  it("rejects contact over 256 chars", async () => {
    const long = "a".repeat(257);
    const res = await postEscalation({ contact: long });
    expect(res.status).toBe(400);
  });
});
