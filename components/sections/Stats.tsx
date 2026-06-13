"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Clapperboard } from "lucide-react";

const items = [
  { Icon: TrendingUp, value: 500, suffix: "M+", label: "Total Views Generated" },
  { Icon: Users,      value: 50,  suffix: "+",  label: "Brands Served" },
  { Icon: Clapperboard, value: 1000, suffix: "+", label: "Videos Created" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const dur = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-white tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-6 border-y border-white/5">
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 md:gap-12">
        {items.map(({ Icon, value, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#74C044] flex items-center justify-center shadow-lg shadow-[#74C044]/30">
              <Icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <CountUp target={value} suffix={suffix} />
            <span className="text-slate-500 text-sm leading-snug">{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
