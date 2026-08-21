/**
 * PDF text-layer extraction — dependency-free, Node runtime only.
 *
 * Text-based PDFs (anything produced by a word processor, a "text to PDF"
 * converter, a hospital EMR export) carry their words in the page content
 * stream. Those streams are almost always Flate-compressed, and modern
 * generators subset the font and address glyphs by ID (`/Encoding /Identity-H`)
 * rather than by character code — so the words are only recoverable by
 * inflating the stream and mapping glyph IDs back through the font's
 * `/ToUnicode` CMap. A regex over the raw file bytes recovers nothing.
 *
 * Scanned prescriptions (a photo wrapped in a PDF) have no text layer at all.
 * Those come back with `needsOcr: true` so the caller can fall back to OCR.
 */
import zlib from "node:zlib";
import { stretchToGray8 } from "./scan/preprocess";

/** Result of parsing an upload's text layer. */
export interface PdfTextResult {
  /** Text recovered from the page content streams (empty when there is none). */
  text: string;
  /** True when the file parsed as a PDF but carried no extractable text — i.e. a scanned/image PDF. */
  needsOcr: boolean;
}

/* Guard rails so a hostile or corrupt file can't spin the event loop. */
const MAX_OBJECTS = 5000;
const MAX_TEXT_CHARS = 2_000_000;

export function looksLikePdf(buffer: Buffer): boolean {
  // The header is allowed a small amount of leading junk in the wild.
  return buffer.subarray(0, 1024).toString("latin1").includes("%PDF-");
}

/* ────────────────────────── object parsing ────────────────────────── */

interface PdfObject {
  num: number;
  /** The object's dictionary source (or its whole body for non-stream objects). */
  dict: string;
  /** Raw, still-encoded stream bytes, or null for non-stream objects. */
  stream: Buffer | null;
}

/** `/Key 123` where 123 is a direct integer (not the first half of `12 0 R`). */
function directInt(dict: string, key: string): number | null {
  const m = new RegExp(`/${key}\\s+(\\d+)(?!\\s+\\d+\\s+R)`).exec(dict);
  return m ? Number(m[1]) : null;
}

/** `/Key 12 0 R` → 12. */
function refInt(dict: string, key: string): number | null {
  const m = new RegExp(`/${key}\\s+(\\d+)\\s+\\d+\\s+R`).exec(dict);
  return m ? Number(m[1]) : null;
}

