import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useCartStore } from "./cart-_Q1BESbT.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
const InvoicePreview = reactExports.forwardRef(
  ({
    orderType,
    paymentMethod,
    tableNumber,
    items: propItems,
    totals: propTotals,
    orderNumber: propOrderNumber,
    date: propDate,
    time: propTime
  }, ref) => {
    const { items: cartItems, getTotal } = useCartStore();
    const displayOrderType = orderType === "DINE_IN" ? "Dine-In" : orderType === "TAKE_AWAY" ? "Take-Away" : orderType;
    const itemsToRender = propItems || cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    const subtotal = propTotals ? propTotals.subtotal : getTotal();
    const tax = propTotals ? propTotals.tax : subtotal * 0.1;
    const serviceFee = propTotals ? propTotals.serviceFee : void 0;
    const total = propTotals ? propTotals.total : subtotal + tax;
    const displayOrderNumber = propOrderNumber || Math.floor(1e5 + Math.random() * 9e5).toString();
    const displayDate = propDate || (/* @__PURE__ */ new Date()).toLocaleDateString();
    const displayTime = propTime || (/* @__PURE__ */ new Date()).toLocaleTimeString();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: "bg-white p-10 mx-auto border shadow-lg max-w-2xl text-[#042416]",
        style: { fontFamily: "'Inter', sans-serif" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center border-b pb-6 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Restaurant", className: "w-28 h-auto object-contain mb-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-600", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "123 Sydney Street, NSW 2000" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Phone: +61 2 1234 5678" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Email: hello@parivarsydney.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-8 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Order Details:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Order #: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: displayOrderNumber })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Date: ",
                displayDate
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Time: ",
                displayTime
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: "Order Type:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-[#D4A017] uppercase", children: displayOrderType }),
              tableNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                "Table: ",
                tableNumber
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-gray-500", children: [
                "Payment: ",
                paymentMethod
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b-2 border-[#042416] text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 font-semibold", children: "Item" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-center font-semibold", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-semibold", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-right font-semibold", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: itemsToRender.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 font-medium", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-center", children: item.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-right", children: [
                "$",
                item.price.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 text-right font-medium", children: [
                "$",
                (item.price * item.quantity).toFixed(2)
              ] })
            ] }, idx)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-64", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                subtotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tax (GST 10%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                tax.toFixed(2)
              ] })
            ] }),
            serviceFee !== void 0 && serviceFee > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Service Fee (5%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "$",
                serviceFee.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-2 mt-2 border-t-2 border-[#042416] text-lg font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#D4A017]", children: [
                "$",
                total.toFixed(2)
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-t pt-6 text-sm text-gray-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#042416] mb-1", children: "Thank you for dining with Parivar!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Please come again." })
          ] })
        ]
      }
    );
  }
);
InvoicePreview.displayName = "InvoicePreview";
export {
  InvoicePreview as I
};
