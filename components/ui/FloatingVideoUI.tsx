"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WAVE = [35, 72, 44, 90, 58, 95, 41, 78, 52, 86, 38, 66, 82, 47, 70, 33, 61, 88, 50, 75];

function WaveformBars() {
  return (
    <div className="flex items-end gap-[3px] h-7">
      {WAVE.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-sm bg-gradient-to-t from-[#4A8A24] to-[#74C044]"
          animate={{ height: [`${h * 0.35}%`, `${h}%`, `${h * 0.35}%`] }}
          transition={{
            duration: 0.38 + i * 0.022,
            repeat: Infinity,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
          style={{ height: `${h * 0.35}%` }}
        />
      ))}
    </div>
  );
}

function RecCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: -10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute top-28 right-6 xl:right-16 glass-card px-4 py-3"
    >
      <div className="flex items-center gap-2.5 mb-1.5">
        <motion.div
          animate={{ opacity: [1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.15, ease: "easeInOut" }}
          className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.9)]"
        />
        <span className="font-mono text-xs text-white font-bold tracking-[0.18em]">REC</span>
        <span className="font-mono text-xs text-[#74C044] font-semibold">4K</span>
      </div>
      <p className="font-mono text-[10px] text-slate-500 tracking-wider">29.97 FPS · H.264</p>
    </motion.div>
  );
}

function WaveformCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute bottom-44 left-6 xl:left-16 glass-card px-4 py-3 hidden sm:block"
    >
      <p className="font-mono text-[9px] text-slate-500 mb-2 tracking-[0.18em] uppercase">
        Audio Track 01
      </p>
      <WaveformBars />
    </motion.div>
  );
}

function TimecodeCard() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setFrame((f) => (f + 1) % 30), 33);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute bottom-44 right-6 xl:right-16 glass-card px-4 py-3 font-mono hidden sm:block"
    >
      <p className="text-[9px] text-slate-500 mb-1.5 tracking-[0.18em] uppercase">Timecode</p>
      <p className="text-[#74C044] text-[17px] font-bold tabular-nums leading-none">
        00:01:23:{frame.toString().padStart(2, "0")}
      </p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[9px] text-slate-500">EDIT</span>
        <span className="text-[9px] text-[#74C044] font-semibold">#047</span>
      </div>
    </motion.div>
  );
}

export default function FloatingVideoUI() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-[5]">
      <RecCard />
      <WaveformCard />
      <TimecodeCard />
    </div>
  );
}
