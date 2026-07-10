"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const TERMS = [
  {
    title: "Agreement and acceptance",
    body: "These Terms apply to everyone who accesses or uses ZoikoMeds. By using the platform, creating an account, accessing the pharmacy portal, or using enterprise, API, or data services, users accept these Terms. Continuing to use ZoikoMeds after changes means acceptance of the updated Terms. Additional agreements (for example enterprise, API, or pharmacy agreements) may also apply and control where they conflict.",
  },
  {
    title: "ZoikoMeds service description",
    body: "ZoikoMeds provides medicine availability search, accounts, saved searches, alerts, pharmacy participation workflows, provider support workflows, enterprise and API products, data services, and support. Features vary by role, jurisdiction, verification, contract, and availability.",
  },
  {
    title: "Platform boundaries",
    body: "ZoikoMeds is not a pharmacy, prescriber, dispenser, delivery provider, marketplace, medical advice service, stock guarantee, emergency service, or clinical decision-support tool. Availability information is confidence-based and must be confirmed directly with the pharmacy.",
  },
  {
    title: "Eligibility and account use",
    body: "Users must meet age and authority requirements to hold an account and must provide accurate information. Users are responsible for account security, including passwords, passkeys, and MFA where offered, and for activity under their account. ZoikoMeds may suspend or restrict accounts for security, legal, or compliance reasons.",
  },
  {
    title: "Search, saved searches, and alerts",
    body: "Search results reflect confidence-based availability signals, not exact stock counts or guarantees. Saved searches and alerts are conveniences with inherent limitations, including timing and signal changes. Users remain responsible for confirming availability directly with the pharmacy.",
  },
  {
    title: "Pharmacy participation terms",
    body: "Verified pharmacies access participation workflows through identity and authorization review, role and branch permissions, signal settings, and confirmation workflows. Pharmacies control exact stock, which is not exposed publicly, and remain bound by professional judgment, pharmacy policy, and applicable law.",
  },
  {
    title: "Provider workflow terms",
    body: "Provider workflows support patient access conversations and signal explanation. They do not provide clinical decision support and are data-minimized by default, avoiding PHI unless separately governed. Providers remain responsible for clinical judgment and referral decisions.",
  },
  {
    title: "Enterprise, API, and data terms",
    body: "Enterprise, API, and data products are governed by separate agreements. Authorized use, API keys, rate limits, data-use restrictions, and confidentiality apply. Users must not reverse engineer the platform, expose exact public stock, or perform patient-level targeting.",
  },
  {
    title: "Acceptable use",
    body: "Users must not scrape, defraud, abuse, or attempt unauthorized access; submit misleading information; misuse PHI; abuse controlled medicine information; or use ZoikoMeds unlawfully. Prohibited activity may result in suspension, termination, or legal action.",
  },
  {
    title: "User content and submissions",
    body: "Users are responsible for the accuracy of information they submit, including support requests and feedback. Users must not submit prescriptions, diagnoses, PHI, exact stock, credentials, or confidential documents through public forms. Feedback may be used to improve the platform.",
  },
  {
    title: "Intellectual property",
    body: "ZoikoMeds marks, software, data products, APIs, content, and documentation are protected. Users may not copy, modify, distribute, or misuse them except as expressly permitted by these Terms or a separate written agreement.",
  },
  {
    title: "Third-party services and pharmacies",
    body: "Participating pharmacies and third parties are independent. ZoikoMeds does not control pharmacy dispensing decisions, third-party sites, or external services, and their own terms may apply.",
  },
  {
    title: "Privacy and cookies",
    body: "Personal data is handled as described in the Privacy Center, and cookie choices are managed through Cookie Settings. Data rights are exercised through the privacy mechanisms described there.",
  },
  {
    title: "Availability and changes",
    body: "The platform may change, update, or vary features by jurisdiction, and may include beta or roadmap capabilities. Service availability, maintenance, and feature changes are expected parts of ongoing operation.",
  },
  {
    title: "Disclaimers and limitations",
    body: "To the extent permitted by law, ZoikoMeds is provided without warranties beyond the legally required minimum, and liability is limited accordingly. Availability information can change at any time and is not guaranteed.",
  },
  {
    title: "Indemnity and misuse",
    body: "Users are responsible for misuse, unauthorized access, unlawful use, or breach of professional obligations, and agree to hold ZoikoMeds harmless to the extent permitted by law.",
  },
  {
    title: "Suspension and termination",
    body: "ZoikoMeds may restrict, suspend, or terminate accounts or pharmacy, enterprise, or API access for legal, security, compliance, or contractual reasons, subject to applicable law and agreements.",
  },
  {
    title: "Disputes, governing law, and notices",
    body: "These Terms are governed by the laws stated in the applicable agreement or notice. Dispute processes, notices, support contacts, legal contacts, and version control apply as described here and in related agreements.",
  },
] as const;

export default function TermsOfUseFullTermsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarListRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);

  // Reveal-on-scroll for the header.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scrollspy: track which numbered section is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        let bestIndex: number | null = null;
        let bestRatio = 0;

        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIndex = idx;
          }
        });

        if (bestIndex !== null) setActiveIndex(bestIndex);
      },
      { threshold: [0.15, 0.3, 0.5], rootMargin: "-15% 0px -55% 0px" }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function handleSidebarClick(index: number) {
    const target = itemRefs.current[index];
    if (!target) return;

    isClickScrolling.current = true;
    setActiveIndex(index);

    const top = target.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });

    // Release the scrollspy lock once the smooth scroll has settled.
    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  }

  return (
    <section id="summary" ref={sectionRef} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Full Terms
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The complete, </span>
            <span style={{ color: ACCENT }}>binding agreement.</span>
          </h2>
        </Reveal>

        {/* ── Sidebar + content grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">

          {/* Sidebar */}
          <Reveal index={2} active={mounted}>
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-[#E7EAF1] bg-white p-3 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <p className="px-3 pb-2 pt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#9AA1B4]">
                  Contents
                </p>
                <div ref={sidebarListRef} className="relative flex flex-col gap-0.5 pr-1">
                  {TERMS.map((term, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        key={term.title}
                        type="button"
                        onClick={() => handleSidebarClick(i)}
                        className="relative flex items-start gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-colors duration-200"
                        style={{
                          backgroundColor: isActive ? "rgba(15,170,135,0.08)" : "transparent",
                          color: isActive ? "#0F1F4E" : "#5B6478",
                        }}
                      >
                        <span
                          className="mt-[1px] flex-shrink-0 text-[11px] font-semibold transition-colors duration-200"
                          style={{ color: isActive ? ACCENT : "#B3B9C9" }}
                        >
                          {i + 1}.
                        </span>
                        <span className={isActive ? "font-semibold" : "font-medium"}>
                          {term.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content */}
          <Reveal index={3} active={mounted}>
            <div className="divide-y divide-[#E7EAF1]">
              {TERMS.map((term, i) => (
                <div
                  key={term.title}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-index={i}
                  className="py-6 first:pt-0"
                >
                  <h3 className="flex items-baseline gap-2.5 text-[15.5px] font-bold text-[#0F1F4E]">
                    <span className="text-[13px] font-semibold" style={{ color: ACCENT }}>
                      {i + 1}
                    </span>
                    {term.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#3F4759]">
                    {term.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `termsFullFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes termsFullFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}