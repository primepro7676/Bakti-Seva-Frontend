"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/products/actions";

export function ProductRowActions({ productId }: { productId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setIsDeleting(true);
      const res = await deleteProduct(productId);
      if (!res.success) {
        alert("Failed to delete product.");
        setIsDeleting(false);
      }
      // If success, the page will revalidate and the row will disappear automatically
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Link href={`/admin/products/${productId}/edit`}>
        <button 
          className="h-8 w-8 rounded-md border border-near-black/10 flex items-center justify-center text-near-black/50 hover:bg-near-black/5 hover:text-charcoal transition-colors disabled:opacity-50"
          disabled={isDeleting}
          aria-label="Edit product"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </Link>
      
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="h-8 w-8 rounded-md border border-near-black/10 flex items-center justify-center text-near-black/50 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"
        aria-label="Delete product"
      >
        {isDeleting ? (
          <span className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin"></span>
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
