"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const AI_DISCLOSURES = [
  {
    title: "AI assistant, not medical advice",
    description: "Zoi is a medicine availability assistant, not a medical practitioner or clinical decision-support system. It does not diagnose, treat, prescribe, or recommend medicines.",
    icon: "info",
  },
  {
    title: "Confidence-based signals",
    description: "Availability cards reflect statistical confidence derived from pharmacy-reported data, not live stock audits. Always confirm directly with the pharmacy before visiting.",
    icon: "chart",
  },
  {
    title: "Guardrail enforcement",
    description: "When queries touch on medical advice, drug interactions, dosages, or clinical guidance, Zoi refuses to answer and directs the user to consult their pharmacist or doctor.",
    icon: "shield",
  },
  {
    title: "Human escalation",
    description: "Users can request to speak with a human team member at any time. Escalation requests with contact consent are logged and routed to the appropriate team within one business day.",
    icon: "person",
  },
  {
    title: "No permanent identity",
    description: "The Zoi assistant does not create or store persistent user profiles. Conversations are ephemeral unless explicitly escalated with consent.",
    icon: "eye-off",
  },
  {
    title: "Transparent, not autonomous",
    description: "Zoi operates within defined boundaries — medicine search, platform guidance, and support triage — and does not make autonomous decisions beyond its programmed scope.",
    icon: "sliders",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  info: (
    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
  ),
  chart: (
    <>
      <rect x="2" y="10" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="6.5" y="6" width="3" height="8" rx="0.5" fill="currentColor" />
      <rect x="11" y="2" width="3" height="12" rx="0.5" fill="currentColor" />
    </>
  ),
  shield: (
    <path d="M8 1.5l6 3v3.5c0 4-3 7-6 8-3-1-6-4-6-8V4.5l6-3z" stroke="currentColor" strokeWidth="1.4" fill="none" />
  ),
  person: (
    <path d="M8 8.5a3 3 0 100-6 3 3 0 000 6zm-6 6c0-3 2.5-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  ),
  "eye-off": (
    <>
      <path d="M8 4.5c-3 0-5.5 1.5-7 3.5 1.5 2 4 3.5 7 3.5s5.5-1.5 7-3.5c-1.5-2-4-3.5-7-3.5z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  sliders: (
    <>
      <line x1="4" y1="2" x2="4" y2="7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="4" y1="9" x2="4" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="4" cy="8" r="1" fill="currentColor" />
      <line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="7" x2="8" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="6" r="1" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
    </>
  ),
};

export default function TrustCenterAISection() {
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
    <section ref={ref} className="relative w-full bg-white py-20 sm:py-24" id="zoi-ai">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">08</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            AI Assistant
          </p>
        </Reveal>

        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.4rem]">
            <span className="text-[#0F1F4E]">How the Zoi AI assistant </span>
            <span style={{ color: ACCENT }}>operates.</span>
          </h2>
        </Reveal>

        <Reveal index={2} active={mounted}>
          <p className="mt-5 max-w-3xl text-[14.5px] leading-relaxed text-[#374151]">
            Zoi is the ZoikoMeds AI assistant that helps users find medicine availability information,
            navigate platform features, and connect with support. It is designed with clear operational
            boundaries, medical-advice guardrails, and a transparent escalation path to human support.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AI_DISCLOSURES.map((item, i) => (
            <Reveal key={item.title} index={3 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.1)" }}
                >
                  <svg className="h-4 w-4" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                    {ICONS[item.icon]}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustAIFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustAIFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
