import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Puja Essentials | Bhakti Seva",
  description:
    "Authentic puja essentials including brass diyas, incense sticks, rudraksha malas, puja thali sets and more.",
};

const PRODUCTS = [
  {
    id: "pe-1",
    name: "Premium Brass Diya Set",
    price: 799,
    rating: 4.9,
    reviews: 214,
    image: "/images/brass_diya_lamp_1790600275229.jpg",
    badge: "Best Seller",
    description: "Hand-crafted 5-piece brass diya set for daily puja and festive celebrations.",
    href: "/product/traditional-brass-diya",
  },
  {
    id: "pe-2",
    name: "Rudraksha Mala (108+1 Beads)",
    price: 1299,
    rating: 4.8,
    reviews: 189,
    image: "/images/rudraksha_mala_1790594628771.jpg",
    badge: "Top Rated",
    description: "Authentic Himalayan 5-mukhi rudraksha beads energized at the Shiva altar for meditation and japa.",
    href: "/product/premium-rudraksha-mala",
  },
  {
    id: "pe-3",
    name: "Sacred Puja Thali Set",
    price: 1599,
    rating: 4.7,
    reviews: 156,
    image: "/images/pooja_thali_set_1790594617235.jpg",
    badge: "Premium",
    description: "Complete puja thali with brass kalash, incense holder, diya, and bell for daily rituals.",
    href: "/product/premium-pooja-thali-set",
  },
  {
    id: "pe-4",
    name: "Natural Temple Incense Sticks",
    price: 299,
    rating: 4.9,
    reviews: 342,
    image: "/images/incense_sticks_1790594641127.jpg",
    badge: "New",
    description: "Hand-rolled organic incense crafted from sacred herbs, temple flowers, and pure resins.",
    href: "/product/organic-incense-bundle",
  },
  {
    id: "pe-5",
    name: "Crystal Sphatik Mala",
    price: 949,
    rating: 4.7,
    reviews: 98,
    image: "/images/crystal_mala_1790600304405.jpg",
    badge: null,
    description: "Natural quartz crystal mala consecrated for Devi worship and healing meditation.",
    href: "/product/crystal-sphatik-mala",
  },
  {
    id: "pe-6",
    name: "Silver Puja Thali Gift Set",
    price: 3499,
    rating: 4.9,
    reviews: 67,
    image: "/images/silver_puja_thali_gift.jpg",
    badge: "Gift Ready",
    description: "Silver-plated premium puja thali set elegantly presented in a gift box — perfect for weddings and housewarming.",
    href: "/product/silver-puja-thali-gift",
  },
];

export default function PujaEssentialsPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-5">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Puja Essentials</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-14 h-64 md:h-80">
          <Image
            src="/images/pooja_thali_set_1790594617235.jpg"
            alt="Puja Essentials"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black/80 via-near-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-10">
            <span className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">Sacred Collection</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-ivory mb-3">Puja Essentials</h1>
            <p className="text-ivory/75 font-light max-w-md leading-relaxed">
              Authentic, consecrated items for your daily puja — sourced from trusted artisans and temple craftsmen.
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
