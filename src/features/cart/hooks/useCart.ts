"use client"

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItemTypes = {
    preview3D?: string;
    id: number;
    name: string;
    price: number
}

export type CartState = {
    isOpenContent: boolean;
    cartItems: CartItemTypes[];
}

type CartActions = {
    setOpenContent: () => void
    setCloseContent: () => void
    addItem: (item: CartItemTypes) => void;
    checkIsInCart: (id: number) => boolean;
    deleteItem: (id: number) => void;
    getTotalPrice: () => number;
}

export type CartStore = CartState & CartActions;

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            isOpenContent: false,
            cartItems: [],

            //Actions
            setOpenContent: () => set((state) => ({ isOpenContent: !state.isOpenContent })),
            setCloseContent: () => set((state) => ({ isOpenContent: false })),
            addItem: (newItem: CartItemTypes) => set((state) => {
                const existingItem = state.cartItems.find((item) => item.id === newItem.id);
                let updatedCartItems = [...state.cartItems];

                if (!existingItem) {
                    updatedCartItems.push(newItem);
                }

                return {
                    cartItems: updatedCartItems
                }
            }),
            checkIsInCart: (id: number) => {
                const { cartItems } = get();

                return cartItems.some((item) => item.id === id);
            },
            deleteItem: (id: number) => {
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item.id !== id)
                }))
            },
            getTotalPrice: () => {
                const { cartItems } = get();

                return cartItems.map((item) => item.price).reduce((acc, curr) => acc + curr, 0);
            }
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),

            //data to persist
            partialize: (state) => ({
                cartItems: state.cartItems
            }),
        }
    )
);