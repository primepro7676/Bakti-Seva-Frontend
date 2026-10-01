"use server";

import { prisma as db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const categoryId = formData.get("categoryId") as string;
    const imageUrl = formData.get("imageUrl") as string || "https://images.unsplash.com/photo-1603704257850-9366df022a10?q=80&w=600&auto=format&fit=crop";
    const isFeatured = formData.get("isFeatured") === "on";

    // Create a slug from the name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now();

    await db.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        categoryId,
        imageUrl,
        isFeatured,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/shop");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}
