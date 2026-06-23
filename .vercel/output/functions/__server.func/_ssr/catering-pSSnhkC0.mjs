import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { q as LoaderCircle, c as Phone, Y as Mail, k as Users, g as CalendarDays, Z as MessageCircle, C as Clock, r as CircleCheck, _ as CircleX } from "../_libs/lucide-react.mjs";
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
const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONTACTED: "bg-blue-100 text-blue-800 border-blue-200",
  QUOTED: "bg-purple-100 text-purple-800 border-purple-200",
  APPROVED: "bg-green-100 text-green-800 border-green-200",
  COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200"
};
const STATUS_STEPS = ["PENDING", "CONTACTED", "QUOTED", "APPROVED", "COMPLETED"];
function CateringManagement() {
  const {
    token
  } = useAuth();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = reactExports.useState("ALL");
  const {
    data: requests,
    isLoading
  } = useQuery({
    queryKey: ["catering-requests"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/catering/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch catering requests");
      return res.json();
    },
    enabled: !!token
  });
  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status
    }) => {
      const res = await fetch(`http://localhost:8000/api/v1/catering/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status
        })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["catering-requests"]
      });
      toast.success("Status updated!");
    },
    onError: (err) => toast.error(err.message)
  });
  const deleteRequest = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:8000/api/v1/catering/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to delete request");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["catering-requests"]
      });
      toast.success("Request deleted.");
    },
    onError: (err) => toast.error(err.message)
  });
  const filtered = filterStatus === "ALL" ? requests : requests?.filter((r) => r.status === filterStatus);
  const counts = {};
  requests?.forEach((r) => {
    counts[r.status] = (counts[r.status] || 0) + 1;
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-[#0B5D3B]" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-[#042416]", children: "Catering Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Manage event and catering enquiries from customers." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm", children: [
        requests?.length || 0,
        " total requests"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ["ALL", ...STATUS_STEPS, "REJECTED"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilterStatus(s), className: `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${filterStatus === s ? "bg-[#0B5D3B] text-white border-[#0B5D3B]" : "bg-white text-gray-600 border-gray-200 hover:border-[#0B5D3B]/50"}`, children: [
      s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase(),
      s !== "ALL" && counts[s] ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 bg-white/20 text-inherit rounded-full px-1.5 py-0.5", children: counts[s] }) : null
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5", children: [
      filtered?.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-900 text-base", children: req.customer_name }),
            req.event_type && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#0B5D3B] font-semibold mt-0.5", children: req.event_type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[req.status] || "bg-gray-100 text-gray-700"}`, children: req.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 14, className: "text-gray-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: req.phone })
          ] }),
          req.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 14, className: "text-gray-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: req.email })
          ] }),
          req.guest_count && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14, className: "text-gray-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              req.guest_count,
              " guests"
            ] })
          ] }),
          req.event_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 14, className: "text-gray-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(req.event_date).toLocaleDateString("en-US", {
              dateStyle: "medium"
            }) })
          ] }),
          req.requirements && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 14, className: "text-gray-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 line-clamp-2", children: req.requirements })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Received ",
              new Date(req.created_at).toLocaleDateString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-gray-100 flex flex-col gap-2", children: [
          req.status !== "COMPLETED" && req.status !== "REJECTED" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            STATUS_STEPS.indexOf(req.status) < STATUS_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => updateStatus.mutate({
              id: req.id,
              status: STATUS_STEPS[STATUS_STEPS.indexOf(req.status) + 1]
            }), disabled: updateStatus.isPending, className: "flex-1 py-2 px-3 bg-[#0B5D3B] hover:bg-[#094A2F] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
              "Mark as ",
              STATUS_STEPS[STATUS_STEPS.indexOf(req.status) + 1].charAt(0) + STATUS_STEPS[STATUS_STEPS.indexOf(req.status) + 1].slice(1).toLowerCase()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => updateStatus.mutate({
              id: req.id,
              status: "REJECTED"
            }), disabled: updateStatus.isPending, className: "py-2 px-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14 }),
              " Reject"
            ] })
          ] }),
          (req.status === "COMPLETED" || req.status === "REJECTED") && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (confirm("Delete this catering request?")) deleteRequest.mutate(req.id);
          }, className: "w-full py-2 border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 text-xs font-semibold rounded-lg cursor-pointer transition-colors", children: "Delete Record" })
        ] })
      ] }, req.id)),
      (!filtered || filtered.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-full py-20 flex flex-col items-center justify-center text-gray-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 48, className: "mb-4 opacity-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "No catering requests found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: filterStatus !== "ALL" ? `No requests with status "${filterStatus}"` : "Requests submitted on the website will appear here." })
      ] })
    ] })
  ] });
}
export {
  CateringManagement as component
};
