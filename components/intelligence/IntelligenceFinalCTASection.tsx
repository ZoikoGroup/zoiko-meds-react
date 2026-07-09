"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NAVY = "#0C1B30";

export default function IntelligenceFinalCTASection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-16 sm:py-20" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal index={0} active={mounted}>
          <div
            className="rounded-2xl border border-white/10 px-6 py-14 text-center sm:px-12"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h2 className="mx-auto max-w-2xl text-[1.6rem] font-extrabold leading-snug text-white sm:text-[1.9rem]">
              Ready to see medicine availability <span style={{ color: ACCENT }}>intelligence in action?</span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-[13.5px] leading-relaxed text-white/50">
              Request a ZoikoMeds briefing to understand how analytics, AI insights, and
              compliance-ready reports can support your organization&apos;s medicine access
              visibility strategy.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/request-a-briefing"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Request a Briefing
              </a>
              <a
                href="/trust-center"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:border-white/40"
              >
                Explore Trust Center
              </a>
            </div>

            <p className="mx-auto mt-6 max-w-md text-[11.5px] leading-relaxed text-white/35">
              ZoikoMeds does not provide medical advice, sell medicine, dispense prescriptions,
              or expose unauthorized inventory quantities.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `intelligenceFinalCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes intelligenceFinalCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}