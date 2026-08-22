"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ACCENT = "#0FAA87";

const POINTS = [
  {
    icon: "/icons/eye-off.png",
    title: "No exact public stock counts",
    description:
      "ZoikoMeds does not publicly expose exact pharmacy stock quantities.",
  },
  {
    icon: "/icons/ban.png",
    title: "No stock guarantees",
    description:
      "Availability confidence is informational. It does not guarantee medicine will be available when you arrive.",
  },
  {
    icon: "/icons/phone.png",
    title: "Pharmacy confirmation still matters",
    description:
      "Pharmacy inventory, prescription rules, pharmacist judgment, eligibility, and local laws always apply.",
  },
  {
    icon: "/icons/bann.png",
    title: "No medical advice",
    description:
      "ZoikoMeds does not recommend medicines, substitutes, doses, treatments, or clinical decisions.",
  },
  {
    icon: "/icons/lock.png",
    title: "Privacy-conscious by design",
    description:
      "You can search without an account. Accounts are for saved searches, alerts, preferences, and privacy controls.",
  },
  {
    icon: "/icons/refresh.png",
    title: "Signals can change",
    description:
      "Medicine availability may change after a search, alert, or confirmation request.",
  },
] as const;

export default function AvailabilityConfidenceTrustSection() {
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
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Trust and privacy,{" "}
                  <span style={{ color: ACCENT }}>stated once.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  The boundaries of availability confidence — clearly and with
                  confidence.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Point cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? POINTS.map((p, i) => <PointCard key={p.title} {...p} index={i} />)
            : POINTS.map((_, i) => <CardSkeleton key={i} />)}
        </div>

        {/* ---------------- Emergency note bar ---------------- */}
        <div className="mt-6">
          {mounted ? <NoteBar /> : <NoteBarSkeleton />}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                  */
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
      className="animate-[availabilityTrustFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes availabilityTrustFadeUp {
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
/*  Point card                                                      */
/* ----------------------------------------------------------------- */
function PointCard({
  icon,
  title,
  description,
  index,
}: {
  icon: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[availabilityTrustFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[9px] transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#13A5941A" }}
      >
        <Image src={icon} alt={title} width={20} height={20} />
      </div>

      <div>
        <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Note bar (emergency)                                            */
/* ----------------------------------------------------------------- */
function NoteBar() {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#D9603A] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_8px_24px_-14px_rgba(217,96,58,0.3)] animate-[availabilityTrustFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "950ms" }}
    >
      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-[#B6531F]">
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2l6.5 11.2H1.5L8 2z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />

          <path
            d="M8 6.5v3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          <circle cx="8" cy="11.5" r="0.6" fill="currentColor" />
        </svg>
      </span>
      <p className="text-[13.5px] font-semibold text-[#0F1F4E]">
        In a medical emergency, contact local emergency services immediately.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                       */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function NoteBarSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-7 w-7 flex-shrink-0 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="h-3.5 w-full max-w-sm animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}
