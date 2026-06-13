"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BRAND_NAME, skills, tools } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper>
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtext">
            Passionate storyteller with a frame-perfect eye.
          </p>
        </SectionWrapper>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — bio */}
          <SectionWrapper>
            <div className="glass-card p-8 flex flex-col gap-6 h-full">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4A8A24] via-[#74C044] to-[#A0D870] flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-[#74C044]/30">
                {BRAND_NAME[0]}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{BRAND_NAME}</h3>
                <p className="text-[#74C044] font-medium">Professional Video Editor</p>
              </div>

              <p className="text-slate-400 leading-relaxed text-sm">
                With 3+ years of hands-on experience, I specialize in crafting
                high-retention edits for YouTube creators, brands, and agencies.
                From concept to final export, I handle everything — cuts, color,
                sound design, motion graphics, and delivery-ready formats.
              </p>

              <p className="text-slate-400 leading-relaxed text-sm">
                I&apos;ve helped channels grow to millions of subscribers and produced
                ad creatives that have driven measurable ROI for e-commerce brands.
                If it has a timeline, I can make it extraordinary.
              </p>

              {/* Tools */}
              <div>
                <p className="text-slate-300 font-semibold mb-3 text-sm">Tools I use</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span
                      key={t.name}
                      className={`glass-card px-3 py-1 text-xs font-medium ${t.color}`}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              <a href="#" className="btn-ghost flex items-center gap-2 w-fit text-sm">
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </SectionWrapper>

          {/* Right — skills */}
          <SectionWrapper delay={0.2}>
            <div className="glass-card p-8 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-white">Skill Proficiency</h3>
              <div className="flex flex-col gap-5">
                {skills.map((s, i) => (
                  <div key={s.label} className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300 font-medium">{s.label}</span>
                      <span className="text-slate-400">{s.percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#4A8A24] via-[#74C044] to-[#A0D870]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}
