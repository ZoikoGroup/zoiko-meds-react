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
          borderRadius: "12px",
          padding: "16px",
          background: "#F9FAFB",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: "12px", fontWeight: 600, color: "#4B5563", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Email or phone
          </div>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="you@example.com or 0700 123 456"
            disabled={submitted}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "14px",
              border: "1.5px solid #D1D5DB",
              borderRadius: "10px",
              outline: "none",
              background: submitted ? "#F9FAFB" : "#FFFFFF",
              color: "#111827",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
          />

          <div style={{ fontSize: "12px", fontWeight: 600, color: "#4B5563", marginTop: "12px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
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
              padding: "10px 14px",
              fontSize: "13px",
              border: "1.5px solid #D1D5DB",
              borderRadius: "10px",
              outline: "none",
              resize: "vertical",
              background: submitted ? "#F9FAFB" : "#FFFFFF",
              color: "#111827",
              fontFamily: "var(--font-jakarta), sans-serif",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; }}
          />

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
              cursor: submitted ? "default" : "pointer",
              fontSize: "13px",
              color: "#6B7280",
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
                marginTop: "12px",
                padding: "11px",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                borderRadius: "10px",
                background: !contact.trim() ? "#D1D5DB" : "#263D88",
                color: "#FFFFFF",
                cursor: !contact.trim() ? "not-allowed" : "pointer",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1,
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
