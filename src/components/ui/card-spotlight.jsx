import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Holographic card — 3D tilt + radial red glow that follows the cursor.
 * No heavy canvas per-card; pure CSS transforms + custom properties.
 */
export const CardSpotlight = ({ children, className, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = e => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX =  (y - cy) / 14;
    const rotY = -(x - cx) / 14;

    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  };

  return (
    <div
      ref={cardRef}
      className={cn("group/holo relative rounded-2xl transition-transform duration-150 ease-out", className)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        "--glow-x": "50%",
        "--glow-y": "50%",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Radial red glow at cursor */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover/holo:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(220,38,38,0.13), transparent 65%)",
        }}
      />

      {/* Corner decorators */}
      <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-red-600/30 pointer-events-none z-20" />
      <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-red-600/30 pointer-events-none z-20" />
      <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-red-600/30 pointer-events-none z-20" />
      <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-red-600/30 pointer-events-none z-20" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
