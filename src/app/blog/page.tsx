"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, User } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "The Significance of Daily Deepam",
      excerpt: "Lighting a lamp is a timeless tradition in our culture. Discover the spiritual and scientific benefits of lighting a deepam every day in your home.",
      author: "Swami Vidyadharananda",
      date: "Oct 12, 2026",
      readTime: "5 min read",
      image: "/images/5ee0b7c7-778f-4c7c-aef8-29f11ff58d18.png",
      slug: "significance-of-daily-deepam",
      category: "Traditions"
    },
    {
      title: "Understanding Rudraksha Mukhis",
      excerpt: "From Ek Mukhi to Panchamukhi, learn about the different types of Rudraksha beads, their ruling deities, and how to choose the right one for you.",
      author: "Dr. A. Sharma",
      date: "Oct 05, 2026",
      readTime: "8 min read",
      image: "/images/5ef07730-5c33-4e7a-9784-0e6d11b61785.png",
      slug: "understanding-rudraksha-mukhis",
      category: "Sacred Items"
    },
    {
      title: "A Guide to Temple Architecture",
      excerpt: "Explore the Vastu principles behind ancient temple construction and how the sacred geometry aligns cosmic energies to uplift the soul.",
      author: "Architect R. K. Iyer",
      date: "Sep 28, 2026",
      readTime: "10 min read",
      image: "/images/69d3b008-34ea-4b8a-8c26-c4a4b8042947.png",
      slug: "guide-to-temple-architecture",
      category: "Architecture"
    }
  ];

  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-4 block">Journal</span>
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">Spiritual Insights</h1>
          <p className="text-lg font-light text-near-black/70 leading-relaxed">
            Curated articles, stories, and teachings designed to guide your spiritual journey and connect you with ancient wisdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post, idx) => (
            <div key={idx} className="group flex flex-col h-full">
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-near-black relative rounded-xl shadow-sm">
                <Image 
                  src={post.image}
                  alt={`Cover image for ${post.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-sm shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-charcoal">{post.category}</span>
                </div>
              </div>
              
              <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-4 text-xs font-medium text-near-black/50 mb-4 tracking-wide">
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                  <span className="w-1 h-1 rounded-full bg-near-black/20"></span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                
                <h3 className="font-heading text-2xl font-bold text-charcoal mb-4 leading-snug group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-near-black/70 font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t border-near-black/10 pt-4 mt-auto">
                  <span className="text-[10px] font-semibold tracking-wider text-near-black/50 uppercase">{post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="text-charcoal hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group/link">
                    Read Story <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <button 
            onClick={() => alert("More articles coming soon!")}
            className="px-10 py-5 bg-transparent border border-near-black/20 text-charcoal text-xs font-semibold tracking-widest uppercase hover:bg-near-black hover:text-ivory transition-colors rounded-sm"
          >
            Discover More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
