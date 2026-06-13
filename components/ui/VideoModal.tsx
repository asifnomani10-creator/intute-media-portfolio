"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  embedUrl: string | null;
  title: string;
  onClose: () => void;
  isVertical?: boolean;
}

export default function VideoModal({ embedUrl, title, onClose, isVertical }: Props) {
  useEffect(() => {
    if (!embedUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [embedUrl, onClose]);

  return (
    <AnimatePresence>
      {embedUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative glass-card overflow-hidden ${
              isVertical
                ? "w-auto"
                : "w-full max-w-4xl"
            }`}
            style={isVertical ? { width: "min(360px, 85vw)" } : undefined}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
              <span className="text-sm font-semibold text-white truncate">{title}</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embed */}
            <div className={isVertical ? "aspect-[9/16]" : "aspect-video"}>
              <iframe
                src={`${embedUrl}?autoplay=1&start=0&rel=0&modestbranding=1`}
                className="w-full h-full bg-black"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
