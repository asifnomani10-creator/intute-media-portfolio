"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const shown = testimonials.slice(0, 4);

  return (
    <section id="testimonials" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-slate-500 font-mono mb-4">Social Proof</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            What Clients{" "}
            <span className="gradient-text">Say</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#74C044] mx-auto mt-5 rounded-full" />
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {shown.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-7 flex flex-col gap-5 border border-white/5 hover:border-[#74C044]/20 transition-colors group"
            >
              {/* Quote mark */}
              <span className="text-3xl text-[#74C044] font-serif leading-none select-none">&ldquo;&ldquo;</span>

              {/* Quote */}
              <p className="text-slate-300 text-[15px] leading-relaxed flex-1">{t.quote}</p>

              {/* Metric badge */}
              {t.metric && (
                <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#74C044]/10 border border-[#74C044]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74C044]" />
                  <span className="text-[11px] font-semibold text-[#A0D870] tracking-wide">{t.metric}</span>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4A8A24] to-[#74C044] flex items-center justify-center text-sm font-black text-white shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
