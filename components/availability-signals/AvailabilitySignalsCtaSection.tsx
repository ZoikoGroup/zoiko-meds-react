"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACCENT = "#0FAA87";

export default function AvailabilitySignalsCtaSection() {
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
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#112154] px-8 py-14 text-center sm:px-12 sm:py-16">
          {/* Radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(15,170,135,0.07) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            <Reveal index={0} active={mounted}>
              <h2 className="mx-auto max-w-2xl text-xl font-bold leading-snug text-white sm:text-[1.7rem]">
                Give patients clearer language for availability uncertainty.
              </h2>
            </Reveal>

            <Reveal index={1} active={mounted}>
              <p className="mx-auto max-w-md text-[14px] leading-relaxed text-[#8FA3C8]">
                Use ZoikoMeds medication availability signals to support safer
                next-step guidance, pharmacy confirmation, saved searches, and
                alerts — without replacing clinical care.
              </p>
            </Reveal>

            <Reveal index={2} active={mounted}>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Signal Workflow Briefing
                </Link>
                <Link
                  href="/searchmed"
                  className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-transparent px-6 py-2.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                >
                  Search Medicines
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `avSigCtaFadeUp 0.55s ease-out ${index * 110}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes avSigCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}