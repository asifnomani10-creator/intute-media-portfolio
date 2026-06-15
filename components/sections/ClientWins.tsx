"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users } from "lucide-react";

const wins = [
  { viewers: "+77K", viewerPct: "+179.1%", followers: "+2,317", followerPct: "+122.5%", days: 60 },
  { viewers: "+87K", viewerPct: "+149.3%", followers: "+52K",   followerPct: "+160.0%", days: 60 },
  { viewers: "+66K", viewerPct: "+226.9%", followers: "+1,912", followerPct: "+108.0%", days: 60 },
  { viewers: "+85K", viewerPct: "+142.9%", followers: "+50K",   followerPct: "+127.3%", days: 60 },
  { viewers: "+58K", viewerPct: "+241.7%", followers: "+1,486", followerPct: "+109.5%", days: 60 },
  { viewers: "+45K", viewerPct: "+235.4%", followers: "+1,163", followerPct: "+113.0%", days: 60 },
  { viewers: "+32K", viewerPct: "+282.8%", followers: "+1,912", followerPct: "+108.0%", days: 60 },
  { viewers: "+32K", viewerPct: "+213.3%", followers: "+842",   followerPct: "+117.0%", days: 60 },
];

export default function ClientWins() {
  return (
    <section id="client-wins" className="relative py-24 px-6 bg-[#0d0d0d] border-y border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
            Verified Analytics
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
            Real Clients.{" "}
            <span className="text-[#74C044]">Real Numbers.</span>
          </h2>
          <p className="text-[#777] text-base mt-5 max-w-xl mx-auto">
            Actual TikTok analytics from our clients — every number is screenshot-verified.
            All results within <span className="text-white font-bold">60 days</span> of working with us.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wins.map((win, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 flex flex-col gap-5 hover:border-[#74C044]/30 transition-colors"
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#555]">
                  Client {String.fromCharCode(65 + i)}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#74C044]/10 border border-[#74C044]/20 text-[#74C044] text-[9px] font-black uppercase tracking-wider">
                  {win.days} Days
                </span>
              </div>

              {/* Viewers */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#74C044]" />
                  <span className="text-[10px] text-[#555] uppercase tracking-widest font-bold">Total Viewers</span>
                </div>
                <div className="text-3xl font-black text-white">{win.viewers}</div>
                <div className="text-sm font-black text-[#74C044]">{win.viewerPct}</div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#1e1e1e]" />

              {/* Followers */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-[#74C044]" />
                  <span className="text-[10px] text-[#555] uppercase tracking-widest font-bold">New Followers</span>
                </div>
                <div className="text-3xl font-black text-white">{win.followers}</div>
                <div className="text-sm font-black text-[#74C044]">{win.followerPct}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 py-6 border-t border-[#1e1e1e]">
          {[
            { value: "8+", label: "Clients Shown Above" },
            { value: "60", label: "Days Average Timeline" },
            { value: "200%+", label: "Avg Viewer Growth" },
            { value: "115%+", label: "Avg Follower Growth" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-black text-[#74C044]">{value}</div>
              <div className="text-[10px] text-[#555] uppercase tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
