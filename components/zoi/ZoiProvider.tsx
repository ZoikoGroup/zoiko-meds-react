"use client";

import { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from "react";
import type { Message, Persona, PanelView, ZoiPageContext, ZoiError, ViewMode, ChatSession } from "./types";
import { PAGE_CONFIGS } from "./types";
import { GREETING_MESSAGE, generatePersonaResponse, submitEscalationApi, resetLowConfidenceCount } from "./mockAiService";
import { trackEvent, initTelemetry } from "./telemetry";

interface AuditEntry {
  timestamp: number;
  type: string;
  data: Record<string, unknown>;
}

interface ZoiState {
  panelView: PanelView;
  persona: Persona | null;
  personaSet: boolean;
  pageContext: ZoiPageContext;
  messages: Message[];
  isStreaming: boolean;
  streamedContent: string;
  consentGiven: boolean;
  escalationReference: string | null;
  escalationContact: string | null;
  error: ZoiError;
  auditTrail: AuditEntry[];
  viewMode: ViewMode;
  savedSessions: ChatSession[];
  activeSessionId: string;
}

type ZoiAction =
  | { type: "SET_PANEL_VIEW"; view: PanelView }
  | { type: "SET_PERSONA"; persona: Persona }
  | { type: "SET_PAGE_CONTEXT"; context: ZoiPageContext }
  | { type: "ADD_MESSAGE"; message: Message }
  | { type: "SET_STREAMING"; isStreaming: boolean }
  | { type: "APPEND_STREAM"; content: string }
  | { type: "CLEAR_STREAM" }
  | { type: "SET_CONSENT"; consentGiven: boolean }
  | { type: "SET_ESCALATION_REFERENCE"; ref: string; contact?: string }
  | { type: "SET_ERROR"; error: ZoiError }
  | { type: "TOGGLE_PANEL" }
  | { type: "RESET_SESSION" }
  | { type: "HYDRATE_SESSION"; messages: Message[]; persona: Persona | null; personaSet: boolean; activeSessionId?: string }
  | { type: "ADD_AUDIT_ENTRY"; entry: AuditEntry }
  | { type: "SET_VIEW_MODE"; mode: ViewMode }
  | { type: "SET_SAVED_SESSIONS"; sessions: ChatSession[] }
  | { type: "SET_ACTIVE_SESSION_ID"; id: string }
  | { type: "LOAD_SESSION"; session: ChatSession }
  | { type: "TOGGLE_SAVE_SESSION"; sessionId: string };

function zoiReducer(state: ZoiState, action: ZoiAction): ZoiState {
  switch (action.type) {
    case "TOGGLE_SAVE_SESSION": {
      const updated = state.savedSessions.map((s) =>
        s.id === action.sessionId ? { ...s, isExplicitlySaved: !s.isExplicitlySaved } : s
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("zoi_chat_history", JSON.stringify(updated));
        } catch {}
      }
      return { ...state, savedSessions: updated };
    }
    case "SET_PANEL_VIEW":
      return { ...state, panelView: action.view };
    case "SET_PERSONA":
      return { ...state, persona: action.persona, personaSet: true };
    case "SET_PAGE_CONTEXT":
      return { ...state, pageContext: action.context };
    case "ADD_MESSAGE": {
      if (state.messages.some((m) => m.id === action.message.id)) {
        return state;
      }
      const newMessages = [...state.messages, action.message];
      const userMsgs = newMessages.filter((m) => m.role === "user");

      let updatedSessions = state.savedSessions;
      let currentSessionId = state.activeSessionId;
      if (currentSessionId === "session-init" && typeof window !== "undefined") {
        currentSessionId = crypto.randomUUID();
      }

      if (userMsgs.length > 0) {
        const firstQuery = userMsgs[0]?.content ?? "Medicine inquiry";
        const title = firstQuery.length > 35 ? firstQuery.substring(0, 35) + "..." : firstQuery;

        const existingSess = state.savedSessions.find((s) => s.id === currentSessionId);
        const createdAt = existingSess ? existingSess.createdAt : Date.now();

        const currentSession: ChatSession = {
          id: currentSessionId,
          title,
          createdAt,
          messages: newMessages,
          persona: state.persona,
        };

        updatedSessions = [
          currentSession,
          ...state.savedSessions.filter((s) => s.id !== currentSession.id),
        ];

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("zoi_chat_history", JSON.stringify(updatedSessions));
            sessionStorage.setItem(
              "zoi_session",
              JSON.stringify({
                messages: newMessages,
                persona: state.persona,
                personaSet: state.personaSet,
                activeSessionId: currentSessionId,
              })
            );
          } catch {}
        }
      }

      return {
        ...state,
        messages: newMessages,
        savedSessions: updatedSessions,
        activeSessionId: currentSessionId,
      };
    }
    case "SET_STREAMING":
      return { ...state, isStreaming: action.isStreaming };
    case "APPEND_STREAM":
      return { ...state, streamedContent: state.streamedContent + action.content };
    case "CLEAR_STREAM":
      return { ...state, streamedContent: "" };
    case "SET_CONSENT":
      return { ...state, consentGiven: action.consentGiven };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "SET_ESCALATION_REFERENCE":
      return { ...state, escalationReference: action.ref, escalationContact: action.contact ?? state.escalationContact };
    case "TOGGLE_PANEL":
      return { ...state, panelView: state.panelView === "open" ? "minimized" : "open" };
    case "RESET_SESSION": {
      if (typeof window !== "undefined") {
        try { sessionStorage.removeItem("zoi_session"); } catch {}
      }
      const newSessionId = typeof window !== "undefined" ? crypto.randomUUID() : "session-init";
      return {
        ...initialState,
        panelView: state.panelView,
        savedSessions: state.savedSessions,
        pageContext: state.pageContext,
        activeSessionId: newSessionId,
        messages: state.messages.length === 0 ? [] : [GREETING_MESSAGE],
      };
    }
    case "HYDRATE_SESSION": {
      const seenIds = new Set<string>();
      const uniqueMsgs: Message[] = [];
      for (const m of action.messages) {
        if (!seenIds.has(m.id)) {
          seenIds.add(m.id);
          uniqueMsgs.push(m);
        }
      }
      return {
        ...state,
        messages: uniqueMsgs.length > 0 ? uniqueMsgs : state.messages,
        persona: action.persona ?? state.persona,
        personaSet: action.personaSet ?? state.personaSet,
        activeSessionId: action.activeSessionId ?? state.activeSessionId,
      };
    }
    case "ADD_AUDIT_ENTRY":
      return { ...state, auditTrail: [...state.auditTrail, action.entry] };
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.mode };
    case "SET_SAVED_SESSIONS":
      return { ...state, savedSessions: action.sessions };
    case "SET_ACTIVE_SESSION_ID":
      return { ...state, activeSessionId: action.id };
    case "LOAD_SESSION":
      return {
        ...state,
        messages: action.session.messages,
        persona: action.session.persona,
        activeSessionId: action.session.id,
        viewMode: "chat",
      };
    default:
      return state;
  }
}

