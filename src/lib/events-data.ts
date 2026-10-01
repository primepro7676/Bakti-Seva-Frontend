export interface EventData {
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  shortDescription: string;
  image: string;
  origin: string;
  fullDescription: string;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  whatToBring: string[];
  dresscode: string;
  registrationFee: string;
  contactEmail: string;
  contactPhone: string;
}

export const EVENTS: EventData[] = [
  {
    slug: "maha-shivaratri-celebrations",
    title: "Maha Shivaratri Celebrations",
    date: "March 8, 2027",
    time: "6:00 PM – 6:00 AM",
    location: "Main Temple Courtyard, Sri Lakshminarasimhaswami Matth, Tumkur",
    type: "Annual Utsava",
    shortDescription:
      "Join us for a night of divine vigil, continuous rudrabhishekam, and soul-stirring bhajans to honor Lord Shiva.",
    image: "/images/maha_shivaratri.jpg",
    origin: `Maha Shivaratri — literally "The Great Night of Shiva" — is one of the most sacred festivals in the Hindu calendar, observed on the 14th night of the dark fortnight in the month of Phalguna (February–March). Its origins are rooted in multiple Puranic legends. The most celebrated is the story from the Shiva Purana, in which Lord Brahma and Lord Vishnu engaged in a cosmic dispute over supremacy. To resolve it, Lord Shiva appeared as an infinite column of light (Jyotirlinga), and neither could find its end. Recognizing Shiva's supremacy, both bowed in reverence. This night of the Jyotirlinga's appearance is commemorated as Maha Shivaratri.

Another popular legend describes a hunter who accidentally stayed awake all night in a bilva (bael) tree, unknowingly dropping leaves onto a Shiva Lingam below. Moved by this unwitting devotion, Lord Shiva granted him liberation — establishing the tradition that even inadvertent worship on this night carries profound spiritual merit.

The festival also commemorates the cosmic dance of Lord Shiva as Nataraja — the Lord of Dance — who performs the Tandava, the dance of creation and destruction, on this night. According to the Shaiva tradition, this is the night when Shiva and Shakti (Parvati) were united in divine marriage, and devotees stay awake all night to witness and celebrate this cosmic union.`,
    fullDescription: `Maha Shivaratri at Sri Lakshminarasimhaswami Matth is a transcendent all-night vigil drawing thousands of devotees from across Karnataka and beyond. The temple grounds are illuminated with thousands of diyas, camphor lamps, and floral decorations. The continuous sound of bells, conch shells, and Vedic chants fills the night with an electric spiritual atmosphere.

The centerpiece of the celebration is the Rudrabhishekam — an elaborate ritual bathing of the Shiva Lingam with sacred substances including milk, honey, curd, ghee, and Ganga Jal, accompanied by the chanting of the Sri Rudram and Chamakam. This ceremony is performed every three hours throughout the night, corresponding to the four praharas (watches) of the night.

The Sri Lakshminarasimhaswami Matth has been performing this celebration for over 150 years, drawing on traditions passed down through an unbroken lineage of acharyas. The Matth's Shiva Lingam is said to be a Swayambhu Lingam — self-manifested — making the Abhishekam performed here especially auspicious.`,
    highlights: [
      "Continuous Rudrabhishekam (4 sessions throughout the night)",
      "108-diya Maha Deepa Puja at midnight",
      "Unbroken Shiva Sahasranama chanting by 108 priests",
      "Classical Bharatanatyam performance depicting Shiva's Tandava",
      "Free Annadanam (sacred meal) for all devotees",
      "Distribution of Prasadam: vibhuti, bilva leaves & panchamrita",
      "Sunrise Mangala Arati at 6:00 AM",
    ],
    schedule: [
      { time: "6:00 PM", activity: "Sandhya Arati & Lamp Lighting Ceremony" },
      { time: "7:00 PM", activity: "First Rudrabhishekam begins" },
      { time: "9:00 PM", activity: "Shiva Bhajan Sabha — devotional music concert" },
      { time: "11:00 PM", activity: "Second Rudrabhishekam" },
      { time: "12:00 AM", activity: "Maha Nisha Puja — Midnight grand worship" },
      { time: "12:30 AM", activity: "108-Diya Maha Deepa Puja" },
      { time: "2:00 AM", activity: "Third Rudrabhishekam & Annadanam" },
      { time: "4:00 AM", activity: "Brahma Muhurta Puja — pre-dawn worship" },
      { time: "5:00 AM", activity: "Fourth Rudrabhishekam (final)" },
      { time: "6:00 AM", activity: "Sunrise Mangala Arati & Prasadam distribution" },
    ],
    whatToBring: [
      "Bilva leaves (if available — also distributed at temple)",
      "White or saffron-coloured clothing preferred",
      "Personal prayer beads (rudraksha mala)",
      "Blanket or shawl for the cool night hours",
    ],
    dresscode: "Traditional Indian attire preferred. White or saffron for Shivaratri. Modest dress required.",
    registrationFee: "Free entry. Prasadam and Annadanam are complimentary.",
    contactEmail: "events@srilns.org",
    contactPhone: "+91-816-221-XXXX",
  },

  {
    slug: "narasimha-jayanti-mahotsava",
    title: "Narasimha Jayanti Mahotsava",
    date: "May 12, 2027",
    time: "5:00 AM – 9:00 PM",
    location: "Sri Lakshminarasimhaswami Matth, Tumkur, Karnataka",
    type: "Sacred Homa",
    shortDescription:
      "Grand annual celebrations including Abhishekam, Homa, Bhajans and Prasadam distribution for devotees.",
    image: "/images/narasimha_jayanti.jpg",
    origin: `Narasimha Jayanti celebrates the divine appearance of Lord Narasimha — the fourth avatar of Lord Vishnu, who manifested as a half-man, half-lion being to protect his devotee Prahlada and uphold cosmic order. The festival falls on the 14th day (Chaturdashi) of the bright fortnight in the month of Vaishakha (April–May).

The origin of this avatar is narrated in the Bhagavata Purana and the Vishnu Purana. The demon king Hiranyakashipu, after years of severe austerities, obtained a boon from Brahma that he could not be killed by man or beast, neither during day nor night, neither inside nor outside, neither on the ground nor in the sky, by no weapon created by Brahma. Intoxicated by this boon, he declared himself God and persecuted his own son Prahlada for his devotion to Vishnu.

At the moment of greatest crisis — as Hiranyakashipu raised his sword against Prahlada at dusk (neither day nor night) — Lord Vishnu burst forth from a pillar (neither inside nor outside) in the form of Narasimha: a being that was neither fully man nor beast. He placed Hiranyakashipu on his lap (neither earth nor sky) and tore the demon apart with his lion claws (no conventional weapon). Every condition of the boon was satisfied, and dharma was restored.

Sri Lakshminarasimhaswami Matth holds a special connection to Lord Narasimha, as the presiding deity of the Matth is the divine form of Sri Lakshmi Narasimha — the compassionate aspect of Narasimha with Lakshmi seated on his lap.`,
    fullDescription: `Narasimha Jayanti Mahotsava at the Sri Lakshminarasimhaswami Matth is the most important annual celebration of the year — a grand 16-hour festival that begins before sunrise with the Brahmotsava and continues through the day with rituals, fire ceremonies, cultural programs, and community feasting.

The presiding deity, Sri Lakshmi Narasimha, is given a special abhisheka (ritual bathing) with 21 sacred substances including Panchamrita (five nectars), coconut water, sugarcane juice, turmeric water, and precious saffron milk. The deity is then adorned with new silk garments, gold ornaments, and a cascading garland of 1,008 lotus flowers.

The Sudarsana Homa — a fire ceremony dedicated to the divine discus of Lord Vishnu — is performed by a team of 21 ritviks (ritual specialists) and burns for over four hours, with devotees offering sacred ghee and herbs into the consecrated fire. The Homa is believed to remove obstacles, destroy negative forces, and bring prosperity and protection to all participants.`,
    highlights: [
      "Suprabhatam at 5:00 AM — awakening of the deity with Vedic hymns",
      "21-substance Maha Abhishekam with saffron milk and lotus water",
      "1008-Lotus Pushparchana (flower offering ceremony)",
      "Sudarsana Homa — 4-hour sacred fire ceremony with 21 priests",
      "Rathotsava — divine procession of the deity on a silver chariot",
      "Classical Harikatha narration of the Narasimha story",
      "Grand Annadanam feeding 10,000+ devotees",
      "Evening Maha Arati with 1008 diyas",
    ],
    schedule: [
      { time: "5:00 AM", activity: "Brahmotsavam begins — Suprabhatam & Thiruvanandal" },
      { time: "6:00 AM", activity: "Maha Abhishekam with 21 sacred substances" },
      { time: "8:00 AM", activity: "Alankara (decoration) & Neivedhyam (offering)" },
      { time: "9:00 AM", activity: "Sudarsana Homa begins" },
      { time: "11:00 AM", activity: "1008-Pushparchana ceremony" },
      { time: "12:00 PM", activity: "Madhyahna Arati & Annadanam begins" },
      { time: "2:00 PM", activity: "Harikatha — storytelling of Narasimha avatar" },
      { time: "4:00 PM", activity: "Rathotsava — silver chariot procession" },
      { time: "6:00 PM", activity: "Sandhya Arati" },
      { time: "7:00 PM", activity: "Bhajan Sandhya — devotional music" },
      { time: "9:00 PM", activity: "Ekanta Seva — final night puja & prasadam" },
    ],
    whatToBring: [
      "Yellow or golden attire (auspicious for Narasimha worship)",
      "Tulasi mala or personal prayer beads",
      "Offering flowers if desired (lotus preferred)",
    ],
    dresscode: "Traditional Indian attire. Yellow, orange, or golden colours are especially auspicious. Silk preferred for the morning Abhishekam.",
    registrationFee: "Free entry. Annadanam is complimentary for all. Special Homa participation: ₹501 (includes prasadam packet and Homa vibhuti).",
    contactEmail: "events@srilns.org",
    contactPhone: "+91-816-221-XXXX",
  },

  {
    slug: "gita-discourse-modern-life",
    title: "Spiritual Discourse: The Gita in Modern Life",
    date: "April 15, 2027",
    time: "10:00 AM – 1:00 PM",
    location: "Sri Lakshminarasimhaswami Matth Auditorium, Tumkur",
    type: "Discourse",
    shortDescription:
      "A special lecture series by Swami Vidyadharananda on applying the timeless wisdom of the Bhagavad Gita to contemporary challenges.",
    image: "/images/gita_discourse.jpg",
    origin: `The Bhagavad Gita — often called simply "The Gita" — is a 700-verse Sanskrit scripture that forms part of the Mahabharata epic. It records the divine dialogue between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra, approximately 5,000 years ago. When Arjuna was overcome with grief and moral confusion at the prospect of fighting his own kin, Krishna revealed to him the eternal truths of dharma, karma, jnana (knowledge), bhakti (devotion), and moksha (liberation).

The Gita was first composed and preserved in the oral tradition by the sage Vyasa, who later inscribed it as part of the Mahabharata. Its 18 chapters cover the full spectrum of Hindu philosophical thought, drawing from Samkhya philosophy, Yoga systems, Vedanta, and Bhakti traditions. It has been called "the gospel of humanity" — a text that transcends religion, caste, and era.

From Adi Shankaracharya to Ramanujacharya, from Swami Vivekananda to Mahatma Gandhi, every great Indian thinker and reformer has drawn wisdom from the Gita. It has also profoundly influenced Western thinkers: Thoreau, Emerson, and Einstein all referenced it as a source of deep inspiration.

The Gita's central message — "Do your duty without attachment to results" (Nishkama Karma) — is as relevant today in the age of stress, ambition, and anxiety as it was on the Kurukshetra battlefield. This discourse series explores that timeless relevance.`,
    fullDescription: `This special three-hour discourse session is led by Swami Vidyadharananda, a scholar-monk trained in Vedanta and Sanskrit, who has spent over two decades making the Gita accessible to modern audiences. With an informal, conversational style and real-world examples, Swami ji bridges the ancient and the contemporary with rare clarity and warmth.

The session is structured in three modules: the first hour introduces the historical and philosophical context of the Gita; the second hour explores three key teachings and their direct application to modern-day challenges such as workplace stress, relationship conflicts, and existential anxiety; the third hour is an open Q&A session where attendees can ask any question about the Gita or spiritual life.

The discourse is conducted in Kannada with English translation available. Prior knowledge of Sanskrit or Hindu philosophy is not required — all are welcome, from first-time seekers to seasoned practitioners.`,
    highlights: [
      "3-hour discourse by Swami Vidyadharananda",
      "Kannada with simultaneous English translation",
      "Focus on practical application — stress, relationships, purpose",
      "Open Q&A with the Swami",
      "Distribution of Gita copies (free for first-time attendees)",
      "Guided 15-minute meditation session",
      "Blessed prasadam and refreshments",
    ],
    schedule: [
      { time: "9:30 AM", activity: "Registration & welcome tea" },
      { time: "10:00 AM", activity: "Module 1: Kurukshetra to the modern boardroom — Gita in context" },
      { time: "11:00 AM", activity: "Module 2: Three teachings for today — Nishkama Karma, Viveka, Saranagati" },
      { time: "11:45 AM", activity: "Guided meditation — 'Witness Consciousness' practice" },
      { time: "12:00 PM", activity: "Module 3: Open Q&A with Swami Vidyadharananda" },
      { time: "12:45 PM", activity: "Distribution of Gita copies & books" },
      { time: "1:00 PM", activity: "Prasadam & refreshments" },
    ],
    whatToBring: [
      "Notebook and pen for notes",
      "Your own copy of the Bhagavad Gita if you have one",
      "Any specific questions or difficulties you face — Swami ji welcomes them",
    ],
    dresscode: "Comfortable, modest attire. Shoes will be removed at the entrance.",
    registrationFee: "Free. Donations to the Matth's Vidyadaan fund are welcome but not mandatory.",
    contactEmail: "events@srilns.org",
    contactPhone: "+91-816-221-XXXX",
  },

  {
    slug: "annual-vidyadaan-distribution",
    title: "Annual Vidyadaan Distribution",
    date: "January 26, 2027",
    time: "9:00 AM – 2:00 PM",
    location: "Matth Grounds, Tumkur, Karnataka",
    type: "Community Seva",
    shortDescription:
      "Distribution of educational materials and scholarships supporting Vedic education for underprivileged children.",
    image: "/images/vidyadaan_distribution.jpg",
    origin: `Vidyadaan — the gift of knowledge — is considered in the Hindu tradition to be the highest form of charity, superior even to Annadanam (gift of food) or Vastradaan (gift of clothing). The ancient Sanskrit saying "विद्यादानं परं दानम्" (Vidyadanam Param Danam) — "The gift of knowledge is the greatest gift" — forms the philosophical foundation of this initiative.

This principle is rooted in the teachings of the Upanishads and the Dharmashastra texts, which recognize that food satisfies hunger for a day, but education liberates a person for life. The gurukula system of ancient India — where students lived and learned with their guru free of charge, supported entirely by community donations — embodied this ideal for thousands of years.

Sri Lakshminarasimhaswami Matth revived this tradition in 1978 when the then-Peethadhipati (head of the Matth) observed that many talented children in the villages surrounding Tumkur were dropping out of school due to poverty. The Matth began providing free school supplies, textbooks, and eventually full scholarships — a tradition that has grown into the Annual Vidyadaan Mahotsava.

Republic Day (January 26) was chosen for this celebration as it symbolizes the constitutional guarantee of education for all Indians — aligning the ancient spiritual principle of Vidyadaan with the modern democratic ideal of universal education.`,
    fullDescription: `The Annual Vidyadaan Distribution is now in its 49th year, and has supported over 12,000 students across 47 villages in the Tumkur district since its founding. Each year on Republic Day, the Matth grounds are transformed into a celebration of learning, with cultural performances by the beneficiary students, a prize distribution ceremony, and a heartfelt gathering of families, teachers, and community leaders.

This year's event will distribute school kits to 800 students from Class 1 to Class 10, provide merit-based scholarships to 25 outstanding students pursuing higher education, and award special recognition to 10 students completing their Vedic education (Vedadhyayana). A new batch of 15 students will also be enrolled in the Matth's residential Vedic school, where they will receive free food, accommodation, and a traditional gurukula-style education.

The Chief Guest this year is the District Education Officer of Tumkur, and the event will be graced by senior acharyas from the Matth's affiliate institutions.`,
    highlights: [
      "Distribution of 800 school kits (books, stationery, bags, uniforms)",
      "Merit scholarships awarded to 25 higher-education students",
      "Felicitation of 10 Vedic education graduates",
      "Enrollment ceremony for 15 new gurukula students",
      "Cultural performances by beneficiary children",
      "Republic Day flag hoisting ceremony",
      "Grand Annadanam for all attendees",
      "Exhibition of student art and Vedic learning",
    ],
    schedule: [
      { time: "9:00 AM", activity: "Republic Day flag hoisting & National Anthem" },
      { time: "9:15 AM", activity: "Welcome address & introduction of guests" },
      { time: "9:30 AM", activity: "Cultural programme by beneficiary students" },
      { time: "10:30 AM", activity: "School kit distribution (Classes 1–5)" },
      { time: "11:00 AM", activity: "School kit distribution (Classes 6–10)" },
      { time: "11:30 AM", activity: "Scholarship award ceremony — higher education" },
      { time: "12:00 PM", activity: "Vedic education graduation felicitation" },
      { time: "12:30 PM", activity: "New gurukula student enrollment ceremony" },
      { time: "1:00 PM", activity: "Chief Guest address & vote of thanks" },
      { time: "1:30 PM", activity: "Grand Annadanam for all participants" },
    ],
    whatToBring: [
      "Valid ID proof (for scholarship registration)",
      "School enrollment certificates (for new applicants)",
      "Nothing else required — all materials provided",
    ],
    dresscode: "Smart casual or traditional Indian attire. White/saffron attire welcome.",
    registrationFee: "Free for all attendees. Donations to the Vidyadaan fund: any amount is gratefully received and 80G tax-exemption eligible.",
    contactEmail: "vidyadaan@srilns.org",
    contactPhone: "+91-816-221-XXXX",
  },
];

export function getEventBySlug(slug: string): EventData | undefined {
  return EVENTS.find((e) => e.slug === slug);
}
