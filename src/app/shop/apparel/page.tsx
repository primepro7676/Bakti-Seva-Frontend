import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight, Shirt } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Apparel | Bhakti Seva",
  description:
    "Traditional Indian spiritual attire — handwoven kurtas, silk dhoti, meditation shawls, and sacred sarees.",
};

const PRODUCTS = [
  {
    id: "a-1",
    name: "Handwoven Cotton Kurta",
    price: 1299,
    rating: 4.8,
    reviews: 167,
    image: "/images/handwoven_cotton_kurta_1790665442085.jpg",
    badge: "Best Seller",
    description: "Hand-spun khadi cotton kurta in natural ivory — ideal for puja, meditation and daily spiritual practice.",
    href: "/product/cotton-kurta",
  },
  {
    id: "a-2",
    name: "Pure Silk Dhoti",
    price: 2199,
    rating: 4.9,
    reviews: 112,
    image: "/images/pure_silk_dhoti_1790665459384.jpg",
    badge: "Premium",
    description: "Traditional south-Indian silk dhoti with zari border, perfect for temple visits and sacred ceremonies.",
    href: "/product/silk-dhoti-set",
  },
  {
    id: "a-3",
    name: "Meditation Shawl (Cashmere Blend)",
    price: 3499,
    rating: 4.9,
    reviews: 89,
    image: "/images/meditation_shawl_1790665481973.jpg",
    badge: "Top Rated",
    description: "Luxuriously soft cashmere-wool meditation shawl with sacred Om embroidery for deep spiritual practice.",
    href: "/product/meditation-shawl",
  },
  {
    id: "a-4",
    name: "Premium Silk Saree",
    price: 4999,
    rating: 4.8,
    reviews: 74,
    image: "/images/premium_silk_saree_1790666295099.jpg",
    badge: "Gift Ready",
    description: "Kanjivaram-style silk saree with traditional temple border, woven by master weavers for festive occasions.",
    href: "/product/kanchipuram-silk-saree",
  },
  {
    id: "a-5",
    name: "Saffron Puja Dhoti Set",
    price: 899,
    rating: 4.7,
    reviews: 143,
    image: "/images/handwoven_cotton_kurta_1790665442085.jpg",
    badge: "New",
    description: "Auspicious saffron cotton dhoti and angavastram set for performing daily rituals and temple seva.",
    href: "/product/navratna-mala-apparel",
  },
  {
    id: "a-6",
    name: "White Linen Kurta Pyjama",
    price: 1599,
    rating: 4.7,
    reviews: 98,
    image: "/images/pure_silk_dhoti_1790665459384.jpg",
    badge: null,
    description: "Breathable linen kurta-pyjama set in pure white — the garment of spiritual seekers and sadhana practitioners.",
    href: "/product/cotton-kurta",
  },
];

export default function ApparelPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Apparel</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 h-64 md:h-80">
          <Image
            src="/images/premium_silk_saree_1790666295099.jpg"
            alt="Spiritual Apparel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black/85 via-near-black/55 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2 flex items-center gap-2">
              <Shirt className="w-4 h-4" /> Sacred Attire
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-3">Spiritual Apparel</h1>
            <p className="text-ivory/75 font-light max-w-md leading-relaxed">
              Handwoven, natural-fibre clothing that honours tradition — dress your body as a temple of the divine.
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
