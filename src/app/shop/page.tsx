import { fetchCategories, fetchProducts } from "@/lib/backend-api";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, PackageSearch } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Shop | Divine Items & Idols",
  description:
    "Browse our curated collection of premium rudraksha, authentic idols, puja essentials, and spiritual books.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage(props: {
  searchParams: Promise<{ category?: string; price?: string; sort?: string }> | { category?: string; price?: string; sort?: string };
}) {
  const searchParams = props.searchParams instanceof Promise
    ? await props.searchParams
    : props.searchParams;

  const currentCategory = searchParams?.category;
  const currentPrice = searchParams?.price;
  const currentSort = searchParams?.sort || "newest";

  let products: Awaited<ReturnType<typeof fetchProducts>> = [];
  let categories: Awaited<ReturnType<typeof fetchCategories>> = [];

  try {
    [products, categories] = await Promise.all([
      fetchProducts({
        category: currentCategory,
        price: currentPrice,
        sort: currentSort,
      }),
      fetchCategories(),
    ]);
  } catch (error) {
    console.warn("Could not load shop data from backend:", error);
  }

  const activeCategoryName = categories.find((c) => c.slug === currentCategory)?.name;

  return (
    <div className="bg-ivory min-h-screen">
      {/* ── Page Hero Banner ── */}
      <div className="bg-wine pt-28 pb-14 border-b border-maroon/30">
        <div className="container mx-auto px-4 md:px-8 max-w-[1440px]">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-ivory/50 mb-6">
            <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/shop" className="hover:text-champagne transition-colors">Shop</Link>
            {activeCategoryName && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-champagne">{activeCategoryName}</span>
              </>
            )}
          </nav>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory font-bold mb-3">
            {activeCategoryName ?? "The Sacred Collection"}
          </h1>
          <p className="text-ivory/65 font-light leading-relaxed max-w-xl">
            {activeCategoryName
              ? `Showing all products in ${activeCategoryName}.`
              : "Explore our premium collection of authentic puja items, idols, organic incense, and more."}
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container mx-auto px-4 md:px-8 max-w-[1440px] py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <ShopFilters
            categories={categories}
            currentCategory={currentCategory}
            currentPrice={currentPrice}
            currentSort={currentSort}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-8 pb-5 border-b border-sand flex items-center justify-between">
              <span className="text-sm text-cocoa/60 font-medium">
                {products.length} {products.length === 1 ? "Product" : "Products"}
                {activeCategoryName ? ` in ${activeCategoryName}` : ""}
              </span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                {(products as any[]).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-28 text-center">
                <PackageSearch className="w-12 h-12 text-cocoa/20 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-semibold text-cocoa mb-3">
                  No Products Found
                </h3>
                <p className="text-cocoa/55 mb-8 font-light">
                  Try adjusting your filters or browse all products.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-burgundy text-ivory px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-maroon transition-colors"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
