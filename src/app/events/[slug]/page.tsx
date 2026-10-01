import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Clock, ArrowLeft, Mail, Phone, Check } from "lucide-react";
import { EVENTS, getEventBySlug } from "@/lib/events-data";
import { Metadata } from "next";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: `${event.title} | Sri Lakshminarasimhaswami Matth`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <div className="bg-[#FFFDF7] min-h-screen">
      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[380px] max-h-[600px] w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A0F18]/90 via-[#3A0F18]/40 to-transparent" />

        {/* Back link */}
        <div className="absolute top-28 left-0 right-0 px-4 md:px-8 max-w-[1200px] mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-[#FFFDF7]/80 hover:text-[#D6B46A] text-xs font-semibold tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-10 max-w-[1200px] mx-auto w-full">
          <span className="inline-block bg-[#C59A4B] text-[#3A0F18] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest mb-4">
            {event.type}
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#FFFDF7] leading-tight max-w-3xl">
            {event.title}
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* ── LEFT: Main Content ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Quick Info Bar */}
            <div className="flex flex-wrap gap-6 border-b border-[#E8D5B0] pb-8">
              <div className="flex items-center gap-2.5 text-sm text-[#5C3D2E]">
                <Calendar className="w-4 h-4 text-[#C59A4B]" />
                <span className="font-semibold">{event.date}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#5C3D2E]">
                <Clock className="w-4 h-4 text-[#C59A4B]" />
                <span className="font-semibold">{event.time}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#5C3D2E]">
                <MapPin className="w-4 h-4 text-[#C59A4B]" />
                <span className="font-semibold">{event.location}</span>
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#641E2E] mb-4">About This Event</h2>
              <p className="text-[#5C3D2E]/80 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {event.fullDescription}
              </p>
            </div>

            {/* Origin & History */}
            <div className="bg-[#FDF6E8] border-l-4 border-[#C59A4B] rounded-r-xl p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold text-[#641E2E] mb-4">
                Origin &amp; Significance
              </h2>
              <p className="text-[#5C3D2E]/80 leading-relaxed text-sm md:text-base whitespace-pre-line">
                {event.origin}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#641E2E] mb-5">
                Event Highlights
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#5C3D2E]/90">
                    <Check className="w-4 h-4 text-[#C59A4B] mt-0.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#641E2E] mb-5">
                Programme Schedule
              </h2>
              <div className="space-y-0 border border-[#E8D5B0] rounded-xl overflow-hidden">
                {event.schedule.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 px-5 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-[#FDF6E8]"
                      }`}
                  >
                    <span className="font-bold text-[#C59A4B] shrink-0 w-20 text-xs">{s.time}</span>
                    <span className="text-[#5C3D2E]/85">{s.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div className="space-y-6">

            {/* Register Card */}
            <div className="bg-[#641E2E] rounded-2xl p-6 text-[#FFFDF7] sticky top-24">
              <h3 className="font-heading text-xl font-bold mb-1">Register for This Event</h3>
              <p className="text-[#FFFDF7]/70 text-xs mb-5 leading-relaxed">
                Secure your spot and receive updates about this event directly to your inbox.
              </p>

              <form
                onSubmit={undefined}
                action="mailto:events@srilns.org"
                method="get"
                encType="text/plain"
                className="space-y-3"
              >
                <input
                  type="hidden"
                  name="subject"
                  value={`Registration: ${event.title} — ${event.date}`}
                />
                <div>
                  <label className="text-xs font-semibold text-[#D6B46A] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-[#FFFDF7] placeholder:text-white/40 focus:outline-none focus:border-[#C59A4B] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#D6B46A] block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-[#FFFDF7] placeholder:text-white/40 focus:outline-none focus:border-[#C59A4B] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#D6B46A] block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-[#FFFDF7] placeholder:text-white/40 focus:outline-none focus:border-[#C59A4B] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#D6B46A] block mb-1">Number of Attendees</label>
                  <select
                    name="attendees"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm text-[#FFFDF7] focus:outline-none focus:border-[#C59A4B] transition-colors"
                  >
                    {[1, 2, 3, 4, 5, "6+"].map((n) => (
                      <option key={n} value={n} className="text-[#3A0F18] bg-white">
                        {n} {n === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C59A4B] hover:bg-[#D6B46A] text-[#3A0F18] font-bold text-sm py-3 rounded-lg uppercase tracking-widest transition-colors mt-2"
                >
                  Register Now
                </button>
              </form>

              {/* Fee info */}
              <p className="text-[#FFFDF7]/55 text-[11px] mt-4 leading-relaxed border-t border-white/10 pt-4">
                {event.registrationFee}
              </p>
            </div>

            {/* What to Bring */}
            <div className="bg-[#FDF6E8] border border-[#E8D5B0] rounded-2xl p-5">
              <h3 className="font-heading text-base font-bold text-[#641E2E] mb-3">What to Bring</h3>
              <ul className="space-y-2">
                {event.whatToBring.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#5C3D2E]/80">
                    <Check className="w-3.5 h-3.5 text-[#C59A4B] mt-0.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dress Code */}
            <div className="bg-[#FDF6E8] border border-[#E8D5B0] rounded-2xl p-5">
              <h3 className="font-heading text-base font-bold text-[#641E2E] mb-2">Dress Code</h3>
              <p className="text-xs text-[#5C3D2E]/80 leading-relaxed">{event.dresscode}</p>
            </div>

            {/* Contact */}
            <div className="bg-[#FDF6E8] border border-[#E8D5B0] rounded-2xl p-5">
              <h3 className="font-heading text-base font-bold text-[#641E2E] mb-3">Contact Us</h3>
              <div className="space-y-2.5">
                <a
                  href={`mailto:${event.contactEmail}`}
                  className="flex items-center gap-2 text-xs text-[#5C3D2E] hover:text-[#641E2E] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C59A4B]" />
                  {event.contactEmail}
                </a>
                <a
                  href={`tel:${event.contactPhone}`}
                  className="flex items-center gap-2 text-xs text-[#5C3D2E] hover:text-[#641E2E] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C59A4B]" />
                  {event.contactPhone}
                </a>
              </div>
            </div>

            {/* Other Events */}
            <div>
              <h3 className="font-heading text-base font-bold text-[#641E2E] mb-3">Other Events</h3>
              <div className="space-y-1">
                {EVENTS.filter((e) => e.slug !== event.slug).map((e) => (
                  <Link
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    className="flex flex-col gap-0.5 group p-3 rounded-lg hover:bg-[#FDF6E8] transition-colors border border-transparent hover:border-[#E8D5B0]"
                  >
                    <p className="text-xs font-semibold text-[#641E2E] group-hover:text-[#C59A4B] transition-colors leading-snug">
                      {e.title}
                    </p>
                    <p className="text-[11px] text-[#5C3D2E]/60">{e.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
