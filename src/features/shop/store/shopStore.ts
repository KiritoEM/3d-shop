import { normalizeStr } from "@/lib/utils";
import { IProduct } from "@/models/productModel";
import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

export type Filters = {
    priceRange?: [number, number];
    category?: number;
};

type ShopState = {
    rotateModel: boolean;
    filters: Filters;
    searchValue?: string;
    isModelLoaded: boolean;
};

const initialState: ShopState = {
    filters: {
        priceRange: [0, 3000000],
    },
    searchValue: "",
    rotateModel: false,
    isModelLoaded: false,
};

const useShopStore = create(
    devtools(
        combine(initialState, (set, get) => ({
            setFilters: (newFilters: Filters) => {
                set((state) => ({
                    filters: { ...state.filters, ...newFilters },
                }));
            },

            setSearchValues: (value: string) => {
                set({ searchValue: value });
            },

            setRotateModel: () => {
                set({ rotateModel: true });
            },

            setIsModelLoaded: (state: boolean) => {
                set({ isModelLoaded: state });
            },

            resetStore: () => {
                set(initialState);
            },
        })),
        {
            name: "shop-store",
        },
    ),
);

export default useShopStore;
