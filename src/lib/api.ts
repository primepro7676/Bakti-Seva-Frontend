/**
 * Browser-safe backend base URL.
 * Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:5000).
 */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

export function apiEndpoint(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return `${API_URL}${normalized}`;
}
