"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { results, type ResultMetric } from "@/lib/data";

const BAR_H = 140; // px — max bar height

function MetricCard({ metric, index }: { metric: ResultMetric; index: number }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          setTimeout(() => setAnimate(true), index * 80);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const beforeH = (metric.beforePct / 100) * BAR_H;
  const afterH = (metric.afterPct / 100) * BAR_H;
  const isSingle = !metric.beforeVal;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass-card p-6 flex flex-col gap-6 border border-white/5 hover:border-[#74C044]/20 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-bold text-white">{metric.label}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{metric.subLabel}</p>
        </div>
        <span className="text-xl font-black text-[#74C044] tabular-nums">{metric.lift}</span>
      </div>

      {/* Vertical bar chart */}
      {isSingle ? (
        /* Single retention bar */
        <div className="flex flex-col gap-2">
          <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4A8A24] to-[#74C044] shadow-[0_0_10px_rgba(116,192,68,0.4)]"
              style={{
                width: animate ? `${metric.afterPct}%` : "0%",
                transition: "width 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500">Clients</span>
            <span className="text-[#74C044]">{metric.afterVal}</span>
          </div>
        </div>
      ) : (
        /* Side-by-side vertical bars */
        <div
          className="flex items-end gap-5 justify-center"
          style={{ height: `${BAR_H + 48}px` }}
        >
          {/* Before */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-slate-400">{metric.beforeVal}</span>
            <div
              className="w-14 md:w-16 rounded-t-xl bg-white/10"
              style={{
                height: animate ? `${beforeH}px` : "0px",
                transition: "height 1s cubic-bezier(0.25,0.46,0.45,0.94)",
                minHeight: animate ? "6px" : "0px",
              }}
            />
            <span className="text-[11px] text-slate-500 font-mono">Before</span>
          </div>

          {/* After */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-[#A0D870]">{metric.afterVal}</span>
            <div
              className="w-14 md:w-16 rounded-t-xl bg-gradient-to-b from-[#74C044] to-[#4A8A24]"
              style={{
                height: animate ? `${afterH}px` : "0px",
                transition: "height 1.1s 0.15s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow: animate ? "0 0 24px rgba(116,192,68,0.35)" : "none",
              }}
            />
            <span className="text-[11px] text-[#74C044] font-mono whitespace-nowrap">After Intute</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Results() {
  return (
    <section id="results" className="relative py-24 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(116,192,68,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-500 font-mono mb-4">Proof</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            The{" "}
            <span className="gradient-text">Numbers</span>
            {" "}Don&apos;t Lie
          </h2>
          <p className="text-slate-500 text-sm mt-4 max-w-lg mx-auto">
            Average performance lift our clients see after switching to Intute Media creative.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {results.map((r, i) => (
            <MetricCard key={r.label} metric={r} index={i} />
          ))}
        </div>

        <p className="text-center text-xs text-slate-700 mt-6">
          Illustrative average — better creative drives better results.
        </p>
      </div>
    </section>
  );
}
