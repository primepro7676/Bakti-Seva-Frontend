import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Refund Policy | Bakti Seva",
};

export default function RefundsPage() {
  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-near-black">Refund Policy</span>
        </nav>
        
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal font-bold mb-8">Refund Policy</h1>
        
        <div className="prose prose-stone prose-headings:font-heading prose-headings:text-charcoal max-w-none bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-near-black/5">
          <p className="lead text-lg text-near-black/70 font-light mb-8">
            Please read our refund policy carefully.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Refund Eligibility</h2>
          <p className="text-near-black/70 font-light mb-4">
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Processing Times</h2>
          <p className="text-near-black/70 font-light mb-4">
            If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within 5-7 business days.
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">Late or Missing Refunds</h2>
          <p className="text-near-black/70 font-light mb-4">
            If you haven't received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted.
          </p>
        </div>
      </div>
    </div>
  );
}
