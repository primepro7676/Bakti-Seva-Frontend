"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <>
      {paymentId && (
        <p className="text-sm bg-muted px-4 py-2 rounded-lg font-mono text-muted-foreground mb-8">
          Payment ID: {paymentId}
        </p>
      )}
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
        <div className="absolute inset-0 rounded-full border-4 border-green-500/20 animate-ping"></div>
      </div>
      
      <h1 className="font-heading text-4xl font-bold mb-4 text-center">Order Confirmed!</h1>
      <p className="text-xl text-muted-foreground mb-2 text-center">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      
      <Suspense fallback={<div className="h-10 mb-8" />}>
        <SuccessContent />
      </Suspense>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Link href="/shop">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <Link href="/account">
          <Button size="lg" variant="outline" className="min-w-[200px]">
            View Orders
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
