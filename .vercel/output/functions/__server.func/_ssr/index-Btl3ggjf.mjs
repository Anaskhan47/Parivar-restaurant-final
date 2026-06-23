import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, b as useMutation, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-RtvUk_Ud.mjs";
import { o as DollarSign, S as ShoppingBag, k as Users, p as Flame, g as CalendarDays, R as Receipt } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function AdminDashboard() {
  const {
    token
  } = useAuth();
  const queryClient = useQueryClient();
  const [viewingOrder, setViewingOrder] = reactExports.useState(null);
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
      if (!res.ok) throw new Error("Failed to update order status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
      queryClient.invalidateQueries({
        queryKey: ["tables"]
      });
      toast.success("Order status updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update order status");
    }
  });
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const {
        jsPDF
      } = await import("../_libs/jspdf.mjs").then(function(n) {
        return n.j;
      });
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const todayOrders2 = orders?.filter((o) => new Date(o.created_at).toDateString() === today) || [];
      const todayOrdersCount = todayOrders2.length;
      const todayRev = todayOrders2.reduce((acc, o) => acc + o.total_amount, 0);
      const actOrders = orders?.filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED")?.length || 0;
      const completedToday = todayOrders2.filter((o) => o.status === "COMPLETED").length;
      const cancelledToday = todayOrders2.filter((o) => o.status === "CANCELLED").length;
      const doc = new jsPDF({
        unit: "pt",
        format: "a4"
      });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 48;
      let y = margin;
      doc.setFillColor(11, 93, 59);
      doc.rect(0, 0, pageW, 90, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.text("Parivar Restaurant", pageW / 2, 40, {
        align: "center"
      });
      doc.setDrawColor(212, 160, 23);
      doc.setLineWidth(1.5);
      doc.line(margin, 55, pageW - margin, 55);
      doc.setFontSize(13);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(255, 255, 255);
      doc.text("End of Day Report", pageW / 2, 75, {
        align: "center"
      });
      y = 110;
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-AU", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      doc.text(`Generated: ${dateStr}`, pageW - margin, y, {
        align: "right"
      });
      y += 30;
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 93, 59);
      doc.text("Daily Summary", margin, y);
      y += 6;
      doc.setDrawColor(212, 160, 23);
      doc.setLineWidth(1);
      doc.line(margin, y, pageW - margin, y);
      y += 20;
      const drawRow = (label, value, shaded) => {
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
        doc.text(value, pageW - margin - 10, y + 5, {
          align: "right"
        });
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
      if (todayOrders2.length > 0) {
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(11, 93, 59);
        doc.text("Order Breakdown", margin, y);
        y += 6;
        doc.setDrawColor(212, 160, 23);
        doc.line(margin, y, pageW - margin, y);
        y += 20;
        doc.setFillColor(11, 93, 59);
        doc.rect(margin, y - 14, pageW - margin * 2, 22, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text("Order #", margin + 10, y);
        doc.text("Type", margin + 80, y);
        doc.text("Status", margin + 180, y);
        doc.text("Amount", pageW - margin - 10, y, {
          align: "right"
        });
        y += 14;
        todayOrders2.forEach((o, idx) => {
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
          doc.text(`$${o.total_amount.toFixed(2)}`, pageW - margin - 10, y, {
            align: "right"
          });
          y += 20;
        });
      }
      y = doc.internal.pageSize.getHeight() - 40;
      doc.setFillColor(11, 93, 59);
      doc.rect(0, y - 10, pageW, 50, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Generated automatically by Parivar OS  •  1/83 King Georges Rd, Wiley Park NSW 2195", pageW / 2, y + 12, {
        align: "center"
      });
      doc.save(`End_Of_Day_Report_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.pdf`);
      toast.success("End of Day report downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };
  const {
    data: tables
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/tables", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.json();
    },
    enabled: !!token
  });
  const {
    data: orders
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.json();
    },
    enabled: !!token
  });
  const occupiedTables = tables?.filter((t) => t.status === "OCCUPIED")?.length || 0;
  const availableTables = tables?.filter((t) => t.status === "AVAILABLE")?.length || 0;
  const todayOrders = orders?.filter((o) => {
    const today = (/* @__PURE__ */ new Date()).toDateString();
    return new Date(o.created_at).toDateString() === today;
  }) || [];
  const todayRevenue = todayOrders.reduce((acc, o) => acc + o.total_amount, 0);
  const activeOrders = orders?.filter((o) => o.status !== "COMPLETED" && o.status !== "CANCELLED")?.length || 0;
  const newOrders = orders?.filter((o) => o.status === "NEW") || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-500", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }) })
    ] }),
    newOrders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-red-200 p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-semibold text-gray-900 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" }),
        "🔔 New Orders Awaiting Review (",
        newOrders.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: newOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-red-100 bg-red-50/10 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-gray-900 text-lg", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500", children: new Date(order.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full text-xs font-semibold ${order.order_type === "DINE_IN" ? "bg-[#0B5D3B]/10 text-[#0B5D3B]" : "bg-gold/10 text-gold"}`, children: order.order_type === "DINE_IN" ? `Table ${order.table?.table_number || order.table_id}` : "Take-Away" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-gray-600 line-clamp-2", children: order.items?.map((item) => `${item.quantity}x ${item.menu_item?.name}`).join(", ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-bold text-[#0B5D3B]", children: [
            "$",
            order.total_amount.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewingOrder(order), className: "flex-1 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-white text-xs font-semibold", children: "View" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus.mutate({
            orderId: order.id,
            status: "ACCEPTED"
          }), className: "flex-1 py-2 rounded-lg bg-[#0B5D3B] text-white hover:bg-[#094A2F] text-xs font-semibold", children: "Send to Kitchen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => updateStatus.mutate({
            orderId: order.id,
            status: "CANCELLED"
          }), className: "py-2 px-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold", children: "Cancel" })
        ] })
      ] }, order.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Today's Revenue", value: `$${todayRevenue.toFixed(2)}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "text-emerald-600", size: 24 }), trend: "+12% from yesterday", trendUp: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Today's Orders", value: todayOrders.length, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "text-blue-600", size: 24 }), trend: "+5% from yesterday", trendUp: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Occupied Tables", value: `${occupiedTables} / ${tables?.length || 0}`, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "text-purple-600", size: 24 }), subtitle: `${availableTables} available` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { title: "Active Orders", value: activeOrders, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "text-orange-600", size: 24 }), subtitle: "Kitchen currently preparing" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Recent Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200 text-sm text-gray-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium", children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-3 font-medium", children: "Time" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "text-sm", children: [
            orders?.slice(0, 5).map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-50 last:border-0 hover:bg-gray-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 font-medium text-gray-900", children: [
                "#",
                order.id.toString().padStart(4, "0")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: order.order_type === "DINE_IN" ? `Table ${order.table_id}` : "Take-away" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${order.status === "COMPLETED" ? "bg-green-100 text-green-700" : order.status === "READY" ? "bg-blue-100 text-blue-700" : order.status === "PREPARING" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-700"}`, children: order.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 font-medium", children: [
                "$",
                order.total_amount.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-gray-500", children: new Date(order.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] }, order.id)),
            (!orders || orders.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "py-8 text-center text-gray-500", children: "No orders yet today" }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl shadow-sm border border-gray-100 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Quick Actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/menu", className: "w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-colors font-medium text-gray-700 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18, className: "text-[#D4A017]" }),
            "New Take-away Order"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/catering", className: "w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-colors font-medium text-gray-700 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 18, className: "text-[#D4A017]" }),
            "View Catering Requests"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleGenerateReport, disabled: isGenerating, className: "w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-[#D4A017] hover:bg-[#D4A017]/5 transition-colors font-medium text-gray-700 flex items-center gap-3 cursor-pointer disabled:opacity-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 18, className: "text-[#D4A017]" }),
            isGenerating ? "Generating..." : "Generate End of Day Report"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!viewingOrder, onOpenChange: () => setViewingOrder(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md bg-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl text-gray-900", children: [
        "Order Details - #",
        viewingOrder?.id
      ] }) }),
      viewingOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm border-b pb-3 border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Order Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: viewingOrder.order_type })
        ] }),
        viewingOrder.order_type === "DINE_IN" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm border-b pb-3 border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Table" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-gray-900", children: [
            "Table ",
            viewingOrder.table?.table_number || viewingOrder.table_id
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm border-b pb-3 border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Customer Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: viewingOrder.customer_name || "N/A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm border-b pb-3 border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-900", children: viewingOrder.customer_phone || "N/A" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 text-sm", children: "Items" }),
          viewingOrder.items?.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-700", children: [
              item.quantity,
              "x ",
              item.menu_item?.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [
              "$",
              (item.quantity * item.unit_price).toFixed(2)
            ] })
          ] }, item.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-3 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-gray-900 text-lg", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[#0B5D3B] text-xl", children: [
            "$",
            viewingOrder.total_amount.toFixed(2)
          ] })
        ] }),
        viewingOrder.status === "NEW" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            updateStatus.mutate({
              orderId: viewingOrder.id,
              status: "ACCEPTED"
            });
            setViewingOrder(null);
          }, className: "flex-1 py-3 rounded-lg bg-[#0B5D3B] text-white hover:bg-[#094A2F] text-sm font-semibold text-center cursor-pointer", children: "Send to Kitchen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            updateStatus.mutate({
              orderId: viewingOrder.id,
              status: "CANCELLED"
            });
            setViewingOrder(null);
          }, className: "py-3 px-4 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold text-center cursor-pointer", children: "Cancel Order" })
        ] })
      ] })
    ] }) })
  ] });
}
function StatCard({
  title,
  value,
  icon,
  trend,
  trendUp,
  subtitle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-500 mb-1", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-gray-900", children: value })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-gray-50 rounded-lg", children: icon })
    ] }),
    trend && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm font-medium ${trendUp ? "text-emerald-600" : "text-red-600"}`, children: trend }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: subtitle })
  ] });
}
export {
  AdminDashboard as component
};
