"use client";

import { brands } from "@/lib/data";
import { Star, BarChart2, Film } from "lucide-react";

const doubled = [...brands, ...brands];

const features = [
  { icon: Star,     label: "Unmatched Quality" },
  { icon: BarChart2, label: "Strategic Support" },
  { icon: Film,     label: "Creative Collaboration" },
];

export default function Brands() {
  return (
    <section className="relative py-14 border-y border-[#1e1e1e] bg-[#0d0d0d]">
      <p className="text-center text-[10px] tracking-[0.4em] uppercase text-[#555] font-bold mb-10">
        Over 50 Brands Served &nbsp;—&nbsp; 4.9-Star Rating ★★★★★
      </p>

      {/* Scrolling strip */}
      <div className="relative overflow-hidden w-full mb-12">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }}
        />
        <div
          className="flex gap-4 items-center"
          style={{ width: "max-content", animation: "scrollLeft 32s linear infinite" }}
        >
          {doubled.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 px-7 py-3 rounded-xl border border-[#1e1e1e] bg-[#111]"
            >
              <span className="text-sm font-bold text-[#555] tracking-wider whitespace-nowrap uppercase">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-4 px-6">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#1e1e1e] bg-[#111] hover:border-[#74C044]/30 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#74C044]/10 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-[#74C044]" />
            </div>
            <span className="text-white font-black text-xs uppercase tracking-widest">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
