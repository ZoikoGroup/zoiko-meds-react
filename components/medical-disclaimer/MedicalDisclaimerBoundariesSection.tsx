"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const BOUNDARIES = [
  {
    title: "No medical advice",
    description:
      "ZoikoMeds does not provide medical, clinical, diagnostic, treatment, dosing, substitution, or health advice.",
    special: false,
  },
  {
    title: "No prescribing",
    description:
      "ZoikoMeds does not create, modify, renew, transmit, or validate prescriptions.",
    special: false,
  },
  {
    title: "No pharmacy role",
    description:
      "ZoikoMeds is not a pharmacy and does not dispense, sell, deliver, reserve, allocate, or fulfill medicines.",
    special: false,
  },
  {
    title: "No stock guarantee",
    description:
      "Availability information is confidence-based and may change at any time. It is not a guarantee of stock.",
    special: false,
  },
  {
    title: "No eligibility confirmation",
    description:
      "ZoikoMeds does not confirm insurance coverage, prescription validity, patient eligibility, legal access, or dispensing approval.",
    special: false,
  },
  {
    title: "No substitution recommendations",
    description:
      "ZoikoMeds does not recommend alternative medicines, brands, generics, strengths, doses, or treatment changes.",
    special: false,
  },
  {
    title: "No emergency service",
    description:
      "ZoikoMeds is not an emergency medical service. In an emergency, contact local emergency services immediately.",
    special: true,
  },
  {
    title: "No professional replacement",
    description:
      "ZoikoMeds does not replace doctors, pharmacists, nurses, prescribers, public-health authorities, regulators, or emergency responders.",
    special: false,
  },
] as const;

export default function MedicalDisclaimerBoundariesSection() {
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
            What ZoikoMeds Does Not Provide
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The boundaries, </span>
            <span style={{ color: ACCENT }}>stated plainly.</span>
          </h2>
        </Reveal>

        {/* ── 2-column boundary cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BOUNDARIES.map((item, i) => (
            <Reveal key={item.title} index={i + 2} active={mounted}>
              {item.special ? (
                /* ── Special emergency card ── */
                <div
                  className="flex h-full flex-col rounded-2xl border p-5"
                  style={{ backgroundColor: "#FFF4F4", borderColor: "#FECACA" }}
                >
                  <div className="flex items-start gap-3">
                    {/* Amber triangle icon */}
                    <span className="mt-0.5 flex-shrink-0" style={{ color: "#D97706" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1.8L1 13.5h14L8 1.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                        <path d="M8 6.5v3.5M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-[14px] font-bold" style={{ color: "#B91C1C" }}>
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "#DC2626" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* ── Standard boundary card ── */
                <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-200 hover:border-[#FECACA] hover:shadow-[0_6px_20px_-10px_rgba(220,38,38,0.12)]">
                  <div className="flex items-start gap-3">
                    {/* Red × icon */}
                    <span className="mt-0.5 flex-shrink-0 text-[#E05252]">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#0F1F4E]">{item.title}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5B6478]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `medDiscBoundsFadeUp 0.6s ease-out ${index * 70}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes medDiscBoundsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}