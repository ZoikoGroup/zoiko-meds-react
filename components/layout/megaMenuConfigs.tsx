import {
  LayoutGrid, Star, ShieldCheck, Code2, Link2, Lock, BarChart3,
  User, FileText, Calendar, Search, Bell, Heart, Users, CheckCircle2, Activity,
  Home, Globe, Radar, Navigation,
} from "lucide-react";
import type { MegaMenuConfig } from "./MegaMenu";

export const platformMegaMenuConfig: MegaMenuConfig = {
  leftLabel: "EXPLORE THE PLATFORM",
  items: [
    { title: "Platform Overview", description: "See the complete ZoikoMeds platform.", href: "/overview/", icon: <LayoutGrid size={18} />, bg: "#E3F6EF", color: "#0FA980" },
    { title: "Features", description: "Explore medicine availability and participation capabilities.", href: "/features", icon: <Star size={18} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { title: "Security & Trust", description: "Review privacy, governance, and enterprise security.", href: "/security/", icon: <ShieldCheck size={18} />, bg: "#FDF1DF", color: "#E0A030" },
    { title: "Integrations & APIs", description: "Connect ZoikoMeds with healthcare and pharmacy systems.", href: "/integrations/", icon: <Code2 size={18} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
  featured: {
    stats: [
      { value: "12,458", label: "Active Pharmacies", color: "#3ddbc0" },
      { value: "98.6%", label: "Availability Signals", color: "#6aa8ff" },
      { value: "1,243", label: "Verification Tasks", color: "#ffffff" },
      { value: "230", label: "Access Requests", color: "#ffffff" },
    ],
    donut: { centerValue: "72%", centerLabel: "Available", segments: [72, 18, 10], colors: ["#3ddbc0", "#f7b955", "#f4667a"], legend: ["72%", "18%", "10%"] },
    metrics: [
      { label: "Participation", value: "High", color: "#3ddbc0" },
      { label: "Verification", value: "98.6%", color: "#3ddbc0" },
      { label: "Response Time", value: "2.4h", color: "#ffffff" },
    ],
    eyebrow: "MEDICINE AVAILABILITY INTELLIGENCE",
    heading: "Medicine Availability Intelligence",
    description: "Secure availability signals, pharmacy participation, operational visibility, and governed access — all in one intelligent platform.",
    ctaLabel: "Explore the Platform",
    ctaHref: "/overview/",
  },
  bottomFeatures: [
    { label: "Enterprise-Grade Security", description: "Built for compliance and trust.", icon: <ShieldCheck size={16} />, bg: "#FDF1DF", color: "#E0A030" },
    { label: "Unified Integrations", description: "Connect everything securely.", icon: <Link2 size={16} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { label: "Privacy by Design", description: "Your data. Your control.", icon: <Lock size={16} />, bg: "#E3F6EF", color: "#0FA980" },
    { label: "Actionable Intelligence", description: "Insights that drive outcomes.", icon: <BarChart3 size={16} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
};

export const patientsMegaMenuConfig: MegaMenuConfig = {
  leftLabel: "FOR PATIENTS & CAREGIVERS",
  items: [
    { title: "Patient Portal", description: "Access your health records and account.", href: "/patient-portal/", icon: <User size={18} />, bg: "#E3F6EF", color: "#0FA980" },
    { title: "Prescriptions", description: "Manage and track your medications.", href: "/prescriptions/", icon: <FileText size={18} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { title: "Appointments", description: "Schedule and track healthcare visits.", href: "/appointments/", icon: <Calendar size={18} />, bg: "#FDF1DF", color: "#E0A030" },
    { title: "Medicine Search", description: "Find verified pharmacy availability near you.", href: "/searchmed/", icon: <Search size={18} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
  featured: {
    stats: [
      { value: "2.4M+", label: "Patient Searches", color: "#3ddbc0" },
      { value: "94%", label: "Search Success Rate", color: "#6aa8ff" },
      { value: "Anonymous", label: "Search Always Available", color: "#ffffff" },
      { value: "47+", label: "Markets Planned", color: "#3ddbc0" },
    ],
    chartCaption: "Nearby pharmacies",
    donut: { centerValue: "94%", centerLabel: "Found", segments: [94, 4, 2], colors: ["#3ddbc0", "#2fbfa8", "#1f8f7f"] },
    metrics: [
      { label: "Privacy", value: "Protected", color: "#3ddbc0" },
      { label: "Account", value: "Optional", color: "#6aa8ff" },
      { label: "Stock Shown", value: "Never exact", color: "#ffffff" },
    ],
    eyebrow: "MEDICINE ACCESS FOR PATIENTS",
    heading: "Find medicines near you — privately.",
    description: "Search verified pharmacy availability, save important medicines, and monitor updates — no account required.",
    ctaLabel: "Explore Patient Features",
    ctaHref: "/patient/",
  },
  bottomFeatures: [
    { label: "Anonymous Search", description: "No account required.", icon: <Lock size={16} />, bg: "#E3F6EF", color: "#0FA980" },
    { label: "Availability Alerts", description: "Get notified when found.", icon: <Bell size={16} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { label: "Save Medicines", description: "Track important items.", icon: <Heart size={16} />, bg: "#E3F6EF", color: "#0FA980" },
    { label: "Caregiver Mode", description: "Manage family medicines.", icon: <Users size={16} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
};

export const pharmaciesMegaMenuConfig: MegaMenuConfig = {
  leftLabel: "FOR VERIFIED PHARMACIES",
  items: [
    { title: "Join the Network", description: "Verified pharmacy onboarding & claim.", href: "/join-the-network/", icon: <CheckCircle2 size={18} />, bg: "#E3F6EF", color: "#0FA980" },
    { title: "Pharmacy Portal", description: "Dashboard, requests & inventory signals.", href: "/pharmacy-portal/", icon: <LayoutGrid size={18} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { title: "Inventory Data Options", description: "PMS/API, SFTP/CSV, or manual upload.", href: "/inventory-upload/", icon: <Code2 size={18} />, bg: "#FDF1DF", color: "#E0A030" },
    { title: "Verification & Compliance", description: "Credential and license standards.", href: "/verification/", icon: <ShieldCheck size={18} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
  featured: {
    stats: [
      { value: "12,458", label: "Verified Pharmacies", color: "#3ddbc0" },
      { value: "98.6%", label: "Verification Rate", color: "#6aa8ff" },
      { value: "Zero", label: "Exact Qty Exposed", color: "#ffffff" },
      { value: "Free", label: "Network Core Tier", color: "#3ddbc0" },
    ],
    chartVariant: "badges",
    badges: [
      { label: "Rx", active: true },
      { label: "Rx", active: false },
      { label: "Rx", active: true },
      { label: "Rx", active: false },
    ],
    donut: { centerValue: "98%", centerLabel: "Verified", segments: [98, 2], colors: ["#3ddbc0", "#1f8f7f"] },
    metrics: [
      { label: "Integration", value: "PMS/API", color: "#3ddbc0" },
      { label: "Confidence", value: "ZoikoAvail™", color: "#3ddbc0" },
      { label: "Visibility", value: "Pharmacist-led", color: "#ffffff" },
    ],
    eyebrow: "VERIFIED PHARMACY NETWORK",
    heading: "Join. Connect. Reduce call burden.",
    description: "Claim your pharmacy, connect inventory signals, and route high-intent patients to your counter without exposing exact stock.",
    ctaLabel: "Explore Pharmacy Features",
    ctaHref: "/pharmacy/",
  },
  bottomFeatures: [
    { label: "Free to Join", description: "Network Core is free.", icon: <CheckCircle2 size={16} />, bg: "#E3F6EF", color: "#0FA980" },
    { label: "Live Inventory Sync", description: "PMS, SFTP, or manual.", icon: <Activity size={16} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { label: "Governed Compliance", description: "Audit trail, always on.", icon: <ShieldCheck size={16} />, bg: "#FDF1DF", color: "#E0A030" },
    { label: "Demand Intelligence", description: "See what's being searched.", icon: <BarChart3 size={16} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
};

export const enterpriseMegaMenuConfig: MegaMenuConfig = {
  leftLabel: "ENTERPRISE & INSTITUTIONAL",
  items: [
    { title: "Hospital Systems", description: "Large-scale enterprise deployments.", href: "/hospital-systems/", icon: <Home size={18} />, bg: "#E3F6EF", color: "#0FA980" },
    { title: "Clinic Networks", description: "Multi-location management & visibility.", href: "/clinic-networks/", icon: <Users size={18} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { title: "API Access", description: "Custom integrations & headless APIs.", href: "/api-access/", icon: <Code2 size={18} />, bg: "#FDF1DF", color: "#E0A030" },
    { title: "Government & Public Health", description: "Shortage intelligence & public dashboards.", href: "/government-public-health/", icon: <Globe size={18} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
  featured: {
    stats: [
      { value: "47+", label: "Global Markets", color: "#3ddbc0" },
      { value: "HIPAA", label: "Aware Architecture", color: "#6aa8ff" },
      { value: "GDPR", label: "Compliant Design", color: "#ffffff" },
      { value: "SOC2", label: "Aligned Controls", color: "#3ddbc0" },
    ],
    chartVariant: "bubbles",
    bubbles: [
      { label: "Hospitals", color: "#8B5CF6" },
      { label: "Clinics", color: "#0FA980" },
      { label: "Gov / NHS", color: "#3B6EF6" },
    ],
    donut: {
      centerValue: "47+", centerLabel: "Markets",
      segments: [20, 15, 20, 15, 15, 15],
      colors: ["#8B5CF6", "#3ddbc0", "#3B6EF6", "#f7b955", "#f4667a", "#6aa8ff"],
    },
    metrics: [
      { label: "Deployment", value: "Cloud + On-prem", color: "#3ddbc0" },
      { label: "SLA", value: "Enterprise", color: "#6aa8ff" },
      { label: "Data Residency", value: "Configurable", color: "#ffffff" },
    ],
    eyebrow: "ENTERPRISE INTELLIGENCE INFRASTRUCTURE",
    heading: "Infrastructure-grade access at scale.",
    description: "HIPAA-aware, GDPR-aware, SOC2-aligned. Designed for healthcare procurement across hospital systems, governments, and global health networks.",
    ctaLabel: "Request Enterprise Briefing",
    ctaHref: "/request-a-briefing/",
  },
  bottomFeatures: [
    { label: "Hospital Systems", description: "Large-scale deployments.", icon: <Home size={16} />, bg: "#E3F6EF", color: "#0FA980" },
    { label: "Clinic Networks", description: "Multi-location management.", icon: <Users size={16} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { label: "API & Headless", description: "Custom integrations.", icon: <Code2 size={16} />, bg: "#F1EBFF", color: "#8B5CF6" },
    { label: "Compliance-Ready", description: "HIPAA · GDPR · SOC2.", icon: <ShieldCheck size={16} />, bg: "#FDF1DF", color: "#E0A030" },
  ],
};

export const intelligenceMegaMenuConfig: MegaMenuConfig = {
  leftLabel: "DATA & INTELLIGENCE PRODUCTS",
  items: [
    { title: "Analytics", description: "Data-driven availability insights.", href: "/analytics/", icon: <BarChart3 size={18} />, bg: "#E3F6EF", color: "#0FA980" },
    { title: "AI Insights", description: "Predictive health intelligence & signals.", href: "/ai-insights/", icon: <Radar size={18} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { title: "Reports", description: "Compliance & performance reporting.", href: "/reports", icon: <FileText size={18} />, bg: "#FDF1DF", color: "#E0A030" },
    { title: "ZoikoSignal™", description: "Shortage intelligence for enterprise use.", href: "/zoikosignal-intelligence/", icon: <Navigation size={18} />, bg: "#F1EBFF", color: "#8B5CF6" },
  ],
  featured: {
    stats: [
      { value: "ZoikoSignal™", label: "Shortage Intelligence Engine", color: "#3ddbc0" },
      { value: "MediBase™", label: "Identity Normalisation", color: "#6aa8ff" },
      { value: "ZoikoAvail™", label: "Confidence Engine", color: "#ffffff" },
      { value: "Anon.", label: "Aggregated Signals Only", color: "#3ddbc0" },
    ],
    chartVariant: "bars",
    bars: [
      { height: 45, color: "#3ddbc0" },
      { height: 58, color: "#3ddbc0" },
      { height: 68, color: "#0FA980" },
      { height: 78, color: "#8B5CF6" },
      { height: 92, color: "#8B5CF6" },
      { height: 62, color: "#8B5CF6" },
      { height: 50, color: "#6aa8ff" },
    ],
    donut: {
      centerValue: "Signal", centerValue2: "Intelligence",
      segments: [16, 16, 17, 17, 17, 17],
      colors: ["#3B6EF6", "#8B5CF6", "#3B6EF6", "#8B5CF6", "#3B6EF6", "#8B5CF6"],
    },
    metrics: [
      { label: "Shortage Signals", value: "Real-time", color: "#3ddbc0" },
      { label: "Aggregation", value: "Anonymised", color: "#6aa8ff" },
      { label: "Access", value: "Governed API", color: "#ffffff" },
    ],
    eyebrow: "ZOIKOSIGNAL™ SHORTAGE INTELLIGENCE",
    heading: "Turn availability signals into action.",
    description: "Aggregated, anonymised shortage intelligence, demand pressure, and restock patterns — for governments, pharma, and health systems.",
    ctaLabel: "Explore Intelligence Products",
    ctaHref: "/intelligence/",
  },
  bottomFeatures: [
    { label: "ZoikoSignal™", description: "Shortage intelligence engine.", icon: <Navigation size={16} />, bg: "#F1EBFF", color: "#8B5CF6" },
    { label: "Analytics", description: "Data-driven insights.", icon: <BarChart3 size={16} />, bg: "#E3F6EF", color: "#0FA980" },
    { label: "AI Insights", description: "Predictive intelligence.", icon: <Radar size={16} />, bg: "#EAF0FF", color: "#3B6EF6" },
    { label: "Reports", description: "Compliance & performance.", icon: <FileText size={16} />, bg: "#FDF1DF", color: "#E0A030" },
  ],
};
