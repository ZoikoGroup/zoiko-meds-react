"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, ShieldCheck, ShieldAlert, Sparkles, UserX, Monitor } from "lucide-react";

const CARDS = [
  {
    id: "privacy-by-design",
    icon: Shield,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    title: "Privacy by design",
    description:
      "Search anonymously or create an account with full control over history, saved medicines, alerts, and deletion rights at any time.",
    cta: "Privacy Center",
    ctaColor: "text-emerald-600",
  },
  {
    id: "verified-pharmacies",
    icon: ShieldCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    title: "Verified pharmacies only",
    description:
      "Credential, license, and premises verification required before any pharmacy achieves public network visibility.",
    cta: "Verification Standards",
    ctaColor: "text-blue-600",
  },
  {
    id: "strict-role-boundaries",
    icon: ShieldAlert,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-700",
    title: "Strict role boundaries",
    description:
      "ZoikoMeds does not prescribe, dispense, sell, deliver, or recommend medicines or therapeutic alternatives.",
    cta: "Medical & Legal Boundaries",
    ctaColor: "text-rose-600",
  },
  {
    id: "confidence-signals",
    icon: Sparkles,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    title: "Confidence signals only",
    description:
      "Availability is shown through confidence tiers — never exact inventory quantities or guaranteed stock levels.",
    cta: "Availability Safety Rules",
    ctaColor: "text-emerald-600",
  },
  {
    id: "controlled-medicine",
    icon: UserX,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
    title: "Controlled medicine safeguards",
    description:
      "Controlled medicines are excluded from public search by default unless a jurisdiction-specific approved pathway exists.",
    cta: "Controlled Medicine Policy",
    ctaColor: "text-amber-600",
  },
  {
    id: "enterprise-security",
    icon: Monitor,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-700",
    title: "Enterprise security posture",
    description:
      "HIPAA-aware, GDPR-aware, SOC 2-aligned, and region-aware infrastructure designed for regulated healthcare procurement.",
    cta: "Security Center",
    ctaColor: "text-indigo-600",
  },
];

export default function HomeTrustSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <section ref={sectionRef} className="w-full bg-[#F2F6FC] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Trust & compliance
          </span>

          <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Built for verified trust
            <br />
            and <span className="text-[#0A9B74]">regulated environments.</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Every boundary is explicit, every data decision is user-controlled,
            and every architecture decision starts from privacy-by-design
            principles.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: isVisible ? `${index * 90}ms` : "0ms" }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-slate-100/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100" />

                <div
                  className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${card.iconColor}`} strokeWidth={2} />
                </div>

                <h3 className="relative z-10 mt-4 text-base font-semibold text-slate-900">
                  {card.title}
                </h3>

                <p className="relative z-10 mt-2 text-sm leading-relaxed text-slate-500">
                  {card.description}
                </p>

                <a
                  href="#"
                  className={`relative z-10 mt-4 inline-flex items-center gap-1 text-sm font-semibold ${card.ctaColor}`}
                >
                  {card.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}