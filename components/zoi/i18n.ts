"use client";

type MessageVariables = Record<string, string | number>;

const MESSAGES: Record<string, Record<string, string>> = {
  en: {
    "greeting": "Hello. I'm Zoi, the ZoikoMeds assistant. I can check medicine availability, explain the platform, and connect you with our team.\n\nI'm an AI assistant and don't give medical advice. For clinical questions, always consult your pharmacist or doctor.\n\nWhat brings you here today?",
    "composer.placeholder": "Message Zoi\u2026",
    "footer.disclosure": "Zoi is AI. No medical advice. Learn how \u2192",
    "launcher.default": "Ask Zoi",
    "launcher.patients": "Find a medicine",
    "launcher.enterprise": "Talk to us",
    "launcher.wholesale": "Partner support",
    "launcher.login": "Sign in help",
    "header.title": "Zoi",
    "header.subtitle": "ZoikoMeds Availability Assistant",
    "thinking": "is thinking",
    "error.offline": "Zoi is temporarily unavailable. For urgent needs: support@zoikomeds.com",
    "error.offline.retry": "Retry",
    "error.apiDegraded": "I can talk, but live availability data is temporarily unreachable. I can set an alert that fires once it's back.",
    "escalation.title": "Email or phone",
    "escalation.placeholder": "you@example.com",
    "escalation.includeConversation": "Include this conversation",
    "escalation.submit": "Request contact",
    "escalation.confirmation": "Request received \u2014 reference #{ref}. The team responds within one business day.",
    "persona.patient": "I'm looking for a medicine",
    "persona.pharmacy": "I run or work at a pharmacy",
    "persona.enterprise": "I represent an organisation",
    "persona.wholesale": "I'm a wholesale partner",
    "persona.other": "Something else",
    "card.dataAsOf": "Data as of {timestamp} · {source}",
    "card.viewPharmacies": "View pharmacies",
    "card.setAlert": "Set alert",
    "card.stockingPharmacies": "{count} stocking pharmacies",
    "card.available": "Available",
    "card.limited": "Limited stock",
    "card.unavailable": "Unavailable",
    "card.insufficientSignal": "Insufficient signal",
    "card.staleData": "Data may be stale",
    "chip.checkAvailability": "Check availability",
    "chip.talkToTeam": "Talk to team",
    "chip.viewPharmacies": "View pharmacies",
    "chip.setAlert": "Set alert",
    "chip.showPharmacyContacts": "Show pharmacy contacts",
    "chip.continueAvailability": "Continue with availability",
    "guardrail": "That's an important question, and it's one for a clinical professional — drug interactions depend on your specific situation, and I'm not able to advise on them safely.\n\nYour pharmacist can answer this when you collect your medicine. If you'd like, I can show you the stocking pharmacies' contact details now.",
    "escalation.message": "I'll connect you with the ZoikoMeds team. Share the best way to reach you and I'll include our conversation so you won't need to repeat yourself.",
    "welcome.empty": "Start a conversation with Zoi",
    "confidence.high": "High confidence",
    "confidence.moderate": "Moderate confidence",
    "confidence.low": "Low confidence",
    "important": "Important",
    "viewpoint.empty": "Start a conversation with Zoi",
  },
  sw: {
    "greeting": "Habari. Mimi ni Zoi, msaidizi wa ZoikoMeds. Ninaweza kuangalia upatikanaji wa dawa, kuelezea jukwaa, na kukuunganisha na timu yetu.\n\nMimi ni msaidizi wa AI na sitishauri matibabu. Kwa maswali ya kliniki, wasiliana na mfamasia au daktari wako.\n\nUko hapa kwa nini leo?",
    "composer.placeholder": "Tuma ujumbe kwa Zoi\u2026",
    "footer.disclosure": "Zoi ni AI. Hakuna ushauri wa matibabu. Jifunze jinsi \u2192",
    "launcher.default": "Muulize Zoi",
    "launcher.patients": "Tafuta dawa",
    "launcher.enterprise": "Wasiliana nasi",
    "launcher.wholesale": "Msaada wa washirika",
    "launcher.login": "Msaada wa kuingia",
    "header.title": "Zoi",
    "header.subtitle": "Msaidizi wa Upatikanaji wa ZoikoMeds",
    "thinking": "inatafuta",
    "error.offline": "Zoi haipatikani kwa muda. Kwa mahitaji ya dharura: support@zoikomeds.com",
    "error.offline.retry": "Jaribu tena",
    "error.apiDegraded": "Naweza kuongea, lakini data ya upatikanaji haipatikani kwa muda. Naweza kuweka tahadhari itakayokuarifu ikirudi.",
    "escalation.title": "Barua pepe au simu",
    "escalation.placeholder": "wewe@mfa.no",
    "escalation.includeConversation": "Jumuisha mazungumzo haya",
    "escalation.submit": "Omba wasiliani",
    "escalation.confirmation": "Ombi limepokelewa \u2014 kumbukumbu #{ref}. Timu itajibu ndani ya siku moja ya kazi.",
    "persona.patient": "Natafuta dawa",
    "persona.pharmacy": "Ninafanya kazi kwenye duka la dawa",
    "persona.enterprise": "Ninawakilisha shirika",
    "persona.wholesale": "Mimi ni mshirika wa jumla",
    "persona.other": "Jambo lingine",
    "card.dataAsOf": "Data kuanzia {timestamp} · {source}",
    "card.viewPharmacies": "Tazama maduka ya dawa",
    "card.setAlert": "Weka tahadhari",
    "card.stockingPharmacies": "Maduka ya dawa {count} yana hisa",
    "card.available": "Inapatikana",
    "card.limited": "Hisa chache",
    "card.unavailable": "Haipatikani",
    "card.insufficientSignal": "Ishara haitoshi",
    "card.staleData": "Data inaweza kuwa ya zamani",
    "chip.checkAvailability": "Angalia upatikanaji",
    "chip.talkToTeam": "Ongea na timu",
    "chip.viewPharmacies": "Tazama maduka ya dawa",
    "chip.setAlert": "Weka tahadhari",
    "chip.showPharmacyContacts": "Onyesha anwani za maduka",
    "chip.continueAvailability": "Endelea na upatikanaji",
    "guardrail": "Hilo ni swali muhimu, na ni la mtaalamu wa kliniki \u2014 mwingiliano wa dawa unategemea hali yako maalum, na siwezi kutoa ushauri salama.\n\nMfamasia wako anaweza kujibu swali hili unapochukua dawa yako. Ukipenda, naweza kuonyesha anwani za maduka ya dawa yaliyo na hisa sasa.",
    "escalation.message": "Nitakuunganisha na timu ya ZoikoMeds. Tuma njia bora ya kukufikia na nitajumuisha mazungumzo yetu ili usilazimike kurudia mwenyewe.",
    "welcome.empty": "Anza mazungumzo na Zoi",
    "confidence.high": "Uhakika wa juu",
    "confidence.moderate": "Uhakika wa wastani",
    "confidence.low": "Uhakika mdogo",
    "important": "Muhimu",
    "viewpoint.empty": "Anza mazungumzo na Zoi",
  },
};

function interpolate(template: string, variables?: MessageVariables): string {
  if (!variables) return template;
  return template.replace(/\{(\w+)\}/g, (_: string, key: string) => {
    const value = variables[key];
    return value !== undefined ? String(value) : `{${key}}`;
  });
}

export function t(key: string, variables?: MessageVariables, locale: string = "en"): string {
  const msg = MESSAGES[locale]?.[key];
  if (!msg) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[i18n] Missing translation key: ${key} for locale: ${locale}`);
    }
    return key;
  }
  return interpolate(msg, variables);
}

export function availableLocales(): string[] {
  return Object.keys(MESSAGES);
}

export type { MessageVariables };
