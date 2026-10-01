import { prisma as db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id },
    include: { category: true }
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="h-10 w-10 bg-white border border-near-black/10 rounded-full flex items-center justify-center text-near-black/60 hover:text-charcoal hover:bg-near-black/5 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-heading text-3xl font-bold text-charcoal">Edit Product</h1>
            <p className="text-sm text-near-black/50 mt-1">{product.id}</p>
          </div>
        </div>
        
        <button className="bg-charcoal text-ivory hover:bg-charcoal/90 px-6 py-3 rounded-md text-sm font-semibold tracking-wide flex items-center transition-all shadow-sm">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="bg-white border border-near-black/5 rounded-xl shadow-sm p-8">
        <p className="text-near-black/60 font-light italic text-center py-12">
          Product edit form placeholder. Here you would be able to update "{product.name}".
        </p>
      </div>
    </div>
  );
}
