import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./router-BeeKtac0.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dialog, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-RtvUk_Ud.mjs";
import { P as Plus, q as LoaderCircle, d as Trash2, W as Info, k as Users } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function FloorPlan() {
  const {
    token
  } = useAuth();
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = reactExports.useState(false);
  const [newTableNumber, setNewTableNumber] = reactExports.useState("");
  const [newCapacity, setNewCapacity] = reactExports.useState("4");
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const {
    data: tables,
    isLoading
  } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/tables", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.json();
    },
    enabled: !!token
  });
  const createTable = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:8000/api/v1/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...data,
          status: "AVAILABLE"
        })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to create table");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"]
      });
      setIsAddOpen(false);
      setNewTableNumber("");
      setNewCapacity("4");
      toast.success("Table added successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add table");
    }
  });
  const deleteTable = useMutation({
    mutationFn: async (tableId) => {
      const res = await fetch(`http://localhost:8000/api/v1/tables/${tableId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to delete table");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"]
      });
      setDeletingId(null);
      toast.success("Table removed successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete table");
      setDeletingId(null);
    }
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-pulse flex space-x-4", children: "Loading floor plan..." });
  }
  const getTableStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 border-green-300 text-green-800";
      case "OCCUPIED":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "RESERVED":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "NEEDS_CLEANING":
        return "bg-orange-100 border-orange-300 text-orange-800";
      default:
        return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };
  const handleCreateTable = (e) => {
    e.preventDefault();
    if (!newTableNumber.trim()) return;
    createTable.mutate({
      table_number: newTableNumber.trim(),
      capacity: parseInt(newCapacity) || 4
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Floor Plan View" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-green-400" }),
            " Available"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-blue-400" }),
            " Occupied"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-400" }),
            " Reserved"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-orange-400" }),
            " Cleaning"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setIsAddOpen(true), className: "bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
          " Add Table"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[600px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8", children: tables?.map((table) => {
      const activeOrder = table.active_order;
      const hasOrder = !!activeOrder;
      let elapsedMinutes = 0;
      if (hasOrder && activeOrder.created_at) {
        const created = new Date(activeOrder.created_at).getTime();
        const now = (/* @__PURE__ */ new Date()).getTime();
        elapsedMinutes = Math.floor((now - created) / 6e4);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex flex-col p-6 rounded-2xl border-2 transition-all hover:shadow-md group ${getTableStatusColor(table.status)}`, children: [
        !hasOrder && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          if (confirm(`Delete table ${table.table_number}?`)) {
            setDeletingId(table.id);
            deleteTable.mutate(table.id);
          }
        }, className: "absolute top-2 left-2 p-1.5 rounded-lg bg-white/70 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all", title: "Delete table", children: deletingId === table.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { size: 16, className: "opacity-50 hover:opacity-100" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold font-display mb-1", children: table.table_number }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 opacity-80 text-xs font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Cap: ",
              table.capacity
            ] })
          ] })
        ] }),
        hasOrder ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-blue-200/50 space-y-2 text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: "Order:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
              "#",
              activeOrder.id
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: "Guests:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: activeOrder.guest_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: "Value:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-[#0B5D3B]", children: [
              "$",
              activeOrder.total_amount.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: "Status:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold uppercase tracking-wider", children: activeOrder.status })
          ] }),
          activeOrder.waiter_username && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-75", children: "Waiter:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold truncate max-w-[80px]", children: activeOrder.waiter_username })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px] opacity-75 mt-2 bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Elapsed:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              elapsedMinutes,
              "m ago"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center flex-1 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-1 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm", children: table.status.replace("_", " ") }) })
      ] }, table.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isAddOpen, onOpenChange: setIsAddOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Add New Table" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreateTable, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Table Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: newTableNumber, onChange: (e) => setNewTableNumber(e.target.value), placeholder: "e.g. T11", className: "w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1.5", children: "Capacity (seats)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", min: "1", max: "50", value: newCapacity, onChange: (e) => setNewCapacity(e.target.value), className: "w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3 border-t border-gray-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium", children: "Cancel" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: createTable.isPending, className: "bg-[#0B5D3B] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm disabled:opacity-50", children: [
            createTable.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            "Add Table"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  FloorPlan as component
};
