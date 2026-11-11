import type { MessageCatalog } from "./en";

/**
 * Chinese (Simplified Han, zh-Hans). DRAFT — needs review by a native speaker,
 * and the legal and medical wording needs counsel/pharmacist sign-off, before
 * `zh-hans` may be marked available in ../locales.ts.
 *
 * Deliberately NOT called plain `zh`: this catalog is Simplified Chinese, the
 * written form used in mainland China. Taiwan and Hong Kong read Traditional
 * (zh-Hant), which is a different catalog and a separate translation job — so
 * TW is not mapped to this one (see ../country-language.ts). Serving Simplified
 * to a Traditional reader would be passing off one writing system as another.
 */
export const zhHans: MessageCatalog = {
  "language.detected": "我们检测到您所在的地区",
  "language.question": "您要切换语言吗？",
  "language.stay": "继续使用{language}",
  "language.switch": "切换到{language}",

  "notFound.eyebrow": "页面未找到",
  "notFound.title": "该药房页面不存在。",
  "notFound.description":
    "您要访问的页面可能已移动或删除，也可能是网址有误。我们帮您回到正轨。",
  "notFound.backHome": "返回首页",
  "notFound.verification": "药房验证",
  "notFound.links.inventoryUpload": "库存上传",
  "notFound.links.pharmacyPortal": "药房门户",
  "notFound.links.support": "支持",
  "notFound.copyright": "© {year} ZoikoMeds。保留所有权利。",

  "footer.tagline":
    "全球药品可获得性基础设施——查询、信号、验证。我们不是药房。不提供处方、调剂或医疗建议。",
  "footer.status.monitoring": "基础设施监控运行中",
  "footer.status.markets": "47+ 个规划市场框架",
  "footer.badge.privacy": "隐私优先",
  "footer.badge.verified": "已验证药房",
  "footer.badge.noStock": "不公开库存数量",

  "footer.columns.platform": "平台",
  "footer.columns.pharmacies": "药房",
  "footer.columns.providers": "医疗服务提供者",
  "footer.columns.enterprise": "企业与智能分析",
  "footer.columns.company": "公司",
  "footer.columns.legal": "法律与信任",

  "footer.platform.search": "查询药品",
  "footer.platform.createAccount": "创建账户",
  "footer.platform.savedSearches": "已保存的搜索",
  "footer.platform.alerts": "库存提醒",
  "footer.platform.caregiver": "照护者访问",
  "footer.platform.confidence": "可获得性置信度",

  "footer.pharmacies.join": "加入网络",
  "footer.pharmacies.portal": "药房门户",
  "footer.pharmacies.verification": "验证标准",
  "footer.pharmacies.inventory": "库存上传",
  "footer.pharmacies.confirmations": "确认请求",
  "footer.pharmacies.support": "药房支持",

  "footer.providers.overview": "服务提供者概览",
  "footer.providers.patientSupport": "患者支持流程",
  "footer.providers.careTeam": "医护团队访问",
  "footer.providers.signals": "可获得性信号",
  "footer.providers.referral": "转诊指南",
  "footer.providers.support": "服务提供者支持",

  "footer.enterprise.solutions": "企业解决方案",
  "footer.enterprise.signal": "ZoikoSignal™ 智能分析",
  "footer.enterprise.availApi": "ZoikoAvail™ API",
  "footer.enterprise.medibase": "MediBase™ 数据",
  "footer.enterprise.healthSystems": "医疗系统",
  "footer.enterprise.government": "政府与公共卫生",

  "footer.company.about": "关于 ZoikoMeds",
  "footer.company.healthcare": "Zoiko Healthcare",
  "footer.company.group": "Zoiko Group",
  "footer.company.careers": "招聘",
  "footer.company.press": "媒体报道",
  "footer.company.contact": "联系我们",

  "footer.legal.trustCenter": "信任中心",
  "footer.legal.privacyCenter": "隐私中心",
  "footer.legal.terms": "使用条款",
  "footer.legal.cookies": "Cookie 设置",
  "footer.legal.medicalDisclaimer": "医疗免责声明",
  "footer.legal.controlledMedicine": "管制药品政策",
  "footer.legal.accessibility": "无障碍访问",

  "footer.bottom.privacy": "隐私",
  "footer.bottom.terms": "条款",
  "footer.bottom.cookies": "Cookie",
  "footer.bottom.accessibility": "无障碍访问",
  "footer.bottom.compliance": "合规",

  "footer.hq.us": "美国总部",
  "footer.hq.eu": "欧盟总部",
  "footer.operator":
    "© {year} ZoikoMeds | ZoikoMeds 是由 Zoiko Healthcare Inc 运营的受治理平台 | Zoiko Healthcare Inc 是 Zoiko Group Inc 的子公司",
  "footer.copyright": "© {year} Zoiko Group Inc。保留所有权利。",
  "footer.disclaimer.intro":
    "ZoikoMeds 提供来自参与本网络的已验证药房的药品可获得性信息。",
  "footer.disclaimer.emphasis":
    "ZoikoMeds 不是药房，不开具处方、不调剂、不销售、不配送、不推荐药品，也不提供医疗建议。",
  "footer.disclaimer.rest":
    "可获得性信息基于置信度，并不保证有货。处方规定、药师的专业判断、验证要求以及各司法辖区的法律始终适用。如遇医疗紧急情况，请立即联系当地急救服务。",
};
