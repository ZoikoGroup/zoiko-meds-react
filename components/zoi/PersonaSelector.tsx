"use client";

import { useCallback, useRef } from "react";
import { useZoi } from "./ZoiProvider";
import type { Persona } from "./types";

const PERSONA_OPTIONS: { value: Persona; label: string }[] = [
  { value: "patient", label: "I'm looking for a medicine" },
  { value: "pharmacy", label: "I run or work at a pharmacy" },
  { value: "enterprise", label: "I represent an organisation" },
  { value: "wholesale", label: "I'm a wholesale partner" },
  { value: "other", label: "Something else" },
];

export default function PersonaSelector() {
  const { handleChipAction } = useZoi();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const buttons = containerRef.current?.querySelectorAll<HTMLButtonElement>("button[role=radio]");
    if (!buttons || buttons.length === 0) return;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      const next = (index + 1) % buttons.length;
      buttons[next]?.focus();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = (index - 1 + buttons.length) % buttons.length;
      buttons[prev]?.focus();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: "10px",
        marginBottom: "4px",
      }}
      role="radiogroup"
      aria-label="What brings you here today?"
    >
      {PERSONA_OPTIONS.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => handleChipAction(opt.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          role="radio"
          aria-checked={false}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            border: "none",
            borderBottom: i < PERSONA_OPTIONS.length - 1 ? "1px solid #F3F4F6" : "none",
            background: "#FFFFFF",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
            fontFamily: "var(--font-jakarta), sans-serif",
            textAlign: "left",
            lineHeight: 1.4,
          }}
          onFocus={(e) => { e.currentTarget.style.background = "#F0FDFA"; }}
          onBlur={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
        >
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid #D1D5DB",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "transparent",
              }}
            />
          </span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
