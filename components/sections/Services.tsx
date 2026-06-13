"use client";

import { motion } from "framer-motion";
import {
  PlayCircle,
  Smartphone,
  Palette,
  Layers,
  Mic2,
  Film,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Youtube: PlayCircle,
  Smartphone,
  Palette,
  Layers,
  Mic2,
  Film,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper>
          <h2 className="section-heading">
            What I <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtext">
            End-to-end video editing services tailored to grow your brand and
            captivate your audience.
          </p>
        </SectionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <SectionWrapper key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card-hover p-6 h-full flex flex-col gap-4 group cursor-default"
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="font-bold text-lg text-white">{service.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>

                  {/* Hover gradient line */}
                  <div
                    className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} rounded-full transition-all duration-500`}
                  />
                </motion.div>
              </SectionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
