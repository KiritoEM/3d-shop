"use client"

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItemTypes = {
    preview3D?: string;
    id: number;
    name: string;
    price: number;
}

type NotificationStatus = "delete" | "add";

export type CartState = {
    isOpenContent: boolean;
    cartItems: CartItemTypes[];
    cartNotification?: {
        title: string;
        status: NotificationStatus
    }
}

type CartActions = {
    setOpenContent: () => void
    setCloseContent: () => void
    addItem: (item: CartItemTypes) => void;
    checkIsInCart: (id: number) => boolean;
    deleteItem: (id: number) => void;
    getTotalPrice: () => number;
    addNewNotification: (title: string, status: NotificationStatus) => void;
    removeNotification: () => void;
}

export type CartStore = CartState & CartActions;

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            isOpenContent: false,
            cartItems: [],
            notifications: {} as any,

            //Actions
            setOpenContent: () => set((state) => ({ isOpenContent: !state.isOpenContent })),
            setCloseContent: () => set((state) => ({ isOpenContent: false })),
            addItem: (newItem: CartItemTypes) => {
                const { addNewNotification } = get();

                set((state) => {
                    const existingItem = state.cartItems.find((item) => item.id === newItem.id);
                    let updatedCartItems = [...state.cartItems];

                    if (!existingItem) {
                        updatedCartItems.push(newItem);
                    }

                    addNewNotification(`New item added to card : ${newItem.name}`, "add");

                    return {
                        cartItems: updatedCartItems
                    }
                })
            },
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
            },
            addNewNotification: (title, status) => {
                let newNotification = { title, status };

                set({ cartNotification: newNotification });
            },
            removeNotification: () => {
                set({
                    cartNotification: {
                        title: "",
                        status: "delete"
                    }
                })
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