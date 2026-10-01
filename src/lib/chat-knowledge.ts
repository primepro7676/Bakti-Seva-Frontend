import { SACRED_OFFERINGS } from "@/lib/data/offerings";
import { EVENTS } from "@/lib/events-data";

export type CatalogProduct = {
  name: string;
  price: number;
  href: string;
  category: string;
  description: string;
};

export const SHOP_CATALOG: CatalogProduct[] = [
  {
    name: "Premium Brass Diya Set",
    price: 799,
    href: "/product/brass-diya-set",
    category: "Puja Essentials",
    description: "Hand-crafted 5-piece brass diya set for daily puja and festive celebrations.",
  },
  {
    name: "Rudraksha Mala (108+1 Beads)",
    price: 1299,
    href: "/product/rudraksha-mala",
    category: "Puja Essentials",
    description: "Authentic Himalayan 5-mukhi rudraksha beads energized at the Shiva altar for meditation and japa.",
  },
  {
    name: "Sacred Puja Thali Set",
    price: 1599,
    href: "/product/puja-thali-set",
    category: "Puja Essentials",
    description: "Complete puja thali with brass kalash, incense holder, diya, and bell for daily rituals.",
  },
  {
    name: "Natural Temple Incense Sticks",
    price: 299,
    href: "/product/temple-incense",
    category: "Puja Essentials",
    description: "Hand-rolled organic incense crafted from sacred herbs, temple flowers, and pure resins.",
  },
  {
    name: "Crystal Sphatik Mala",
    price: 949,
    href: "/product/sphatik-mala",
    category: "Puja Essentials",
    description: "Natural quartz crystal mala consecrated for Devi worship and healing meditation.",
  },
  {
    name: "Silver Puja Thali Gift Set",
    price: 3499,
    href: "/product/silver-thali-gift",
    category: "Gifts / Puja Essentials",
    description: "Silver-plated premium puja thali set in a gift box — ideal for weddings and housewarming.",
  },
  {
    name: "Handcrafted Brass Ganesha Idol",
    price: 3299,
    href: "/product/brass-ganesha",
    category: "Spiritual Decor",
    description: "Intricately sculpted panchaloha Ganesha murti consecrated with traditional mantras.",
  },
  {
    name: "Shri Mahalakshmi Idol",
    price: 2799,
    href: "/product/lakshmi-idol",
    category: "Spiritual Decor",
    description: "Brass Lakshmi Devi seated on lotus — ideal for Dhanakarshana puja.",
  },
  {
    name: "Hanuman Panchadhatu Idol",
    price: 4199,
    href: "/product/hanuman-idol",
    category: "Spiritual Decor",
    description: "Five-metal alloy Hanuman idol in vira mudra — guardian for home and temple.",
  },
  {
    name: "Silver Kalash",
    price: 1999,
    href: "/product/silver-kalash",
    category: "Spiritual Decor",
    description: "Silver-plated ceremonial kalash for Vastu puja, Devi invocations, and festivals.",
  },
  {
    name: "Panchamukhi Brass Diya",
    price: 1499,
    href: "/product/panchamukhi-diya",
    category: "Spiritual Decor",
    description: "Five-flame brass lamp representing the Pancha Bhuta — for evening aarti and Diwali.",
  },
  {
    name: "Festival Puja Box & Decor Set",
    price: 2499,
    href: "/product/festival-puja-box",
    category: "Gifts / Decor",
    description: "Complete festive setup for Diwali, Navratri, and auspicious family celebrations.",
  },
  {
    name: "Bhagavad Gita (Deluxe Edition)",
    price: 899,
    href: "/product/bhagavad-gita-deluxe",
    category: "Books",
    description: "Commentary with original Sanskrit shlokas and transliteration.",
  },
  {
    name: "Four Vedas (Complete Set)",
    price: 3499,
    href: "/product/four-vedas-stack",
    category: "Books",
    description: "Complete Rig, Sama, Yajur & Atharva Veda with Sanskrit text and English translation.",
  },
  {
    name: "Vishnu Sahasranama with Commentary",
    price: 649,
    href: "/product/vishnu-sahasranama-book",
    category: "Books",
    description: "Thousand names of Lord Vishnu with pronunciation guide and meanings.",
  },
  {
    name: "Upanishads Collection",
    price: 1299,
    href: "/product/upanishads-collection",
    category: "Books",
    description: "Principal twelve Upanishads with Adi Shankaracharya commentary.",
  },
  {
    name: "Vedic Scriptures (Illustrated)",
    price: 1899,
    href: "/product/vedic-scriptures-illustrated",
    category: "Books",
    description: "Illustrated Vedic hymns with mandalas and sacred geometry.",
  },
  {
    name: "Patanjali Yoga Sutras",
    price: 549,
    href: "/product/yoga-sutras-book",
    category: "Books",
    description: "Classical yoga philosophy with word-by-word meaning and practical commentary.",
  },
  {
    name: "Handwoven Cotton Kurta",
    price: 1299,
    href: "/product/cotton-kurta",
    category: "Apparel",
    description: "Hand-spun khadi cotton kurta in natural ivory for puja and meditation.",
  },
  {
    name: "Pure Silk Dhoti",
    price: 2199,
    href: "/product/silk-dhoti",
    category: "Apparel",
    description: "South-Indian silk dhoti with zari border for temple visits and ceremonies.",
  },
  {
    name: "Meditation Shawl (Cashmere Blend)",
    price: 3499,
    href: "/product/meditation-shawl",
    category: "Apparel",
    description: "Cashmere-wool meditation shawl with Om embroidery.",
  },
  {
    name: "Premium Silk Saree",
    price: 4999,
    href: "/product/silk-saree",
    category: "Apparel",
    description: "Kanjivaram-style silk saree with traditional temple border.",
  },
  {
    name: "Saffron Puja Dhoti Set",
    price: 899,
    href: "/product/saffron-dhoti-set",
    category: "Apparel",
    description: "Saffron cotton dhoti and angavastram for daily rituals and temple seva.",
  },
  {
    name: "White Linen Kurta Pyjama",
    price: 1599,
    href: "/product/linen-kurta-pyjama",
    category: "Apparel",
    description: "Breathable linen kurta-pyjama in pure white for sadhana.",
  },
  {
    name: "Spiritual Wellness Gift Hamper",
    price: 1999,
    href: "/product/wellness-hamper",
    category: "Gifts",
    description: "Rudraksha mala, sphatik bracelet, Bhagavad Gita, sandalwood incense in a wicker basket.",
  },
  {
    name: "Sacred Idol & Decor Bundle",
    price: 4999,
    href: "/product/idol-decor-bundle",
    category: "Gifts",
    description: "Brass Ganesha, kalash, puja thali, incense set in a luxury box for weddings and Griha Pravesh.",
  },
  {
    name: "Vedic Book Gift Set",
    price: 1499,
    href: "/product/vedic-book-set",
    category: "Gifts",
    description: "Bhagavad Gita, Vishnu Sahasranama, and Yoga Sutras bundled for students and seekers.",
  },
  {
    name: "Devotional Starter Kit",
    price: 899,
    href: "/product/devotional-starter-kit",
    category: "Gifts",
    description: "Rudraksha mala, small brass diya, incense, kumkum, and a booklet on daily puja.",
  },
];

