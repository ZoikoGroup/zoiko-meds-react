"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const BG = "#0C1B30";
const PANEL = "#0B1226";

export default function OverviewCTASection() {
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
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 px-6 py-14 text-center sm:px-12 sm:py-16"
            style={{ backgroundColor: PANEL }}
          >
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: ACCENT }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-[1.65rem] font-extrabold leading-tight text-white sm:text-[2rem]">
                See how ZoikoMeds can support your {" "}
                <span style={{ color: ACCENT }}>medicine availability strategy.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[13.5px] leading-relaxed text-white/55">
              Book a demo or talk to sales to explore medicine access visibility,
pharmacy network signals, shortage awareness, and compliance-
conscious reporting for your organization.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#book-a-demo"
                  className="w-full rounded-xl px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
                  style={{ backgroundColor: ACCENT }}
                >
                  Book a Demo
                </a>
                <a
                  href="#request-a-briefing"
                  className="w-full rounded-xl border border-white/20 px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
                >
                  Talk to Sales
                </a>
              </div>

              <p className="mx-auto mt-6 max-w-lg text-[11.5px] leading-relaxed text-white/35">
               ZoikoMeds does not sell, prescribe, dispense, deliver, or provide medical advice, and does not
expose exact inventory quantities to unauthorized users.
              </p>
            </div>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}