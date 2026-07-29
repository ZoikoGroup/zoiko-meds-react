"use client";

import { useRouter } from "next/navigation";
import { appUrl } from "@/lib/config";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

export default function IntegrationsCTASection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
                "radial-gradient(120% 140% at 50% 0%, rgba(19,165,148,0.14) 0%, rgba(11,21,48,0) 55%), #101B3D",
            }}
          >
            {/* Headline */}
            <h2 className="text-[1.9rem] font-extrabold leading-tight text-white sm:text-[2.2rem]">
              Ready to connect ZoikoMeds to your{" "}
              <span style={{ color: ACCENT }}>enterprise workflow?</span>
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#AEB6C9]">
              Request an integration briefing to review your systems, use case, security
              requirements, data boundaries, and implementation path.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
              onClick={()=>router.push('#request-an-integration-briefing')}
                type="button"
                className="rounded-lg px-6 py-3.5 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.5)]"
                style={{ backgroundColor: ACCENT }}
              >
                Request an Integration Briefing
              </button>
              <button
                type="button"
                className="rounded-lg border px-6 py-3.5 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.04]"
                style={{ borderColor: "rgba(255,255,255,0.18)" }}
              >
                Talk to Sales
              </button>
            </div>

            {/* Quick links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="/trust-center"
                className="text-[13px] font-semibold text-[#AEB6C9] transition-colors duration-200 hover:text-white"
              >
                Visit Trust Center →
              </a>
              <span className="text-[#7C859B]">|</span>
              <a
                href={appUrl("/login")}
                className="text-[13px] font-semibold text-[#AEB6C9] transition-colors duration-200 hover:text-white"
              >
                Sign In →
              </a>
              <span className="text-[#7C859B]">|</span>
              <a
                href="/contact"
                className="text-[13px] font-semibold text-[#AEB6C9] transition-colors duration-200 hover:text-white"
              >
                Contact →
              </a>
            </div>

            {/* Disclaimer */}
            <p className="mx-auto mt-8 max-w-lg text-[12px] leading-relaxed text-[#7C859B]">
              ZoikoMeds does not sell, prescribe, dispense, deliver, or provide medical advice,
              and does not expose exact inventory quantities to unauthorized users.
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
        animation: active ? `integrationsCTAFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsCTAFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}