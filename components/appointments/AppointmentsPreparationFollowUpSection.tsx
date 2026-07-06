"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const PREPARATION_ITEMS = [
  {
    id: "confirm-date-time",
    label: "Confirm date & time",
    completed: true,
  },
  {
    id: "review-medication",
    label: "Review medication list",
    completed: true,
  },
  {
    id: "add-questions",
    label: "Add questions for provider",
    completed: false,
  },
  {
    id: "upload-forms",
    label: "Upload forms",
    completed: false,
  },
  {
    id: "check-location",
    label: "Check location & travel time",
    completed: false,
  },
  {
    id: "insurance-details",
    label: "Add insurance details",
    completed: false,
  },
  {
    id: "travel-reminder",
    label: "Set travel reminder",
    completed: false,
  },
];

const FOLLOWUP_ACTIONS = [
  {
    id: "lab-reminder",
    title: "Lab reminder",
    description: "Track lab-work follow-ups and results-review reminders after your visit.",
    cta: "Set lab reminder",
    icon: (
      <path
        d="M4.5 2.5h7v11h-7v-11zM6 5h4M6 7.2h4M6 9.4h2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "prescription-review",
    title: "Prescription review",
    description: "Link visit outcomes to your medication list for easy review.",
    cta: "View prescriptions",
    icon: (
      <path
        d="M8 2l5 2.2v3.3c0 3.3-2.1 5.7-5 6.5-2.9-.8-5-3.2-5-6.5V4.2L8 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "next-visit",
    title: "Next visit",
    description: "Schedule or request a follow-up appointment while it's top of mind.",
    cta: "Book next visit",
    icon: (
      <path
        d="M4 5.5h8M4 9h8M4 12.5h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "message-support",
    title: "Message support",
    description:
      "Get help with account access, appointment changes, or reminders — not clinical advice.",
    cta: "Contact support",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
];

export default function AppointmentsPreparationFollowUpSection() {
  const [mounted, setMounted] = useState(false);
  const [completedItems, setCompletedItems] = useState<string[]>(
    PREPARATION_ITEMS.filter((item) => item.completed).map((item) => item.id)
  );
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

  const completedCount = completedItems.length;
  const totalCount = PREPARATION_ITEMS.length;

  const handleToggleItem = (itemId: string) => {
    setCompletedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Preparation &amp; Follow-up
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Arrive ready; </span>
            <span style={{ color: ACCENT }}>leave with a plan.</span>
          </h2>
        </Reveal>

        {/* ── Content grid ── */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:mt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-10">

          {/* ── Left: Preparation checklist ── */}
          <Reveal index={2} active={mounted}>
            <div
              className="rounded-2xl border bg-white p-6 sm:p-7"
              style={{
                borderColor: "#E7EAF1",
                boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
              }}
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">Visit preparation</h3>
                <span
                  className="inline-flex items-center text-[12.5px] font-bold"
                  style={{ color: ACCENT }}
                >
                  {completedCount} / {totalCount} done
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-6 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "#E7EAF1" }}>
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    backgroundColor: ACCENT,
                    width: `${(completedCount / totalCount) * 100}%`,
                  }}
                />
              </div>

              {/* Checklist items */}
              <div className="space-y-3">
                {PREPARATION_ITEMS.map((item) => {
                  const isChecked = completedItems.includes(item.id);
                  return (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 ease-out hover:bg-[#FAFBFD]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleItem(item.id)}
                        className="h-5 w-5 rounded border-[#D7DCE6] accent-[#13A594]"
                      />
                      <span
                        className={`text-[13px] transition-all duration-200 ${
                          isChecked
                            ? "line-through text-[#A6ADBD]"
                            : "text-[#0F1F4E] font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* ── Right: Follow-up action cards ── */}
          <div className="space-y-4">
            {FOLLOWUP_ACTIONS.map((action, i) => (
              <Reveal key={action.id} index={3 + i} active={mounted}>
                <div
                  className="flex flex-col rounded-2xl border bg-white p-5 sm:flex-row sm:items-start sm:gap-4 sm:p-6"
                  style={{
                    borderColor: "#E7EAF1",
                    boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:mb-0"
                    style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5">
                      {action.icon}
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-[#0F1F4E]">{action.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
                      {action.description}
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-flex items-center text-[13px] font-semibold hover:underline"
                      style={{ color: ACCENT }}
                    >
                      {action.cta} →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>

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
        animation: active ? `appointmentsPreparationFollowUpFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes appointmentsPreparationFollowUpFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}