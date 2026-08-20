"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const ROLE_ROWS = [
  {
    tag: "Operating company",
    name: "Zoiko Healthcare Inc.",
    description:
      "Healthcare operating company responsible for ZoikoMeds governance, healthcare positioning, stakeholder trust, and regulated-market readiness.",
  },
  {
    tag: "Platform",
    name: "ZoikoMeds",
    link: "/",
    description:
      "Global medicine availability infrastructure platform operated by Zoiko Healthcare Inc.",
    cta: "Explore ZoikoMeds",
  },
  {
    tag: "Parent group",
    name: "Zoiko Group Inc.",
    link: "/zoiko-group",
    description:
      "Parent group and broader corporate ecosystem supporting strategic direction and group governance.",
    cta: "Learn About Zoiko Group",
  },
  {
    tag: "Technology",
    name: "Zoiko Tech Inc.",
    description:
      "Technology infrastructure and engineering capability supporting platform build, systems, security, integrations, and technical delivery where applicable.",
  },
] as const;

export default function ZoikoHealthcareCorporateRoleSection() {
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
                01 · Corporate Role
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                One healthcare operating company. One governed{" "}
                <span style={{ color: ACCENT }}>availability platform.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-44 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Role rows card ---------------- */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
          {mounted
            ? ROLE_ROWS.map((row, i) => (
                <Reveal key={row.name} index={2 + i}>
                  <RoleRow {...row} isLast={i === ROLE_ROWS.length - 1} />
                </Reveal>
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <RoleRowSkeleton key={i} isLast={i === 3} />
              ))}
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
      style={{ opacity: 0, animationDelay: `${index * 80}ms` }}
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
/*  Role row                                                            */
/* ----------------------------------------------------------------- */
function RoleRow({
  tag,
  name,
  description,
  cta,
  isLast,
  link,
}: {
  tag: string;
  name: string;
  description: string;
  cta?: string;
  isLast: boolean;
  link?: string;
}) {
  const router = useRouter();
  return (
    <div
      className={`group flex items-start justify-between gap-6 px-7 py-6 transition-colors duration-200 hover:bg-[#F7F9FC] ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
          >
            {tag}
          </span>
          <h4 className="text-[16px] font-bold text-[#0F1F4E]">{name}</h4>
        </div>
        <p className="mt-2.5 max-w-2xl text-[13.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>

      {cta && (
        <button
          type="button"
          onClick={() => link && router.push(link)}
          className="hidden flex-shrink-0 cursor-pointer rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98] sm:block"
        >
          {cta}
        </button>
      )}
    </div>
  );
}

function RoleRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div
      className={`flex items-start justify-between gap-6 px-7 py-6 ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="h-5 w-28 animate-pulse rounded-full bg-[#E4E8F0]" />
          <div className="h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full max-w-xl animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-3 w-4/5 max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
        </div>
      </div>
      <div className="hidden h-10 w-40 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0] sm:block" />
    </div>
  );
}
