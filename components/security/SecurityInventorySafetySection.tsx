"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

// Replace with your actual image path (e.g. an import from /public, or a full URL).
const IMAGE_SRC = "/images/security-inventory-safety.webp";

const ITEMS = [
  {
    lead: "Confidence-based availability",
    body: "communicate direction through Tier 1–5 signals instead of public exact stock claims.",
  },
  {
    lead: "Pharmacy confirmation gate",
    body: "authorized participation strengthens confidence with a Pharmacy Verified badge, not an inventory count.",
  },
  {
    lead: "Commercial sensitivity protection",
    body: "protect wholesalers, distributors, pharmacies, and manufacturers from unsafe supply-data exposure.",
  },
  {
    lead: "Consumer-safe messaging",
    body: "\u201cmay be available,\u201d \u201cavailability signal,\u201d and \u201cconfirm with a licensed pharmacy.\u201d",
  },
  {
    lead: "Controlled medicine boundary",
    body: "restricted-search logic routes to legal and trust content.",
  },
] as const;

export default function SecurityInventorySafetySection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>05</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Pharmacy &amp; Inventory Safety Controls
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Confidence signals, <span style={{ color: ACCENT }}>never exact public</span>
            <br />
            <span style={{ color: ACCENT }}>stock.</span>
          </h2>
        </Reveal>

        {/* ── Grid: image + checklist ── */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">

          {/* Image */}
          <Reveal index={2} active={mounted}>
            <img
              src={IMAGE_SRC}
              alt="ZoikoMeds confidence-based availability signaling"
              className="w-full rounded-2xl object-cover"
            />
          </Reveal>

          {/* Checklist */}
          <Reveal index={3} active={mounted}>
            <div className="flex flex-col">
              {ITEMS.map((item, i) => (
                <div
                  key={item.lead}
                  className="flex gap-3 py-4"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(15,31,78,0.08)" }}
                >
                  <CheckIcon />
                  <p className="text-[13.5px] leading-relaxed" style={{ color: `${NAVY}CC` }}>
                    <span className="font-bold" style={{ color: NAVY }}>
                      {item.lead}
                    </span>{" "}
                    — {item.body}
                  </p>
                </div>
              ))}
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
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
      <path d="M4 10.2l3.2 3.2L16 5" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityInventorySafetyFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityInventorySafetyFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}