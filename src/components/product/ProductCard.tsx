"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, Check, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
    category?: { name: string } | null;
  };
}

const BADGES = ["BESTSELLER", "HANDCRAFTED", "NEW", "CONSECRATED"];

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const imageUrl = product.imageUrl || "/images/brass_diya_lamp.jpg";
  const secondaryImage = "/images/c61b827d-c793-41af-9391-20d3751c5527.png";

  const compareAtPrice = product.price > 1000 ? Math.round(product.price * 1.25) : null;
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
    : 0;

  // Pick deterministic badge based on product id length
  const badgeText = BADGES[product.id.length % BADGES.length];

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  }

  return (
    <div className="group flex flex-col gap-3.5 bg-[#FFFDF7] rounded-2xl p-3 border border-[#EEE3D0] hover:border-[#641E2E]/20 hover:shadow-lg transition-all duration-300">
      {/* 4:5 Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#F8F1E5]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
          <Image
            src={secondaryImage}
            alt={`${product.name} detailed view`}
            fill
            className="object-cover transition-all duration-500 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        </Link>

        {/* Elegant Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#641E2E] text-[#FFFDF7] text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
            {badgeText}
          </span>
          {discount > 0 && (
            <span className="bg-[#C59A4B] text-[#FFFDF7] text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-md shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            isWishlisted
              ? "bg-[#641E2E] text-[#FFFDF7]"
              : "bg-[#FFFDF7]/90 backdrop-blur text-[#342B27]/70 hover:text-[#641E2E] hover:bg-[#FFFDF7]"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <button
            onClick={handleQuickAdd}
            className={`w-full text-[#FFFDF7] text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 ${
              added
                ? "bg-emerald-700 text-white"
                : "bg-[#641E2E] hover:bg-[#7B233A] active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added!
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          {product.category && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C59A4B]">
              {product.category.name}
            </span>
          )}
          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="text-[11px] text-[#342B27]">4.9</span>
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="font-heading text-base font-bold text-[#342B27] hover:text-[#641E2E] transition-colors line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-[#641E2E]">
            {formatCurrency(product.price)}
          </span>
          {compareAtPrice && (
            <span className="text-xs text-[#49332D]/50 line-through font-normal">
              {formatCurrency(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
