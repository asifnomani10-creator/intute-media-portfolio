import { Camera, PlayCircle, Briefcase, Mail } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/data";

function IntuteLogoSmall() {
  return (
    <svg width="28" height="28" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="30" r="22" fill="white" />
      <circle cx="22" cy="18" r="5" fill="#040B04" />
      <circle cx="54" cy="44" r="6" fill="#74C044" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2.5">
            <IntuteLogoSmall />
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm tracking-tight text-white">
                intute<span className="text-[#74C044]">.</span>
              </span>
              <span className="text-[8px] tracking-[0.25em] text-slate-400 uppercase font-medium">
                media
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-1">{BRAND_TAGLINE}</p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          {[
            { icon: Camera, href: "#", label: "Instagram" },
            { icon: PlayCircle, href: "#", label: "YouTube" },
            { icon: Briefcase, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "mailto:asifnomani10@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="glass-card p-2.5 hover:bg-[#74C044]/10 hover:border-[#74C044]/30 transition-all duration-200 hover:scale-110"
            >
              <Icon className="w-4 h-4 text-slate-400 hover:text-[#74C044]" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} {BRAND_NAME}
        </p>
      </div>
    </footer>
  );
}
