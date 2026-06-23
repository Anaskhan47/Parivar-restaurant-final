import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { O as ChefHat, C as Clock, V as CircleAlert, r as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function KitchenDisplay() {
  const {
    token
  } = useAuth();
  const queryClient = useQueryClient();
  const {
    data: queue,
    isLoading
  } = useQuery({
    queryKey: ["kitchen-queue"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/kitchen/queue", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.json();
    },
    enabled: !!token,
    refetchInterval: 1e4
    // Fallback polling if WS fails
  });
  const updateStatus = useMutation({
    mutationFn: async ({
      orderId,
      status
    }) => {
      const res = await fetch(`http://localhost:8000/api/v1/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status
        })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["kitchen-queue"]
      });
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse", children: "Loading Kitchen Display..." });
  }
  const ordersMap = /* @__PURE__ */ new Map();
  queue?.forEach((item) => {
    if (!ordersMap.has(item.order_id)) {
      ordersMap.set(item.order_id, {
        orderId: item.order_id,
        items: []
      });
    }
    ordersMap.get(item.order_id).items.push(item);
  });
  const groupedOrders = Array.from(ordersMap.values());
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "text-[#0B5D3B]" }),
        "Kitchen Display System"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-red-100 text-red-700", children: [
          "New: ",
          queue?.filter((i) => i.status === "ACCEPTED").length || 0
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-orange-100 text-orange-700", children: [
          "Prep: ",
          queue?.filter((i) => i.status === "PREPARING").length || 0
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-green-100 text-green-700", children: [
          "Ready: ",
          queue?.filter((i) => i.status === "READY").length || 0
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-x-auto pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 min-w-max h-full items-start", children: [
      groupedOrders.map((orderGroup) => {
        const orderStatus = orderGroup.items[0]?.status;
        const orderType = orderGroup.items[0]?.order?.order_type;
        const tableNumber = orderGroup.items[0]?.order?.table?.table_number;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-80 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col shrink-0 max-h-[85vh]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-100 bg-gray-50 rounded-t-xl flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg", children: [
                "Order #",
                orderGroup.orderId
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-semibold", children: orderType === "DINE_IN" ? `Table ${tableNumber || "N/A"}` : "Take-Away" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm text-gray-500 gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Math.floor(((/* @__PURE__ */ new Date()).getTime() - new Date(orderGroup.items[0].created_at).getTime()) / 6e4),
                "m ago"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex-1 overflow-y-auto space-y-3", children: orderGroup.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border rounded-lg bg-gray-50/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold text-gray-900", children: [
              item.quantity,
              "x ",
              item.menu_item.name
            ] }),
            item.special_notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-red-600 bg-red-50 p-2 rounded flex items-start gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 12, className: "shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: item.special_notes })
            ] })
          ] }, item.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-2 rounded-b-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 font-semibold", children: "Status:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${orderStatus === "ACCEPTED" ? "bg-red-100 text-red-800" : orderStatus === "PREPARING" ? "bg-orange-100 text-[#d97706]" : "bg-green-100 text-green-800"}`, children: orderStatus === "ACCEPTED" ? "NEW" : orderStatus })
            ] }),
            orderStatus === "ACCEPTED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus.mutate({
                orderId: orderGroup.orderId,
                status: "PREPARING"
              }), className: "flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer text-center", children: "Accept" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus.mutate({
                orderId: orderGroup.orderId,
                status: "CANCELLED"
              }), className: "py-2 px-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg cursor-pointer text-center", children: "Reject" })
            ] }),
            orderStatus === "PREPARING" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => updateStatus.mutate({
              orderId: orderGroup.orderId,
              status: "READY"
            }), className: "w-full py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1 cursor-pointer text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
              " Ready for Serving"
            ] }),
            orderStatus === "READY" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus.mutate({
              orderId: orderGroup.orderId,
              status: "COMPLETED"
            }), className: "w-full py-2 bg-[#0B5D3B] hover:bg-[#094A2F] text-[#F6E8D7] text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1 cursor-pointer text-center", children: "Complete / Served" })
          ] })
        ] }, orderGroup.orderId);
      }),
      groupedOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center text-gray-400 py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { size: 48, className: "mb-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "No active orders in queue" })
      ] })
    ] }) })
  ] });
}
export {
  KitchenDisplay as component
};
