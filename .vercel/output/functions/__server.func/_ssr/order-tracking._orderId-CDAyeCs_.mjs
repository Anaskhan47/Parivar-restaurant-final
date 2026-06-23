import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { N as Navbar, F as Footer } from "./Footer-Dy-8TJ6T.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
import { I as InvoicePreview } from "./InvoicePreview-CKehnKQJ.mjs";
import { a as Route$b } from "./router-BeeKtac0.mjs";
import "../_libs/sonner.mjs";
import { q as LoaderCircle, A as ArrowLeft, C as Clock, r as CircleCheck, E as Eye, s as ShieldCheck, t as CreditCard, X, P as Plus } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
import "./cart-_Q1BESbT.mjs";
import "../_libs/zustand.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const fallbackAddons = [
  { name: "Extra Butter Naan", desc: "Add an extra butter naan to your meal", price: 3, image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop" },
  { name: "Extra Garlic Naan", desc: "Garlic naan on the side", price: 3.5, image_url: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=800&auto=format&fit=crop" },
  { name: "Raita", desc: "Cooling yogurt with cucumber and mint", price: 2.5, image_url: "https://images.unsplash.com/photo-1626509646543-518ee55030e4?q=80&w=800&auto=format&fit=crop" },
  { name: "Extra Rice", desc: "Steamed saffron basmati rice", price: 3, image_url: "https://images.unsplash.com/photo-1516684732162-798a0062bf99?q=80&w=800&auto=format&fit=crop" },
  { name: "Mint Chutney", desc: "Fresh mint and coriander chutney", price: 1.5, image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop" },
  { name: "Papadum (2 pcs)", desc: "Crispy lentil wafers", price: 2, image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" }
];
function PostOrderAddOns({ orderId, disabled, onItemsAdded }) {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [addingId, setAddingId] = reactExports.useState(null);
  const [addedId, setAddedId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchAddons = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/v1/menu?category=${encodeURIComponent("Add-ons")}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const available = (data || []).filter((item) => item.is_available !== false);
        setItems(available.length > 0 ? available : fallbackAddons);
      } catch {
        setItems(fallbackAddons);
      } finally {
        setLoading(false);
      }
    };
    fetchAddons();
  }, []);
  const getItemId = (item) => item.id ? String(item.id) : item.name;
  const handleAddToOrder = async (item) => {
    const itemId = getItemId(item);
    setAddingId(itemId);
    setAddedId(null);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/orders/${orderId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ menu_item_id: item.id ?? item.name, quantity: 1, special_notes: "" }]
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Failed to add item");
      }
      setAddedId(itemId);
      onItemsAdded?.();
      setTimeout(() => setAddedId(null), 2e3);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not add item to your order.";
      alert(message);
    } finally {
      setAddingId(null);
    }
  };
  if (disabled) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-6 sm:p-8 rounded-2xl border border-gold/20 shadow-sm bg-white/70 backdrop-blur-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold/40" }),
        " Add-ons ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-[#042416] font-semibold", children: "Want to add more?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add extras to your order while it's being prepared." })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-[#0B5D3B] animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: items.map((item, i) => {
      const itemId = getItemId(item);
      const isAdding = addingId === itemId;
      const justAdded = addedId === itemId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.04 },
          className: "flex gap-4 p-4 rounded-xl border border-gold/10 bg-white/60 hover:shadow-sm transition-shadow",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-gold/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image_url || item.img,
                alt: item.name,
                className: "w-full h-full object-cover",
                loading: "lazy",
                onError: (e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = logo;
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-[#042416] text-sm leading-tight", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold font-semibold text-sm whitespace-nowrap", children: [
                  "$",
                  item.price.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: item.description || item.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => handleAddToOrder(item),
                  disabled: isAdding,
                  className: `mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${justAdded ? "bg-green-100 text-green-700" : "bg-[#0B5D3B] text-cream hover:bg-[#D4A017]"} disabled:opacity-60`,
                  children: [
                    isAdding ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : justAdded ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                    justAdded ? "Added!" : "Add to Order"
                  ]
                }
              )
            ] })
          ]
        },
        itemId
      );
    }) })
  ] });
}
function OrderTrackingPage() {
  const {
    orderId
  } = Route$b.useParams();
  const queryClient = useQueryClient();
  const [paymentFlowState, setPaymentFlowState] = reactExports.useState("IDLE");
  const [isReceiptOpen, setIsReceiptOpen] = reactExports.useState(false);
  const {
    data: order,
    isLoading,
    error
  } = useQuery({
    queryKey: ["order-tracking", orderId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/api/v1/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order details");
      return res.json();
    },
    refetchInterval: 15e3
    // Fallback poll every 15s
  });
  reactExports.useEffect(() => {
    let socket = null;
    let pingInterval;
    let reconnectTimeout;
    const connect = () => {
      socket = new WebSocket("ws://localhost:8000/ws");
      socket.onopen = () => {
        console.log("WS tracking connected");
        pingInterval = setInterval(() => {
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
              type: "PING"
            }));
          }
        }, 25e3);
      };
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "PONG") return;
          if ((message.type === "ORDER_STATUS_CHANGED" || message.type === "ORDER_UPDATED" || message.type.startsWith("ORDER_")) && String(message.data?.id) === String(orderId)) {
            queryClient.invalidateQueries({
              queryKey: ["order-tracking", orderId]
            });
          }
        } catch (err) {
          console.error("WS parse error:", err);
        }
      };
      socket.onclose = () => {
        clearInterval(pingInterval);
        reconnectTimeout = setTimeout(connect, 3e3);
      };
    };
    connect();
    return () => {
      clearInterval(pingInterval);
      clearTimeout(reconnectTimeout);
      if (socket) {
        socket.onclose = null;
        if (socket.readyState === WebSocket.CONNECTING) {
          socket.onopen = () => socket?.close();
        } else {
          socket.close();
        }
      }
    };
  }, [orderId, queryClient]);
  reactExports.useEffect(() => {
    if (order?.status === "CLOSED") {
      setPaymentFlowState("SUCCESS");
    }
  }, [order?.status]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-[#F6E8D7]/30 text-foreground pt-32 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-[#0B5D3B] animate-spin mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Retrieving order tracking info..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  if (error || !order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-[#F6E8D7]/30 text-foreground pt-32 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-20 text-center flex-1 max-w-md flex flex-col justify-center items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display text-gold mb-4", children: "Order Not Found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-8", children: [
          "We couldn't retrieve the status of order #",
          orderId,
          ". Please contact our staff."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", className: "bg-[#0B5D3B] text-white px-8 py-3 rounded-full hover:bg-gold transition-colors font-medium", children: "Return to Menu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const statuses = ["NEW", "ACCEPTED", "PREPARING", "READY", "COMPLETED"];
  const statusLabels = {
    NEW: "Order Placed",
    ACCEPTED: "Confirmed",
    PREPARING: "Preparing",
    READY: "Ready for Serving",
    COMPLETED: "Served"
  };
  const statusDescriptions = {
    NEW: "We have received your order.",
    ACCEPTED: "Our team is reviewing and scheduling your meal.",
    PREPARING: "Chef is preparing your fresh Hyderabadi delicacies.",
    READY: "Dishes are plated and heading to your table / takeaway counter.",
    COMPLETED: "Your meal is served! Enjoy your experience."
  };
  const currentStatusIndex = statuses.indexOf(order.status === "CLOSED" ? "COMPLETED" : order.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-[#F6E8D7]/30 text-foreground overflow-x-hidden pt-32 flex flex-col justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-10 flex-1 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/menu", className: "inline-flex items-center gap-2 text-[#042416] hover:text-[#D4A017] transition-colors font-medium mb-8 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 transition-transform group-hover:-translate-x-1" }),
        "Back to Menu"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8 rounded-2xl border border-gold/20 bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-[#042416] font-semibold", children: "Track Your Order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  "Order ID: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-semibold", children: [
                    "#",
                    order.id
                  ] }),
                  order.type && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold uppercase", children: order.type })
                  ] }),
                  order.table_number && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "•" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                      "Table ",
                      order.table_number
                    ] })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0B5D3B]/10 text-[#0B5D3B] px-4 py-2 rounded-xl flex items-center gap-2 font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: order.status === "CLOSED" ? "COMPLETED" : order.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative pl-8 border-l border-gold/20 space-y-8 py-2", children: statuses.map((statusStep, index) => {
              const isDone = index <= currentStatusIndex;
              const isActive = index === currentStatusIndex;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white border transition-all duration-500 z-10 ${isDone ? "bg-[#0B5D3B] border-[#0B5D3B]" : "bg-white border-gold/30 text-gold/30"}`, children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-gold/30" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `transition-opacity duration-300 ${isDone ? "opacity-100" : "opacity-50"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: `font-display text-xl font-semibold flex items-center gap-2 ${isActive ? "text-[#0B5D3B]" : "text-[#042416]"}`, children: [
                    statusLabels[statusStep],
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-ping" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: statusDescriptions[statusStep] })
                ] })
              ] }, statusStep);
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PostOrderAddOns, { orderId, disabled: order.status === "CLOSED" || order.status === "CANCELLED", onItemsAdded: () => queryClient.invalidateQueries({
            queryKey: ["order-tracking", orderId]
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8 rounded-2xl border border-gold/20 bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-display font-semibold text-[#042416] mb-6 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Bill Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono text-muted-foreground bg-gray-100 px-2.5 py-1 rounded-md", children: [
                "Order #",
                order.id
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-60 overflow-y-auto pr-1 mb-6", children: order.items?.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm pb-2 border-b border-gray-100 last:border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-800", children: item.menu_item?.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
                  "Qty: ",
                  item.quantity
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-gray-900", children: [
                "$",
                (item.quantity * item.unit_price)?.toFixed(2)
              ] })
            ] }, item.id)) }),
            order.bill ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-5 border-t border-gray-200 space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  order.bill.subtotal?.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GST (10%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  order.bill.tax_amount?.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Service Fee (5%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  order.bill.service_fee?.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xl font-bold text-[#042416] pt-3 pb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#0B5D3B]", children: [
                  "$",
                  order.bill.grand_total?.toFixed(2)
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-5 border-t border-gray-200 space-y-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                  "$",
                  order.total_amount?.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xl font-bold text-[#042416] pt-3 pb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Grand Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#0B5D3B]", children: [
                  "$",
                  order.total_amount?.toFixed(2)
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-3 border-y border-gray-100 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wider", children: "Payment Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${order.status === "CLOSED" ? "bg-green-50 text-green-700 border border-green-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`, children: order.status === "CLOSED" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                " Paid"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "🟡 Pending Payment" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsReceiptOpen(true), className: "w-full py-2.5 rounded-xl bg-[#0B5D3B] text-white font-medium text-sm hover:bg-[#094A2F] transition-colors cursor-pointer flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
              "View Receipt"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: paymentFlowState === "SUCCESS" || order.status === "CLOSED" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            scale: 0.95
          }, animate: {
            opacity: 1,
            scale: 1
          }, className: "bg-[#0B5D3B] text-white p-8 rounded-2xl border border-[#094A2F] text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-display font-semibold mb-2", children: "Payment Successful" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/80 text-sm mb-6", children: [
              "Transaction ID: #",
              order.id,
              "-",
              Date.now().toString().slice(-4),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Amount Paid: $",
              order.bill?.grand_total?.toFixed(2) || order.total_amount?.toFixed(2),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Date: ",
              (/* @__PURE__ */ new Date()).toLocaleDateString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsReceiptOpen(true), className: "flex-1 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                "View Receipt"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", className: "flex-1 py-3 bg-gold hover:bg-gold/90 transition-colors rounded-xl text-[#042416] text-sm font-medium cursor-pointer", children: "Return Home" })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
            opacity: 0,
            y: 10
          }, animate: {
            opacity: 1,
            y: 0
          }, exit: {
            opacity: 0,
            y: -10
          }, className: "p-6 sm:p-8 rounded-2xl border border-gold/20 bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-semibold text-[#042416] mb-4 border-b border-gray-100 pb-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#0B5D3B] text-2xl font-bold", children: [
                "$",
                order.bill?.grand_total?.toFixed(2) || order.total_amount?.toFixed(2)
              ] })
            ] }),
            paymentFlowState === "WAITING_CASHIER" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 text-center space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900", children: "Waiting for Cashier" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Please pay at the counter. This screen will update automatically once confirmed." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPaymentFlowState("IDLE"), className: "text-xs text-gray-400 hover:text-gray-600 underline mt-4 cursor-pointer", children: "Cancel" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: async () => {
              setPaymentFlowState("WAITING_CASHIER");
              try {
                await fetch(`http://localhost:8000/api/v1/payments/order/${order.id}/request-counter-payment`, {
                  method: "POST"
                });
              } catch (err) {
                console.error("Failed to request counter payment", err);
              }
            }, className: "py-4 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2 text-gray-700 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-6 h-6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "Pay at Counter" })
            ] }) })
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isReceiptOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, exit: {
        opacity: 0
      }, className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: () => setIsReceiptOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95,
        y: 20
      }, animate: {
        opacity: 1,
        scale: 1,
        y: 0
      }, exit: {
        opacity: 0,
        scale: 0.95,
        y: 20
      }, className: "relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-[#042416]", children: "Order Receipt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setIsReceiptOpen(false), className: "p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-y-auto p-4 sm:p-6 bg-gray-50/50 flex justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-white shadow-sm border rounded-xl overflow-hidden scale-[0.85] sm:scale-100 origin-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoicePreview, { orderType: order.order_type || order.type, paymentMethod: order.payment?.method || "CARD", tableNumber: order.table_number?.toString(), items: order.items?.map((item) => ({
          name: item.menu_item?.name || item.name,
          quantity: item.quantity,
          price: item.unit_price || item.price
        })), totals: {
          subtotal: order.bill?.subtotal || order.total_amount,
          tax: order.bill?.tax_amount || 0,
          serviceFee: order.bill?.service_fee || 0,
          total: order.bill?.grand_total || order.total_amount
        }, orderNumber: order.id?.toString(), date: new Date(order.created_at || Date.now()).toLocaleDateString(), time: new Date(order.created_at || Date.now()).toLocaleTimeString() }) }) })
      ] })
    ] }) })
  ] });
}
export {
  OrderTrackingPage as component
};
