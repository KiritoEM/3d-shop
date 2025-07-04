"use client";

import { useQueryState } from "nuqs";
import { useEffect } from "react";
import useShopStore from "./shop/shopStore";

const useFilterQuery = () => {
    const [activeCategory, setCategory] = useQueryState("category", {
        defaultValue: "tout",
    });
    const { setFilters } = useShopStore();

    useEffect(() => {
        if (activeCategory) {
            setFilters({ category: activeCategory });
        }
    }, [activeCategory]);

    return {
        activeCategory,
        setCategory,
    };
};

export default useFilterQuery;
