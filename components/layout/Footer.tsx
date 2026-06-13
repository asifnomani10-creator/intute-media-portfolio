import { Camera, PlayCircle, Briefcase, Mail, MapPin } from "lucide-react";

function IntuteLogo() {
  return (
    <svg width="100" height="40" viewBox="0 0 220 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="44" rx="30" ry="30" fill="white" fillOpacity="0.08" />
      <circle cx="32" cy="46" r="22" fill="white" />
      <circle cx="32" cy="22" r="6" fill="#0a0a0a" />
      <text x="56" y="60" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="900" fontSize="38" fill="white" letterSpacing="-1">ntute</text>
      <circle cx="200" cy="57" r="6" fill="#74C044" />
      <text x="70" y="80" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="500" fontSize="13" fill="#9ca3af" letterSpacing="6">MEDIA</text>
    </svg>
  );
}

const quickLinks = ["Home", "Our Process", "About Us", "Client Results", "Portfolio"];
const serviceLinks = ["Short-form Reels", "YouTube Editing", "VSL / Sales Video", "Color Grading", "Motion Graphics", "Book a Call"];
const socialLinks = [
  { icon: Camera,     href: "#",                            label: "Instagram" },
  { icon: PlayCircle, href: "#",                            label: "YouTube" },
  { icon: Briefcase,  href: "#",                            label: "LinkedIn" },
  { icon: Mail,       href: "mailto:asifnomani10@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <IntuteLogo />
            <p className="text-[#555] text-sm leading-relaxed">
              We craft video content strategies that drive growth. From short-form reels to VSLs,
              we help brands create content that connects and converts.
            </p>
            <p className="text-[#444] text-[10px] font-black italic uppercase tracking-wider">
              Based in India — Working Worldwide
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#555] text-sm hover:text-[#74C044] transition-colors font-medium">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6">Services</h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[#555] text-sm hover:text-[#74C044] transition-colors font-medium">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6">Contact Info</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#1e1e1e] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#74C044]" />
                </div>
                <div>
                  <p className="text-[#74C044] text-[9px] font-black uppercase tracking-[0.3em] mb-1">Email Address</p>
                  <p className="text-[#666] text-xs">asifnomani10@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#111] border border-[#1e1e1e] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#74C044]" />
                </div>
                <div>
                  <p className="text-[#74C044] text-[9px] font-black uppercase tracking-[0.3em] mb-1">Location</p>
                  <p className="text-[#666] text-xs">India — Working Globally</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1e1e1e] pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-[#444] text-xs uppercase tracking-widest">
            © 2026 Intute Media. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-[#111] border border-[#1e1e1e] flex items-center justify-center hover:border-[#74C044]/40 hover:bg-[#74C044]/10 transition-all"
              >
                <Icon className="w-4 h-4 text-[#555] hover:text-[#74C044]" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 text-[#444] text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
