"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Camera, PlayCircle, Briefcase, Mail, MessageCircle } from "lucide-react";

const bullets = [
  "Free content audit, upfront — no strings attached",
  "Custom video strategy roadmap for your niche",
  "No obligation. Just clarity and a clear plan.",
];

const socials = [
  { icon: Camera,        label: "Instagram", href: "#" },
  { icon: PlayCircle,    label: "YouTube",   href: "#" },
  { icon: Briefcase,     label: "LinkedIn",  href: "#" },
  { icon: Mail,          label: "Email",     href: "mailto:asifnomani10@gmail.com" },
  { icon: MessageCircle, label: "WhatsApp",  href: "#" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section id="contact" className="relative py-24 px-6 bg-[#0d0d0d] border-t border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#74C044] mb-4">
            Schedule Your Discovery Call Now
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight">
            Book Your{" "}
            <span className="text-[#74C044]">Strategy Session!</span>
          </h2>
          <p className="text-[#777] text-base mt-5 max-w-lg mx-auto">
            Secure a slot and embark on the journey to elevate your content with our proven
            Video Creation Blueprint.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* ── Left: copy + bullets ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-black text-white uppercase leading-tight mb-4">
                Ready to Transform
                <br />
                <span className="text-[#74C044]">Your Content?</span>
              </h3>
              <p className="text-[#888] text-sm leading-relaxed max-w-md">
                Book a free 30-minute strategy call. We&apos;ll map out exactly how to grow your views,
                watch time, and revenue — no fluff, just a clear actionable plan.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#74C044] mt-0.5 shrink-0" />
                  <span className="text-[#bbb] text-sm">{b}</span>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-[#111] border border-[#1e1e1e] rounded-lg flex items-center justify-center text-[#555] hover:text-[#74C044] hover:border-[#74C044]/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-8">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#74C044] flex items-center justify-center text-2xl font-black text-[#0a0a0a] shadow-lg shadow-[#74C044]/30">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase">Message Sent!</h3>
                    <p className="text-[#777] text-sm mt-2">I&apos;ll reply within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name: "", email: "", type: "", message: "" }); }}
                    className="text-sm text-[#74C044] hover:text-[#A0D870] transition-colors font-bold uppercase tracking-wider"
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name",  type: "text",  label: "Name",  placeholder: "Your name" },
                      { key: "email", type: "email", label: "Email", placeholder: "you@email.com" },
                    ].map(({ key, type, label, placeholder }) => (
                      <div key={key} className="flex flex-col gap-1.5">
                        <label className="text-[#555] text-[10px] font-black tracking-widest uppercase">{label}</label>
                        <input
                          required
                          type={type}
                          placeholder={placeholder}
                          value={form[key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                          className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] outline-none focus:border-[#74C044]/40 transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#555] text-[10px] font-black tracking-widest uppercase">Project Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#74C044]/40 transition-colors"
                    >
                      <option value="">Select type…</option>
                      <option>YouTube Long-form</option>
                      <option>Short-form Reels</option>
                      <option>VSL / Sales Video</option>
                      <option>Color Grading</option>
                      <option>Motion Graphics</option>
                      <option>Podcast Editing</option>
                      <option>Commercial / Ad</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#555] text-[10px] font-black tracking-widest uppercase">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl px-4 py-3 text-sm text-white placeholder-[#444] outline-none focus:border-[#74C044]/40 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 rounded-lg bg-[#74C044] text-[#0a0a0a] font-black text-sm tracking-widest uppercase hover:bg-[#A0D870] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                          className="w-4 h-4 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Book a Strategy Call
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
