"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Users } from "lucide-react";

const statCards = [
  { icon: TrendingUp, value: "500M+", label: "Total Views Generated" },
  { icon: Zap,         value: "1000+", label: "Videos Created" },
  { icon: Users,       value: "50+",   label: "Clients Served" },
];

const avatarInitials = ["S", "M", "P", "J"];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-32 pb-16 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#74C044 1px, transparent 1px), linear-gradient(90deg, #74C044 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner bracket accents */}
      <div className="absolute top-32 left-8 w-10 h-10 border-l-2 border-t-2 border-[#74C044]/20 hidden xl:block" />
      <div className="absolute top-32 right-8 w-10 h-10 border-r-2 border-t-2 border-[#74C044]/20 hidden xl:block" />
      <div className="absolute bottom-16 left-8 w-10 h-10 border-l-2 border-b-2 border-[#74C044]/20 hidden xl:block" />
      <div className="absolute bottom-16 right-8 w-10 h-10 border-r-2 border-b-2 border-[#74C044]/20 hidden xl:block" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: copy ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-7"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044]">
            For Brands &amp; Creators
          </p>

          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight uppercase">
            <span className="text-white">Attract More </span>
            <span className="text-[#74C044]">Premium</span>
            <br />
            <span className="text-white">Clients With </span>
            <span className="text-[#74C044]">Content</span>
            <br />
            <span className="text-white">That Converts</span>
          </h1>

          <p className="text-[#777] text-base italic">
            (Done-For-You Video Editing That Actually Works)
          </p>

          <p className="text-[#999] text-base leading-relaxed max-w-lg">
            We craft scroll-stopping video content for brands and creators. From reels to VSLs,
            we help you grow views, watch time, and revenue — completely done for you.
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            <a
              href="#contact"
              className="px-8 py-4 rounded-lg bg-[#74C044] text-[#0a0a0a] font-black text-sm tracking-widest uppercase hover:bg-[#A0D870] transition-colors shadow-lg shadow-[#74C044]/20"
            >
              Book a Call With Us
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex -space-x-2">
              {avatarInitials.map((l) => (
                <div
                  key={l}
                  className="w-9 h-9 rounded-full bg-[#111] border-2 border-[#74C044] flex items-center justify-center text-[11px] font-black text-[#74C044]"
                >
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#74C044] font-black text-sm">500M+</span>
              <span className="text-[#777] text-sm">Views Generated</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: stat cards ── */}
        <div className="flex flex-col gap-4">
          {statCards.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 flex items-center gap-5 hover:border-[#74C044]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#74C044]/10 border border-[#74C044]/20 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-[#74C044]" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-[#777] text-sm mt-0.5">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