const SITE_FACTS = `
=== ABOUT BAKTI SEVA ===
- Platform: Bakti Seva — authentic puja essentials, online Vedic poojas, homas, community seva, and temple events.
- Temple / Matth: Sri Lakshminarasimhaswami Matth
- Address: Devarathota, Ragimuddanahalli, Tumkur, Karnataka – 572 101, India
- Temple timings: Morning 6:00 AM – 12:00 PM | Evening 4:00 PM – 8:30 PM (open all 7 days)
- Support hours: Mon–Sat, 9:00 AM – 6:00 PM IST
- Phone: +91 98765 43210 | +91 80 2345 6789
- WhatsApp: https://wa.me/919876543210
- Email: support@baktiseva.com | info@baktiseva.com (reply within 24 hours)
- Events email: events@srilns.org | Vidyadaan: vidyadaan@srilns.org
- Values: 100% authentic & sustainably sourced; Vedic principles; supporting artisans; transparent seva
- Languages on site: English, Hindi, Kannada
- About: [/about](/about)

=== HOW TO BOOK A POOJA / HOMA / SEVA ===
1. Go to [/seva](/seva) and choose Online Pooja, Sacred Homa, or Community Seva.
2. Open the offering page (example [/seva/maha-rudrabhisheka](/seva/maha-rudrabhisheka)).
3. Select a package, enter devotee name, gotra, nakshatra, phone, email, ritual date, and prasadam address.
4. Pay securely. You receive live stream / HD video and consecrated prasadam by courier.
5. Rituals are performed by Gurukula-trained purohits with personalized Gotra sankalpa.
6. Reschedule a booking up to 24 hours before the ritual date via support@baktiseva.com.

=== HOW TO SHOP ===
1. Browse [/shop](/shop) or a collection: [/shop/puja-essentials](/shop/puja-essentials), [/shop/decor](/shop/decor), [/shop/books](/shop/books), [/shop/apparel](/shop/apparel), [/shop/gifts](/shop/gifts), [/shop/new](/shop/new), [/shop/best-sellers](/shop/best-sellers).
2. Open a product, add to cart, then checkout at [/checkout](/checkout) with Razorpay.
3. Track orders in [/account](/account). Wishlist: [/wishlist](/wishlist). Cart: [/cart](/cart).
4. Products are sourced from traditional artisans for spiritual purity. Bulk/temple pricing: contact support.

=== SHIPPING ([/shipping](/shipping)) ===
- India standard: 5–7 business days. Express: 2–3 business days at checkout.
- Free standard shipping on shop orders over ₹2,000.
- International shipping to select destinations; costs vary — contact support if a country is missing at checkout.
- Tracking link is emailed and SMS'd after dispatch.
- Homa/pooja prasadam is sealed and couriered after the ritual (typically within 48 hours of completion).

=== RETURNS ([/returns](/returns)) & REFUNDS ([/refunds](/refunds)) ===
- 7-day returns for unused items in original packaging.
- Non-returnable: opened incense, customized idols, perishable prasadam.
- Start a return: email support@baktiseva.com with order number; pickup arranged if applicable.
- Approved refunds credit original payment method in 5–7 business days.

=== FAQ ([/faq](/faq)) ===
- Authenticity: idols, rudraksha, and puja essentials come from traditional artisans and authentic origins.
- Shipping time: 5–7 days standard, 2–3 days express.
- Temple/ashram bulk discounts: yes, contact support.

=== OTHER PAGES ===
- Events & festivals: [/events](/events)
- Photo gallery: [/gallery](/gallery)
- Spiritual journal/blog: [/blog](/blog) — articles include Daily Deepam, Rudraksha Mukhis, Temple Architecture
- Additional services ([/services](/services)): Personalized Pujas, Vedic Astrology (Janam Kundali, muhurat), Vastu consultations
- Contact form & map: [/contact](/contact)
- Privacy: [/privacy](/privacy) | Terms: [/terms](/terms)
- Payment: Razorpay (INR). After shop checkout, order success at [/order-success](/order-success) or [/checkout/success](/checkout/success).
`;

