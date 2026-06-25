import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNotificationStore } from '@/hooks/useNotificationStore';

export function useWebSocket() {
  const queryClient = useQueryClient();
  const ws = useRef<WebSocket | null>(null);
  const isConnecting = useRef(false);

  useEffect(() => {
    let reconnectTimeout: ReturnType<typeof setTimeout>;
    let pingInterval: ReturnType<typeof setInterval>;

    const connect = () => {
      if (ws.current?.readyState === WebSocket.OPEN || isConnecting.current) return;
      isConnecting.current = true;
      
      const socket = new WebSocket(`${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/ws`);
      ws.current = socket;

      socket.onopen = () => {
        console.log('WebSocket Connected');
        isConnecting.current = false;
        // Start Heartbeat
        pingInterval = setInterval(() => {
          if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: "PING" }));
          }
        }, 30000); // 30 seconds
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === 'PONG') return;
          
          console.log('WS Message:', message);
          switch (message.type) {
            case 'ORDER_CREATED':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['tables'] });
              toast.success(`New order received for Table ${message.data.table_number || message.data.table_id || 'Take-away'}`);
              break;
            case 'ORDER_ACCEPTED':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['kitchen-queue'] });
              toast.info(`Order #${message.data.id} sent to kitchen`);
              break;
            case 'ORDER_PREPARING':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['kitchen-queue'] });
              break;
            case 'ORDER_READY':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['kitchen-queue'] });
              toast.success(`Order #${message.data.id} is ready for serving!`);
              break;
            case 'ORDER_COMPLETED':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['kitchen-queue'] });
              break;
            case 'ORDER_STATUS_CHANGED':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['kitchen-queue'] });
              queryClient.invalidateQueries({ queryKey: ['tables'] });
              break;
            case 'BILL_GENERATED':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              toast.success(`Bill generated for Order #${message.data.order_id}`);
              break;
            case 'TABLE_UPDATED':
              queryClient.invalidateQueries({ queryKey: ['tables'] });
              break;
            case 'KITCHEN_ITEM_UPDATED':
              queryClient.invalidateQueries({ queryKey: ['kitchen-queue'] });
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              break;
            case 'PAYMENT_COMPLETED':
              queryClient.invalidateQueries({ queryKey: ['orders'] });
              queryClient.invalidateQueries({ queryKey: ['tables'] });
              queryClient.invalidateQueries({ queryKey: ['payments'] });
              toast.success(`Payment of $${message.data.amount} completed for Order #${message.data.order_id}`);
              break;
            case 'PAYMENT_REQUESTED':
              useNotificationStore.getState().incrementBillingBadge();
              toast.info(`Payment Request: ${message.data.message}`, { duration: 10000 });
              break;
            default:
              break;
          }
        } catch (err) {
          console.error('Error parsing WS message:', err);
        }
      };

      socket.onclose = () => {
        console.log('WebSocket Disconnected. Attempting to reconnect...');
        isConnecting.current = false;
        clearInterval(pingInterval);
        reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimeout);
      clearInterval(pingInterval);
      if (ws.current) {
        // Prevent onclose from triggering a reconnect when the component unmounts intentionally
        ws.current.onclose = null; 
        ws.current.close();
        ws.current = null;
        isConnecting.current = false;
      }
    };
  }, [queryClient]);
}
