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
    <div className="w-full bg-burgundy text-ivory text-xs font-medium h-9 flex items-center overflow-hidden whitespace-nowrap border-b border-champagne/20" style={{ backgroundColor: "#641E2E", color: "#FFFDF7" }}>
      <motion.div
        className="flex min-w-max shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        <span className="px-8 flex items-center gap-4 text-ivory text-[11px] uppercase tracking-[0.18em]">
          {text}
        </span>
        <span className="px-8 flex items-center gap-4 text-ivory text-[11px] uppercase tracking-[0.18em]">
          {text}
        </span>
        <span className="px-8 flex items-center gap-4 text-ivory text-[11px] uppercase tracking-[0.18em]">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
