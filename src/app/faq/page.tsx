import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "FAQ | Bakti Seva",
};

export default function FAQPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">FAQ</span>
        </nav>
        
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="prose prose-stone prose-headings:font-heading prose-headings:text-charcoal max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-near-black/5">
          <p className="lead text-lg text-near-black/70 font-light mb-8">
            Find answers to common questions about our products, shipping, and services.
          </p>
          
          <h2 className="text-xl font-semibold mb-2 mt-6">Are your products authentically sourced?</h2>
          <p className="text-near-black/70 font-light mb-6">
            Yes, all our idols, rudraksha, and puja essentials are sourced directly from traditional artisans and authentic origins to ensure spiritual purity.
          </p>

          <h2 className="text-xl font-semibold mb-2 mt-6">How long does shipping take?</h2>
          <p className="text-near-black/70 font-light mb-6">
            Standard domestic shipping takes 5-7 business days. We also offer express 2-3 day shipping options at checkout.
          </p>

          <h2 className="text-xl font-semibold mb-2 mt-6">Do you offer bulk discounts for temples or events?</h2>
          <p className="text-near-black/70 font-light mb-6">
            Yes, we provide special pricing for large orders intended for temples, ashrams, or major spiritual events. Please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
