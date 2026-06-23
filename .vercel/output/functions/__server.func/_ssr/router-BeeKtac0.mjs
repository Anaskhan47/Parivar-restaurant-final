import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
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
const appCss = "/assets/styles-eLbzLDmR.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const AuthContext = reactExports.createContext(void 0);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [token, setToken] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    const storedToken = localStorage.getItem("parivar_admin_token");
    if (storedToken) {
      fetch("http://localhost:8000/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` }
      }).then((res) => {
        if (res.ok) return res.json();
        throw new Error("Invalid token");
      }).then((userData) => {
        setToken(storedToken);
        setUser(userData);
      }).catch(() => {
        localStorage.removeItem("parivar_admin_token");
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);
  const login = (newToken, newUser) => {
    localStorage.setItem("parivar_admin_token", newToken);
    setToken(newToken);
    setUser(newUser);
  };
  const logout = () => {
    localStorage.removeItem("parivar_admin_token");
    setToken(null);
    setUser(null);
    queryClient.clear();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: { user, token, login, logout, isLoading }, children });
}
function useAuth() {
  const context = reactExports.useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@100..900&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true })
  ] }) });
}
const $$splitComponentImporter$g = () => import("./menu-BkWaaItz.mjs");
const Route$g = createFileRoute("/menu")({
  validateSearch: (search) => {
    return {
      category: search.category || void 0
    };
  },
  head: () => ({
    meta: [{
      title: "Menu | Parivar Restaurant"
    }, {
      name: "description",
      content: "Explore the authentic Indian and Hyderabadi menu at Parivar Restaurant in Sydney. Delicious biryani, curries, and tandoori."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./checkout-B8Wdd12h.mjs");
const Route$f = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout | Parivar Restaurant"
    }, {
      name: "description",
      content: "Complete your order at Parivar Restaurant."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin-BcekDe1J.mjs");
const Route$e = createFileRoute("/admin")({
  beforeLoad: ({
    location
  }) => {
  },
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-C_uU8E6b.mjs");
const Route$d = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Parivar Restaurant — Timeless Indian Flavours in Sydney"
    }, {
      name: "description",
      content: "Parivar Restaurant brings authentic Hyderabadi fine dining to Sydney — biryani, kebabs, and royal Nizami heritage served as family."
    }, {
      property: "og:title",
      content: "Parivar Restaurant — Timeless Indian Flavours in Sydney"
    }, {
      property: "og:description",
      content: "Authentic Hyderabadi luxury dining in Sydney. Dine in, take away, or book catering."
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Parivar Restaurant",
        "image": "https://parivar-restaurant.com/logo.png",
        "@id": "https://parivar-restaurant.com",
        "url": "https://parivar-restaurant.com",
        "telephone": "+61 2 1234 5678",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Sydney Street",
          "addressLocality": "Sydney",
          "addressRegion": "NSW",
          "postalCode": "2000",
          "addressCountry": "AU"
        },
        "servesCuisine": ["Indian", "Hyderabadi"],
        "priceRange": "$$"
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-Btl3ggjf.mjs");
const Route$c = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./order-tracking._orderId-CDAyeCs_.mjs");
const Route$b = createFileRoute("/order-tracking/$orderId")({
  head: () => ({
    meta: [{
      title: "Track Order | Parivar Restaurant"
    }, {
      name: "description",
      content: "Track the status of your Parivar Restaurant order."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./users-DGhjb8-R.mjs");
const Route$a = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./specials-ClCjQ59W.mjs");
const Route$9 = createFileRoute("/admin/specials")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./settings-DaWyL22Y.mjs");
const Route$8 = createFileRoute("/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./menu-BY3x7NYi.mjs");
const Route$7 = createFileRoute("/admin/menu")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-C8Ay670f.mjs");
const Route$6 = createFileRoute("/admin/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./kitchen-BZ3Yfonr.mjs");
const Route$5 = createFileRoute("/admin/kitchen")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./floor-BXI5VOBO.mjs");
const Route$4 = createFileRoute("/admin/floor")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./catering-pSSnhkC0.mjs");
const Route$3 = createFileRoute("/admin/catering")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./categories-D-EcWmAN.mjs");
const Route$2 = createFileRoute("/admin/categories")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./billing-CO_IFsfp.mjs");
const Route$1 = createFileRoute("/admin/billing")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./addons-CQVqgF5V.mjs");
const Route = createFileRoute("/admin/addons")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MenuRoute = Route$g.update({
  id: "/menu",
  path: "/menu",
  getParentRoute: () => Route$h
});
const CheckoutRoute = Route$f.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$h
});
const AdminRoute = Route$e.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const AdminIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const OrderTrackingOrderIdRoute = Route$b.update({
  id: "/order-tracking/$orderId",
  path: "/order-tracking/$orderId",
  getParentRoute: () => Route$h
});
const AdminUsersRoute = Route$a.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRoute
});
const AdminSpecialsRoute = Route$9.update({
  id: "/specials",
  path: "/specials",
  getParentRoute: () => AdminRoute
});
const AdminSettingsRoute = Route$8.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminRoute
});
const AdminMenuRoute = Route$7.update({
  id: "/menu",
  path: "/menu",
  getParentRoute: () => AdminRoute
});
const AdminLoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRoute
});
const AdminKitchenRoute = Route$5.update({
  id: "/kitchen",
  path: "/kitchen",
  getParentRoute: () => AdminRoute
});
const AdminFloorRoute = Route$4.update({
  id: "/floor",
  path: "/floor",
  getParentRoute: () => AdminRoute
});
const AdminCateringRoute = Route$3.update({
  id: "/catering",
  path: "/catering",
  getParentRoute: () => AdminRoute
});
const AdminCategoriesRoute = Route$2.update({
  id: "/categories",
  path: "/categories",
  getParentRoute: () => AdminRoute
});
const AdminBillingRoute = Route$1.update({
  id: "/billing",
  path: "/billing",
  getParentRoute: () => AdminRoute
});
const AdminAddonsRoute = Route.update({
  id: "/addons",
  path: "/addons",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminAddonsRoute,
  AdminBillingRoute,
  AdminCategoriesRoute,
  AdminCateringRoute,
  AdminFloorRoute,
  AdminKitchenRoute,
  AdminLoginRoute,
  AdminMenuRoute,
  AdminSettingsRoute,
  AdminSpecialsRoute,
  AdminUsersRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  CheckoutRoute,
  MenuRoute,
  OrderTrackingOrderIdRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$g as R,
  Route$b as a,
  router as r,
  useAuth as u
};
