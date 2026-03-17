import { useMotionValue, useMotionTemplate, motion } from "motion/react";
import React, { useState } from "react";
import { CanvasRevealEffect } from "./canvas-reveal-effect";
import { cn } from "@/lib/utils";

// Chelsea blue particle colors
const CHELSEA_COLORS = [
  [3, 70, 148],   // #034694
  [26, 92, 176],  // #1a5cb0
  [10, 64, 128],  // mid-blue
];

export const CardSpotlight = ({
  children,
  radius = 320,
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
        "group/spotlight relative border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Chelsea blue spotlight reveal */}
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{ maskImage, WebkitMaskImage: maskImage, backgroundColor: "#020d1f" }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={4}
            containerClassName="absolute inset-0"
            colors={CHELSEA_COLORS}
            dotSize={2.5}
          />
        )}
      </motion.div>

      {/* Chelsea blue corner decorators */}
      <span className="absolute -left-px -top-px block size-2.5 border-l-2 border-t-2 border-[#034694] z-20 pointer-events-none" />
      <span className="absolute -right-px -top-px block size-2.5 border-r-2 border-t-2 border-[#034694] z-20 pointer-events-none" />
      <span className="absolute -bottom-px -left-px block size-2.5 border-b-2 border-l-2 border-[#034694] z-20 pointer-events-none" />
      <span className="absolute -bottom-px -right-px block size-2.5 border-b-2 border-r-2 border-[#034694] z-20 pointer-events-none" />

      {/* Content always on top */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
