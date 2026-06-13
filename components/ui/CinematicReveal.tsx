"use client";
import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as const;

export default function CinematicReveal() {
  return (
    <>
      {/* Top bar */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[500] bg-black"
        style={{ height: "13vh", transformOrigin: "top" }}
      />
      {/* Bottom bar */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.1 }}
        className="fixed bottom-0 left-0 right-0 z-[500] bg-black"
        style={{ height: "13vh", transformOrigin: "bottom" }}
      />
      {/* Subtle scan line that sweeps down on load */}
      <motion.div
        initial={{ top: "0%", opacity: 0.6 }}
        animate={{ top: "110%", opacity: 0 }}
        transition={{ duration: 1.8, ease: "easeIn", delay: 0.2 }}
        className="fixed left-0 right-0 z-[499] pointer-events-none h-[2px] bg-gradient-to-r from-transparent via-[#74C044]/60 to-transparent"
      />
    </>
  );
}
