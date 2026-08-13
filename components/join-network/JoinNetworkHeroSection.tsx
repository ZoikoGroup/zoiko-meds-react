"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * JoinNetworkHeroSection
 * First section of the "Join the Network" page — left copy column with
 * two CTAs and a controls link, right column shows the hero image aligned parallel to the content.
 */

export default function JoinNetworkHeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-20 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---------------- Left column ---------------- */}
        <div>
          {mounted ? (
            <div className="flex flex-col gap-5">
              <Reveal index={0}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0FAA87]">
                  For Pharmacies
                </span>
              </Reveal>

              <Reveal index={1}>
                <h1 className="font-[var(--font-plus-jakarta-sans)] text-[40px] font-bold leading-[1.15] text-[#0F1F4E] sm:text-[40px]">
                  Join the verified network for{" "}
                  <span className="text-[#0FAA87]">
                    medicine availability search
                  </span>
                  .
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                  ZoikoMeds helps pharmacies share confidence-based availability
                  signals, reduce avoidable “do you have this medicine?” calls,
                  and support patients before they travel — without publicly
                  exposing exact stock quantities.
                </p>
              </Reveal>

              <Reveal index={3}>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => router.push("#verified-network")}
                    type="button"
                    className="group cursor-pointer relative overflow-hidden rounded-xl bg-[#13A594] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                    <span className="relative">Join the Verified Network</span>
                  </button>

                  <button
                    onClick={() => router.push("#claim-your-pharmacy")}
                    type="button"
                    className="rounded-xl cursor-pointer border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                  >
                    Claim Your Pharmacy
                  </button>
                </div>
              </Reveal>

              <Reveal index={4}>
                <a
                  href="#control"
                  className="group mt-1 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#13A594] transition-colors duration-200 hover:text-[#03877D]"
                >
                  View Pharmacy Data Controls
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </Reveal>

              <Reveal index={5}>
                <p className="mt-1 flex max-w-lg items-start gap-2 text-[12.5px] leading-relaxed text-[#8891A4]">
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#00A99D]"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <rect
                      x="4.5"
                      y="9"
                      width="11"
                      height="8"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                  Pharmacies remain in control of visibility, confirmation
                  responses, participation settings, and dispensing decisions.
                </p>
              </Reveal>
            </div>
          ) : (
            <LeftSkeleton />
          )}
        </div>

        {/* ---------------- Right column: Image ---------------- */}
        <div className="w-full">
          <img
            src="/join-the-network/hero.png"
            alt="Join the Network Preview"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                  */
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
      className="animate-[joinNetworkFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes joinNetworkFadeUp {
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
/*  Skeletons                                                       */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-4 w-28 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="space-y-3">
        <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-5/6 max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex gap-3">
        <div className="h-11 w-56 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}
