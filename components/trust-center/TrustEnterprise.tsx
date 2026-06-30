"use client"
import { useState } from "react";
import { FileText, Lock, ShieldCheck, Home, Info } from "lucide-react";

type CardData = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  primary?: boolean;
};

const cards: CardData[] = [
  {
    icon: <FileText size={18} />,
    title: "Trust Pack",
    desc: "Enterprise buyers, public-sector stakeholders, legal teams, procurement teams, and strategic partners.",
    cta: "Request Trust Pack",
    primary: true,
  },
  {
    icon: <Lock size={18} />,
    title: "Security Pack",
    desc: "CISOs, security reviewers, IT teams, API buyers, and health-system security teams.",
    cta: "Request Security Pack",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Privacy & data governance review",
    desc: "Privacy teams, legal teams, health systems, governments, and data buyers.",
    cta: "Request Data Governance Review",
  },
  {
    icon: <Home size={18} />,
    title: "Public-sector trust review",
    desc: "Government, public health, emergency preparedness, and jurisdiction-level stakeholders.",
    cta: "Request Public Health Briefing",
  },
];

function Card({ icon, title, desc, cta, primary }: CardData) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-teal-400/10 text-teal-400 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          <p className="text-slate-400 text-sm mt-1">{desc}</p>
        </div>
      </div>
      <button
        className={
          primary
            ? "self-start px-4 py-2 rounded-lg bg-[#13A594] text-white text-sm font-semibold hover:bg-teal-400 transition"
            : "self-start px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition"
        }
      >
        {cta}
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  placeholder,
  type = "text",
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-slate-900">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-700 placeholder:text-slate-400 bg-[#FBFCFE] focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </label>
  );
}

function SelectField({
  label,
  required,
  placeholder,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold text-slate-900">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <select className="w-full rounded-lg border border-slate-300 px-4 py-3 bg-[#FBFCFE] text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500">
        <option>{placeholder}</option>
      </select>
    </label>
  );
}

export default function TrustEnterprise() {
  const [note, setNote] = useState("");

  return (
    <section className="min-h-screen bg-[#0a1525] px-6 md:px-54 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="text-[#34D6C4] text-xs font-semibold tracking-[2px] mb-3">
          06 &nbsp;&middot;&nbsp; ENTERPRISE TRUST ACCESS
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Review the governance — through the
          <br className="hidden sm:block" />
          <span className="text-[#0FAA87]">right workflow.</span>
        </h1>
        <p className="text-[#566476] mt-4 max-w-2xl">
          Gated trust materials are provided after verification, role review, or contract scope.
        </p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-5 mt-10">
          {cards.map((c) => (
            <Card key={c.title} {...c} />
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl mt-12 p-6 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">Request Trust Pack</h2>
          <p className="text-slate-500 text-sm mt-2 max-w-2xl">
            We route your request to the right trust, security, privacy, legal, enterprise, or
            public-sector review team.
          </p>

          <form className="mt-8 flex bg-[#FBFCFE] flex-col gap-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Work email" required placeholder="name@organization.org" type="email" />
              <Field label="Full name" required placeholder="Full name" />
            </div>
            <div className="grid sm:grid-cols-2 text-[#0D1B2E] gap-6">
              <Field label="Organization name" required placeholder="Organization" />
              <SelectField label="Organization type" required placeholder="Select type" />
            </div>
            <SelectField label="Trust request type" required placeholder="Select request" />

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-slate-900">
                Brief note <span className="font-normal text-slate-400">(optional)</span>
              </span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Your review, procurement, security, privacy, or public-sector need."
                rows={4}
                className="w-full rounded bg-[#FBFCFE]-lg border border-slate-300 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#13A594] cursor-pointer hover:bg-teal-600 transition text-white font-semibold py-3"
            >
              Request Trust Pack
            </button>

            <p className="flex items-start gap-2 text-xs text-slate-500">
             <img src="/trust-center/verify.png" alt="image" width={15} height={15} />
              Don't include PHI, patient identifiers, exact stock, API secrets, passwords, license
              documents, commercial terms, or audit records in this form.
            </p>
          </form>
        </div>

        {/* Footer CTA */}
        <div className="border bg-[linear-gradient(180deg,_#102540_0%,_#0C1B30_100%)] border-white/10 rounded-2xl mt-12 p-10 text-center">
          <h3 className="text-2xl font-bold text-white">
            Trust built for medicine{" "}
            <span className="text-[#0FAA87]">availability infrastructure.</span>
          </h3>
          <p className="text-[#E7EEF6B2] mt-4 max-w-[480px] mx-auto">
            Review ZoikoMeds privacy, security, verification, availability confidence, controlled
            medicine, accessibility, and enterprise governance materials.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button className="px-5 py-2.5 rounded-lg bg-[#13A594] cursor-pointer hover:bg-teal-600 transition text-white text-sm font-semibold">
              Request Trust Pack
            </button>
            <button className="px-5 py-2.5 rounded-lg cursor-pointer border border-white/25 hover:bg-white/5 transition text-white text-sm font-semibold">
              View Privacy Center
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
