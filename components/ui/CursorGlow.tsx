"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Sharp dot — snaps instantly
  const dotX = useMotionValue(-200);
  const dotY = useMotionValue(-200);

  // Spotlight — lags far behind (slow spring)
  const spotX = useSpring(dotX, { stiffness: 55, damping: 18 });
  const spotY = useSpring(dotY, { stiffness: 55, damping: 18 });

  // Mid ring — medium lag
  const ringX = useSpring(dotX, { stiffness: 140, damping: 22 });
  const ringY = useSpring(dotY, { stiffness: 140, damping: 22 });

  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      // Ambient page glow follows cursor exactly
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(116,192,68,0.06) 0%, rgba(74,138,36,0.03) 45%, transparent 70%)`;
      }
      if (!visible) setVisible(true);
    };
    const hide = () => setVisible(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [dotX, dotY, visible]);

  return (
    <>
      {/* Ambient page glow */}
      <div
        ref={glowRef}
        className="fixed inset-0 pointer-events-none z-[1]"
      />

      {/* Spotlight — large soft orb, heavily lagged */}
      <motion.div
        style={{
          x: spotX,
          y: spotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible ? 1 : 0, scale: clicking ? 0.75 : 1 }}
        transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.15 } }}
        className="fixed top-0 left-0 pointer-events-none z-[78]"
      >
        {/* Outer soft glow blob */}
        <div
          className="w-52 h-52 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(116,192,68,0.13) 0%, rgba(116,192,68,0.06) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Mid ring — medium lag, crisp border */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.6 : 1,
        }}
        transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.12 } }}
        className="fixed top-0 left-0 pointer-events-none z-[79] w-9 h-9 rounded-full border border-[#74C044]/40"
      />

      {/* Sharp dot — no spring, instant snap */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.1 } }}
        className="fixed top-0 left-0 pointer-events-none z-[80]"
      >
        <div
          className="w-2 h-2 rounded-full bg-[#74C044]"
          style={{
            boxShadow:
              "0 0 0 1.5px rgba(116,192,68,0.3), 0 0 10px rgba(116,192,68,0.8), 0 0 22px rgba(116,192,68,0.4)",
          }}
        />
      </motion.div>
    </>
  );
}
