"use client";

import { FilterCard } from "./cards/card";
import { FC } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";
import { DualRangeSlider } from "@/components/ui/ranger-slider";
import { FilterSidebarProps } from "./FilterSidebar";
import CategoryFilterCard from "./cards/CategoryFilterCard";
import useShopStore from "../../store/shopStore";

interface FilterSidebarMobileProps extends FilterSidebarProps {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
}

const FilterSidebarMobile: FC<FilterSidebarMobileProps> = ({
    categories,
    setPriceRange,
    priceRange,
    categoriesLoading,
    isSidebarOpen,
    closeSidebar,
}): JSX.Element => {
    const { setCategory } = useFilterQuery();
    const { filters } = useShopStore();

    const allCategoriesLength = categories.map((category) =>
        category.products.flat(),
    ).length;
    return (
        <div
            className={cn(
                "filter-bar-mobile bg-background scrollable-section fixed right-0 top-0 z-50 block h-screen w-full max-w-[320px] overflow-y-auto overflow-x-hidden px-8 shadow-2xl transition-all duration-200 ease-in-out md:w-[50%] md:max-w-full lg:hidden",
                isSidebarOpen ? "translate-x-0" : "translate-x-[100%]",
            )}
        >
            {/* Close icon */}
            <div
                className="close-btn border-input absolute left-5 top-5 w-fit rounded-lg border p-2"
                onClick={closeSidebar}
            >
                <X className="size-5" />
            </div>

            <div className="filter-bar-mobile__container mb-12 mt-28 flex flex-col gap-8">
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
                            onValueChange={setPriceRange}
                            className="font-michroma"
                            min={0}
                            max={3500000}
                            step={50}
                        />
                    </div>
                </FilterCard>
            </div>
        </div>
    );
};

export default FilterSidebarMobile;
