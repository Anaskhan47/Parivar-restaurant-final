import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useNotificationStore } from "./useNotificationStore-jdohmSTb.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
import { L as LayoutDashboard, G as Grid3x3, f as Utensils, R as Receipt, g as CalendarDays, h as CirclePlus, i as Sparkles, j as FolderOpen, k as Users, l as Settings, m as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/zustand.mjs";
function useWebSocket() {
  const queryClient = useQueryClient();
  const ws = reactExports.useRef(null);
  const isConnecting = reactExports.useRef(false);
  reactExports.useEffect(() => {
    let reconnectTimeout;
    let pingInterval;
    const connect = () => {
      if (ws.current?.readyState === WebSocket.OPEN || isConnecting.current) return;
      isConnecting.current = true;
      const socket = new WebSocket("ws://localhost:8000/ws");
      ws.current = socket;
      socket.onopen = () => {
        console.log("WebSocket Connected");
        isConnecting.current = false;
        pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "PING" }));
          }
        }, 3e4);
      };
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "PONG") return;
          console.log("WS Message:", message);
          switch (message.type) {
            case "ORDER_CREATED":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["tables"] });
              toast.success(`New order received for Table ${message.data.table_number || message.data.table_id || "Take-away"}`);
              break;
            case "ORDER_ACCEPTED":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
              toast.info(`Order #${message.data.id} sent to kitchen`);
              break;
            case "ORDER_PREPARING":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
              break;
            case "ORDER_READY":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
              toast.success(`Order #${message.data.id} is ready for serving!`);
              break;
            case "ORDER_COMPLETED":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
              break;
            case "ORDER_STATUS_CHANGED":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
              queryClient.invalidateQueries({ queryKey: ["tables"] });
              break;
            case "BILL_GENERATED":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              toast.success(`Bill generated for Order #${message.data.order_id}`);
              break;
            case "TABLE_UPDATED":
              queryClient.invalidateQueries({ queryKey: ["tables"] });
              break;
            case "KITCHEN_ITEM_UPDATED":
              queryClient.invalidateQueries({ queryKey: ["kitchen-queue"] });
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              break;
            case "PAYMENT_COMPLETED":
              queryClient.invalidateQueries({ queryKey: ["orders"] });
              queryClient.invalidateQueries({ queryKey: ["tables"] });
              queryClient.invalidateQueries({ queryKey: ["payments"] });
              toast.success(`Payment of $${message.data.amount} completed for Order #${message.data.order_id}`);
              break;
            case "PAYMENT_REQUESTED":
              useNotificationStore.getState().incrementBillingBadge();
              toast.info(`Payment Request: ${message.data.message}`, { duration: 1e4 });
              break;
            default:
              break;
          }
        } catch (err) {
          console.error("Error parsing WS message:", err);
        }
      };
      socket.onclose = () => {
        console.log("WebSocket Disconnected. Attempting to reconnect...");
        isConnecting.current = false;
        clearInterval(pingInterval);
        reconnectTimeout = setTimeout(connect, 3e3);
      };
    };
    connect();
    return () => {
      clearTimeout(reconnectTimeout);
      clearInterval(pingInterval);
      if (ws.current) {
        ws.current.onclose = null;
        ws.current.close();
        ws.current = null;
        isConnecting.current = false;
      }
    };
  }, [queryClient]);
}
function AdminLayout() {
  const {
    user,
    isLoading,
    logout
  } = useAuth();
  const navigate = useNavigate();
  useWebSocket();
  const billingBadgeCount = useNotificationStore((state) => state.billingBadgeCount);
  const isLoginPage = typeof window !== "undefined" && window.location.pathname === "/admin/login";
  reactExports.useEffect(() => {
    if (!isLoading && !user && !isLoginPage) {
      navigate({
        to: "/admin/login",
        replace: true
      });
    }
  }, [user, isLoading, isLoginPage, navigate]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" }) });
  }
  if (!user && !isLoginPage) {
    return null;
  }
  if (isLoginPage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-6 border-b border-gray-200 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Logo", className: "h-16 w-auto object-contain drop-shadow-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-[#0B5D3B]", children: "Parivar OS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { size: 20 }), label: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/floor", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { size: 20 }), label: "Floor View" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/kitchen", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { size: 20 }), label: "Kitchen Command" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/billing", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { size: 20 }), label: "Billing & Payments", badgeCount: billingBadgeCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/catering", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 20 }), label: "Catering" }),
        user?.role === "SUPER_ADMIN" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider", children: "Management" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/addons", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { size: 20 }), label: "Add-ons" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/specials", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20 }), label: "Today's Special" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/categories", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 20 }), label: "Categories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/menu", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { size: 20 }), label: "Menu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/users", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }), label: "Staff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavItem, { to: "/admin/settings", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 20 }), label: "Settings" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#0B5D3B] text-white flex items-center justify-center font-bold", children: user?.username.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-gray-900 truncate", children: user?.username }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 truncate", children: user?.role })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          logout();
          navigate({
            to: "/admin/login"
          });
        }, className: "text-gray-400 hover:text-red-600 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 18 }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 flex flex-col h-screen overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Logo", className: "h-10 w-auto object-contain drop-shadow-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-[#0B5D3B]", children: "Parivar OS" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          logout();
          navigate({
            to: "/admin/login"
          });
        }, className: "text-gray-400 hover:text-red-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 20 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto p-4 md:p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
function NavItem({
  to,
  icon,
  label,
  badgeCount
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, activeProps: {
    className: "bg-[#0B5D3B]/10 text-[#0B5D3B]"
  }, inactiveProps: {
    className: "text-gray-600 hover:bg-gray-50"
  }, className: "flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-colors", activeOptions: {
    exact: to === "/admin"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      icon,
      label
    ] }),
    badgeCount !== void 0 && badgeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-bounce", children: badgeCount })
  ] });
}
export {
  AdminLayout as component
};
