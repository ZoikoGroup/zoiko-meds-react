"use client";

import { useEffect, useRef, useState } from "react";
import { appUrl } from "@/lib/config";

/**
 * AppointmentsHeroSection
 * "Schedule, Track, and Prepare for Healthcare Appointments in One
 *  Secure Place."
 *
 * Layout: light section, 2-column grid — left: eyebrow, 3-line
 *         headline (black + teal), paragraph, CTA buttons, create
 *         account link, compliance footnote. Right: full-bleed image.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

// Replace with your actual image path (e.g. an import from /public, or a full URL).
const HERO_IMAGE_SRC = "/images/appointments-hero.webp";

export default function AppointmentsHeroSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">

          {/* ── Left: copy ── */}
          <div>
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Patients
                <span className="opacity-40">·</span>
                Appointments
              </p>
            </Reveal>

            <Reveal index={1} active={mounted}>
              <h1 className="text-[2rem] font-extrabold leading-[1.15] sm:text-[2.5rem]" style={{ color: NAVY }}>
                Schedule, Track, and Prepare for Healthcare Appointments in{" "}
                <span style={{ color: ACCENT }}>One Secure Place</span>
              </h1>
            </Reveal>

            <Reveal index={2} active={mounted}>
              <p className="mt-5 max-w-xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                ZoikoMeds helps patients manage upcoming healthcare visits, appointment
                reminders, provider details, preparation tasks, calendar sync, and follow-up
                actions through a secure patient experience.
              </p>
            </Reveal>

            <Reveal index={3} active={mounted}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#schedule-an-appointment"
                  className="rounded-xl px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  Schedule an Appointment
                </a>
                <a
                  href={appUrl("/login")}
                  className="rounded-xl border px-6 py-3 text-center text-[13.5px] font-semibold transition-colors hover:bg-black/[0.03]"
                  style={{ borderColor: `${NAVY}26`, color: NAVY }}
                >
                  Sign In
                </a>
              </div>
            </Reveal>

            <Reveal index={4} active={mounted}>
              <a
                href="/create-account"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
                style={{ color: ACCENT }}
              >
                Create Free Account
                <ArrowRightIcon />
              </a>
            </Reveal>

            <Reveal index={5} active={mounted}>
              <p
                className="mt-6 flex items-start gap-1.5 text-[12px] leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                <PinIcon />
                ZoikoMeds supports appointment coordination and patient visibility. It is not
                an emergency service and does not provide medical advice.
              </p>
            </Reveal>
          </div>

          {/* ── Right: image ── */}
          <Reveal index={2} active={mounted}>
            <img
              src={HERO_IMAGE_SRC}
              alt="ZoikoMeds appointment scheduling and tracking dashboard"
              className="w-full rounded-3xl object-cover"
            />
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `appointmentsHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes appointmentsHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}