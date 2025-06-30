import { CartItemTypes } from "@/features/cart/hooks/useCart";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PaymentState = {
    productsToBuy: CartItemTypes[];
    _hasHydrated: boolean;
};

type PaymentActions = {
    setProductsToBuy: (item: CartItemTypes[]) => void;
    setHasHydrated: (state: boolean) => void;
};

type PaymentStore = PaymentState & PaymentActions;

export const usePayment = create<PaymentStore>()(
    persist(
        (set) => ({
            productsToBuy: [],
            _hasHydrated: false,

            // Actions
            setProductsToBuy: (items) => set({ productsToBuy: items }),
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: "payment-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                productsToBuy: state.productsToBuy,
            }),

            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        },
    ),
);
