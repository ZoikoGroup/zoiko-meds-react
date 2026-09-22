import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// India-specific routing: zoikomeds.com/in/<anything>
//
// How country is detected:
//   Cloudflare sits in front of this app and adds a `CF-IPCountry` header to
//   every request, set at the edge before it ever reaches this server. No
//   third-party geo-IP service, no extra cost, nothing to configure on
//   Cloudflare's side -- it's on by default for every plan, including free.
//
// What this does (URL routing only -- no content differs yet; that's the
// next phase, once the dev team has real India-specific data to show):
//   1. Visitor from India on a normal path (e.g. /pricing)
//        -> redirected to /in/pricing (the URL bar changes)
//   2. Visitor from India on an /in/ path (e.g. /in/pricing, following #1,
//      or a direct link/bookmark)
//        -> served the *same* page component as /pricing, via an internal
//           rewrite (URL bar stays as /in/pricing). The page receives an
//           `x-zoiko-region: IN` request header if it ever wants to change
//           behavior -- nothing reads this yet.
//   3. Visitor from anywhere else trying to reach an /in/ path directly
//      (an Indian visitor's link shared to someone abroad, an old bookmark
//      from a trip, a search result, etc.)
//        -> redirected to the equivalent global path, /in/ stripped
//   4. Visitor from anywhere else on a normal path
//        -> untouched
//
// Deliberately excluded (see matcher below), because rewriting/redirecting
// these breaks real functionality rather than just changing a URL:
//   - /internal/*  -- server-side API routes this app calls from its own
//     client-side fetches (search, scan, claim, etc.); the client expects
//     the exact path it requested, not a redirect.
//   - /api/*       -- same reasoning, for this app's own route handlers
//     (contact form, briefing requests).
//   - Next.js internals, static assets, and well-known files.
//
// Fail-safe by construction: if CF-IPCountry is ever missing (local dev,
// a direct request that bypasses Cloudflare, a future infra change), the
// country resolves to "" and every branch below falls through to "treat as
// not India" -- the site behaves exactly as it does today. Nothing here can
// make the site *more* broken than not having this file at all.
// ---------------------------------------------------------------------------

const IN_PREFIX = "/in";

export function proxy(request: NextRequest) {
  const country = request.headers.get("cf-ipcountry") ?? "";
  const { pathname } = request.nextUrl;

  const isIndiaPath = pathname === IN_PREFIX || pathname.startsWith(`${IN_PREFIX}/`);

  if (isIndiaPath) {
    const globalPath = pathname.slice(IN_PREFIX.length) || "/";

    if (country !== "IN") {
      // Case 3: non-Indian visitor reached an /in/ URL directly.
      const url = request.nextUrl.clone();
      url.pathname = globalPath;
      return NextResponse.redirect(url);
    }

    // Case 2: Indian visitor on an /in/ URL -- serve the real page, tag the
    // region for later use, keep the /in/ URL visible in the browser.
    const url = request.nextUrl.clone();
    url.pathname = globalPath;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-zoiko-region", "IN");
    return response;
  }

  if (country === "IN") {
    // Case 1: Indian visitor on a normal URL -- send them into /in/.
    const url = request.nextUrl.clone();
    url.pathname = `${IN_PREFIX}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Case 4: everyone else, on a normal URL.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api(?:/|$)|internal(?:/|$)).*)",
  ],
};
