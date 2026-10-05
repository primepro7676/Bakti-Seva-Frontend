"use client";

import { useCartStore } from "@/lib/store/cart";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, cartTotal } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartTotal();
  const shipping = total >= 999 ? 0 : 99;
  const grandTotal = total + shipping;

  async function handleCheckout() {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      // Load Razorpay script dynamically
      await new Promise<void>((resolve, reject) => {
        if (window.Razorpay) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Razorpay"));
        document.body.appendChild(script);
      });

      // Create order on server
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal * 100, // convert to paise
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const order = await res.json();
      if (!order.id) throw new Error(order.error || "Order creation failed");

      // Open Razorpay modal
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Bakti Seva",
        description: `Payment for ${items.length} item(s)`,
        order_id: order.id,
        image: "/images/srilns_logo.png?v=3",
        theme: { color: "#C9913D" },
        handler: async function (response: any) {
          // Verify payment signature
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            clearCart();
            window.location.href = `/order-success?payment_id=${response.razorpay_payment_id}`;
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      });
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong: " + err.message);
      setIsProcessing(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sand/10 pt-28 pb-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-near-black/5 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10 text-near-black/30" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-3xl font-bold text-charcoal">Your cart is empty</h1>
          <p className="text-near-black/60">Explore our sacred collection and add items to your cart.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary text-ivory px-8 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-accent transition-colors"
          >
            Browse Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/10 pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-10">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 bg-white rounded-2xl p-5 border border-near-black/5 shadow-sm"
              >
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl bg-sand/30">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-charcoal text-base leading-snug">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-near-black/30 hover:text-red-500 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-near-black/15 rounded-xl overflow-hidden">
                      <button
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                        className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-sand/50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-sand/50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-charcoal">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-near-black/5 shadow-sm p-6 sticky top-28 space-y-5">
              <h2 className="font-heading text-xl font-bold text-charcoal border-b border-near-black/10 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-near-black/70">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-semibold text-charcoal">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-charcoal"}`}>
                    {shipping === 0 ? "FREE" : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-near-black/50 bg-sand/30 px-3 py-2 rounded-lg">
                    Add {formatCurrency(999 - total)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-near-black/10 pt-4 flex justify-between items-center">
                <span className="font-heading text-lg font-bold text-charcoal">Total</span>
                <span className="font-heading text-2xl font-bold text-primary">{formatCurrency(grandTotal)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary to-accent text-ivory font-bold py-4 rounded-xl tracking-widest uppercase text-sm hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Pay with Razorpay</>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-near-black/40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secured by Razorpay · UPI · Cards · NetBanking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
