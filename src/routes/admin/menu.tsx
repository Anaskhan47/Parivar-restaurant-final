import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Plus, Edit2, Trash2, Loader2, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ImageUploadField } from '@/components/admin/ImageUploadField';

export const Route = createFileRoute('/admin/menu')({
  component: AdminMenuPage,
});

function AdminMenuPage() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(''); // Default will be set by useEffect
  const [imageUrl, setImageUrl] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  // Fetch menu items
  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['admin-menu-items'],
    queryFn: async () => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.get('http://localhost:8000/api/v1/menu/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.get('http://localhost:8000/api/v1/categories/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });

  useEffect(() => {
    if (categories?.length > 0 && !categoryId) {
      setCategoryId(categories[0].id.toString());
    }
  }, [categories, categoryId]);

  const createMutation = useMutation({
    mutationFn: async (newItem: any) => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.post('http://localhost:8000/api/v1/menu/', newItem, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu-items'] });
      setIsAddModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.put(`http://localhost:8000/api/v1/menu/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu-items'] });
      setIsEditModalOpen(false);
      setEditingItem(null);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('parivar_admin_token');
      await axios.delete(`http://localhost:8000/api/v1/menu/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-menu-items'] });
    }
  });

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setIsAvailable(true);
    if (categories && categories.length > 0) {
      setCategoryId(categories[0].id.toString());
    } else {
      setCategoryId('');
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      name,
      description,
      price: parseFloat(price),
      category_id: parseInt(categoryId),
      image_url: imageUrl || undefined,
      is_available: isAvailable
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateMutation.mutate({
      id: editingItem.id,
      data: {
        name,
        description,
        price: parseFloat(price),
        category_id: parseInt(categoryId),
        image_url: imageUrl || undefined,
        is_available: isAvailable
      }
    });
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description || '');
    setPrice(item.price.toString());
    setCategoryId(item.category_id.toString());
    setImageUrl(item.image_url || '');
    setIsAvailable(item.is_available ?? true);
    setIsEditModalOpen(true);
  };

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
          <h1 className="text-3xl font-display font-bold text-[#042416]">Menu Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Add, update, or remove items from the restaurant menu.</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors cursor-pointer">
              <Plus size={18} /> Add Item
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-6">
            <DialogTitle className="text-xl font-display font-bold mb-4">Add Menu Item</DialogTitle>
            <form
              onSubmit={handleCreate}
              className="space-y-4 max-h-[72vh] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Item Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="e.g. Butter Chicken" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="Delicious creamy chicken..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="22.50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]">
                    <option value="" disabled>Select a category</option>
                    {categories?.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <ImageUploadField value={imageUrl} onChange={setImageUrl} label="Upload Image" />
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="add-is-available" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)} className="w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" />
                <label htmlFor="add-is-available" className="text-sm font-medium">Item is available</label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <DialogClose asChild>
                  <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium">Cancel</button>
                </DialogClose>
                <button type="submit" disabled={createMutation.isPending} className="bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm">
                  {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Save Item
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {menuItems?.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1 max-w-[300px]">{item.description}</p>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                      {categories?.find((c: any) => c.id === item.category_id)?.name || `Cat ${item.category_id}`}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-[#0B5D3B]">${item.price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${item.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.is_available ? 'Available' : 'Sold Out'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(item)} className="p-2 text-gray-400 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 rounded-lg transition-colors cursor-pointer">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { if(confirm('Are you sure you want to delete this?')) deleteMutation.mutate(item.id) }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {menuItems?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No menu items found. Add your first item!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogTitle className="text-xl font-display font-bold mb-4">Edit Menu Item</DialogTitle>
          <form
            onSubmit={handleUpdate}
            className="space-y-4 max-h-[72vh] overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price ($)</label>
                <input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]">
                  <option value="" disabled>Select a category</option>
                  {categories?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <ImageUploadField value={imageUrl} onChange={setImageUrl} label="Upload Image" />
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="edit-is-available" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)} className="w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" />
              <label htmlFor="edit-is-available" className="text-sm font-medium">Item is available</label>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium">Cancel</button>
              </DialogClose>
              <button type="submit" disabled={updateMutation.isPending} className="bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm">
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Update
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
