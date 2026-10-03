/**
 * Server-side helper to call the Express backend.
 * Architecture: Next.js → Backend → PostgreSQL / Groq
 */
const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  ""
).replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new ApiError("NEXT_PUBLIC_API_URL is not configured", 500);
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${API_URL}${normalized}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const body = await res.json().catch(() => null);

  if (!res.ok || !body?.success) {
    throw new ApiError(body?.message || `API request failed (${res.status})`, res.status);
  }

  return body.data as T;
}

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
};

export type ApiProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  categoryId: string;
  imageUrl?: string | null;
  category?: ApiCategory;
  images?: Array<{ id: string; url: string; alt?: string | null; isPrimary: boolean }>;
  createdAt?: string;
};

export type ApiSeva = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string | null;
  goalAmount?: number | null;
  raisedAmount: number;
  isActive: boolean;
};

export async function fetchProducts(params: Record<string, string | number | undefined> = {}) {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") qs.set(key, String(value));
  }
  const query = qs.toString();
  return apiFetch<ApiProduct[]>(`/api/products${query ? `?${query}` : ""}`);
}

export async function fetchProductBySlug(slug: string) {
  return apiFetch<{ product: ApiProduct; related: ApiProduct[] }>(`/api/products/${slug}`);
}

export async function fetchCategories() {
  return apiFetch<ApiCategory[]>("/api/categories");
}

export async function fetchSevaBySlug(slug: string) {
  return apiFetch<ApiSeva>(`/api/sevas/${slug}`);
}

export async function fetchAdminStats() {
  return apiFetch<{
    productsCount: number;
    usersCount: number;
    ordersCount: number;
    totalRevenue: number;
    recentOrders: Array<{
      id: string;
      totalAmount: number;
      status: string;
      createdAt: string;
      user: { name: string | null; email: string | null } | null;
    }>;
  }>("/api/admin/stats");
}

export async function createProductViaApi(payload: {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  imageUrl?: string;
  isFeatured?: boolean;
}) {
  return apiFetch<ApiProduct>("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function deleteProductViaApi(id: string) {
  return apiFetch<{ id: string }>(`/api/products/${id}`, { method: "DELETE" });
}
