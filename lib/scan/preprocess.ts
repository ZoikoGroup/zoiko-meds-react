/**
 * Image preprocessing helper for raw bitmap buffers.
 * Converts raw bytes (RGB / Grayscale) to 8-bit grayscale with contrast stretching
 * and optional adaptive binarization for low-contrast scans.
 */
export function stretchToGray8(
  decoded: Buffer,
  width: number,
  height: number,
  channels = 3,
  bitDepth = 8
): Buffer | null {
  if (!decoded || decoded.length === 0 || width <= 0 || height <= 0) return null;

  const totalPixels = width * height;
  const out = Buffer.alloc(totalPixels);

  let min = 255;
  let max = 0;

  // Convert to grayscale values
  for (let i = 0; i < totalPixels; i++) {
    let gray = 0;
    if (bitDepth === 1) {
      const byteIdx = Math.floor(i / 8);
      const bitOffset = 7 - (i % 8);
      gray = (decoded[byteIdx] & (1 << bitOffset)) ? 255 : 0;
    } else if (channels >= 3) {
      const r = decoded[i * channels] ?? 0;
      const g = decoded[i * channels + 1] ?? 0;
      const b = decoded[i * channels + 2] ?? 0;
      gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    } else {
      gray = decoded[i] ?? 0;
    }

    out[i] = gray;
    if (gray < min) min = gray;
    if (gray > max) max = gray;
  }

  // Linear contrast stretch if useful
  const range = max - min;
  if (range >= 24 && range < 255) {
    const scale = 255 / range;
    for (let i = 0; i < totalPixels; i++) {
      out[i] = Math.max(0, Math.min(255, Math.round((out[i] - min) * scale)));
    }
  }

  return out;
}

/**
 * Perform binarization on an 8-bit grayscale buffer to boost OCR contrast
 * on faint, low-contrast, or shadowed scans.
 */
export function adaptiveBinarize(
  grayBuffer: Buffer,
  width: number,
  height: number
): Buffer {
  const total = width * height;
  const binarized = Buffer.alloc(total);
  if (!grayBuffer || grayBuffer.length < total) return grayBuffer;

  // Otsu's thresholding
  const histogram = new Array(256).fill(0);
  for (let i = 0; i < total; i++) {
    histogram[grayBuffer[i]]++;
  }

  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * histogram[t];

  let sumB = 0;
  let wB = 0;
  let wF = 0;
  let varMax = 0;
  let threshold = 128;

  for (let t = 0; t < 256; t++) {
    wB += histogram[t];
    if (wB === 0) continue;
    wF = total - wB;
    if (wF === 0) break;

    sumB += t * histogram[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;

    const varBetween = wB * wF * (mB - mF) * (mB - mF);
    if (varBetween > varMax) {
      varMax = varBetween;
      threshold = t;
    }
  }

  for (let i = 0; i < total; i++) {
    binarized[i] = grayBuffer[i] >= threshold ? 255 : 0;
  }

  return binarized;
}

/* ────────────────── direct image uploads (JPG / PNG / WEBP) ────────────────── */

/**
 * Tesseract is trained on roughly 300dpi print. A phone photo of a typed
 * prescription often arrives well below that, and the engine starts
 * substituting visually similar words — reading "Amoxicillin 500 mg Capsule" as
 * "Amescitin Cepsutel". Upscaling, correcting orientation and flattening to
 * grayscale fixes most of it at the source.
 *
 * PDF page rasters already get {@link stretchToGray8} on the way out of the
 * file; this is the equivalent for an image the user uploaded directly.
 */

/** Below this long edge, small print loses the detail OCR needs. */
const TARGET_LONG_EDGE = 1800;
/** Never enlarge past this — memory cost without accuracy gain. */
const MAX_LONG_EDGE = 3200;
/**
 * A luminance spread this wide is already legible. Re-stretching it is the
 * "over-processing" that crushes faint strokes, so we leave it alone.
 */
const ALREADY_CLEAR_RANGE = 200;

/** Formats we can decode and prepare. Anything else is passed through untouched. */
const PREPROCESSABLE = /^image\/(jpeg|jpg|png|webp|tiff|gif|avif)$/i;

export function canPreprocessImage(mimeType: string): boolean {
  return PREPROCESSABLE.test(mimeType ?? "");
}

/**
 * Prepare an uploaded image for OCR.
 *
 * Returns a PNG buffer, or null when the image cannot be decoded — the caller
 * then hands the original bytes to Tesseract rather than failing the scan.
 */
export async function preprocessImageForOcr(
  buffer: Buffer,
  mimeType = "",
): Promise<{ data: Buffer; notes: string[] } | null> {
  if (!buffer?.length) return null;
  if (mimeType && !canPreprocessImage(mimeType)) return null;

  try {
    // Imported lazily so a scan of a digital PDF never pays for libvips.
    const { default: sharp } = await import("sharp");
    const notes: string[] = [];

    // `failOn: "none"` keeps a slightly-truncated phone upload usable.
    const source = sharp(buffer, { failOn: "none" });
    const metadata = await source.metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    if (!width || !height) return null;

    // .rotate() with no argument applies the EXIF orientation tag, which is how
    // phone cameras record a sideways photo.
    let pipeline = sharp(buffer, { failOn: "none" }).rotate().grayscale();

    const longEdge = Math.max(width, height);
    if (longEdge < TARGET_LONG_EDGE) {
      const scale = Math.min(TARGET_LONG_EDGE / longEdge, MAX_LONG_EDGE / longEdge);
      pipeline = pipeline.resize({
        width: Math.round(width * scale),
        height: Math.round(height * scale),
        kernel: "lanczos3",
        fit: "fill",
      });
      notes.push("upscaled");
    } else if (longEdge > MAX_LONG_EDGE) {
      pipeline = pipeline.resize({ width: undefined, height: undefined, withoutEnlargement: true }).resize({
        width: width >= height ? MAX_LONG_EDGE : undefined,
        height: height > width ? MAX_LONG_EDGE : undefined,
        fit: "inside",
      });
      notes.push("downscaled");
    }

    // Only stretch contrast when the image actually needs it.
    const stats = await sharp(buffer, { failOn: "none" }).grayscale().stats();
    const channel = stats.channels[0];
    const range = channel ? channel.max - channel.min : 255;
    if (range < ALREADY_CLEAR_RANGE) {
      pipeline = pipeline.normalise();
      notes.push("contrast-normalised");
    }

    const data = await pipeline.png({ compressionLevel: 6 }).toBuffer();
    return { data, notes };
  } catch (err) {
    console.warn(
      "[medicine/scan] Image preprocessing failed, using the original upload:",
      err instanceof Error ? err.message : String(err),
    );
    return null;
  }
}
