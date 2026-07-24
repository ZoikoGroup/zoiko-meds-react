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
    setInput(e.target.value);
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 120) + "px";
  };

  return (
    <div
      style={{
        borderTop: "1px solid #E2E8F0",
        padding: "14px 18px 16px",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={t("composer.placeholder")}
          rows={1}
          disabled={state.isStreaming}
          style={{
            flex: 1,
            minHeight: "46px",
            maxHeight: "120px",
            padding: "12px 16px",
            fontSize: "14px",
            border: "1.5px solid #CBD5E1",
            borderRadius: "14px",
            outline: "none",
            resize: "none",
            background: state.isStreaming ? "#F8FAFC" : "#FFFFFF",
            color: "#0F172A",
            fontFamily: "var(--font-jakarta), sans-serif",
            lineHeight: 1.5,
            transition: "all 0.2s ease",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; e.currentTarget.style.boxShadow = "0 0 0 3.5px rgba(0,136,130,0.12)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)"; }}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || state.isStreaming}
          aria-label="Send message"
          style={{
            width: "46px",
            height: "46px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "14px",
            background: !input.trim() || state.isStreaming ? "#CBD5E1" : "linear-gradient(135deg, #008882 0%, #006662 100%)",
            color: "white",
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
    </div>
  );
}
