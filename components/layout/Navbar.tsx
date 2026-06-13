"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
];

function IntuteLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="30" r="22" fill="white" />
      <circle cx="22" cy="18" r="5" fill="#040B04" />
      <circle cx="54" cy="44" r="6" fill="#74C044" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040B04]/80 backdrop-blur-xl border-b border-white/8 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <IntuteLogo size={34} />
          <div className="flex flex-col leading-none">
            <span className="font-black text-base tracking-tight text-white group-hover:text-[#74C044] transition-colors">
              intute<span className="text-[#74C044]">.</span>
            </span>
            <span className="text-[9px] tracking-[0.25em] text-slate-500 uppercase font-medium">
              media
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors text-sm font-medium relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#74C044] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* REC dot + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 font-mono text-[11px] text-red-400/80"
            >
              <motion.div
                animate={{ opacity: [1, 0.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.15 }}
                className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
              />
              <span className="tracking-wider font-semibold">REC</span>
            </motion.div>
          )}
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full bg-[#74C044] text-[#040B04] font-bold text-sm tracking-wide hover:bg-[#A0D870] transition-colors"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden glass-card p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#040B04]/90 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-300 hover:text-[#74C044] transition-colors py-1 font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-2 px-5 py-3 rounded-full bg-[#74C044] text-[#040B04] font-bold text-sm text-center"
                onClick={() => setMenuOpen(false)}
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
