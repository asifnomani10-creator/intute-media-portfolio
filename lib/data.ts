export const BRAND_NAME = "Intute Media";
export const BRAND_TAGLINE = "We Turn Raw Footage Into Revenue.";
export const SHOWREEL_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with real showreel

export const stats = [
  { value: "500M+", label: "Total Views Generated" },
  { value: "50+", label: "Brands Served" },
  { value: "1000+", label: "Videos Created" },
  { value: "3+", label: "Years Experience" },
];

export const brands = [
  "FitCore", "FinanceEdge", "Luminary", "TrueScale",
  "CreatorPro", "NovaBrand", "PixelHouse", "WaveMedia",
  "BoldStudio", "UpShift",
];

export interface ResultMetric {
  label: string;
  subLabel: string;
  lift: string;
  beforeVal: string;
  afterVal: string;
  beforePct: number;
  afterPct: number;
}

export const results: ResultMetric[] = [
  {
    label: "Views Generated",
    subLabel: "monthly average",
    lift: "+625%",
    beforeVal: "12K",
    afterVal: "87K",
    beforePct: 14,
    afterPct: 100,
  },
  {
    label: "Watch Time",
    subLabel: "avg per video",
    lift: "+188%",
    beforeVal: "0:45",
    afterVal: "2:10",
    beforePct: 26,
    afterPct: 100,
  },
  {
    label: "Engagement Rate",
    subLabel: "likes + comments",
    lift: "+252%",
    beforeVal: "2.1%",
    afterVal: "7.4%",
    beforePct: 22,
    afterPct: 100,
  },
  {
    label: "Client Retention",
    subLabel: "stay 3+ months",
    lift: "94%",
    beforeVal: "",
    afterVal: "94%",
    beforePct: 0,
    afterPct: 94,
  },
];

export const services = [
  {
    icon: "Youtube",
    title: "YouTube Long-form",
    description:
      "Engaging edits for vlogs, tutorials, podcasts, and documentaries that keep viewers watching till the end.",
    gradient: "from-red-500 to-pink-600",
  },
  {
    icon: "Smartphone",
    title: "Short-form Reels",
    description:
      "Viral-ready Reels, TikToks, and YouTube Shorts with punchy cuts, captions, and trending audio.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: "Palette",
    title: "Color Grading",
    description:
      "Cinematic color correction and grading to give your footage a premium, consistent visual identity.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: "Layers",
    title: "Motion Graphics",
    description:
      "Dynamic lower thirds, intros, outros, and animated text that elevate your brand's on-screen presence.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: "Mic2",
    title: "Podcast Editing",
    description:
      "Clean audio mixing, filler removal, chapter cuts, and audiogram creation for professional podcast episodes.",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    icon: "Film",
    title: "Commercial & Ads",
    description:
      "High-impact ad creatives and product videos optimized for conversions across all social platforms.",
    gradient: "from-amber-500 to-orange-600",
  },
];

export type PortfolioCategory = "All" | "YouTube" | "Reels" | "VSL" | "Commercial";

export interface PortfolioItem {
  id: number;
  title: string;
  category: PortfolioCategory;
  thumbnail: string;        // Tailwind gradient classes for placeholders
  youtubeId?: string;       // When set, uses YouTube thumbnail image instead of gradient
  embedUrl?: string;        // YouTube embed URL for in-page modal playback
  description: string;
  watchUrl: string;
  isVertical?: boolean;     // true for 9:16 Shorts/Reels
}

