import { useEffect, useRef } from "react";

/**
 * AetherFlow particle network — adapted from the original component.
 * Red particles + connecting lines, mouse repulsion, fixed behind all content.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 160 };

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width  || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const forceX = dx / distance;
            const forceY = dy / distance;
            const force  = (mouse.radius - distance) / mouse.radius;
            this.x -= forceX * force * 4;
            this.y -= forceY * force * 4;
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particles = [];
      // Cap at 100 to stay performant across screen sizes
      const count = Math.min(100, Math.floor((canvas.height * canvas.width) / 9000));
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * (canvas.width  - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        // Red instead of purple
        const color = "rgba(34, 197, 94, 0.65)";
        particles.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connect() {
      const threshold = (canvas.width / 7) * (canvas.height / 7);
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance =
            (particles[a].x - particles[b].x) ** 2 +
            (particles[a].y - particles[b].y) ** 2;

          if (distance < threshold) {
            const opacity = 1 - distance / 20000;

            if (mouse.x !== null) {
              const dxA = particles[a].x - mouse.x;
              const dyA = particles[a].y - mouse.y;
              const distA = Math.sqrt(dxA * dxA + dyA * dyA);
              if (distA < mouse.radius) {
                // Near cursor: brighter red lines
                ctx.strokeStyle = `rgba(74, 222, 128, ${opacity})`;
              } else {
                ctx.strokeStyle = `rgba(22, 163, 74, ${opacity * 0.5})`;
              }
            } else {
              ctx.strokeStyle = `rgba(22, 163, 74, ${opacity * 0.5})`;
            }

            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      // Transparent clear so our CSS bg shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      connect();
    }

    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseOut  = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize",    resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout",  handleMouseOut);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize",    resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout",  handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
