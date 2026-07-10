"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * VerificationCtaSection
 * Full-width dark navy section with a centred rounded card containing:
 *   – headline with teal accent
 *   – subtitle
 *   – two CTA buttons (teal filled + dark outlined)
 *
 * Brand accent: #0FAA87  (matches the rest of the verification page)
 */

const ACCENT = "#0FAA87";

export default function VerificationCtaSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full bg-[#0C1B30] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Inner rounded card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#112154] px-8 py-14 text-center sm:px-12 sm:py-16"
        >
          {/* Subtle radial glow behind content */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(15,170,135,0.07) 0%, transparent 70%)",
            }}
          />

          {mounted ? (
            <div className="relative z-10 flex flex-col items-center gap-5">
              {/* Headline */}
              <Reveal index={0}>
                <h2 className="text-2xl font-bold leading-snug text-white sm:text-[1.85rem]">
                  Help patients trust the{" "}
                  <span style={{ color: ACCENT }}>
                    pharmacy information they see.
                  </span>
                </h2>
              </Reveal>

              {/* Subtitle */}
              <Reveal index={1}>
                <p className="mx-auto max-w-md text-[14px] leading-relaxed text-[#8FA3C8]">
                  Claim your pharmacy, complete verification, and manage
                  participation through governed ZolkoMeds pharmacy workflows.
                </p>
              </Reveal>

              {/* Buttons */}
              <Reveal index={2}>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="claim-your-pharmacy"
                    className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Claim Your Pharmacy
                  </Link>

                  <Link
                    href="/join-the-network"
                    className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-transparent px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                  >
                    Join the Verified Network
                  </Link>
                </div>
              </Reveal>
            </div>
          ) : (
            <CtaSkeleton />
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal: staggered fade-up animation wrapper                         */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[verificationCtaFadeUp_0.55s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 110}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes verificationCtaFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
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

/* ------------------------------------------------------------------ */
/*  Skeleton                                                             */
/* ------------------------------------------------------------------ */
function CtaSkeleton() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="h-7 w-72 animate-pulse rounded-lg bg-white/10" />
      <div className="space-y-2">
        <div className="h-4 w-80 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-56 mx-auto animate-pulse rounded bg-white/10" />
      </div>
      <div className="mt-2 flex gap-3">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-white/10" />
        <div className="h-10 w-44 animate-pulse rounded-lg bg-white/10" />
      </div>
    </div>
  );
}