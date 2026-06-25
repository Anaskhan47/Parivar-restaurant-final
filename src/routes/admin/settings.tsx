import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { KeyRound, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, token } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/api/v1/users/me/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to change password');
      }

      toast.success('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[#042416]">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-20 h-20 bg-[#0B5D3B] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <h3 className="font-semibold text-lg text-gray-900">{user?.username}</h3>
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium mt-1">{user?.role}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Account Active
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-[#D4A017]" />
              Change Password
            </h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] focus:bg-white transition-colors"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !currentPassword || !newPassword || !confirmPassword}
                  className="bg-[#0B5D3B] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