function formatOfferingsCatalog(): string {
  const groups: Record<string, typeof SACRED_OFFERINGS> = {
    "Online Pooja": [],
    "Sacred Homa": [],
    "Community Seva": [],
  };
  for (const o of SACRED_OFFERINGS) {
    if (o.type === "online-pooja") groups["Online Pooja"].push(o);
    else if (o.type === "homa") groups["Sacred Homa"].push(o);
    else groups["Community Seva"].push(o);
  }

  let out = "=== ONLINE POOJA, HOMA & COMMUNITY SEVA (book at /seva) ===\n";
  for (const [label, items] of Object.entries(groups)) {
    out += `\n${label}:\n`;
    for (const o of items) {
      const pkgs = o.packages.map((p) => `${p.name} ₹${p.amount}`).join("; ");
      out += `- ${o.title} [${o.deity ? o.deity + " | " : ""}/${`seva/${o.slug}`}](/seva/${o.slug})\n`;
      out += `  ${o.shortDescription}\n`;
      if (o.duration) out += `  Duration: ${o.duration}. Location: ${o.location || "Temple altar"}.\n`;
      out += `  Packages: ${pkgs}\n`;
      out += `  Includes: ${o.includes.join("; ")}\n`;
      out += `  Benefits: ${o.benefits.join("; ")}\n`;
    }
  }
  return out;
}

