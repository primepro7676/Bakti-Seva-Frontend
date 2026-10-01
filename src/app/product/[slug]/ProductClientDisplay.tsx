"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Star,
  Heart,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
  Share2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { ProductCard } from "@/components/product/ProductCard";
import { formatCurrency } from "@/lib/utils";

interface ProductProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    lifestyleImage: string;
    categorySlug: string;
    categoryName: string;
    stock: number;
  };
  related: {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
    category?: { name: string } | null;
  }[];
}

export function ProductClientDisplay({ product, related }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
  const [pincode, setPincode] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const rating = 4.9;
  const reviews = 86;
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
    });
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2500);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const gallery = product.images;
  const discount = Math.round(product.price * 0.15);
  const originalPrice = product.price + discount;

  return (
    <div className="min-h-screen pt-28">
      {/* Primary Product Section */}
      <section className="bg-[#FFFDF7] pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-[#49332D]/50 mb-10 flex items-center gap-2">
            <Link href="/" className="hover:text-[#C69A4B] transition-colors">
              Home
            </Link>
            <span className="text-[#49332D]/30">/</span>
            <Link href="/shop" className="hover:text-[#C69A4B] transition-colors">
              Shop
            </Link>
            <span className="text-[#49332D]/30">/</span>
            <Link
              href={`/shop?category=${product.categorySlug}`}
              className="hover:text-[#C69A4B] transition-colors"
            >
              {product.categoryName}
            </Link>
            <span className="text-[#49332D]/30">/</span>
            <span className="text-[#49332D]">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 h-full">
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-[88px] shrink-0 pb-2 md:pb-0 hide-scrollbar">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-24 shrink-0 overflow-hidden bg-[#EEE3D0] transition-all duration-300 ${
                      activeImage === img
                        ? "ring-2 ring-[#C69A4B] ring-offset-2"
                        : "opacity-55 hover:opacity-90"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="flex-1 bg-[#F8F1E5]/50 aspect-[3/4] md:aspect-auto md:h-[680px] relative overflow-hidden">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 hover:scale-105 cursor-zoom-in"
                />
                <span className="absolute top-5 left-5 bg-[#641E2E] text-[#FFFDF7] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest">
                  {product.categoryName}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col py-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-[#C69A4B] gap-0.5">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <Star className="w-3.5 h-3.5 fill-current opacity-60" />
                  </div>
                  <span className="text-xs font-medium text-[#49332D]/60">
                    {rating} ({reviews} reviews)
                  </span>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="text-[#49332D]/40 hover:text-[#641E2E] transition-colors"
                  aria-label="Add to Wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-[#641E2E] text-[#641E2E]" : ""}`}
                  />
                </button>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.6rem] font-bold mb-5 text-[#342B27] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-3xl font-bold text-[#641E2E]">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-base text-[#49332D]/40 line-through">
                  {formatCurrency(originalPrice)}
                </span>
                <span className="text-xs font-bold text-[#641E2E] bg-[#F3E6E1] px-2 py-1 rounded">
                  SAVE {formatCurrency(discount)}
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#49332D]/50 uppercase tracking-wide mb-8 block">
                Inclusive of all taxes • Free shipping above ₹999
              </span>

              <p className="text-[#49332D]/80 leading-relaxed font-light mb-8 text-sm">
                {product.description}
              </p>

              <div className="mb-8 p-5 bg-[#F8F1E5] border border-[#EEE3D0]">
                <label className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#49332D] mb-3 uppercase">
                  <MapPin className="w-4 h-4 text-[#C69A4B]" /> Check Delivery Options
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-1 bg-[#FFFDF7] border border-[#EEE3D0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C69A4B] transition-colors"
                    maxLength={6}
                  />
                  <button className="px-6 bg-[#641E2E] text-[#FFFDF7] text-xs font-bold tracking-widest uppercase hover:bg-[#7B233A] transition-colors">
                    Check
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#EEE3D0] h-14 bg-[#FFFDF7]">
                    <button
                      className="w-12 h-full flex items-center justify-center hover:bg-[#EEE3D0]/50 transition-colors text-[#342B27] font-bold text-lg"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={!inStock}
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold text-[#342B27]">
                      {quantity}
                    </span>
                    <button
                      className="w-12 h-full flex items-center justify-center hover:bg-[#EEE3D0]/50 transition-colors text-[#342B27] font-bold text-lg"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={!inStock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={`flex-1 h-14 font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      cartAdded
                        ? "bg-emerald-700 text-[#FFFDF7]"
                        : "bg-[#641E2E] hover:bg-[#7B233A] text-[#FFFDF7]"
                    }`}
                    disabled={!inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cartAdded ? "Added to Cart ✓" : "Add to Cart"}
                  </button>
                </div>

                {!inStock && (
                  <span className="text-[#7B233A] font-medium text-sm flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Currently Out of Stock
                  </span>
                )}

                <button className="flex items-center gap-2 text-xs font-semibold text-[#49332D]/50 hover:text-[#641E2E] transition-colors self-start">
                  <Share2 className="w-3.5 h-3.5" /> Share this item
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-[#EEE3D0]">
                {[
                  { icon: ShieldCheck, label: "Authentic Quality" },
                  { icon: Truck, label: "Express Shipping" },
                  { icon: CheckCircle2, label: "Secure Payments" },
                  { icon: RotateCcw, label: "Easy Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#C69A4B]" />
                    <span className="text-[11px] font-bold text-[#49332D] uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Story */}
      <section className="bg-[#F8F1E5] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
              <div
                className="relative aspect-[4/5] overflow-hidden border border-[#C69A4B]/20"
                style={{ borderRadius: 12 }}
              >
                <Image
                  src={product.lifestyleImage}
                  alt={`${product.name} lifestyle`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A76050]">
                Product Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#641E2E] mt-3 mb-5">
                Crafted for quiet devotion
              </h2>
              <p className="text-[#49332D] font-light leading-relaxed text-base md:text-lg max-w-xl">
                {product.description} Designed to bring presence into everyday
                ritual — warm materials, considered detail, and a calm aesthetic
                that belongs in a modern Indian home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[900px]">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A76050]">
            Details
          </span>
          <h2 className="font-heading text-3xl font-bold text-[#641E2E] mt-3 mb-8">
            Product details & specifications
          </h2>
          <div className="flex flex-col border-t border-[#EEE3D0]">
            {[
              {
                id: "description",
                label: "Description",
                content: `${product.description}\n\nEach item is carefully sourced and consecrated before shipping to ensure it carries the highest spiritual vibration for your sacred space.`,
              },
              {
                id: "shipping",
                label: "Shipping & Returns",
                content:
                  "Orders are processed within 24–48 hours. Standard delivery in 3–5 business days across India. We offer a 7-day hassle-free return policy for unopened items in original packaging.",
              },
              {
                id: "care",
                label: "Product Care",
                content:
                  "Gently wipe with a soft, dry cloth. Avoid harsh chemicals or direct moisture. Store in the original packaging away from direct sunlight to preserve craftsmanship.",
              },
            ].map(({ id, label, content }) => (
              <div key={id} className="border-b border-[#EEE3D0]">
                <button
                  className="w-full flex items-center justify-between py-5 text-left"
                  onClick={() => toggleAccordion(id)}
                >
                  <span className="font-heading text-lg font-bold text-[#342B27]">
                    {label}
                  </span>
                  {openAccordion === id ? (
                    <ChevronUp className="w-5 h-5 text-[#49332D]/40" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#49332D]/40" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openAccordion === id
                      ? "max-h-96 pb-5 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#49332D]/70 font-light leading-relaxed text-sm whitespace-pre-line">
                    {content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Story Behind This Piece */}
      <section className="bg-[#F3E6E1] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-[800px] text-center">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A76050]">
            Heritage
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#641E2E] mt-3 mb-5">
            The story behind this piece
          </h2>
          <p className="text-[#49332D] font-light leading-relaxed text-base md:text-lg">
            Inspired by temple libraries and family prayer rooms, this piece
            carries the quiet discipline of tradition into contemporary living —
            never loud, always intentional.
          </p>
        </div>
      </section>

      {/* Frequently Bought Together */}
      {related.length > 0 && (
        <section className="bg-[#EEE3D0] py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A76050]">
              Complete the ritual
            </span>
            <h2 className="font-heading text-3xl font-bold text-[#641E2E] mt-3 mb-10">
              Frequently bought together
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.slice(0, 4).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="bg-[#FFFDF7] py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-[900px]">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A76050]">
            Voices of devotion
          </span>
          <h2 className="font-heading text-3xl font-bold text-[#641E2E] mt-3 mb-8">
            Reviews
          </h2>
          <div className="space-y-6">
            {[
              {
                name: "Ananya R.",
                text: "Beautifully presented and arrived with care. Feels worthy of our home altar.",
              },
              {
                name: "Vikram S.",
                text: "Premium quality and thoughtful packaging. Exactly the calm aesthetic we wanted.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="border border-[#EEE3D0] bg-[#FFFDF7] p-6"
              >
                <div className="flex items-center gap-1 text-[#C69A4B] mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-[#49332D] font-light leading-relaxed mb-3">
                  “{review.text}”
                </p>
                <span className="text-xs font-bold tracking-wider uppercase text-[#641E2E]">
                  {review.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {related.length > 0 && (
        <section className="bg-[#F8F1E5] py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#A76050]">
              Continue exploring
            </span>
            <h2 className="font-heading text-3xl font-bold text-[#641E2E] mt-3 mb-10">
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.slice(0, 4).map((item) => (
                <ProductCard key={`also-${item.id}`} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Viewed placeholder rhythm */}
      <section className="bg-white py-12 border-t border-[#EEE3D0]">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#49332D]/50">
            Recently viewed items appear as you explore the collection
          </p>
        </div>
      </section>
    </div>
  );
}
