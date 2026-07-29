"use client";

import { ZoiProvider } from "./ZoiProvider";
import ZoiLauncher from "./ZoiLauncher";
import ZoiPanel from "./ZoiPanel";

export default function Zoi() {
  return (
    <ZoiProvider>
      <ZoiPanel />
      <ZoiLauncher />
    </ZoiProvider>
  );
}