function formatShopCatalog(liveProducts?: { name: string; slug: string; price: number; description?: string; category?: string }[]): string {
  let out = "=== SPIRITUAL E-SHOP ===\nBrowse all: [/shop](/shop)\n";
  const byCat = new Map<string, CatalogProduct[]>();
  for (const p of SHOP_CATALOG) {
    const list = byCat.get(p.category) || [];
    list.push(p);
    byCat.set(p.category, list);
  }
  for (const [cat, items] of byCat) {
    out += `\n${cat}:\n`;
    for (const p of items) {
      out += `- ${p.name} — ₹${p.price} [${p.href}](${p.href}) — ${p.description}\n`;
    }
  }
  if (liveProducts && liveProducts.length > 0) {
    out += "\nLive catalog from the database (use these prices if they differ):\n";
    for (const p of liveProducts) {
      out += `- ${p.name} — ₹${p.price} [/product/${p.slug}](/product/${p.slug})${p.category ? ` (${p.category})` : ""}${p.description ? ` — ${p.description.slice(0, 140)}` : ""}\n`;
    }
  }
  return out;
}

function formatEvents(): string {
  let out = "=== EVENTS & FESTIVALS ([/events](/events)) ===\n";
  for (const e of EVENTS) {
    out += `\n- ${e.title} (${e.type}) — ${e.date}, ${e.time}\n`;
    out += `  Location: ${e.location}\n`;
    out += `  ${e.shortDescription}\n`;
    out += `  Highlights: ${e.highlights.slice(0, 4).join("; ")}\n`;
    out += `  Dress: ${e.dresscode}\n`;
    out += `  Fee: ${e.registrationFee}\n`;
    out += `  Details: [/events/${e.slug}](/events/${e.slug})\n`;
  }
  return out;
}

export function buildCompactWebsiteKnowledge(options?: {
  liveProducts?: { name: string; slug: string; price: number; description?: string; category?: string }[];
  liveSevas?: { title: string; slug: string; description: string; goalAmount?: number | null; raisedAmount?: number }[];
}): string {
  let extra = "";
  if (options?.liveSevas?.length) {
    extra += "\n=== LIVE SEVA CAMPAIGNS FROM DATABASE ===\n";
    for (const s of options.liveSevas) {
      extra += `- ${s.title} [/seva/${s.slug}](/seva/${s.slug})`;
      if (s.goalAmount) extra += ` — raised ₹${s.raisedAmount} of ₹${s.goalAmount}`;
      extra += `\n  ${s.description.slice(0, 180)}\n`;
    }
  }
  return [
    SITE_FACTS,
    formatOfferingsCatalog(),
    formatShopCatalog(options?.liveProducts),
    formatEvents(),
    extra,
  ].join("\n");
}

export type KnowledgeChunk = { id: string; scoreKeys: string; text: string };

