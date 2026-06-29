"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";



const ACCENT = "#0FAA87";

const STATUS_ROWS = [
    { label: "Confirmation pathway", value: "Available", tone: "green" },
    { label: "Jurisdiction", value: "Region: US", tone: "blue" },
    { label: "Sandbox", value: "Gated", tone: "blue" },
    { label: "Audit log", value: "On", tone: "green" },
] as const;

export default function ZoikoAvailApiHeroSection() {
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
            { threshold: 0.12 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="relative w-full bg-[#F4F6FA] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* ---------------- Breadcrumb ---------------- */}
                <div className="mb-8">
                    {mounted ? (
                        <Reveal index={0}>
                            <nav className="flex items-center gap-2 text-[13px] text-[#8A91A3]">
                                <Link
                                    href="/"
                                    className="transition-colors duration-200 hover:text-[#0F1F4E]"
                                >
                                    Home
                                </Link>
                                <span>/</span>
                                <a
                                    href="/enterprise-solutions"
                                    className="transition-colors duration-200 hover:text-[#0F1F4E]"
                                >
                                    Enterprise &amp; Intelligence
                                </a>
                                <span>/</span>
                                <span className="text-[#3A4258]">ZoikoAvail™ API</span>
                            </nav>
                        </Reveal>
                    ) : (
                        <div className="h-4 w-72 animate-pulse rounded bg-[#E4E8F0]" />
                    )}
                </div>

                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* ---------------- Left: copy ---------------- */}
                    <div>
                        {mounted ? (
                            <>
                                <Reveal index={1}>
                                    <p
                                        className="text-[12px] font-bold uppercase tracking-[0.14em]"
                                        style={{ color: ACCENT }}
                                    >
                                        ZoikoAvail™ API
                                    </p>
                                </Reveal>

                                <Reveal index={2}>
                                    <h2 className="font-[var(--font-plus-jakarta-sans)] mt-3 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                                        Integrate medicine availability signals into
                                        regulated healthcare workflows.
                                    </h2>
                                </Reveal>

                                <Reveal index={3}>
                                    <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-[#5B6478]">
                                        ZoikoAvail™ API gives approved organizations access to
                                        confidence-based medicine availability signals,
                                        freshness metadata, pharmacy confirmation pathways,
                                        and location-aware availability workflows — without
                                        exposing exact public stock or replacing clinical
                                        judgment.
                                    </p>
                                </Reveal>

                                <Reveal index={4}>
                                    <div className="mt-7 flex flex-wrap items-center gap-3">
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                                            style={{ backgroundColor: ACCENT }}
                                        >
                                            Request API Access
                                        </a>
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                                        >
                                            View API Capabilities
                                        </a>
                                    </div>
                                </Reveal>

                                <Reveal index={5}>
                                    <a
                                        href="#"
                                        className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200 hover:text-[#00786F]"
                                        style={{ color: ACCENT }}
                                    >
                                        Request Security Pack
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                                            <path
                                                d="M6.5 4l4 4-4 4"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                </Reveal>

                                <Reveal index={6}>
                                    <p className="mt-4 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-[#5B6478]">
                                        <svg
                                            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            style={{ color: ACCENT }}
                                        >
                                            <path
                                                d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
                                                stroke="currentColor"
                                                strokeWidth="1.3"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        API access is contract-scoped, jurisdiction-aware,
                                        and governed by privacy, security, pharmacy, and
                                        data-use controls.
                                    </p>
                                </Reveal>
                            </>
                        ) : (
                            <LeftSkeleton />
                        )}
                    </div>

                    {/* ---------------- Right: API response card mockup ---------------- */}
                    <div>
                        {mounted ? <ApiCard /> : <ApiCardSkeleton />}
                    </div>
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
            className="animate-[zoikoAvailHeroFadeUp_0.6s_ease-out_forwards]"
            style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
        >
            {children}
            <style jsx>{`
        @keyframes zoikoAvailHeroFadeUp {
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
/*  API card                                                            */
/* ----------------------------------------------------------------- */
function ApiCard() {
    return (
        <div
            className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_24px_60px_-30px_rgba(15,31,78,0.25)] animate-[zoikoAvailHeroFadeUp_0.6s_ease-out_forwards]"
            style={{ opacity: 0, animationDelay: "350ms" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">
                    ZoikoAvail™ API
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCF5EE] px-3 py-1 text-[12px] font-semibold text-[#0E8F70]">
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M3.5 8.5l3 3 6-6.5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Operational
                </span>
            </div>

            <div className="h-px w-full bg-[#EEF0F5]" />

            {/* Endpoint */}
            <div className="flex items-center gap-2 px-6 py-4">
                <span className="rounded-md bg-[#DCF5EE] px-2 py-1 text-[11px] font-bold text-[#0E8F70]">
                    GET
                </span>
                <code className="text-[13px] text-[#3A4258]">/v1/availability</code>
            </div>

            {/* Code block */}
            <div className="px-6">
                <pre className="overflow-x-auto rounded-xl bg-[#0B1226] p-4 text-[11.5px] leading-relaxed text-[#A9B2C8]">
                    <code>
                        {"{ "}
                        <span className="text-[#7FD9C4]">&quot;medicine&quot;</span>:{" "}
                        <span className="text-[#E8C07D]">&quot;atorvastatin 10mg&quot;</span>,{" "}
                        <span className="text-[#7FD9C4]">&quot;confidence&quot;</span>: ...
                        {"\n  "}
                        <span className="text-[#7FD9C4]">&quot;freshness&quot;</span>:{" "}
                        <span className="text-[#E8C07D]">&quot;6h&quot;</span>,{" "}
                        <span className="text-[#7FD9C4]">&quot;confirm&quot;</span>:{" "}
                        <span className="text-[#E8C07D]">&quot;recommended&quot;</span>,{" "}
                        <span className="text-[#7FD9C4]">&quot;ex</span>...
                        {"\n}"}
                    </code>
                </pre>
            </div>

            {/* Status rows */}
            <div className="mt-2">
                {STATUS_ROWS.map((row, i) => (
                    <div key={row.label}>
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-[13.5px] text-[#3A4258]">
                                {row.label}
                            </span>
                            <StatusPill value={row.value} tone={row.tone} />
                        </div>
                        {i < STATUS_ROWS.length - 1 && (
                            <div className="h-px w-full bg-[#EEF0F5]" />
                        )}
                    </div>
                ))}
            </div>

            <div className="h-px w-full bg-[#EEF0F5]" />

            <p className="px-6 py-5 text-center text-[11.5px] leading-relaxed text-[#A6ADBD]">
                Illustrative example. API access, fields, endpoints, rate
                limits, and data outputs are governed by contract, permissions,
                jurisdiction, and approved data scope.
            </p>
        </div>
    );
}

const PILL_TONES: Record<"green" | "blue", { bg: string; fg: string }> = {
    green: { bg: "#DCF5EE", fg: "#0E8F70" },
    blue: { bg: "#E3E8FB", fg: "#3B5BDB" },
};

function StatusPill({
    value,
    tone,
}: {
    value: string;
    tone: "green" | "blue";
}) {
    const colors = PILL_TONES[tone];
    return (
        <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold"
            style={{ backgroundColor: colors.bg, color: colors.fg }}
        >
            {tone === "green" && (
                <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M3.5 8.5l3 3 6-6.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
            {value}
        </span>
    );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-3 w-32 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="mt-2 space-y-2">
                <div className="h-3.5 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
                <div className="h-3.5 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
                <div className="h-3.5 w-2/3 max-w-sm animate-pulse rounded bg-[#E4E8F0]" />
            </div>
            <div className="mt-4 flex gap-3">
                <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
                <div className="h-11 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
            </div>
            <div className="mt-3 h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded bg-[#E4E8F0]" />
        </div>
    );
}

function ApiCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white p-6">
            <div className="flex items-center justify-between">
                <div className="h-4 w-32 animate-pulse rounded bg-[#E4E8F0]" />
                <div className="h-6 w-24 animate-pulse rounded-full bg-[#E4E8F0]" />
            </div>
            <div className="mt-4 h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="mt-4 h-28 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
            <div className="mt-6 space-y-4">
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                        <div className="h-3.5 w-32 animate-pulse rounded bg-[#E4E8F0]" />
                        <div className="h-6 w-20 animate-pulse rounded-full bg-[#E4E8F0]" />
                    </div>
                ))}
            </div>
            <div className="mt-6 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        </div>
    );
}