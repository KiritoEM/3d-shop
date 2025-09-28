"use client";

import { useQueryState } from "nuqs";
import { useEffect } from "react";
import useShopStore from "../store/shopStore";
import { decodeId } from "@/lib/encodage";

const useFilterQuery = () => {
    const [activeCategory, setCategory] = useQueryState("category", {
        defaultValue: "all",
    });
    const [searchQuery, setSearchQuery] = useQueryState("search", {
        defaultValue: "",
    });
    const [priceRange, setPriceRange] = useQueryState("price_range", {
        defaultValue: "",
    });
    const { setFilters, setSearchValues } = useShopStore();

    useEffect(() => {
        if (activeCategory) {
            setFilters({ category: decodeId(activeCategory) });
        }

        if (searchQuery) {
            setSearchValues(searchQuery);
        }

        if (priceRange) {
            const [min, max] = priceRange.split("-");
            setFilters({ priceRange: [Number(min), Number(max)] });
        }
    }, [activeCategory, searchQuery, priceRange]);

    return {
        setCategory,
        setSearchQuery,
        setPriceRange,
    };
};

export default useFilterQuery;
