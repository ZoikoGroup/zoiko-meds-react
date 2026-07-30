"use client";

import { useState } from "react";
import { useZoi } from "./ZoiProvider";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{7,15}$/;

export default function EscalationForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("");
  const [includeConversation, setIncludeConversation] = useState(true);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { submitEscalation } = useZoi();

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const phoneDigits = phone.replace(/\D/g, "");
  const isPhoneValid = !phone.trim() || (PHONE_REGEX.test(phone.trim()) && phoneDigits.length >= 7 && phoneDigits.length <= 15);

  const isFormValid = isEmailValid && isPhoneValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPhoneTouched(true);
    if (!isFormValid) return;

    const phoneText = phone.trim() ? `\nContact Phone: ${phone.trim()}` : "";
    const fullIssueMessage = `${issue.trim()}${phoneText}`;

    submitEscalation(email.trim(), fullIssueMessage);
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
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Email Address <span style={{ color: "#DC2626" }}>*</span>
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="name@domain.com"
              disabled={submitted}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 14px",
                fontSize: "13.5px",
                border: emailTouched && email && !isEmailValid ? "1.5px solid #EF4444" : "1.5px solid #D1D5DB",
                borderRadius: "10px",
                outline: "none",
                background: submitted ? "#F9FAFB" : "#FFFFFF",
                color: "#111827",
                fontFamily: "var(--font-jakarta), sans-serif",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = emailTouched && email && !isEmailValid ? "#EF4444" : "#008882";
                e.currentTarget.style.boxShadow = emailTouched && email && !isEmailValid ? "0 0 0 3px rgba(239,68,68,0.15)" : "0 0 0 3px rgba(0,136,130,0.12)";
              }}
            />
            {emailTouched && email && !isEmailValid && (
              <div style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", fontWeight: 500 }}>
                ⚠️ Please enter a valid email address (e.g. name@domain.com)
              </div>
            )}
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Phone Number <span style={{ color: "#64748B", fontWeight: 400 }}>(Optional)</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setPhoneTouched(true)}
              placeholder="+254 700 123 456"
              disabled={submitted}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px 14px",
                fontSize: "13.5px",
                border: phoneTouched && phone && !isPhoneValid ? "1.5px solid #EF4444" : "1.5px solid #D1D5DB",
                borderRadius: "10px",
                outline: "none",
                background: submitted ? "#F9FAFB" : "#FFFFFF",
                color: "#111827",
                fontFamily: "var(--font-jakarta), sans-serif",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = phoneTouched && phone && !isPhoneValid ? "#EF4444" : "#008882";
                e.currentTarget.style.boxShadow = phoneTouched && phone && !isPhoneValid ? "0 0 0 3px rgba(239,68,68,0.15)" : "0 0 0 3px rgba(0,136,130,0.12)";
              }}
            />
            {phoneTouched && phone && !isPhoneValid && (
              <div style={{ fontSize: "11px", color: "#DC2626", marginTop: "4px", fontWeight: 500 }}>
                ⚠️ Please enter a valid phone number (7-15 digits, e.g. +254 700 123 456)
              </div>
            )}
          </div>

          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#4B5563", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
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
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "2px",
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
              disabled={!isFormValid}
              style={{
                width: "100%",
                boxSizing: "border-box",
                marginTop: "4px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 600,
                border: "none",
                borderRadius: "10px",
                background: !isFormValid
                  ? "#CBD5E1"
                  : "linear-gradient(135deg, #263D88 0%, #1A2B66 100%)",
                color: !isFormValid ? "#64748B" : "#FFFFFF",
                cursor: !isFormValid ? "not-allowed" : "pointer",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1,
                boxShadow: !isFormValid ? "none" : "0 3px 10px rgba(38,61,136,0.25)",
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
