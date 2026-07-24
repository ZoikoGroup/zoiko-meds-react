"use client";

import type { AvailabilityPayload } from "./types";
import { CONFIDENCE_COLORS, CARD_STATE_LABELS } from "./types";
import { useZoi } from "./ZoiProvider";

const DOT_COLORS: Record<string, string> = {
  available: "#008882",
  limited: "#F59E0B",
  unavailable: "#EF4444",
  "insufficient-signal": "#6B7280",
  "stale-data": "#6B7280",
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function AvailabilityCard({ card }: { card: AvailabilityPayload }) {
  const { handleChipAction } = useZoi();
  const isInsufficientSignal = card.cardState === "insufficient-signal";

  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "16px",
        background: "#F9FAFB",
        marginTop: "8px",
        marginBottom: "4px",
      }}
    >
      <div style={{ fontSize: "14px", fontWeight: 700, color: "#263D88", lineHeight: 1.3, letterSpacing: "-0.01em" }}>
        {card.medicine}
      </div>
      <div style={{ fontSize: "13px", fontWeight: 500, color: "#6B7280", marginTop: "2px", marginBottom: "12px" }}>
        {card.region}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <span
          style={{
            width: "9px", height: "9px", borderRadius: "50%",
            background: DOT_COLORS[card.cardState] ?? "#6B7280",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>
          {CARD_STATE_LABELS[card.cardState]}
          <span style={{ color: "#D1D5DB", margin: "0 6px" }}>&mdash;</span>
          <span style={{ color: CONFIDENCE_COLORS[card.confidence] ?? "#6B7280", fontWeight: 500 }}>
            {capitalize(card.confidence)} confidence
          </span>
        </span>
      </div>

      {!isInsufficientSignal && (
        <div style={{ fontSize: "13px", color: "#6B7280" }}>
          {card.stockingPharmacies} stocking pharmacies
        </div>
      )}

      <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #E5E7EB" }}>
        Data as of {card.timestamp} &middot; {card.source}
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
        {!isInsufficientSignal && (
          <button
            onClick={() => handleChipAction("view_pharmacies")}
            style={{
              flex: 1, padding: "9px 12px", fontSize: "13px", fontWeight: 600,
              border: "1.5px solid #D1D5DB", borderRadius: "10px",
              background: "#FFFFFF", color: "#374151", cursor: "pointer",
              fontFamily: "var(--font-jakarta), sans-serif",
              lineHeight: 1,
            }}
          >
            View pharmacies
          </button>
        )}
        <button
          onClick={() => handleChipAction("set_alert")}
          style={{
            flex: isInsufficientSignal ? 1 : 1,
            padding: "9px 12px", fontSize: "13px", fontWeight: 600,
            border: "none", borderRadius: "10px",
            background: "#008882", color: "#FFFFFF", cursor: "pointer",
            fontFamily: "var(--font-jakarta), sans-serif",
            lineHeight: 1,
          }}
        >
          Set alert
        </button>
      </div>

      <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "12px", paddingTop: "8px", borderTop: "1px solid #E5E7EB", lineHeight: 1.5 }}>
        {card.source} confidence reflects pharmacy-reported and signal-derived data. Stock can change quickly — the alert will notify you of changes.
      </div>
    </div>
  );
}
