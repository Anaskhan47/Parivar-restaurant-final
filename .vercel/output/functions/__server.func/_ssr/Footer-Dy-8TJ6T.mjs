import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
import { u as useCartStore } from "./cart-_Q1BESbT.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { S as ShoppingBag, a as Menu, X, b as MapPin, c as Phone, C as Clock, I as Instagram, F as Facebook, T as Twitter, d as Trash2, M as Minus, P as Plus } from "../_libs/lucide-react.mjs";
function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [orderType, setOrderType] = reactExports.useState("DINE_IN");
  const [tableId, setTableId] = reactExports.useState("");
  const [customerName, setCustomerName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const isValidPhone = /^\d{10}$/.test(phone.replace(/\D/g, ""));
  const { data: tables } = useQuery({
    queryKey: ["tables-public"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/tables");
      return res.json();
    },
    enabled: isOpen
  });
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const payload = orderType === "DINE_IN" ? {
        order_type: "DINE_IN",
        table_id: parseInt(tableId),
        items: items.map((i) => ({ menu_item_id: i.id, quantity: i.quantity, special_notes: i.notes || "" }))
      } : {
        order_type: "TAKE_AWAY",
        customer_name: customerName,
        customer_phone: phone,
        items: items.map((i) => ({ menu_item_id: i.id, quantity: i.quantity, special_notes: i.notes || "" }))
      };
      const res = await fetch("http://localhost:8000/api/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error("Failed to place order");
      }
      const order = await res.json();
      clearCart();
      onClose();
      navigate({ to: `/order-tracking/${order.id}` });
    } catch (err) {
      console.error(err);
      alert(err.message || "An error occurred while placing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose,
        className: "fixed inset-0 bg-black/40 backdrop-blur-sm z-[10000]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "spring", bounce: 0, duration: 0.4 },
        className: "fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[10001] flex flex-col",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gold/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold flex items-center gap-2 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 text-gold" }),
              "Your Cart"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "p-2 rounded-full hover:bg-black/5 transition-colors text-muted-foreground hover:text-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 flex flex-col gap-4", children: [
            items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-muted-foreground gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-16 h-16 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", children: "Your cart is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: onClose,
                  className: "text-gold font-medium hover:underline",
                  children: "Continue Browsing"
                }
              )
            ] }) : items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 p-4 rounded-xl border border-gold/10 bg-white/50 backdrop-blur-md relative", children: [
              item.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 shrink-0 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.image_url,
                  alt: item.name,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = logo;
                  }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-[15px] leading-tight text-foreground", children: item.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => removeItem(item.id),
                      className: "text-red-500/70 hover:text-red-500 transition-colors p-1",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-gold font-bold text-lg", children: [
                    "$",
                    (item.price * item.quantity).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-black/5 rounded-full px-2 py-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => updateQuantity(item.id, item.quantity - 1),
                        className: "w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors text-foreground",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm w-4 text-center text-foreground", children: item.quantity }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        onClick: () => updateQuantity(item.id, item.quantity + 1),
                        className: "w-6 h-6 flex items-center justify-center rounded-full hover:bg-white transition-colors text-foreground",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                      }
                    )
                  ] })
                ] })
              ] })
            ] }, item.id)),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-4 rounded-xl border border-gold/10 bg-white/30 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground", children: "Order Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Order Type" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setOrderType("DINE_IN"),
                      className: `flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${orderType === "DINE_IN" ? "bg-[#0B5D3B] text-[#F6E8D7] border-transparent" : "border-gold/20 text-muted-foreground hover:border-gold/40"}`,
                      children: "Dine-In"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setOrderType("TAKE_AWAY"),
                      className: `flex-1 py-2 rounded-lg border text-sm font-medium transition-all ${orderType === "TAKE_AWAY" ? "bg-[#0B5D3B] text-[#F6E8D7] border-transparent" : "border-gold/20 text-muted-foreground hover:border-gold/40"}`,
                      children: "Take-Away"
                    }
                  )
                ] })
              ] }),
              orderType === "DINE_IN" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Select Table" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "select",
                  {
                    value: tableId,
                    onChange: (e) => setTableId(e.target.value),
                    className: "w-full px-3 py-2 bg-background border border-gold/20 rounded-lg text-sm text-foreground focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Choose a Table --" }),
                      tables?.map((table) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: table.id, disabled: table.status === "OCCUPIED", children: [
                        "Table ",
                        table.table_number,
                        " (",
                        table.capacity,
                        " guests)",
                        table.status === "OCCUPIED" ? " - Occupied" : ""
                      ] }, table.id))
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: customerName,
                      onChange: (e) => setCustomerName(e.target.value),
                      placeholder: "Your Name",
                      className: "w-full px-3 py-2 bg-background border border-gold/20 rounded-lg text-sm text-foreground focus:outline-none focus:border-gold"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Phone Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "tel",
                      value: phone,
                      onChange: (e) => setPhone(e.target.value),
                      placeholder: "Your 10-digit Phone Number",
                      className: `w-full px-3 py-2 bg-background border ${phone && !isValidPhone ? "border-red-500/50" : "border-gold/20"} rounded-lg text-sm text-foreground focus:outline-none focus:border-gold`
                    }
                  ),
                  phone && !isValidPhone && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-red-500 mt-1 text-right", children: "Must be 10 digits" })
                ] })
              ] })
            ] })
          ] }),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-t border-gold/10 bg-white/50 backdrop-blur-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 text-xl font-bold text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold", children: [
                "$",
                getTotal().toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handlePlaceOrder,
                disabled: isSubmitting || orderType === "DINE_IN" && !tableId || orderType === "TAKE_AWAY" && (!customerName || !isValidPhone),
                className: "w-full bg-[#0B5D3B] text-[#F6E8D7] py-4 rounded-xl font-semibold tracking-wide hover:bg-[#D4A017] transition-all duration-300 shadow-md hover:shadow-gold-glow flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed",
                children: isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
