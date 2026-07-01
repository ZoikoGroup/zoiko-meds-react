"use client";

import { useEffect, useRef, useState } from "react";



const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const ROWS = [
  {
    area: "Privacy by design",
    promise: "Search without an account. Account features are opt-in for saved searches, alerts, preferences, and caregiver organization.",
    route: "View Privacy Center",
    href: "/privacy-center",
  },
  {
    area: "Data minimization",
    promise: "Collect only what is needed for search, account preferences, alerts, workflows, security, and governance.",
    route: "Request Data Governance Pack",
    href: "/request-data-governance-pack",
  },
  {
    area: "Security controls",
    promise: "Role-based access, MFA readiness, encryption, audit logging, secure sessions, bot protection, and secure document routing for protected workflows.",
    route: "Request Security Pack",
    href: "/request-security-pack",
  },
  {
    area: "Enterprise governance",
    promise: "Enterprise outputs are contract-scoped, jurisdiction-aware, thresholded, aggregated, and access-controlled.",
    route: "Request Enterprise Trust Review",
    href: "/request-enterprise-trust-review",
  },
  {
    area: "Analytics privacy",
    promise: "Identifiable medicine searches, precise locations, PHI, exact stock, internal scores, and sensitive operational data must not flow into general marketing analytics.",
    route: "View Analytics Governance",
    href: "/analytics-governance",
  },
  {
    area: "Policy governance",
    promise: "Public policies, disclaimers, controlled medicine rules, privacy materials, and trust copy are versioned and reviewed.",
    route: "View Legal & Trust Policies",
    href: "/legal-trust",
  },
] as const;

export default function TrustCenterControlsSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Privacy, Security &amp; Data Governance
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Controls that </span>
            <span style={{ color: ACCENT }}>matter to every reviewer.</span>
          </h2>
        </Reveal>

        {/* ── Table card ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">

            {/* Header row */}
            <div
              className="grid px-6 py-4 sm:px-8"
              style={{
                gridTemplateColumns: "1.2fr 3fr 1.6fr",
                backgroundColor: NAVY,
              }}
            >
              {["Control Area", "Public Promise", "Detail Route"].map((col) => (
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
              {ROWS.map((row) => (
                <div
                  key={row.area}
                  className="grid items-start gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#F8FAFC] sm:px-8"
                  style={{ gridTemplateColumns: "1.2fr 3fr 1.6fr" }}
                >
                  {/* Control area */}
                  <span className="text-[13.5px] font-bold text-[#0F1F4E]">
                    {row.area}
                  </span>

                  {/* Public promise */}
                  <span className="text-[13px] leading-relaxed text-[#5B6478]">
                    {row.promise}
                  </span>

                  {/* Detail route */}
                  <a
                    href={row.href}
                    className="text-[13px] font-semibold transition-opacity duration-150 hover:opacity-80"
                    style={{ color: ACCENT }}
                  >
                    {row.route}
                  </a>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustControlsFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustControlsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}