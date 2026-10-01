import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Bakti Seva",
};

export default function TermsPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Terms of Service</span>
        </nav>
        
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-stone prose-headings:font-heading prose-headings:text-charcoal max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-near-black/5">
          <p className="text-near-black/70 font-light mb-8">
            Last updated: September 2026
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Agreement to Terms</h2>
          <p className="text-near-black/70 font-light mb-4">
            By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Products and Services</h2>
          <p className="text-near-black/70 font-light mb-4">
            We reserve the right to limit the sales of our products or services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Modifications to the Service</h2>
          <p className="text-near-black/70 font-light mb-4">
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service without notice at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
