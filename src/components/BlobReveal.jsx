import { useEffect, useRef, useCallback } from "react";

/**
 * BlobReveal — Lando Norris-style spotlight reveal.
 * A large, smooth circular spotlight follows the cursor and reveals
 * the F1 suit beneath the face portrait.
 * - Smooth lerp position tracking
 * - Soft feathered edge
 * - Instant fade in / fast fade out on cursor leave
 */
export default function BlobReveal({
  baseImageUrl,
  revealImageUrl,
  spotRadius  = 0.22,   // fraction of shorter dimension — large spotlight
  lerpSpeed   = 0.12,   // how snappily spotlight follows cursor (0=no follow, 1=instant)
  fadeInSpeed = 8.0,    // alpha ramp-up speed
  fadeOutSpeed= 5.0,    // alpha ramp-down speed on leave
  style       = {},
}) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({
    targetX: 0.5, targetY: 0.35,
    lerpX:   0.5, lerpY:   0.35,
    alpha:   0,
    active:  false,
    time:    0,
  });

  const loadImage = src =>
    new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload  = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let running = true;

    // Pre-allocate offscreen canvas (reused every frame — no per-frame allocation)
    const offscreen = document.createElement("canvas");
    const offCtx    = offscreen.getContext("2d");

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas.parentElement || canvas;
      canvas.width  = offscreen.width  = w;
      canvas.height = offscreen.height = h;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    // ── Cover-fit helper ─────────────────────────────────────────────────────
    function drawCover(c, img, W, H) {
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const sw = img.naturalWidth  * scale;
      const sh = img.naturalHeight * scale;
      c.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);
    }

    // ── Main loop ────────────────────────────────────────────────────────────
    let baseImg, revealImg, lastTs = 0;

    const draw = ts => {
      if (!running) return;
      rafRef.current = requestAnimationFrame(draw);

      const dt = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      const st = stateRef.current;
      st.time += dt;

      const { width: W, height: H } = canvas;
      if (!W || !H || !baseImg) return;

      // Lerp spotlight position toward cursor
      const t = Math.min(1, lerpSpeed * 60 * dt);
      st.lerpX += (st.targetX - st.lerpX) * t;
      st.lerpY += (st.targetY - st.lerpY) * t;

      // Fade alpha in/out
      if (st.active) {
        st.alpha = Math.min(1, st.alpha + fadeInSpeed  * dt);
      } else {
        st.alpha = Math.max(0, st.alpha - fadeOutSpeed * dt);
      }

      // ── Draw base portrait ────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);
      drawCover(ctx, baseImg, W, H);

      // ── Draw spotlight reveal ─────────────────────────────────────────────
      if (st.alpha > 0.005 && revealImg) {
        const lx = st.lerpX * W;
        const ly = st.lerpY * H;
        const R  = Math.min(W, H) * spotRadius;

        // Draw F1 suit to offscreen
        offCtx.clearRect(0, 0, W, H);
        drawCover(offCtx, revealImg, W, H);

        // Soft circular mask via radial gradient (destination-in)
        offCtx.globalCompositeOperation = "destination-in";
        const inner = R * 0.55; // hard centre
        const grad  = offCtx.createRadialGradient(lx, ly, inner, lx, ly, R);
        grad.addColorStop(0, `rgba(255,255,255,${st.alpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        offCtx.fillStyle = grad;
        offCtx.fillRect(0, 0, W, H);
        offCtx.globalCompositeOperation = "source-over";

        // Composite onto main canvas
        ctx.drawImage(offscreen, 0, 0);
      }
    };

    Promise.all([loadImage(baseImageUrl), loadImage(revealImageUrl)])
      .then(([b, r]) => {
        baseImg   = b;
        revealImg = r;
        rafRef.current = requestAnimationFrame(draw);
      })
      .catch(() => { rafRef.current = requestAnimationFrame(draw); });

    return () => {
      running = false;
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [baseImageUrl, revealImageUrl, spotRadius, lerpSpeed, fadeInSpeed, fadeOutSpeed]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const onMouseMove = useCallback(e => {
    const r = e.currentTarget.getBoundingClientRect();
    const st = stateRef.current;
    st.targetX = (e.clientX - r.left)  / r.width;
    st.targetY = (e.clientY - r.top)   / r.height;
    st.active  = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  const onTouchMove = useCallback(e => {
    e.preventDefault();
    const t = e.touches[0];
    const r = e.currentTarget.getBoundingClientRect();
    const st = stateRef.current;
    st.targetX = (t.clientX - r.left) / r.width;
    st.targetY = (t.clientY - r.top)  / r.height;
    st.active  = true;
  }, []);

  const onTouchEnd = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100%", height: "100%", cursor: "crosshair", ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    />
  );
}
