<<<<<<< HEAD
import { fetchProducts } from "@/lib/backend-api";
=======
import { prisma as db } from "@/lib/prisma";
>>>>>>> f1a1a28b27fc11481b919ecfcb09db8e2a7fd56e
import { formatCurrency } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductRowActions } from "@/components/admin/ProductRowActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProductsPage() {
<<<<<<< HEAD
  let products: Awaited<ReturnType<typeof fetchProducts>> = [];
  try {
    products = await fetchProducts({ sort: "newest" });
  } catch (error) {
    console.warn("Could not load products from backend:", error);
  }
=======
  const products = db?.product
    ? await db.product.findMany({
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];
>>>>>>> f1a1a28b27fc11481b919ecfcb09db8e2a7fd56e

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-charcoal">Product Inventory</h1>
        <Link href="/admin/products/new">
          <button className="bg-charcoal text-ivory hover:bg-charcoal/90 px-6 py-3 rounded-md text-sm font-semibold tracking-wide flex items-center transition-all shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </button>
        </Link>
      </div>

      <div className="bg-white border border-near-black/5 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-sand/10 text-near-black/60 uppercase text-[10px] tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-near-black/5">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-near-black/50 font-light">
                    No products found in inventory.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-sand/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-sand/20 overflow-hidden flex-shrink-0 relative border border-near-black/5 group-hover:border-near-black/10 transition-colors">
                          {product.imageUrl && (
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-charcoal">{product.name}</div>
                          <div className="text-[11px] text-near-black/50 mt-0.5 max-w-[250px] truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
                        {product.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-charcoal">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium ${
                          product.stock > 10 ? "text-green-600" : "text-amber-600"
                        }`}
                      >
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ProductRowActions productId={product.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
