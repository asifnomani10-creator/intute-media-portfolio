"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, X, Plus } from "lucide-react";
import { reelVideos, type ReelVideo } from "@/lib/data";
import SectionWrapper from "@/components/ui/SectionWrapper";

function ReelCard({
  reel,
  onPlay,
}: {
  reel: ReelVideo;
  onPlay: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Swap thumbnail → muted autoplay iframe when card is visible
  useEffect(() => {
    if (!reel.youtubeId) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so rapidly-passing edge cards don't spin up iframes
          timerRef.current = setTimeout(() => setInView(true), 250);
        } else {
          if (timerRef.current) clearTimeout(timerRef.current);
          setInView(false);
        }
      },
      { threshold: 0.4 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reel.youtubeId]);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.07, zIndex: 20 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative shrink-0 w-[200px] h-[356px] rounded-2xl overflow-hidden select-none"
      style={{ transformOrigin: "center center" }}
    >
      {/* ── Content layer ── */}
      {reel.youtubeId ? (
        inView ? (
          <>
            {/* Muted autoplay iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${reel.youtubeId}&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
              className="absolute inset-0 w-full h-full scale-[1.02]"
              allow="autoplay; encrypted-media"
              title={reel.title}
            />
            {/* Transparent click-capture layer — prevents iframe from stealing the click */}
            <div
              className="absolute inset-0 cursor-pointer z-10"
              onClick={() => onPlay(reel.youtubeId!)}
            />
          </>
        ) : (
          /* Static thumbnail while off-screen */
          <Image
            src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
            alt={reel.title}
            fill
            className="object-cover"
            sizes="200px"
            unoptimized
          />
        )
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${reel.gradient}`} />
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none z-20" />

      {/* Hover play button — only shown on thumbnail/gradient state */}
      <AnimatePresence>
        {hovered && !inView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center z-20 pointer-events-none"
          >
            {reel.youtubeId ? (
              <div className="w-12 h-12 rounded-full bg-[#74C044] flex items-center justify-center shadow-lg shadow-[#74C044]/50">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white/60" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-to-play overlay for thumbnail/gradient state */}
      {(!inView || !reel.youtubeId) && (
        <div
          className="absolute inset-0 z-20 cursor-pointer"
          onClick={() => reel.youtubeId && onPlay(reel.youtubeId)}
        />
      )}

      {/* Bottom meta */}
      <div className="absolute bottom-0 inset-x-0 px-3 pb-3 z-30 pointer-events-none">
        <span className="block text-[10px] font-mono text-[#74C044] tracking-widest uppercase mb-0.5">
          {reel.tag}
        </span>
        <span className="block text-xs text-white font-semibold leading-tight truncate">
          {reel.title}
        </span>
      </div>

      {/* Green border glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 rounded-2xl border-2 border-[#74C044]/70 pointer-events-none z-30"
      />
    </motion.div>
  );
}

export default function Showreel() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [stripPaused, setStripPaused] = useState(false);

  // Play from beginning — fresh iframe each open
  const handlePlay = (id: string) => setActiveId(id);

  return (
    <section id="showreel" className="relative py-16 overflow-hidden">
      {/* Section heading */}
      <div className="px-6 max-w-5xl mx-auto">
        <SectionWrapper>
          <h2 className="section-heading">
            My <span className="gradient-text">Short-form Edits</span>
          </h2>
          <p className="section-subtext">
            Videos play as they scroll · Click any to watch full
          </p>
        </SectionWrapper>
      </div>

      {/* Single-track dock */}
      <div
        className="mt-4"
        onMouseEnter={() => setStripPaused(true)}
        onMouseLeave={() => setStripPaused(false)}
      >
        <div className="relative overflow-hidden w-full">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #040B04, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #040B04, transparent)" }} />

          <div
            className="flex gap-5 py-2"
            style={{
              width: "max-content",
              animation: "scrollLeft 70s linear infinite",
              animationPlayState: stripPaused ? "paused" : "running",
            }}
          >
            {/* Two copies is enough for seamless loop */}
            {[...reelVideos, ...reelVideos].map((reel, i) => (
              <ReelCard
                key={`${reel.youtubeId ?? reel.title}-${i}`}
                reel={reel}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-play modal — fresh iframe starts from beginning */}
      <AnimatePresence>
        {activeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            onClick={() => setActiveId(null)}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10 glass-card overflow-hidden"
              style={{ width: "min(360px, 90vw)", aspectRatio: "9/16" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* start=0 ensures it plays from the beginning */}
              <iframe
                key={activeId}
                src={`https://www.youtube.com/embed/${activeId}?autoplay=1&start=0&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Short-form video"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.15 }}
              onClick={() => setActiveId(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 glass-card flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
