"use client"

import { create } from "zustand";

export type CartState = {
    isOpenContent: boolean
}

type CartActions = {
    setOpenContent: () => void
    setCloseContent: () => void
}

export type CartStore = CartState & CartActions;

export const useCart = create<CartStore>(
    (set, get) => ({
        isOpenContent: false,
        setOpenContent: () => set((state) => ({ isOpenContent: !state.isOpenContent })),
        setCloseContent: () => set((state) => ({ isOpenContent: false }))
    })
);