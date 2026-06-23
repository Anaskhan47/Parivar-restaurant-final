import React, { forwardRef } from 'react';
import { useCartStore } from '@/store/cart';
import logo from '@/assets/parivar-logo.png';

interface KitchenTicketProps {
  orderType: 'Dine-In' | 'Take-Away';
  tableNumber?: string;
}

export const KitchenTicket = forwardRef<HTMLDivElement, KitchenTicketProps>(
  ({ orderType, tableNumber }, ref) => {
    const { items } = useCartStore();
    const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();

    return (
      <div 
        ref={ref} 
        className="bg-white p-6 w-full max-w-sm mx-auto text-black"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <div className="text-center border-b-2 border-black pb-4 mb-4 flex flex-col items-center">
          <img src={logo} alt="Parivar Restaurant" className="w-20 h-auto object-contain mb-2 grayscale" />
          <h1 className="text-3xl font-bold uppercase mb-2">KITCHEN TICKET</h1>
          <h2 className="text-xl font-bold border border-black inline-block px-4 py-1">
            {orderType} {orderType === 'Dine-In' && tableNumber ? `- TABLE ${tableNumber}` : ''}
          </h2>
        </div>

        <div className="flex justify-between text-sm mb-6 border-b border-dashed border-gray-400 pb-4">
          <div>
            <p>Order: #{orderNumber}</p>
          </div>
          <div className="text-right">
            <p>{now.toLocaleDateString()}</p>
            <p>{now.toLocaleTimeString()}</p>
          </div>
        </div>

        <table className="w-full text-lg mb-6">
          <thead>
            <tr className="border-b border-black text-left">
              <th className="py-2 w-16">QTY</th>
              <th className="py-2">ITEM</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-b border-dashed border-gray-300">
                <td className="py-3 font-bold text-xl align-top">{item.quantity} x</td>
                <td className="py-3 font-bold">
                  {item.name}
                  {item.notes && (
                    <div className="text-sm font-normal italic mt-1 bg-gray-100 p-1">
                      Note: {item.notes}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-8 pt-4 border-t-2 border-black">
          <p className="font-bold text-xl uppercase tracking-widest">End of Ticket</p>
        </div>
      </div>
    );
  }
);

KitchenTicket.displayName = 'KitchenTicket';
