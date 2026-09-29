import type { MessageCatalog } from "./en";

/**
 * Hindi. DRAFT — needs review by a native speaker, and the legal and medical
 * wording needs counsel/pharmacist sign-off, before `hi` may be marked
 * available in ../locales.ts.
 *
 * ZM-IN-SPEC-001 (ZM-IN-022) expects Hindi and English to launch together in
 * India, so this catalog is on the India launch path, not a later addition.
 * Devanagari rendering must be added to visual regression before enabling.
 */
export const hi: MessageCatalog = {
  "language.detected": "हमने आपका क्षेत्र पहचाना",
  "language.question": "क्या आप भाषा बदलना चाहते हैं?",
  "language.stay": "{language} में जारी रखें",
  "language.switch": "{language} में बदलें",

  "notFound.eyebrow": "पेज नहीं मिला",
  "notFound.title": "यह फ़ार्मेसी पथ मौजूद नहीं है।",
  "notFound.description":
    "आप जो पेज ढूँढ रहे हैं वह हटाया या स्थानांतरित किया जा सकता है, या URL ग़लत हो सकता है। आइए आपको वापस सही रास्ते पर लाते हैं।",
  "notFound.backHome": "होम पर वापस जाएँ",
  "notFound.verification": "फ़ार्मेसी सत्यापन",
  "notFound.links.inventoryUpload": "स्टॉक अपलोड",
  "notFound.links.pharmacyPortal": "फ़ार्मेसी पोर्टल",
  "notFound.links.support": "सहायता",
  "notFound.copyright": "© {year} ZoikoMeds. सर्वाधिकार सुरक्षित।",

  "footer.tagline":
    "दवा उपलब्धता का वैश्विक बुनियादी ढाँचा — खोजें, संकेत पाएँ, सत्यापित करें। यह फ़ार्मेसी नहीं है। कोई नुस्ख़ा, वितरण या चिकित्सा सलाह नहीं।",
  "footer.status.monitoring": "बुनियादी ढाँचे की निगरानी सक्रिय",
  "footer.status.markets": "47+ नियोजित बाज़ारों का ढाँचा",
  "footer.badge.privacy": "निजता-प्रथम",
  "footer.badge.verified": "सत्यापित फ़ार्मेसियाँ",
  "footer.badge.noStock": "कोई स्टॉक उजागर नहीं",

  "footer.columns.platform": "प्लेटफ़ॉर्म",
  "footer.columns.pharmacies": "फ़ार्मेसियाँ",
  "footer.columns.providers": "स्वास्थ्य सेवा प्रदाता",
  "footer.columns.enterprise": "एंटरप्राइज़ और इंटेलिजेंस",
  "footer.columns.company": "कंपनी",
  "footer.columns.legal": "क़ानूनी और विश्वास",

  "footer.platform.search": "दवाएँ खोजें",
  "footer.platform.createAccount": "खाता बनाएँ",
  "footer.platform.savedSearches": "सहेजी गई खोजें",
  "footer.platform.alerts": "उपलब्धता अलर्ट",
  "footer.platform.caregiver": "देखभालकर्ता पहुँच",
  "footer.platform.confidence": "उपलब्धता विश्वसनीयता",

  "footer.pharmacies.join": "नेटवर्क से जुड़ें",
  "footer.pharmacies.portal": "फ़ार्मेसी पोर्टल",
  "footer.pharmacies.verification": "सत्यापन मानक",
  "footer.pharmacies.inventory": "स्टॉक अपलोड",
  "footer.pharmacies.confirmations": "पुष्टि अनुरोध",
  "footer.pharmacies.support": "फ़ार्मेसी सहायता",

  "footer.providers.overview": "प्रदाताओं के लिए अवलोकन",
  "footer.providers.patientSupport": "रोगी सहायता प्रक्रियाएँ",
  "footer.providers.careTeam": "देखभाल टीम पहुँच",
  "footer.providers.signals": "उपलब्धता संकेत",
  "footer.providers.referral": "रेफ़रल मार्गदर्शन",
  "footer.providers.support": "प्रदाता सहायता",

  "footer.enterprise.solutions": "एंटरप्राइज़ समाधान",
  "footer.enterprise.signal": "ZoikoSignal™ इंटेलिजेंस",
  "footer.enterprise.availApi": "ZoikoAvail™ API",
  "footer.enterprise.medibase": "MediBase™ डेटा",
  "footer.enterprise.healthSystems": "स्वास्थ्य प्रणालियाँ",
  "footer.enterprise.government": "सरकार और सार्वजनिक स्वास्थ्य",

  "footer.company.about": "ZoikoMeds के बारे में",
  "footer.company.healthcare": "Zoiko Healthcare",
  "footer.company.group": "Zoiko Group",
  "footer.company.careers": "करियर",
  "footer.company.press": "प्रेस",
  "footer.company.contact": "संपर्क",

  "footer.legal.trustCenter": "ट्रस्ट सेंटर",
  "footer.legal.privacyCenter": "निजता केंद्र",
  "footer.legal.terms": "उपयोग की शर्तें",
  "footer.legal.cookies": "कुकी सेटिंग्स",
  "footer.legal.medicalDisclaimer": "चिकित्सा अस्वीकरण",
  "footer.legal.controlledMedicine": "नियंत्रित दवा नीति",
  "footer.legal.accessibility": "सुगम्यता",

  "footer.bottom.privacy": "निजता",
  "footer.bottom.terms": "शर्तें",
  "footer.bottom.cookies": "कुकीज़",
  "footer.bottom.accessibility": "सुगम्यता",
  "footer.bottom.compliance": "अनुपालन",

  "footer.hq.us": "अमेरिका मुख्यालय",
  "footer.hq.eu": "यूरोप मुख्यालय",
  "footer.operator":
    "© {year} ZoikoMeds | ZoikoMeds एक शासित प्लेटफ़ॉर्म है, जिसका संचालन Zoiko Healthcare Inc करती है | Zoiko Healthcare Inc, Zoiko Group Inc की सहायक कंपनी है",
  "footer.copyright": "© {year} Zoiko Group Inc. सर्वाधिकार सुरक्षित।",
  "footer.disclaimer.intro":
    "ZoikoMeds भाग लेने वाली सत्यापित फ़ार्मेसियों से दवा उपलब्धता की जानकारी उपलब्ध कराता है।",
  "footer.disclaimer.emphasis":
    "ZoikoMeds कोई फ़ार्मेसी नहीं है; यह दवाएँ न लिखता है, न वितरित करता है, न बेचता है, न पहुँचाता है और न ही उनकी सिफ़ारिश करता है, और यह चिकित्सा सलाह नहीं देता।",
  "footer.disclaimer.rest":
    "उपलब्धता की जानकारी विश्वसनीयता पर आधारित है और स्टॉक की गारंटी नहीं है। नुस्ख़े संबंधी नियम, फ़ार्मासिस्ट का निर्णय, सत्यापन आवश्यकताएँ और क्षेत्राधिकार के क़ानून हमेशा लागू होते हैं। चिकित्सा आपात स्थिति में तुरंत स्थानीय आपातकालीन सेवाओं से संपर्क करें।",
};
