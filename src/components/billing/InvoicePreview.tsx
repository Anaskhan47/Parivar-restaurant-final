import React, { forwardRef } from 'react';
import { useCartStore } from '@/store/cart';
import logo from '@/assets/parivar-logo.png';

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface InvoiceTotals {
  subtotal: number;
  tax: number;
  serviceFee?: number;
  total: number;
}

interface InvoicePreviewProps {
  orderType: 'Dine-In' | 'Take-Away' | 'DINE_IN' | 'TAKE_AWAY';
  paymentMethod: string;
  tableNumber?: string;
  items?: InvoiceItem[];
  totals?: InvoiceTotals;
  orderNumber?: string;
  date?: string;
  time?: string;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ 
    orderType, 
    paymentMethod, 
    tableNumber, 
    items: propItems, 
    totals: propTotals, 
    orderNumber: propOrderNumber, 
    date: propDate, 
    time: propTime 
  }, ref) => {
    const { items: cartItems, getTotal } = useCartStore();

    const displayOrderType = orderType === 'DINE_IN' ? 'Dine-In' : orderType === 'TAKE_AWAY' ? 'Take-Away' : orderType;

    const itemsToRender = propItems || cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const subtotal = propTotals ? propTotals.subtotal : getTotal();
    const tax = propTotals ? propTotals.tax : subtotal * 0.1;
    const serviceFee = propTotals ? propTotals.serviceFee : undefined;
    const total = propTotals ? propTotals.total : (subtotal + tax);

    const displayOrderNumber = propOrderNumber || Math.floor(100000 + Math.random() * 900000).toString();
    const displayDate = propDate || new Date().toLocaleDateString();
    const displayTime = propTime || new Date().toLocaleTimeString();

    return (
      <div 
        ref={ref} 
        className="bg-white p-10 mx-auto border shadow-lg max-w-2xl text-[#042416]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center border-b pb-6 mb-6">
          <img src={logo} alt="Parivar Restaurant" className="w-28 h-auto object-contain mb-4" />
          <div className="text-sm text-gray-600">
            <p>123 Sydney Street, NSW 2000</p>
            <p>Phone: +61 2 1234 5678</p>
            <p>Email: hello@parivarsydney.com</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="flex justify-between items-start mb-8 text-sm">
          <div>
            <p className="font-semibold mb-1">Order Details:</p>
            <p>Order #: <span className="font-mono">{displayOrderNumber}</span></p>
            <p>Date: {displayDate}</p>
            <p>Time: {displayTime}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold mb-1">Order Type:</p>
            <p className="font-bold text-[#D4A017] uppercase">{displayOrderType}</p>
            {tableNumber && <p>Table: {tableNumber}</p>}
            <p className="mt-2 text-gray-500">Payment: {paymentMethod}</p>
          </div>
        </div>

        {/* Itemized Bill */}
        <div className="mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#042416] text-left">
                <th className="py-2 font-semibold">Item</th>
                <th className="py-2 text-center font-semibold">Qty</th>
                <th className="py-2 text-right font-semibold">Price</th>
                <th className="py-2 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {itemsToRender.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3 text-center">{item.quantity}</td>
                  <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-3 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-64">
            <div className="flex justify-between py-1 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 text-sm text-gray-500">
              <span>Tax (GST 10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {serviceFee !== undefined && serviceFee > 0 && (
              <div className="flex justify-between py-1 text-sm text-gray-500">
                <span>Service Fee (5%)</span>
                <span>${serviceFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 mt-2 border-t-2 border-[#042416] text-lg font-bold">
              <span>Total</span>
              <span className="text-[#D4A017]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t pt-6 text-sm text-gray-500">
          <p className="font-semibold text-[#042416] mb-1">Thank you for dining with Parivar!</p>
          <p>Please come again.</p>
        </div>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';
