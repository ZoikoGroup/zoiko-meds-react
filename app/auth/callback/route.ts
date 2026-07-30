import { NextRequest, NextResponse } from "next/server";
import { appUrl } from "@/lib/config";

/**
 * OAuth landing hop.
 *
 * The platform backend finishes Google/Microsoft sign-in by redirecting the
 * browser to `${APP_BASE_URL}/auth/callback?token=<jwt>`. With APP_BASE_URL set
 * to this marketing site the browser arrives here — but the session lives in the
 * authenticated app, so hand the token straight to its own /auth/callback, which
 * adopts it and lands the user on the dashboard.
 *
 * A failed sign-in arrives with `?error=` and no token; those go to the app's
 * login screen with the reason preserved.
 *
 * This is a route handler rather than a page so the browser gets an immediate
 * 307 instead of a rendered page that redirects a second later via meta refresh.
 */

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const target = token
    ? appUrl(`/auth/callback?token=${encodeURIComponent(token)}`)
    : appUrl(`/login?error=${encodeURIComponent(error || "oauth")}`);

  return NextResponse.redirect(target, 307);
}
