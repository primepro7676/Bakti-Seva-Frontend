import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Arrivals | Bhakti Seva",
  description:
    "Discover the latest additions to our sacred collection — freshly sourced idols, books, puja essentials and more.",
};

const PRODUCTS = [
  {
    id: "n-1",
    name: "Natural Temple Incense Sticks",
    price: 299,
    rating: 4.9,
    reviews: 342,
    image: "/images/incense_sticks_1790594641127.jpg",
    category: "Puja Essentials",
    description: "Hand-rolled organic incense crafted from sacred herbs, temple flowers, and pure resins.",
    href: "/product/organic-incense-bundle",
  },
  {
    id: "n-2",
    name: "Vedic Scriptures (Illustrated)",
    price: 1899,
    rating: 4.8,
    reviews: 89,
    image: "/images/vedic_scriptures_book.jpg",
    category: "Books",
    description: "Richly illustrated volume of selected Vedic hymns with hand-drawn mandalas and sacred geometry.",
    href: "/product/vedic-scriptures-illustrated",
  },
  {
    id: "n-3",
    name: "Saffron Puja Dhoti Set",
    price: 899,
    rating: 4.7,
    reviews: 143,
    image: "/images/handwoven_cotton_kurta_1790665442085.jpg",
    category: "Apparel",
    description: "Auspicious saffron cotton dhoti and angavastram set for performing daily rituals and temple seva.",
    href: "/product/silk-dhoti-set",
  },
  {
    id: "n-4",
    name: "Crystal Sphatik Mala",
    price: 949,
    rating: 4.7,
    reviews: 98,
    image: "/images/crystal_mala_1790600304405.jpg",
    category: "Puja Essentials",
    description: "Natural quartz crystal mala consecrated for Devi worship and healing meditation.",
    href: "/product/crystal-sphatik-mala",
  },
  {
    id: "n-5",
    name: "Panchamukhi Brass Diya",
    price: 1499,
    rating: 4.8,
    reviews: 112,
    image: "/images/brass_diya_lamp_1790600275229.jpg",
    category: "Spiritual Decor",
    description: "Five-flame brass lamp representing the Pancha Bhuta — ideal for evening aarti and Diwali.",
    href: "/product/traditional-brass-diya",
  },
  {
    id: "n-6",
    name: "Upanishads Collection",
    price: 1299,
    rating: 4.8,
    reviews: 156,
    image: "/images/upanishads_collection_1790666308780.jpg",
    category: "Books",
    description: "Principal twelve Upanishads with Adi Shankaracharya's commentary in a beautifully bound edition.",
    href: "/product/upanishads-collection",
  },
];

export default function NewArrivalsPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">New Arrivals</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 text-accent border border-accent/30 text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Just Arrived
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-3">New Arrivals</h1>
          <p className="text-near-black/60 font-light max-w-xl leading-relaxed">
            The latest additions to our sacred collection — handpicked from temple artisans, Vedic scholars, and traditional craftsmen.
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
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-accent/90 text-charcoal backdrop-blur-sm">
                    New
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-charcoal backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
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
