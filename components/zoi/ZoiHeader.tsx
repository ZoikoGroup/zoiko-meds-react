"use client";

import { useZoi } from "./ZoiProvider";
import { t } from "./i18n";

export default function ZoiHeader() {
  const { state, minimizePanel, closePanel } = useZoi();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid #E2E8F0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
        <div style={{ position: "relative" }}>
          <img src="/favicon.ico" alt="Zoi" width="34" height="34" style={{ borderRadius: "8px", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,136,130,0.2)" }} />
          <span style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: "#10B981",
            border: "2px solid #FFFFFF",
            boxShadow: "0 0 0 1px rgba(16,185,129,0.3)"
          }} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              {t("header.title")}
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "10px", background: "#E0F2FE", color: "#0369A1", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Verified AI
            </span>
          </div>
          <div style={{ fontSize: "12px", fontWeight: 500, color: "#64748B", lineHeight: 1.3, marginTop: "2px" }}>
            {t("header.subtitle")}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <button
          onClick={minimizePanel}
          aria-label="Minimize"
          style={{
            width: "34px", height: "34px", display: "flex", alignItems: "center",
            justifyContent: "center", border: "none", background: "transparent",
            borderRadius: "8px", cursor: "pointer", color: "#64748B", transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F1F5F9"; e.currentTarget.style.color = "#0F172A"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748B"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <button
          onClick={closePanel}
          aria-label="Close"
          style={{
            width: "34px", height: "34px", display: "flex", alignItems: "center",
            justifyContent: "center", border: "none", background: "transparent",
            borderRadius: "8px", cursor: "pointer", color: "#64748B", transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2"; e.currentTarget.style.color = "#DC2626"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748B"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
