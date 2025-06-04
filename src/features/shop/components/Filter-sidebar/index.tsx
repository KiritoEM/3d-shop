"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { FilterCard } from "./card";
import { CUSTOMISATION_FILTER_OPTS } from "@/constants/data/store-data";
import { DualRangeSlider } from '@/components/ui/ranger-slider';
import { FC } from 'react';
import { normalizeStr } from "@/lib/utils";
import { ICategory } from "@/models/category.model";
import useFilterQuery from "@/features/shop/hooks/useFilterQuery";

export type FilterSidebarProps = {
    categories: ICategory[]
    priceRange: [number, number];
    categoriesLoading: boolean;
    setPriceRange: (range: [number, number]) => void;
}

const FilterSidebar: FC<FilterSidebarProps> = ({ categories, setPriceRange, priceRange, categoriesLoading }): JSX.Element => {
    const allCategoriesLength = categories.map((category) => category.Product.flat()).length;
    const { activeCategory, setCategory } = useFilterQuery();
    return (
        <aside className="filter-bar hidden lg:block w-full max-w-[310px] xl:max-w-[325px] space-y-8 h-[calc(100vh-110px)] pb-8 fixed overflow-x-hidden scrollable-section overflow-y-auto">
            {/* Customisation card */}
            <FilterCard className="customisation-card" title="Customisation">
                <ul className="flex flex-col space-y-5">
                    {
                        CUSTOMISATION_FILTER_OPTS.map((opt, index) => (
                            <li key={index} className="customisation__opt w-full flex items-center justify-between">
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
                                <li className="category__item w-full flex items-center justify-between cursor-pointer" onClick={() => setCategory('tout')}>
                                    <p className={activeCategory === "tout" ? "text-primary" : "text-foreground"}>Tout</p>
                                    <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                                        <span>{allCategoriesLength}</span>
                                    </div>
                                </li>

                                {
                                    categories.map((category, index) => (
                                        <li
                                            key={index}
                                            className="category__item w-full flex items-center justify-between cursor-pointer"
                                            onClick={() => setCategory(normalizeStr(category.name))}
                                        >
                                            <p className={activeCategory === normalizeStr(category.name) ? "text-primary" : "text-foreground"}>{category.name}</p>
                                            <div className="count px-3 py-1 rounded-xl bg-primary/10 text-primary text-sm">
                                                <span>{category.Product.length}</span>
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
        </aside>
    );
};

export default FilterSidebar;