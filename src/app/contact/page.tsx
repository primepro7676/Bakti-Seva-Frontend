"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// Inline brand SVGs (lucide-react doesn't include social brand icons)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ef4444" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
import { apiEndpoint } from "@/lib/api";

const CONTACT_INFO = [
  {
    icon: MapPin,
    title: "Our Sacred Location",
    lines: [
      "Sri Lakshminarasimhaswami Matth",
      "Devarathota, Ragimuddanahalli",
      "Tumkur, Karnataka – 572 101",
    ],
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 98765 43210", "+91 80 2345 6789"],
    sub: "Mon – Sat, 9:00 AM – 6:00 PM IST",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@baktiseva.com", "info@baktiseva.com"],
    sub: "We reply within 24 hours",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Clock,
    title: "Temple Timings",
    lines: ["Morning: 6:00 AM – 12:00 PM", "Evening: 4:00 PM – 8:30 PM"],
    sub: "Open all 7 days",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiEndpoint("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(
          typeof data?.message === "string"
            ? data.message
            : "Unable to send your message. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand/10 text-charcoal">
      {/* ── Hero ── */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/images/temple_aarti_ceremony_1790597350613.jpg"
          alt="Contact – Sri Lakshminarasimhaswami Matth"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 via-near-black/55 to-near-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pt-20">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
            We'd love to hear from you
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-ivory mb-4 leading-tight">
            Contact Us
          </h1>
          <p className="text-ivory/75 font-light max-w-xl leading-relaxed text-base sm:text-lg">
            Reach out for pooja bookings, seva inquiries, order support, or simply to connect with our spiritual community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-20">
        {/* ── Contact Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-20">
          {CONTACT_INFO.map((item, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${item.border} ${item.bg} p-6 flex flex-col gap-3`}
            >
              <div className={`w-11 h-11 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-charcoal text-sm">{item.title}</h3>
              <div className="space-y-0.5">
                {item.lines.map((line, j) => (
                  <p key={j} className="text-sm text-near-black/80 font-medium">{line}</p>
                ))}
                {item.sub && (
                  <p className="text-xs text-near-black/50 mt-1">{item.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main Grid: Form + Map ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Contact Form ── */}
          <div className="bg-white rounded-3xl border border-near-black/10 shadow-sm p-8 md:p-10">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold mb-2 block">
                Send Us a Message
              </span>
              <h2 className="font-heading text-3xl font-bold text-charcoal">
                How Can We Help?
              </h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-charcoal">
                  Message Received!
                </h3>
                <p className="text-near-black/60 text-sm max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will respond within 24 hours. 🙏
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-2 text-xs font-semibold text-primary hover:text-accent transition-colors underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-near-black/60">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-near-black/15 bg-sand/20 text-charcoal text-sm placeholder:text-near-black/35 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-near-black/60">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-near-black/15 bg-sand/20 text-charcoal text-sm placeholder:text-near-black/35 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-near-black/60">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full px-4 py-3 rounded-xl border border-near-black/15 bg-sand/20 text-charcoal text-sm placeholder:text-near-black/35 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-near-black/60">
                    Subject <span className="text-primary">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-near-black/15 bg-sand/20 text-charcoal text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none"
                  >
                    <option value="" disabled>Select a topic…</option>
                    <option>Pooja / Seva Booking</option>
                    <option>Product / Shop Inquiry</option>
                    <option>Order Support</option>
                    <option>Donation & Sponsorship</option>
                    <option>General Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-near-black/60">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you…"
                    className="w-full px-4 py-3 rounded-xl border border-near-black/15 bg-sand/20 text-charcoal text-sm placeholder:text-near-black/35 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-near-black text-ivory hover:bg-primary font-semibold text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-near-black/40 text-center">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                </p>
              </form>
            )}
          </div>

          {/* ── Map + Social ── */}
          <div className="space-y-8">
            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden border border-near-black/10 shadow-sm">
              <div className="bg-near-black px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-ivory text-sm font-semibold">Sri Lakshminarasimhaswami Matth</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Devarathota,Ragimuddanahalli,Tumkur,Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent text-xs font-semibold hover:text-white transition-colors"
                >
                  Open in Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <iframe
                src="https://maps.google.com/maps?q=Devarathota,+Ragimuddanahalli,+Tumkur,+Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Lakshminarasimhaswami Matth Location"
              />
            </div>

            {/* WhatsApp CTA */}
            <div className="rounded-2xl bg-emerald-600 p-6 flex items-center gap-5 shadow-md">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-7 h-7 text-white" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-base mb-1">Chat on WhatsApp</h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  Quick answers for seva bookings, orders & more.
                </p>
              </div>
              <a
                href="https://wa.me/919876543210?text=Namaste!%20I%20have%20a%20question%20about%20Bhakti%20Seva."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-emerald-700 text-xs font-bold uppercase tracking-wide hover:bg-emerald-50 transition-colors shadow"
              >
                Chat Now
              </a>
            </div>

            {/* Social Links */}
            <div className="rounded-2xl bg-white border border-near-black/10 p-6">
              <h3 className="font-semibold text-charcoal text-sm mb-4">Follow Our Sacred Journey</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-sand/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <InstagramIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal group-hover:text-primary transition-colors">@baktiseva</p>
                    <p className="text-xs text-near-black/50">Daily devotional posts & rituals</p>
                  </div>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-sand/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center">
                    <YoutubeIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal group-hover:text-primary transition-colors">Bhakti Seva</p>
                    <p className="text-xs text-near-black/50">Live pooja & spiritual discourses</p>
                  </div>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-sand/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                    <FacebookIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal group-hover:text-primary transition-colors">Bhakti Seva India</p>
                    <p className="text-xs text-near-black/50">Events, community & updates</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
