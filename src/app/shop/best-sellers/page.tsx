import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight, TrendingUp } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Sellers | Bhakti Seva",
  description:
    "Our most-loved sacred products — top-rated by thousands of devotees across India and worldwide.",
};

const PRODUCTS = [
  {
    id: "bs-1",
    name: "Rudraksha Mala (108+1 Beads)",
    price: 1299,
    originalPrice: 1699,
    rating: 4.9,
    reviews: 2341,
    image: "/images/rudraksha_mala_1790594628771.jpg",
    rank: 1,
    description: "Authentic Himalayan 5-mukhi rudraksha beads energized at the Shiva altar for meditation and japa.",
    href: "/product/premium-rudraksha-mala",
  },
  {
    id: "bs-2",
    name: "Bhagavad Gita (Deluxe Edition)",
    price: 899,
    originalPrice: 1199,
    rating: 5.0,
    reviews: 1876,
    image: "/images/bhagavad_gita_deluxe.jpg",
    rank: 2,
    description: "Comprehensive commentary with original Sanskrit shlokas and transliteration — a devotee's lifetime companion.",
    href: "/product/bhagavad-gita-deluxe",
  },
  {
    id: "bs-3",
    name: "Premium Brass Diya Set",
    price: 799,
    originalPrice: 999,
    rating: 4.9,
    reviews: 1543,
    image: "/images/brass_diya_lamp_1790600275229.jpg",
    rank: 3,
    description: "Hand-crafted 5-piece brass diya set for daily puja and festive celebrations.",
    href: "/product/traditional-brass-diya",
  },
  {
    id: "bs-4",
    name: "Sacred Puja Thali Set",
    price: 1599,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 987,
    image: "/images/pooja_thali_set_1790594617235.jpg",
    rank: 4,
    description: "Complete puja thali with brass kalash, incense holder, diya, and bell for daily rituals.",
    href: "/product/premium-pooja-thali-set",
  },
  {
    id: "bs-5",
    name: "Handcrafted Brass Ganesha Idol",
    price: 3299,
    originalPrice: 3999,
    rating: 4.9,
    reviews: 876,
    image: "/images/ganesha_idol_1790594652426.jpg",
    rank: 5,
    description: "Intricately sculpted panchaloha Ganesha murti consecrated with traditional mantras.",
    href: "/product/brass-ganesha-idol",
  },
  {
    id: "bs-6",
    name: "Natural Temple Incense Sticks",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    reviews: 2105,
    image: "/images/incense_sticks_1790594641127.jpg",
    rank: 6,
    description: "Hand-rolled organic incense crafted from sacred herbs, temple flowers, and pure resins.",
    href: "/product/organic-incense-bundle",
  },
];

export default function BestSellersPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Best Sellers</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-widest uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5" /> Most Loved
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-3">Best Sellers</h1>
          <p className="text-near-black/60 font-light max-w-xl leading-relaxed">
            Our most-cherished products, chosen by thousands of devoted seekers. Every item carries authentic blessings.
          </p>
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
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-ivory text-xs font-black shadow-lg">
                    #{product.rank}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-amber-500/90 text-white backdrop-blur-sm">
                    Best Seller
                  </span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-lg font-bold text-charcoal mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="text-xs text-near-black/65 font-light leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 text-xs text-amber-500 mb-4">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-near-black/40 ml-1">({product.reviews.toLocaleString("en-IN")} reviews)</span>
                </div>
                <div className="mt-auto pt-4 border-t border-near-black/10 flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xl font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</span>
                    <span className="text-xs text-near-black/40 line-through ml-2">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                  </div>
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
