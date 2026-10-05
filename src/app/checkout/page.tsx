"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cart";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      router.push("/shop");
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totalAmount = cartTotal();
      const res = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerDetails: formData,
          amount: totalAmount,
        }),
      });

      const orderData = await res.json();

      if (!orderData || orderData.error) {
        throw new Error(orderData.error || "Failed to initialize payment");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummy_key", 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Bakti Seva",
        description: "Secure Payment for Divine Items",
        image: "/images/srilns_logo.png?v=3",
        order_id: orderData.id,
        handler: async function (response: any) {
          clearCart();
          router.push(`/checkout/success?payment_id=${response.razorpay_payment_id}`);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#4A001F", // Deep Burgundy
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="bg-sand/10 min-h-screen pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-12 text-center uppercase tracking-widest">Secure Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Form Section */}
            <div className="lg:col-span-7">
              <div>
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-8 border-b border-near-black/10 pb-4">1. Shipping Details</h2>
                <form id="checkout-form" onSubmit={handlePayment} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">Full Name *</label>
                      <input 
                        id="name" name="name" required
                        type="text" 
                        className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                        value={formData.name} onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">Email Address *</label>
                      <input 
                        id="email" name="email" required
                        type="email" 
                        className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                        value={formData.email} onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">Phone Number *</label>
                    <input 
                      id="phone" name="phone" required
                      type="tel" 
                      className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                      value={formData.phone} onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">Complete Address *</label>
                    <input 
                      id="address" name="address" required
                      type="text" 
                      className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                      value={formData.address} onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="city" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">City *</label>
                      <input 
                        id="city" name="city" required
                        type="text" 
                        className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                        value={formData.city} onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">State *</label>
                      <input 
                        id="state" name="state" required
                        type="text" 
                        className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                        value={formData.state} onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-xs font-semibold tracking-widest uppercase text-near-black/60 mb-2">PIN Code *</label>
                      <input 
                        id="pincode" name="pincode" required
                        type="text" 
                        className="w-full bg-transparent border-b border-near-black/20 pb-2 text-charcoal focus:outline-none focus:border-accent transition-colors"
                        value={formData.pincode} onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-5">
              <div className="bg-white p-8 border border-near-black/10 sticky top-28">
                <h2 className="font-heading text-xl font-bold text-charcoal mb-6 uppercase tracking-widest">Order Summary</h2>
                
                <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-sand/50 overflow-hidden shrink-0 relative">
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1 text-sm">
                        <div>
                          <p className="font-semibold text-charcoal line-clamp-2 leading-snug mb-1">{item.name}</p>
                          <p className="text-near-black/50 text-xs">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-charcoal">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-near-black/10 pt-6 space-y-4 mb-8 text-sm font-medium">
                  <div className="flex justify-between text-near-black/70">
                    <span>Subtotal</span>
                    <span className="text-charcoal">{formatCurrency(cartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-near-black/70">
                    <span>Shipping</span>
                    <span className="text-accent">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-base mt-4 pt-4 border-t border-near-black/10">
                    <span className="font-bold text-charcoal uppercase tracking-widest">Total</span>
                    <span className="font-bold text-2xl text-charcoal">{formatCurrency(cartTotal())}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={loading}
                  className="w-full bg-near-black hover:bg-accent text-ivory h-14 text-sm font-semibold tracking-widest uppercase transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : `Pay ${formatCurrency(cartTotal())}`}
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-near-black/50 font-light">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>256-bit Secure Payment Processing via Razorpay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
