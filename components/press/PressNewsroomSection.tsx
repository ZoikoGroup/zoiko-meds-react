"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const FILTERS = [
  "All",
  "Corporate",
  "Coverage",
  "Statements",
  "Events",
] as const;

const NEWSROOM_ITEMS = [
  {
    tag: "Corporate",
    cadence: "Date on publish",
    title: "Latest announcements",
    description:
      "Approved press releases, product updates, leadership statements, and corporate announcements with publish dates and categories.",
    statusNote: "Approved · canonical URL on publish",
  },
  {
    tag: "Coverage",
    cadence: "As permitted",
    title: "Media coverage",
    description:
      "Verified external coverage where republication and linking are permitted. Listing does not imply endorsement unless explicitly stated.",
  },
  {
    tag: "Statements",
    cadence: "Version-controlled",
    title: "Statements & corrections",
    description:
      "Official statements, clarifications, corrections, and claim updates. Superseded statements link to the latest approved version.",
  },
  {
    tag: "Events",
    cadence: "Upcoming",
    title: "Events & speaking",
    description:
      "Approved conferences, panels, public appearances, and media briefings.",
  },
] as const;

export default function PressNewsroomSection() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Filter items based on the active selection
  const filteredItems =
    activeFilter === "All"
      ? NEWSROOM_ITEMS
      : NEWSROOM_ITEMS.filter((item) => item.tag === activeFilter);

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
                01 · Newsroom &amp; Announcements
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Approved updates and{" "}
                <span style={{ color: ACCENT }}>official statements.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-56 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Filter pills ---------------- */}
        <div className="mt-8 flex flex-wrap gap-2">
          {mounted
            ? FILTERS.map((filter, i) => (
                <Reveal key={filter} index={2 + i * 0.3}>
                  <FilterPill
                    label={filter}
                    active={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                  />
                </Reveal>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-24 animate-pulse rounded-full bg-[#E4E8F0]"
                />
              ))}
        </div>

        {/* ---------------- Newsroom rows card ---------------- */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
          {mounted
            ? filteredItems.map((item, i) => (
                <Reveal key={`${activeFilter}-${item.title}`} index={i}>
                  <NewsroomRow
                    {...item}
                    isLast={i === filteredItems.length - 1}
                  />
                </Reveal>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <NewsroomRowSkeleton key={i} isLast={i === 3} />
              ))}
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 50}ms` }}
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
/*  Filter pill                                                      */
/* ----------------------------------------------------------------- */
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ease-out"
      style={
        active
          ? { backgroundColor: ACCENT, color: "#FFFFFF" }
          : {
              backgroundColor: "#FFFFFF",
              color: "#5B6478",
              border: "1px solid #E0E4EC",
            }
      }
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = "#9FE3D3";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = "#E0E4EC";
      }}
    >
      {label}
    </button>
  );
}

/* ----------------------------------------------------------------- */
/*  Newsroom row                                                     */
/* ----------------------------------------------------------------- */
function NewsroomRow({
  tag,
  cadence,
  title,
  description,
  statusNote,
  isLast,
}: {
  tag: string;
  cadence: string;
  title: string;
  description: string;
  statusNote?: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`group flex items-start gap-6 px-7 py-6 transition-colors duration-200 hover:bg-[#F7F9FC] ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="w-28 flex-shrink-0">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
        >
          {tag}
        </span>
        <p className="mt-1.5 text-[11.5px] text-[#9AA3B5]">{cadence}</p>
      </div>

      <div className="flex-1">
        <h4 className="text-[15px] font-bold text-[#0F1F4E]">{title}</h4>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
        {statusNote && (
          <p
            className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold"
            style={{ color: ACCENT }}
          >
            <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {statusNote}
          </p>
        )}
      </div>
    </div>
  );
}

function NewsroomRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-6 px-7 py-6 ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="w-28 flex-shrink-0">
        <div className="h-5 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
        <div className="mt-1.5 h-3 w-16 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="flex-1">
        <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="mt-2 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
        </div>
      </div>
    </div>
  );
}
