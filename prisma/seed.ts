import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean up existing data to prevent duplicates on re-seed
  await prisma.productImage.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.seva.deleteMany();

  // Create Categories
  const pujaCategory = await prisma.category.create({
    data: {
      name: "Puja Essentials",
      slug: "puja-essentials",
      description: "Everything you need for your daily and festive pujas.",
      imageUrl: "/images/pooja_thali_set_1790594617235.jpg"
    },
  });

  const decorCategory = await prisma.category.create({
    data: {
      name: "Spiritual Decor",
      slug: "decor",
      description: "Divine idols and decor to elevate your space.",
      imageUrl: "/images/ganesha_idol_1790594652426.jpg"
    },
  });

  const booksCategory = await prisma.category.create({
    data: {
      name: "Books & Literature",
      slug: "books",
      description: "Sacred texts and spiritual literature.",
      imageUrl: "/images/spiritual_book_1790594667780.jpg"
    },
  });

  const apparelCategory = await prisma.category.create({
    data: {
      name: "Apparel",
      slug: "apparel",
      description: "Traditional and comfortable spiritual clothing.",
      imageUrl: "/images/rudraksha_mala_1790594628771.jpg" // using existing image as placeholder
    },
  });

  // Create Products
  const products = [
    {
      name: "Premium Himalayan Rudraksha Mala",
      slug: "premium-rudraksha-mala",
      description: "Authentic 108+1 bead panchamukhi rudraksha mala sourced directly from the Himalayas. Consecrated and ready for your daily japa practice.",
      price: 2499,
      stock: 50,
      categoryId: pujaCategory.id,
      imageUrl: "/images/rudraksha_mala_1790594628771.jpg",
      isFeatured: true,
    },
    {
      name: "Handcrafted Brass Ganesha Idol",
      slug: "brass-ganesha-idol",
      description: "Intricately detailed 8-inch solid brass Ganesha idol. Perfect for your home altar or as a premium gift.",
      price: 8500,
      stock: 15,
      categoryId: decorCategory.id,
      imageUrl: "/images/ganesha_idol_1790594652426.jpg",
      isFeatured: true,
    },
    {
      name: "Organic Temple Incense Bundle",
      slug: "organic-incense-bundle",
      description: "Hand-rolled incense sticks made from recycled temple flowers and natural essential oils.",
      price: 899,
      stock: 100,
      categoryId: pujaCategory.id,
      imageUrl: "/images/incense_sticks_1790594641127.jpg",
    },
    {
      name: "The Bhagavad Gita - Deluxe Edition",
      slug: "bhagavad-gita-deluxe",
      description: "A beautifully bound hardcover edition of the Bhagavad Gita with gold-foil edges, original Sanskrit shlokas, and commentary.",
      price: 3500,
      stock: 30,
      categoryId: booksCategory.id,
      imageUrl: "/images/bhagavad_gita_deluxe.jpg",
      isFeatured: true,
    },
    {
      name: "Traditional Brass Diya",
      slug: "traditional-brass-diya",
      description: "A beautifully crafted traditional brass diya, perfect for daily puja and festive occasions.",
      price: 1200,
      stock: 45,
      categoryId: pujaCategory.id,
      imageUrl: "/images/brass_diya_lamp.jpg",
      isFeatured: false,
    },
    {
      name: "Pure Silver Kalash",
      slug: "pure-silver-kalash",
      description: "A sacred silver kalash for storing holy water or offering during pujas.",
      price: 15500,
      stock: 5,
      categoryId: decorCategory.id,
      imageUrl: "/images/silver_kalash.jpg",
      isFeatured: false,
    },
    {
      name: "Lakshmi Mata Brass Idol",
      slug: "lakshmi-brass-idol",
      description: "Goddess Lakshmi idol carved in premium brass, symbolizing wealth and prosperity.",
      price: 9200,
      stock: 12,
      categoryId: decorCategory.id,
      imageUrl: "/images/lakshmi_idol.jpg",
      isFeatured: false,
    },
    {
      name: "Narmadeshwar Shiva Lingam",
      slug: "shiva-lingam",
      description: "Authentic naturally formed Shiva Lingam from the Narmada river.",
      price: 4500,
      stock: 20,
      categoryId: decorCategory.id,
      imageUrl: "/images/shiva_lingam.jpg",
      isFeatured: true,
    },
    {
      name: "Crystal Sphatik Mala",
      slug: "crystal-sphatik-mala",
      description: "108 beads of pure clear quartz crystal (sphatik) for mantra chanting and cooling the mind.",
      price: 3100,
      stock: 35,
      categoryId: pujaCategory.id,
      imageUrl: "/images/crystal_mala.jpg",
      isFeatured: false,
    },
    {
      name: "Patanjali Yoga Sutras",
      slug: "yoga-sutras-book",
      description: "The complete aphorisms of Patanjali with in-depth philosophical commentary.",
      price: 1850,
      stock: 40,
      categoryId: booksCategory.id,
      imageUrl: "/images/yoga_sutras_book.jpg",
      isFeatured: false,
    },
    {
      name: "The Four Vedas Stack",
      slug: "four-vedas-stack",
      description: "A comprehensive translated edition of the four sacred Vedas in a beautiful collection.",
      price: 8500,
      stock: 15,
      categoryId: booksCategory.id,
      imageUrl: "/images/four_vedas_stack.png",
      isFeatured: false,
    },
    {
      name: "Vishnu Sahasranama",
      slug: "vishnu-sahasranama-book",
      description: "1000 names of Lord Vishnu with deeper meanings and chanting guide.",
      price: 1200,
      stock: 60,
      categoryId: booksCategory.id,
      imageUrl: "/images/vishnu_sahasranama_book_1790666053656.jpg",
      isFeatured: false,
    },
    {
      name: "Handwoven Cotton Kurta",
      slug: "cotton-kurta",
      description: "Comfortable, handwoven pure cotton kurta ideal for daily meditation or temple visits.",
      price: 1800,
      stock: 40,
      categoryId: apparelCategory.id,
      imageUrl: "/images/handwoven_cotton_kurta_1790665442085.jpg",
      isFeatured: true,
    },
    {
      name: "Pure Silk Dhoti Set",
      slug: "silk-dhoti-set",
      description: "Traditional pure silk dhoti with an elegant border, perfect for auspicious ceremonies.",
      price: 4500,
      stock: 25,
      categoryId: apparelCategory.id,
      imageUrl: "/images/pure_silk_dhoti_1790665459384.jpg",
      isFeatured: false,
    },
    {
      name: "Navratna Mala",
      slug: "navratna-mala-apparel",
      description: "A stunning mala featuring the nine planetary gemstones, designed as a beautiful wearable spiritual accessory.",
      price: 6500,
      stock: 18,
      categoryId: apparelCategory.id,
      imageUrl: "/images/navratna_mala.jpg",
      isFeatured: false,
    },
    {
      name: "Meditation Shawl",
      slug: "meditation-shawl",
      description: "A warm and oversized meditation shawl with traditional Indian motifs.",
      price: 2100,
      stock: 55,
      categoryId: apparelCategory.id,
      imageUrl: "/images/meditation_shawl_1790665481973.jpg",
      isFeatured: false,
    },
    {
      name: "Premium Kanchipuram Silk Saree",
      slug: "kanchipuram-silk-saree",
      description: "A premium luxurious Kanchipuram silk saree with a golden zari border, perfect for auspicious occasions.",
      price: 15500,
      stock: 10,
      categoryId: apparelCategory.id,
      imageUrl: "/images/premium_silk_saree_1790666295099.jpg",
      isFeatured: true,
    },
    {
      name: "The Upanishads Collection",
      slug: "upanishads-collection",
      description: "A beautifully bound hardcover collection of ancient wisdom and eternal truths of Indian philosophy.",
      price: 4500,
      stock: 20,
      categoryId: booksCategory.id,
      imageUrl: "/images/upanishads_collection_1790666308780.jpg",
      isFeatured: true,
    },
    {
      name: "Vedic Scriptures (Illustrated)",
      slug: "vedic-scriptures-illustrated",
      description: "A richly illustrated hardcover volume of selected Vedic hymns, with ornamental sacred geometry and refined editorial craftsmanship for the modern devotee’s library.",
      price: 1899,
      stock: 40,
      categoryId: booksCategory.id,
      imageUrl: "/images/products/vedic-scriptures/vedic-scriptures-front.webp",
      isFeatured: true,
    },
    {
      name: "Silver Puja Thali Gift Set",
      slug: "silver-puja-thali-gift",
      description: "An exquisite pure silver puja thali set for your daily rituals and gifting purposes.",
      price: 12500,
      stock: 8,
      categoryId: decorCategory.id,
      imageUrl: "/images/silver_puja_thali_gift.jpg",
      isFeatured: true,
    },
    {
      name: "Premium Pooja Thali Set",
      slug: "premium-pooja-thali-set",
      description: "A complete brass pooja thali set including all essentials for a perfect spiritual ceremony.",
      price: 3200,
      stock: 25,
      categoryId: pujaCategory.id,
      imageUrl: "/images/pooja_thali_set_1790594617235.jpg",
      isFeatured: false,
    }
  ];

  for (const p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        stock: p.stock,
        categoryId: p.categoryId,
        imageUrl: p.imageUrl,
        isFeatured: p.isFeatured || false,
      },
    });

    // Create default variant and inventory
    const variant = await prisma.productVariant.create({
      data: {
        sku: `SKU-${p.slug.toUpperCase()}`,
        name: "Standard",
        productId: product.id,
      },
    });

    await prisma.inventory.create({
      data: {
        quantity: p.stock,
        productId: product.id,
        variantId: variant.id,
      },
    });

    // Create mock images
    await prisma.productImage.create({
      data: {
        url: p.imageUrl,
        isPrimary: true,
        productId: product.id,
      },
    });
  }

  // Create Sevas
  await prisma.seva.create({
    data: {
      title: "Annadanam Seva - Feed the Needy",
      slug: "annadanam-seva",
      description: "Provide wholesome, nutritious meals to the underprivileged, pilgrims, and sadhus in and around the temple premises. 'Annadanam Mahadanam' - the donation of food is considered the highest form of charity.",
      image: "/images/temple_aarti_ceremony_1790597350613.jpg",
      goalAmount: 500000,
      raisedAmount: 125000,
      isActive: true,
    }
  });

  await prisma.seva.create({
    data: {
      title: "Goshala Maintenance",
      slug: "goshala-maintenance",
      description: "Support the upkeep and medical care of our sacred cows. Your contribution helps provide high-quality fodder, clean shelter, and veterinary assistance to the gentle beings that provide us with spiritual nourishment.",
      image: "/images/sacred_homa_fire_1790597364613.jpg",
      goalAmount: 200000,
      raisedAmount: 180000,
      isActive: true,
    }
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
