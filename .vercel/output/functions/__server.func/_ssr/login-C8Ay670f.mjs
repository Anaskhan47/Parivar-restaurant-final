import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { l as logo } from "./parivar-logo-BUUpiIB8.mjs";
import "../_libs/sonner.mjs";
import { J as User, N as Lock } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
function AdminLogin() {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData.toString()
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }
      const profileResponse = await fetch("http://localhost:8000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${data.access_token}`
        }
      });
      const userData = await profileResponse.json();
      login(data.access_token, userData);
      navigate({
        to: "/admin"
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#042416] flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white rounded-2xl shadow-xl p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Parivar Restaurant", className: "h-32 w-auto mb-4 object-contain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900 font-display tracking-wide", children: "COMMAND CENTER" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Sign in to manage operations" })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center font-medium", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm transition-colors", placeholder: "admin", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] sm:text-sm transition-colors", placeholder: "••••••••", required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isLoading, className: "w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#0B5D3B] hover:bg-[#094A2F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B5D3B] transition-colors disabled:opacity-50", children: isLoading ? "Signing in..." : "Sign In" })
    ] })
  ] }) });
}
export {
  AdminLogin as component
};
