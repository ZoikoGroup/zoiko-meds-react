/**
 * POST /internal/medicine/scan — read the medicines off a prescription.
 *
 *   image or PDF
 *     → preprocessing
 *     → selectable PDF text, else on-server OCR (Tesseract), every page
 *     → candidate lines (structural classification)
 *     → non-medicine filtering (patient, prescriber, Sig/Disp/Refills, DEA/NPI…)
 *     → MediBase match, else the offline dictionary, else as written
 *     → confidence scoring
 *     → AI/Vision fallback when the reading is unclear
 *     → structured results
 *
 * The response keeps `data.medicines` — the string array the search widget
 * already consumes — and adds `data.items` with the structured detail beside
 * it, so nothing downstream has to change.
 *
 * A medicine is never invented: when the page cannot be read, the answer is an
 * empty list and a reason, not a plausible-looking guess.
 */
import { NextRequest, NextResponse } from "next/server";
import { extractPdfImages, extractPdfText, looksLikePdf } from "@/lib/pdf-text";
import { detectMedicines, shouldTryVision, type PageText } from "@/lib/scan/extract";
import { recognizePages } from "@/lib/scan/ocr";
import { computeConfidence, extractQuantity, needsConfirmation, type ScannedMedicine } from "@/lib/scan/resolve";
import { titleCase } from "@/lib/scan/candidate-extract";

/** The PDF parser needs zlib and Tesseract needs a worker — Node, not Edge. */
export const runtime = "nodejs";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

/** Which stage produced the answer — useful when a scan disappoints. */
export type ScanStage = "text-layer" | "ocr" | "vision" | "none";

export interface ScanReport {
  medicines: ScannedMedicine[];
  stage: ScanStage;
  pages: number;
  warnings: string[];
}

/* ────────────────────────── AI / vision fallback ────────────────────────── */

const VISION_INSTRUCTIONS = [
  "Transcribe every medicine legibly written on this prescription.",
  "",
  "Report each name as written — do not correct spelling, expand abbreviations into a",
  "different product, or substitute a generic for a brand. If a line is ambiguous, give",
  "your best reading with a low confidence rather than guessing between two candidates.",
  "Never invent a medicine; an empty list is a correct and useful answer.",
  "",
  "Ignore everything that is not a prescribed medicine: patient and prescriber details,",
  "hospital or clinic names, addresses, dates, registration numbers, DEA/NPI identifiers,",
  "Sig/Disp/Refill lines, vital signs, diagnoses and general advice.",
  "",
  'Return JSON only: {"medicines":[{"name","strength","form","quantity","frequency","duration","confidence"}]}',
  "where confidence is 0..1. Use an empty string for anything not written.",
].join("\n");

interface VisionReading {
  name: string;
  strength?: string;
  form?: string;
  quantity?: string;
  frequency?: string;
  duration?: string;
  confidence?: number;
}

/** Parse a model response defensively; accepts objects or plain strings. */
function parseVisionReadings(raw: string): VisionReading[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch {
    return [];
  }
  const list = Array.isArray(parsed) ? parsed : (parsed as { medicines?: unknown })?.medicines;
  if (!Array.isArray(list)) return [];

  return list
    .map((entry): VisionReading | null => {
      if (typeof entry === "string") return entry.trim() ? { name: entry.trim() } : null;
      const item = entry as Record<string, unknown>;
      const name = typeof item.name === "string" ? item.name.trim() : "";
      if (!name) return null;
      const str = (key: string) => {
        const value = item[key];
        return typeof value === "string" && value.trim() ? value.trim() : undefined;
      };
      return {
        name,
        strength: str("strength"),
        form: str("form") ?? str("dosageForm"),
        quantity: str("quantity"),
        frequency: str("frequency"),
        duration: str("duration"),
        confidence: typeof item.confidence === "number" ? item.confidence : undefined,
      };
    })
    .filter((entry): entry is VisionReading => entry !== null)
    .slice(0, 40);
}

