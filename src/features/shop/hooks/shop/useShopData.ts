"use client";

import { fetchCategories } from "@/features/shop/services/categoryServices";
import { fetchProducts } from "@/features/shop/services/productServices";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import useShopStore, { Filters } from "../../store/shopStore";
import { debounce } from "@/lib/utils";
import useFilterQuery from "../useFilterQuery";

const useShopData = () => {
    const { searchValue, filters, setFilters, resetStore, setSearchValues } =
        useShopStore();
    const { setSearchQuery, setPriceRange } = useFilterQuery();

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
        debounce((range: [number, number]) => {
            setFilters({ ...filters, priceRange: range });
            setPriceRange(`${range[0]}-${range[1]}`);
        }, 1000),
        [setFilters],
    );

    const handleSearchChange = debounce((value: string) => {
        setSearchValues(value);
        setSearchQuery(value);
    }, 1000);

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
    };
};

export default useShopData;
