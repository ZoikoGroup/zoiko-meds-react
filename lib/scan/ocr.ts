import path from "node:path";
import fs from "node:fs";
import { createWorker, type Worker } from "tesseract.js";
import { normalizeExtractedText } from "@/lib/pdf-text";

/** The language model filenames tesseract.js will look for, gzip first. */
const TRAINEDDATA_FILES = ["eng.traineddata.gz", "eng.traineddata"] as const;

/**
 * Directories searched for the language model, in order of preference.
 *
 * All are resolved relative to the process working directory or an env var, so
 * nothing here is tied to one machine or operating system.
 */
function candidateLangPaths(): string[] {
  const configured = process.env.TESSDATA_PATH?.trim();
  return [
    // An explicit override wins — useful for a shared read-only model volume.
    ...(configured ? [path.resolve(configured)] : []),
    // Shipped with the application, so a deploy always has it.
    path.join(process.cwd(), "public", "tessdata"),
    // Where tesseract.js caches a previously downloaded model.
    path.join(process.cwd(), "node_modules", ".cache", "tesseract"),
  ];
}

function hasTraineddata(dir: string): boolean {
  try {
    return TRAINEDDATA_FILES.some((file) => fs.existsSync(path.join(dir, file)));
  } catch {
    return false;
  }
}

/**
 * Locate the local traineddata directory.
 *
 * Returns null when no local copy exists. The caller logs that and lets
 * tesseract.js fall back to its own resolution, but a deployment is expected to
 * ship the model rather than fetch it at runtime.
 */
export function getLangPath(): string | null {
  return candidateLangPaths().find(hasTraineddata) ?? null;
}

/**
 * Safely resolve workerScript path across dev and production environments.
 */
export function getWorkerPath(): string | undefined {
  try {
    const candidate = path.join(
      process.cwd(),
      "node_modules",
      "tesseract.js",
      "src",
      "worker-script",
      "node",
      "index.js"
    );
    if (fs.existsSync(candidate)) return candidate;
  } catch {
    /* fallback to default library resolution */
  }
  return undefined;
}

/** Below this, Tesseract is guessing and the reading needs a human to confirm it. */
export const LOW_OCR_CONFIDENCE = 0.7;

/**
 * Strip the artefacts an OCR engine adds that a PDF text layer never has:
 * table rules read as long runs of one symbol, column borders read as pipes,
 * and lines that came out as pure punctuation.
 *
 * This only removes noise — it never guesses a letter. Deciding that "ParacetamoI"
 * and "Paracetamol" are the same word stays with the confusion-folding in
 * text-normalize.ts, which runs later during matching.
 */
function stripOcrNoise(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) =>
      line
        // "-----", "......", "======" — a printed rule, not content.
        .replace(/([.\-_=~*·•|])\1{2,}/g, " ")
        // Column borders at the edges of a scanned table.
        .replace(/^[\s|¦‖]+|[\s|¦‖]+$/g, "")
        .trim(),
    )
    // A line with no letter and no digit carries nothing a medicine could use.
    .filter((line) => /[a-zA-Z0-9]/.test(line))
    .join("\n");
}

/**
 * Normalize one page of OCR output the same way PDF text is normalized, plus
 * the OCR-only noise pass. Applied at the source, so every consumer of
 * {@link recognizeImage} and {@link recognizePages} gets clean text.
 */
export function normalizeOcrText(text: string): string {
  return normalizeExtractedText(stripOcrNoise(text));
}

/** One page's reading. */
export interface OcrPage {
  /** 1-based page number. */
  page: number;
  text: string;
  /** 0..1, normalized from Tesseract's 0..100 score. */
  confidence: number;
}

/**
 * One shared worker. Starting one costs several seconds, so it is created once
 * and reused across requests; tesseract.js queues jobs on it internally.
 */
let workerPromise: Promise<Worker> | null = null;

export function resetWorkerPromiseForTesting(): void {
  workerPromise = null;
}

function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    const langPath = getLangPath();
    const workerPath = getWorkerPath();

    if (!langPath) {
      // Deliberately loud: without a local model every scan either stalls on a
      // CDN fetch or fails outright. Names the file, never a machine path.
      console.error(
        "[medicine/scan] Tesseract language model not found. Ship public/tessdata/eng.traineddata.gz " +
          "with the application, or set TESSDATA_PATH to a directory containing it. " +
          "OCR will be unavailable until then.",
      );
    }

    workerPromise = createWorker("eng", 1, {
      // Only pin the paths we actually resolved; undefined lets the library use
      // its own resolution rather than a directory we know is empty.
      ...(langPath ? { langPath, cachePath: langPath } : {}),
      ...(workerPath ? { workerPath } : {}),
      gzip: true,
    })
      .then(async (worker) => {
        // Declare working DPI so small text isn't treated as noise.
        await worker.setParameters({ user_defined_dpi: "300" });
        return worker;
      })
      .catch((err) => {
        // Don't cache the failure — a later request should be able to retry.
        workerPromise = null;
        console.error(
          "[medicine/scan] Tesseract worker initialization failed:",
          err instanceof Error ? err.message : String(err)
        );
        throw err;
      });
  }
  return workerPromise;
}

/** True when OCR is usable at all (worker starts, language model available). */
export async function isOcrAvailable(): Promise<boolean> {
  try {
    await getWorker();
    return true;
  } catch {
    return false;
  }
}

/**
 * Read text out of one image. Returns null when OCR is unavailable so caller falls back.
 */
export async function recognizeImage(image: Buffer): Promise<{ text: string; confidence: number } | null> {
  if (!image?.length) return null;
  try {
    const worker = await getWorker();
    const { data } = await worker.recognize(image);
    const text = normalizeOcrText(data?.text ?? "");
    if (!text) return null;
    return {
      text,
      confidence: Math.min(1, Math.max(0, (typeof data?.confidence === "number" ? data.confidence : 0) / 100)),
    };
  } catch (err) {
    console.warn("[medicine/scan] Tesseract OCR recognition failed:", err instanceof Error ? err.message : String(err));
    return null;
  }
}

/**
 * Read every page, keeping them separate so a medicine can be attributed to its page.
 */
export async function recognizePages(images: Buffer[]): Promise<OcrPage[]> {
  const pages: OcrPage[] = [];

  for (const [index, image] of images.entries()) {
    const result = await recognizeImage(image);
    if (!result) continue;
    pages.push({ page: index + 1, text: result.text, confidence: result.confidence });
  }

  return pages;
}

