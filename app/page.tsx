import GlowOrbs from "@/components/ui/GlowOrbs";
import CursorGlow from "@/components/ui/CursorGlow";
import FilmGrain from "@/components/ui/FilmGrain";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CinematicReveal from "@/components/ui/CinematicReveal";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import Stats from "@/components/sections/Stats";
import VideoGrid from "@/components/sections/VideoGrid";
import Results from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#040B04] overflow-x-hidden cursor-none">
      <CinematicReveal />
      <ScrollProgress />
      <FilmGrain />
      <GlowOrbs />
      <CursorGlow />
      <Navbar />

      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Brand logos trust strip */}
      <Brands />

      {/* 3 — 3-stat row with green icons */}
      <Stats />

      {/* 4 — Video grid with metrics ("We Make Content That Fits…") */}
      <VideoGrid />

      {/* 5 — Before/After performance metrics */}
      <Results />

      {/* 6 — Services */}
      <Services />

      {/* 7 — Portfolio tabs (Reels · VSL · YouTube · Commercial) */}
      <Portfolio />

      {/* 8 — About */}
      <About />

      {/* 9 — Testimonials 2×2 */}
      <Testimonials />

      {/* 10 — Book a Call / Contact */}
      <Contact />

      <Footer />
    </main>
  );
}
