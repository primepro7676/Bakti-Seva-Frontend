"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Flame,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Video,
  Gift,
  Share2,
  Lock
} from "lucide-react";
import { SacredOffering } from "@/lib/data/offerings";
import { apiEndpoint } from "@/lib/api";

interface SevaBookingClientProps {
  offering: SacredOffering;
}

export function SevaBookingClient({ offering }: SevaBookingClientProps) {
  const [selectedPackage, setSelectedPackage] = useState(offering.packages[0]);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Form Fields
  const [devoteeName, setDevoteeName] = useState("");
  const [gotra, setGotra] = useState("");
  const [nakshatra, setNakshatra] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [ritualDate, setRitualDate] = useState("");
  const [address, setAddress] = useState("");
  const [intentions, setIntentions] = useState("");

  const currentAmount = customAmount
    ? parseFloat(customAmount) || 0
    : selectedPackage?.amount || 0;

  const isSeva = offering.type === "seva";

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName || !phone) {
      alert("Please provide at least your Name and WhatsApp phone number.");
      return;
    }
    if (!email) {
      alert("Please provide your email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(apiEndpoint("/api/enquiries"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: devoteeName,
          phone,
          email,
          service: offering.title,
          message:
            intentions.trim() ||
            `Booking request for ${offering.title}. Gotra: ${gotra || "N/A"}, Nakshatra: ${nakshatra || "N/A"}, Ritual date: ${ritualDate || "N/A"}, Address: ${address || "N/A"}, Amount: ₹${currentAmount}`,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(
          typeof data?.message === "string"
            ? data.message
            : "Unable to submit your enquiry. Please try again."
        );
      }

      setBookingId(
        typeof data?.data?.id === "string"
          ? `BKT-${String(data.data.id).slice(-6).toUpperCase()}`
          : `BKT-${Date.now().toString().slice(-6)}`
      );
      setIsBooked(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to submit your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isBooked) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-near-black/10">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase tracking-widest text-accent font-bold mb-2 block">
            Pranams & Blessings
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-charcoal mb-4">
            {isSeva ? "Seva Contribution Confirmed!" : "Ritual Booking Confirmed!"}
          </h1>
          <p className="text-near-black/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light">
            Thank you, <span className="font-semibold text-charcoal">{devoteeName}</span>. Your {offering.title} booking has been received. Our Vedic priests will prepare the sacred sankalpa.
          </p>

          <div className="bg-sand/30 rounded-2xl p-6 mb-8 text-left space-y-3 text-sm border border-near-black/5">
            <div className="flex justify-between py-1 border-b border-near-black/5">
              <span className="text-near-black/60">Booking ID:</span>
              <span className="font-mono font-semibold">{bookingId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-near-black/5">
              <span className="text-near-black/60">Offering:</span>
              <span className="font-semibold text-charcoal">{offering.title}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-near-black/5">
              <span className="text-near-black/60">Sankalpa Gotra / Star:</span>
              <span className="font-semibold">{gotra || "Kashyapa"} / {nakshatra || "Rohini"}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-near-black/5">
              <span className="text-near-black/60">Dakshina / Contribution:</span>
              <span className="font-bold text-primary text-base">₹{currentAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-near-black/60">Updates:</span>
              <span className="text-emerald-700 font-medium">Link & photos will be sent to +91 {phone}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/seva"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-near-black text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-primary transition-colors"
            >
              Explore Other Offerings
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-near-black/20 text-charcoal text-xs uppercase tracking-widest font-semibold hover:bg-sand/50 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/15 text-charcoal pt-36 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Navigation Breadcrumb */}
        <Link
          href="/seva"
          className="inline-flex items-center gap-2 text-xs md:text-sm text-near-black/60 hover:text-primary transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Offerings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Visuals & Deep Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Featured Image */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-near-black shadow-lg border border-near-black/10">
              <Image
                src={offering.image}
                alt={offering.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute top-6 left-6">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-md ${
                    offering.type === "online-pooja"
                      ? "bg-primary text-ivory"
                      : offering.type === "homa"
                      ? "bg-amber-600 text-ivory"
                      : "bg-emerald-700 text-ivory"
                  }`}
                >
                  {offering.type === "online-pooja" && <Sparkles className="w-3.5 h-3.5" />}
                  {offering.type === "homa" && <Flame className="w-3.5 h-3.5" />}
                  {offering.type === "seva" && <Heart className="w-3.5 h-3.5" />}
                  {offering.categoryName}
                </span>
              </div>

              {offering.deity && (
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase font-semibold text-accent tracking-widest block mb-1">
                    Divine Deity
                  </span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white drop-shadow">
                    {offering.deity}
                  </h2>
                </div>
              )}
            </div>

            {/* Title & Narrative */}
            <div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-charcoal mb-4 leading-tight">
                {offering.title}
              </h1>

              {/* Badges / Location / Duration */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-near-black/60 mb-6">
                {offering.duration && (
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-near-black/5">
                    <Clock className="w-4 h-4 text-accent" /> {offering.duration}
                  </span>
                )}
                {offering.location && (
                  <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-near-black/5">
                    <MapPin className="w-4 h-4 text-accent" /> {offering.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-near-black/5 text-emerald-700 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> 100% Authentic Vedic Purohits
                </span>
              </div>

              <div className="prose prose-stone max-w-none text-near-black/80 font-light text-base md:text-lg leading-relaxed space-y-4">
                <p>{offering.fullDescription}</p>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-near-black/10 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" /> Spiritual Significance & Benefits
              </h3>
              <ul className="space-y-3">
                {offering.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-near-black/80">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What is Included */}
            <div className="bg-sand/30 rounded-2xl p-6 md:p-8 border border-near-black/10">
              <h3 className="font-heading text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent" /> What You Will Receive
              </h3>
              <ul className="space-y-3">
                {offering.includes.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm md:text-base text-near-black/80">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Booking & Sankalpa Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-near-black/10 sticky top-28">
              <div className="border-b border-near-black/10 pb-5 mb-6">
                <span className="text-[11px] uppercase tracking-widest text-accent font-bold block mb-1">
                  {isSeva ? "Sponsor Seva" : "Vedic Booking"}
                </span>
                <h3 className="font-heading text-2xl font-bold text-charcoal">
                  {isSeva ? "Choose Your Contribution" : "Book Sacred Ritual"}
                </h3>
              </div>

              {/* Package Selection */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-semibold uppercase tracking-wider text-near-black/60 block">
                  Select Package / Tier
                </label>
                {offering.packages.map((pkg, idx) => {
                  const isSelected = selectedPackage.name === pkg.name && !customAmount;
                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        setSelectedPackage(pkg);
                        setCustomAmount("");
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-near-black/15 hover:border-near-black/30 bg-white"
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-charcoal text-sm">{pkg.name}</div>
                        <div className="text-xs text-near-black/60 font-light mt-1">{pkg.description}</div>
                      </div>
                      <div className="text-base font-bold text-primary font-heading shrink-0">
                        ₹{pkg.amount.toLocaleString("en-IN")}
                      </div>
                    </button>
                  );
                })}

                {/* Custom Amount option for Seva */}
                {isSeva && (
                  <div className="pt-2">
                    <label className="text-xs text-near-black/60 font-medium block mb-1">
                      Or Enter Custom Amount (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                )}
              </div>

              {/* Sankalpa Details Form */}
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="border-t border-near-black/10 pt-4">
                  <h4 className="font-heading text-lg font-bold text-charcoal mb-3">
                    Sankalpa & Devotee Information
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                        Devotee Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Sharma"
                        value={devoteeName}
                        onChange={(e) => setDevoteeName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                          Gotra
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Kashyapa"
                          value={gotra}
                          onChange={(e) => setGotra(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                          Rashi / Nakshatra
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Rohini"
                          value={nakshatra}
                          onChange={(e) => setNakshatra(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                          WhatsApp Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={ritualDate}
                          onChange={(e) => setRitualDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-charcoal/80 block mb-1">
                        Prasadam Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        placeholder="House/Flat No, Street, City, State & Pincode"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-near-black/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Total & Submit */}
                <div className="pt-4 border-t border-near-black/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase tracking-wider font-semibold text-near-black/60">
                      Total Dakshina:
                    </span>
                    <span className="font-heading text-2xl font-bold text-primary">
                      ₹{currentAmount.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || currentAmount <= 0}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-ivory font-semibold text-sm tracking-wider uppercase shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    {isSubmitting
                      ? "Submitting Sankalpa..."
                      : isSeva
                      ? `Contribute ₹${currentAmount.toLocaleString("en-IN")}`
                      : `Confirm & Book Pooja (₹${currentAmount.toLocaleString("en-IN")})`}
                  </button>

                  <p className="text-[11px] text-center text-near-black/50 mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    100% Secure Transaction & Consecrated Prasadam Guarantee
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
