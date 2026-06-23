import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { UserPlus, Edit2, Trash2, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';

export const Route = createFileRoute('/admin/users')({
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('WAITER');
  const [isActive, setIsActive] = useState(true);
  
  // Fetch users
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.get('http://localhost:8000/api/v1/users/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newUser: any) => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.post('http://localhost:8000/api/v1/users/', newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsAddModalOpen(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: any }) => {
      const token = localStorage.getItem('parivar_admin_token');
      const res = await axios.put(`http://localhost:8000/api/v1/users/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsEditModalOpen(false);
      setEditingUser(null);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem('parivar_admin_token');
      await axios.delete(`http://localhost:8000/api/v1/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const resetForm = () => {
    setUsername('');
    setPassword('');
    setRole('WAITER');
    setIsActive(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword(''); // don't show old password
    setRole(user.role);
    setIsActive(user.is_active);
    setIsEditModalOpen(true);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      username,
      password,
      role,
      is_active: isActive
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    updateMutation.mutate({
      id: editingUser.id,
      data: {
        username,
        role,
        is_active: isActive,
        ...(password ? { password } : {})
      }
    });
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
          <h1 className="text-3xl font-display font-bold text-[#042416]">Staff Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage employee access, roles, and accounts.</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <button className="bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors cursor-pointer">
              <UserPlus size={18} /> Add Staff
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md p-6">
            <DialogTitle className="text-xl font-display font-bold mb-4">Add Staff Member</DialogTitle>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input required value={username} onChange={e => setUsername(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="e.g. john_waiter" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">System Role</label>
                <select value={role} onChange={e => setRole(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]">
                  <option value="SUPER_ADMIN">Admin (Full Access)</option>
                  <option value="KITCHEN">Kitchen Staff</option>
                  <option value="WAITER">Waiter</option>
                </select>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="add-user-active" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" />
                <label htmlFor="add-user-active" className="text-sm font-medium">Account is active</label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <DialogClose asChild>
                  <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium">Cancel</button>
                </DialogClose>
                <button type="submit" disabled={createMutation.isPending} className="bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm">
                  {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Create Account
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
                <th className="p-4 font-medium">Username</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users?.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B] flex items-center justify-center font-bold text-xs uppercase">
                        {user.username.charAt(0)}
                      </div>
                      <p className="font-medium text-gray-900">{user.username}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium ${
                      user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'KITCHEN' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {user.role === 'SUPER_ADMIN' && <Shield size={12} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(user)} className="p-2 text-gray-400 hover:text-[#0B5D3B] hover:bg-[#0B5D3B]/10 rounded-lg transition-colors cursor-pointer">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => { if(confirm('Are you sure you want to delete this user?')) deleteMutation.mutate(user.id) }} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users?.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No staff members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md p-6">
          <DialogTitle className="text-xl font-display font-bold mb-4">Edit Staff Member</DialogTitle>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input required value={username} onChange={e => setUsername(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password (Leave blank to keep unchanged)</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">System Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full border bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B5D3B]">
                <option value="SUPER_ADMIN">Admin (Full Access)</option>
                <option value="KITCHEN">Kitchen Staff</option>
                <option value="WAITER">Waiter</option>
              </select>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="edit-user-active" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4 text-[#0B5D3B] rounded focus:ring-[#0B5D3B]" />
              <label htmlFor="edit-user-active" className="text-sm font-medium">Account is active</label>
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer text-sm font-medium">Cancel</button>
              </DialogClose>
              <button type="submit" disabled={updateMutation.isPending} className="bg-[#0B5D3B] text-white px-5 py-2 rounded-lg font-medium transition-colors hover:bg-[#094A2F] cursor-pointer flex items-center gap-2 text-sm">
                {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Update Account
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
