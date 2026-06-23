import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCartStore } from "./cart-_Q1BESbT.mjs";
import { N as Navbar, F as Footer } from "./Footer-Dy-8TJ6T.mjs";
import { I as InvoicePreview } from "./InvoicePreview-CKehnKQJ.mjs";
import { Z } from "../_libs/react-to-print.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
import { A as ArrowLeft, e as Printer, D as Download, U as UtensilsCrossed } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const KitchenTicket = reactExports.forwardRef(
  ({ orderType, tableNumber }, ref) => {
    const { items } = useCartStore();
    const orderNumber = Math.floor(1e5 + Math.random() * 9e5).toString();
    const now = /* @__PURE__ */ new Date();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: "bg-white p-6 w-full max-w-sm mx-auto text-black",
        style: { fontFamily: "'Courier New', Courier, monospace" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-b-2 border-black pb-4 mb-4 flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Restaurant", className: "w-20 h-auto object-contain mb-2 grayscale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold uppercase mb-2", children: "KITCHEN TICKET" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold border border-black inline-block px-4 py-1", children: [
              orderType,
              " ",
              orderType === "Dine-In" && tableNumber ? `- TABLE ${tableNumber}` : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-6 border-b border-dashed border-gray-400 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Order: #",
              orderNumber
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: now.toLocaleDateString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: now.toLocaleTimeString() })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-lg mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-black text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 w-16", children: "QTY" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2", children: "ITEM" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-dashed border-gray-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 font-bold text-xl align-top", children: [
                item.quantity,
                " x"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 font-bold", children: [
                item.name,
                item.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-normal italic mt-1 bg-gray-100 p-1", children: [
                  "Note: ",
                  item.notes
                ] })
              ] })
            ] }, idx)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8 pt-4 border-t-2 border-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-xl uppercase tracking-widest", children: "End of Ticket" }) })
        ]
      }
    );
  }
);
KitchenTicket.displayName = "KitchenTicket";
function CheckoutPage() {
  const {
    items,
    getTotal
  } = useCartStore();
  const navigate = useNavigate();
  const [orderType, setOrderType] = reactExports.useState("Dine-In");
  const [paymentMethod, setPaymentMethod] = reactExports.useState("Credit Card");
  const [tableNumber, setTableNumber] = reactExports.useState("");
  const invoiceRef = reactExports.useRef(null);
  const kitchenTicketRef = reactExports.useRef(null);
  const handlePrintReceipt = Z({
    contentRef: invoiceRef,
    documentTitle: "Parivar_Receipt"
  });
  const handlePrintKitchen = Z({
    contentRef: kitchenTicketRef,
    documentTitle: "Parivar_Kitchen_Ticket"
  });
  const handleDownloadPDF = () => {
    handlePrintReceipt();
  };
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground pt-32 flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display text-gold mb-6", children: "Your Cart is Empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/menu", className: "bg-[#0B5D3B] text-white px-8 py-3 rounded-full hover:bg-gold transition-colors", children: "Return to Menu" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-[#F6E8D7]/30 text-foreground overflow-x-hidden pt-32 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 py-10 flex-1 max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/menu"
      }), className: "inline-flex items-center gap-2 text-[#042416] hover:text-[#D4A017] transition-colors font-medium mb-8 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 transition-transform group-hover:-translate-x-1" }),
        "Back to Menu"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl text-[#042416] mb-10", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-8 rounded-2xl border border-gold/20 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display mb-6", children: "Order Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-3", children: "Order Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrderType("Dine-In"), className: `flex-1 py-3 rounded-xl border-2 transition-all ${orderType === "Dine-In" ? "border-[#0B5D3B] bg-[#0B5D3B]/10 text-[#0B5D3B] font-bold" : "border-gray-200 text-gray-500 hover:border-gold/50"}`, children: "Dine-In" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrderType("Take-Away"), className: `flex-1 py-3 rounded-xl border-2 transition-all ${orderType === "Take-Away" ? "border-[#0B5D3B] bg-[#0B5D3B]/10 text-[#0B5D3B] font-bold" : "border-gray-200 text-gray-500 hover:border-gold/50"}`, children: "Take-Away" })
                ] })
              ] }),
              orderType === "Dine-In" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Table Number" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: tableNumber, onChange: (e) => setTableNumber(e.target.value), placeholder: "e.g. 12", className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Payment Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: paymentMethod, onChange: (e) => setPaymentMethod(e.target.value), className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Credit Card" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Cash" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "EFTPOS" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-8 rounded-2xl border border-gold/20 shadow-sm flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display mb-2", children: "Billing Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handlePrintReceipt(), className: "w-full bg-[#042416] text-white py-3 rounded-xl hover:bg-[#D4A017] transition flex justify-center items-center gap-2 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-5 h-5" }),
              "Print Receipt"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleDownloadPDF, className: "w-full border-2 border-[#042416] text-[#042416] py-3 rounded-xl hover:bg-[#042416] hover:text-white transition flex justify-center items-center gap-2 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
              "Download PDF Invoice"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handlePrintKitchen(), className: "w-full bg-red-900 text-white py-3 rounded-xl hover:bg-red-800 transition flex justify-center items-center gap-2 font-medium mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-5 h-5" }),
              "Print Kitchen Ticket"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display mb-4 text-[#042416] opacity-70 px-4", children: "Invoice Preview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-gold/20 shadow-xl bg-white relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 bg-[#D4A017] text-white px-4 py-1 text-xs font-bold uppercase rounded-bl-xl z-10", children: "Live Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scale-90 sm:scale-100 origin-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InvoicePreview, { ref: invoiceRef, orderType, paymentMethod, tableNumber }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KitchenTicket, { ref: kitchenTicketRef, orderType, tableNumber }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  CheckoutPage as component
};
