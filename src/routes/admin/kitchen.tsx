import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, CheckCircle2, ChefHat, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/kitchen")({
  component: KitchenDisplay,
});

function KitchenDisplay() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: queue, isLoading } = useQuery({
    queryKey: ["kitchen-queue"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || \`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}\`}/api/v1/kitchen/queue`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!token,
    refetchInterval: 10000, // Fallback polling if WS fails
  });

  const updateStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number, status: string }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`}/api/v1/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading Kitchen Display...</div>;
  }

  // Group items by order
  const ordersMap = new Map();
  queue?.forEach((item: any) => {
    if (!ordersMap.has(item.order_id)) {
      ordersMap.set(item.order_id, {
        orderId: item.order_id,
        items: []
      });
    }
    ordersMap.get(item.order_id).items.push(item);
  });
  const groupedOrders = Array.from(ordersMap.values());

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ChefHat className="text-[#0B5D3B]" />
          Kitchen Display System
        </h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">New: {queue?.filter((i:any) => i.status === 'ACCEPTED').length || 0}</span>
          <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700">Prep: {queue?.filter((i:any) => i.status === 'PREPARING').length || 0}</span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">Ready: {queue?.filter((i:any) => i.status === 'READY').length || 0}</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full items-start">
          {groupedOrders.map((orderGroup) => {
            const orderStatus = orderGroup.items[0]?.status; // 'ACCEPTED', 'PREPARING', 'READY'
            const orderType = orderGroup.items[0]?.order?.order_type;
            const tableNumber = orderGroup.items[0]?.order?.table?.table_number;
            
            return (
              <div key={orderGroup.orderId} className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0 max-h-[85vh]">
                <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">Order #{orderGroup.orderId}</h3>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {orderType === 'DINE_IN' ? `Table ${tableNumber || 'N/A'}` : 'Take-Away'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-1">
                    <Clock size={14} />
                    <span>
                      {Math.floor((new Date().getTime() - new Date(orderGroup.items[0].created_at).getTime()) / 60000)}m ago
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 overflow-y-auto space-y-3">
                  {orderGroup.items.map((item: any) => (
                    <div key={item.id} className="p-3 border rounded-lg bg-gray-50/50">
                      <div className="font-semibold text-gray-900">
                        {item.quantity}x {item.menu_item.name}
                      </div>
                      {item.special_notes && (
                        <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded flex items-start gap-1">
                          <AlertCircle size={12} className="shrink-0 mt-0.5" />
                          <span className="leading-tight">{item.special_notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-2 rounded-b-xl">
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="text-gray-500 font-semibold">Status:</span>
                    <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${
                      orderStatus === 'ACCEPTED' ? 'bg-red-100 text-red-800' :
                      orderStatus === 'PREPARING' ? 'bg-orange-100 text-[#d97706]' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {orderStatus === 'ACCEPTED' ? 'NEW' : orderStatus}
                    </span>
                  </div>

                  {orderStatus === 'ACCEPTED' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus.mutate({ orderId: orderGroup.orderId, status: 'PREPARING' })}
                        className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer text-center"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus.mutate({ orderId: orderGroup.orderId, status: 'CANCELLED' })}
                        className="py-2 px-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg cursor-pointer text-center"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {orderStatus === 'PREPARING' && (
                    <button
                      onClick={() => updateStatus.mutate({ orderId: orderGroup.orderId, status: 'READY' })}
                      className="w-full py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1 cursor-pointer text-center"
                    >
                      <CheckCircle2 size={14} /> Ready for Serving
                    </button>
                  )}

                  {orderStatus === 'READY' && (
                    <button
                      onClick={() => updateStatus.mutate({ orderId: orderGroup.orderId, status: 'COMPLETED' })}
                      className="w-full py-2 bg-[#0B5D3B] hover:bg-[#094A2F] text-[#F6E8D7] text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1 cursor-pointer text-center"
                    >
                      Complete / Served
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {groupedOrders.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 py-20">
              <ChefHat size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">No active orders in queue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
