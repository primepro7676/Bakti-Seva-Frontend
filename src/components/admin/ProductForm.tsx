"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/admin/products/actions";
import { Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

const inputClass =
  "w-full bg-white border border-near-black/15 rounded-xl px-4 py-3 text-charcoal placeholder:text-near-black/30 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow";

const labelClass = "block text-sm font-semibold text-charcoal/80 mb-1.5";

export default function ProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await createProduct(formData);
      if (result.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(result.error || "Failed to create product");
        setIsSubmitting(false);
      }
    } catch {
      setError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label htmlFor="name" className={labelClass}>Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="e.g. Premium Rudraksha Mala"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className={labelClass}>Description</label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Detailed description of the product..."
        />
      </div>

      {/* Price & Stock */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className={labelClass}>Price (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            min="0"
            step="0.01"
            className={inputClass}
            placeholder="0.00"
          />
        </div>
        <div>
          <label htmlFor="stock" className={labelClass}>Stock Quantity</label>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            min="0"
            className={inputClass}
            placeholder="0"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className={labelClass}>Category</label>
        <select
          id="categoryId"
          name="categoryId"
          required
          className="w-full bg-white border border-near-black/15 rounded-xl px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-accent/40 transition-shadow appearance-none cursor-pointer"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="imageUrl" className={labelClass}>Image URL <span className="text-near-black/40 font-normal">(optional)</span></label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          className={inputClass}
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-near-black/40 mt-1.5">Leave blank to use a default placeholder image.</p>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3 p-4 bg-sand/30 rounded-xl border border-near-black/10">
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          className="w-5 h-5 rounded border-near-black/20 text-accent focus:ring-accent/40 accent-amber-600"
        />
        <label htmlFor="isFeatured" className="text-sm font-medium text-charcoal cursor-pointer select-none">
          Feature this product on the home page
        </label>
      </div>

      {/* Buttons */}
      <div className="pt-4 flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-near-black/20 text-charcoal font-medium hover:bg-near-black/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-primary to-accent text-ivory font-semibold rounded-xl px-6 py-3 hover:shadow-lg hover:shadow-primary/20 transition-all flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
}
