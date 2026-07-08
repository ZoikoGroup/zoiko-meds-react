"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

export default function ClinicNetworksHeroSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">

          {/* ── Left: text content ── */}
          <div>
            {/* Eyebrow */}
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                ZoikoMeds for Clinic Networks
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.1rem] font-extrabold leading-tight sm:text-[2.5rem]">
                <span className="text-[#0F1F4E]">Medicine Availability Intelligence for </span>
                <span style={{ color: ACCENT }}>Multi-Location Clinic Networks</span>
              </h1>
            </Reveal>

            {/* Subtext */}
            <Reveal index={2} active={mounted}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#5B6478]">
                Give clinic leaders a safer, clearer view of medicine access signals, pharmacy
                network activity, regional access gaps, and shortage movement across every
                location.
              </p>
            </Reveal>

            {/* Buttons */}
            <Reveal index={3} active={mounted}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/clinic-networks/briefing"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request a Clinic Network Briefing
                </Link>
                <Link
                  href="/enterprise-sales"
                  className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-200 hover:bg-[#F4F6FA]"
                  style={{ borderColor: "#D8DDE8" }}
                >
                  Talk to Enterprise Sales
                </Link>
              </div>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={4} active={mounted}>
              <p className="mt-6 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A8]">
                <span style={{ color: ACCENT }}>○</span>
                ZoikoMeds does not sell, prescribe, dispense, or deliver medicine. It supports
                access visibility and operational intelligence.
              </p>
            </Reveal>
          </div>

          {/* ── Right: preview image ── */}
          <Reveal index={2} active={mounted}>
            {/* TODO: replace src with the final clinic network dashboard image URL */}
            <img
              src="/images/clinic.png/"
              alt="ZoikoMeds clinic network dashboard showing access signals, pharmacy network activity, regional maps, and shortage trends"
              className="w-full rounded-2xl border object-cover shadow-[0_24px_60px_-20px_rgba(15,31,78,0.18)]"
              style={{ borderColor: "#E7EAF1" }}
            />
          </Reveal>

        </div>
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
        animation: active ? `clinicNetworksHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}