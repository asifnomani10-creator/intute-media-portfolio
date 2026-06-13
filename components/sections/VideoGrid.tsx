"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, TrendingUp, Target } from "lucide-react";
import { reelVideos, type ReelVideo } from "@/lib/data";

const realVideos = reelVideos.filter((r) => r.youtubeId !== null);

function VideoCard({ reel, onPlay }: { reel: ReelVideo; onPlay: (id: string) => void }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer.current = setTimeout(() => setInView(true), 200);
        } else {
          if (timer.current) clearTimeout(timer.current);
          setInView(false);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      onClick={() => reel.youtubeId && onPlay(reel.youtubeId)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "9/16" }}
    >
      {/* Video / thumbnail */}
      {inView ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${reel.youtubeId}&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0`}
            className="absolute inset-0 w-full h-full scale-[1.03]"
            allow="autoplay; encrypted-media"
            title={reel.title}
          />
          {/* click-capture prevents iframe from stealing the tap */}
          <div className="absolute inset-0 z-10" />
        </>
      ) : (
        <Image
          src={`https://img.youtube.com/vi/${reel.youtubeId}/hqdefault.jpg`}
          alt={reel.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 20vw"
          unoptimized
        />
      )}

      {/* Bottom gradient + metrics overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 pointer-events-none" />
      {(reel.views || reel.engagement) && (
        <div className="absolute bottom-0 inset-x-0 z-30 px-3 pb-3 flex items-center justify-between pointer-events-none">
          {reel.views && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-white">
              <TrendingUp className="w-3 h-3 text-[#74C044]" />
              {reel.views} views
            </span>
          )}
          {reel.engagement && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#74C044]">
              <Target className="w-3 h-3" />
              {reel.engagement}
            </span>
          )}
        </div>
      )}

      {/* Green border on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#74C044]/0 group-hover:border-[#74C044]/60 transition-colors z-30 pointer-events-none" />
    </motion.div>
  );
}

export default function VideoGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="showreel" className="relative py-24 px-6 bg-[#0d0d0d] border-y border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase">
            Content That Fits In{" "}
            <span className="text-[#74C044]">Your Customer&apos;s Scroll</span>
          </h2>
        </div>

        {/* Grid — 5 cols desktop, 3 tablet, 2 mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {realVideos.map((reel) => (
            <VideoCard key={reel.youtubeId} reel={reel} onPlay={setActiveId} />
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
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90"
            onClick={() => setActiveId(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 24 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
