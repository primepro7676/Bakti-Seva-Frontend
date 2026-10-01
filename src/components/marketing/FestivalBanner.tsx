"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function FestivalBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const targetDate = new Date("2026-11-09T00:00:00"); // Diwali 2026

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-near-black text-ivory py-3 px-4 md:px-8 border-b border-accent/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent opacity-60"></div>
      
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 gap-3 md:gap-0">
        
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          <p className="font-heading font-semibold tracking-wider text-sm md:text-base">
            DIWALI EXCLUSIVE <span className="hidden md:inline">| Elevate your festive puja experience.</span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-3 text-center">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-accent leading-none">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-[9px] uppercase tracking-widest text-sand/60">Days</span>
            </div>
            <span className="text-accent/50 font-bold">:</span>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-accent leading-none">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-[9px] uppercase tracking-widest text-sand/60">Hrs</span>
            </div>
            <span className="text-accent/50 font-bold">:</span>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-accent leading-none">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-[9px] uppercase tracking-widest text-sand/60">Min</span>
            </div>
            <span className="text-accent/50 font-bold">:</span>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-accent leading-none">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-[9px] uppercase tracking-widest text-sand/60">Sec</span>
            </div>
          </div>

          <Link href="/shop/category/gifting" className="hidden lg:flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-accent hover:bg-white hover:text-near-black text-white px-4 py-2 transition-colors">
            Shop Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
      </div>
    </div>
  );
}
