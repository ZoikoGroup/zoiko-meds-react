"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, BadgeCheck, Lock, Info } from "lucide-react";

const platformLinks = [
  { label: "Search medicines", href: "/searchmed/" },
  { label: "Create account", href: "/create-account/" },
  { label: "Saved searches", href: "/saved-searches/" },
  { label: "Availability alerts", href: "#" },
  { label: "Caregiver access", href: "/caregiver-access/" },
  { label: "Availability confidence", href: "/availability-confidence/" },
];

const pharmacyLinks = [
  { label: "Join the network", href: "/join-the-network/" },
  { label: "Pharmacy portal", href: "/pharmacy-portal/" },
  { label: "Verification standards", href: "/verification/" },
  { label: "Inventory upload", href: "/inventory-upload/" },
  { label: "Confirmation requests", href: "/confirmation-requests/" },
  { label: "Pharmacy support", href: "/pharmacy-support/" },
];

const providerLinks = [
  { label: "Provider overview", href: "/provider-overview/" },
  { label: "Patient support workflows", href: "/patient-support/" },
  { label: "Care team access", href: "/care-team-access/" },
  { label: "Availability signals", href: "/availability-signals/" },
  { label: "Referral guidance", href: "/referral-guidance/" },
  { label: "Provider support", href: "/provider-support/" },
];

const enterpriseLinks = [
  { label: "Enterprise solutions", href: "/enterprise-solutions/" },
  { label: "ZoikoSignal™ intelligence", href: "/zoikosignal-intelligence/" },
  { label: "ZoikoAvail™ API", href: "/zoiko-avail-api/" },
  { label: "MediBase™ data", href: "/medibase-data/" },
  { label: "Health systems", href: "/health-systems/" },
  { label: "Government & public health", href: "/government-public-health/" },
];

const trustLinks = [
  { label: "About ZoikoMeds", href: "/about/" },
  { label: "Zoiko Healthcare", href: "/zoiko-healthcare/" },
  { label: "Zoiko Group", href: "/zoiko-group/" },
  { label: "Careers", href: "/careers/" },
  { label: "Press", href: "/press/" },
  { label: "Contact", href: "/contact/" },
];

const legalLinks = [
  { label: "Trust Center", href: "/trust-center/" },
  { label: "Privacy Center", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Settings", href: "#" },
  { label: "Medical Disclaimer", href: "#" },
  { label: "Controlled Medicine Policy", href: "#" },
  { label: "Accessibility", href: "#" },
];

const bottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Compliance", href: "#" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[#00d5be]">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a1733] text-slate-200">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Logo column */}
          <div className="flex-shrink-0 lg:w-auto">
            <Link href="/" className="inline-block w-fit">
              {/* Replace src below with your logo image URL */}
              <Image
                src="/logo.png"
                alt="ZoikoMeds"
                width={220}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Tagline + status pills column (left aligned together) */}
          <div className="flex flex-col items-start gap-4 lg:flex-1 lg:px-4">
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Global medicine availability infrastructure — search, signal,
              verify. Not a pharmacy. No prescribing, dispensing, or medical
              advice.
            </p>

            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Infrastructure monitoring active
              </span>
              <span className="flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/30">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-amber-950">
                  !
                </span>
                47+ Planned Market Framework
              </span>
            </div>
          </div>

          {/* Badges column */}
          <div className="flex flex-shrink-0 flex-wrap items-start gap-3 lg:justify-end">
            <span className="flex items-center gap-2 rounded-full border border-slate-600/60 px-4 py-2 text-xs font-medium text-slate-300">
              <Shield className="h-3.5 w-3.5 text-slate-400" />
              Privacy-led
            </span>
            <span className="flex items-center gap-2 rounded-full border border-slate-600/60 px-4 py-2 text-xs font-medium text-slate-300">
              <BadgeCheck className="h-3.5 w-3.5 text-slate-400" />
              Verified pharmacies
            </span>
            <span className="flex items-center gap-2 rounded-full border border-slate-600/60 px-4 py-2 text-xs font-medium text-slate-300">
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              Zero stock exposed
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/60" />

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
          <FooterColumn title="Platform" links={platformLinks} />
          <FooterColumn title="Pharmacies" links={pharmacyLinks} />
          <FooterColumn title="Healthcare Providers" links={providerLinks} />
          <FooterColumn title="Enterprise & Intelligence" links={enterpriseLinks} />
          <FooterColumn title="Trust & Legal" links={trustLinks} />
          <FooterColumn title="Legal & Trust" links={legalLinks} />
        </div>

        {/* HQ addresses */}
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div className="flex gap-3 text-sm">
            <span className="font-semibold text-teal-400">US HQ</span>
            <span className="text-slate-400">
              1401 21st Street, Suite R,
              <br />
              Sacramento, CA 95811, USA
            </span>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="font-semibold text-teal-400">EU HQ</span>
            <span className="text-slate-400">
              67–69 Great Portland Street, 5th Floor,
              <br />
              London W1W 5PF, UK
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/60" />

      {/* Copyright line */}
      <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-slate-500 sm:px-8 lg:px-12">
        © 2026 ZoikoMeds &nbsp;|&nbsp; ZoikoMeds is a governed platform
        operated by Zoiko Healthcare Inc &nbsp;|&nbsp; Zoiko Healthcare Inc is
        a subsidiary of Zoiko Group Inc
      </div>

      {/* Disclaimer box */}
      <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-12">
        <div className="flex gap-3 rounded-xl border border-slate-700/60 bg-slate-800/30 p-4 sm:p-5">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-400" />
          <p className="text-xs leading-relaxed text-slate-400">
            ZoikoMeds provides medicine availability information from
            participating verified pharmacies.{" "}
            <span className="font-semibold text-slate-300">
              ZoikoMeds is not a pharmacy, does not prescribe, dispense, sell,
              deliver, or recommend medicines, and does not provide medical
              advice.
            </span>{" "}
            Availability information is confidence-based and not a guarantee
            of stock. Prescription rules, pharmacist judgment, verification
            requirements, and jurisdiction-specific laws always apply. In a
            medical emergency, contact local emergency services immediately.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700/60" />

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
          {bottomLinks.map((link, idx) => (
            <span key={link.label} className="flex items-center">
              <Link href={link.href} className="hover:text-slate-300">
                {link.label}
              </Link>
              {idx < bottomLinks.length - 1 && (
                <span className="ml-4 text-slate-700">|</span>
              )}
            </span>
          ))}
        </div>
        <div>© 2026 Zoiko Group Inc. All rights reserved.</div>
      </div>
    </footer>
  );
}