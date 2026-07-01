"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const LAYERS = [
  {
    badge: "Identity Trust",
    title: "Identity & access",
    description: "Anonymous-first search, account controls, role-based access, MFA/passkey readiness, and SSO readiness where applicable.",
    note: "Users and organizations reach the right workflows without unnecessary data collection.",
    cta: "View Account Security",
    href: "/account-security",
  },
  {
    badge: "Pharmacy Trust",
    title: "Verified participation",
    description: "Verified pharmacy participation, authorized-user controls, branch permissions, profile governance, and auditability.",
    note: "Users see participating pharmacy information with clearer accountability.",
    cta: "View Verification Standards",
    href: "/verification-standards",
  },
  {
    badge: "Medicine Data Trust",
    title: "MediBase™ identity",
    description: "Medicine identity normalization, brand/generic matching, strength/form support, and jurisdiction context.",
    note: "Search and integration rely on cleaner medicine identity logic.",
    cta: "Explore MediBase™",
    href: "/medibase",
  },
  {
    badge: "Availability Trust",
    title: "ZoikoAvail™ confidence",
    description: "Confidence signals, freshness indicators, exact-stock suppression, and confirmation guidance.",
    note: "Users understand what to check next without false certainty.",
    cta: "View Availability Confidence",
    href: "/availability-confidence",
  },
  {
    badge: "Intelligence Trust",
    title: "ZoikoSignal™ governance",
    description: "Aggregated, anonymized, thresholded, contract-scoped institutional intelligence.",
    note: "Institutions gain access visibility without patient-level exposure.",
    cta: "Explore ZoikoSignal™",
    href: "/zoikosignal",
  },
  {
    badge: "Operational Trust",
    title: "Operations & oversight",
    description: "Incident response, support routing, security review, document governance, accessibility, and policy versioning.",
    note: "Stakeholders know how trust is maintained over time.",
    cta: "Request Trust Pack",
    href: "/request-trust-pack",
  },
] as const;

export default function TrustCenterLayersSection() {
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
            ZoikoMeds Trust Stack
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Six governed </span>
            <span style={{ color: ACCENT }}>layers of trust.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#5B6478]">
            From identity to operations — each layer creates trust and routes to the right
            evidence.
          </p>
        </Reveal>

        {/* ── Layers card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            <div className="divide-y divide-[#F0F2F7]">
              {LAYERS.map((layer) => (
                <div
                  key={layer.title}
                  className="grid grid-cols-1 items-start gap-4 px-6 py-6 transition-colors duration-150 hover:bg-[#F8FAFC] sm:grid-cols-[150px_1fr_auto] sm:gap-6 sm:px-8"
                >
                  {/* Badge */}
                  <span
                    className="inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: ACCENT, borderColor: "rgba(15,170,135,0.3)", backgroundColor: "rgba(15,170,135,0.06)" }}
                  >
                    {layer.badge}
                  </span>

                  {/* Content */}
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0F1F4E]">{layer.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[#3F4759]">
                      {layer.description}
                    </p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-[#9AA1B4]">
                      {layer.note}
                    </p>
                  </div>

                  {/* CTA */}
                  <a
                    href={layer.href}
                    className="inline-flex h-fit w-fit items-center justify-center whitespace-nowrap rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E] sm:justify-self-end"
                  >
                    {layer.cta}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustLayersFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustLayersFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}