"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

export default function PatientPortalDashboardPreviewSection() {
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

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Dashboard Preview
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Everything in </span>
            <span style={{ color: ACCENT }}>one calm, secure view.</span>
          </h2>
        </Reveal>

        {/* ── Preview image ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-10 lg:mt-12">
            {/* TODO: replace src with the final dashboard preview image URL */}
            <img
              src="/images/patientportal-dashboard-preview.webp"
              alt="ZoikoMeds patient portal dashboard preview showing saved searches, availability alerts, access activity, and medicine availability summary"
              className="w-full rounded-2xl border object-cover shadow-[0_24px_60px_-20px_rgba(15,31,78,0.18)]"
              style={{ borderColor: "#E7EAF1" }}
            />
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
        animation: active ? `patientPortalDashboardPreviewFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalDashboardPreviewFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}