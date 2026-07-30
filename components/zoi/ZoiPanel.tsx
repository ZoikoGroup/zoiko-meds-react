"use client";

import { useCallback, useEffect } from "react";
import { useZoi } from "./ZoiProvider";
import { useFocusTrap } from "./useFocusTrap";
import ZoiHeader from "./ZoiHeader";
import ZoiViewport from "./ZoiViewport";
import ZoiComposer from "./ZoiComposer";
import ZoiHistoryView from "./ZoiHistoryView";
import { t } from "./i18n";

export default function ZoiPanel() {
  const { state, minimizePanel, clearError } = useZoi();
  const panelRef = useFocusTrap(state.panelView === "open");

  const handleRetry = useCallback(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (state.panelView !== "open") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        minimizePanel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.panelView, minimizePanel]);

  if (state.panelView !== "open") return null;

  return (
    <>
      <style>{`
        @keyframes zoiSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .zoi-panel {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 48;
          display: flex;
          flex-direction: column;
          width: 430px;
          max-height: 660px;
          height: min(660px, calc(100dvh - 110px));
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 24px 72px rgba(15, 23, 42, 0.16), 0 4px 16px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(0,0,0,0.04);
          animation: zoiSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          font-family: var(--font-jakarta), system-ui, -apple-system, sans-serif;
        }

        @media (max-width: 767px) {
          .zoi-panel {
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            top: 0;
            width: 100%;
            max-height: none;
            height: 100dvh;
            border-radius: 0;
            border: none;
            animation: none;
          }
        }

        @media (max-width: 500px) {
          .zoi-panel {
            width: calc(100vw - 24px);
            right: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .zoi-panel { animation: none; }
        }
      `}</style>

      <div
        ref={panelRef}
        className="zoi-panel"
        role="dialog"
        aria-label="Zoi chat panel"
        aria-modal="true"
        aria-describedby={state.error ? "zoi-error-desc" : undefined}
        tabIndex={-1}
      >
        <div style={{ height: "4px", background: "linear-gradient(90deg, #008882 0%, #263D88 100%)", flexShrink: 0 }} />

        {state.error === "offline" && (
          <div
            id="zoi-error-desc"
            style={{
              padding: "16px 18px",
              background: "#FEF2F2",
              borderBottom: "1px solid #FECACA",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: "13px", color: "#991B1B", lineHeight: 1.5, marginBottom: "10px" }}>
              {t("error.offline")}
            </div>
            <button
              onClick={handleRetry}
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 600,
                border: "1.5px solid #FCA5A5",
                borderRadius: "8px",
                background: "#FFFFFF",
                color: "#991B1B",
                cursor: "pointer",
                fontFamily: "var(--font-jakarta), sans-serif",
                lineHeight: 1,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF2F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFFFF"; }}
            >
              {t("error.offline.retry")}
            </button>
          </div>
        )}

        {state.error === "api-degraded" && (
          <div
            id="zoi-error-desc"
            style={{
              padding: "14px 18px",
              background: "#FFFBEB",
              borderBottom: "1px solid #FDE68A",
              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: "13px", color: "#92400E", lineHeight: 1.5 }}>
              {t("error.apiDegraded")}
            </div>
          </div>
        )}

        <ZoiHeader />

        {state.viewMode === "history" ? (
          <ZoiHistoryView />
        ) : (
          <>
            <ZoiViewport />
            <ZoiComposer />
          </>
        )}
      </div>
    </>
  );
}
