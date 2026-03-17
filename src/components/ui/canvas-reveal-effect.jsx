import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const CanvasRevealEffect = ({
  animationSpeed = 3,
  containerClassName,
  colors = [[3, 70, 148]],
  dotSize = 2,
  opacities = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.5],
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const setup = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      startTimeRef.current = Date.now();

      const spacing = dotSize * 5;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      dotsRef.current = [];

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * spacing + spacing / 2,
            y: j * spacing + spacing / 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            targetOpacity: opacities[Math.floor(Math.random() * opacities.length)],
            delay: Math.random() * 2,
          });
        }
      }
    };

    setup();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      dotsRef.current.forEach((dot) => {
        const progress = Math.max(0, (elapsed - dot.delay) * animationSpeed * 0.3);
        const opacity = Math.min(dot.targetOpacity, progress);
        const [r, g, b] = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animationSpeed, colors, dotSize, opacities]);

  return (
    <div className={cn("h-full w-full", containerClassName)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
