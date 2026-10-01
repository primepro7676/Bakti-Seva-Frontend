import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-[80vh] flex items-center overflow-hidden pt-28 pb-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FFFDF7 0%, #F8F1E5 50%, #EEE3D0 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
        <Image
          src="/images/404/bakti-seva-404.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF7] via-[#FFFDF7]/85 to-[#FFFDF7]/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="max-w-xl">
          <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#A76050]">
            PAGE NOT FOUND
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#641E2E] mt-4 mb-5 leading-tight">
            This sacred path seems to have wandered.
          </h1>
          <p className="text-[#49332D] text-base md:text-lg font-light leading-relaxed mb-10 max-w-md">
            The page or product you&apos;re looking for may have moved or is no
            longer available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#641E2E] text-[#FFFDF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#7B233A] transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#641E2E]/30 text-[#641E2E] text-xs font-bold tracking-[0.18em] uppercase hover:border-[#C69A4B] hover:text-[#C69A4B] transition-colors"
            >
              Explore Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