export function getKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    {
      id: "about",
      scoreKeys: "about temple matth address location where tumkur timings time phone email contact whatsapp heritage bakti seva",
      text: SITE_FACTS,
    },
    {
      id: "shipping",
      scoreKeys: "shipping delivery courier prasadam track tracking free shipping international express",
      text: `Shipping: India 5–7 days standard, 2–3 days express. Free standard shipping over ₹2,000. Tracking via email/SMS. Prasadam couriered after ritual. Full policy: [/shipping](/shipping)`,
    },
    {
      id: "returns",
      scoreKeys: "return refund exchange damaged unused incense prasadam 7 day",
      text: `7-day returns for unused items. No returns on opened incense, customized idols, or prasadam. Refunds 5–7 business days. Email support@baktiseva.com. [/returns](/returns) [/refunds](/refunds)`,
    },
  ];

  for (const o of SACRED_OFFERINGS) {
    chunks.push({
      id: o.slug,
      scoreKeys: `${o.title} ${o.slug} ${o.deity || ""} ${o.categoryName} ${o.type} ${o.shortDescription} pooja puja homa seva book price cost package`.toLowerCase(),
      text: `**${o.title}** (${o.categoryName}${o.deity ? `, ${o.deity}` : ""})
${o.shortDescription}
${o.fullDescription.slice(0, 420)}
Duration: ${o.duration || "See page"} | Location: ${o.location || "Temple"}
Packages: ${o.packages.map((p) => `${p.name} ₹${p.amount} — ${p.description}`).join(" | ")}
Includes: ${o.includes.join("; ")}
Benefits: ${o.benefits.join("; ")}
Book: [/seva/${o.slug}](/seva/${o.slug})`,
    });
  }

  for (const p of SHOP_CATALOG) {
    chunks.push({
      id: p.href,
      scoreKeys: `${p.name} ${p.category} ${p.description} shop buy product price`.toLowerCase(),
      text: `**${p.name}** — ₹${p.price} (${p.category})\n${p.description}\nBuy: [${p.href}](${p.href}) | Browse: [/shop](/shop)`,
    });
  }

  for (const e of EVENTS) {
    chunks.push({
      id: e.slug,
      scoreKeys: `${e.title} ${e.type} ${e.shortDescription} event festival ${e.date}`.toLowerCase(),
      text: `**${e.title}** — ${e.date}, ${e.time}\n${e.location}\n${e.shortDescription}\nHighlights: ${e.highlights.join("; ")}\nSchedule: ${e.schedule.map((s) => `${s.time} ${s.activity}`).join("; ")}\nFee: ${e.registrationFee}\nMore: [/events/${e.slug}](/events/${e.slug})`,
    });
  }

  chunks.push({
    id: "services",
    scoreKeys: "astrology vastu kundali muhurat consultation services pandit",
    text: `Additional services at [/services](/services): Personalized Pujas; Vedic Astrology (Janam Kundali, muhurat); Vastu consultations for home/workspace.`,
  });

  chunks.push({
    id: "blog",
    scoreKeys: "blog journal article deepam rudraksha architecture gita",
    text: `Journal at [/blog](/blog): The Significance of Daily Deepam; Understanding Rudraksha Mukhis; A Guide to Temple Architecture.`,
  });

  return chunks;
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^a-z0-9₹\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function retrieveRelevantKnowledge(query: string, limit = 6): string {
  const tokens = tokenize(query);
  if (!tokens.length) return "";
  const scored = getKnowledgeChunks()
    .map((c) => {
      const hay = c.scoreKeys + " " + c.text.toLowerCase();
      let score = 0;
      for (const t of tokens) {
        if (hay.includes(t)) score += t.length > 5 ? 2 : 1;
      }
      return { c, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (!scored.length) return "";
  return scored.map((x) => x.c.text).join("\n\n---\n\n");
}

export function buildSystemPrompt(query: string, live?: Parameters<typeof buildCompactWebsiteKnowledge>[0]): string {
  const retrieved = retrieveRelevantKnowledge(query, 5);
  return `You are "Bakti AI Guide", a warm, accurate assistant for Bakti Seva and Sri Lakshminarasimhaswami Matth.

Answer ONLY from the website knowledge below. Use actual names, prices, packages, dates, and links from this data. Do not invent products, sevas, or prices. If something is not listed, say so and point the devotee to [/contact](/contact) or support@baktiseva.com.

Tone: respectful and concise. Begin with "Namaste! 🙏" when greeting or answering a new topic. Use bullet points. Always include markdown links like [Seva](/seva).

When asked how to book or buy, give numbered steps.

=== FULL WEBSITE KNOWLEDGE (SOURCE OF TRUTH) ===
${buildCompactWebsiteKnowledge(live)}

=== MOST RELEVANT DETAILS FOR THIS QUESTION ===
${retrieved || "(use the full knowledge above)"}
`;
}

export function getLocalFallbackResponse(userText: string): string {
  const query = userText.toLowerCase().trim();
  const greetings = ["hi", "hello", "namaste", "hey", "hlo", "namaskar"];
  if (greetings.includes(query)) {
    return `Namaste! 🙏 Welcome to Bakti Seva & Sri Lakshminarasimhaswami Matth.

I can help with anything on this website:
• **Book poojas, homas & seva** → [/seva](/seva)
• **Spiritual shop** → [/shop](/shop)
• **Events** → [/events](/events)
• **Temple timings & map** → [/contact](/contact)
• **Shipping & returns** → [/shipping](/shipping)

How may I serve you today?`;
  }

  const retrieved = retrieveRelevantKnowledge(userText, 4);
  if (retrieved) {
    return `Namaste! 🙏 Here is what I found on the Bakti Seva website:

${retrieved}

Need more help? Browse [/seva](/seva), [/shop](/shop), or write to support@baktiseva.com.`;
  }

  return `Namaste! 🙏 I am your Bakti Seva guide, trained on this website's pages.

I can assist with:
1. **Online Pooja, Homa & Seva** → [/seva](/seva)
2. **Shop (essentials, idols, books, apparel, gifts)** → [/shop](/shop)
3. **Events at the Matth** → [/events](/events)
4. **Temple location & timings** (Devarathota, Tumkur) → [/contact](/contact)
5. **Shipping, returns, FAQ** → [/shipping](/shipping) · [/faq](/faq)

Please ask about a specific pooja, product, event, or policy.`;
}
