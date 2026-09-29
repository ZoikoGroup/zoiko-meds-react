/**
 * @vitest-environment node
 *
 * proxy.ts — India-only /in/ routing, with /in/pricing as a real India page.
 */
import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const ORIGIN = "https://zoikomeds.com";

function route(pathname: string, country?: string) {
  const headers = new Headers();
  if (country) headers.set("cf-ipcountry", country);
  const response = proxy(new NextRequest(new URL(pathname, ORIGIN), { headers }));
  const location = response.headers.get("location");
  const rewrite = response.headers.get("x-middleware-rewrite");
  return {
    status: response.status,
    passThrough: response.headers.get("x-middleware-next") === "1",
    redirectTo: location ? new URL(location).pathname : null,
    rewriteTo: rewrite ? new URL(rewrite).pathname : null,
    region: response.headers.get("x-zoiko-region"),
  };
}

const PASS = { status: 200, passThrough: true, redirectTo: null, rewriteTo: null, region: null };

// Countries the multi-market template would have routed. None of them may be
// touched now: this site routes India only.
const OTHER_COUNTRIES = ["US", "GB", "ES", "FR", "DE", "CA", "AE"];

describe("/in/pricing — the India pricing page", () => {
  it.each(["IN", ...OTHER_COUNTRIES, "ZZ", undefined])(
    "is served as-is to a visitor from %s (no rewrite to the global page, no redirect away)",
    (country) => {
      expect(route("/in/pricing", country)).toEqual(PASS);
    },
  );

  it("is served as-is with a trailing slash too", () => {
    expect(route("/in/pricing/", "US")).toEqual(PASS);
    expect(route("/in/pricing/", "IN")).toEqual(PASS);
  });

  it("is where an Indian visitor on /pricing lands, in one hop", () => {
    const first = route("/pricing", "IN");
    expect(first).toMatchObject({ status: 307, redirectTo: "/in/pricing" });
    expect(route(first.redirectTo!, "IN")).toEqual(PASS);
  });
});

describe("global /pricing is untouched outside India", () => {
  it.each([...OTHER_COUNTRIES, "ZZ", undefined])("visitor from %s stays on /pricing", (country) => {
    expect(route("/pricing", country)).toEqual(PASS);
    expect(route("/", country)).toEqual(PASS);
  });
});

describe("no /en-in/ (or any locale-prefixed) URLs", () => {
  const paths = ["/", "/pricing", "/in", "/in/pricing", "/in/about", "/about"];
  const countries = ["IN", ...OTHER_COUNTRIES, "ZZ", undefined];

  it("never redirects or rewrites to a language-region prefix", () => {
    for (const country of countries) {
      for (const pathname of paths) {
        const { redirectTo, rewriteTo } = route(pathname, country);
        for (const target of [redirectTo, rewriteTo]) {
          expect(target ?? "", `${pathname} from ${country}`).not.toMatch(/^\/[a-z]{2,3}-[a-z]{2}(\/|$)/);
        }
      }
    }
  });

  it("/in/pricing never becomes /en-in/pricing or /en-in/in/pricing", () => {
    for (const country of countries) {
      const { redirectTo, rewriteTo } = route("/in/pricing", country);
      expect([redirectTo, rewriteTo]).toEqual([null, null]);
    }
  });
});

describe("existing /in/* routing is preserved for every other path", () => {
  it("Indian visitor on /in/about is served the global page, URL unchanged, tagged IN", () => {
    expect(route("/in/about", "IN")).toMatchObject({ rewriteTo: "/about", region: "IN", redirectTo: null });
    expect(route("/in", "IN")).toMatchObject({ rewriteTo: "/", region: "IN" });
  });

  it("visitor outside India on /in/about is sent to the global path", () => {
    expect(route("/in/about", "US")).toMatchObject({ status: 307, redirectTo: "/about" });
    expect(route("/in/about")).toMatchObject({ status: 307, redirectTo: "/about" });
  });

  it("Indian visitor on a normal path is sent into /in/", () => {
    expect(route("/about", "IN")).toMatchObject({ status: 307, redirectTo: "/in/about" });
    expect(route("/api-access", "IN")).toMatchObject({ status: 307, redirectTo: "/in/api-access" });
  });

  it("never touches route handlers", () => {
    for (const pathname of ["/api/contact", "/internal/zoiko/search", "/robots.txt", "/sitemap.xml"]) {
      expect(route(pathname, "IN")).toEqual(PASS);
    }
  });
});
