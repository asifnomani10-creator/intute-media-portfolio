"use client";
import { useEffect, useState } from "react";
import { useScroll, useSpring, useTransform, motion, type MotionValue } from "framer-motion";

function Timecode({ progress }: { progress: MotionValue<number> }) {
  const [tc, setTc] = useState("00:00:00");

  useEffect(() => {
    return progress.on("change", (v: number) => {
      const total = Math.floor(v * 150);
      const m = Math.floor(total / 60).toString().padStart(2, "0");
      const s = (total % 60).toString().padStart(2, "0");
      const f = Math.floor(((v * 150) % 1) * 30)
        .toString()
        .padStart(2, "0");
      setTc(`${m}:${s}:${f}`);
    });
  }, [progress]);

  return <span>{tc}</span>;
}

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const width = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const tcOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  return (
    <>
      {/* Timeline bar */}
      <div className="fixed top-0 left-0 right-0 z-[200] pointer-events-none h-[3px] bg-white/5">
        <motion.div
          style={{ width }}
          className="h-full bg-gradient-to-r from-[#4A8A24] via-[#74C044] to-[#A0D870] relative"
        >
          {/* Playhead glow dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-[#74C044] shadow-[0_0_10px_3px_rgba(116,192,68,0.8)]" />
        </motion.div>
      </div>

      {/* Timecode chip — fades in after first scroll */}
      <motion.div
        style={{ opacity: tcOpacity }}
        className="fixed top-5 right-5 z-[199] pointer-events-none glass-card px-3 py-1.5 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#74C044]" />
        <span className="font-mono text-[11px] text-[#74C044] tabular-nums">
          <Timecode progress={scrollYProgress} />
        </span>
      </motion.div>
    </>
  );
}
