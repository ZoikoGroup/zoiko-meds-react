"use client";

import { useZoi } from "./ZoiProvider";
import type { ChatSession } from "./types";

export default function ZoiHistoryView() {
  const { state, loadSession, deleteSession, clearAllHistory, startNewConversation, toggleHistoryView, toggleSaveSession } = useZoi();

  const sessions = state.savedSessions || [];

  const formatDate = (timestamp: number) => {
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        background: "#F8FAFC",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px",
          paddingBottom: "12px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => toggleHistoryView(false)}
            aria-label="Back to chat"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "1px solid #CBD5E1",
              background: "#FFFFFF",
              color: "#334155",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A" }}>
            Chat History
          </span>
        </div>

        <button
          onClick={startNewConversation}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "8px",
            border: "none",
            background: "#008882",
            color: "#FFFFFF",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0, 136, 130, 0.3)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Chat
        </button>
      </div>

      {sessions.length === 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px 20px",
            color: "#64748B",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#E2E8F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "12px",
              color: "#475569",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#1E293B", marginBottom: "4px" }}>
            No past conversations
          </div>
          <div style={{ fontSize: "12px", color: "#64748B", maxWidth: "260px" }}>
            When you chat with Zoi, your past conversations will be saved here automatically.
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {sessions.map((sess: ChatSession) => {
            const isActive = sess.id === state.activeSessionId;
            const userPrompts = sess.messages.filter((m) => m.role === "user").map((m) => m.content);

            return (
              <div
                key={sess.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  background: isActive ? "#F0FDF4" : "#FFFFFF",
                  border: isActive ? "1.5px solid #10B981" : "1px solid #E2E8F0",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                }}
                onClick={() => loadSession(sess.id)}
              >
                <div style={{ minWidth: 0, flex: 1, paddingRight: "10px" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#0F172A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {sess.title || "Untitled Conversation"}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#64748B", marginTop: "3px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>{formatDate(sess.createdAt)}</span>
                    <span>•</span>
                    <span>{sess.messages.length} messages</span>
                  </div>

                  {userPrompts.length > 1 && (
                    <div style={{ marginTop: "6px", paddingTop: "6px", borderTop: "1px stroke #F1F5F9", display: "flex", flexDirection: "column", gap: "3px" }}>
                      {userPrompts.slice(0, 3).map((prompt, pIdx) => (
                        <div key={pIdx} style={{ fontSize: "11px", color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          • {prompt}
                        </div>
                      ))}
                      {userPrompts.length > 3 && (
                        <div style={{ fontSize: "10.5px", color: "#94A3B8", fontStyle: "italic" }}>
                          + {userPrompts.length - 3} more turns
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveSession(sess.id);
                    }}
                    aria-label={sess.isExplicitlySaved ? "Unsave conversation" : "Save conversation"}
                    title={sess.isExplicitlySaved ? "Approved & Saved (Protected from 24h TTL purge)" : "Save conversation (Prevents 24h auto-purge)"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: sess.isExplicitlySaved ? "1px solid #10B981" : "1px solid #CBD5E1",
                      background: sess.isExplicitlySaved ? "#ECFDF5" : "#FFFFFF",
                      color: sess.isExplicitlySaved ? "#047857" : "#64748B",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={sess.isExplicitlySaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    {sess.isExplicitlySaved ? "Saved" : "Save"}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(sess.id);
                    }}
                    aria-label="Delete conversation"
                    title="Delete"
                    style={{
                      width: "28px",
                      height: "28px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      background: "transparent",
                      borderRadius: "6px",
                      color: "#94A3B8",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#FEE2E2";
                      e.currentTarget.style.color = "#DC2626";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#94A3B8";
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}

          <div style={{ padding: "10px 12px", background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: "8px", fontSize: "11.5px", color: "#92400E", lineHeight: 1.4, marginTop: "8px" }}>
            <strong>Retention Policy:</strong> Default transcript retention is 24 hours. Unsaved conversations are automatically purged unless explicitly saved above.
          </div>

          <div style={{ marginTop: "auto", paddingTop: "16px", display: "flex", justifyContent: "center" }}>
            <button
              onClick={clearAllHistory}
              style={{
                fontSize: "12px",
                color: "#94A3B8",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Clear all history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
