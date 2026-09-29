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
// What this does:
//   0. An /in/ path that has its own India page under app/in/ (listed in
//      INDIA_PAGES below, e.g. /in/pricing)
//        -> served as-is to EVERY visitor, wherever they are. The page is
//           bound to India by its route, so there is nothing to rewrite, and
//           no reason to bounce a visitor outside India off it -- ZM-IN-142:
//           "Geo-IP may suggest India but never force a market."
//   1. Visitor from India on a normal path (e.g. /pricing)
//        -> redirected to /in/pricing (the URL bar changes)
//   2. Visitor from India on any other /in/ path (e.g. /in/about, following
//      #1, or a direct link/bookmark)
//        -> served the *same* page component as /about, via an internal
//           rewrite (URL bar stays as /in/about). The page receives an
//           `x-zoiko-region: IN` request header if it ever wants to change
//           behavior -- presentation only; never use it for prices, tax or
//           billing.
//   3. Visitor from anywhere else trying to reach any other /in/ path directly
//      (an Indian visitor's link shared to someone abroad, an old bookmark
//      from a trip, a search result, etc.)
//        -> redirected to the equivalent global path, /in/ stripped
//   4. Visitor from anywhere else on a normal path
//        -> untouched
//
// Deliberately excluded, via isExcludedPath() below (not the matcher --
// see the comment there for why), because rewriting/redirecting these
// breaks real functionality rather than just changing a URL:
//   - /internal/*  -- server-side API routes this app calls from its own
//     client-side fetches (search, scan, claim, etc.); the client expects
//     the exact path it requested, not a redirect.
//   - /api/*       -- same reasoning, for this app's own route handlers
//     (contact form, briefing requests).
//   - robots.txt / sitemap.xml, and (via the matcher) Next.js internals and
//     static assets.
//
// Fail-safe by construction: if CF-IPCountry is ever missing (local dev,
// a direct request that bypasses Cloudflare, a future infra change), the
// country resolves to "" and every branch below falls through to "treat as
// not India" -- the site behaves exactly as it does today. Nothing here can
// make the site *more* broken than not having this file at all.
// ---------------------------------------------------------------------------

const IN_PREFIX = "/in";

// /in/ paths with a real India page under app/in/ (case 0 above). Add a path
// here when its app/in/... page is added -- never as matcher regex.
const INDIA_PAGES: ReadonlySet<string> = new Set(["/in/pricing"]);

// Paths this proxy must never touch, checked explicitly here rather than
// folded into the matcher's regex below. A (?:/|$) alternation in the
// matcher string tested correctly against a plain JS RegExp locally, but
// Next.js compiles matcher strings with its own logic that does not
// reliably support the same regex features -- verified in production: it
// let a real page (/api-access) get wrongly redirected. Plain string checks
// here run as ordinary JS in the same runtime as the rest of this function,
// so there is nothing left to guess about how they behave.
function isExcludedPath(pathname: string): boolean {
  return (
    pathname === "/api" ||
    pathname.startsWith("/api/") ||
    pathname === "/internal" ||
    pathname.startsWith("/internal/") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isExcludedPath(pathname)) {
    return NextResponse.next();
  }

  const country = request.headers.get("cf-ipcountry") ?? "";

  const isIndiaPath = pathname === IN_PREFIX || pathname.startsWith(`${IN_PREFIX}/`);

  if (isIndiaPath) {
    // Case 0: India's own page -- identical for every visitor.
    if (INDIA_PAGES.has(pathname.replace(/\/+$/, ""))) {
      return NextResponse.next();
    }

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
    // Only the standard, well-established exclusions here (Next's own
    // documented pattern, unmodified) -- api/ and internal/ are excluded
    // inside proxy() itself instead, see isExcludedPath above.
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};
