"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Our Process", href: "#services" },
  { label: "Client Results", href: "#results" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
];

function IntuteLogo() {
  return (
    <svg width="110" height="44" viewBox="0 0 220 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="44" rx="30" ry="30" fill="white" fillOpacity="0.08" />
      <circle cx="32" cy="46" r="22" fill="white" />
      <circle cx="32" cy="22" r="6" fill="#0a0a0a" />
      <text x="56" y="60" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="900" fontSize="38" fill="white" letterSpacing="-1">ntute</text>
      <circle cx="200" cy="57" r="6" fill="#74C044" />
      <text x="70" y="80" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="500" fontSize="13" fill="#9ca3af" letterSpacing="6">MEDIA</text>
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top urgency bar */}
      <div className="bg-[#74C044] text-[#0a0a0a] text-xs font-black text-center py-2 px-4 tracking-wider flex items-center justify-center gap-8">
        <span className="hidden sm:block">📧 asifnomani10@gmail.com</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a] animate-pulse" />
          LIMITED SLOTS AVAILABLE THIS MONTH — BOOK NOW!
        </span>
      </div>

      {/* Main nav */}
      <nav className="bg-[#0a0a0a] border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="opacity-90 hover:opacity-100 transition-opacity">
            <IntuteLogo />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#888] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex px-5 py-2.5 rounded-lg bg-[#74C044] text-[#0a0a0a] font-black text-xs tracking-widest uppercase hover:bg-[#A0D870] transition-colors"
          >
            Book a Call
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 border border-[#1e1e1e] rounded-lg"
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
              className="md:hidden bg-[#0a0a0a] border-t border-[#1e1e1e] overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#888] hover:text-white transition-colors py-1 font-bold uppercase tracking-widest text-xs"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-2 px-5 py-3 rounded-lg bg-[#74C044] text-[#0a0a0a] font-black text-xs text-center uppercase tracking-widest"
                  onClick={() => setMenuOpen(false)}
                >
                  Book a Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
