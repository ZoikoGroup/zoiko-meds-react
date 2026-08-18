/**
 * Image preprocessing helper for raw bitmap buffers.
 * Converts raw bytes (RGB / Grayscale) to 8-bit grayscale with contrast stretching.
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
