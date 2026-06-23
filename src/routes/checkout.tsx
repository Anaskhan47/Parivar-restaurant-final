import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { useCartStore } from '@/store/cart';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Printer, Download, UtensilsCrossed } from 'lucide-react';
import { InvoicePreview } from '@/components/billing/InvoicePreview';
import { useReactToPrint } from 'react-to-print';
import { KitchenTicket } from '@/components/billing/KitchenTicket';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState<'Dine-In' | 'Take-Away'>('Dine-In');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [tableNumber, setTableNumber] = useState('');
  
  const invoiceRef = useRef<HTMLDivElement>(null);
  const kitchenTicketRef = useRef<HTMLDivElement>(null);

  // Print Receipt
  const handlePrintReceipt = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: 'Parivar_Receipt',
  });

  // Print Kitchen Ticket
  const handlePrintKitchen = useReactToPrint({
    contentRef: kitchenTicketRef,
    documentTitle: 'Parivar_Kitchen_Ticket',
  });

  // Download PDF
  const handleDownloadPDF = () => {
    // We use standard printing for PDF to support modern CSS seamlessly
    // The user can select "Save as PDF" in the print dialog
    handlePrintReceipt();
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background text-foreground pt-32 flex flex-col items-center">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-display text-gold mb-6">Your Cart is Empty</h1>
          <Link to="/menu" className="bg-[#0B5D3B] text-white px-8 py-3 rounded-full hover:bg-gold transition-colors">
            Return to Menu
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6E8D7]/30 text-foreground overflow-x-hidden pt-32 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-10 flex-1 max-w-7xl">
        <button 
          onClick={() => navigate({ to: '/menu' })}
          className="inline-flex items-center gap-2 text-[#042416] hover:text-[#D4A017] transition-colors font-medium mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Menu
        </button>

        <h1 className="font-display text-4xl text-[#042416] mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Options */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass p-8 rounded-2xl border border-gold/20 shadow-sm">
              <h2 className="text-2xl font-display mb-6">Order Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Order Type</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setOrderType('Dine-In')}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all ${orderType === 'Dine-In' ? 'border-[#0B5D3B] bg-[#0B5D3B]/10 text-[#0B5D3B] font-bold' : 'border-gray-200 text-gray-500 hover:border-gold/50'}`}
                    >
                      Dine-In
                    </button>
                    <button 
                      onClick={() => setOrderType('Take-Away')}
                      className={`flex-1 py-3 rounded-xl border-2 transition-all ${orderType === 'Take-Away' ? 'border-[#0B5D3B] bg-[#0B5D3B]/10 text-[#0B5D3B] font-bold' : 'border-gray-200 text-gray-500 hover:border-gold/50'}`}
                    >
                      Take-Away
                    </button>
                  </div>
                </div>

                {orderType === 'Dine-In' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Table Number</label>
                    <input 
                      type="text" 
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. 12" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Payment Method</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                  >
                    <option>Credit Card</option>
                    <option>Cash</option>
                    <option>EFTPOS</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-2xl border border-gold/20 shadow-sm flex flex-col gap-4">
              <h2 className="text-xl font-display mb-2">Billing Actions</h2>
              
              <button 
                onClick={() => handlePrintReceipt()}
                className="w-full bg-[#042416] text-white py-3 rounded-xl hover:bg-[#D4A017] transition flex justify-center items-center gap-2 font-medium"
              >
                <Printer className="w-5 h-5" />
                Print Receipt
              </button>
              
              <button 
                onClick={handleDownloadPDF}
                className="w-full border-2 border-[#042416] text-[#042416] py-3 rounded-xl hover:bg-[#042416] hover:text-white transition flex justify-center items-center gap-2 font-medium"
              >
                <Download className="w-5 h-5" />
                Download PDF Invoice
              </button>

              <button 
                onClick={() => handlePrintKitchen()}
                className="w-full bg-red-900 text-white py-3 rounded-xl hover:bg-red-800 transition flex justify-center items-center gap-2 font-medium mt-4"
              >
                <UtensilsCrossed className="w-5 h-5" />
                Print Kitchen Ticket
              </button>
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-display mb-4 text-[#042416] opacity-70 px-4">Invoice Preview</h2>
            <div className="overflow-hidden rounded-xl border border-gold/20 shadow-xl bg-white relative">
              <div className="absolute top-0 right-0 bg-[#D4A017] text-white px-4 py-1 text-xs font-bold uppercase rounded-bl-xl z-10">Live Preview</div>
              {/* Scale it down slightly on small screens so it fits */}
              <div className="scale-90 sm:scale-100 origin-top">
                <InvoicePreview 
                  ref={invoiceRef}
                  orderType={orderType}
                  paymentMethod={paymentMethod}
                  tableNumber={tableNumber}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Hidden Kitchen Ticket for printing */}
      <div className="hidden">
         <KitchenTicket 
            ref={kitchenTicketRef}
            orderType={orderType}
            tableNumber={tableNumber}
         />
      </div>

      <Footer />
    </main>
  );
}
