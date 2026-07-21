"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * PharmacyPortalHeroSection
 * First section of the "Pharmacy Portal" page — left copy column with
 * two CTAs, a network link, and a note bar; right column shows a live
 * "Pharmacy Portal" status card.
 *
 * Brand accent for this page: #0FAA87 (teal-green), used in place of
 * the #00A99D used elsewhere — keep this exact hex across the page.
 */

const ACCENT = "#0FAA87";

const PORTAL_ROWS = [
  { label: "Pharmacy profile", value: "Complete", tone: "green" },
  { label: "Availability signals", value: "On", tone: "green" },
  { label: "Confirmation queue", value: "Open", tone: "blue" },
  { label: "Data controls", value: "Protected", tone: "muted", icon: "lock" },
  { label: "Audit activity", value: "On", tone: "green" },
  { label: "Support", value: "Available", tone: "blue" },
] as const;

export default function PharmacyPortalHeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-20 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---------------- Left column ---------------- */}
        <div>
          {mounted ? (
            <div className="flex flex-col gap-5">
              <Reveal index={0}>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: ACCENT }}
                >
                  Pharmacy Portal
                </span>
              </Reveal>

              <Reveal index={1}>
                <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[35px]">
                  Control your pharmacy
                  <br />
                  <span style={{ color: ACCENT }}>
                    availability presence from one
                  </span>
                  <br />
                  <span style={{ color: ACCENT }}>secure portal.</span>
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                  Verified pharmacies use the ZoikoMeds Pharmacy Portal to
                  manage profiles, confidence-based availability signal
                  settings, confirmation requests, branch controls, data
                  preferences, integrations, and support — while protecting
                  exact public stock quantities and pharmacist judgment.
                </p>
              </Reveal>

              <Reveal index={3}>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                  onClick={()=>router.push("#")}
                    type="button"
                    className="group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                    style={{
                      backgroundColor: ACCENT,
                      boxShadow: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 8px 24px -4px rgba(15,170,135,0.45)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                    <span className="relative">Sign In to Pharmacy Portal</span>
                  </button>

                  <button
                  onClick={()=>router.push("#claim-your-pharmacy")}
                    type="button"
                    className="rounded-xl cursor-pointer border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                  >
                    Claim Your Pharmacy
                  </button>
                </div>
              </Reveal>

              <Reveal index={4}>
                <a
                  href="#"
                  className="inline-flex items-center text-[13.5px] font-semibold transition-colors duration-200"
                  style={{ color: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0C8A6E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                >
                  Join the Verified Network
                </a>
              </Reveal>

              <Reveal index={5}>
                <div className="mt-1 flex max-w-lg items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-4">
                  <span
                    className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none">
                      <rect x="4.5" y="9" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                  <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
                    Portal access is available only to verified pharmacy
                    users and approved pharmacy organizations.
                  </p>
                </div>
              </Reveal>
            </div>
          ) : (
            <LeftSkeleton />
          )}
        </div>

        {/* ---------------- Right column: portal status card ---------------- */}
        <div>
          {mounted ? <PortalCard /> : <CardSkeleton />}
          {mounted && (
            <p
              className="mt-3 animate-[pharmacyPortalFadeUp_0.5s_ease-out_forwards] text-center text-[11.5px] leading-relaxed text-[#9AA3B5]"
              style={{ opacity: 0, animationDelay: "900ms" }}
            >
              Illustrative interface. Portal actions, visibility settings,
              and data controls are governed by verification, role
              permissions, platform rules, and applicable terms.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                   */
/* ----------------------------------------------------------------- */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[pharmacyPortalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyPortalFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Portal status card                                                 */
/* ----------------------------------------------------------------- */
function PortalCard() {
  return (
    <div
      className="animate-[pharmacyPortalFadeUp_0.65s_ease-out_forwards] overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.18)] transition-shadow duration-300 hover:shadow-[0_20px_48px_-16px_rgba(15,31,78,0.24)]"
      style={{ opacity: 0, animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">
          Pharmacy Portal
        </h3>
        <Pill tone="green" icon="check">
          Verified
        </Pill>
      </div>

      {PORTAL_ROWS.map((row, i) => (
        <div
          key={row.label}
          className="group flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 transition-colors duration-200 last:border-b-0 hover:bg-[#F7F9FC]"
          style={{
            animation: "pharmacyPortalFadeUp 0.5s ease-out forwards",
            opacity: 0,
            animationDelay: `${250 + i * 70}ms`,
          }}
        >
          <span className="text-[13.5px] text-[#5B6478]">{row.label}</span>
          <Pill tone={row.tone} icon={"icon" in row ? row.icon : undefined}>
            {row.value}
          </Pill>
        </div>
      ))}

      <div className="flex items-center justify-between bg-[#F7F9FC] px-6 py-3 text-[11.5px] text-[#8891A4]">
        <span className="inline-flex items-center gap-1.5">
          <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
          </svg>
          All branches
        </span>
        <span>Role: Pharmacist-in-Charge</span>
      </div>
    </div>
  );
}

function Pill({
  tone,
  icon,
  children,
}: {
  tone: "green" | "blue" | "muted";
  icon?: "lock" | "check";
  children: React.ReactNode;
}) {
  const toneClasses =
    tone === "green"
      ? "bg-[#DCF5EE] text-[#0C8A6E]"
      : tone === "blue"
      ? "bg-[#E3E8FB] text-[#3B5BDB]"
      : "bg-[#EEF1F6] text-[#5B6478]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-transform duration-200 group-hover:scale-105 ${toneClasses}`}
    >
      {icon === "check" && (
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {icon === "lock" && (
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
          <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5.2 7V5.3a2.8 2.8 0 0 1 5.6 0V7" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )}
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-4 w-32 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="space-y-3">
        <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-5/6 max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-2/3 max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-5/6 max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex gap-3">
        <div className="h-11 w-56 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-16 w-full max-w-lg animate-pulse rounded-2xl bg-[#E4E8F0]" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white">
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <div className="h-4 w-32 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 last:border-b-0"
        >
          <div className="h-3.5 w-32 animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
        </div>
      ))}
      <div className="flex items-center justify-between bg-[#F7F9FC] px-6 py-3">
        <div className="h-3 w-20 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-32 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}