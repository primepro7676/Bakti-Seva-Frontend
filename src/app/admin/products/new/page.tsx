"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import ProductForm from "@/components/admin/ProductForm";
import { getCategories } from "@/app/admin/products/actions";

type Category = { id: string; name: string };

export default function NewProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getCategories();
        if (!cancelled) {
          setCategories(data);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Failed to load categories. Check DATABASE_URL and try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 bg-near-black/5 rounded-lg text-charcoal/60 hover:text-charcoal hover:bg-near-black/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-charcoal tracking-wide">
            Add New Product
          </h1>
          <p className="text-sm text-near-black/50 mt-1">
            Fill in the details to list a new product in the store.
          </p>
        </div>
      </div>

      <div className="bg-white border border-near-black/10 rounded-2xl p-6 md:p-8 shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-near-black/50">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading form…
          </div>
        ) : loadError ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
            {loadError}
          </div>
        ) : (
          <ProductForm categories={categories} />
        )}
      </div>
    </div>
  );
}
