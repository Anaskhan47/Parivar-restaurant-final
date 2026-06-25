import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Receipt, Search, CreditCard, Banknote, Send, Copy, Printer, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useNotificationStore } from "@/hooks/useNotificationStore";
import { useReactToPrint } from "react-to-print";
import { InvoicePreview } from "@/components/billing/InvoicePreview";

export const Route = createFileRoute("/admin/billing")({
  component: BillingPayments,
});

function BillingPayments() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useNotificationStore.getState().clearBillingBadge();
  }, []);

  // Print Receipt
  const handlePrintReceipt = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `Parivar_Receipt_${selectedOrderId}`,
  });

  // Download PDF
  const handleDownloadPDF = () => {
    toast.info("Please select 'Save as PDF' in the print dialog.");
    handlePrintReceipt();
  };

  // Copy Link
  const handleCopyLink = () => {
    if (!selectedOrderId) return;
    const link = `${window.location.origin}/order-tracking/${selectedOrderId}`;
    navigator.clipboard.writeText(link)
      .then(() => toast.success("Tracking link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:8000") + "/api/v1/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!token,
  });

  const generateBill = useMutation({
    mutationFn: async (orderId: number) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/payments/bills`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ order_id: orderId })
      });
      if (!res.ok) throw new Error("Failed to generate bill");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Bill generated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  const sendBill = useMutation({
    mutationFn: async (orderId: number) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/payments/bills/order/${orderId}/send`, {
        method: 'POST',
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      if (!res.ok) throw new Error("Failed to send bill");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Bill sent to customer successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  const completePayment = useMutation({
    mutationFn: async ({ orderId, amount, method }: { orderId: number, amount: number, method: string }) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.VITE_API_URL || "http://localhost:8000") + ""}/api/v1/payments`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ order_id: orderId, amount, method })
      });
      if (!res.ok) throw new Error("Payment failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      setSelectedOrderId(null);
      toast.success("Payment completed successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message);
    }
  });

  const selectedOrder = orders?.find((o: any) => o.id === selectedOrderId);

  if (isLoading) {
    return <div className="animate-pulse">Loading Billing System...</div>;
  }

  // Filter for orders that are READY or COMPLETED (served and awaiting bill/payment)
  const unpaidOrders = orders?.filter((o: any) => 
    o.status === "COMPLETED" || o.status === "READY"
  ) || [];

  return (
    <div className="h-full flex gap-6">
      {/* Active Orders List */}
      <div className="w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Unpaid Orders</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Table..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {unpaidOrders.map((order: any) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrderId(order.id)}
              className={`w-full text-left p-4 mb-2 rounded-lg border transition-colors ${
                selectedOrderId === order.id 
                  ? 'bg-[#0B5D3B]/5 border-[#0B5D3B]' 
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-900">Order #{order.id}</span>
                <span className="font-bold text-gray-900">${order.total_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {order.order_type === 'DINE_IN' 
                    ? `Table ${order.table?.table_number || order.table_id}` 
                    : 'Take-away'}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  order.status === 'READY' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {order.status}
                </span>
              </div>
            </button>
          ))}
          {unpaidOrders.length === 0 && (
            <div className="text-center p-8 text-gray-500">
              <Receipt size={48} className="mx-auto mb-4 opacity-50" />
              <p>No unpaid orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {selectedOrder ? (
          <>
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-bold font-display text-gray-900">Order #{selectedOrder.id}</h2>
                <p className="text-gray-500">{selectedOrder.order_type === 'DINE_IN' ? `Table ${selectedOrder.table?.table_number || selectedOrder.table_id}` : 'Take-away Order'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-[#0B5D3B]">${selectedOrder.total_amount.toFixed(2)}</p>
              </div>
            </div>

            {selectedOrder.bill ? (
              // Split POS Layout (Preview + Actions)
              <div className="flex-1 flex overflow-hidden">
                {/* Left side: Bill Preview */}
                <div className="w-[55%] border-r border-gray-100 overflow-y-auto bg-gray-50/50 p-6 flex justify-center">
                  <div className="w-full max-w-md bg-white shadow-md border rounded-xl overflow-hidden scale-90 sm:scale-100 origin-top h-fit">
                    <InvoicePreview
                      ref={invoiceRef}
                      orderType={selectedOrder.order_type}
                      paymentMethod={paymentMethod === 'CARD' ? 'Card' : 'Cash'}
                      tableNumber={selectedOrder.table_id ? `T${selectedOrder.table_id.toString().padStart(2, '0')}` : undefined}
                      items={selectedOrder.items.map((item: any) => ({
                        name: item.menu_item.name,
                        quantity: item.quantity,
                        price: item.unit_price,
                      }))}
                      totals={{
                        subtotal: selectedOrder.bill.subtotal,
                        tax: selectedOrder.bill.tax_amount,
                        serviceFee: selectedOrder.bill.service_fee,
                        total: selectedOrder.bill.grand_total,
                      }}
                      orderNumber={selectedOrder.id.toString()}
                      date={new Date(selectedOrder.created_at || Date.now()).toLocaleDateString()}
                      time={new Date(selectedOrder.created_at || Date.now()).toLocaleTimeString()}
                    />
                  </div>
                </div>

                {/* Right side: Payment & Sharing Controls */}
                <div className="w-[45%] overflow-y-auto p-6 bg-white flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Share & Export */}
                    <div>
                      <h3 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase">Share & Export</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleCopyLink}
                          className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 font-bold text-xs text-gray-700 transition-all cursor-pointer"
                        >
                          <Copy size={14} /> Copy Link
                        </button>
                        <button
                          onClick={handleDownloadPDF}
                          className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 font-bold text-xs text-gray-700 transition-all cursor-pointer"
                        >
                          <Download size={14} /> Save PDF
                        </button>
                        <button
                          onClick={() => handlePrintReceipt()}
                          className="py-2.5 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 font-bold text-xs text-gray-700 transition-all cursor-pointer col-span-2"
                        >
                          <Printer size={14} /> Print Receipt
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">Digital Bill</h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {selectedOrder.bill.is_sent 
                              ? "Visible on customer's screen" 
                              : "Not yet visible to customer"}
                          </p>
                        </div>
                        <button
                          onClick={() => sendBill.mutate(selectedOrder.id)}
                          disabled={sendBill.isPending}
                          className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                            selectedOrder.bill.is_sent
                              ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                              : "bg-[#D4A017] hover:bg-[#D4A017]/90 text-white shadow-sm border border-transparent"
                          }`}
                        >
                          <Send size={14} className={sendBill.isPending ? "animate-pulse" : ""} />
                          {sendBill.isPending 
                            ? "Sending..." 
                            : selectedOrder.bill.is_sent 
                              ? "Resend" 
                              : "Send"}
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                      <h3 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase">Payment Method</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setPaymentMethod("CASH")}
                          className={`py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
                            paymentMethod === "CASH" 
                              ? "border-[#0B5D3B] bg-[#0B5D3B]/5 text-[#0B5D3B]" 
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <Banknote size={18} /> Cash
                        </button>
                        <button
                          onClick={() => setPaymentMethod("CARD")}
                          className={`py-3 px-4 rounded-xl border-2 flex items-center justify-center gap-2 font-bold transition-all cursor-pointer ${
                            paymentMethod === "CARD" 
                              ? "border-[#0B5D3B] bg-[#0B5D3B]/5 text-[#0B5D3B]" 
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <CreditCard size={18} /> Card
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => completePayment.mutate({ 
                      orderId: selectedOrder.id, 
                      amount: selectedOrder.bill.grand_total, 
                      method: paymentMethod 
                    })}
                    disabled={completePayment.isPending}
                    className="w-full py-4 rounded-xl bg-[#0B5D3B] text-white font-bold text-base hover:bg-[#094A2F] transition-colors shadow-md disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer text-center mt-6"
                  >
                    {completePayment.isPending ? "Processing..." : `Complete Payment of $${selectedOrder.bill.grand_total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            ) : (
              // Regular details view when bill is not yet generated
              <>
                <div className="flex-1 overflow-y-auto p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.menu_item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.unit_price.toFixed(2)}</p>
                        </div>
                        <div className="font-medium text-gray-900">
                          ${(item.quantity * item.unit_price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-gray-500 mb-2">
                      <span>Subtotal</span>
                      <span>${selectedOrder.total_amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 mb-2">
                      <span>Tax (10%)</span>
                      <span>Pending</span>
                    </div>
                    <div className="flex justify-between text-gray-500 mb-4">
                      <span>Service Fee (5%)</span>
                      <span>Pending</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Grand Total</span>
                      <span className="text-gold">Pending</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gold/30 bg-gold/5 rounded-2xl space-y-4">
                    <Receipt className="w-10 h-10 text-gold animate-pulse" />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 text-sm">Awaiting Bill Generation</h4>
                      <p className="text-xs text-gray-500 max-w-xs mt-1">This order is ready to be paid. First, generate a bill to calculate taxes and fees.</p>
                    </div>
                    <button
                      onClick={() => generateBill.mutate(selectedOrder.id)}
                      disabled={generateBill.isPending}
                      className="w-full py-3 px-4 rounded-xl bg-[#D4A017] text-white font-bold text-sm hover:bg-[#D4A017]/90 transition-colors shadow-sm disabled:opacity-50 cursor-pointer text-center"
                    >
                      {generateBill.isPending ? "Generating..." : "Generate Bill"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Receipt size={64} className="mb-4 opacity-30" />
            <h3 className="text-xl font-medium text-gray-500">Select an order to process payment</h3>
          </div>
        )}
      </div>
    </div>
  );
}
