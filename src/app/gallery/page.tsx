"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ExternalLink, Sparkles, Flame, Heart, Camera } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  caption: string;
  category: "Pooja & Homa" | "Community Seva" | "Sacred Art & Idols" | "Festivals & Events";
  link?: string;
  linkText?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g-1",
    src: "/images/sacred_homa_fire_1790597364613.jpg",
    title: "Maha Ganapathi Sacred Homa",
    caption: "Sacred Agni fire sacrifice invoking divine presence with samidhas and pure cow ghee.",
    category: "Pooja & Homa",
    link: "/seva/maha-ganapathi-homa",
    linkText: "Book Homa",
  },
  {
    id: "g-2",
    src: "/images/temple_aarti_ceremony_1790597350613.jpg",
    title: "Maha Aarti & Deepa Aradhana",
    caption: "Evening camphor aarti illuminated with thousands of glowing brass lamps and ringing bells.",
    category: "Festivals & Events",
    link: "/seva/maha-rudrabhisheka",
    linkText: "View Pooja",
  },
  {
    id: "g-3",
    src: "/images/ganesha_idol_1790594652426.jpg",
    title: "Handcrafted Brass Ganesha",
    caption: "Intricately sculpted panchaloha and brass murtis consecrated with traditional mantras.",
    category: "Sacred Art & Idols",
    link: "/shop?category=decor",
    linkText: "Explore Idols",
  },
  {
    id: "g-4",
    src: "/images/pooja_thali_set_1790594617235.jpg",
    title: "Daily Annadanam Preparation",
    caption: "Sacred satvik food offerings prepared daily for pilgrims, sadhus, and families in need.",
    category: "Community Seva",
    link: "/seva/annadanam-support",
    linkText: "Support Seva",
  },
  {
    id: "g-5",
    src: "/images/lakshmi_idol_1790600292175.jpg",
    title: "Shri Mahalakshmi Sanctum",
    caption: "Auspicious Dhanakarshana archana offered with fresh lotus petals and Sri Suktam chanting.",
    category: "Pooja & Homa",
    link: "/seva/shri-mahalakshmi-puja",
    linkText: "Book Puja",
  },
  {
    id: "g-6",
    src: "/images/spiritual_book_1790594667780.jpg",
    title: "Vidyadaan: Vedic Manuscript Preservation",
    caption: "Preserving sacred Vedic texts and supporting young disciples in traditional Gurukulas.",
    category: "Community Seva",
    link: "/seva/vidyadaan-initiative",
    linkText: "Sponsor Student",
  },
  {
    id: "g-7",
    src: "/images/c61b827d-c793-41af-9391-20d3751c5527.png",
    title: "Historic Temple Restoration",
    caption: "Revitalizing neglected ancient temple stone carvings, sanctums, and heritage architecture.",
    category: "Community Seva",
    link: "/seva/temple-restoration",
    linkText: "Join Restoration",
  },
  {
    id: "g-8",
    src: "/images/devotional_kirtan_music_1790597394806.jpg",
    title: "Akhanda Bhajans & Kirtan",
    caption: "Devotees uniting in soulful chanting of divine names, filling hearts with bhakti and peace.",
    category: "Festivals & Events",
    link: "/events",
    linkText: "View Events",
  },
  {
    id: "g-9",
    src: "/images/meditation_nature_peace_1790597381129.jpg",
    title: "Sacred Goshala Sanctuary",
    caption: "Providing green pastures, organic fodder, and loving medical care to indigenous cows.",
    category: "Community Seva",
    link: "/seva/goshala-maintenance",
    linkText: "Gau Mata Seva",
  },
  {
    id: "g-10",
    src: "/images/rudraksha_mala_1790594628771.jpg",
    title: "Consecrated Rudraksha Malas",
    caption: "Authentic Himalayan 108+1 beads energized at the altar of Lord Shiva for meditation.",
    category: "Sacred Art & Idols",
    link: "/shop?category=puja-essentials",
    linkText: "Shop Rudraksha",
  },
  {
    id: "g-11",
    src: "/images/incense_sticks_1790594641127.jpg",
    title: "Natural Temple Dhoop & Incense",
    caption: "Hand-rolled organic incense crafted from sacred herbs, temple flowers, and pure resins.",
    category: "Sacred Art & Idols",
    link: "/shop",
    linkText: "Shop Incense",
  },
  {
    id: "g-12",
    src: "/images/f83160f2-e296-429f-b981-6ad98ac5b923.png",
    title: "Festival Puja Box & Brass Diya",
    caption: "Complete festive setup for Diwali, Navratri, and auspicious family celebrations.",
    category: "Festivals & Events",
    link: "/shop",
    linkText: "Shop Collection",
  },
];

export default function GalleryPage() {
  const categories = [
    "All",
    "Pooja & Homa",
    "Community Seva",
    "Sacred Art & Idols",
    "Festivals & Events",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-sand/15 min-h-screen pt-32 pb-24 text-charcoal">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <span className="text-[11px] md:text-xs font-semibold tracking-widest uppercase text-accent mb-3 block flex items-center justify-center gap-1.5">
            <Camera className="w-4 h-4" /> Sacred Impressions
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-charcoal mb-4 leading-tight">
            Divine Gallery
          </h1>
          <p className="text-base sm:text-lg font-light text-near-black/70 leading-relaxed">
            Witness the grandeur of sacred Vedic rituals, compassionate community seva, and consecrated divine craftsmanship in our visual chronicle.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full transition-all duration-200 text-xs font-semibold tracking-wider uppercase border ${
                activeCategory === cat
                  ? "bg-near-black text-ivory border-near-black shadow-md"
                  : "bg-white text-charcoal/80 border-near-black/10 hover:border-near-black/30 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-near-black/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-near-black">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/90 text-charcoal backdrop-blur-md shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h3 className="text-ivory font-heading text-xl font-bold drop-shadow-md group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <p className="text-xs text-near-black/70 font-light leading-relaxed line-clamp-2 mb-4">
                  {item.caption}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-near-black/10 text-xs font-semibold text-primary">
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-near-black">
              <Image
                src={activeLightbox.src}
                alt={activeLightbox.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accent/20 text-accent">
                  {activeLightbox.category}
                </span>
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-charcoal mb-3">
                {activeLightbox.title}
              </h2>
              <p className="text-near-black/80 font-light text-sm md:text-base leading-relaxed mb-6">
                {activeLightbox.caption}
              </p>

              {activeLightbox.link && (
                <Link
                  href={activeLightbox.link}
                  onClick={() => setActiveLightbox(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-accent hover:text-charcoal transition-colors shadow-md"
                >
                  {activeLightbox.linkText || "Learn More"}
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
