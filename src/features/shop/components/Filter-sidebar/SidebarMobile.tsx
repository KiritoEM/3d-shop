"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";
import { DualRangeSlider } from '@/components/ui/ranger-slider';
import { FC } from 'react';
import { cn, normalizeStr } from "@/lib/utils";
import { FilterSidebarProps } from ".";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";
import { X } from "lucide-react";

interface FilterSidebarMobileProps extends FilterSidebarProps {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
}

const FilterSidebarMobile: FC<FilterSidebarMobileProps> = ({ categories, setPriceRange, priceRange, categoriesLoading, isSidebarOpen, closeSidebar }): JSX.Element => {
    const { activeCategory, setCategory } = useFilterQuery();

    const allCategoriesLength = categories.map((category) => category.products.flat()).length;
    return (
        <div className={
            cn(
                "filter-bar-mobile block shadow-2xl px-8 lg:hidden h-screen bg-background w-full max-w-[320px] md:max-w-full md:w-[50%] fixed z-50 top-0 right-0 overflow-x-hidden scrollable-section overflow-y-auto transition-all duration-200 ease-in-out",
                isSidebarOpen ? "translate-x-0" : "translate-x-[100%]"
            )
        }>
            {/* Close icon */}
            <div className="close-btn p-2 rounded-lg border border-input w-fit absolute top-5 left-5" onClick={closeSidebar}>
                <X className="size-5" />
            </div>

            <div className="filter-bar-mobile__container flex flex-col gap-8 mt-28 mb-12">
                {/* Customisation card */}
                <FilterCard className="customisation-card" title="Customisation">
                    <ul className="flex flex-col space-y-5">
                        {
                            CUSTOMISATION_FILTER_OPTS.map((opt, index) => (
                                <li key={index} className="customisation__opt w-full flex gap-3 items-center justify-between">
                                    <label htmlFor={`customisation-opt-${index}`}>{opt.label}</label>
                                    <Checkbox id={`customisation-opt-${index}`} className="w-6 h-6 rounded-sm" />
                                </li>
                            ))
                        }
                    </ul>
                </FilterCard>

                {/* Category card */}
                <FilterCard className="category-card" title="Catégories">
                    {
                        categoriesLoading ? (
                            <div className="spinner mx-auto mt-4 animate-spin rounded-full h-7 w-7 border-b-2 border-current"></div>
                        ) :
                            (
                                <ul className="flex flex-col space-y-5">
                                    <li className="category__item w-full flex gap-3 items-center justify-between cursor-pointer" onClick={() => setCategory('tout')}>
                                        <p className={activeCategory === "tout" ? "text-primary" : "text-foreground"}>Tout</p>
                                        <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                                            <span>{allCategoriesLength}</span>
                                        </div>
                                    </li>

                                    {
                                        categories.map((category, index) => (
                                            <li
                                                key={index}
                                                className="category__item w-full flex gap-3 items-center justify-between cursor-pointer"
                                                onClick={() => setCategory(normalizeStr(category.name))}
                                            >
                                                <p className={activeCategory === normalizeStr(category.name) ? "text-primary" : "text-foreground"}>{category.name}</p>
                                                <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                                                    <span>{category.products.length}</span>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                    }
                </FilterCard>

                {/* Price card */}
                <FilterCard className="category-card" title="Prix(Euros)">
                    <div className="w-full pr-5 mt-16">
                        <DualRangeSlider
                            label={(value) => <span className="text-[13px]">{value}</span>}
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