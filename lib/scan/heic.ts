import convert from "heic-decode";
import { buildPng } from "@/lib/pdf-text";
import { stretchToGray8 } from "./preprocess";

/**
 * Check if the upload buffer or mime type represents an Apple HEIC/HEIF image.
 */
export function isHeicUpload(buffer: Buffer, mimeType: string): boolean {
  if (mimeType === "image/heic" || mimeType === "image/heif") return true;
  if (!buffer || buffer.length < 12) return false;
  // Check ftyp box signature in header bytes 4..11
  const brand = buffer.subarray(8, 12).toString("latin1");
  return brand === "heic" || brand === "heix" || brand === "hevc" || brand === "mif1";
}

/**
 * Drop the alpha channel.
 *
 * heic-decode hands back 4-byte RGBA, while buildPng slices scanlines at 3
 * bytes per pixel for a truecolour PNG. Passing RGBA straight through shears
 * the image into unreadable diagonal noise, so it is converted here first.
 */
function rgbaToRgb(rgba: Buffer, width: number, height: number): Buffer | null {
  const pixels = width * height;
  if (rgba.length < pixels * 4) return null;

  const rgb = Buffer.alloc(pixels * 3);
  for (let i = 0; i < pixels; i++) {
    rgb[i * 3] = rgba[i * 4];
    rgb[i * 3 + 1] = rgba[i * 4 + 1];
    rgb[i * 3 + 2] = rgba[i * 4 + 2];
  }
  return rgb;
}

/**
 * Decode a HEIC/HEIF buffer to a PNG that OCR can read.
 * Returns null when the image cannot be decoded.
 */
export async function convertHeicToPng(buffer: Buffer): Promise<Buffer | null> {
  if (!buffer || buffer.length === 0) return null;
  try {
    const { width, height, data } = await convert({ buffer });
    if (!width || !height) return null;

    const rawRgba = Buffer.from(data as Uint8Array);

    // Preferred: grayscale with contrast stretched, the same preparation a PDF
    // page raster gets before OCR.
    const gray = stretchToGray8(rawRgba, width, height, 4, 8);
    if (gray) return buildPng(width, height, false, gray);

    // Fallback: keep the colour image, minus the alpha channel buildPng cannot
    // represent.
    const rgb = rgbaToRgb(rawRgba, width, height);
    if (rgb) return buildPng(width, height, true, rgb);

    return null;
  } catch (err) {
    console.warn(
      "[medicine/scan] HEIC image conversion failed:",
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}
