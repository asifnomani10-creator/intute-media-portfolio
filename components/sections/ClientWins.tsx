"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const screenshots = [
  { src: "/wins/win1.png", alt: "Client analytics screenshot 1" },
  { src: "/wins/win2.png", alt: "Client analytics screenshot 2" },
  { src: "/wins/win3.png", alt: "Client analytics screenshot 3" },
  { src: "/wins/win4.png", alt: "Client analytics screenshot 4" },
];

// Duplicate for seamless loop
const doubled = [...screenshots, ...screenshots];

const stats = [
  { value: "200%+", label: "Avg Viewer Growth" },
  { value: "115%+", label: "Avg Follower Growth" },
  { value: "60",    label: "Days Average Timeline" },
  { value: "8+",    label: "Clients Shown" },
];

export default function ClientWins() {
  return (
    <section id="client-wins" className="relative py-24 bg-[#0a0a0a] border-y border-[#1e1e1e] overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-14 px-6">
        <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
          Verified Analytics
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
          Real Clients.{" "}
          <span className="text-[#74C044]">Real Numbers.</span>
        </h2>
        <p className="text-[#777] text-base mt-5 max-w-xl mx-auto">
          Actual TikTok analytics screenshots from our clients.
          Every number verified — all results within{" "}
          <span className="text-white font-bold">60 days</span> of working with us.
        </p>
      </div>

      {/* Scrolling screenshot strip */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
        />

        <div
          className="flex gap-5 items-start py-4"
          style={{ width: "max-content", animation: "scrollLeft 30s linear infinite" }}
        >
          {doubled.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, zIndex: 20 }}
              transition={{ duration: 0.2 }}
              className="relative shrink-0 rounded-2xl overflow-hidden border border-[#1e1e1e] hover:border-[#74C044]/40 transition-colors shadow-xl"
              style={{ width: "220px", height: "420px" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 text-center hover:border-[#74C044]/30 transition-colors"
            >
              <div className="text-3xl font-black text-[#74C044] mb-1">{value}</div>
              <div className="text-[10px] text-[#555] uppercase tracking-widest font-bold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
