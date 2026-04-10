import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Chelsea blue moving border gradient
const movingMap = {
  TOP:    "radial-gradient(20.7% 50% at 50% 0%,   #1a5cb0 0%, rgba(3,70,148,0) 100%)",
  LEFT:   "radial-gradient(16.6% 43.1% at 0% 50%, #1a5cb0 0%, rgba(3,70,148,0) 100%)",
  BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #1a5cb0 0%, rgba(3,70,148,0) 100%)",
  RIGHT:  "radial-gradient(16.2% 41.2% at 100% 50%, #1a5cb0 0%, rgba(3,70,148,0) 100%)",
};

const highlight =
  "radial-gradient(75% 181% at 50% 50%, #034694 0%, rgba(3,70,148,0) 100%)";

const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (cur) => {
    const idx = directions.indexOf(cur);
    const next = clockwise
      ? (idx - 1 + directions.length) % directions.length
      : (idx + 1) % directions.length;
    return directions[next];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prev) => rotateDirection(prev));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-[inherit] content-center bg-transparent transition duration-500 items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px w-fit",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("w-auto z-10 rounded-[inherit]", className)}>
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{ filter: "blur(2px)", position: "absolute", width: "100%", height: "100%" }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute z-1 flex-none inset-[2px] rounded-[inherit] bg-white" />
    </Tag>
  );
}
