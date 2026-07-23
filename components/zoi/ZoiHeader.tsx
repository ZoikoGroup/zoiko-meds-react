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
        padding: "14px 18px",
        borderBottom: "1px solid #E5E7EB",
        background: "#FFFFFF",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <img src="/favicon.ico" alt="Zoi" width="32" height="32" style={{ borderRadius: "6px", flexShrink: 0 }} />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#263D88", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
              {t("header.title")}
            </span>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#008882", display: "inline-block", flexShrink: 0 }} />
          </div>
          <div style={{ fontSize: "11px", fontWeight: 500, color: "#6B7280", lineHeight: 1.3, marginTop: "1px" }}>
            {t("header.subtitle")}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        <button
          onClick={minimizePanel}
          aria-label="Minimize"
          style={{
            width: "32px", height: "32px", display: "flex", alignItems: "center",
            justifyContent: "center", border: "none", background: "transparent",
            borderRadius: "8px", cursor: "pointer", color: "#6B7280",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
        <button
          onClick={closePanel}
          aria-label="Close"
          style={{
            width: "32px", height: "32px", display: "flex", alignItems: "center",
            justifyContent: "center", border: "none", background: "transparent",
            borderRadius: "8px", cursor: "pointer", color: "#6B7280",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
