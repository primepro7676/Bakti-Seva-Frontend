import { prisma } from "@/lib/db";
import { SACRED_OFFERINGS } from "@/lib/data/offerings";
import { EVENTS } from "@/lib/events-data";
import { SHOP_CATALOG } from "@/lib/chat-knowledge";
import type { ChatIntent, ChatProductCard, ChatSource, WebsiteContext } from "./types";
import {
  bookingFacts,
  contactFacts,
  journalIndex,
  policyFacts,
  websitePages,
} from "./website-context";

const STOP = new Set([
  "the", "and", "for", "with", "what", "where", "show", "me", "please",
  "this", "that", "your", "have", "from", "about", "a", "an", "is", "are",
]);

function tokens(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

export function detectIntent(query: string): ChatIntent {
  const q = query.toLowerCase();

  if (/(order|track my order|where is my order|delivery status|मेरा ऑर्डर)/.test(q)) return "ORDER";
  if (/(return|refund|exchange|cancellation|वापसी|रिफंड)/.test(q)) return "RETURNS";
  if (/(ship|delivery|courier|track shipment|शिपिंग|डिलिवरी)/.test(q)) return "SHIPPING";
  if (/(contact|phone|email|address|timing|temple|location|map|whatsapp|संपर्क)/.test(q)) return "CONTACT";
  if (/(सामान|ಸಾಮಗ್ರಿ|product|shop|buy|diya|rudraksha|idol|gita|book|kurta|gift|mala|incense)/.test(q)) {
    return "PRODUCT";
  }
  if (/(homa|havan|yagna|yajna|होम|ಹೋಮ)/.test(q) && /(pooja|puja|पूजा|ಪೂಜಾ)/.test(q)) return "PUJA";
  if (/(homa|havan|yagna|yajna|होम|ಹೋಮ)/.test(q)) return "HOMA";
  if (/(pooja|puja|abhisheka|archana|katha|पूजा|ಪೂಜಾ)/.test(q)) return "PUJA";
  if (/(seva|annadanam|goshala|vidyadaan|donate|donation|सेवा|ಸೇವಾ)/.test(q)) return "SEVA";
  if (/(event|festival|jayanti|shivaratri|upcoming|उत्सव)/.test(q)) return "EVENT";
  if (/(price|₹)/.test(q)) return "PRODUCT";
  if (/(page|where can i|navigate|link|blog|gallery|about|faq)/.test(q)) return "PAGE_NAVIGATION";
  return "GENERAL";
}

function matchPages(query: string, limit = 6): ChatSource[] {
  const q = query.toLowerCase();
  const scored = websitePages
    .map((p) => {
      let score = 0;
      if (q.includes(p.title.toLowerCase())) score += 5;
      for (const k of p.keywords) if (q.includes(k)) score += 3;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (scored.length === 0) {
    return websitePages.slice(0, 6).map((p) => ({ label: p.title, url: p.url }));
  }
  return scored.map((x) => ({ label: x.p.title, url: x.p.url }));
}

async function retrieveProducts(query: string): Promise<{
  text: string;
  cards: ChatProductCard[];
  sources: ChatSource[];
}> {
  const words = tokens(query);
  let dbItems: {
    name: string;
    slug: string;
    price: number;
    description: string;
    imageUrl: string | null;
    stock: number;
    category: { name: string; slug: string } | null;
  }[] = [];

  try {
    dbItems = await prisma.product.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      where: words.length
        ? {
            OR: words.flatMap((w) => [
              { name: { contains: w, mode: "insensitive" as const } },
              { description: { contains: w, mode: "insensitive" as const } },
              { category: { name: { contains: w, mode: "insensitive" as const } } },
            ]),
          }
        : undefined,
      select: {
        name: true,
        slug: true,
        price: true,
        description: true,
        imageUrl: true,
        stock: true,
        category: { select: { name: true, slug: true } },
      },
    });
  } catch {
    dbItems = [];
  }

  if (dbItems.length === 0) {
    const staticHits = SHOP_CATALOG.filter((p) => {
      const hay = `${p.name} ${p.category} ${p.description}`.toLowerCase();
      return words.length === 0 || words.some((w) => hay.includes(w));
    }).slice(0, 5);

    const text = staticHits.length
      ? staticHits
          .map(
            (p) =>
              `- ${p.name} — ₹${p.price} (${p.category}) ${p.description} [${p.href}](${p.href})`
          )
          .join("\n")
      : "No matching catalog items were found for this query in the static shop list.";

    return {
      text,
      cards: staticHits.map((p) => ({
        name: p.name,
        price: p.price,
        url: p.href,
      })),
      sources: staticHits.map((p) => ({ label: p.name, url: p.href })),
    };
  }

  const text = dbItems
    .map((p) => {
      const url = `/product/${p.slug}`;
      return `- ${p.name} — ₹${p.price} | category: ${p.category?.name || "Shop"} | stock: ${p.stock} | ${p.description.slice(0, 140)} [${url}](${url})`;
    })
    .join("\n");

  return {
    text,
    cards: dbItems.map((p) => ({
      name: p.name,
      price: p.price,
      image: p.imageUrl,
      url: `/product/${p.slug}`,
    })),
    sources: dbItems.map((p) => ({
      label: p.name,
      url: `/product/${p.slug}`,
    })),
  };
}

function retrieveOfferings(query: string, type?: "online-pooja" | "homa" | "seva"): string {
  const words = tokens(query);
  let items = type ? SACRED_OFFERINGS.filter((o) => o.type === type) : SACRED_OFFERINGS;
  if (words.length && type !== "seva") {
    const filtered = items.filter((o) => {
      const hay = `${o.title} ${o.slug} ${o.deity || ""} ${o.shortDescription}`.toLowerCase();
      return words.some((w) => hay.includes(w));
    });
    if (filtered.length) items = filtered;
  }
  items = items.slice(0, 8);
  return items
    .map((o) => {
      const pkgs = o.packages.map((p) => `${p.name} ₹${p.amount}`).join("; ");
      return `- ${o.title} (${o.categoryName}) [${`/seva/${o.slug}`}](/seva/${o.slug})
  ${o.shortDescription}
  Duration: ${o.duration || "see page"} | Packages: ${pkgs}`;
    })
    .join("\n");
}

async function retrieveDbSevas(): Promise<string> {
  try {
    const sevas = await prisma.seva.findMany({
      where: { isActive: true },
      take: 8,
      select: {
        title: true,
        slug: true,
        description: true,
        goalAmount: true,
        raisedAmount: true,
      },
    });
    if (!sevas.length) return "";
    return sevas
      .map((s) => {
        const goal = s.goalAmount ? ` Goal ₹${s.goalAmount}, raised ₹${s.raisedAmount}.` : "";
        return `- ${s.title} [/seva/${s.slug}](/seva/${s.slug}) ${s.description.slice(0, 180)}${goal}`;
      })
      .join("\n");
  } catch {
    return "";
  }
}

function retrieveEvents(includePast: boolean): string {
  const now = new Date();
  const items = EVENTS.filter((e) => {
    if (includePast) return true;
    const parsed = Date.parse(e.date);
    if (Number.isNaN(parsed)) return true;
    return parsed >= now.getTime() - 24 * 60 * 60 * 1000;
  }).slice(0, 8);

  if (!items.length) return "No upcoming events were found in the current events list.";

  return items
    .map(
      (e) =>
        `- ${e.title} — ${e.date}, ${e.time} at ${e.location}. ${e.shortDescription} Fee: ${e.registrationFee} [/events/${e.slug}](/events/${e.slug})`
    )
    .join("\n");
}

function isGreeting(query: string): boolean {
  return /^(hi|hello|hey|namaste|namaskar|hlo|vanakkam)\b/i.test(query.trim());
}

export async function retrieveWebsiteContext(query: string, intent: ChatIntent): Promise<{
  context: WebsiteContext;
  products: ChatProductCard[];
  sources: ChatSource[];
  suggestions: string[];
}> {
  const context: WebsiteContext = {};
  let products: ChatProductCard[] = [];
  const sources: ChatSource[] = [];
  let suggestions: string[] = [];

  const q = query.toLowerCase();
  const greeting = isGreeting(query);
  const wantHoma = intent === "HOMA" || /homa|havan|yagna|होम|ಹೋಮ/.test(q);
  const wantPuja = intent === "PUJA" || /pooja|puja|abhisheka|पूजा|ಪೂಜಾ/.test(q);
  const wantProducts = intent === "PRODUCT";
  const wantSeva = intent === "SEVA";
  const wantEvents = intent === "EVENT";
  const wantPolicies = intent === "SHIPPING" || intent === "RETURNS" || intent === "ORDER";
  const wantPages =
    intent === "PAGE_NAVIGATION" ||
    intent === "CONTACT" ||
    intent === "ORDER" ||
    intent === "GENERAL" ||
    greeting;

  if (wantProducts) {
    const result = await retrieveProducts(query);
    context.products = result.text;
    products = result.cards;
    sources.push(...result.sources);
    suggestions = ["View Puja Essentials", "Show Gift Sets", "How do I checkout?"];
  }

  if (wantPuja) {
    context.seva = [context.seva, "Online poojas:\n" + retrieveOfferings(query, "online-pooja"), bookingFacts]
      .filter(Boolean)
      .join("\n");
    sources.push({ label: "Seva & Pooja", url: "/seva" });
    suggestions = ["How do I book a pooja?", "Show homas", "Available Seva"];
  }

  if (wantHoma) {
    context.seva = [context.seva, "Sacred homas:\n" + retrieveOfferings(query, "homa"), bookingFacts]
      .filter(Boolean)
      .join("\n");
    sources.push({ label: "Sacred Homa", url: "/seva" });
    suggestions = ["Navagraha Shanti Homa", "How do I book a homa?", "Pooja options"];
  }

  if (wantSeva) {
    const dbSeva = await retrieveDbSevas();
    context.seva = [
      context.seva,
      "Community seva:\n" + retrieveOfferings(query, "seva"),
      dbSeva ? `Live seva campaigns:\n${dbSeva}` : "",
      bookingFacts,
    ]
      .filter(Boolean)
      .join("\n");
    sources.push({ label: "Seva", url: "/seva" });
    suggestions = ["Annadanam Seva", "Goshala Seva", "How can I donate?"];
  }

  if (wantEvents) {
    const pastAsked = /past|previous|last year/.test(query.toLowerCase());
    context.events = retrieveEvents(pastAsked);
    sources.push({ label: "Events", url: "/events" });
    suggestions = ["Narasimha Jayanti", "Maha Shivaratri", "Contact for events"];
  }

  if (wantPolicies) {
    if (intent === "SHIPPING") {
      context.policies = [context.policies, policyFacts.shipping].filter(Boolean).join("\n");
      sources.push({ label: "Shipping", url: "/shipping" });
    }
    if (intent === "RETURNS") {
      context.policies = [context.policies, policyFacts.returns, policyFacts.refunds]
        .filter(Boolean)
        .join("\n");
      sources.push({ label: "Returns", url: "/returns" }, { label: "Refunds", url: "/refunds" });
    }
    if (intent === "ORDER") {
      context.policies = [
        context.policies,
        "Order tracking requires signing in. Direct the visitor to /account. Do not invent order status from a typed order number.",
        policyFacts.shipping,
      ]
        .filter(Boolean)
        .join("\n");
      sources.push({ label: "Account / Orders", url: "/account" });
      suggestions = ["Open my account", "Shipping Information", "Contact Bakti Seva"];
    }
  }

  if (wantPages) {
    const pages = matchPages(query);
    context.pages = pages.map((p) => `- ${p.label}: ${p.url}`).join("\n");
    if (intent === "CONTACT" || intent === "GENERAL") {
      context.pages += `\nContact:\n${contactFacts}`;
      sources.push({ label: "Contact", url: "/contact" });
    }
    context.pages += `\nJournal: ${journalIndex.map((j) => `${j.title} /blog/${j.slug}`).join("; ")}`;
    sources.push(...pages.slice(0, 4));
    if (intent === "CONTACT") {
      suggestions = ["Temple timings", "WhatsApp Bakti Seva", "Shipping Information"];
    }
  }

  const uniqueSources = Array.from(new Map(sources.map((s) => [s.url, s])).values()).slice(0, 8);
  const uniqueCards = products.slice(0, 5);

  return {
    context,
    products: uniqueCards,
    sources: uniqueSources,
    suggestions: suggestions.slice(0, 3),
  };
}

export function formatContextForPrompt(context: WebsiteContext): string {
  const parts: string[] = [];
  if (context.pages) parts.push(`PAGES & CONTACT\n${context.pages}`);
  if (context.products) parts.push(`PRODUCTS (from Bakti Seva catalog)\n${context.products}`);
  if (context.seva) parts.push(`PUJA / HOMA / SEVA\n${context.seva}`);
  if (context.events) parts.push(`EVENTS\n${context.events}`);
  if (context.policies) parts.push(`POLICIES\n${context.policies}`);
  return parts.join("\n\n") || "No additional website records were retrieved for this question.";
}
