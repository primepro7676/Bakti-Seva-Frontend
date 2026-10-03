<<<<<<< HEAD
import { fetchAdminStats } from "@/lib/backend-api";
=======
import { prisma as db } from "@/lib/prisma";
>>>>>>> f1a1a28b27fc11481b919ecfcb09db8e2a7fd56e
import { formatCurrency } from "@/lib/utils";
import { 
  Package, 
  ShoppingCart, 
  Users, 
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
<<<<<<< HEAD
  let productsCount = 0;
  let usersCount = 0;
  let ordersCount = 0;
  let recentOrders: Array<{
    id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    user: { name: string | null; email: string | null } | null;
  }> = [];
  let totalRevenue = 0;
=======
  if (!db?.product || !db?.user || !db?.order) {
    return (
      <div className="p-8 text-near-black/60">
        Database is not configured. Set DATABASE_URL and redeploy.
      </div>
    );
  }

  const [
    productsCount,
    usersCount,
    ordersCount,
    recentOrders
  ] = await Promise.all([
    db.product.count(),
    db.user.count(),
    db.order.count(),
    db.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    }),
  ]);
>>>>>>> f1a1a28b27fc11481b919ecfcb09db8e2a7fd56e

  try {
    const stats = await fetchAdminStats();
    productsCount = stats.productsCount;
    usersCount = stats.usersCount;
    ordersCount = stats.ordersCount;
    recentOrders = stats.recentOrders;
    totalRevenue = stats.totalRevenue;
  } catch (error) {
    console.warn("Admin stats unavailable from backend:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold text-charcoal">Dashboard Overview</h1>
        <div className="text-sm font-medium text-near-black/50 bg-white px-4 py-2 rounded-full shadow-sm border border-near-black/5">
          Last updated: Just now
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-near-black/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="text-sm font-semibold text-near-black/60 uppercase tracking-wider">Total Revenue</h3>
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <IndianRupee className="h-5 w-5" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-3xl font-bold text-charcoal font-heading">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-green-600 font-medium flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +20.1% from last month
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-near-black/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="text-sm font-semibold text-near-black/60 uppercase tracking-wider">Sales</h3>
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-4xl font-bold text-charcoal font-heading">+{ordersCount}</div>
            <p className="text-xs text-green-600 font-medium flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +19% from last month
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-near-black/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="text-sm font-semibold text-near-black/60 uppercase tracking-wider">Active Users</h3>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-4xl font-bold text-charcoal font-heading">+{usersCount}</div>
            <p className="text-xs text-green-600 font-medium flex items-center mt-2">
              <ArrowUpRight className="w-3 h-3 mr-1" /> +5.4% from last month
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-near-black/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <h3 className="text-sm font-semibold text-near-black/60 uppercase tracking-wider">Products</h3>
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="relative z-10 mt-2">
            <div className="text-4xl font-bold text-charcoal font-heading">{productsCount}</div>
            <p className="text-xs text-near-black/50 font-medium flex items-center mt-2">
              in inventory
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-near-black/5 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-near-black/5 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-charcoal">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent/80 transition-colors">
              View All
            </Link>
          </div>
          <div className="p-0">
            <div className="divide-y divide-near-black/5">
              {recentOrders.length === 0 ? (
                <div className="p-12 text-center text-near-black/50 font-light">No recent orders found.</div>
              ) : (
                recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-6 hover:bg-sand/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center text-charcoal font-bold border border-near-black/5">
                        {order.user?.name?.charAt(0) || "G"}
                      </div>
                      <div>
                        <p className="font-semibold text-charcoal">{order.user?.name || "Guest"}</p>
                        <p className="text-xs text-near-black/50 mt-0.5">{order.user?.email || "No email"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-charcoal">{formatCurrency(order.totalAmount)}</p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                          order.status === "COMPLETED" || order.status === "DELIVERED" ? "bg-green-100 text-green-700 border border-green-200" :
                          order.status === "PENDING" ? "bg-amber-100 text-amber-700 border border-amber-200" :
                          "bg-red-100 text-red-700 border border-red-200"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-near-black to-charcoal p-8 rounded-2xl shadow-lg relative overflow-hidden border border-near-black flex flex-col justify-between">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading mb-2 text-ivory">Welcome back, Admin</h2>
            <p className="text-ivory/70 text-sm mb-8 leading-relaxed">
              Manage your inventory, track orders, and monitor your store&apos;s performance from your control center.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col gap-3">
            <Link href="/admin/products/new">
              <button className="w-full bg-accent text-near-black hover:bg-accent/90 px-4 py-3 rounded-md font-bold tracking-wide transition-all shadow-sm flex items-center justify-center">
                <Package className="w-4 h-4 mr-2" />
                Add New Product
              </button>
            </Link>
            <Link href="/admin/settings">
              <button className="w-full bg-white/10 text-ivory hover:bg-white/20 px-4 py-3 rounded-md font-bold tracking-wide transition-all border border-white/10 backdrop-blur-sm flex items-center justify-center">
                Configure Settings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
