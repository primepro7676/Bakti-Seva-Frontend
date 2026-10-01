"use client";

import { motion } from "framer-motion";

const announcements = [
  "Authentically Curated Spiritual Essentials",
  "Free Shipping on Orders Above ₹999",
  "Secure Payments • Easy Returns",
  "Meaningful Gifting for Every Occasion",
  "Handcrafted with Sacred Devotion",
];

export function AnnouncementBar() {
  const text = announcements.join(" ✦ ");

  return (
    <div className="w-full bg-[#641E2E] text-[#FFFDF7] text-xs font-medium h-9 flex items-center overflow-hidden whitespace-nowrap border-b border-[#D6B46A]/20">
      <motion.div
        className="flex min-w-max shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        <span className="px-8 flex items-center gap-4 text-[#FFFDF7] text-[11px] uppercase tracking-[0.18em]">
          {text}
        </span>
        <span className="px-8 flex items-center gap-4 text-[#FFFDF7] text-[11px] uppercase tracking-[0.18em]">
          {text}
        </span>
        <span className="px-8 flex items-center gap-4 text-[#FFFDF7] text-[11px] uppercase tracking-[0.18em]">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
