import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useNotificationStore } from "./useNotificationStore-jdohmSTb.mjs";
import { Z } from "../_libs/react-to-print.mjs";
import { I as InvoicePreview } from "./InvoicePreview-CKehnKQJ.mjs";
import { y as Search, R as Receipt, $ as Copy, D as Download, e as Printer, a0 as Send, a1 as Banknote, t as CreditCard } from "../_libs/lucide-react.mjs";
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
import "../_libs/zustand.mjs";
import "./cart-_Q1BESbT.mjs";
import "./parivar-logo-BUUpiIB8.mjs";
function BillingPayments() {
  const {
    token
  } = useAuth();
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = reactExports.useState(null);
  const [paymentMethod, setPaymentMethod] = reactExports.useState("CASH");
  const invoiceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    useNotificationStore.getState().clearBillingBadge();
  }, []);
  const handlePrintReceipt = Z({
    contentRef: invoiceRef,
    documentTitle: `Parivar_Receipt_${selectedOrderId}`
  });
  const handleDownloadPDF = () => {
    toast.info("Please select 'Save as PDF' in the print dialog.");
    handlePrintReceipt();
  };
  const handleCopyLink = () => {
    if (!selectedOrderId) return;
    const link = `${window.location.origin}/order-tracking/${selectedOrderId}`;
    navigator.clipboard.writeText(link).then(() => toast.success("Tracking link copied to clipboard!")).catch(() => toast.error("Failed to copy link"));
  };
  const {
    data: orders,
    isLoading
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
  const generateBill = useMutation({
    mutationFn: async (orderId) => {
      const res = await fetch(`http://localhost:8000/api/v1/payments/bills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          order_id: orderId
        })
      });
      if (!res.ok) throw new Error("Failed to generate bill");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
      toast.success("Bill generated successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  const sendBill = useMutation({
    mutationFn: async (orderId) => {
      const res = await fetch(`http://localhost:8000/api/v1/payments/bills/order/${orderId}/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to send bill");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
      toast.success("Bill sent to customer successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  const completePayment = useMutation({
    mutationFn: async ({
      orderId,
      amount,
      method
    }) => {
      const res = await fetch(`http://localhost:8000/api/v1/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          order_id: orderId,
          amount,
          method
        })
      });
      if (!res.ok) throw new Error("Payment failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"]
      });
      queryClient.invalidateQueries({
        queryKey: ["payments"]
      });
      queryClient.invalidateQueries({
        queryKey: ["tables"]
      });
      setSelectedOrderId(null);
      toast.success("Payment completed successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  const selectedOrder = orders?.find((o) => o.id === selectedOrderId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse", children: "Loading Billing System..." });
  }
  const unpaidOrders = orders?.filter((o) => o.status === "COMPLETED" || o.status === "READY") || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg text-gray-900 mb-4", children: "Unpaid Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Search by Order ID or Table...", className: "w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-2", children: [
        unpaidOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedOrderId(order.id), className: `w-full text-left p-4 mb-2 rounded-lg border transition-colors ${selectedOrderId === order.id ? "bg-[#0B5D3B]/5 border-[#0B5D3B]" : "border-transparent hover:bg-gray-50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-gray-900", children: [
              "Order #",
              order.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-gray-900", children: [
              "$",
              order.total_amount.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: order.order_type === "DINE_IN" ? `Table ${order.table?.table_number || order.table_id}` : "Take-away" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded text-xs font-medium ${order.status === "READY" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`, children: order.status })
          ] })
        ] }, order.id)),
        unpaidOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-8 text-gray-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 48, className: "mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No unpaid orders found" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden", children: selectedOrder ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold font-display text-gray-900", children: [
            "Order #",
            selectedOrder.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: selectedOrder.order_type === "DINE_IN" ? `Table ${selectedOrder.table?.table_number || selectedOrder.table_id}` : "Take-away Order" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mb-1", children: "Total Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-[#0B5D3B]", children: [
            "$",
            selectedOrder.total_amount.toFixed(2)
          ] })
        ] })
      ] }),
      selectedOrder.bill ? (
        // Split POS Layout (Preview + Actions)
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[55%] border-r border-gray-100 overflow-y-auto bg-gray-50/50 p-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-md bg-white shadow-md border rounded-xl overflow-hidden scale-90 sm:scale-100 origin-top h-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoicePreview, { ref: invoiceRef, orderType: selectedOrder.order_type, paymentMethod: paymentMethod === "CARD" ? "Card" : "Cash", tableNumber: selectedOrder.table_id ? `T${selectedOrder.table_id.toString().padStart(2, "0")}` : void 0, items: selectedOrder.items.map((item) => ({
            name: item.menu_item.name,
            quantity: item.quantity,
            price: item.unit_price
          })), totals: {
            subtotal: selectedOrder.bill.subtotal,
            tax: selectedOrder.bill.tax_amount,
            serviceFee: selectedOrder.bill.service_fee,
            total: selectedOrder.bill.grand_total
          }, orderNumber: selectedOrder.id.toString(), date: new Date(selectedOrder.created_at || Date.now()).toLocaleDateString(), time: new Date(selectedOrder.created_at || Date.now()).toLocaleTimeString() }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[45%] overflow-y-auto p-6 bg-white flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase", children: "Share & Export" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleCopyLink, className: "py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 font-bold text-xs text-gray-700 transition-all cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 }),
                    " Copy Link"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDownloadPDF, className: "py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 font-bold text-xs text-gray-700 transition-all cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
                    " Save PDF"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handlePrintReceipt(), className: "py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 font-bold text-xs text-gray-700 transition-all cursor-pointer col-span-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14 }),
                    " Print Receipt"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-gray-100 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-gray-900 text-sm", children: "Digital Bill" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: selectedOrder.bill.is_sent ? "Visible on customer's screen" : "Not yet visible to customer" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => sendBill.mutate(selectedOrder.id), disabled: sendBill.isPending, className: `py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${selectedOrder.bill.is_sent ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200" : "bg-[#D4A017] hover:bg-[#D4A017]/90 text-white shadow-sm border border-transparent"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14, className: sendBill.isPending ? "animate-pulse" : "" }),
                  sendBill.isPending ? "Sending..." : selectedOrder.bill.is_sent ? "Resend" : "Send"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-gray-100 pt-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase", children: "Payment Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPaymentMethod("CASH"), className: `py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${paymentMethod === "CASH" ? "border-[#0B5D3B] bg-[#0B5D3B]/5 text-[#0B5D3B]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { size: 18 }),
                    " Cash"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPaymentMethod("CARD"), className: `py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${paymentMethod === "CARD" ? "border-[#0B5D3B] bg-[#0B5D3B]/5 text-[#0B5D3B]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 18 }),
                    " Card"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => completePayment.mutate({
              orderId: selectedOrder.id,
              amount: selectedOrder.bill.grand_total,
              method: paymentMethod
            }), disabled: completePayment.isPending, className: "w-full py-4 rounded-xl bg-[#0B5D3B] text-white font-bold text-base hover:bg-[#094A2F] transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer text-center mt-6", children: completePayment.isPending ? "Processing..." : `Complete Payment of $${selectedOrder.bill.grand_total.toFixed(2)}` })
          ] })
        ] })
      ) : (
        // Regular details view when bill is not yet generated
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-4", children: "Order Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: selectedOrder.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b border-dashed border-gray-200 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: item.menu_item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500", children: [
                  "Qty: ",
                  item.quantity,
                  " × $",
                  item.unit_price.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-gray-900", children: [
                "$",
                (item.quantity * item.unit_price).toFixed(2)
              ] })
            ] }, item.id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 border-t border-gray-200 pt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-500 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "$",
                  selectedOrder.total_amount.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-500 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tax (10%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pending" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-gray-500 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Service Fee (5%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pending" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xl font-bold text-gray-900", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Pending" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-t border-gray-100 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center p-6 border border-dashed border-gold/30 bg-gold/5 rounded-2xl space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-10 h-10 text-gold animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900 text-sm", children: "Awaiting Bill Generation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 max-w-xs mt-1", children: "This order is ready to be paid. First, generate a bill to calculate taxes and fees." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => generateBill.mutate(selectedOrder.id), disabled: generateBill.isPending, className: "w-full py-3 px-4 rounded-xl bg-[#D4A017] text-white font-bold text-sm hover:bg-[#D4A017]/90 transition-colors shadow-sm disabled:opacity-50 cursor-pointer text-center", children: generateBill.isPending ? "Generating..." : "Generate Bill" })
          ] }) })
        ] })
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-gray-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 64, className: "mb-4 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-medium text-gray-500", children: "Select an order to process payment" })
    ] }) })
  ] });
}
export {
  BillingPayments as component
};
