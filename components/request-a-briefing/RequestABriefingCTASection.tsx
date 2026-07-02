"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

export default function RequestABriefingCTASection() {
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: "#0B1530" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal index={0} active={mounted}>
          <div
            className="relative overflow-hidden rounded-2xl border px-6 py-14 text-center sm:px-12 sm:py-16"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background:
                "radial-gradient(120% 140% at 50% 0%, rgba(15,170,135,0.14) 0%, rgba(15,21,48,0) 55%), #101B3D",
            }}
          >
            {/* Headline */}
            <h2 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.2rem]">
              <span className="text-white">Ready to talk medicine </span>
              <span style={{ color: ACCENT }}>availability intelligence?</span>
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#AEB6C9]">
              Request a ZoikoMeds briefing matched to your organization type, role, region, and
              intelligence need.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className="w-full rounded-xl px-7 py-3.5 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(15,170,135,0.5)] sm:w-auto"
                style={{ backgroundColor: ACCENT }}
              >
                Start Briefing Request
              </button>
              <button
                type="button"
                className="w-full rounded-xl border px-7 py-3.5 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.04] sm:w-auto"
                style={{ borderColor: "rgba(255,255,255,0.18)" }}
              >
                Explore Trust Center
              </button>
            </div>

            {/* Footnote */}
            <p className="mx-auto mt-8 max-w-lg text-[12px] leading-relaxed text-[#7C859B]">
              ZoikoMeds does not sell, prescribe, dispense, deliver, or provide medical advice.
              Briefings are for qualified organizations and approved partners.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `requestBriefingCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}