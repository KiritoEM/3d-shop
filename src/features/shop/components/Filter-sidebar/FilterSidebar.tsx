"use client";

import { FilterCard } from "./cards/card";
import { DualRangeSlider } from "@/components/ui/ranger-slider";
import { FC, useCallback } from "react";
import { ICategory } from "@/models/categoryModel";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";
import CategoryFilterCard from "./cards/CategoryFilterCard";
import useShopStore from "../../store/shopStore";
import { debounce } from "@/lib/utils";

export interface FilterSidebarProps {
    categories: ICategory[];
    priceRange: [number, number];
    categoriesLoading: boolean;
}

const FilterSidebar: FC<FilterSidebarProps> = ({
    categories,
    priceRange,
    categoriesLoading,
}): JSX.Element => {
    const { setCategory, setPriceRange } = useFilterQuery();
    const { filters, setFilters } = useShopStore();

    const allCategoriesLength = categories
        .map((category) => category.products.flat())
        .flat().length;

    const handleChangePriceRange = useCallback(
        debounce((range: [number, number]) => {
            setFilters({ ...filters, priceRange: range });
            setPriceRange(`${range[0]}-${range[1]}`);
        }, 1000),
        [setFilters],
    );
    return (
        <aside className="filter-bar scrollable-section fixed hidden h-[calc(100vh-110px)] w-full max-w-[310px] space-y-8 overflow-y-auto overflow-x-hidden pb-8 lg:block xl:max-w-[325px]">
            {/* Category card */}
            <CategoryFilterCard
                {...{
                    activeCategory: filters.category
                        ? String(filters.category)
                        : "all",
                    categories,
                    categoriesLoading,
                    allCategoriesLength,
                }}
                onSelectCategory={(category) => setCategory(category)}
            />

            {/* Price card */}
            <FilterCard className="category-card" title="Prix(Euros)">
                <div className="mt-16 w-full pr-5">
                    <DualRangeSlider
                        label={(value) => (
                            <span className="text-[13px]">{value}</span>
                        )}
                        value={priceRange}
                        onValueChange={handleChangePriceRange}
                        className="font-michroma"
                        min={0}
                        max={3500000}
                        step={50}
                    />
                </div>
            </FilterCard>
        </aside>
    );
};

export default FilterSidebar;
