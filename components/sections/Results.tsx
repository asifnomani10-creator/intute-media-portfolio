"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { results, type ResultMetric } from "@/lib/data";

const BAR_H = 140;

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
  const isSingle = !metric.beforeVal;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-7 flex flex-col gap-6 hover:border-[#74C044]/30 transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wide">{metric.label}</h3>
          <p className="text-[10px] text-[#555] mt-0.5 font-mono uppercase tracking-widest">{metric.subLabel}</p>
        </div>
        <span className="text-2xl font-black text-[#74C044] tabular-nums">{metric.lift}</span>
      </div>

      {isSingle ? (
        <div className="flex flex-col gap-2">
          <div className="w-full h-3 rounded-full bg-[#1a1a1a] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#74C044]"
              style={{
                width: animate ? `${metric.afterPct}%` : "0%",
                transition: "width 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow: animate ? "0 0 12px rgba(116,192,68,0.4)" : "none",
              }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#555]">Clients</span>
            <span className="text-[#74C044] font-black">{metric.afterVal}</span>
          </div>
        </div>
      ) : (
        <div
          className="flex items-end gap-6 justify-center"
          style={{ height: `${BAR_H + 48}px` }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-[#777]">{metric.beforeVal}</span>
            <div
              className="w-14 md:w-16 rounded-t-xl bg-[#1e1e1e]"
              style={{
                height: animate ? `${beforeH}px` : "0px",
                transition: "height 1s cubic-bezier(0.25,0.46,0.45,0.94)",
                minHeight: animate ? "6px" : "0px",
              }}
            />
            <span className="text-[10px] text-[#555] font-mono uppercase tracking-wider">Before</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-mono text-[#74C044] font-black">{metric.afterVal}</span>
            <div
              className="w-14 md:w-16 rounded-t-xl bg-[#74C044]"
              style={{
                height: animate ? `${BAR_H}px` : "0px",
                transition: "height 1.1s 0.15s cubic-bezier(0.25,0.46,0.45,0.94)",
                boxShadow: animate ? "0 0 24px rgba(116,192,68,0.3)" : "none",
              }}
            />
            <span className="text-[10px] text-[#74C044] font-mono uppercase tracking-wider whitespace-nowrap">After Intute</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Results() {
  return (
    <section id="results" className="relative py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
            Converting Viewers Into Customers
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
            We Turn Your Content Into{" "}
            <span className="text-[#74C044]">Cash Flow</span>
          </h2>
          <p className="text-[#777] text-base mt-5 max-w-xl mx-auto">
            From concept development to post-production, ensuring your brand&apos;s message is heard loud and clear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {results.map((r, i) => (
            <MetricCard key={r.label} metric={r} index={i} />
          ))}
        </div>

        <p className="text-center text-[#333] text-xs mt-8 uppercase tracking-widest">
          Average performance lift across Intute Media clients
        </p>
      </div>
    </section>
  );
}
