import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight, BookOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books & Literature | Bhakti Seva",
  description:
    "Sacred Vedic scriptures, spiritual books, and divine literature for seekers of wisdom and devotion.",
};

const PRODUCTS = [
  {
    id: "b-1",
    name: "Bhagavad Gita (Deluxe Edition)",
    price: 899,
    rating: 5.0,
    reviews: 412,
    image: "/images/bhagavad_gita_deluxe.jpg",
    badge: "Best Seller",
    description: "Comprehensive commentary by renowned scholars with original Sanskrit shlokas and transliteration.",
    href: "/product/bhagavad-gita-deluxe",
  },
  {
    id: "b-2",
    name: "Four Vedas (Complete Set)",
    price: 3499,
    rating: 4.9,
    reviews: 178,
    image: "/images/four_vedas_stack.png",
    badge: "Premium",
    description: "Complete Rig, Sama, Yajur & Atharva Veda set with Sanskrit text and English translation.",
    href: "/product/four-vedas-stack",
  },
  {
    id: "b-3",
    name: "Vishnu Sahasranama with Commentary",
    price: 649,
    rating: 4.9,
    reviews: 234,
    image: "/images/vishnu_sahasranama_book_1790666053656.jpg",
    badge: "Top Rated",
    description: "The thousand names of Lord Vishnu with phonetic pronunciation guide and meaning of each name.",
    href: "/product/vishnu-sahasranama-book",
  },
  {
    id: "b-4",
    name: "Upanishads Collection",
    price: 1299,
    rating: 4.8,
    reviews: 156,
    image: "/images/upanishads_collection_1790666308780.jpg",
    badge: null,
    description: "Principal twelve Upanishads with Adi Shankaracharya's commentary in a beautifully bound edition.",
    href: "/product/upanishads-collection",
  },
  {
    id: "b-5",
    name: "Vedic Scriptures (Illustrated)",
    price: 1899,
    rating: 4.8,
    reviews: 89,
    image: "/images/vedic_scriptures_book.jpg",
    badge: "New",
    description: "Richly illustrated volume of selected Vedic hymns with hand-drawn mandalas and sacred geometry.",
    href: "/product/vedic-scriptures-illustrated",
  },
  {
    id: "b-6",
    name: "Patanjali Yoga Sutras",
    price: 549,
    rating: 4.7,
    reviews: 203,
    image: "/images/yoga_sutras_book.jpg",
    badge: null,
    description: "Classical yoga philosophy text with word-by-word meaning and practical commentary for modern seekers.",
    href: "/product/yoga-sutras-book",
  },
];

export default function BooksPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Books & Literature</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 h-64 md:h-80">
          <Image
            src="/images/bhagavad_gita_deluxe.jpg"
            alt="Books & Literature"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black/85 via-near-black/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Sacred Wisdom
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-3">Books & Literature</h1>
            <p className="text-ivory/75 font-light max-w-md leading-relaxed">
              Timeless Vedic scriptures and spiritual texts to illuminate your path of devotion and knowledge.
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
