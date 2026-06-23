import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-RtvUk_Ud.mjs";
import { q as LoaderCircle, u as UserPlus, r as CircleCheck, v as Shield, w as Pen, d as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "util";
import "stream";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "crypto";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "async_hooks";
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
function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = reactExports.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
  const [editingUser, setEditingUser] = reactExports.useState(null);
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("WAITER");
  const [isActive, setIsActive] = reactExports.useState(true);
  const {
    data: users,
    isLoading
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.get("http://localhost:8000/api/v1/users/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    }
  });
  const createMutation = useMutation({
    mutationFn: async (newUser) => {
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.post("http://localhost:8000/api/v1/users/", newUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"]
      });
      setIsAddModalOpen(false);
      resetForm();
    }
  });
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.put(`http://localhost:8000/api/v1/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"]
      });
      setIsEditModalOpen(false);
      setEditingUser(null);
      resetForm();
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("parivar_admin_token");
      await axios.delete(`http://localhost:8000/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"]
      });
    }
  });
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRole("WAITER");
    setIsActive(true);
  };
  const openEditModal = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword("");
    setRole(user.role);
    setIsActive(user.is_active);
    setIsEditModalOpen(true);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate({
      username,
      password,
      role,
      is_active: isActive
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateMutation.mutate({
      id: editingUser.id,
      data: {
        username,
        role,
        is_active: isActive,
        ...password ? {
          password
        } : {}
      }
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-[#0B5D3B]" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-[#042416]", children: "Staff Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Manage employee access, roles, and accounts." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddModalOpen, onOpenChange: setIsAddModalOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 18 }),
          " Add Staff"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Add Staff Member" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "e.g. john_waiter" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "••••••••" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "System Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SUPER_ADMIN", children: "Admin (Full Access)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "KITCHEN", children: "Kitchen Staff" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "WAITER", children: "Waiter" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "add-user-active", checked: isActive, onChange: (e) => setIsActive(e.target.checked), className: "w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "add-user-active", className: "text-sm font-medium", children: "Account is active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium", children: "Cancel" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: createMutation.isPending, className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm", children: [
                createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                "Create Account"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-100", children: [
        users?.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center font-bold text-xs uppercase", children: user.username.charAt(0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: user.username })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${user.role === "SUPER_ADMIN" ? "bg-purple-100 text-purple-700" : user.role === "KITCHEN" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}`, children: [
            user.role === "SUPER_ADMIN" && /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 12 }),
            user.role
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: user.is_active ? "Active" : "Inactive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEditModal(user), className: "p-2 text-gray-400 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 rounded-lg transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm("Are you sure you want to delete this user?")) deleteMutation.mutate(user.id);
            }, className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
          ] }) })
        ] }, user.id)),
        users?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-8 text-center text-gray-500", children: "No staff members found." }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isEditModalOpen, onOpenChange: setIsEditModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Edit Staff Member" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Password (Leave blank to keep unchanged)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "••••••••" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "System Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SUPER_ADMIN", children: "Admin (Full Access)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "KITCHEN", children: "Kitchen Staff" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "WAITER", children: "Waiter" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "edit-user-active", checked: isActive, onChange: (e) => setIsActive(e.target.checked), className: "w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "edit-user-active", className: "text-sm font-medium", children: "Account is active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium", children: "Cancel" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: updateMutation.isPending, className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm", children: [
            updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            "Update Account"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminUsersPage as component
};
