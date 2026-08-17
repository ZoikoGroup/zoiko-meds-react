import { NextRequest, NextResponse } from "next/server";
import { extractPdfText, looksLikePdf, normalizeExtractedText } from "@/lib/pdf-text";
import {
  canonicalizeUnknownCandidates,
  matchCatalog,
  unrecognizedMedicineLines,
} from "@/lib/medicine-catalog";

/** Route handlers under app/internal run on Node — the PDF parser needs zlib. */
export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

/** What we managed to read out of the upload before any OCR. */
interface ExtractedUpload {
  /** Text from the file's own content — PDF text layer, or a plain-text upload. */
  body: string;
  /** `body` plus the filename; what catalog matching runs against. */
  searchText: string;
  /** True when the upload is an image, or a PDF with no text layer (a scan). */
  needsOcr: boolean;
}

const IMAGE_EXTENSIONS = /\.(?:png|jpe?g|gif|bmp|webp|heic|heif|tiff?|avif)$/i;

/**
 * Image magic bytes. Compressed image data decodes into enough letter-shaped
 * noise to trip medicine matching ("PcM" really does turn up inside a PNG), so
 * images are never read as text — they go to OCR instead.
 */
function looksLikeImage(buffer: Buffer, fileName: string): boolean {
  if (IMAGE_EXTENSIONS.test(fileName)) return true;
  if (buffer.length < 4) return false;
  const ascii = (from: number, to: number) => buffer.subarray(from, to).toString("latin1");
  if (buffer[0] === 0x89 && ascii(1, 4) === "PNG") return true;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true; // JPEG
  if (ascii(0, 3) === "GIF") return true;
  if (ascii(0, 2) === "BM") return true; // BMP
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return true;
  if (ascii(4, 8) === "ftyp") return true; // HEIC / HEIF / AVIF
  if (ascii(0, 2) === "II" && buffer[2] === 0x2a) return true; // TIFF LE
  if (ascii(0, 2) === "MM" && buffer[3] === 0x2a) return true; // TIFF BE
  return false;
}

/** Reject binary blobs masquerading as text. */
function isMostlyText(value: string): boolean {
  if (!value.trim()) return false;
  const sample = value.slice(0, 16384);
  let control = 0;
  for (let i = 0; i < sample.length; i++) {
    const code = sample.charCodeAt(i);
    if (code === 0) return false;
    if (code === 0xfffd || (code < 32 && code !== 9 && code !== 10 && code !== 13)) control++;
  }
  return control / sample.length < 0.01;
}

/** Decode an upload as UTF-8 text, or null when the bytes aren't text at all. */
function decodeAsText(buffer: Buffer): string | null {
  if (!buffer.length) return null;
  let text: string;
  try {
    // Strict decoding: arbitrary binary is not valid UTF-8 and throws here.
    text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);
  } catch {
    return null;
  }
  return isMostlyText(text) ? text : null;
}

/**
 * Read the medicine names out of the upload itself.
 *
 * Text-based PDFs carry their words in the page content stream, so those are
 * parsed directly — far more accurate than OCR and it costs nothing. Scanned
 * PDFs and photos have no text layer; those come back with `needsOcr` set so
 * the caller can hand them to a vision model instead.
 */
export function extractUploadText(fileName: string, buffer: Buffer, rawContent = ""): ExtractedUpload {
  const isPdf = looksLikePdf(buffer) || rawContent.trimStart().startsWith("%PDF-");

  let body = "";
  let needsOcr = true;

  if (isPdf) {
    const source = buffer.length ? buffer : Buffer.from(rawContent, "latin1");
    const result = extractPdfText(source);
    body = result.text;
    needsOcr = result.needsOcr;
  } else if (!looksLikeImage(buffer, fileName)) {
    const plain = (rawContent && isMostlyText(rawContent) ? rawContent : null) ?? decodeAsText(buffer);
    if (plain) {
      body = normalizeExtractedText(plain);
      needsOcr = false;
    }
  }

  // The filename often names the medicine ("Dolo 650.pdf") but is not document
  // content, so it is searched without counting as extracted text.
  const fileNameWords = fileName ? fileName.replace(/[._-]+/g, " ") : "";
  const searchText = normalizeExtractedText([fileNameWords, body].filter(Boolean).join("\n"));

  return { body, searchText, needsOcr };
}

/**
 * Offline medicine detection for one upload: read its text, then match against
 * the ZoikoMeds catalog. Exported for the route tests.
 *
 * `fileSize` is unused — kept so existing callers don't have to change.
 */
export function getDynamicMedsForFile(
  fileName: string,
  fileSize: number,
  buffer: Buffer,
  rawContent: string = "",
): string[] {
  return matchCatalog(extractUploadText(fileName, buffer, rawContent).searchText);
}

