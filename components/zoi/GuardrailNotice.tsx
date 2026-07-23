"use client";

interface Props {
  content: string;
}

export default function GuardrailNotice({ content }: Props) {
  return (
    <div
      style={{
        background: "#FFFBEB",
        border: "1px solid #FDE68A",
        borderRadius: "12px",
        padding: "14px 16px",
        marginTop: "6px",
        marginBottom: "4px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "#92400E", letterSpacing: "-0.01em" }}>
          Important
        </span>
      </div>
      <div style={{ fontSize: "13px", color: "#78350F", lineHeight: 1.6, whiteSpace: "pre-wrap", paddingLeft: "20px" }}>
        {content}
      </div>
    </div>
  );
}
