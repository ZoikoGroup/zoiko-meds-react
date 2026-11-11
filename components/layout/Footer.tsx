"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, BadgeCheck, Lock, Info } from "lucide-react";
import { useTranslation } from "@/components/language/LocaleProvider";
import type { MessageKey } from "@/lib/i18n/messages";
import type { Translator } from "@/lib/i18n/translate";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.43v6.31ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.4 8.46L23.3 22h-6.9l-5.4-6.7L4.8 22H1.6l7.9-9.03L1 2h7.06l4.9 6.13L18.9 2Zm-1.2 18h1.9L7.4 3.9H5.36L17.7 20Z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12.06c0-1.9-.15-3.05-.44-4.14a2.94 2.94 0 0 0-2.06-2.06C18.24 5.5 12 5.5 12 5.5s-6.24 0-7.5.36a2.94 2.94 0 0 0-2.06 2.06C2.15 9.01 2 10.16 2 12.06c0 1.9.15 3.06.44 4.15a2.94 2.94 0 0 0 2.06 2.05c1.26.37 7.5.37 7.5.37s6.24 0 7.5-.37a2.94 2.94 0 0 0 2.06-2.05c.29-1.09.44-2.25.44-4.15Zm-11.75 2.9V9.16l5.15 2.9-5.15 2.9Z" />
    </svg>
  );
}

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.63 7.86 6.35 9.33-.09-.79-.17-2.01.04-2.88.19-.79 1.22-5.03 1.22-5.03s-.31-.62-.31-1.54c0-1.44.84-2.52 1.87-2.52.88 0 1.31.66 1.31 1.45 0 .88-.56 2.2-.85 3.42-.24 1.02.51 1.86 1.52 1.86 1.82 0 3.05-2.34 3.05-5.11 0-2.11-1.42-3.68-4-3.68-2.92 0-4.74 2.18-4.74 4.61 0 .84.25 1.43.63 1.89.18.21.2.3.14.54-.05.18-.16.63-.2.8-.07.26-.27.35-.5.25-1.39-.57-2.04-2.09-2.04-3.8 0-2.83 2.38-6.22 7.11-6.22 3.8 0 6.3 2.75 6.3 5.7 0 3.9-2.17 6.82-5.37 6.82-1.07 0-2.09-.58-2.43-1.24 0 0-.58 2.28-.7 2.72-.21.77-.63 1.54-1.01 2.15A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/zoikomeds/", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zoiko-meds/", icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/zoikomeds/", icon: InstagramIcon },
  { label: "Twitter", href: "https://x.com/ZoikoMeds", icon: TwitterXIcon },
  { label: "YouTube", href: "https://www.youtube.com/@ZoikoMeds", icon: YoutubeIcon },
  { label: "Pinterest", href: "https://www.pinterest.com/zoikomeds/", icon: PinterestIcon },
];

interface FooterLink {
  key: MessageKey;
  href: string;
}

const platformLinks: FooterLink[] = [
  { key: "footer.platform.search", href: "/searchmed/" },
  { key: "footer.platform.createAccount", href: "/register" },
  { key: "footer.platform.savedSearches", href: "/saved-searches/" },
  { key: "footer.platform.alerts", href: "/availability-alert/" },
  { key: "footer.platform.caregiver", href: "/caregiver-access/" },
  { key: "footer.platform.confidence", href: "/availability-confidence/" },
];

const pharmacyLinks: FooterLink[] = [
  { key: "footer.pharmacies.join", href: "/join-the-network/" },
  { key: "footer.pharmacies.portal", href: "/pharmacy-portal/" },
  { key: "footer.pharmacies.verification", href: "/verification/" },
  { key: "footer.pharmacies.inventory", href: "/inventory-upload/" },
  { key: "footer.pharmacies.confirmations", href: "/confirmation-requests/" },
  { key: "footer.pharmacies.support", href: "/pharmacy-support/" },
];

const providerLinks: FooterLink[] = [
  { key: "footer.providers.overview", href: "/provider-overview/" },
  { key: "footer.providers.patientSupport", href: "/patient-support/" },
  { key: "footer.providers.careTeam", href: "/care-team-access/" },
  { key: "footer.providers.signals", href: "/availability-signals/" },
  { key: "footer.providers.referral", href: "/referral-guidance/" },
  { key: "footer.providers.support", href: "/provider-support/" },
];

const enterpriseLinks: FooterLink[] = [
  { key: "footer.enterprise.solutions", href: "/enterprise-solutions/" },
  { key: "footer.enterprise.signal", href: "/zoikosignal-intelligence/" },
  { key: "footer.enterprise.availApi", href: "/zoiko-avail-api/" },
  { key: "footer.enterprise.medibase", href: "/medibase-data/" },
  { key: "footer.enterprise.healthSystems", href: "/health-systems/" },
  { key: "footer.enterprise.government", href: "/government-public-health/" },
];

