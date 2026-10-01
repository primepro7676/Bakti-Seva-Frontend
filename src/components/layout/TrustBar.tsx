"use client";

import { ShieldCheck, Sparkles, Lock, Truck, Gift } from "lucide-react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Authentically Curated",
    desc: "Sourced & consecrated directly from traditional artisans and sacred centers.",
  },
  {
    icon: Sparkles,
    title: "Thoughtful Craftsmanship",
    desc: "Handcrafted brass, pure silver, and genuine natural gemstones.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    desc: "100% encrypted checkout via Razorpay, UPI, Cards & NetBanking.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    desc: "Express pan-India courier with real-time order tracking.",
  },
  {
    icon: Gift,
    title: "Premium Packaging",
    desc: "Eco-friendly, divine gift-ready packaging with sacred protective wrapping.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#F8F1E5] py-16 border-y border-[#EEE3D0]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {BENEFITS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 rounded-full bg-[#FFFDF7] border border-[#641E2E]/20 text-[#641E2E] flex items-center justify-center mb-4 group-hover:bg-[#641E2E] group-hover:text-[#FFFDF7] transition-all duration-300 shadow-sm">
                  <IconComp className="w-5 h-5" strokeWidth={1.6} />
                </div>
                <h4 className="font-heading font-bold text-base text-[#342B27] mb-1 group-hover:text-[#641E2E] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[#49332D]/75 font-light leading-relaxed max-w-[200px]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
