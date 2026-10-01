import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Decor | Bhakti Seva",
  description:
    "Divine idols, sacred sculptures, and spiritual decor items handcrafted by traditional artisans.",
};

const PRODUCTS = [
  {
    id: "d-1",
    name: "Handcrafted Brass Ganesha Idol",
    price: 3299,
    rating: 4.9,
    reviews: 187,
    image: "/images/ganesha_idol_1790594652426.jpg",
    badge: "Best Seller",
    description: "Intricately sculpted panchaloha Ganesha murti consecrated with traditional mantras for home puja.",
    href: "/product/brass-ganesha-idol",
  },
  {
    id: "d-2",
    name: "Shri Mahalakshmi Idol",
    price: 2799,
    rating: 4.8,
    reviews: 143,
    image: "/images/lakshmi_idol_1790600292175.jpg",
    badge: "Top Rated",
    description: "Beautifully crafted brass Lakshmi Devi seated on lotus — ideal for Dhanakarshana puja.",
    href: "/product/lakshmi-brass-idol",
  },
  {
    id: "d-3",
    name: "Hanuman Panchadhatu Idol",
    price: 4199,
    rating: 4.9,
    reviews: 98,
    image: "/images/hanuman_panchadhatu_idol.png",
    badge: "Premium",
    description: "Sacred five-metal alloy Hanuman idol in vira mudra — a powerful guardian for home and temple.",
    href: "/product/shiva-lingam",
  },
  {
    id: "d-4",
    name: "Silver Kalash",
    price: 1999,
    rating: 4.7,
    reviews: 76,
    image: "/images/silver_kalash.jpg",
    badge: null,
    description: "Pure silver-plated ceremonial kalash for Vastu puja, Devi invocations, and festival rituals.",
    href: "/product/pure-silver-kalash",
  },
  {
    id: "d-5",
    name: "Panchamukhi Brass Diya",
    price: 1499,
    rating: 4.8,
    reviews: 112,
    image: "/images/brass_diya_lamp_1790600275229.jpg",
    badge: "New",
    description: "Five-flame brass lamp representing the Pancha Bhuta — ideal for evening aarti and Diwali.",
    href: "/product/traditional-brass-diya",
  },
  {
    id: "d-6",
    name: "Festival Puja Box & Decor Set",
    price: 2499,
    rating: 4.9,
    reviews: 54,
    image: "/images/f83160f2-e296-429f-b981-6ad98ac5b923.png",
    badge: "Gift Ready",
    description: "Complete festive setup for Diwali, Navratri, and auspicious family celebrations.",
    href: "/product/silver-puja-thali-gift",
  },
];

export default function SpiritualDecorPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Spiritual Decor</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 h-64 md:h-80">
          <Image
            src="/images/ganesha_idol_1790594652426.jpg"
            alt="Spiritual Decor"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black/80 via-near-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Divine Artistry</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-3">Spiritual Decor</h1>
            <p className="text-ivory/75 font-light max-w-md leading-relaxed">
              Handcrafted sacred idols and divine decor that transform your home into a living temple.
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
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-primary/90 text-ivory backdrop-blur-sm">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-xs text-near-black/65 font-light leading-relaxed mb-3 line-clamp-2">{product.description}</p>
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
                    <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
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
