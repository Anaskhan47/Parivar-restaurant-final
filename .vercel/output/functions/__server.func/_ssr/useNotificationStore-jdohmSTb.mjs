import { c as create } from "../_libs/zustand.mjs";
const useNotificationStore = create((set) => ({
  billingBadgeCount: 0,
  incrementBillingBadge: () => set((state) => ({ billingBadgeCount: state.billingBadgeCount + 1 })),
  clearBillingBadge: () => set({ billingBadgeCount: 0 })
}));
export {
  useNotificationStore as u
};
