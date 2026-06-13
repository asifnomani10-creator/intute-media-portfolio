import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Brands from "@/components/sections/Brands";
import VideoGrid from "@/components/sections/VideoGrid";
import Results from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />

      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Brand trust strip */}
      <Brands />

      {/* 3 — Reel video grid */}
      <VideoGrid />

      {/* 4 — Results / Cash flow metrics */}
      <Results />

      {/* 5 — Our process */}
      <Services />

      {/* 6 — Portfolio tabs */}
      <Portfolio />

      {/* 7 — Why choose us */}
      <About />

      {/* 8 — Testimonials */}
      <Testimonials />

      {/* 9 — Book a Call */}
      <Contact />

      <Footer />
    </main>
  );
}
