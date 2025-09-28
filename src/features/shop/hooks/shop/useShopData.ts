"use client";

import { fetchCategories } from "@/features/shop/services/categoryServices";
import { fetchProducts } from "@/features/shop/services/productServices";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import useShopStore, { Filters } from "../../store/shopStore";

const useShopData = () => {
    const { searchValue, filters, setFilters, resetStore, setSearchValues } =
        useShopStore();

    const {
        data: products,
        isLoading: productsLoading,
        error: productsError,
    } = useQuery({
        queryKey: [
            "products",
            searchValue,
            filters.category,
            filters.priceRange,
        ],
        queryFn: () => fetchProducts({ searchValue: searchValue, filters }),
    });

    const {
        data: categories,
        isLoading: categoriesLoading,
        error: categoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => fetchCategories(),
    });

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
        products: products?.paginatedData,
        categories,
        productsLoading,
        categoriesLoading,
        productsError,
        resetStore,
        categoriesError,
        priceRange: filters.priceRange,
        handleChangePriceRange,
        handleSearchChange,
        handleChangeFilters,
    };
};

export default useShopData;
