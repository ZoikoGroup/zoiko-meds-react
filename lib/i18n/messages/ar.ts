import type { MessageCatalog } from "./en";

/**
 * Arabic (Modern Standard). DRAFT — needs review by a native speaker, and the
 * legal and medical wording needs counsel/pharmacist sign-off, before `ar` may
 * be marked available in ../locales.ts.
 *
 * Arabic is right-to-left. Enabling it also requires the RTL layout audit
 * described in the report: the site's components still use physical `left`/
 * `right` spacing in many places, which must become logical properties
 * (margin-inline, padding-inline, inset-inline) first.
 */
export const ar: MessageCatalog = {
  "language.detected": "لقد اكتشفنا منطقتك",
  "language.question": "هل تريد تغيير اللغة؟",
  "language.stay": "المتابعة بـ{language}",
  "language.switch": "التبديل إلى {language}",

  "notFound.eyebrow": "الصفحة غير موجودة",
  "notFound.title": "مسار الصيدلية هذا غير موجود.",
  "notFound.description":
    "ربما تم نقل الصفحة التي تبحث عنها أو إزالتها، أو أن الرابط غير صحيح. دعنا نعيدك إلى المسار الصحيح.",
  "notFound.backHome": "العودة إلى الصفحة الرئيسية",
  "notFound.verification": "التحقق من الصيدليات",
  "notFound.links.inventoryUpload": "رفع المخزون",
  "notFound.links.pharmacyPortal": "بوابة الصيدلية",
  "notFound.links.support": "الدعم",
  "notFound.copyright": "© {year} ZoikoMeds. جميع الحقوق محفوظة.",

  "footer.tagline":
    "بنية تحتية عالمية لتوافر الأدوية — البحث والإشارة والتحقق. لسنا صيدلية. لا وصف للأدوية ولا صرف لها ولا استشارات طبية.",
  "footer.status.monitoring": "مراقبة البنية التحتية نشطة",
  "footer.status.markets": "إطار عمل لأكثر من 47 سوقًا مخططًا",
  "footer.badge.privacy": "الخصوصية أولًا",
  "footer.badge.verified": "صيدليات موثّقة",
  "footer.badge.noStock": "لا يتم كشف المخزون",

  "footer.columns.platform": "المنصة",
  "footer.columns.pharmacies": "الصيدليات",
  "footer.columns.providers": "مقدمو الرعاية الصحية",
  "footer.columns.enterprise": "المؤسسات والتحليلات",
  "footer.columns.company": "الشركة",
  "footer.columns.legal": "الشؤون القانونية والثقة",

  "footer.platform.search": "البحث عن الأدوية",
  "footer.platform.createAccount": "إنشاء حساب",
  "footer.platform.savedSearches": "عمليات البحث المحفوظة",
  "footer.platform.alerts": "تنبيهات التوافر",
  "footer.platform.caregiver": "وصول مقدّمي الرعاية",
  "footer.platform.confidence": "درجة الثقة في التوافر",

  "footer.pharmacies.join": "الانضمام إلى الشبكة",
  "footer.pharmacies.portal": "بوابة الصيدلية",
  "footer.pharmacies.verification": "معايير التحقق",
  "footer.pharmacies.inventory": "رفع المخزون",
  "footer.pharmacies.confirmations": "طلبات التأكيد",
  "footer.pharmacies.support": "دعم الصيدليات",

  "footer.providers.overview": "نظرة عامة لمقدمي الرعاية",
  "footer.providers.patientSupport": "مسارات دعم المرضى",
  "footer.providers.careTeam": "وصول فريق الرعاية",
  "footer.providers.signals": "إشارات التوافر",
  "footer.providers.referral": "إرشادات الإحالة",
  "footer.providers.support": "دعم مقدمي الرعاية",

  "footer.enterprise.solutions": "حلول المؤسسات",
  "footer.enterprise.signal": "تحليلات ZoikoSignal™",
  "footer.enterprise.availApi": "واجهة ZoikoAvail™ البرمجية",
  "footer.enterprise.medibase": "بيانات MediBase™",
  "footer.enterprise.healthSystems": "الأنظمة الصحية",
  "footer.enterprise.government": "الجهات الحكومية والصحة العامة",

  "footer.company.about": "عن ZoikoMeds",
  "footer.company.healthcare": "Zoiko Healthcare",
  "footer.company.group": "Zoiko Group",
  "footer.company.careers": "الوظائف",
  "footer.company.press": "الأخبار الصحفية",
  "footer.company.contact": "اتصل بنا",

  "footer.legal.trustCenter": "مركز الثقة",
  "footer.legal.privacyCenter": "مركز الخصوصية",
  "footer.legal.terms": "شروط الاستخدام",
  "footer.legal.cookies": "إعدادات ملفات تعريف الارتباط",
  "footer.legal.medicalDisclaimer": "إخلاء المسؤولية الطبية",
  "footer.legal.controlledMedicine": "سياسة الأدوية الخاضعة للرقابة",
  "footer.legal.accessibility": "إمكانية الوصول",

  "footer.bottom.privacy": "الخصوصية",
  "footer.bottom.terms": "الشروط",
  "footer.bottom.cookies": "ملفات تعريف الارتباط",
  "footer.bottom.accessibility": "إمكانية الوصول",
  "footer.bottom.compliance": "الامتثال",

  "footer.hq.us": "المقر في الولايات المتحدة",
  "footer.hq.eu": "المقر في الاتحاد الأوروبي",
  "footer.operator":
    "© {year} ZoikoMeds | ZoikoMeds منصة خاضعة للحوكمة تُشغّلها Zoiko Healthcare Inc | وZoiko Healthcare Inc شركة تابعة لـ Zoiko Group Inc",
  "footer.copyright": "© {year} Zoiko Group Inc. جميع الحقوق محفوظة.",
  "footer.disclaimer.intro":
    "توفّر ZoikoMeds معلومات عن توافر الأدوية من الصيدليات الموثّقة المشاركة.",
  "footer.disclaimer.emphasis":
    "ZoikoMeds ليست صيدلية، ولا تصف الأدوية ولا تصرفها ولا تبيعها ولا توصّلها ولا توصي بها، ولا تقدّم استشارات طبية.",
  "footer.disclaimer.rest":
    "معلومات التوافر تستند إلى درجة ثقة وليست ضمانًا لوجود المخزون. تظل قواعد الوصفات الطبية وتقدير الصيدلي ومتطلبات التحقق وقوانين كل ولاية قضائية سارية دائمًا. في حالات الطوارئ الطبية، اتصل بخدمات الطوارئ المحلية فورًا.",
};
