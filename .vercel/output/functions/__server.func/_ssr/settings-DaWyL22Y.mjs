import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as ShieldCheck, K as KeyRound, q as LoaderCircle, r as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function SettingsPage() {
  const {
    user,
    token
  } = useAuth();
  const [currentPassword, setCurrentPassword] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/users/me/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to change password");
      }
      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-[#042416]", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your account preferences and security." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-1 space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-[#0B5D3B] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4", children: user?.username?.charAt(0).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg text-gray-900", children: user?.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 uppercase tracking-wide font-medium mt-1", children: user?.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
          " Account Active"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border border-gray-100 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-5 h-5 text-[#D4A017]" }),
          "Change Password"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePasswordChange, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Current Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: currentPassword, onChange: (e) => setCurrentPassword(e.target.value), className: "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] focus:bg-white transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "New Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: newPassword, onChange: (e) => setNewPassword(e.target.value), className: "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] focus:bg-white transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Confirm New Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] focus:bg-white transition-colors" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: isSubmitting || !currentPassword || !newPassword || !confirmPassword, className: "bg-[#0B5D3B] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: [
            isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            "Update Password"
          ] }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  SettingsPage as component
};
