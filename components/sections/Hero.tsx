"use client";

import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* Big green radial glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(116,192,68,0.08) 0%, transparent 65%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8 relative z-10"
      >
        {/* Pill badge */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#74C044]/30 bg-[#74C044]/8 text-sm text-[#A0D870] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74C044] animate-pulse" />
            Trusted by 50+ Brands &amp; Creators
          </span>
        </motion.div>

        {/* Headline — large, confident */}
        <motion.h1
          variants={item}
          className="text-6xl sm:text-7xl md:text-8xl font-black leading-[1.0] tracking-tight"
        >
          <span className="text-white">We Turn </span>
          <em className="not-italic gradient-text">Scrollers</em>
          <br />
          <span className="text-white">Into </span>
          <em className="not-italic gradient-text">Buyers.</em>
        </motion.h1>

        {/* Sub — one punchy line */}
        <motion.p
          variants={item}
          className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed"
        >
          Our clients average{" "}
          <span className="text-white font-semibold">3M+ views</span> and a{" "}
          <span className="text-white font-semibold">40% watch-time lift</span>{" "}
          within the first 30 days.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap gap-4 justify-center pt-2">
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full bg-[#74C044] text-[#040B04] font-bold text-sm tracking-wide hover:bg-[#A0D870] transition-colors shadow-lg shadow-[#74C044]/25"
          >
            Book a Strategy Call
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-sm tracking-wide hover:border-white/40 hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            View Portfolio
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-slate-600">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#74C044]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
