import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Bakti Seva's mission, our spiritual journey, and our commitment to bringing authentic divine items and services to your doorstep.",
};

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      
      {/* ── Hero ── */}
      <section className="relative h-[62vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-wine">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="/images/003fe7c4-81e7-480d-9df1-e7656dbb0eed.png"
            alt="Warm glowing brass diyas offering light in a spiritual setting"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-wine/95 via-wine/60 to-wine/20" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20 w-full">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-champagne uppercase mb-6 block">Our Heritage</span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-ivory mb-6 leading-tight drop-shadow-md">About Bakti Seva</h1>
          <p className="text-lg md:text-xl text-ivory/85 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
            Bridging ancient spiritual traditions with modern devotion, providing a premium platform for seekers and devotees alike.
          </p>
        </div>
      </section>

      {/* ── Story Section ── */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden w-full max-w-md mx-auto lg:mx-0">
              <Image 
                src="/images/563a6eef-a6d2-4ae0-9b18-6ef036ef0f3f.png"
                alt="A serene traditional spiritual setting representing the Bakti Seva journey"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute -bottom-5 -right-5 w-24 h-24 border border-gold hidden md:block" />
            </div>
            
            <div>
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy mb-5 block">The Beginning</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-cocoa leading-tight">Our Sacred Journey</h2>
              
              <div className="space-y-5 text-cocoa/75 font-light leading-relaxed mb-10 text-base md:text-lg">
                <p>
                  Founded with a deep reverence for our spiritual heritage, Bakti Seva emerged from a desire to make authentic divine experiences accessible to everyone. We recognized the need for a trustworthy platform where devotees could find genuinely sourced puja essentials and participate in meaningful community service.
                </p>
                <p>
                  Today, we collaborate with respected temples, learned scholars, and skilled artisans to bring you products and services that elevate your daily spiritual practices, ensuring that the essence of ancient rituals is preserved in the modern world.
                </p>
              </div>
              
              <ul className="space-y-4 mb-12">
                {[
                  "100% Authentic & Sustainably Sourced",
                  "Guided by Vedic Principles",
                  "Supporting Artisan Communities",
                  "Transparent Seva Contributions"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-cocoa font-medium text-sm">
                    <CheckCircle2 className="text-gold w-5 h-5 shrink-0" />
                    <span className="tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/seva">
                <button className="px-8 py-4 bg-burgundy text-ivory text-xs font-bold tracking-widest uppercase hover:bg-maroon transition-colors flex items-center gap-3">
                  Explore Our Impact <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ── */}
      <section className="py-24 md:py-32 bg-wine text-ivory">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-champagne mb-4 block">Our Pillars</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-ivory">Core Values</h2>
            <p className="text-ivory/75 font-light leading-relaxed text-lg">
              The fundamental principles that guide our every action, curating a platform built on trust, devotion, and purity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ivory/10">
            {[
              { title: "Purity (Shuddhi)", desc: "We ensure the highest standards of purity in all our products, specifically crafted and consecrated for divine worship and spiritual alignment." },
              { title: "Devotion (Bhakti)", desc: "Every service we offer is driven by selfless devotion and a commitment to spiritual upliftment of the global community." },
              { title: "Integrity (Dharma)", desc: "Honesty and transparency guide our interactions with customers, partners, artisans, and the community at large." }
            ].map((value, idx) => (
              <div key={idx} className="p-10 lg:p-14 bg-wine group hover:bg-maroon transition-colors duration-300">
                <span className="text-champagne font-heading text-5xl opacity-25 mb-5 block group-hover:opacity-40 transition-opacity">0{idx + 1}</span>
                <h3 className="font-heading text-2xl font-bold mb-4 text-ivory">{value.title}</h3>
                <p className="text-ivory/65 font-light leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-20 bg-cream border-y border-sand">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[
              { value: "10,000+", label: "Happy Devotees" },
              { value: "500+", label: "Authentic Products" },
              { value: "150+", label: "Seva Programs Conducted" },
              { value: "12+", label: "Years of Service" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-heading text-4xl md:text-5xl font-bold text-burgundy mb-2">{stat.value}</span>
                <span className="text-xs font-semibold uppercase tracking-widest text-cocoa/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-ivory text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-burgundy mb-4 block">Join the Journey</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-cocoa mb-6">Start Your Sacred Journey Today</h2>
          <p className="text-cocoa/65 font-light mb-10 leading-relaxed">
            Explore our carefully curated collection of spiritual essentials, or book a sacred pooja performed by our temple priests.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/shop">
              <button className="px-8 py-4 bg-burgundy text-ivory text-xs font-bold tracking-widest uppercase hover:bg-maroon transition-colors">
                Shop Now
              </button>
            </Link>
            <Link href="/seva">
              <button className="px-8 py-4 border border-burgundy text-burgundy text-xs font-bold tracking-widest uppercase hover:bg-burgundy hover:text-ivory transition-colors">
                Book a Seva
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
