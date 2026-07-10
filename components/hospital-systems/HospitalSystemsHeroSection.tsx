"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

export default function HospitalSystemsHeroSection() {
  const router = useRouter();
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* ── Left: copy ── */}
          <div>
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Enterprise Medicine Availability Intelligence for Hospital Systems
              </p>
            </Reveal>

            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.1rem] font-extrabold leading-[1.15] sm:text-[2.5rem] lg:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Give Hospital Systems a Clearer View of Medicine Availability, </span>
                <span style={{ color: ACCENT }}>Access Risk, and Shortage Signals</span>
              </h1>
            </Reveal>

            <Reveal index={2} active={mounted}>
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                ZoikoMeds helps hospital systems, IDNs, and multi-site healthcare organizations
                monitor medicine availability signals, pharmacy network activity, shortage
                indicators, and regional access patterns through a secure, compliance-conscious
                intelligence platform.
              </p>
            </Reveal>

            <Reveal index={3} active={mounted}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={()=>router.push("#enterprise-briefing")}
                  type="button"
                  className="rounded-xl cursor-pointer px-6 py-3.5 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.45)]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Enterprise Briefing
                </button>
                <button
                  type="button"
                  className="rounded-xl border px-6 py-3.5 text-[14px] font-bold text-[#0F1F4E] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-[#13A594] hover:text-[#13A594]"
                  style={{ borderColor: "#E7EAF1" }}
                >
                  Talk to Solutions Team
                </button>
              </div>
            </Reveal>

            <Reveal index={4} active={mounted}>
              <p className="mt-6 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A6]">
                <InfoIcon />
                <span>
                  ZoikoMeds does not sell, prescribe, dispense, or deliver medicine. The platform
                  supports operational intelligence and responsible medicine access visibility.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right: hero visual ── */}
          <Reveal index={2} active={mounted}>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border sm:aspect-[16/11]"
              style={{ borderColor: "#E7EAF1", boxShadow: "0 20px 48px -20px rgba(15,31,78,0.16)" }}
            >
              {/* Replace src with the real asset, e.g. /images/hospital-systems-hero.png */}
              <img
                src="/images/hospital-systems-hero.png"
                alt="ZoikoMeds hospital systems dashboard showing medicine availability signals, access risk indicators, shortage signals, and regional access patterns"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A93A6]">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2v4M8 5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
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
        animation: active ? `hospitalSystemsHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}