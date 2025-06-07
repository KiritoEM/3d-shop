import { normalizeStr } from "@/lib/utils";
import { IProduct } from "@/models/productModel";
import { create } from "zustand";
import { devtools, combine } from 'zustand/middleware';

export type Filters = {
    priceRange?: [number, number];
    category?: string;
}

type ShopState = {
    products: IProduct[];
    rotateModel: boolean;
    filters: Filters;
    searchValue?: string;
}

const initialState: ShopState = {
    products: [],
    filters: {
        priceRange: [0, 3000000]
    },
    searchValue: "",
    rotateModel: false
}

const useShopStore = create(
    devtools(
        combine(
            initialState,
            (set, get) => ({
                setProducts: (products: IProduct[]) => {
                    if (Array.isArray(products)) {
                        set({ products })
                    }
                },

                setFilters: (newFilters: Filters) => {
                    set((state) => ({
                        filters: { ...state.filters, ...newFilters }
                    }))
                },

                setSearchValues: (value: string) => {
                    set({ searchValue: value })
                },

                setRotateModel: () => {
                    set({ rotateModel: true })
                },

                //getters
                getFilteredProducts: () => {
                    const { filters, products, searchValue } = get();
                    let filtered = [...products];

                    if (filters.category && filters.category.toLowerCase() !== "tout") {
                        filtered = filtered.filter((product) => {
                            return normalizeStr(product.category?.name) === normalizeStr(filters.category!)
                        })
                    }
                    else {
                        filtered = products;
                    }

                    if (filters.priceRange) {
                        const [min, max] = filters.priceRange;
                        filtered = filtered.filter((product) => product.price >= min && product.price <= max)
                    }

                    if (searchValue) {
                        filtered = filtered.filter((product) => {
                            let normalizedProductName = normalizeStr(product.name);
                            return normalizedProductName.includes(searchValue);
                        })
                    }

                    return filtered;
                },

                resetStore: () => {
                    set(initialState)
                }
            })
        ),
        {
            name: "shop-store"
        }
    )
)

export default useShopStore;