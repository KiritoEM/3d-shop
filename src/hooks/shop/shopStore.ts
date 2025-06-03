import { normalizeStr } from "@/lib/utils";
import { ICategory } from "@/models/category.model";
import { IProduct } from "@/models/product.model";
import { create } from "zustand";
import { devtools, combine } from 'zustand/middleware';

type Filters = {
    priceRange?: [number, number];
    category?: string;
    search?: string
}

type ShopState = {
    products: IProduct[];
    categories: ICategory[];
    filters: Filters;
}

const initialState: ShopState = {
    products: [],
    categories: [],
    filters: {
        priceRange: [0, 3000000]
    }
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

                setCategories: (categories: ICategory[]) => {
                    if (Array.isArray(categories)) {
                        set({ categories })
                    }
                },

                setFilters: (newFilters: Filters) => {
                    set((state) => ({
                        filters: { ...state.filters, ...newFilters }
                    }))
                },

                //getters
                getFilteredProducts: () => {
                    const { filters, products } = get();
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