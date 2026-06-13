"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const shown = testimonials.slice(0, 4);

  return (
    <section id="testimonials" className="relative py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
            Social Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
            Our Client{" "}
            <span className="text-[#74C044]">Testimonials</span>
          </h2>
          <p className="text-[#888] text-center text-xs font-bold uppercase tracking-widest mt-4">
            Over 50 Satisfied Clients — 4.9-Star Rating
          </p>
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
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-7 flex flex-col gap-5 hover:border-[#74C044]/30 transition-colors"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span key={s} className="text-[#74C044] text-sm">★</span>
                ))}
                <span className="text-[#555] text-[10px] ml-2 font-mono">5.0</span>
              </div>

              {/* Quote */}
              <p className="text-[#bbb] text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>

              {/* Metric badge */}
              {t.metric && (
                <div className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-lg bg-[#74C044]/10 border border-[#74C044]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74C044]" />
                  <span className="text-[10px] font-black text-[#74C044] tracking-widest uppercase">{t.metric}</span>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#1e1e1e]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A8A24] to-[#74C044] flex items-center justify-center text-sm font-black text-white shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white font-black text-sm">{t.name}</p>
                  <p className="text-[#555] text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
