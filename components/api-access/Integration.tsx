"use client"
import {
  Hospital,
  Building2,
  Pill,
  Truck,
  Factory,
  Landmark,
  LucideIcon,
  ArrowRight
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
  action: string;
}

const cards: Card[] = [
  {
    icon: Hospital,
    title: "Hospital systems",
    description:
      "Connect regional medicine availability intelligence, shortage signals, and reporting outputs into enterprise dashboards, care coordination operations, or procurement intelligence systems.",
    action: "Request Hospital API Briefing",
  },
  {
    icon: Building2,
    title: "Clinic networks",
    description:
      "Integrate multi-location medicine access indicators, alert thresholds, and regional access reports into centralized clinic operations.",
    action: "Discuss Clinic Network Integration",
  },
  {
    icon: Pill,
    title: "Pharmacy networks",
    description:
      "Enable authorized pharmacy confirmation workflows, confidence updates, and network participation signals through controlled endpoints.",
    action: "Join Pharmacy API Program",
  },
  {
    icon: Truck,
    title: "Distributors & wholesalers",
    description:
      "Connect aggregated demand and availability intelligence into partner reporting without exposing sensitive inventory data to unauthorized users.",
    action: "Explore Distribution Integration",
  },
  {
    icon: Factory,
    title: "Manufacturers",
    description:
      "Use shortage signals, access-risk insights, and demand-pattern reports to support market access, supply planning, and stakeholder intelligence.",
    action: "Request Manufacturer Briefing",
  },
  {
    icon: Landmark,
    title: "Public health & government",
    description:
      "Receive governed regional access reports and shortage-awareness feeds for approved operational review and public health planning.",
    action: "Request Public-Health API Review",
  },
];

export default function Integration() {
    return (
        <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">

                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    03 · Integration use cases
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    API value, mapped to {" "}
                    <span className="text-[#0FAA87]">every stakeholder.</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map(({ icon: Icon, title, description, action }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                            <p className="mt-2 md:min-h-30 text-sm leading-relaxed text-gray-500">{description}</p>
                            <button className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700">
                                {action}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
