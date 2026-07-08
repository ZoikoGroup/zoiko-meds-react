import {
  Braces,
  Package,
  User,
  Lock,
  FileText,
  MessageCircle,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

interface Card {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
}

const cards: Card[] = [
  {
    icon: Braces,
    title: "Pharmacy management systems",
    description:
      "Connect prescription workflow and pharmacy operations where approved — an approved integration category, not a guaranteed universal connection.",
  },
  {
    icon: Package,
    title: "Inventory module",
    description: "Supports internal readiness confidence and status updates.",
    link: "View Inventory",
  },
  {
    icon: User,
    title: "Patient portal",
    description: "Delivers patient-safe status updates and clarification requests.",
    link: "View Patient Portal",
  },
  {
    icon: Lock,
    title: "Identity & access",
    description:
      "Controls pharmacy user roles and location access, with SSO and MFA positioning for enterprise buyers.",
  },
  {
    icon: FileText,
    title: "Reporting layer",
    description:
      "Exports workflow, audit, and performance reports with role-gated report generation.",
  },
  {
    icon: MessageCircle,
    title: "Support desk",
    description:
      "Routes implementation, sync, and operational issues, with a contact path visible in error states.",
  },
];

export default function IntegrationsDataFlowSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
          10 · Integrations & data flow
        </p>

        <h1 className="text-3xl max-w-150 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
          Connect where{" "}
          <span className="text-[#0FAA87]">approved.</span>
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ icon: Icon, title, description, link }) => (
            <div
              key={title}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                <Icon size={18} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{description}</p>
                {link && (
                  <button className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                    {link}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
