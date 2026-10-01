export interface SacredOffering {
  id: string;
  slug: string;
  title: string;
  type: "online-pooja" | "homa" | "seva";
  categoryName: string;
  deity?: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  benefits: string[];
  includes: string[];
  duration?: string;
  location?: string;
  goalAmount?: number;
  raisedAmount?: number;
  packages: {
    name: string;
    amount: number;
    description: string;
  }[];
}

export const SACRED_OFFERINGS: SacredOffering[] = [
  // ─── ONLINE POOJAS ───
  {
    id: "pooja-1",
    slug: "maha-rudrabhisheka",
    title: "Maha Rudrabhisheka Sacred Puja",
    type: "online-pooja",
    categoryName: "Online Pooja",
    deity: "Lord Shiva",
    shortDescription: "Sacred abhishekam with panchamrita, holy waters, and 108 Bilva patras invoking Lord Shiva's divine grace.",
    fullDescription: "The Maha Rudrabhisheka is one of the most revered Vedic rituals dedicated to Lord Shiva. Chanted with Sri Rudram and Chamakam hymns by Vedic pandits, this powerful pooja washes away karmic afflictions, removes fears, and fills the devotee's life with peace, health, and spiritual awakening. Your personalized sankalpa will be taken with your Gotra and Nakshatra, and blessed Bhasma and Bilva leaves will be couriered to your doorstep.",
    image: "/images/temple_aarti_ceremony_1790597350613.jpg",
    benefits: [
      "Dissolves past negative karmas and planetary afflictions",
      "Restores physical health, mental calm, and spiritual tranquility",
      "Shields home and family from negative vibrations"
    ],
    includes: [
      "Personalized Vedic Sankalpa with your Name, Gotra & Nakshatra",
      "Live Streaming / High-Definition Video recording link",
      "Consecrated Shiva Bhasma, Bilva leaves & Raksha thread prasadam delivered"
    ],
    duration: "90 Minutes",
    location: "Kashi Vishwanath Kshetra / Sacred Temple Altar",
    packages: [
      { name: "Individual Sankalpa", amount: 1501, description: "Personalized prayer for 1 devotee with energized Bhasma prasadam." },
      { name: "Family Sankalpa", amount: 2501, description: "Includes all family members with complete sacred prasadam kit." },
      { name: "Special Maha Rudram", amount: 5101, description: "Includes 11 recitations of Sri Rudram, special archana, and silver bilva offering." }
    ]
  },
  {
    id: "pooja-2",
    slug: "shri-mahalakshmi-puja",
    title: "Shri Mahalakshmi Dhanakarshana Puja",
    type: "online-pooja",
    categoryName: "Online Pooja",
    deity: "Goddess Mahalakshmi",
    shortDescription: "Auspicious puja with red lotuses and Sri Suktam chanting to invite lasting wealth, prosperity, and joy.",
    fullDescription: "Goddess Mahalakshmi is the divine embodiment of auspiciousness, grace, and abundance. In this authentic Dhanakarshana ritual, qualified priests chant the Sri Suktam and Kanakadhara Stotram while offering fresh lotus petals and sacred fragrant herbs. It removes financial bottlenecks, brings career breakthroughs, and ensures abundance in your household.",
    image: "/images/lakshmi_idol_1790600292175.jpg",
    benefits: [
      "Attracts sustained financial stability, growth, and prosperity",
      "Purifies business spaces and resolves professional hurdles",
      "Blesses the household with peace, auspiciousness, and joy"
    ],
    includes: [
      "Vedic Sri Suktam & Kanakadhara recitations",
      "Kanakadhara Yantra energization in your name",
      "Sacred Kumkum, energized Lakshmi Coin & Dry Fruit Prasadam delivered"
    ],
    duration: "75 Minutes",
    location: "Kolhapur Kshetra / Vedic Altar",
    packages: [
      { name: "Griha Samriddhi", amount: 1100, description: "Sankalpa for family prosperity and sacred Kumkum prasadam." },
      { name: "Vyapar Vriddhi (Business)", amount: 2100, description: "Special archana for business prosperity with energized Lakshmi coin." },
      { name: "Ashta Lakshmi Mahapuja", amount: 5001, description: "Comprehensive worship of all 8 aspects of Lakshmi with Sri Yantra." }
    ]
  },
  {
    id: "pooja-3",
    slug: "vighnaharta-ganesha-puja",
    title: "Vighnaharta Ganesha Sankashti Puja",
    type: "online-pooja",
    categoryName: "Online Pooja",
    deity: "Lord Ganesha",
    shortDescription: "Sacred worship with 21 Durva grass bundles and modak naivedyam to remove all obstacles from your path.",
    fullDescription: "Lord Ganesha is the primordial remover of obstacles and lord of auspicious beginnings. Whether starting a new venture, purchasing a new home, sitting for exams, or looking to remove lingering setbacks, the Vighnaharta Puja invokes his blessings. Chanted with Ganapati Atharvashirsha, the puja fills your life with intellect, clarity, and success.",
    image: "/images/ganesha_idol_1790594652426.jpg",
    benefits: [
      "Removes impediments in education, career, and business",
      "Instills wisdom, sharp intellect, and decisive clarity",
      "Grants auspicious protection before starting any new journey"
    ],
    includes: [
      "21 Durva grass offerings & Ganapati Atharvashirsha recitations",
      "Fresh Modak & Panchamrita naivedya",
      "Sacred Raksha thread, Vibhuti & Ganesha pendant prasadam sent home"
    ],
    duration: "60 Minutes",
    location: "Sacred Ganesha Kshetra",
    packages: [
      { name: "Sankashti Basic", amount: 751, description: "Individual sankalpa and sacred thread blessing." },
      { name: "Vighna Nivarana", amount: 1501, description: "Family sankalpa with 108 Ganesha Namavali archana." },
      { name: "Maha Ganapati Samputa", amount: 3100, description: "Full Atharvashirsha avartana with silver durva offering and energized talisman." }
    ]
  },
  {
    id: "pooja-4",
    slug: "satyanarayan-mahapooja",
    title: "Shri Satyanarayan Swami Mahapooja",
    type: "online-pooja",
    categoryName: "Online Pooja",
    deity: "Lord Satyanarayan (Vishnu)",
    shortDescription: "Divine 5-chapter Katha, Tulsi archana, and panchamrita offering for family harmony and fulfillment of vows.",
    fullDescription: "The Satyanarayan Mahapooja is a timeless tradition celebrated on Purnima, housewarmings, weddings, or milestones. It honors Lord Vishnu, who represents universal truth and righteousness. Devotees who perform this puja experience profound family harmony, relief from distress, and fulfillment of sincere prayers.",
    image: "/images/pooja_thali_set_1790594617235.jpg",
    benefits: [
      "Fosters harmony, understanding, and affection among family members",
      "Brings closure to prolonged anxieties and fulfills heartfelt desires",
      "Invites divine protection of Lord Vishnu into the residence"
    ],
    includes: [
      "Complete 5 Chapters of Sacred Satyanarayan Katha recitations",
      "Tulsi leaf archana with 1000 names (Vishnu Sahasranama)",
      "Traditional Sheera prasadam mix, sacred tulsi beads & Kalash thread delivered"
    ],
    duration: "120 Minutes",
    location: "Vedic Yajnashala Altar",
    packages: [
      { name: "Katha Sankalpa", amount: 1800, description: "Sankalpa with complete Katha and personalized family blessing." },
      { name: "Complete Mahapooja", amount: 3600, description: "Detailed worship with Panchamrita snanam and extensive fruit offerings." },
      { name: "Purnima Special", amount: 7200, description: "Performed on auspicious Full Moon with 5 Vedic purohits chanting." }
    ]
  },

  // ─── SACRED HOMA (FIRE RITUALS) ───
  {
    id: "homa-1",
    slug: "maha-ganapathi-homa",
    title: "Maha Ganapathi Sacred Homa",
    type: "homa",
    categoryName: "Sacred Homa",
    deity: "Lord Ganesha & Agni Devata",
    shortDescription: "Powerful fire ritual invoking Agni Deva and Lord Ganesha with 108 ahutis of modak, pure ghee, and sacred samidha.",
    fullDescription: "A Homa is a primordial fire sacrifice that bridges the terrestrial realm with cosmic vibrations. Maha Ganapathi Homa is recommended before commencing any major milestone, moving into a new residence, or breaking free from persistent life obstacles. As the holy fire consumes the herbs, grains, and offerings, it dissolves negative frequencies and radiates positive prana throughout.",
    image: "/images/sacred_homa_fire_1790597364613.jpg",
    benefits: [
      "Cleanses vastu dosha and purifies ambient negative energy",
      "Ignites vitality, enthusiasm, and inner confidence",
      "Ensures auspicious beginnings and smooth completion of endeavors"
    ],
    includes: [
      "Live streaming of the sacred fire ritual from the Yajnashala",
      "108 modak and ghee ahutis offered in your family's name",
      "Consecrated Homa Bhasma (sacred ash) & energized protective talisman sent home"
    ],
    duration: "2 Hours",
    location: "Sacred Vedic Yajnashala",
    packages: [
      { name: "Griha Shanti", amount: 2501, description: "Basic Ganapathi Homa with personalized family sankalpa." },
      { name: "Ashtadravya Homa", amount: 5100, description: "Includes 8 sacred ingredients: modak, coconut, sugarcane, puffed rice, jaggery, honey, ghee, sesame." },
      { name: "Maha Sankalpa Yagna", amount: 11000, description: "Grand homa conducted by 4 certified Vedic priests with full mantra japa." }
    ]
  },
  {
    id: "homa-2",
    slug: "maha-mrityunjaya-homa",
    title: "Maha Mrityunjaya Healing & Longevity Homa",
    type: "homa",
    categoryName: "Sacred Homa",
    deity: "Lord Shiva (Tryambakeshwara)",
    shortDescription: "Potent fire ritual chanting the revered Maha Mrityunjaya mantra with Amrita herb ahutis for health and rejuvenation.",
    fullDescription: "Chanted with the nectarous Maha Mrityunjaya Mantra, this homa is a potent shield against severe health afflictions, physical weakness, accidents, and premature demise. Dedicated to Lord Shiva, the conqueror of death, it envelops the devotee in divine protective armor (Kavacha), invigorating physical longevity and mental resilience.",
    image: "/images/sacred_homa_fire_1790597364613.jpg",
    benefits: [
      "Provides relief and protection from chronic health issues and accidents",
      "Calms acute panic, dread, and deep-seated emotional trauma",
      "Infuses physical vitality, prana, and longevity"
    ],
    includes: [
      "1,008 Maha Mrityunjaya Mantra Japa & Ghee Ahutis",
      "Energized Mrityunjaya Yantra & Sacred Homa Raksha",
      "Holy Tirtha and energized copper talisman couriered"
    ],
    duration: "2.5 Hours",
    location: "Vedic Healing Mandapam",
    packages: [
      { name: "Arogya Sankalpa", amount: 3100, description: "Prayer for recovery and vitality for a single devotee." },
      { name: "Maha Ayushya Homa", amount: 7100, description: "Combines Ayushya Homa for long life and well-being of the whole family." },
      { name: "Mrityunjaya Mahayagna", amount: 15000, description: "Extensive fire ritual with 5,000 mantra recitations and pure cow ghee ahutis." }
    ]
  },
  {
    id: "homa-3",
    slug: "navagraha-shanti-homa",
    title: "Navagraha Shanti Homa (Nine Planets Harmony)",
    type: "homa",
    categoryName: "Sacred Homa",
    deity: "The Nine Celestial Grahas",
    shortDescription: "Harmonizes planetary doshas (Saturn, Rahu, Ketu, Mars) through nine specific sacred woods and grains.",
    fullDescription: "Astrological transits (Dasa, Sade Sati, Manglik dosha, Rahu-Ketu transit) often present unforeseen hurdles. The Navagraha Shanti Homa appeases all 9 planetary rulers using their specific sacred woods (Samidhas) such as Arka, Palasha, Khadira, and Apamarga. It neutralizes planetary malevolence and unlocks auspicious planetary blessings.",
    image: "/images/sacred_homa_fire_1790597364613.jpg",
    benefits: [
      "Pacifies adverse planetary transits like Sade Sati and Rahu Mahadasha",
      "Restores career momentum, marital peace, and health",
      "Brings equilibrium and positive opportunities"
    ],
    includes: [
      "Offerings with 9 distinct sacred woods, grains, and colored cloths",
      "Energized Navagraha Yantra on pure copper plate",
      "Navadhanya packet and holy Raksha sent to your doorstep"
    ],
    duration: "3 Hours",
    location: "Navagraha Sannidhi Yajnashala",
    packages: [
      { name: "Dosha Shanti", amount: 3500, description: "Focused shanti for specific troublesome planet (e.g. Shani or Rahu)." },
      { name: "All 9 Planets Homa", amount: 8500, description: "Comprehensive fire offering for all 9 planets with personalized chart alignment." },
      { name: "Grand Navagraha Yagna", amount: 18000, description: "Conducted with 9 purohits each chanting respective graha mantras." }
    ]
  },
  {
    id: "homa-4",
    slug: "sudarshana-narasimha-homa",
    title: "Shri Sudarshana & Narasimha Raksha Homa",
    type: "homa",
    categoryName: "Sacred Homa",
    deity: "Lord Sudarshana & Lord Narasimha",
    shortDescription: "Invincible spiritual protection against evil eye, envy, hidden adversaries, and psychological fear.",
    fullDescription: "Lord Sudarshana's cosmic disc burns away negativity, and Lord Narasimha represents unyielding divine protection for devotees in distress. This homa creates an impenetrable spiritual perimeter around your household and profession. Chanted with the fearsome and potent Sudarshana and Narasimha Bija Mantras, it shatters spiritual stagnation and fear.",
    image: "/images/c61b827d-c793-41af-9391-20d3751c5527.png",
    benefits: [
      "Annihilates drishti (evil eye), psychic disturbance, and jealousy",
      "Aids in legal disputes, financial harassment, and unresolved conflicts",
      "Instills courage, supreme confidence, and unwavering clarity"
    ],
    includes: [
      "Sudarshana Chakra mantra recitations with red flowers and sacred ghee",
      "Energized Sudarshana Raksha Bhasma & sacred yellow thread",
      "Personalized Copper Sudarshana Yantra sent by courier"
    ],
    duration: "2 Hours",
    location: "Ahobila Kshetra / Sacred Narasimha Altar",
    packages: [
      { name: "Raksha Sankalpa", amount: 4100, description: "Protective sankalpa for individual or business enterprise." },
      { name: "Maha Sudarshana Yagna", amount: 9500, description: "Complete ritual with 1,008 Ahutis and energized Yantra." },
      { name: "Ugra Narasimha Shanti", amount: 21000, description: "Grand fire ritual performed during auspicious Sandhya muhurat by Vedic masters." }
    ]
  },

  // ─── COMMUNITY SEVA INITIATIVES ───
  {
    id: "seva-1",
    slug: "annadanam-support",
    title: "Daily Annadanam Seva (Feeding the Needy)",
    type: "seva",
    categoryName: "Community Seva",
    shortDescription: "Sponsor hot, wholesome satvik meals for hundreds of daily pilgrims, sadhus, and underprivileged families.",
    fullDescription: "In Sanatana Dharma, 'Annadanam Mahadanam'—the gift of food is celebrated as the highest sacrifice because it satisfies the soul directly. Every single day, Bakti Seva supports temple kitchens and charitable community centers providing hygienic, nourishing satvik meals with rice, sambar, seasonal vegetables, and sweets to hundreds of devotees, sadhus, and needy families. Your contribution directly sponsors grain, vegetables, and kitchen fuel.",
    image: "/images/pooja_thali_set_1790594617235.jpg",
    goalAmount: 500000,
    raisedAmount: 385000,
    benefits: [
      "Earns immense Punya (spiritual merit) for yourself and your ancestors (Pitrus)",
      "Feeds hungry children, elderly devotees, and ascetics with dignity",
      "Supplies 100% transparent photographic and receipt updates"
    ],
    includes: [
      "Photographic update of meals served in your family's name",
      "Digital Seva Certificate and tax-exemption receipt",
      "Special prayers offered on your specified birth date or anniversary"
    ],
    location: "Sacred Temple Kitchens & Rural Outreaches",
    packages: [
      { name: "Feed 10 Devotees", amount: 501, description: "Provides hot satvik meals for 10 hungry individuals." },
      { name: "Feed 25 Devotees", amount: 1001, description: "Feeds 25 sadhus and devotees with rice, dal, subji, and sweet." },
      { name: "Feed 60 Devotees", amount: 2501, description: "Major meal sponsorship honoring a family birthday or memorial." },
      { name: "Full Day Kitchen Sponsor", amount: 5001, description: "Sponsors all kitchen provisions for an entire day serving 150+ souls." }
    ]
  },
  {
    id: "seva-2",
    slug: "goshala-maintenance",
    title: "Gau Mata Seva & Sacred Goshala Shelter",
    type: "seva",
    categoryName: "Community Seva",
    shortDescription: "Providing nutritious green fodder, medical treatment, clean water, and loving shelter to abandoned cows and calves.",
    fullDescription: "Gau Mata (the sacred cow) is revered as the abode of 33 crore divine energies. Many indigenous desi cows are abandoned when aged or ailing. Our partnered goshalas offer lifelong dignity, veterinary healthcare, clean water ponds, and loving protection to abandoned cows, bulls, and orphaned calves. Your seva sponsors fresh green grass, jaggery, mineral supplements, and shelter repairs.",
    image: "/images/meditation_nature_peace_1790597381129.jpg",
    goalAmount: 300000,
    raisedAmount: 215000,
    benefits: [
      "Brings immense peace and auspiciousness, pleasing all divine powers",
      "Prevents cruelty and protects native indigenous (Desi) cow breeds",
      "Sponsors life-saving veterinary treatment and safe shelter"
    ],
    includes: [
      "Photo and video of cows receiving your sponsored fodder",
      "Digital certificate with cow blessing card",
      "Panchagavya sanctified prasadam sent upon request"
    ],
    location: "Sri Surabhi Cow Sanctuaries",
    packages: [
      { name: "1 Day Green Fodder", amount: 501, description: "Provides fresh green grass and clean water for 5 cows." },
      { name: "Medical & Nutrition Care", amount: 1501, description: "Sponsors vital medicines, bandages, and jaggery supplements." },
      { name: "Monthly Gau Daan Sponsor", amount: 3501, description: "Complete monthly maintenance and adoption support for 1 cow." }
    ]
  },
  {
    id: "seva-3",
    slug: "temple-restoration",
    title: "Ancient Temple Restoration Seva",
    type: "seva",
    categoryName: "Community Seva",
    shortDescription: "Rebuilding dilapidated heritage village temples, reviving neglected murtis, and restarting daily aarti rituals.",
    fullDescription: "Thousands of historic stone temples across rural India, rich in architectural majesty and spiritual vibrations, have fallen into ruin due to neglect. We partner with local village trusts and traditional artisans (sthapathis) to clean overgrown sanctorums, rebuild stone pillars, reinstall water tanks, and re-establish daily Nitya Aarti and lamp lighting (Deepa seva).",
    image: "/images/c61b827d-c793-41af-9391-20d3751c5527.png",
    goalAmount: 1000000,
    raisedAmount: 740000,
    benefits: [
      "Preserves India's incomparable architectural and devotional legacy",
      "Re-establishes daily divine worship in long-neglected villages",
      "Restores local community pride, heritage festivals, and unity"
    ],
    includes: [
      "Your family's name inscribed in the Temple Patron Donor Ledger",
      "Progress newsletter with before/after restoration documentation",
      "Blessed sanctum consecrated coin and holy prasad"
    ],
    location: "Heritage Village Temples of South & Central India",
    packages: [
      { name: "Sacred Brick Contribution", amount: 1001, description: "Sponsors stones and masonry supplies for sanctum restoration." },
      { name: "Nitya Deepa (Lamp) Fund", amount: 2501, description: "Sponsors pure sesame oil and wicks for continuous sanctum lighting for 3 months." },
      { name: "Pillar Restoration Sponsor", amount: 5001, description: "Funds restoration of one sculpted stone pillar with donor inscription." },
      { name: "Maha Kumbhabhishekam Patron", amount: 11000, description: "Grand donor status for the temple's reconsecration ceremony." }
    ]
  },
  {
    id: "seva-4",
    slug: "vidyadaan-initiative",
    title: "Vidyadaan: Vedic Student Scholarship Seva",
    type: "seva",
    categoryName: "Community Seva",
    shortDescription: "Supporting young Vedic students (Vidyarthis) in traditional Pathashalas with food, books, clothing, and learning resources.",
    fullDescription: "The oral tradition of the Vedas has been preserved for millennia from teacher to disciple (Guru-Shishya parampara). Dedicated young students spend years mastering Vedic chants, rituals, Sanskrit grammar, and spiritual philosophy. Your donation provides these humble students with text scriptures, lodging, nutrition, clothing, and healthcare so they can carry forward our sacred heritage.",
    image: "/images/spiritual_book_1790594667780.jpg",
    goalAmount: 400000,
    raisedAmount: 310000,
    benefits: [
      "Sustains the eternal wisdom of Vedas and Sanskrit literature",
      "Empowers brilliant young scholars from modest backgrounds",
      "Earns Saraswati Kataksha (grace of wisdom and learning) for your family"
    ],
    includes: [
      "Personal handwritten thank-you note from a sponsored student",
      "Recorded video chanting of Vedic blessings (Swasti Vachanam) for you",
      "Annual academic progress report and scripture booklet"
    ],
    location: "Traditional Veda Pathashalas",
    packages: [
      { name: "Scripture & Study Kit", amount: 1100, description: "Provides printed Sanskrit texts, notebooks, and learning supplies." },
      { name: "Monthly Student Support", amount: 2500, description: "Sponsors food, milk, and clothes for 1 student for a month." },
      { name: "Vedic Term Scholarship", amount: 5000, description: "Covers a full semester of training, lodging, and health support." }
    ]
  }
];

// Helper to find an offering by slug or alias
export function getOfferingBySlug(slug: string): SacredOffering | undefined {
  // Support aliases like 'annadanam-seva' -> 'annadanam-support'
  const normalized = slug === "annadanam-seva" ? "annadanam-support" : slug;
  return SACRED_OFFERINGS.find(
    (item) => item.slug === normalized || item.slug === slug
  );
}
