import React, { Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene({ scene, className }) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={cn("w-full h-full", className)} />
    </Suspense>
  );
}
