import { useMotionValue, useMotionTemplate, motion } from "motion/react";
import React, { useState } from "react";
import { CanvasRevealEffect } from "./canvas-reveal-effect";
import { cn } from "@/lib/utils";

const CHELSEA_COLORS = [
  [3, 70, 148],
  [26, 92, 176],
  [10, 64, 128],
];

export const CardSpotlight = ({
  children,
  radius = 350,
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const maskImage = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`;

  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group/spotlight relative border border-white/[0.08] bg-[#080c14]/80 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#034694]/30",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Subtle spotlight glow on hover */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100"
        style={{ maskImage, WebkitMaskImage: maskImage, backgroundColor: "rgba(3, 70, 148, 0.06)" }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="absolute inset-0"
            colors={CHELSEA_COLORS}
            dotSize={1.5}
          />
        )}
      </motion.div>

      {/* Corner decorators */}
      <span className="absolute -left-px -top-px block size-2 border-l-2 border-t-2 border-[#034694]/50 z-20 pointer-events-none" />
      <span className="absolute -right-px -top-px block size-2 border-r-2 border-t-2 border-[#034694]/50 z-20 pointer-events-none" />
      <span className="absolute -bottom-px -left-px block size-2 border-b-2 border-l-2 border-[#034694]/50 z-20 pointer-events-none" />
      <span className="absolute -bottom-px -right-px block size-2 border-b-2 border-r-2 border-[#034694]/50 z-20 pointer-events-none" />

      {/* Content always fully readable */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
