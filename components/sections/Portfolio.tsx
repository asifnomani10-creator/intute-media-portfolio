"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import VideoModal from "@/components/ui/VideoModal";
import { portfolioItems, PortfolioCategory, PortfolioItem } from "@/lib/data";

const categories: PortfolioCategory[] = ["All", "Reels", "VSL", "YouTube", "Commercial"];

function PortfolioCard({
  item,
  onPlay,
}: {
  item: PortfolioItem;
  onPlay: (item: PortfolioItem) => void;
}) {
  const hasVideo = !!item.embedUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={() => hasVideo && onPlay(item)}
      className={`glass-card-hover overflow-hidden group ${hasVideo ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        {item.youtubeId ? (
          <Image
            src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${item.thumbnail}`} />
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 shadow-xl">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Live badge for real videos */}
        {hasVideo && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#4A8A24] to-[#74C044] text-xs text-white font-medium shadow-lg">
            ▶ Watch
          </span>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white border border-white/20">
          {item.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="font-semibold text-white text-sm leading-snug">{item.title}</h3>
        <p className="text-slate-500 text-xs">{item.description}</p>

        {hasVideo ? (
          <button
            onClick={(e) => { e.stopPropagation(); onPlay(item); }}
            className="flex items-center gap-1 text-[#74C044] hover:text-[#A0D870] text-xs mt-2 transition-colors w-fit"
          >
            Play in page <Play className="w-3 h-3 fill-current" />
          </button>
        ) : (
          <a
            href={item.watchUrl}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-400 text-xs mt-2 transition-colors w-fit"
          >
            Coming soon <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory>("All");
  const [playing, setPlaying] = useState<PortfolioItem | null>(null);

  const filtered =
    active === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper>
          <h2 className="section-heading">
            My <span className="gradient-text">Work</span>
          </h2>
          <p className="section-subtext">
            A selection of projects across formats and industries.
          </p>
        </SectionWrapper>

        {/* Filter tabs */}
        <SectionWrapper delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "text-white"
                    : "text-slate-400 hover:text-white glass-card hover:bg-white/10"
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4A8A24] to-[#74C044]"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </SectionWrapper>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <PortfolioCard key={item.id} item={item} onPlay={setPlaying} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video modal */}
      <VideoModal
        embedUrl={playing?.embedUrl ?? null}
        title={playing?.title ?? ""}
        onClose={() => setPlaying(null)}
        isVertical={playing?.isVertical}
      />
    </section>
  );
}
