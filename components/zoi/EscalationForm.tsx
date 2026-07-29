"use client";

import { useState } from "react";
import { useZoi } from "./ZoiProvider";

export default function EscalationForm() {
  const [contact, setContact] = useState("");
  const [issue, setIssue] = useState("");
  const [includeConversation, setIncludeConversation] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { submitEscalation } = useZoi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    submitEscalation(contact.trim(), issue.trim());
    setSubmitted(true);
  };

  return (
    <div style={{ marginTop: "10px", marginBottom: "4px" }}>
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "14px",
          padding: "16px",
          background: "#F9FAFB",
          boxSizing: "border-box",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Email or phone
          </div>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="0700 123 456 or name@domain.com"
            disabled={submitted}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 14px",
              fontSize: "13.5px",
              border: "1.5px solid #D1D5DB",
              borderRadius: "10px",
              outline: "none",
              background: submitted ? "#F9FAFB" : "#FFFFFF",
              color: "#111827",
              fontFamily: "var(--font-jakarta), sans-serif",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,136,130,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
          />

          <div style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", marginTop: "12px", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Describe your issue (optional)
          </div>
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Tell us what you need help with..."
            rows={2}
            disabled={submitted}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "10px 14px",
              fontSize: "13px",
              border: "1.5px solid #D1D5DB",
              borderRadius: "10px",
              outline: "none",
              resize: "none",
              background: submitted ? "#F9FAFB" : "#FFFFFF",
              color: "#111827",
              fontFamily: "var(--font-jakarta), sans-serif",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,136,130,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
              cursor: submitted ? "default" : "pointer",
              fontSize: "13px",
              color: "#4B5563",
            }}
          >
            <input
              type="checkbox"
              checked={includeConversation}
              onChange={(e) => setIncludeConversation(e.target.checked)}
              disabled={submitted}
              style={{ accentColor: "#008882", width: "16px", height: "16px" }}
            />
            Include this conversation
          </label>

          {!submitted && (
            <button
              type="submit"
              disabled={!contact.trim()}
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginTop: "12px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                borderRadius: "10px",
                background: !contact.trim()
                  ? "#CBD5E1"
                  : "linear-gradient(135deg, #263D88 0%, #1A2B66 100%)",
                color: !contact.trim() ? "#64748B" : "#FFFFFF",
                cursor: !contact.trim() ? "not-allowed" : "pointer",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1,
                boxShadow: !contact.trim() ? "none" : "0 3px 10px rgba(38,61,136,0.25)",
                transition: "all 0.2s ease",
              }}
            >
              Submit request
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
