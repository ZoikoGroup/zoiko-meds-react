"use client";

import { useState, useRef, useEffect } from "react";
import { useZoi } from "./ZoiProvider";
import { t } from "./i18n";

export default function ZoiComposer() {
  const [input, setInput] = useState("");
  const { state, sendMessage } = useZoi();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.panelView === "open") {
      inputRef.current?.focus();
    }
  }, [state.panelView]);

  const handleSubmit = () => {
    if (!input.trim() || state.isStreaming) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setInput(e.target.value);
    }
  };

  return (
    <div
      style={{
        borderTop: "1px solid #E2E8F0",
        padding: "10px 14px 8px",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder={t("composer.placeholder")}
            rows={1}
            maxLength={500}
            disabled={state.isStreaming}
            style={{
              width: "100%",
              height: "44px",
              minHeight: "44px",
              maxHeight: "44px",
              padding: input.length > 400 ? "10px 60px 10px 14px" : "10px 14px",
              fontSize: "14px",
              border: "1.5px solid #CBD5E1",
              borderRadius: "12px",
              outline: "none",
              resize: "none",
              overflowY: "auto",
              scrollbarWidth: "none",
              boxSizing: "border-box",
              background: state.isStreaming ? "#F8FAFC" : "#FFFFFF",
              color: "#0F172A",
              fontFamily: "var(--font-jakarta), sans-serif",
              lineHeight: "22px",
              transition: "all 0.2s ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,136,130,0.12)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)"; }}
          />
          {input.length > 400 && (
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "11px",
                fontWeight: 600,
                color: input.length >= 490 ? "#DC2626" : "#64748B",
                pointerEvents: "none",
              }}
            >
              {input.length}/500
            </span>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || state.isStreaming}
          aria-label="Send message"
          style={{
            width: "44px",
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "12px",
            boxSizing: "border-box",
            background: !input.trim() || state.isStreaming
              ? "#E2E8F0"
              : "linear-gradient(135deg, #008882 0%, #006662 100%)",
            color: !input.trim() || state.isStreaming ? "#94A3B8" : "#FFFFFF",
            cursor: !input.trim() || state.isStreaming ? "not-allowed" : "pointer",
            flexShrink: 0,
            boxShadow: !input.trim() || state.isStreaming ? "none" : "0 3px 10px rgba(0,136,130,0.25)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            if (input.trim() && !state.isStreaming) {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 5px 14px rgba(0,136,130,0.35)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = !input.trim() || state.isStreaming ? "none" : "0 3px 10px rgba(0,136,130,0.25)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>

      <div style={{ marginTop: "6px", textAlign: "center" }}>
        <a
          href="/trust-center"
          style={{
            fontSize: "11px",
            color: "#64748B",
            textDecoration: "none",
            fontWeight: 500,
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#008882"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}
        >
          {t("footer.disclosure")}
        </a>
      </div>
    </div>
  );
}
