import { useEffect, useRef, useCallback } from "react";

/**
 * BlobReveal
 * - Hover over the portrait → small organic blob reveals the helmet underneath
 * - Move cursor away → reveal fades out quickly
 * - No auto-drift, no intro — pure intentional interaction
 */
export default function BlobReveal({
  baseImageUrl,
  revealImageUrl,
  blobRadius = 0.076,
  fadeSpeed  = 4.5,
  style      = {},
}) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({
    mouse:    { x: -1, y: -1 },
    active:   false,
    maskData: null,
    time:     0,
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

    const maskCanvas = document.createElement("canvas");
    const maskCtx    = maskCanvas.getContext("2d");

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas.parentElement || canvas;
      canvas.width  = maskCanvas.width  = w;
      canvas.height = maskCanvas.height = h;
      stateRef.current.maskData = new Float32Array(w * h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    // ── Organic noise for cursor blob shape ──────────────────────────────────
    const noise = (theta, t) =>
      1
      + Math.sin(theta * 3  + t * 0.8)  * 0.08
      + Math.cos(theta * 5  + t * 1.2)  * 0.05
      + Math.sin(theta * 9  + t * 0.5)  * 0.03;

    // ── Stamp organic blob at cursor position ────────────────────────────────
    function stamp(mask, W, H, cx, cy, R, t) {
      const outer = R * 1.2;
      const x0 = Math.max(0, Math.floor(cx - outer));
      const x1 = Math.min(W - 1, Math.ceil(cx + outer));
      const y0 = Math.max(0, Math.floor(cy - outer));
      const y1 = Math.min(H - 1, Math.ceil(cy + outer));

      const N = 48;
      const verts = Array.from({ length: N }, (_, k) => {
        const a = (k / N) * Math.PI * 2;
        const r = R * noise(a, t);
        return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
      });

      for (let py = y0; py <= y1; py++) {
        for (let px = x0; px <= x1; px++) {
          let inside = false;
          for (let j = 0, i = N - 1; j < N; i = j++) {
            const { x: xi, y: yi } = verts[i];
            const { x: xj, y: yj } = verts[j];
            if (((yi > py) !== (yj > py)) &&
                (px < ((xj - xi) * (py - yi)) / (yj - yi) + xi))
              inside = !inside;
          }
          if (inside) {
            const dx = px - cx, dy = py - cy;
            const d  = Math.sqrt(dx * dx + dy * dy) / R;
            const a  = Math.max(0, 1 - d * d);
            mask[py * W + px] = Math.min(1, mask[py * W + px] + a);
          }
        }
      }
    }

    function drawCover(c, img, W, H) {
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const sw = img.naturalWidth * scale, sh = img.naturalHeight * scale;
      c.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);
    }

    // ── Render loop ──────────────────────────────────────────────────────────
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

      const SHORT = Math.min(W, H);
      const R     = SHORT * blobRadius;
      const mask  = st.maskData;

      // Decay — fades out when cursor leaves
      const decay = Math.exp(-fadeSpeed * dt);
      for (let i = 0; i < mask.length; i++) mask[i] *= decay;

      // Stamp blob only while cursor is over the portrait
      if (st.active && st.mouse.x >= 0) {
        stamp(mask, W, H, st.mouse.x * W, st.mouse.y * H, R, st.time);
      }

      // Build mask image
      const imgData = maskCtx.createImageData(W, H);
      const d = imgData.data;
      for (let i = 0; i < mask.length; i++) {
        const a = Math.round(Math.min(255, mask[i] * 255));
        const o = i * 4;
        d[o] = d[o + 1] = d[o + 2] = 255;
        d[o + 3] = a;
      }
      maskCtx.putImageData(imgData, 0, 0);

      // Composite
      ctx.clearRect(0, 0, W, H);
      drawCover(ctx, baseImg, W, H);

      if (revealImg) {
        const tmp = document.createElement("canvas");
        tmp.width = W; tmp.height = H;
        const tc = tmp.getContext("2d");
        drawCover(tc, revealImg, W, H);
        tc.globalCompositeOperation = "destination-in";
        tc.drawImage(maskCanvas, 0, 0);
        ctx.drawImage(tmp, 0, 0);
      }
    };

    Promise.all([loadImage(baseImageUrl), loadImage(revealImageUrl)])
      .then(([b, r]) => {
        baseImg = b; revealImg = r;
        rafRef.current = requestAnimationFrame(draw);
      })
      .catch(() => { rafRef.current = requestAnimationFrame(draw); });

    return () => {
      running = false;
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [baseImageUrl, revealImageUrl, blobRadius, fadeSpeed]);

  const onMouseMove = useCallback(e => {
    const r = e.currentTarget.getBoundingClientRect();
    stateRef.current.mouse  = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    stateRef.current.active = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  const onTouchMove = useCallback(e => {
    e.preventDefault();
    const t = e.touches[0];
    const r = e.currentTarget.getBoundingClientRect();
    stateRef.current.mouse  = { x: (t.clientX - r.left) / r.width, y: (t.clientY - r.top) / r.height };
    stateRef.current.active = true;
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
