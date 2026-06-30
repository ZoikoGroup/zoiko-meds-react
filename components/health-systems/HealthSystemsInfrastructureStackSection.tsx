"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const LAYERS = [
  {
    badge: "Layer 1",
    badgeStyle: "teal" as const,
    name: "ZoikoSignal™ Intelligence",
    description:
      "Aggregated, anonymized access-risk, shortage pressure, demand movement, and signal coverage intelligence.",
    users: "Pharmacy leadership, population health, strategy, access teams, public-health liaison teams.",
    delivery: "Dashboards, reports, signal feeds, executive briefings.",
    cta: "Explore ZoikoSignal™",
    href: "#",
    dark: false,
  },
  {
    badge: "Layer 2",
    badgeStyle: "teal" as const,
    name: "ZoikoAvail™ API",
    description:
      "Confidence-based medicine availability signals, freshness metadata, confirmation-aware outputs, and integration support.",
    users: "Digital front door, patient portal, telehealth, integration, and care navigation teams.",
    delivery: "REST APIs, event feeds where supported, workflow endpoints, API evaluation.",
    cta: "Discuss ZoikoAvail™ API",
    href: "#",
    dark: false,
  },
  {
    badge: "Layer 3",
    badgeStyle: "teal" as const,
    name: "MediBase™ Data",
    description:
      "Medicine identity normalization across brand, generic, strength, form, identifiers, and jurisdictional classification context.",
    users: "Data teams, pharmacy informatics, enterprise architecture, digital product teams.",
    delivery: "Licensed data products, reference APIs, normalization workflows.",
    cta: "Explore MediBase™",
    href: "#",
    dark: false,
  },
  {
    badge: "Layer 4",
    badgeStyle: "teal" as const,
    name: "Care-Team Workflow Layer",
    description:
      "Patient-safe guidance for discharge, care navigation, saved searches, alerts, caregiver handoff, and pharmacy confirmation.",
    users: "Discharge teams, care coordinators, patient navigators, clinic administrators.",
    delivery: "Guidance templates, workflow briefings, role-based access where built.",
    cta: "Explore Care Team Workflows",
    href: "#",
    dark: false,
  },
  {
    badge: "Plane",
    badgeStyle: "dark" as const,
    name: "Governance Plane",
    description:
      "Privacy thresholds, exact-stock suppression, access controls, auditability, jurisdiction rules, and contract-scoped outputs.",
    users: "Legal, compliance, privacy, security, procurement, enterprise governance teams.",
    delivery: "Trust center materials, security pack, data governance review, MSA governance.",
    cta: "View Signal Governance",
    href: "#",
    dark: true,
  },
] as const;

export default function HealthSystemsInfrastructureStackSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Infrastructure Stack
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[1.85rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
            One governed stack for health-system
          </h2>
        </Reveal>
        <Reveal index={2} active={mounted}>
          <p className="text-[1.85rem] font-extrabold leading-tight sm:text-[2.1rem]" style={{ color: ACCENT }}>
            availability workflows.
          </p>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={3} active={mounted}>
          <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-[#5B6478]">
            Enterprise components mapped to health-system needs — governed
            infrastructure, not isolated products.
          </p>
        </Reveal>

        {/* ── Stacked layer card ── */}
        <Reveal index={4} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            {LAYERS.map((layer, i) => (
              <LayerRow key={layer.name} layer={layer} isLast={i === LAYERS.length - 1} />
            ))}
          </div>
        </Reveal>

        {/* ── Disclaimer bar (amber) ── */}
        <Reveal index={5} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B82F6] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
              Stack rules: not an EHR, CPOE, e-prescribing, clinical decision
              support, medication administration, refill, adherence, or
              dispensing platform. No claimed live integrations,
              certifications, customers, or outcome metrics unless verified and
              approved. No exact public stock, patient-level behavior,
              pharmacy-sensitive data, or internal signal formulas. Confidence
              signals are not clinical, treatment, or dispensing confidence.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LayerRow                                                             */
/* ------------------------------------------------------------------ */
function LayerRow({
  layer,
  isLast,
}: {
  layer: typeof LAYERS[number];
  isLast: boolean;
}) {
  const isDark = layer.dark;

  return (
    <div
      className={`px-6 py-5 sm:px-7 sm:py-6 ${!isLast ? "border-b" : ""}`}
      style={{
        backgroundColor: isDark ? "#0F1F4E" : "white",
        borderColor: "#F0F2F7",
      }}
    >
      {/* Header row: badge + name + CTA */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex-shrink-0 rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em]"
            style={
              isDark
                ? { backgroundColor: "rgba(15,170,135,0.2)", color: "#6EE7D0" }
                : { backgroundColor: "#DCF5EE", color: "#0B7A62" }
            }
          >
            {layer.badge}
          </span>
          <h3 className="text-[14.5px] font-bold" style={{ color: isDark ? "white" : "#0F1F4E" }}>
            {layer.name}
          </h3>
        </div>

        <Link
          href={layer.href}
          className="flex-shrink-0 inline-flex items-center justify-center rounded-lg border px-3.5 py-1.5 text-[11.5px] font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
          style={
            isDark
              ? { borderColor: "rgba(255,255,255,0.2)", color: "white" }
              : { borderColor: "#D0D5E2", color: "#0F1F4E", backgroundColor: "white" }
          }
        >
          {layer.cta}
        </Link>
      </div>

      {/* Description */}
      <p
        className="mt-3 max-w-2xl text-[12.5px] leading-relaxed"
        style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#5B6478" }}
      >
        {layer.description}
      </p>

      {/* Two-column metadata */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <p
            className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: isDark ? "rgba(255,255,255,0.35)" : "#9AA3B5" }}
          >
            Health-System Users
          </p>
          <p
            className="text-[11.5px] leading-relaxed"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "#5B6478" }}
          >
            {layer.users}
          </p>
        </div>
        <div>
          <p
            className="mb-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: isDark ? "rgba(255,255,255,0.35)" : "#9AA3B5" }}
          >
            Delivery Model
          </p>
          <p
            className="text-[11.5px] leading-relaxed"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "#5B6478" }}
          >
            {layer.delivery}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsStackFadeUp 0.6s ease-out ${index * 100}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsStackFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}