const initialState: ZoiState = {
  panelView: "closed",
  persona: null,
  personaSet: false,
  pageContext: "default",
  messages: [],
  isStreaming: false,
  streamedContent: "",
  consentGiven: true,
  escalationReference: null,
  escalationContact: null,
  error: null,
  auditTrail: [],
  viewMode: "chat",
  savedSessions: [],
  activeSessionId: "session-init",
};

interface ZoiContextValue {
  state: ZoiState;
  dispatch: React.Dispatch<ZoiAction>;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  minimizePanel: () => void;
  sendMessage: (content: string) => void;
  setPersona: (persona: Persona) => void;
  handleChipAction: (action: string) => void;
  submitEscalation: (contact: string, issueMessage?: string) => void;
  setError: (error: ZoiError) => void;
  clearError: () => void;
  startNewConversation: () => void;
  toggleHistoryView: (show?: boolean) => void;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  clearAllHistory: () => void;
  toggleSaveSession: (sessionId: string) => void;
}

const ZoiContext = createContext<ZoiContextValue | null>(null);

function addAudit(
  dispatch: React.Dispatch<ZoiAction>,
  type: string,
  data: Record<string, unknown>
): void {
  const entry: AuditEntry = {
    timestamp: Date.now(),
    type,
    data: { ...data, sessionId: typeof window !== "undefined" ? crypto.randomUUID() : "server" },
  };
  dispatch({ type: "ADD_AUDIT_ENTRY", entry });
  if (process.env.NODE_ENV === "development") {
    console.log(`[Audit] ${type}:`, JSON.stringify(data));
  }
}

