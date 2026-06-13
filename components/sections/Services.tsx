"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Brand Deep Dive",
    desc: "We get to know your brand, audience, and goals to guide every piece of content we create for you.",
  },
  {
    num: "02",
    title: "Content Strategy",
    desc: "We map out your content calendar, target hooks, and posting cadence for maximum growth.",
  },
  {
    num: "03",
    title: "Raw Footage Review",
    desc: "You send us your footage. We review and build the edit structure that hooks viewers from frame one.",
  },
  {
    num: "04",
    title: "Edit & Post",
    desc: "We handle all editing, color grading, captions, motion graphics, and delivery-ready formats.",
  },
  {
    num: "05",
    title: "Track & Grow",
    desc: "We monitor performance analytics, refine the strategy, and help you grow faster every month.",
  },
  {
    num: "06",
    title: "Scale DFY",
    desc: "We manage your full content pipeline — completely done for you, so you focus on your business.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-[#0d0d0d] border-y border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
            Our Seamless Content
            <br />
            <span className="text-[#74C044]">Creation Process</span>
          </h2>
          <p className="text-[#777] text-base mt-5 max-w-xl mx-auto">
            We take the guesswork out of content creation — delivering high-quality, scalable video
            that captivates your audience and drives real results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-7 hover:border-[#74C044]/30 transition-colors group"
            >
              <div className="text-[#74C044] font-black text-xs tracking-[0.3em] uppercase mb-4">
                {step.num} —
              </div>
              <h3 className="text-white font-black text-base uppercase tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="text-[#777] text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[#444] text-[10px] mt-10 tracking-widest uppercase">
          Studio-grade quality is included — it&apos;s just a bonus to make your life easier.
        </p>
      </div>
    </section>
  );
}