const halalLogo = "/assets/halal-logo-Ds4rb4m5.png";
function HalalBadge({ className = "h-16 md:h-[4.5rem]" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center group ml-2 sm:ml-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: halalLogo,
      alt: "100% Halal Certified",
      className: `
          ${className}
          w-auto object-contain
          drop-shadow-sm hover:drop-shadow-[0_0_8px_rgba(212,160,23,0.4)]
          transition-all duration-300 transform group-hover:scale-[1.03]
        `
    }
  ) });
}
const links = [
  { label: "Home", hash: "home" },
  { label: "Today's Special", hash: "specials" },
  { label: "Menu", hash: "menu" },
  { label: "Catering", hash: "catering" },
  { label: "About", hash: "about" },
  { label: "Contact", hash: "contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const [isCartOpen, setIsCartOpen] = reactExports.useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.header,
      {
        initial: { y: -40, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "fixed rounded-4xl mt-2 top-0 inset-x-0 z-[9999] transition-all duration-500 flex items-center px-6 md:px-10",
        style: {
          height: "90px",
          background: scrolled ? "rgba(246, 232, 215, 0.25)" : "rgba(246, 232, 215, 0.12)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(16px)",
          borderBottom: "1px solid rgba(246, 232, 215, 0.15)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "w-full  flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", hash: "home", className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Restaurant — Timeless Indian Flavours", className: "h-16 md:h-[4.5rem] w-auto object-contain drop-shadow-sm" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(HalalBadge, { className: "h-20 md:h-[5.5rem]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden md:flex items-center gap-10 text-[15px] font-medium tracking-wide", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              hash: l.hash,
              className: "relative block transition-all duration-300 text-[#042416] hover:text-[#D4A017] hover:-translate-y-0.5 after:content-[''] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4A017] after:transition-all after:duration-300",
              children: l.label
            }
          ) }, l.hash)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 md:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/",
                hash: "menu",
                className: "hidden md:inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 hover:-translate-y-0.5 text-white bg-[#D4A017] hover:bg-[#E0B03D]",
                children: "ORDER NOW"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setIsCartOpen(true),
                className: "relative p-2 text-[#042416] hover:text-[#D4A017] transition-colors flex items-center justify-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6" }),
                  cartCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-red-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm", children: cartCount })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "aria-label": "Open menu",
                onClick: () => setOpen(true),
                className: "md:hidden p-2 transition-colors hover:bg-black/5 rounded-full text-[#042416]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-7 w-7" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[10000] flex flex-col",
        style: {
          background: "rgba(246, 232, 215, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 md:gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Restaurant", className: "h-20 w-auto object-contain drop-shadow-sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(HalalBadge, { className: "h-24" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen(false),
                "aria-label": "Close menu",
                className: "p-2 rounded-full hover:bg-black/5 transition-colors text-[#042416]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-8 w-8" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex-1 flex flex-col items-center justify-center gap-10 text-3xl font-display", children: [
            links.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.li,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.1 + i * 0.07 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    hash: l.hash,
                    onClick: () => setOpen(false),
                    className: "transition-colors duration-300 text-[#042416] hover:text-[#D4A017]",
                    children: l.label
                  }
                )
              },
              l.hash
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.5 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/",
                    hash: "menu",
                    onClick: () => setOpen(false),
                    className: "mt-6 inline-block px-10 py-4 rounded-full text-base font-semibold tracking-wider text-white bg-[#D4A017]",
                    children: "ORDER NOW"
                  }
                )
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartDrawer, { isOpen: isCartOpen, onClose: () => setIsCartOpen(false) })
  ] });
}
const bgImage = "/assets/backgroud-yvIqQl_M.png";
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { id: "contact", className: "relative pt-24 pb-10 border-t border-gold/20 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-px", style: { background: "var(--gradient-gold)" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bgImage, alt: "Watermark", className: "w-[800px] h-[800px] object-contain mix-blend-multiply" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-12 mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Restaurant", className: "h-24 w-auto object-contain" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed italic font-display", children: "Timeless Indian Flavours in Sydney" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-5", children: "Visit Us" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-start gap-3 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-gold mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "1/83 King Georges Rd, Wiley Park",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "NSW 2195, Australia"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4 text-gold" }),
            "+61 405 635 423"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-5", children: "Hours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-gold mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mon — Sun · 3:00 PM — 3:00 AM" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs uppercase tracking-[0.3em] text-gold mb-5", children: "Follow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://www.instagram.com/parivar.restaurantnsw/",
                target: "_blank",
                rel: "noreferrer",
                "aria-label": "Instagram link",
                className: "w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#",
                "aria-label": "Facebook link",
                className: "w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#",
                "aria-label": "Twitter link",
                className: "w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary-foreground transition-all",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Twitter, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: ["Home", "Menu", "Catering", "About"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `#${l.toLowerCase()}`, className: "hover:text-gold transition-colors", children: l }) }, l)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 border-t border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Parivar Restaurant. Crafted with reverence."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tracking-widest uppercase", children: "Hyderabad · Sydney" })
      ] })
    ] })
  ] });
}
export {
  Footer as F,
  Navbar as N
};
