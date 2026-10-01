import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Returns & Exchanges | Bakti Seva",
};

export default function ReturnsPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Returns & Exchanges</span>
        </nav>
        
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-8">Returns & Exchanges</h1>
        
        <div className="prose prose-stone prose-headings:font-heading prose-headings:text-charcoal max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-near-black/5">
          <p className="lead text-lg text-near-black/70 font-light mb-8">
            Your satisfaction and spiritual peace are our priority. We offer a transparent returns process.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">7-Day Return Policy</h2>
          <p className="text-near-black/70 font-light mb-4">
            If you are not completely satisfied with your purchase, you can return most items within 7 days of delivery for a full refund or exchange. Items must be unused, in their original packaging, and in the same condition that you received them.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Non-Returnable Items</h2>
          <p className="text-near-black/70 font-light mb-4">
            For hygiene and spiritual purity reasons, certain items such as opened incense, customized idols, and perishable offerings (like prasadam) cannot be returned.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">How to Initiate a Return</h2>
          <p className="text-near-black/70 font-light mb-4">
            Please contact our customer support team at support@baktiseva.com with your order number. We will guide you through the process and arrange a pickup if applicable.
          </p>
        </div>
      </div>
    </div>
  );
}
