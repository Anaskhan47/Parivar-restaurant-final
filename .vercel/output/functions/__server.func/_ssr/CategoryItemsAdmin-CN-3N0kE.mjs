import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as axios } from "../_libs/axios.mjs";
import { D as Dialog, d as DialogTrigger, a as DialogContent, c as DialogTitle, e as DialogClose } from "./dialog-RtvUk_Ud.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { q as LoaderCircle, P as Plus, w as Pen, d as Trash2, x as ChevronDown, y as Search, r as CircleCheck } from "../_libs/lucide-react.mjs";
function CategoryItemsAdmin({ categoryName, title, description, queryKey }) {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = reactExports.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
  const [editingItem, setEditingItem] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [itemDescription, setItemDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [isAvailable, setIsAvailable] = reactExports.useState(true);
  const [categoryId, setCategoryId] = reactExports.useState(null);
  const [sourceCategory, setSourceCategory] = reactExports.useState("");
  const [sourceItemId, setSourceItemId] = reactExports.useState("");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const token = () => localStorage.getItem("parivar_admin_token");
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/api/v1/categories/", {
        headers: { Authorization: `Bearer ${token()}` }
      });
      return res.data;
    }
  });
  reactExports.useEffect(() => {
    const cat = categories?.find((c) => c.name === categoryName);
    if (cat) setCategoryId(cat.id);
  }, [categories, categoryName]);
  const menuCategories = categories?.filter(
    (c) => c.name !== "Add-ons" && c.name !== "Today's Special"
  ) || [];
  const { data: sourceCategoryItems } = useQuery({
    queryKey: ["source-category-items", sourceCategory],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/menu?category=${encodeURIComponent(sourceCategory)}`, {
        headers: { Authorization: `Bearer ${token()}` }
      });
      return res.data;
    },
    enabled: !!sourceCategory
  });
  const filteredSourceItems = sourceCategoryItems?.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  const { data: items, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8000/api/v1/menu?category=${encodeURIComponent(categoryName)}`, {
        headers: { Authorization: `Bearer ${token()}` }
      });
      return res.data;
    },
    enabled: !!categoryId
  });
  const createMutation = useMutation({
    mutationFn: async (newItem) => {
      const res = await axios.post("http://localhost:8000/api/v1/menu/", newItem, {
        headers: { Authorization: `Bearer ${token()}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setIsAddModalOpen(false);
      resetForm();
      toast.success("Item added successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.detail || "Failed to add item");
    }
  });
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axios.put(`http://localhost:8000/api/v1/menu/${id}`, data, {
        headers: { Authorization: `Bearer ${token()}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setIsEditModalOpen(false);
      setEditingItem(null);
      resetForm();
      toast.success("Item updated successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.detail || "Failed to update item");
    }
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://localhost:8000/api/v1/menu/${id}`, {
        headers: { Authorization: `Bearer ${token()}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success("Item removed successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.detail || "Failed to remove item");
    }
  });
  const resetForm = () => {
    setName("");
    setItemDescription("");
    setPrice("");
    setImageUrl("");
    setIsAvailable(true);
    setSourceCategory("");
    setSourceItemId("");
    setSearchTerm("");
  };
  const handleSourceItemSelect = (itemId) => {
    setSourceItemId(itemId);
    const item = sourceCategoryItems?.find((i) => i.id.toString() === itemId);
    if (item) {
      setName(item.name);
      setItemDescription(item.description || "");
      setPrice(item.price.toString());
      setImageUrl(item.image_url || "");
    }
  };
  const handleCreate = (e) => {
    e.preventDefault();
    if (!categoryId) return;
    createMutation.mutate({
      name,
      description: itemDescription,
      price: parseFloat(price),
      category_id: categoryId,
      image_url: imageUrl || void 0,
      is_available: isAvailable
    });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingItem || !categoryId) return;
    updateMutation.mutate({
      id: editingItem.id,
      data: {
        name,
        description: itemDescription,
        price: parseFloat(price),
        category_id: categoryId,
        image_url: imageUrl || void 0,
        is_available: isAvailable
      }
    });
  };
  const openEditModal = (item) => {
    setEditingItem(item);
    setName(item.name);
    setItemDescription(item.description || "");
    setPrice(item.price.toString());
    setImageUrl(item.image_url || "");
    setIsAvailable(item.is_available ?? true);
    setIsEditModalOpen(true);
  };
  const AddForm = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "1. Select Category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: sourceCategory,
            onChange: (e) => {
              setSourceCategory(e.target.value);
              setSourceItemId("");
              setName("");
              setItemDescription("");
              setPrice("");
              setImageUrl("");
              setSearchTerm("");
            },
            className: "w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] appearance-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Choose a category…" }),
              menuCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.name, children: cat.name }, cat.id))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" })
      ] })
    ] }),
    sourceCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-1.5", children: "2. Select Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            placeholder: "Search items...",
            className: "w-full border border-gray-200 bg-white rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-48 overflow-y-auto border border-gray-100 rounded-xl divide-y divide-gray-50", children: filteredSourceItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-center text-sm text-gray-400", children: sourceCategoryItems ? "No items found" : "Loading..." }) : filteredSourceItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => handleSourceItemSelect(item.id.toString()),
          className: `w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[#0B5D3B]/5 transition-colors ${sourceItemId === item.id.toString() ? "bg-[#0B5D3B]/10 border-l-4 border-[#0B5D3B]" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900 text-sm", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 line-clamp-1", children: item.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-[#0B5D3B] whitespace-nowrap ml-3", children: [
              "$",
              item.price.toFixed(2)
            ] })
          ]
        },
        item.id
      )) })
    ] }),
    sourceItemId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2 border-t border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-gray-400 uppercase tracking-wider", children: "Item details (editable)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Item Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            required: true,
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: itemDescription,
            onChange: (e) => setItemDescription(e.target.value),
            className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]",
            rows: 2
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Price ($)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required: true,
              type: "number",
              step: "0.01",
              value: price,
              onChange: (e) => setPrice(e.target.value),
              className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm font-medium cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: isAvailable,
              onChange: (e) => setIsAvailable(e.target.checked),
              className: "w-4 h-4 text-[#0B5D3B] rounded"
            }
          ),
          "Available"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3 border-t border-gray-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium", children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "submit",
          disabled: createMutation.isPending || !sourceItemId,
          className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed",
          children: [
            createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
            "Add to ",
            categoryName
          ]
        }
      )
    ] })
  ] });
  const EditForm = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Item Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Description" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: itemDescription, onChange: (e) => setItemDescription(e.target.value), className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", rows: 3 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Price ($)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", step: "0.01", value: price, onChange: (e) => setPrice(e.target.value), className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1", children: "Image URL (Optional)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: imageUrl, onChange: (e) => setImageUrl(e.target.value), className: "w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]", placeholder: "https://..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: isAvailable, onChange: (e) => setIsAvailable(e.target.checked), className: "w-4 h-4 text-[#0B5D3B] rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", children: "Item is available" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium", children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: updateMutation.isPending, className: "bg-[#0B5D3B] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm", children: [
        updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
        "Update"
      ] })
    ] })
  ] });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-[#0B5D3B]" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-[#042416]", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: isAddModalOpen, onOpenChange: (open) => {
        setIsAddModalOpen(open);
        if (!open) resetForm();
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 }),
          " Add from Menu"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg p-6 max-h-[90vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: [
            "Add ",
            categoryName,
            " Item"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 mb-4", children: [
            "Pick an item from your restaurant menu to add as ",
            categoryName === "Add-ons" ? "an add-on" : "today's special",
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AddForm, {})
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-50 border-b border-gray-100 text-sm text-gray-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 font-medium text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-gray-100", children: [
        items?.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 line-clamp-1 max-w-[300px]", children: item.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-4 font-medium text-[#0B5D3B]", children: [
            "$",
            item.price.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: item.is_available ? "Available" : "Sold Out" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEditModal(item), className: "p-2 text-gray-400 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 16 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              if (confirm("Remove this item?")) deleteMutation.mutate(item.id);
            }, className: "p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
          ] }) })
        ] }, item.id)),
        items?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "p-8 text-center text-gray-500", children: "No items yet. Add your first one from the menu!" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isEditModalOpen, onOpenChange: setIsEditModalOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-display font-bold mb-4", children: "Edit Item" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EditForm, {})
    ] }) })
  ] });
}
export {
  CategoryItemsAdmin as C
};
