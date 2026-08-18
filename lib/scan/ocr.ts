/**
 * On-server OCR for scanned prescriptions, via tesseract.js.
 *
 * This is the free tier of the scan pipeline: a photo or a scanned PDF that
 * carries no selectable text is read here, and only what Tesseract cannot make
 * sense of is escalated to the paid vision models. Nothing leaves the server
 * and no API key is involved.
 */
import path from "node:path";
import { createWorker, type Worker } from "tesseract.js";

/**
 * Keep the ~5 MB language model inside node_modules rather than the repo root,
 * which is where tesseract.js drops it by default.
 */
const CACHE_PATH = path.join(process.cwd(), "node_modules", ".cache", "tesseract");

/**
 * Point tesseract.js at its own worker script explicitly.
 *
 * Left to itself the library resolves this relative to its bundled location,
 * which a production build rewrites to a path that does not exist — OCR then
 * fails with MODULE_NOT_FOUND on the first request while working perfectly in
 * dev. Resolving from the installed package keeps both identical.
 */
const WORKER_PATH = path.join(
  process.cwd(),
  "node_modules",
  "tesseract.js",
  "src",
  "worker-script",
  "node",
  "index.js",
);

/** Below this, Tesseract is guessing and the reading needs a human to confirm it. */
export const LOW_OCR_CONFIDENCE = 0.7;

/** One page's reading. */
export interface OcrPage {
  /** 1-based page number. */
  page: number;
  text: string;
  /** 0..1, normalized from Tesseract's 0..100 score. */
  confidence: number;
}

/**
 * One shared worker. Starting one costs several seconds (and downloads the
 * language model on first run), so it is created once and reused across
 * requests; tesseract.js queues jobs on it internally.
 */
let workerPromise: Promise<Worker> | null = null;

function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = createWorker("eng", undefined, {
      cachePath: CACHE_PATH,
      workerPath: WORKER_PATH,
    })
      .then(async (worker) => {
        // Prescriptions arrive from phone cameras and 150dpi scanners, well
        // below the ~300dpi print Tesseract is trained on. Declaring a working
        // DPI stops the engine treating small text as noise.
        await worker.setParameters({ user_defined_dpi: "300" });
        return worker;
      })
      .catch((err) => {
        // Don't cache the failure — a later request should be able to retry.
        workerPromise = null;
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
 * Read text out of one image. Returns null when OCR is unavailable (no language
 * model, no network on first run, worker failure) so the caller can fall back.
 */
export async function recognizeImage(image: Buffer): Promise<{ text: string; confidence: number } | null> {
  if (!image?.length) return null;
  try {
    const worker = await getWorker();
    const { data } = await worker.recognize(image);
    const text = (data?.text ?? "").trim();
    if (!text) return null;
    return {
      text,
      confidence: Math.min(1, Math.max(0, (typeof data?.confidence === "number" ? data.confidence : 0) / 100)),
    };
  } catch (err) {
    console.warn("[medicine/scan] Tesseract OCR failed:", err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Read every page, keeping them separate so a medicine can be attributed to its
 * page and one unreadable page does not discard the rest.
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
