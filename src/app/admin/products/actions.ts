"use server";

import {
  createProductViaApi,
  deleteProductViaApi,
  fetchCategories,
} from "@/lib/backend-api";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    return await fetchCategories();
  } catch (error) {
    console.error("Failed to load categories from backend:", error);
    return [];
  }
}

export async function deleteProduct(productId: string) {
  try {
    await deleteProductViaApi(productId);
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
    const imageUrl = (formData.get("imageUrl") as string) || undefined;
    const isFeatured = formData.get("isFeatured") === "on";

    await createProductViaApi({
      name,
      description,
      price,
      stock,
      categoryId,
      imageUrl,
      isFeatured,
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
