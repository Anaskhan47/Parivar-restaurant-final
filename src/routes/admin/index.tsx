import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { DollarSign, ShoppingBag, Users, Clock, Flame, CalendarDays, Receipt } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [viewingOrder, setViewingOrder] = useState<any>(null);

  const updateStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`}/api/v1/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update order status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("Order status updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update order status");
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import("jspdf");

      const today = new Date().toDateString();
      const todayOrders = orders?.filter((o: any) => new Date(o.created_at).toDateString() === today) || [];
      const todayOrdersCount = todayOrders.length;
      const todayRev = todayOrders.reduce((acc: number, o: any) => acc + o.total_amount, 0);
      const actOrders = orders?.filter((o: any) => o.status !== "COMPLETED" && o.status !== "CANCELLED")?.length || 0;
      const completedToday = todayOrders.filter((o: any) => o.status === "COMPLETED").length;
      const cancelledToday = todayOrders.filter((o: any) => o.status === "CANCELLED").length;

      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = margin;

      // Header background bar
      doc.setFillColor(11, 93, 59);
      doc.rect(0, 0, pageW, 90, "F");

      // Restaurant name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.text("Parivar Restaurant", pageW / 2, 40, { align: "center" });

      // Gold divider line
      doc.setDrawColor(212, 160, 23);
      doc.setLineWidth(1.5);
      doc.line(margin, 55, pageW - margin, 55);

      // Subtitle
      doc.setFontSize(13);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(255, 255, 255);
      doc.text("End of Day Report", pageW / 2, 75, { align: "center" });

      y = 110;

      // Date/time info
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      const dateStr = new Date().toLocaleDateString("en-AU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      doc.text(`Generated: ${dateStr}`, pageW - margin, y, { align: "right" });
      y += 30;

      // Section: Summary
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 93, 59);
      doc.text("Daily Summary", margin, y);
      y += 6;
      doc.setDrawColor(212, 160, 23);
      doc.setLineWidth(1);
      doc.line(margin, y, pageW - margin, y);
      y += 20;

      // Table rows helper
      const drawRow = (label: string, value: string, shaded: boolean) => {
        if (shaded) {
          doc.setFillColor(248, 249, 250);
          doc.rect(margin, y - 14, pageW - margin * 2, 26, "F");
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(50, 50, 50);
        doc.text(label, margin + 10, y + 5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(11, 93, 59);
        doc.text(value, pageW - margin - 10, y + 5, { align: "right" });
        doc.setDrawColor(221, 221, 221);
        doc.setLineWidth(0.5);
        doc.line(margin, y + 12, pageW - margin, y + 12);
        y += 28;
      };

      drawRow("Total Orders Today", `${todayOrdersCount}`, true);
      drawRow("Total Revenue Today", `$${todayRev.toFixed(2)}`, false);
      drawRow("Active Orders", `${actOrders}`, true);
      drawRow("Completed Orders", `${completedToday}`, false);
      drawRow("Cancelled Orders", `${cancelledToday}`, true);

      y += 20;

      // Section: Order Breakdown
      if (todayOrders.length > 0) {
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 93, 59);
        doc.text("Order Breakdown", margin, y);
        y += 6;
        doc.setDrawColor(212, 160, 23);
        doc.line(margin, y, pageW - margin, y);
        y += 20;

        // Table header
        doc.setFillColor(11, 93, 59);
        doc.rect(margin, y - 14, pageW - margin * 2, 22, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("Order #", margin + 10, y);
        doc.text("Type", margin + 80, y);
        doc.text("Status", margin + 180, y);
        doc.text("Amount", pageW - margin - 10, y, { align: "right" });
        y += 14;

        todayOrders.forEach((o: any, idx: number) => {
          if (y > 770) {
            doc.addPage();
            y = margin;
          }
          if (idx % 2 === 0) {
            doc.setFillColor(248, 249, 250);
            doc.rect(margin, y - 11, pageW - margin * 2, 20, "F");
          }
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(50, 50, 50);
          doc.text(`#${String(o.id).padStart(4, "0")}`, margin + 10, y);
          doc.text(o.order_type === "DINE_IN" ? `Table ${o.table?.table_number || o.table_id}` : "Take-away", margin + 80, y);
          doc.text(o.status, margin + 180, y);
          doc.setTextColor(11, 93, 59);
          doc.text(`$${o.total_amount.toFixed(2)}`, pageW - margin - 10, y, { align: "right" });
          y += 20;
        });
      }

      // Footer
      y = doc.internal.pageSize.getHeight() - 40;
      doc.setFillColor(11, 93, 59);
      doc.rect(0, y - 10, pageW, 50, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Generated automatically by Parivar OS  •  1/83 King Georges Rd, Wiley Park NSW 2195", pageW / 2, y + 12, { align: "center" });

      doc.save(`End_Of_Day_Report_${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("End of Day report downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  // Ideally, you'd fetch these from a /api/v1/analytics/dashboard endpoint
  // For now, let's fetch tables and orders to compute some stats locally if the endpoint isn't built yet
  const { data: tables } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || \`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}\`}/api/v1/tables`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!token,
  });

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || \`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}\`}/api/v1/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!token,
  });

  const occupiedTables = tables?.filter((t: any) => t.status === "OCCUPIED")?.length || 0;
  const availableTables = tables?.filter((t: any) => t.status === "AVAILABLE")?.length || 0;
  
  const todayOrders = orders?.filter((o: any) => {
    // Basic filter for today based on created_at
    const today = new Date().toDateString();
    return new Date(o.created_at).toDateString() === today;
  }) || [];
  
  const todayRevenue = todayOrders.reduce((acc: number, o: any) => acc + o.total_amount, 0);
  const activeOrders = orders?.filter((o: any) => o.status !== "COMPLETED" && o.status !== "CANCELLED")?.length || 0;

  const newOrders = orders?.filter((o: any) => o.status === "NEW") || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>

      {newOrders.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            🔔 New Orders Awaiting Review ({newOrders.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newOrders.map((order: any) => (
              <div key={order.id} className="border border-red-100 bg-red-50/10 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-900 text-lg">Order #{order.id}</span>
                    <span className="text-xs text-gray-500">{new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.order_type === 'DINE_IN' ? 'bg-[#0B5D3B]/10 text-[#0B5D3B]' : 'bg-gold/10 text-gold'}`}>
                      {order.order_type === 'DINE_IN' ? `Table ${order.table?.table_number || order.table_id}` : 'Take-Away'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {order.items?.map((item: any) => `${item.quantity}x ${item.menu_item?.name}`).join(', ')}
                  </div>
                  <div className="text-lg font-bold text-[#0B5D3B]">${order.total_amount.toFixed(2)}</div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setViewingOrder(order)}
                    className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white text-xs font-semibold"
                  >
                    View
                  </button>
                  <button
                    onClick={() => updateStatus.mutate({ orderId: order.id, status: 'ACCEPTED' })}
                    className="flex-1 py-2 rounded-lg bg-[#0B5D3B] text-white hover:bg-[#094A2F] text-xs font-semibold"
                  >
                    Send to Kitchen
                  </button>
                  <button
                    onClick={() => updateStatus.mutate({ orderId: order.id, status: 'CANCELLED' })}
                    className="py-2 px-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Revenue" 
          value={`$${todayRevenue.toFixed(2)}`} 
          icon={<DollarSign className="text-emerald-600" size={24} />} 
          trend="+12% from yesterday"
          trendUp={true}
        />
        <StatCard 
          title="Today's Orders" 
          value={todayOrders.length} 
          icon={<ShoppingBag className="text-blue-600" size={24} />} 
          trend="+5% from yesterday"
          trendUp={true}
        />
        <StatCard 
          title="Occupied Tables" 
          value={`${occupiedTables} / ${tables?.length || 0}`} 
          icon={<Users className="text-purple-600" size={24} />} 
          subtitle={`${availableTables} available`}
        />
        <StatCard 
          title="Active Orders" 
          value={activeOrders} 
          icon={<Flame className="text-orange-600" size={24} />} 
          subtitle="Kitchen currently preparing"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-sm text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders?.slice(0, 5).map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                    <td className="py-3 font-medium text-gray-900">#{order.id.toString().padStart(4, '0')}</td>
                    <td className="py-3">
                      {order.order_type === 'DINE_IN' ? `Table ${order.table_id}` : 'Take-away'}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                        order.status === 'READY' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'PREPARING' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 font-medium">${order.total_amount.toFixed(2)}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {(!orders || orders.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">No orders yet today</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/menu" className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-colors font-medium text-gray-700 flex items-center gap-3">
              <ShoppingBag size={18} className="text-[#D4A017]" />
              New Take-away Order
            </Link>
            <Link to="/admin/catering" className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-colors font-medium text-gray-700 flex items-center gap-3">
              <CalendarDays size={18} className="text-[#D4A017]" />
              View Catering Requests
            </Link>
            <button 
              onClick={handleGenerateReport} 
              disabled={isGenerating}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-colors font-medium text-gray-700 flex items-center gap-3 cursor-pointer disabled:opacity-50"
            >
              <Receipt size={18} className="text-[#D4A017]" />
              {isGenerating ? "Generating..." : "Generate End of Day Report"}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={!!viewingOrder} onOpenChange={() => setViewingOrder(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-gray-900">Order Details - #{viewingOrder?.id}</DialogTitle>
          </DialogHeader>
          {viewingOrder && (
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center text-sm border-b pb-3 border-gray-100">
                <span className="text-gray-500">Order Type</span>
                <span className="font-semibold text-gray-900">{viewingOrder.order_type}</span>
              </div>
              {viewingOrder.order_type === 'DINE_IN' ? (
                <div className="flex justify-between items-center text-sm border-b pb-3 border-gray-100">
                  <span className="text-gray-500">Table</span>
                  <span className="font-semibold text-gray-900">Table {viewingOrder.table?.table_number || viewingOrder.table_id}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center text-sm border-b pb-3 border-gray-100">
                    <span className="text-gray-500">Customer Name</span>
                    <span className="font-semibold text-gray-900">{viewingOrder.customer_name || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b pb-3 border-gray-100">
                    <span className="text-gray-500">Phone</span>
                    <span className="font-semibold text-gray-900">{viewingOrder.customer_phone || 'N/A'}</span>
                  </div>
                </>
              )}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-sm">Items</h3>
                {viewingOrder.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.quantity}x {item.menu_item?.name}</span>
                    <span className="font-medium text-gray-900">${(item.quantity * item.unit_price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-lg">Total</span>
                <span className="font-bold text-[#0B5D3B] text-xl">${viewingOrder.total_amount.toFixed(2)}</span>
              </div>
              {viewingOrder.status === 'NEW' && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      updateStatus.mutate({ orderId: viewingOrder.id, status: 'ACCEPTED' });
                      setViewingOrder(null);
                    }}
                    className="flex-1 py-3 rounded-lg bg-[#0B5D3B] text-white hover:bg-[#094A2F] text-sm font-semibold text-center cursor-pointer"
                  >
                    Send to Kitchen
                  </button>
                  <button
                    onClick={() => {
                      updateStatus.mutate({ orderId: viewingOrder.id, status: 'CANCELLED' });
                      setViewingOrder(null);
                    }}
                    className="py-3 px-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold text-center cursor-pointer"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatCard({ title, value, icon, trend, trendUp, subtitle }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
      </div>
      {trend && (
        <p className={`text-sm font-medium ${trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend}
        </p>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
