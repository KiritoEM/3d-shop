"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";
import { DualRangeSlider } from "@/components/ui/ranger-slider";
import { FC } from "react";
import { cn, normalizeStr } from "@/lib/utils";
import { FilterSidebarProps } from ".";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";
import { X } from "lucide-react";

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
    const { activeCategory, setCategory } = useFilterQuery();

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
                {/* Customisation card */}
                <FilterCard
                    className="customisation-card"
                    title="Customisation"
                >
                    <ul className="flex flex-col space-y-5">
                        {CUSTOMISATION_FILTER_OPTS.map((opt, index) => (
                            <li
                                key={index}
                                className="customisation__opt flex w-full items-center justify-between gap-3"
                            >
                                <label htmlFor={`customisation-opt-${index}`}>
                                    {opt.label}
                                </label>
                                <Checkbox
                                    id={`customisation-opt-${index}`}
                                    className="h-6 w-6 rounded-sm"
                                />
                            </li>
                        ))}
                    </ul>
                </FilterCard>

                {/* Category card */}
                <FilterCard className="category-card" title="Catégories">
                    {categoriesLoading ? (
                        <div className="spinner mx-auto mt-4 h-7 w-7 animate-spin rounded-full border-b-2 border-current"></div>
                    ) : (
                        <ul className="flex flex-col space-y-5">
                            <li
                                className="category__item flex w-full cursor-pointer items-center justify-between gap-3"
                                onClick={() => setCategory("tout")}
                            >
                                <p
                                    className={
                                        activeCategory === "tout"
                                            ? "text-primary"
                                            : "text-foreground"
                                    }
                                >
                                    Tout
                                </p>
                                <div className="count bg-primary/10 text-primary rounded-xl px-3 py-1 text-sm">
                                    <span>{allCategoriesLength}</span>
                                </div>
                            </li>

                            {categories.map((category, index) => (
                                <li
                                    key={index}
                                    className="category__item flex w-full cursor-pointer items-center justify-between gap-3"
                                    onClick={() =>
                                        setCategory(normalizeStr(category.name))
                                    }
                                >
                                    <p
                                        className={
                                            activeCategory ===
                                            normalizeStr(category.name)
                                                ? "text-primary"
                                                : "text-foreground"
                                        }
                                    >
                                        {category.name}
                                    </p>
                                    <div className="count bg-primary/10 text-primary rounded-xl px-3 py-1 text-sm">
                                        <span>{category.products.length}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </FilterCard>

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