export const portfolioItems: PortfolioItem[] = [
  // ── Reels / Shorts ──────────────────────────────────────────────────
  {
    id: 1,
    title: "Fitness Niche",
    category: "Reels",
    thumbnail: "from-pink-500 to-rose-600",
    youtubeId: "rN4ZRGtRVK8",
    embedUrl: "https://www.youtube.com/embed/rN4ZRGtRVK8",
    description: "High-energy fitness edit — punchy cuts, motion FX",
    watchUrl: "https://www.youtube.com/watch?v=rN4ZRGtRVK8",
    isVertical: true,
  },
  {
    id: 2,
    title: "Finance Credit",
    category: "Reels",
    thumbnail: "from-blue-500 to-indigo-600",
    youtubeId: "MTHD5movMqg",
    embedUrl: "https://www.youtube.com/embed/MTHD5movMqg",
    description: "Finance niche short — clean pacing, on-screen text",
    watchUrl: "https://www.youtube.com/watch?v=MTHD5movMqg",
    isVertical: true,
  },
  {
    id: 9,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-violet-500 to-purple-600",
    youtubeId: "vSqfOXZAi84",
    embedUrl: "https://www.youtube.com/embed/vSqfOXZAi84",
    description: "Vertical short — fast cuts, trending audio sync",
    watchUrl: "https://www.youtube.com/watch?v=vSqfOXZAi84",
    isVertical: true,
  },
  {
    id: 10,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-cyan-500 to-blue-600",
    youtubeId: "zQPrUViR61g",
    embedUrl: "https://www.youtube.com/embed/zQPrUViR61g",
    description: "Vertical short — dynamic pacing and captions",
    watchUrl: "https://www.youtube.com/watch?v=zQPrUViR61g",
    isVertical: true,
  },
  {
    id: 11,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-emerald-500 to-teal-600",
    youtubeId: "_YRqM9iKRuY",
    embedUrl: "https://www.youtube.com/embed/_YRqM9iKRuY",
    description: "Engaging short — hook-first structure",
    watchUrl: "https://www.youtube.com/watch?v=_YRqM9iKRuY",
    isVertical: true,
  },
  {
    id: 12,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-orange-500 to-amber-600",
    youtubeId: "0Cis6EZHrbU",
    embedUrl: "https://www.youtube.com/embed/0Cis6EZHrbU",
    description: "Viral-ready short with motion text overlays",
    watchUrl: "https://www.youtube.com/watch?v=0Cis6EZHrbU",
    isVertical: true,
  },
  {
    id: 13,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-indigo-500 to-violet-600",
    youtubeId: "QYzTnqrJS0o",
    embedUrl: "https://www.youtube.com/embed/QYzTnqrJS0o",
    description: "Short-form content — punchy edits, sound design",
    watchUrl: "https://www.youtube.com/watch?v=QYzTnqrJS0o",
    isVertical: true,
  },
  {
    id: 14,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-rose-500 to-pink-600",
    youtubeId: "B8PWEd2XXEc",
    embedUrl: "https://www.youtube.com/embed/B8PWEd2XXEc",
    description: "High-retention short — cinematic grade",
    watchUrl: "https://www.youtube.com/watch?v=B8PWEd2XXEc",
    isVertical: true,
  },
  {
    id: 15,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-teal-500 to-emerald-600",
    youtubeId: "fQ5JzuPLBnE",
    embedUrl: "https://www.youtube.com/embed/fQ5JzuPLBnE",
    description: "Scroll-stopping short — bold captions, clean cuts",
    watchUrl: "https://www.youtube.com/watch?v=fQ5JzuPLBnE",
    isVertical: true,
  },
  {
    id: 16,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-sky-500 to-blue-600",
    youtubeId: "3Gy4ItwXOoA",
    embedUrl: "https://www.youtube.com/embed/3Gy4ItwXOoA",
    description: "Viral short — punchy pacing, motion text",
    watchUrl: "https://www.youtube.com/watch?v=3Gy4ItwXOoA",
    isVertical: true,
  },
  {
    id: 17,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-fuchsia-500 to-pink-600",
    youtubeId: "KhjP0wi4UdA",
    embedUrl: "https://www.youtube.com/embed/KhjP0wi4UdA",
    description: "Hook-first short — bold captions, fast cuts",
    watchUrl: "https://www.youtube.com/watch?v=KhjP0wi4UdA",
    isVertical: true,
  },
  {
    id: 18,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-lime-500 to-green-600",
    youtubeId: "M-wPqT2G6Uw",
    embedUrl: "https://www.youtube.com/embed/M-wPqT2G6Uw",
    description: "High-energy short — trending audio sync",
    watchUrl: "https://www.youtube.com/watch?v=M-wPqT2G6Uw",
    isVertical: true,
  },
  {
    id: 19,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-amber-500 to-yellow-600",
    youtubeId: "a1OmghR2FrA",
    embedUrl: "https://www.youtube.com/embed/a1OmghR2FrA",
    description: "Scroll-stopping short — cinematic color grade",
    watchUrl: "https://www.youtube.com/watch?v=a1OmghR2FrA",
    isVertical: true,
  },
  {
    id: 24,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-red-500 to-rose-600",
    youtubeId: "dTil7JSHDaA",
    embedUrl: "https://www.youtube.com/embed/dTil7JSHDaA",
    description: "Dynamic short — sound design, motion FX",
    watchUrl: "https://www.youtube.com/watch?v=dTil7JSHDaA",
    isVertical: true,
  },
  {
    id: 25,
    title: "Short Form Edit",
    category: "Reels",
    thumbnail: "from-purple-500 to-violet-600",
    youtubeId: "eBFfzGXUfUk",
    embedUrl: "https://www.youtube.com/embed/eBFfzGXUfUk",
    description: "Clean short — sharp cuts, bold typography",
    watchUrl: "https://www.youtube.com/watch?v=eBFfzGXUfUk",
    isVertical: true,
  },

  // ── VSL (Video Sales Letters) ────────────────────────────────────────
  {
    id: 20,
    title: "VSL Edit",
    category: "VSL",
    thumbnail: "from-slate-600 to-zinc-700",
    youtubeId: "WOSg4m1b9SQ",
    embedUrl: "https://www.youtube.com/embed/WOSg4m1b9SQ",
    description: "High-converting video sales letter — persuasive pacing",
    watchUrl: "https://www.youtube.com/watch?v=WOSg4m1b9SQ",
  },
  {
    id: 21,
    title: "VSL Edit",
    category: "VSL",
    thumbnail: "from-zinc-600 to-neutral-700",
    youtubeId: "ZJ7Ew2sm8vs",
    embedUrl: "https://www.youtube.com/embed/ZJ7Ew2sm8vs",
    description: "Sales-optimised edit — clear narrative arc",
    watchUrl: "https://www.youtube.com/watch?v=ZJ7Ew2sm8vs",
  },
  {
    id: 22,
    title: "VSL Edit",
    category: "VSL",
    thumbnail: "from-neutral-600 to-stone-700",
    youtubeId: "M1CJ23R6rSQ",
    embedUrl: "https://www.youtube.com/embed/M1CJ23R6rSQ",
    description: "Conversion-focused VSL — emotional hooks, strong CTA",
    watchUrl: "https://www.youtube.com/watch?v=M1CJ23R6rSQ",
  },
  {
    id: 23,
    title: "VSL Edit",
    category: "VSL",
    thumbnail: "from-stone-600 to-slate-700",
    youtubeId: "7pvRGyJYR0M",
    embedUrl: "https://www.youtube.com/embed/7pvRGyJYR0M",
    description: "Long-form sales video — professional colour grade",
    watchUrl: "https://www.youtube.com/watch?v=7pvRGyJYR0M",
  },

  // ── YouTube ─────────────────────────────────────────────────────────
  {
    id: 4,
    title: "Travel Vlog Series",
    category: "YouTube",
    thumbnail: "from-cyan-500 to-blue-600",
    description: "12-episode travel documentary series",
    watchUrl: "#",
  },
  {
    id: 7,
    title: "Podcast: Startup Stories",
    category: "YouTube",
    thumbnail: "from-violet-500 to-purple-700",
    description: "Weekly podcast edit with audiogram clips",
    watchUrl: "#",
  },

  // ── Commercial ──────────────────────────────────────────────────────
  {
    id: 3,
    title: "Tech Product Launch",
    category: "Commercial",
    thumbnail: "from-purple-600 to-cyan-600",
    description: "60s ad cut for a SaaS product launch campaign",
    watchUrl: "#",
  },
  {
    id: 5,
    title: "Fashion Brand Promo",
    category: "Commercial",
    thumbnail: "from-amber-500 to-pink-500",
    description: "Instagram ad series for clothing brand",
    watchUrl: "#",
  },
];

