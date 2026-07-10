"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * InventoryUploadCtaSection
 * Final dark navy CTA banner for the Inventory Upload page.
 * Matches the same pattern as VerificationCtaSection.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

export default function InventoryUploadCtaSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#0C1B30] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Inner rounded card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#112154] px-8 py-14 text-center sm:px-12 sm:py-16"
        >
          {/* Subtle radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(15,170,135,0.07) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            {/* Headline */}
            <Reveal index={0} active={mounted}>
              <h2 className="text-xl font-bold leading-snug text-white sm:text-[1.7rem]">
                Turn pharmacy inventory inputs into safer availability signals.
              </h2>
            </Reveal>

            {/* Subtitle */}
            <Reveal index={1} active={mounted}>
              <p className="mx-auto max-w-md text-[14px] leading-relaxed text-[#8FA3C8]">
                Connect through the portal, secure upload, PMS/POS, or API
                workflows while keeping exact public stock hidden and pharmacy
                control protected.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal index={2} active={mounted}>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#signal-setup"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Discuss Inventory Signal Setup
                </Link>

                <Link
                  href="/pharmacy-portal"
                  className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-transparent px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                >
                  Sign In to Pharmacy Portal
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active
          ? `invCtaFadeUp 0.55s ease-out ${index * 110}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}