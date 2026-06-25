import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Loader2, CheckCircle2, FolderOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';

export const Route = createFileRoute('/admin/categories')({
  component: AdminCategoriesPage,
});

function AdminCategoriesPage() {
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const token = () => localStorage.getItem('parivar_admin_token');

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/categories/`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/categories/`, payload, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsAddOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await axios.put(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`}/api/v1/categories/${id}`, data, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setIsEditOpen(false);
      setEditing(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}`}/api/v1/categories/${id}`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['categories'] }),
  });

  const resetForm = () => {
    setName('');
    setDescription('');
    setImageUrl('');
  };

  const openEdit = (cat: any) => {
    setEditing(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setImageUrl(cat.image_url || '');
    setIsEditOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0B5D3B]" />
      </div>
    );
  }

  const CategoryForm = ({ onSubmit, submitLabel, pending }: { onSubmit: (e: React.FormEvent) => void; submitLabel: string; pending: boolean }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Category Name</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
      </div>
      <div className="pt-4 flex justify-end gap-3">
        <DialogClose asChild>
          <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">Cancel</button>
        </DialogClose>
        <button type="submit" disabled={pending} className="bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm">
          {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#042416]">Categories</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage menu categories shown on the website.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2">
              <Plus size={18} /> Add Category
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-6">
            <DialogTitle className="text-xl font-display font-bold mb-4">Add Category</DialogTitle>
            <CategoryForm
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate({ name, description, image_url: imageUrl || undefined });
              }}
              submitLabel="Save Category"
              pending={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((cat: any) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center">
                  <FolderOpen size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{cat.menu_items?.length || 0} items</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(cat)} className="p-2 text-gray-400 hover:text-[#0B5D3B] rounded-lg">
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete category "${cat.name}"?`)) deleteMutation.mutate(cat.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            {cat.description && <p className="text-sm text-gray-500 mt-3 line-clamp-2">{cat.description}</p>}
          </div>
        ))}
      </div>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogTitle className="text-xl font-display font-bold mb-4">Edit Category</DialogTitle>
          <CategoryForm
            onSubmit={(e) => {
              e.preventDefault();
              if (!editing) return;
              updateMutation.mutate({
                id: editing.id,
                data: { name, description, image_url: imageUrl || undefined },
              });
            }}
            submitLabel="Update"
            pending={updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