export interface ReelVideo {
  youtubeId: string | null;
  title: string;
  tag: string;
  gradient: string;
  views?: string;
  engagement?: string;
}

export const reelVideos: ReelVideo[] = [
  { youtubeId: "rN4ZRGtRVK8", title: "Fitness Niche",  tag: "Fitness", gradient: "from-pink-600 to-rose-700",    views: "1.8M",  engagement: "18.3%" },
  { youtubeId: "MTHD5movMqg", title: "Finance Credit", tag: "Finance", gradient: "from-blue-600 to-indigo-700",  views: "1.2M",  engagement: "15.4%" },
  { youtubeId: "vSqfOXZAi84", title: "Short Edit",     tag: "Reels",   gradient: "from-violet-600 to-purple-700",views: "847K",  engagement: "12.8%" },
  { youtubeId: "zQPrUViR61g", title: "Short Edit",     tag: "Reels",   gradient: "from-cyan-600 to-blue-700",    views: "634K",  engagement: "11.2%" },
  { youtubeId: "_YRqM9iKRuY", title: "Short Edit",     tag: "Reels",   gradient: "from-emerald-600 to-teal-700", views: "923K",  engagement: "14.1%" },
  { youtubeId: "0Cis6EZHrbU", title: "Short Edit",     tag: "Reels",   gradient: "from-orange-600 to-amber-700", views: "756K",  engagement: "13.5%" },
  { youtubeId: "QYzTnqrJS0o", title: "Short Edit",     tag: "Reels",   gradient: "from-indigo-600 to-violet-700",views: "1.1M",  engagement: "16.2%" },
  { youtubeId: "B8PWEd2XXEc", title: "Short Edit",     tag: "Reels",   gradient: "from-rose-600 to-pink-700",    views: "892K",  engagement: "14.8%" },
  { youtubeId: "fQ5JzuPLBnE", title: "Short Edit",     tag: "Reels",   gradient: "from-teal-600 to-emerald-700", views: "567K",  engagement: "10.9%" },
  { youtubeId: "3Gy4ItwXOoA", title: "Short Edit",     tag: "Reels",   gradient: "from-sky-600 to-blue-700",     views: "",      engagement: "" },
  { youtubeId: "KhjP0wi4UdA", title: "Short Edit",     tag: "Reels",   gradient: "from-fuchsia-600 to-pink-700", views: "",      engagement: "" },
  { youtubeId: "M-wPqT2G6Uw", title: "Short Edit",     tag: "Reels",   gradient: "from-lime-600 to-green-700",   views: "",      engagement: "" },
  { youtubeId: "a1OmghR2FrA", title: "Short Edit",     tag: "Reels",   gradient: "from-amber-600 to-yellow-700", views: "",      engagement: "" },
  { youtubeId: "dTil7JSHDaA", title: "Short Edit",     tag: "Reels",   gradient: "from-red-600 to-rose-700",     views: "",      engagement: "" },
  { youtubeId: "eBFfzGXUfUk", title: "Short Edit",     tag: "Reels",   gradient: "from-purple-600 to-violet-700",views: "",      engagement: "" },
];

