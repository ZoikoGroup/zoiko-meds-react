"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const COORDINATION_POINTS = [
  {
    id: "permission-based",
    title: "Permission-based visibility",
    description:
      "Track appointments for a dependent or family member only where access is granted.",
  },
  {
    id: "shared-reminders",
    title: "Shared reminders",
    description: "Caregivers can help keep visit and follow-up reminders on track.",
  },
  {
    id: "roles-approval",
    title: "Roles & approval",
    description:
      "Owner, viewer, and coordinator roles keep access appropriate and reversible.",
  },
  {
    id: "privacy-respecting",
    title: "Privacy-respecting",
    description: "Access is consent-based and scoped, never unrestricted or automatic.",
  },
];

const SHARED_MEMBERS = [
  {
    id: "account-holder",
    initials: "AH",
    name: "Account holder",
    description: "You - Full access",
    role: "Owner",
    roleColor: "#13A594",
  },
  {
    id: "family-coordinator",
    initials: "JR",
    name: "Family coordinator",
    description: "View visits & reminders",
    role: "Viewer",
    roleColor: "#13A594",
  },
];

export default function AppointmentsCaregiverFamilyCoordinationSection() {
  const [mounted, setMounted] = useState(false);
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
            <span className="opacity-50 text-[#0F1F4E]">07</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Caregiver &amp; Family Coordination
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Help a loved one </span>
            <span style={{ color: ACCENT }}>stay on schedule.</span>
          </h2>
        </Reveal>

        {/* ── Content grid ── */}
        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:mt-12 lg:grid-cols-[1fr_1.15fr] lg:gap-10">

          {/* ── Left: Coordination points ── */}
          <div className="space-y-4">
            {COORDINATION_POINTS.map((point, i) => (
              <Reveal key={point.id} index={2 + i} active={mounted}>
                <div className="flex gap-3.5">
                  <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                      <path
                        d="M3 8.5l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[13.5px] font-bold text-[#0F1F4E]">{point.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Right: Shared access card ── */}
          <Reveal index={6} active={mounted}>
            <div
              className="rounded-2xl border p-6 sm:p-7"
              style={{
                backgroundColor: "#0B1530",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Header */}
              <div className="mb-6 flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-5 w-5"
                  style={{ color: ACCENT }}
                >
                  <path
                    d="M5 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                  <path
                    d="M2 14c0-2.8 2.2-4.5 6-4.5s6 1.7 6 4.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                  />
                </svg>
                <h3 className="text-[14px] font-bold text-white">Shared access</h3>
              </div>

              {/* Members list */}
              <div className="space-y-4">
                {SHARED_MEMBERS.map((member) => (
                  <div key={member.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                        style={{
                          backgroundColor: "rgba(19,165,148,0.2)",
                        }}
                      >
                        {member.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-white">{member.name}</p>
                        <p className="text-[12px] text-[#AEB6C9]">{member.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="rounded-lg border px-3 py-1.5 text-[11.5px] font-semibold whitespace-nowrap transition-colors duration-200 ease-out hover:bg-white/[0.08]"
                      style={{ borderColor: member.roleColor, color: member.roleColor }}
                    >
                      {member.role}
                    </button>
                  </div>
                ))}

                {/* Divider */}
                <div
                  className="my-4 h-px"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                />

                {/* Invite caregiver */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 rounded-lg p-3 transition-colors duration-200 ease-out hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(19,165,148,0.2)", color: ACCENT }}
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                        <path
                          d="M8 3v10M3 8h10"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-bold text-white">Invite a caregiver</p>
                      <p className="text-[12px] text-[#AEB6C9]">
                        Consent-based, scoped access
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg border px-3 py-1.5 text-[11.5px] font-semibold whitespace-nowrap transition-colors duration-200 ease-out hover:bg-white/[0.08]"
                    style={{ borderColor: ACCENT, color: ACCENT }}
                  >
                    Invite
                  </button>
                </button>
              </div>
            </div>
          </Reveal>

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
        animation: active ? `appointmentsCaregiverFamilyFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes appointmentsCaregiverFamilyFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}