"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  bg: string;
  color: string;
}

export interface MegaMenuStat { value: string; label: string; color: string; }
export interface MegaMenuMetric { label: string; value: string; color: string; }
export interface MegaMenuDonut { centerValue: string; centerValue2?: string; centerLabel?: string; segments: number[]; colors: string[]; legend?: string[]; }

export interface MegaMenuFeatured {
  stats: [MegaMenuStat, MegaMenuStat, MegaMenuStat, MegaMenuStat];
  chartCaption?: string;
  chartVariant?: "line" | "badges" | "bubbles" | "bars";
  badges?: { label: string; active: boolean }[];
  bubbles?: { label: string; color: string }[];
  bars?: { height: number; color: string }[];
  donut: MegaMenuDonut;
  metrics: [MegaMenuMetric, MegaMenuMetric, MegaMenuMetric];
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface MegaMenuBottomFeature { label: string; description: string; icon: ReactNode; bg: string; color: string; }

export interface MegaMenuConfig {
  leftLabel: string;
  items: MegaMenuItem[];
  featured: MegaMenuFeatured;
  bottomFeatures: MegaMenuBottomFeature[];
}

const CHART_X = [10, 58, 106, 154, 202, 250];

function DashboardGraphic({ featured }: { featured: MegaMenuFeatured }) {
  const { stats, chartCaption, chartVariant = "line", badges, bubbles, bars, donut, metrics } = featured;
  const points = CHART_X.map((x, i) => ({
    x, y: [46, 30, 16, 34, 12, 40][i], c: i % 2 === 0 ? donut.colors[0] : "#6aa8ff",
  }));
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const segmentEnds = donut.segments.reduce<number[]>((acc, seg) => {
    const prev = acc.length ? acc[acc.length - 1] : 0;
    return [...acc, prev + seg];
  }, []);
  const gradientStops = donut.segments.map((seg, i) => {
    const start = i === 0 ? 0 : segmentEnds[i - 1];
    return `${donut.colors[i]} ${start}% ${segmentEnds[i]}%`;
  }).join(", ");

  return (
    <div style={{ background: "linear-gradient(160deg, #10204f, #0b1638)", padding: "16px 16px 18px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "9px 11px" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 108px", gap: "8px", marginTop: "8px" }}>
        <div style={{ position: "relative", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "8px 12px", display: "flex", alignItems: "center" }}>
          {chartCaption && (
            <span style={{ position: "absolute", top: "6px", left: "50%", transform: "translateX(-50%)", fontSize: "8.5px", color: "rgba(255,255,255,0.4)" }}>
              {chartCaption}
            </span>
          )}
          {chartVariant === "bubbles" && bubbles ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              {bubbles.map((b, i) => (
                <div key={b.label} style={{
                  width: "58px", height: "58px", borderRadius: "50%",
                  background: b.color, opacity: 0.62,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginLeft: i === 0 ? 0 : "-16px", zIndex: i,
                  border: "1px solid rgba(255,255,255,0.25)",
                  textAlign: "center", padding: "4px",
                }}>
                  <span style={{ fontSize: "7.5px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{b.label}</span>
                </div>
              ))}
            </div>
          ) : chartVariant === "bars" && bars ? (
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-evenly", width: "100%", height: "48px", gap: "6px" }}>
              {bars.map((b, i) => (
                <div key={i} style={{ width: "16px", height: `${b.height}%`, borderRadius: "4px 4px 2px 2px", background: b.color }} />
              ))}
            </div>
          ) : chartVariant === "badges" && badges ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
              {badges.map((b, i) => (
                <div key={i} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {b.active && (
                    <span style={{ position: "absolute", top: "-12px", width: "6px", height: "6px", borderRadius: "50%", background: donut.colors[0] }} />
                  )}
                  <div style={{
                    minWidth: "40px", padding: "6px 10px", borderRadius: "8px", textAlign: "center",
                    fontSize: "10px", fontWeight: 700, color: "#fff",
                    background: b.active ? "rgba(96,168,255,0.35)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${b.active ? "rgba(96,168,255,0.5)" : "rgba(255,255,255,0.08)"}`,
                  }}>
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <svg width="100%" height="48" viewBox="0 0 260 56" preserveAspectRatio="none" style={{ overflow: "visible" }}>
              <path d={path} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
              {points.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="4" fill={p.c} />)}
            </svg>
          )}
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px" }}>
          {donut.legend && (
            <div style={{ display: "flex", gap: "6px" }}>
              {donut.legend.map((pct, i) => (
                <span key={pct} style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "8px", color: "rgba(255,255,255,0.6)" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: donut.colors[i], display: "inline-block" }} />
                  {pct}
                </span>
              ))}
            </div>
          )}
          <div style={{
            width: "46px", height: "46px", borderRadius: "50%",
            background: `conic-gradient(${gradientStops})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#0d1a3f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: donut.centerValue2 ? "7.5px" : "9.5px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{donut.centerValue}</span>
              {donut.centerValue2 && <span style={{ fontSize: "7.5px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{donut.centerValue2}</span>}
            </div>
          </div>
          {donut.centerLabel && <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.5)" }}>{donut.centerLabel}</span>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "8px" }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "8px 12px" }}>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)" }}>{m.label}</div>
            <div style={{ fontSize: "12.5px", fontWeight: 700, color: m.color, marginTop: "2px" }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const LABEL_BAR: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "10px",
  fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#98a2b3", margin: 0,
};
const LABEL_RULE: React.CSSProperties = { flex: 1, height: "1px", background: "#e4e7ee" };

export default function MegaMenu({
  config, visible, onEnter, onLeave,
}: {
  config: MegaMenuConfig; visible: boolean; onEnter: () => void; onLeave: () => void;
}) {
  const { leftLabel, items, featured, bottomFeatures } = config;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "absolute", top: "100%", left: "50%",
        transform: visible ? "translateX(-50%) translateY(0) scale(1)" : "translateX(-50%) translateY(-10px) scale(0.97)",
        width: "calc(100vw - 32px)", maxWidth: "1080px",
        marginTop: "14px", backgroundColor: "white",
        borderRadius: "24px", boxShadow: "0 24px 60px rgba(19,29,68,0.20)",
        border: "1px solid #eef1f6", overflow: "hidden", zIndex: 50,
        transition: "opacity 0.22s cubic-bezier(0.16,1,0.3,1), transform 0.32s cubic-bezier(0.16,1,0.3,1)",
        opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr" }}>
        {/* Left */}
        <div style={{ padding: "26px 28px 22px", backgroundColor: "#FFF", borderRight: "1px solid #ECEEF3" }}>
          <p style={LABEL_BAR}>
            {leftLabel}
            <span style={LABEL_RULE} />
          </p>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "50px" }}>
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <Link key={item.title} href={item.href}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: "12px", textDecoration: "none",
                    padding: "20px 0", borderBottom: isLast ? "none" : "1px solid #ECEEF3",
                    opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s ease ${i * 40}ms`,
                  }}
                >
                  <span style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: "36px", height: "36px", borderRadius: "10px", flexShrink: 0,
                    backgroundColor: item.bg, color: item.color,
                  }}>
                    {item.icon}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#1E2F6E" }}>{item.title}</span>
                    <span style={{ fontSize: "12px", color: "#8a93a3", lineHeight: 1.4 }}>{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Featured */}
        <div style={{ backgroundColor: "#F5F8FC", display: "flex", flexDirection: "column", paddingTop: "26px" }}>
          <p style={{ ...LABEL_BAR, padding: "0 28px" }}>
            FEATURED
            <span style={LABEL_RULE} />
          </p>
          <div style={{ marginTop: "14px" }}>
            <div style={{ padding: "0 28px" }}>
              <div style={{ borderRadius: "16px", overflow: "hidden" }}>
                <DashboardGraphic featured={featured} />
              </div>
            </div>
          </div>
          <div style={{ padding: "16px 28px 24px" }}>
            <p style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", color: "#00A99D", margin: 0 }}>
              {featured.eyebrow}
            </p>
            <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#1E2F6E", margin: "6px 0 0" }}>
              {featured.heading}
            </h4>
            <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5, margin: "8px 0 0" }}>
              {featured.description}
            </p>
            <Link href={featured.ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "13px", fontWeight: 700, color: "#00A99D", textDecoration: "none" }}>
              {featured.ctaLabel}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: "1px solid #ECEEF3", backgroundColor: "#ffffff", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {bottomFeatures.map((f, i) => (
          <div key={f.label} style={{
            display: "flex", alignItems: "flex-start", gap: "10px", padding: "16px 22px",
            borderRight: i === bottomFeatures.length - 1 ? "none" : "1px solid #ECEEF3",
          }}>
            <span style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "32px", height: "32px", borderRadius: "9px", flexShrink: 0,
              backgroundColor: f.bg, color: f.color,
            }}>
              {f.icon}
            </span>
            <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#1E2F6E" }}>{f.label}</span>
              <span style={{ fontSize: "11.5px", color: "#9ca3af", lineHeight: 1.4 }}>{f.description}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