/** `/Key /Name` or `/Key [ /A /B ]` → ["Name"] / ["A", "B"]. */
function namesOf(dict: string, key: string): string[] {
  const m = new RegExp(`/${key}\\s*(\\[[^\\]]*\\]|/[A-Za-z0-9#]+)`).exec(dict);
  if (!m) return [];
  return Array.from(m[1].matchAll(/\/([A-Za-z0-9#]+)/g), (x) => x[1]);
}

/** Slice a `<< … >>` dictionary starting at `start`, respecting nesting and strings. */
function balancedDict(s: string, start: number): string {
  let depth = 0;
  let i = start;
  while (i < s.length) {
    if (s[i] === "<" && s[i + 1] === "<") {
      depth++;
      i += 2;
      continue;
    }
    if (s[i] === ">" && s[i + 1] === ">") {
      depth--;
      i += 2;
      if (depth <= 0) return s.slice(start, i);
      continue;
    }
    if (s[i] === "(") {
      i = readLiteralString(s, i).next;
      continue;
    }
    i++;
  }
  return s.slice(start);
}

/** Resolve `/Key << … >>` (inline) or `/Key N 0 R` (indirect) to its dictionary source. */
function subDict(dict: string, key: string, objects: Map<number, PdfObject>): string | null {
  const ref = refInt(dict, key);
  if (ref != null) return objects.get(ref)?.dict ?? null;
  const m = new RegExp(`/${key}\\s*<<`).exec(dict);
  if (!m) return null;
  return balancedDict(dict, m.index + m[0].length - 2);
}

function parseObjects(raw: string): Map<number, PdfObject> {
  const objects = new Map<number, PdfObject>();
  const header = /(\d+)\s+(\d+)\s+obj\b/g;
  let m: RegExpExecArray | null;

  while ((m = header.exec(raw)) && objects.size < MAX_OBJECTS) {
    const num = Number(m[1]);
    const bodyStart = m.index + m[0].length;
    const streamIdx = raw.indexOf("stream", bodyStart);
    const endObjIdx = raw.indexOf("endobj", bodyStart);

    if (streamIdx === -1 || (endObjIdx !== -1 && endObjIdx < streamIdx)) {
      const end = endObjIdx === -1 ? raw.length : endObjIdx;
      objects.set(num, { num, dict: raw.slice(bodyStart, end), stream: null });
      continue;
    }

    const dict = raw.slice(bodyStart, streamIdx);

    // Stream data begins after the EOL that follows the `stream` keyword.
    let dataStart = streamIdx + "stream".length;
    if (raw[dataStart] === "\r") dataStart++;
    if (raw[dataStart] === "\n") dataStart++;

    // Prefer the declared /Length; fall back to scanning for `endstream`
    // (needed when /Length is an indirect reference or simply wrong).
    let dataEnd = -1;
    const declared = directInt(dict, "Length");
    if (declared != null && dataStart + declared <= raw.length) {
      if (/^\s*endstream/.test(raw.slice(dataStart + declared, dataStart + declared + 24))) {
        dataEnd = dataStart + declared;
      }
    }
    if (dataEnd === -1) {
      dataEnd = raw.indexOf("endstream", dataStart);
      if (dataEnd === -1) continue;
      while (dataEnd > dataStart && (raw[dataEnd - 1] === "\n" || raw[dataEnd - 1] === "\r")) dataEnd--;
    }

    objects.set(num, { num, dict, stream: Buffer.from(raw.slice(dataStart, dataEnd), "latin1") });
    // Skip past the binary payload so its bytes can't be mistaken for `N 0 obj`.
    header.lastIndex = Math.max(header.lastIndex, dataEnd);
  }

  return objects;
}

/* ────────────────────────── stream filters ────────────────────────── */

function inflate(data: Buffer): Buffer | null {
  // Some writers leave stray whitespace before the zlib header.
  let start = 0;
  while (start < data.length && (data[start] === 0x0a || data[start] === 0x0d || data[start] === 0x20)) start++;
  const body = start ? data.subarray(start) : data;
  const opts = { finishFlush: zlib.constants.Z_SYNC_FLUSH };
  for (const attempt of [
    () => zlib.inflateSync(body),
    () => zlib.inflateSync(body, opts),
    () => zlib.inflateRawSync(body, opts),
  ]) {
    try {
      const out = attempt();
      if (out.length) return out;
    } catch {
      /* try the next strategy */
    }
  }
  return null;
}

function asciiHexDecode(data: Buffer): Buffer {
  const hex = data.toString("latin1").split(">")[0].replace(/[^0-9A-Fa-f]/g, "");
  return Buffer.from(hex.length % 2 ? hex + "0" : hex, "hex");
}

function ascii85Decode(data: Buffer): Buffer {
  const text = data.toString("latin1").replace(/^<~/, "").split("~>")[0].replace(/\s/g, "");
  const out: number[] = [];
  let group: number[] = [];
  for (const ch of text) {
    if (ch === "z" && group.length === 0) {
      out.push(0, 0, 0, 0);
      continue;
    }
    group.push(ch.charCodeAt(0) - 33);
    if (group.length === 5) {
      let n = 0;
      for (const g of group) n = n * 85 + g;
      out.push((n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff);
      group = [];
    }
  }
  if (group.length > 1) {
    const pad = 5 - group.length;
    for (let i = 0; i < pad; i++) group.push(84);
    let n = 0;
    for (const g of group) n = n * 85 + g;
    const bytes = [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff];
    out.push(...bytes.slice(0, 4 - pad));
  }
  return Buffer.from(out);
}

function runLengthDecode(data: Buffer): Buffer {
  const out: number[] = [];
  let i = 0;
  while (i < data.length) {
    const len = data[i++];
    if (len === 128) break;
    if (len < 128) {
      for (let j = 0; j <= len && i < data.length; j++) out.push(data[i++]);
    } else {
      const b = data[i++];
      for (let j = 0; j < 257 - len; j++) out.push(b);
    }
  }
  return Buffer.from(out);
}

function lzwDecode(data: Buffer, earlyChange = 1): Buffer | null {
  const out: number[] = [];
  let dict: number[][] = [];
  const reset = () => {
    dict = [];
    for (let i = 0; i < 256; i++) dict.push([i]);
    dict.push([], []); // 256 = clear, 257 = EOD
  };
  reset();

  let codeLen = 9;
  let prev: number[] | null = null;
  let buf = 0;
  let bits = 0;

  for (const byte of data) {
    buf = ((buf << 8) | byte) >>> 0;
    bits += 8;
    while (bits >= codeLen) {
      const code = (buf >>> (bits - codeLen)) & ((1 << codeLen) - 1);
      bits -= codeLen;
      if (code === 256) {
        reset();
        codeLen = 9;
        prev = null;
        continue;
      }
      if (code === 257) return Buffer.from(out);
      let entry: number[];
      if (code < dict.length) entry = dict[code];
      else if (prev) entry = prev.concat(prev[0]);
      else return null;
      out.push(...entry);
      if (prev) dict.push(prev.concat(entry[0]));
      prev = entry;
      if (dict.length + earlyChange >= 1 << codeLen && codeLen < 12) codeLen++;
    }
  }
  return Buffer.from(out);
}

/** Undo PNG row predictors (used by cross-reference and object streams). */
function pngPredictor(data: Buffer, columns: number, colors: number, bpc: number): Buffer {
  const bpp = Math.max(1, Math.ceil((colors * bpc) / 8));
  const rowLen = Math.ceil((columns * colors * bpc) / 8);
  if (rowLen <= 0) return data;
  const rows: Buffer[] = [];
  let prev = Buffer.alloc(rowLen);
  let i = 0;
  while (i + 1 + rowLen <= data.length) {
    const filterType = data[i];
    const row = Buffer.from(data.subarray(i + 1, i + 1 + rowLen));
    i += 1 + rowLen;
    for (let j = 0; j < rowLen; j++) {
      const a = j >= bpp ? row[j - bpp] : 0;
      const b = prev[j];
      const c = j >= bpp ? prev[j - bpp] : 0;
      if (filterType === 1) row[j] = (row[j] + a) & 0xff;
      else if (filterType === 2) row[j] = (row[j] + b) & 0xff;
      else if (filterType === 3) row[j] = (row[j] + ((a + b) >> 1)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        row[j] = (row[j] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
    }
    rows.push(row);
    prev = row;
  }
  return rows.length ? Buffer.concat(rows) : data;
}

/** Decode a stream's bytes. Returns null for image codecs and unrecoverable data. */
function decodeStream(obj: PdfObject): Buffer | null {
  if (!obj.stream || !obj.stream.length) return null;
  let data = obj.stream;

  for (const filter of namesOf(obj.dict, "Filter")) {
    switch (filter) {
      case "FlateDecode":
      case "Fl": {
        const out = inflate(data);
        if (!out) return null;
        data = out;
        break;
      }
      case "LZWDecode":
      case "LZW": {
        const out = lzwDecode(data, directInt(obj.dict, "EarlyChange") ?? 1);
        if (!out) return null;
        data = out;
        break;
      }
      case "ASCIIHexDecode":
      case "AHx":
        data = asciiHexDecode(data);
        break;
      case "ASCII85Decode":
      case "A85":
        data = ascii85Decode(data);
        break;
      case "RunLengthDecode":
      case "RL":
        data = runLengthDecode(data);
        break;
      default:
        // DCTDecode / JPXDecode / CCITTFaxDecode / JBIG2Decode — image data, no text.
        return null;
    }
  }

  const predictor = directInt(obj.dict, "Predictor");
  if (predictor != null && predictor >= 10) {
    data = pngPredictor(
      data,
      directInt(obj.dict, "Columns") ?? 1,
      directInt(obj.dict, "Colors") ?? 1,
      directInt(obj.dict, "BitsPerComponent") ?? 8,
    );
  }
  return data;
}

/**
 * PDF 1.5+ can pack page and font dictionaries inside compressed object
 * streams, where the top-level `N 0 obj` scan can't see them. Unpack those so
 * font and page lookups still resolve.
 */
function expandObjectStreams(objects: Map<number, PdfObject>): void {
  for (const obj of Array.from(objects.values())) {
    if (!/\/Type\s*\/ObjStm\b/.test(obj.dict)) continue;
    const data = decodeStream(obj);
    if (!data) continue;
    const count = directInt(obj.dict, "N");
    const first = directInt(obj.dict, "First");
    if (count == null || first == null) continue;

    const text = data.toString("latin1");
    const offsets = text.slice(0, first).trim().split(/\s+/).map(Number);
    for (let i = 0; i < count && objects.size < MAX_OBJECTS; i++) {
      const num = offsets[2 * i];
      const off = offsets[2 * i + 1];
      if (!Number.isFinite(num) || !Number.isFinite(off) || objects.has(num)) continue;
      const start = first + off;
      const end = i + 1 < count && Number.isFinite(offsets[2 * i + 3]) ? first + offsets[2 * i + 3] : text.length;
      objects.set(num, { num, dict: text.slice(start, Math.max(start, end)), stream: null });
    }
  }
}

/* ────────────────────────── fonts & CMaps ────────────────────────── */

interface FontInfo {
  /** Character/glyph code → Unicode, from the font's /ToUnicode CMap. */
  toUnicode?: Map<number, string>;
  /** 1 for simple fonts, 2 for Identity-H / CID fonts. */
  codeBytes: number;
}

function hexToUnits(hex: string): number[] {
  const units: number[] = [];
  for (let i = 0; i + 3 < hex.length + 1 && i < hex.length; i += 4) {
    units.push(parseInt(hex.slice(i, i + 4).padEnd(4, "0"), 16));
  }
  return units;
}

function unitsToString(units: number[]): string {
  return units.map((u) => String.fromCharCode(u)).join("");
}

/** Parse a `/ToUnicode` CMap: codespace width, `bfchar` pairs and `bfrange` runs. */
function parseCMap(text: string): { map: Map<number, string>; codeBytes: number } {
  const map = new Map<number, string>();
  let codeBytes = 1;

  const csr = /begincodespacerange([\s\S]*?)endcodespacerange/g;
  let block: RegExpExecArray | null;
  while ((block = csr.exec(text))) {
    const first = /<([0-9A-Fa-f]+)>/.exec(block[1]);
    if (first) codeBytes = Math.max(codeBytes, Math.min(2, Math.ceil(first[1].length / 2)));
  }

  const bfchar = /beginbfchar([\s\S]*?)endbfchar/g;
  while ((block = bfchar.exec(text))) {
    const pair = /<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]*)>/g;
    let p: RegExpExecArray | null;
    while ((p = pair.exec(block[1]))) {
      map.set(parseInt(p[1], 16), unitsToString(hexToUnits(p[2])));
    }
  }

  const bfrange = /beginbfrange([\s\S]*?)endbfrange/g;
  while ((block = bfrange.exec(text))) {
    const entry = /<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*(?:<([0-9A-Fa-f]*)>|\[([\s\S]*?)\])/g;
    let e: RegExpExecArray | null;
    while ((e = entry.exec(block[1]))) {
      const lo = parseInt(e[1], 16);
      const hi = parseInt(e[2], 16);
      if (!Number.isFinite(lo) || !Number.isFinite(hi) || hi < lo || hi - lo > 65535) continue;
      if (e[3] !== undefined) {
        const base = hexToUnits(e[3]);
        for (let code = lo; code <= hi; code++) {
          const units = base.slice();
          if (units.length) units[units.length - 1] += code - lo;
          map.set(code, unitsToString(units));
        }
      } else if (e[4] !== undefined) {
        const items = e[4].match(/<([0-9A-Fa-f]*)>/g) ?? [];
        items.forEach((item, i) => map.set(lo + i, unitsToString(hexToUnits(item.slice(1, -1)))));
      }
    }
  }

  return { map, codeBytes };
}

function readFont(fontDict: string, objects: Map<number, PdfObject>): FontInfo {
  let codeBytes =
    /\/Encoding\s*\/Identity-[HV]\b/.test(fontDict) || /\/Subtype\s*\/Type0\b/.test(fontDict) ? 2 : 1;

  let toUnicode: Map<number, string> | undefined;
  const ref = refInt(fontDict, "ToUnicode");
  if (ref != null) {
    const obj = objects.get(ref);
    const data = obj ? decodeStream(obj) : null;
    if (data) {
      const parsed = parseCMap(data.toString("latin1"));
      if (parsed.map.size) {
        toUnicode = parsed.map;
        codeBytes = Math.max(codeBytes, parsed.codeBytes);
      }
    }
  }
  return { toUnicode, codeBytes };
}

/** Build `/F4 → FontInfo` for one resource dictionary. */
function buildFontMap(resources: string | null, objects: Map<number, PdfObject>): Map<string, FontInfo> {
  const fonts = new Map<string, FontInfo>();
  if (!resources) return fonts;
  const fontDict = subDict(resources, "Font", objects);
  if (!fontDict) return fonts;
  for (const m of fontDict.matchAll(/\/([A-Za-z0-9#.+-]+)\s+(\d+)\s+\d+\s+R/g)) {
    const obj = objects.get(Number(m[2]));
    if (obj) fonts.set(m[1], readFont(obj.dict, objects));
  }
  return fonts;
}

/* ────────────────────────── content stream scanning ────────────────────────── */

type Operand =
  | { t: "str"; v: Buffer }
  | { t: "num"; v: number }
  | { t: "name"; v: string }
  | { t: "arr"; v: Operand[] };

const WS = new Set([" ", "\n", "\r", "\t", "\f", "\0"]);
const DELIM = new Set(["(", ")", "<", ">", "[", "]", "{", "}", "/", "%"]);

function readLiteralString(s: string, start: number): { value: Buffer; next: number } {
  const bytes: number[] = [];
  let depth = 1;
  let i = start + 1;
  while (i < s.length) {
    const ch = s[i];
    if (ch === "\\") {
      const esc = s[i + 1];
      i += 2;
      if (esc === undefined) break;
      if (esc >= "0" && esc <= "7") {
        let oct = esc;
        while (oct.length < 3 && s[i] >= "0" && s[i] <= "7") oct += s[i++];
        bytes.push(parseInt(oct, 8) & 0xff);
      } else if (esc === "n") bytes.push(10);
      else if (esc === "r") bytes.push(13);
      else if (esc === "t") bytes.push(9);
      else if (esc === "b") bytes.push(8);
      else if (esc === "f") bytes.push(12);
      else if (esc === "\n") {
        /* line continuation */
      } else if (esc === "\r") {
        if (s[i] === "\n") i++;
      } else bytes.push(esc.charCodeAt(0) & 0xff);
      continue;
    }
    if (ch === "(") {
      depth++;
      bytes.push(40);
      i++;
      continue;
    }
    if (ch === ")") {
      depth--;
      i++;
      if (depth === 0) break;
      bytes.push(41);
      continue;
    }
    bytes.push(s.charCodeAt(i) & 0xff);
    i++;
  }
  return { value: Buffer.from(bytes), next: i };
}

function readHexString(s: string, start: number): { value: Buffer; next: number } {
  let i = start + 1;
  let hex = "";
  while (i < s.length && s[i] !== ">") {
    if (/[0-9A-Fa-f]/.test(s[i])) hex += s[i];
    i++;
  }
  if (hex.length % 2) hex += "0";
  return { value: Buffer.from(hex, "hex"), next: i + 1 };
}

/** WinAnsi (CP1252) differences from Latin-1, for simple fonts with no /ToUnicode. */
const WIN_ANSI_HIGH: Record<number, string> = {
  0x80: "€", 0x82: "‚", 0x83: "ƒ", 0x84: "„", 0x85: "…",
  0x86: "†", 0x87: "‡", 0x88: "ˆ", 0x89: "‰", 0x8a: "Š",
  0x8b: "‹", 0x8c: "Œ", 0x8e: "Ž", 0x91: "‘", 0x92: "’",
  0x93: "“", 0x94: "”", 0x95: "•", 0x96: "–", 0x97: "—",
  0x98: "˜", 0x99: "™", 0x9a: "š", 0x9b: "›", 0x9c: "œ",
  0x9e: "ž", 0x9f: "Ÿ",
};

function decodeShownString(bytes: Buffer, font: FontInfo | undefined): string {
  const codeBytes = font?.codeBytes ?? 1;
  const map = font?.toUnicode;

  if (codeBytes === 2) {
    // Identity-H: the bytes are glyph IDs and are meaningless without a CMap.
    if (!map) return "";
    let out = "";
    for (let i = 0; i + 1 < bytes.length; i += 2) {
      out += map.get((bytes[i] << 8) | bytes[i + 1]) ?? "";
    }
    return out;
  }

  let out = "";
  for (const b of bytes) {
    const mapped = map?.get(b);
    out += mapped !== undefined ? mapped : WIN_ANSI_HIGH[b] ?? String.fromCharCode(b);
  }
  return out;
}

/**
 * Walk a content stream and pull out everything the text operators show.
 *
 * Line breaks are inferred from three signals, because generators disagree on
 * which they use: a change of text-matrix Y, an explicit `Td`/`TD`/`T*`/`ET`,
 * and a source newline between two show operators.
 */
function extractTextFromContent(content: string, fonts: Map<string, FontInfo>): string {
  let out = "";
  let font: FontInfo | undefined;
  let lastY: number | null = null;
  let sawNewlineSinceShow = false;
  let operands: Operand[] = [];
  let i = 0;

  const pushBreak = () => {
    if (out && !out.endsWith("\n")) out += "\n";
  };
  const show = (text: string) => {
    if (sawNewlineSinceShow) pushBreak();
    sawNewlineSinceShow = false;
    out += text;
  };

  const readArray = (start: number): { value: Operand[]; next: number } => {
    const items: Operand[] = [];
    let j = start + 1;
    while (j < content.length && content[j] !== "]") {
      const ch = content[j];
      if (WS.has(ch)) {
        j++;
      } else if (ch === "(") {
        const r = readLiteralString(content, j);
        items.push({ t: "str", v: r.value });
        j = r.next;
      } else if (ch === "<") {
        const r = readHexString(content, j);
        items.push({ t: "str", v: r.value });
        j = r.next;
      } else if (/[-+.\d]/.test(ch)) {
        let k = j;
        while (k < content.length && /[-+.\deE]/.test(content[k])) k++;
        items.push({ t: "num", v: Number.parseFloat(content.slice(j, k)) || 0 });
        j = k;
      } else {
        j++;
      }
    }
    return { value: items, next: j + 1 };
  };

  while (i < content.length && out.length < MAX_TEXT_CHARS) {
    const ch = content[i];

    if (WS.has(ch)) {
      if (ch === "\n" || ch === "\r") sawNewlineSinceShow = true;
      i++;
      continue;
    }
    if (ch === "%") {
      while (i < content.length && content[i] !== "\n" && content[i] !== "\r") i++;
      continue;
    }
    if (ch === "(") {
      const r = readLiteralString(content, i);
      operands.push({ t: "str", v: r.value });
      i = r.next;
      continue;
    }
    if (ch === "<") {
      if (content[i + 1] === "<") {
        // Inline dictionary operand (BDC/DP marked content) — skip it wholesale.
        i += balancedDict(content, i).length;
        continue;
      }
      const r = readHexString(content, i);
      operands.push({ t: "str", v: r.value });
      i = r.next;
      continue;
    }
    if (ch === "[") {
      const r = readArray(i);
      operands.push({ t: "arr", v: r.value });
      i = r.next;
      continue;
    }
    if (ch === "]" || ch === "{" || ch === "}" || ch === ")" || ch === ">") {
      i++;
      continue;
    }
    if (ch === "/") {
      let j = i + 1;
      while (j < content.length && !WS.has(content[j]) && !DELIM.has(content[j])) j++;
      operands.push({ t: "name", v: content.slice(i + 1, j) });
      i = j;
      continue;
    }
    if (/[-+.\d]/.test(ch)) {
      let j = i;
      while (j < content.length && /[-+.\deE]/.test(content[j])) j++;
      operands.push({ t: "num", v: Number.parseFloat(content.slice(i, j)) || 0 });
      i = j;
      continue;
    }

    // Operator token.
    let j = i;
    while (j < content.length && !WS.has(content[j]) && !DELIM.has(content[j])) j++;
    if (j === i) j = i + 1;
    const op = content.slice(i, j);
    i = j;

    switch (op) {
      case "Tf": {
        const name = operands.find((o) => o.t === "name");
        if (name && name.t === "name") font = fonts.get(name.v);
        break;
      }
      case "Tj": {
        const s = [...operands].reverse().find((o) => o.t === "str");
        if (s && s.t === "str") show(decodeShownString(s.v, font));
        break;
      }
      case "'":
      case '"': {
        pushBreak();
        sawNewlineSinceShow = false;
        const s = [...operands].reverse().find((o) => o.t === "str");
        if (s && s.t === "str") show(decodeShownString(s.v, font));
        break;
      }
      case "TJ": {
        const arr = [...operands].reverse().find((o) => o.t === "arr");
        if (arr && arr.t === "arr") {
          let text = "";
          for (const item of arr.v) {
            if (item.t === "str") text += decodeShownString(item.v, font);
            // A large negative kern is inter-word spacing, not letter spacing.
            else if (item.t === "num" && item.v < -150 && text && !text.endsWith(" ")) text += " ";
          }
          if (text) show(text);
        }
        break;
      }
      case "Tm": {
        const nums = operands.filter((o): o is { t: "num"; v: number } => o.t === "num");
        if (nums.length >= 6) {
          const y = nums[5].v;
          if (lastY !== null && Math.abs(y - lastY) > 0.01) pushBreak();
          lastY = y;
        }
        break;
      }
      case "Td":
      case "TD": {
        const nums = operands.filter((o): o is { t: "num"; v: number } => o.t === "num");
        if (nums.length >= 2 && Math.abs(nums[1].v) > 0.01) pushBreak();
        break;
      }
      case "T*":
      case "ET":
        pushBreak();
        break;
      case "BT":
        lastY = null;
        break;
      default:
        break;
    }
    operands = [];
  }

  return out;
}

/* ────────────────────────── normalization ────────────────────────── */

/**
 * Fold the many ways a PDF can spell the same word into one canonical form, so
 * catalog matching doesn't miss on a ligature or a typographic dash.
 */
export function normalizeExtractedText(input: string): string {
  return input
    .normalize("NFKC")
    .replace(/[­​-‍﻿]/g, "") // soft hyphen, zero-width joiners
    .replace(/[‐-―−]/g, "-")
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\r\n?/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* ────────────────────────── entry point ────────────────────────── */

/** Does this decoded stream look like a page content stream rather than data? */
function looksLikeContentStream(text: string): boolean {
  return /\bBT\b/.test(text) && /\b(Tj|TJ)\b/.test(text);
}

/**
 * Extract the text layer of a PDF.
 *
 * Returns `needsOcr: true` when the file is a valid PDF that simply has no
 * text to extract — the signal to hand the file to OCR instead.
 */
export function extractPdfText(buffer: Buffer): PdfTextResult {
  if (!buffer || !buffer.length) return { text: "", needsOcr: false };

  // latin1 round-trips every byte, so the string is a lossless view of the file.
  const raw = buffer.toString("latin1");
  const objects = parseObjects(raw);
  expandObjectStreams(objects);

  const chunks: string[] = [];

  // 1. Walk the pages properly, so each content stream is decoded with the
  //    fonts from its own resource dictionary.
  for (const obj of objects.values()) {
    if (!/\/Type\s*\/Page\b/.test(obj.dict)) continue;

    let resources = subDict(obj.dict, "Resources", objects);
    // /Resources is inheritable — walk up the page tree when the page omits it.
    let parentRef = refInt(obj.dict, "Parent");
    let hops = 0;
    while (!resources && parentRef != null && hops++ < 8) {
      const parent = objects.get(parentRef);
      if (!parent) break;
      resources = subDict(parent.dict, "Resources", objects);
      parentRef = refInt(parent.dict, "Parent");
    }

    const fonts = buildFontMap(resources, objects);
    const contentRefs = /\/Contents\s*\[/.test(obj.dict)
      ? Array.from(
          (/\/Contents\s*\[([^\]]*)\]/.exec(obj.dict)?.[1] ?? "").matchAll(/(\d+)\s+\d+\s+R/g),
          (m) => Number(m[1]),
        )
      : ([refInt(obj.dict, "Contents")].filter((n): n is number => n != null) as number[]);

    for (const ref of contentRefs) {
      const stream = objects.get(ref);
      const data = stream ? decodeStream(stream) : null;
      if (data) chunks.push(extractTextFromContent(data.toString("latin1"), fonts));
    }
  }

  // 2. No page tree we could follow (linearized oddities, form XObjects holding
  //    the text): decode every stream that reads like page content.
  let sawDecodableStream = false;
  if (!chunks.join("").trim()) {
    const globalFonts = new Map<string, FontInfo>();
    for (const obj of objects.values()) {
      if (!/\/Type\s*\/Font\b/.test(obj.dict)) continue;
      for (const [, name] of raw.matchAll(new RegExp(`/([A-Za-z0-9#.+-]+)\\s+${obj.num}\\s+\\d+\\s+R`, "g"))) {
        globalFonts.set(name, readFont(obj.dict, objects));
      }
    }
    for (const obj of objects.values()) {
      const data = decodeStream(obj);
      if (!data) continue;
      sawDecodableStream = true;
      const text = data.toString("latin1");
      if (looksLikeContentStream(text)) chunks.push(extractTextFromContent(text, globalFonts));
    }
  } else {
    sawDecodableStream = true;
  }

  // 3. Neither worked and the file has no usable streams at all — treat the
  //    whole body as a content stream. Covers uncompressed and hand-built PDFs.
  if (!chunks.join("").trim() && !sawDecodableStream && looksLikeContentStream(raw)) {
    chunks.push(extractTextFromContent(raw, new Map()));
  }

  const text = normalizeExtractedText(chunks.join("\n"));
  return { text, needsOcr: text.length === 0 };
}

function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

export function buildPng(width: number, height: number, isRgb: boolean, rawBytes: Buffer): Buffer {
  const bytesPerPixel = isRgb ? 3 : 1;
  const colorType = isRgb ? 2 : 0;

  const rowLen = width * bytesPerPixel;
  const scanlines: Buffer[] = [];
  for (let r = 0; r < height; r++) {
    const row = rawBytes.subarray(r * rowLen, (r + 1) * rowLen);
    scanlines.push(Buffer.concat([Buffer.from([0]), row]));
  }
  const idatPayload = zlib.deflateSync(Buffer.concat(scanlines));

  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = colorType;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const ihdrChunk = Buffer.alloc(4 + 4 + 13 + 4);
  ihdrChunk.writeUInt32BE(13, 0);
  ihdrChunk.write("IHDR", 4, "latin1");
  ihdrData.copy(ihdrChunk, 8);
  const ihdrCrc = crc32(ihdrChunk.subarray(4, 21));
  ihdrChunk.writeUInt32BE(ihdrCrc, 21);

  const idatChunk = Buffer.alloc(4 + 4 + idatPayload.length + 4);
  idatChunk.writeUInt32BE(idatPayload.length, 0);
  idatChunk.write("IDAT", 4, "latin1");
  idatPayload.copy(idatChunk, 8);
  const idatCrc = crc32(idatChunk.subarray(4, 8 + idatPayload.length));
  idatChunk.writeUInt32BE(idatCrc, 8 + idatPayload.length);

  const iendChunk = Buffer.from([0, 0, 0, 0, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

export interface PdfImage {
  page: number;
  data: Buffer;
  mime: string;
}

/**
 * How many pages the document declares.
 *
 * Used to tell the caller when a scan covered only part of a long PDF, so pages
 * are never dropped silently.
 */
export function countPdfPages(buffer: Buffer): number {
  if (!buffer?.length) return 0;
  const objects = parseObjects(buffer.toString("latin1"));
  expandObjectStreams(objects);

  let pages = 0;
  for (const obj of objects.values()) {
    // The word boundary matters: without it the /Pages tree node counts too.
    if (/\/Type\s*\/Page\b/.test(obj.dict)) pages++;
  }
  return pages;
}

export function extractPdfImages(buffer: Buffer, maxPages = 8): PdfImage[] {
  if (!buffer || !buffer.length) return [];
  const raw = buffer.toString("latin1");
  const objects = parseObjects(raw);
  expandObjectStreams(objects);

  const images: PdfImage[] = [];

  for (const obj of objects.values()) {
    if (images.length >= maxPages) break;
    if (!/\/Type\s*\/Page\b/.test(obj.dict)) continue;

    const pageNum = images.length + 1;
    let resources = subDict(obj.dict, "Resources", objects);
    let parentRef = refInt(obj.dict, "Parent");
    let hops = 0;
    while (!resources && parentRef != null && hops++ < 8) {
      const parent = objects.get(parentRef);
      if (!parent) break;
      resources = subDict(parent.dict, "Resources", objects);
      parentRef = refInt(parent.dict, "Parent");
    }

    if (!resources) continue;

    const xobjDict = subDict(resources, "XObject", objects);
    if (!xobjDict) continue;

    for (const [, , refStr] of xobjDict.matchAll(/\/([A-Za-z0-9#-]+)\s+(\d+)\s+\d+\s+R/g)) {
      if (images.length >= maxPages) break;
      const refNum = Number(refStr);
      const imgObj = objects.get(refNum);
      if (!imgObj || !/\/Subtype\s*\/Image\b/.test(imgObj.dict)) continue;

      if (/\/CCITTFaxDecode\b|\bCCITT\b|\bJBIG2Decode\b|\bJPXDecode\b/.test(imgObj.dict)) {
        continue;
      }

      const w = directInt(imgObj.dict, "Width") ?? 0;
      const h = directInt(imgObj.dict, "Height") ?? 0;
      if (w > 0 && h > 0 && (w < 100 || h < 100)) continue;

      const isJpeg = /\/DCTDecode\b|\bDCT\b/.test(imgObj.dict);
      if (isJpeg) {
        if (imgObj.stream && imgObj.stream.length > 100) {
          images.push({ page: pageNum, data: imgObj.stream, mime: "image/jpeg" });
        }
      } else {
        const decoded = decodeStream(imgObj);
        if (decoded && decoded.length > 100 && w > 0 && h > 0) {
          const isRgb = /\/DeviceRGB\b/.test(imgObj.dict);
          const bitDepth = directInt(imgObj.dict, "BitsPerComponent") === 1 ? 1 : 8;
          const prepared = stretchToGray8(decoded, w, h, isRgb ? 3 : 1, bitDepth);
          const pngBuf = prepared
            ? buildPng(w, h, false, prepared)
            : buildPng(w, h, isRgb, decoded);
          images.push({ page: pageNum, data: pngBuf, mime: "image/png" });
        }
      }
    }
  }

  return images;
}
