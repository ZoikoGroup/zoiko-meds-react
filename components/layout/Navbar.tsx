"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";

interface DropdownItem { label: string; href: string; description?: string; }
interface NavItem { label: string; href?: string; dropdown?: DropdownItem[]; }

const NAV_ITEMS: NavItem[] = [
  { label: "Platform", href: "/platform/", dropdown: [
    { label: "Overview", href: "/overview/", description: "See the full platform" },
    { label: "Features", href: "/features", description: "Core capabilities" },
    { label: "Security", href: "/security/", description: "Enterprise-grade security" },
    { label: "Integrations", href: "/integrations/", description: "Connect your tools" },
  ]},
  { label: "Patients", href: "/patient/", dropdown: [
    { label: "Patient Portal", href: "/patient-portal/", description: "Access health records" },
    { label: "Prescriptions", href: "/prescriptions/", description: "Manage medications" },
    { label: "Appointments", href: "/appointments/", description: "Schedule & track visits" },
  ]},
  { label: "Pharmacies", href: "/pharmacy/", dropdown: [
    { label: "Pharmacy Dashboard", href: "/pharmacy-dashboard", description: "Manage your pharmacy" },
    { label: "Inventory", href: "/pharmacy-inventory", description: "Real-time stock management" },
    { label: "Dispensing", href: "/pharmacy-dispensing", description: "Streamlined dispensing" },
  ]},
  { label: "Enterprise", href: "/enterprise/", dropdown: [
    { label: "Hospital Systems", href: "/hospital-systems/", description: "Large-scale deployments" },
    { label: "Clinic Networks", href: "/clinic-networks/", description: "Multi-location management" },
    { label: "API Access", href: "/enterprise/api", description: "Custom integrations" },
  ]},
  { label: "Intelligence", href: "/intelligence/", dropdown: [
    { label: "Analytics", href: "/analytics/", description: "Data-driven insights" },
    { label: "AI Insights", href: "/ai-insights/", description: "Predictive health intelligence" },
    { label: "Reports", href: "/reports", description: "Compliance & performance" },
  ]},
  { label: "About", href: "/about/" },
];

function USFlag() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: "2px", flexShrink: 0, display: "block" }}>
      <rect width="20" height="14" fill="#B22234"/>
      <rect y="1.08" width="20" height="1.08" fill="white"/>
      <rect y="3.23" width="20" height="1.08" fill="white"/>
      <rect y="5.38" width="20" height="1.08" fill="white"/>
      <rect y="7.54" width="20" height="1.08" fill="white"/>
      <rect y="9.69" width="20" height="1.08" fill="white"/>
      <rect y="11.85" width="20" height="1.08" fill="white"/>
      <rect width="8" height="7.54" fill="#3C3B6E"/>
      <circle cx="1.1" cy="1.1" r="0.5" fill="white"/><circle cx="2.5" cy="1.1" r="0.5" fill="white"/>
      <circle cx="3.9" cy="1.1" r="0.5" fill="white"/><circle cx="5.3" cy="1.1" r="0.5" fill="white"/>
      <circle cx="6.7" cy="1.1" r="0.5" fill="white"/>
      <circle cx="1.8" cy="2.15" r="0.5" fill="white"/><circle cx="3.2" cy="2.15" r="0.5" fill="white"/>
      <circle cx="4.6" cy="2.15" r="0.5" fill="white"/><circle cx="6.0" cy="2.15" r="0.5" fill="white"/>
      <circle cx="1.1" cy="3.2" r="0.5" fill="white"/><circle cx="2.5" cy="3.2" r="0.5" fill="white"/>
      <circle cx="3.9" cy="3.2" r="0.5" fill="white"/><circle cx="5.3" cy="3.2" r="0.5" fill="white"/>
      <circle cx="6.7" cy="3.2" r="0.5" fill="white"/>
      <circle cx="1.8" cy="4.25" r="0.5" fill="white"/><circle cx="3.2" cy="4.25" r="0.5" fill="white"/>
      <circle cx="4.6" cy="4.25" r="0.5" fill="white"/><circle cx="6.0" cy="4.25" r="0.5" fill="white"/>
      <circle cx="1.1" cy="5.3" r="0.5" fill="white"/><circle cx="2.5" cy="5.3" r="0.5" fill="white"/>
      <circle cx="3.9" cy="5.3" r="0.5" fill="white"/><circle cx="5.3" cy="5.3" r="0.5" fill="white"/>
      <circle cx="6.7" cy="5.3" r="0.5" fill="white"/>
      <circle cx="1.8" cy="6.35" r="0.5" fill="white"/><circle cx="3.2" cy="6.35" r="0.5" fill="white"/>
      <circle cx="4.6" cy="6.35" r="0.5" fill="white"/><circle cx="6.0" cy="6.35" r="0.5" fill="white"/>
    </svg>
  );
}

