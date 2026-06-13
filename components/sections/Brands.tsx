"use client";

import { brands } from "@/lib/data";

const doubled = [...brands, ...brands];

export default function Brands() {
  return (
    <section className="relative py-12 overflow-hidden border-b border-white/5">
      <p className="text-center text-[11px] tracking-[0.35em] uppercase text-slate-600 font-medium mb-8">
        Brands &amp; creators that love us already
        <span className="ml-2 text-[#74C044]">♥</span>
      </p>

      <div className="relative overflow-hidden w-full">
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #040B04, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #040B04, transparent)" }}
        />

        <div
          className="flex gap-5 items-center"
          style={{ width: "max-content", animation: "scrollLeft 32s linear infinite" }}
        >
          {doubled.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 px-7 py-3 rounded-xl border border-white/10 bg-white/3"
              style={{ backdropFilter: "blur(8px)" }}
            >
              <span className="text-sm font-semibold text-slate-400 tracking-wider whitespace-nowrap">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
