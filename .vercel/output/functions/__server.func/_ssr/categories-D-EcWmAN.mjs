import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-RtvUk_Ud.mjs";
import { q as LoaderCircle, P as Plus, j as FolderOpen, w as Pen, d as Trash2, r as CircleCheck } from "../_libs/lucide-react.mjs";
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
function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = reactExports.useState(false);
  const [isEditOpen, setIsEditOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const token = () => localStorage.getItem("parivar_admin_token");
  const {
    data: categories,
    isLoading
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/api/v1/categories/", {
        headers: {
          Authorization: `Bearer ${token()}`
        }
      });
      return res.data;
    }
  });
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post("http://localhost:8000/api/v1/categories/", payload, {
        headers: {
          Authorization: `Bearer ${token()}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
      setIsAddOpen(false);
      resetForm();
    }
  });
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data
    }) => {
      const res = await axios.put(`http://localhost:8000/api/v1/categories/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token()}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"]
      });
      setIsEditOpen(false);
      setEditing(null);
      resetForm();
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:8000/api/v1/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`
        }
      });
    },
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["categories"]
    })
  });
  const resetForm = () => {
    setName("");
    setDescription("");
    setImageUrl("");
  };
  const openEdit = (cat) => {
    setEditing(cat);
    setName(cat.name);
    setDescription(cat.description || "");
    setImageUrl(cat.image_url || "");
    setIsEditOpen(true);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-[#0B5D3B]" }) });
  }
  const CategoryForm = ({
    onSubmit,
    submitLabel,
    pending
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Category Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", rows: 3 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Image URL (Optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: imageUrl, onChange: (e) => setImageUrl(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium", children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: pending, className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm", children: [
        pending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
        submitLabel
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-[#042416]", children: "Categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Manage menu categories shown on the website." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddOpen, onOpenChange: setIsAddOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
          " Add Category"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Add Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryForm, { onSubmit: (e) => {
            e.preventDefault();
            createMutation.mutate({
              name,
              description,
              image_url: imageUrl || void 0
            });
          }, submitLabel: "Save Category", pending: createMutation.isPending })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: categories?.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 p-5 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900", children: cat.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 mt-0.5", children: [
              cat.menu_items?.length || 0,
              " items"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(cat), className: "p-2 text-gray-400 hover:text-[#0B5D3B] rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            if (confirm(`Delete category "${cat.name}"?`)) deleteMutation.mutate(cat.id);
          }, className: "p-2 text-gray-400 hover:text-red-600 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
        ] })
      ] }),
      cat.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-3 line-clamp-2", children: cat.description })
    ] }, cat.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isEditOpen, onOpenChange: setIsEditOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Edit Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryForm, { onSubmit: (e) => {
        e.preventDefault();
        if (!editing) return;
        updateMutation.mutate({
          id: editing.id,
          data: {
            name,
            description,
            image_url: imageUrl || void 0
          }
        });
      }, submitLabel: "Update", pending: updateMutation.isPending })
    ] }) })
  ] });
}
export {
  AdminCategoriesPage as component
};
