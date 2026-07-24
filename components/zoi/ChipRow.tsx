"use client";

import { useCallback } from "react";
import type { Chip } from "./types";
import { useZoi } from "./ZoiProvider";

interface Props {
  chips: Chip[];
  max?: number;
}

export default function ChipRow({ chips, max = 3 }: Props) {
  const { handleChipAction } = useZoi();
  const visible = chips.slice(0, max);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    const container = e.currentTarget.parentElement;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLButtonElement>("button");
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % buttons.length;
      buttons[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + buttons.length) % buttons.length;
      buttons[prev]?.focus();
    }
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {visible.map((chip, i) => (
        <button
          key={chip.action}
          onClick={() => handleChipAction(chip.action)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            padding: "8px 18px",
            fontSize: "13px",
            fontWeight: 500,
            border: "1.5px solid #D1D5DB",
            borderRadius: "999px",
            background: "#FFFFFF",
            color: "#4B5563",
            cursor: "pointer",
            fontFamily: "var(--font-jakarta), sans-serif",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
