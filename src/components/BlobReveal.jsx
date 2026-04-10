import { useEffect, useRef, useCallback } from "react";

/**
 * BlobReveal — organic blob that reveals a second image on mouse-move.
 * Pure Canvas 2D, no external dependencies.
 */
export default function BlobReveal({
  baseImageUrl,
  revealImageUrl,
  blobRadius = 0.38,   // 0–1, fraction of the shorter dimension
  fadeSpeed = 1.8,     // how fast the blob fades (higher = faster)
  style = {},
}) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({
    mouse:   { x: -1, y: -1 },
    active:  false,
    maskData: null,    // Float32Array of per-pixel alpha for the blob
    time:    0,
  });

  // ── Load images ──────────────────────────────────────────────────────────
  const loadImage = (src) =>
    new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let running = true;

    // Offscreen canvas holds the accumulated blob mask (float precision via ImageData)
    const maskCanvas = document.createElement("canvas");
    const maskCtx    = maskCanvas.getContext("2d");

    // ── Resize handler ───────────────────────────────────────────────────
    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas.parentElement || canvas;
      canvas.width = maskCanvas.width  = w;
      canvas.height = maskCanvas.height = h;
      stateRef.current.maskData = new Float32Array(w * h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    // ── Organic-blob noise shape ─────────────────────────────────────────
    // Returns a noisy radius multiplier at angle θ
    const noisyRadius = (theta, time) => {
      const s1 = Math.sin(theta * 3  + time * 0.7)  * 0.09;
      const s2 = Math.cos(theta * 7  + time * 1.1)  * 0.06;
      const s3 = Math.sin(theta * 11 + time * 0.4)  * 0.04;
      const s4 = Math.cos(theta * 2  - time * 0.9)  * 0.05;
      return 1 + s1 + s2 + s3 + s4;
    };

    // ── Main loop ────────────────────────────────────────────────────────
    let baseImg, revealImg, lastTs = 0;

    const draw = (ts) => {
      if (!running) return;
      rafRef.current = requestAnimationFrame(draw);

      const dt   = Math.min((ts - lastTs) / 1000, 0.05);
      lastTs = ts;
      const st   = stateRef.current;
      st.time   += dt;

      const { width: W, height: H } = canvas;
      if (!W || !H || !baseImg) return;

      const SHORT = Math.min(W, H);
      const R     = SHORT * blobRadius;

      // ── Step 1: decay the float mask ──────────────────────────────────
      const mask = st.maskData;
      const decay = Math.exp(-fadeSpeed * dt);
      for (let i = 0; i < mask.length; i++) mask[i] *= decay;

      // ── Step 2: stamp new blob at mouse position ───────────────────────
      if (st.active && st.mouse.x >= 0) {
        const mx = st.mouse.x * W;
        const my = st.mouse.y * H;
        const POINTS = 96;
        const outerR  = R * 1.25; // bounding box for the blob stamp

        const x0 = Math.max(0, Math.floor(mx - outerR));
        const x1 = Math.min(W - 1, Math.ceil(mx + outerR));
        const y0 = Math.max(0, Math.floor(my - outerR));
        const y1 = Math.min(H - 1, Math.ceil(my + outerR));

        // Pre-compute noisy polygon vertices
        const verts = [];
        for (let k = 0; k < POINTS; k++) {
          const theta = (k / POINTS) * Math.PI * 2;
          const r     = R * noisyRadius(theta, st.time);
          verts.push({ x: mx + Math.cos(theta) * r, y: my + Math.sin(theta) * r });
        }

        // For each pixel in bounding box, check inside polygon & set alpha
        for (let py = y0; py <= y1; py++) {
          for (let px = x0; px <= x1; px++) {
            // Point-in-polygon (ray casting)
            let inside = false;
            for (let j = 0, i = POINTS - 1; j < POINTS; i = j++) {
              const xi = verts[i].x, yi = verts[i].y;
              const xj = verts[j].x, yj = verts[j].y;
              if (((yi > py) !== (yj > py)) &&
                  (px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)) {
                inside = !inside;
              }
            }
            if (inside) {
              // Soft gradient: 1 at centre, 0 at edge
              const dx = px - mx, dy = py - my;
              const dist = Math.sqrt(dx * dx + dy * dy) / R;
              const alpha = Math.max(0, 1 - dist * dist);
              const idx   = py * W + px;
              mask[idx] = Math.min(1, mask[idx] + alpha);
            }
          }
        }
      }

      // ── Step 3: build mask ImageData ──────────────────────────────────
      const maskImage = maskCtx.createImageData(W, H);
      const mData     = maskImage.data;
      for (let i = 0; i < mask.length; i++) {
        const a = Math.round(Math.min(255, mask[i] * 255));
        const o = i * 4;
        mData[o] = mData[o+1] = mData[o+2] = 255;
        mData[o+3] = a;
      }
      maskCtx.putImageData(maskImage, 0, 0);

      // ── Step 4: composite onto main canvas ───────────────────────────
      ctx.clearRect(0, 0, W, H);

      // Dark background so transparent PNG edges look clean
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      // Draw base image (cover)
      drawCover(ctx, baseImg, W, H);

      if (revealImg) {
        // Clip to mask, draw reveal image
        ctx.save();
        ctx.globalCompositeOperation = "source-over";

        // Use the mask canvas as a clip source
        const tmp = document.createElement("canvas");
        tmp.width  = W;
        tmp.height = H;
        const tc   = tmp.getContext("2d");
        drawCover(tc, revealImg, W, H);

        // Apply mask: multiply by mask alpha
        tc.globalCompositeOperation = "destination-in";
        tc.drawImage(maskCanvas, 0, 0);

        ctx.drawImage(tmp, 0, 0);
        ctx.restore();
      }
    };

    // ── Cover-fit draw helper ────────────────────────────────────────────
    function drawCover(c, img, W, H) {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(W / iw, H / ih);
      const sw = iw * scale, sh = ih * scale;
      const ox = (W - sw) / 2, oy = (H - sh) / 2;
      c.drawImage(img, ox, oy, sw, sh);
    }

    // ── Load images then start ───────────────────────────────────────────
    Promise.all([loadImage(baseImageUrl), loadImage(revealImageUrl)])
      .then(([b, r]) => {
        baseImg   = b;
        revealImg = r;
        rafRef.current = requestAnimationFrame(draw);
      })
      .catch(() => {
        // Fallback: if images fail, just start loop (canvas stays dark)
        rafRef.current = requestAnimationFrame(draw);
      });

    return () => {
      running = false;
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [baseImageUrl, revealImageUrl, blobRadius, fadeSpeed]);

  // ── Mouse handlers ────────────────────────────────────────────────────────
  const onMouseMove = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    stateRef.current.mouse  = {
      x: (e.clientX - r.left)  / r.width,
      y: (e.clientY - r.top)   / r.height,
    };
    stateRef.current.active = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    stateRef.current.active = false;
  }, []);

  const onTouchMove = useCallback((e) => {
    e.preventDefault();
    const t = e.touches[0];
    const r = e.currentTarget.getBoundingClientRect();
    stateRef.current.mouse  = {
      x: (t.clientX - r.left)  / r.width,
      y: (t.clientY - r.top)   / r.height,
    };
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
