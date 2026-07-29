"use client";

import { useState } from "react";
import { useZoi } from "./ZoiProvider";

interface Props {
  medicine?: string;
  region?: string;
}

export default function AlertForm({ medicine, region }: Props) {
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { submitEscalation } = useZoi();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    submitEscalation(
      contact.trim(),
      `Stock alert subscription requested for ${medicine ?? "medicine"} in ${region ?? "area"}`
    );
    setSubmitted(true);
  };

  return (
    <div style={{ marginTop: "10px", marginBottom: "4px" }}>
      <div
        style={{
          border: "1px solid #CCFBF1",
          borderRadius: "14px",
          padding: "16px",
          background: "linear-gradient(180deg, #F0FDFA 0%, #E6FFFA 100%)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#0F766E" }}>
            🔔 Activate Stock Alert
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "#115E59", marginBottom: "12px", lineHeight: 1.45 }}>
          {medicine && region
            ? `Enter your email or phone number to receive instant notifications when ${medicine} is in stock near ${region}.`
            : "Enter your email or phone number to receive instant SMS/Email notifications when stock is detected."}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ fontSize: "11px", fontWeight: 600, color: "#0F766E", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Email or Phone for Alerts
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
              border: "1.5px solid #99F6E4",
              borderRadius: "10px",
              outline: "none",
              background: submitted ? "#F0FDFA" : "#FFFFFF",
              color: "#111827",
              fontFamily: "var(--font-jakarta), sans-serif",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,136,130,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#99F6E4"; e.currentTarget.style.boxShadow = "none"; }}
          />

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
                  : "linear-gradient(135deg, #008882 0%, #006662 100%)",
                color: !contact.trim() ? "#64748B" : "#FFFFFF",
                cursor: !contact.trim() ? "not-allowed" : "pointer",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1,
                boxShadow: !contact.trim() ? "none" : "0 3px 10px rgba(0,136,130,0.22)",
                transition: "all 0.2s ease",
              }}
            >
              Activate Stock Alert
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
