"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const STEPS = [
  {
    step: 1,
    title: "Request reviewed",
    description:
      "ZoikoMeds reviews the organization, role, region, and briefing objective to route the request appropriately.",
  },
  {
    step: 2,
    title: "Briefing path confirmed",
    description:
      "You receive the best-fit route: intelligence, pharmacy network, wholesale, public-health, compliance, or partnership.",
  },
  {
    step: 3,
    title: "Briefing scheduled",
    description:
      "Qualified requests may receive a calendar link or direct scheduling support.",
  },
  {
    step: 4,
    title: "Follow-up pack prepared",
    description:
      "Relevant materials may be shared after review, such as a platform overview, trust information, or briefing agenda.",
  },
] as const;

export default function RequestABriefingWhatHappensNextSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            What Happens Next
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">A clear path from request to </span>
            <br className="hidden sm:block" />
            <span style={{ color: ACCENT }}>conversation.</span>
          </h2>
        </Reveal>

        {/* ── Step cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, i) => (
            <Reveal key={item.step} index={2 + i} active={mounted}>
              <div
                className="group relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <span
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  {item.step}
                </span>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
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
        animation: active ? `requestBriefingNextFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingNextFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}