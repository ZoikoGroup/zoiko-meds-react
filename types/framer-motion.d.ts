/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "framer-motion" {
  import * as React from "react";

  export const motion: any;
  export const AnimatePresence: React.ComponentType<any>;
  export const useInView: (ref: any, options?: any) => boolean;
  export const useAnimation: () => any;
  export const useScroll: (options?: any) => any;
  export const useTransform: (...args: any[]) => any;
}

