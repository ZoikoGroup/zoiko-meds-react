"use client";

import { useEffect, useRef, useState } from "react";
import { AlignLeft, Info } from "lucide-react";

type QuestionCard = {
  eyebrow: string;
  title: string;
  description: string;
};

const QUESTION_CARDS: QuestionCard[] = [
  {
    eyebrow: "WHAT CHANGED",
    title: "The signal",
    description:
      "Availability confidence weakened for the selected medicine category in the selected region.",
  },
  {
    eyebrow: "WHY IT MATTERS",
    title: "The implication",
    description:
      "Stakeholders may need to review confirmation coverage or prepare a briefing.",
  },
  {
    eyebrow: "REVIEW NEXT",
    title: "The action",
    description:
      "Route to authorized review, monitor the trend, or generate a governed report.",
  },
];

export default function AiInsightsExplainabilitySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <ExplainFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            06 &nbsp;&middot;&nbsp; EXPLAINABILITY &amp; EVIDENCE
          </span>
        </ExplainFadeUp>

        <ExplainFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Every insight <span className="text-[#0FAA87]">answers three questions.</span>
          </h2>
        </ExplainFadeUp>

        <ExplainFadeUp show={isVisible} delay={140}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4B5567]">
            What changed? Why might it have changed? What should an
            authorized stakeholder review next?
          </p>
        </ExplainFadeUp>

        {/* Three question cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUESTION_CARDS.map((card, i) => (
            <ExplainFadeUp key={card.eyebrow} show={isVisible} delay={200 + i * 60}>
              <div className="h-full rounded-2xl border-2 border-[#0FAA87]/40 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0FAA87] hover:shadow-lg">
                <span className="text-[0.7rem] font-bold tracking-[0.14em] text-[#0FAA87]">
                  {card.eyebrow}
                </span>
                <h3 className="mt-2 text-base font-bold text-[#0F1F4E]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B5567]">
                  {card.description}
                </p>
              </div>
            </ExplainFadeUp>
          ))}
        </div>

        {/* Reason codes + Limitations */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <ExplainFadeUp show={isVisible} delay={380}>
            <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <AlignLeft
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0FAA87]"
                  strokeWidth={2}
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0F1F4E]">
                    Reason codes
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4B5567]">
                    Demand acceleration; confidence decline; limited
                    confirmation coverage; regional clustering; external
                    shortage context.
                  </p>
                </div>
              </div>
            </div>
          </ExplainFadeUp>

          <ExplainFadeUp show={isVisible} delay={440}>
            <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <Info
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0FAA87]"
                  strokeWidth={2}
                />
                <div>
                  <h3 className="text-sm font-bold text-[#0F1F4E]">
                    Limitations
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#4B5567]">
                    Based on available signals and may be incomplete; not
                    clinical advice or a public shortage declaration.
                  </p>
                </div>
              </div>
            </div>
          </ExplainFadeUp>
        </div>

        {/* Evidence trail */}
        <ExplainFadeUp show={isVisible} delay={500}>
          <div className="mt-5 rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlignLeft
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0FAA87]"
                strokeWidth={2}
              />
              <div>
                <h3 className="text-sm font-bold text-[#0F1F4E]">
                  Evidence trail
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4B5567]">
                  Timestamp, source category, confidence tier, model version,
                  reviewer status, and report export history.
                </p>
              </div>
            </div>
          </div>
        </ExplainFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function ExplainFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}