export function ZoiProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(zoiReducer, initialState);

  // Hydrate session history from sessionStorage on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = sessionStorage.getItem("zoi_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) {
          dispatch({
            type: "HYDRATE_SESSION",
            messages: parsed.messages,
            persona: parsed.persona ?? null,
            personaSet: !!parsed.personaSet,
            activeSessionId: parsed.activeSessionId,
          });
        }
      }
    } catch {
      // Ignore storage read/parse error
    }
  }, []);

  // Save session state to sessionStorage and update savedSessions history in real-time
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (state.messages.length > 0) {
      // Logic handled within ADD_MESSAGE for robustness, but we preserve local effect for other state changes
    }
  }, [state.messages, state.persona, state.personaSet, state.activeSessionId]);

  const openPanel = useCallback(() => {
    initTelemetry();
    dispatch({ type: "SET_PANEL_VIEW", view: "open" });
    trackEvent("panel_opened", { pageContext: state.pageContext });
    addAudit(dispatch, "panel_opened", { pageContext: state.pageContext });
    if (state.messages.length === 0) {
      dispatch({ type: "ADD_MESSAGE", message: GREETING_MESSAGE });
      const config = PAGE_CONFIGS[state.pageContext] ?? PAGE_CONFIGS.default;
      if (config.skipPersonaRouting && config.persona) {
        setTimeout(() => {
          dispatch({ type: "SET_PERSONA", persona: config.persona! });
          trackEvent("persona_selected", { persona: config.persona! });
          addAudit(dispatch, "persona_auto_selected", { persona: config.persona!, pageContext: state.pageContext });
          const msg: Message = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: generatePersonaResponse(config.persona!),
            timestamp: Date.now(),
            chips: [
              { label: "Check availability", action: "check_availability" },
              { label: "Talk to team", action: "escalate" },
            ],
          };
          dispatch({ type: "ADD_MESSAGE", message: msg });
        }, 100);
      }
    }
  }, [state.messages.length, state.pageContext]);

  const closePanel = useCallback(() => {
    dispatch({ type: "SET_PANEL_VIEW", view: "closed" });
    trackEvent("panel_closed");
    addAudit(dispatch, "panel_closed", { messageCount: state.messages.length });
  }, [state.messages.length]);

  const togglePanel = useCallback(() => {
    if (state.panelView === "closed") {
      openPanel();
    } else {
      dispatch({ type: "TOGGLE_PANEL" });
    }
  }, [state.panelView, openPanel]);

  const minimizePanel = useCallback(() => {
    dispatch({ type: "SET_PANEL_VIEW", view: "minimized" });
  }, []);

  const setPersona = useCallback((persona: Persona) => {
    dispatch({ type: "SET_PERSONA", persona });
    resetLowConfidenceCount();
    trackEvent("persona_selected", { persona });
    addAudit(dispatch, "persona_selected", { persona });

    let chips = [
      { label: "Check availability", action: "check_availability" },
      { label: "Talk to team", action: "escalate" },
    ];
    if (persona === "enterprise") {
      chips = [
        { label: "Talk to team", action: "escalate" },
        { label: "Request API Docs", action: "request_api_docs" },
      ];
    } else if (persona === "wholesale") {
      chips = [
        { label: "Access Wholesale Portal", action: "wholesale_portal" },
        { label: "Talk to team", action: "escalate" },
      ];
    }

    const msg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: generatePersonaResponse(persona),
      timestamp: Date.now(),
      chips,
    };
    dispatch({ type: "ADD_MESSAGE", message: msg });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || state.isStreaming) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };
      dispatch({ type: "ADD_MESSAGE", message: userMsg });
      dispatch({ type: "SET_STREAMING", isStreaming: true });
      dispatch({ type: "CLEAR_STREAM" });
      addAudit(dispatch, "message_sent", { messageId: userMsg.id, persona: state.persona });

      const { streamResponse } = await import("./mockAiService");
      streamResponse(
        [...state.messages, userMsg],
        state.persona ?? "other",
        (chunk) => {
          dispatch({ type: "APPEND_STREAM", content: chunk });
        },
        (completeMsg) => {
          dispatch({ type: "CLEAR_STREAM" });
          dispatch({ type: "ADD_MESSAGE", message: completeMsg });
          dispatch({ type: "SET_STREAMING", isStreaming: false });
          addAudit(dispatch, "response_complete", {
            messageId: completeMsg.id,
            hasCard: !!completeMsg.availabilityCard,
            guardrail: !!completeMsg.guardrail,
            hasEscalation: !!completeMsg.chips?.find((c) => c.action === "escalate"),
          });

          if (completeMsg.availabilityCard?.confidence === "low" || completeMsg.availabilityCard?.confidence === "moderate") {
            const lowCount = state.messages.filter(
              (m) => m.role === "assistant" && m.availabilityCard && (m.availabilityCard.confidence === "low" || m.availabilityCard.confidence === "moderate")
            ).length + 1;
            if (lowCount >= 2) {
              addAudit(dispatch, "escalation_triggered", { reason: "consecutive_low_confidence", count: lowCount });
            }
          }
        }
      );
    },
    [state.messages, state.isStreaming, state.persona]
  );

  const handleChipAction = useCallback(
    (action: string) => {
      addAudit(dispatch, "chip_clicked", { action, persona: state.persona });
      switch (action) {
        case "patient":
        case "pharmacy":
        case "enterprise":
        case "wholesale":
        case "other":
          setPersona(action as Persona);
          break;
        case "check_availability": {
          const userMsgs = [...state.messages].reverse().filter((m) => m.role === "user");
          let historyMed: string | null = null;
          import("@/lib/availability").then(({ findMedicineInQuery }) => {
            for (const u of userMsgs) {
              const m = findMedicineInQuery(u.content);
              if (m) { historyMed = m; break; }
            }
            if (historyMed) {
              sendMessage(historyMed);
            } else {
              dispatch({ type: "ADD_MESSAGE", message: {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "I can help you check medicine availability. Tell me the name of the medicine and your location.",
                timestamp: Date.now(),
                chips: [
                  { label: "Find a medicine", action: "patient" },
                ],
              } });
            }
          });
          break;
        }
        case "request_api_docs":
          if (typeof window !== "undefined") {
            const opened = window.open("https://zoikomeds.com/enterprise", "_blank");
            if (!opened) window.location.href = "https://zoikomeds.com/enterprise";
          }
          dispatch({ type: "ADD_MESSAGE", message: {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Opening enterprise API documentation at [zoikomeds.com/enterprise](https://zoikomeds.com/enterprise)...",
            timestamp: Date.now(),
            chips: [
              { label: "Talk to team", action: "escalate" },
            ],
          } });
          break;
        case "wholesale_portal":
          if (typeof window !== "undefined") {
            const opened = window.open("https://zoikomeds.com/contact", "_blank");
            if (!opened) window.location.href = "https://zoikomeds.com/contact";
          }
          dispatch({ type: "ADD_MESSAGE", message: {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Wholesale partners can access bulk pricing, track orders, and manage supply chain planning through our partner network. Connecting you with our team at [zoikomeds.com/contact](https://zoikomeds.com/contact)...",
            timestamp: Date.now(),
            chips: [
              { label: "Talk to team", action: "escalate" },
            ],
          } });
          break;
        case "open_search":
          if (typeof window !== "undefined") {
            const opened = window.open("https://zoikomeds.com/searchmed", "_blank");
            if (!opened) window.location.href = "https://zoikomeds.com/searchmed";
          }
          dispatch({ type: "ADD_MESSAGE", message: {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Opening the ZoikoMeds medicine search page at [zoikomeds.com/searchmed](https://zoikomeds.com/searchmed)...",
            timestamp: Date.now(),
            chips: [
              { label: "Check availability", action: "check_availability" },
              { label: "Talk to team", action: "escalate" },
            ],
          } });
          break;
        case "show_pharmacies":
        case "view_pharmacies": {
          // Check if previous user message had a medicine (e.g. guardrail question "Can I take amoxicillin with warfarin?")
          const recentUserMsgs = [...state.messages].reverse().filter((m) => m.role === "user");
          const lastUserQuery = recentUserMsgs[0]?.content ?? "";
          import("@/lib/availability").then(({ findMedicineInQuery, extractRegion }) => {
            const medInQuery = findMedicineInQuery(lastUserQuery);
            const regInQuery = extractRegion(lastUserQuery);

            const lastCardMsg = [...state.messages].reverse().find((m) => m.availabilityCard);
            const card = lastCardMsg?.availabilityCard;

            const targetMed = medInQuery ? medInQuery.toUpperCase() : (card?.medicine ?? null);
            const targetReg = regInQuery ? (regInQuery.charAt(0).toUpperCase() + regInQuery.slice(1)) : (card?.region ?? "any");

            if (targetMed) {
              import("./mockAiService").then(({ fetchAvailability }) => {
                fetchAvailability(targetMed, targetReg).then((res) => {
                  let pharmacyContent = "";
                  if (res && res.card && res.card.pharmacies && res.card.pharmacies.length > 0) {
                    pharmacyContent = `Here are stocking pharmacies for ${targetMed}${targetReg !== "any" ? ` in ${targetReg}` : ""}:\n\n` +
                      res.card.pharmacies
                        .map((p, i) => `${i + 1}. ${p.name}, ${p.city} — ${p.phone ? p.phone : "N/A"} (${p.address})`)
                        .join("\n");
                  } else {
                    pharmacyContent = `No stocking pharmacies currently report active stock for ${targetMed}${targetReg !== "any" ? ` in ${targetReg}` : ""}. You can set an availability alert to be notified when stock becomes available, or search a nearby area.`;
                  }
                  dispatch({
                    type: "ADD_MESSAGE",
                    message: {
                      id: crypto.randomUUID(),
                      role: "assistant",
                      content: pharmacyContent,
                      timestamp: Date.now(),
                      chips: [
                        { label: "Set alert", action: "set_alert" },
                        { label: "Check availability", action: "check_availability" },
                      ],
                    },
                  });
                });
              });
            } else {
              dispatch({
                type: "ADD_MESSAGE",
                message: {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: "Which medicine and location would you like to view pharmacy contacts for?",
                  timestamp: Date.now(),
                  chips: [{ label: "Check availability", action: "check_availability" }],
                },
              });
            }
          });
          break;
        }
        case "continue_availability":
          dispatch({ type: "ADD_MESSAGE", message: {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Of course. Tell me the name of the medicine and your location, and I'll check availability through ZoikoAvail\u2122 for you.",
            timestamp: Date.now(),
            chips: [
              { label: "Check availability", action: "check_availability" },
            ],
          } });
          break;
        case "set_alert": {
          const lastCardMsg = [...state.messages].reverse().find((m) => m.availabilityCard);
          const card = lastCardMsg?.availabilityCard;
          if (card) {
            if (!state.escalationContact) {
              dispatch({
                type: "ADD_MESSAGE",
                message: {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: `To activate the stock alert for ${card.medicine} in ${card.region}, please enter your phone number or email below so we can notify you as soon as stock arrives:`,
                  timestamp: Date.now(),
                  alertForm: true,
                  alertContext: { medicine: card.medicine, region: card.region },
                },
              });
            } else {
              const masked = state.escalationContact.includes("@")
                ? state.escalationContact.replace(/(.{2})(.*)(@.*)/, "$1****$3")
                : state.escalationContact.replace(/(.{3})(.*)/, "$1****");
              dispatch({
                type: "ADD_MESSAGE",
                message: {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: `Alert activated for ${card.medicine} in ${card.region}. Notifications will be sent to ${masked} as soon as ZoikoAvail\u2122 detects new stock.`,
                  timestamp: Date.now(),
                  chips: [{ label: "Check availability", action: "check_availability" }, { label: "Talk to team", action: "escalate" }],
                },
              });
            }
          } else {
            dispatch({
              type: "ADD_MESSAGE",
              message: {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "I can set an alert for you. Please enter your email or phone below to receive notifications when new availability is reported:",
                timestamp: Date.now(),
                alertForm: true,
              },
            });
          }
          break;
        }
        case "escalate": {
          if (state.escalationContact && state.escalationReference) {
            const masked = state.escalationContact.includes("@")
              ? state.escalationContact.replace(/(.{2})(.*)(@.*)/, "$1****$3")
              : state.escalationContact.replace(/(.{3})(.*)/, "$1****");
            dispatch({
              type: "ADD_MESSAGE",
              message: {
                id: crypto.randomUUID(),
                role: "assistant",
                content: `You already have an active support request submitted under ticket #${state.escalationReference}. Our team will reach out to you via ${masked} within one business day.`,
                timestamp: Date.now(),
                chips: [
                  { label: "Check availability", action: "check_availability" },
                  { label: "Submit another request", action: "new_request" },
                ],
              },
            });
          } else {
            dispatch({
              type: "ADD_MESSAGE",
              message: {
                id: crypto.randomUUID(),
                role: "assistant",
                content:
                  "I'll connect you with the ZoikoMeds team. Share the best way to reach you and I'll include our conversation so you won't need to repeat yourself.",
                timestamp: Date.now(),
                escalation: true,
              },
            });
          }
          break;
        }
        case "new_request": {
          dispatch({
            type: "ADD_MESSAGE",
            message: {
              id: crypto.randomUUID(),
              role: "assistant",
              content: "Share your email or phone below to submit a new support request:",
              timestamp: Date.now(),
              escalation: true,
            },
          });
          break;
        }
        case "retry":
          break;
      }
    },
    [setPersona, state.persona, state.messages, state.escalationContact, state.escalationReference]
  );

  const setError = useCallback((error: ZoiError) => {
    dispatch({ type: "SET_ERROR", error });
    if (error) {
      trackEvent("error_shown", { error });
      addAudit(dispatch, "error_shown", { error });
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", error: null });
  }, []);

  const submitEscalation = useCallback(async (contact: string, issueMessage?: string) => {
    const conversationMessages = state.consentGiven
      ? state.messages.map((m) => ({ id: m.id, role: m.role, content: m.content, timestamp: m.timestamp }))
      : [];
    const ref = await submitEscalationApi(
      contact,
      state.consentGiven,
      state.persona,
      state.messages.length,
      conversationMessages,
      issueMessage
    );

    const localRef = ref ?? `ZK-${Math.floor(1000 + Math.random() * 9000)}`;
    const masked = contact.includes("@")
      ? contact.replace(/(.{2})(.*)(@.*)/, "$1****$3")
      : contact.replace(/(.{3})(.*)/, "$1****");

    dispatch({ type: "SET_ESCALATION_REFERENCE", ref: localRef, contact });

    if (process.env.NODE_ENV === "development") {
      console.log(`[Zoi Escalation] API success: ${!!ref} | Contact: ${contact} | Ref: ${localRef} | Consent: ${state.consentGiven}`);
    }
    addAudit(dispatch, "escalation_submitted", {
      ref: localRef,
      apiSuccess: !!ref,
      consent: state.consentGiven,
      persona: state.persona,
      messageCount: state.messages.length,
    });

    const message = ref
      ? `Request received — reference #${localRef}. We'll reach out via ${masked}. The team responds within one business day.`
      : `Request received offline — reference #${localRef}. We'll reach out via ${masked}. The team responds within one business day.`;

    dispatch({ type: "ADD_MESSAGE", message: {
      id: crypto.randomUUID(),
      role: "assistant",
      content: message,
      timestamp: Date.now(),
    } });
  }, [state.consentGiven, state.persona, state.messages]);

  // Load saved history from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const historyStr = localStorage.getItem("zoi_chat_history");
      if (historyStr) {
        const parsed = JSON.parse(historyStr);
        if (Array.isArray(parsed)) {
          dispatch({ type: "SET_SAVED_SESSIONS", sessions: parsed });
        }
      }
    } catch {}
  }, []);

  const startNewConversation = useCallback(() => {
    const userMsgs = state.messages.filter((m) => m.role === "user");
    if (userMsgs.length > 0) {
      const firstQuery = userMsgs[0]?.content ?? "Medicine inquiry";
      const title = firstQuery.length > 35 ? firstQuery.substring(0, 35) + "..." : firstQuery;
      const currentSession: ChatSession = {
        id: state.activeSessionId || crypto.randomUUID(),
        title,
        createdAt: Date.now(),
        messages: state.messages,
        persona: state.persona,
      };

      const updated = [currentSession, ...state.savedSessions.filter((s) => s.id !== currentSession.id)];
      dispatch({ type: "SET_SAVED_SESSIONS", sessions: updated });
      try {
        localStorage.setItem("zoi_chat_history", JSON.stringify(updated));
      } catch {}
    }

    const newId = crypto.randomUUID();
    dispatch({ type: "SET_ACTIVE_SESSION_ID", id: newId });
    dispatch({ type: "RESET_SESSION" });
    dispatch({ type: "SET_VIEW_MODE", mode: "chat" });
  }, [state.messages, state.persona, state.activeSessionId, state.savedSessions]);

  const toggleHistoryView = useCallback((show?: boolean) => {
    dispatch({
      type: "SET_VIEW_MODE",
      mode: show !== undefined ? (show ? "history" : "chat") : state.viewMode === "chat" ? "history" : "chat",
    });
  }, [state.viewMode]);

  const loadSession = useCallback((sessionId: string) => {
    const found = state.savedSessions.find((s) => s.id === sessionId);
    if (found) {
      dispatch({ type: "LOAD_SESSION", session: found });
    }
  }, [state.savedSessions]);

  const deleteSession = useCallback((sessionId: string) => {
    const updated = state.savedSessions.filter((s) => s.id !== sessionId);
    dispatch({ type: "SET_SAVED_SESSIONS", sessions: updated });
    try {
      localStorage.setItem("zoi_chat_history", JSON.stringify(updated));
    } catch {}
  }, [state.savedSessions]);

  const clearAllHistory = useCallback(() => {
    dispatch({ type: "SET_SAVED_SESSIONS", sessions: [] });
    try {
      localStorage.removeItem("zoi_chat_history");
    } catch {}
  }, []);

  const toggleSaveSession = useCallback((sessionId: string) => {
    dispatch({ type: "TOGGLE_SAVE_SESSION", sessionId });
  }, []);

  return (
    <ZoiContext.Provider
      value={{
        state,
        dispatch,
        openPanel,
        closePanel,
        togglePanel,
        minimizePanel,
        sendMessage,
        setPersona,
        handleChipAction,
        submitEscalation,
        setError,
        clearError,
        startNewConversation,
        toggleHistoryView,
        loadSession,
        deleteSession,
        clearAllHistory,
        toggleSaveSession,
      }}
    >
      {children}
    </ZoiContext.Provider>
  );
}

export function useZoi(): ZoiContextValue {
  const ctx = useContext(ZoiContext);
  if (!ctx) throw new Error("useZoi must be used within ZoiProvider");
  return ctx;
}
