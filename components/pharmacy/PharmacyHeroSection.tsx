"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { internalApi } from "@/lib/config";

/**
 * PharmacyHeroSection
 * First section of the "Join as a Pharmacy" page.
 *
 * Animation pattern:
 *  1. Skeleton placeholders render immediately (no layout shift).
 *  2. Once mounted, real content fades up (bottom -> top) with a
 *     staggered delay per element.
 *  3. Interactive elements (badge, input, button, nodes) get
 *     hover/focus/active micro-interactions.
 */

// Swap this with your actual network graphic image URL/path.
const NETWORK_IMAGE_SRC = "/images/pharmacy-network-graphic.png";

/** A real pharmacy record from /internal/pharmacy-claim/search. */
type PharmacyMatch = {
  id: string;
  name: string;
  address: string;
  verified: boolean;
};

const NO_MATCH_MESSAGE =
  "We couldn't find a matching pharmacy. Please check the pharmacy name and try again.";

export default function PharmacyHeroSection() {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);

  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState<PharmacyMatch[] | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [searchedName, setSearchedName] = useState("");
  /** Guards against a second request while one is already in flight. */
  const inFlight = useRef(false);

  useEffect(() => {
    // Simulate a brief load tick so the bottom->top entrance is visible
    // instead of the content just appearing on first paint.
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  async function handleSearch(e?: FormEvent) {
    e?.preventDefault();
    if (inFlight.current) return;

    const name = query.trim();
    setMatches(null);
    setNotice(null);

    if (name.length < 3) {
      setNotice("Enter at least 3 characters of the pharmacy name.");
      return;
    }

    inFlight.current = true;
    setSearching(true);
    try {
      // Name only — the portal's claim form is the one that also sends a
      // location. Omitting the key entirely is what makes it optional.
      const res = await fetch(internalApi("pharmacy-claim/search"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();

      if (!res.ok) {
        setNotice(
          data?.errors?.name ||
            data?.message ||
            "Something went wrong while searching. Please try again.",
        );
        return;
      }

      setSearchedName(name);
      if (!data.matched || !Array.isArray(data.matches) || data.matches.length === 0) {
        setNotice(data?.message || NO_MATCH_MESSAGE);
        return;
      }
      setMatches(data.matches as PharmacyMatch[]);
    } catch {
      setNotice("Something went wrong while searching. Please try again.");
    } finally {
      setSearching(false);
      inFlight.current = false;
    }
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0A1330] py-20 sm:py-24 lg:py-28"
    >
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-[#00A99D]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[#0F1F4E]/40 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* ---------------- Left column ---------------- */}
        <div className="relative">
          {mounted ? (
            <div className="flex flex-col gap-6">
              <Reveal index={0}>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 transition-all duration-300 hover:border-[#00A99D]/50 hover:bg-[#00A99D]/10 hover:text-white">
                  Join as a Pharmacy
                </span>
              </Reveal>

              <Reveal index={1}>
                <h1 className="font-[var(--font-plus-jakarta-sans)] text-[45px] font-bold leading-[1.12] text-white sm:text-5xl lg:text-[45px]">
                  Integrate your pharmacy into the{" "}
                  <span className="text-[#3DE8BB]">
                    Global Medicine Availability Network
                  </span>
                  .
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="max-w-md text-base leading-relaxed text-white/60 sm:text-[17px]">
                  Route high-intent patients to your counter, reduce
                  availability calls, and connect inventory signals without
                  exposing exact stock quantities.
                </p>
              </Reveal>

              <Reveal index={3}>
                <div className="mt-2 w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/20">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00A99D]">
                    Search &amp; Claim Your Pharmacy
                  </p>

                  <label className="group relative mb-3 flex items-center rounded-xl border border-white/10 bg-[#0B1538] px-4 py-3 transition-colors duration-200 focus-within:border-[#00A99D]/60">
                    <svg
                      className="mr-3 h-4 w-4 flex-shrink-0 text-white/40 transition-colors duration-200 group-focus-within:text-[#00A99D]"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle
                        cx="9"
                        cy="9"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M14 14L17.5 17.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setNotice(null);
                        setMatches(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      placeholder="Enter pharmacy name, ZIP, city, license number, or NPI"
                      className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleSearch}
                    disabled={searching}
                    aria-busy={searching}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-[#06241F] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                    {searching ? (
                      <svg
                        className="relative h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          d="M21 12a9 9 0 0 0-9-9"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="relative h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M4 10.5L8 14.5L16 5.5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <span className="relative">
                      {searching ? "Searching..." : "Claim & Verify Pharmacy"}
                    </span>
                  </button>

                  {/* Lookup outcome — real records only, never a fake success. */}
                  {notice && (
                    <p
                      role="alert"
                      className="mt-3 text-[12px] leading-relaxed text-[#FFB4AD]"
                    >
                      {notice}
                    </p>
                  )}

                  {matches && matches.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[12px] text-white/60">
                        {matches.length === 1
                          ? "1 pharmacy matches"
                          : `${matches.length} pharmacies match`}{" "}
                        &ldquo;{searchedName}&rdquo;. Select yours to continue.
                      </p>
                      <ul className="mt-2 space-y-2">
                        {matches.map((match) => (
                          <li key={match.id}>
                            <a
                              href={`/pharmacy-portal?pharmacy=${encodeURIComponent(
                                match.name,
                              )}#claim-your-pharmacy`}
                              className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-[#0B1538] px-4 py-3 transition-colors duration-200 hover:border-[#00A99D]/60"
                            >
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-medium text-white">
                                  {match.name}
                                </span>
                                {match.address && (
                                  <span className="block truncate text-[12px] text-white/45">
                                    {match.address}
                                  </span>
                                )}
                              </span>
                              <span className="flex-shrink-0 self-center rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/60">
                                {match.verified ? "Verified" : "Unclaimed"}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="mt-3 text-[12px] leading-relaxed text-white/40">
                    Exact quantities are never shown publicly. Controlled
                    medicines are suppressed by jurisdictional rules.
                  </p>

                  <p className="mt-1 text-[12px] text-white/40">
                    Enterprise chain or health system?{" "}
                    <a
                      href="/integrations"
                      className="inline-flex items-center gap-1 font-medium text-[#00A99D] transition-colors duration-200 hover:text-[#3FD9CC]"
                    >
                      Request an Integration Briefing
                      <svg
                        className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </p>
                </div>
              </Reveal>
            </div>
          ) : (
            <LeftSkeleton />
          )}
        </div>

        {/* ---------------- Right column: network graphic image ---------------- */}
        <div className="relative mx-auto h-[520px] w-full max-w-md sm:h-[500px] sm:max-w-lg lg:h-[520px] lg:max-w-xl">
          {mounted && <NetworkGraphicImage />}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                   */
/* ----------------------------------------------------------------- */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[pharmacyFadeUp_0.6s_ease-out_forwards]"
      style={{
        opacity: 0,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons (shown until the section "loads")                       */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
      <div className="space-y-3">
        <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
        <div className="h-10 w-5/6 max-w-md animate-pulse rounded-lg bg-white/10" />
        <div className="h-10 w-2/3 max-w-md animate-pulse rounded-lg bg-white/10" />
      </div>
      <div className="h-4 w-full max-w-sm animate-pulse rounded bg-white/10" />
      <div className="h-4 w-3/4 max-w-sm animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-56 w-full max-w-xl animate-pulse rounded-2xl bg-white/[0.06]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Network graphic image (right column)                              */
/* ----------------------------------------------------------------- */
function NetworkGraphicImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-40 w-40 animate-pulse rounded-full bg-white/[0.06]" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={NETWORK_IMAGE_SRC}
        alt="ZoikoMeds network connecting pharmacies and patients"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-contain transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
