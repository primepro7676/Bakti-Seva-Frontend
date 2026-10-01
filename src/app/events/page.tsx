import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { EVENTS } from "@/lib/events-data";

export const metadata: Metadata = {
  title: "Upcoming Spiritual Events | Sri Lakshminarasimhaswami Matth",
  description:
    "Join Sri Lakshminarasimhaswami Matth for upcoming spiritual gatherings, grand pujas, and sacred festivals in Tumkur, Karnataka.",
};

export default function Events() {
  return (
    <div className="bg-[#FFFDF7] min-h-screen">

      {/* ── Hero ── */}
      <div className="bg-[#4E1824] pt-28 pb-16 border-b border-[#C59A4B]/20">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px] text-center">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#D6B46A] mb-5 block">
            Community
          </span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-[#FFFDF7] mb-5 leading-tight">
            Events &amp; Festivals
          </h1>
          <p className="text-lg font-light text-[#FFFDF7]/75 leading-relaxed max-w-xl mx-auto">
            Come together with the community to celebrate divine festivals and participate in
            transformative spiritual gatherings.
          </p>
        </div>
      </div>

      {/* ── Events Grid ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px] py-16 md:py-24">
        <div className="flex flex-col gap-10">
          {EVENTS.map((evt, idx) => (
            <div
              key={idx}
              className="group bg-white border border-[#E8D5B0] hover:border-[#C59A4B]/50 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row shadow-sm hover:shadow-lg rounded-xl"
            >
              {/* Image */}
              <div className="w-full sm:w-2/5 h-64 sm:h-auto relative bg-[#5C3D2E] overflow-hidden shrink-0 rounded-l-xl">
                <Image
                  src={evt.image}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#4E1824]/60 to-transparent" />
                <span className="absolute top-5 left-5 bg-[#C59A4B] text-[#3A0F18] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded">
                  {evt.type}
                </span>
              </div>

              {/* Content */}
              <div className="w-full sm:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#3A0F18] mb-5 group-hover:text-[#641E2E] transition-colors leading-tight">
                  {evt.title}
                </h3>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#5C3D2E]/60 uppercase tracking-widest">
                    <Calendar className="w-4 h-4 text-[#C59A4B]" /> {evt.date}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#5C3D2E]/60 uppercase tracking-widest">
                    <Clock className="w-4 h-4 text-[#C59A4B]" /> {evt.time}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-[#5C3D2E]/60 uppercase tracking-widest">
                    <MapPin className="w-4 h-4 text-[#C59A4B]" /> {evt.location}
                  </div>
                </div>

                <p className="text-[#5C3D2E]/70 font-light leading-relaxed mb-8 text-sm line-clamp-3">
                  {evt.shortDescription}
                </p>

                <Link
                  href={`/events/${evt.slug}`}
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#641E2E] hover:text-[#C59A4B] transition-colors mt-auto group/btn w-fit border-b border-[#641E2E]/30 pb-1 hover:border-[#C59A4B]"
                >
                  Register / Details{" "}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Newsletter CTA ── */}
        <div className="mt-20 bg-[#FDF6E8] border border-[#E8D5B0] p-10 md:p-16 text-center rounded-2xl">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#641E2E] mb-4 block">
            Stay Updated
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#3A0F18] mb-4">
            Never Miss a Sacred Event
          </h2>
          <p className="text-[#5C3D2E]/65 font-light mb-8 max-w-md mx-auto leading-relaxed text-sm">
            Subscribe to receive timely alerts about upcoming festivals, homas, and community seva programs.
          </p>
          <form action="#" className="flex max-w-sm mx-auto gap-0">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border border-[#E8D5B0] bg-white px-4 py-3 text-sm text-[#3A0F18] placeholder:text-[#5C3D2E]/35 focus:outline-none focus:border-[#C59A4B] transition-colors rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-[#641E2E] text-[#FFFDF7] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#4E1824] transition-colors whitespace-nowrap rounded-r-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
