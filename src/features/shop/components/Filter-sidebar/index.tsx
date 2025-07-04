"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";
import { DualRangeSlider } from "@/components/ui/ranger-slider";
import { FC } from "react";
import { normalizeStr } from "@/lib/utils";
import { ICategory } from "@/models/categoryModel";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";

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
            {/* Customisation card */}
            <FilterCard className="customisation-card" title="Customisation">
                <ul className="flex flex-col space-y-5">
                    {CUSTOMISATION_FILTER_OPTS.map((opt, index) => (
                        <li
                            key={index}
                            className="customisation__opt flex w-full items-center justify-between"
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
                            className="category__item flex w-full cursor-pointer items-center justify-between"
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
                                className="category__item flex w-full cursor-pointer items-center justify-between"
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
        </aside>
    );
};

export default FilterSidebar;
