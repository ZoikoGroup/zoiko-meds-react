"use client";

import { useEffect, useRef, useState } from "react";



const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";
const NEGATIVE = "#E5484D";

const ROWS = [
  {
    context: "Public search",
    include: "Medicine query, location or search area, radius, device/session security context, consented analytics.",
    exclude: "Prescription images, diagnosis, symptoms, medical history, insurance ID, payment info, account requirement.",
  },
  {
    context: "Account features",
    include: "Email, saved searches, alerts, notification settings, preferred locations, caregiver labels, privacy settings.",
    exclude: "Clinical records, prescription validity, diagnosis, adherence confirmation, treatment plans.",
  },
  {
    context: "Alerts",
    include: "Saved search, signal-change preference, notification channel, quiet hours, alert status.",
    exclude: "Emergency medical monitoring, dispensing confirmation, reservation, stock guarantee.",
  },
  {
    context: "Caregiver tools",
    include: "Plain labels, saved searches, alert settings, preferred locations.",
    exclude: "Power of attorney, guardianship proof, or clinical care records by default.",
  },
  {
    context: "Pharmacy workflows",
    include: "Verified pharmacy profile, role access, signal settings, confirmation workflow metadata.",
    exclude: "Public exact stock counts, confidential pricing, license documents in public analytics.",
  },
  {
    context: "Enterprise outputs",
    include: "Aggregated, anonymized, thresholded availability intelligence under contract.",
    exclude: "Identifiable patient-level outputs, exact public stock exposure, unrestricted patient-behavior sale.",
  },
] as const;

export default function PrivacyCenterDataCategoriesSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            What We Collect — and What We Don&apos;t
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Plain-language </span>
            <span style={{ color: ACCENT }}>data categories.</span>
          </h2>
        </Reveal>

        {/* ── Description ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            ZoikoMeds collects only what is needed to operate search, accounts, alerts,
            preferences, security, privacy requests, pharmacy participation, and governed
            enterprise outputs.
          </p>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">

            {/* Header row */}
            <div
              className="grid px-6 py-4 sm:px-8"
              style={{
                gridTemplateColumns: "1.1fr 2.4fr 2.4fr",
                backgroundColor: NAVY,
              }}
            >
              {["Context", "May Include", "Not Included by Default"].map((col) => (
                <span
                  key={col}
                  className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/60"
                >
                  {col}
                </span>
              ))}
            </div>

            {/* Data rows */}
            <div className="divide-y divide-[#F0F2F7]">
              {ROWS.map((row, i) => (
                <div
                  key={row.context}
                  className="grid items-start gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#F0F2F7] sm:px-8"
                  style={{
                    gridTemplateColumns: "1.1fr 2.4fr 2.4fr",
                    backgroundColor: i % 2 === 1 ? "#FAFBFD" : "#FFFFFF",
                  }}
                >
                  {/* Context */}
                  <span className="text-[13.5px] font-bold text-[#0F1F4E]">
                    {row.context}
                  </span>

                  {/* May include */}
                  <span className="flex items-start gap-2 text-[13px] leading-relaxed text-[#5B6478]">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {row.include}
                  </span>

                  {/* Not included */}
                  <span className="flex items-start gap-2 text-[13px] leading-relaxed text-[#5B6478]">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: NEGATIVE }} viewBox="0 0 16 16" fill="none">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                    {row.exclude}
                  </span>
                </div>
              ))}
            </div>

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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `privacyCategoriesFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes privacyCategoriesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}