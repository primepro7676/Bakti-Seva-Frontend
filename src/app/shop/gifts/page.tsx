import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight, Gift, Package } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gift Sets | Bhakti Seva",
  description:
    "Curated sacred gift sets for festivals, weddings, housewarmings and blessings — beautifully packaged with love.",
};

const PRODUCTS = [
  {
    id: "g-1",
    name: "Silver Puja Thali Gift Set",
    price: 3499,
    rating: 4.9,
    reviews: 312,
    image: "/images/silver_puja_thali_gift.jpg",
    badge: "Most Gifted",
    occasion: "Housewarming & Diwali",
    includes: ["Silver-plated thali", "Brass diya", "Incense holder", "Bell", "Velvet gift box"],
    description: "A complete, elegant puja set elegantly presented in a premium gift box — a cherished blessing for any home.",
    href: "/product/silver-puja-thali-gift",
  },
  {
    id: "g-2",
    name: "Festival Puja Box & Brass Diya",
    price: 2499,
    rating: 4.8,
    reviews: 245,
    image: "/images/f83160f2-e296-429f-b981-6ad98ac5b923.png",
    badge: "Festive Special",
    occasion: "Navratri & Diwali",
    includes: ["Brass diya set", "Kumkum & turmeric", "Sandalwood incense", "Flower garland", "Gift wrap"],
    description: "Complete festive setup for Diwali, Navratri, and auspicious family celebrations.",
    href: "/product/premium-pooja-thali-set",
  },
  {
    id: "g-3",
    name: "Spiritual Wellness Gift Hamper",
    price: 1999,
    rating: 4.8,
    reviews: 178,
    image: "/images/pooja_thali_set_1790594617235.jpg",
    badge: "Top Pick",
    occasion: "Birthdays & Anniversaries",
    includes: ["Rudraksha mala", "Sphatik bracelet", "Bhagavad Gita", "Sandalwood incense", "Wicker basket"],
    description: "A thoughtful hamper blending sacred items for daily practice — a gift that nurtures the soul.",
    href: "/product/organic-incense-bundle",
  },
  {
    id: "g-4",
    name: "Sacred Idol & Decor Bundle",
    price: 4999,
    rating: 4.9,
    reviews: 134,
    image: "/images/ganesha_idol_1790594652426.jpg",
    badge: "Premium",
    occasion: "Weddings & Griha Pravesh",
    includes: ["Brass Ganesha idol", "Kalash", "Puja thali", "Incense set", "Luxury box"],
    description: "A premium sacred home decor bundle to bless a new home or celebrate a sacred union.",
    href: "/product/brass-ganesha-idol",
  },
  {
    id: "g-5",
    name: "Vedic Book Gift Set",
    price: 1499,
    rating: 4.8,
    reviews: 98,
    image: "/images/bhagavad_gita_deluxe.jpg",
    badge: "Wisdom Gift",
    occasion: "Gurukula & Graduation",
    includes: ["Bhagavad Gita", "Vishnu Sahasranama", "Yoga Sutras", "Bookmark", "Canvas bag"],
    description: "Three timeless Vedic texts beautifully bundled — ideal for students, seekers, and scholars.",
    href: "/product/vedic-scriptures-illustrated",
  },
  {
    id: "g-6",
    name: "Devotional Starter Kit",
    price: 899,
    rating: 4.7,
    reviews: 267,
    image: "/images/rudraksha_mala_1790594628771.jpg",
    badge: "Beginner Friendly",
    occasion: "All Occasions",
    includes: ["Rudraksha mala", "Small brass diya", "Incense sticks", "Kumkum", "Booklet on daily puja"],
    description: "Everything a new devotee needs to begin their daily puja practice — a heartfelt starter gift.",
    href: "/product/bhagavad-gita-deluxe",
  },
];

export default function GiftSetsPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Gift Sets</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 h-64 md:h-80">
          <Image
            src="/images/silver_puja_thali_gift.jpg"
            alt="Gift Sets"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black/85 via-near-black/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2 flex items-center gap-2">
              <Gift className="w-4 h-4" /> Curated With Love
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-3">Gift Sets</h1>
            <p className="text-ivory/75 font-light max-w-md leading-relaxed">
              Sacred, beautifully packaged gift hampers for every occasion — carry divine blessings to loved ones.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-near-black/10 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-near-black">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/90 text-ivory backdrop-blur-sm">
                    {product.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-charcoal backdrop-blur-sm">
                    {product.occasion}
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-xs text-near-black/65 font-light leading-relaxed mb-3 line-clamp-2">{product.description}</p>

                {/* Includes */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.includes.slice(0, 3).map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sand/50 text-[10px] font-medium text-near-black/70">
                      <Package className="w-2.5 h-2.5" /> {item}
                    </span>
                  ))}
                  {product.includes.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full bg-sand/50 text-[10px] font-medium text-near-black/50">
                      +{product.includes.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-500 mb-4">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-near-black/40 ml-1">({product.reviews})</span>
                </div>
                <div className="mt-auto pt-4 border-t border-near-black/10 flex items-center justify-between">
                  <span className="font-heading text-xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-near-black text-ivory hover:bg-primary text-xs font-semibold uppercase tracking-wide transition-all duration-300"
                  >
                    <Gift className="w-3.5 h-3.5" /> Gift This
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
