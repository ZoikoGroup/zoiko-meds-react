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
        borderTop: "1px solid #F3F4F6",
        padding: "12px 18px 14px",
        background: "#FFFFFF",
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
            minHeight: "44px",
            maxHeight: "120px",
            padding: "11px 16px",
            fontSize: "14px",
            border: "1.5px solid #D1D5DB",
            borderRadius: "12px",
            outline: "none",
            resize: "none",
            background: state.isStreaming ? "#F9FAFB" : "#FFFFFF",
            color: "#111827",
            fontFamily: "var(--font-jakarta), sans-serif",
            lineHeight: 1.5,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#008882"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,136,130,0.1)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.boxShadow = "none"; }}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || state.isStreaming}
          aria-label="Send message"
          style={{
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: "12px",
            background: !input.trim() || state.isStreaming ? "#D1D5DB" : "#008882",
            color: "white",
            cursor: !input.trim() || state.isStreaming ? "not-allowed" : "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
