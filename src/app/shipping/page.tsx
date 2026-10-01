import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Shipping Information | Bakti Seva",
};

export default function ShippingPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Shipping Info</span>
        </nav>
        
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-8">Shipping Information</h1>
        
        <div className="prose prose-stone prose-headings:font-heading prose-headings:text-charcoal max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-near-black/5">
          <p className="lead text-lg text-near-black/70 font-light mb-8">
            We are committed to delivering your sacred items with the utmost care and respect. Please review our shipping policies below.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Domestic Shipping (India)</h2>
          <p className="text-near-black/70 font-light mb-4">
            We offer standard and express shipping across India. Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. Orders over ₹2000 qualify for free standard shipping.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">International Shipping</h2>
          <p className="text-near-black/70 font-light mb-4">
            We ship to select international destinations. Shipping costs and delivery times vary by location. Please contact our support team if your country is not listed at checkout.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Order Tracking</h2>
          <p className="text-near-black/70 font-light mb-4">
            Once your order is dispatched, you will receive a tracking link via email and SMS. You can track the progress of your delivery directly through our logistics partner's portal.
          </p>
        </div>
      </div>
    </div>
  );
}
