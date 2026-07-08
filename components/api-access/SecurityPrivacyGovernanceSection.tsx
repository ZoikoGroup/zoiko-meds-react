import {
  KeyRound,
  Lock,
  LayoutGrid,
  Flag,
  AlignLeft,
  RotateCw,
  Shield,
  Asterisk,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    icon: KeyRound,
    title: "Access qualification",
    description:
      "API access requires organizational review, approved use case, technical owner, and responsible data-use acceptance.",
  },
  {
    icon: Lock,
    title: "Authentication",
    description:
      "Support secure enterprise authentication patterns appropriate for approved integrations.",
  },
  {
    icon: LayoutGrid,
    title: "Authorization & scopes",
    description:
      "Scoped access so clients only reach approved endpoints, data classes, regions, and report types.",
  },
  {
    icon: Flag,
    title: "Data minimization",
    description:
      "Return only the data needed for the approved workflow, avoiding unnecessary exposure of sensitive detail.",
  },
  {
    icon: AlignLeft,
    title: "Audit logging",
    description:
      "Log request identity, endpoint, scope, status, timestamp, and relevant governance metadata.",
  },
  {
    icon: RotateCw,
    title: "Rate limiting",
    description:
      "Protect platform reliability through published limits, burst controls, and escalation pathways.",
  },
  {
    icon: Shield,
    title: "Encryption",
    description:
      "Use secure transport and protected storage patterns for applicable data.",
  },
  {
    icon: Asterisk,
    title: "Responsible AI boundaries",
    description:
      "AI-assisted outputs remain explainable, bounded, operational, and non-clinical.",
  },
  {
    icon: AlertTriangle,
    title: "Incident pathway",
    description:
      "Escalation workflow for suspected misuse, integration failures, outages, or policy violations.",
  },
];

export default function SecurityPrivacyGovernanceSection() {
  return (
    <section className="bg-[#0C1B30] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#34D6C4]">
          06 · Security, privacy &amp; governance
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] text-white font-semibold leading-snug">
          Enterprise-ready,{" "}
          <span className="text-[#0FAA87]">controlled access.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-[9px] bg-teal-400/10 text-teal-400">
                <Icon size={18} strokeWidth={2} />
              </div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#E7EEF69E]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
