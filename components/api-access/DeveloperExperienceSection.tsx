"use client";
import {
  FileText,
  FlaskConical,
  Compass,
  Webhook,
  CircleAlert,
  LifeBuoy,
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FileText,
    title: "Developer portal",
    description:
      "Documentation, endpoints, authentication guide, rate limits, changelog, SDK patterns, and webhook events.",
  },
  {
    icon: FlaskConical,
    title: "Sandbox access",
    description:
      "Test credentials, sample payloads, demo medicine data, mock pharmacy signals, and non-production reports.",
  },
  {
    icon: Compass,
    title: "API explorer",
    description:
      "Interactive endpoint tester using sandbox-only data and safe examples.",
  },
  {
    icon: Webhook,
    title: "Webhook console",
    description:
      "Event subscriptions, retry policies, signing verification, delivery logs, and failure handling.",
  },
  {
    icon: CircleAlert,
    title: "Error library",
    description:
      "Clear codes for authentication, authorization, validation, rate limits, not found, conflict, and unavailable states.",
  },
  {
    icon: LifeBuoy,
    title: "Support pathways",
    description:
      "Technical onboarding, integration review, security review, launch readiness, and escalation contacts.",
  },
];

export default function DeveloperExperienceSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          07 · Developer experience
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Built for enterprise developers, reviewed{" "}
          <span className="text-[#0FAA87]">for healthcare sensitivity.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-[#13A5941A] text-teal-600">
                  <Icon size={13} strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="/api-access/ai.png"
              alt="Enterprise API security illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
