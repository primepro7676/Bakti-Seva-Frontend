"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const heroImages = [
  "/images/hero/bakti-seva-hero-mandir.webp",
  "/images/temple_aarti_ceremony_1790597350613.jpg",
  "/images/pooja_thali_set_1790594617235.jpg",
  "/images/brass_diya_lamp.jpg",
  "/images/sacred_homa_fire_1790597364613.jpg",
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-[#4E1824] overflow-hidden">
      {heroImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Sacred Hero ${index + 1}`}
          fill
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          style={{ transitionProperty: "opacity, transform", transitionDuration: "1000ms" }}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
