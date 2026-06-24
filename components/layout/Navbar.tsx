"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";

interface DropdownItem { label: string; href: string; description?: string; }
interface NavItem { label: string; href?: string; dropdown?: DropdownItem[]; }

const NAV_ITEMS: NavItem[] = [
  { label: "Platform", href: "/platform/", dropdown: [
    { label: "Overview", href: "/platform", description: "See the full platform" },
    { label: "Features", href: "/platform/features", description: "Core capabilities" },
    { label: "Security", href: "/platform/security", description: "Enterprise-grade security" },
    { label: "Integrations", href: "/platform/integrations", description: "Connect your tools" },
  ]},
  { label: "Patients", href: "/patient/", dropdown: [
    { label: "Patient Portal", href: "/patients/portal", description: "Access health records" },
    { label: "Prescriptions", href: "/patients/prescriptions", description: "Manage medications" },
    { label: "Appointments", href: "/patients/appointments", description: "Schedule & track visits" },
  ]},
  { label: "Pharmacies", href: "/pharmacy/", dropdown: [
    { label: "Pharmacy Dashboard", href: "/pharmacies/dashboard", description: "Manage your pharmacy" },
    { label: "Inventory", href: "/pharmacies/inventory", description: "Real-time stock management" },
    { label: "Dispensing", href: "/pharmacies/dispensing", description: "Streamlined dispensing" },
  ]},
  { label: "Enterprise", href: "/enterprise/", dropdown: [
    { label: "Hospital Systems", href: "/enterprise/hospitals", description: "Large-scale deployments" },
    { label: "Clinic Networks", href: "/enterprise/clinics", description: "Multi-location management" },
    { label: "API Access", href: "/enterprise/api", description: "Custom integrations" },
  ]},
  { label: "Intelligence", dropdown: [
    { label: "Analytics", href: "/intelligence/analytics", description: "Data-driven insights" },
    { label: "AI Insights", href: "/intelligence/ai", description: "Predictive health intelligence" },
    { label: "Reports", href: "/intelligence/reports", description: "Compliance & performance" },
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
      transform: visible ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-6px) scale(0.97)",
      marginTop: "8px", width: "224px", backgroundColor: "white",
      borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      border: "1px solid #f0f0f0", overflow: "hidden", zIndex: 50,
      transition: "opacity 0.18s ease, transform 0.18s ease",
      opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
    }}>
      <div style={{ padding: "8px 0" }}>
        {items.map((item) => (
          <Link key={item.label} href={item.href}
            style={{ display: "flex", flexDirection: "column", padding: "10px 16px", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#f0f4ff")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#263D88" }}>{item.label}</span>
            {item.description && <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>{item.description}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", width: "24px", height: "24px" }}>
      <span style={{ display: "block", height: "2px", background: "#263D88", borderRadius: "2px", transition: "all 0.3s", transformOrigin: "center", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
      <span style={{ display: "block", height: "2px", background: "#263D88", borderRadius: "2px", transition: "all 0.3s", opacity: open ? 0 : 1 }} />
      <span style={{ display: "block", height: "2px", background: "#263D88", borderRadius: "2px", transition: "all 0.3s", transformOrigin: "center", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

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
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 1023px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 1024px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>

      {/* ── TOP INFO BAR ── */}
      <div style={{
        maxHeight: scrolled ? "0px" : "40px",
        opacity: scrolled ? 0 : 1,
        overflow: "hidden",
        transition: "max-height 0.4s ease, opacity 0.35s ease",
        backgroundColor: "#1a2f6e",
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
          height: "40px", display: "flex", alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
            <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                backgroundColor: "#00A99D", opacity: 0.7,
                animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
              }} />
              <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00A99D" }} />
            </span>
            <span style={{ color: "#00A99D", fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap" }}>
              Infrastructure monitoring active
            </span>
          </div>

          <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.2)", margin: "0 16px", flexShrink: 0 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
            <USFlag />
            <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "12px", fontWeight: 500, whiteSpace: "nowrap" }}>
              United States — Beta Launch
            </span>
          </div>

          <div style={{ flex: 1 }} />

          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "11.5px", textAlign: "right", flexShrink: 0 }}>
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
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
        transition: "box-shadow 0.3s ease",
      }}>
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, #263D88, #00A99D, #263D88)",
          opacity: scrolled ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Image src="/logo.png" alt="ZoikoMeds" width={160} height={40} priority style={{ objectFit: "contain" }} />
            </Link>

            {/* Desktop Nav */}
            <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {NAV_ITEMS.map((item) => (
                <div key={item.label} style={{ position: "relative" }}
                  onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Plain link (no dropdown) */}
                  {!item.dropdown ? (
                    <Link href={item.href!} style={{
                      display: "flex", alignItems: "center",
                      padding: "8px 12px", borderRadius: "8px",
                      fontSize: "14px", fontWeight: 500, textDecoration: "none",
                      fontFamily: "var(--font-jakarta), sans-serif",
                      color: "#374151",
                      transition: "all 0.15s ease",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#f0f4ff"; (e.currentTarget as HTMLElement).style.color = "#263D88"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
                    >
                      {item.label}
                    </Link>
                  ) : item.href ? (
                    /* Clickable link that also has a dropdown */
                    <Link href={item.href} style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      padding: "8px 12px", borderRadius: "8px",
                      fontSize: "14px", fontWeight: 500, textDecoration: "none", cursor: "pointer",
                      fontFamily: "var(--font-jakarta), sans-serif",
                      backgroundColor: activeDropdown === item.label ? "#f0f4ff" : "transparent",
                      color: activeDropdown === item.label ? "#263D88" : "#374151",
                      transition: "all 0.15s ease",
                    }}>
                      {item.label}
                      <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </Link>
                  ) : (
                    /* Button with dropdown, no direct link */
                    <button style={{
                      display: "flex", alignItems: "center", gap: "4px",
                      padding: "8px 12px", borderRadius: "8px", border: "none",
                      fontSize: "14px", fontWeight: 500, cursor: "pointer",
                      fontFamily: "var(--font-jakarta), sans-serif",
                      backgroundColor: activeDropdown === item.label ? "#f0f4ff" : "transparent",
                      color: activeDropdown === item.label ? "#263D88" : "#374151",
                      transition: "all 0.15s ease",
                    }}>
                      {item.label}
                      <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>
                  )}

                  {item.dropdown && <DropdownMenu items={item.dropdown} visible={activeDropdown === item.label} />}
                </div>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link href="/sign-in" style={{
                fontSize: "14px", fontWeight: 500, color: "#374151",
                padding: "8px 16px", borderRadius: "8px", textDecoration: "none",
                transition: "all 0.15s", border: "1px solid #e5e7eb",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#f0f4ff"; (e.currentTarget as HTMLElement).style.color = "#263D88"; (e.currentTarget as HTMLElement).style.borderColor = "#263D88"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLElement).style.color = "#374151"; (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; }}
              >
                Sign In
              </Link>
              <Link href="/get-a-demo" style={{
                display: "flex", alignItems: "center", gap: "8px",
                backgroundColor: "#00A99D", color: "white",
                fontSize: "14px", fontWeight: 600,
                padding: "10px 20px", borderRadius: "999px", textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,169,157,0.3)",
                transition: "all 0.2s ease",
                fontFamily: "var(--font-jakarta), sans-serif",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#008f84"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,169,157,0.45)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#00A99D"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,169,157,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <Phone size={14} />
                Request a Briefing
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: "none", padding: "8px", borderRadius: "8px", border: "none", background: "transparent", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div style={{
          maxHeight: mobileOpen ? "80vh" : "0px", opacity: mobileOpen ? 1 : 0,
          overflow: "hidden", transition: "max-height 0.35s ease, opacity 0.3s ease",
          borderTop: "1px solid #f0f0f0",
        }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px 16px", overflowY: "auto", maxHeight: "70vh" }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} style={{ borderBottom: "1px solid #f7f7f7" }}>
                {/* Mobile: plain link for items without dropdown, accordion for others */}
                {!item.dropdown ? (
                  <Link href={item.href!}
                    style={{ display: "block", padding: "14px 0", fontSize: "14px", fontWeight: 600, color: "#1f2937", textDecoration: "none" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      {item.href ? (
                        <Link href={item.href}
                          style={{ flex: 1, padding: "14px 0", fontSize: "14px", fontWeight: 600, color: "#1f2937", textDecoration: "none", fontFamily: "var(--font-jakarta), sans-serif" }}
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <span style={{ flex: 1, padding: "14px 0", fontSize: "14px", fontWeight: 600, color: "#1f2937", fontFamily: "var(--font-jakarta), sans-serif" }}>
                          {item.label}
                        </span>
                      )}
                      <button onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                        aria-label={`Toggle ${item.label} submenu`}
                        style={{ padding: "14px 4px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                      >
                        <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: mobileExpanded === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                      </button>
                    </div>
                    <div style={{ maxHeight: mobileExpanded === item.label ? "400px" : "0px", overflow: "hidden", transition: "max-height 0.25s ease" }}>
                      <div style={{ paddingBottom: "8px", paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {item.dropdown.map((sub) => (
                          <Link key={sub.label} href={sub.href}
                            style={{ padding: "8px 12px", fontSize: "13px", color: "#6b7280", textDecoration: "none", borderRadius: "8px", transition: "all 0.15s" }}
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
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "16px" }}>
              <Link href="/sign-in" style={{ textAlign: "center", padding: "10px", fontSize: "14px", fontWeight: 600, color: "#263D88", border: "1.5px solid #263D88", borderRadius: "999px", textDecoration: "none" }} onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link href="/get-a-demo" style={{ textAlign: "center", padding: "10px", fontSize: "14px", fontWeight: 600, color: "white", backgroundColor: "#00A99D", borderRadius: "999px", textDecoration: "none" }} onClick={() => setMobileOpen(false)}>Request a Briefing</Link>
            </div>
          </div>
        </div>
      </header>

      {scrolled && <div style={{ height: "66px" }} />}
    </>
  );
}