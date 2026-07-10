"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const CONTACT_ROWS = [
  { label: "General corporate inquiries", cta: "Contact Zoiko Healthcare" },
  {
    label: "Enterprise, government, health-system, or API inquiries",
    cta: "Request Enterprise Briefing",
  },
  { label: "Press and media inquiries", cta: "Press Inquiries" },
  { label: "Pharmacy participation", cta: "Join the Verified Network" },
  { label: "Provider workflows", cta: "Request Provider Briefing" },
  { label: "Careers", cta: "View Careers" },
] as const;

const ADDRESS_CARDS = [
  {
    label: "Headquarters",
    lines: ["1401 21st Street, Suite R", "Sacramento, CA 95811, USA"],
  },
  {
    label: "European headquarters",
    lines: ["67–69 Great Portland Street, 5th Floor", "London W1W 5PF, UK"],
  },
] as const;

export default function ZoikoHealthcareCorporateContactSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                05 · Corporate Contact
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Contact the healthcare company{" "}
                <span style={{ color: ACCENT }}>behind ZoikoMeds.</span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5B6478]">
                Each inquiry routes to the right team — no generic
                mailbox.
              </p>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-44 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-4 w-72 animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Contact rows card ---------------- */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
          {mounted
            ? CONTACT_ROWS.map((row, i) => (
                <Reveal key={row.label} index={3 + i}>
                  <ContactRow {...row} isLast={i === CONTACT_ROWS.length - 1} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <ContactRowSkeleton key={i} isLast={i === 5} />
              ))}
        </div>

        {/* ---------------- Address cards ---------------- */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {mounted
            ? ADDRESS_CARDS.map((card, i) => (
                <Reveal key={card.label} index={9 + i}>
                  <AddressCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 2 }).map((_, i) => <AddressCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={11}>
              <ClosingCtaBanner />
            </Reveal>
          ) : (
            <div className="h-56 w-full animate-pulse rounded-3xl bg-[#E4E8F0]" />
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 60}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
/*  Contact row                                                         */
/* ----------------------------------------------------------------- */
function ContactRow({
  label,
  cta,
  isLast,
}: {
  label: string;
  cta: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`group flex items-center justify-between gap-4 px-7 py-4.5 transition-colors duration-200 hover:bg-[#F7F9FC] ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <span className="text-[13.5px] text-[#5B6478]">{label}</span>
      <button
        type="button"
        className="flex-shrink-0 rounded-xl border border-[#D7DCE6] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </button>
    </div>
  );
}

function ContactRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-7 py-4.5 ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="h-3.5 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-9 w-40 animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Address card                                                        */
/* ----------------------------------------------------------------- */
function AddressCard({
  label,
  lines,
}: {
  label: string;
  lines: readonly string[];
}) {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <span
        className="text-[10.5px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: ACCENT }}
      >
        {label}
      </span>
      <div className="mt-2.5">
        {lines.map((line) => (
          <p key={line} className="text-[13.5px] leading-relaxed text-[#0F1F4E]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function AddressCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-3 w-28 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-48 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCtaBanner() {
  const router = useRouter();
  return (
    <div className="rounded-3xl bg-[#0B1530] px-8 py-14 text-center sm:px-16">
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-snug text-white sm:text-3xl">
        Building trusted infrastructure for{" "}
        <span style={{ color: ACCENT }}>medicine availability.</span>
      </h3>

      <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-[#9AA3B5]">
        Zoiko Healthcare operates ZoikoMeds to make medicine
        availability easier to understand, safer to confirm, and more
        useful for patients, pharmacies, providers, institutions, and
        public-health stakeholders.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
        onClick={()=>router.push("/home")}
          type="button"
          className="group relative cursor-pointer overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
          <span className="relative">Explore ZoikoMeds</span>
        </button>

        <button
        onClick={()=>router.push("/contact")}
          type="button"
          className="rounded-xl border cursor-pointer border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
        >
          Contact Zoiko Healthcare
        </button>
      </div>
    </div>
  );
}