const trustLinks: FooterLink[] = [
  { key: "footer.company.about", href: "/about/" },
  { key: "footer.company.healthcare", href: "/zoiko-healthcare/" },
  { key: "footer.company.group", href: "/zoiko-group/" },
  { key: "footer.company.careers", href: "/careers/" },
  { key: "footer.company.press", href: "/press/" },
  { key: "footer.company.contact", href: "/contact/" },
];

const legalLinks: FooterLink[] = [
  { key: "footer.legal.trustCenter", href: "/trust-center/" },
  { key: "footer.legal.privacyCenter", href: "/privacy-center/" },
  { key: "footer.legal.terms", href: "/terms-of-use/" },
  { key: "footer.legal.cookies", href: "/cookie-settings/" },
  { key: "footer.legal.medicalDisclaimer", href: "/medical-disclaimer/" },
  { key: "footer.legal.controlledMedicine", href: "/controlled-medicine-policy/" },
  { key: "footer.legal.accessibility", href: "/accessibility/" },
];

const bottomLinks: FooterLink[] = [
  { key: "footer.bottom.privacy", href: "#" },
  { key: "footer.bottom.terms", href: "#" },
  { key: "footer.bottom.cookies", href: "#" },
  { key: "footer.bottom.accessibility", href: "#" },
  { key: "footer.bottom.compliance", href: "#" },
];

function FooterColumn({
  title,
  links,
  t,
}: {
  title: MessageKey;
  links: FooterLink[];
  t: Translator;
}) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-[#00d5be]">
        {t(title)}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {t(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const t = useTranslation();
  const year = new Date().getFullYear();

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
              {t("footer.tagline")}
            </p>

            {/* Status pills */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t("footer.status.monitoring")}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/30">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-amber-950">
                  !
                </span>
                {t("footer.status.markets")}
              </span>
            </div>
          </div>

          {/* Badges column */}
          <div className="flex flex-shrink-0 flex-col items-start gap-3 lg:items-end">
            <div className="flex flex-wrap items-start gap-3 lg:justify-end">
              <span className="flex items-center gap-2 rounded-full border border-slate-600/60 px-4 py-2 text-xs font-medium text-slate-300">
                <Shield className="h-3.5 w-3.5 text-slate-400" />
                {t("footer.badge.privacy")}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-600/60 px-4 py-2 text-xs font-medium text-slate-300">
                <BadgeCheck className="h-3.5 w-3.5 text-slate-400" />
                {t("footer.badge.verified")}
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-600/60 px-4 py-2 text-xs font-medium text-slate-300">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                {t("footer.badge.noStock")}
              </span>
            </div>
            <div className="flex w-full items-center gap-3 lg:justify-start">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/60 text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-200"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/60" />

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
          <FooterColumn title="footer.columns.platform" links={platformLinks} t={t} />
          <FooterColumn title="footer.columns.pharmacies" links={pharmacyLinks} t={t} />
          <FooterColumn title="footer.columns.providers" links={providerLinks} t={t} />
          <FooterColumn title="footer.columns.enterprise" links={enterpriseLinks} t={t} />
          <FooterColumn title="footer.columns.company" links={trustLinks} t={t} />
          <FooterColumn title="footer.columns.legal" links={legalLinks} t={t} />
        </div>

        {/* HQ addresses */}
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:gap-12">
          <div className="flex gap-3 text-sm">
            <span className="font-semibold text-teal-400">{t("footer.hq.us")}</span>
            <span className="text-slate-400">
              1401 21st Street, Suite R,
              <br />
              Sacramento, CA 95811, USA
            </span>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="font-semibold text-teal-400">{t("footer.hq.eu")}</span>
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
        {t("footer.operator", { year })}
      </div>

      {/* Disclaimer box */}
      <div className="mx-auto max-w-7xl px-6 pb-8 sm:px-8 lg:px-12">
        <div className="flex gap-3 rounded-xl border border-slate-700/60 bg-slate-800/30 p-4 sm:p-5">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-400" />
          <p className="text-xs leading-relaxed text-slate-400">
            {t("footer.disclaimer.intro")}{" "}
            <span className="font-semibold text-slate-300">
              {t("footer.disclaimer.emphasis")}
            </span>{" "}
            {t("footer.disclaimer.rest")}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-700/60" />

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-start">
          {bottomLinks.map((link, idx) => (
            <span key={link.key} className="flex items-center">
              <Link href={link.href} className="hover:text-slate-300">
                {t(link.key)}
              </Link>
              {idx < bottomLinks.length - 1 && (
                <span className="ml-4 text-slate-700">|</span>
              )}
            </span>
          ))}
        </div>
        <div>{t("footer.copyright", { year })}</div>
      </div>
    </footer>
  );
}