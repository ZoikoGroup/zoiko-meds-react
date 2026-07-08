import {
  Lock,
  LockKeyhole,
  List,
  AlignJustify,
  CircleSlash,
  Shield,
  UserLock,
  CircleAlert,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
}

const cards: Card[] = [
  {
    icon: Lock,
    title: "Role-based access control",
    description:
      "Permission groups for owner, network admin, pharmacist, operations manager, staff, viewer, and support.",
  },
  {
    icon: LockKeyhole,
    title: "No unauthorized quantity exposure",
    description:
      "Public availability uses confidence states or permitted visibility rules, not exact inventory quantities.",
  },
  {
    icon: List,
    title: "Audit trail",
    description:
      "Record user, timestamp, location, action, affected signal, and outcome for material workflow events.",
  },
  {
    icon: AlignJustify,
    title: "Data minimization",
    description:
      "Collect only what's required for participation, access intelligence, verification, reporting, and support.",
  },
  {
    icon: CircleSlash,
    title: "Clinical boundary",
    description:
      "No diagnosis, treatment recommendation, prescribing guidance, or substitution advice.",
  },
  {
    icon: Shield,
    title: "Secure authentication",
    description:
      "MFA-ready login, secure sessions, device awareness, and an enterprise SSO path for pharmacy groups.",
  },
  {
    icon: UserLock,
    title: "Restricted visibility",
    description:
      "A signal may be present while exact data is withheld due to permission or policy.",
  },
  {
    icon: CircleAlert,
    title: "Accessibility",
    description:
      "WCAG 2.2 AA with keyboard navigation, labels, contrast, and reduced-motion support.",
  },
];
export default function PrivacySafeguardsSection() {
  return (
    <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          09 · Security, privacy & compliance
        </p>
        <h2 className="max-w-150 text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Responsible design for healthcare-
          {" "}
          <span className="text-[#0FAA87]">sensitive participation.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
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
