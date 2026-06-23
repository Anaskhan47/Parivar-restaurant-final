import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navbar, F as Footer } from "./Footer-Dy-8TJ6T.mjs";
import { g as gsapWithCSS, S as ScrollTrigger } from "../_libs/gsap.mjs";
import { u as useCartStore } from "./cart-_Q1BESbT.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useScroll, a as useTransform, m as motion } from "../_libs/framer-motion.mjs";
import { H as Heart, B as Briefcase, k as Users, i as Sparkles, Q as Quote, n as Star, M as Minus, P as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/zustand.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const heroBg = "/assets/biryani-CKS7Yyo-.mp4";
function Hero() {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "home", ref, className: "relative min-h-screen overflow-hidden flex items-center justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { scale }, className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "video",
        {
          src: heroBg,
          autoPlay: true,
          loop: true,
          muted: true,
          className: "w-full h-[60vh] md:h-screen object-cover scale-[1.02]",
          width: 1920,
          height: 1080
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/30" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.span,
      {
        className: "absolute rounded-full",
        style: {
          left: `${i * 53 % 100}%`,
          top: `${i * 37 % 100}%`,
          width: 2 + i % 4,
          height: 2 + i % 4,
          background: "var(--gold)",
          boxShadow: "0 0 12px var(--gold)"
        },
        animate: {
          y: [0, -40, 0],
          opacity: [0.2, 0.9, 0.2]
        },
        transition: {
          duration: 6 + i % 5,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut"
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center relative z-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        style: { y, opacity },
        className: "relative z-10 text-center px-6 max-w-5xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.3 },
              className: "gold-divider justify-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-12 bg-gold/50" }),
                "Est. Sydney",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-12 bg-gold/50" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1.2, delay: 0.5 },
              className: "font-display text-7xl sm:text-8xl md:text-[10rem] leading-[0.95] mb-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "PARIVAR" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 1 },
              className: "font-display italic text-xl sm:text-2xl md:text-3xl text-cream/90 mb-12",
              children: "Timeless Indian Flavours in Sydney"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 1.2 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: "#menu",
                    className: "group relative inline-flex items-center justify-center px-10 py-4 rounded-full text-sm uppercase tracking-[0.25em] font-medium text-primary-foreground overflow-hidden shadow-gold-glow transition-transform hover:scale-105",
                    style: { background: "var(--gradient-gold)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10", children: "Dine In" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-500" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "#menu",
                    className: "group relative inline-flex items-center justify-center px-10 py-4 rounded-full text-sm uppercase tracking-[0.25em] font-medium text-gold border border-gold/60 hover:bg-gold hover:text-primary-foreground transition-all duration-500",
                    children: "Take Away"
                  }
                )
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 2 },
        className: "absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/70 text-xs tracking-[0.3em] uppercase",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          "Scroll",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.span,
            {
              animate: { y: [0, 8, 0] },
              transition: { duration: 2, repeat: Infinity },
              className: "h-10 w-px bg-gradient-to-b from-gold to-transparent"
            }
          )
        ] })
      }
    )
  ] });
}
const bowl = "/assets/biryani-dish-I2uhYGCr.png";
function BiryaniPlate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: bowl,
      alt: "Hyderabadi biryani",
      className: "parivar-biryani-plate pointer-events-none absolute left-1/2 top-[46%] z-20 h-[330px] w-auto -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-[0_28px_70px_oklch(0_0_0_/_0.28)] sm:h-[430px] lg:h-[560px]",
      draggable: false
    }
  );
}
const legPiece = "/assets/leg-piece-CC0_ZYsA.png";
const tandooriLegPieces = "/assets/tandoori-leg-pieces-0PhZYBP4.png";
gsapWithCSS.registerPlugin(ScrollTrigger);
function IngredientExplosion() {
  const sectionRef = reactExports.useRef(null);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia("(max-width: 639px)").matches);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  reactExports.useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsapWithCSS.context(() => {
      const tl = gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1800",
          scrub: true,
          pin: true
        }
      });
      tl.set(".parivar-flying-leg", {
        opacity: 1,
        x: "-50%",
        y: "-50%",
        rotate: -8,
        scale: 0.56
      });
      tl.set(".parivar-tandoori-group", {
        opacity: 0,
        x: "-50%",
        y: "-50%",
        scale: 0.86
      });
      tl.to(
        ".parivar-biryani-plate",
        {
          opacity: 0,
          rotate: 9,
          scale: 0.78,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power2.inOut"
        },
        0
      );
      tl.to(
        ".parivar-flying-leg",
        {
          // left: "58%",
          left: isMobile ? "58%" : "58%",
          top: "37%",
          rotate: -10,
          scale: 0.52,
          duration: 0.9,
          ease: "power2.inOut"
        },
        0.22
      );
      tl.to(
        ".parivar-tandoori-group",
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        },
        0.75
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: sectionRef, className: "relative h-screen overflow-hidden bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,oklch(0.72_0.14_70_/_0.22),transparent_40%),radial-gradient(circle_at_68%_46%,oklch(0.32_0.09_155_/_0.11),transparent_38%),linear-gradient(180deg,oklch(0.97_0.02_85)_0%,oklch(0.95_0.04_75)_100%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-[45%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[140px] md:h-[560px] md:w-[560px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BiryaniPlate, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: legPiece,
        alt: "Chicken leg piece",
        className: "parivar-flying-leg pointer-events-none absolute left-[56%] top-[36%] z-30 h-[340px] w-auto select-none drop-shadow-[0_30px_80px_oklch(0_0_0_/_0.34)] sm:left-[54%] sm:top-[34%] sm:h-[450px] lg:h-[560px]",
        draggable: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: tandooriLegPieces,
        alt: "Tandoori leg pieces",
        className: "parivar-tandoori-group pointer-events-none absolute left-1/2 top-1/2 z-20 h-[430px] w-auto select-none drop-shadow-[0_34px_90px_oklch(0_0_0_/_0.26)] sm:h-[540px] lg:h-[650px]",
        draggable: false
      }
    )
  ] });
}
function ParivarElements() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Parivar signature food animations", className: "bg-background text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IngredientExplosion, {}) });
}
function OrderableItemSection({ id, category, title, subtitle, fallbackItems }) {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  reactExports.useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/api/v1/menu?category=${encodeURIComponent(category)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        const available = (data || []).filter((item) => item.is_available !== false);
        setItems(available.length > 0 ? available : fallbackItems);
      } catch {
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);
  const getItemId = (item) => item.id ? String(item.id) : item.name;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id, className: "py-32 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider justify-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" }),
        " ",
        title,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl md:text-6xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: subtitle })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: items.map((item, i) => {
      const itemId = getItemId(item);
      const cartItem = cartItems.find((c) => c.id === itemId);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.5, delay: i * 0.06 },
          className: "glass rounded-2xl overflow-hidden border border-gold/10 hover:shadow-gold-glow transition-all duration-300 flex flex-col",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image_url || item.img,
                alt: item.name,
                loading: "lazy",
                onError: (e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = logo;
                },
                className: "w-full h-full object-cover"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-foreground", children: item.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gold font-display text-lg font-bold whitespace-nowrap", children: [
                  "$",
                  item.price.toFixed(2)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed flex-1", children: item.description || item.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: cartItem ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-[#0B5D3B]/10 rounded-full px-1 py-1 border border-[#0B5D3B]/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => updateQuantity(cartItem.id, cartItem.quantity - 1),
                    className: "bg-background hover:bg-muted text-[#0B5D3B] w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-[#0B5D3B] min-w-[1.5rem] text-center", children: cartItem.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => updateQuantity(cartItem.id, cartItem.quantity + 1),
                    className: "bg-[#0B5D3B] hover:bg-[#094A2F] text-cream w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => addItem({
                    id: itemId,
                    name: item.name,
                    price: item.price,
                    image_url: item.image_url || item.img
                  }),
                  className: "bg-[#0B5D3B] text-cream px-5 py-2 rounded-full font-medium hover:bg-[#D4A017] transition-colors flex items-center gap-2 text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    "Add to Cart"
                  ]
                }
              ) })
            ] })
          ]
        },
        itemId
      );
    }) })
  ] }) });
}
const fallbackSpecials = [
  { name: "Chef's Dum Biryani", desc: "Today's slow-cooked lamb biryani with saffron rice", price: 18.99, image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop" },
  { name: "Royal Haleem Bowl", desc: "Limited batch heritage haleem — only today", price: 14.99, image_url: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?q=80&w=800&auto=format&fit=crop" },
  { name: "Tandoori Platter Special", desc: "Mixed grill with naan and chutney — today's deal", price: 22.99, image_url: "https://images.unsplash.com/photo-1599487405902-1823ebce1711?q=80&w=800&auto=format&fit=crop" }
];
function TodaysSpecials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    OrderableItemSection,
    {
      id: "specials",
      category: "Today's Special",
      title: "Today's Special",
      subtitle: "Fresh picks from our kitchen — updated daily by the chef.",
      fallbackItems: fallbackSpecials
    }
  );
}
const categories = [
  { name: "Entrée", img: "/menu-images/Entree/chicken tikka.png", desc: "Tandoori & starters" },
  { name: "Naan Bread", img: "/menu-images/Naan Bread/butter naan.png", desc: "Fresh baked breads" },
  { name: "Savory Items", img: "/menu-images/Savory Items/samosa 2 pcs.png", desc: "Momos & samosas" },
  { name: "Chicken Curries", img: "/menu-images/Chicken Curries/butter chicken.png", desc: "Rich chicken gravies" },
  { name: "Mutton Curries", img: "/menu-images/Mutton Curries/mutton masala.png", desc: "Tender mutton dishes" },
  { name: "Vegetarian Curries", img: "/menu-images/Vegetarian Curries/paneer tikka masala.png", desc: "Paneer & daal" },
  { name: "Desi Chinese", img: "/menu-images/Desi Chinese/chicken fried  rice.png", desc: "Indo-Chinese fusion" },
  { name: "Desserts", img: "/menu-images/Desserts/gulab jamun.png", desc: "Sweet endings" },
  { name: "Drinks", img: "/menu-images/Drinks/chai small.png", desc: "Chai & lassi" }
];
function Categories() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "menu", className: "py-32 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider justify-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" }),
        " Our Curated Menu ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl md:text-7xl mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "A Royal Spread" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "Authentic flavours from our kitchen, each dish crafted with care and tradition." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8", children: categories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/menu",
        search: { category: cat.name },
        className: "block outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl group",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-80px" },
            transition: { duration: 0.6, delay: i * 0.05 },
            className: "group relative h-full glass rounded-2xl overflow-hidden text-center cursor-pointer transition-all duration-500 hover:shadow-gold-glow flex flex-col hover:-translate-y-2 border border-gold/10",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 w-full overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: cat.img,
                  alt: cat.name,
                  loading: "lazy",
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 relative flex-1 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-2 text-foreground group-hover:text-gold transition-colors", children: cat.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: cat.desc })
              ] })
            ]
          }
        )
      },
      cat.name
    )) })
  ] }) });
}
const biryani = "/assets/dish-biryani-D9O6Wxm1.jpg";
const haleem = "/assets/dish-haleem-BdSbp8S4.jpg";
const grill = "/assets/dish-grill-Dixx2Vat.jpg";
const dishes = [
  {
    img: biryani,
    name: "Hyderabadi Dum Biryani",
    desc: "Slow-cooked basmati layered with saffron-marinated lamb, sealed under dough — the crown jewel of Nizami cuisine.",
    price: "$32",
    tag: "Signature"
  },
  {
    img: haleem,
    name: "Royal Haleem",
    desc: "A velvet stew of wheat, lentils and tender meat, kissed with ghee and fried onions — a centuries-old ritual.",
    price: "$26",
    tag: "Heritage"
  },
  {
    img: grill,
    name: "Shahi Mixed Grill",
    desc: "Seekh kebab, chicken tikka and lamb chops — charred over open flame, served sizzling on brass.",
    price: "$38",
    tag: "Chef's Choice"
  }
];
function SignatureDishes() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider justify-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" }),
        " Signature Creations ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl", children: [
        "The ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient italic", children: "Chef's" }),
        " Table"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: dishes.map((dish, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.article,
      {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, delay: i * 0.15 },
        className: "group relative rounded-2xl overflow-hidden glass shadow-luxury",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: dish.img,
                alt: dish.name,
                loading: "lazy",
                width: 1024,
                height: 1280,
                className: "w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/50 px-3 py-1 rounded-full backdrop-blur-md bg-background/50", children: dish.tag })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 inset-x-0 p-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl text-foreground group-hover:text-gold transition-colors", children: dish.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-gold whitespace-nowrap", children: dish.price })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: dish.desc })
          ] })
        ]
      },
      dish.name
    )) })
  ] }) });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "about", className: "py-32 relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 1 },
        className: "relative",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square max-w-md mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -inset-4 rounded-full opacity-30 blur-3xl",
              style: { background: "var(--gradient-gold)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative glass rounded-full p-12 aspect-square flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar emblem", className: "w-full h-full object-contain" }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 40 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" }),
            " Our Story"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-6xl mb-8 leading-tight", children: [
            "A Family.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient italic", children: "A Heritage." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "A Feast."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground leading-loose mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold font-display text-2xl", children: "Parivar" }),
            " — meaning ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "family" }),
            " — was born from a longing for the bustling kitchens of old Hyderabad. From the cobbled lanes of Charminar to the harbour lights of Sydney, we have carried recipes whispered down generations, each spice measured by hand, each biryani sealed with reverence."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-loose mb-10", children: "Every dish on our table tells a story — of Nizami nobility, of monsoon afternoons, of grandmothers and their secrets. To dine with us is to be welcomed not as a guest, but as kin." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-6 pt-8 border-t border-gold/20", children: [
            { num: "1947", label: "Recipes Since" },
            { num: "200+", label: "Dishes Curated" },
            { num: "10K+", label: "Happy Families" }
          ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-gold mb-1", children: s.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: s.label })
          ] }, s.label)) })
        ]
      }
    )
  ] }) });
}
const events = [
  { icon: Heart, title: "Weddings", desc: "Regal banquets crafted for your most sacred day." },
  { icon: Briefcase, title: "Corporate Events", desc: "Refined hospitality for boardrooms and galas." },
  { icon: Users, title: "Family Gatherings", desc: "Intimate feasts where every guest feels at home." },
  { icon: Sparkles, title: "Community Events", desc: "Grand spreads for festivals and celebrations." }
];
function Catering() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "catering", className: "py-32 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
      background: "radial-gradient(ellipse at center, oklch(0.38 0.14 22 / 0.15), transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider justify-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" }),
          " Bespoke Catering ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl mb-4", children: [
          "Bring Parivar to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient italic", children: "Your Table" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "From intimate gatherings to grand celebrations across Sydney — we bring the kitchen to you." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16", children: events.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: i * 0.1 },
          className: "glass rounded-xl p-8 border-t-2 border-t-gold/40 hover:border-t-gold hover:-translate-y-2 transition-all duration-500",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(e.icon, { className: "w-9 h-9 text-gold mb-5", strokeWidth: 1.2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mb-2", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: e.desc })
          ]
        },
        e.title
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#contact",
          className: "inline-flex items-center justify-center px-10 py-4 rounded-full text-sm uppercase tracking-[0.25em] font-medium text-primary-foreground shadow-gold-glow hover:scale-105 transition-transform",
          style: { background: "var(--gradient-gold)" },
          children: "Book Catering"
        }
      ) })
    ] })
  ] });
}
const reviews = [
  {
    name: "Hera Hafeez",
    role: "Local Guide · Google Review",
    text: "Mashallah 🌺🌹💕 Halal food!! Amazing food - fantastic!! We ordered chicken tandoori, biryani, seekh kebab and naan. The owner Saeed gave us free complimentary dessert!!"
  },
  {
    name: "Ibrahim Charniya",
    role: "Google Review",
    text: "Excellent Food & Good Service! Parivar is one of the best food places in the Wiley Park area. If you are looking for authenticity, rich flavours and high quality meals this is the place to go."
  },
  {
    name: "Jameel Ahmed",
    role: "Local Guide · Google Review",
    text: "Had Hyderabadi Haleem, it was too delicious. Loved Mango Lassi. And the Rasmalai was just awesome, I highly recommend this restaurant. Most important thing it is HALAL, and it is opened till midnight. The BEST HYDERABADI FOOD I have ever had in Australia."
  }
];
function Testimonials() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gold-divider justify-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" }),
        " Kind Words ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-10 bg-gold/40" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl", children: [
        "From Our ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient italic", children: "Parivar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-8", children: reviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.figure,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, delay: i * 0.15 },
        className: "glass rounded-2xl p-8 relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "absolute top-6 right-6 w-10 h-10 text-gold/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-5", children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-gold text-gold" }, k)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display italic text-lg text-foreground/90 leading-relaxed mb-6", children: [
            '"',
            r.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "border-t border-gold/20 pt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg text-gold", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: r.role })
          ] })
        ]
      },
      r.name
    )) })
  ] }) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ParivarElements, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TodaysSpecials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Categories, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignatureDishes, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Catering, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
