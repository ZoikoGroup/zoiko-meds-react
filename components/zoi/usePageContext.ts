"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { ZoiPageContext } from "./types";
import { useZoi } from "./ZoiProvider";
import { PAGE_CONFIGS } from "./types";

function resolvePageContext(path: string): ZoiPageContext {
  const p = path.toLowerCase();
  if (p === "/" || p.startsWith("/platform")) return "platform";
  if (p.startsWith("/patient") || p.startsWith("/searchmed") || p.startsWith("/prescriptions")) return "patients";
  if (p.startsWith("/pharmacy") || p.startsWith("/join-the-network") || p.startsWith("/inventory")) return "pharmacies";
  if (p.startsWith("/enterprise") || p.startsWith("/hospital") || p.startsWith("/clinic")) return "enterprise";
  if (p.startsWith("/wholesale")) return "wholesale";
  if (p.startsWith("/sign-in") || p.startsWith("/login") || p.startsWith("/create-account") || p.startsWith("/auth")) return "login";
  return "default";
}

export function usePageContext() {
  const { state, dispatch } = useZoi();
  const pathname = usePathname();

  useEffect(() => {
    const context = resolvePageContext(pathname ?? "/");
    dispatch({ type: "SET_PAGE_CONTEXT", context });
  }, [pathname, dispatch]);

  const config = PAGE_CONFIGS[state.pageContext] ?? PAGE_CONFIGS.default;

  return {
    context: state.pageContext,
    config,
    label: config.label,
    skipPersonaRouting: config.skipPersonaRouting,
    defaultPersona: config.persona ?? null,
  };
}
