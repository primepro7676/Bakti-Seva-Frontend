import { fetchProducts } from "@/lib/backend-api";
import { SectionHeader } from "@/components/ui/section-header";
import { TrustBar } from "@/components/layout/TrustBar";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await searchParams;
  const activeTab = resolvedParams?.tab || "new";

  let featuredProducts: Awaited<ReturnType<typeof fetchProducts>> = [];
  try {
    featuredProducts = await fetchProducts({ tab: activeTab, take: 4 });
  } catch (error) {
    console.warn("Could not fetch featured products from backend:", error);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── 1. Cinematic Hero ── */}
      <section className="relative h-[88vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(78,24,36,0.88)] via-[rgba(78,24,36,0.5)] to-[rgba(78,24,36,0.1)] z-10 pointer-events-none" />
        <HeroCarousel />

        <div className="relative z-20 container mx-auto px-4 lg:px-8 flex flex-col items-start text-left mt-16 w-full max-w-[1440px]">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase mb-6 text-champagne">
            Bhakti • Tradition • Devotion
          </span>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 drop-shadow-lg max-w-4xl text-ivory">
            Sacred Traditions,<br />Beautifully Curated.
          </h1>
          <p className="text-base md:text-xl max-w-xl font-light mb-10 text-ivory/85 leading-relaxed drop-shadow-md">
            Thoughtfully curated spiritual essentials, sacred offerings, and traditions that bring devotion into everyday life.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/shop">
              <Button size="lg" className="bg-gold text-cocoa hover:bg-champagne font-bold text-xs md:text-sm tracking-widest px-10 py-6 rounded-none shadow-lg transition-all hover:-translate-y-1 uppercase">
                Shop Collection
              </Button>
            </Link>
            <Link href="/seva">
              <Button size="lg" variant="outline" className="border-ivory/60 text-ivory hover:bg-ivory hover:text-cocoa font-semibold text-xs md:text-sm tracking-widest px-10 py-6 rounded-none bg-transparent shadow-lg backdrop-blur-sm transition-all hover:-translate-y-1 uppercase">
                Book a Seva
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. Brand Introduction ── */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="order-2 lg:order-1 flex flex-col items-start">
              <span className="text-xs font-bold tracking-[0.25em] text-burgundy uppercase mb-6">
                Our Story
              </span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-cocoa mb-8 leading-tight">
                Rooted in devotion.<br />Created for meaningful living.
              </h2>
              <div className="space-y-5 text-cocoa/75 text-lg font-light leading-relaxed mb-10">
                <p>
                  At Bakti Seva, our journey began with a simple profound vision: to bridge the gap between ancient spiritual traditions and modern devotees.
                </p>
                <p>
                  Every piece in our collection, every seva we facilitate, is thoughtfully selected to honor craftsmanship, authenticity, and lasting value.
                </p>
              </div>
              <Link href="/about" className="group inline-flex items-center gap-2 text-burgundy font-semibold tracking-widest uppercase text-xs border-b border-burgundy/30 pb-1 hover:border-burgundy transition-colors">
                Discover Our Story
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none">
              <Image
                src="/images/c61b827d-c793-41af-9391-20d3751c5527.png"
                alt="Traditional Indian temple architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold -z-10 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Shop by Collection ── */}
      <section className="py-24 md:py-32 bg-cream border-y border-sand">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title="Explore Sacred Collections"
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-[1440px] mx-auto">
            <Link href="/shop?category=puja-essentials" className="md:col-span-8 group relative h-[400px] md:h-[580px] overflow-hidden bg-cocoa">
              <Image
                src="/images/f83160f2-e296-429f-b981-6ad98ac5b923.png"
                alt="Premium Puja Essentials Collection"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/90 via-wine/20 to-transparent" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
                <h3 className="text-ivory font-heading text-3xl md:text-5xl font-bold mb-3 drop-shadow-md">Puja Essentials</h3>
                <span className="text-ivory/90 text-sm uppercase tracking-widest font-semibold flex items-center gap-2 group-hover:text-champagne transition-colors">
                  Shop Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
              <Link href="/shop?category=divine-idols" className="group relative h-[192px] md:flex-1 overflow-hidden bg-cocoa">
                <Image
                  src="/images/003fe7c4-81e7-480d-9df1-e7656dbb0eed.png"
                  alt="Premium Idols and Murtis"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/90 to-transparent" />
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-ivory font-heading text-2xl font-bold mb-2 drop-shadow-md">Idols & Murtis</h3>
                  <span className="text-ivory/90 text-xs uppercase tracking-widest font-semibold flex items-center gap-1 group-hover:text-champagne transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>

              <Link href="/shop?category=rudraksha" className="group relative h-[192px] md:flex-1 overflow-hidden bg-cocoa">
                <Image
                  src="/images/563a6eef-a6d2-4ae0-9b18-6ef036ef0f3f.png"
                  alt="Authentic Rudraksha and Mala Collection"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine/90 to-transparent" />
                <div className="absolute bottom-6 left-6 z-10">
                  <h3 className="text-ivory font-heading text-2xl font-bold mb-2 drop-shadow-md">Rudraksha & Mala</h3>
                  <span className="text-ivory/90 text-xs uppercase tracking-widest font-semibold flex items-center gap-1 group-hover:text-champagne transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Featured Products ── */}
      <section className="py-24 md:py-32 bg-ivory" id="featured">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <SectionHeader
            title="Devotion, Thoughtfully Curated"
            description="Discover customer favourites selected for quality, craftsmanship, and meaning."
            align="center"
            className="mb-12"
          />

          <div className="flex items-center justify-center gap-6 md:gap-10 mb-12 overflow-x-auto pb-4 hide-scrollbar">
            {[
              { label: "New Arrivals", tab: "new" },
              { label: "Best Sellers", tab: "best-sellers" },
              { label: "Sacred Essentials", tab: "sacred" },
              { label: "Festive Picks", tab: "festive" },
            ].map(({ label, tab }) => (
              <Link
                key={tab}
                href={`/?tab=${tab}#featured`}
                className={`text-xs tracking-widest uppercase whitespace-nowrap pb-2 transition-colors ${
                  activeTab === tab
                    ? "font-bold text-burgundy border-b-2 border-burgundy"
                    : "font-medium text-cocoa/50 hover:text-cocoa"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop">
              <Button variant="outline" className="border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-ivory px-10 py-6 rounded-none uppercase tracking-widest text-xs font-bold transition-all">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. Full-Width Campaign Banner ── */}
      <section className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-cocoa">
        <div className="absolute inset-0 bg-gradient-to-r from-wine/95 via-burgundy/70 to-wine/40 z-10" />
        <Image
          src="/images/aa4649e7-5d6f-4350-962b-f65710c44586.png"
          alt="Experience Bakti Seva"
          fill
          sizes="100vw"
          className="object-cover z-0 opacity-60"
        />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <span className="text-champagne text-xs font-bold tracking-[0.3em] uppercase mb-5 block">
            Sacred Gifting • Festival Collections
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-ivory mb-6 drop-shadow-md leading-tight">
            Give the Gift of<br />Sacred Devotion
          </h2>
          <p className="text-lg md:text-xl text-ivory/85 font-light mb-10 drop-shadow-sm leading-relaxed max-w-xl mx-auto">
            From sacred rituals to thoughtful gifting — every collection is selected to make devotion more meaningful.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/shop/gifts">
              <Button className="bg-gold text-cocoa hover:bg-champagne px-8 py-6 text-xs uppercase font-bold tracking-widest rounded-none shadow-xl transition-all hover:-translate-y-1">
                Explore Gift Sets
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-ivory/60 text-ivory hover:bg-ivory hover:text-cocoa px-8 py-6 text-xs uppercase font-bold tracking-widest rounded-none bg-transparent transition-all hover:-translate-y-1">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. Seva Programs ── */}
      <section className="py-24 md:py-32 bg-cream border-b border-sand">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <SectionHeader
            label="Community Action"
            title="Seva That Creates Meaning"
            align="left"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Annadanam Support", slug: "annadanam-support", img: "/images/pooja_thali_set_1790594617235.jpg", desc: "Providing sacred food offerings to devotees and the underprivileged." },
              { title: "Temple Restoration", slug: "temple-restoration", img: "/images/temple_aarti_ceremony_1790597350613.jpg", desc: "Preserving architectural heritage and sacred spaces for future generations." },
              { title: "Vidyadaan Initiative", slug: "vidyadaan-initiative", img: "/images/spiritual_book_1790594667780.jpg", desc: "Supporting Vedic education and preserving ancient scriptural knowledge." }
            ].map((seva, i) => (
              <div key={i} className="group cursor-pointer">
                <Link href={`/seva/${seva.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-cocoa">
                    <Image src={seva.img} alt={seva.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-wine/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
                <h3 className="font-heading text-2xl font-bold text-cocoa mb-3 group-hover:text-burgundy transition-colors">{seva.title}</h3>
                <p className="text-cocoa/65 text-sm font-light mb-5 leading-relaxed">{seva.desc}</p>
                <div className="flex items-center gap-6">
                  <Link href={`/seva/${seva.slug}`}>
                    <span className="text-burgundy text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:text-gold transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href={`/seva/${seva.slug}#donate`}>
                    <span className="text-cocoa/60 text-xs font-bold uppercase tracking-widest hover:text-burgundy transition-colors">
                      Contribute
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Events & Festivals ── */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="flex items-end justify-between mb-16">
            <SectionHeader
              label="Upcoming"
              title="Sacred Events & Festivals"
              align="left"
            />
            <Link href="/events" className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-burgundy hover:text-gold transition-colors">
              View All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Narasimha Jayanti Mahotsava", date: "May 2025", img: "/images/sacred_homa_fire_1790597364613.jpg", type: "Annual Utsava" },
              { title: "Maha Shivaratri Abhisheka", date: "Mar 2025", img: "/images/temple_aarti_ceremony_1790597350613.jpg", type: "Sacred Homa" },
              { title: "Annual Vidyadaan Distribution", date: "Jan 2025", img: "/images/spiritual_book_1790594667780.jpg", type: "Community Seva" },
            ].map((event, i) => (
              <Link key={i} href="/events" className="group block">
                <div className="relative aspect-[3/2] overflow-hidden mb-5 bg-cocoa">
                  <Image src={event.img} alt={event.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine/80 to-transparent" />
                  <span className="absolute top-4 left-4 bg-burgundy text-ivory text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                    {event.type}
                  </span>
                  <span className="absolute bottom-4 left-4 text-champagne text-xs font-bold uppercase tracking-widest">
                    {event.date}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-cocoa group-hover:text-burgundy transition-colors leading-tight">
                  {event.title}
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link href="/events">
              <Button variant="outline" className="border-burgundy/30 text-burgundy hover:bg-burgundy hover:text-ivory px-8 py-5 rounded-none uppercase tracking-widest text-xs font-bold">
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. Why Bakti Seva (Values) ── */}
      <section className="py-24 md:py-28 bg-wine text-ivory">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1200px]">
          <div className="text-center mb-16">
            <span className="text-champagne text-xs font-bold tracking-[0.25em] uppercase mb-4 block">Our Promise</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-ivory">Why Bakti Seva</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {[
              { num: "01", title: "Authentically Selected", desc: "Every product is thoughtfully curated for quality and cultural authenticity." },
              { num: "02", title: "Meaningful Craftsmanship", desc: "We celebrate artisanship and timeless traditions in every piece." },
              { num: "03", title: "Premium Experience", desc: "From browsing to delivery, every interaction feels refined and intentional." },
              { num: "04", title: "Trusted Seva", desc: "Secure checkout, transparent policies, and responsive spiritual guidance." }
            ].map((item) => (
              <div key={item.num} className="flex flex-col border-t border-ivory/15 pt-8">
                <span className="font-heading text-5xl font-bold text-champagne/30 mb-5">{item.num}</span>
                <h3 className="font-heading text-xl font-bold text-ivory mb-3">{item.title}</h3>
                <p className="text-ivory/65 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Journal / Blog ── */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
          <div className="flex items-end justify-between mb-16">
            <SectionHeader
              label="Our Journal"
              title="Sacred Stories & Wisdom"
              align="left"
            />
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-burgundy hover:text-gold transition-colors">
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Featured Article */}
            <Link href="/blog" className="md:col-span-7 group block relative aspect-[16/10] overflow-hidden bg-cocoa">
              <Image
                src="/images/meditation_nature_peace_1790597381129.jpg"
                alt="Vedic Wisdom for Modern Life"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine/95 via-wine/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="text-champagne text-[10px] font-bold uppercase tracking-widest mb-3 block">Vedic Wisdom</span>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-ivory leading-tight group-hover:text-champagne transition-colors">
                  The Science of Daily Rituals: Why Puja Transforms Your Morning
                </h3>
              </div>
            </Link>

            {/* Side Articles */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {[
                { title: "Choosing the Right Rudraksha: A Complete Guide", img: "/images/rudraksha_mala_1790594628771.jpg", tag: "Spiritual Guide" },
                { title: "How to Set Up a Sacred Home Mandir", img: "/images/ganesha_idol_1790594652426.jpg", tag: "Home & Temple" },
                { title: "Understanding the Significance of Homa & Havans", img: "/images/sacred_homa_fire_1790597364613.jpg", tag: "Rituals" },
              ].map((article, i) => (
                <Link key={i} href="/blog" className="group flex gap-4 items-start">
                  <div className="relative w-24 h-20 shrink-0 overflow-hidden bg-sand">
                    <Image src={article.img} alt={article.title} fill sizes="100px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-burgundy mb-1 block">{article.tag}</span>
                    <h4 className="font-heading text-base font-bold text-cocoa group-hover:text-burgundy transition-colors leading-snug">
                      {article.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Trust Bar ── */}
      <TrustBar />
    </div>
  );
}
