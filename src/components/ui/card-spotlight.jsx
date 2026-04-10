import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Holographic card — 3D perspective tilt + radial red glow that follows cursor.
 * Uses CSS classes defined in index.css (.holo-card, .holo-glow).
 */
export const CardSpotlight = ({ children, className, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;

    const rotX =  (y - cy) / 10;
    const rotY = -(x - cx) / 10;

    card.style.setProperty("--bg-x", `${(x / rect.width)  * 100}%`);
    card.style.setProperty("--bg-y", `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.setProperty("--bg-x", "50%");
    card.style.setProperty("--bg-y", "50%");
  };

  return (
    <div
      ref={cardRef}
      className={cn("holo-card", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Holographic glow layer */}
      <div className="holo-glow" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