/** Shape a model reading like any other, and always ask the user to confirm it. */
function fromVisionReading(reading: VisionReading): ScannedMedicine | null {
  const name = titleCase(reading.name);
  if (name.length < 2 || name.length > 120) return null;

  const confidence = computeConfidence({
    nameSimilarity: typeof reading.confidence === "number" ? Math.min(1, Math.max(0, reading.confidence)) : 0.8,
    source: "vision",
    evidence: { strength: Boolean(reading.strength), form: Boolean(reading.form), nameLike: true },
  });

  return {
    name,
    strength: reading.strength,
    dosageForm: reading.form ? titleCase(reading.form) : undefined,
    quantity: reading.quantity ?? extractQuantity(reading.name),
    frequency: reading.frequency,
    duration: reading.duration,
    confidence,
    requiresConfirmation: needsConfirmation(confidence, "vision"),
    source: "vision",
    note: "Read by assisted reading — please confirm",
    page: 1,
  };
}

/** Gemini reads images and PDFs directly. */
async function extractWithGemini(buffer: Buffer, mimeType: string): Promise<VisionReading[]> {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
  if (!key) return [];

  const mediaType =
    mimeType === "application/pdf"
      ? "application/pdf"
      : mimeType.startsWith("image/") && mimeType !== "image/heic" && mimeType !== "image/heif"
        ? mimeType
        : "image/jpeg";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { inline_data: { mime_type: mediaType, data: buffer.toString("base64") } },
                { text: VISION_INSTRUCTIONS },
              ],
            },
          ],
          generationConfig: { response_mime_type: "application/json" },
        }),
      },
    );
    if (!response.ok) return [];
    const body = await response.json();
    return parseVisionReadings(String(body?.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]"));
  } catch (err) {
    console.warn("[medicine/scan] Gemini fallback unavailable:", err instanceof Error ? err.message : err);
    return [];
  }
}

/** Claude reads images and PDFs; used when Gemini is absent or finds nothing. */
async function extractWithClaude(buffer: Buffer, mimeType: string): Promise<VisionReading[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY ?? "";
  if (!apiKey) return [];

  const data = buffer.toString("base64");
  const source =
    mimeType === "application/pdf"
      ? { type: "document" as const, source: { type: "base64", media_type: "application/pdf", data } }
      : {
          type: "image" as const,
          source: {
            type: "base64",
            media_type: mimeType === "image/heic" || mimeType === "image/heif" ? "image/jpeg" : mimeType,
            data,
          },
        };

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-opus-5",
        // Thinking is on by default and shares this budget with the reply.
        max_tokens: 8000,
        output_config: { effort: "low" },
        messages: [{ role: "user", content: [source, { type: "text", text: VISION_INSTRUCTIONS }] }],
      }),
    });
    if (!response.ok) return [];

    const body = await response.json();
    // Safety classifiers can decline; content is then empty or partial.
    if (body?.stop_reason === "refusal") return [];
    const text = (body?.content ?? [])
      .filter((block: { type?: string }) => block?.type === "text")
      .map((block: { text?: string }) => block.text ?? "")
      .join("");
    return parseVisionReadings(text || "[]");
  } catch (err) {
    console.warn("[medicine/scan] Claude fallback unavailable:", err instanceof Error ? err.message : err);
    return [];
  }
}

async function runVisionFallback(buffer: Buffer, mimeType: string): Promise<ScannedMedicine[]> {
  let readings = await extractWithGemini(buffer, mimeType);
  if (readings.length === 0) readings = await extractWithClaude(buffer, mimeType);
  return readings
    .map(fromVisionReading)
    .filter((medicine): medicine is ScannedMedicine => medicine !== null);
}

/* ────────────────────────── the pipeline ────────────────────────── */

/**
 * Read a prescription. Never throws for "no medicines" — an empty list with a
 * reason is a correct and useful answer.
 */
