"use client"

import { create } from "zustand";

type ModelColor = {
    variant: string;
    materials?: Record<string, string>
}

export type ProductCustomiserState = {
    color: ModelColor;
}

type ProductCustomiserActions = {
    setColor: (color: ModelColor) => void;
    resetToDefault: () => void;
}

export type ProductCustomiserStore = ProductCustomiserState & ProductCustomiserActions;

export const useProductCustomiser = create<ProductCustomiserStore>(
    (set, get) => ({
        color: { variant: "default" } as ModelColor,

        setColor: (color: ModelColor) => {
            set({ color });
        },

        resetToDefault: () => {
            set({
                color: {
                    variant: "default",
                    materials: {}
                }
            })
        }
    })
);