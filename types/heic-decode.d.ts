declare module "heic-decode" {
  export interface HeicDecodeOptions {
    buffer: Buffer;
  }
  export interface HeicDecodeResult {
    width: number;
    height: number;
    data: ArrayBuffer | Uint8Array;
  }
  export default function decode(options: HeicDecodeOptions): Promise<HeicDecodeResult>;
}
