"use client";

import { User, Package, Heart, LogOut, Settings, MapPin } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function AccountPage() {
  const user = {
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    joined: "Aug 2026",
  };

  const recentOrders = [
    {
      id: "ORD-9821-X",
      date: "Oct 15, 2026",
      status: "Delivered",
      total: 3450,
      items: 2,
    },
    {
      id: "ORD-7643-Y",
      date: "Sep 28, 2026",
      status: "Processing",
      total: 1200,
      items: 1,
    }
  ];

  return (
    <div className="bg-sand/10 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-charcoal mb-12">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-near-black/10 p-6">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-near-black/10">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-heading text-xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-charcoal">{user.name}</p>
                  <p className="text-xs text-near-black/50">Member since {user.joined}</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link href="/account" className="flex items-center gap-3 px-4 py-3 bg-sand/50 text-accent font-semibold text-sm transition-colors border-l-2 border-accent">
                  <User className="w-4 h-4" /> Profile
                </Link>
                <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 text-near-black/70 hover:bg-sand/30 hover:text-charcoal font-medium text-sm transition-colors border-l-2 border-transparent">
                  <Package className="w-4 h-4" /> Orders
                </Link>
                <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-3 text-near-black/70 hover:bg-sand/30 hover:text-charcoal font-medium text-sm transition-colors border-l-2 border-transparent">
                  <MapPin className="w-4 h-4" /> Addresses
                </Link>
                <Link href="/account/wishlist" className="flex items-center gap-3 px-4 py-3 text-near-black/70 hover:bg-sand/30 hover:text-charcoal font-medium text-sm transition-colors border-l-2 border-transparent">
                  <Heart className="w-4 h-4" /> Wishlist
                </Link>
                <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 text-near-black/70 hover:bg-sand/30 hover:text-charcoal font-medium text-sm transition-colors border-l-2 border-transparent">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium text-sm transition-colors border-l-2 border-transparent mt-4">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-10">
            
            {/* Account Details */}
            <div className="bg-white border border-near-black/10 p-8">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 pb-4 border-b border-near-black/10">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-1">Full Name</p>
                  <p className="text-charcoal font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-1">Email Address</p>
                  <p className="text-charcoal font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-near-black/50 mb-1">Phone Number</p>
                  <p className="text-charcoal font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="mt-8">
                <button className="px-6 py-3 border border-near-black/20 text-charcoal text-xs font-semibold tracking-widest uppercase hover:bg-near-black hover:text-ivory transition-colors">
                  Edit Details
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-near-black/10 p-8">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-near-black/10">
                <h2 className="font-heading text-2xl font-bold text-charcoal">Recent Orders</h2>
                <Link href="/account/orders" className="text-xs font-semibold tracking-widest uppercase text-accent hover:text-near-black transition-colors">
                  View All
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-6">
                  {recentOrders.map((order, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-sand/30 border border-near-black/5">
                      <div className="mb-4 sm:mb-0">
                        <p className="font-bold text-charcoal mb-1">{order.id}</p>
                        <p className="text-sm text-near-black/60">Placed on {order.date}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-2">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                        <p className="font-medium text-charcoal">{formatCurrency(order.total)} <span className="text-xs text-near-black/50 font-light ml-1">({order.items} items)</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center">
                  <Package className="w-10 h-10 text-near-black/20 mx-auto mb-4" />
                  <p className="text-near-black/60 font-light mb-6">You haven't placed any orders yet.</p>
                  <Link href="/shop" className="px-6 py-3 bg-near-black text-ivory text-xs font-semibold tracking-widest uppercase hover:bg-accent transition-colors">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
