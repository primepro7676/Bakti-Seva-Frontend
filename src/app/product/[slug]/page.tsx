import { fetchProductBySlug } from "@/lib/backend-api";
import { notFound } from "next/navigation";
import { ProductClientDisplay } from "./ProductClientDisplay";

const VEDIC_SLUG = "vedic-scriptures-illustrated";

export const dynamic = "force-dynamic";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  let product;
  let relatedProducts;
  try {
    const data = await fetchProductBySlug(resolvedParams.slug);
    product = data.product;
    relatedProducts = data.related;
  } catch {
    notFound();
  }

  if (!product?.category) {
    notFound();
  }

  const isVedic = product.slug === VEDIC_SLUG;
  const primaryImage =
    product.imageUrl || "/images/ganesha_idol_1790594652426.jpg";

  const galleryImages = isVedic
    ? [
        "/images/products/vedic-scriptures/vedic-scriptures-front.webp",
        "/images/products/vedic-scriptures/vedic-scriptures-detail.webp",
        "/images/products/vedic-scriptures/vedic-scriptures-lifestyle.webp",
      ]
    : [
        primaryImage,
        ...(product.images || [])
          .map((img) => img.url)
          .filter((url) => url !== primaryImage),
      ].slice(0, 4);

  const formattedProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    description: product.description,
    images: galleryImages.length > 0 ? galleryImages : [primaryImage],
    lifestyleImage: isVedic
      ? "/images/products/vedic-scriptures/vedic-scriptures-lifestyle.webp"
      : galleryImages[1] || primaryImage,
    categorySlug: product.category.slug,
    categoryName: product.category.name,
    stock: product.stock,
  };

  const related = relatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    imageUrl: p.imageUrl || primaryImage,
    category: p.category ? { name: p.category.name } : null,
  }));

  return <ProductClientDisplay product={formattedProduct} related={related} />;
}
