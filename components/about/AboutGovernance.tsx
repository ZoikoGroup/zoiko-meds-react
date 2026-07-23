"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Users,
  Compass,
  Network,
  ShieldPlus,
  Lock,
  User,
  BookOpen,
  ShieldCheck,
  Globe,
  Landmark,
  HeartPulse,
  Accessibility,
  CircleCheck,
  Shield,
  type LucideIcon,
} from "lucide-react";

const TEAL = "#0EA980";
const NAVY = "#0d2636";

interface GovernanceCard {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  tag: string;
}

const CARDS: GovernanceCard[] = [
  {
    icon: Compass,
    iconBg: "#E3F5F1",
    iconColor: "#0EA980",
    title: "Executive & Group Oversight",
    description:
      "Long-term platform direction, organizational accountability, and governance alignment across ZoikoMeds and the wider Zoiko Group.",
    tag: "Executive Oversight",
  },
  {
    icon: Network,
    iconBg: "#E7EEFC",
    iconColor: "#3B6FE0",
    title: "Platform & Security Architecture",
    description:
      "Engineering foundation, zero-trust security, APIs, data pipelines, threat modeling, incident readiness, and enterprise deployment standards.",
    tag: "Engineering & Security Governance",
  },
  {
    icon: ShieldPlus,
    iconBg: "#F1E9FB",
    iconColor: "#8B5CF6",
    title: "Medicine & Pharmacy Governance",
    description:
      "Medicine identity standards, availability-confidence boundaries, controlled-medicine policy, and safe pharmacy participation models.",
    tag: "Medicine Governance",
  },
  {
    icon: Lock,
    iconBg: "#E3F5F1",
    iconColor: "#0F9488",
    title: "Privacy & Compliance",
    description:
      "Privacy controls, consent, auditability, data residency, and the platform's healthcare-adjacent compliance posture — GDPR, UK-GDPR, HIPAA-aware operation, and jurisdictional controls.",
    tag: "Trust & Compliance",
  },
  {
    icon: User,
    iconBg: "#FDF3D9",
    iconColor: "#CA8A04",
    title: "Product & Patient Experience",
    description:
      "Ensures the platform remains clear, accessible (WCAG 2.2 AA), and safe across patient, caregiver, pharmacy, wholesale, and enterprise journeys.",
    tag: "Product Governance",
  },
  {
    icon: Users,
    iconBg: "#E3F5F1",
    iconColor: "#0EA980",
    title: "Ecosystem & Commercial Governance",
    description:
      "Governs how ZoikoMeds engages hospital systems, pharmacies, wholesalers, manufacturers, and public-health bodies — under contract, verification, and jurisdictional controls.",
    tag: "Commercial Governance",
  },
];

interface Standard {
  icon: LucideIcon;
  label: string;
  sub: string;
}

const STANDARDS: Standard[] = [
  { icon: Globe, label: "GDPR", sub: "EU Data Protection" },
  { icon: Landmark, label: "UK-GDPR", sub: "UK Data Protection" },
  { icon: HeartPulse, label: "HIPAA-Aware", sub: "Architecture" },
  { icon: Accessibility, label: "WCAG 2.2 AA", sub: "Accessibility" },
  { icon: ShieldCheck, label: "NIST 800-63B", sub: "Authentication" },
  { icon: CircleCheck, label: "SOC 2 Type II", sub: "In Progress" },
];

