"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2 } from "lucide-react";
import { reelVideos, type ReelVideo } from "@/lib/data";

// IDs that have a local MP4 in /public/videos/ (no ffmpeg merge needed, format 18)
const LOCAL_IDS = new Set([
  "rN4ZRGtRVK8", "MTHD5movMqg", "vSqfOXZAi84", "zQPrUViR61g",
  "_YRqM9iKRuY", "0Cis6EZHrbU", "QYzTnqrJS0o", "B8PWEd2XXEc",
  "fQ5JzuPLBnE", "3Gy4ItwXOoA", "KhjP0wi4UdA", "M-wPqT2G6Uw",
  "a1OmghR2FrA", "dTil7JSHDaA",
]);

const realVideos = reelVideos.filter((r) => r.youtubeId !== null);
const doubled = [...realVideos, ...realVideos];

function VideoCard({
  reel,
  onPlay,
  onStripHover,
}: {
  reel: ReelVideo;
  onPlay: (id: string) => void;
  onStripHover: (active: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hovered, setHovered] = useState(false);
  const hasLocal = LOCAL_IDS.has(reel.youtubeId!);

  const handleMouseEnter = () => {
    setHovered(true);
    onStripHover(true);
    if (hasLocal && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0.85;
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "unMute", args: [] }),
        "https://www.youtube.com"
      );
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [85] }),
        "https://www.youtube.com"
      );
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    onStripHover(false);
    if (hasLocal && videoRef.current) {
      videoRef.current.muted = true;
    } else {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "mute", args: [] }),
        "https://www.youtube.com"
      );
    }
  };

  return (
    <div
      className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer border border-[#1e1e1e] hover:border-[#74C044]/70 transition-colors duration-200"
      style={{ width: "180px", height: "320px" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => reel.youtubeId && onPlay(reel.youtubeId)}
    >
      {hasLocal ? (
        <video
          ref={videoRef}
          src={`/videos/${reel.youtubeId}.mp4`}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${reel.youtubeId}&controls=0&playsinline=1&rel=0&modestbranding=1&showinfo=0&enablejsapi=1`}
          className="absolute inset-0 w-full h-full scale-[1.03]"
          allow="autoplay; encrypted-media"
          title={reel.title}
        />
      )}

      {/* Transparent click-capture overlay (prevents iframe stealing the click) */}
      <div className="absolute inset-0 z-10" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Sound indicator */}
      {hovered && (
        <div className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-[#74C044] flex items-center justify-center pointer-events-none">
          <Volume2 className="w-3.5 h-3.5 text-[#0a0a0a]" />
        </div>
      )}

      {/* Metrics */}
      <div className="absolute bottom-0 inset-x-0 z-30 px-3 pb-3 pointer-events-none">
        {reel.views && (
          <p className="text-[10px] font-bold text-white">{reel.views} views</p>
        )}
        {reel.engagement && (
          <p className="text-[10px] font-bold text-[#74C044]">{reel.engagement}</p>
        )}
      </div>
    </div>
  );
}

export default function VideoGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const handleStripHover = (active: boolean) => {
    if (stripRef.current) {
      stripRef.current.style.animationPlayState = active ? "paused" : "running";
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
        <p className="text-[#555] text-sm mt-3 uppercase tracking-widest font-bold">
          Hover any video to hear the sound
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }}
        />

        <div
          ref={stripRef}
          className="flex gap-4 py-2"
          style={{ width: "max-content", animation: "winsScroll 45s linear infinite" }}
        >
          {doubled.map((reel, i) => (
            <VideoCard
              key={`${reel.youtubeId}-${i}`}
              reel={reel}
              onPlay={setActiveId}
              onStripHover={handleStripHover}
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
              {LOCAL_IDS.has(activeId) ? (
                <video
                  key={activeId}
                  src={`/videos/${activeId}.mp4`}
                  className="w-full h-full object-cover"
                  autoPlay
                  controls
                  playsInline
                />
              ) : (
                <iframe
                  key={activeId}
                  src={`https://www.youtube.com/embed/${activeId}?autoplay=1&start=0&rel=0&modestbranding=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video"
                />
              )}
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
