"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const FAQS = [
  {
    id: "systems-integrate",
    question: "What systems can ZoikoMeds integrate with?",
    answer:
      "ZoikoMeds should support approved integrations with healthcare, pharmacy, wholesale, distribution, analytics, reporting, identity, compliance, and partner systems where appropriate.",
  },
  {
    id: "api-offering",
    question: "Does ZoikoMeds offer an API?",
    answer:
      "Yes. ZoikoMeds provides secure APIs for approved enterprise and partner integrations, including role-based access, scoped credentials, and documented endpoints.",
  },
  {
    id: "pharmacy-integration",
    question: "Can pharmacies integrate with ZoikoMeds?",
    answer:
      "Yes. Pharmacies can participate in availability reporting, confirmation workflows, and network signal strength through approved integration pathways.",
  },
  {
    id: "exact-inventory",
    question: "Does ZoikoMeds expose exact pharmacy inventory quantities?",
    answer:
      "No. ZoikoMeds uses confidence-based availability signals and does not expose exact inventory quantities to unauthorized users or systems.",
  },
  {
    id: "online-pharmacy",
    question: "Is ZoikoMeds an online pharmacy?",
    answer:
      "No. ZoikoMeds is medicine availability infrastructure. We do not sell, prescribe, dispense, deliver, or provide medical advice.",
  },
  {
    id: "identity-integration",
    question: "Can ZoikoMeds integrate with identity providers?",
    answer:
      "Yes. ZoikoMeds supports SSO, role-based access, enterprise authentication, and identity management integrations with approved providers.",
  },
  {
    id: "integration-security",
    question: "How does ZoikoMeds handle integration security?",
    answer:
      "ZoikoMeds uses secure APIs with scoped credentials, encrypted transmission, role-based access controls, audit logging, and compliance-conscious data minimization for all integrations.",
  },
  {
    id: "start-integration",
    question: "How can an organization start an integration project?",
    answer:
      "Organizations can request an integration briefing to discuss systems, objectives, timeline, and next steps. A ZoikoMeds representative will review requirements and route the project to the appropriate team.",
  },
] as const;

export default function IntegrationsFAQSection() {
  const [mounted, setMounted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id);
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>12</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Integration questions,{" "}
            <span style={{ color: ACCENT }}>answered.</span>
          </h2>
        </Reveal>

        {/* ── Accordion ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-9 overflow-hidden rounded-2xl border border-black/5 bg-white"
            style={{ boxShadow: "0 1px 2px rgba(15,31,78,0.04)" }}
          >
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                isFirst={i === 0}
                onToggle={() => setOpenId((prev) => (prev === faq.id ? null : faq.id))}
              />
            ))}
          </div>
        </Reveal>

        {/* ── CTA buttons ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
            onClick={()=>router.push("#request-an-integration-briefing")}
              type="button"
              className="rounded-lg px-5 py-3 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(19,165,148,0.3)]"
              style={{ backgroundColor: ACCENT }}
            >
              Request an Integration Briefing
            </button>
            <button
              type="button"
              className="rounded-lg border px-5 py-3 text-[14px] font-bold transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-[#13A594] hover:text-[#13A594]"
              style={{ borderColor: "#E7EAF1", color: NAVY }}
            >
              Talk to Sales
            </button>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQItem                                                            */
/* ------------------------------------------------------------------ */
function FAQItem({
  faq,
  isOpen,
  isFirst,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  isOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ borderTop: isFirst ? "none" : "1px solid #E7EAF1" }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ease-out hover:bg-[#FAFBFD] sm:px-7 sm:py-6"
      >
        <span
          className="text-[14px] font-bold transition-colors duration-200"
          style={{ color: isOpen ? "#13A594" : "#0F1F4E" }}
        >
          {faq.question}
        </span>
        <span
          className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          style={{ color: "#13A594" }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path
              d="M8 3v10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{
                transformOrigin: "8px 8px",
                transition: "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
            <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Grid-based height animation */}
      <div
        className="grid transition-[grid-template-rows] duration-[350ms] ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p
            className="px-6 pb-5 text-[13.5px] leading-relaxed transition-opacity duration-300 ease-out sm:px-7 sm:pb-6"
            style={{
              color: "#5B6478",
              opacity: isOpen ? 1 : 0,
              transitionDelay: isOpen ? "100ms" : "0ms",
            }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
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
        animation: active ? `integrationsFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}