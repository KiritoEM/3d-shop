"use client"

import { fetchCategories } from "@/features/shop/services/categoryServices";
import { fetchProducts } from "@/features/shop/services/productServices";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import useShopStore from "./shopStore";
import { useQueryState } from "nuqs";

const useShopData = () => {
    const [category, setCategory] = useQueryState("category", { defaultValue: "tout" });

    const { setProducts, setCategories, filters, setFilters, getFilteredProducts, resetStore } = useShopStore();

    const { data: products, isLoading: productsLoading, error: productsError } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
    })

    const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    })

    //add data from tanstack to zustand for filtering data
    useEffect(() => {
        if (products) {
            setProducts(products);
        }
    }, [products])

    useEffect(() => {
        if (categories) {
            setCategories(categories);
        }
    }, [categories])

    //observer for filter query changement
    useEffect(() => {
        if (category) {
            console.log("category query: ", category);
            setFilters({ category })
        }
    }, [category])

    const handleChangeCategory = (category: string) => {
        setCategory(category);
    }

    const handleChangePriceRange = useCallback((range: [number, number]) => {
        setFilters({ ...filters, priceRange: range });
    }, [setFilters]);

    return {
        products,
        categories,
        productsLoading,
        categoriesLoading,
        productsError,
        resetStore,
        categoriesError,
        filteredProducts: getFilteredProducts(),
        handleChangeCategory,
        activeCategory: category || "tout",
        handleChangePriceRange,
        priceRange: filters.priceRange
    }
}

export default useShopData;