export default function AboutGovernance() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24">
      <style>{`
        @keyframes govFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gov-animate { animation: govFadeUp 0.6s cubic-bezier(.22,.68,0,1.2) both; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* ── HEADER ROW ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-10">
          {/* Left: eyebrow + heading + copy */}
          <div className={isVisible ? "gov-animate" : "opacity-0"}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-6 h-[3px] rounded-full" style={{ backgroundColor: TEAL }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: TEAL }}>
                Leadership &amp; Oversight
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold leading-tight mb-4" style={{ color: NAVY }}>
              Accountable by design.
            </h2>
            <p className="text-[#4a6070] text-sm sm:text-[15px] leading-relaxed mb-3 max-w-md">
              ZoikoMeds is governed through defined oversight functions — each with clear
              accountability for how the platform is built, protected, and commercialized.
            </p>
            <p className="text-[#4a6070] text-sm sm:text-[15px] leading-relaxed max-w-md">
              Every function below is anchored to published standards in the ZoikoMeds{" "}
              <Link href="/trust-center" className="font-semibold" style={{ color: TEAL }}>
                Trust Center.
              </Link>
            </p>
          </div>

          {/* Right: Stage 1 callout */}
          <div className={isVisible ? "gov-animate" : "opacity-0"} style={{ animationDelay: "80ms" }}>
            <div className="flex items-start gap-4">
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0"
                style={{ backgroundColor: "#E3F5F1", color: TEAL }}
              >
                <Users size={20} strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold leading-snug" style={{ color: NAVY }}>
                  Stage 1 → Position-based governance.
                </h3>
                <p className="mt-2 text-[#4a6070] text-sm leading-relaxed">
                  We&apos;re building ZoikoMeds with a disciplined governance model. Names and
                  advisors will be added when formally appointed and consented.
                </p>
              </div>
            </div>
            <div
              className="mt-4 rounded-xl px-4 py-3 text-[13px] leading-relaxed"
              style={{ backgroundColor: "#E3F5F1", color: "#0d3b30" }}
            >
              <span className="font-bold">Stage 2 Trigger:</span> Activated when (a) first
              enterprise contract is signed, (b) advisory appointments are contracted, or (c)
              institutional funding begins — whichever comes first.
            </div>
          </div>
        </div>

        {/* ── GOVERNANCE FUNCTION CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`rounded-2xl border border-[#ECEEF3] bg-white p-6 ${isVisible ? "gov-animate" : "opacity-0"}`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="text-[15px] font-bold leading-snug mb-2" style={{ color: NAVY }}>
                  {idx + 1}. {card.title}
                </h3>
                <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4">
                  {card.description}
                </p>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
                  style={{ backgroundColor: `${TEAL}10`, border: `1px solid ${TEAL}55`, color: TEAL }}
                >
                  {card.tag}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── STANDARDS ROW ── */}
        <div className="mt-8 rounded-2xl border border-[#ECEEF3] bg-white p-6 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-start gap-3 lg:max-w-[220px] flex-shrink-0">
            <span className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0" style={{ backgroundColor: "#E3F5F1", color: TEAL }}>
              <Shield size={16} strokeWidth={2} />
            </span>
            <div>
              <p className="text-[13px] font-bold leading-snug" style={{ color: NAVY }}>
                Standards we operate against
              </p>
              <p className="mt-1 text-[12px] text-[#8a93a3] leading-relaxed">
                Our governance is built on globally recognized standards and best-practice
                frameworks.
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-[#ECEEF3] flex-shrink-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 flex-1">
            {STANDARDS.map((std) => {
              const Icon = std.icon;
              return (
                <div key={std.label} className="flex items-center gap-2">
                  <Icon size={18} strokeWidth={1.8} style={{ color: NAVY }} className="flex-shrink-0" />
                  <div className="leading-tight">
                    <p className="text-[12px] font-bold" style={{ color: NAVY }}>{std.label}</p>
                    <p className="text-[10.5px] text-[#9aa3b0]">{std.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BOTTOM CTA BANNER ── */}
        <div className="mt-8 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center gap-8" style={{ backgroundColor: "#EAF1FE" }}>
          <span
            className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #6aa8ff 0%, #3B6FE0 100%)", color: "white" }}
          >
            <Lock size={28} strokeWidth={2} />
          </span>

          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-extrabold" style={{ color: NAVY }}>
              Governance in detail.
            </h3>
            <p className="mt-2 text-sm text-[#4a6070] leading-relaxed max-w-xl">
              Enterprise, wholesale, and public-sector partners can review our full governance,
              security, and privacy posture — or request a review through the existing
              enterprise pathway.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/trust-center"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ backgroundColor: TEAL }}
            >
              <BookOpen size={16} />
              Visit the Trust Center
            </Link>
            <Link
              href="/security-review"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold whitespace-nowrap border-2 bg-white transition-colors hover:bg-[#F0F4FF]"
              style={{ color: NAVY, borderColor: "#dfe6f5" }}
            >
              <ShieldCheck size={16} />
              Request Security &amp; Procurement Review
            </Link>
          </div>
        </div>

        {/* ── FOOTER LINE ── */}
        <div className="mt-8 pt-6 border-t border-[#ECEEF3] flex items-center justify-center gap-2 text-center">
          <Shield size={14} style={{ color: TEAL }} className="flex-shrink-0" />
          <p className="text-[12.5px] text-[#8a93a3]">
            Governed for patient safety, data trust, medicine availability integrity, and
            responsible healthcare intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
