"use client";

import { useZoi } from "./ZoiProvider";
import { usePageContext } from "./usePageContext";
import { t } from "./i18n";

export default function ZoiLauncher() {
  const { state, openPanel } = useZoi();
  const { label } = usePageContext();

  if (state.panelView === "open") return null;

  const iconOnly = state.panelView === "minimized";

  return (
    <>
      <style>{`
        @keyframes zoiFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .zoi-launcher {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 49;
          display: flex;
          align-items: center;
          gap: 8px;
          height: 44px;
          padding: ${iconOnly ? "0" : "0 20px 0 16px"};
          width: ${iconOnly ? "44px" : "auto"};
          justify-content: center;
          border: none;
          border-radius: 999px;
          background: linear-gradient(135deg, #263D88 0%, #1E2F6E 100%);
          color: white;
          font-family: var(--font-jakarta), sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(38, 61, 136, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease,
                      width 0.25s ease, padding 0.25s ease;
          animation: zoiFadeIn 0.35s ease;
          user-select: none;
          letter-spacing: 0.01em;
        }
        .zoi-launcher:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(38, 61, 136, 0.4);
        }
        .zoi-launcher:active {
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .zoi-launcher { animation: none; transition: none; }
        }
      `}</style>

      <button
        className="zoi-launcher"
        onClick={openPanel}
        aria-label={iconOnly ? "Open Zoi" : `${label}`}
        aria-expanded={false}
      >
        <img src="/favicon.ico" alt="" width="22" height="22" style={{ borderRadius: "4px", flexShrink: 0 }} />
        {!iconOnly && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
      </button>
    </>
  );
}
