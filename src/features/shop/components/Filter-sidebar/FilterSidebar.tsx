"use client";

import { FilterCard } from "./cards/card";
import { DualRangeSlider } from "@/components/ui/ranger-slider";
import { FC } from "react";
import { ICategory } from "@/models/categoryModel";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";
import CategoryFilterCard from "./cards/CategoryFilterCard";

export interface FilterSidebarProps {
    categories: ICategory[];
    priceRange: [number, number];
    categoriesLoading: boolean;
    setPriceRange: (range: [number, number]) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({
    categories,
    setPriceRange,
    priceRange,
    categoriesLoading,
}): JSX.Element => {
    const { activeCategory, setCategory } = useFilterQuery();

    const allCategoriesLength = categories.map((category) =>
        category.products.flat(),
    ).length;
    return (
        <aside className="filter-bar scrollable-section fixed hidden h-[calc(100vh-110px)] w-full max-w-[310px] space-y-8 overflow-y-auto overflow-x-hidden pb-8 lg:block xl:max-w-[325px]">
            {/* Category card */}
            <CategoryFilterCard
                {...{
                    activeCategory,
                    categories,
                    categoriesLoading,
                    allCategoriesLength,
                }}
                onSelectCategory={setCategory}
            />

            {/* Price card */}
            <FilterCard className="category-card" title="Prix(Euros)">
                <div className="mt-16 w-full pr-5">
                    <DualRangeSlider
                        label={(value) => (
                            <span className="text-[13px]">{value}</span>
                        )}
                        value={priceRange}
                        onValueChange={setPriceRange}
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
