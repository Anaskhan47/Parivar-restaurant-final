import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { CalendarDays, Phone, Mail, Users, CheckCircle2, XCircle, Clock, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/catering")({
  component: CateringManagement,
});

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONTACTED: "bg-blue-100 text-blue-800 border-blue-200",
  QUOTED: "bg-purple-100 text-purple-800 border-purple-200",
  APPROVED: "bg-green-100 text-green-800 border-green-200",
  COMPLETED: "bg-gray-100 text-gray-700 border-gray-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_STEPS = ["PENDING", "CONTACTED", "QUOTED", "APPROVED", "COMPLETED"];

function CateringManagement() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const { data: requests, isLoading } = useQuery({
    queryKey: ["catering-requests"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/v1/catering/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch catering requests");
      return res.json();
    },
    enabled: !!token,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await fetch(`http://localhost:8000/api/v1/catering/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catering-requests"] });
      toast.success("Status updated!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteRequest = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`http://localhost:8000/api/v1/catering/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete request");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catering-requests"] });
      toast.success("Request deleted.");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const filtered = filterStatus === "ALL"
    ? requests
    : requests?.filter((r: any) => r.status === filterStatus);

  const counts: Record<string, number> = {};
  requests?.forEach((r: any) => {
    counts[r.status] = (counts[r.status] || 0) + 1;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#0B5D3B]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-[#042416]">Catering Requests</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage event and catering enquiries from customers.
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-white border border-gray-100 rounded-xl px-4 py-2 shadow-sm">
          {requests?.length || 0} total requests
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["ALL", ...STATUS_STEPS, "REJECTED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              filterStatus === s
                ? "bg-[#0B5D3B] text-white border-[#0B5D3B]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#0B5D3B]/50"
            }`}
          >
            {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            {s !== "ALL" && counts[s] ? (
              <span className="ml-1.5 bg-white/20 text-inherit rounded-full px-1.5 py-0.5">
                {counts[s]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered?.map((req: any) => (
          <div
            key={req.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-all"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{req.customer_name}</h3>
                {req.event_type && (
                  <p className="text-xs text-[#0B5D3B] font-semibold mt-0.5">{req.event_type}</p>
                )}
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_COLORS[req.status] || "bg-gray-100 text-gray-700"}`}
              >
                {req.status}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400 shrink-0" />
                <span>{req.phone}</span>
              </div>
              {req.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400 shrink-0" />
                  <span className="truncate">{req.email}</span>
                </div>
              )}
              {req.guest_count && (
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-gray-400 shrink-0" />
                  <span>{req.guest_count} guests</span>
                </div>
              )}
              {req.event_date && (
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-gray-400 shrink-0" />
                  <span>{new Date(req.event_date).toLocaleDateString("en-US", { dateStyle: "medium" })}</span>
                </div>
              )}
              {req.requirements && (
                <div className="flex items-start gap-2">
                  <MessageCircle size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 line-clamp-2">{req.requirements}</p>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock size={12} />
                <span>Received {new Date(req.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {req.status !== "COMPLETED" && req.status !== "REJECTED" && (
                <div className="flex gap-2">
                  {STATUS_STEPS.indexOf(req.status) < STATUS_STEPS.length - 1 && (
                    <button
                      onClick={() =>
                        updateStatus.mutate({
                          id: req.id,
                          status: STATUS_STEPS[STATUS_STEPS.indexOf(req.status) + 1],
                        })
                      }
                      disabled={updateStatus.isPending}
                      className="flex-1 py-2 px-3 bg-[#0B5D3B] hover:bg-[#094A2F] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <CheckCircle2 size={14} />
                      Mark as {STATUS_STEPS[STATUS_STEPS.indexOf(req.status) + 1].charAt(0) + STATUS_STEPS[STATUS_STEPS.indexOf(req.status) + 1].slice(1).toLowerCase()}
                    </button>
                  )}
                  <button
                    onClick={() => updateStatus.mutate({ id: req.id, status: "REJECTED" })}
                    disabled={updateStatus.isPending}
                    className="py-2 px-3 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              )}
              {(req.status === "COMPLETED" || req.status === "REJECTED") && (
                <button
                  onClick={() => {
                    if (confirm("Delete this catering request?")) deleteRequest.mutate(req.id);
                  }}
                  className="w-full py-2 border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
                >
                  Delete Record
                </button>
              )}
            </div>
          </div>
        ))}

        {(!filtered || filtered.length === 0) && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-gray-400">
            <CalendarDays size={48} className="mb-4 opacity-40" />
            <p className="text-lg font-medium">No catering requests found</p>
            <p className="text-sm mt-1">
              {filterStatus !== "ALL" ? `No requests with status "${filterStatus}"` : "Requests submitted on the website will appear here."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
