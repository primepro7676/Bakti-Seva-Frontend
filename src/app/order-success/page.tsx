"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const paymentId = params.get("payment_id");

  return (
    <div className="min-h-screen bg-sand/10 pt-28 pb-20 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-lg mx-auto px-4">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="font-heading text-4xl font-bold text-charcoal">Order Confirmed! 🙏</h1>
        <p className="text-near-black/70 font-light leading-relaxed">
          Thank you for your purchase. Your sacred items are being prepared with love and care. You will receive a confirmation email shortly.
        </p>
        {paymentId && (
          <div className="bg-white rounded-xl border border-near-black/10 px-6 py-4 text-sm">
            <span className="text-near-black/50">Payment ID: </span>
            <span className="font-mono font-semibold text-charcoal">{paymentId}</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-8 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-charcoal hover:text-ivory transition-colors rounded-xl"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-ivory px-8 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-accent transition-colors rounded-xl"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand/10 pt-28 flex items-center justify-center"><div className="text-charcoal">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
