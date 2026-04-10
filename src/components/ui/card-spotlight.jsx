import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Holographic card — 3D tilt + radial red glow.
 * Tilt is normalized to card size: small cards tilt more, large cards tilt less.
 */
export const CardSpotlight = ({ children, className, ...props }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize -1 to 1 across the card, then scale to max degrees
    const nx = (x - rect.width  / 2) / (rect.width  / 2);
    const ny = (y - rect.height / 2) / (rect.height / 2);

    // Larger cards get less tilt: max 3° for wide cards, 7° for compact cards
    const maxTilt = rect.width > 500 ? 3 : rect.width > 350 ? 5 : 7;

    const rotX =  ny * maxTilt;
    const rotY = -nx * maxTilt;

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
      <div className="holo-glow" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
