"use client";

import { fetchCategories } from "@/features/shop/services/categoryServices";
import { fetchProducts } from "@/features/shop/services/productServices";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import useShopStore, { Filters } from "./shopStore";

const useShopData = () => {
    const [isProductsLoaded, setIsProductLoaded] = useState<boolean>(false);
    const {
        setProducts,
        filters,
        setFilters,
        getFilteredProducts,
        resetStore,
        setSearchValues,
    } = useShopStore();

    const {
        data: products,
        isLoading: productsLoading,
        error: productsError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetchProducts(),
    });

    const {
        data: categories,
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

    //add data from tanstack to zustand for filtering data
    useEffect(() => {
        if (products) {
            setProducts(products);
            setIsProductLoaded(true);
        }
    }, [products]);

    const handleChangePriceRange = useCallback(
        (range: [number, number]) => {
            setFilters({ ...filters, priceRange: range });
        },
        [setFilters],
    );

    const handleSearchChange = (value: string) => {
        setSearchValues(value);
    };

    const handleChangeFilters = (filters: Filters) => {
        setFilters(filters);
    };

    return {
        products,
        isProductsLoaded,
        categories,
        productsLoading,
        categoriesLoading,
        productsError,
        resetStore,
        categoriesError,
        priceRange: filters.priceRange,
        filteredProducts: getFilteredProducts(),
        handleChangePriceRange,
        handleSearchChange,
        handleChangeFilters,
    };
};

export default useShopData;
