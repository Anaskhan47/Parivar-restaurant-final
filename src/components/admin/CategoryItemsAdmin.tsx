import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, CheckCircle2, ChevronDown, Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CategoryItemsAdminProps {
  categoryName: string;
  title: string;
  description: string;
  queryKey: string;
}

export function CategoryItemsAdmin({ categoryName, title, description, queryKey }: CategoryItemsAdminProps) {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form fields
  const [name, setName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  // Source selection (pick from existing menu)
  const [sourceCategory, setSourceCategory] = useState<string>('');
  const [sourceItemId, setSourceItemId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const token = () => localStorage.getItem('parivar_admin_token');

  // Fetch all categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/v1/categories/', {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
  });

  // Find the target category id (Add-ons or Today's Special)
  useEffect(() => {
    const cat = categories?.find((c: any) => c.name === categoryName);
    if (cat) setCategoryId(cat.id);
  }, [categories, categoryName]);

  // Get menu categories (exclude Add-ons and Today's Special — those are the management categories)
  const menuCategories = categories?.filter(
    (c: any) => c.name !== "Add-ons" && c.name !== "Today's Special"
  ) || [];

  // Fetch items in the selected source category
  const { data: sourceCategoryItems } = useQuery({
    queryKey: ['source-category-items', sourceCategory],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/menu?category=${encodeURIComponent(sourceCategory)}`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
    enabled: !!sourceCategory,
  });

  // Filter source items by search term
  const filteredSourceItems = sourceCategoryItems?.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Items already in the target category (Add-ons / Today's Special)
  const { data: items, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/menu?category=${encodeURIComponent(categoryName)}`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
    enabled: !!categoryId,
  });

  const createMutation = useMutation({
    mutationFn: async (newItem: any) => {
      const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/v1/menu/', newItem, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setIsAddModalOpen(false);
      resetForm();
      toast.success('Item added successfully!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to add item');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await axios.put(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/menu/${id}`, data, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      setIsEditModalOpen(false);
      setEditingItem(null);
      resetForm();
      toast.success('Item updated successfully!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to update item');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/menu/${id}`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success('Item removed successfully!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail || 'Failed to remove item');
    },
  });

  const resetForm = () => {
    setName('');
    setItemDescription('');
    setPrice('');
    setImageUrl('');
    setIsAvailable(true);
    setSourceCategory('');
    setSourceItemId('');
    setSearchTerm('');
  };

  // When a source item is selected, auto-fill form fields
  const handleSourceItemSelect = (itemId: string) => {
    setSourceItemId(itemId);
    const item = sourceCategoryItems?.find((i: any) => i.id.toString() === itemId);
    if (item) {
      setName(item.name);
      setItemDescription(item.description || '');
      setPrice(item.price.toString());
      setImageUrl(item.image_url || '');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return;
    createMutation.mutate({
      name,
      description: itemDescription,
      price: parseFloat(price),
      category_id: categoryId,
      image_url: imageUrl || undefined,
      is_available: isAvailable,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !categoryId) return;
    updateMutation.mutate({
      id: editingItem.id,
      data: {
        name,
        description: itemDescription,
        price: parseFloat(price),
        category_id: categoryId,
        image_url: imageUrl || undefined,
        is_available: isAvailable,
      },
    });
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setItemDescription(item.description || '');
    setPrice(item.price.toString());
    setImageUrl(item.image_url || '');
    setIsAvailable(item.is_available ?? true);
    setIsEditModalOpen(true);
  };

  // The Add form with category → item picker
  const AddForm = () => (
    <form onSubmit={handleCreate} className="space-y-5">
      {/* Step 1: Pick a category from the restaurant menu */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          1. Select Category
        </label>
        <div className="relative">
          <select
            value={sourceCategory}
            onChange={(e) => {
              setSourceCategory(e.target.value);
              setSourceItemId('');
              setName('');
              setItemDescription('');
              setPrice('');
              setImageUrl('');
              setSearchTerm('');
            }}
            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] appearance-none cursor-pointer"
          >
            <option value="">Choose a category…</option>
            {menuCategories.map((cat: any) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Step 2: Pick an item from that category */}
      {sourceCategory && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            2. Select Item
          </label>
          {/* Search within items */}
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items..."
              className="w-full border border-gray-200 bg-white rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B]"
            />
          </div>
          <div className="max-h-48 overflow-y-auto border border-gray-100 rounded-xl divide-y divide-gray-50">
            {filteredSourceItems.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-gray-400">
                {sourceCategoryItems ? 'No items found' : 'Loading...'}
              </div>
            ) : (
              filteredSourceItems.map((item: any) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleSourceItemSelect(item.id.toString())}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[#0B5D3B]/5 transition-colors ${
                    sourceItemId === item.id.toString() ? 'bg-[#0B5D3B]/10 border-l-4 border-[#0B5D3B]' : ''
                  }`}
                >
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-[#0B5D3B] whitespace-nowrap ml-3">
                    ${item.price.toFixed(2)}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Auto-filled details (editable) */}
      {sourceItemId && (
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Item details (editable)</p>
          <div>
            <label className="block text-sm font-medium mb-1">Item Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="w-4 h-4 text-[#0B5D3B] rounded"
                />
                Available
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
        <DialogClose asChild>
          <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
        </DialogClose>
        <button
          type="submit"
          disabled={createMutation.isPending || !sourceItemId}
          className="bg-[#0B5D3B] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Add to {categoryName}
        </button>
      </div>
    </form>
  );

  // The Edit form (simpler — just edit existing fields)
  const EditForm = () => (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Item Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price ($)</label>
        <input required type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="https://..." />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} className="w-4 h-4 text-[#0B5D3B] rounded" />
        <label className="text-sm font-medium">Item is available</label>
      </div>
      <div className="pt-4 flex justify-end gap-3">
        <DialogClose asChild>
          <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
        </DialogClose>
        <button type="submit" disabled={updateMutation.isPending} className="bg-[#0B5D3B] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Update
        </button>
      </div>
    </form>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0B5D3B]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#042416]">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={(open) => { setIsAddModalOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <button className="bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2">
              <Plus size={18} /> Add from Menu
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-xl font-display font-bold mb-4">Add {categoryName} Item</DialogTitle>
            <p className="text-sm text-gray-500 mb-4">Pick an item from your restaurant menu to add as {categoryName === "Add-ons" ? "an add-on" : "today's special"}.</p>
            <AddForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items?.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 max-w-[300px]">{item.description}</p>
                  </td>
                  <td className="p-4 font-medium text-[#0B5D3B]">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.is_available ? 'Available' : 'Sold Out'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 rounded-lg">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { if (confirm('Remove this item?')) deleteMutation.mutate(item.id); }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No items yet. Add your first one from the menu!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogTitle className="text-xl font-display font-bold mb-4">Edit Item</DialogTitle>
          <EditForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
