import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-RtvUk_Ud.mjs";
import { q as LoaderCircle, P as Plus, r as CircleCheck, w as Pen, d as Trash2, X, z as ImagePlus } from "../_libs/lucide-react.mjs";
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
function ImageUploadField({ value, onChange, label = "Dish Image" }) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.post("http://localhost:8000/api/v1/uploads/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      onChange(res.data.url);
    } catch {
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-gray-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "Dish preview", className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(""),
            className: "absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors",
            "aria-label": "Remove image",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => inputRef.current?.click(),
          disabled: uploading,
          className: "w-full h-36 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-[#0B5D3B] hover:bg-[#0B5D3B]/5 transition-colors flex flex-col items-center justify-center gap-2 text-gray-500 disabled:opacity-60",
          children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-[#0B5D3B]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Uploading..." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-8 h-8 text-[#0B5D3B]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Click to upload image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: "JPEG, PNG, WebP or GIF — max 5MB" })
          ] })
        }
      ),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => inputRef.current?.click(),
          disabled: uploading,
          className: "text-sm text-[#0B5D3B] font-medium hover:underline disabled:opacity-60",
          children: uploading ? "Uploading..." : "Replace image"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref: inputRef,
          type: "file",
          accept: "image/jpeg,image/png,image/webp,image/gif",
          onChange: handleFileChange,
          className: "hidden"
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-600", children: error })
    ] })
  ] });
}
function AdminMenuPage() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = reactExports.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
  const [editingItem, setEditingItem] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [categoryId, setCategoryId] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [isAvailable, setIsAvailable] = reactExports.useState(true);
  const {
    data: menuItems,
    isLoading
  } = useQuery({
    queryKey: ["admin-menu-items"],
    queryFn: async () => {
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.get("http://localhost:8000/api/v1/menu/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    }
  });
  const {
    data: categories
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.get("http://localhost:8000/api/v1/categories/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    }
  });
  reactExports.useEffect(() => {
    if (categories?.length > 0 && !categoryId) {
      setCategoryId(categories[0].id.toString());
    }
  }, [categories, categoryId]);
  const createMutation = useMutation({
    mutationFn: async (newItem) => {
      const token = localStorage.getItem("parivar_admin_token");
      const res = await axios.post("http://localhost:8000/api/v1/menu/", newItem, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-menu-items"]
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
      const res = await axios.put(`http://localhost:8000/api/v1/menu/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-menu-items"]
      });
      setIsEditModalOpen(false);
      setEditingItem(null);
      resetForm();
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("parivar_admin_token");
      await axios.delete(`http://localhost:8000/api/v1/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-menu-items"]
      });
    }
  });
  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setIsAvailable(true);
    if (categories && categories.length > 0) {
      setCategoryId(categories[0].id.toString());
    } else {
      setCategoryId("");
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createMutation.mutate({
      name,
      description,
      price: parseFloat(price),
      category_id: parseInt(categoryId),
      image_url: imageUrl || void 0,
      is_available: isAvailable
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    updateMutation.mutate({
      id: editingItem.id,
      data: {
        name,
        description,
        price: parseFloat(price),
        category_id: parseInt(categoryId),
        image_url: imageUrl || void 0,
        is_available: isAvailable
      }
    });
  };
  const openEditModal = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description || "");
    setPrice(item.price.toString());
    setCategoryId(item.category_id.toString());
    setImageUrl(item.image_url || "");
    setIsAvailable(item.is_available ?? true);
    setIsEditModalOpen(true);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-[#0B5D3B]" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-[#042416]", children: "Menu Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: "Add, update, or remove items from the restaurant menu." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddModalOpen, onOpenChange: setIsAddModalOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
          " Add Item"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Add Menu Item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "space-y-4 max-h-[72vh] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Item Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "e.g. Butter Chicken" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "Delicious creamy chicken...", rows: 3 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Price ($)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", step: "0.01", value: price, onChange: (e) => setPrice(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "22.50" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, value: categoryId, onChange: (e) => setCategoryId(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a category" }),
                  categories?.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.id, children: cat.name }, cat.id))
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploadField, { value: imageUrl, onChange: setImageUrl, label: "Upload Image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "add-is-available", checked: isAvailable, onChange: (e) => setIsAvailable(e.target.checked), className: "w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "add-is-available", className: "text-sm font-medium", children: "Item is available" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium", children: "Cancel" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: createMutation.isPending, className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm", children: [
                createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                "Save Item"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-100", children: [
        menuItems?.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 line-clamp-1 max-w-[300px]", children: item.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600", children: categories?.find((c) => c.id === item.category_id)?.name || `Cat ${item.category_id}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 font-medium text-[#0B5D3B]", children: [
            "$",
            item.price.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: item.is_available ? "Available" : "Sold Out" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEditModal(item), className: "p-2 text-gray-400 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 rounded-lg transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm("Are you sure you want to delete this?")) deleteMutation.mutate(item.id);
            }, className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
          ] }) })
        ] }, item.id)),
        menuItems?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "p-8 text-center text-gray-500", children: "No menu items found. Add your first item!" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isEditModalOpen, onOpenChange: setIsEditModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Edit Menu Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "space-y-4 max-h-[72vh] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Item Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", rows: 3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Price ($)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", step: "0.01", value: price, onChange: (e) => setPrice(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { required: true, value: categoryId, onChange: (e) => setCategoryId(e.target.value), className: "w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a category" }),
              categories?.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.id, children: cat.name }, cat.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUploadField, { value: imageUrl, onChange: setImageUrl, label: "Upload Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "edit-is-available", checked: isAvailable, onChange: (e) => setIsAvailable(e.target.checked), className: "w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "edit-is-available", className: "text-sm font-medium", children: "Item is available" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium", children: "Cancel" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: updateMutation.isPending, className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm", children: [
            updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            "Update"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminMenuPage as component
};
