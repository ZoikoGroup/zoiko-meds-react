"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const FAQ_ITEMS = [
  {
    id: "what-is-the-patient-portal",
    question: "What is the ZoikoMeds Patient Portal?",
    answer:
      "The ZoikoMeds Patient Portal is a secure account experience where users can save medicine searches, manage availability alerts, review access activity, and control communication preferences.",
  },
  {
    id: "does-zoikomeds-provide-medical-advice",
    question: "Does ZoikoMeds provide medical advice?",
    answer:
      "No. The Patient Portal supports medicine organization and availability alerts only. It does not provide diagnosis, treatment, prescribing, or substitution guidance.",
  },
  {
    id: "is-zoikomeds-an-online-pharmacy",
    question: "Is ZoikoMeds an online pharmacy?",
    answer:
      "No. ZoikoMeds does not sell, prescribe, dispense, or deliver medicine. The portal helps you organize searches and stay informed about availability.",
  },
  {
    id: "can-i-save-medicines",
    question: "Can I save medicines in the Patient Portal?",
    answer:
      "Yes. You can save medicines, dosage forms, locations, and search preferences to a personal watchlist for quick access later.",
  },
  {
    id: "can-i-receive-availability-alerts",
    question: "Can I receive medicine availability alerts?",
    answer:
      "Yes. You can subscribe to email, SMS, or in-app alerts for availability confidence changes and regional access signals.",
  },
  {
    id: "does-the-portal-show-exact-stock",
    question: "Does the Patient Portal show exact pharmacy stock quantities?",
    answer:
      "No. Availability is presented through responsible confidence signals, not unsafe public inventory quantities.",
  },
  {
    id: "can-caregivers-use-the-portal",
    question: "Can caregivers use the Patient Portal?",
    answer:
      "Yes. Caregivers can help organize medicine access for someone else, subject to clear permissions and consent.",
  },
  {
    id: "how-do-i-get-started",
    question: "How do I get started?",
    answer:
      "Create a free ZoikoMeds account and set your first availability alert to begin organizing your medicine access.",
  },
] as const;

export default function PatientPortalFaqSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">10</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Frequently Asked Questions
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Patient Portal questions, </span>
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
        animation: active ? `patientPortalFaqFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalFaqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}