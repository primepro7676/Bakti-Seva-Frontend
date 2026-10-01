"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ArrowRight,
  Flame,
  Sparkles,
  ShieldCheck,
  Video,
  Gift,
  Clock,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { SACRED_OFFERINGS, SacredOffering } from "@/lib/data/offerings";

export default function SevaPage() {
  const [activeTab, setActiveTab] = useState<"all" | "online-pooja" | "homa" | "seva">("all");

  const filteredOfferings =
    activeTab === "all"
      ? SACRED_OFFERINGS
      : SACRED_OFFERINGS.filter((item) => item.type === activeTab);

  return (
    <div className="min-h-screen bg-sand/15 pt-28 pb-24 text-charcoal">
      {/* ─── Hero Header ─── */}
      <section className="relative py-16 md:py-24 bg-near-black text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-25 mix-blend-overlay">
          <Image
            src="/images/sacred_homa_fire_1790597364613.jpg"
            alt="Sacred Rituals Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/80 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-widest uppercase mb-4 border border-accent/30">
            <Sparkles className="w-3.5 h-3.5" /> Divine Blessings & Dharma
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
            Online Pooja, Sacred Homa & Seva
          </h1>
          <p className="text-base sm:text-xl text-ivory/80 font-light max-w-3xl mx-auto leading-relaxed mb-10">
            Participate in authentic Vedic poojas, powerful fire rituals, and charitable community seva from anywhere in the world. Personalized sankalpa with consecrated prasadam delivered to your doorstep.
          </p>

          {/* Quick Pillar Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-ivory">Certified Pandits</h4>
              <p className="text-xs text-ivory/60 mt-1">Conducted by traditional Gurukula-trained purohits.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Heart className="w-6 h-6 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-ivory">Gotra Sankalpa</h4>
              <p className="text-xs text-ivory/60 mt-1">Personalized prayers with your name and star.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Video className="w-6 h-6 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-ivory">Live Streaming</h4>
              <p className="text-xs text-ivory/60 mt-1">Watch your rituals live or receive HD video proof.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Gift className="w-6 h-6 text-accent mb-2" />
              <h4 className="text-sm font-semibold text-ivory">Prasadam Delivery</h4>
              <p className="text-xs text-ivory/60 mt-1">Blessed Bhasma, kumkum & prasad sent to your home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Filter Tabs ─── */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-near-black/5 p-2 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "all"
                ? "bg-near-black text-ivory shadow-md"
                : "text-charcoal/70 hover:text-charcoal hover:bg-near-black/5"
            }`}
          >
            All Offerings ({SACRED_OFFERINGS.length})
          </button>
          <button
            onClick={() => setActiveTab("online-pooja")}
            className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "online-pooja"
                ? "bg-primary text-ivory shadow-md"
                : "text-charcoal/70 hover:text-charcoal hover:bg-near-black/5"
            }`}
          >
            <Sparkles className="w-4 h-4 text-accent" /> Online Pooja
          </button>
          <button
            onClick={() => setActiveTab("homa")}
            className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "homa"
                ? "bg-accent text-charcoal shadow-md font-bold"
                : "text-charcoal/70 hover:text-charcoal hover:bg-near-black/5"
            }`}
          >
            <Flame className="w-4 h-4 text-primary" /> Sacred Homa (Havans)
          </button>
          <button
            onClick={() => setActiveTab("seva")}
            className={`px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "seva"
                ? "bg-near-black text-ivory shadow-md"
                : "text-charcoal/70 hover:text-charcoal hover:bg-near-black/5"
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" /> Community Seva
          </button>
        </div>
      </div>

      {/* ─── Offerings List ─── */}
      <main className="container mx-auto px-4 lg:px-8 max-w-7xl pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOfferings.map((item) => {
            const isSeva = item.type === "seva";
            const progress =
              isSeva && item.goalAmount && item.raisedAmount
                ? Math.min(100, Math.round((item.raisedAmount / item.goalAmount) * 100))
                : null;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-near-black/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-near-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm ${
                        item.type === "online-pooja"
                          ? "bg-primary/90 text-ivory border border-primary/40"
                          : item.type === "homa"
                          ? "bg-amber-600/90 text-ivory border border-amber-400/40"
                          : "bg-emerald-700/90 text-ivory border border-emerald-500/40"
                      }`}
                    >
                      {item.type === "online-pooja" && <Sparkles className="w-3 h-3" />}
                      {item.type === "homa" && <Flame className="w-3 h-3" />}
                      {item.type === "seva" && <Heart className="w-3 h-3" />}
                      {item.categoryName}
                    </span>
                  </div>

                  {/* Deity / Subtitle */}
                  {item.deity && (
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <span className="text-xs font-semibold text-accent drop-shadow">
                        Deity: {item.deity}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="font-heading text-2xl font-bold text-charcoal mb-3 group-hover:text-primary transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-near-black/70 font-light leading-relaxed mb-6 line-clamp-3">
                    {item.shortDescription}
                  </p>

                  {/* Meta Pills */}
                  {(item.duration || item.location) && (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-near-black/60 mb-6 font-medium">
                      {item.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-accent" /> {item.duration}
                        </span>
                      )}
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-accent" /> {item.location}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Progress bar for Seva */}
                  {isSeva && progress !== null && (
                    <div className="mb-6 bg-sand/30 p-3.5 rounded-xl border border-near-black/5">
                      <div className="flex justify-between items-center text-xs font-semibold text-near-black/70 mb-2">
                        <span>Raised: ₹{item.raisedAmount?.toLocaleString("en-IN")}</span>
                        <span className="text-accent">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-right text-[11px] text-near-black/50 mt-1">
                        Goal: ₹{item.goalAmount?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  )}

                  {/* Benefits snapshot */}
                  <div className="space-y-1.5 mb-6 text-xs text-charcoal/80">
                    {item.benefits.slice(0, 2).map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action / Price Bottom */}
                  <div className="pt-4 border-t border-near-black/10 mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-near-black/50 uppercase tracking-widest font-semibold block">
                        {isSeva ? "Contribution from" : "Starting Dakshina"}
                      </span>
                      <span className="font-heading text-xl font-bold text-primary">
                        ₹{item.packages[0]?.amount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <Link
                      href={`/seva/${item.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-near-black text-ivory hover:bg-primary text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm group-hover:shadow"
                    >
                      {isSeva ? "Contribute" : "Book Pooja"}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ─── How It Works Section ─── */}
      <section className="mt-24 pt-20 pb-16 bg-white border-t border-near-black/10">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-2 block">
              Transparent & Sacred Process
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal">
              How Your Online Pooja & Homa Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading text-2xl font-bold text-primary mb-4">
                1
              </div>
              <h4 className="font-semibold text-charcoal text-base mb-2">Select Your Sacred Ritual</h4>
              <p className="text-xs text-near-black/70 leading-relaxed">
                Choose the deity, occasion, or dosha nivarana ritual that suits your family's needs.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading text-2xl font-bold text-primary mb-4">
                2
              </div>
              <h4 className="font-semibold text-charcoal text-base mb-2">Provide Sankalpa Details</h4>
              <p className="text-xs text-near-black/70 leading-relaxed">
                Share your family names, Gotra, Nakshatra, and prayer intentions for personal recitation.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading text-2xl font-bold text-primary mb-4">
                3
              </div>
              <h4 className="font-semibold text-charcoal text-base mb-2">Live Stream or Video Proof</h4>
              <p className="text-xs text-near-black/70 leading-relaxed">
                Watch the rituals performed live via secure link or receive full HD recordings of the archana.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center font-heading text-2xl font-bold text-primary mb-4">
                4
              </div>
              <h4 className="font-semibold text-charcoal text-base mb-2">Prasadam at Your Doorstep</h4>
              <p className="text-xs text-near-black/70 leading-relaxed">
                Energized Bhasma, kumkum, sacred raksha thread, and yantras packed and safely couriered.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