function DropdownMenu({ items, visible }: { items: DropdownItem[]; visible: boolean }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: "50%",
      transform: visible ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-8px) scale(0.96)",
      marginTop: "10px", width: "232px", backgroundColor: "white",
      borderRadius: "14px", boxShadow: "0 12px 36px rgba(19,29,68,0.16)",
      border: "1px solid #eef1f6", overflow: "hidden", zIndex: 50,
      transition: "opacity 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.22s cubic-bezier(0.16,1,0.3,1)",
      opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{ padding: "8px 0" }}>
        {items.map((item, i) => (
          <Link key={item.label} href={item.href}
            style={{
              display: "flex", flexDirection: "column", padding: "10px 16px", textDecoration: "none",
              transition: "background 0.15s ease, transform 0.15s ease",
              transitionDelay: visible ? `${i * 25}ms` : "0ms",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F0F4FF"; e.currentTarget.style.transform = "translateX(2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateX(0)"; }}
          >
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#1E2F6E" }}>{item.label}</span>
            {item.description && <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{item.description}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", width: "22px", height: "22px" }}>
      <span style={{ display: "block", height: "2px", background: "#1E2F6E", borderRadius: "2px", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s", transformOrigin: "center", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
      <span style={{ display: "block", height: "2px", background: "#1E2F6E", borderRadius: "2px", transition: "opacity 0.2s", opacity: open ? 0 : 1 }} />
      <span style={{ display: "block", height: "2px", background: "#1E2F6E", borderRadius: "2px", transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s", transformOrigin: "center", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = original; };
    }
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      <style>{`
        @keyframes navPing {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes navFadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-desktop { display: none !important; }
        .nav-tablet-ctas { display: none !important; }
        .nav-hamburger { display: flex !important; }
        .nav-logo-img { width: 132px !important; height: 33px !important; }
        .nav-topbar-emergency { display: none !important; }
        .nav-topbar-divider { display: none !important; }
        .nav-topbar-flag-text { display: none !important; }

        /* Small phones */
        @media (min-width: 380px) {
          .nav-logo-img { width: 144px !important; height: 36px !important; }
        }

        /* Tablets and up: show flag text, divider */
        @media (min-width: 640px) {
          .nav-topbar-divider { display: block !important; }
          .nav-topbar-flag-text { display: inline !important; }
          .nav-logo-img { width: 156px !important; height: 39px !important; }
        }

        /* Tablets: show a compact CTA (icon button) instead of full hamburger-only */
        @media (min-width: 768px) and (max-width: 1023px) {
          .nav-tablet-ctas { display: flex !important; }
        }

        /* Desktop nav kicks in */
        @media (min-width: 1024px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-tablet-ctas { display: none !important; }
          .nav-topbar-emergency { display: inline !important; }
          .nav-logo-img { width: 160px !important; height: 40px !important; }
        }

        /* Large desktop: a touch more breathing room */
        @media (min-width: 1280px) {
          .nav-container { padding-left: 32px !important; padding-right: 32px !important; }
        }

        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: "";
          position: absolute;
          left: 12px; right: 12px; bottom: 4px;
          height: 2px;
          border-radius: 2px;
          background: #00A99D;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link-underline:hover::after,
        .nav-link-underline[data-active="true"]::after {
          transform: scaleX(1);
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* ── TOP INFO BAR ── */}
      <div style={{
        maxHeight: scrolled ? "0px" : "40px",
        opacity: scrolled ? 0 : 1,
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease",
        backgroundColor: "#16265C",
      }}>
        <div className="nav-container" style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 16px",
          height: "40px", display: "flex", alignItems: "center",
          minWidth: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0, minWidth: 0 }}>
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px", flexShrink: 0 }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                backgroundColor: "#00A99D", opacity: 0.7,
                animation: "navPing 1.5s cubic-bezier(0,0,0.2,1) infinite",
              }} />
              <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00A99D" }} />
            </span>
            <span style={{
              color: "#00A99D", fontSize: "11.5px", fontWeight: 600, whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
            }}>
              Infrastructure monitoring active
            </span>
          </div>

          <div className="nav-topbar-divider" style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.18)", margin: "0 14px", flexShrink: 0 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
            <USFlag />
            <span className="nav-topbar-flag-text" style={{ color: "rgba(255,255,255,0.88)", fontSize: "11.5px", fontWeight: 500, whiteSpace: "nowrap" }}>
              United States — Beta Launch
            </span>
          </div>

          <div style={{ flex: 1, minWidth: "8px" }} />

          <span className="nav-topbar-emergency" style={{
            color: "rgba(255,255,255,0.55)", fontSize: "11.5px", textAlign: "right",
            flexShrink: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            For emergencies, call local emergency services. ZoikoMeds does not provide medical advice.
          </span>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header style={{
        position: scrolled ? "fixed" : "relative",
        top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "white",
        borderBottom: "1px solid #f0f0f0",
        boxShadow: scrolled ? "0 4px 20px rgba(19,29,68,0.10)" : "none",
        transition: "box-shadow 0.3s ease",
        width: "100%",
      }}>
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, #1E2F6E, #00A99D, #1E2F6E)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />

        <div className="nav-container" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", gap: "12px" }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0, transition: "transform 0.2s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              <Image
                src="/logo.png"
                alt="ZoikoMeds"
                width={160}
                height={40}
                priority
                className="nav-logo-img"
                style={{ objectFit: "contain", width: "144px", height: "36px" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="nav-desktop" style={{ alignItems: "center", gap: "2px", flex: 1, justifyContent: "center" }}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} style={{ position: "relative" }}
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Plain link (no dropdown) */}
                  {!item.dropdown ? (
                    <Link href={item.href!} className="nav-link-underline" style={{
                      display: "flex", alignItems: "center",
                      padding: "8px 12px", borderRadius: "8px",
                      fontSize: "14px", fontWeight: 500, textDecoration: "none",
                      fontFamily: "var(--font-jakarta), sans-serif",
                      color: "#374151", whiteSpace: "nowrap",
                      transition: "color 0.15s ease, background 0.15s ease",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#1E2F6E"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#374151"; }}
                    >
                      {item.label}
                    </Link>
                  ) : item.href ? (
                    /* Clickable link that also has a dropdown */
                    <Link href={item.href} className="nav-link-underline" data-active={activeDropdown === item.label} style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      padding: "8px 12px", borderRadius: "8px",
                      fontSize: "14px", fontWeight: 500, textDecoration: "none", cursor: "pointer",
                      fontFamily: "var(--font-jakarta), sans-serif", whiteSpace: "nowrap",
                      backgroundColor: activeDropdown === item.label ? "#F0F4FF" : "transparent",
                      color: activeDropdown === item.label ? "#1E2F6E" : "#374151",
                      transition: "all 0.15s ease",
                    }}>
                      {item.label}
                      <ChevronDown size={14} style={{ transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)", transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </Link>
                  ) : (
                    /* Button with dropdown, no direct link */
                    <button className="nav-link-underline" data-active={activeDropdown === item.label} style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      padding: "8px 12px", borderRadius: "8px", border: "none",
                      fontSize: "14px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                      fontFamily: "var(--font-jakarta), sans-serif",
                      backgroundColor: activeDropdown === item.label ? "#F0F4FF" : "transparent",
                      color: activeDropdown === item.label ? "#1E2F6E" : "#374151",
                      transition: "all 0.15s ease",
                    }}>
                      {item.label}
                      <ChevronDown size={14} style={{ transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)", transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>
                  )}

                  {item.dropdown && <DropdownMenu items={item.dropdown} visible={activeDropdown === item.label} />}
                </div>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="nav-desktop" style={{ alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <Link href="/sign-in" style={{
                fontSize: "13.5px", fontWeight: 600, color: "#374151",
                padding: "8px 16px", borderRadius: "999px", textDecoration: "none",
                transition: "all 0.18s ease", border: "1.5px solid #e5e7eb", whiteSpace: "nowrap",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F0F4FF"; (e.currentTarget as HTMLElement).style.color = "#1E2F6E"; (e.currentTarget as HTMLElement).style.borderColor = "#1E2F6E"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "#374151"; (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; }}
              >
                Sign In
              </Link>
              <Link href="/request-a-briefing/" style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "#00A99D", color: "white",
                fontSize: "13.5px", fontWeight: 600,
                padding: "10px 20px", borderRadius: "999px", textDecoration: "none",
                boxShadow: "0 2px 10px rgba(0,169,157,0.32)",
                transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)", whiteSpace: "nowrap",
                fontFamily: "var(--font-jakarta), sans-serif",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#019186"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,169,157,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#00A99D"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(0,169,157,0.32)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <Phone size={14} />
                Request a Briefing
              </Link>
            </div>

            {/* Tablet compact CTA (icon-only, between mobile and desktop) */}
            <div className="nav-tablet-ctas" style={{ alignItems: "center", gap: "8px", flexShrink: 0 }}>
              <Link href="/request-a-briefing/" aria-label="Request a Briefing" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px",
                backgroundColor: "#00A99D", color: "white",
                borderRadius: "50%", textDecoration: "none",
                boxShadow: "0 2px 10px rgba(0,169,157,0.32)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#019186"; (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#00A99D"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                <Phone size={16} />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ padding: "8px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer", flexShrink: 0, transition: "background 0.15s ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F4F6FA"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Menu */}
        <div className="nav-hamburger-menu" style={{
          maxHeight: mobileOpen ? "85vh" : "0px", opacity: mobileOpen ? 1 : 0,
          overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
          borderTop: "1px solid #f0f0f0",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px 20px", overflowY: "auto", maxHeight: "75vh", WebkitOverflowScrolling: "touch" }}>
            {NAV_ITEMS.map((item, idx) => (
              <div key={item.label} style={{
                borderBottom: "1px solid #f7f7f7",
                animation: mobileOpen ? `navFadeSlideDown 0.3s ease ${idx * 35}ms both` : "none",
              }}>
                {/* Mobile: plain link for items without dropdown, accordion for others */}
                {!item.dropdown ? (
                  <Link href={item.href!}
                    style={{ display: "block", padding: "14px 4px", fontSize: "15px", fontWeight: 600, color: "#1f2937", textDecoration: "none" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {item.href ? (
                        <Link href={item.href}
                          style={{ flex: 1, padding: "14px 4px", fontSize: "15px", fontWeight: 600, color: "#1f2937", textDecoration: "none", fontFamily: "var(--font-jakarta), sans-serif" }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span style={{ flex: 1, padding: "14px 4px", fontSize: "15px", fontWeight: 600, color: "#1f2937", fontFamily: "var(--font-jakarta), sans-serif" }}>
                          {item.label}
                        </span>
                      )}
                      <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={mobileExpanded === item.label}
                        style={{
                          padding: "14px 6px", background: "none", border: "none", cursor: "pointer",
                          display: "flex", alignItems: "center", color: mobileExpanded === item.label ? "#00A99D" : "#9ca3af",
                          transition: "color 0.2s ease",
                        }}
                      >
                        <ChevronDown size={16} style={{ transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)", transform: mobileExpanded === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                      </button>
                    </div>
                    <div style={{ maxHeight: mobileExpanded === item.label ? "420px" : "0px", overflow: "hidden", transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)" }}>
                      <div style={{ paddingBottom: "10px", paddingLeft: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {item.dropdown.map((sub) => (
                          <Link key={sub.label} href={sub.href}
                            style={{ padding: "10px 12px", fontSize: "13.5px", color: "#6b7280", textDecoration: "none", borderRadius: "10px", transition: "all 0.15s ease" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#00A99D"; (e.currentTarget as HTMLElement).style.background = "#f0fdfb"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#6b7280"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                            onClick={() => setMobileOpen(false)}
                          >{sub.label}</Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "18px" }}>
              <Link href="/sign-in" style={{ textAlign: "center", padding: "12px", fontSize: "14px", fontWeight: 600, color: "#1E2F6E", border: "1.5px solid #1E2F6E", borderRadius: "999px", textDecoration: "none", transition: "background 0.15s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F0F4FF"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link href="/request-a-briefing/" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                textAlign: "center", padding: "12px", fontSize: "14px", fontWeight: 600, color: "white",
                backgroundColor: "#00A99D", borderRadius: "999px", textDecoration: "none",
                boxShadow: "0 2px 10px rgba(0,169,157,0.32)", transition: "background 0.15s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#019186"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#00A99D"; }}
                onClick={() => setMobileOpen(false)}>
                <Phone size={15} />
                Request a Briefing
              </Link>
            </div>
            <p style={{ marginTop: "16px", fontSize: "11px", color: "#9ca3af", lineHeight: 1.5, textAlign: "center" }}>
              For emergencies, call local emergency services. ZoikoMeds does not provide medical advice.
            </p>
          </div>
        </div>
      </header>

      {scrolled && <div style={{ height: "66px" }} />}
    </>
  );
}
