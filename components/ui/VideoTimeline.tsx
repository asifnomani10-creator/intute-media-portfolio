"use client";
import { motion } from "framer-motion";

const CLIPS = [
  { w: "w-20", color: "bg-[#4A8A24]/70", label: "INTRO" },
  { w: "w-36", color: "bg-[#74C044]/60", label: "A-ROLL" },
  { w: "w-12", color: "bg-[#A0D870]/50", label: "CUT" },
  { w: "w-28", color: "bg-[#74C044]/60", label: "B-ROLL" },
  { w: "w-16", color: "bg-[#4A8A24]/70", label: "VFX" },
  { w: "w-24", color: "bg-[#74C044]/60", label: "GRADE" },
  { w: "w-10", color: "bg-[#A0D870]/50", label: "END" },
];

const TRACKS = ["V1", "V2", "A1", "A2"];

export default function VideoTimeline() {
  return (
    <div className="relative w-full overflow-hidden py-8 select-none pointer-events-none">
      {/* Track labels + clips */}
      <div className="flex flex-col gap-2">
        {TRACKS.map((track, ti) => (
          <div key={track} className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-slate-600 w-6 text-right shrink-0">
              {track}
            </span>
            {/* Scrolling clip reel */}
            <div className="flex-1 overflow-hidden h-6 rounded-sm relative">
              <motion.div
                className="flex gap-1 absolute"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 22 + ti * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: ti * -3,
                }}
              >
                {/* Duplicate clips for seamless loop */}
                {[...CLIPS, ...CLIPS, ...CLIPS].map((clip, ci) => (
                  <div
                    key={ci}
                    className={`${clip.w} h-6 ${clip.color} rounded-sm flex items-center justify-center shrink-0 border border-white/10`}
                  >
                    <span className="font-mono text-[8px] text-white/60 tracking-wider truncate px-1">
                      {clip.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Playhead */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-[#74C044] shadow-[0_0_6px_2px_rgba(116,192,68,0.6)]"
        style={{ left: "30%" }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -top-0.5 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#74C044] w-0 h-0" />
      </motion.div>

      {/* Time ruler ticks */}
      <div className="flex gap-0 mt-2 ml-9 border-t border-white/5">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 border-l border-white/10 ${
              i % 5 === 0 ? "h-2" : "h-1"
            } ${i % 10 === 0 ? "border-[#74C044]/30" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
