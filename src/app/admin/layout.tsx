"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Users, Package, FileText, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-sand/10">
      {/* Sidebar */}
      <aside className="w-64 bg-near-black text-ivory flex-shrink-0 hidden md:block h-screen sticky top-0 overflow-y-auto">
        <div className="p-8 pb-10">
          <Link href="/admin" className="flex flex-col">
            <span className="font-heading text-2xl font-bold uppercase tracking-[0.2em] mb-1">Bakti Seva</span>
            <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-4 px-4 py-3 rounded-md bg-white/5 text-ivory border-l-2 border-accent transition-colors">
            <LayoutDashboard className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium tracking-wide">Dashboard</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-4 px-4 py-3 rounded-md text-ivory/60 hover:bg-white/5 hover:text-ivory transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-4 px-4 py-3 rounded-md text-ivory/60 hover:bg-white/5 hover:text-ivory transition-colors">
            <Package className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Products</span>
          </Link>
          <Link href="/admin/customers" className="flex items-center gap-4 px-4 py-3 rounded-md text-ivory/60 hover:bg-white/5 hover:text-ivory transition-colors">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Customers</span>
          </Link>
          <Link href="/admin/content" className="flex items-center gap-4 px-4 py-3 rounded-md text-ivory/60 hover:bg-white/5 hover:text-ivory transition-colors">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Content</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-4 px-4 py-3 rounded-md text-ivory/60 hover:bg-white/5 hover:text-ivory transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Settings</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-near-black">
          <button className="flex items-center gap-4 w-full px-4 py-2 text-ivory/60 hover:text-accent transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b border-near-black/5 flex items-center justify-between px-10 sticky top-0 z-10 shadow-sm">
          <div className="font-heading text-xl font-semibold text-charcoal">Control Center</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-charcoal">Admin User</p>
                <p className="text-xs text-near-black/50">admin@baktiseva.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold border border-accent/20 shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
