"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NEGATIVE = "#E5484D";

const CARDS = [
  {
    title: "No prescribing",
    description: "ZoikoMeds does not prescribe, change prescriptions, or validate clinical suitability.",
  },
  {
    title: "No dispensing",
    description: "Dispensing decisions remain with licensed pharmacies and pharmacists.",
  },
  {
    title: "No sales or delivery",
    description: "ZoikoMeds does not sell, ship, deliver, reserve, or allocate medicines.",
  },
  {
    title: "No stock guarantees",
    description: "Availability is confidence-based and must be confirmed directly with the pharmacy.",
  },
  {
    title: "No exact public stock",
    description: "Public pages do not display exact pharmacy stock quantities.",
  },
  {
    title: "No patient-data sales",
    description: "Enterprise intelligence must not expose identifiable patient-level behavior.",
  },
] as const;

export default function TrustCenterDoctrineSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Trust Doctrine
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.4rem]">
            <span className="text-[#0F1F4E]">What ZoikoMeds is — and </span>
            <span style={{ color: ACCENT }}>what it is not.</span>
          </h2>
        </Reveal>

        {/* ── Description ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-[#374151]">
            ZoikoMeds is governed medicine availability infrastructure. It helps users
            understand availability signals from participating verified pharmacies and helps
            institutions evaluate medicine access patterns under approved governance.
            ZoikoMeds is not a pharmacy, prescriber, dispenser, delivery provider,
            marketplace, clinical decision-support system, or emergency service.
          </p>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={3 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(229,72,77,0.1)" }}
                >
                  <svg className="h-4 w-4" style={{ color: NEGATIVE }} viewBox="0 0 16 16" fill="none">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>
              </div>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustDoctrineFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustDoctrineFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}