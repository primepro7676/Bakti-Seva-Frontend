"use client";

import { X, Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  "Brass Diya",
  "Rudraksha Mala",
  "Bhagavad Gita",
  "Ganesha Idol",
  "Puja Thali",
  "Silk Dhoti",
  "Incense Sticks",
  "Maha Sudarshana Homa",
];

const TRENDING_COLLECTIONS = [
  { name: "Puja Essentials", href: "/shop/puja-essentials", img: "/images/brass_diya_lamp.jpg" },
  { name: "Handcrafted Idols", href: "/shop/decor", img: "/images/ganesha_idol_1790594652426.jpg" },
  { name: "Sacred Literature", href: "/shop/books", img: "/images/bhagavad_gita_deluxe.jpg" },
  { name: "Devotional Apparel", href: "/shop/apparel", img: "/images/pure_silk_dhoti_1790665459384.jpg" },
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 sm:pt-28">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#4E1824]/75 backdrop-blur-md"
      />

      {/* Search Panel */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -24 }}
        className="relative w-full max-w-4xl px-4 z-10"
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-6 p-2 text-[#FFFDF7]/80 hover:text-[#FFFDF7] transition-colors bg-[#641E2E] rounded-full shadow-lg"
          aria-label="Close Search"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-[#FFFDF7] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#641E2E]/15">
          <form onSubmit={handleSubmit} className="relative mb-8">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections, homas, and guides..."
              className="w-full bg-[#F8F1E5] border border-[#EEE3D0] text-[#342B27] text-base sm:text-lg px-6 py-4.5 rounded-full pl-14 pr-32 focus:outline-none focus:border-[#641E2E] focus:ring-2 focus:ring-[#C59A4B]/40 transition-all placeholder:text-[#49332D]/50 shadow-inner"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#641E2E]" />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#641E2E] text-[#FFFDF7] hover:bg-[#7B233A] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full transition-colors"
            >
              Search
            </button>
          </form>

          {/* Popular Searches */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#641E2E] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C59A4B]" /> Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    router.push(`/shop?search=${encodeURIComponent(term)}`);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-full bg-[#F8F1E5] hover:bg-[#641E2E] text-[#49332D] hover:text-[#FFFDF7] border border-[#EEE3D0] text-xs font-medium transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Collections */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#641E2E] mb-4">
              Explore Trending Collections
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {TRENDING_COLLECTIONS.map((col, idx) => (
                <Link
                  key={idx}
                  href={col.href}
                  onClick={onClose}
                  className="group bg-[#F8F1E5] rounded-2xl p-3 border border-[#EEE3D0] hover:border-[#641E2E]/30 transition-all hover:shadow-md flex flex-col items-center text-center"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#EEE3D0]">
                    <Image
                      src={col.img}
                      alt={col.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="font-heading font-bold text-xs sm:text-sm text-[#342B27] group-hover:text-[#641E2E] transition-colors flex items-center gap-1">
                    {col.name} <ArrowRight className="w-3 h-3 text-[#C59A4B]" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
