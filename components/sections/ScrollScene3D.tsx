"use client";
import { useRef, useState, useEffect, memo, MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import Clapperboard3D from "@/components/ui/Clapperboard3D";

const CHAPTERS = [
  {
    tag: "Chapter 01",
    headline: "Precision\nCuts",
    body: "Every frame is intentional. I cut with surgical focus to keep your audience locked in from the first second to the last.",
    icon: "✂",
  },
  {
    tag: "Chapter 02",
    headline: "Cinematic\nColor",
    body: "From raw log to lush cinema. Color grading that makes viewers feel before they think — your story, told in light and tone.",
    icon: "🎨",
  },
  {
    tag: "Chapter 03",
    headline: "Motion\n& VFX",
    body: "Titles, transitions, visual effects. Your brand identity — animated and alive across every platform you publish on.",
    icon: "✨",
  },
];

// Memoized canvas — only re-renders if progressRef identity changes (never)
const Scene = memo(function Scene({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      dpr={[1, 2]}
      style={{ cursor: "none", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <Clapperboard3D progressRef={progressRef} />
    </Canvas>
  );
});

export default function ScrollScene3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [chapter, setChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
      const idx = v < 0.33 ? 0 : v < 0.66 ? 1 : 2;
      setChapter((prev) => (prev !== idx ? idx : prev));
    });
  }, [scrollYProgress]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }}
      aria-label="3D showcase"
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full overflow-hidden flex flex-col md:flex-row items-center"
        style={{ height: "100vh" }}
      >
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 38% 50%, rgba(116,192,68,0.08) 0%, transparent 70%)",
          }}
        />

        {/* LEFT: Three.js canvas — memoized, never re-renders */}
        <div className="relative w-full md:w-[55%] h-[50vh] md:h-full">
          <Scene progressRef={progressRef} />

          {/* Vignette on canvas edges */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 78% 78% at 50% 50%, transparent 45%, rgba(4,11,4,0.75) 100%)",
            }}
          />
        </div>

        {/* RIGHT: Chapter text — switches with AnimatePresence */}
        <div className="relative w-full md:w-[45%] h-[50vh] md:h-full flex items-center justify-center px-8 md:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={chapter}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-5"
              >
                {/* Tag */}
                <span className="font-mono text-xs text-[#74C044] tracking-[0.28em] uppercase">
                  {CHAPTERS[chapter].tag}
                </span>

                {/* Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.05] whitespace-pre-line">
                  {CHAPTERS[chapter].headline}
                </h2>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                  className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#74C044] to-[#A0D870]"
                />

                {/* Body */}
                <p className="text-slate-400 text-base md:text-[1.05rem] leading-relaxed max-w-sm">
                  {CHAPTERS[chapter].body}
                </p>

                {/* CTA */}
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 text-[#74C044] text-sm font-semibold hover:text-[#A0D870] transition-colors mt-1 pointer-events-auto"
                >
                  Explore services
                  <span className="text-base">→</span>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom progress indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {CHAPTERS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === chapter ? 1.35 : 1,
                opacity: i === chapter ? 1 : 0.3,
              }}
              transition={{ duration: 0.35 }}
              className="w-2 h-2 rounded-full bg-[#74C044]"
            />
          ))}
          <span className="font-mono text-[10px] text-slate-600 ml-2 tracking-widest uppercase">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