export const testimonials = [
  {
    name: "Sarah K.",
    role: "YouTuber · 450K subscribers",
    quote:
      "Asif completely transformed my channel's look. The edits are cinematic, fast-paced, and my watch time jumped 40% within a month!",
    stars: 5,
    metric: "Watch time +40%",
  },
  {
    name: "Marcus T.",
    role: "Founder, BrandFlow Agency",
    quote:
      "Our ad creatives finally look like they belong in primetime. Asif delivered everything ahead of schedule with zero back-and-forth.",
    stars: 5,
    metric: "Ads CTR +2.4×",
  },
  {
    name: "Priya R.",
    role: "Lifestyle Creator · 200K followers",
    quote:
      "Every Reel Asif edits goes viral. He just gets the vibe, the pacing, the audio sync — it's like he reads my mind.",
    stars: 5,
    metric: "Views +320%",
  },
  {
    name: "Jake M.",
    role: "Podcast Host, The Grind Daily",
    quote:
      "My podcast sounds and looks professional now. Asif handles everything — audio, chapters, audiograms. Highly recommend.",
    stars: 5,
    metric: "Listener retention +55%",
  },
  {
    name: "Nina L.",
    role: "E-commerce Brand Owner",
    quote:
      "The product videos Asif made for us doubled our conversion rate. Premium quality, fair price, fast turnaround.",
    stars: 5,
    metric: "Conversions ×2",
  },
];

export const tools = [
  { name: "Premiere Pro", color: "text-purple-400" },
  { name: "After Effects", color: "text-blue-400" },
  { name: "DaVinci Resolve", color: "text-cyan-400" },
  { name: "CapCut", color: "text-pink-400" },
  { name: "Audition", color: "text-green-400" },
  { name: "Photoshop", color: "text-orange-400" },
];

export const skills = [
  { label: "Video Editing", percent: 98 },
  { label: "Color Grading", percent: 92 },
  { label: "Motion Graphics", percent: 85 },
  { label: "Audio Mixing", percent: 88 },
  { label: "Short-form Content", percent: 96 },
];
