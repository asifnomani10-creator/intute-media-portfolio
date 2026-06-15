"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, TrendingUp, Target, Play } from "lucide-react";
import { reelVideos, type ReelVideo } from "@/lib/data";

const realVideos = reelVideos.filter((r) => r.youtubeId !== null);
const doubled = [...realVideos, ...realVideos];

function VideoCard({
  reel,
  onPlay,
  onHoverChange,
}: {
  reel: ReelVideo;
  onPlay: (id: string) => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(false);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    setIframeVisible(false);
    onHoverChange(true);
    revealTimer.current = setTimeout(() => setIframeVisible(true), 600);
  };

  const handleMouseLeave = () => {
    if (revealTimer.current) clearTimeout(revealTimer.current);
    setHovered(false);
    setIframeVisible(false);
    onHoverChange(false);
  };

  return (
    <div
      className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer group border border-[#1e1e1e] hover:border-[#74C044]/60 transition-colors duration-200"
      style={{ width: "180px", height: "320px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => reel.youtubeId && onPlay(reel.youtubeId)}
    >
      {/* Thumbnail — always visible */}
      <Image
        src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
        alt={reel.title}
        fill
        className="object-cover"
        sizes="180px"
        unoptimized
      />

      {/* Iframe on hover with sound */}
      {hovered && (
        <iframe
          src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=0&loop=1&playlist=${reel.youtubeId}&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
          className="absolute inset-0 w-full h-full scale-[1.03] transition-opacity duration-300"
          style={{ opacity: iframeVisible ? 1 : 0 }}
          allow="autoplay; encrypted-media"
          title={reel.title}
        />
      )}

      {/* Click capture */}
      <div className="absolute inset-0 z-10" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-20 pointer-events-none" />

      {/* Play icon shown when not hovered */}
      {!hovered && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-3 pb-3 pointer-events-none">
        {reel.views && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-white">
            <TrendingUp className="w-3 h-3 text-[#74C044]" />
            {reel.views}
          </div>
        )}
        {reel.engagement && (
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#74C044]">
            <Target className="w-3 h-3" />
            {reel.engagement}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const handleHoverChange = (hovered: boolean) => {
    if (stripRef.current) {
      stripRef.current.style.animationPlayState = hovered ? "paused" : "running";
    }
  };

  return (
    <section id="showreel" className="relative py-24 bg-[#0d0d0d] border-y border-[#1e1e1e] overflow-hidden">
      {/* Heading */}
      <div className="mb-12 text-center px-6">
        <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">Our Work</p>
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
          Content That Fits In{" "}
          <span className="text-[#74C044]">Your Customer&apos;s Scroll</span>
        </h2>
        <p className="text-[#666] text-sm mt-3">Hover any video to preview with sound</p>
      </div>

      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }} />

        <div
          ref={stripRef}
          className="flex gap-4 py-2"
          style={{ width: "max-content", animation: "winsScroll 40s linear infinite" }}
        >
          {doubled.map((reel, i) => (
            <VideoCard
              key={`${reel.youtubeId}-${i}`}
              reel={reel}
              onPlay={setActiveId}
              onHoverChange={handleHoverChange}
            />
          ))}
        </div>
      </div>

      {/* Full-play modal */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/92"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 24 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl"
              style={{ width: "min(360px, 90vw)", aspectRatio: "9/16" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                key={activeId}
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&start=0&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video"
              />
            </motion.div>
            <button
              onClick={() => setActiveId(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