/** Ask Gemini to read a prescription image or PDF. Returns [] when unavailable. */
async function extractWithGemini(buffer: Buffer, mimeType: string): Promise<string[]> {
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
                {
                  text: `Extract ONLY prescribed medicine/drug names with dosages from this prescription.
CRITICAL EXCLUSIONS: DO NOT extract doctor names, hospital details, dates, patient info (age/gender/weight), or clinical diagnosis notes (URTI, RR, RS).
Extract ONLY prescribed medicines listed under Advice/Rx, e.g. "Calpol 250mg", "Delcon Syrup", "Levolin Syrup", "Meftal-P 100mg".
Return ONLY a JSON array of strings. No explanations.`,
                },
              ],
            },
          ],
          generationConfig: { response_mime_type: "application/json" },
        }),
      },
    );
    if (!response.ok) return [];
    const body = await response.json();
    const rawText = String(body?.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]").replace(/```json|```/g, "").trim();
    const medicines = JSON.parse(rawText);
    return Array.isArray(medicines) ? medicines.filter((m): m is string => typeof m === "string") : [];
  } catch (err) {
    console.warn("[medicine/scan] Gemini OCR unavailable:", err);
    return [];
  }
}

/** Ask Claude to read a prescription image or PDF. Returns [] when unavailable. */
async function extractWithClaude(buffer: Buffer, mimeType: string): Promise<string[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY ?? "";
  if (!apiKey) return [];

  const data = buffer.toString("base64");
  const isPdf = mimeType === "application/pdf";
  const source = isPdf
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
        max_tokens: 4096,
        output_config: { effort: "low" },
        messages: [
          {
            role: "user",
            content: [
              source,
              {
                type: "text",
                text: 'Extract ONLY prescribed medicine/drug names with dosages from this prescription. DO NOT extract doctor names, hospital details, dates, patient info, or clinical diagnosis notes (URTI, etc.). Return a JSON array of strings like ["Calpol 250mg","Delcon Syrup"]. No explanations.',
              },
            ],
          },
        ],
      }),
    });
    if (!response.ok) return [];

    const body = await response.json();
    if (body?.stop_reason === "refusal") return [];
    const text = (body?.content ?? [])
      .filter((block: { type?: string }) => block?.type === "text")
      .map((block: { text?: string }) => block.text ?? "")
      .join("")
      .replace(/```json|```/g, "")
      .trim();
    const medicines = JSON.parse(text || "[]");
    return Array.isArray(medicines) ? medicines.filter((m): m is string => typeof m === "string") : [];
  } catch (err) {
    console.warn("[medicine/scan] Claude OCR unavailable:", err);
    return [];
  }
}

function ok(medicines: string[], source: string) {
  return NextResponse.json(
    { success: true, data: { medicines, source } },
    { headers: NO_STORE_HEADERS },
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("prescription") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const named = file as unknown as { name?: string; filename?: string };
    const fileName = named.name || named.filename || "";
    const mimeType = file.type || "";

    const isAllowed =
      !mimeType ||
      mimeType.startsWith("image/") ||
      mimeType === "application/pdf" ||
      mimeType === "application/octet-stream" ||
      mimeType === "text/plain";
    if (!isAllowed) {
      return NextResponse.json({ success: false, error: "Unsupported file type" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File too large (max 10 MB)" }, { status: 400 });
    }

    let buffer = Buffer.from([]);
    try {
      buffer = Buffer.from(await file.arrayBuffer());
    } catch (err) {
      console.warn("[medicine/scan] Could not read upload bytes:", err);
    }

    // 1. Read the document's own text layer first — accurate, instant, free.
    //    Every layer runs over the whole document and contributes; none of them
    //    short-circuits, so a prescription listing several medicines returns
    //    all of them even when they resolve through different sources.
    const extracted = extractUploadText(fileName, buffer, "");
    const medicines: string[] = matchCatalog(extracted.searchText);

    if (extracted.body) {
      // Names the local catalog doesn't carry, confirmed against MediBase.
      medicines.push(...(await canonicalizeUnknownCandidates(extracted.body, medicines)));
      // Names neither catalog knows: keep what the prescription actually says
      // rather than dropping a medicine we read correctly.
      medicines.push(...unrecognizedMedicineLines(extracted.body, medicines));
    }

    if (medicines.length > 0) return ok(medicines, "text-layer");

    // 2. Scanned PDF or photo: no text to read, so fall back to OCR.
    if (buffer.length > 0) {
      const effectiveType = mimeType || (looksLikePdf(buffer) ? "application/pdf" : "image/jpeg");

      const viaGemini = await extractWithGemini(buffer, effectiveType);
      if (viaGemini.length > 0) return ok(viaGemini, "ocr:gemini");

      const viaClaude = await extractWithClaude(buffer, effectiveType);
      if (viaClaude.length > 0) return ok(viaClaude, "ocr:claude");
    }

    return ok([], extracted.needsOcr ? "ocr-unavailable" : "no-match");
  } catch (err) {
    console.error("[medicine/scan] Server error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to process prescription image." },
      { status: 500, headers: NO_STORE_HEADERS },
    );
  }
}
