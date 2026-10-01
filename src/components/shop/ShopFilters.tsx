"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const priceRanges = [
  { id: "under-1000", label: "Under ₹1,000" },
  { id: "1000-5000", label: "₹1,000 – ₹5,000" },
  { id: "5000-10000", label: "₹5,000 – ₹10,000" },
  { id: "over-10000", label: "Over ₹10,000" },
];

const sortOptions = [
  { id: "newest", label: "Newest First" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

function buildUrl({
  category,
  price,
  sort,
}: {
  category?: string | null;
  price?: string | null;
  sort?: string;
}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (price) params.set("price", price);
  if (sort && sort !== "newest") params.set("sort", sort);
  const qs = params.toString();
  return `/shop${qs ? `?${qs}` : ""}`;
}

export function ShopFilters({
  categories,
  currentCategory,
  currentPrice,
  currentSort,
}: {
  categories: Category[];
  currentCategory: string | undefined;
  currentPrice: string | undefined;
  currentSort: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function go(url: string) {
    startTransition(() => router.push(url));
  }

  const hasFilters = !!(currentCategory || currentPrice);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div
        className={`sticky top-28 transition-opacity duration-200 ${
          isPending ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-near-black/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-near-black/50" />
            <h3 className="font-heading text-xl font-semibold text-charcoal">
              Filters
            </h3>
          </div>
          {hasFilters && (
            <button
              onClick={() => go("/shop")}
              className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-red-500 transition-colors"
            >
              <X className="w-3 h-3" /> Clear All
            </button>
          )}
        </div>

        {/* ── CATEGORIES ── */}
        <section className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-near-black/40 mb-3">
            Categories
          </p>
          <div className="flex flex-col gap-1">
            {/* All Products */}
            <button
              onClick={() =>
                go(
                  buildUrl({
                    category: null,
                    price: currentPrice,
                    sort: currentSort,
                  })
                )
              }
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-between ${
                !currentCategory
                  ? "bg-primary text-ivory shadow-sm"
                  : "text-near-black/70 hover:bg-sand/70 hover:text-charcoal"
              }`}
            >
              All Products
              {!currentCategory && (
                <span className="w-2 h-2 rounded-full bg-ivory/60 shrink-0" />
              )}
            </button>

            {categories.map((cat) => {
              const isActive = currentCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    go(
                      buildUrl({
                        category: cat.slug,
                        price: currentPrice,
                        sort: currentSort,
                      })
                    )
                  }
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-between ${
                    isActive
                      ? "bg-primary text-ivory shadow-sm"
                      : "text-near-black/70 hover:bg-sand/70 hover:text-charcoal"
                  }`}
                >
                  {cat.name}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-ivory/60 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── PRICE RANGE ── */}
        <section className="mb-8">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-near-black/40 mb-3">
            Price Range
          </p>
          <div className="flex flex-col gap-1">
            <button
              onClick={() =>
                go(
                  buildUrl({
                    category: currentCategory,
                    price: null,
                    sort: currentSort,
                  })
                )
              }
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                !currentPrice
                  ? "bg-accent/15 text-accent font-semibold"
                  : "text-near-black/70 hover:bg-sand/70 hover:text-charcoal"
              }`}
            >
              Any Price
            </button>
            {priceRanges.map((range) => {
              const isActive = currentPrice === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() =>
                    go(
                      buildUrl({
                        category: currentCategory,
                        price: range.id,
                        sort: currentSort,
                      })
                    )
                  }
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-accent/15 text-accent font-semibold"
                      : "text-near-black/70 hover:bg-sand/70 hover:text-charcoal"
                  }`}
                >
                  {range.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── SORT ── */}
        <section>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-near-black/40 mb-3">
            Sort By
          </p>
          <div className="flex flex-col gap-1">
            {sortOptions.map((opt) => {
              const isActive = currentSort === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() =>
                    go(
                      buildUrl({
                        category: currentCategory,
                        price: currentPrice,
                        sort: opt.id,
                      })
                    )
                  }
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-accent/15 text-accent font-semibold"
                      : "text-near-black/70 hover:bg-sand/70 hover:text-charcoal"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
