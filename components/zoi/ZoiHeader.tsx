"use client";

import { useZoi } from "./ZoiProvider";
import { t } from "./i18n";

export default function ZoiHeader() {
  const { state, closePanel, startNewConversation, toggleHistoryView } = useZoi();

  const isHistoryView = state.viewMode === "history";

  const btnBaseStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    background: "#FFFFFF",
    color: "#64748B",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 16px",
        borderBottom: "1px solid #E2E8F0",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <div style={{ position: "relative" }}>
          <img src="/favicon.ico" alt="Zoi" width="32" height="32" style={{ borderRadius: "8px", flexShrink: 0, boxShadow: "0 2px 6px rgba(0,136,130,0.2)" }} />
          <span style={{
            position: "absolute",
            bottom: "-1px",
            right: "-1px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#10B981",
            border: "2px solid #FFFFFF",
            boxShadow: "0 0 0 1px rgba(16,185,129,0.3)"
          }} />
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
              {t("header.title")}
            </span>
            <span style={{ fontSize: "9.5px", fontWeight: 700, padding: "2px 6px", borderRadius: "10px", background: "#E0F2FE", color: "#0369A1", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Verified AI
            </span>
          </div>
          <div style={{ fontSize: "11.5px", fontWeight: 500, color: "#64748B", lineHeight: 1.3, marginTop: "1px" }}>
            {t("header.subtitle")}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {/* New Conversation Button (+ icon) */}
        <button
          onClick={startNewConversation}
          aria-label="New Conversation"
          title="New Conversation"
          style={btnBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E6F4F1";
            e.currentTarget.style.borderColor = "#008882";
            e.currentTarget.style.color = "#008882";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.color = "#64748B";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>

        {/* Chat History Button (Clock icon) */}
        <button
          onClick={() => toggleHistoryView()}
          aria-label="Chat History"
          title="Chat History"
          style={{
            ...btnBaseStyle,
            background: isHistoryView ? "#E6F4F1" : "#FFFFFF",
            borderColor: isHistoryView ? "#008882" : "#E2E8F0",
            color: isHistoryView ? "#008882" : "#64748B",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E6F4F1";
            e.currentTarget.style.borderColor = "#008882";
            e.currentTarget.style.color = "#008882";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isHistoryView ? "#E6F4F1" : "#FFFFFF";
            e.currentTarget.style.borderColor = isHistoryView ? "#008882" : "#E2E8F0";
            e.currentTarget.style.color = isHistoryView ? "#008882" : "#64748B";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </button>


        {/* Close Button (X icon) */}
        <button
          onClick={closePanel}
          aria-label="Close"
          title="Close"
          style={btnBaseStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E6F4F1";
            e.currentTarget.style.borderColor = "#008882";
            e.currentTarget.style.color = "#008882";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#FFFFFF";
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.color = "#64748B";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
