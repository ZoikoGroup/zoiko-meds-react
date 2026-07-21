"use client";

import { useEffect, useRef, useState } from "react";
import { appUrl } from "@/lib/config";

/**
 * PrescriptionsCTASection
 * Closing call-to-action: "Take control of your prescriptions today."
 *
 * Layout: light rounded card on the page background, centered
 *         content, headline (black + teal), subtext, two buttons
 *         (filled + outline), and a compliance footnote.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

export default function PrescriptionsCTASection() {
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
    <section className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal index={0} active={mounted}>
          <div className="rounded-[1.75rem] border border-black/5 bg-white px-6 py-14 text-center shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:px-12 sm:py-16">
            <h2 className="mx-auto max-w-2xl text-[1.65rem] font-extrabold leading-tight sm:text-[2rem]" style={{ color: NAVY }}>
              Take control of your <span style={{ color: ACCENT }}>prescriptions today.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[13.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
              Create a free account to organize medications, track refills, and set
              reminders — or sign in to pick up where you left off.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/create-account"
                className="w-full rounded-xl px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
                style={{ backgroundColor: ACCENT }}
              >
                Create Free Account
              </a>
              <a
                href={appUrl("/login")}
                className="w-full rounded-xl border px-6 py-3 text-center text-[13.5px] font-semibold transition-colors hover:bg-black/[0.03] sm:w-auto"
                style={{ borderColor: `${NAVY}26`, color: NAVY }}
              >
                Sign In
              </a>
            </div>

            <p className="mx-auto mt-6 max-w-lg text-[11.5px] leading-relaxed" style={{ color: `${NAVY}66` }}>
              ZoikoMeds supports prescription management and medication visibility. It does
              not prescribe, dispense, or deliver medicine, and does not provide medical
              advice.
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
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `prescriptionsCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes prescriptionsCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}