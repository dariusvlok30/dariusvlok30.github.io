import { useEffect, useRef } from "react";

/**
 * Full-page red particle network — fixed behind all content.
 * Particles repel from cursor, lines connect nearby particles.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const mouse = { x: null, y: null, radius: 130 };

    class Particle {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x  = Math.random() * canvas.width;
        this.y  = initial ? Math.random() * canvas.height : -4;
        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;
        this.size = Math.random() * 1.2 + 0.4;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,38,38,0.55)";
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width  || this.x < 0) this.vx = -this.vx;
        if (this.y > canvas.height || this.y < 0) this.vy = -this.vy;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < mouse.radius) {
            const f = (mouse.radius - d) / mouse.radius;
            this.x -= (dx / d) * f * 3.5;
            this.y -= (dy / d) * f * 3.5;
          }
        }
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      // Cap at 90 particles regardless of screen size
      const n = Math.min(90, Math.floor((canvas.width * canvas.height) / 10000));
      for (let i = 0; i < n; i++) particles.push(new Particle());
    };

    const connect = () => {
      // Max link distance: 160px
      const MAX2 = 160 * 160;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX2) {
            const opacity = (1 - d2 / MAX2) * 0.35;
            ctx.strokeStyle = `rgba(220,38,38,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      connect();
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const onMouseMove = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseOut  = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize",    resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout",  onMouseOut);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout",  onMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
