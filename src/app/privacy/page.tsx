import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Bakti Seva",
};

export default function PrivacyPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Privacy Policy</span>
        </nav>
        
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-stone prose-headings:font-heading prose-headings:text-charcoal max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-near-black/5">
          <p className="text-near-black/70 font-light mb-8">
            Last updated: September 2026
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Information We Collect</h2>
          <p className="text-near-black/70 font-light mb-4">
            We collect information you provide directly to us, such as when you create an account, place an order, or subscribe to our newsletter. This includes your name, email address, shipping address, and payment information.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">How We Use Your Information</h2>
          <p className="text-near-black/70 font-light mb-4">
            We use the information we collect to fulfill your orders, communicate with you about your purchases, and send you relevant spiritual insights and product updates if you have opted in.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Data Security</h2>
          <p className="text-near-black/70 font-light mb-4">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>
        </div>
      </div>
    </div>
  );
}
