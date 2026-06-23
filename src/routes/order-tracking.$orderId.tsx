import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Clock, CheckCircle2, Loader2, Receipt, CreditCard, ShieldCheck, Eye, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PostOrderAddOns } from '@/components/PostOrderAddOns';
import { InvoicePreview } from '@/components/billing/InvoicePreview';

export const Route = createFileRoute('/order-tracking/$orderId')({
  head: () => ({
    meta: [
      { title: "Track Order | Parivar Restaurant" },
      { name: "description", content: "Track the status of your Parivar Restaurant order." },
    ],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const { orderId } = Route.useParams();
  const queryClient = useQueryClient();
  
  // Payment states
  const [paymentFlowState, setPaymentFlowState] = useState<'IDLE' | 'WAITING_CASHIER' | 'SUCCESS'>('IDLE');

  // Receipt modal state
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order-tracking', orderId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8000/api/v1/orders/${orderId}`);
      if (!res.ok) throw new Error('Failed to fetch order details');
      return res.json();
    },
    refetchInterval: 15000, // Fallback poll every 15s
  });

  // Local WebSocket subscription for real-time status updates
  useEffect(() => {
    let socket: WebSocket | null = null;
    let pingInterval: ReturnType<typeof setInterval>;
    let reconnectTimeout: ReturnType<typeof setTimeout>;

    const connect = () => {
      socket = new WebSocket('ws://localhost:8000/ws');
      
      socket.onopen = () => {
        console.log('WS tracking connected');
        pingInterval = setInterval(() => {
          if (socket?.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'PING' }));
          }
        }, 25000);
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'PONG') return;
          
          if (
            (message.type === 'ORDER_STATUS_CHANGED' || message.type === 'ORDER_UPDATED' || message.type.startsWith('ORDER_')) &&
            String(message.data?.id) === String(orderId)
          ) {
            queryClient.invalidateQueries({ queryKey: ['order-tracking', orderId] });
          }
        } catch (err) {
          console.error('WS parse error:', err);
        }
      };

      socket.onclose = () => {
        clearInterval(pingInterval);
        reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      clearInterval(pingInterval);
      clearTimeout(reconnectTimeout);
      if (socket) {
        socket.onclose = null;
        if (socket.readyState === WebSocket.CONNECTING) {
          socket.onopen = () => socket?.close();
        } else {
          socket.close();
        }
      }
    };
  }, [orderId, queryClient]);

  // When order status becomes CLOSED, show success animation
  useEffect(() => {
    if (order?.status === 'CLOSED') {
      setPaymentFlowState('SUCCESS');
    }
  }, [order?.status]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F6E8D7]/30 text-foreground pt-32 flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <Loader2 className="w-12 h-12 text-[#0B5D3B] animate-spin mb-4" />
          <p className="text-muted-foreground font-medium">Retrieving order tracking info...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#F6E8D7]/30 text-foreground pt-32 flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center flex-1 max-w-md flex flex-col justify-center items-center">
          <h1 className="text-3xl font-display text-gold mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't retrieve the status of order #{orderId}. Please contact our staff.</p>
          <Link to="/menu" className="bg-[#0B5D3B] text-white px-8 py-3 rounded-full hover:bg-gold transition-colors font-medium">
            Return to Menu
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Map order statuses to timeline indices
  const statuses = ['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'COMPLETED'];
  const statusLabels: Record<string, string> = {
    NEW: 'Order Placed',
    ACCEPTED: 'Confirmed',
    PREPARING: 'Preparing',
    READY: 'Ready for Serving',
    COMPLETED: 'Served',
  };
  const statusDescriptions: Record<string, string> = {
    NEW: 'We have received your order.',
    ACCEPTED: 'Our team is reviewing and scheduling your meal.',
    PREPARING: 'Chef is preparing your fresh Hyderabadi delicacies.',
    READY: 'Dishes are plated and heading to your table / takeaway counter.',
    COMPLETED: 'Your meal is served! Enjoy your experience.',
  };

  const currentStatusIndex = statuses.indexOf(order.status === 'CLOSED' ? 'COMPLETED' : order.status);

  return (
    <main className="min-h-screen bg-[#F6E8D7]/30 text-foreground overflow-x-hidden pt-32 flex flex-col justify-between">
      <Navbar />

      <div className="container mx-auto px-6 py-10 flex-1 max-w-4xl">
        <Link 
          to="/menu"
          className="inline-flex items-center gap-2 text-[#042416] hover:text-[#D4A017] transition-colors font-medium mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tracking Status */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-gold/20 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="font-display text-3xl text-[#042416] font-semibold">Track Your Order</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Order ID: <span className="font-mono font-semibold">#{order.id}</span>
                    {order.type && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="font-semibold uppercase">{order.type}</span>
                      </>
                    )}
                    {order.table_number && (
                      <>
                        <span className="mx-2">•</span>
                        <span className="font-semibold">Table {order.table_number}</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="bg-[#0B5D3B]/10 text-[#0B5D3B] px-4 py-2 rounded-xl flex items-center gap-2 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{order.status === 'CLOSED' ? 'COMPLETED' : order.status}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative pl-8 border-l border-gold/20 space-y-8 py-2">
                {statuses.map((statusStep, index) => {
                  const isDone = index <= currentStatusIndex;
                  const isActive = index === currentStatusIndex;
                  
                  return (
                    <div key={statusStep} className="relative">
                      {/* Node Icon/Indicator */}
                      <span className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white border transition-all duration-500 z-10 ${
                        isDone 
                          ? 'bg-[#0B5D3B] border-[#0B5D3B]' 
                          : 'bg-white border-gold/30 text-gold/30'
                      }`}>
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                        )}
                      </span>

                      {/* Content */}
                      <div className={`transition-opacity duration-300 ${isDone ? 'opacity-100' : 'opacity-50'}`}>
                        <h3 className={`font-display text-xl font-semibold flex items-center gap-2 ${isActive ? 'text-[#0B5D3B]' : 'text-[#042416]'}`}>
                          {statusLabels[statusStep]}
                          {isActive && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{statusDescriptions[statusStep]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <PostOrderAddOns
              orderId={orderId}
              disabled={order.status === 'CLOSED' || order.status === 'CANCELLED'}
              onItemsAdded={() => queryClient.invalidateQueries({ queryKey: ['order-tracking', orderId] })}
            />
          </div>

          {/* Order Summary & Payment Section */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Elegant Bill Summary Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-gold/20 bg-white">
              
              <h2 className="text-xl font-display font-semibold text-[#042416] mb-6 flex items-center justify-between">
                <span>Bill Summary</span>
                <span className="text-sm font-mono text-muted-foreground bg-gray-100 px-2.5 py-1 rounded-md">Order #{order.id}</span>
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-6">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center text-sm pb-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.menu_item?.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">${(item.quantity * item.unit_price)?.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {order.bill ? (
                <div className="pt-5 border-t border-gray-200 space-y-2.5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${order.bill.subtotal?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GST (10%)</span>
                    <span className="font-medium">${order.bill.tax_amount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee (5%)</span>
                    <span className="font-medium">${order.bill.service_fee?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-[#042416] pt-3 pb-4">
                    <span>Grand Total</span>
                    <span className="text-[#0B5D3B]">${order.bill.grand_total?.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="pt-5 border-t border-gray-200 space-y-2.5">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${order.total_amount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-[#042416] pt-3 pb-4">
                    <span>Grand Total</span>
                    <span className="text-[#0B5D3B]">${order.total_amount?.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-6">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payment Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                  order.status === 'CLOSED' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {order.status === 'CLOSED' ? (
                    <><CheckCircle2 className="w-3 h-3" /> Paid</>
                  ) : (
                    <>🟡 Pending Payment</>
                  )}
                </span>
              </div>

              <button
                onClick={() => setIsReceiptOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#0B5D3B] text-white font-medium text-sm hover:bg-[#094A2F] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Receipt
              </button>
            </div>

            {/* Payment Section */}
            <AnimatePresence mode="wait">
              {paymentFlowState === 'SUCCESS' || order.status === 'CLOSED' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0B5D3B] text-white p-8 rounded-2xl border border-[#094A2F] text-center"
                >
                  <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-2">Payment Successful</h3>
                  <p className="text-white/80 text-sm mb-6">
                    Transaction ID: #{order.id}-{Date.now().toString().slice(-4)}<br/>
                    Amount Paid: ${order.bill?.grand_total?.toFixed(2) || order.total_amount?.toFixed(2)}<br/>
                    Date: {new Date().toLocaleDateString()}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setIsReceiptOpen(true)} className="flex-1 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl text-sm font-medium cursor-pointer flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View Receipt
                    </button>
                    <Link to="/menu" className="flex-1 py-3 bg-gold hover:bg-gold/90 transition-colors rounded-xl text-[#042416] text-sm font-medium cursor-pointer">
                      Return Home
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 sm:p-8 rounded-2xl border border-gold/20 bg-white"
                >
                  <h2 className="text-lg font-display font-semibold text-[#042416] mb-4 border-b border-gray-100 pb-3 flex items-center justify-between">
                    <span>Payment</span>
                    <span className="text-[#0B5D3B] text-2xl font-bold">${order.bill?.grand_total?.toFixed(2) || order.total_amount?.toFixed(2)}</span>
                  </h2>

                  {paymentFlowState === 'WAITING_CASHIER' ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Waiting for Cashier</h4>
                        <p className="text-sm text-gray-500 mt-1">Please pay at the counter. This screen will update automatically once confirmed.</p>
                      </div>
                      <button 
                        onClick={() => setPaymentFlowState('IDLE')}
                        className="text-xs text-gray-400 hover:text-gray-600 underline mt-4 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 mt-6">

                      <button 
                        onClick={async () => {
                          setPaymentFlowState('WAITING_CASHIER');
                          try {
                            await fetch(`http://localhost:8000/api/v1/payments/order/${order.id}/request-counter-payment`, { method: 'POST' });
                          } catch (err) {
                            console.error('Failed to request counter payment', err);
                          }
                        }}
                        className="py-4 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center gap-2 text-gray-700 cursor-pointer"
                      >
                        <CreditCard className="w-6 h-6" />
                        <span className="font-medium text-sm">Pay at Counter</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>

      <Footer />

      {/* Receipt Modal */}
      <AnimatePresence>
        {isReceiptOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsReceiptOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/80">
                <h3 className="font-display font-semibold text-[#042416]">Order Receipt</h3>
                <button
                  onClick={() => setIsReceiptOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto p-4 sm:p-6 bg-gray-50/50 flex justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="w-full bg-white shadow-sm border rounded-xl overflow-hidden scale-[0.85] sm:scale-100 origin-top">
                  <InvoicePreview
                    orderType={order.order_type || order.type}
                    paymentMethod={order.payment?.method || 'CARD'}
                    tableNumber={order.table_number?.toString()}
                    items={order.items?.map((item: any) => ({
                      name: item.menu_item?.name || item.name,
                      quantity: item.quantity,
                      price: item.unit_price || item.price,
                    }))}
                    totals={{
                      subtotal: order.bill?.subtotal || order.total_amount,
                      tax: order.bill?.tax_amount || 0,
                      serviceFee: order.bill?.service_fee || 0,
                      total: order.bill?.grand_total || order.total_amount,
                    }}
                    orderNumber={order.id?.toString()}
                    date={new Date(order.created_at || Date.now()).toLocaleDateString()}
                    time={new Date(order.created_at || Date.now()).toLocaleTimeString()}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