export async function scanPrescription(buffer: Buffer, mimeType: string): Promise<ScanReport> {
  const warnings: string[] = [];
  const isPdf = mimeType === "application/pdf" || looksLikePdf(buffer);

  // 1. A digital PDF already carries its text. No OCR, no loss.
  if (isPdf) {
    try {
      const { text } = extractPdfText(buffer);
      if (text.trim()) {
        const medicines = await detectMedicines([{ page: 1, text }]);
        if (medicines.length > 0) {
          return { medicines, stage: "text-layer", pages: 1, warnings };
        }
      }
    } catch (err) {
      console.warn("[medicine/scan] PDF text layer unreadable:", err instanceof Error ? err.message : err);
      warnings.push("This PDF's text could not be read directly, so it was scanned as an image.");
    }
  }

  // 2. Otherwise OCR every page. PDF pages are rasterized and contrast-
  //    corrected on the way out of the file; an uploaded image is one page.
  let pageImages: Buffer[] = [];
  try {
    pageImages = isPdf ? extractPdfImages(buffer).map((image: { data: Buffer }) => image.data) : [buffer];
  } catch (err) {
    console.warn("[medicine/scan] Could not prepare page images:", err instanceof Error ? err.message : err);
    warnings.push("The pages of this file could not be prepared for reading.");
  }

  let ocrMedicines: ScannedMedicine[] = [];
  let pagesRead = 0;

  if (pageImages.length > 0) {
    try {
      const pages = await recognizePages(pageImages);
      pagesRead = pages.length;
      if (pages.length > 0) {
        const asText: PageText[] = pages.map((page) => ({
          page: page.page,
          text: page.text,
          ocrConfidence: page.confidence,
        }));
        ocrMedicines = await detectMedicines(asText);
      } else {
        warnings.push("No readable text was found on this file.");
      }
    } catch (err) {
      console.warn("[medicine/scan] OCR failed:", err instanceof Error ? err.message : err);
      warnings.push("On-server reading failed for this file.");
    }
  } else if (isPdf) {
    warnings.push("This PDF's pages use an image format that cannot be read here.");
  }

  // 3. Escalate to the vision models when the reading is empty or all-uncertain
  //    — handwriting, poor contrast, unusual layouts.
  if (shouldTryVision(ocrMedicines)) {
    const viaVision = await runVisionFallback(buffer, isPdf ? "application/pdf" : mimeType || "image/jpeg");
    if (viaVision.length > 0) {
      return { medicines: viaVision, stage: "vision", pages: Math.max(pagesRead, 1), warnings };
    }
  }

  if (ocrMedicines.length > 0) {
    return { medicines: ocrMedicines, stage: "ocr", pages: pagesRead, warnings };
  }

  return { medicines: [], stage: "none", pages: pagesRead, warnings };
}

/** The searchable label the availability search already expects. */
function searchLabel(medicine: ScannedMedicine): string {
  return [medicine.name, medicine.strength].filter(Boolean).join(" ").trim();
}

/* ────────────────────────── HTTP ────────────────────────── */

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("prescription") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const mimeType = file.type || "";
    const isAllowed =
      !mimeType ||
      mimeType.startsWith("image/") ||
      mimeType === "application/pdf" ||
      mimeType === "application/octet-stream" ||
      mimeType === "text/plain";
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, error: "Unsupported file type. Upload a JPG, PNG, or PDF prescription." },
        { status: 400 },
      );
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ success: false, error: "File too large (max 10 MB)" }, { status: 400 });
    }

    let buffer: Buffer;
    try {
      buffer = Buffer.from(await file.arrayBuffer());
    } catch (err) {
      console.error("[medicine/scan] Could not read upload bytes:", err);
      return NextResponse.json(
        { success: false, error: "This file could not be read. Please try uploading it again." },
        { status: 400, headers: NO_STORE_HEADERS },
      );
    }
    if (buffer.length === 0) {
      return NextResponse.json(
        { success: false, error: "This file is empty. Please upload the prescription again." },
        { status: 400, headers: NO_STORE_HEADERS },
      );
    }

    // A plain-text upload has no pages to rasterize — read it as written.
    const report =
      mimeType === "text/plain" && !looksLikePdf(buffer)
        ? {
            medicines: await detectMedicines([{ page: 1, text: buffer.toString("utf-8") }]),
            stage: "text-layer" as ScanStage,
            pages: 1,
            warnings: [] as string[],
          }
        : await scanPrescription(buffer, mimeType);

    return NextResponse.json(
      {
        success: true,
        data: {
          // Unchanged contract: the search widget reads this array as-is.
          medicines: report.medicines.map(searchLabel),
          // Structured detail alongside it, for anything that wants more.
          items: report.medicines,
          requiresConfirmation: report.medicines.some((m) => m.requiresConfirmation),
          pages: report.pages,
          stage: report.stage,
          warnings: report.warnings,
        },
      },
      { headers: NO_STORE_HEADERS },
    );
  } catch (err) {
    console.error("[medicine/scan] Server error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process this prescription. Please try another file." },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
