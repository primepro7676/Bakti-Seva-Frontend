import { prisma as db } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Add Product | Admin Dashboard",
};

export default async function NewProductPage() {
  const categories = await db.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 bg-near-black/5 rounded-lg text-charcoal/60 hover:text-charcoal hover:bg-near-black/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-charcoal tracking-wide">Add New Product</h1>
          <p className="text-sm text-near-black/50 mt-1">Fill in the details to list a new product in the store.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-near-black/10 rounded-2xl p-6 md:p-8 shadow-sm">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
