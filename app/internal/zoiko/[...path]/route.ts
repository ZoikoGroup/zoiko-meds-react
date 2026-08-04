import { NextRequest } from "next/server";
import { API_BASE_URL } from "@/lib/config";

/**
 * Same-origin proxy to the ZoikoMeds backend.
 *
 * The backend's CORS only allowlists the production origin, so browser calls
 * from other origins (local dev, previews) are blocked. Routing them through
 * this server-side handler avoids CORS entirely and works everywhere.
 *
 *   browser → /api/zoiko/<path>  →  ${API_BASE_URL}/<path>
 */

export const dynamic = "force-dynamic";

async function forward(req: NextRequest, path: string[]): Promise<Response> {
  const target = new URL(`${API_BASE_URL}/${path.join("/")}`);
  new URL(req.url).searchParams.forEach((value, key) => target.searchParams.set(key, value));

  const headers: Record<string, string> = { Accept: "application/json" };
  const auth = req.headers.get("authorization");
  if (auth) headers.Authorization = auth;
  const contentType = req.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  // Carry the caller's identity through. The backend runs with Express
  // `trust proxy` on, so without this every visitor arrives as this server's
  // single IP — they would share the per-IP rate limits on login and
  // forgot-password, and audit rows would all record the proxy instead of the
  // user. Take the client from Cloudflare's header, else the first (original)
  // entry of the inbound forwarded chain.
  const clientIp =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  if (clientIp) headers["X-Forwarded-For"] = clientIp;
  const userAgent = req.headers.get("user-agent");
  if (userAgent) headers["User-Agent"] = userAgent;

  const hasBody = !["GET", "HEAD"].includes(req.method);

  let upstream: Response;
  try {
    upstream = await fetch(target, {
      method: req.method,
      headers,
      body: hasBody ? await req.text() : undefined,
      cache: "no-store",
    });
  } catch {
    return Response.json(
      { message: "Upstream request failed. Please try again." },
      { status: 502 },
    );
  }

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" },
  });
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function POST(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function PATCH(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function PUT(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
export async function DELETE(req: NextRequest, ctx: Ctx) {
  return forward(req, (await ctx.params).path);
}
