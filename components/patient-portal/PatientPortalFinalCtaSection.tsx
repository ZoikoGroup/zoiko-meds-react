"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#2FD4B0";

export default function PatientPortalFinalCtaSection() {
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
    <section className="relative w-full overflow-hidden bg-[#0C1B30] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div
          ref={ref}
          className="mx-auto flex flex-col items-center rounded-3xl border px-6 py-14 text-center sm:px-12 lg:py-16"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          {/* ── Headline ── */}
          <Reveal index={0} active={mounted}>
            <h2 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.1rem]">
              <span className="text-white">Create your </span>
              <span style={{ color: ACCENT }}>ZoikoMeds portal.</span>
            </h2>
          </Reveal>

          {/* ── Subtext ── */}
          <Reveal index={1} active={mounted}>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed" style={{ color: "#9AA3C0" }}>
              Save medicine searches, manage availability alerts, and review your access
              activity in one secure patient-facing dashboard.
            </p>
          </Reveal>

          {/* ── Buttons ── */}
          <Reveal index={2} active={mounted}>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/create-account"
                className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-opacity duration-200 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Create Free Account
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-200 hover:bg-white/5"
                style={{ borderColor: "rgba(255,255,255,0.2)" }}
              >
                Sign In
              </Link>
            </div>
          </Reveal>

          {/* ── Disclaimer ── */}
          <Reveal index={3} active={mounted}>
            <p className="mt-8 max-w-xl text-[12px] leading-relaxed" style={{ color: "#6C77A0" }}>
              ZoikoMeds does not sell, prescribe, dispense, or deliver medicine, and does not
              provide medical advice. Availability information is confidence-based access
              intelligence.
            </p>
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
        animation: active ? `patientPortalFinalCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalFinalCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}