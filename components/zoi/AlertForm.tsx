"use client";

import { useState } from "react";
import { useZoi } from "./ZoiProvider";

interface Props {
  medicine?: string;
  region?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{7,15}$/;

export default function AlertForm({ medicine, region }: Props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

    const phoneText = phone.trim() ? ` (Phone: ${phone.trim()})` : "";
    const issueMsg = `Stock alert subscription requested for ${medicine ?? "medicine"} in ${region ?? "area"}${phoneText}`;

    submitEscalation(email.trim(), issueMsg);
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
            ? `Enter your email to receive instant stock alerts when ${medicine} is available near ${region}.`
            : "Enter your email address to receive instant availability notification emails when stock is detected."}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#0F766E", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
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
                border: emailTouched && email && !isEmailValid ? "1.5px solid #EF4444" : "1.5px solid #99F6E4",
                borderRadius: "10px",
                outline: "none",
                background: submitted ? "#F0FDFA" : "#FFFFFF",
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
            <div style={{ fontSize: "11px", fontWeight: 600, color: "#0F766E", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
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
                border: phoneTouched && phone && !isPhoneValid ? "1.5px solid #EF4444" : "1.5px solid #99F6E4",
                borderRadius: "10px",
                outline: "none",
                background: submitted ? "#F0FDFA" : "#FFFFFF",
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
                  : "linear-gradient(135deg, #008882 0%, #006662 100%)",
                color: !isFormValid ? "#64748B" : "#FFFFFF",
                cursor: !isFormValid ? "not-allowed" : "pointer",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1,
                boxShadow: !isFormValid ? "none" : "0 3px 10px rgba(0,136,130,0.22)",
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
