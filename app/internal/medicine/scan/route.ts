import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("prescription") as File | null;

  if (!file) return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });

  const ALLOWED = ["image/jpeg", "image/png", "image/heic", "image/heif", "application/pdf"];
  if (!ALLOWED.includes(file.type))
    return NextResponse.json({ success: false, error: "Unsupported file type" }, { status: 400 });
  if (file.size > 10 * 1024 * 1024)
    return NextResponse.json({ success: false, error: "File too large (max 10 MB)" }, { status: 400 });

  const apiKey = process.env.ANTHROPIC_API_KEY ?? "";

  // Demo mode fallback when no key set
  if (!apiKey) {
    return NextResponse.json({
      success: true,
      data: { medicines: ["Amoxicillin 500mg", "Ibuprofen 400mg", "Omeprazole 20mg"] },
    });
  }

  const arrayBuf = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuf).toString("base64");
  const mediaType =
    file.type === "image/heic" || file.type === "image/heif" ? "image/jpeg" : file.type;

  const payload = {
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
          {
            type: "text",
            text: 'This is a prescription image. Extract ONLY the medicine/drug names with dosages. Return a JSON array of strings like ["Medicine 500mg","Medicine2 10mg"]. No explanations, just the JSON array.',
          },
        ],
      },
    ],
  };

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.json();
  let text = body?.content?.[0]?.text ?? "[]";
  text = text.replace(/```json|```/g, "").trim();
  let medicines: string[] = [];
  try { medicines = JSON.parse(text); } catch { medicines = []; }

  return NextResponse.json({ success: true, data: { medicines } });
}
