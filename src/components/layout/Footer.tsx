"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Lock } from "lucide-react";

/** Static coords avoid SSR/client float drift from Math.sin/cos. */
const LOTUS_RAYS = [
  [340, 200],
  [321.24, 270],
  [270, 321.24],
  [200, 340],
  [130, 321.24],
  [78.76, 270],
  [60, 200],
  [78.76, 130],
  [130, 78.76],
  [200, 60],
  [270, 78.76],
  [321.24, 130],
] as const;

const LOTUS_PETALS = [
  [200, 130, 0],
  [249.5, 150.5, 45],
  [270, 200, 90],
  [249.5, 249.5, 135],
  [200, 270, 180],
  [150.5, 249.5, 225],
  [130, 200, 270],
  [150.5, 150.5, 315],
] as const;

function LotusPattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      style={{ opacity: 0.04 }}
    >
      <g stroke="#641E2E" strokeWidth="0.8">
        <circle cx="200" cy="200" r="28" />
        <circle cx="200" cy="200" r="52" />
        <circle cx="200" cy="200" r="88" />
        <circle cx="200" cy="200" r="128" />
        {LOTUS_RAYS.map(([x2, y2], i) => (
          <line key={i} x1="200" y1="200" x2={x2} y2={y2} />
        ))}
        {LOTUS_PETALS.map(([cx, cy, rot], i) => (
          <ellipse
            key={`p-${i}`}
            cx={cx}
            cy={cy}
            rx="18"
            ry="36"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-wine text-ivory" style={{ backgroundColor: "#4E1824", color: "#FFFDF7" }}>
      {/* Newsletter — light premium editorial */}
      <div
        className="relative border-b border-[#EEE3D0]/60 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #FFFDF7 0%, #F8F1E5 45%, #F3E6E1 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-100">
          <LotusPattern />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image — ~45% */}
            <div className="lg:col-span-5">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden border border-[#C69A4B]/25"
                style={{ borderRadius: 12 }}
              >
                <Image
                  src="/images/newsletter/bakti-seva-newsletter.webp"
                  alt="Traditional brass diya and flowers representing Bakti Seva"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content — ~55% */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 text-[#A76050]">
                STAY CLOSE TO TRADITIONS
              </span>
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#641E2E] leading-tight">
                Sacred stories, meaningful collections & festival updates.
              </h3>
              <p className="text-sm md:text-base text-[#49332D] font-light max-w-xl mb-8 leading-relaxed">
                Subscribe to receive divine inspiration, exclusive festival
                previews, and traditional wellness wisdom directly in your
                inbox.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full max-w-md flex relative"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-b-2 border-[#C69A4B] pb-3 pt-2 text-[#342B27] placeholder:text-[#49332D]/45 focus:outline-none focus:border-[#641E2E] text-sm transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-3 text-[#641E2E] hover:text-[#C69A4B] transition-colors p-1"
                  aria-label="Subscribe to Newsletter"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links — Deep Wine #4E1824 */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pr-10">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <img
                src="/images/srilns_logo.png?v=3"
                alt="Sri Lakshmi Narasimha Swamy Charitable Trust"
                className="h-14 sm:h-16 w-14 sm:w-16 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col justify-center text-ivory">
                <span className="font-heading text-base sm:text-lg font-bold tracking-wider leading-tight">
                  Sri Lakshmi Narasimha Swamy
                </span>
                <span className="font-heading text-sm sm:text-base font-semibold tracking-wider leading-tight">
                  Charitable Trust
                </span>
              </div>
            </Link>
            <p className="text-ivory/75 leading-relaxed font-light text-xs sm:text-sm mb-8 max-w-sm">
              A premium Indian spiritual lifestyle brand dedicated to authentic
              rituals, handcrafted sacred artifacts, and fostering deep devotion
              in modern homes.
            </p>

            <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-champagne">
              <a href="#" className="hover:text-ivory transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-ivory transition-colors">
                YouTube
              </a>
              <a href="#" className="hover:text-ivory transition-colors">
                Facebook
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase mb-6 text-[#D6B46A] border-b border-[#D6B46A]/20 pb-2">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#FFFDF7]/80 font-light">
              <li>
                <Link href="/shop/new" className="hover:text-[#D6B46A] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop/best-sellers" className="hover:text-[#D6B46A] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/shop/puja-essentials" className="hover:text-[#D6B46A] transition-colors">
                  Puja Essentials
                </Link>
              </li>
              <li>
                <Link href="/shop/decor" className="hover:text-[#D6B46A] transition-colors">
                  Spiritual Decor
                </Link>
              </li>
              <li>
                <Link href="/shop/books" className="hover:text-[#D6B46A] transition-colors">
                  Books & Literature
                </Link>
              </li>
              <li>
                <Link href="/shop/gifts" className="hover:text-[#D6B46A] transition-colors">
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-[#D6B46A] font-semibold underline underline-offset-4 block mt-2"
                >
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase mb-6 text-[#D6B46A] border-b border-[#D6B46A]/20 pb-2">
              DISCOVER
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#FFFDF7]/80 font-light">
              <li>
                <Link href="/about" className="hover:text-[#D6B46A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/seva" className="hover:text-[#D6B46A] transition-colors">
                  Pooja & Seva
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D6B46A] transition-colors">
                  Events & Festivals
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#D6B46A] transition-colors">
                  The Bakti Journal
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D6B46A] transition-colors">
                  Community Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase mb-6 text-[#D6B46A] border-b border-[#D6B46A]/20 pb-2">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#FFFDF7]/80 font-light">
              <li>
                <Link href="/contact" className="hover:text-[#D6B46A] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#D6B46A] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#D6B46A] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#D6B46A] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-[#D6B46A] transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-[0.18em] uppercase mb-6 text-[#D6B46A] border-b border-[#D6B46A]/20 pb-2">
              LEGAL
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#FFFDF7]/80 font-light">
              <li>
                <Link href="/privacy" className="hover:text-[#D6B46A] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#D6B46A] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refunds" className="hover:text-[#D6B46A] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#D6B46A] transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#FFFDF7]/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#FFFDF7]/80">
            <ShieldCheck className="w-4 h-4 text-[#D6B46A]" /> 100% Authentic Consecrated Items
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#FFFDF7]/80">
            <Truck className="w-4 h-4 text-[#D6B46A]" /> Free Shipping Over ₹999
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#FFFDF7]/80">
            <RefreshCw className="w-4 h-4 text-[#D6B46A]" /> 7-Day Easy Returns
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-[#FFFDF7]/80">
            <Lock className="w-4 h-4 text-[#D6B46A]" /> 256-Bit SSL Secure Checkout
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#FFFDF7]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FFFDF7]/60 font-light tracking-wide">
          <p>
            &copy; {new Date().getFullYear()} Bakti Seva. All Rights Reserved.
            Crafted with Devotion in India. | <Link href="/admin/login" className="hover:text-[#D6B46A] transition-colors ml-1">Admin Login</Link>
          </p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider text-[#D6B46A]">
            <span>Razorpay Secure</span>
            <span>•</span>
            <span>UPI / Cards / NetBanking</span>
            <span>•</span>
            <span>Pan-India Courier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
