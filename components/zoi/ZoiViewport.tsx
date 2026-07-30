"use client";

import { useRef, useEffect, useState } from "react";
import { useZoi } from "./ZoiProvider";
import MessageText from "./MessageText";
import AvailabilityCard from "./AvailabilityCard";
import EscalationForm from "./EscalationForm";
import AlertForm from "./AlertForm";
import ChipRow from "./ChipRow";
import PersonaSelector from "./PersonaSelector";
import { safeCardPayload } from "./outputValidator";
import { t } from "./i18n";
import type { Message } from "./types";

const PERSONA_ACTIONS = new Set(["patient", "pharmacy", "enterprise", "wholesale", "other"]);

function hasPersonaChips(msg: Message): boolean {
  return msg.chips?.every((c) => PERSONA_ACTIONS.has(c.action)) ?? false;
}

export default function ZoiViewport() {
  const { state } = useZoi();
  const bottomRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const sentenceBufferRef = useRef("");
  const lastSentenceRef = useRef("");
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages, state.streamedContent]);

  useEffect(() => {
    if (state.isStreaming && !state.streamedContent) {
      const timer = setTimeout(() => setShowThinking(true), 400);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowThinking(false), 0);
      return () => clearTimeout(timer);
    }
  }, [state.isStreaming, state.streamedContent]);

  useEffect(() => {
    if (!state.isStreaming) {
      sentenceBufferRef.current = "";
      lastSentenceRef.current = "";
    }
  }, [state.isStreaming]);

  useEffect(() => {
    if (state.isStreaming && state.streamedContent && liveRegionRef.current) {
      sentenceBufferRef.current = state.streamedContent;
      const sentences = sentenceBufferRef.current.match(/[^.!?\n]+[.!?\n]*/g) ?? [];
      const lastSentence = sentences[sentences.length - 1]?.trim();
      if (lastSentence && lastSentence !== lastSentenceRef.current) {
        const prevLen = lastSentenceRef.current.length;
        const newPart = lastSentence.slice(prevLen > 0 && lastSentence.startsWith(lastSentenceRef.current) ? prevLen : 0).trim();
        if (newPart && newPart.length >= 5) {
          liveRegionRef.current.textContent = newPart;
          lastSentenceRef.current = lastSentence;
        }
      }
    }
  }, [state.streamedContent, state.isStreaming]);

  useEffect(() => {
    if (state.messages.length > 0 && liveRegionRef.current) {
      const lastMsg = state.messages[state.messages.length - 1];
      if (lastMsg.role === "assistant") {
        liveRegionRef.current.textContent = lastMsg.content;
      }
    }
  }, [state.messages]);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px 18px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        background: "#FFFFFF",
      }}
    >
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}
      />

      {state.messages.length === 0 && (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#6B7280",
            fontSize: "13px",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {t("welcome.empty")}
        </div>
      )}

      {state.messages.map((msg, idx) => (
        <div key={`${msg.id}-${idx}`} style={{ marginBottom: "2px" }}>
          {msg.role === "system" ? null : (
            <div
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "14px 18px",
                  borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  background: msg.role === "user" ? "linear-gradient(135deg, #008882 0%, #006662 100%)" : "#F8FAFC",
                  border: msg.role === "user" ? "none" : "1px solid #E2E8F0",
                  color: msg.role === "user" ? "#FFFFFF" : "#0F172A",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  boxShadow: msg.role === "user" ? "0 3px 10px rgba(0,136,130,0.18)" : "0 2px 6px rgba(15,23,42,0.03)",
                  fontWeight: msg.role === "user" ? 500 : 400,
                }}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <>
                    {msg.id !== "greeting" && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                        paddingBottom: "6px",
                        borderBottom: "1px solid #EDF2F7",
                      }}>
                        <img src="/favicon.ico" alt="" width="24" height="24" style={{ borderRadius: "6px", flexShrink: 0 }} />
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#263D88", letterSpacing: "-0.01em" }}>
                          Zoi
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: 600, padding: "1px 5px", background: "#E0F2FE", color: "#0369A1", borderRadius: "4px" }}>
                          Assistant
                        </span>
                      </div>
                    )}
                    <MessageText content={msg.content} />

                    {msg.role === "assistant" && msg.availabilityCard && (() => {
                      const validated = safeCardPayload(msg.availabilityCard);
                      return validated ? (
                        <AvailabilityCard card={validated} />
                      ) : (
                        <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>
                          {t("card.unavailable")}
                        </div>
                      );
                    })()}

                    {msg.role === "assistant" && msg.escalation && (
                      <EscalationForm />
                    )}

                    {msg.role === "assistant" && msg.alertForm && (
                      <AlertForm medicine={msg.alertContext?.medicine} region={msg.alertContext?.region} />
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {msg.chips && msg.chips.length > 0 && msg.role === "assistant" && !hasPersonaChips(msg) && (
            <div style={{ marginTop: "6px" }}>
              <ChipRow chips={msg.chips} />
            </div>
          )}

          {msg.chips && msg.chips.length > 0 && msg.role === "assistant" && hasPersonaChips(msg) && !state.personaSet && (
            <PersonaSelector />
          )}
        </div>
      ))}

      {state.isStreaming && state.streamedContent && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              maxWidth: "85%",
              padding: "14px 18px",
              borderRadius: "18px 18px 18px 4px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              color: "#0F172A",
              fontSize: "14px",
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              boxShadow: "0 2px 6px rgba(15,23,42,0.03)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", paddingBottom: "6px", borderBottom: "1px solid #EDF2F7" }}>
              <img src="/favicon.ico" alt="" width="24" height="24" style={{ borderRadius: "6px", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#263D88" }}>Zoi</span>
              <span style={{ fontSize: "10px", fontWeight: 600, padding: "1px 5px", background: "#E0F2FE", color: "#0369A1", borderRadius: "4px" }}>
                Assistant
              </span>
            </div>
            <span>{state.streamedContent}</span>
            <span style={{ display: "inline-block", width: "6px", height: "16px", background: "#008882", marginLeft: "2px", verticalAlign: "text-bottom", borderRadius: "1px" }} />
          </div>
        </div>
      )}

      {state.isStreaming && !state.streamedContent && showThinking && (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              maxWidth: "85%",
              padding: "12px 18px",
              borderRadius: "18px 18px 18px 4px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              color: "#0F172A",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="/favicon.ico" alt="" width="24" height="24" style={{ borderRadius: "6px", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#263D88" }}>Zoi</span>
              <span style={{ fontSize: "13px", color: "#64748B" }}>{t("thinking")}</span>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
