import { ArrowRight, Star, Sun, Book } from "lucide-react";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Services",
  description: "Book personalized pujas, vedic astrology consultations, and vastu consultations with our experienced pandits.",
};

export default function Services() {
  const services = [
    {
      title: "Personalized Pujas",
      description: "Book customized pujas performed by experienced pandits for specific milestones, planetary doshas, or general well-being.",
      icon: <Sun className="w-5 h-5" />,
      image: "/images/f83160f2-e296-429f-b981-6ad98ac5b923.png"
    },
    {
      title: "Vedic Astrology",
      description: "Consult with our renowned astrologers for Janam Kundali analysis, muhurat selection, and life guidance based on Vedic principles.",
      icon: <Star className="w-5 h-5" />,
      image: "/images/003fe7c4-81e7-480d-9df1-e7656dbb0eed.png"
    },
    {
      title: "Vastu Consultations",
      description: "Harmonize your home or workspace with ancient Vastu Shastra techniques to invite prosperity and positive energy.",
      icon: <Book className="w-5 h-5" />,
      image: "/images/563a6eef-a6d2-4ae0-9b18-6ef036ef0f3f.png"
    }
  ];

  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-accent mb-4 block">Expert Guidance</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">Our Services</h1>
          <p className="text-lg font-light text-near-black/70 leading-relaxed">
            Expert spiritual services designed to guide, protect, and bless your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="group flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-near-black/5 hover:border-accent">
              <div className="aspect-[4/3] relative overflow-hidden bg-near-black">
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-ivory flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-ivory">
                    {service.icon}
                  </div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col z-10 bg-white relative">
                <h3 className="font-heading text-2xl font-bold mb-4 text-charcoal group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-near-black/70 font-light mb-8 flex-1 leading-relaxed">
                  {service.description}
                </p>
                <button className="flex items-center justify-between w-full border border-near-black/20 hover:bg-near-black hover:text-ivory hover:border-near-black text-charcoal text-xs font-semibold tracking-widest uppercase px-6 py-4 rounded-sm transition-colors group/btn">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
