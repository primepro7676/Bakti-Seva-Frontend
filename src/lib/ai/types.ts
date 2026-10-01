export type ChatLocale = "en" | "hi" | "kn";

export type ChatIntent =
  | "PRODUCT"
  | "PUJA"
  | "HOMA"
  | "SEVA"
  | "EVENT"
  | "SHIPPING"
  | "RETURNS"
  | "ORDER"
  | "CONTACT"
  | "PAGE_NAVIGATION"
  | "GENERAL";

export type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type WebsiteContext = {
  products?: string;
  seva?: string;
  events?: string;
  policies?: string;
  pages?: string;
};

export type ChatSource = {
  label: string;
  url: string;
};

export type ChatProductCard = {
  name: string;
  price: number;
  image?: string | null;
  url: string;
};

export type ChatServiceResult = {
  success: true;
  message: string;
  sources: ChatSource[];
  products: ChatProductCard[];
  suggestions: string[];
};

export type ChatServiceError = {
  success: false;
  error: string;
};
