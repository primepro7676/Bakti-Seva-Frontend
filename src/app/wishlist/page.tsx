"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowLeft, Star, ShieldCheck, Sparkles, Plus } from "lucide-react";

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  inStock: boolean;
}

const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    name: "Handcrafted Brass Diya Set",
    category: "Puja Essentials",
    price: 899,
    originalPrice: 1299,
    image: "/images/brass_diya_lamp.jpg",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "w2",
    name: "Original 5 Mukhi Rudraksha Mala",
    category: "Puja Essentials",
    price: 1499,
    originalPrice: 1999,
    image: "/images/rudraksha_mala_1790594628771.jpg",
    rating: 5.0,
    inStock: true,
  },
  {
    id: "w3",
    name: "Brass Ganesha Idol (Handcrafted)",
    category: "Spiritual Decor",
    price: 3499,
    originalPrice: 4299,
    image: "/images/ganesha_idol_1790594652426.jpg",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "w4",
    name: "Srimad Bhagavad Gita (Deluxe Hardcover)",
    category: "Books & Literature",
    price: 799,
    originalPrice: 999,
    image: "/images/bhagavad_gita_deluxe.jpg",
    rating: 5.0,
    inStock: true,
  },
];

const RECOMMENDED_ITEMS: WishlistItem[] = [
  {
    id: "r1",
    name: "Goddess Lakshmi Brass Statue",
    category: "Spiritual Decor",
    price: 3299,
    originalPrice: 3999,
    image: "/images/lakshmi_idol_1790600292175.jpg",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "r2",
    name: "Pure Silk Dhoti & Angavastram Set",
    category: "Apparel",
    price: 2999,
    originalPrice: 3800,
    image: "/images/pure_silk_dhoti_1790665459384.jpg",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "r3",
    name: "Royal Silver Pooja Thali Gift Set",
    category: "Puja Essentials",
    price: 2499,
    originalPrice: 3200,
    image: "/images/pooja_thali_set_1790594617235.jpg",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "r4",
    name: "Sacred Upanishads Hardcover Series",
    category: "Books & Literature",
    price: 1200,
    originalPrice: 1599,
    image: "/images/upanishads_collection_1790666308780.jpg",
    rating: 5.0,
    inStock: true,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    setAddedToCartId(id);
    setTimeout(() => setAddedToCartId(null), 2000);
  };

  const handleAddToWishlist = (item: WishlistItem) => {
    if (!items.some((i) => i.id === item.id)) {
      setItems((prev) => [...prev, item]);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20">
      {/* Header spacing & Breadcrumb */}
      <div className="pt-28 pb-6 bg-sand/30 border-b border-near-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-charcoal/70 hover:text-accent font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal flex items-center gap-3">
                <Heart className="w-8 h-8 text-accent fill-accent animate-pulse" /> My Sacred Wishlist
              </h1>
              <p className="text-sm text-charcoal/70 mt-1 font-light">
                {items.length === 0
                  ? "Your wishlist is currently empty"
                  : `You have ${items.length} saved item${items.length === 1 ? "" : "s"} in your wishlist`}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={() => setItems([])}
                className="text-xs text-red-600 hover:text-red-800 font-medium underline underline-offset-4"
              >
                Clear All Items
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-xl mx-auto border border-near-black/5 shadow-sm my-8">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-3 text-charcoal">Your Wishlist is Empty</h2>
            <p className="text-charcoal/70 text-sm mb-8 leading-relaxed font-light">
              Explore our divine collection of pooja essentials, idols, books, and sacred apparel to save your favorites for later.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-all shadow-md"
            >
              Explore Spiritual Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-near-black/5 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-sand/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-charcoal/70 hover:text-red-600 hover:bg-white flex items-center justify-center transition-all shadow-md"
                      title="Remove from Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-md text-ivory text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-xs font-semibold text-charcoal">{item.rating}</span>
                      <span className="text-xs text-charcoal/40 ml-1">• In Stock</span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-charcoal line-clamp-1 group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>

                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-lg font-bold text-charcoal">₹{item.price.toLocaleString("en-IN")}</span>
                      <span className="text-xs text-charcoal/40 line-through">₹{item.originalPrice.toLocaleString("en-IN")}</span>
                      <span className="text-[11px] font-semibold text-emerald-600 ml-auto">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                      addedToCartId === item.id
                        ? "bg-emerald-600 text-white"
                        : "bg-accent text-white hover:bg-accent/90"
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {addedToCartId === item.id ? "Added to Cart! ✓" : "Move to Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended Sacred Products Section */}
        <div className="mt-20 pt-12 border-t border-near-black/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-charcoal flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-accent" /> Recommended for Your Devotional Journey
              </h2>
              <p className="text-xs sm:text-sm text-charcoal/60 mt-1 font-light">
                Hand-selected consecrated items favored by devotees
              </p>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              View Full Shop →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOMMENDED_ITEMS.map((item) => {
              const isAlreadyInWishlist = items.some((i) => i.id === item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-near-black/5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square overflow-hidden bg-sand/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => handleAddToWishlist(item)}
                        disabled={isAlreadyInWishlist}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
                          isAlreadyInWishlist
                            ? "bg-accent text-white cursor-default"
                            : "bg-white/90 text-charcoal/70 hover:text-accent hover:bg-white"
                        }`}
                        title={isAlreadyInWishlist ? "Saved in Wishlist" : "Add to Wishlist"}
                      >
                        <Heart className={`w-4 h-4 ${isAlreadyInWishlist ? "fill-white" : ""}`} />
                      </button>
                      <span className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-md text-ivory text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1 text-amber-500 mb-1.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span className="text-xs font-semibold text-charcoal">{item.rating}</span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-charcoal line-clamp-1 group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>

                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="text-lg font-bold text-charcoal">₹{item.price.toLocaleString("en-IN")}</span>
                        <span className="text-xs text-charcoal/40 line-through">
                          ₹{item.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleAddToWishlist(item)}
                      disabled={isAlreadyInWishlist}
                      className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                        isAlreadyInWishlist
                          ? "bg-sand/40 text-charcoal/60 cursor-default"
                          : "bg-sand/30 text-charcoal hover:bg-accent hover:text-white"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      {isAlreadyInWishlist ? "In Wishlist ✓" : "Add to Wishlist"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-near-black/10">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 border border-near-black/5">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">100% Authentic Products</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Directly sourced & consecrated by temple priests</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 border border-near-black/5">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">Express Pan-India Shipping</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Safe, eco-friendly divine packaging</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 border border-near-black/5">
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-charcoal">Devotee Satisfaction</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">Dedicated spiritual guidance & support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
