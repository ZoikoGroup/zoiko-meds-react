"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const LAYERS = [
  {
    number: 1,
    name: "ZoikoSignal™ Intelligence",
    subtitle: "Enterprise intelligence layer",
    description:
      "Aggregated, anonymized, and contract-scoped intelligence covering medicine availability, shortage pressure, demand movement, regional access risk, and restock dynamics.",
    primaryUsers:
      "Health systems, public-health agencies, governments, manufacturers, payers, and strategic intelligence teams.",
    deliveredAs:
      "Dashboards, intelligence reports, signal feeds, institutional briefings, and enterprise data products.",
    cta: "Explore ZoikoSignal™",
    href: "#",
  },
  {
    number: 2,
    name: "ZoikoAvail™ API",
    subtitle: "Availability confidence & integration layer",
    description:
      "API access to confidence-based medicine availability signals, freshness metadata, pharmacy confirmation pathways, and availability-aware workflows.",
    primaryUsers:
      "Digital health platforms, telehealth companies, provider organizations, payers, enterprise pharmacy groups, and product/integration teams.",
    deliveredAs:
      "REST APIs, event feeds where supported, availability confidence endpoints, pharmacy signal metadata, and confirmation-aware outputs.",
    cta: "Discuss ZoikoAvail™ API",
    href: "#",
  },
  {
    number: 3,
    name: "MediBase™ Data",
    subtitle: "Medicine identity & jurisdictional data layer",
    description:
      "Structures medicine names, brands, generics, strengths, dosage forms, identifiers, jurisdictional categories, and classification context.",
    primaryUsers:
      "Data teams, platform partners, pharmacy operators, health systems, manufacturers, and API customers.",
    deliveredAs:
      "Licensed data products, reference APIs, medicine matching support, jurisdictional classification, and normalization workflows.",
    cta: "Explore MediBase™",
    href: "#",
  },
] as const;

const GOVERNANCE_TAGS = [
  "Privacy thresholds & anonymization",
  "Jurisdiction-aware access",
  "Controlled-medicine safeguards",
  "Role-based permissions",
  "Audit logging & access review",
  "Contractual data scope",
  "Exact-stock suppression by default",
  "No identifiable patient-level outputs",
  "No patient-level commercial targeting",
];

export default function EnterpriseSolutionsStackSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.04 }
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
            <span className="text-[#0F1F4E] opacity-50">01</span>
            <span className="text-[#0F1F4E] opacity-30">·</span>
            Enterprise Intelligence Stack
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Three enterprise layers. One governed platform.
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            A vertical stack — intelligence, API, and identity data — with a
            single governance plane spanning every layer.
          </p>
        </Reveal>

        {/* ── Layer cards ── */}
        <div className="mt-8 flex flex-col gap-4">
          {LAYERS.map((layer, i) => (
            <LayerCard key={layer.number} layer={layer} index={i + 3} active={mounted} />
          ))}
        </div>

        {/* ── Governance plane dark card ── */}
        <Reveal index={7} active={mounted}>
          <div className="mt-4 rounded-2xl bg-[#0F1F4E] p-6">
            {/* Header */}
            <p className="mb-4 flex items-center gap-2 text-[13.5px] font-bold" style={{ color: ACCENT }}>
              <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.2l5.2 2v4.2c0 3.5-2.3 5.9-5.2 6.9C5.1 13.3 2.8 11 2.8 7.4V3.2L8 1.2z"
                  stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              </svg>
              Governance plane — spans every layer
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {GOVERNANCE_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[11.5px] font-medium"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)", backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Disclaimer bar ── */}
        <Reveal index={8} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              ZoikoMeds enterprise products provide medicine availability
              intelligence and infrastructure. They do not provide medical
              advice, prescribing decisions, dispensing approval, patient-level
              targeting, exact public stock exposure, or medicine fulfillment.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LayerCard                                                            */
/* ------------------------------------------------------------------ */
function LayerCard({
  layer,
  index,
  active,
}: {
  layer: typeof LAYERS[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:border-[#9FE3D3] hover:shadow-[0_8px_28px_-14px_rgba(15,170,135,0.15)]">

        {/* Card header row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            {/* Layer badge */}
            <span
              className="flex-shrink-0 self-start rounded-lg px-2.5 py-1 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.12em]"
              style={{ backgroundColor: "#DCF5EE", color: "#0B7A62" }}
            >
              Layer {layer.number}
            </span>

            <div className="min-w-0">
              <h3 className="text-[15px] sm:text-[15.5px] font-bold text-[#0F1F4E] leading-snug">
                {layer.name}
              </h3>

              <p className="mt-1 text-[11px] sm:text-[11.5px] text-[#9AA3B5] leading-relaxed">
                {layer.subtitle}
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={layer.href}
            className="inline-flex w-full sm:w-auto flex-shrink-0 items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
          >
            {layer.cta}
          </Link>
        </div>

        {/* Description */}
        <p className="mt-4 text-[13.5px] leading-relaxed text-[#5B6478]">
          {layer.description}
        </p>

        {/* Two-column metadata */}
        <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#F0F2F7] pt-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA3B5]">
              Primary Users
            </p>
            <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
              {layer.primaryUsers}
            </p>
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9AA3B5]">
              Delivered As
            </p>
            <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
              {layer.deliveredAs}
            </p>
          </div>
        </div>

      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `entStackFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes entStackFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}