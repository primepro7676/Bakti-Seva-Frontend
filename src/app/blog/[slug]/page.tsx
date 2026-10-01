import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spiritual Blog Post",
  description: "Read insightful articles on Vedic traditions, puja rituals, spiritual journeys, and wisdom for daily living.",
};

const posts = [
  {
    title: "The Significance of Daily Deepam",
    excerpt: "Lighting a lamp is a timeless tradition in our culture. Discover the spiritual and scientific benefits of lighting a deepam every day in your home.",
    content: `Lighting a lamp is a timeless tradition in our culture. Discover the spiritual and scientific benefits of lighting a deepam every day in your home.
    
The act of lighting a diya (lamp) is one of the most fundamental rituals in Hindu tradition. Beyond its religious significance, it holds deep spiritual and scientific meaning. The flame always burns upwards, inspiring us to aim higher and move from darkness (ignorance) to light (knowledge).

The oil in the diya represents human desires, and the cotton wick represents the ego. When lit by spiritual knowledge (the flame), the desires get exhausted and the ego perishes, freeing the soul. Furthermore, the illumination of the lamp purifies the environment and brings positive energy to the space.`,
    author: "Swami Vidyadharananda",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    image: "/images/5ee0b7c7-778f-4c7c-aef8-29f11ff58d18.png",
    slug: "significance-of-daily-deepam",
    category: "Traditions"
  },
  {
    title: "Understanding Rudraksha Mukhis",
    excerpt: "From Ek Mukhi to Panchamukhi, learn about the different types of Rudraksha beads, their ruling deities, and how to choose the right one for you.",
    content: `From Ek Mukhi to Panchamukhi, learn about the different types of Rudraksha beads, their ruling deities, and how to choose the right one for you.
    
Rudraksha beads are considered the tears of Lord Shiva, manifesting compassion for all living beings. The 'mukhi' or faces of a Rudraksha determine its specific properties and the presiding deity associated with it.

For instance, the Ek Mukhi (one face) Rudraksha is incredibly rare and represents Lord Shiva himself, bestowing higher states of consciousness. The Panchamukhi (five faces) is the most common and is safe for anyone to wear, representing Kalagni Rudra and bringing general well-being, health, and peace. Choosing the right Rudraksha depends on one's astrological chart, spiritual goals, and life challenges.`,
    author: "Dr. A. Sharma",
    date: "Oct 05, 2026",
    readTime: "8 min read",
    image: "/images/5ef07730-5c33-4e7a-9784-0e6d11b61785.png",
    slug: "understanding-rudraksha-mukhis",
    category: "Sacred Items"
  },
  {
    title: "A Guide to Temple Architecture",
    excerpt: "Explore the Vastu principles behind ancient temple construction and how the sacred geometry aligns cosmic energies to uplift the soul.",
    content: `Explore the Vastu principles behind ancient temple construction and how the sacred geometry aligns cosmic energies to uplift the soul.
    
Hindu temple architecture is not merely about constructing a place of worship; it is the physical manifestation of cosmic principles. Designed according to the sacred texts of Vastu Shastra and Shilpa Shastra, every aspect of a temple is symbolic.

The main shrine (Garbhagriha) represents the core of the universe and the human heart. The towering structure above it (Shikhara or Vimana) symbolizes Mount Meru, the cosmic mountain. The intricate carvings on the outer walls depict the journey of life, leading the devotee from the mundane outer world to the sacred inner sanctum. The entire structure is designed to harness and radiate spiritual energy, creating a transformative experience for the seeker.`,
    author: "Architect R. K. Iyer",
    date: "Sep 28, 2026",
    readTime: "10 min read",
    image: "/images/69d3b008-34ea-4b8a-8c26-c4a4b8042947.png",
    slug: "guide-to-temple-architecture",
    category: "Architecture"
  }
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-charcoal hover:text-accent transition-colors text-xs font-semibold tracking-widest uppercase mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-accent mb-4 block">{post.category}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-near-black/60">
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-near-black/30"></span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-near-black/30"></span>
            <span>{post.date}</span>
          </div>
        </div>

        <div className="aspect-[21/9] w-full overflow-hidden mb-16 bg-near-black relative rounded-xl shadow-lg">
          <Image 
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>

        <div className="prose prose-lg prose-headings:font-heading prose-headings:text-charcoal prose-p:text-near-black/80 max-w-none">
          {post.content.split('\\n\\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed font-light text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
