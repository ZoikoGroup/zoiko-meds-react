"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

export default function ClinicNetworksCTASection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: "#0B1530" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div
          className="flex flex-col items-center rounded-3xl border px-8 py-12 text-center sm:px-10 sm:py-14 lg:px-12 lg:py-16"
          style={{
            borderColor: "rgba(19,165,148,0.2)",
            backgroundColor: "rgba(16,27,61,0.6)",
          }}
        >

          {/* ── Headline ── */}
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.2rem]">
              <span>Give your clinic network a clearer </span>
              <span style={{ color: ACCENT }}>view of medicine access.</span>
            </h2>
          </Reveal>

          {/* ── Subtext ── */}
          <Reveal index={1} active={mounted}>
            <p className="mt-5 max-w-xl mx-auto text-[14px] leading-relaxed text-[#AEB6C9]">
              Book a clinic network briefing to see how ZoikoMeds supports access visibility,
              pharmacy network signals, shortage awareness, escalation, and compliance-conscious
              reporting across every location.
            </p>
          </Reveal>

          {/* ── Buttons ── */}
          <Reveal index={2} active={mounted}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
              onClick={()=>router.push("#clinic-networks-briefing")}
                type="button"
                className="rounded-lg px-6 py-3.5 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.45)]"
                style={{ backgroundColor: ACCENT }}
              >
                Book a Clinic Network Briefing
              </button>
              <button
                type="button"
                className="rounded-lg border px-6 py-3.5 text-[14px] font-bold text-[#AEB6C9] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-[#13A594] hover:text-white"
                style={{ borderColor: "rgba(19,165,148,0.4)" }}
              >
                Talk to Enterprise Sales
              </button>
            </div>
          </Reveal>

          {/* ── Disclaimer ── */}
          <Reveal index={3} active={mounted}>
            <p className="mt-8 text-[12px] leading-relaxed text-[#8A93A6]">
              ZoikoMeds does not sell, prescribe, dispense, or deliver medicine, and does not provide
              medical advice or expose exact inventory quantities to unauthorized users.
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
        animation: active ? `clinicNetworksCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}