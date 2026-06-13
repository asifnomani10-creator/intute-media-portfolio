"use client";
import { useEffect, useRef } from "react";

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let last = 0;

    const resize = () => {
      // Half-resolution for performance — CSS scales it up
      canvas.width = Math.ceil(window.innerWidth / 2);
      canvas.height = Math.ceil(window.innerHeight / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (ts - last < 55) return; // ~18 fps cap
      last = ts;
      const { width: w, height: h } = canvas;
      const buf = ctx.createImageData(w, h);
      const d = buf.data;
      for (let i = 0; i < d.length; i += 4) {
        const g = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = g;
        d[i + 3] = 22;
      }
      ctx.putImageData(buf, 0, 0);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ width: "100vw", height: "100vh", opacity: 0.045, mixBlendMode: "overlay" }}
    />
  );
}
