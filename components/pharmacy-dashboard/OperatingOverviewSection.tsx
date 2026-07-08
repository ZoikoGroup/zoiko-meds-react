"use client"
import {
  Clock3,
  Check,
  AlignJustify,
  MapPin,
  FileText,
  LucideIcon
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
  note: string;
}

const cards: Card[] = [
  {
    icon: Clock3,
    title: "Today view",
    description:
      "Priority tasks, pending confirmations, expiring signals, and access alerts.",
    note: "Creates a daily habit.",
  },
  {
    icon: Check,
    title: "Medicine signal manager",
    description:
      "Authorized staff review and update confidence signals.",
    note: "Keeps platform data fresh.",
  },
  {
    icon: AlignJustify,
    title: "Patient access queue",
    description:
      "Organizes access inquiries and demand signals without clinical advice.",
    note: "Improves responsiveness.",
  },
  {
    icon: MapPin,
    title: "Location health",
    description:
      "Participation, review activity, and configuration status by location.",
    note: "Supports multi-site governance.",
  },
  {
    icon: FileText,
    title: "Reports",
    description:
      "Participation, access signal, and network performance reports.",
    note: "Supports leadership review.",
  },
];

export default function OperatingOverviewSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">

        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          02 · Dashboard overview
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          One operating view for pharmacy
          participation, access signals, and <br />
          <span className="text-[#0FAA87]">network performance.</span>
        </h2>
        <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
          Review signal queues, manage structured confirmations, monitor access demand,
          coordinate locations, and generate reports — without turning pharmacy operations
          into a public inventory marketplace.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map(({ icon: Icon, title, description, note }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
              <div className="mt-2 border-t border-t-[#E2E8F0] pt-2">
                <span className="text-[#0F8B7D] leading-snug text-xs">{note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
