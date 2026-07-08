"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const FAQ_ITEMS = [
  {
    id: "what-is-zoikomeds-for-hospital-systems",
    question: "What is ZoikoMeds for hospital systems?",
    answer:
      "ZoikoMeds is a medicine availability intelligence platform that helps hospital systems monitor medicine availability signals, shortage risk indicators, pharmacy network activity, and regional access patterns across facilities and markets.",
  },
  {
    id: "does-zoikomeds-replace-hospital-pharmacy-systems",
    question: "Does ZoikoMeds replace hospital pharmacy systems?",
    answer:
      "No. ZoikoMeds does not replace pharmacy or inventory management systems. It adds a layer of access intelligence and reporting on top of your existing infrastructure.",
  },
  {
    id: "does-zoikomeds-dispense-or-deliver-medicine",
    question: "Does ZoikoMeds dispense or deliver medicine?",
    answer:
      "No. ZoikoMeds does not sell, prescribe, dispense, or deliver medicine. It supports visibility, coordination, and reporting only.",
  },
  {
    id: "does-zoikomeds-provide-medical-advice",
    question: "Does ZoikoMeds provide medical advice?",
    answer:
      "No. All outputs are operational and non-clinical. ZoikoMeds does not provide diagnosis, treatment, prescribing, or substitution guidance.",
  },
  {
    id: "how-does-zoikomeds-handle-medicine-availability-visibility",
    question: "How does ZoikoMeds handle medicine availability visibility?",
    answer:
      "Availability is presented through confidence-based signals and tiers rather than exact inventory counts, so unauthorized users never see precise stock quantities.",
  },
  {
    id: "can-zoikomeds-support-multi-site-hospital-deployments",
    question: "Can ZoikoMeds support multi-site hospital deployments?",
    answer:
      "Yes. ZoikoMeds supports role-based access, facility and region views, SSO, and audit trails across multi-site hospital systems and health networks.",
  },
  {
    id: "can-zoikomeds-integrate-with-enterprise-systems",
    question: "Can ZoikoMeds integrate with enterprise systems?",
    answer:
      "Yes. Approved API pathways support integration with hospital operations, BI, and reporting workflows through a controlled, governed process.",
  },
  {
    id: "how-should-a-hospital-system-get-started",
    question: "How should a hospital system get started?",
    answer:
      "Request an enterprise briefing so our team can review your use cases, deployment scope, security requirements, and reporting objectives.",
  },
] as const;

export default function HospitalSystemsFaqSection() {
  const [mounted, setMounted] = useState(false);
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">12</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Hospital-system questions, </span>
            <span style={{ color: ACCENT }}>answered.</span>
          </h2>
        </Reveal>

        {/* ── Accordion ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white lg:mt-12"
            style={{ borderColor: "#E7EAF1" }}
          >
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={i !== 0 ? "border-t" : ""}
                  style={{ borderColor: "#ECEFF5" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[14.5px] font-bold text-[#0F1F4E]">
                      {item.question}
                    </span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-4 w-4 flex-shrink-0 transition-transform duration-200"
                      style={{ color: ACCENT }}
                    >
                      {isOpen ? (
                        <path
                          d="M4 4l8 8M12 4l-8 8"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      ) : (
                        <path
                          d="M8 3.5v9M3.5 8h9"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      )}
                    </svg>
                  </button>

                  <div
                    className="overflow-hidden transition-all duration-300 ease-out"
                    style={{
                      maxHeight: isOpen ? "200px" : "0px",
                    }}
                  >
                    <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#5B6478]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
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
        animation: active ? `hospitalSystemsFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}