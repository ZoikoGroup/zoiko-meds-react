"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, CheckCircle, Lock, MapPin, Info } from "lucide-react";

// ── Footer link columns data ───────────────────────────────────────────────
const FOOTER_COLUMNS = [
  {
    heading: "PLATFORM",
    links: [
      { label: "Search medicines", href: "/platform/search" },
      { label: "Create account", href: "/platform/account" },
      { label: "Saved searches", href: "/platform/saved" },
      { label: "Availability alerts", href: "/platform/alerts" },
      { label: "Caregiver access", href: "/platform/caregiver" },
      { label: "Availability confidence", href: "/platform/confidence" },
    ],
  },
  {
    heading: "PHARMACIES",
    links: [
      { label: "Join the network", href: "/pharmacies/join" },
      { label: "Pharmacy portal", href: "/pharmacies/portal" },
      { label: "Verification standards", href: "/pharmacies/verification" },
      { label: "Inventory upload", href: "/pharmacies/inventory" },
      { label: "Confirmation requests", href: "/pharmacies/confirmations" },
      { label: "Pharmacy support", href: "/pharmacies/support" },
    ],
  },
  {
    heading: "HEALTHCARE PROVIDERS",
    links: [
      { label: "Provider overview", href: "/providers/overview" },
      { label: "Patient support workflows", href: "/providers/workflows" },
      { label: "Care team access", href: "/providers/care-team" },
      { label: "Availability signals", href: "/providers/signals" },
      { label: "Referral guidance", href: "/providers/referral" },
      { label: "Provider support", href: "/providers/support" },
    ],
  },
  {
    heading: "ENTERPRISE & INTELLIGENCE",
    links: [
      { label: "Enterprise solutions", href: "/enterprise/solutions" },
      { label: "ZoikoSignal™ intelligence", href: "/enterprise/signal" },
      { label: "ZoikoAvail™ API", href: "/enterprise/api" },
      { label: "MediBase™ data", href: "/enterprise/medibase" },
      { label: "Health systems", href: "/enterprise/health-systems" },
      { label: "Government & public health", href: "/enterprise/government" },
    ],
  },
  {
    heading: "TRUST & LEGAL",
    links: [
      { label: "About ZoikoMeds", href: "/about" },
      { label: "Zoiko Healthcare", href: "/about/healthcare" },
      { label: "Zoiko Group", href: "/about/group" },
      { label: "Careers", href: "/about/careers" },
      { label: "Press", href: "/about/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "LEGAL & TRUST",
    links: [
      { label: "Trust Center", href: "/legal/trust" },
      { label: "Privacy Center", href: "/legal/privacy" },
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Cookie Settings", href: "/legal/cookies" },
      { label: "Medical Disclaimer", href: "/legal/disclaimer" },
      { label: "Controlled Medicine Policy", href: "/legal/controlled" },
      { label: "Accessibility", href: "/legal/accessibility" },
    ],
  },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Privacy-led" },
  { icon: CheckCircle, label: "Verified pharmacies" },
  { icon: Lock, label: "Zero stock exposed" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f1f4e", color: "white", fontFamily: "var(--font-jakarta), sans-serif" }}>

      {/* ── TOP SECTION: Logo + tagline + badges ── */}
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "48px 24px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "32px" }}>

          {/* Logo + tagline + pills */}
          <div style={{ maxWidth: "360px" }}>
            {/* Logo — replace /logo.png with your logo file in /public */}
            <div style={{ marginBottom: "16px" }}>
              <Image
                src="/logo.png"
                alt="ZoikoMeds"
                width={180}
                height={44}
                style={{ objectFit: "contain" }}
              />
            </div>

            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: "1.65", marginBottom: "20px" }}>
              Global medicine availability infrastructure — search, signal, verify. Not a pharmacy. No prescribing, dispensing, or medical advice.
            </p>

            {/* Status pills */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {/* Pill 1 — green monitoring */}
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                backgroundColor: "rgba(0,169,157,0.12)", border: "1px solid rgba(0,169,157,0.3)",
                borderRadius: "999px", padding: "5px 12px",
              }}>
                <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px" }}>
                  <span style={{
                    position: "absolute", inset: 0, borderRadius: "50%",
                    backgroundColor: "#00A99D", opacity: 0.7,
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  }} />
                  <span style={{ position: "relative", display: "inline-flex", width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#00A99D" }} />
                </span>
                <span style={{ color: "#00A99D", fontSize: "12px", fontWeight: 500 }}>Infrastructure monitoring active</span>
              </div>

              {/* Pill 2 — amber market */}
              <div style={{
                display: "flex", alignItems: "center", gap: "6px",
                backgroundColor: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "999px", padding: "5px 12px",
              }}>
                <span style={{ fontSize: "13px" }}>🌐</span>
                <span style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 500 }}>47+ Planned Market Framework</span>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px", padding: "10px 16px",
                transition: "all 0.2s ease", cursor: "default",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,169,157,0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Icon size={15} color="#00A99D" />
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LINK COLUMNS ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "32px",
        }}
          className="footer-grid"
        >
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 style={{
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.45)", marginBottom: "16px", textTransform: "uppercase",
              }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      color: "rgba(255,255,255,0.65)", fontSize: "13.5px",
                      textDecoration: "none", transition: "color 0.15s ease",
                      display: "inline-block",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── HQ ADDRESSES ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "28px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "48px", flexWrap: "wrap" }}>
          {/* US HQ */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              backgroundColor: "rgba(38,61,136,0.5)", border: "1px solid rgba(38,61,136,0.8)",
              borderRadius: "6px", padding: "3px 8px", flexShrink: 0, marginTop: "2px",
            }}>
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#7c9fe8", letterSpacing: "0.05em" }}>US HQ</span>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                1401 21st Street, Suite R,<br />Sacramento, CA 95811, USA
              </p>
            </div>
          </div>

          {/* EU HQ */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "4px",
              backgroundColor: "rgba(38,61,136,0.5)", border: "1px solid rgba(38,61,136,0.8)",
              borderRadius: "6px", padding: "3px 8px", flexShrink: 0, marginTop: "2px",
            }}>
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#7c9fe8", letterSpacing: "0.05em" }}>EU HQ</span>
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                67–69 Great Portland Street, 5th Floor,<br />London W1W 5PF, UK
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── COPYRIGHT BAR ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12.5px" }}>© 2026 ZoikoMeds</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12.5px" }}>ZoikoMeds is a governed platform operated by Zoiko Healthcare Inc.</span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>|</span>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12.5px" }}>Zoiko Healthcare Inc is a subsidiary of Zoiko Group Inc.</span>
        </div>
      </div>

      {/* ── DISCLAIMER BOX ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{
          display: "flex", alignItems: "flex-start", gap: "14px",
          backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px", padding: "18px 20px",
        }}>
          <div style={{ flexShrink: 0, marginTop: "2px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Info size={14} color="rgba(255,255,255,0.5)" />
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>
            ZoikoMeds provides medicine availability information from participating verified pharmacies.{" "}
            <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
              ZoikoMeds is not a pharmacy, does not prescribe, dispense, sell, deliver, or recommend medicines, and does not provide medical advice.
            </strong>{" "}
            Availability information is confidence-based and not a guarantee of stock. Prescription rules, pharmacist judgment, verification requirements, and jurisdiction-specific laws always apply.{" "}
            <strong style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>
              In a medical emergency, contact local emergency services immediately.
            </strong>
          </p>
        </div>
      </div>

      {/* ── BOTTOM NAV BAR ── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 24px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          {/* Bottom links */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
            {["Privacy", "Terms", "Cookies", "Accessibility", "Compliance"].map((item, i, arr) => (
              <span key={item} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Link href={`/legal/${item.toLowerCase()}`} style={{
                  color: "rgba(255,255,255,0.5)", fontSize: "12.5px", textDecoration: "none",
                  padding: "2px 4px", borderRadius: "4px", transition: "color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "white"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"}
                >{item}</Link>
                {i < arr.length - 1 && (
                  <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>|</span>
                )}
              </span>
            ))}
          </div>

          {/* Right copyright */}
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12.5px" }}>
            © 2026 Zoiko Group Inc. All rights reserved.
          </span>
        </div>
      </div>

      {/* Responsive grid + animation styles */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}