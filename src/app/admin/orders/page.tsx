import { ShoppingCart } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
        <p className="text-muted-foreground max-w-md">
          When customers place orders on your store, they will appear here. You can manage fulfillments and track shipments from this dashboard.
        </p>
      </div>
    </div>
  );
}
