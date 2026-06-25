import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Info, Plus, Trash2, Loader2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/floor")({
  component: FloorPlan,
});

function FloorPlan() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newCapacity, setNewCapacity] = useState('4');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const { data: tables, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api/v1/tables", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!token,
  });

  const createTable = useMutation({
    mutationFn: async (data: { table_number: string; capacity: number }) => {
      const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api/v1/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, status: "AVAILABLE" }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to create table");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      setIsAddOpen(false);
      setNewTableNumber('');
      setNewCapacity('4');
      toast.success("Table added successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to add table");
    },
  });

  const deleteTable = useMutation({
    mutationFn: async (tableId: number) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/tables/${tableId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to delete table");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      setDeletingId(null);
      toast.success("Table removed successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete table");
      setDeletingId(null);
    },
  });

  if (isLoading) {
    return <div className="animate-pulse flex space-x-4">Loading floor plan...</div>;
  }

  const getTableStatusColor = (status: string) => {
    switch(status) {
      case "AVAILABLE": return "bg-green-100 border-green-300 text-green-800";
      case "OCCUPIED": return "bg-blue-100 border-blue-300 text-blue-800";
      case "RESERVED": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "NEEDS_CLEANING": return "bg-orange-100 border-orange-300 text-orange-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNumber.trim()) return;
    createTable.mutate({
      table_number: newTableNumber.trim(),
      capacity: parseInt(newCapacity) || 4,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Floor Plan View</h1>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-400"></div> Available</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-400"></div> Occupied</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Reserved</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-400"></div> Cleaning</div>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#0B5D3B] hover:bg-[#094A2F] text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 text-sm"
          >
            <Plus size={18} /> Add Table
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[600px]">
        {/* Simple grid layout for tables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {tables?.map((table: any) => {
            const activeOrder = table.active_order;
            const hasOrder = !!activeOrder;
            
            // Calculate elapsed time in minutes
            let elapsedMinutes = 0;
            if (hasOrder && activeOrder.created_at) {
              const created = new Date(activeOrder.created_at).getTime();
              const now = new Date().getTime();
              elapsedMinutes = Math.floor((now - created) / 60000);
            }
            
            return (
              <div 
                key={table.id} 
                className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all hover:shadow-md group ${getTableStatusColor(table.status)}`}
              >
                {/* Delete button — only for non-occupied tables */}
                {!hasOrder && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete table ${table.table_number}?`)) {
                        setDeletingId(table.id);
                        deleteTable.mutate(table.id);
                      }
                    }}
                    className="absolute top-2 left-2 p-1.5 rounded-lg bg-white/70 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete table"
                  >
                    {deletingId === table.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                )}

                <div className="absolute top-3 right-3">
                  <Info size={16} className="opacity-50 hover:opacity-100" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-3xl font-bold font-display mb-1">{table.table_number}</h3>
                  <div className="flex items-center justify-center gap-1.5 opacity-80 text-xs font-semibold">
                    <Users size={14} />
                    <span>Cap: {table.capacity}</span>
                  </div>
                </div>

                {hasOrder ? (
                  <div className="mt-4 pt-3 border-t border-blue-200/50 space-y-2 text-xs font-medium">
                    <div className="flex justify-between">
                      <span className="opacity-75">Order:</span>
                      <span className="font-bold">#{activeOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Guests:</span>
                      <span className="font-bold">{activeOrder.guest_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Value:</span>
                      <span className="font-bold text-[#0B5D3B]">${activeOrder.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-75">Status:</span>
                      <span className="font-bold uppercase tracking-wider">{activeOrder.status}</span>
                    </div>
                    {activeOrder.waiter_username && (
                      <div className="flex justify-between">
                        <span className="opacity-75">Waiter:</span>
                        <span className="font-bold truncate max-w-[80px]">{activeOrder.waiter_username}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[10px] opacity-75 mt-2 bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100">
                      <span>Elapsed:</span>
                      <span>{elapsedMinutes}m ago</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1 mt-6">
                    <div className="px-3 py-1 bg-white/50 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {table.status.replace("_", " ")}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Table Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-sm p-6">
          <DialogTitle className="text-xl font-display font-bold mb-4">Add New Table</DialogTitle>
          <form onSubmit={handleCreateTable} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Table Number</label>
              <input
                required
                value={newTableNumber}
                onChange={(e) => setNewTableNumber(e.target.value)}
                placeholder="e.g. T11"
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Capacity (seats)</label>
              <input
                required
                type="number"
                min="1"
                max="50"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B5D3B] focus:border-[#0B5D3B]"
              />
            </div>
            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
              <DialogClose asChild>
                <button type="button" className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
              </DialogClose>
              <button
                type="submit"
                disabled={createTable.isPending}
                className="bg-[#0B5D3B] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#094A2F] flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {createTable.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Add Table
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
