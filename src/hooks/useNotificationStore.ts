import { create } from 'zustand';

interface NotificationState {
  billingBadgeCount: number;
  incrementBillingBadge: () => void;
  clearBillingBadge: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  billingBadgeCount: 0,
  incrementBillingBadge: () => set((state) => ({ billingBadgeCount: state.billingBadgeCount + 1 })),
  clearBillingBadge: () => set({ billingBadgeCount: 0 }),
}));
