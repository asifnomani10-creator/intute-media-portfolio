"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { tools } from "@/lib/data";

const points = [
  "Advanced editing technology and creative expertise",
  "Dedicated support and zero back-and-forth revisions",
  "Consistent weekly delivery — always on schedule",
  "Data-driven approach optimised for retention & growth",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-[#0d0d0d] border-y border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* ── Left visual ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-2xl bg-[#111] border border-[#1e1e1e] overflow-hidden flex items-center justify-center">
            <div className="text-center px-8">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#4A8A24] to-[#74C044] flex items-center justify-center text-5xl font-black text-white mx-auto mb-6 shadow-xl shadow-[#74C044]/20">
                I
              </div>
              <p className="text-[#74C044] font-black text-xl uppercase tracking-widest">Intute Media</p>
              <p className="text-[#555] text-sm mt-2 uppercase tracking-wider">Professional Video Editing</p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {tools.map((t) => (
                  <span key={t.name} className={`px-3 py-1 rounded-lg border border-[#1e1e1e] bg-[#0a0a0a] text-xs font-medium ${t.color}`}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stat badge */}
          <div className="absolute -bottom-5 -right-5 bg-[#74C044] rounded-2xl p-5 shadow-xl shadow-[#74C044]/25">
            <div className="text-[#0a0a0a] text-2xl font-black">3+</div>
            <div className="text-[#0a0a0a] text-[10px] font-black uppercase tracking-widest">Years Expert</div>
          </div>
        </motion.div>

        {/* ── Right copy ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-7"
        >
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
              Why Choose Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
              Unmatched Content
              <br />
              <span className="text-[#74C044]">Production Quality</span>
            </h2>
          </div>

          <p className="text-[#888] text-base leading-relaxed">
            Our unique blend of advanced technology, expert editing, and dedicated support sets us apart.
            Unlike our competitors, we don&apos;t just edit your videos — we enhance your storytelling and
            drive measurable results that grow your business.
          </p>

          <ul className="flex flex-col gap-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#74C044] shrink-0 mt-0.5" />
                <span className="text-[#bbb] text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3.5 rounded-lg bg-[#74C044] text-[#0a0a0a] font-black text-sm tracking-widest uppercase hover:bg-[#A0D870] transition-colors w-fit mt-2"
          >
            Get Started
          </a>
        </motion.div>
      </div>
    </section>
  );
}
