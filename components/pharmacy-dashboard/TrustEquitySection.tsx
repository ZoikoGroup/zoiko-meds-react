"use client"

import {
  Check,
  ClipboardList,
  Ban,
  Shield,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    icon: Check,
    title: "Responsible visibility",
    description:
      "Support medicine access awareness without unsafe public inventory exposure.",
  },
  {
    icon: ClipboardList,
    title: "Pharmacy-controlled workflows",
    description:
      "Pharmacies manage participation status, review queues, and structured confirmation actions.",
  },
  {
    icon: Ban,
    title: "No clinical advice",
    description:
      "ZoikoMeds does not diagnose, prescribe, substitute medicines, or replace licensed professionals.",
  },
  {
    icon: Shield,
    title: "Enterprise-grade controls",
    description:
      "Role-based access, audit trails, secure workflows, and governance-ready reporting support serious pharmacy participation.",
  },
];

export default function TrustEquitySection() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold tracking-[2px] text-teal-600">
          01 · Trust & safety
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Responsible pharmacy {" "}<span className="text-[#0FAA87]">participation,
            stated first.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
